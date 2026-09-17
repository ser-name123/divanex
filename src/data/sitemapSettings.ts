/**
 * Operator control over the sitemap.
 *
 * The sitemap itself is generated from the same records that drive the pages,
 * which is what keeps it from silently going stale. This adds a layer on top of
 * that rather than replacing it: an operator can drop a URL, change what a URL
 * claims about itself, or add one the site does not generate — but they cannot
 * hand-maintain the list, because a hand-maintained list is exactly what stops
 * matching the site.
 *
 * Anything absent from the rules falls through to the generated value, so a new
 * page appears on its own and no settings row has to be edited for it.
 */

/** The values search engines accept for `changefreq`. */
export const CHANGE_FREQUENCIES = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
] as const;

export type ChangeFrequency = (typeof CHANGE_FREQUENCIES)[number];

export function isChangeFrequency(value: unknown): value is ChangeFrequency {
  return typeof value === "string" && (CHANGE_FREQUENCIES as readonly string[]).includes(value);
}

/**
 * The groups a URL can belong to, so whole sections can be switched off
 * without listing every URL inside them.
 */
export const SITEMAP_GROUPS = ["pages", "services", "portfolio", "tech", "blog"] as const;
export type SitemapGroup = (typeof SITEMAP_GROUPS)[number];

export const GROUP_LABELS: Record<SitemapGroup, string> = {
  pages: "Main pages",
  services: "Service pages",
  portfolio: "Case studies",
  tech: "Technology pages",
  blog: "Blog posts",
};

/** An operator's override for one generated URL. Every field is optional. */
export interface SitemapRule {
  /** false removes the URL from the sitemap without deleting the page. */
  include?: boolean;
  priority?: number;
  changeFrequency?: ChangeFrequency;
}

/** A URL the site does not generate — a landing page, a hosted doc. */
export interface SitemapExtraUrl {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

export interface SitemapSettings {
  /**
   * Switches the sitemap off entirely. `discourageSearchEngines` already
   * empties it; this is for the case where the site should be indexed but the
   * sitemap is being served from somewhere else.
   */
  enabled: boolean;
  /** Whole sections, on or off. */
  groups: Record<SitemapGroup, boolean>;
  /** Per-URL overrides, keyed by path ("/", "/services/saas-development"). */
  rules: Record<string, SitemapRule>;
  extraUrls: SitemapExtraUrl[];
}

export const DEFAULT_SITEMAP_SETTINGS: SitemapSettings = {
  enabled: true,
  groups: {
    pages: true,
    services: true,
    portfolio: true,
    tech: true,
    blog: true,
  },
  rules: {},
  extraUrls: [],
};

/** Clamps a priority to the 0.0–1.0 the protocol allows, at one decimal. */
export function normalisePriority(value: unknown, fallback: number): number {
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.round(parsed * 10) / 10, 0), 1);
}

/**
 * Normalises a path to the form used as a rule key.
 *
 * Leading slash, no trailing slash, no query or hash — so "/services/" and
 * "/services?x=1" cannot become two rules for one page.
 */
export function normalisePath(value: string): string {
  const raw = String(value || "").trim();
  if (!raw) return "";

  const withoutOrigin = raw.replace(/^https?:\/\/[^/]+/i, "");
  const withoutQuery = withoutOrigin.split(/[?#]/)[0];
  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const trimmed = withSlash.replace(/\/+$/, "");

  return trimmed || "/";
}
