"use client";

import Link from "next/link";
import { ChevronRight, Home, ArrowRight, Terminal } from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { accent } from "@/lib/accents";
import { usePageHeader } from "@/context/SiteContentContext";
import RichText from "@/components/RichText";

interface PageHeaderProps {
  /**
   * The route this header belongs to, e.g. "/services". Every field is read
   * from the admin-managed record for that route.
   */
  route: string;
  /**
   * Replaces a stat value wherever it appears. Used for figures the admin
   * cannot know in advance — the blog header's "{postCount}+ Guides" resolves
   * against the number of published posts at render time.
   */
  tokens?: Record<string, string | number>;
}

function fill(value: string, tokens: Record<string, string | number> | undefined): string {
  if (!tokens) return value;
  return Object.entries(tokens).reduce(
    (out, [key, replacement]) => out.split(`{${key}}`).join(String(replacement)),
    value
  );
}

/**
 * The two-column header at the top of every page except the home page.
 *
 * Every page used to pass its badge, title, description, status line and four
 * telemetry figures as literal props, which meant a copy change anywhere was a
 * code change. The page now names its route and the copy comes from the
 * database record the admin console edits.
 */
export default function PageHeader({ route, tokens }: PageHeaderProps) {
  const content = usePageHeader(route);
  const stats = content.stats ?? [];

  return (
    <section className="relative pt-24 pb-6 lg:pt-28 lg:pb-8 overflow-hidden bg-white border-b border-slate-200">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-sky-700 transition-colors py-1"
          >
            <Home className="w-3.5 h-3.5 text-sky-600" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-800 font-bold">{content.breadcrumbLabel}</span>
        </nav>

        {/* 2-Column Responsive Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Column: Title, Badge, Description, and Quick Nav Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600"></span>
              </span>
              <Icon name={content.badgeIcon} className="w-3.5 h-3.5 text-sky-600" />
              <span className="tracking-wider uppercase">{content.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight leading-[1.18]">
              <span className="block text-slate-900">{content.title}</span>
              {content.titleHighlight && (
                <span className="block gradient-text font-semibold mt-1">{content.titleHighlight}</span>
              )}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-normal">
              <RichText inline value={content.description} />
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={content.actionHref || "/contact"}
                className="btn-futuristic-primary text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
              >
                <span>{content.actionLabel || "Start a Project"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portfolio"
                className="btn-futuristic-glass text-xs sm:text-sm !py-3 !px-6 !rounded-xl font-bold"
              >
                <span>View Case Studies</span>
              </Link>
            </div>
          </div>

          {/* Right Column: High-Tech Telemetry Cockpit Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl p-6 sm:p-7 border border-slate-200 bg-slate-50 shadow-lg shadow-sky-950/5 relative overflow-hidden space-y-5">
              {/* Cockpit Card Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
                    {content.statusText}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold">
                  VERIFIED
                </span>
              </div>

              {/* 2x2 Telemetry Metric Matrix */}
              <div className="grid grid-cols-2 gap-3.5">
                {stats.map((item) => {
                  const tone = accent(item.accent);
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all space-y-1 shadow-2xs group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-slate-600">
                          {item.label}
                        </span>
                        <Icon
                          name={item.icon}
                          className={`w-4 h-4 ${tone.text} group-hover:scale-110 transition-transform`}
                        />
                      </div>
                      <div className={`text-xl sm:text-2xl font-bold font-mono ${tone.text}`}>
                        {fill(item.value, tokens)}
                      </div>
                      {item.detail && (
                        <div className="text-[10px] text-slate-500 truncate font-medium">
                          {item.detail}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-600" />
                  <span>Next Sprint:</span>
                  <span className="text-emerald-700 font-bold">Ready</span>
                </div>
                <Link
                  href="/contact"
                  className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 hover:underline"
                >
                  <span>Book Briefing</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
