"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Shield, CheckCircle } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Incident Response Framework",
  "title": "Production Service Level",
  "highlight": "Agreements (SLAs)",
  "description": "Contractual uptime, round-the-clock monitoring, and strict ticket response times backed by financial remedies and dedicated senior engineers."
};

const DEFAULT_ITEMS = [
    {
      level: "Severity P1 (Critical Outage)",
      response: "< 15 Minutes",
      resolution: "< 4 Hours",
      color: "border-rose-200 bg-rose-50/70 text-rose-800",
      description: "Complete platform outage or critical security compromise affecting production traffic."
    },
    {
      level: "Severity P2 (Major Degradation)",
      response: "< 1 Hour",
      resolution: "< 12 Hours",
      color: "border-amber-200 bg-amber-50/70 text-amber-800",
      description: "Core features impaired with non-critical workarounds available for end-users."
    },
    {
      level: "Severity P3 (Minor Defect)",
      response: "< 4 Hours",
      resolution: "Next Sprint Release",
      color: "border-sky-200 bg-sky-50/70 text-sky-800",
      description: "Cosmetic bugs, non-blocking UI issues, or minor workflow edge-cases."
    },
    {
      level: "Severity P4 (Feature Enhancement)",
      response: "< 8 Hours",
      resolution: "Backlog Prioritized",
      color: "border-emerald-200 bg-emerald-50/70 text-emerald-800",
      description: "New component requests, third-party API additions, or optimization ideas."
    }
  ];

export default function ServiceLevelAgreements() {
  const { heading, items: slas } = useSection("services/slas", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slas.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-3xl border ${item.color} shadow-xs hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-slate-900">{item.level}</h3>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold">
                  <span className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-slate-700">
                    Response: <strong className="text-slate-900">{item.response}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/90 border border-slate-200 text-slate-700">
                    Target: <strong className="text-slate-900">{item.resolution}</strong>
                  </span>
                </div>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                {item.description}
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-200/80">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>INCLUDED IN ALL ACTIVE PRODUCTION RETAINERS & HYPERCARE PHASES</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
