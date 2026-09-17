import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { can, type Permission } from "@/lib/permissions";
import {
  countAdmins,
  ensureBootstrapOwner,
  getAdminByEmail,
  type AdminUser,
} from "@/lib/adminUserStore";
import { recordAudit } from "@/lib/auditStore";

/**
 * Route-handler authorization guards.
 *
 * These exist *in addition to* the gate in proxy.ts, deliberately. The Next.js
 * docs are explicit that proxy/middleware "should not be used as a full session
 * management or authorization solution" — it is an optimistic check. A matcher
 * typo, a new route added outside the protected prefix list, or a
 * middleware-bypass bug in the framework would otherwise expose a handler
 * completely. Every privileged handler must call its own guard.
 */

/** Responses that must never be stored by a browser, proxy, or CDN. */
export function noStore(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Vary", "Cookie");
  return response;
}

function deny(message: string, status: number): NextResponse {
  return noStore(NextResponse.json({ success: false, error: message }, { status }));
}

/**
 * Admin gate. Returns a 401 response to return immediately, or null when the
 * caller holds a valid admin session.
 *
 *   const denied = await requireAdmin();
 *   if (denied) return denied;
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const store = await cookies();
  const session = verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!session) return deny("Authentication required.", 401);
  return null;
}

/** Admin gate that also hands back the authenticated subject. */
export async function getAdminSession(): Promise<{ sub: string } | null> {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * The admin behind the current session, as a directory record.
 *
 * The session cookie carries only a subject, so the role is read fresh on every
 * privileged request rather than baked into the token. That costs a lookup and
 * buys the thing that matters: demoting or suspending somebody takes effect
 * immediately, instead of when their eight-hour session happens to expire.
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const session = await getAdminSession();
  if (!session?.sub) return null;

  const found = await getAdminByEmail(session.sub);
  if (found) return found.status === "active" ? found : null;

  // No row yet: this is the first request after the directory was introduced,
  // and the environment credentials still name the only operator there is.
  if ((await countAdmins()) === 0) {
    await ensureBootstrapOwner();
    const seeded = await getAdminByEmail(session.sub);
    if (seeded) return seeded.status === "active" ? seeded : null;
  }

  return null;
}

export type PermissionCheck =
  | { ok: true; admin: AdminUser }
  | { ok: false; response: NextResponse };

/**
 * Permission gate for a route handler.
 *
 *   const check = await requirePermission("users.manage");
 *   if (!check.ok) return check.response;
 *   // check.admin is the caller, for the audit trail
 *
 * A refusal is recorded. An attempt to reach something out of reach is exactly
 * the kind of thing the trail exists to show, and it costs one row.
 */
export async function requirePermission(permission: Permission): Promise<PermissionCheck> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return { ok: false, response: deny("Authentication required.", 401) };
  }

  if (!can(admin.role, permission)) {
    void recordAudit({
      actor: { email: admin.email, name: admin.name, role: admin.role },
      action: "admin.permission.denied",
      outcome: "failure",
      detail: `needed ${permission}`,
    });
    return {
      ok: false,
      response: deny("Your role does not allow this action.", 403),
    };
  }

  return { ok: true, admin };
}
