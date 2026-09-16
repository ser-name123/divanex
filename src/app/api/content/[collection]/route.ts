import { NextResponse } from "next/server";
import { isContentCollection, type ContentCollection, type ContentShapes } from "@/data/siteContent";
import { getContentFresh, resetContent, saveContent } from "@/lib/contentStore";
import { badRequest, readJson, serverError } from "@/lib/api";
import { noStore, requireAdmin } from "@/lib/guard";
import { invalidateSiteSettings } from "@/lib/siteSettingsStore";
import { CACHE_TAGS, purgeTag } from "@/lib/cache";

/**
 * Admin CRUD for editable site content.
 *
 * The public site never calls this — pages read the store directly on the
 * server. It exists so the admin views can stop writing to `localStorage`,
 * where their edits were invisible to every visitor and to every other browser.
 */

/**
 * Site config now supplies the agency's email and phone to the SEO record as
 * well, so a change here has to clear that record too. Without this the
 * schema.org markup would keep serving the previous address until the settings
 * cache expired on its own — and that entry is cached for an hour.
 *
 * The purge lives here rather than in contentStore because contentStore cannot
 * import the settings store without the two importing each other.
 */
function purgeDerivedCaches(collection: ContentCollection): void {
  if (collection !== "site-config") return;
  invalidateSiteSettings();
  purgeTag(CACHE_TAGS.seo);
}

interface RouteContext {
  params: Promise<{ collection: string }>;
}

async function resolveCollection(context: RouteContext): Promise<ContentCollection | null> {
  const { collection } = await context.params;
  return isContentCollection(collection) ? collection : null;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const collection = await resolveCollection(context);
    if (!collection) return badRequest("Unknown content collection.");

    // Deliberately the uncached read: the admin must edit what is actually
    // stored, not a copy that may be up to an hour old.
    const data = await getContentFresh(collection);
    return noStore(NextResponse.json({ success: true, collection, data }));
  } catch (error) {
    return serverError("content:get", error);
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const collection = await resolveCollection(context);
    if (!collection) return badRequest("Unknown content collection.");

    const body = await readJson<{ data?: unknown }>(request);
    if (!body || body.data === undefined) return badRequest("Missing content payload.");

    // A whole collection in one request, so cap it rather than letting an
    // oversized paste become a permanent row.
    const size = JSON.stringify(body.data).length;
    if (size > 1_000_000) {
      return NextResponse.json(
        { success: false, error: "Content payload is too large (limit 1 MB)." },
        { status: 413 }
      );
    }

    const saved = await saveContent(
      collection,
      body.data as ContentShapes[ContentCollection]
    );
    purgeDerivedCaches(collection);

    return noStore(
      NextResponse.json({
        success: true,
        collection,
        data: saved,
        message: "Saved and published. The change is live on the next page load.",
      })
    );
  } catch (error) {
    return serverError("content:put", error);
  }
}

/** Restores a collection to the seed the codebase ships with. */
export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const collection = await resolveCollection(context);
    if (!collection) return badRequest("Unknown content collection.");

    await resetContent(collection);
    purgeDerivedCaches(collection);
    const data = await getContentFresh(collection);

    return noStore(
      NextResponse.json({
        success: true,
        collection,
        data,
        message: "Reset to the built-in defaults.",
      })
    );
  } catch (error) {
    return serverError("content:delete", error);
  }
}
