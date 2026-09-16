"use client";

import Link from "next/link";
import { usePageContent } from "@/context/SiteContentContext";
import { Icon } from "@/lib/iconRegistry";
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, Award, Lock, Users, Zap, Check, Sparkles, Layers } from "lucide-react";
import RichText from "@/components/RichText";

const QUICK_PROOF_POINTS = [
  "10+ Years Engineering Experience",
  "100% Source Code Ownership",
  "Dedicated Development Team",
  "Weekly Staging & Demos",
  "NDA & IP Protection",
  "Post-Launch Support",
  "Web + Mobile + AI Under One Team"
];

export default function WhyChooseUs() {
  // Admin-managed: the pillars, the comparison table and every heading here
  // were literals, so a positioning change meant editing this component.
  const content = usePageContent();
  const heading = content.whyUsHeading || {
    eyebrow: "REAL PROOF // WHY COMPANIES CHOOSE DIVANEX",
    title: "Why Companies Choose",
    highlight: "Divanex",
    description: "Real engineering experience, verifiable weekly milestones, and 100% intellectual property protection—without agency bloat or junior handoffs."
  };
  const pillars = content.whyUsPillars ?? [];
  const comparison = content.whyUsComparison ?? [];
  const comparisonHeading = content.comparisonHeading || {
    eyebrow: "MARKET BENCHMARK AUDIT",
    title: "Us, an Agency, or a Freelancer",
    description: "All three can work. Here is where each one tends to struggle, so you can judge which trade-off suits your project."
  };
  const columns = content.comparisonColumns || {
    feature: "What you are comparing",
    divanex: "Working with us",
    traditional: "A traditional agency",
    freelancers: "A solo freelancer"
  };

  return (
    <section id="why-us" className="relative py-12 lg:py-16 bg-white overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span className="tracking-wider uppercase">{heading.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-tight text-slate-900">
            {heading.title}{" "}
            <span className="gradient-text font-semibold">{heading.highlight}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        {/* 7-Point Real Proof Checklist Banner */}
        <div className="reveal-init mt-8 sm:mt-10 rounded-2xl bg-gradient-to-r from-sky-50/70 via-white to-emerald-50/60 border border-sky-200/90 p-4 sm:p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-[13px] font-bold text-slate-800 font-mono">
            {QUICK_PROOF_POINTS.map((pt, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-emerald-800 bg-white/80 px-3 py-1 rounded-lg border border-emerald-200/70 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pt}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 7 Concrete Pillars Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`reveal-init reveal-delay-${(idx % 4) + 1} bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300`}
            >
              {/* Subtle top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${pillar.color || "#0f7670"}, transparent)`
                }}
              ></div>

              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 flex items-center justify-center text-sky-700 group-hover:scale-105 transition-transform shadow-2xs">
                    <Icon name={pillar.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800">
                    {pillar.metrics}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono font-medium text-slate-500 mt-0.5 line-clamp-1">
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <RichText inline value={pillar.description} />
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-medium">
                <span className="text-slate-800 font-bold font-mono text-[11px]">{pillar.badge}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* HIGH-TECH COMPARISON MATRIX - LIGHT THEME */}
        {/* ======================================================== */}
        <div className="reveal-init reveal-delay-2 mt-12 sm:mt-14 rounded-3xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
                  {comparisonHeading.eyebrow}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                {comparisonHeading.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                {comparisonHeading.description}
              </p>
            </div>

            <Link
              href="/contact"
              className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm shrink-0 font-sans font-semibold !rounded-xl"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider text-[11px] border-b border-slate-200 font-mono">
                <tr>
                  <th className="py-4 px-6 font-semibold w-[22%]">{columns.feature}</th>
                  <th className="py-4 px-6 font-semibold text-sky-900 bg-sky-50/80 border-x border-sky-200/80 w-[32%]">
                    {columns.divanex}
                  </th>
                  <th className="py-4 px-6 font-medium text-slate-600 w-[23%]">{columns.traditional}</th>
                  <th className="py-4 px-6 font-medium text-slate-600 w-[23%]">{columns.freelancers}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 text-slate-700">
                {comparison.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 font-sans">{row.feature}</td>
                    <td className="py-4 px-6 font-medium text-sky-950 bg-sky-50/40 border-x border-sky-200/80 font-sans">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <RichText inline value={row.divanex} />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-sans font-normal">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <RichText inline value={row.traditional} />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-sans font-normal">
                      <div className="flex items-start gap-2.5">
                        <XCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <RichText inline value={row.freelancers} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

