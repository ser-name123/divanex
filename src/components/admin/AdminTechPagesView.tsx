"use client";

import { techDetailsRecord } from "@/data/techDetails";
import RecordPagesEditor from "@/components/admin/RecordPagesEditor";

/**
 * The per-technology pages at /tech-stack/[slug].
 *
 * Only the curated pages live here. A technology in the grid without an entry
 * still gets a page — one generated from its grid card — so deleting a page
 * here falls back to the generated version rather than 404ing.
 */
export default function AdminTechPagesView() {
  return (
    <RecordPagesEditor
      collection="tech-details"
      seed={techDetailsRecord}
      badge="TECHNOLOGY PAGES"
      title="Technology Pages"
      description="The written-up technology pages: architecture blueprint, capabilities, benchmarks, hardening notes and FAQs. Technologies without an entry fall back to a generated page."
      previewPath="/tech-stack/"
      labelOf={(entry) => (entry.name as string) || "Untitled"}
      makeEntry={(slug) => ({
        slug,
        name: slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
        category: "backend",
        categoryLabel: "Backend",
        iconText: "⚡",
        version: "",
        badgeColor: "sky",
        tagline: "",
        metaDescription: "",
        architectureHighlights: [],
        blueprint: { title: "", description: "", flowSteps: [], designPatterns: [] },
        capabilities: [],
        benchmarks: [],
        securityAndHardening: [],
        faqs: [],
        relatedServices: [],
      })}
      fields={[
        { key: "slug", label: "Slug", hint: "Changing this changes the page's URL." },
        { key: "name", label: "Technology" },
        {
          key: "category",
          label: "Category",
          hint: "One of: frontend, backend, php, cms, ai, mobile, devops, database, security.",
        },
        { key: "categoryLabel", label: "Category label" },
        { key: "iconText", label: "Icon", hint: "An emoji or one or two characters." },
        { key: "version", label: "Version" },
        { key: "badgeColor", label: "Badge colour" },
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
          key: "architectureHighlights",
          label: "Architecture highlights",
          hint: "The figures near the top. Each: label, value, desc.",
          rows: 10,
        },
        {
          key: "blueprint",
          label: "Blueprint",
          hint: "Title, description, flow steps and the design patterns table.",
          rows: 16,
        },
        {
          key: "capabilities",
          label: "Capabilities",
          hint: "Each: title, tag, description, highlights.",
          rows: 16,
        },
        {
          key: "benchmarks",
          label: "Benchmarks",
          hint: "Each row: metric, divanexApproach, legacyAlternative, benefit.",
          rows: 14,
        },
        {
          key: "securityAndHardening",
          label: "Security & hardening",
          hint: "Each: title, badge, description.",
          rows: 12,
        },
        {
          key: "faqs",
          label: "FAQs",
          hint: "Each: question, answer.",
          rows: 14,
        },
        {
          key: "relatedServices",
          label: "Related services",
          hint: "Each: name, slug, desc. The slug points at a /services page.",
          rows: 10,
        },
      ]}
    />
  );
}
