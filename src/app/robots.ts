import type { MetadataRoute } from "next";
import { getContent } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { buildRobots } from "@/lib/robotsRules";

/**
 * robots.txt.
 *
 * The rules are built in src/lib/robotsRules.ts so the console can preview the
 * same file before it is saved. `/admin` and `/api/` are disallowed there
 * unconditionally: the console is behind a session either way, but there is no
 * version of this site where advertising those paths is wanted.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const [settings, robotsSettings] = await Promise.all([
    getSiteSettings(),
    getContent("robots"),
  ]);

  return buildRobots({
    settings: robotsSettings,
    // Still honoured so anything set before this screen existed keeps working.
    legacyDisallow: settings.robotsDisallow,
    discourageSearchEngines: settings.discourageSearchEngines,
    siteUrl: settings.siteUrl,
  });
}
