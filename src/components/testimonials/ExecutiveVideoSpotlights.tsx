"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Play, MessageSquareQuote } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Executive Testimonials",
  "title": "Founder & CTO",
  "highlight": "Video & Case Spotlights",
  "description": "Hear directly from technical decision-makers why they trust Divanex with their mission-critical software codebases."
};

const DEFAULT_ITEMS = [
    {
      author: "Marcus Vance",
      role: "CTO, CloudScale Inc (San Francisco, CA)",
      quote: "Divanex took over our stalled Kubernetes migration and delivered it 3 weeks ahead of schedule. Their architectural discipline is unmatched.",
      badge: "VERIFIED CTO REVIEW"
    },
    {
      author: "Elena Rostova",
      role: "Founder, MedSync AI (London, UK)",
      quote: "The autonomous RAG agent they built increased our clinical query speed by 400%. They are true senior engineering partners.",
      badge: "VERIFIED FOUNDER REVIEW"
    }
  ];

export default function ExecutiveVideoSpotlights() {
  const { heading, items: spotlights } = useSection("testimonials/spotlights", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <MessageSquareQuote className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spotlights.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-sky-800 block w-fit mb-4">
                  {s.badge}
                </span>
                <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed mb-6 font-normal">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{s.author}</div>
                  <div className="text-xs text-slate-500 font-medium">{s.role}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                  <Play className="w-4 h-4 fill-sky-600 ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
