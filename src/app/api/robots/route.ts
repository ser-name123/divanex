import { serverError } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { getContentFresh } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { buildRobots, serialiseRobots } from "@/lib/robotsRules";
import { NextResponse } from "next/server";

/**
 * The robots.txt the site is currently serving, for the console to show.
 *
 * Read-only. Saving goes through /api/content/robots like every other
 * collection, where the permission check and the audit row already live.
 *
 * Reads the session cookie, so it can never be prerendered. Saying so stops the
 * build attempting it and logging the failure as an error.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const check = await requirePermission("content.view");
    if (!check.ok) return check.response;

    // The uncached read: an operator must see what is stored, or their own
    // save appears not to have happened.
    const [settings, robotsSettings] = await Promise.all([
      getSiteSettings(),
      getContentFresh("robots"),
    ]);

    const rules = buildRobots({
      settings: robotsSettings,
      legacyDisallow: settings.robotsDisallow,
      discourageSearchEngines: settings.discourageSearchEngines,
      siteUrl: settings.siteUrl,
    });

    return noStore(
      NextResponse.json({
        success: true,
        settings: robotsSettings,
        preview: serialiseRobots(rules),
        siteUrl: settings.siteUrl,
        // Both come from Search & metadata, and both silently override what
        // this screen offers — an operator deserves to see that here.
        discouraged: settings.discourageSearchEngines,
        legacyDisallow: settings.robotsDisallow || [],
      })
    );
  } catch (error) {
    return serverError("robots:preview", error);
  }
}
