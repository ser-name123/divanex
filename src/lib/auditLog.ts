import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";

/**
 * Security audit trail.
 *
 * Without a record of who tried to sign in, from where, and whether it worked,
 * a breach is invisible until something visible breaks. These events are the
 * ones worth being able to answer questions about afterwards: authentication
 * attempts, credential changes, and administrative actions on client access.
 *
 * Two rules hold everywhere in here:
 *   - never record a credential, a token, or an OTP, not even hashed. An audit
 *     trail that carries secrets turns log access into account access.
 *   - never let logging fail a request. Writes are best-effort and swallowed.
 */

export type AuthEventType =
  | "admin.login.password.success"
  | "admin.login.password.failure"
  | "admin.login.unknown_account"
  | "admin.login.otp.success"
  | "admin.login.otp.failure"
  | "admin.login.locked_out"
  | "admin.logout"
  | "portal.login.success"
  | "portal.login.failure"
  | "portal.logout"
  | "portal.password.changed"
  | "portal.credentials.rotated"
  | "admin.cache.purged"
  | "admin.content.saved";

export interface AuthEvent {
  type: AuthEventType;
  /** Account the event is about. Emails and usernames only — never a secret. */
  subject?: string;
  outcome: "success" | "failure";
  ip?: string;
  detail?: string;
}

const LEVEL_FOR_OUTCOME = { success: "info", failure: "warn" } as const;

export function recordAuthEvent(event: AuthEvent): void {
  const line = [
    `[audit] ${event.type}`,
    event.subject ? `subject=${event.subject}` : "",
    event.ip ? `ip=${event.ip}` : "",
    event.detail ? `detail=${event.detail}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Always reaches the process log, which is the one sink that exists whether
  // or not a database is configured.
  if (event.outcome === "failure") console.warn(line);
  else console.info(line);

  void persist(event, line);
}

async function persist(event: AuthEvent, line: string): Promise<void> {
  try {
    const supabase = getSupabase();
    await supabase.from("system_logs").insert({
      id: `audit-${randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: LEVEL_FOR_OUTCOME[event.outcome],
      service: "auth-audit",
      message: line.slice(0, 1000),
      ip_address: event.ip || null,
    });
  } catch {
    // Supabase is optional, and an audit write must never break a login.
  }
}
