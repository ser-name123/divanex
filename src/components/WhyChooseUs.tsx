"use client";

import Link from "next/link";
import { usePageContent } from "@/context/SiteContentContext";
import { Icon } from "@/lib/iconRegistry";
import { ShieldCheck, CheckCircle2, ArrowRight, Sparkles, Layers } from "lucide-react";
import RichText from "@/components/RichText";

const QUICK_PROOF_POINTS = [
  "Senior Engineering Team",
  "Transparent Milestones",
  "Full Source-Code Ownership",
  "Modern Architecture",
  "Direct Communication",
  "Post-Launch Support"
];

export default function WhyChooseUs() {
  const content = usePageContent();
  const heading = content.whyUsHeading || {
    eyebrow: "WHY CLIENTS WORK WITH DIVANEX",
    title: "Why Clients Work With",
    highlight: "Divanex",
    description: "Senior engineering talent, transparent sprint milestones, 100% source-code ownership, modern architecture, direct communication, and dedicated post-launch support."
  };
  const pillars = content.whyUsPillars ?? [];

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

        {/* 6-Point Professional Proof Checklist Banner */}
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

        {/* 6 Concrete Client-First Pillars Grid (2x3 on desktop) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className={`reveal-init reveal-delay-${(idx % 3) + 1} bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 flex flex-col justify-between space-y-5 relative overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300`}
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

        {/* Bottom Professional Action Bar */}
        <div className="reveal-init mt-10 rounded-2xl p-5 sm:p-6 bg-slate-50/80 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#0f7670]" />
              <span>Senior Engineers • Direct Access • Zero Middleman Overhead</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Every build is led by full-stack architects with weekly staging demos and full repository access.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold border border-slate-200 transition-all cursor-pointer"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
