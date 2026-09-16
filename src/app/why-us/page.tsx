import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import WhyUsPageClient from "./WhyUsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/why-us" });
}

export default async function Page() {
  const settings = await getSiteSettings();

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Why Choose Divanex — Engineering Advantage & Code Ownership",
    "description": "Discover why global enterprises and fast-growing tech startups partner with Divanex: 100% Day-1 IP ownership, senior-only engineering pods, zero technical debt, and milestone-backed SLAs.",
    "url": `${settings.siteUrl}/why-us`,
    "mainEntity": {
      "@type": "Organization",
      "name": settings.siteName,
      "url": settings.siteUrl,
      "slogan": "Next-Gen Digital Solutions & Cloud Architecture",
      "knowsAbout": [
        "Full-Cycle Digital Engineering",
        "Modern Concurrency Tech Stacks",
        "Zero Technical Debt Governance",
        "Enterprise Milestone SLAs",
        "100% Code & IP Ownership",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            aboutSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Why Us", path: "/why-us" },
            ])
          ),
        }}
      />
      <WhyUsPageClient />
    </>
  );
}

