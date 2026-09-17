import { serverError } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { getContentFresh } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import {
  collectSitemapCandidates,
  decideExtraUrls,
  decideSitemap,
} from "@/lib/sitemapEntries";
import { NextResponse } from "next/server";

/**
 * What the sitemap currently contains, for the console to list.
 *
 * Read-only. Saving goes through /api/content/sitemap like every other
 * collection, which is where the permission check and the audit row already
 * live — a second write path would be a second thing to keep audited.
 *
 * The decisions come from the same module /sitemap.xml uses, so this is the
 * sitemap rather than a description of it.
 */
/**
 * Reads the session cookie, so it can never be prerendered. Saying so here
 * stops the build from attempting it and logging the failure as an error.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const check = await requirePermission("content.view");
    if (!check.ok) return check.response;

    // The uncached read: an operator must see what is stored, not a copy that
    // may be an hour old, or their own save appears not to have happened.
    const [settings, sitemapSettings] = await Promise.all([
      getSiteSettings(),
      getContentFresh("sitemap"),
    ]);

    const candidates = await collectSitemapCandidates();
    const generated = decideSitemap(candidates, sitemapSettings);
    const extras = decideExtraUrls(sitemapSettings);

    const included = [...generated, ...extras].filter((entry) => entry.included).length;

    return noStore(
      NextResponse.json({
        success: true,
        settings: sitemapSettings,
        entries: generated,
        extras,
        baseUrl: settings.siteUrl,
        included,
        total: generated.length + extras.length,
        // The sitemap is empty whatever the settings say when the whole site is
        // marked noindex, and an operator editing this screen deserves to know
        // that before they wonder why nothing is listed.
        discouraged: settings.discourageSearchEngines,
      })
    );
  } catch (error) {
    return serverError("sitemap:list", error);
  }
}
