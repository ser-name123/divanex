import { NextRequest, NextResponse } from "next/server";
import { sendChatVerificationOtpEmail } from "@/lib/email";
import { badRequest, cleanString, isValidEmail, readJson, tooManyRequests } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { issueChatOtp } from "@/lib/chatOtp";
import { sendFormNotifications } from "@/lib/formNotifications";

/**
 * Sends the chat widget verification code.
 *
 * The code is generated server-side and returned to nobody — the only copy that
 * leaves this process is the one in the email. The caller used to supply the
 * code itself, which made this an open relay for delivering attacker-chosen
 * text to any inbox from this domain, and made the verification meaningless.
 *
 * Still public, since the widget has no login, so it carries a per-address
 * limit as well as a per-IP one and reveals no SMTP detail on failure.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);

    const ipLimit = rateLimit(`chat:otp:ip:${ip}`, 5, 10 * 60 * 1000);
    if (!ipLimit.ok) return tooManyRequests(ipLimit.retryAfterSeconds);

    const body = await readJson<{
      sessionId?: unknown;
      email?: unknown;
      name?: unknown;
      phone?: unknown;
    }>(req);
    if (!body) return badRequest("Invalid request body.");

    const sessionId = cleanString(body.sessionId, 100);
    const email = cleanString(body.email, 254).toLowerCase();

    if (!/^[A-Za-z0-9_-]{6,100}$/.test(sessionId)) {
      return badRequest("A valid session identifier is required.");
    }
    if (!email || !isValidEmail(email)) {
      return badRequest("A valid email address is required.");
    }

    // Per-recipient cap, so no single inbox can be flooded from many addresses.
    const recipientLimit = rateLimit(`chat:otp:to:${email}`, 5, 60 * 60 * 1000);
    if (!recipientLimit.ok) return tooManyRequests(recipientLimit.retryAfterSeconds);

    const code = issueChatOtp(sessionId, email);

    const name = cleanString(body.name, 100) || "Valued Visitor";
    const phone = cleanString(body.phone, 40);

    const emailResult = await sendChatVerificationOtpEmail({
      to: email,
      otp: code,
      userName: name,
      userPhone: phone,
    });

    if (!emailResult.success) {
      // Log the cause, return a generic message: SMTP errors name hosts,
      // accounts, and policy decisions an attacker can use to probe the relay.
      console.error("[api/chat/send-otp]", emailResult.error);
      return NextResponse.json(
        { success: false, error: "Could not send the verification code. Please try again shortly." },
        { status: 502 }
      );
    }

    // The team's copy. Sent after the visitor's, and deliberately without the
    // code in it: the alert says somebody is waiting in the chat, it is not a
    // second delivery of a credential that authenticates them. A failure here
    // is logged inside and never turns a working verification into an error.
    await sendFormNotifications({
      kind: "chat",
      name,
      email,
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
      ],
      adminHref: "/admin?tab=chats",
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      message: `Verification code successfully sent to ${email}`,
    });
  } catch (error) {
    console.error("[api/chat/send-otp]", error);
    return NextResponse.json(
      { success: false, error: "Could not send the verification code. Please try again shortly." },
      { status: 500 }
    );
  }
}
