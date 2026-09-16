"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/data/blogData";
import {
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  Calendar,
  Eye,
  ThumbsUp,
  Tag,
  BookOpen,
  Filter,
  CheckCircle2,
  Send,
  Layers,
  Cpu,
  Stethoscope,
  Briefcase,
  Banknote,
  Cloud,
  SlidersHorizontal,
  TrendingUp,
  Flame,
  ArrowUpRight,
  ShieldCheck,
  Check,
  ChevronDown
} from "lucide-react";

interface BlogDirectoryClientProps {
  initialPosts: BlogPost[];
}

const CATEGORIES = [
  "All",
  "Food Delivery & Logistics",
  "PropTech & SaaS",
  "E-Commerce & Retail",
  "IoT & Smart Mobility",
  "Enterprise ERP",
  "AI & Autonomous Agents",
  "Healthcare HMIS",
  "Fintech & Payments",
  "Cloud & DevOps",
  "Mobile Engineering"
];

const POPULAR_TAGS = [
  "Hyperlocal Delivery",
  "PropTech",
  "E-Commerce",
  "EV Mobility",
  "Industrial ERP",
  "AI Agents",
  "Healthcare",
  "Fintech",
  "Cloud Cost Optimization",
  "React Native",
  "Flutter"
];

export default function BlogDirectoryClient({ initialPosts }: BlogDirectoryClientProps) {
  const router = useRouter();
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "views" | "likes">("newest");
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  // Reset pagination whenever filters or search query changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, searchQuery, selectedTag, sortBy]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = posts.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;
      }
    });
    return counts;
  }, [posts]);

  // Filtered & Sorted posts
  const filteredPosts = useMemo(() => {
    let result = posts.filter((post) => {
      const matchCategory =
        selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchTag = !selectedTag || post.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

      const matchSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchTag && matchSearch;
    });

    // Sorting
    if (sortBy === "views") {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === "likes") {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      // Newest by date
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    return result;
  }, [posts, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Featured Post (first featured post or highest viewed)
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Grid posts (excluding featured post if on default "All" view with no search/tag filter)
  const isDefaultView = selectedCategory === "All" && !searchQuery.trim() && !selectedTag;
  const gridPosts = useMemo(() => {
    if (isDefaultView && featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, isDefaultView, featuredPost]);

  // Slice grid posts according to visibleCount (default 6, loads 6 more on click)
  const displayedGridPosts = useMemo(() => {
    return gridPosts.slice(0, visibleCount);
  }, [gridPosts, visibleCount]);

  /**
   * Subscribes the reader.
   *
   * Like the footer's, this form used to be decorative: it set a flag and said
   * "You are subscribed!" without ever sending the address anywhere. It now
   * stores the subscriber and lands on the thank-you page.
   */
  const handleSubscribeNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email.includes("@")) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterBusy(true);
    setNewsletterError("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "blog" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/thank-you?kind=newsletter");
        return;
      }

      setNewsletterError(data.error || "Could not subscribe you. Please try again.");
    } catch {
      setNewsletterError("Network error. Please check your connection and try again.");
    }

    setNewsletterBusy(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food Delivery & Logistics":
        return <Layers className="w-3.5 h-3.5 text-amber-600" />;
      case "PropTech & SaaS":
        return <Briefcase className="w-3.5 h-3.5 text-blue-600" />;
      case "E-Commerce & Retail":
        return <Flame className="w-3.5 h-3.5 text-rose-600" />;
      case "IoT & Smart Mobility":
        return <Cpu className="w-3.5 h-3.5 text-emerald-600" />;
      case "Healthcare HMIS":
        return <Stethoscope className="w-3.5 h-3.5 text-sky-600" />;
      case "Enterprise ERP":
        return <Briefcase className="w-3.5 h-3.5 text-indigo-600" />;
      case "Fintech & Payments":
      case "Fintech & Security":
        return <Banknote className="w-3.5 h-3.5 text-emerald-600" />;
      case "AI & Autonomous Agents":
        return <Cpu className="w-3.5 h-3.5 text-purple-600" />;
      case "Cloud & DevOps":
        return <Cloud className="w-3.5 h-3.5 text-sky-600" />;
      case "Mobile Engineering":
        return <Layers className="w-3.5 h-3.5 text-cyan-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="py-10 lg:py-16 max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-16">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. FILTERING, SEARCH & SORT CONTROL CENTER */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm shadow-slate-100">
          
          {/* Category Pills with Counters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag(null);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white border-sky-600 shadow-md shadow-sky-700/20 scale-[1.02]"
                      : "bg-white text-slate-700 hover:bg-sky-50/70 hover:text-sky-700 border border-slate-200/80 shadow-2xs"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${
                      isActive ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box & Sort Selector */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search blueprints, tech, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "views" | "likes")}
                aria-label="Sort technical articles"
                className="pl-3 pr-8 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer appearance-none shadow-2xs"
              >
                <option value="newest">🕒 Newest</option>
                <option value="views">🔥 Most Read</option>
                <option value="likes">⭐ Top Rated</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Tech-Tag Filtering Bar */}
        <div className="flex items-center gap-2 flex-wrap px-2">
          <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-sky-600" />
            <span>POPULAR TOPICS:</span>
          </span>
          {POPULAR_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-sky-50 hover:text-sky-700 border border-slate-200"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs text-rose-600 hover:underline font-bold ml-1 cursor-pointer"
            >
              Clear tag
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. FEATURED EDITORIAL SPOTLIGHT HERO */}
      {/* ------------------------------------------------------------- */}
      {isDefaultView && featuredPost && (
        <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-sky-300 shadow-xl shadow-slate-200/50 transition-all duration-300 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5 shadow-2xs">
                  <Flame className="w-4 h-4 text-sky-600 animate-pulse" />
                  <span>FEATURED ARCHITECTURAL BLUEPRINT</span>
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{featuredPost.readTime}</span>
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{featuredPost.views.toLocaleString()} reads</span>
                </span>
              </div>

              <Link href={`/blog/${featuredPost.slug}`} className="block group-hover:text-sky-700 transition-colors">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {featuredPost.title}
                </h2>
              </Link>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                {featuredPost.excerpt}
              </p>

              {/* Tag Chips */}
              <div className="flex flex-wrap gap-2">
                {featuredPost.tags.slice(0, 4).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Author and Call to Action */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                    }}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-sky-200 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{featuredPost.author.name}</span>
                      <ShieldCheck className="w-4 h-4 text-sky-600" />
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{featuredPost.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="btn-futuristic-primary !py-3 !px-6 text-xs sm:text-sm flex items-center gap-2 !rounded-2xl font-bold shadow-md shadow-sky-500/20"
                >
                  <span>Read Full Paper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Cover Image */}
            <div className="lg:col-span-5 relative h-72 sm:h-84 lg:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-inner">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 flex items-center gap-1.5 shadow-sm">
                  {getCategoryIcon(featuredPost.category)}
                  <span>{featuredPost.category}</span>
                </span>
                <span className="text-xs font-mono text-white/90 bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {featuredPost.publishedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. ARTICLES GRID (WITH LOAD MORE 6 AT A TIME) */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {selectedCategory === "All" ? "Engineering Blueprints & Case Studies" : `${selectedCategory} Architecture Papers`}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Production code architectures, schema migrations, and benchmarked frameworks
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            SHOWING {Math.min(displayedGridPosts.length, gridPosts.length)} OF {gridPosts.length} ARTICLES
          </span>
        </div>

        {gridPosts.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6 text-sky-600" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              {posts.length === 0 ? "Engineering Articles Coming Soon" : "No matching blueprints found"}
            </h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto font-medium">
              {posts.length === 0
                ? "Our solutions architects are currently compiling new technical deep-dives and production blueprints."
                : "We couldn't find any articles matching your search criteria. Try modifying your keywords or resetting filters."}
            </p>
            {posts.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSelectedTag(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors shadow-2xs cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedGridPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group animate-fadeIn"
                >
                  <div>
                    {/* Card Cover Image with Badge Overlay */}
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200 flex items-center gap-1.5 shadow-sm">
                          {getCategoryIcon(post.category)}
                          <span>{post.category}</span>
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-900/80 text-white backdrop-blur-sm shadow-2xs">
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 sm:p-7 space-y-3.5">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.publishedAt}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{post.views.toLocaleString()}</span>
                        </span>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                      </Link>

                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer: Tags, Author + Read Link */}
                  <div className="px-6 sm:px-7 pb-6 pt-2 space-y-4">
                    {/* Tag Chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-600 border border-slate-200/80"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                          }}
                          className="w-8 h-8 rounded-xl object-cover border border-slate-200 shadow-2xs"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-800 block leading-tight">
                            {post.author.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-mono">
                            Verified Architect
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200/70 transition-all group-hover:shadow-xs"
                      >
                        <span>Read Paper</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* VIEW NEXT 6 BLUEPRINTS PAGINATION / LOAD MORE BUTTON */}
            {/* ------------------------------------------------------------- */}
            {visibleCount < gridPosts.length ? (
              <div className="flex flex-col items-center justify-center pt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="btn-futuristic-primary !py-3.5 !px-8 text-xs sm:text-sm font-bold flex items-center gap-2.5 !rounded-2xl shadow-lg shadow-sky-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <span>View Next 6 Blueprints</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
                <p className="text-xs font-mono font-bold text-slate-500">
                  Showing {displayedGridPosts.length} of {gridPosts.length} available technical articles
                </p>
              </div>
            ) : gridPosts.length > 6 ? (
              <div className="text-center pt-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>All {gridPosts.length} Technical Blueprints Loaded</span>
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. TECH ARCHITECTURE STACKS WE SPECIALIZE IN */}
      {/* ------------------------------------------------------------- */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              <span>CORE ARCHITECTURAL DOMAINS</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore Our Deep Engineering Specializations
            </h3>
          </div>
          <Link
            href="/services"
            className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
          >
            <span>View All Engineering Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Multi-Tenant SaaS",
              desc: "PostgreSQL RLS, schema shards, sub-35ms query latency, and Stripe Billing webhooks.",
              tag: "SaaS Architecture"
            },
            {
              title: "Healthcare HMIS",
              desc: "HL7 FHIR v4, DICOM PACS medical imaging, automated LIS analyzers, and HIPAA vaults.",
              tag: "Healthcare HMIS"
            },
            {
              title: "Core Banking & FinTech",
              desc: "Double-entry general ledgers, sub-second payment gateways, and PCI-DSS compliance.",
              tag: "Fintech"
            },
            {
              title: "Enterprise ERP & Supply Chain",
              desc: "Multi-warehouse real-time sync, automated purchase orders, and GPS telemetry.",
              tag: "Enterprise ERP"
            }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTag(item.tag)}
              className="text-left p-5 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-700">0{idx + 1} // DOMAIN</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. ENGINEERING DISPATCH NEWSLETTER BOX - HIGH CONVERTING LIGHT */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50/90 border border-sky-200/90 p-8 sm:p-14 text-slate-900 relative overflow-hidden shadow-xl shadow-sky-950/5">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 shadow-2xs inline-block">
            BI-WEEKLY ARCHITECTURE BRIEFING // JOIN 14,000+ ENGINEERS
          </span>
          
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Get Technical Blueprints <br className="hidden sm:inline" />
            <span className="gradient-text font-extrabold">Straight to Your Inbox</span>
          </h3>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Deep-dive case studies on high-concurrency SaaS, HL7 hospital integrations, core banking ledgers, and zero-downtime Kubernetes architectures. No marketing fluff—100% production code, benchmarks, and architecture diagrams.
          </p>

          <div className="space-y-3">
            <form
              onSubmit={handleSubscribeNewsletter}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your corporate email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 shadow-sm font-medium"
              />
              <button
                type="submit"
                disabled={newsletterBusy}
                className="px-7 py-3.5 rounded-2xl btn-futuristic-primary text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/20 cursor-pointer whitespace-nowrap !rounded-2xl disabled:opacity-60"
              >
                <span>{newsletterBusy ? "Subscribing..." : "Subscribe Free"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            {newsletterError && (
              <p role="alert" className="text-xs font-medium text-red-600">
                {newsletterError}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Technical Rigor</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Spam Guarantee</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>1-Click Unsubscribe</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
