"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Check, X, Minus, Scale } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Market Benchmark Comparison",
  "title": "How Divanex Outperforms the",
  "highlight": "Alternatives",
  "description": "Stop sacrificing velocity for quality or paying exorbitant legacy agency overhead. See why scaling businesses partner with Divanex."
};

const DEFAULT_ITEMS = [
    {
      vector: "Speed to Working MVP",
      freelancers: "Unpredictable (12-24 weeks)",
      agencies: "Slow bureaucratic (16-32 weeks)",
      divanex: "Fast agile sprints (4-8 weeks)"
    },
    {
      vector: "Code & IP Ownership",
      freelancers: "Vague, risk of repo hostage",
      agencies: "Often proprietary framework lock-in",
      divanex: "100% immediate IP transfer on milestone"
    },
    {
      vector: "Architectural Caliber",
      freelancers: "Junior to mid-level shortcuts",
      agencies: "Delegated to low-cost junior interns",
      divanex: "Strict senior engineering & code reviews"
    },
    {
      vector: "Communication Protocol",
      freelancers: "Ghosting & timezone lag",
      agencies: "Account managers buffer engineers",
      divanex: "Direct Slack channel with tech leads"
    },
    {
      vector: "Pricing & Invoicing",
      freelancers: "Hourly scope-creep & unpredictability",
      agencies: "Hefty markups & $20k+/mo retainers",
      divanex: "Transparent milestone-gated flat pricing"
    },
    {
      vector: "Post-Launch Warranty",
      freelancers: "Disappears after payment",
      agencies: "Billable $250/hr maintenance tier",
      divanex: "30-day comprehensive zero-cost hypercare"
    }
  ];

export default function AgencyVsFreelancerVsDivanex() {
  const { heading, items: comparisons } = useSection("why-us/comparison", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div className="grid grid-cols-4 p-5 bg-slate-50 border-b border-slate-200 text-xs font-mono tracking-wider uppercase">
              <div className="text-slate-700 font-semibold">Evaluation Vector</div>
              <div className="text-slate-600 font-medium text-center">Freelance Marketplaces</div>
              <div className="text-slate-600 font-medium text-center">Traditional Agencies</div>
              <div className="text-sky-900 font-semibold text-center bg-sky-50 py-1 rounded">Divanex Pods</div>
            </div>

            <div className="divide-y divide-slate-100">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 p-5 items-center hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                >
                  <div className="font-semibold text-slate-900 pr-4">{row.vector}</div>
                  <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                    <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{row.freelancers}</span>
                  </div>
                  <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{row.agencies}</span>
                  </div>
                  <div className="text-sky-900 font-medium text-center flex items-center justify-center gap-1.5 px-2 bg-sky-50/80 py-2 rounded-lg border border-sky-200">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>{row.divanex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
