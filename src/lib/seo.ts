import type { Metadata } from "next";
import { absoluteUrl, getSiteSettings, pageSeo } from "@/lib/siteSettingsStore";
import type { SiteSettings } from "@/data/siteSettings";
import { toJsonLd } from "@/lib/blogMarkdown";

/**
 * Metadata builders.
 *
 * Two rules this exists to enforce:
 *
 *   1. Every indexable page declares its own canonical. The root layout used to
 *      set `alternates.canonical` to the homepage, and Next merges that into
 *      every page that does not override it — so a dozen pages were telling
 *      Google they were duplicates of the homepage and asking to be dropped
 *      from the index.
 *   2. Titles, descriptions and social images come from the settings record,
 *      not from literals in page files, so the admin console can change them.
 */

interface PageMetadataInput {
  /** Route path, e.g. "/services". Used for the canonical and the settings lookup. */
  path: string;
  /** Overrides the stored title, for detail pages built from their own record. */
  title?: string;
  description?: string;
  keywords?: string[] | string;
  ogImage?: string;
  /** "article" for blog posts, so social cards render as articles. */
  type?: "website" | "article";
  publishedTime?: string;
  authorName?: string;
  noIndex?: boolean;
}

export async function buildPageMetadata(input: PageMetadataInput): Promise<Metadata> {
  const settings = await getSiteSettings();
  const stored = pageSeo(settings, input.path);

  const title = input.title ?? stored.title;
  const description = input.description ?? stored.description;
  const keywords = input.keywords ?? settings.keywords;
  const canonical = absoluteUrl(settings, input.path);
  const image = absoluteUrl(settings, input.ogImage || stored.ogImage || settings.defaultOgImage);

  // A staging flag or a per-page toggle both have to win over the default.
  const noIndex = settings.discourageSearchEngines || input.noIndex || stored.noIndex || false;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.siteName,
      locale: settings.locale,
      type: input.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.authorName ? { authors: [input.authorName] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: settings.twitterHandle,
    },
  };
}

// ---------------------------------------------------------------------------
// Structured data
// ---------------------------------------------------------------------------

/** The publishing entity. Feeds the knowledge panel and every `publisher` field. */
/**
 * The postal address, with the parts that are not set left out.
 *
 * Every field used to be emitted whether or not it held anything, so an
 * address published as a city only still shipped `"streetAddress": ""` and
 * `"postalCode": ""` to search engines. An empty string is not the same as an
 * absent field: it asserts the value is blank rather than unstated.
 */
function postalAddress(settings: SiteSettings) {
  const parts: Record<string, string> = {
    streetAddress: settings.streetAddress,
    addressLocality: settings.addressLocality,
    addressRegion: settings.addressRegion,
    postalCode: settings.postalCode,
    addressCountry: settings.addressCountry,
  };

  const present = Object.fromEntries(
    Object.entries(parts).filter(([, value]) => typeof value === "string" && value.trim())
  );

  return { "@type": "PostalAddress", ...present };
}

export function organizationSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${settings.siteUrl}/#organization`,
    name: settings.siteName,
    legalName: settings.legalName,
    url: settings.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(settings, settings.logoUrl),
    },
    foundingDate: settings.foundingYear,
    email: settings.contactEmail,
    telephone: settings.contactPhone,
    address: postalAddress(settings),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: settings.contactEmail,
        telephone: settings.contactPhone,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: settings.socialProfiles.filter(Boolean),
  };
}

/** The site itself, with the sitelinks search box. */
export function webSiteSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${settings.siteUrl}/#website`,
    name: settings.siteName,
    url: settings.siteUrl,
    description: settings.defaultDescription,
    publisher: { "@id": `${settings.siteUrl}/#organization` },
    inLanguage: settings.locale.replace("_", "-"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${settings.siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Breadcrumb trail. Google renders this in place of the raw URL in results, so
 * a detail page shows "Services › SaaS Development" instead of a path.
 */
export function breadcrumbSchema(
  settings: SiteSettings,
  trail: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(settings, crumb.path),
    })),
  };
}

export function faqSchema(entries: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

/** Renders one or more schema objects into a single escaped script payload. */
export function jsonLdScript(...schemas: unknown[]): string {
  return toJsonLd(schemas.length === 1 ? schemas[0] : schemas);
}
