import { randomInt } from "node:crypto";
import { hashShortSecret, timingSafeCompare } from "@/lib/auth";

/**
 * Verification challenges for the chat widget.
 *
 * The code used to be generated in the browser, held in localStorage, and
 * compared there — with a literal `777777` accepted as a universal match. That
 * is not verification: a visitor could read the code out of their own storage,
 * or simply skip the step. The code is generated here now, leaves the server
 * only inside the email, and is compared here.
 *
 * Stored as a keyed digest, never in the clear, and one attempt budget per
 * challenge so the six-digit space cannot be walked.
 */

interface Challenge {
  digest: string;
  email: string;
  expiresAt: number;
  attempts: number;
}

declare global {
  var __DIVANEX_CHAT_OTP__: Map<string, Challenge> | undefined;
}

function store(): Map<string, Challenge> {
  if (!globalThis.__DIVANEX_CHAT_OTP__) globalThis.__DIVANEX_CHAT_OTP__ = new Map();
  return globalThis.__DIVANEX_CHAT_OTP__;
}

const TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const MAX_PENDING = 5000;

function sweep() {
  const now = Date.now();
  const map = store();
  if (map.size < MAX_PENDING) return;
  for (const [key, challenge] of map) {
    if (challenge.expiresAt <= now) map.delete(key);
  }
}

/** Creates a challenge for a session and returns the code to email. */
export function issueChatOtp(sessionId: string, email: string): string {
  sweep();
  const code = String(randomInt(0, 1000000)).padStart(6, "0");
  store().set(sessionId, {
    digest: hashShortSecret(code),
    email: email.toLowerCase(),
    expiresAt: Date.now() + TTL_MS,
    attempts: 0,
  });
  return code;
}

export function dropChatOtp(sessionId: string): void {
  store().delete(sessionId);
}

export type ChatOtpResult = "ok" | "invalid" | "expired" | "exhausted";

export function verifyChatOtp(sessionId: string, code: string): ChatOtpResult {
  const map = store();
  const challenge = map.get(sessionId);

  if (!challenge) return "expired";
  if (Date.now() > challenge.expiresAt) {
    map.delete(sessionId);
    return "expired";
  }

  challenge.attempts += 1;
  if (challenge.attempts > MAX_ATTEMPTS) {
    map.delete(sessionId);
    return "exhausted";
  }

  if (!/^\d{6}$/.test(code)) return "invalid";
  if (!timingSafeCompare(hashShortSecret(code), challenge.digest)) return "invalid";

  map.delete(sessionId);
  return "ok";
}
