"use client";

import { Star, Award } from "lucide-react";
import { useSection } from "@/lib/useSection";

/**
 * The review-platform strip.
 *
 * The ratings and the recognition badges used to be an array inside this file,
 * so a rating that moved could only be corrected by a developer — on a strip
 * whose entire purpose is to state current numbers.
 *
 * Brand marks stay in code: each one is bespoke lettering or an inline SVG, and
 * a platform the operator names without a mark falls back to its own name in
 * plain type rather than rendering nothing.
 */

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "WHERE CLIENTS REVIEW US",
  "title": "",
  "highlight": "",
  "description": "Public ratings on the platforms clients hire us through"
};

const DEFAULT_ITEMS = [
    { kind: "platform", name: "Google", rating: "4.7", reviewCount: "120+", logoType: "google" },
    { kind: "platform", name: "Freelancer", rating: "4.7", reviewCount: "98+", logoType: "freelancer" },
    { kind: "platform", name: "Clutch", rating: "4.7", reviewCount: "45+", logoType: "clutch" },
    { kind: "platform", name: "Upwork", rating: "4.7", reviewCount: "150+", logoType: "upwork" },
    { kind: "platform", name: "Fiverr", rating: "4.7", reviewCount: "210+", logoType: "fiverr" },
    { kind: "badge", name: "GoodFirms", initials: "GF", subLabel: "Top Rated", markColor: "#1a5ed8", subColor: "#0f7670" },
    { kind: "badge", name: "TopDevelopers", initials: "TD", subLabel: "Best Web Dev", markColor: "#000838", subColor: "#41703c" }
  ];

/**
 * An index signature, because `useSection` merges a stored record over this
 * one: a field an operator adds has to be assignable even though the component
 * does not read it.
 */
interface RatingItem extends Record<string, unknown> {
  kind?: string;
  name?: string;
  rating?: string;
  reviewCount?: string;
  logoType?: string;
  initials?: string;
  subLabel?: string;
  markColor?: string;
  subColor?: string;
}

/** The lettering each platform is recognised by. Unknown names render plainly. */
function BrandMark({ logoType, name }: { logoType?: string; name?: string }) {
  if (logoType === "google") {
    return (
      <span className="font-bold text-sm tracking-tight flex items-center">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    );
  }

  if (logoType === "freelancer") {
    return (
      <span className="flex items-center gap-1 font-bold text-xs text-[#15719f]">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M14.07 3.5L9.67 9.88l3.18 2.45 6.08-8.83h-4.86zm-5.75 3.5l-4.82 7 6.46 3.63 1.54-7-3.18-3.63z" />
        </svg>
        <span className="font-extrabold text-slate-800 tracking-tight">freelancer</span>
      </span>
    );
  }

  if (logoType === "clutch") {
    return (
      <span className="font-black text-sm tracking-tight text-[#16313a] flex items-center">
        Clutch<span className="text-[#ff5034] text-base leading-none">.</span>co
      </span>
    );
  }

  if (logoType === "upwork") {
    return <span className="font-extrabold text-sm tracking-tight text-[#0e7a00]">upwork</span>;
  }

  if (logoType === "fiverr") {
    return (
      <span className="font-black text-sm tracking-tight text-[#00791e] flex items-center">
        fiverr<span className="w-1.5 h-1.5 rounded-full bg-[#00791e] ml-0.5 inline-block" />
      </span>
    );
  }

  return <span className="font-bold text-sm tracking-tight text-slate-800">{name}</span>;
}

export default function GlobalRatingsStrip() {
  const { heading, items } = useSection<RatingItem>("home/ratings", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });

  const platforms = items.filter((item) => item.kind !== "badge");
  const badges = items.filter((item) => item.kind === "badge");

  return (
    <section className="relative py-4 sm:py-5 bg-white/95 backdrop-blur-xl border-y border-slate-200/90 shadow-2xs overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#5c9556] flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono font-bold tracking-wider text-[#000838] uppercase">
                  {heading.eyebrow}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5c9556] animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-600 font-medium">{heading.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-wrap flex-1">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-[#0f7670]/40 transition-all duration-300 shadow-2xs hover:shadow-xs group cursor-default"
              >
                <div className="flex items-center">
                  <BrandMark logoType={platform.logoType} name={platform.name} />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 font-mono leading-none">
                      {platform.rating}
                    </span>
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-600 leading-tight">Rating</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs"
              >
                <div
                  className="w-5 h-5 rounded-md text-white flex items-center justify-center font-bold text-[10px] font-mono"
                  style={{ backgroundColor: badge.markColor || "#000838" }}
                >
                  {badge.initials}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold leading-tight">{badge.name}</span>
                  <span
                    className="text-[9px] font-mono font-semibold leading-tight"
                    style={{ color: badge.subColor || "#0f7670" }}
                  >
                    {badge.subLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
