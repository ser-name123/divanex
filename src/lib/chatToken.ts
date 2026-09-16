import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Write capability for a chat session.
 *
 * The chat widget is unauthenticated by design, but "unauthenticated" must not
 * mean "may write anything". Before this, a POST could carry any session id —
 * or a whole array of them — and the server would overwrite the matching
 * records, so anyone could rewrite or destroy another visitor's transcript and
 * plant fabricated conversations in the admin console.
 *
 * A visitor now gets a token bound to the session id they created. Writes to an
 * id that already exists require the matching token, and the token cannot be
 * derived without AUTH_SECRET.
 */

export const CHAT_TOKEN_HEADER = "x-chat-token";

function secret(): string | null {
  const value = process.env.AUTH_SECRET;
  return value && value.length >= 32 ? value : null;
}

export function issueChatToken(sessionId: string): string | null {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(`chat:${sessionId}`).digest("base64url");
}

export function verifyChatToken(sessionId: string, token: string | null | undefined): boolean {
  if (!token || !sessionId) return false;

  const expected = issueChatToken(sessionId);
  if (!expected) return false;

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    timingSafeEqual(a, a);
    return false;
  }
  return timingSafeEqual(a, b);
}
