"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  Lock,
  FileCheck,
  KeyRound,
  ExternalLink
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Enterprise NDA & Confidentiality Notice",
  "title": "60%+ of Our Production Deployments Are Protected Under Mutual NDA",
  "highlight": "",
  "description": "Many of our high-scale enterprise contracts, proprietary algorithmic trading bots, and stealth-mode venture-backed platforms cannot be published publicly. We respect client confidentiality above all else."
};

const DEFAULT_CTA = {
  "label": "Request Private Architecture Demo",
  "href": "/contact"
};

export default function ConfidentialWorkNotice() {
  const { heading, cta } = useSection("portfolio/confidential", {
    heading: DEFAULT_HEADING,
    items: [],
    cta: DEFAULT_CTA,
  });

  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase">
                <Lock className="w-3.5 h-3.5 text-sky-600" />
                <span>{heading.eyebrow}</span>
            </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {heading.title}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                <RichText inline value={heading.description} />
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  Sanitized Code Samples on Request
                </span>
                <span className="flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-sky-600" />
                  Live Private Staging Walkthroughs
                </span>
              </div>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <a
                href={cta.href}
                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 rounded-xl btn-futuristic-primary text-sm shadow-md"
              >
                <span>{cta.label}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
