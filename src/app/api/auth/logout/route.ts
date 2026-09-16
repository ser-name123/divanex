import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, adminCookieOptions, verifySessionToken } from "@/lib/auth";
import { revokeToken } from "@/lib/sessionRegistry";
import { recordAuthEvent } from "@/lib/auditLog";
import { noStore } from "@/lib/guard";

/**
 * Signs the operator out.
 *
 * Clearing the cookie alone is not a logout: the token is self-contained and
 * stays valid wherever a copy exists — a shared machine, a proxy log, a
 * clipboard. The token id goes on the revocation list so the server refuses it
 * from here on, whoever presents it.
 */
export async function POST() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  const session = verifySessionToken(raw);

  if (session) {
    revokeToken(session.jti, session.exp);
    recordAuthEvent({ type: "admin.logout", subject: session.sub, outcome: "success" });
  }

  const response = noStore(NextResponse.json({ success: true }));
  response.cookies.set(SESSION_COOKIE, "", adminCookieOptions(0));
  return response;
}
