import "server-only";
import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import type { Role } from "@/lib/permissions";

/**
 * The audit trail.
 *
 * Separate from system_logs, which holds free text for a person to read. These
 * rows are queried — by actor, by action, by date — and each carries what
 * actually changed, so "what did that edit do" does not depend on somebody
 * having remembered.
 *
 * Two rules from the original audit helper still hold, and matter more now that
 * the rows are richer:
 *
 *   - Never record a credential, a token, or a one-time code, not even hashed.
 *     A trail that carries secrets turns read access to the trail into account
 *     access. `redact` enforces this for field names that look like secrets,
 *     because the alternative is trusting every future call site.
 *   - Never let an audit write fail the request it describes. The work is done
 *     by the time this runs; a logging outage must not undo it.
 */

const TABLE = "audit_events";

/** What happened. Dotted, `<subject>.<verb>`, so the list stays filterable. */
export type AuditAction =
  | "admin.login.success"
  | "admin.login.failure"
  | "admin.login.locked_out"
  | "admin.logout"
  | "admin.user.created"
  | "admin.user.updated"
  | "admin.user.role_changed"
  | "admin.user.suspended"
  | "admin.user.reactivated"
  | "admin.user.password_reset"
  | "admin.user.deleted"
  | "admin.permission.denied"
  | "content.updated"
  | "settings.updated"
  | "cache.purged"
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "chat.deleted"
  | "subscriber.deleted";

export interface FieldChange {
  field: string;
  before: unknown;
  after: unknown;
}

export interface AuditActor {
  email: string;
  name?: string;
  role?: Role;
}

export interface AuditEventInput {
  actor: AuditActor | null;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  /** Human label for the thing acted on, e.g. "Home — hero headline". */
  targetLabel?: string;
  outcome?: "success" | "failure";
  ip?: string;
  detail?: string;
  changes?: FieldChange[];
}

export interface AuditEvent {
  id: string;
  at: string;
  actorEmail: string | null;
  actorName: string | null;
  actorRole: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  targetLabel: string | null;
  outcome: string;
  ipAddress: string | null;
  detail: string | null;
  changes: FieldChange[];
}

/** Field names whose values must never be written down. */
const SECRET_FIELD = /(password|secret|token|otp|hash|key|credential|authorization)/i;

/** How much of one value the trail keeps. Enough to see the edit, not a backup. */
const MAX_VALUE_CHARS = 600;

function trim(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") {
    return value.length > MAX_VALUE_CHARS ? `${value.slice(0, MAX_VALUE_CHARS)}…` : value;
  }
  if (typeof value === "number" || typeof value === "boolean") return value;

  const json = JSON.stringify(value) ?? "";
  return json.length > MAX_VALUE_CHARS ? `${json.slice(0, MAX_VALUE_CHARS)}…` : value;
}

/**
 * Strips values that should not be stored.
 *
 * The field is still recorded — knowing that somebody changed a password is the
 * point of an audit trail — but the value either side of it is replaced.
 */
function redact(changes: FieldChange[]): FieldChange[] {
  return changes.slice(0, 200).map((change) => {
    if (SECRET_FIELD.test(change.field)) {
      return { field: change.field, before: "[redacted]", after: "[redacted]" };
    }
    return { field: change.field, before: trim(change.before), after: trim(change.after) };
  });
}

/**
 * Compares two objects and returns only the keys that differ.
 *
 * Used by the content routes, where the interesting thing is which of eighty
 * fields somebody touched. Nested objects are compared as a whole rather than
 * walked: a diff deep enough to be exact is deep enough to be unreadable.
 */
export function diffObjects(
  before: Record<string, unknown> | null | undefined,
  after: Record<string, unknown> | null | undefined
): FieldChange[] {
  const a = before || {};
  const b = after || {};
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];

  const changes: FieldChange[] = [];
  for (const key of keys) {
    const left = a[key];
    const right = b[key];
    if (JSON.stringify(left) === JSON.stringify(right)) continue;
    changes.push({ field: key, before: left, after: right });
  }
  return changes;
}

/** Writes one event. Resolves either way; never throws at the caller. */
export async function recordAudit(input: AuditEventInput): Promise<void> {
  const changes = redact(input.changes || []);

  const line = [
    `[audit] ${input.action}`,
    input.actor?.email ? `actor=${input.actor.email}` : "actor=anonymous",
    input.targetLabel ? `target=${input.targetLabel}` : "",
    input.detail ? `detail=${input.detail}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (input.outcome === "failure") console.warn(line);
  else console.info(line);

  try {
    await getSupabase()
      .from(TABLE)
      .insert({
        id: `evt-${randomUUID()}`,
        at: new Date().toISOString(),
        actor_email: input.actor?.email || null,
        actor_name: input.actor?.name || null,
        actor_role: input.actor?.role || null,
        action: input.action,
        target_type: input.targetType || null,
        target_id: input.targetId || null,
        target_label: input.targetLabel || null,
        outcome: input.outcome || "success",
        ip_address: input.ip || null,
        detail: input.detail ? input.detail.slice(0, 1000) : null,
        changes,
      });
  } catch {
    // The action already happened. Losing its record is bad; undoing it is worse.
  }
}

export interface AuditQuery {
  actor?: string;
  action?: string;
  outcome?: string;
  /** ISO dates, inclusive. */
  from?: string;
  to?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

interface AuditRow {
  id: string;
  at: string;
  actor_email: string | null;
  actor_name: string | null;
  actor_role: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  target_label: string | null;
  outcome: string;
  ip_address: string | null;
  detail: string | null;
  changes: FieldChange[] | null;
}

function toEvent(row: AuditRow): AuditEvent {
  return {
    id: row.id,
    at: row.at,
    actorEmail: row.actor_email,
    actorName: row.actor_name,
    actorRole: row.actor_role,
    action: row.action,
    targetType: row.target_type,
    targetId: row.target_id,
    targetLabel: row.target_label,
    outcome: row.outcome,
    ipAddress: row.ip_address,
    detail: row.detail,
    changes: Array.isArray(row.changes) ? row.changes : [],
  };
}

const MAX_PAGE = 500;

export async function queryAudit(
  query: AuditQuery
): Promise<{ events: AuditEvent[]; total: number }> {
  const limit = Math.min(Math.max(query.limit ?? 50, 1), MAX_PAGE);
  const offset = Math.max(query.offset ?? 0, 0);

  try {
    let request = getSupabase()
      .from(TABLE)
      .select("*", { count: "exact" })
      .order("at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (query.actor) request = request.ilike("actor_email", `%${query.actor}%`);
    if (query.action) request = request.eq("action", query.action);
    if (query.outcome) request = request.eq("outcome", query.outcome);
    if (query.from) request = request.gte("at", query.from);
    if (query.to) request = request.lte("at", query.to);
    if (query.search) {
      const term = `%${query.search}%`;
      request = request.or(
        `target_label.ilike.${term},detail.ilike.${term},actor_name.ilike.${term}`
      );
    }

    const { data, error, count } = await request;
    if (error || !Array.isArray(data)) return { events: [], total: 0 };
    return { events: (data as AuditRow[]).map(toEvent), total: count ?? data.length };
  } catch {
    return { events: [], total: 0 };
  }
}

/** The distinct actions present, so the filter offers only what exists. */
export async function listAuditActions(): Promise<string[]> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("action")
      .order("action", { ascending: true })
      .limit(MAX_PAGE);
    if (error || !Array.isArray(data)) return [];
    return [...new Set((data as { action: string }[]).map((r) => r.action))];
  } catch {
    return [];
  }
}
