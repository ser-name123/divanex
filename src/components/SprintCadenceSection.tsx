"use client";

import { Clock } from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { accent } from "@/lib/accents";
import { usePageContent } from "@/context/SiteContentContext";
import RichText from "@/components/RichText";

export default function SprintCadenceSection() {
  // Admin-managed: the cadence is a promise to clients, so it has to be
  // editable without a deploy. It was a hardcoded array.
  const content = usePageContent();
  const heading = content.cadenceHeading;
  const steps = content.cadenceSteps ?? [];

  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/50 overflow-hidden border-y border-slate-200">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
            <Clock className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, idx) => {
            const tone = accent(step.accent);
            return (
              <div
                key={step.id}
                className={`reveal-init reveal-delay-${idx + 1} rounded-3xl bg-white p-7 border border-slate-200 hover:border-sky-300 transition-all duration-300 space-y-4 group relative overflow-hidden shadow-sm hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-slate-300 group-hover:text-sky-600 transition-colors">
                    {step.num}
                  </span>
                  <div className={`w-10 h-10 rounded-xl ${tone.surface} ${tone.border} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs`}>
                    <Icon name={step.icon} className={`w-5 h-5 ${tone.text}`} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-sky-700">
                    {step.time}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-normal">
                    <RichText inline value={step.description} />
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
