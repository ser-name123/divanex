"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { portfolioProjects as seedPortfolio, PortfolioProject } from "@/data/portfolio";
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Search,
  Layers,
  Smartphone,
  Globe,
  Zap,
  HeartPulse,
  ShoppingBag,
  Star,
  Check,
  Building,
  Car,
  Bike,
  Truck,
  ShieldCheck,
  Activity,
  Flame,
  Clock,
  Sparkles
} from "lucide-react";

interface PortfolioSectionProps {
  /** Admin-managed records. Falls back to the built-in seed. */
  items?: PortfolioProject[];
  isHome?: boolean;
}

/** High-fidelity, rich visual laptop screen preview for each client project */
function ProjectLaptopMockup({ project }: { project: PortfolioProject }) {
  if (project.id === "fynito") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#ff6080] via-[#ff3b65] to-[#de1748] text-white flex items-center justify-between p-3 sm:p-4 relative select-none overflow-hidden font-sans">
        {/* Ambient Glow */}
        <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-white/25 blur-xl pointer-events-none" />
        <div className="absolute right-0 -top-6 w-28 h-28 rounded-full bg-rose-300/30 blur-xl pointer-events-none" />

        {/* Left Floating Smartphone Mockup */}
        <div className="w-[88px] sm:w-[102px] h-[138px] sm:h-[152px] bg-slate-950 rounded-[14px] border-[2px] border-white/60 p-1.5 shadow-2xl flex flex-col justify-between shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10">
          <div className="w-5 h-1.5 bg-slate-800 rounded-full mx-auto" />
          
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[7px] font-black text-rose-400">FYNITO</span>
            <span className="text-[6px] px-1 py-0.2 rounded-full bg-rose-500/50 text-white font-bold">24m</span>
          </div>

          {/* Food Card */}
          <div className="bg-slate-900 rounded-md p-1 border border-slate-800 space-y-0.5">
            <div className="h-8 rounded bg-gradient-to-tr from-amber-500/50 to-rose-500/50 flex items-center justify-center text-xs">
              🍔
            </div>
            <div className="flex justify-between items-center text-[7px] font-bold text-white px-0.5">
              <span>Gourmet Burger</span>
              <span className="text-amber-400">4.9★</span>
            </div>
            <div className="flex justify-between items-center text-[6px] text-slate-300 px-0.5">
              <span className="font-extrabold text-rose-300">₹249</span>
              <span className="px-1 bg-rose-600 rounded text-white font-bold">+Add</span>
            </div>
          </div>

          <div className="flex justify-around text-[6px] text-slate-400 pt-0.5 border-t border-slate-800">
            <span className="text-rose-400 font-bold">Menu</span>
            <span>Offers</span>
            <span>Cart</span>
          </div>
        </div>

        {/* Center & Right Hero Brand & Rider Tracking Showcase */}
        <div className="flex-1 pl-3 sm:pl-4 flex flex-col justify-between h-full py-0.5 relative z-10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-[8px] sm:text-[9px] font-bold text-white shadow-xs">
              <Bike className="w-2.5 h-2.5 text-amber-300" />
              <span>Live Rider Tracking HUD</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white tracking-wider drop-shadow-sm leading-tight">
              FYNITO FOODS
            </h4>
            <p className="text-[8px] sm:text-[9px] text-rose-100 font-medium leading-tight">
              Hyperlocal food delivery &amp; real-time rider dispatch engine.
            </p>
          </div>

          {/* Live Dispatch Mini HUD Card */}
          <div className="bg-slate-950/80 rounded-lg p-1.5 border border-white/20 space-y-1">
            <div className="flex items-center justify-between text-[7px] text-white font-bold">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Rider: Rajesh K.
              </span>
              <span className="text-amber-300">4.9 ★</span>
            </div>
            <div className="flex items-center justify-between text-[6px] text-slate-300">
              <span>Status: On the way 🛵</span>
              <span className="font-mono text-emerald-300">1.2 km away</span>
            </div>
          </div>

          {/* Key Metrics Pills */}
          <div className="flex flex-wrap items-center justify-between gap-1 pt-0.5 text-[7px] font-bold">
            <span className="px-2 py-0.5 rounded bg-white text-rose-700 font-black shadow-xs">
              &lt;24m Avg. ETA
            </span>
            <span className="text-rose-100">Live GPS Sync</span>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "our-pg") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] text-slate-900 flex items-center justify-between p-3 sm:p-4 relative select-none overflow-hidden font-sans">
        {/* Background 3D Geometric Accents */}
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-rose-500/15 blur-xl pointer-events-none" />
        <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/15 blur-xl pointer-events-none" />

        {/* Left Side: 3D OurPG Box Brand */}
        <div className="flex-1 pr-2.5 flex flex-col justify-between h-full py-0.5 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white flex items-center justify-center font-black text-xs shadow-md border border-blue-500/40">
                PG
              </div>
              <div>
                <div className="font-black text-sm sm:text-base text-slate-900 tracking-tight leading-none">OurPG</div>
                <div className="text-[7px] sm:text-[8px] font-bold text-blue-700 uppercase tracking-wider">Management OS</div>
              </div>
            </div>
            <p className="text-[8px] sm:text-[9px] text-slate-600 font-medium leading-tight">
              Hostel, PG &amp; Coliving automation with automated invoicing &amp; room matrix.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[7px] sm:text-[8px]">
              AutoPay Invoicing
            </span>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-300 font-bold text-[7px] sm:text-[8px]">
              Multi-Property Grid
            </span>
          </div>
        </div>

        {/* Right Side: Floating Tilted Phone with Bed Matrix */}
        <div className="w-[92px] sm:w-[106px] h-[138px] sm:h-[152px] bg-slate-950 rounded-[14px] border-[2px] border-slate-700 p-1.5 shadow-2xl flex flex-col justify-between shrink-0 transform rotate-2 hover:rotate-0 transition-transform duration-300 relative z-10">
          <div className="w-5 h-1.5 bg-slate-800 rounded-full mx-auto" />

          <div className="flex items-center justify-between text-[7px] text-slate-300 font-bold px-0.5">
            <span>Occupancy Matrix</span>
            <span className="text-emerald-400">Floor 2</span>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-2 gap-1 my-0.5">
            <div className="bg-slate-900 rounded p-1 border border-slate-800 text-center space-y-0.5">
              <div className="text-[6px] text-slate-400">R201 • Bed A</div>
              <div className="text-[6px] font-black px-1 py-0.2 rounded bg-emerald-500 text-slate-950">OCCUPIED</div>
            </div>
            <div className="bg-slate-900 rounded p-1 border border-slate-800 text-center space-y-0.5">
              <div className="text-[6px] text-slate-400">R201 • Bed B</div>
              <div className="text-[6px] font-black px-1 py-0.2 rounded bg-emerald-500 text-slate-950">OCCUPIED</div>
            </div>
            <div className="bg-slate-900 rounded p-1 border border-slate-800 text-center space-y-0.5">
              <div className="text-[6px] text-slate-400">R202 • Bed A</div>
              <div className="text-[6px] font-black px-1 py-0.2 rounded bg-blue-500 text-white">RESERVED</div>
            </div>
            <div className="bg-slate-900 rounded p-1 border border-slate-800 text-center space-y-0.5">
              <div className="text-[6px] text-slate-400">R202 • Bed B</div>
              <div className="text-[6px] font-bold px-1 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">VACANT</div>
            </div>
          </div>

          <div className="text-[6px] text-center text-slate-400 bg-slate-900 py-0.5 rounded border border-slate-800">
            Auto-Invoice: <strong className="text-emerald-400">Active</strong>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "sm-supermoda") {
    return (
      <div className="w-full h-full bg-gradient-to-b from-[#090d16] via-[#0f172a] to-[#020617] text-white flex flex-col justify-between p-3 sm:p-3.5 relative select-none overflow-hidden font-sans border border-slate-800">
        {/* Top Real Estate Navigation Bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-widest text-emerald-400">SM</span>
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-slate-100">REAL ESTATE</span>
          </div>
          <div className="flex items-center gap-2 text-[8px] text-slate-400">
            <span className="text-emerald-400 font-bold">Buy</span>
            <span>Off-Plan</span>
            <span>Virtual Tour</span>
          </div>
        </div>

        {/* Hero Skyline Banner */}
        <div className="my-auto py-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs sm:text-sm font-black text-white tracking-wide">
                New Homes For Generation
              </div>
              <p className="text-[8px] text-slate-400">Luxury developments in prime metropolitan hubs.</p>
            </div>
            <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              OFF-PLAN LAUNCH
            </span>
          </div>

          {/* Property Showcase Cards */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800 space-y-1 shadow-md">
              <div className="h-8 rounded bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-between px-1.5">
                <span className="text-[8px] font-extrabold text-white">Sky Penthouse</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-bold">3D Tour</span>
              </div>
              <div className="flex justify-between items-center text-[8px] px-0.5">
                <span className="text-slate-400">Marina Bay</span>
                <span className="font-black text-emerald-400">₹4.2 Cr</span>
              </div>
            </div>

            <div className="bg-slate-900/90 rounded-lg p-1.5 border border-slate-800 space-y-1 shadow-md">
              <div className="h-8 rounded bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-between px-1.5">
                <span className="text-[8px] font-extrabold text-white">Palm Villa</span>
                <span className="text-[7px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-bold">3D Tour</span>
              </div>
              <div className="flex justify-between items-center text-[8px] px-0.5">
                <span className="text-slate-400">Oceanfront</span>
                <span className="font-black text-emerald-400">₹8.5 Cr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="flex items-center justify-between text-[8px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          <span>Sub-1s Fast Reporting</span>
          <span className="font-bold text-emerald-400">High-Value Property Pipeline</span>
        </div>
      </div>
    );
  }

  if (project.id === "evtor") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#042010] via-[#06381a] to-[#02180b] text-white flex items-center justify-between p-3 sm:p-4 relative select-none overflow-hidden font-sans border border-green-900/40">
        <div className="absolute left-1/4 top-0 w-32 h-32 rounded-full bg-green-500/20 blur-2xl pointer-events-none" />

        {/* Left Info & Vehicle Pills */}
        <div className="flex-1 pr-2 flex flex-col justify-between h-full py-0.5 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400" />
              <h4 className="font-black text-sm sm:text-base text-green-400 tracking-wider">EVtor</h4>
              <span className="text-[9px] text-slate-300 font-bold">chargers</span>
            </div>
            <p className="text-[8px] sm:text-[9px] text-green-100 font-medium leading-tight">
              Smart EV charging network &amp; OCPP 2.0.1 live telemetry.
            </p>
          </div>

          {/* Vehicle Compatibility Pills */}
          <div className="flex items-center gap-1.5 py-1">
            <span className="p-1 rounded bg-green-950/80 border border-green-700/60 text-green-300 text-[8px] flex items-center gap-1">
              <Car className="w-3 h-3" /> Cars
            </span>
            <span className="p-1 rounded bg-green-950/80 border border-green-700/60 text-green-300 text-[8px] flex items-center gap-1">
              <Bike className="w-3 h-3" /> 2W
            </span>
            <span className="p-1 rounded bg-green-950/80 border border-green-700/60 text-green-300 text-[8px] flex items-center gap-1">
              <Truck className="w-3 h-3" /> Fleets
            </span>
          </div>

          <div className="flex items-center gap-2 text-[8px]">
            <span className="px-2 py-0.5 rounded bg-green-500 text-slate-950 font-black shadow-xs">
              Live Telemetry
            </span>
            <span className="text-green-200 font-bold">Connected Fast Chargers</span>
          </div>
        </div>

        {/* Right Side: Charging Station Tower HUD */}
        <div className="w-[96px] sm:w-[110px] h-[138px] sm:h-[152px] bg-slate-950 rounded-xl border-2 border-green-500/50 p-2 shadow-2xl flex flex-col justify-between shrink-0 relative z-10">
          <div className="text-center space-y-0.5">
            <span className="text-[8px] font-black text-green-400 block tracking-wider uppercase">Station #104</span>
            <span className="text-[7px] text-slate-400">Highway Express DC</span>
          </div>

          {/* Station Visual */}
          <div className="bg-slate-900 rounded-lg p-1.5 border border-green-900 text-center space-y-1">
            <div className="w-7 h-7 mx-auto rounded-full bg-green-500/20 border border-green-400/50 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-green-400 fill-green-400" />
            </div>
            <div className="text-[8px] font-black text-white">60 kW Fast DC</div>
            <div className="text-[6px] text-emerald-300 font-bold bg-green-950 py-0.2 rounded">
              SOCKET AVAILABLE
            </div>
          </div>

          <div className="w-full py-0.5 rounded bg-green-500 text-slate-950 font-black text-[7px] text-center shadow-xs">
            Scan QR to Charge
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "magnus-partners") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#041c28] via-[#082a3c] to-[#02131c] text-white flex items-center justify-between p-3 sm:p-4 relative select-none overflow-hidden font-sans border border-cyan-900/40">
        <div className="absolute right-1/4 top-0 w-32 h-32 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

        {/* Left Side: Clinical Portal Info */}
        <div className="flex-1 pr-2.5 flex flex-col justify-between h-full py-0.5 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h4 className="font-black text-xs sm:text-sm text-cyan-300 tracking-wider">HealthPulse / Magnus</h4>
              <span className="text-[7px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                HIPAA-Ready
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-extrabold text-cyan-100 leading-tight">
              Clinical HMIS &amp; Patient Portal
            </div>
            <p className="text-[8px] text-slate-300 leading-tight">
              Doctor scheduling, digital prescriptions &amp; encrypted EHR sync.
            </p>
          </div>

          {/* OPD Schedule Card */}
          <div className="bg-slate-900/90 rounded-lg p-1.5 border border-cyan-800/60 space-y-1">
            <div className="flex items-center justify-between text-[8px]">
              <span className="text-cyan-300 font-bold">Dr. Michael Vance</span>
              <span className="text-emerald-400 font-bold text-[7px] bg-emerald-950 px-1 rounded">OPD LIVE</span>
            </div>
            <div className="flex items-center justify-between text-[7px] text-slate-300">
              <span>Cardiology • Rm 304</span>
              <span className="font-mono text-cyan-300">Token #18</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[7px] text-slate-400 font-mono">
            <span>HL7 FHIR v4 Pipelines</span>
            <span className="text-cyan-300 font-bold">&lt;200ms EHR Sync</span>
          </div>
        </div>

        {/* Right Side: Floating Patient Mobile App */}
        <div className="w-[92px] sm:w-[106px] h-[138px] sm:h-[152px] bg-slate-950 rounded-[14px] border-[2px] border-cyan-500/40 p-1.5 shadow-2xl flex flex-col justify-between shrink-0 transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative z-10">
          <div className="w-5 h-1.5 bg-slate-800 rounded-full mx-auto" />

          <div className="flex items-center justify-between text-[7px] text-cyan-300 font-bold px-0.5">
            <span>Patient EHR</span>
            <span className="text-emerald-400">● Stable</span>
          </div>

          {/* Vitals HUD */}
          <div className="bg-slate-900 rounded-lg p-1.5 border border-cyan-950 space-y-0.5">
            <div className="flex justify-between items-center text-[7px]">
              <span className="text-slate-400">Heart Rate</span>
              <span className="font-black text-rose-400">72 bpm</span>
            </div>
            <div className="flex justify-between items-center text-[7px]">
              <span className="text-slate-400">BP Pulse</span>
              <span className="font-bold text-cyan-300">120/80</span>
            </div>
            <div className="text-[6px] text-slate-400 truncate pt-0.5 border-t border-slate-800">
              Lab: CBC Panel • Normal
            </div>
          </div>

          <div className="w-full py-0.5 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-[7px] text-center shadow-xs">
            Digital Prescription
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "parana-tool") {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#12141a] via-[#1a1d26] to-[#0d0f14] text-white flex items-center justify-between p-3 sm:p-4 relative select-none overflow-hidden font-sans border border-amber-900/40">
        {/* Background Glowing Warm Radial Orb */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500/30 to-orange-500/30 blur-xl pointer-events-none" />

        {/* Left Info */}
        <div className="flex-1 pr-2 flex flex-col justify-between h-full py-0.5 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-xs sm:text-sm text-amber-400 tracking-wide">PARANA TOOL</span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                CNC &amp; Tooling
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-extrabold text-amber-200 leading-tight">
              Industrial CNC Tooling &amp; CAD Vault
            </div>
            <p className="text-[8px] text-slate-300 leading-tight">
              Precision carbide end mills, inserts &amp; instant B2B engineering RFQ portal.
            </p>
          </div>

          <div className="flex flex-wrap gap-1 pt-1">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[8px] font-bold">
              3,200+ CNC SKUs
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[8px] font-bold">
              Instant CAD STEP
            </span>
          </div>

          <div className="text-[8px] text-slate-400 font-mono">
            Sub-40ms Parametric Tool Search
          </div>
        </div>

        {/* Right Floating CNC Component Card */}
        <div className="w-[92px] sm:w-[106px] h-[138px] sm:h-[152px] bg-slate-950 rounded-[14px] border-[2px] border-amber-500/40 p-1.5 shadow-2xl flex flex-col justify-between shrink-0 transform rotate-1 hover:rotate-0 transition-transform duration-300 relative z-10">
          <div className="w-5 h-1.5 bg-slate-800 rounded-full mx-auto" />

          <div className="bg-slate-900 rounded p-1 border border-slate-800 text-[7px] text-amber-400 font-mono">
            🔍 CNC End Mill Ø12mm
          </div>

          {/* CNC Tool Spec Card */}
          <div className="bg-slate-900 rounded-lg p-1.5 border border-slate-800 space-y-0.5">
            <div className="h-7 rounded bg-gradient-to-tr from-amber-500/20 to-orange-500/20 flex items-center justify-center text-xs font-mono font-bold text-amber-300">
              ⚙️ 4-Flute TiAlN
            </div>
            <div className="text-[7px] font-bold text-white truncate">
              Solid Carbide Mill
            </div>
            <div className="flex justify-between items-center text-[6px] text-slate-400 font-mono">
              <span>HRC 55 Hardness</span>
              <span className="text-emerald-400 font-bold">In Stock</span>
            </div>
          </div>

          <div className="w-full py-0.5 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[7px] text-center shadow-xs">
            Download CAD / RFQ
          </div>
        </div>
      </div>
    );
  }

  // Dynamic Generic Project Mockup Fallback
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0c1322] via-[#111c33] to-[#080d19] text-white flex flex-col justify-between p-3.5 sm:p-4 relative select-none overflow-hidden font-sans border border-sky-900/40">
      <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-black text-xs text-white tracking-wide">{project.title}</span>
        </div>
        <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
          {project.category}
        </span>
      </div>

      <div className="my-auto space-y-1">
        <div className="text-xs sm:text-sm font-black text-slate-100 leading-snug">
          {project.tagline || project.title}
        </div>
        <p className="text-[8px] sm:text-[9px] text-slate-300 line-clamp-2">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-[8px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
        <span className="text-emerald-400 font-bold">{project.impactMetric} {project.impactLabel}</span>
        <span className="font-mono text-slate-300">{(project.techStack || [])[0] || "Next.js 15"}</span>
      </div>
    </div>
  );
}

