import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

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
