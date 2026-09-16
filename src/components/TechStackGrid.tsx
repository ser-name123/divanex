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

// Curated Core Technology Pillars displayed on the Homepage
interface CoreTechItem {
  name: string;
  slug: string;
  desc: string;
  iconText: string;
  badge: string;
}

interface CorePillar {
  category: string;
  badge: string;
  icon: React.ElementType;
  accentColor: string;
  items: CoreTechItem[];
}

const HOMEPAGE_CORE_PILLARS: CorePillar[] = [
  {
    category: "Frontend",
    badge: "WEB & MOBILE UI",
    icon: Code2,
    accentColor: "sky",
    items: [
      { name: "React", slug: "reactjs", desc: "Component architecture & interactive SPAs", iconText: "⚛️", badge: "v19" },
      { name: "Next.js", slug: "nextjs", desc: "Server-side rendering & sub-second page loads", iconText: "▲", badge: "v15 App Router" },
      { name: "Flutter", slug: "flutter-dart", desc: "Cross-platform iOS & Android native apps", iconText: "💙", badge: "60fps Native" }
    ]
  },
  {
    category: "Backend",
    badge: "API & MICROSERVICES",
    icon: Server,
    accentColor: "indigo",
    items: [
      { name: "Node.js", slug: "nodejs-nestjs", desc: "High-concurrency async event loops", iconText: "🟢", badge: "v22 LTS" },
      { name: "Laravel", slug: "laravel", desc: "Enterprise business logic, queues & APIs", iconText: "🔴", badge: "v11 / 12" },
      { name: "Python / FastAPI", slug: "python-fastapi-django", desc: "High-throughput APIs & data pipelines", iconText: "🐍", badge: "Async REST" }
    ]
  },
  {
    category: "Database",
    badge: "ACID PERSISTENCE",
    icon: Database,
    accentColor: "emerald",
    items: [
      { name: "PostgreSQL", slug: "postgresql-pgvector", desc: "Row-Level Security, JSONB & pgvector", iconText: "🐘", badge: "v16 Enterprise" },
      { name: "MySQL", slug: "mysql", desc: "High-performance transactional SQL storage", iconText: "🐬", badge: "v8.0 InnoDB" }
    ]
  },
  {
    category: "AI & Automation",
    badge: "NEURAL & RAG",
    icon: Cpu,
    accentColor: "purple",
    items: [
      { name: "OpenAI", slug: "openai-gpt4", desc: "GPT-4o, reasoning models & embeddings", iconText: "🧠", badge: "API Integration" },
      { name: "Claude", slug: "anthropic-claude", desc: "Claude 3.5 Sonnet contextual reasoning", iconText: "⚡", badge: "200k Context" },
      { name: "RAG Pipelines", slug: "llamaindex-dspy", desc: "Private vector search on company documents", iconText: "📚", badge: "pgvector & Qdrant" },
      { name: "AI Agents", slug: "langchain-langgraph", desc: "Autonomous tool-calling & SQL workflows", iconText: "🤖", badge: "LangGraph Multi-Actor" }
    ]
  },
  {
    category: "Cloud & DevOps",
    badge: "ZERO-DOWNTIME",
    icon: Cloud,
    accentColor: "teal",
    items: [
      { name: "AWS", slug: "aws-cloud", desc: "Scalable cloud compute, EKS & S3 storage", iconText: "☁️", badge: "Enterprise Cloud" },
      { name: "Google Cloud", slug: "gcp-cloud", desc: "Cloud Run, BigQuery & managed AI engines", iconText: "🌐", badge: "Managed Clusters" },
      { name: "Vercel", slug: "nextjs", desc: "Global edge network & serverless CDN", iconText: "▲", badge: "Sub-30ms TTFB" },
      { name: "Docker", slug: "docker-containerd", desc: "Containerized reproducible application pods", iconText: "🐳", badge: "OCI Images" }
    ]
  }
];

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

  return (
    <section id="tech-stack" className="relative py-12 lg:py-16 bg-slate-50/70 overflow-hidden">
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
            <span className="tracking-wider uppercase">
              {isHome ? "OUR TOOLKIT // CORE TECH STACK" : "OUR TOOLKIT // CHOSEN TO LAST"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-tight text-slate-900">
            {isHome ? "Modern, Battle-Tested Technologies" : "Boring Technology Choices, "}
            {!isHome && <span className="gradient-text font-semibold">On Purpose</span>}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            {isHome
              ? "We build with proven, industry-standard technologies known for long-term reliability, rapid execution, and seamless developer handoff."
              : "We pick frameworks that will still be maintained in five years and that any competent developer can pick up after us — Next.js, Laravel, PostgreSQL, React Native. Nothing exotic, nothing that locks you in."}
          </p>
        </div>

        {/* ======================================================== */}
        {/* HOMEPAGE VIEW: 5 CURATED CORE PILLARS (Clean & Focused) */}
        {/* ======================================================== */}
        {isHome && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {HOMEPAGE_CORE_PILLARS.map((pillar, pIdx) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="bg-white rounded-3xl p-6 border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-blue-500 to-teal-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div>
                    {/* Pillar Header */}
                    <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-200 text-sky-700 shadow-2xs">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-slate-900">{pillar.category}</h3>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Tech Items List inside Pillar */}
                    <div className="space-y-3">
                      {pillar.items.map((tech, tIdx) => (
                        <Link
                          key={tIdx}
                          href={`/tech-stack/${tech.slug}`}
                          className="p-3 rounded-2xl bg-slate-50/70 hover:bg-sky-50/70 border border-slate-200/80 hover:border-sky-300 transition-all duration-200 flex items-start gap-3 group/item block cursor-pointer"
                        >
                          <span className="text-lg shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                            {tech.iconText}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-sky-700 transition-colors">
                                {tech.name}
                              </span>
                              <span className="text-[9px] font-mono font-bold text-slate-500 group-hover/item:text-sky-700">
                                {tech.badge}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug line-clamp-1 mt-0.5">
                              {tech.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Pillar Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Production Ready</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Tech Stack Portal on Homepage */}
        {isHome && (
          <div className="reveal-init mt-12 rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-300">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0f7670]" />
                  <span>EXTENSIVE TECHNOLOGY ARSENAL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Need a Specific Framework, Cloud Service, or Database?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-2xl">
                  Explore our full spectrum of 50+ languages, frameworks, libraries, and dev tools—including Redis, Kafka, Supabase, GraphQL, and ClickHouse.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto shrink-0">
                <Link
                  href="/tech-stack"
                  className="btn-futuristic-primary w-full sm:w-auto text-xs sm:text-sm !py-3.5 !px-6 !rounded-xl"
                >
                  <span>Explore Full 50+ Tech Stack</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold border border-slate-200 text-center transition-all cursor-pointer"
                >
                  Start a Project →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* DEDICATED /TECH-STACK PAGE VIEW: ALL 50+ TECHNOLOGIES    */}
        {/* ======================================================== */}
        {!isHome && (
          <div className="mt-8 space-y-8">
            {/* Search & Category Filter Controls */}
            <div className="space-y-5">
              {/* Search bar */}
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

            {/* Tech Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredTech.map((tech: TechItem, index: number) => {
                const slug = tech.slug || getTechSlug(tech.name);
                return (
                  <Link
                    key={index}
                    href={`/tech-stack/${slug}`}
                    className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-sky-400 hover:bg-white flex flex-col justify-between min-h-[205px] space-y-4 group shadow-2xs hover:shadow-xl hover:shadow-sky-900/8 transition-all duration-300 hover:-translate-y-1 block relative overflow-hidden"
                  >
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

            {filteredTech.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300">
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
          </div>
        )}

        {/* Architecture Strengths Summary Bar */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-xs">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="font-bold text-slate-900">Battle-Tested Architecture</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-700 font-bold">100% Type-Safe</span> (Strict TypeScript & Python Type Hints)
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-sky-700 font-bold">Production-Ready</span> CI/CD & Cloud Blueprints
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


