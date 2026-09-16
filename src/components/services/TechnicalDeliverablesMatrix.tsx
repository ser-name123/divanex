"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { FolderGit2, FileText, Database, ShieldCheck, Terminal, CheckCircle2, Box } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Verifiable Artifact Handover",
  "title": "What You Receive:",
  "highlight": "Technical Deliverables Matrix",
  "description": "We don't just deliver a running URL. Every project includes comprehensive production assets, documentation, and architectural artifacts for complete operational autonomy."
};

const DEFAULT_ITEMS = [
    {
      icon: FolderGit2,
      title: "Clean Source Code Repository",
      badge: "100% OWNERSHIP",
      desc: "Full Git commit history, strict TypeScript interfaces, and linted modular directory structure transferred directly to your organization GitHub/GitLab."
    },
    {
      icon: FileText,
      title: "Interactive Swagger & Postman Docs",
      badge: "REST & GRAPHQL",
      desc: "Comprehensive API endpoints documentation with request/response schemas, JWT auth headers, and mock environments ready for 3rd-party integration."
    },
    {
      icon: Database,
      title: "Schema Migrations & DB Architecture",
      badge: "POSTGRESQL / PRISMA",
      desc: "Version-controlled database migration scripts, ER diagrams, foreign key relationships, indexes, and automated seed scripts for staging and local dev."
    },
    {
      icon: Terminal,
      title: "Automated CI/CD Pipeline Configs",
      badge: "GITHUB ACTIONS",
      desc: "Production-ready YAML workflows executing automated unit tests, linting, Docker container builds, and zero-downtime deployment triggers."
    },
    {
      icon: Box,
      title: "Figma Component Design System",
      badge: "AUTO-LAYOUT & TOKENS",
      desc: "Organized Figma source file with atomic components, interactive prototypes, dark/light color tokens, typography scales, and responsive variants."
    },
    {
      icon: ShieldCheck,
      title: "Security & Vulnerability Audit Report",
      badge: "OWASP TOP 10",
      desc: "Automated static analysis (SAST) reports, dependency vulnerability audits (Snyk/Trivy), and zero-trust CORS/headers configuration verify pass."
    }
  ];

export default function TechnicalDeliverablesMatrix() {
  const { heading, items: deliverables } = useSection("services/deliverables", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Box className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-sky-100/80 border border-sky-200 text-sky-800">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>VERIFIED AT SPRINT SIGN-OFF</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
