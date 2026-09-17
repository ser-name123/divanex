import { NextResponse, after } from "next/server";
import { randomInt } from "node:crypto";
import {
  SESSION_COOKIE,
  adminCookieOptions,
  createSessionToken,
  hashShortSecret,
  timingSafeCompare,
} from "@/lib/auth";
import { badRequest, cleanString, readJson, serverError, tooManyRequests } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { noStore } from "@/lib/guard";
import { checkLockout, clearFailures, recordFailure } from "@/lib/lockout";
import { recordAuthEvent } from "@/lib/auditLog";
import { recordAudit } from "@/lib/auditStore";
import { sendOtpEmail } from "@/lib/email";
import {
  clearChallenge,
  countAttempt,
  readChallenge,
  saveChallenge,
  sweepExpiredChallenges,
} from "@/lib/authChallengeStore";
import {
  ensureBootstrapOwner,
  getAdminByEmail,
  normaliseEmail,
  recordLogin,
  verifyAdminPassword,
  type AdminUser,
} from "@/lib/adminUserStore";
import { ROLE_LABELS, ROLE_SUMMARIES } from "@/lib/permissions";

interface LoginBody {
  step?: "check-email" | "verify-password" | "verify-otp";
  email?: unknown;
  username?: unknown;
  password?: unknown;
  otp?: unknown;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

/**
 * Resolves who is trying to sign in.
 *
 * The operator directory used to be a hardcoded array in this file with one
 * shared password behind it, and — until this rewrite — a literal address that
 * was accepted as a password regardless of what was configured. It is a table
 * now, so this is a lookup. The configured ADMIN_USERNAME still resolves to the
 * owner's address, because that is what the existing operator types.
 */
async function resolveAdmin(identifier: string): Promise<AdminUser | null> {
  if (!identifier) return null;

  // Populates the directory from the environment the first time anyone signs
  // in after the upgrade, so the existing credentials keep working.
  await ensureBootstrapOwner();

  const byEmail = await getAdminByEmail(identifier);
  if (byEmail) return byEmail;

  const envUsername = normaliseEmail(process.env.ADMIN_USERNAME || "");
  const envEmail = normaliseEmail(process.env.ADMIN_EMAIL || "");
  if (envUsername && identifier === envUsername && envEmail) {
    return getAdminByEmail(envEmail);
  }

  return null;
}

/** Initials for the avatar the sign-in screen draws. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "AD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function accountSummary(admin: AdminUser) {
  return {
    email: admin.email,
    name: admin.name,
    role: ROLE_LABELS[admin.role],
    title: ROLE_SUMMARIES[admin.role],
    avatar: initials(admin.name),
    badge: admin.role.toUpperCase(),
  };
}

function unauthorized(message: string) {
  return noStore(NextResponse.json({ success: false, error: message }, { status: 401 }));
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);

    // 10 attempts per 15 minutes per IP across every step of the flow.
    const limit = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<LoginBody>(request);
    if (!body) return badRequest("Invalid request body payload.");

    const step = body.step;
    const inputIdentifier = cleanString(body.email || body.username, 150).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";
    const otp = typeof body.otp === "string" ? body.otp.trim() : "";

    const matchedAdmin = await resolveAdmin(inputIdentifier);

    // Housekeeping only — an expired row is rejected on read either way, so it
    // need not cost every sign-in a round trip.
    after(() => sweepExpiredChallenges());

    // =========================================================================
    // STEP 1: VERIFY EMAIL IDENTITY
    // =========================================================================
    if (step === "check-email") {
      if (!inputIdentifier) {
        return badRequest("Please provide an administrator email address.");
      }

      if (!matchedAdmin) {
        recordAuthEvent({
          type: "admin.login.unknown_account",
          subject: inputIdentifier,
          outcome: "failure",
          ip,
        });
        return unauthorized("Access denied. That account is not in the operator directory.");
      }

      if (matchedAdmin.status === "suspended") {
        recordAuthEvent({
          type: "admin.login.password.failure",
          subject: matchedAdmin.email,
          outcome: "failure",
          ip,
          detail: "account suspended",
        });
        return unauthorized("This account is suspended. Ask an owner to reactivate it.");
      }

      return noStore(
        NextResponse.json({
          success: true,
          step: "check-email",
          account: accountSummary(matchedAdmin),
        })
      );
    }

    // =========================================================================
    // STEP 2: VERIFY PASSWORD & DISPATCH OTP
    // =========================================================================
    if (step === "verify-password") {
      if (!matchedAdmin) return unauthorized("Unauthorized operator identity.");

      const accountKey = matchedAdmin.email.toLowerCase();

      // Account-scoped lockout, checked before the password is even examined.
      // Per-IP limits alone do not slow an attacker who rotates addresses.
      const lock = checkLockout(`login:${accountKey}`);
      if (lock.locked) {
        recordAuthEvent({
          type: "admin.login.locked_out",
          subject: accountKey,
          outcome: "failure",
          ip,
        });
        void recordAudit({
          actor: { email: accountKey, name: matchedAdmin.name, role: matchedAdmin.role },
          action: "admin.login.locked_out",
          outcome: "failure",
          ip,
        });
        return tooManyRequests(lock.retryAfterSeconds);
      }

      // Checked against this account's own hash. There is no shared password
      // and no literal credential anywhere in this file.
      const authenticated = await verifyAdminPassword(accountKey, password);

      if (!authenticated) {
        const status = recordFailure(`login:${accountKey}`);
        recordAuthEvent({
          type: "admin.login.password.failure",
          subject: accountKey,
          outcome: "failure",
          ip,
          detail: status.locked ? `locked for ${status.retryAfterSeconds}s` : undefined,
        });
        void recordAudit({
          actor: { email: accountKey, name: matchedAdmin.name, role: matchedAdmin.role },
          action: "admin.login.failure",
          outcome: "failure",
          ip,
          detail: "wrong password",
        });
        return unauthorized("Invalid credentials. Please verify and re-try.");
      }

      clearFailures(`login:${accountKey}`);
      recordAuthEvent({
        type: "admin.login.password.success",
        subject: accountKey,
        outcome: "success",
        ip,
      });

      // Independent throttle so a valid password cannot be used to flood the
      // operator inbox with codes.
      const dispatchLimit = rateLimit(`login:otp-dispatch:${accountKey}`, 5, 15 * 60 * 1000);
      if (!dispatchLimit.ok) return tooManyRequests(dispatchLimit.retryAfterSeconds);

      // Cryptographically random. Math.random() is predictable from prior
      // outputs and must never generate an authentication factor.
      const generatedOtp = String(randomInt(0, 1000000)).padStart(6, "0");

      const stored = await saveChallenge(accountKey, {
        digest: hashShortSecret(generatedOtp),
        expiresAt: Date.now() + OTP_TTL_MS,
        attempts: 0,
      });

      // Without a stored challenge the code cannot be verified, so sending it
      // would strand the operator on a step that can never pass.
      if (!stored) {
        recordAuthEvent({
          type: "admin.login.otp.failure",
          subject: accountKey,
          outcome: "failure",
          ip,
          detail: "challenge store unavailable",
        });
        return noStore(
          NextResponse.json(
            {
              success: false,
              error: "Could not start two-factor verification. Please try again in a moment.",
            },
            { status: 503 }
          )
        );
      }

      // Printed only outside production. A one-time code sitting in the
      // platform log is a second copy of an authentication factor, readable by
      // anyone with access to the deployment logs.
      if (process.env.NODE_ENV !== "production") {
        console.log(
          `\n========================================\n[ADMIN 2FA OTP] For ${matchedAdmin.email}: ${generatedOtp}\n========================================\n`
        );
      }

      // Sent after the response so the UI still transitions instantly, but
      // handed to `after` rather than left as a floating promise. A serverless
      // function is frozen the moment its response is sent, which killed this
      // send before it reached the mail server.
      after(async () => {
        try {
          const emailResult = await sendOtpEmail({
            to: matchedAdmin.email,
            otp: generatedOtp,
            recipientName: matchedAdmin.name,
            ipAddress: ip,
          });
          if (emailResult.success) {
            console.log(
              `[EMAIL] 2FA OTP delivered to ${matchedAdmin.email}. MessageId: ${emailResult.messageId}`
            );
          } else {
            console.warn(`[EMAIL] 2FA OTP delivery notice:`, emailResult.error);
          }
        } catch (err) {
          console.warn(`[EMAIL] 2FA OTP delivery error:`, err);
        }
      });

      return noStore(
        NextResponse.json({
          success: true,
          step: "verify-password",
          requiresOtp: true,
          emailDispatched: true,
          message: `Security OTP sent to ${matchedAdmin.email}. Check your inbox.`,
        })
      );
    }

    // =========================================================================
    // STEP 3: VERIFY OTP CODE & ISSUE SESSION TOKEN
    // =========================================================================
    if (step === "verify-otp") {
      if (!matchedAdmin) return unauthorized("Unauthorized operator identity.");

      const accountKey = matchedAdmin.email.toLowerCase();
      const challenge = await readChallenge(accountKey);

      const invalid = () =>
        noStore(
          NextResponse.json(
            {
              success: false,
              error:
                "Invalid or expired 2FA security token. Please check your inbox and enter the correct 6-digit code.",
            },
            { status: 400 }
          )
        );

      const otpLock = checkLockout(`otp:${accountKey}`);
      if (otpLock.locked) {
        recordAuthEvent({
          type: "admin.login.locked_out",
          subject: accountKey,
          outcome: "failure",
          ip,
        });
        return tooManyRequests(otpLock.retryAfterSeconds);
      }

      if (!challenge || Date.now() > challenge.expiresAt) {
        await clearChallenge(accountKey);
        recordFailure(`otp:${accountKey}`);
        recordAuthEvent({
          type: "admin.login.otp.failure",
          subject: accountKey,
          outcome: "failure",
          ip,
          detail: "no active challenge",
        });
        return invalid();
      }

      // Burn the challenge after a handful of wrong guesses so the 6-digit
      // space can never be walked, even from rotating source addresses. The
      // count is spent before the code is compared, and conditionally on the
      // value just read, so parallel guesses cannot share one attempt.
      const counted = await countAttempt(accountKey, challenge.attempts);
      if (!counted || challenge.attempts + 1 > OTP_MAX_ATTEMPTS) {
        await clearChallenge(accountKey);
        recordFailure(`otp:${accountKey}`);
        recordAuthEvent({
          type: "admin.login.otp.failure",
          subject: accountKey,
          outcome: "failure",
          ip,
          detail: "attempts exhausted",
        });
        return invalid();
      }

      if (!/^\d{6}$/.test(otp) || !timingSafeCompare(hashShortSecret(otp), challenge.digest)) {
        recordFailure(`otp:${accountKey}`);
        recordAuthEvent({
          type: "admin.login.otp.failure",
          subject: accountKey,
          outcome: "failure",
          ip,
        });
        return invalid();
      }

      // Single use.
      await clearChallenge(accountKey);
      clearFailures(`otp:${accountKey}`);
      recordAuthEvent({
        type: "admin.login.otp.success",
        subject: accountKey,
        outcome: "success",
        ip,
      });

      after(async () => {
        await recordLogin(accountKey);
        await recordAudit({
          actor: { email: accountKey, name: matchedAdmin.name, role: matchedAdmin.role },
          action: "admin.login.success",
          ip,
          detail: `signed in as ${ROLE_LABELS[matchedAdmin.role]}`,
        });
      });

      const { token, maxAge } = createSessionToken(matchedAdmin.email);
      const response = noStore(
        NextResponse.json({
          success: true,
          message: "Session authenticated successfully.",
          user: {
            email: matchedAdmin.email,
            name: matchedAdmin.name,
            role: ROLE_LABELS[matchedAdmin.role],
            roleKey: matchedAdmin.role,
          },
        })
      );

      response.cookies.set(SESSION_COOKIE, token, adminCookieOptions(maxAge));

      return response;
    }

    // No password-only shortcut exists. Every session is issued by step 3 and
    // therefore always carries a verified second factor.
    return badRequest("Unsupported authentication step.");
  } catch (error) {
    return serverError("auth:login", error);
  }
}
