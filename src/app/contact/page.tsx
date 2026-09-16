import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/contact" });
}

export default async function Page() {
  const settings = await getSiteSettings();

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Divanex Solutions Architecture Pod",
    "description": "Direct communication channel to schedule architectural discovery sessions, submit RFPs, and obtain confidential software development proposals.",
    "url": `${settings.siteUrl}/contact`,
    "mainEntity": {
      "@type": "ContactPoint",
      "contactType": "Technical Solutions & Enterprise Sales",
      "telephone": settings.contactPhone,
      "email": settings.contactEmail,
      "availableLanguage": ["English", "Hindi"],
      "areaServed": "Global",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            contactPageSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ])
          ),
        }}
      />
      <ContactPageClient />
    </>
  );
}

