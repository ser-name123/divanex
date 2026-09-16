"use client";

import { ShieldCheck } from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { accent } from "@/lib/accents";
import { usePageContent } from "@/context/SiteContentContext";
import RichText from "@/components/RichText";

export default function SecurityComplianceSection() {
  // Admin-managed: compliance claims are the copy most likely to need a fast
  // correction, and these were literals in the component.
  const content = usePageContent();
  const heading = content.securityHeading;
  const securityPillars = content.securityPillars ?? [];

  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/50 overflow-hidden border-y border-slate-200">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {securityPillars.map((pillar, idx) => {
            const tone = accent(pillar.accent);
            return (
              <div
                key={pillar.id}
                className={`reveal-init reveal-delay-${idx + 1} bg-white rounded-3xl p-7 border ${tone.border} hover:shadow-lg transition-all duration-300 space-y-4 group shadow-sm`}
              >
                <div className={`w-12 h-12 rounded-2xl ${tone.surface} border ${tone.border} flex items-center justify-center group-hover:scale-105 transition-transform shadow-2xs`}>
                  <Icon name={pillar.icon} className={`w-6 h-6 ${tone.text}`} />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className={`text-xs font-mono font-bold ${tone.text}`}>
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                    <RichText inline value={pillar.description} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
