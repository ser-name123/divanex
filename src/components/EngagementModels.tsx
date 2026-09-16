"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Users } from "lucide-react";
import { usePageContent } from "@/context/SiteContentContext";
import { accent } from "@/lib/accents";
import RichText from "@/components/RichText";

export default function EngagementModels() {
  // Admin-managed: pricing models change, and this was a hardcoded array.
  const content = usePageContent();
  const heading = content.engagementHeading;
  const models = content.engagementModels ?? [];

  return (
    <section className="relative py-20 lg:py-28 bg-white border-y border-slate-200/80 overflow-hidden">
      {/* Laser Ambient Glows */}
      <div className="glow-orb-blue w-[400px] h-[400px] top-10 left-10 opacity-15 pointer-events-none"></div>
      <div className="glow-orb-cyan w-[400px] h-[400px] bottom-10 right-10 opacity-15 pointer-events-none"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span className="tracking-wider uppercase">{heading.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold tracking-tight text-slate-900">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        {/* 3 Models Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((model, idx) => {
            const tone = accent(model.accent);
            return (
            <div
              key={model.id}
              className={`reveal-init reveal-delay-${idx + 1} rounded-3xl p-7 sm:p-8 bg-white border ${tone.border} ${tone.hoverBorder} flex flex-col justify-between space-y-6 group hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden`}
            >
              <div className="space-y-4">
                <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${tone.surface} ${tone.text} ${tone.border}`}>
                  {model.badge}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {model.title}
                </h3>

                <p className="text-xs font-mono font-bold text-sky-700">
                  {model.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <RichText inline value={model.description} />
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Key Features & Deliverables:
                  </span>
                  {model.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href={model.ctaHref}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-sky-600 border border-slate-900 hover:border-sky-600 transition-all duration-300 shadow-md"
                >
                  <span>{model.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
