"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/lib/iconRegistry";
import { accent } from "@/lib/accents";
import { usePageContent } from "@/context/SiteContentContext";


export default function StatsSection() {
  // Admin-managed stat counters with fallback to seed data
  const stats = usePageContent().statCounters ?? [];

  const [inView, setInView] = useState(true);
  // Initialize with target values so server-side rendering and initial mount never display 0
  const [counts, setCounts] = useState<number[]>(() => stats.map((s) => s.target));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep counts in sync with any updated stats from context
    setCounts(stats.map((s) => s.target));
  }, [stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 lg:py-10 bg-slate-50/60 border-y border-slate-200/80 overflow-hidden"
    >
      {/* Subtle pulsing background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none animate-soft-pulse"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const tone = accent(stat.accent);
            const delayClass = `reveal-delay-${idx + 1}`;
            return (
              <div
                key={stat.id}
                className={`reveal-init ${delayClass} bg-white rounded-3xl p-7 border border-slate-200 ${tone.hoverBorder} hover:scale-[1.03] transition-all duration-500 space-y-4 group shadow-sm hover:shadow-xl ${tone.glow}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${tone.surface} ${tone.text} ${tone.border} border flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-2xs`}>
                    <Icon name={stat.icon} className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Verified
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className={`text-4xl sm:text-5xl font-bold tracking-tight ${tone.text} flex items-baseline gap-0.5 tabular-nums`}>
                    <span>{counts[idx] !== undefined ? counts[idx] : stat.target}</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-600 font-medium leading-relaxed">
                    {stat.subtitle}
                  </div>
                </div>

                {/* Micro telemetry bar */}
                <div className="pt-2">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-sky-500 transition-all duration-1000 ease-out"
                      style={{
                        width: inView ? "100%" : "0%",
                        transitionDelay: `${idx * 150}ms`
                      }}
                    ></div>
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
