"use client";

import { useSection } from "@/lib/useSection";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { whatsappUrl } from "@/lib/contactLinks";
import RichText from "@/components/RichText";
import { AlertTriangle, PhoneCall } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Critical Project Rescue & Emergency Hotline",
  "title": "Stalled Project, Active Production Outage, or Ghosting Agency?",
  "highlight": "",
  "description": "If your current vendor has abandoned a critical release or you have an active production emergency requiring immediate senior engineering intervention, trigger our rapid emergency response pod."
};

const ESCALATION_MESSAGE = "EMERGENCY: Need Immediate Technical Escalation";

const DEFAULT_CTA = {
  "label": "Trigger Emergency Call",
  // Filled in from the site config at render. A number baked in here is one
  // more place to miss when the agency's WhatsApp line changes.
  "href": ""
};

export default function EmergencyEscalationProtocol() {
  const siteConfig = useSiteConfig();

  const { heading, cta } = useSection("contact/escalation", {
    heading: DEFAULT_HEADING,
    items: [],
    cta: DEFAULT_CTA,
  });

  // An operator who set their own link in Page Sections keeps it; otherwise
  // the escalation goes to the WhatsApp number in the site config.
  const escalationHref = cta.href || whatsappUrl(siteConfig, ESCALATION_MESSAGE);

  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-rose-50/70 border border-rose-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-mono font-bold tracking-wider uppercase">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{heading.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {heading.title}
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed font-normal">
              <RichText inline value={heading.description} />
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <a
              href={escalationHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors shadow-lg shadow-rose-600/20"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{cta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
