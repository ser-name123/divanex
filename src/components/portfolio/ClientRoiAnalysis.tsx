"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { TrendingUp, Clock, DollarSign, Zap, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "BUSINESS OUTCOMES",
  "title": "Client ROI &",
  "highlight": "Value Acceleration",
  "description": "We measure our success by the compounding revenue and speed advantages our code delivers to your balance sheet."
};

const DEFAULT_ITEMS = [
    { title: "3.8x Average ROI", desc: "Clients recoup their full engineering investment within an average of 5.4 months post-launch through new ARR.", icon: DollarSign },
    { title: "60% Faster Time to Market", desc: "Pre-tested architectural foundations cut engineering cycles from 9 months down to 10-12 weeks.", icon: Clock },
    { title: "45% Cloud Hosting Savings", desc: "Serverless edge functions and Dockerized right-sizing dramatically reduce runaway AWS / GCP monthly bills.", icon: Zap },
    { title: "99.999% Verified Uptime", desc: "Resilient automated failover configurations eliminate revenue loss from unexpected system outages.", icon: CheckCircle2 }
  ];

export default function ClientRoiAnalysis() {
  const { heading, items: metrics } = useSection("portfolio/roi", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
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
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="reveal-init rounded-3xl p-7 bg-slate-50/70 border border-slate-200 hover:border-emerald-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-3 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all text-emerald-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
