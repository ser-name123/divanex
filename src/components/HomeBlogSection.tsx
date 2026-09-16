"use client";

import Link from "next/link";
import { initialBlogPosts, type BlogPost } from "@/data/blogData";
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Eye,
  ThumbsUp,
  Tag,
  FileCode2,
  Terminal,
  ShieldCheck
} from "lucide-react";

/**
 * The three most recent posts on the home page.
 *
 * They come from the page above, which reads the blog store, rather than from
 * the seed array this used to slice — posts published from the admin console
 * never appeared here.
 */
export default function HomeBlogSection({ posts: incoming }: { posts?: BlogPost[] }) {
  const posts = (incoming && incoming.length > 0 ? incoming : initialBlogPosts).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 relative overflow-hidden bg-slate-50/60 border-t border-slate-200/80 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-4 sm:pb-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono font-bold text-sky-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
              <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              <span>FROM THE WORKBENCH // WRITING</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Notes From Problems <span className="gradient-text">We Had to Solve</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Write-ups from real projects — multi-tenant database design, hospital data standards, keeping a financial ledger honest, getting AI agents to behave. Written by the people who did the work.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/blog"
              className="btn-futuristic-primary !py-3 !px-6 text-xs sm:text-sm font-bold flex items-center gap-2 !rounded-2xl shadow-sm hover:shadow-md transition-all group"
            >
              <span>View All 10+ Articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3-Column Engineering Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="block relative h-52 sm:h-56 overflow-hidden bg-slate-100"
                >
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white/95 backdrop-blur-md text-sky-900 border border-slate-200/80 shadow-2xs">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-slate-900/80 backdrop-blur-md text-slate-100 flex items-center gap-1 shadow-2xs">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </Link>

                {/* Body Content */}
                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Eye className="w-3.5 h-3.5 text-sky-500" />
                      {post.views.toLocaleString()} reads
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`} className="block group-hover:text-sky-700 transition-colors">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author & Read Paper Footer */}
              <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                    }}
                    className="w-9 h-9 rounded-full object-cover border border-sky-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{post.author.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{post.author.role}</p>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 transition-all flex items-center gap-1.5 shrink-0 group/link"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner with View All Navigation CTA - High-Tech Light Theme */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-sky-50 via-white to-blue-50/90 border border-sky-200/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-sky-950/5 relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-sky-100/90 text-sky-800 text-[11px] font-mono font-bold border border-sky-200/80 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>CONTINUOUS ENGINEERING EXCELLENCE</span>
            </div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Looking for tailored <span className="gradient-text">architecture blueprints?</span>
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed font-medium">
              Explore our full repository of 10+ deep technical case studies or schedule a 1-on-1 architecture review with our principal solutions engineers.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 relative z-10">
            <Link
              href="/blog"
              className="btn-futuristic-primary !py-3.5 !px-6 text-xs sm:text-sm font-bold flex items-center gap-2 !rounded-xl shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All 10+ Articles</span>
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-sky-700 border border-slate-200 font-bold text-xs sm:text-sm transition-all shadow-2xs flex items-center gap-1.5"
            >
              <span>Start a Project →</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
