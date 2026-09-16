"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Headphones, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Operational Continuity",
  "title": "Post-Launch Support &",
  "highlight": "Hypercare Guide",
  "description": "We don't abandon you on launch day. Our comprehensive post-deployment protocols ensure smooth production operations."
};

const DEFAULT_ITEMS = [
    {
      title: "30-Day Zero-Cost Hypercare",
      badge: "INCLUDED IN ALL BUILDS",
      desc: "Immediate priority bug fixing for any discrepancies against agreed sprint specifications, server log monitoring, and DNS stabilization."
    },
    {
      title: "Ongoing Monthly Maintenance Pod",
      badge: "OPTIONAL RETAINER",
      desc: "Dedicated senior engineer allocated for security dependency updates, framework patching, performance audits, and small feature backlogs."
    },
    {
      title: "24/7 Production Incident SLA",
      badge: "CRITICAL PLATFORMS",
      desc: "Under 15-minute P1 response time guarantee with direct on-call pager escalation for high-volume SaaS, fintech, and e-commerce applications."
    }
  ];

export default function PostLaunchSupportGuide() {
  const { heading, items: tiers } = useSection("faqs/support", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Headphones className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-800 block w-fit mb-3">
                  {t.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{t.desc}</p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center gap-1.5 text-xs text-emerald-700 font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>CONTRACTUAL SLA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
