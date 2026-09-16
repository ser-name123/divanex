import type { Metadata } from "next";
import { getContent } from "@/lib/contentStore";
import { breadcrumbSchema, buildPageMetadata, faqSchema, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import FaqsPageClient from "./FaqsPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/faqs" });
}

export default async function Page() {
  const [settings, pages] = await Promise.all([getSiteSettings(), getContent("pages")]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            faqSchema(
              (pages.faqs ?? []).map((faq) => ({
                question: faq.question,
                answer: faq.answer,
              }))
            ),
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "FAQs", path: "/faqs" },
            ])
          ),
        }}
      />
      <FaqsPageClient />
    </>
  );
}
