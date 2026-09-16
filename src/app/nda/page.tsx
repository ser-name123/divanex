import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import NdaIpClient from "./NdaIpClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/nda" });
}

export default async function Page() {
  const settings = await getSiteSettings();

  const ndaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Divanex Bilateral NDA & 100% Code Ownership Guarantee",
    "description": "Bilateral NDA protection, Day-1 Git organization transfer, direct cloud infrastructure accounts, and comprehensive intellectual property handover.",
    "url": `${settings.siteUrl}/nda`,
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
            ndaSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "NDA & IP Ownership", path: "/nda" },
            ])
          ),
        }}
      />
      <NdaIpClient />
    </>
  );
}
