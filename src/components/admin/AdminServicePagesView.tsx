"use client";

import { serviceDetailsRecord } from "@/data/serviceDetails";
import RecordPagesEditor from "@/components/admin/RecordPagesEditor";

/** The per-service marketing pages at /services/[slug]. */
export default function AdminServicePagesView() {
  return (
    <RecordPagesEditor
      collection="service-details"
      seed={serviceDetailsRecord}
      badge="SERVICE DETAIL PAGES"
      title="Service Pages"
      description="One page per service: the headline, the architecture diagram, engineering modules, sprint phases, pricing tiers and FAQs."
      previewPath="/services/"
      labelOf={(entry) => `${entry.title ?? ""} ${entry.titleHighlight ?? ""}`.trim() || "Untitled"}
      makeEntry={(slug) => ({
        slug,
        badge: "NEW SERVICE",
        title: "New Service",
        titleHighlight: "Engineering",
        tagline: "",
        metaDescription: "",
        headerStats: [],
        architectureSummary: { diagramTitle: "", diagramSubtitle: "", flowSteps: [] },
        engineeringModules: [],
        techStack: [],
        sprintPhases: [],
        handoverArtifacts: [],
        caseStudy: { client: "", sector: "", challenge: "", solution: "", metrics: [] },
        pricingTiers: [],
        faqs: [],
      })}
      fields={[
        { key: "slug", label: "Slug", hint: "Changing this changes the page's URL." },
        { key: "badge", label: "Badge" },
        { key: "title", label: "Headline" },
        { key: "titleHighlight", label: "Highlighted part" },
        { key: "tagline", label: "Tagline", kind: "rich" },
        {
          key: "metaDescription",
          label: "Search description",
          hint: "Shown in Google results. Plain text only — markdown would appear verbatim in the snippet.",
          kind: "plain",
          limit: 160,
        },
      ]}
      sections={[
        {
          key: "headerStats",
          label: "Header figures",
          hint: "The metric strip at the top. Each entry: label, value, detail, color.",
          rows: 10,
        },
        {
          key: "architectureSummary",
          label: "Architecture diagram",
          hint: "The diagram title, subtitle and its flow steps.",
          rows: 14,
        },
        {
          key: "engineeringModules",
          label: "Engineering modules",
          hint: "Each module: moduleNum, title, badge, description, keyPoints, technicalSpec.",
          rows: 18,
        },
        {
          key: "techStack",
          label: "Technology stack",
          hint: "Grouped by category, each with a list of items.",
          rows: 12,
        },
        {
          key: "sprintPhases",
          label: "Sprint phases",
          hint: "Each phase: phase, title, duration, deliverables.",
          rows: 12,
        },
        {
          key: "handoverArtifacts",
          label: "Handover artifacts",
          hint: "What the client receives. Each: title, format, desc.",
          rows: 10,
        },
        {
          key: "caseStudy",
          label: "Featured case study",
          hint: "The proof block: client, sector, challenge, solution and metrics.",
          rows: 14,
        },
        {
          key: "pricingTiers",
          label: "Pricing tiers",
          hint: "Each tier: name, price, period, badge, description, features. Prices are converted to the visitor's currency at render time.",
          rows: 18,
        },
        {
          key: "faqs",
          label: "FAQs",
          hint: "Each: question, answer. Published as FAQ structured data.",
          rows: 14,
        },
      ]}
    />
  );
}
