"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { portfolioProjects as seedPortfolio, PortfolioProject } from "@/data/portfolio";
import {
  Briefcase,
  TrendingUp,
  ArrowRight,
  Search,
  Sparkles,
  Layers,
  Cpu,
  Smartphone,
  Globe2,
  CreditCard,
  ShoppingBag,
  ExternalLink
} from "lucide-react";

interface PortfolioSectionProps {
  /** Admin-managed records. Falls back to the built-in seed. */
  items?: PortfolioProject[];
  isHome?: boolean;
}

export default function PortfolioSection({ isHome = false, items }: PortfolioSectionProps) {
  const portfolioProjects = items ?? seedPortfolio;
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "All", label: "All Projects", icon: Layers },
    { id: "SaaS", label: "SaaS & Cloud", icon: Briefcase },
    { id: "AI", label: "AI & Neural Agents", icon: Cpu },
    { id: "Mobile App", label: "Mobile Apps", icon: Smartphone },
    { id: "Web Platform", label: "Web & IoT", icon: Globe2 },
    { id: "E-Commerce", label: "E-Commerce", icon: ShoppingBag },
    { id: "FinTech", label: "FinTech & Payments", icon: CreditCard },
  ];

  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter((p: PortfolioProject) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const displayedProjects = isHome ? filteredProjects.slice(0, 4) : filteredProjects;

  return (
    <section id="portfolio" className="relative py-8 lg:py-10 bg-white overflow-hidden border-t border-slate-200/80">
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="glow-orb-blue w-[400px] h-[400px] top-1/4 -left-20 opacity-15"></div>
      <div className="glow-orb-orange w-[350px] h-[350px] bottom-10 right-10 opacity-15"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase tracking-wider">
              {isHome ? "FEATURED DELIVERIES // 4 PROVEN CASE STUDIES" : `CASE STUDIES // ${portfolioProjects.length}+ PRODUCTION SYSTEMS`}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Featured Projects We&apos;ve <span className="gradient-text font-semibold">Engineered & Scaled</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Explore our proven track record engineering custom multi-tenant SaaS platforms, autonomous AI agents, cross-platform mobile apps, and low-latency fintech web platforms that generate compounding ROI.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="reveal-init reveal-delay-1 mt-6 sm:mt-8 space-y-5">
          {/* Search Bar (Only shown on full page) */}
          {!isHome && (
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies (e.g. Next.js, AI, Stripe, IoT, React Native)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 shadow-xs transition-all"
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-700/20 scale-105"
                      : "bg-white border-slate-200 text-slate-700 hover:text-sky-700 hover:bg-sky-50/70 hover:border-sky-300 shadow-2xs"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-sky-600"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isSelected ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="reveal-init reveal-delay-2 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-900/5 flex flex-col justify-between space-y-6 group overflow-hidden relative shadow-xs transition-all duration-300"
            >
              {/* Project Category Tag */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                  {project.category}
                </span>

                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full text-emerald-700 text-xs font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{project.impactMetric} {project.impactLabel}</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <Link href={`/portfolio/${project.id}`} className="block group/link">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover/link:text-sky-700 transition-colors flex items-center justify-between gap-2">
                    <span>{project.title}</span>
                    <ArrowRight className="w-5 h-5 text-sky-600 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all shrink-0" />
                  </h3>
                </Link>
                <p className="text-xs font-bold text-amber-700">
                  {project.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Technologies Deployed:
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 transition-colors shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Project Metadata & Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 font-mono font-medium">
                  Architecture SLA: <span className="font-bold text-emerald-700">99.999% Verified</span>
                </div>
                <Link
                  href={`/portfolio/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 group/cta"
                >
                  <span>Read Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty Search State */}
        {displayedProjects.length === 0 && (
          <div className="mt-12 text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium text-sm">No case studies found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Home Page "View All Case Studies" Redirection Button */}
        {isHome && (
          <div className="mt-14 text-center reveal-init reveal-delay-3">
            <Link
              href="/portfolio"
              className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
            >
              <span>View All Case Studies ({portfolioProjects.length}+ Proven Deliveries)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
