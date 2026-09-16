"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Clock } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Response Velocity",
  "title": "What Happens After You Contact Us:",
  "highlight": "24-Hour SLA Timeline",
  "description": "No sales queues or weeks of silence. Here is our exact hour-by-hour onboarding protocol once you hit send."
};

const DEFAULT_ITEMS = [
    {
      hour: "Hour 01",
      title: "Inquiry Ingestion & Mutual NDA",
      desc: "Our automated system logs your inquiry, assigns an engineering ticket, and sends a mutual NDA if requested."
    },
    {
      hour: "Hour 04",
      title: "Senior Architect Technical Review",
      desc: "A principal engineer reviews your feature list, technology constraints, and API requirements to prepare initial architecture questions."
    },
    {
      hour: "Hour 12",
      title: "Discovery Call & Clarification",
      desc: "We host an optional 20-minute video sync to resolve any open questions regarding database scale or third-party integrations."
    },
    {
      hour: "Hour 24",
      title: "Locked Proposal & Milestone Schedule",
      desc: "You receive a formal proposal containing technical architecture recommendations, sprint breakdown, timeline, and locked milestone pricing."
    }
  ];

export default function WhatHappensIn24Hours() {
  const { heading, items: steps } = useSection("contact/24-hours", {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 relative group"
            >
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-800 inline-block mb-3">
                {s.hour}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
