"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Award, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Audited Client Feedback",
  "title": "Institutional Net Promoter Score:",
  "highlight": "98.4 NPS",
  "description": "Software engineering agencies typically average 35-45 NPS. Our relentless dedication to clean code and predictable delivery places us in the top 1% globally."
};

const DEFAULT_ITEMS = [
    { category: "Architectural Caliber & Code Cleanliness", score: "99.2%" },
    { category: "Adherence to Sprint Deadlines", score: "98.4%" },
    { category: "Communication Transparency & Responsiveness", score: "99.8%" },
    { category: "Post-Launch Hypercare Support", score: "97.6%" }
  ];

export default function NpsScorecard() {
  const { heading, items: scores } = useSection("testimonials/nps", {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scores.map((s, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm sm:text-base font-bold text-slate-900">{s.category}</span>
              </div>
              <span className="text-xl font-black font-mono text-sky-700 shrink-0">
                {s.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
