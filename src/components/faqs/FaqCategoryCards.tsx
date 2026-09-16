"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { FileText, DollarSign, Clock, ShieldCheck, Cpu, Headphones } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Knowledge Index",
  "title": "Explore Questions by",
  "highlight": "Topic Category",
  "description": "Navigate directly to the answers you need or browse our comprehensive knowledge policies below."
};

const DEFAULT_ITEMS = [
    { icon: FileText, title: "IP & Contracts", desc: "Source code ownership, Git repo transfer, and NDA agreements." },
    { icon: DollarSign, title: "Pricing & Invoicing", desc: "Milestone-gated payments, wire transfers, and currency support." },
    { icon: Clock, title: "Sprint Execution", desc: "14-day cadence, daily standups, and bi-weekly live staging demos." },
    { icon: ShieldCheck, title: "Security & SLAs", desc: "OWASP compliance, SOC 2 alignment, and uptime guarantees." },
    { icon: Cpu, title: "Tech Stack & Code", desc: "Next.js, React Native, Python, Go, and PostgreSQL architecture." },
    { icon: Headphones, title: "Post-Launch Hypercare", desc: "30-day warranty, retainer options, and emergency incident SLA." }
  ];

export default function FaqCategoryCards() {
  const { heading, items: categories } = useSection("faqs/categories", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
