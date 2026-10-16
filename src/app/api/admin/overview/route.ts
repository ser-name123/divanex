import { ok, serverError } from "@/lib/api";
import { getCurrentAdmin, noStore } from "@/lib/guard";
import { NextResponse } from "next/server";
import { can } from "@/lib/permissions";
import { getOverviewStats } from "@/lib/overviewStats";

/**
 * Counts for the admin overview.
 *
 * The overview tab is open to every role, so this endpoint asks only for a
 * signed-in admin and then assembles the answer from what that admin may
 * actually see: content counts need `content.view`, subscriber numbers need
 * `subscribers.view`, and the recent-changes list needs `audit.view` — the
 * same right the audit screen is behind.
 *
 * Gating the whole endpoint on one permission would have been simpler and
 * wrong in both directions: too strict and a Viewer gets an empty landing
 * page, too loose and an Editor reads the audit trail from a screen nobody
 * thought of as the audit trail.
 *
 * Never cached. A dashboard whose numbers are a few minutes stale is a
 * dashboard that quietly lies about whether the last save worked, and a
 * cached copy could be served to a role the first reader outranked.
 */
export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const stats = await getOverviewStats({
      content: can(admin.role, "content.view"),
      subscribers: can(admin.role, "subscribers.view"),
      audit: can(admin.role, "audit.view"),
    });
    return noStore(ok({ stats }));
  } catch (cause) {
    return serverError("Could not assemble the overview.", cause);
  }
}
