"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Gauge, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Engineering Quality Standards",
  "title": "How We Define Success:",
  "highlight": "Release Quality Criteria",
  "description": "We don't ship until our stringent quality benchmarks are met. Here are the non-negotiable criteria every Divanex project must satisfy."
};

const DEFAULT_ITEMS = [
    {
      title: "Google Core Web Vitals 95+",
      target: "LCP < 1.2s / CLS = 0",
      desc: "Every web platform we release is audited for maximum Lighthouse performance, ensuring superior SEO crawlability and conversion rates."
    },
    {
      title: "Zero P1 / P2 Vulnerability Audit",
      target: "OWASP Hardened",
      desc: "Static and dynamic penetration tests pass without critical vulnerabilities before any production domain switch is permitted."
    },
    {
      title: "Sub-Second Global API Latency",
      target: "p99 < 85ms",
      desc: "Edge-cached database responses and regional Redis workers ensure sub-second response times for end-users globally."
    },
    {
      title: "Strict 100% TypeScript Coverage",
      target: "No `any` Types",
      desc: "Strict type contracts between frontend clients and backend APIs eliminate silent runtime bugs in production."
    }
  ];

export default function PortfolioAuditCriteria() {
  const { heading, items: criteria } = useSection("portfolio/audit", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((c, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 block w-fit mb-3">
                  {c.target}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-normal">{c.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>MANDATORY GATE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
