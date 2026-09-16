"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Rocket } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "DAY 0 TO PRODUCTION",
  "title": "Production Launch &",
  "highlight": "30-Day Hypercare",
  "description": "Our relationship doesn't end at deployment. We stand shoulder-to-shoulder with your team during live market launch."
};

const DEFAULT_ITEMS = [
    {
      title: "Zero-Downtime Blue/Green Deployment",
      desc: "Traffic switches seamlessly to new container clusters with zero user disruption and instant rollback capabilities."
    },
    {
      title: "30-Day Dedicated Hypercare Guarantee",
      desc: "Our senior engineers monitor logs, address user edge-cases, and fix any emerging bugs free of charge for a full month post-launch."
    },
    {
      title: "DNS & Production SSL Hardening",
      desc: "Configuration of Cloudflare enterprise WAF, TLS 1.3 certificates, DDoS protection, and automated CDN caching rules."
    },
    {
      title: "Executive Video & Documentation Handover",
      desc: "Recorded walkthroughs and architecture runbooks detailing how to manage, scale, and maintain your platform independently."
    }
  ];

export default function LaunchAndHypercarePhase() {
  const { heading, items: steps } = useSection("process/launch", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
            <Rocket className="w-3.5 h-3.5 text-sky-600" />
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
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="reveal-init bg-white rounded-3xl p-7 border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 font-extrabold font-mono text-sm group-hover:scale-110 transition-transform">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
