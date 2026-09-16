"use client";

import RichText from "@/components/RichText";
import { useState, useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  CheckCircle2,
  ChevronRight,
  Radio,
  Server,
  Globe2,
  GitBranch,
  Bot
} from "lucide-react";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

const promptPresets = {
  saas: {
    label: "Multi-Tenant SaaS",
    prompt: "Synthesize enterprise multi-tenant cloud engine with isolated schemas & Stripe billing",
    code: `// Divanex High-Velocity Architecture
import { CloudMesh, TenantIsolation } from "@divanex/core";

export const Engine = new CloudMesh({
  tenancy: "dynamic-schema-isolated",
  autoScale: { min: 3, max: 250, targetLatencyMs: 12 },
  telemetry: "distributed-tracing-v4",
  compliance: ["SOC2", "HIPAA-Ready", "GDPR"]
});`,
    logs: [
      "✓ PostgreSQL isolated schema migration complete",
      "✓ Serverless edge routes deployed across 310+ POPs",
      "✓ Zero cold-start latency warmup policy verified"
    ]
  },
  rag: {
    label: "Autonomous AI Agent",
    prompt: "Deploy hybrid neural agent with vector semantic caching & sub-50ms RAG retrieval",
    code: `// Divanex Neural Agent Fabric
import { NeuralRAG, VectorStore } from "@divanex/ai";

export const Agent = new NeuralRAG({
  embeddings: "text-embedding-3-large",
  vectorStore: "pinecone-serverless",
  hybridSearch: { semanticWeight: 0.85, keywordWeight: 0.15 },
  citationVerification: "strict-hallucination-guard"
});`,
    logs: [
      "✓ 420,000 document vectors embedded in 14.2s",
      "✓ Semantic cache hit ratio: 89.4% (latency: 18ms)",
      "✓ Guardrails active: zero-hallucination verified"
    ]
  },
  mobile: {
    label: "Cross-Platform App",
    prompt: "Compile universal iOS/Android/Web runtime with biometric auth & offline SQLite sync",
    code: `// Divanex Universal Mobile Runtime
import { CrossPlatformRuntime, OfflineSync } from "@divanex/mobile";

export const MobileCore = new CrossPlatformRuntime({
  engines: ["React Native Fabric", "WebAssembly"],
  syncProtocol: "CRDT-Conflict-Free",
  frameRateTarget: "120FPS-ProMotion"
});`,
    logs: [
      "✓ iOS & Android binary compiled in parallel",
      "✓ Biometric FaceID/TouchID security layer active",
      "✓ Offline-first state synced with 0 conflict"
    ]
  }
};

