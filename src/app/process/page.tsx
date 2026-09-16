import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import ProcessPageClient from "./ProcessPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/process" });
}

export default async function Page() {
  const [settings, pages] = await Promise.all([getSiteSettings(), getContent("pages")]);
  const processSteps = pages.processSteps ?? [];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Divanex 5-Stage Agile Software Development Process",
    "description": "Our systematic engineering lifecycle: Discovery, UI/UX Systems Architecture, Sprint Engineering, Quantum QA & OWASP Audits, and Zero-Downtime Launch with Hypercare.",
    "totalTime": "P10W",
    "step": processSteps.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": `${step.stepNumber}. ${step.title}`,
      "text": step.description,
      "itemListElement": step.deliverables.map((deliv) => ({
        "@type": "HowToDirection",
        "text": deliv,
      })),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            howToSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Process", path: "/process" },
            ])
          ),
        }}
      />
      <ProcessPageClient />
    </>
  );
}

