"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
  Bot,
  Smartphone,
  Globe2,
  Sparkles,
  CheckCircle2,
  Cpu,
  Server,
  Star,
  Activity,
  Lock,
  ArrowUpRight
} from "lucide-react";

interface HeroSectionProps {
  onOpenConsultation?: () => void;
}

export default function HeroSection({ onOpenConsultation: _onOpenConsultation }: HeroSectionProps) {
  const siteConfig = useSiteConfig();
  const [activeCard, setActiveCard] = useState<number>(0);
  const [pingLatency, setPingLatency] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      setPingLatency(Math.floor(Math.random() * 3 + 5));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const capabilities = [
    {
      id: "ai",
      title: "AI That Does Actual Work",
      subtitle: "Agents that read your documents, answer customers and file the result",
      icon: Bot,
      color: "from-teal-500 to-emerald-600",
      accent: "#0f7670",
      badge: "AI & AUTOMATION",
      stats: "Answers in under a second • Runs on your data",
      techs: ["DeepSeek", "GPT-4o", "FastAPI", "LangChain"],
    },
    {
      id: "cloud",
      title: "SaaS Products Built to Scale",
      subtitle: "One codebase serving many customers, each one properly walled off",
      icon: Globe2,
      color: "from-sky-500 to-blue-600",
      accent: "#189a91",
      badge: "MULTI-TENANT",
      stats: "Fast from anywhere • Tenant data kept separate",
      techs: ["Next.js 15", "PostgreSQL RLS", "Docker", "Stripe"],
    },
    {
      id: "mobile",
      title: "Mobile Apps People Keep Open",
      subtitle: "One build for iOS and Android that still works without signal",
      icon: Smartphone,
      color: "from-emerald-500 to-teal-600",
      accent: "#5c9556",
      badge: "IOS & ANDROID",
      stats: "Smooth scrolling • Works offline, syncs later",
      techs: ["React Native", "Flutter", "Swift", "WebSockets"],
    },
    {
      id: "enterprise",
      title: "Hospital and ERP Systems",
      subtitle: "Patient records, inventory, billing and ledgers that have to balance",
      icon: ShieldCheck,
      color: "from-blue-600 to-indigo-700",
      accent: "#000838",
      badge: "REGULATED WORK",
      stats: "Built to ABDM and HIPAA rules • Audited access",
      techs: ["Microservices", "PostgreSQL", "Redis", "GraphQL"],
    },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-transparent">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-5%] left-[-5%] w-[550px] h-[550px] rounded-full bg-[#0f7670]/6 blur-[140px]" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#5c9556]/6 blur-[140px]" />
      </div>

      {/* Main Full-Width Container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* ─── LEFT COLUMN: HEADLINE & VALUE PROP ─── */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#0f7670]/30 shadow-xs text-xs font-semibold text-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5c9556] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5c9556]" />
              </span>
              <span className="text-slate-800 font-bold">
                {siteConfig.heroEyebrow || "Next-Gen Digital Solutions & Cloud Architecture"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[44px] font-bold tracking-tight text-[#000838] leading-[1.25]">
              <span>Custom Software, AI &amp; SaaS Solutions</span>{" "}
              <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556]">
                Built for Growing Businesses
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We design and build scalable web platforms, mobile apps, SaaS products and AI solutions—from product strategy to production deployment.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm bg-[#0f7670] hover:bg-[#0f5f5b] text-white shadow-lg shadow-[#0f7670]/20 hover:shadow-[#0f7670]/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-white/95 backdrop-blur-md hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-xs hover:border-[#0f7670]/50 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#0f7670]" />
                <span>View Case Studies</span>
              </Link>
            </div>

            {/* Trust Proof Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#0f7670] shrink-0" />
                <span className="font-bold text-slate-900">50+ Projects Delivered</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-emerald-200 text-emerald-700 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#5c9556] shrink-0" />
                <span className="font-semibold text-slate-800">100% Code Ownership</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#0f7670]/30 text-[#0f7670] shadow-2xs">
                <Zap className="w-4 h-4 text-[#0f7670] shrink-0" />
                <span className="text-slate-800 font-semibold">Performance-Focused Architecture</span>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: 3D INTERACTIVE ARCHITECTURE HUB ─── */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full">
            
            {/* Ambient Multi-Hue Glow Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#0f7670]/15 via-sky-300/10 to-[#5c9556]/15 rounded-3xl blur-3xl opacity-70 pointer-events-none" />

            {/* Floating Top Header Pill */}
            <div className="flex items-center justify-between gap-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5c9556] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#5c9556]" />
                </span>
                <span className="text-xs font-mono font-bold text-[#000838] tracking-wider uppercase">
                  ENTERPRISE SOLUTIONS ECOSYSTEM
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs text-[11px] font-mono text-[#0f7670] font-bold">
                <Activity className="w-3.5 h-3.5" />
                <span>50+ PROJECTS DELIVERED</span>
              </div>
            </div>

            {/* Interactive 4-Pillar Grid of High-Impact Solution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 relative z-10">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon;
                const isSelected = activeCard === idx;
                return (
                  <div
                    key={cap.id}
                    onClick={() => setActiveCard(idx)}
                    className={`group relative p-5 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl ${
                      isSelected
                        ? "bg-white/95 border-2 border-[#0f7670] shadow-xl shadow-[#0f7670]/10 scale-[1.02]"
                        : "bg-white/80 hover:bg-white/95 border border-slate-200/90 hover:border-[#0f7670]/40 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {/* Glowing corner flare for selected card */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#0f7670]/15 to-transparent rounded-bl-full pointer-events-none" />
                    )}

                    {/* Top Row: Icon & Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-gradient-to-tr from-[#0f7670] to-[#5c9556] text-white shadow-md shadow-[#0f7670]/30"
                            : "bg-slate-100 group-hover:bg-[#0f7670]/10 text-[#0f7670]"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <span
                        className={`text-[9.5px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? "bg-emerald-50 text-[#385d36] border-emerald-200"
                            : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        {cap.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1 mb-3">
                      <h3 className="text-sm font-bold text-[#000838] group-hover:text-[#0f7670] transition-colors leading-snug flex items-center justify-between">
                        <span>{cap.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#0f7670]" />
                      </h3>
                      <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-2">
                        {cap.subtitle}
                      </p>
                    </div>

                    {/* Live Performance Stats & Tech Tags */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-semibold text-[#0f7670]">
                        <Sparkles className="w-3 h-3 text-[#5c9556]" />
                        <span>{cap.stats}</span>
                      </div>

                      <div className="flex items-center gap-1 flex-wrap">
                        {cap.techs.map((tech) => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.5 rounded bg-slate-100/90 text-slate-600 text-[9.5px] font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Floating Interactive Action Bar */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-md flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#5c9556] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <span className="font-bold text-slate-900 block truncate">
                    Ready to build your solution?
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    14-Day Delivery Guarantee • Free Architecture Consultation
                  </span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0f7670] to-[#5c9556] hover:from-[#0d645f] hover:to-[#4e8149] text-white text-xs font-bold transition-all shadow-md shadow-[#0f7670]/20 hover:shadow-[#0f7670]/30 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              >
                <span>Discuss Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
