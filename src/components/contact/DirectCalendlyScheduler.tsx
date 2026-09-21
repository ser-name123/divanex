"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Calendar, Video, Clock, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Real-Time Calendar Sync",
  "title": "Book a 30-Minute",
  "highlight": "Technical Discovery Session",
  "description": "Skip email back-and-forth. Pick a slot directly on our lead architect's Google Calendar to discuss requirements, architecture schemas, and budget fit."
};

const DEFAULT_CTA = {
  "label": "Select Date & Time on Calendar",
  "href": "https://calendly.com"
};

export default function DirectCalendlyScheduler() {
  const { heading, cta } = useSection("contact/scheduler", {
    heading: DEFAULT_HEADING,
    items: [],
    cta: DEFAULT_CTA,
  });

  return (
    <section id="schedule" className="scroll-mt-24 py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>{heading.eyebrow}</span>
            </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {heading.title}{" "}
              <span className="gradient-text font-bold">{heading.highlight}</span>
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          <RichText inline value={heading.description} />
        </p>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-sky-950/5 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-600 mb-6 font-semibold">
            <span className="flex items-center gap-1.5 text-sky-700">
              <Clock className="w-4 h-4 text-sky-600" /> 30 Minutes
            </span>
            <span className="flex items-center gap-1.5 text-emerald-700">
              <Video className="w-4 h-4 text-emerald-600" /> Google Meet / Zoom
            </span>
            <span className="flex items-center gap-1.5 text-blue-700">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> 100% Free
            </span>
          </div>

          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-futuristic-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 !rounded-xl shadow-sm hover:shadow-md"
          >
            <Calendar className="w-5 h-5" />
            <span>{cta.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
