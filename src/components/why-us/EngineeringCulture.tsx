"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Users } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "THE DIVANEX ENGINEERING BAR",
  "title": "A High-Caliber",
  "highlight": "Engineering Culture",
  "description": "We treat software as an engineering discipline, not a creative experiment. We prioritize type-safety, maintainability, and clean architecture over flashy shortcuts that lead to technical debt."
};

const DEFAULT_ITEMS = [
    {
      title: "Senior-Only Engineers",
      desc: "Zero junior bait-and-switch. Every team member working on your codebase has at least 5+ years of production SaaS and distributed systems experience."
    },
    {
      title: "Radical Transparency",
      desc: "You have real-time access to our pull requests, code reviews, and project issue boards. If there is a roadblock, you know about it immediately."
    },
    {
      title: "Continuous Code Reviews",
      desc: "No code merges to staging without dual peer reviews checking for memory leaks, SQL indexing, OWASP vulnerabilities, and UX consistency."
    }
  ];

export default function EngineeringCulture() {
  const { heading, items: standards } = useSection("why-us/culture", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>{heading.eyebrow}</span>
          </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              <RichText inline value={heading.description} />
            </p>
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
              ✦ Average Engineering Tenure: 7.2 Years in High-Growth SaaS
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="reveal-init bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-100/80 border border-sky-200 flex items-center justify-center text-sky-700 font-extrabold font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {std.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium pl-11 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
