"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Calendar, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Velocity Track Record",
  "title": "Average Time-to-Production:",
  "highlight": "4 to 12 Weeks",
  "description": "Across our production software releases, here is how our predictable sprint cadence transforms requirements into high-performance platforms."
};

const DEFAULT_ITEMS = [
    {
      sprint: "Sprint 01-02",
      duration: "Weeks 1-4",
      milestone: "Architecture & Interactive Staging MVP",
      detail: "Database schema migrations, auth endpoints, core business logic, and clickable frontend prototype deployed to preview branch."
    },
    {
      sprint: "Sprint 03-04",
      duration: "Weeks 5-8",
      milestone: "Feature Integration & External APIs",
      detail: "Stripe/Razorpay billing, 3rd party webhooks, automated email flows, background job workers, and automated test passes."
    },
    {
      sprint: "Sprint 05-06",
      duration: "Weeks 9-12",
      milestone: "Security Hardening & Production Launch",
      detail: "OWASP penetration test scan, load testing to 10k RPM, DNS switchover, and live launch under 24/7 monitoring."
    }
  ];

export default function ClientDeliveryTimeline() {
  const { heading, items: milestones } = useSection("portfolio/timeline", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
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
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-800">
                    {m.sprint}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-semibold">{m.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.milestone}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">{m.detail}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-mono text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>VERIFIABLE DELIVERABLE GATE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
