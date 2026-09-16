import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import PortfolioPageClient from "./PortfolioPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/portfolio" });
}

export default async function Page() {
  const [settings, projects, caseStudies] = await Promise.all([
    getSiteSettings(),
    getContent("portfolio"),
    getContent("case-studies"),
  ]);

  const portfolioCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Divanex Enterprise Case Studies, Architecture Blueprints & Portfolio",
    "description": "Verified case studies documenting architectural execution, measured ROI metrics, and business outcomes across healthcare, fintech, multi-tenant SaaS, and logistics.",
    "url": `${settings.siteUrl}/portfolio`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": Object.values(caseStudies).map((cs, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": cs.title,
        "description": cs.metaDescription,
        "url": `${settings.siteUrl}/portfolio/${cs.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            portfolioCollectionSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/portfolio" },
            ])
          ),
        }}
      />
      <PortfolioPageClient projects={projects} />
    </>
  );
}

