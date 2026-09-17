import { NextResponse } from "next/server";
import type { PageSeo, SiteSettings } from "@/data/siteSettings";
import {
  getSiteSettings,
  invalidateSiteSettings,
  saveSiteSettings,
} from "@/lib/siteSettingsStore";
import { badRequest, cleanString, cleanText, readJson, serverError, toStringArray } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { diffObjects, recordAudit } from "@/lib/auditStore";
import { clientIp } from "@/lib/rate-limit";
import { safeHttpUrl } from "@/lib/security";

/**
 * Site settings, including everything the SEO layer reads.
 *
 * GET is admin-only. The settings are consumed server-side during metadata
 * generation, so nothing public needs to fetch them, and the record carries
 * verification tokens and indexing state that should not be handed out.
 */
export async function GET() {
  try {
    const check = await requirePermission("settings.view");
    if (!check.ok) return check.response;

    const settings = await getSiteSettings();
    return noStore(NextResponse.json({ success: true, settings }));
  } catch (error) {
    return serverError("site-settings:get", error);
  }
}

/** Per-page SEO, length-capped so a title cannot be pasted in at essay length. */
function sanitizePages(raw: unknown): Record<string, PageSeo> | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;

  const pages: Record<string, PageSeo> = {};
  for (const [path, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!path.startsWith("/") || path.length > 200) continue;
    if (!value || typeof value !== "object") continue;

    const entry = value as Partial<PageSeo>;
    const title = cleanString(entry.title, 120);
    if (!title) continue;

    pages[path] = {
      title,
      description: cleanText(entry.description, 320),
      ogImage: safeHttpUrl(entry.ogImage) || undefined,
      noIndex: Boolean(entry.noIndex),
    };
  }
  return pages;
}

export async function PUT(request: Request) {
  try {
    const check = await requirePermission("settings.edit");
    if (!check.ok) return check.response;

    const body = await readJson<Partial<SiteSettings>>(request);
    if (!body) return badRequest("Invalid request body.");

    // The canonical origin decides every absolute URL on the site, including
    // the sitemap and every canonical tag, so a malformed value here would
    // quietly break indexing everywhere.
    const siteUrl = body.siteUrl === undefined ? undefined : safeHttpUrl(body.siteUrl);
    if (body.siteUrl !== undefined && !siteUrl) {
      return badRequest("Site URL must be a valid http(s) address, for example https://divanextechnologies.com");
    }

    const patch: Partial<SiteSettings> = {
      ...(siteUrl ? { siteUrl: siteUrl.replace(/\/+$/, "") } : {}),
      ...(body.siteName !== undefined && { siteName: cleanString(body.siteName, 80) }),
      ...(body.defaultTitle !== undefined && { defaultTitle: cleanString(body.defaultTitle, 120) }),
      ...(body.titleTemplate !== undefined && {
        titleTemplate: cleanString(body.titleTemplate, 80) || "%s",
      }),
      ...(body.defaultDescription !== undefined && {
        defaultDescription: cleanText(body.defaultDescription, 320),
      }),
      ...(body.keywords !== undefined && { keywords: toStringArray(body.keywords, 30, 80) }),
      ...(body.defaultOgImage !== undefined && {
        // Allows the generated /opengraph-image route as well as an uploaded URL.
        defaultOgImage: cleanString(body.defaultOgImage, 500) || "/opengraph-image",
      }),
      ...(body.twitterHandle !== undefined && {
        twitterHandle: cleanString(body.twitterHandle, 40),
      }),
      ...(body.locale !== undefined && { locale: cleanString(body.locale, 20) }),

      ...(body.legalName !== undefined && { legalName: cleanString(body.legalName, 120) }),
      ...(body.logoUrl !== undefined && { logoUrl: cleanString(body.logoUrl, 500) }),
      ...(body.foundingYear !== undefined && { foundingYear: cleanString(body.foundingYear, 10) }),
      ...(body.contactEmail !== undefined && { contactEmail: cleanString(body.contactEmail, 254) }),
      ...(body.contactPhone !== undefined && { contactPhone: cleanString(body.contactPhone, 40) }),
      ...(body.streetAddress !== undefined && {
        streetAddress: cleanString(body.streetAddress, 200),
      }),
      ...(body.addressLocality !== undefined && {
        addressLocality: cleanString(body.addressLocality, 100),
      }),
      ...(body.addressRegion !== undefined && {
        addressRegion: cleanString(body.addressRegion, 100),
      }),
      ...(body.postalCode !== undefined && { postalCode: cleanString(body.postalCode, 20) }),
      ...(body.addressCountry !== undefined && {
        addressCountry: cleanString(body.addressCountry, 10),
      }),
      ...(body.socialProfiles !== undefined && {
        socialProfiles: toStringArray(body.socialProfiles, 12, 300)
          .map((url) => safeHttpUrl(url))
          .filter(Boolean),
      }),

      ...(body.discourageSearchEngines !== undefined && {
        discourageSearchEngines: Boolean(body.discourageSearchEngines),
      }),
      ...(body.robotsDisallow !== undefined && {
        robotsDisallow: toStringArray(body.robotsDisallow, 30, 200).filter((p) =>
          p.startsWith("/")
        ),
      }),

      ...(body.googleSiteVerification !== undefined && {
        googleSiteVerification: cleanString(body.googleSiteVerification, 200),
      }),
      ...(body.bingSiteVerification !== undefined && {
        bingSiteVerification: cleanString(body.bingSiteVerification, 200),
      }),
    };

    const pages = sanitizePages(body.pages);
    if (pages) patch.pages = pages;

    // Read first, so the trail can name the fields rather than only the save.
    const previous = await getSiteSettings();

    const settings = await saveSiteSettings(patch);

    await recordAudit({
      actor: { email: check.admin.email, name: check.admin.name, role: check.admin.role },
      action: "settings.updated",
      targetType: "site_settings",
      targetId: "site",
      targetLabel: "Search & metadata",
      ip: clientIp(request),
      changes: diffObjects(
        previous as unknown as Record<string, unknown>,
        settings as unknown as Record<string, unknown>
      ),
    });
    // Metadata is generated from the cached copy, so the next render has to
    // read the new row rather than the one from a moment ago.
    invalidateSiteSettings();

    return noStore(
      NextResponse.json({
        success: true,
        settings,
        message: "Site settings saved. Search metadata updates on the next page render.",
      })
    );
  } catch (error) {
    return serverError("site-settings:put", error);
  }
}
