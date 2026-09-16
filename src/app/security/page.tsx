import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import SecurityPageClient from "./SecurityPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/security" });
}

export default async function Page() {
  const settings = await getSiteSettings();

  const securitySchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Divanex Enterprise Cybersecurity & Compliance Standards",
    "description": "Comprehensive documentation of Divanex's zero-trust architecture, automated SAST/DAST pipelines, SOC 2–aligned security practices, and HIPAA data isolation.",
    "url": `${settings.siteUrl}/security`,
    "mainEntity": {
      "@type": "Organization",
      "name": settings.siteName,
      "url": settings.siteUrl,
      "knowsAbout": [
        "Zero-Trust Network Perimeters",
        "OWASP Top 10 Automated Defenses",
        "SOC 2–Aligned Compliance",
        "HIPAA-Ready Data Privacy Safeguards",
        "ISO/IEC 27001 Information Security",
        "AES-256 GCM & TLS 1.3 Encryption",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            securitySchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Security & Compliance", path: "/security" },
            ])
          ),
        }}
      />
      <SecurityPageClient />
    </>
  );
}

