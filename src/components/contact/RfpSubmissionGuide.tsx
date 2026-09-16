"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { CheckSquare } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Fast-Track Checklist",
  "title": "How to Submit an RFP or",
  "highlight": "Technical Project Brief",
  "description": "Have existing documentation? You can attach files or include links directly in our contact form for immediate analysis."
};

const DEFAULT_ITEMS = [
    { label: "Executive Summary / Pitch Deck", desc: "PDF or Notion link explaining the vision and business context." },
    { label: "Feature Requirements or User Stories", desc: "Bullet-point list of primary features for MVP vs Phase 2." },
    { label: "Design References or Figma Links", desc: "Wireframes, UI mockups, or competitor references." },
    { label: "Target Launch Date & Milestones", desc: "Your desired go-to-market timeline (e.g., within 8 weeks)." }
  ];

export default function RfpSubmissionGuide() {
  const { heading, items: items } = useSection("contact/rfp", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <CheckSquare className="w-3.5 h-3.5 text-sky-600" />
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
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 relative group"
            >
              <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-lg border border-sky-200 block w-fit mb-3">
                CHECK 0{idx + 1}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.label}</h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
