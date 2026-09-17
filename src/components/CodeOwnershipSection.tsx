"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";

/**
 * The ownership section on the home page.
 *
 * Everything it claims — which assets transfer, what the panel promises, the
 * three figures at the bottom — was written into this file, so a change to any
 * of it needed a developer. It reads as a set of commitments, which is the last
 * kind of copy that should be hard to correct.
 *
 * Split across two stored sections because the grid and the panel beside it are
 * edited for different reasons: one is a list of deliverables, the other is the
 * argument for them.
 */

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "DAY-1 CODE OWNERSHIP // ZERO VENDOR LOCK-IN",
  "title": "You Own the Product.",
  "highlight": "Not Us.",
  "description": "From the first milestone, your Git repository, cloud accounts, database models, and design assets belong 100% to your company. No hostage code, no exit fees, and zero vendor lock-in."
};

const DEFAULT_ITEMS = [
    {
      iconName: "Code2",
      title: "100% Source Code",
      subtitle: "Zero proprietary lock-in",
      description: "Clean, modular, fully typed TypeScript, Python, or Go codebases. No encrypted libraries, no obfuscated logic.",
      tag: "Clean Code"
    },
    {
      iconName: "GitBranch",
      title: "Full Git Repository",
      subtitle: "Complete commit history",
      description: "Your organization owns the repository outright, with every branch, commit and pull request from day one.",
      tag: "Version Control"
    },
    {
      iconName: "Database",
      title: "Database & Schemas",
      subtitle: "Direct database access",
      description: "PostgreSQL schemas, migration scripts and automated seeders, handed over with root credentials.",
      tag: "Data Layer"
    },
    {
      iconName: "Cloud",
      title: "Cloud & Hosting Accounts",
      subtitle: "Your cloud, your billing",
      description: "AWS, GCP, Cloudflare or Vercel accounts provisioned in your company name and billed to you directly.",
      tag: "Infrastructure"
    },
    {
      iconName: "Palette",
      title: "Design Files & UI Systems",
      subtitle: "Tokenized Figma workspaces",
      description: "The complete Figma design system, component library and design tokens, transferred to your workspace.",
      tag: "Design System"
    },
    {
      iconName: "FileText",
      title: "Architecture & Documentation",
      subtitle: "Comprehensive runbooks",
      description: "OpenAPI specifications, architecture decision records and developer runbooks written to be handed over.",
      tag: "Documentation"
    },
    {
      iconName: "KeyRound",
      title: "Deployment & Credentials",
      subtitle: "Root administrative control",
      description: "Root API keys, DNS control, SSL certificates and production secrets, all under your administration.",
      tag: "Access Control"
    }
  ];

const DEFAULT_SUMMARY_HEADING = {
  "eyebrow": "ZERO VENDOR LOCK-IN",
  "title": "What You Receive on Day One",
  "highlight": "Day-1 Transfer",
  "description": "Traditional agencies often retain code in private repositories or charge exit fees. We hand you full ownership from the first milestone."
};

const DEFAULT_SUMMARY_ITEMS = [
    { kind: "pill", title: "Mutual NDA & Direct IP Assignment", description: "Legally enforceable contract clauses guaranteeing complete IP ownership from milestone sign-off." },
    { kind: "callout", title: "", description: "Complete repository admin rights, direct cloud accounts, and 100% intellectual property transfer." },
    { kind: "deliverable", title: "Source Code", description: "Clean, modular, fully typed TypeScript / Python" },
    { kind: "deliverable", title: "Git Repository", description: "Full commit history transferred to your organization" },
    { kind: "deliverable", title: "Database", description: "PostgreSQL schemas, migrations & automated seeders" },
    { kind: "deliverable", title: "Cloud Accounts", description: "AWS / GCP / Vercel created directly in your name" },
    { kind: "deliverable", title: "Design Files", description: "Complete tokenized Figma design system & components" },
    { kind: "deliverable", title: "Documentation", description: "OpenAPI Swagger specs & developer runbooks" },
    { kind: "deliverable", title: "Deployment Access", description: "Root API keys, DNS, SSL & production secrets" },
    { kind: "metric", title: "100%", description: "IP Transfer", tone: "emerald" },
    { kind: "metric", title: "0%", description: "Vendor Lock", tone: "sky" },
    { kind: "metric", title: "30-Day", description: "Hypercare", tone: "teal" }
  ];

