"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { RefreshCw, ArrowRight } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Modernization Roadmap",
  "title": "Legacy Monolith to",
  "highlight": "Modern Stack Migration",
  "description": "Strangled monolith architecture allows you to migrate legacy code incrementally without stopping your daily business operations or risking data loss."
};

const DEFAULT_ITEMS = [
    {
      from: "Legacy PHP / WordPress / Drupal",
      to: "Next.js App Router + Headless CMS / Go API",
      benefits: "10x faster page loads, headless flexibility, zero plugin vulnerability exploits."
    },
    {
      from: "Monolithic Django / Rails API",
      to: "Modular Microservices & FastAPI / Node TypeScript",
      benefits: "Sub-50ms API response times, horizontal worker scaling, strict type-safety."
    },
    {
      from: "Slow WebViews / Hybrid Apps",
      to: "Native 60 FPS React Native / Flutter",
      benefits: "Silky smooth gestures, native hardware access, unified codebase across iOS & Android."
    },
    {
      from: "On-Premises Dedicated Servers",
      to: "Containerized AWS / GCP Kubernetes & Terraform",
      benefits: "Elastic auto-scaling, disaster recovery failover, reduced infrastructure management overhead."
    }
  ];

export default function LegacyMigrationGuide() {
  const { heading, items: pathways } = useSection("tech/migration", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pathways.map((path, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded border border-rose-200">
                  {path.from}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block shrink-0" />
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {path.to}
                </span>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                <strong className="text-slate-800 font-bold">Impact:</strong> {path.benefits}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
