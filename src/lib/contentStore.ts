import { getSupabase } from "@/lib/supabase";
import { cachedRead, purgeTag } from "@/lib/cache";
import {
  CONTENT_COLLECTIONS,
  collectionTag,
  mergesWithSeed,
  type ContentCollection,
  type ContentShapes,
} from "@/data/siteContent";

/**
 * Storage for admin-editable site content.
 *
 * One table, one row per collection, payload as JSONB — the same shape as
 * site_settings. Adding a collection needs a entry in CONTENT_COLLECTIONS and
 * nothing else: no migration, no new route, no new store.
 *
 * Reads go through the cache so a page render is a memory lookup rather than a
 * round trip, and writes purge the matching tag so an edit is live immediately.
 */

const TABLE = "site_content";

/** Survives a database outage, and serves a machine with no database at all. */
declare global {
  var __DIVANEX_CONTENT_FALLBACK__: Map<string, unknown> | undefined;
}

function fallback(): Map<string, unknown> {
  if (!globalThis.__DIVANEX_CONTENT_FALLBACK__) {
    globalThis.__DIVANEX_CONTENT_FALLBACK__ = new Map();
  }
  return globalThis.__DIVANEX_CONTENT_FALLBACK__;
}

/**
 * Reads already in flight, keyed by collection.
 *
 * A build prerenders a hundred-odd detail pages, and every one of them reads
 * the same few collections. Without this each render opened its own round trip
 * to Postgres and the slowest pages timed out; sharing the promise turns a
 * burst of identical reads into one.
 */
declare global {
  var __DIVANEX_CONTENT_INFLIGHT__: Map<string, Promise<unknown>> | undefined;
}

function inflight(): Map<string, Promise<unknown>> {
  if (!globalThis.__DIVANEX_CONTENT_INFLIGHT__) {
    globalThis.__DIVANEX_CONTENT_INFLIGHT__ = new Map();
  }
  return globalThis.__DIVANEX_CONTENT_INFLIGHT__;
}

function loadFromSource<K extends ContentCollection>(
  collection: K
): Promise<ContentShapes[K]> {
  const pending = inflight().get(collection);
  if (pending) return pending as Promise<ContentShapes[K]>;

  const request = fetchFromSource(collection).finally(() => {
    inflight().delete(collection);
  });
  inflight().set(collection, request);
  return request;
}

/**
 * Fills in keys a stored row does not have.
 *
 * Only for the fixed-shape collections. Every time a field is added to site
 * config, navigation or page content, every row already in the database is one
 * key short — and the component reading it renders `undefined.something` and
 * throws. One level deep is enough: the nested values are whole sections that
 * an edit replaces outright.
 */
function withSeedDefaults<K extends ContentCollection>(
  collection: K,
  stored: unknown
): ContentShapes[K] {
  const seed = CONTENT_COLLECTIONS[collection].seed;

  if (
    !mergesWithSeed(collection) ||
    typeof stored !== "object" ||
    stored === null ||
    Array.isArray(stored)
  ) {
    return stored as ContentShapes[K];
  }

  return { ...(seed as object), ...(stored as object) } as ContentShapes[K];
}

async function fetchFromSource<K extends ContentCollection>(
  collection: K
): Promise<ContentShapes[K]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from(TABLE)
      .select("payload")
      .eq("id", collection)
      .maybeSingle();

    if (!error && data?.payload !== undefined && data.payload !== null) {
      fallback().set(collection, data.payload);
      return withSeedDefaults(collection, data.payload);
    }
  } catch {
    // Fall through to whatever is in memory, then to the seed.
  }

  const cached = fallback().get(collection);
  if (cached !== undefined) return withSeedDefaults(collection, cached);

  return CONTENT_COLLECTIONS[collection].seed as ContentShapes[K];
}

/** Cached read. Use this everywhere the site renders content. */
export async function getContent<K extends ContentCollection>(
  collection: K
): Promise<ContentShapes[K]> {
  return cachedRead(`content:${collection}`, collectionTag(collection), () =>
    loadFromSource(collection)
  );
}

/** Uncached read, for the admin console editing the record itself. */
export async function getContentFresh<K extends ContentCollection>(
  collection: K
): Promise<ContentShapes[K]> {
  return loadFromSource(collection);
}

export async function saveContent<K extends ContentCollection>(
  collection: K,
  payload: ContentShapes[K]
): Promise<ContentShapes[K]> {
  fallback().set(collection, payload);

  try {
    const supabase = getSupabase();
    await supabase
      .from(TABLE)
      .upsert({ id: collection, payload, updated_at: new Date().toISOString() });
  } catch {
    // Supabase is optional; the in-memory copy still serves this process.
  }

  // The edit is live on the next render rather than after the TTL expires.
  purgeTag(collectionTag(collection));

  return payload;
}

/** Drops the stored record so the collection falls back to its seed. */
export async function resetContent<K extends ContentCollection>(collection: K): Promise<void> {
  fallback().delete(collection);

  try {
    const supabase = getSupabase();
    await supabase.from(TABLE).delete().eq("id", collection);
  } catch {
    // Supabase is optional.
  }

  purgeTag(collectionTag(collection));
}