export default function PortfolioSection({ isHome = false, items }: PortfolioSectionProps) {
  const portfolioProjects = items ?? seedPortfolio;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All Projects", icon: Layers },
    { id: "Mobile App", label: "Mobile Apps", icon: Smartphone },
    { id: "Web Platform", label: "Web Platform", icon: Globe },
    { id: "SaaS", label: "SaaS & Cloud", icon: Briefcase },
    { id: "E-Commerce", label: "E-Commerce", icon: ShoppingBag },
    { id: "Healthcare", label: "Healthcare", icon: HeartPulse },
  ];

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((p: PortfolioProject) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.clientSubtitle && p.clientSubtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tagline && p.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (p.serviceTags && p.serviceTags.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [portfolioProjects, activeCategory, searchQuery]);

  return (
    <section id="portfolio" className="relative py-12 lg:py-16 bg-[#f8fafc] text-slate-900 overflow-hidden border-t border-slate-200">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-bold text-[#0f7670] shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#0f7670]" />
            <span className="uppercase tracking-wider">
              {isHome ? "FEATURED CLIENT WORK // 6 FLAGSHIP SYSTEMS" : `PRODUCTION DELIVERIES // ${portfolioProjects.length} VERIFIED SYSTEMS`}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#000838] tracking-tight">
            Client Case Studies &amp; <span className="gradient-text font-extrabold">Digital Platforms</span>
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            Explore live production systems designed, engineered, and scaled by Divanex Technologies — spanning on-demand food delivery, coliving management, luxury real estate, connected EV charging networks, healthcare platforms, and industrial e-commerce.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="reveal-init reveal-delay-1 mt-8 space-y-5">
          {/* Search Bar */}
          {!isHome && (
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client, technology, or industry..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder-slate-500 focus:outline-hidden focus:border-[#0f7670] focus:ring-2 focus:ring-[#0f7670]/20 shadow-xs transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              const count =
                cat.id === "All"
                  ? portfolioProjects.length
                  : portfolioProjects.filter((p) => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-[#0f7670] text-white border-[#0f7670] shadow-md scale-105"
                      : "bg-white border-slate-300 text-slate-800 hover:text-[#0f7670] hover:bg-emerald-50/60 hover:border-emerald-300 shadow-xs"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#0f7670]"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6-Card Portfolio Grid Styled in Crisp Light Theme */}
        <div className="reveal-init reveal-delay-2 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-lg hover:shadow-2xl hover:border-[#0f7670]/60 flex flex-col justify-between space-y-5 group relative transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Subtle top-left ambient accent */}
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-full bg-emerald-400/10 blur-md pointer-events-none" />

              {/* Card Header: Title & Subtitle */}
              <div className="text-center relative z-10 space-y-1">
                <Link href={`/portfolio/${project.id}`} className="group/link inline-block">
                  <h3 className="text-2xl font-black text-[#000838] group-hover/link:text-[#0f7670] transition-colors tracking-tight">
                    {project.title}
                  </h3>
                </Link>
                <p className="text-xs sm:text-sm font-bold text-[#0f7670] tracking-wider uppercase">
                  {project.clientSubtitle || project.category}
                </p>
              </div>

              {/* Laptop Device Mockup Preview Area */}
              <div className="relative z-10 w-full pt-1 pb-2 flex flex-col items-center">
                {/* Laptop Screen Bezel */}
                <div className="w-full max-w-[390px] bg-slate-950 rounded-t-2xl border-[3.5px] border-slate-800 shadow-2xl p-1.5 sm:p-2 aspect-[16/10] flex items-center justify-center relative overflow-hidden">
                  {/* Web Camera Dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-700 rounded-full z-20" />
                  
                  {/* Laptop Display Content */}
                  <div className="w-full h-full rounded-lg overflow-hidden relative">
                    <ProjectLaptopMockup project={project} />
                  </div>
                </div>

                {/* Laptop Base Stand / Chin */}
                <div className="w-[106%] max-w-[420px] h-3.5 sm:h-4 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl shadow-md border-t border-slate-600 relative flex items-center justify-center">
                  <div className="w-14 sm:w-18 h-1 bg-slate-500 rounded-full" />
                </div>
              </div>

              {/* Technical Description & Impact */}
              <div className="space-y-3 relative z-10">
                <p className="text-xs font-bold text-[#385d36] line-clamp-1">
                  {project.tagline}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3 font-medium">
                  {project.description}
                </p>

                {/* Impact Metric & Read Study CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f7670] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300">
                    <TrendingUp className="w-3.5 h-3.5 text-[#0f7670] shrink-0" />
                    <span className="font-mono">{project.impactMetric}</span>
                    <span className="text-[10px] text-slate-600 font-medium max-w-[130px] truncate">{project.impactLabel || "Verified"}</span>
                  </div>

                  <Link
                    href={`/portfolio/${project.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0f7670] hover:text-[#000838] transition-colors group/btn"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(project.techStack || ["Next.js 15", "TypeScript"]).slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack && project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-300">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Tags Bar with Vertical Separators Matching Exact Screenshot */}
              <div className="pt-3.5 border-t border-slate-200 relative z-10">
                <div className="flex items-center justify-center text-[11px] sm:text-xs font-bold text-[#0f7670] tracking-wide divide-x divide-slate-300">
                  {(project.serviceTags && project.serviceTags.length > 0
                    ? project.serviceTags
                    : ["Mobile App", "Web Development", "UI/UX Design"]
                  ).map((tag, idx) => (
                    <span key={idx} className="px-2.5 first:pl-0 last:pr-0">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-700 font-semibold text-sm">No client projects found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#000838] text-white text-xs font-bold hover:bg-[#0f7670] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Home Page Call to Action */}
        {isHome && (
          <div className="mt-14 text-center reveal-init reveal-delay-3">
            <Link
              href="/portfolio"
              className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
            >
              <span>View Case Studies &amp; Architecture Blueprints</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
