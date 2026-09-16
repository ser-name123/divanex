import { getSupabase } from "@/lib/supabase";
import { CACHE_TAGS, cachedRead, purgeTag } from "@/lib/cache";
import { getContent } from "@/lib/contentStore";
import {
  DEFAULT_SITE_SETTINGS,
  type PageSeo,
  type SiteSettings,
} from "@/data/siteSettings";

/**
 * Persistence for site settings.
 *
 * Follows the same shape as blogStore: read through to Supabase when it is
 * configured, fall back to an in-process copy otherwise, so the site renders
 * correctly on a machine with no database.
 *
 * Everything here runs during metadata generation, which happens on every
 * request for dynamic routes and at build time for static ones, so reads are
 * cached for a few seconds rather than hitting the database per page.
 */

const SETTINGS_ROW_ID = "global";
const CACHE_TTL_MS = 30_000;

interface CacheState {
  value: SiteSettings;
  fetchedAt: number;
}

declare global {
  var __DIVANEX_SITE_SETTINGS__: CacheState | undefined;
}

/** Fills in anything a stored record is missing, so new fields never break an old row. */
function withDefaults(partial: Partial<SiteSettings> | null | undefined): SiteSettings {
  if (!partial) return DEFAULT_SITE_SETTINGS;

  const pages: Record<string, PageSeo> = { ...DEFAULT_SITE_SETTINGS.pages };
  if (partial.pages && typeof partial.pages === "object") {
    for (const [path, seo] of Object.entries(partial.pages)) {
      if (seo && typeof seo.title === "string") pages[path] = seo;
    }
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...partial,
    // A trailing slash would produce "https://example.com//services".
    siteUrl: normalizeUrl(partial.siteUrl) || DEFAULT_SITE_SETTINGS.siteUrl,
    keywords: Array.isArray(partial.keywords) ? partial.keywords : DEFAULT_SITE_SETTINGS.keywords,
    socialProfiles: Array.isArray(partial.socialProfiles)
      ? partial.socialProfiles
      : DEFAULT_SITE_SETTINGS.socialProfiles,
    robotsDisallow: Array.isArray(partial.robotsDisallow)
      ? partial.robotsDisallow
      : DEFAULT_SITE_SETTINGS.robotsDisallow,
    pages,
  };
}

function normalizeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return "";
    return trimmed;
  } catch {
    return "";
  }
}

/**
 * Where this deployment is actually reachable.
 *
 * `og:image` is an absolute URL, so a link preview is fetched from whatever
 * host this resolves to — not from the page the link points at. When the two
 * disagree, the title and description still appear (they are read straight out
 * of the page) and only the image silently fails, which is exactly how this
 * shipped: the stored URL was a domain that answered 500 while the site itself
 * was served from somewhere else.
 *
 * So the environment wins over the stored setting. A preview deployment, a
 * staging host and production each declare their own origin and none of them
 * can inherit a canonical URL that is wrong for them.
 */
function deploymentUrl(): string {
  const explicit = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;

  // Set automatically on Vercel, so a fresh deploy has working previews with
  // no configuration at all.
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return vercel ? normalizeUrl(`https://${vercel}`) : "";
}

/**
 * Fills the agency's contact details from the site content record.
 *
 * These lived in two places: the visible email and phone on the contact page
 * came from site config, while the ones in the schema.org markup — the pair
 * search engines actually read — came from here. Changing one left the other
 * behind, so the address Google showed could be one nobody had used for years,
 * and nothing on screen ever hinted at it.
 *
 * Site config wins. This record keeps the fields so an existing stored row
 * still typechecks, but they are no longer editable and no longer consulted
 * unless site config leaves them blank.
 */
async function withSharedContactDetails(value: SiteSettings): Promise<SiteSettings> {
  try {
    const config = await getContent("site-config");
    return {
      ...value,
      contactEmail: config.contactEmail?.trim() || value.contactEmail,
      contactPhone: config.contactPhone?.trim() || value.contactPhone,
    };
  } catch {
    // Content store unavailable: the stored SEO values still answer.
    return value;
  }
}

async function loadSiteSettings(): Promise<SiteSettings> {
  const cached = globalThis.__DIVANEX_SITE_SETTINGS__;
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) return cached.value;

  let value = cached?.value ?? DEFAULT_SITE_SETTINGS;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("site_settings")
      .select("payload")
      .eq("id", SETTINGS_ROW_ID)
      .maybeSingle();

    if (!error && data?.payload) {
      value = withDefaults(data.payload as Partial<SiteSettings>);
    }
  } catch {
    // No database configured: keep whatever is in memory.
  }

  value = await withSharedContactDetails(value);

  // Applied here rather than inside withDefaults, because not every path above
  // goes through it: a database that is unreachable, or that holds no row yet,
  // leaves the seed untouched, and that branch needs the override just as much.
  const fromEnv = deploymentUrl();
  if (fromEnv && fromEnv !== value.siteUrl) value = { ...value, siteUrl: fromEnv };

  globalThis.__DIVANEX_SITE_SETTINGS__ = { value, fetchedAt: Date.now() };
  return value;
}

/**
 * Settings as the site renders them.
 *
 * Goes through the shared cache, so this is a memory read on the hot path and
 * the admin console can purge it from the cache panel like any other entry.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return cachedRead("site-settings", CACHE_TAGS.seo, loadSiteSettings);
}

export async function saveSiteSettings(
  patch: Partial<SiteSettings>
): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const merged = withDefaults({ ...current, ...patch });

  // Written to memory first so a deployment without a database still reflects
  // the change for as long as the process lives.
  globalThis.__DIVANEX_SITE_SETTINGS__ = { value: merged, fetchedAt: Date.now() };

  try {
    const supabase = getSupabase();
    await supabase
      .from("site_settings")
      .upsert({ id: SETTINGS_ROW_ID, payload: merged, updated_at: new Date().toISOString() });
  } catch {
    // Supabase is optional.
  }

  // The edit has to be visible on the next render, not after the TTL.
  purgeTag(CACHE_TAGS.seo);

  return merged;
}

/** Drops the read cache so the next render sees a fresh row. */
export function invalidateSiteSettings(): void {
  globalThis.__DIVANEX_SITE_SETTINGS__ = undefined;
}

/** Absolute URL for a site-relative path, built from the configured origin. */
export function absoluteUrl(settings: SiteSettings, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${settings.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Per-page SEO with the site defaults filled in. */
export function pageSeo(settings: SiteSettings, path: string): PageSeo {
  return (
    settings.pages[path] ?? {
      title: settings.defaultTitle,
      description: settings.defaultDescription,
    }
  );
}
