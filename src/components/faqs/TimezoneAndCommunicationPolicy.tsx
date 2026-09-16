"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Clock, Laptop } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Collaboration Discipline",
  "title": "Timezone &",
  "highlight": "Communication Policy",
  "description": "Distance is never a barrier. Our battle-tested async protocols ensure high velocity across global timezones."
};

const DEFAULT_ITEMS = [
    {
      title: "Guaranteed 4-Hour Daily Working Overlap",
      desc: "Whether you are located in New York (EST), California (PST), London (GMT), or Dubai (GST), our teams maintain a guaranteed 4-hour daily overlap for live syncs."
    },
    {
      title: "Async-First Culture with Loom & Linear",
      desc: "No unnecessary meetings. Detailed video walkthroughs, clear ticket specifications on Linear, and daily Slack digests keep decisions moving 24/7."
    },
    {
      title: "Direct WhatsApp Business Channel",
      desc: "Direct access to your dedicated technical lead on WhatsApp for urgent queries, with a verified sub-15 minute response time during business hours."
    },
    {
      title: "Zero Junior Account Manager Buffers",
      desc: "You converse directly with the engineers and architects writing your code, eliminating misunderstandings and game-of-telephone delays."
    }
  ];

export default function TimezoneAndCommunicationPolicy() {
  const { heading, items: policies } = useSection("faqs/timezone", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
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
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
