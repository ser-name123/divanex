"use client";

import { useState } from "react";
import { usePageContent } from "@/context/SiteContentContext";
import { Icon } from "@/lib/iconRegistry";
import { Workflow, CheckCircle2, Activity } from "lucide-react";
import RichText from "@/components/RichText";

export default function ProcessFlow() {
  // Admin-managed: the phases, their copy and the heading above them were all
  // literals, and the per-step icon was a switch on the array index — adding a
  // sixth phase silently fell through to a default icon.
  const content = usePageContent();
  const heading = content.processHeading;
  const processSteps = content.processSteps ?? [];

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = processSteps[activeStepIndex];

  return (
    <section id="process" className="scroll-mt-24 relative py-8 lg:py-10 bg-slate-50/50 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
            <Workflow className="w-3.5 h-3.5 text-sky-600" />
            <span className="tracking-wider uppercase">{heading.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-tight text-slate-900">
            {heading.title}{" "}
            <span className="gradient-text font-semibold">{heading.highlight}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            <RichText inline value={heading.description} />
          </p>

          <div className="pt-1 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-[11.5px] font-medium text-slate-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <strong className="font-semibold text-slate-900">Typical MVP Delivery Framework</strong> • 10-Week Baseline (Enterprise ERPs, Healthcare Platforms & Marketplaces Scale Across Dedicated Multi-Sprint Roadmaps)
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TIMELINE TRACK */}
        {/* ======================================================== */}
        <div className="mt-8 sm:mt-10 relative">
          {/* Animated Connecting Circuit Beam (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-slate-200 rounded-full overflow-hidden z-0">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${((activeStepIndex + 1) / processSteps.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/70 w-16 h-full animate-[beamFlow_1.5s_infinite_linear]"></div>
            </div>
          </div>

          {/* Step Selector Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 relative z-10">
            {processSteps.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`reveal-init reveal-delay-${idx + 1} p-4 sm:p-5 rounded-2xl text-left transition-all relative overflow-hidden group cursor-pointer border ${
                    isActive
                      ? "bg-white border-sky-400 shadow-lg shadow-sky-500/10 scale-[1.02]"
                      : isPast
                      ? "bg-white border-sky-200 hover:border-sky-300"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${
                        isActive
                          ? "bg-sky-600 text-white shadow-sm"
                          : isPast
                          ? "bg-sky-100 text-sky-800 border border-sky-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {step.stepNumber}
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 font-bold">
                      {step.duration}
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                    {step.title}
                  </div>

                  <div className="text-[11px] text-sky-700 truncate font-mono font-semibold mt-1">
                    {step.hindiSummary}
                  </div>

                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-500"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* ACTIVE STAGE HUD COCKPIT */}
        {/* ======================================================== */}
        <div className="reveal-init reveal-delay-2 mt-8 rounded-3xl border border-sky-200 p-6 sm:p-10 bg-white shadow-xl shadow-sky-950/5 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl sm:text-3xl font-semibold font-mono text-sky-700">
                  PHASE {activeStep.stepNumber}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
                  {activeStep.hindiSummary}
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>TYPICAL MVP BASELINE: {activeStep.duration}</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900">
                {activeStep.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                {activeStep.description}
              </p>

              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-sky-800 block mb-3">
                  Verified Phase Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeStep.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Telemetry & Sprint Assurance */}
            <div className="lg:col-span-5 rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-5 text-center shadow-xs">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 font-bold text-2xl shadow-sm">
                <Icon name={activeStep?.icon} className="w-5 h-5 text-sky-600" />
              </div>

              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-mono font-semibold">
                  Typical MVP Sprint Window
                </div>
                <div className="text-xl font-semibold text-slate-900 mt-1">
                  {activeStep.duration} Dedicated Cycle
                </div>
              </div>

              {/* Protocol Metrics */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 text-left font-mono shadow-2xs">
                <div className="flex items-center justify-between text-sky-800">
                  <span className="font-semibold">Client Staging Preview:</span>
                  <span className="font-bold text-emerald-700">Every Friday</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold">Code Ownership Transfer:</span>
                  <span className="font-bold text-slate-900">100% IP & Git</span>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span className="font-semibold">Security Baseline:</span>
                  <span className="font-bold text-amber-800">OWASP Top 10 Passed</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex gap-2.5 justify-center pt-2">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="btn-futuristic-glass !py-2.5 !px-4 text-xs font-mono font-bold disabled:opacity-40 cursor-pointer !rounded-xl"
                >
                  &larr; Previous Phase
                </button>
                <button
                  type="button"
                  disabled={activeStepIndex === processSteps.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.min(processSteps.length - 1, prev + 1))
                  }
                  className="btn-futuristic-primary !py-2.5 !px-5 text-xs font-mono font-bold disabled:opacity-40 cursor-pointer !rounded-xl"
                >
                  Next Phase &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
