import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { getCacheConfig } from "@/lib/cacheConfig";
import { CACHE_ENTRIES, CACHE_TAGS, type CacheTag } from "@/data/cacheTags";

export { CACHE_ENTRIES, CACHE_TAGS };
export type { CacheTag };

/**
 * Application cache.
 *
 * Everything the public site reads — site config, testimonials, portfolio,
 * tech stack, blog, SEO settings — goes through here rather than hitting the
 * database on every render. Each entry carries a tag, so saving from the admin
 * console purges exactly the thing that changed instead of waiting for a TTL
 * or flushing everything.
 *
 * Cache Components (`use cache`) is deliberately not enabled: it changes the
 * prerendering rules for the whole app and would require Suspense boundaries
 * around every runtime API, including the authenticated surfaces. The tag-based
 * model here gives the same admin-facing control with no behavioural risk.
 */

/**
 * Reads a value through the cache.
 *
 * When caching is switched off in the admin console the loader runs directly,
 * so the site always serves live data and nothing has to be purged first. That
 * is the switch to reach for while debugging a content problem.
 */
export async function cachedRead<T>(
  key: string,
  tag: CacheTag,
  loader: () => Promise<T>
): Promise<T> {
  const config = await getCacheConfig();

  if (!config.enabled) return loader();

  const ttl = config.ttlSeconds[tag] ?? config.defaultTtlSeconds;

  // The key list has to include the TTL: unstable_cache keys its entry on
  // these values, so without it a TTL change would keep serving the old entry
  // under the old lifetime.
  return unstable_cache(loader, [key, tag, String(ttl)], {
    tags: [tag],
    revalidate: ttl,
  })();
}

/**
 * Routes whose rendered HTML depends on each entry.
 *
 * `revalidateTag` invalidates the *data* cache, not the prerendered HTML of a
 * statically generated route. Without this map an admin could save, watch the
 * row land in Postgres, and still be served the old page — which is exactly
 * what happened the first time this ran against a real database.
 *
 * `"layout"` means the segment and everything under it.
 */
const TAG_ROUTES: Record<CacheTag, Array<[string, ("page" | "layout")?]>> = {
  // Navbar, hero and footer render on every page.
  [CACHE_TAGS.siteConfig]: [["/", "layout"]],
  // Titles, canonicals and structured data are on every page too.
  [CACHE_TAGS.seo]: [["/", "layout"]],
  [CACHE_TAGS.testimonials]: [["/"], ["/testimonials"]],
  [CACHE_TAGS.portfolio]: [["/"], ["/portfolio"]],
  [CACHE_TAGS.techStack]: [["/"], ["/tech-stack"]],
  [CACHE_TAGS.blog]: [["/blog", "layout"]],
  [CACHE_TAGS.services]: [["/"], ["/services", "layout"]],
  // The header and footer render on every page.
  [CACHE_TAGS.navigation]: [["/", "layout"]],
  // Page headers and home sections likewise span the whole site.
  [CACHE_TAGS.pages]: [["/", "layout"]],
  // Sections belong to individual pages, but the record is shared.
  [CACHE_TAGS.sections]: [["/", "layout"]],
  // Only the thank-you page renders from it.
  [CACHE_TAGS.forms]: [["/thank-you"]],
  // Admin-only; nothing public renders it.
  [CACHE_TAGS.integrations]: [],
};

/**
 * Purges one entry, and the pages built from it.
 *
 * `{ expire: 0 }` rather than a stale-while-revalidate profile: an admin who
 * presses Clear expects the old value gone now, not served for another window
 * while a rebuild happens behind it.
 */
export function purgeTag(tag: CacheTag): void {
  revalidateTag(tag, { expire: 0 });
  for (const [path, type] of TAG_ROUTES[tag] ?? []) {
    revalidatePath(path, type);
  }
}

/** Purges everything the site caches, including every rendered page. */
export function purgeAll(): void {
  for (const entry of CACHE_ENTRIES) revalidateTag(entry.tag, { expire: 0 });
  revalidatePath("/", "layout");
}
