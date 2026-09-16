"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Globe, MapPin } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Worldwide Reach",
  "title": "Trusted Across 15+ Nations:",
  "highlight": "Global Client Footprint",
  "description": "We operate seamlessly across Pacific, Eastern, GMT, GST, and IST time zones with structured async workflows and dedicated overlaps."
};

const DEFAULT_ITEMS = [
    {
      region: "North America (US & Canada)",
      clients: "22+ Deployments",
      hubs: "San Francisco, New York, Austin, Toronto",
      focus: "AI SaaS, FinTech, Web3 Protocols"
    },
    {
      region: "United Kingdom & Europe",
      clients: "14+ Deployments",
      hubs: "London, Berlin, Amsterdam, Zurich",
      focus: "GDPR Enterprise Platforms, HealthTech"
    },
    {
      region: "Middle East (GCC & UAE)",
      clients: "8+ Deployments",
      hubs: "Dubai, Abu Dhabi, Riyadh",
      focus: "E-Commerce, Government Portals, Logistics"
    },
    {
      region: "Asia Pacific & India",
      clients: "12+ Deployments",
      hubs: "Singapore, Bengaluru, Mumbai",
      focus: "High-Concurrency Mobile Apps, Quick Commerce"
    }
  ];

export default function GlobalClientMap() {
  const { heading, items: regions } = useSection("testimonials/map", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
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
          {regions.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <h3 className="text-lg font-bold text-slate-900">{r.region}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                    {r.clients}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-600 font-medium">
                  <p><strong className="text-slate-800 font-bold">Active Hubs:</strong> {r.hubs}</p>
                  <p><strong className="text-slate-800 font-bold">Primary Focus:</strong> {r.focus}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
