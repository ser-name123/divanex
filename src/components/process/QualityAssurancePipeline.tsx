"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { ShieldCheck } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "ZERO-DEFECT ARCHITECTURE",
  "title": "Our 4-Stage",
  "highlight": "QA & Testing Pipeline",
  "description": "We don't treat testing as an afterthought. Every sprint is gated by four strict automated and manual quality checks before client demo."
};

const DEFAULT_ITEMS = [
    {
      gate: "GATE 01",
      name: "Unit & Logic Tests",
      desc: "Jest and Vitest coverage validating business logic, state mutations, and edge cases before code merges.",
      badge: "85%+ Code Coverage"
    },
    {
      gate: "GATE 02",
      name: "API & Integration Tests",
      desc: "Supertest and Postman test collections verifying database transactions, webhook idempotency, and auth tokens.",
      badge: "Idempotent Endpoints"
    },
    {
      gate: "GATE 03",
      name: "E2E User Flow Tests",
      desc: "Playwright and Cypress automated browser simulations testing onboarding, checkout, and critical customer journeys.",
      badge: "Cross-Browser Verified"
    },
    {
      gate: "GATE 04",
      name: "Stress & Load Testing",
      desc: "k6 load testing simulating 10,000+ concurrent virtual users to verify zero database deadlocks and sub-second p99 latency.",
      badge: "10k+ Concurrent Users"
    }
  ];

export default function QualityAssurancePipeline() {
  const { heading, items: gates } = useSection("process/qa", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
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
          {gates.map((g, idx) => (
            <div
              key={idx}
              className="reveal-init rounded-3xl p-7 bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-700 bg-sky-100/80 px-2.5 py-1 rounded-lg border border-sky-200">
                  {g.gate}
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                  {g.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {g.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