export default function HeroSection({ onOpenConsultation: _onOpenConsultation }: HeroSectionProps) {
  const siteConfig = useSiteConfig();
  const [activeTab, setActiveTab] = useState<"ai" | "mesh" | "telemetry">("ai");
  const [selectedPrompt, setSelectedPrompt] = useState<"saas" | "rag" | "mobile">("saas");
  const [typedCode, setTypedCode] = useState("");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [pingLatency, setPingLatency] = useState(8);

  useEffect(() => {
    let index = 0;
    const currentCode = promptPresets[selectedPrompt].code;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypedCode("");
    setIsSynthesizing(true);
    const interval = setInterval(() => {
      index += 1;
      setTypedCode(currentCode.slice(0, index));
      if (index >= currentCode.length) {
        clearInterval(interval);
        setIsSynthesizing(false);
      }
    }, 38);
    return () => clearInterval(interval);
  }, [selectedPrompt]);

  // Ping jitter simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setPingLatency(Math.floor(6 + Math.random() * 5));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section relative pt-24 pb-8 sm:pb-10 lg:pt-28 lg:pb-12 flex flex-col justify-center overflow-hidden bg-cyber-grid bg-radial-cone">
      {/* Background Glowing Ambient Orbs */}
      <div className="glow-orb-blue w-[420px] h-[420px] md:w-[750px] md:h-[750px] -top-20 -left-20 opacity-40"></div>
      <div className="glow-orb-cyan w-[350px] h-[350px] md:w-[600px] md:h-[600px] top-40 -right-20 opacity-30"></div>
      <div className="glow-orb-orange w-[280px] h-[280px] md:w-[500px] md:h-[500px] bottom-10 left-1/3 opacity-20"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* High-Tech Eyebrow Pill */}
            <div className="reveal-init reveal-delay-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-sky-200 text-xs sm:text-sm text-sky-800 shadow-sm animate-soft-pulse">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-bold tracking-wide text-slate-900">
                Next-Gen Digital Solutions & Cloud Architecture
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="hidden sm:inline text-sky-600 font-semibold">
                SaaS & AI Specialized
              </span>
            </div>

            {/* Headline */}
            <h1 className="reveal-init reveal-delay-2 text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[48px] font-semibold tracking-tight leading-[1.2] text-slate-900">
              <span className="block">{siteConfig.heroHeadlineMain}</span>
              <span className="block mt-1 sm:mt-2">
                <span className="gradient-text">{siteConfig.heroHeadlineHighlight}</span>
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="reveal-init reveal-delay-3 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              <RichText inline value={siteConfig.heroSubhead} />
            </p>

            {/* Call to Action Buttons */}
            <div className="reveal-init reveal-delay-4 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              {/* CTA 1: Get Free Quote */}
              <a
                href="/contact"
                className="btn-futuristic-primary w-full sm:w-auto text-center justify-center text-xs sm:text-sm !py-3.5 sm:!py-4 !px-6 sm:!px-8 !rounded-2xl"
              >
                <span>{siteConfig.heroCtaQuoteText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-300"></span>
                </span>
              </a>

              {/* CTA 2: Explore Services */}
              <a
                href="#services"
                className="btn-futuristic-glass w-full sm:w-auto text-center justify-center text-xs sm:text-sm !py-3.5 sm:!py-4 !px-5 sm:!px-7 !rounded-2xl"
              >
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Explore Services</span>
              </a>

              {/* CTA 3: Book a Free Consultation */}
              <Link
                href="/contact"
                className="btn-futuristic-amber w-full sm:w-auto text-center justify-center text-xs sm:text-sm !py-3.5 sm:!py-4 !px-5 sm:!px-7 !rounded-2xl"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>{siteConfig.heroCtaConsultText}</span>
              </Link>
            </div>

            {/* High-Contrast HUD Badges */}
            <div className="reveal-init reveal-delay-5 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex text-amber-500 text-xs sm:text-sm">★★★★★</div>
                <span className="font-bold text-slate-900">4.9/5 Rating</span>
                <span className="text-slate-500 font-medium hidden sm:inline">(50+ Reviews)</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-emerald-200 text-emerald-700 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800">Enterprise SLA & SOC2</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-sky-700 shadow-2xs">
                <Zap className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-slate-700 font-medium">Edge Latency:</span>
                <span className="font-mono font-bold text-sky-700">{pingLatency}ms</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Control Center in Light Mode */}
          <div className="lg:col-span-5 relative reveal-init reveal-delay-3">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Subtle ambient blur glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 via-sky-400/15 to-teal-400/15 rounded-3xl blur-xl opacity-60"></div>

              {/* Main Console Window */}
              <div className="relative rounded-2xl bg-white border border-slate-200 shadow-xl shadow-sky-950/5 overflow-hidden">
                
                {/* Console Window Header */}
                <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-200 bg-slate-50/90">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    <span className="ml-1.5 text-xs font-mono text-slate-700 flex items-center gap-1.5 font-bold">
                      <Terminal className="w-3.5 h-3.5 text-sky-600" />
                      divanex-command-v3.0
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-50 border border-emerald-300 text-emerald-700">
                      <Radio className="w-3 h-3 animate-pulse text-emerald-600" />
                      ONLINE • {pingLatency}ms
                    </span>
                  </div>
                </div>

                {/* Interactive Mode Switcher */}
                <div className="grid grid-cols-3 text-xs font-semibold border-b border-slate-200 bg-slate-100/60">
                  <button
                    onClick={() => setActiveTab("ai")}
                    className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "ai"
                        ? "text-sky-700 border-b-2 border-sky-600 bg-white font-bold shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Bot className="w-4 h-4 text-sky-600" />
                    <span>AI Engine</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("mesh")}
                    className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "mesh"
                        ? "text-emerald-700 border-b-2 border-emerald-600 bg-white font-bold shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <GitBranch className="w-4 h-4 text-emerald-600" />
                    <span>Cloud Mesh</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("telemetry")}
                    className={`py-3 px-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      activeTab === "telemetry"
                        ? "text-amber-700 border-b-2 border-amber-600 bg-white font-bold shadow-2xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Server className="w-4 h-4 text-amber-600" />
                    <span>Telemetry</span>
                  </button>
                </div>

                {/* TAB BODY CONTAINER (LOCKED FIXED HEIGHT TO PREVENT ANY JUMPING OR EXPANSION) */}
                <div className="h-[435px] sm:h-[425px] flex flex-col justify-between overflow-hidden">
                  {/* TAB 1: AI Code & Architecture Synthesizer */}
                  {activeTab === "ai" && (
                    <div className="p-5 h-full flex flex-col justify-between font-mono text-xs">
                      {/* Interactive Preset Buttons */}
                      <div className="flex items-center gap-2 flex-wrap shrink-0">
                        <span className="text-[11px] text-slate-500 font-sans font-semibold">Architecture:</span>
                        {(["saas", "rag", "mobile"] as const).map((p) => (
                          <button
                            key={p}
                            onClick={() => setSelectedPrompt(p)}
                            className={`px-2.5 py-1 rounded-md text-[11px] transition-all font-sans font-semibold cursor-pointer ${
                              selectedPrompt === p
                                ? "bg-sky-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {promptPresets[p].label}
                          </button>
                        ))}
                      </div>

                      {/* Live Streaming Code View - 100% Locked Fixed Height */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-[12px] leading-relaxed relative overflow-hidden h-[185px] flex flex-col shadow-xs shrink-0">
                        <div className="text-sky-800 mb-1.5 text-[11px] flex items-center justify-between font-bold border-b border-slate-200 pb-1 shrink-0">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
                            // ACTIVE STREAMING RUNTIME
                          </span>
                          <span className="text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 text-[10px] font-bold">● COMPILED</span>
                        </div>
                        <div className="overflow-hidden flex-1">
                          <pre className="text-slate-900 font-mono font-bold text-[11.5px] leading-relaxed whitespace-pre-wrap">{typedCode}</pre>
                          {isSynthesizing && (
                            <span className="inline-block w-2 h-3.5 bg-sky-600 animate-pulse ml-0.5 align-middle"></span>
                          )}
                        </div>
                      </div>

                      {/* Verification Pipeline Checks */}
                      <div className="space-y-1.5 shrink-0">
                        <div className="flex items-center justify-between text-[11px] text-slate-700 font-sans font-bold pb-0.5">
                          <span>Automated Verification Pipeline</span>
                          <span className="text-emerald-800 font-mono font-bold">100% HEALTHY</span>
                        </div>
                        {promptPresets[selectedPrompt].logs.map((log, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-slate-800 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="font-mono text-[11px] truncate font-semibold text-slate-800">{log}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Cloud Infrastructure Mesh Visualizer */}
                  {activeTab === "mesh" && (
                    <div className="p-5 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between text-xs text-slate-600 font-mono font-semibold shrink-0">
                        <span>GLOBAL TOPOLOGY MESH</span>
                        <span className="text-sky-700 font-bold">EDGE REGIONS: 310+</span>
                      </div>

                      {/* Interactive Topology Graph */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative space-y-2.5 my-auto">
                        {/* Node 1 */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-sky-200 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <Globe2 className="w-4 h-4 text-sky-600" />
                            <span className="text-xs font-bold text-slate-900">Global Edge CDN</span>
                          </div>
                          <span className="text-[11px] font-mono text-sky-700 font-bold">{pingLatency}ms</span>
                        </div>

                        {/* Connecting Pulse Line */}
                        <div className="w-0.5 h-3 bg-gradient-to-b from-sky-400 to-emerald-500 mx-auto"></div>

                        {/* Node 2 */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-200 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <Server className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold text-slate-900">Serverless Microservices</span>
                          </div>
                          <span className="text-[11px] font-mono text-emerald-700 font-bold">10,000 req/s</span>
                        </div>

                        {/* Connecting Pulse Line */}
                        <div className="w-0.5 h-3 bg-gradient-to-b from-emerald-500 to-amber-500 mx-auto"></div>

                        {/* Node 3 */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-amber-200 shadow-2xs">
                          <div className="flex items-center gap-2">
                            <Cpu className="w-4 h-4 text-amber-600" />
                            <span className="text-xs font-bold text-slate-900">Vector Neural Engine</span>
                          </div>
                          <span className="text-[11px] font-mono text-amber-700 font-bold">99.4% Acc</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 text-center font-sans font-medium shrink-0 pt-1">
                        Automated multi-region failover with zero downtime deployment
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Real-Time Telemetry Monitor */}
                  {activeTab === "telemetry" && (
                    <div className="p-5 h-full flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-3 my-auto">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10.5px] text-slate-500 font-semibold block">SLA Availability</span>
                          <span className="text-lg font-bold font-mono text-emerald-700">99.999%</span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">Enterprise Guaranteed</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10.5px] text-slate-500 font-semibold block">Cold Start Penalty</span>
                          <span className="text-lg font-bold font-mono text-sky-700">0.00ms</span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">Pre-warmed Containers</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10.5px] text-slate-500 font-semibold block">Encryption Standard</span>
                          <span className="text-lg font-bold font-mono text-amber-700">TLS 1.3</span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">Quantum-Resistant AES</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10.5px] text-slate-500 font-semibold block">Compute Threads</span>
                          <span className="text-lg font-bold font-mono text-slate-900">Dynamic ∞</span>
                          <span className="text-[9.5px] text-slate-500 block mt-0.5">Auto-Scaling Nodes</span>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-between shrink-0 mt-2">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span className="text-xs font-bold text-slate-900">All 16 Cloud Clusters Operational</span>
                        </div>
                        <span className="text-[10.5px] font-mono text-emerald-700 font-bold">READY</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Console Bottom Action Bar */}
                <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
                    <span className="text-slate-600 font-medium">Next Engineering Sprint:</span>
                    <span className="text-sky-700 font-bold">Booking Open</span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 text-sky-700 hover:text-sky-900 font-bold hover:underline"
                  >
                    <span>Reserve Slot</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
