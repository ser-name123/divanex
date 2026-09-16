"use client";

import { usePageContent } from "@/context/SiteContentContext";

export default function PartnerTicker() {
  const content = usePageContent();
  const partners = content.partners ?? [];

  return (
    <section className="relative py-5 sm:py-6 overflow-hidden bg-gradient-to-r from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] border-y border-slate-200/90 shadow-inner">
      {/* Background Ambient Mesh Light Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-32 bg-[#0f7670]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-32 bg-[#5c9556]/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #000838 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Header Eyebrow */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/90 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5c9556] animate-pulse" />
          <p className="text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-slate-600">
            {content.partnersEyebrow || "POWERING HIGH-GROWTH STARTUPS & ENTERPRISE WORKFLOWS WITH PROVEN TECH ECOSYSTEMS"}
          </p>
        </div>
      </div>

      {/* Ticker Track with Smooth Side Fade Masks */}
      <div className="relative w-full overflow-hidden z-10">
        {/* Left Fade Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-20 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none" />

        {/* Right Fade Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-20 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none" />

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-5 sm:gap-6 py-1">
          {[...partners, ...partners, ...partners].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 hover:border-[#0f7670]/50 hover:shadow-lg hover:shadow-[#0f7670]/10 transition-all duration-300 shadow-xs whitespace-nowrap group cursor-default transform hover:-translate-y-0.5"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-2xs">
                {item.badge}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-[#000838] group-hover:text-[#0f7670] transition-colors leading-tight">
                  {item.name}
                </span>
                <span className="text-[11px] font-mono font-semibold text-[#0f7670] leading-tight mt-0.5">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
