import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import TechStackPageClient from "./TechStackPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/tech-stack" });
}

export default async function Page() {
  const [settings, tech] = await Promise.all([
    getSiteSettings(),
    getContent("tech-stack"),
  ]);

  const techCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Divanex Enterprise Production Tech Stack & Architecture Blueprints",
    "description": "Comprehensive index of production frameworks, distributed databases, cloud DevOps infrastructure, and AI models utilized by Divanex engineering pods.",
    "url": `${settings.siteUrl}/tech-stack`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tech.slice(0, 30).map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "description": item.description,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            techCollectionSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Tech Stack", path: "/tech-stack" },
            ])
          ),
        }}
      />
      <TechStackPageClient tech={tech} />
    </>
  );
}

