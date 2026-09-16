"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { testimonialsData as seedTestimonials, TestimonialItem } from "@/data/testimonials";
import {
  MessageSquareQuote,
  Star,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Award,
  Sparkles,
  Filter,
  Search,
  ArrowRight,
  Globe2
} from "lucide-react";

type CategoryFilter =
  | "All"
  | "Enterprise SaaS"
  | "Healthcare HMIS"
  | "Fintech Web Platform"
  | "AI Automation"
  | "Supply Chain ERP"
  | "Mobile & Web App"
  | "E-Commerce & Headless"
  | "Cloud & DevOps";

interface TestimonialsProps {
  /** Admin-managed records. Falls back to the built-in seed. */
  items?: TestimonialItem[];
  isHome?: boolean;
}

export default function Testimonials({ isHome = false, items }: TestimonialsProps) {
  const testimonialsData = items ?? seedTestimonials;
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: { label: string; value: CategoryFilter }[] = [
    { label: "All Stories", value: "All" },
    { label: "Enterprise SaaS", value: "Enterprise SaaS" },
    { label: "Healthcare HMIS", value: "Healthcare HMIS" },
    { label: "Fintech Platform", value: "Fintech Web Platform" },
    { label: "AI & Automation", value: "AI Automation" },
    { label: "Supply Chain ERP", value: "Supply Chain ERP" },
    { label: "Mobile & Web Apps", value: "Mobile & Web App" },
    { label: "E-Commerce", value: "E-Commerce & Headless" },
    { label: "Cloud & DevOps", value: "Cloud & DevOps" },
  ];

  const filteredTestimonials = useMemo(() => {
    return testimonialsData.filter((item: TestimonialItem) => {
      const matchesCategory = selectedCategory === "All" || item.projectType === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.metricsAchieved.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = isHome ? filteredTestimonials.slice(0, 6) : filteredTestimonials;

  return (
    <section id="testimonials" className="relative py-8 lg:py-10 bg-white overflow-hidden border-t border-slate-200/80">
      <div className="absolute inset-0 bg-cyber-grid opacity-25 pointer-events-none" />
      <div className="glow-orb-blue w-[400px] h-[400px] top-1/4 -left-20 opacity-15"></div>
      <div className="glow-orb-cyan w-[350px] h-[350px] bottom-10 right-10 opacity-15"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 shadow-xs">
            <MessageSquareQuote className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase tracking-wider">
              {isHome ? "IN THEIR WORDS // SIX REVIEWS" : `IN THEIR WORDS // ${testimonialsData.length}+ REVIEWS`}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            What It Is Like to{" "}
            <span className="gradient-text font-semibold">Work With Us</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            Founders and technical leads describing how the project actually went — where we were quick, where things got difficult, and what shipped in the end.
          </p>
        </div>

        {/* Search & Filter Category Controls */}
        <div className="reveal-init reveal-delay-1 mt-6 sm:mt-8 space-y-5">
          {/* Search bar (Only on dedicated page) */}
          {!isHome && (
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews (e.g. Next.js, Series A, HIPAA, AWS, Dubai)..."
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1">
              <Filter className="w-3.5 h-3.5 text-sky-600" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => {
              const count =
                cat.value === "All"
                  ? testimonialsData.length
                  : testimonialsData.filter((t) => t.projectType === cat.value).length;
              const isActive = selectedCategory === cat.value;

              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-700/20 scale-105"
                      : "bg-white text-slate-700 border-slate-200 hover:text-sky-700 hover:border-sky-300 hover:bg-sky-50/70 shadow-2xs"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
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

        {/* Testimonials Grid (Responsive 1/2/3 columns) */}
        <div className="reveal-init reveal-delay-2 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((item: TestimonialItem) => {
            const isUpwork = item.platform === "Upwork" || item.verifiedBadge?.toLowerCase().includes("upwork");
            const isFreelancer = item.platform === "Freelancer" || item.verifiedBadge?.toLowerCase().includes("freelancer");

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200 hover:border-sky-400 flex flex-col justify-between space-y-6 relative group shadow-xs hover:shadow-xl hover:shadow-sky-900/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Rating, Verification & Platform Badge */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1 font-mono">5.0</span>
                    </div>

                    {isUpwork ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Upwork Verified</span>
                      </span>
                    ) : isFreelancer ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-mono flex items-center gap-1.5 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span>Freelancer.com</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono">
                        {item.platform || item.projectType}
                      </span>
                    )}
                  </div>

                  {/* Project Name Strip */}
                  {item.projectName && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono font-semibold text-slate-700 max-w-full truncate">
                      <span className="text-sky-600 font-bold">PROJECT:</span>
                      <span className="truncate">{item.projectName}</span>
                    </div>
                  )}

                  {/* Headline Quote */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                    &ldquo;{item.headline}&rdquo;
                  </h3>

                  {/* Detailed review */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    &ldquo;{item.quote}&rdquo;
                  </p>

                  {/* Metrics Achieved Highlight Tag */}
                  {item.metricsAchieved && (
                    <div className="pt-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold max-w-full">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.metricsAchieved}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Author Row & Verification Footer */}
                <div className="pt-5 border-t border-slate-100 flex flex-col space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0 ${item.avatarBg}`}
                    >
                      {item.avatarText}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5 truncate">
                        <span className="truncate">{item.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <div className="text-xs text-slate-600 font-medium truncate">
                        {item.role}, <strong className="text-slate-800 font-bold">{item.company}</strong>
                      </div>
                      <div className="text-[11px] text-sky-700 font-semibold mt-0.5 font-mono truncate">
                        {item.country}
                      </div>
                    </div>
                  </div>

                  {/* Verified Badge pill */}
                  {item.verifiedBadge && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        {item.verifiedBadge}
                      </span>
                      <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                        <Award className="w-3 h-3 text-amber-500" />
                        100% Client Satisfaction
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State if filter yields nothing */}
        {displayedItems.length === 0 && (
          <div className="mt-12 text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-600 font-medium text-base">No testimonials found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Home Page "View All Reviews" Action Button */}
        {isHome && (
          <div className="mt-14 text-center reveal-init reveal-delay-3">
            <Link
              href="/testimonials"
              className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
            >
              <span>View All Reviews ({testimonialsData.length}+ Verified Client Endorsements)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 px-8 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium shadow-2xs">
            <span className="flex items-center gap-2">
              <span className="text-amber-600 font-bold">★ 4.9/5</span> on Clutch.co & G2
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-emerald-700 font-bold">99.2%</span> Sprint On-Time SLA
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <span className="text-sky-700 font-bold">100%</span> Verified Enterprise Leaders
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-purple-600" />
              <span>15+ Global Countries</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
