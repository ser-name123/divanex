import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/services" });
}

export default async function Page() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getContent("services"),
  ]);

  const servicesCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Divanex Software Engineering & Digital Solutions Services",
    "description": "Comprehensive catalogue of enterprise digital solutions, cloud engineering, and custom software architecture services.",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": service.title,
      "description": service.description,
      "url": `${settings.siteUrl}/services/${service.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            servicesCatalogSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ])
          ),
        }}
      />
      <ServicesPageClient services={services} />
    </>
  );
}

