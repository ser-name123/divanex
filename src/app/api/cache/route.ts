import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { CACHE_ENTRIES, purgeAll, purgeTag, type CacheTag } from "@/lib/cache";
import { clampTtl, getCacheConfig, saveCacheConfig } from "@/lib/cacheConfig";
import { badRequest, cleanString, readJson, serverError } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { recordAudit } from "@/lib/auditStore";
import { clientIp } from "@/lib/rate-limit";
import { recordAuthEvent } from "@/lib/auditLog";

/**
 * Cache administration.
 *
 * GET  — current state and the list of purgeable entries.
 * PUT  — turn caching on or off, and set lifetimes.
 * POST — purge: one entry, everything, or a single URL path.
 */

const VALID_TAGS = new Set<string>(CACHE_ENTRIES.map((entry) => entry.tag));

export async function GET() {
  try {
    const check = await requirePermission("settings.view");
    if (!check.ok) return check.response;

    const config = await getCacheConfig();
    return noStore(
      NextResponse.json({
        success: true,
        config,
        entries: CACHE_ENTRIES.map((entry) => ({
          ...entry,
          ttlSeconds: config.ttlSeconds[entry.tag] ?? config.defaultTtlSeconds,
        })),
      })
    );
  } catch (error) {
    return serverError("cache:get", error);
  }
}

export async function PUT(request: Request) {
  try {
    const check = await requirePermission("settings.edit");
    if (!check.ok) return check.response;

    const body = await readJson<{
      enabled?: unknown;
      defaultTtlSeconds?: unknown;
      ttlSeconds?: Record<string, unknown>;
    }>(request);
    if (!body) return badRequest("Invalid request body.");

    const ttlSeconds: Record<string, number> = {};
    if (body.ttlSeconds && typeof body.ttlSeconds === "object") {
      for (const [tag, value] of Object.entries(body.ttlSeconds)) {
        if (!VALID_TAGS.has(tag)) continue;
        const ttl = clampTtl(value);
        if (ttl !== undefined) ttlSeconds[tag] = ttl;
      }
    }

    const wasEnabled = (await getCacheConfig()).enabled;
    const config = await saveCacheConfig({
      ...(body.enabled !== undefined && { enabled: Boolean(body.enabled) }),
      ...(body.defaultTtlSeconds !== undefined && {
        defaultTtlSeconds: clampTtl(body.defaultTtlSeconds),
      }),
      ...(Object.keys(ttlSeconds).length > 0 && { ttlSeconds }),
    });

    // Entries written under the old settings would otherwise keep being served
    // with the old lifetime until they expired on their own.
    purgeAll();

    const message =
      body.enabled !== undefined && Boolean(body.enabled) !== wasEnabled
        ? Boolean(body.enabled)
          ? "Caching enabled. Pages will be served from cache."
          : "Caching disabled. Every request now reads live data."
        : "Cache settings saved and existing entries purged.";

    return noStore(NextResponse.json({ success: true, config, message }));
  } catch (error) {
    return serverError("cache:put", error);
  }
}

export async function POST(request: Request) {
  try {
    const check = await requirePermission("settings.edit");
    if (!check.ok) return check.response;

    const body = await readJson<{ action?: unknown; tag?: unknown; path?: unknown }>(request);
    if (!body) return badRequest("Invalid request body.");

    const action = cleanString(body.action, 40);

    if (action === "purge-all") {
      purgeAll();
      const config = await saveCacheConfig({ lastPurgedAt: new Date().toISOString() });
      recordAuthEvent({
        type: "admin.cache.purged",
        outcome: "success",
        detail: "all entries",
      });
      await recordAudit({
        actor: { email: check.admin.email, name: check.admin.name, role: check.admin.role },
        action: "cache.purged",
        targetType: "cache",
        targetId: "all",
        targetLabel: "Every cached entry",
        ip: clientIp(request),
      });
      return noStore(
        NextResponse.json({
          success: true,
          config,
          message: "Every cached entry was purged. The next request rebuilds them.",
        })
      );
    }

    if (action === "purge-tag") {
      const tag = cleanString(body.tag, 80);
      if (!VALID_TAGS.has(tag)) return badRequest("Unknown cache entry.");
      purgeTag(tag as CacheTag);
      const config = await saveCacheConfig({ lastPurgedAt: new Date().toISOString() });
      return noStore(
        NextResponse.json({ success: true, config, message: "Entry purged." })
      );
    }

    if (action === "purge-path") {
      const path = cleanString(body.path, 300);
      // A path purge takes a site route, not an arbitrary string; anything else
      // would either do nothing or purge something the caller did not mean to.
      if (!path.startsWith("/") || path.includes("..")) {
        return badRequest("Path must be a site route, for example /blog.");
      }
      revalidatePath(path);
      const config = await saveCacheConfig({ lastPurgedAt: new Date().toISOString() });
      return noStore(
        NextResponse.json({ success: true, config, message: `Purged ${path}.` })
      );
    }

    return badRequest("Unsupported cache action.");
  } catch (error) {
    return serverError("cache:post", error);
  }
}
