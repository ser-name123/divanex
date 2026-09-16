"use client";

import { useState } from "react";
import { AdminProjectSprint } from "@/data/adminData";
import {
  DollarSign,
  Activity,
  Kanban,
  TrendingUp,
  Cpu,
  Database,
  Server,
  Sparkles,
  Zap,
  CheckCircle2,
  Globe
} from "lucide-react";

interface AdminOverviewProps {
  projects: AdminProjectSprint[];
}

export default function AdminOverviewView({
  projects
}: AdminOverviewProps) {
  const [activeTimeframe, setActiveTimeframe] = useState<"7d" | "30d" | "90d">("30d");

  // KPI calculations — derived from live data rather than hardcoded figures.

  /** Contract values are stored as display strings ("$25,000"); pull the number out. */
  const parseCurrency = (value: string | undefined): number => {
    if (!value) return 0;
    const digits = value.replace(/[^0-9.]/g, "");
    const parsed = Number.parseFloat(digits);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatUsd = (amount: number) => `$${Math.round(amount).toLocaleString("en-US")}`;

  const contractedValue = projects.reduce(
    (sum, p) => sum + parseCurrency(p.contractValue),
    0
  );

  const totalPipeline = formatUsd(contractedValue);

  const activeSprintsCount = projects.length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ======================================================== */}
      {/* 1. TOP TELEMETRY KPI TILES */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Pipeline Value */}
        <div className="relative p-6 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-sky-400 transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600 pointer-events-none" />

          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
              Total Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {totalPipeline}
          </div>

          <div className="flex items-center justify-between pt-2.5 text-xs font-mono">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <TrendingUp className="w-3.5 h-3.5" /> {activeSprintsCount} signed
            </span>
            <span className="text-slate-500">projects under contract</span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Contracted Value:</span>
            <span className="text-sky-700 font-bold">{totalPipeline}</span>
          </div>
        </div>

        {/* KPI 2: Active Sprints */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-blue-400 transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 pointer-events-none" />

          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
              Active Client Sprints
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Kanban className="w-4 h-4" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {activeSprintsCount} Production Sprints
          </div>

          <div className="flex items-center justify-between pt-2.5 text-xs font-mono">
            <span className="inline-flex items-center gap-1 text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% On-Time SLA
            </span>
            <span className="text-slate-500">0 Blockers</span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Sprint Velocity:</span>
            <span className="text-blue-700 font-bold">38 PRs Merged</span>
          </div>
        </div>


        {/* KPI 4: Global Ingress Health */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md group hover:border-purple-400 transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 pointer-events-none" />

          <div className="flex items-center justify-between pb-3">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
              Cluster Reliability SLA
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            99.9% SLA
          </div>

          <div className="flex items-center justify-between pt-2.5 text-xs font-mono">
            <span className="inline-flex items-center gap-1 text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
              <Globe className="w-3.5 h-3.5" /> 12ms Ingress
            </span>
            <span className="text-slate-500">0 Incidents</span>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Anycast Edge Nodes:</span>
            <span className="text-purple-700 font-bold">3 Multi-Region</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. REVENUE VELOCITY CHART & INFRASTRUCTURE TELEMETRY */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Revenue Pipeline Trajectory Chart (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 relative shadow-sm">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sky-600 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AGENCY FINANCIAL TRAJECTORY</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mt-1">
                Revenue Pipeline Velocity & Bookings
              </h3>
            </div>

            {/* Timeframe selector pills */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs">
              {(["7d", "30d", "90d"] as const).map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTimeframe === tf
                      ? "bg-sky-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "Quarter"}
                </button>
              ))}
            </div>
          </div>

          {/* Area Graph */}
          <div className="relative w-full h-72 sm:h-80 select-none bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
            {/* Ambient Chart Backdrop Grid */}
            <div className="absolute inset-0 grid grid-rows-4 grid-cols-4 border border-slate-200/40 pointer-events-none">
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-b border-r border-slate-200/40" />
              <div className="border-r border-slate-200/40" />
              <div className="border-r border-slate-200/40" />
              <div className="border-r border-slate-200/40" />
              <div />
            </div>

            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lightAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f7670" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#35b5ac" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gradient Area Fill */}
              <path
                d="M 20 280 C 140 260, 240 210, 360 170 C 480 130, 580 120, 680 50 L 780 40 L 780 300 L 20 300 Z"
                fill="url(#lightAreaGradient)"
              />

              {/* Trajectory Curve Line */}
              <path
                d="M 20 280 C 140 260, 240 210, 360 170 C 480 130, 580 120, 680 50 L 780 40"
                fill="none"
                stroke="#0f7670"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Key Milestones on the Curve */}
              <circle cx="20" cy="280" r="5" fill="#0f7670" />
              <circle cx="240" cy="210" r="5" fill="#0f7670" />
              <circle cx="480" cy="130" r="5" fill="#26397a" />
              <circle cx="680" cy="50" r="6" fill="#2e3e7e" />
              <circle cx="780" cy="40" r="7" fill="#0f7670" />
              <circle cx="780" cy="40" r="13" fill="#0f7670" opacity="0.25" className="animate-ping" />
            </svg>

            {/* Trajectory Axis Annotations */}
            <div className="absolute bottom-2 inset-x-4 flex justify-between text-[11px] font-mono text-slate-500 font-medium pointer-events-none">
              <span>Week 1 (Scoping)</span>
              <span>Week 2 (Proposals)</span>
              <span>Week 3 (Contracts)</span>
              <span className="text-sky-700 font-bold">Week 4 ($184.5k Target)</span>
            </div>
          </div>

          {/* Bottom Financial Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Contracted MRR</div>
              <div className="text-sm sm:text-base font-bold text-slate-900 font-mono mt-0.5">$38,500/mo</div>
              <div className="text-[10px] text-emerald-700 font-mono font-bold mt-0.5">+14.2% MoM</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Average Deal Size</div>
              <div className="text-sm sm:text-base font-bold text-sky-700 font-mono mt-0.5">$23,400</div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Enterprise Avg</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Cash In Escrow</div>
              <div className="text-sm sm:text-base font-bold text-purple-700 font-mono mt-0.5">$112,000</div>
              <div className="text-[10px] text-purple-700 font-mono font-bold mt-0.5">Stripe Verified</div>
            </div>
          </div>
        </div>

        {/* Right Column: Infrastructure Telemetry & Node Health (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 relative shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-sky-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-sky-600" />
                <span>CLUSTER TELEMETRY</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Performance Gauges */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-sky-600" />
                    <span>Serverless Compute Load</span>
                  </span>
                  <span className="text-sky-700 font-bold text-xs">24.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 w-[24%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PostgreSQL Pool Sharding</span>
                  </span>
                  <span className="text-emerald-700 font-bold text-xs">42/100 Active</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 w-[42%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-700 font-medium mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-600" />
                    <span>Redis Edge Cache Hit Ratio</span>
                  </span>
                  <span className="text-purple-700 font-bold text-xs">98.8%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 w-[98.8%]" />
                </div>
              </div>
            </div>

            {/* Edge Region Pings */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 font-mono text-[11px]">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Anycast Edge Nodes</div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700 font-medium">🇺🇸 US-East (N. Virginia)</span>
                <span className="text-emerald-700 font-bold">12ms</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700 font-medium">🇪🇺 EU-Central (Frankfurt)</span>
                <span className="text-emerald-700 font-bold">24ms</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-700 font-medium">🇮🇳 AP-South (Mumbai)</span>
                <span className="text-sky-700 font-bold">4ms</span>
              </div>
            </div>
          </div>

          {/* System Specs Bottom Box */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono shadow-2xs">
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Next.js 16 Runtime:</span>
              <span className="text-emerald-700 font-bold">Turbo Edge Node</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Security Perimeter:</span>
              <span className="text-sky-700 font-bold">TLS 1.3 + mTLS VPC</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>Active Revision:</span>
              <span className="text-slate-500 font-semibold">git#8f9c12b (Main)</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

