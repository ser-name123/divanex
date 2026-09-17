"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw, ScrollText, Search, ShieldAlert } from "lucide-react";

/**
 * The audit trail.
 *
 * The console already had a log screen, but it showed free text written for a
 * person to skim: there was no way to ask who changed the pricing last Tuesday.
 * These rows are structured, so the filters here are queries rather than a
 * search across a sentence — and each row carries the before and after of what
 * changed, which is the part nobody can reconstruct afterwards.
 */

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
  actorRole: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  targetLabel: string | null;
  outcome: string;
  ipAddress: string | null;
  detail: string | null;
  changes: FieldChange[];
}

const PAGE_SIZE = 50;

/** `admin.user.role_changed` reads better as "Role changed". */
function actionLabel(action: string): string {
  const tail = action.split(".").slice(1).join(" ").replace(/_/g, " ");
  const text = tail || action;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function actionGroup(action: string): string {
  return action.split(".")[0];
}

const GROUP_STYLES: Record<string, string> = {
  admin: "bg-blue-950 text-white",
  content: "bg-sky-100 text-sky-800",
  settings: "bg-emerald-100 text-emerald-800",
  project: "bg-amber-100 text-amber-900",
  cache: "bg-slate-200 text-slate-700",
};

function shortValue(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value || '""';
  return JSON.stringify(value);
}

function when(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AdminAuditView() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    actor: "",
    action: "",
    outcome: "",
    from: "",
    to: "",
    search: "",
  });

  /** Everything the query string needs, in one place, so export cannot drift. */
  const buildParams = useCallback(
    (extra?: Record<string, string>) => {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value) params.set(key, key === "to" ? `${value}T23:59:59.999Z` : value);
      }
      for (const [key, value] of Object.entries(extra || {})) params.set(key, value);
      return params;
    },
    [filters]
  );

  useEffect(() => {
    let active = true;
    const params = buildParams({ limit: String(PAGE_SIZE), offset: String(offset) });

    (async () => {
      try {
        const res = await fetch(`/api/audit?${params.toString()}`);
        const json = await res.json();
        if (!active) return;
        if (json?.success) {
          setEvents(json.events || []);
          setTotal(json.total || 0);
          setActions(json.actions || []);
        }
      } catch {
        // The empty state below already says there is nothing to show.
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [buildParams, offset]);

  const setFilter = (key: keyof typeof filters, value: string) => {
    setOffset(0);
    setLoading(true);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  /**
   * Exports the filtered rows, not the whole table.
   *
   * The server renders the CSV from the same query the screen is showing, so
   * the file and the view can never disagree about what they contain.
   */
  const exportCsv = () => {
    // A real anchor click rather than a navigation: this is a file download,
    // not a route change, and the router would try to treat it as one.
    const link = document.createElement("a");
    link.href = `/api/audit?${buildParams({ format: "csv" }).toString()}`;
    link.download = `audit-trail-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const shown = offset + events.length;

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ScrollText className="w-4.5 h-4.5 text-sky-600" />
            Audit trail
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {loading ? "Loading…" : `${total} recorded event${total === 1 ? "" : "s"}.`} Every
            sign-in, every change, and what it changed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setOffset(0);
              setFilters((f) => ({ ...f }));
            }}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={total === 0}
            className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            placeholder="Search target or detail…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
          />
        </div>

        <input
          type="search"
          value={filters.actor}
          onChange={(e) => setFilter("actor", e.target.value)}
          placeholder="Who (email)…"
          className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
        />

        <select
          value={filters.action}
          onChange={(e) => setFilter("action", e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
        >
          <option value="">Every action</option>
          {actions.map((action) => (
            <option key={action} value={action}>
              {actionLabel(action)}
            </option>
          ))}
        </select>

        <select
          value={filters.outcome}
          onChange={(e) => setFilter("outcome", e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
        >
          <option value="">Any outcome</option>
          <option value="success">Succeeded</option>
          <option value="failure">Failed</option>
        </select>

        <label className="flex items-center gap-2 text-[11px] text-slate-500">
          From
          <input
            type="date"
            value={filters.from}
            onChange={(e) => setFilter("from", e.target.value)}
            className="flex-1 px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2 text-[11px] text-slate-500">
          To
          <input
            type="date"
            value={filters.to}
            onChange={(e) => setFilter("to", e.target.value)}
            className="flex-1 px-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {!loading && events.length === 0 && (
          <p className="p-6 text-xs text-slate-500 text-center">
            Nothing matches those filters yet.
          </p>
        )}

        {events.map((event) => {
          const group = actionGroup(event.action);
          const failed = event.outcome === "failure";

          return (
            <article
              key={event.id}
              className={`p-4 border-b border-slate-100 last:border-b-0 ${failed ? "bg-red-50/40" : ""}`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide ${
                    GROUP_STYLES[group] || "bg-slate-100 text-slate-700"
                  }`}
                >
                  {actionLabel(event.action)}
                </span>

                {failed && (
                  <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-700 text-[10px] font-semibold uppercase inline-flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    failed
                  </span>
                )}

                <span className="text-xs font-semibold text-slate-900">
                  {event.actorName || event.actorEmail || "unknown"}
                </span>
                {event.actorRole && (
                  <span className="text-[10px] text-slate-400 uppercase">{event.actorRole}</span>
                )}

                <span className="ml-auto text-[11px] text-slate-400 tabular-nums">
                  {when(event.at)}
                </span>
              </div>

              {(event.targetLabel || event.detail) && (
                <p className="mt-1.5 text-xs text-slate-600">
                  {event.targetLabel && (
                    <span className="font-medium text-slate-800">{event.targetLabel}</span>
                  )}
                  {event.targetLabel && event.detail ? " — " : ""}
                  {event.detail}
                </p>
              )}

              {event.changes.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {event.changes.map((change, index) => (
                    <li
                      key={`${event.id}-${change.field}-${index}`}
                      className="text-[11px] font-mono bg-slate-50 rounded-lg px-2.5 py-1.5 border border-slate-100"
                    >
                      <span className="text-slate-500">{change.field}</span>
                      <span className="block text-red-700 break-words">
                        − {shortValue(change.before)}
                      </span>
                      <span className="block text-emerald-700 break-words">
                        + {shortValue(change.after)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {event.ipAddress && (
                <p className="mt-1.5 text-[10px] text-slate-400">from {event.ipAddress}</p>
              )}
            </article>
          );
        })}
      </div>

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            Showing {offset + 1}–{shown} of {total}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={offset === 0 || loading}
              onClick={() => {
                setLoading(true);
                setOffset(Math.max(offset - PAGE_SIZE, 0));
              }}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] disabled:opacity-40 cursor-pointer"
            >
              Newer
            </button>
            <button
              type="button"
              disabled={shown >= total || loading}
              onClick={() => {
                setLoading(true);
                setOffset(offset + PAGE_SIZE);
              }}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] disabled:opacity-40 cursor-pointer"
            >
              Older
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
