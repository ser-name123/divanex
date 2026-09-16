import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { getContent } from "@/lib/contentStore";
import ServiceDetailPageClient from "./ServiceDetailPageClient";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Prerenders every service that exists at build time. A service added from the
 * admin console afterwards is rendered on demand — Next keeps dynamic params
 * enabled by default — and is picked up by the next build.
 */
export async function generateStaticParams() {
  const services = await getContent("service-details");
  return Object.keys(services).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = (await getContent("service-details"))[slug];

  if (!service) {
    return { title: "Service Not Found", robots: { index: false, follow: false } };
  }

  const techItems = service.techStack
    ? service.techStack.flatMap((ts) => ts.items)
    : [];
  const moduleTitles = service.engineeringModules
    ? service.engineeringModules.map((m) => m.title)
    : [];

  const keywords = [
    service.title,
    service.titleHighlight,
    ...moduleTitles,
    ...techItems,
    "Custom Software Engineering",
    "Enterprise Digital Solutions",
    "Divanex Services",
    "Scalable Architecture"
  ];

  return buildPageMetadata({
    path: `/services/${service.slug}`,
    title: `${service.title} ${service.titleHighlight} | Divanex`,
    description: service.metaDescription,
    keywords,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const catalogue = await getContent("service-details");
  const service = catalogue[slug];

  if (!service) {
    notFound();
  }

  // The "other services" strip at the foot of the page. Passed down rather
  // than imported by the client component, which would have bundled every
  // service page into every service page.
  const related = Object.values(catalogue).filter((entry) => entry.slug !== slug);

  // Generate Structured Data Schema for Service
  const seoSettings = await getSiteSettings();
  const breadcrumbLeafName = `${service.title} ${service.titleHighlight}`;
  const breadcrumbLeafPath = `/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} ${service.titleHighlight}`,
    "description": service.metaDescription,
    "provider": {
      "@type": "Organization",
      "name": seoSettings.siteName,
      "url": seoSettings.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoSettings.siteUrl}/brand-logo-icon.png`
      }
    },
    "serviceType": service.title,
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pricing Tiers",
      "itemListElement": service.pricingTiers.map((tier) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": tier.name,
          "description": tier.description
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": tier.price
        }
      }))
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            serviceSchema,
            breadcrumbSchema(seoSettings, [
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
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

      {/* Interactive Advance-Level Service Details Experience */}
      <ServiceDetailPageClient service={service} related={related} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
