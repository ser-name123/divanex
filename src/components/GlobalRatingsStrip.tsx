"use client";

import { Star, ShieldCheck, Award, ExternalLink } from "lucide-react";

interface PlatformReview {
  name: string;
  rating: string;
  stars: number;
  reviewCount?: string;
  logoType: "google" | "freelancer" | "clutch" | "upwork" | "fiverr" | "goodfirms" | "topdev";
}

export default function GlobalRatingsStrip() {
  const platforms: PlatformReview[] = [
    { name: "Google", rating: "4.7", stars: 5, reviewCount: "120+", logoType: "google" },
    { name: "Freelancer", rating: "4.7", stars: 5, reviewCount: "98+", logoType: "freelancer" },
    { name: "Clutch", rating: "4.7", stars: 5, reviewCount: "45+", logoType: "clutch" },
    { name: "Upwork", rating: "4.7", stars: 5, reviewCount: "150+", logoType: "upwork" },
    { name: "Fiverr", rating: "4.7", stars: 5, reviewCount: "210+", logoType: "fiverr" },
  ];

  return (
    <section className="relative py-6 bg-white/95 backdrop-blur-xl border-y border-slate-200/90 shadow-2xs overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Title / Credibility Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#5c9556] flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold tracking-wider text-[#000838] uppercase">
                  VERIFIED CLIENT RATINGS
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5c9556] animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Consistently Rated 4.7+ Across Top Global Tech Platforms
              </p>
            </div>
          </div>

          {/* Center: Multi-Platform Rating Badges */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap flex-1">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#0f7670]/40 transition-all duration-300 shadow-2xs hover:shadow-xs group cursor-default"
              >
                {/* Custom Brand Mark */}
                <div className="flex items-center">
                  {p.logoType === "google" && (
                    <span className="font-bold text-sm tracking-tight flex items-center">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">o</span>
                      <span className="text-[#FBBC05]">o</span>
                      <span className="text-[#4285F4]">g</span>
                      <span className="text-[#34A853]">l</span>
                      <span className="text-[#EA4335]">e</span>
                    </span>
                  )}
                  {p.logoType === "freelancer" && (
                    <span className="flex items-center gap-1 font-bold text-xs text-[#29b2fe]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M14.07 3.5L9.67 9.88l3.18 2.45 6.08-8.83h-4.86zm-5.75 3.5l-4.82 7 6.46 3.63 1.54-7-3.18-3.63z" />
                      </svg>
                      <span className="font-extrabold text-slate-800 tracking-tight">freelancer</span>
                    </span>
                  )}
                  {p.logoType === "clutch" && (
                    <span className="font-black text-sm tracking-tight text-[#16313a] flex items-center">
                      Clutch<span className="text-[#ff5034] text-base leading-none">.</span>co
                    </span>
                  )}
                  {p.logoType === "upwork" && (
                    <span className="font-extrabold text-sm tracking-tight text-[#14a800]">
                      upwork
                    </span>
                  )}
                  {p.logoType === "fiverr" && (
                    <span className="font-black text-sm tracking-tight text-[#00b22d] flex items-center">
                      fiverr<span className="w-1.5 h-1.5 rounded-full bg-[#00b22d] ml-0.5 inline-block" />
                    </span>
                  )}
                </div>

                {/* Rating Number & Stars */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 font-mono leading-none">
                      {p.rating}
                    </span>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-400 leading-tight">
                    Rating
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Industry Recognitions Badges (GoodFirms & TopDevelopers) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* GoodFirms Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs">
              <div className="w-5 h-5 rounded-md bg-[#2575fc] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                GF
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold leading-tight">GoodFirms</span>
                <span className="text-[9px] text-[#0f7670] font-mono font-semibold leading-tight">Top Rated</span>
              </div>
            </div>

            {/* TopDevelopers Shield Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs">
              <div className="w-5 h-5 rounded-md bg-[#000838] text-white flex items-center justify-center font-bold text-[10px] font-mono">
                TD
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold leading-tight">TopDevelopers</span>
                <span className="text-[9px] text-[#5c9556] font-mono font-semibold leading-tight">Best Web Dev</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
