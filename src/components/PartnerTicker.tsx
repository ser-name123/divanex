"use client";

import { usePageContent } from "@/context/SiteContentContext";

export default function PartnerTicker() {
  // Admin-managed: this was a hardcoded array, so adding a logo was a deploy.
  const content = usePageContent();
  const partners = content.partners ?? [];

  return (
    <section className="relative py-6 border-y border-slate-200/80 bg-slate-50/70 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-4 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500">
          {content.partnersEyebrow}
        </p>
      </div>

      {/* Ticker Container with gradient fades on left & right */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>

        {/* Marquee Track */}
        <div className="animate-marquee flex items-center gap-6">
          {[...partners, ...partners].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200 hover:border-sky-400 transition-all shadow-xs whitespace-nowrap group cursor-default"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">
                {item.badge}
              </span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-sky-700">
                  {item.name}
                </span>
                <span className="text-[11px] text-sky-600 font-semibold">
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
