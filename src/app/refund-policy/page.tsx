import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import LegalDocumentView from "@/components/legal/LegalDocumentView";
import { getContent } from "@/lib/contentStore";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/refund-policy" });
}

export default async function Page() {
  const [settings, legal] = await Promise.all([getSiteSettings(), getContent("legal")]);

  const refundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Divanex Milestone, Cancellation & Refund Policy",
    "description": "Clear sprint milestone acceptance criteria, deposit terms, phase exit protocols, and 60-day post-launch warranty hypercare.",
    "url": `${settings.siteUrl}/refund-policy`,
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
            refundSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Refund & Cancellation Policy", path: "/refund-policy" },
            ])
          ),
        }}
      />
      <LegalDocumentView route="/refund-policy" document={legal["refund-policy"]} />
    </>
  );
}
