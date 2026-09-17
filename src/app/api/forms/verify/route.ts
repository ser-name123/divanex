import { NextResponse } from "next/server";
import { ok, serverError } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { verifyMailTransport } from "@/lib/email";

/**
 * Checks that the mail server accepts our credentials.
 *
 * Admin-only, and gated in src/proxy.ts with the rest of /api/forms. Sending
 * is deliberately best-effort everywhere else — a submission must never fail
 * because SMTP is down — which means a misconfigured mailbox is invisible
 * until somebody notices the enquiries stopped arriving. This is the check
 * that makes it visible, and it authenticates without sending anything.
 */
export async function GET() {
  try {
    const check = await requirePermission("settings.view");
    if (!check.ok) return check.response;

    const result = await verifyMailTransport();

    if (!result.success) {
      return noStore(
        NextResponse.json(
          {
            success: false,
            error: result.error || "The mail server refused the connection.",
          },
          { status: 502 }
        )
      );
    }

    return noStore(ok({ message: "The mail server accepted our credentials." }));
  } catch (error) {
    return serverError("forms:verify", error);
  }
}
