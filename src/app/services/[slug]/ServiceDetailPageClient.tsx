"use client";

import { useState } from "react";
import Link from "next/link";
import type { ServiceDetailData } from "@/data/serviceDetails";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";
import {
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  Server,
  Terminal,
  ChevronRight,
  Home,
  Clock,
  Sparkles,
  DollarSign,
  HelpCircle,
  FolderGit2,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Award
} from "lucide-react";
import RichText from "@/components/RichText";

interface Props {
  service: ServiceDetailData;
  /** The other services, for the strip at the foot of the page. */
  related?: ServiceDetailData[];
}

export default function ServiceDetailPageClient({ service, related = [] }: Props) {
  const { convertPriceString } = useCurrency();
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <main className="relative z-10">
      {/* ======================================================== */}
      {/* 1. HERO SECTION: 2-COLUMN TELEMETRY MATRIX HUD */}
      {/* ======================================================== */}
      <section className="relative pt-24 pb-6 lg:pt-28 lg:pb-8 overflow-hidden bg-white border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500 mb-4" aria-label="Breadcrumb">
            <Link
              href="/"
              className="flex items-center gap-1.5 hover:text-sky-700 transition-colors py-1"
            >
              <Home className="w-3.5 h-3.5 text-sky-600" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link
              href="/services"
              className="hover:text-sky-700 transition-colors py-1"
            >
              <span>Services</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-sky-800 font-bold">{service.title}</span>
          </nav>

          {/* 2-Column Responsive Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column: Title, Description, and CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span className="tracking-wider uppercase">{service.badge}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight leading-[1.18]">
                <span className="block text-slate-900">{service.title}</span>
                {service.titleHighlight && (
                  <span className="block gradient-text font-semibold mt-1">{service.titleHighlight}</span>
                )}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
                {service.metaDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  href="/contact"
                  className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="btn-futuristic-glass text-xs sm:text-sm !py-3 !px-6 !rounded-xl font-bold"
                >
                  <span>View Case Studies</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 2x2 Telemetry Metric Matrix Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-6 sm:p-7 border border-slate-200 bg-slate-50 shadow-lg shadow-sky-950/5 relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                      TELEMETRY // {service.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* 2x2 Stats Grid */}
                <div className="grid grid-cols-2 gap-3.5">
                  {service.headerStats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 transition-all space-y-1 shadow-2xs"
                    >
                      <span className="text-[11px] font-bold text-slate-600 block truncate">
                        {stat.label}
                      </span>
                      <div className="text-xl sm:text-2xl font-bold font-mono text-sky-700">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate font-medium">
                        {stat.detail}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="text-sky-700 font-bold">&gt;_</span>
                    <span>IP Ownership:</span>
                    <span className="text-emerald-700 font-bold">100% Guaranteed</span>
                  </div>
                  <Link href="/contact" className="text-sky-700 hover:text-sky-800 font-bold flex items-center gap-1">
                    <span>Inquire</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE ARCHITECTURAL BLUEPRINT */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>System Topology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {service.architectureSummary.diagramTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              {service.architectureSummary.diagramSubtitle}
            </p>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.architectureSummary.flowSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveFlowStep(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeFlowStep === idx
                    ? "bg-white border-sky-400 shadow-xl shadow-sky-950/5 ring-2 ring-sky-200 scale-[1.02]"
                    : "bg-white border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-sky-50 border border-sky-200 text-sky-800">
                      STEP {step.step}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                      VERIFIED GATE
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5">{step.label}</h3>
                  <div className="text-xs font-mono text-sky-700 font-bold mb-3">{step.tech}</div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{step.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>STATUS</span>
                  <span className="text-emerald-700 font-bold">ACTIVE PIPELINE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. DEEP-DIVE ENGINEERING MODULES (6 CARDS) */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50/50 border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Modular Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Deep-Dive Engineering Modules
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Every system is decomposed into robust, battle-tested architectural layers built for fault tolerance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {service.engineeringModules.map((module, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-sky-700 group-hover:scale-110 transition-transform">
                      {module.moduleNum}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {module.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {module.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {module.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-[10px] font-mono font-bold text-slate-500 block uppercase mb-1">
                    Technical Specification:
                  </span>
                  <span className="text-xs font-mono text-sky-800 font-bold block truncate">
                    {module.technicalSpec}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. PRODUCTION TECH STACK ARSENAL */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <Server className="w-3.5 h-3.5 text-emerald-600" />
              <span>Production Tooling</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Battle-Tested Technology Stack
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Strictly modern, open-source, and long-term durable frameworks with zero proprietary lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.techStack.map((category, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-emerald-300 transition-all shadow-sm"
              >
                <h3 className="text-sm font-mono font-bold uppercase text-emerald-800 mb-4 pb-2 border-b border-slate-200">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between shadow-2xs"
                    >
                      <span>{item}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. 5-PHASE SPRINT DELIVERY LIFECYCLE */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50/50 border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>Sprint Roadmap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Phased Sprint Delivery Lifecycle
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Predictable 2-week agile sprints with tangible deliverables and live demos at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.sprintPhases.map((phase, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                      {phase.phase}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-slate-500">{phase.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{phase.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">{phase.deliverables}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SIGNED OFF</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. VERIFIABLE DELIVERABLES & ARTIFACTS MATRIX */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Tangible Handover</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What You Receive Upon Completion
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Complete operational independence with 100% intellectual property transfer and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.handoverArtifacts.map((artifact, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 block w-fit mb-3">
                    {artifact.format}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{artifact.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">{artifact.desc}</p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-mono font-bold text-sky-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>INCLUDED IN REPO</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. REAL-WORLD CASE STUDY SPOTLIGHT */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-200 relative overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-white via-slate-50 to-sky-50/40 border border-sky-200/80 shadow-xl shadow-sky-950/5 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-bl from-sky-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Challenge & Solution Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100/80 border border-sky-300 text-sky-900 text-xs font-semibold shadow-xs">
                    <Award className="w-3.5 h-3.5 text-sky-700" />
                    <span className="uppercase tracking-wider">Production Case Study</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{service.caseStudy.sector}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {service.caseStudy.client}
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Challenge Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 shadow-2xs">
                    <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>The Architectural Challenge</span>
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {service.caseStudy.challenge}
                    </p>
                  </div>

                  {/* Solution Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-2xs">
                    <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>The Deployed Engineering Solution</span>
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {service.caseStudy.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Verified KPI Impact Metrics */}
              <div className="lg:col-span-5">
                <div className="p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      Validated Business Outcomes
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      LIVE AUDIT
                    </span>
                  </div>

                  <div className={`grid gap-3.5 ${service.caseStudy.metrics.length > 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                    {service.caseStudy.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-sky-800 border border-slate-200 shadow-2xs">
                            KPI 0{idx + 1}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-sky-800 mb-1 leading-tight">
                            {m.val}
                          </div>
                          <div className="text-xs font-semibold text-slate-600">
                            {m.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. TRANSPARENT INVESTMENT TIERS */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transparent Pricing</span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Investment & Delivery Tiers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Milestone-gated fixed sprint agreements with 100% intellectual property transfer and no hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {service.pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  idx === 1
                    ? "bg-white border-sky-400 shadow-xl shadow-sky-950/5 ring-2 ring-sky-200 scale-[1.02]"
                    : "bg-white border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {tier.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 font-sans tracking-tight">
                      {tier.period}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                  <div className="text-2xl sm:text-3xl font-black text-sky-700 mb-3 tracking-tight font-sans">
                    {convertPriceString(tier.price)}
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">{tier.description}</p>

                  <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact"
                  className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    idx === 1
                      ? "btn-futuristic-primary shadow-lg shadow-sky-600/20"
                      : "btn-futuristic-glass"
                  }`}
                >
                  <span>Enquire About This Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 9. TECHNICAL SERVICE FAQS (IN-PLACE ACCORDIONS, NO POPUPS) */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50/50 border-b border-slate-200">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Technical Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Direct technical answers to common questions regarding our {service.title} engineering protocol.
            </p>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-colors shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-sky-700 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-600 shrink-0 transition-transform duration-200 ${
                      openFaqIdx === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 font-normal">
                    <RichText value={faq.answer} className="space-y-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 10. EXPLORE OTHER CORE ENGINEERING CAPABILITIES */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-3 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-sky-600" />
                <span>INTEGRATED ENGINEERING ECOSYSTEM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Explore Other <span className="gradient-text font-bold">Specialized Services</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-700 hover:text-sky-900 transition-colors"
            >
              <span>View All Capabilities Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((otherService) => (
                <Link
                  key={otherService.slug}
                  href={`/services/${otherService.slug}`}
                  className="group rounded-2xl p-6 bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-sky-800 uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
                        {otherService.badge}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {otherService.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {otherService.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>{otherService.headerStats[0]?.label}: <strong className="text-sky-700 font-bold">{otherService.headerStats[0]?.value}</strong></span>
                    <span className="text-sky-700 font-bold group-hover:underline">Explore Specs →</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 11. ADVANCE PROJECT INITIATION CTA BANNER */}
      {/* ======================================================== */}
      <section className="py-20 bg-slate-50/50">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-white border border-sky-200 text-center space-y-6 shadow-xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800">
              <Zap className="w-3.5 h-3.5 text-sky-600" />
              <span>RAPID 24-HOUR PROPOSAL SLA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Ready to Engineer Your{" "}
              <span className="gradient-text font-bold">{service.title}</span> Solution?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
              Speak directly with our technical leads to review system requirements, database schema design, and milestone pricing before contracts are signed.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="btn-futuristic-primary text-sm sm:text-base !py-3.5 !px-8 !rounded-2xl shadow-md"
              >
                <span>Discuss Exact Project Scope</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="btn-futuristic-glass text-sm sm:text-base !py-3.5 !px-8 !rounded-2xl"
              >
                <span>Schedule Discovery Session</span>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-mono font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% IP & Source Code Transfer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-sky-600" />
                <span>30-Day Zero-Cost Hypercare</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
