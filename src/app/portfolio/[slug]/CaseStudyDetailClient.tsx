"use client";

import { useState } from "react";
import Link from "next/link";
import type { CaseStudy } from "@/data/caseStudiesData";
import {
  Briefcase,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Sparkles,
  Award,
  Share2,
  Check,
  Code2,
  Lock,
  FileCode,
  TrendingUp,
  Server,
  Zap,
  Copy,
  ChevronRight
} from "lucide-react";

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
  /** The other case studies, for the strip at the foot of the page. */
  otherCaseStudies?: CaseStudy[];
}

export default function CaseStudyDetailClient({
  caseStudy,
  otherCaseStudies = [],
}: CaseStudyDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "code" | "security" | "tech" | "roi">("architecture");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyCode = (code: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const defaultSnippet = caseStudy.codeSnippet || {
    language: "typescript",
    filename: `${caseStudy.slug}-architecture-core.ts`,
    code: `// ${caseStudy.title} - High-Velocity Production System
import { CloudMesh, ResilientEngine, Telemetry } from "@divanex/core";
import { DatabaseCluster } from "@/lib/persistence";

export const CoreEngine = new ResilientEngine({
  platform: "${caseStudy.title}",
  tenancy: "cryptographic-row-isolation",
  caching: { strategy: "stale-while-revalidate", edgeTtlSeconds: 300 },
  telemetry: Telemetry.distributedTracing({ sampleRate: 1.0, alerting: "slack-pagerduty" }),
  failover: { maxRetries: 3, exponentialBackoff: true, circuitBreakerTimeoutMs: 1500 }
});

export async function handleIngressEvent(request: Request) {
  const context = await CoreEngine.authenticate(request);
  const result = await DatabaseCluster.executeScopedQuery(context.tenantId, async (db) => {
    return db.processOptimizedPipeline({
      latencyTargetMs: 18,
      strictAuditLog: true
    });
  });
  return Response.json({ success: true, telemetry: CoreEngine.getTelemetry(), data: result });
}`
  };

  const defaultSecurityPillars = caseStudy.securityPillars || [
    {
      title: "Tenant Cryptographic Isolation",
      description: "Strict row-level security and tenant-scoped connection pooling preventing cross-tenant data leaks.",
      standard: "SOC-2 Type II"
    },
    {
      title: "Automated SAST / DAST Ingestion Scans",
      description: "Every commit is analyzed for vulnerabilities, dependency CVEs, and secret leaks before edge rollout.",
      standard: "ISO 27001"
    },
    {
      title: "Zero-Trust Rate Limiting & DDoS Shield",
      description: "Multi-layered edge rate limiting, Cloudflare Turnstile bot deterrence, and granular token validation.",
      standard: "OWASP Top 10"
    },
    {
      title: "End-to-End Field-Level Encryption",
      description: "Sensitive PII and financial records encrypted at rest using AES-256-GCM and rotating KMS keys.",
      standard: "PCI-DSS v4.0 / GDPR"
    }
  ];

  const defaultComplianceBadges = caseStudy.complianceBadges || [
    "SOC-2 Type II",
    "ISO 27001",
    "GDPR Compliant",
    "TLS 1.3 Strict",
    "OWASP Top 10 Hardened"
  ];

  const defaultKeyTakeaways = caseStudy.keyTakeaways || [
    `Achieved ${caseStudy.impactHighlight} ${caseStudy.impactLabel} within the first 30 days of production deployment.`,
    "Decoupled legacy bottlenecks into isolated, horizontally scalable microservices with sub-50ms latency.",
    "Zero downtime production migration with 100% data integrity verified across all historical records.",
    "Delivered ahead of schedule with 99.999% SLA uptime and comprehensive end-to-end type safety."
  ];

  return (
    <div className="relative pt-28 pb-20 overflow-hidden bg-slate-50/40">
      {/* Ambient background glow orbs */}
      <div className="glow-orb-blue w-[500px] h-[500px] -top-20 -left-20 pointer-events-none opacity-20" />
      <div className="glow-orb-orange w-[450px] h-[450px] top-1/3 -right-20 pointer-events-none opacity-15" />
      <div className="glow-orb-cyan w-[400px] h-[400px] bottom-10 left-1/4 pointer-events-none opacity-20" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-16">
        
        {/* ======================================================== */}
        {/* 1. BREADCRUMBS & TOP CONTROLS */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-sky-600 transition-colors">
              Portfolio
            </Link>
            <span>/</span>
            <span className="text-sky-700 font-semibold truncate max-w-xs sm:max-w-md">
              {caseStudy.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-sky-600 shadow-sm transition-all text-xs cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Link Copied!" : "Share Case Study"}</span>
            </button>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 text-sky-700 text-xs font-semibold shadow-sm transition-all hover:scale-105"
            >
              <span>← All Case Studies</span>
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. HERO TELEMETRY HEADER */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-xl shadow-slate-200/50 space-y-8">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-t-3xl pointer-events-none" />

          {/* Badges Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-semibold flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-sky-600" />
                <span>{caseStudy.category}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Production Audited</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                Client: <strong className="text-slate-900">{caseStudy.clientName}</strong>
              </span>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>{caseStudy.duration}</span>
              </div>
              <div className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {caseStudy.contractValue} Value
              </div>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight leading-[1.18]">
              <span className="block text-slate-900">{caseStudy.title}</span>
              <span className="block gradient-text font-semibold mt-1">{caseStudy.subtitle}</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {caseStudy.metaDescription}
            </p>
          </div>

          {/* Key Metric Tiles HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            {caseStudy.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 shadow-xs hover:border-sky-300 transition-colors"
              >
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-sky-600 font-semibold">{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Compliance & Standards Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="text-slate-400 uppercase font-bold mr-1">Compliance Standards:</span>
            {defaultComplianceBadges.map((badge, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
            >
              <span>Discuss a Similar Build</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 text-slate-800 hover:text-sky-600 shadow-xs transition-all hover:scale-105"
            >
              <span>Schedule Technical Deep-Dive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. CHALLENGE VS SOLUTION COMPARATIVE MATRIX */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Architectural Challenge */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-red-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-5 flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-t-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold">
                <span>THE ARCHITECTURAL CHALLENGE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {caseStudy.challenge.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {caseStudy.challenge.summary}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 font-mono text-xs">
              <div className="text-[11px] text-slate-500 uppercase font-bold">Critical Friction Points:</div>
              {caseStudy.challenge.frictionPoints.map((fp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-slate-700">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-snug">{fp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: The Engineering Solution */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-emerald-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-5 flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent rounded-t-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>THE DIVANEX SOLUTION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {caseStudy.solution.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {caseStudy.solution.summary}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 font-mono text-xs">
              <div className="text-[11px] text-slate-500 uppercase font-bold">Core Architectural Pillars:</div>
              {caseStudy.solution.architecturalPillars.map((ap, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{ap.title}</span>
                    <span className="text-[10px] text-sky-700 font-semibold px-2 py-0.5 rounded bg-sky-50 border border-sky-200">
                      {ap.tech}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{ap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. INTERACTIVE SYSTEM ARCHITECTURE & CODE HUD */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-xl shadow-slate-200/40 space-y-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-600 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>SYSTEM TOPOLOGY, CODE & SECURITY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Engineering Blueprint & Telemetry
              </h3>
            </div>

            {/* Interactive Mode Tabs */}
            <div className="flex flex-wrap items-center p-1 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "architecture"
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Data Pipeline
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "code"
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Code Blueprint
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "security"
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Security Matrix
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("tech")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "tech"
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Tech Taxonomy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("roi")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === "roi"
                    ? "bg-slate-900 text-white font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Verified ROI
              </button>
            </div>
          </div>

          {/* Tab 1: Data Pipeline */}
          {activeTab === "architecture" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 font-mono text-xs">
                {caseStudy.architectureBlueprint.flowSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 hover:bg-white transition-all group space-y-3 relative shadow-xs"
                  >
                    <div className="flex items-center justify-between text-sky-600 font-bold text-[11px]">
                      <span>{step.step}</span>
                      <span className="w-2 h-2 rounded-full bg-sky-500 group-hover:animate-ping" />
                    </div>
                    <div className="text-slate-900 font-bold text-sm leading-snug">
                      {step.component}
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Architecture Highlights */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                <span className="text-slate-500 uppercase text-[10px] font-bold">
                  Engineering Guardrails & Standards:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {caseStudy.architectureBlueprint.highlights.map((hl, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Code Blueprint */}
          {activeTab === "code" && (
            <div className="space-y-4 animate-fadeIn font-mono text-xs">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-slate-300 rounded-t-2xl border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white text-xs">{defaultSnippet.filename}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(defaultSnippet.code)}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="p-6 bg-slate-950 text-slate-100 rounded-b-2xl overflow-x-auto text-xs leading-relaxed border border-slate-900 shadow-2xl">
                <code>{defaultSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Tab 3: Security Matrix */}
          {activeTab === "security" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn font-mono text-xs">
              {defaultSecurityPillars.map((sec, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-white transition-all space-y-2.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{sec.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {sec.standard}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Tech Taxonomy */}
          {activeTab === "tech" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn font-mono text-xs">
              {caseStudy.techStack.map((group, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4"
                >
                  <div className="text-sky-700 font-bold uppercase text-xs pb-2 border-b border-slate-200">
                    {group.category}
                  </div>
                  <div className="space-y-2.5">
                    {group.technologies.map((t, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs"
                      >
                        <div>
                          <div className="text-slate-900 font-bold">{t.name}</div>
                          <div className="text-[10px] text-slate-500">{t.role}</div>
                        </div>
                        {t.highlight && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                            {t.highlight}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 5: Verified ROI Matrix */}
          {activeTab === "roi" && (
            <div className="space-y-6 animate-fadeIn font-mono text-xs">
              <div className="text-slate-800 text-sm font-bold">
                {caseStudy.businessImpact.headline}
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4 font-bold">Performance Benchmark</th>
                      <th className="p-4 font-bold">Legacy Monolith</th>
                      <th className="p-4 font-bold text-emerald-700">Divanex Architecture</th>
                      <th className="p-4 font-bold text-sky-700">Net Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {caseStudy.businessImpact.metrics.map((m, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-slate-900 font-bold">{m.metric}</td>
                        <td className="p-4 text-slate-400 line-through">{m.before}</td>
                        <td className="p-4 text-emerald-700 font-bold">{m.after}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 font-bold text-[11px]">
                            {m.gain}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 5. KEY ARCHITECTURAL TAKEAWAYS & LESSONS */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>KEY ARCHITECTURAL WINS</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Outcomes & Engineering Learnings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            {defaultKeyTakeaways.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  ✓
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 6. 4-PHASE DELIVERY CADENCE & MILESTONES */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPRINT DELIVERY TIMELINE</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Execution Cadence & Deliverables
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-mono text-xs">
            {caseStudy.deliverables.map((del, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 relative group hover:border-sky-400 hover:bg-white transition-all shadow-xs"
              >
                <div className="text-sky-600 text-[10px] font-bold uppercase">{del.timeline}</div>
                <div className="text-slate-900 font-bold text-sm leading-snug">{del.milestone}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed font-normal">{del.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 7. CLIENT TESTIMONIAL & EXECUTIVE ENDORSEMENT */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-sky-50/70 via-white to-blue-50/50 border border-sky-200 shadow-xl relative">
          <div className="space-y-6 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 border border-sky-200 text-sky-800 text-xs font-mono font-bold">
              <Award className="w-3.5 h-3.5 text-sky-600" />
              <span>EXECUTIVE VERIFICATION</span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-800 font-medium leading-relaxed italic">
              &ldquo;{caseStudy.testimonial.quote}&rdquo;
            </p>

            <div className="flex items-center justify-center gap-3 font-mono text-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
                {caseStudy.testimonial.avatarInitials}
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-900 text-sm">{caseStudy.testimonial.author}</div>
                <div className="text-slate-500 text-[11px]">
                  {caseStudy.testimonial.role} • <strong className="text-sky-700">{caseStudy.testimonial.company}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 8. EXPLORE OTHER PRODUCTION CASE STUDIES */}
        {/* ======================================================== */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider">
                PORTFOLIO SHOWCASE
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Explore More Architectural Deep-Dives
              </h3>
            </div>
            <Link
              href="/portfolio"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-sky-600 hover:text-sky-700 font-bold"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCaseStudies.map((item) => (
              <Link
                key={item.slug}
                href={`/portfolio/${item.slug}`}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-400 transition-all group flex flex-col justify-between space-y-4 hover:scale-[1.02] shadow-xs hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-sky-600 font-bold uppercase">{item.category}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{item.impactHighlight}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 font-normal">
                    {item.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-sky-600 font-semibold">
                  <span>Read Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 9. BOTTOM CTA BANNER */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 text-center space-y-5 shadow-lg shadow-sky-100/50">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Ready to Build a High-ROI Platform for Your Enterprise?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Get an institutional-grade scope estimate, detailed milestone breakdown, and verified SLA guarantee within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
            >
              <span>Discuss Project Scope & Investment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-slate-900 shadow-xs transition-all"
            >
              <span>Speak with Lead Architect</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
