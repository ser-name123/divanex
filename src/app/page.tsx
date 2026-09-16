import type { Metadata } from "next";
import {
  buildPageMetadata,
  faqSchema,
  jsonLdScript,
  organizationSchema,
  webSiteSchema,
} from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import { getBlogPosts } from "@/lib/blogStore";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/" });
}

export default async function Page() {
  const [settings, testimonials, projects, tech, pages, services, posts] = await Promise.all([
    getSiteSettings(),
    getContent("testimonials"),
    getContent("portfolio"),
    getContent("tech-stack"),
    getContent("pages"),
    getContent("services"),
    getBlogPosts(),
  ]);

  /**
   * The service catalogue, which is what makes the homepage eligible for
   * service-level rich results. Identity and contact details come from the
   * settings record rather than being repeated here — the previous inline
   * graph carried a different phone number and email from the rest of the
   * site, which is the kind of mismatch that costs a knowledge panel.
   */
  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${settings.siteUrl}/#service`,
    name: `${settings.siteName} Digital & Tech Solutions`,
    url: settings.siteUrl,
    image: `${settings.siteUrl}${settings.logoUrl}`,
    parentOrganization: { "@id": `${settings.siteUrl}/#organization` },
    priceRange: "$$$$",
    currenciesAccepted: "USD, EUR, INR, GBP",
    paymentAccepted: "Credit Card, Wire Transfer, Stripe",
    areaServed: [
      "United States",
      "United Kingdom",
      "United Arab Emirates",
      "India",
      "Europe",
      "Global",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Core Tech Engineering Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Enterprise SaaS Development & Multi-Tenant Architecture",
            description:
              "Custom cloud platforms, multi-tenant databases, Stripe/Razorpay billing, and auto-scaling microservices.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Autonomous AI Agents & Workflow Automation",
            description:
              "Retrieval-augmented assistants, document pipelines, and agentic workflows wired into existing systems.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cross-Platform Mobile & Web Application Engineering",
            description:
              "React Native, Flutter, and Next.js PWAs with 60 FPS performance and offline sync.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cloud DevOps & Kubernetes Infrastructure",
            description:
              "Automated AWS/GCP Terraform deployments, zero-trust security perimeters, and continuous delivery.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Technical SEO & Conversion Rate Optimization",
            description:
              "Programmatic SEO, Core Web Vitals 95+ tuning, schema architecture, and SERP domination.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design Engineering & Design Systems",
            description:
              "Figma design systems, interactive prototypes, micro-interactions, and conversion-engineered interfaces.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            organizationSchema(settings),
            webSiteSchema(settings),
            professionalService,
            faqSchema(
              (pages.faqs ?? []).map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              }))
            )
          ),
        }}
      />
      <HomePageClient
        testimonials={testimonials}
        projects={projects}
        tech={tech}
        services={services}
        posts={posts.filter((post) => post.status === "published").slice(0, 3)}
      />
    </>
  );
}
