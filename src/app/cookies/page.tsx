import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import LegalDocumentView from "@/components/legal/LegalDocumentView";
import { getContent } from "@/lib/contentStore";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/cookies" });
}

export default async function Page() {
  const [settings, legal] = await Promise.all([getSiteSettings(), getContent("legal")]);

  const cookieSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Divanex Cookie & Telemetry Policy",
    "description": "Transparent disclosure of essential session storage and privacy-focused performance telemetry with zero third-party cross-site advertising trackers.",
    "url": `${settings.siteUrl}/cookies`,
    "mainEntity": {
      "@type": "Organization",
      "name": settings.siteName,
      "url": settings.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            cookieSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Cookie Policy", path: "/cookies" },
            ])
          ),
        }}
      />
      <LegalDocumentView route="/cookies" document={legal["cookies"]} />
    </>
  );
}
