"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { HeartHandshake } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "WHAT HAPPENS AFTERWARDS",
  "title": "Most Clients",
  "highlight": "Come Back",
  "description": "The honest measure of an engineering team is not the launch. It is whether anyone wants to work with them again once they have seen how the project really went."
};

const DEFAULT_ITEMS = [
    {
      value: "96%",
      label: "Came back for more work",
      desc: "A second phase, a new product, or an ongoing arrangement to keep the first one healthy.",
    },
    {
      value: "18+ mo",
      label: "Typical length of a relationship",
      desc: "Most engagements do not end at handover. They turn into a smaller, steadier amount of work.",
    },
    {
      value: "84%",
      label: "Arrived through a recommendation",
      desc: "Most new projects come from someone we already built for telling someone else.",
    },
    {
      value: "0",
      label: "Clients locked in",
      desc: "Nobody stays because leaving would be difficult. The repository and the accounts are theirs the whole time.",
    }
  ];

export default function ClientRetentionMetrics() {
  const { heading, items: metrics } = useSection("why-us/retention", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <HeartHandshake className="w-3.5 h-3.5 text-blue-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 text-center flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-black font-mono text-sky-700 mb-2">
                  {m.value}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{m.label}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-slate-500">
                OUR OWN CLIENT RECORDS
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
