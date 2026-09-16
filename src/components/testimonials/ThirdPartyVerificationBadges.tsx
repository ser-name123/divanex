"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Award, Star, CheckCircle } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Independent Verification",
  "title": "Third-Party Verified",
  "highlight": "Industry Accolades",
  "description": "Don't just take our word for it. Independent B2B review portals consistently rank Divanex among the top software engineering teams globally."
};

const DEFAULT_ITEMS = [
    { platform: "Clutch Global Leader", rating: "4.9 / 5.0", reviews: "38 Verified Reviews" },
    { platform: "Google Verified Partner", rating: "5.0 / 5.0", reviews: "52 Reviews" },
    { platform: "GoodFirms Top Custom Software", rating: "4.95 / 5.0", reviews: "29 Verified Reviews" },
    { platform: "G2 High Performer 2025", rating: "4.9 / 5.0", reviews: "Enterprise Software" }
  ];

export default function ThirdPartyVerificationBadges() {
  const { heading, items: badges } = useSection("testimonials/verification", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Award className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 text-center flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-center gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{b.platform}</h3>
                <div className="text-xl font-black font-mono text-sky-700 mb-1.5">{b.rating}</div>
                <p className="text-slate-500 text-xs font-medium">{b.reviews}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1 text-[11px] font-mono font-semibold text-emerald-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>VERIFIED ACCREDITATION</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
