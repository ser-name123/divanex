"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { TrendingUp, ArrowUpRight } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "ENGINEERING IMPACT",
  "title": "Transforming Workflows:",
  "highlight": "Architecture Outcomes",
  "description": "Here is how our modern engineering implementations solved core operational bottlenecks and performance limits for our clients."
};

const DEFAULT_ITEMS = [
    {
      company: "FleetWave Logistics",
      before: "Legacy manual spreadsheets, delayed dispatch, driver churn.",
      after: "Automated real-time dispatch dashboard with sub-second GPS tracking.",
      stat: "High-Throughput",
      statDetail: "Automated dispatch across multi-state fleets"
    },
    {
      company: "MediFlow EHR",
      before: "Non-compliant legacy database with slow patient record retrieval.",
      after: "HIPAA-hardened cloud architecture with sub-50ms search index.",
      stat: "4.2x Faster",
      statDetail: "Saved doctors 12 hours/week in data entry"
    },
    {
      company: "FinPulse Global",
      before: "Fragile monolithic payment code with frequent cart drop-offs.",
      after: "Fault-tolerant Next.js & Stripe multi-currency checkout engine.",
      stat: "High-Availability",
      statDetail: "Consistent reliable payment flows"
    }
  ];

export default function ClientSuccessOutcomes() {
  const { heading, items: outcomes } = useSection("testimonials/outcomes", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {outcomes.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.company}</h3>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                    <strong className="text-rose-800 block mb-1 font-bold">Before Divanex:</strong>
                    <span className="text-slate-700 font-medium">{item.before}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <strong className="text-emerald-800 block mb-1 font-bold">After Divanex:</strong>
                    <span className="text-slate-700 font-medium">{item.after}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black font-mono text-emerald-700">{item.stat}</div>
                  <div className="text-[11px] text-slate-500 font-mono font-medium">{item.statDetail}</div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-600 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
