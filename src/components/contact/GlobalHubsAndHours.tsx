"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Building2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "GLOBAL REACH // LOCAL OVERLAP",
  "title": "Global Client Coverage &",
  "highlight": "Regional Desks",
  "description": "Centralized engineering delivered from our Jaipur HQ, with dedicated representative client coverage across APAC, MENA, and North America."
};

const DEFAULT_ITEMS = [
  {
    city: "Jaipur — Engineering HQ (India)",
    tz: "IST (UTC+5:30)",
    hours: "10:00 AM - 08:00 PM",
    coverage: "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur 302021 • Phone: +91-6375073511 • Mail: business@divanextechnologies.com"
  },
  {
    city: "Hong Kong — APAC Client Coverage",
    tz: "HKT (UTC+8:00)",
    hours: "09:00 AM - 07:00 PM",
    coverage: "FLAT/RM E (36) 3/F Superluck Industrial Centre Phase 2, 57 Sha Tsui Rd, Tsuen Wan, Hong Kong • Phone: +852-90270926"
  },
  {
    city: "Dubai — MENA Client Coverage",
    tz: "GST (UTC+4:00)",
    hours: "10:00 AM - 07:00 PM",
    coverage: "Building C8, Dubai Media City, Dubai, United Arab Emirates • Direct Line: +91-6375073511"
  },
  {
    city: "Canada — North America Client Coverage",
    tz: "EST (UTC-5:00)",
    hours: "09:00 AM - 06:00 PM",
    coverage: "105 Sawmill Valley Dr, Newmarket, ON L3X 1S4, Canada • Direct Line: +91-6375073511"
  }
];

export default function GlobalHubsAndHours() {
  const { heading, items: hubs } = useSection("contact/hubs", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900">{hub.city}</h3>
                  <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200">
                    {hub.tz}
                  </span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm text-slate-600 font-medium">
                  <p><strong className="text-slate-800 font-bold">Live Support Hours:</strong> {hub.hours}</p>
                  <p><strong className="text-slate-800 font-bold">Territory Scope:</strong> {hub.coverage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
