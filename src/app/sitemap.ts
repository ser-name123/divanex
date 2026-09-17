import type { MetadataRoute } from "next";
import { getContent } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import {
  collectSitemapCandidates,
  decideExtraUrls,
  decideSitemap,
  toSitemapEntries,
} from "@/lib/sitemapEntries";

/**
 * The sitemap.
 *
 * URLs are generated from the same records that drive generateStaticParams, so
 * detail pages cannot silently drop out the way a hand-maintained list does.
 * What an operator controls in the console is applied on top of that — which
 * URLs to drop, what each one claims about itself, and any URL the site does
 * not generate.
 *
 * The decision logic lives in src/lib/sitemapEntries.ts because the admin
 * screen shows the same result. A preview built from a second implementation
 * would eventually disagree with this one, and nobody would know which version
 * search engines were being served.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, sitemapSettings] = await Promise.all([
    getSiteSettings(),
    getContent("sitemap"),
  ]);

  // A site marked noindex should not be advertising URLs either.
  if (settings.discourageSearchEngines) return [];
  if (!sitemapSettings.enabled) return [];

  const candidates = await collectSitemapCandidates();
  const decisions = [
    ...decideSitemap(candidates, sitemapSettings),
    ...decideExtraUrls(sitemapSettings),
  ];

  return toSitemapEntries(decisions, settings.siteUrl);
}
