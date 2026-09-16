"use client";

import { caseStudiesRecord } from "@/data/caseStudiesData";
import RecordPagesEditor from "@/components/admin/RecordPagesEditor";

/** The per-case-study pages at /portfolio/[slug]. */
export default function AdminCaseStudyPagesView() {
  return (
    <RecordPagesEditor
      collection="case-studies"
      seed={caseStudiesRecord}
      badge="CASE STUDY PAGES"
      title="Case Study Pages"
      description="The full write-up behind each portfolio card: the challenge, the architecture, the stack, the measured impact and the client quote."
      previewPath="/portfolio/"
      labelOf={(entry) => (entry.title as string) || "Untitled"}
      makeEntry={(slug) => ({
        id: slug,
        slug,
        title: "New Case Study",
        subtitle: "",
        category: "SaaS Development",
        clientName: "",
        industry: "",
        duration: "",
        contractValue: "",
        impactHighlight: "",
        impactLabel: "",
        metaDescription: "",
        stats: [],
        challenge: { title: "", summary: "", frictionPoints: [] },
        solution: { title: "", summary: "", architecturalPillars: [] },
        architectureBlueprint: { title: "", flowSteps: [], highlights: [] },
        techStack: [],
        deliverables: [],
        businessImpact: { headline: "", metrics: [] },
        testimonial: { quote: "", author: "", role: "", company: "", avatarInitials: "" },
        complianceBadges: [],
        securityPillars: [],
        keyTakeaways: [],
      })}
      fields={[
        { key: "slug", label: "Slug", hint: "Changing this changes the page's URL." },
        { key: "title", label: "Title" },
        { key: "subtitle", label: "Subtitle" },
        {
          key: "category",
          label: "Category",
          hint: "One of: SaaS Development, AI & Automation, Mobile Engineering, High-Frequency Web, FinTech Systems, IoT & Telemetry.",
        },
        { key: "clientName", label: "Client" },
        { key: "industry", label: "Industry" },
        { key: "duration", label: "Duration" },
        { key: "contractValue", label: "Contract value" },
        { key: "impactHighlight", label: "Headline impact", hint: "The big figure, e.g. +320%." },
        { key: "impactLabel", label: "Impact label" },
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
          key: "stats",
          label: "Summary figures",
          hint: "The strip near the top. Each: label, value, subtext.",
          rows: 10,
        },
        {
          key: "challenge",
          label: "The challenge",
          hint: "Title, summary and the friction points list.",
          rows: 12,
        },
        {
          key: "solution",
          label: "The solution",
          hint: "Title, summary and the architectural pillars.",
          rows: 14,
        },
        {
          key: "architectureBlueprint",
          label: "Architecture blueprint",
          hint: "The diagram title, its flow steps and the highlight list.",
          rows: 14,
        },
        {
          key: "techStack",
          label: "Technology stack",
          hint: "Grouped by category; each technology has a name, role and optional highlight.",
          rows: 14,
        },
        {
          key: "deliverables",
          label: "Deliverables",
          hint: "Each: milestone, description, timeline.",
          rows: 12,
        },
        {
          key: "businessImpact",
          label: "Business impact",
          hint: "A headline plus before/after/gain rows.",
          rows: 14,
        },
        {
          key: "testimonial",
          label: "Client quote",
          hint: "Quote, author, role, company and the avatar initials.",
          rows: 8,
        },
        {
          key: "securityPillars",
          label: "Security pillars",
          hint: "Optional. Each: title, description, standard.",
          rows: 10,
        },
        {
          key: "codeSnippet",
          label: "Code sample",
          hint: "Optional. Language, filename and the code itself. Rendered as plain text, never executed.",
          rows: 12,
        },
        {
          key: "complianceBadges",
          label: "Compliance badges",
          hint: "A list of strings.",
          rows: 6,
        },
        {
          key: "keyTakeaways",
          label: "Key takeaways",
          hint: "A list of strings.",
          rows: 8,
        },
      ]}
    />
  );
}
