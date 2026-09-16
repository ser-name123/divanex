"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { ShieldCheck, Lock, RefreshCw, Award, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Zero Downside Commitment",
  "title": "Institutional",
  "highlight": "Risk Reversal Guarantees",
  "description": "We eliminate the anxiety of outsourcing software development with legally enforceable warranties, IP escrow, and milestone-gated payment releases."
};

const DEFAULT_ITEMS = [
    {
      icon: ShieldCheck,
      title: "14-Day Sprint Milestone Guarantee",
      desc: "If our initial 14-day sprint deliverables do not meet the exact architectural specifications defined in our statement of work, we revise at zero additional cost until approved."
    },
    {
      icon: Lock,
      title: "Clean Source Code Escrow & IP Transfer",
      desc: "Every line of code, Docker file, and schema migration is committed directly to your enterprise GitHub repository under an unrestricted, non-exclusive intellectual property deed."
    },
    {
      icon: RefreshCw,
      title: "30-Day Zero-Cost Hypercare Warranty",
      desc: "Following production deployment, our engineering team provides 30 calendar days of comprehensive bug-fixing and configuration monitoring at no additional charge."
    },
    {
      icon: Award,
      title: "Fixed-Price Scope Lock Protection",
      desc: "Once an estimate and sprint specification is signed, you are protected against unexpected budget creep. If a feature takes longer than expected, we absorb the cost."
    }
  ];

export default function RiskReversalGuarantees() {
  const { heading, items: guarantees } = useSection("why-us/guarantees", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guarantees.map((g, idx) => {
            const Icon = g.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 group flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {g.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-medium">
                    {g.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CONTRACTUALLY STIPULATED IN MASTER SERVICES AGREEMENT</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
