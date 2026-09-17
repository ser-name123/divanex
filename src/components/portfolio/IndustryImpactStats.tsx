"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  DollarSign,
  Activity,
  ShoppingCart,
  Truck,
  TrendingUp
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "CROSS-INDUSTRY EXPERTISE",
  "title": "Delivering Impact Across",
  "highlight": "Diverse Verticals",
  "description": "Our architectural primitives power mission-critical platforms across heavily regulated, high-concurrency industries."
};

const DEFAULT_ITEMS = [
    { name: "FinTech & Payments", stat: "Enterprise", label: "Multi-Currency & High-Throughput Gateways", icon: DollarSign },
    { name: "HealthTech & Telehealth", stat: "HIPAA-Ready", label: "Patient Portals & Encrypted EHR Workflows", icon: Activity },
    { name: "E-Commerce & Retail", stat: "Sub-Second", label: "High-Conversion Multi-Vendor Architecture", icon: ShoppingCart },
    { name: "Supply Chain & Logistics", stat: "Real-Time", label: "Live Telemetry & Fleet Route Optimization", icon: Truck }
  ];

export default function IndustryImpactStats() {
  const { heading, items: industries } = useSection("portfolio/impact", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="reveal-init bg-white rounded-3xl p-7 border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-sky-600" />
                </div>
                <div className="text-3xl font-extrabold font-mono text-sky-600">
                  {ind.stat}
                </div>
                <div className="text-base font-bold text-slate-900">
                  {ind.name}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {ind.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
