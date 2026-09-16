import { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { getContent } from "@/lib/contentStore";
import CaseStudyDetailClient from "./CaseStudyDetailClient";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Prerenders every case study that exists at build time. One added from the
 * admin console afterwards renders on demand and is prerendered by the next
 * build.
 */
export async function generateStaticParams() {
  const studies = await getContent("case-studies");
  return Object.keys(studies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = (await getContent("case-studies"))[slug];

  if (!caseStudy) {
    return { title: "Case Study Not Found", robots: { index: false, follow: false } };
  }

  const techNames = caseStudy.techStack
    ? caseStudy.techStack.flatMap((ts) => ts.technologies.map((t) => t.name))
    : [];

  const keywords = [
    caseStudy.title,
    caseStudy.category,
    ...techNames,
    "Software Architecture Case Study",
    "Enterprise Software ROI",
    "Divanex Portfolio",
    "Client Success Story"
  ];

  return buildPageMetadata({
    path: `/portfolio/${slug}`,
    title: `${caseStudy.title} — ${caseStudy.category} Case Study | Divanex`,
    description: caseStudy.metaDescription,
    keywords,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const studies = await getContent("case-studies");
  const caseStudy = studies[slug];

  if (!caseStudy) {
    notFound();
  }

  // The "explore more" strip. Passed down rather than imported by the client
  // component, which would have bundled every case study into every page.
  const otherCaseStudies = Object.values(studies)
    .filter((entry) => entry.slug !== slug)
    .slice(0, 3);

  const seoSettings = await getSiteSettings();
  const breadcrumbLeafName = caseStudy.title;
  const breadcrumbLeafPath = `/portfolio/${slug}`;

  const techNames = caseStudy.techStack
    ? caseStudy.techStack.flatMap((ts) => ts.technologies.map((t) => t.name))
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: caseStudy.title,
    alternativeHeadline: caseStudy.subtitle,
    description: caseStudy.metaDescription,
    keywords: [caseStudy.title, caseStudy.category, ...techNames].join(", "),
    articleSection: caseStudy.category,
    author: {
      "@type": "Organization",
      name: `${seoSettings.siteName} Software Engineering`,
      url: seoSettings.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: seoSettings.siteName,
      url: seoSettings.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${seoSettings.siteUrl}/brand-logo-icon.png`,
      },
    },
    about: {
      "@type": "Thing",
      name: caseStudy.category,
    },
    datePublished: "2025-01-15T00:00:00Z",
    inLanguage: "en-US",
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            jsonLd,
            breadcrumbSchema(seoSettings, [
              { name: "Home", path: "/" },
              { name: "Portfolio", path: "/portfolio" },
              { name: breadcrumbLeafName, path: breadcrumbLeafPath },
            ])
          ),
        }}
      />

      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      {/* Global Navigation Header */}
      <Navbar />

      {/* Interactive Advance-Level Case Study View Content */}
      <main>
        <CaseStudyDetailClient caseStudy={caseStudy} otherCaseStudies={otherCaseStudies} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