const DEFAULT_CTA = {
  "label": "Book a Consultation with 100% IP Transfer",
  "href": "/contact"
};

interface AssetItem extends Record<string, unknown> {
  iconName?: string;
  icon?: unknown;
  title?: string;
  subtitle?: string;
  description?: string;
  tag?: string;
}

interface SummaryItem extends Record<string, unknown> {
  kind?: string;
  title?: string;
  description?: string;
  tone?: string;
}

const METRIC_TONES: Record<string, string> = {
  emerald: "text-emerald-700",
  sky: "text-sky-700",
  teal: "text-[#0f7670]",
};

export default function CodeOwnershipSection() {
  const { heading, items: assets } = useSection<AssetItem>("home/ownership", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });

  const { heading: panel, items: summary, cta } = useSection<SummaryItem>(
    "home/ownership-panel",
    {
      heading: DEFAULT_SUMMARY_HEADING,
      items: DEFAULT_SUMMARY_ITEMS,
      cta: DEFAULT_CTA,
    }
  );

  const pill = summary.find((item) => item.kind === "pill");
  const callout = summary.find((item) => item.kind === "callout");
  const deliverables = summary.filter((item) => item.kind === "deliverable");
  const metrics = summary.filter((item) => item.kind === "metric");

  return (
    <section className="relative py-12 lg:py-16 bg-slate-50/70 border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>{heading.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {heading.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f7670] to-[#5c9556] font-extrabold">
              {heading.highlight}
            </span>
          </h2>

          <RichText
            value={heading.description}
            className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {assets.map((asset, idx) => (
              <div
                key={asset.title || idx}
                className={`reveal-init reveal-delay-${(idx % 3) + 1} rounded-2xl p-5 bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#0f7670] group-hover:scale-110 transition-transform shadow-2xs">
                      <Icon name={asset.iconName} className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {asset.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0f7670] transition-colors">
                      {asset.title}
                    </h3>
                    <span className="text-[11px] font-mono font-medium text-slate-500 block mt-0.5">
                      {asset.subtitle}
                    </span>
                  </div>

                  <RichText
                    value={asset.description}
                    className="text-xs text-slate-600 leading-relaxed font-normal"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Transferred To You</span>
                </div>
              </div>
            ))}

            {pill && (
              <div className="reveal-init sm:col-span-2 md:col-span-2 rounded-2xl p-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      {pill.title}
                    </span>
                    <span className="text-[11px] text-slate-600 block">{pill.description}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="reveal-init lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/40 border border-emerald-200/90 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556]" />
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{panel.eyebrow}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-700 shadow-2xs">
                  {panel.highlight}
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  {panel.title}
                </h3>
                <RichText
                  value={panel.description}
                  className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1.5"
                />
              </div>

              {callout && (
                <div className="p-3 rounded-xl bg-white/95 border border-emerald-200/80 shadow-2xs flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-emerald-950 font-semibold text-xs leading-snug">
                    {callout.description}
                  </p>
                </div>
              )}

              <div className="space-y-2 pt-1 text-xs font-mono">
                {deliverables.map((item, idx) => (
                  <div key={item.title || idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>{item.title}:</strong> {item.description}
                    </span>
                  </div>
                ))}
              </div>

              {metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-100">
                  {metrics.map((metric, idx) => (
                    <div
                      key={metric.title || idx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-center space-y-0.5 shadow-2xs"
                    >
                      <span
                        className={`text-base font-bold font-mono block ${
                          METRIC_TONES[metric.tone || "emerald"] ?? METRIC_TONES.emerald
                        }`}
                      >
                        {metric.title}
                      </span>
                      <span className="text-[10px] text-slate-600 font-mono block leading-tight">
                        {metric.description}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cta.label && (
              <div className="relative z-10 pt-3 border-t border-emerald-100">
                <Link
                  href={cta.href}
                  className="btn-futuristic-primary w-full !py-3.5 !px-5 text-xs sm:text-sm font-bold !rounded-xl text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <span>{cta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
