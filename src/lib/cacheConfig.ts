import { getSupabase } from "@/lib/supabase";

/**
 * Cache settings.
 *
 * Kept in its own module and read without going through the cache itself —
 * a cache that had to consult a cached value to decide whether it was on could
 * never be switched off. Reads are memoised in process for a few seconds so the
 * switch is effectively free on the hot path.
 */

export interface CacheConfig {
  /** Master switch. Off means every read goes straight to the source. */
  enabled: boolean;
  /** Lifetime used by any entry without its own. */
  defaultTtlSeconds: number;
  /** Per-tag overrides, keyed by cache tag. */
  ttlSeconds: Record<string, number>;
  /** Set whenever the admin console purges, for the "last cleared" readout. */
  lastPurgedAt?: string;
}

export const DEFAULT_CACHE_CONFIG: CacheConfig = {
  enabled: true,
  defaultTtlSeconds: 3600,
  ttlSeconds: {
    "content:site-config": 300,
    "content:seo": 300,
    "content:blog": 600,
    "content:testimonials": 3600,
    "content:portfolio": 3600,
    "content:tech-stack": 3600,
    "content:services": 1800,
    "content:integrations": 300,
  },
};

const ROW_ID = "cache";
const MEMO_TTL_MS = 10_000;

declare global {
  var __DIVANEX_CACHE_CONFIG__: { value: CacheConfig; fetchedAt: number } | undefined;
}

function withDefaults(partial: Partial<CacheConfig> | null | undefined): CacheConfig {
  if (!partial) return DEFAULT_CACHE_CONFIG;
  return {
    enabled: partial.enabled ?? DEFAULT_CACHE_CONFIG.enabled,
    defaultTtlSeconds: clampTtl(partial.defaultTtlSeconds) ?? DEFAULT_CACHE_CONFIG.defaultTtlSeconds,
    ttlSeconds: { ...DEFAULT_CACHE_CONFIG.ttlSeconds, ...(partial.ttlSeconds ?? {}) },
    lastPurgedAt: partial.lastPurgedAt,
  };
}

/** 0 would mean "never cache" and a week is long enough to look broken. */
export function clampTtl(value: unknown): number | undefined {
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(Math.max(Math.round(n), 10), 604800);
}

export async function getCacheConfig(): Promise<CacheConfig> {
  const memo = globalThis.__DIVANEX_CACHE_CONFIG__;
  if (memo && Date.now() - memo.fetchedAt < MEMO_TTL_MS) return memo.value;

  let value = memo?.value ?? DEFAULT_CACHE_CONFIG;

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("site_settings")
      .select("payload")
      .eq("id", ROW_ID)
      .maybeSingle();

    if (!error && data?.payload) value = withDefaults(data.payload as Partial<CacheConfig>);
  } catch {
    // No database configured: keep whatever is in memory.
  }

  globalThis.__DIVANEX_CACHE_CONFIG__ = { value, fetchedAt: Date.now() };
  return value;
}

export async function saveCacheConfig(patch: Partial<CacheConfig>): Promise<CacheConfig> {
  const current = await getCacheConfig();
  const merged = withDefaults({ ...current, ...patch });

  // Memory first, so the change takes effect even with no database attached,
  // and immediately rather than after the memo window.
  globalThis.__DIVANEX_CACHE_CONFIG__ = { value: merged, fetchedAt: Date.now() };

  try {
    const supabase = getSupabase();
    await supabase
      .from("site_settings")
      .upsert({ id: ROW_ID, payload: merged, updated_at: new Date().toISOString() });
  } catch {
    // Supabase is optional.
  }

  return merged;
}
