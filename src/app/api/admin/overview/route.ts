import { ok, serverError } from "@/lib/api";
import { requirePermission } from "@/lib/guard";
import { noStore } from "@/lib/guard";
import { getOverviewStats } from "@/lib/overviewStats";

/**
 * Counts for the admin overview.
 *
 * Read with `content.view` rather than a settings permission: these are
 * counts of the content a Viewer is already allowed to read, and locking the
 * landing page of the console behind an editing right would leave a Viewer
 * staring at an empty screen.
 *
 * Never cached. A dashboard whose numbers are a few minutes stale is a
 * dashboard that quietly lies about whether the last save worked.
 */
export async function GET() {
  const check = await requirePermission("content.view");
  if (!check.ok) return check.response;

  try {
    const stats = await getOverviewStats();
    return noStore(ok({ stats }));
  } catch (cause) {
    return serverError("Could not assemble the overview.", cause);
  }
}
