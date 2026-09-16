"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { PhoneCall, ArrowRight } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Direct Founder Verification",
  "title": "Request a 1-on-1 Confidential Client Reference Call",
  "highlight": "",
  "description": "Evaluating a major enterprise contract or $25k+ development sprint? We are pleased to connect you directly with existing founders and CTOs who have scaled their platforms with our engineering pods."
};

const DEFAULT_CTA = {
  "label": "Schedule Reference Call",
  "href": "/contact"
};

export default function ClientReferenceCallPolicy() {
  const { heading, cta } = useSection("testimonials/reference-calls", {
    heading: DEFAULT_HEADING,
    items: [],
    cta: DEFAULT_CTA,
  });

  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase">
              <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
              <span>{heading.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {heading.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              <RichText inline value={heading.description} />
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 rounded-xl btn-futuristic-primary text-sm shadow-md"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
