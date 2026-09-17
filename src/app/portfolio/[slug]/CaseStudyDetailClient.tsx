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
  ChevronRight,
  Users,
  Layers,
  Activity,
  Smartphone,
  Globe,
  Monitor,
  CheckCircle,
  BarChart3,
  Flame,
  Bike,
  Building,
  Car,
  HeartPulse,
  Wrench
} from "lucide-react";

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy;
  /** The other case studies, for the strip at the foot of the page. */
  otherCaseStudies?: CaseStudy[];
}

/**
 * Visual Mockup / Screenshot Showcase component for each case study
 */
function ProjectVisualShowcase({ caseStudy }: { caseStudy: CaseStudy }) {
  if (caseStudy.slug === "fynito") {
    return (
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* Mobile Screen Mockup */}
          <div className="w-[260px] sm:w-[280px] bg-slate-950 rounded-[32px] border-[4px] border-slate-700 p-4 shadow-2xl space-y-4 shrink-0">
            {/* Dynamic Island / Speaker */}
            <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto" />
            
            {/* App Top Bar */}
            <div className="flex items-center justify-between text-xs font-bold px-1">
              <span className="text-rose-400 font-mono">FYNITO LIVE</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">99.8% SLA</span>
            </div>

            {/* Live Map Box */}
            <div className="h-32 bg-slate-900 rounded-2xl border border-slate-800 p-3 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:12px_12px]" />
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 relative z-10">
                <span>Rider GPS Telemetry</span>
                <span className="text-emerald-400 font-bold">&lt; 120ms ping</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-xs p-2 rounded-xl border border-slate-800 relative z-10">
                <Bike className="w-4 h-4 text-rose-400 shrink-0" />
                <div className="text-[10px]">
                  <div className="font-bold text-white">Rider In-Transit</div>
                  <div className="text-slate-400">ETA: 6.8 mins • 1.2 km away</div>
                </div>
              </div>
            </div>

            {/* Order Card */}
            <div className="bg-slate-900 rounded-2xl p-3 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">Gourmet Burger Kitchen</span>
                <span className="text-rose-400 font-bold font-mono">#ORD-9482</span>
              </div>
              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>2x Artisan Burgers, Truffle Fries</span>
                <span className="text-white font-bold">$34.50</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-4/5 h-full bg-gradient-to-r from-rose-500 to-amber-400" />
              </div>
            </div>

            {/* Sub-second Payment Status */}
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300 font-medium">1-Click Fast Checkout</span>
              <span className="text-emerald-400 font-bold font-mono">0.42s</span>
            </div>
          </div>

          {/* Web Kitchen POS & Telemetry Console */}
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>LIVE SYSTEM PRODUCTION MOCKUP</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Real-Time Kitchen Dispatch &amp; Driver Routing Console
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Engineered with Socket.io and Redis geospatial pub/sub, the Fynito ecosystem matches orders to the nearest idle rider in 6.8 seconds while broadcasting 60 FPS live vehicle trajectory to customer phones.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-slate-400 text-[10px] uppercase">Peak Throughput</div>
                <div className="text-lg font-bold text-white">4,200 ord/hr</div>
                <div className="text-[10px] text-emerald-400">+2,230% capacity</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                <div className="text-slate-400 text-[10px] uppercase">Dispatch Time</div>
                <div className="text-lg font-bold text-white">6.8 Seconds</div>
                <div className="text-[10px] text-emerald-400">13.2x faster</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1 col-span-2 sm:col-span-1">
                <div className="text-slate-400 text-[10px] uppercase">Cart Drop-Off</div>
                <div className="text-lg font-bold text-white">7.2% Rate</div>
                <div className="text-[10px] text-emerald-400">-81.3% abandonment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (caseStudy.slug === "our-pg") {
    return (
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* Visual Bed Grid Dashboard Mockup */}
          <div className="w-full lg:w-1/2 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-bold text-sm text-white font-mono">Floor 3: Bed Allocation Matrix</span>
              </div>
              <span className="text-xs text-blue-400 font-mono font-bold">98.2% Occupancy</span>
            </div>

            {/* Room Matrix Grid */}
            <div className="grid grid-cols-3 gap-2.5 font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Room 301-A</span>
                  <span className="text-emerald-400">● Occupied</span>
                </div>
                <div className="font-bold text-white text-xs">Aaditya V.</div>
                <div className="text-[10px] text-emerald-400">Rent Paid: ₹14,500</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Room 301-B</span>
                  <span className="text-emerald-400">● Occupied</span>
                </div>
                <div className="font-bold text-white text-xs">Priya S.</div>
                <div className="text-[10px] text-emerald-400">AutoPay Active</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-sky-500/40 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Room 302-A</span>
                  <span className="text-sky-400">◌ Reserved</span>
                </div>
                <div className="font-bold text-white text-xs">Check-in Today</div>
                <div className="text-[10px] text-sky-400">Deposit Paid</div>
              </div>
            </div>

            {/* Auto-Invoicing Progress Bar */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Monthly Rent Cycle Automation</span>
                <span className="text-emerald-400 font-bold">Automated Settlement Engine</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-blue-500" />
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold">
              <Building className="w-3.5 h-3.5 text-blue-400" />
              <span>INTERACTIVE BED MATRIX &amp; AUTOPAY</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Coliving &amp; Bed Matrix OS Across Multi-City Properties
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Eliminated manual registers and double bookings with a real-time visual floor grid, instant Aadhaar biometric KYC, and automated recurring WhatsApp AutoPay billing.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 15x Faster Rent Velocity</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ -90% Admin Overhead</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 4-Day Vacancy Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (caseStudy.slug === "sm-supermoda") {
    return (
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          {/* 3D Model Explorer Mockup */}
          <div className="w-full lg:w-1/2 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-sm text-white font-mono">3D Architectural Tower Explorer</span>
              </div>
              <span className="text-xs text-emerald-400 font-mono font-bold">60 FPS WebGL</span>
            </div>

            {/* Simulated 3D Building HUD */}
            <div className="h-44 bg-gradient-to-b from-slate-900 to-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start text-xs font-mono">
                <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Penthouse #402 Selected</span>
                <span className="text-slate-400">Sunlight: 4:30 PM (Golden Hour)</span>
              </div>
              <div className="text-center space-y-1">
                <div className="text-lg font-bold text-white font-mono">$4,850,000 USD</div>
                <div className="text-xs text-slate-400">4 Bed • 5 Bath • 4,800 sq.ft • Private Sky Pool</div>
              </div>
              <div className="flex justify-between items-center text-xs font-mono pt-2 border-t border-slate-850">
                <span className="text-emerald-400">● 1-Click WhatsApp Private Tour</span>
                <span className="text-slate-400">0.8s Global TTFB</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Mobile Bounce Reduction:</span>
              <span className="text-emerald-400 font-bold">64.2% → 18.5% (-71.2%)</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>SUB-SECOND EDGE NEXT.JS 15 &amp; THREE.JS</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cinematic Real Estate Discovery Generating 260+ Qualified Leads/Mo
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transformed heavy, sluggish WordPress real estate pages into lightning-fast edge-cached Next.js 15 pages with touch-friendly 3D unit walkthroughs and instant WhatsApp broker routing.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400 text-[10px]">Monthly Inquiries</div>
                <div className="text-lg font-bold text-white">260+ /mo</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-slate-400 text-[10px]">Page Load Speed</div>
                <div className="text-lg font-bold text-emerald-400">0.8 Seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (caseStudy.slug === "evtor") {
    return (
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="w-full lg:w-1/2 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-green-400" />
                <span className="font-bold text-sm text-white font-mono">OCPP 2.0.1 Charging Station HUD</span>
              </div>
              <span className="text-xs text-green-400 font-mono font-bold">2.4s Session Start</span>
            </div>

            {/* Live Telemetry Terminal */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Station: EVTOR-FAST-042 (CCS2 120kW)</span>
                <span className="text-emerald-400">● Charging</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">Power</div>
                  <div className="font-bold text-white">92.4 kW</div>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">Battery</div>
                  <div className="font-bold text-green-400">68%</div>
                </div>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">Time Left</div>
                  <div className="font-bold text-white">14 mins</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Station Status Accuracy:</span>
              <span className="text-green-400 font-bold">99.9% Telemetry SLA</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 font-mono text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-green-400" />
              <span>HARDWARE TELEMETRY &amp; DRIVER APP</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Connected EV Charging Network &amp; OCPP 2.0.1 Telemetry Engine
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standardized heterogeneous multi-brand EVSE hardware through a universal OCPP 2.0.1 WebSocket broker, enabling instant QR scan-to-charge in 2.4 seconds with real-time electrical telemetry.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 11.6x Faster Session Start</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 4.9★ Driver App Rating</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ TimescaleDB Time-Series</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (caseStudy.slug === "magnus-partners") {
    return (
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
          <div className="w-full lg:w-1/2 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-sm text-white font-mono">DICOM Radiology &amp; FHIR Pipeline</span>
              </div>
              <span className="text-xs text-cyan-400 font-mono font-bold">HIPAA-Ready Architecture</span>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-3">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Case #CLIN-8201 (Neuro-Oncology Review)</span>
                <span className="text-cyan-400">● 4 Specialists Synced</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                <div>
                  <div className="text-white font-bold">3T Brain MRI Scan (T1 + Contrast)</div>
                  <div className="text-[10px] text-slate-400">Sub-150ms Tiled DICOM Stream</div>
                </div>
                <span className="text-xs text-emerald-400 font-bold">AES-256</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Consultation Turnaround:</span>
              <span className="text-cyan-400 font-bold">72 hours → 4.5 hours (Accelerated Workflow)</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>HL7 FHIR V4 &amp; ZERO-TRUST SECURITY</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise HealthTech &amp; Clinical Collaboration Architecture
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Constructed a zero-trust clinical collaboration pipeline with in-browser DICOM radiology viewing, FHIR-compatible data models, and HIPAA-ready access controls.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ HIPAA-Ready Architecture</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ ABDM-Aligned Workflows</span>
              <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ FHIR-Compatible Interoperability</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parana Tool Default
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-white overflow-hidden relative shadow-2xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
        <div className="w-full lg:w-1/2 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-sm text-white font-mono">CNC Tooling Parametric Configurator</span>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">&lt; 3s Instant RFQ</span>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs space-y-2.5">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>4-Flute Solid Carbide End Mill (TiAlN)</span>
              <span className="text-amber-400">3,200+ SKUs</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">Workpiece Hardness:</span>
                <div className="font-bold text-white">Up to HRC 55</div>
              </div>
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400">CAD STEP Download:</span>
                <div className="font-bold text-emerald-400">1-Click Direct</div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Quote Turnaround Slashed:</span>
            <span className="text-amber-400 font-bold">72 hrs → Sub-second Quotes</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>PARAMETRIC SEARCH &amp; AUTOMATED B2B RFQ</span>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Industrial CNC Tooling Catalog Driving +242% B2B Inquiry Conversions
          </h4>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Replaced 600-page static PDF catalogues with sub-40ms parametric search, 3D STEP CAD model downloads, and automated PDF volume quoting in under 3 seconds.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 5,000+ CAD Downloads</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ 36x Faster Search</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">✓ +242% B2B RFQ Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
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
      standard: "SOC 2–Aligned"
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
      standard: "PCI-DSS–Aware / GDPR"
    }
  ];

  const defaultComplianceBadges = caseStudy.complianceBadges || [
    "SOC 2–Aligned",
    "ISO 27001",
    "GDPR Compliant",
    "TLS 1.3 Strict",
    "OWASP Top 10 Hardened"
  ];

  const defaultKeyTakeaways = caseStudy.keyTakeaways || [
    `Achieved ${caseStudy.impactHighlight} ${caseStudy.impactLabel} within the first 30 days of production deployment.`,
    "Decoupled legacy bottlenecks into isolated, horizontally scalable microservices with sub-50ms latency.",
    "Zero downtime production migration with 100% data integrity verified across all historical records.",
    "Delivered on schedule with production-proven reliability and comprehensive end-to-end type safety."
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

          {/* Badges Bar: Category, Production Audited, Client, Industry */}
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
              <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                Industry: <strong className="text-slate-900">{caseStudy.industry}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-slate-600 bg-slate-50 px-3 py-1 rounded-md border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>Timeline: <strong className="text-slate-900">{caseStudy.timeline || caseStudy.duration}</strong></span>
              </div>
              <div className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {caseStudy.contractValue} Scope
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

          {/* Team Pod & Compliance Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            {caseStudy.team && (
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  Divanex Engineering Pod:
                </span>
                {caseStudy.team.map((member, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-blue-50/70 border border-blue-200/80 text-blue-800 font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="text-slate-400 uppercase font-bold">Standards:</span>
              {defaultComplianceBadges.map((badge, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100 font-mono text-xs">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-all"
            >
              <span>Book a Technical Consultation</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-500 text-slate-800 hover:text-sky-600 shadow-xs transition-all hover:scale-105"
            >
              <span>View Case Studies</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SCREENSHOTS & LIVE SYSTEM PRODUCTION MOCKUP */}
        {/* ======================================================== */}
        <ProjectVisualShowcase caseStudy={caseStudy} />

        {/* ======================================================== */}
        {/* 4. PROBLEM VS WHAT WE BUILT (COMPARATIVE MATRIX) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Problem */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-red-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-5 flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-transparent rounded-t-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-mono font-bold">
                <span>THE CLIENT PROBLEM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {caseStudy.problem?.headline || caseStudy.challenge.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {caseStudy.problem?.description || caseStudy.challenge.summary}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-slate-100 font-mono text-xs">
              <div className="text-[11px] text-slate-500 uppercase font-bold">Core Friction Points:</div>
              {(caseStudy.problem?.frictionPoints || caseStudy.challenge.frictionPoints).map((fp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-slate-700">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="leading-snug">{fp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: What We Built / The Engineering Solution */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border border-emerald-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-5 flex flex-col justify-between">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-transparent rounded-t-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>WHAT WE BUILT &amp; DELIVERED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {caseStudy.whatWeBuilt?.headline || caseStudy.solution.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {caseStudy.whatWeBuilt?.summary || caseStudy.solution.summary}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 font-mono text-xs">
              <div className="text-[11px] text-slate-500 uppercase font-bold">Delivered Architecture Pillars:</div>
              {(caseStudy.whatWeBuilt?.pillars || caseStudy.solution.architecturalPillars).map((ap, i) => (
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
        {/* 5. INTERACTIVE SYSTEM ARCHITECTURE & CODE HUD */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-xl shadow-slate-200/40 space-y-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent pointer-events-none" />

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sky-600 text-xs font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>SYSTEM TOPOLOGY, CODE &amp; SECURITY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Architecture Blueprint &amp; Technology Taxonomy
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
                  Engineering Guardrails &amp; Standards:
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
        {/* 6. TEAM POD & SPRINT DELIVERY TIMELINE */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>TIMELINE &amp; SPRINT CADENCE</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Milestone Execution &amp; Sprint Breakdown
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
        {/* 7. KEY ARCHITECTURAL TAKEAWAYS & LESSONS */}
        {/* ======================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 backdrop-blur-2xl relative shadow-lg shadow-slate-100 space-y-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-sky-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>KEY ARCHITECTURAL WINS</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Enterprise Outcomes &amp; Engineering Learnings
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
        {/* 8. CLIENT TESTIMONIAL & EXECUTIVE ENDORSEMENT */}
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
        {/* 9. EXPLORE OTHER PRODUCTION CASE STUDIES */}
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
        {/* 10. BOTTOM CTA BANNER */}
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
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 text-slate-700 hover:text-slate-900 shadow-xs transition-all"
            >
              <span>View Case Studies</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
