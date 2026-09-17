import { ok, serverError } from "@/lib/api";
import { getCurrentAdmin, noStore } from "@/lib/guard";
import { NextResponse } from "next/server";
import { ROLE_LABELS, permissionsFor } from "@/lib/permissions";

/**
 * Who the console is talking to.
 *
 * The browser needs the role to decide what to draw — which tabs exist, which
 * buttons are disabled. That is presentation, not access control: the same
 * permissions are enforced again on every route, because a hidden button is
 * only hidden.
 *
 * The permission list is sent rather than the role alone so the client does not
 * carry a second copy of the matrix that can drift from this one.
 */
export async function GET() {
  try {
    const admin = await getCurrentAdmin();

    if (!admin) {
      return noStore(
        NextResponse.json({ success: false, error: "Not signed in." }, { status: 401 })
      );
    }

    return noStore(
      ok({
        user: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          roleLabel: ROLE_LABELS[admin.role],
          lastLoginAt: admin.lastLoginAt,
        },
        permissions: permissionsFor(admin.role),
      })
    );
  } catch (error) {
    return serverError("auth:session", error);
  }
}
