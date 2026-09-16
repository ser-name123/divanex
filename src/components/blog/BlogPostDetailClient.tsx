"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";
import {
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  ArrowLeft,
  ArrowRight,
  Check,
  MessageCircle,
  Copy,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  User,
  Globe,
  ShieldCheck,
  Code2,
  Layers,
  Terminal,
  Cpu,
  ArrowUpRight,
  ExternalLink,
  Flame,
  CheckCircle,
  Database,
  FileCode,
  Tag,
  Share
} from "lucide-react";
import { renderBlogContent } from "@/lib/blogMarkdown";

interface BlogPostDetailClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostDetailClient({ post, relatedPosts }: BlogPostDetailClientProps) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasBookmarked, setHasBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");

  // Reading progress and active TOC tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Track active heading
      const headings = document.querySelectorAll("article h2, article h3");
      let currentActive = "";
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 180) {
          currentActive = heading.id;
        }
      });
      if (currentActive) setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleBookmark = () => {
    setHasBookmarked((prev) => !prev);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const shareUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const shareTitle = encodeURIComponent(post.title);

  return (
    <div className="relative selection:bg-sky-500 selection:text-white bg-[#f7f9f9]">
      {/* ------------------------------------------------------------- */}
      {/* 1. FIXED TOP READING PROGRESS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-200/80 z-50">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-150 shadow-sm shadow-sky-500/50"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 pb-24 space-y-10">
        
        {/* ------------------------------------------------------------- */}
        {/* 2. BALANCED 2-COLUMN EDITORIAL HERO CARD */}
        {/* ------------------------------------------------------------- */}
        <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-8 lg:p-10 overflow-hidden space-y-8">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-sky-400/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          {/* Top Breadcrumb & Return Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 relative z-10">
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link href="/" className="hover:text-sky-600 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/blog" className="hover:text-sky-600 transition-colors">Engineering Blog</Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-bold bg-sky-50 text-sky-800 px-2.5 py-1 rounded-lg border border-sky-200">
                {post.category}
              </span>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 bg-slate-50 hover:bg-sky-50 px-3.5 py-2 rounded-xl border border-slate-200 hover:border-sky-200 transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Blueprints</span>
            </Link>
          </div>

          {/* 2-Column Hero Grid: Left = Metadata + Title + Byline; Right = Visual Frame & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>ARCHITECTURAL CASE STUDY</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{post.readTime}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>{post.views.toLocaleString()} Reads</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                {post.title}
              </h1>

              {post.subtitle && (
                <div className="pl-4 border-l-3 border-sky-500 py-1">
                  <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
                    {post.subtitle}
                  </p>
                </div>
              )}

              {/* Author Byline & Social Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-sky-200 shadow-2xs"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{post.author.name}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200">
                        <ShieldCheck className="w-3 h-3 text-sky-600" />
                        Verified Architect
                      </span>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mt-0.5">
                      <span>{post.author.role}</span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Social Share Group */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={handleBookmark}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ${
                      hasBookmarked
                        ? "bg-amber-50 text-amber-800 border-amber-300"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                    title={hasBookmarked ? "Bookmarked!" : "Bookmark article"}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${hasBookmarked ? "fill-current text-amber-600" : ""}`} />
                    <span className="hidden sm:inline">{hasBookmarked ? "Saved" : "Save"}</span>
                  </button>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200 transition-all shadow-2xs flex items-center justify-center"
                    title="Share on X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-all shadow-2xs flex items-center justify-center"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                    </svg>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all shadow-2xs flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                    title="Copy Link to Clipboard"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 text-xs">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column (5 Cols) - Cover Image & Quick Specs Matrix */}
            <div className="lg:col-span-5 space-y-4">
              {/* Featured Cover Image Container */}
              <div className="relative h-64 sm:h-72 lg:h-[280px] w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md group bg-slate-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>FIG 1.0 // ARCHITECTURE BLUEPRINT</span>
                  </span>
                  <span className="text-sky-300 font-bold">{post.category}</span>
                </div>
              </div>

              {/* 2x2 Technical Spec Sheet Matrix */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    DOMAIN
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">{post.category}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    VERIFICATION
                  </span>
                  <p className="text-xs font-bold text-emerald-700 flex items-center gap-1 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Production Tested</span>
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    RIGOR LEVEL
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">Lead Architects & CTOs</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase block">
                    ESTIMATED TIME
                  </span>
                  <p className="text-xs font-bold text-slate-900 truncate">{post.readTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 3. 2-COLUMN ARTICLE CONTENT + STICKY SIDEBAR */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Article Body (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Executive Summary / Key Takeaways Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50/80 border border-sky-200 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Executive Summary & Architectural Takeaways</span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </div>

            {/* Markdown Body Content with Custom Styled Elements */}
            <article className="prose prose-slate prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-slate-900 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:mt-12 prose-h3:text-xl sm:prose-h3:text-2xl prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-[17px] prose-strong:text-slate-900 prose-code:bg-slate-100 prose-code:text-sky-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-pre:bg-slate-950 prose-pre:text-slate-100 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:border prose-pre:border-slate-800 prose-li:text-slate-700 font-sans">
              <div
                dangerouslySetInnerHTML={{ __html: renderBlogContent(post.content) }}
              />
            </article>

            {/* Tags Row */}
            <div className="pt-8 border-t border-slate-200 space-y-4">
              <span className="text-xs uppercase font-mono font-bold text-slate-500 block">
                TOPICS & SYSTEM PRIMITIVES
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 hover:bg-sky-50 hover:text-sky-700 transition-colors shadow-2xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interaction Bar: Likes & Share */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleLike}
                  className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer shadow-sm ${
                    hasLiked
                      ? "bg-sky-600 text-white shadow-md shadow-sky-500/20 scale-105"
                      : "bg-slate-50 text-slate-800 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
                  <span>{hasLiked ? "Helpful Blueprint!" : "Found this helpful?"}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${hasLiked ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800"}`}>
                    {likes}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Share with engineers:</span>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-white text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>

            {/* Senior Architect Bio Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-18 h-18 rounded-3xl object-cover border-2 border-sky-200 shadow-md flex-shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-lg font-extrabold text-slate-900">{post.author.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200">
                    PRINCIPAL AUTHOR
                  </span>
                </div>
                <p className="text-xs text-sky-700 font-mono font-bold">{post.author.role}</p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Part of the Divanex Principal Architecture pod specializing in high-concurrency cloud systems, distributed databases, HL7 integrations, and enterprise AI workflows.
                </p>
                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    <span>Connect directly for architectural guidance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* Table of Contents Card */}
            {post.tableOfContents && post.tableOfContents.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-600" />
                    <h3 className="text-xs uppercase font-mono font-bold text-slate-900 tracking-wider">
                      Table of Contents
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    {Math.round(readingProgress)}% read
                  </span>
                </div>

                <nav className="space-y-1.5 text-xs font-medium">
                  {post.tableOfContents.map((item) => {
                    const isActive = activeHeading === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-2 px-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-sky-50 text-sky-900 font-bold border-l-3 border-sky-600 pl-3 shadow-2xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {item.title}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Architecture Consultation Widget */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-sky-50 via-white to-blue-50/90 border border-sky-200/90 text-slate-900 space-y-4 shadow-md shadow-sky-950/5">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 shadow-2xs inline-block">
                SOLUTIONS ARCHITECTURE BRIEFING
              </span>
              <h4 className="text-lg font-extrabold leading-snug text-slate-900">
                Planning a similar system architecture?
              </h4>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                Connect directly with our solutions architects to map out schema partitioning, technology stacks, and production milestones.
              </p>
              <div className="pt-2 space-y-2.5">
                <Link
                  href="/contact"
                  className="btn-futuristic-primary w-full text-xs !py-3 flex items-center justify-center gap-2 !rounded-xl text-center font-bold shadow-md shadow-sky-500/20"
                >
                  <span>Discuss Project Scope & Cost</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="block text-center text-xs font-bold text-sky-700 hover:text-sky-900 transition-colors pt-1"
                >
                  Or Book 30-Min Engineering Call →
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. RECOMMENDED ENGINEERING READS (3 CARDS) */}
        {/* ------------------------------------------------------------- */}
        {relatedPosts.length > 0 && (
          <section className="pt-16 border-t border-slate-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Recommended Engineering Reads
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 font-medium">
                  More architectural blueprints from our solutions engineering pod
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1.5 bg-sky-50 px-3.5 py-2 rounded-xl border border-sky-200 hover:bg-sky-100 transition-colors"
              >
                <span>View All Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.slice(0, 3).map((rel) => (
                <article
                  key={rel.id}
                  className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 p-5 space-y-3.5 flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-sky-700 block uppercase">
                      {rel.category}
                    </span>
                    <Link href={`/blog/${rel.slug}`}>
                      <h4 className="text-base font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </Link>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium font-mono">{rel.readTime}</span>
                    <Link
                      href={`/blog/${rel.slug}`}
                      className="font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read Paper</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
