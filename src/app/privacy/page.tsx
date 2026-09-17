import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import LegalDocumentView from "@/components/legal/LegalDocumentView";
import { getContent } from "@/lib/contentStore";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/privacy" });
}

export default async function Page() {
  const [settings, legal] = await Promise.all([getSiteSettings(), getContent("legal")]);

  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Divanex Privacy Policy & Data Protection Standards",
    "description": "Comprehensive documentation of Divanex's data privacy commitments: zero sale of client data, AES-256 encryption, strict Row-Level Security, and GDPR/CCPA compliance.",
    "url": `${settings.siteUrl}/privacy`,
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
            privacySchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ])
          ),
        }}
      />
      <LegalDocumentView route="/privacy" document={legal["privacy"]} />
    </>
  );
}
