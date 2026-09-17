"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Check, X, Minus, Scale } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "THE HONEST COMPARISON",
  "title": "Us, an Agency, or a",
  "highlight": "Freelancer",
  "description": "All three models can work depending on your stage. Here is an honest look across team seniority, code ownership, progress transparency, and long-term support."
};

const DEFAULT_ITEMS = [
  {
    vector: "Senior engineers",
    freelancers: "Single developer working solo, without peer code reviews",
    agencies: "Assigned from available bench, often juniors behind an account manager",
    divanex: "Senior full-stack engineers and architects who design and write the code directly",
  },
  {
    vector: "100% Code ownership",
    freelancers: "Usually yours, provided repo and cloud credentials are fully handed over",
    agencies: "Proprietary agency frameworks, locked hosting, or restrictive IP clauses",
    divanex: "Day-1 repository access in your Git org & cloud accounts with full IP rights",
  },
  {
    vector: "Progress & transparency",
    freelancers: "Varies widely; updates can stall when juggling multiple client gigs",
    agencies: "Monthly slide deck status reports, with actual software shown near deadline",
    divanex: "Fortnightly clickable staging builds, recorded video walkthroughs & direct Slack pod",
  },
  {
    vector: "Post-launch support",
    freelancers: "Often unavailable once committed to subsequent freelance engagements",
    agencies: "Expensive monthly retainers and multi-day ticket queues",
    divanex: "Same engineering team provides hypercare, uptime monitoring & quick bug fixes",
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
              <div className="text-slate-700 font-semibold">What you are comparing</div>
              <div className="text-slate-600 font-medium text-center">A solo freelancer</div>
              <div className="text-slate-600 font-medium text-center">A traditional agency</div>
              <div className="text-sky-900 font-semibold text-center bg-sky-50 py-1 rounded">Working with us</div>
            </div>

            <div className="divide-y divide-slate-100">
              {comparisons.map((row: any, idx: number) => {
                const vectorLabel = row.vector || row.feature;
                const freelancerText = row.freelancers;
                const agencyText = row.agencies || row.traditional;
                const divanexText = row.divanex;

                return (
                  <div
                    key={idx}
                    className="grid grid-cols-4 p-5 items-center hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                  >
                    <div className="font-semibold text-slate-900 pr-4">{vectorLabel}</div>
                    <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                      <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{freelancerText}</span>
                    </div>
                    <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>{agencyText}</span>
                    </div>
                    <div className="text-sky-900 font-medium text-center flex items-center justify-center gap-1.5 px-2 bg-sky-50/80 py-2 rounded-lg border border-sky-200">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                      <span>{divanexText}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
