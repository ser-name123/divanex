"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  Briefcase,
  Database,
  FileText,
  Inbox,
  Layers,
  Mail,
  MessageSquareQuote,
  RefreshCw,
  Scale,
  ScrollText,
} from "lucide-react";

/**
 * The admin overview.
 *
 * What this screen used to show was invented: a fixed revenue curve, "99.9%
 * SLA", "+14.2% MoM", a 98.8% hit ratio for a Redis cache the site does not
 * run, and ping times for three edge nodes nobody measures. All of it was
 * literal text in the markup, and all of it looked exactly like data.
 *
 * Everything here is counted on request from the content store and the
 * database. Figures that would need an integration the site does not have —
 * traffic, revenue, uptime — are not estimated, they are absent. The panel at
 * the foot of the page says so plainly, so nobody goes looking for a number
 * that was never collected.
 */

interface StatCount {
  total: number;
  published?: number;
  draft?: number;
}

interface FieldChange {
  field: string;
  before: unknown;
  after: unknown;
}

interface AuditEvent {
  id: string;
  at: string;
  actorEmail: string | null;
  actorName: string | null;
  action: string;
  targetLabel: string | null;
  outcome: string;
  changes: FieldChange[];
}

interface OverviewStats {
  content?: {
    pages: StatCount;
    services: StatCount;
    caseStudies: StatCount;
    blogPosts: StatCount;
    technologies: StatCount;
    testimonials: StatCount;
    legalPages: StatCount;
  };
  audience?: {
    subscribers?: StatCount;
    leads?: StatCount;
    leadsLast30Days?: number;
  };
  recentChanges?: AuditEvent[];
  sources: { database: boolean; databaseError?: string };
  generatedAt: string;
}

/** `content.saved` reads better as "Content saved". */
function humanAction(action: string): string {
  const words = action.replace(/^admin\./, "").split(/[._]/).filter(Boolean);
  if (words.length === 0) return action;
  const [first, ...rest] = words;
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(" ");
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "";

  const seconds = Math.round((Date.now() - then) / 1000);
  if (seconds < 60) return "just now";

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Date(iso).toLocaleDateString();
}

function StatTile({
  label,
  value,
  icon,
  note,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between pb-2.5">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
          {label}
        </span>
        <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
          {icon}
        </div>
      </div>

      <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
        {value.toLocaleString()}
      </div>

      <div className="pt-1.5 text-[11px] font-mono text-slate-500 min-h-[1.1rem]">
        {note ?? ""}
      </div>
    </div>
  );
}

