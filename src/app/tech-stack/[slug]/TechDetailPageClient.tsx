"use client";

import { useState } from "react";
import Link from "next/link";
import { TechDetailData } from "@/data/techDetails";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Zap,
  ArrowRight,
  Layers,
  Cpu,
  Server,
  Lock,
  Calendar,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Activity,
  Code2,
  Database,
  Globe2,
  ArrowUpRight,
  Check
} from "lucide-react";
import RichText from "@/components/RichText";

interface TechDetailPageClientProps {
  tech: TechDetailData;
}

export default function TechDetailPageClient({ tech }: TechDetailPageClientProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"flow" | "patterns">("flow");

  return (
    <main className="relative pt-24 pb-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-sky-100/70 via-blue-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ======================================================== */}
      {/* SECTION 1: HERO HEADER & ARCHITECTURE KPI STATS         */}
      {/* ======================================================== */}
      <section className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 pb-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
          <Link href="/" className="hover:text-sky-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/tech-stack" className="hover:text-sky-600 transition-colors">
            Tech Stack
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-700 font-bold">{tech.name}</span>
        </div>

        {/* Hero Header Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
                <Terminal className="w-3.5 h-3.5 text-sky-600" />
                <span>{tech.categoryLabel}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{tech.version}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Production Verified</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight leading-[1.18]">
              <span className="block text-slate-900">Enterprise {tech.name}</span>
              <span className="block gradient-text font-semibold mt-1">Architecture & Engineering</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              {tech.tagline}
            </p>

            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {tech.metaDescription}
            </p>

            {/* CTA Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Link
                href="/contact"
                className="btn-futuristic-primary !py-3 !px-6 text-xs sm:text-sm font-bold flex items-center gap-2 !rounded-xl shadow-md shadow-sky-600/20"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portfolio"
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50/50 shadow-2xs transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-sky-600" />
                <span>View Case Studies</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Architecture KPI Stats Grid */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-white via-sky-50/30 to-blue-50/40 rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-900/5 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                    Production Metrics
                  </span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  SLO Guaranteed
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                {tech.architectureHighlights.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-1 group hover:border-sky-300 transition-colors"
                  >
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                      {stat.label}
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {stat.value}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      {stat.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  Verified across Divanex production client deployments
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: PRODUCTION ARCHITECTURE & IMPLEMENTATION FLOW */}
      {/* ======================================================== */}
      <section className="py-12 bg-white border-y border-slate-200/80 relative">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-700">
              <Layers className="w-3.5 h-3.5 text-sky-600" />
              <span>PRODUCTION BLUEPRINT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              How Divanex Architects {tech.name}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {tech.blueprint.description}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab("flow")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "flow"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              4-Stage Ingress & Execution Flow
            </button>
            <button
              onClick={() => setActiveTab("patterns")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === "patterns"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900"
              }`}
            >
              Core Design Patterns Applied
            </button>
          </div>

          {/* Tab 1: 4-Stage Architecture Flow */}
          {activeTab === "flow" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {tech.blueprint.flowSteps.map((flow, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 relative group hover:border-sky-400 hover:bg-white hover:shadow-lg hover:shadow-sky-900/5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-black text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                      PHASE {flow.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      {flow.tech}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {flow.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {flow.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Design Patterns */}
          {activeTab === "patterns" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tech.blueprint.designPatterns.map((dp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-2 hover:border-sky-300 hover:bg-white transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-sky-600" />
                    <h3 className="text-sm font-bold text-slate-900">{dp.pattern}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dp.implementation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: CORE ENTERPRISE CAPABILITIES & DEEP FEATURES  */}
      {/* ======================================================== */}
      <section className="py-14 bg-slate-50/70 relative">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-xs font-mono font-bold text-sky-700 shadow-2xs">
              <Cpu className="w-3.5 h-3.5 text-sky-600" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Enterprise Features & Technical Capabilities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Engineered to meet the strict performance, maintainability, and scalability demands of modern high-growth businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tech.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-sky-900/5 hover:border-sky-300 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                    {cap.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">0{idx + 1}</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                    Key Technical Highlights:
                  </span>
                  <div className="space-y-1.5">
                    {cap.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: BENCHMARK MATRIX & TECHNICAL COMPARISON       */}
      {/* ======================================================== */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-700">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              <span>PERFORMANCE BENCHMARKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Divanex Architecture vs. Legacy Alternatives
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Measurable differences in execution speed, cloud infrastructure costs, and release cycle velocity.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-mono uppercase tracking-wider text-slate-600">
                    <th className="py-4 px-6 font-bold">Architecture Metric</th>
                    <th className="py-4 px-6 font-bold text-sky-700 bg-sky-50/50">Divanex Architecture</th>
                    <th className="py-4 px-6 font-bold text-slate-500">Legacy / Standard Approach</th>
                    <th className="py-4 px-6 font-bold text-emerald-700">Production Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {tech.benchmarks.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                        {row.metric}
                      </td>
                      <td className="py-4 px-6 font-bold text-sky-800 bg-sky-50/30">
                        {row.divanexApproach}
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        {row.legacyAlternative}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-700">
                        {row.benefit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: SECURITY, COMPLIANCE & HARDENING              */}
      {/* ======================================================== */}
      <section className="py-14 bg-slate-50/70 border-t border-slate-200/80">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-xs font-mono font-bold text-sky-700 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>SECURITY & COMPLIANCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Enterprise Hardening & Defense-in-Depth
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every production implementation includes mandatory security safeguards, preventing vulnerabilities before deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tech.securityAndHardening.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 hover:border-sky-300 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {sec.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{sec.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: TECHNICAL FAQS & ARCHITECTURE CONSULTATION    */}
      {/* ======================================================== */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: FAQs Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-700">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {tech.name} Engineering FAQs
              </h2>
            </div>

            <div className="space-y-3">
              {tech.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all ${
                      isOpen
                        ? "bg-sky-50/40 border-sky-300 shadow-xs"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full py-4 px-5 flex items-center justify-between text-left cursor-pointer gap-3"
                    >
                      <span className="text-sm font-bold text-slate-900">{faq.question}</span>
                      <span className={`text-sky-600 text-lg font-bold transition-transform ${isOpen ? "rotate-45" : ""}`}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-sky-100 font-normal">
                        <RichText value={faq.answer} className="space-y-2" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: High-Converting Architecture Review Card (Light Theme) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-sky-50/90 via-white to-blue-50/80 rounded-3xl p-7 sm:p-8 border border-sky-200/90 text-slate-900 shadow-xl shadow-sky-950/5 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-mono font-bold border border-sky-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>1-ON-1 ARCHITECTURAL ADVISORY</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Planning a project with {tech.name}?
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Book a direct technical session with our principal solutions architects to review your data schemas, migration strategy, and performance benchmarks.
              </p>

              <div className="pt-2 space-y-3">
                <Link
                  href="/contact"
                  className="btn-futuristic-primary w-full !py-3.5 !px-6 !rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/tech-stack"
                  className="w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-colors flex items-center justify-center gap-2 shadow-2xs"
                >
                  <span>Explore Other 50+ Technologies</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>100% NDA Protection</span>
                </span>
                <span className="font-semibold text-slate-600">Direct Engineer Call</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
