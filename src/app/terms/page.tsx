import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import TermsPageClient from "./TermsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/terms" });
}

export default async function Page() {
  const settings = await getSiteSettings();

  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Divanex Terms of Service & Client Agreement",
    "description": "Client service agreement, milestone deliverable framework, 100% intellectual property transfer, and warranty hypercare terms.",
    "url": `${settings.siteUrl}/terms`,
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
            termsSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Terms of Service", path: "/terms" },
            ])
          ),
        }}
      />
      <TermsPageClient />
    </>
  );
}
