import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import TestimonialsPageClient from "./TestimonialsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/testimonials" });
}

export default async function Page() {
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getContent("testimonials"),
  ]);

  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Divanex Enterprise Software Engineering Services",
    "description": "Enterprise software engineering, custom multi-tenant SaaS, AI agents, and cloud DevOps delivery.",
    "brand": {
      "@type": "Brand",
      "name": settings.siteName,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.95",
      "reviewCount": "54",
      "bestRating": "5",
      "worstRating": "1",
    },
    // Admin-managed records, so an edited testimonial updates the rich result.
    "review": testimonials.slice(0, 10).map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name,
        "jobTitle": review.role,
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
      },
      "reviewBody": review.quote,
      "headline": review.headline,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            reviewsSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Testimonials", path: "/testimonials" },
            ])
          ),
        }}
      />
      <TestimonialsPageClient testimonials={testimonials} />
    </>
  );
}

