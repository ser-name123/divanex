import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { getTechSlug } from "@/data/techStack";
import { getTechDetailBySlug, getAllTechSlugs } from "@/data/techDetails";
import { getContent } from "@/lib/contentStore";
import TechDetailPageClient from "./TechDetailPageClient";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";

interface TechPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Every curated page plus every entry in the grid. Both come from the admin
 * console now, and the sitemap derives its list the same way so the two can
 * never drift apart.
 */
export async function generateStaticParams() {
  const [details, grid] = await Promise.all([
    getContent("tech-details"),
    getContent("tech-stack"),
  ]);
  return getAllTechSlugs(details, grid).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TechPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [details, grid] = await Promise.all([
    getContent("tech-details"),
    getContent("tech-stack"),
  ]);
  const techItem = grid.find((t) => (t.slug || getTechSlug(t.name)) === slug);
  const tech = getTechDetailBySlug(slug, techItem, details);

  if (!tech) {
    return { title: "Technology Not Found", robots: { index: false, follow: false } };
  }

  const keywords = [
    tech.name,
    tech.category,
    tech.categoryLabel,
    `${tech.name} Architecture`,
    `${tech.name} Development Agency`,
    "Enterprise Tech Stack",
    "Production System Blueprint",
    "Divanex Frameworks"
  ];

  return buildPageMetadata({
    path: `/tech-stack/${tech.slug}`,
    title: `${tech.name} Enterprise Architecture & Blueprint | Divanex`,
    description: tech.metaDescription,
    keywords,
    type: "article",
  });
}

export default async function TechDetailPage({ params }: TechPageProps) {
  const { slug } = await params;
  const [details, grid] = await Promise.all([
    getContent("tech-details"),
    getContent("tech-stack"),
  ]);
  const techItem = grid.find((t) => (t.slug || getTechSlug(t.name)) === slug);
  const tech = getTechDetailBySlug(slug, techItem, details);

  if (!tech) {
    notFound();
  }

  // Schema.org Structured Data
  const seoSettings = await getSiteSettings();
  const breadcrumbLeafName = tech.name;
  const breadcrumbLeafPath = `/tech-stack/${slug}`;

  const techSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${tech.name} Enterprise Architecture & Production Blueprint`,
    "description": tech.metaDescription,
    "keywords": [tech.name, tech.category, tech.categoryLabel, `${tech.name} Architecture`].join(", "),
    "articleSection": tech.categoryLabel,
    "author": {
      "@type": "Organization",
      "name": `${seoSettings.siteName} Architecture Squad`,
      "url": seoSettings.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": seoSettings.siteName,
      "url": seoSettings.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoSettings.siteUrl}/brand-logo-icon.png`
      }
    },
    "mainEntityOfPage": `${seoSettings.siteUrl}/tech-stack/${tech.slug}`
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            techSchema,
            breadcrumbSchema(seoSettings, [
              { name: "Home", path: "/" },
              { name: "Tech Stack", path: "/tech-stack" },
              { name: breadcrumbLeafName, path: breadcrumbLeafPath },
            ])
          ),
        }}
      />

      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      {/* Global Navigation */}
      <Navbar />

      {/* Interactive 6-Section Advance Tech Details Experience */}
      <TechDetailPageClient tech={tech} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