export default function AdminOverviewView() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/overview", { cache: "no-store" });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      const body = await response.json();
      setStats(body.stats as OverviewStats);
    } catch {
      setError("Could not load the overview. The figures below would be guesses, so none are shown.");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const content = stats?.content;
  const audience = stats?.audience;

  const draftNote = (count: StatCount | undefined) =>
    count?.draft ? `${count.draft} not published` : count?.published !== undefined ? "all published" : undefined;

  return (
    <div className="space-y-7 animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Overview</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Counted from the content store and database when this page loaded
            {stats ? ` — ${relativeTime(stats.generatedAt)}` : ""}.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:border-sky-500 disabled:opacity-60 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-start gap-2.5"
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {stats && !stats.sources.database && (
        <div
          role="alert"
          className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-start gap-2.5"
        >
          <Database className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            The database did not answer, so subscriber and enquiry counts are
            shown as zero rather than as a real total. Content counts come from
            the store and are unaffected.
          </span>
        </div>
      )}

      {/* ---- What is on the website ---------------------------------- */}
      {/*
        A section the role may not read is left out entirely rather than drawn
        with zeros. "0 subscribers" and "you may not ask" are different facts,
        and only one of them is true.
      */}
      {content && (
      <section className="space-y-3">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          Published content
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatTile
            label="Pages"
            value={content?.pages.total ?? 0}
            icon={<FileText className="w-4 h-4" />}
            note={
              content?.pages.draft
                ? `${content.pages.draft} set to noindex`
                : "all indexable"
            }
          />
          <StatTile
            label="Services"
            value={content?.services.total ?? 0}
            icon={<Briefcase className="w-4 h-4" />}
            note="each with its own page"
          />
          <StatTile
            label="Case studies"
            value={content?.caseStudies.total ?? 0}
            icon={<Layers className="w-4 h-4" />}
            note="each with its own page"
          />
          <StatTile
            label="Blog posts"
            value={content?.blogPosts.total ?? 0}
            icon={<BookOpen className="w-4 h-4" />}
            note={draftNote(content?.blogPosts)}
          />
          <StatTile
            label="Technologies"
            value={content?.technologies.total ?? 0}
            icon={<Database className="w-4 h-4" />}
          />
          <StatTile
            label="Testimonials"
            value={content?.testimonials.total ?? 0}
            icon={<MessageSquareQuote className="w-4 h-4" />}
          />
          <StatTile
            label="Legal pages"
            value={content?.legalPages.total ?? 0}
            icon={<Scale className="w-4 h-4" />}
          />
          {audience?.subscribers && (
            <StatTile
              label="Subscribers"
              value={audience.subscribers.total}
              icon={<Mail className="w-4 h-4" />}
            />
          )}
        </div>
      </section>
      )}

      {/* ---- Enquiries ------------------------------------------------ */}
      {audience?.leads && (
        <section className="space-y-3">
          <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
            Enquiries
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatTile
              label="Total received"
              value={audience.leads.total}
              icon={<Inbox className="w-4 h-4" />}
              note="since the form went live"
            />
            <StatTile
              label="Last 30 days"
              value={audience.leadsLast30Days ?? 0}
              icon={<Inbox className="w-4 h-4" />}
            />
          </div>
        </section>
      )}

      {/* ---- Who changed what ----------------------------------------- */}
      {/*
        The audit trail, and so behind the same right as the audit screen. An
        Editor is refused it everywhere else in the console; showing it here
        because the screen is called "overview" would be the same leak with a
        friendlier name.
      */}
      {stats?.recentChanges && (
      <section className="space-y-3">
        <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
          Recent changes
        </h3>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm divide-y divide-slate-100">
          {stats.recentChanges.length === 0 && (
            <div className="p-5 text-sm text-slate-500 flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              <span>{loading ? "Loading…" : "Nothing has been changed yet."}</span>
            </div>
          )}

          {stats.recentChanges.map((event) => (
            <div key={event.id} className="p-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-sm">
              <span className="font-bold text-slate-900">{humanAction(event.action)}</span>
              {event.targetLabel && (
                <span className="text-slate-600">{event.targetLabel}</span>
              )}
              {event.changes.length > 0 && (
                <span className="text-[11px] font-mono text-slate-500">
                  {event.changes.length} field{event.changes.length === 1 ? "" : "s"}
                </span>
              )}
              {event.outcome !== "success" && (
                <span className="text-[11px] font-mono font-bold text-red-700">
                  {event.outcome}
                </span>
              )}
              <span className="ml-auto text-xs text-slate-500 font-mono whitespace-nowrap">
                {event.actorName || event.actorEmail || "unknown"} · {relativeTime(event.at)}
              </span>
            </div>
          ))}
        </div>
      </section>
      )}

      {/* ---- What is deliberately not here ---------------------------- */}
      <section className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
        <div className="font-bold text-slate-800 text-[11px] font-mono uppercase tracking-wider mb-1.5">
          Not shown here
        </div>
        <p>
          Visitor traffic, revenue, uptime and response times are not collected
          by this application, so no figure for them appears on this page. Site
          traffic lives in the Google Analytics property configured under Search
          &amp; Metadata; hosting and database health live in the Vercel and
          Supabase dashboards.
        </p>
      </section>
    </div>
  );
}
