"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { techStackData as seedTechStack, TechItem, getTechSlug } from "@/data/techStack";
import {
  Code2,
  Server,
  Cpu,
  Smartphone,
  Cloud,
  Database,
  ShieldCheck,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Search,
  Sparkles,
  Layers,
  Flame,
  Globe2,
  ArrowUpRight
} from "lucide-react";

interface TechStackGridProps {
  /** Admin-managed records. Falls back to the built-in seed. */
  items?: TechItem[];
  isHome?: boolean;
}

export default function TechStackGrid({ isHome = false, items }: TechStackGridProps) {
  const techStackData = items ?? seedTechStack;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Arsenal", icon: Terminal },
    { id: "frontend", label: "Frontend", icon: Code2 },
    { id: "php", label: "Laravel & PHP", icon: Flame },
    { id: "cms", label: "CMS & Commerce", icon: Globe2 },
    { id: "backend", label: "Backend & Systems", icon: Server },
    { id: "ai", label: "AI & Neural Nets", icon: Cpu },
    { id: "database", label: "Databases & Cache", icon: Database },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "devops", label: "DevOps & Cloud", icon: Cloud },
    { id: "security", label: "Security & Auth", icon: ShieldCheck },
  ];

  const filteredTech = useMemo(() => {
    return techStackData.filter((t: TechItem) => {
      const matchesCategory = activeCategory === "all" || t.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.useCase && t.useCase.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedTech = isHome ? filteredTech.slice(0, 15) : filteredTech;

  return (
    <section id="tech-stack" className="relative py-8 lg:py-10 bg-slate-50/70 overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="glow-orb-cyan w-[400px] h-[400px] top-10 right-10 pointer-events-none opacity-20"></div>
      <div className="glow-orb-blue w-[450px] h-[450px] bottom-10 left-10 pointer-events-none opacity-20"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-mono font-bold text-sky-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
            <Terminal className="w-3.5 h-3.5 text-sky-600" />
            <span className="tracking-wider uppercase">CORE STACK MATRIX // PRODUCTION HARDENED</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-tight text-slate-900">
            Battle-Tested Technologies for{" "}
            <span className="gradient-text font-semibold">Maximum Performance</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Zero bloat, type-safe integrity, sub-second latency, and horizontal scalability. We architect systems exclusively on modern, long-term durable frameworks including Next.js, Laravel, Headless CMS, and Cloud-Native AI primitives.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="reveal-init reveal-delay-1 mt-6 sm:mt-8 space-y-5">
          {/* Search bar (only on full page) */}
          {!isHome && (
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technologies (e.g. Next.js, Laravel, WordPress, Kafka, Claude)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeCategory === cat.id;
              const count =
                cat.id === "all"
                  ? techStackData.length
                  : techStackData.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-700/20 scale-105"
                      : "bg-white border-slate-200 text-slate-700 hover:text-sky-700 hover:border-sky-300 hover:bg-sky-50/70 shadow-2xs"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-sky-600"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tech Grid (Clickable cards leading to /tech-stack/[slug]) */}
        <div className="reveal-init reveal-delay-2 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {displayedTech.map((tech: TechItem, index: number) => {
            const slug = tech.slug || getTechSlug(tech.name);
            return (
              <Link
                key={index}
                href={`/tech-stack/${slug}`}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-sky-400 hover:bg-white flex flex-col justify-between min-h-[205px] space-y-4 group shadow-2xs hover:shadow-xl hover:shadow-sky-900/8 transition-all duration-300 hover:-translate-y-1 block relative overflow-hidden"
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                      {tech.iconText}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono uppercase font-bold text-sky-600 bg-sky-50 border border-sky-200/70 rounded-full px-2.5 py-0.5 tracking-wider">
                        {tech.category}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors flex items-center justify-between">
                      <span>{tech.name}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal line-clamp-2">
                      {tech.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                    <span>Production Ready</span>
                  </span>
                  <span className="text-sky-600 font-bold font-mono text-xs">
                    {tech.version || "vLatest"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedTech.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium text-sm">No technologies found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* View All Redirection Action Button on Home Page */}
        {isHome && (
          <div className="mt-12 text-center reveal-init reveal-delay-3">
            <Link
              href="/tech-stack"
              className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
            >
              <span>View All Technologies ({techStackData.length}+ Stacks Available)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Architecture Strengths Summary Bar */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-xs">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="font-bold text-slate-900">{techStackData.length}+ Modern Frameworks</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-700 font-bold">100% Type-Safe</span> (Strict TypeScript & PHP 8.4)
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-sky-700 font-bold">Sub-50ms</span> Edge P99 Latency
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <a
              href="#contact"
              className="text-sky-700 font-bold hover:text-sky-900 inline-flex items-center gap-1"
            >
              <span>Consult with Senior Architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

