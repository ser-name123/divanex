"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Database,
  Trash2,
  RefreshCw,
  Zap,
  ZapOff,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Save,
} from "lucide-react";

interface CacheEntry {
  tag: string;
  label: string;
  description: string;
  ttlSeconds: number;
}

interface CacheConfig {
  enabled: boolean;
  defaultTtlSeconds: number;
  ttlSeconds: Record<string, number>;
  lastPurgedAt?: string;
}

/** Lifetimes an operator actually reaches for, rather than a free-text box. */
const TTL_CHOICES = [
  { value: 60, label: "1 minute" },
  { value: 300, label: "5 minutes" },
  { value: 900, label: "15 minutes" },
  { value: 1800, label: "30 minutes" },
  { value: 3600, label: "1 hour" },
  { value: 21600, label: "6 hours" },
  { value: 86400, label: "1 day" },
  { value: 604800, label: "1 week" },
];

function describeTtl(seconds: number): string {
  const match = TTL_CHOICES.find((choice) => choice.value === seconds);
  if (match) return match.label;
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)}h`;
  return `${Math.round(seconds / 86400)}d`;
}

export default function AdminCacheView() {
  const [config, setConfig] = useState<CacheConfig | null>(null);
  const [entries, setEntries] = useState<CacheEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [pathInput, setPathInput] = useState("/");
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);

  const showToast = useCallback((text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/cache");
      const data = await res.json();
      if (data?.success) {
        setConfig(data.config);
        setEntries(data.entries);
      }
    } catch {
      showToast("Could not load cache status.", false);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    // Inline rather than calling load(): the lint rule cannot see that the
    // state updates happen after an await, and flags a direct call as a
    // synchronous setState in an effect.
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cache");
        const data = await res.json();
        if (!cancelled && data?.success) {
          setConfig(data.config);
          setEntries(data.entries);
        }
      } catch {
        if (!cancelled) showToast("Could not load cache status.", false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [showToast]);

  const applyResult = (data: { config?: CacheConfig; message?: string; error?: string }, ok: boolean) => {
    if (ok && data.config) setConfig(data.config);
    showToast(ok ? data.message || "Done." : data.error || "That did not work.", ok);
  };

  const purge = async (action: string, payload: Record<string, string> = {}, busyKey = action) => {
    setBusy(busyKey);
    try {
      const res = await fetch("/api/cache", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
      const data = await res.json();
      applyResult(data, res.ok && data.success);
    } catch {
      showToast("Could not reach the server.", false);
    } finally {
      setBusy(null);
    }
  };

  const updateConfig = async (patch: Partial<CacheConfig>, busyKey: string) => {
    setBusy(busyKey);
    try {
      const res = await fetch("/api/cache", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      applyResult(data, res.ok && data.success);
      if (res.ok && data.success) await load();
    } catch {
      showToast("Could not reach the server.", false);
    } finally {
      setBusy(null);
    }
  };

  if (loading || !config) {
    return (
      <div className="flex items-center gap-3 text-slate-500 text-sm p-10">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading cache status…
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {toast ? (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
            toast.ok ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
          }`}
        >
          {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {toast.text}
        </div>
      ) : null}

      <div>
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-600" /> Cache
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Content, settings and blog reads are served from cache instead of hitting the database on
          every page view. Saving in the admin console purges the affected entry automatically —
          these controls are for when you want to force it.
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      <section
        className={`p-6 rounded-2xl border ${
          config.enabled ? "bg-white border-slate-200" : "bg-amber-50 border-amber-300"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {config.enabled ? (
              <Zap className="w-5 h-5 text-emerald-600 mt-0.5" />
            ) : (
              <ZapOff className="w-5 h-5 text-amber-600 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-bold text-slate-900">
                Caching is {config.enabled ? "on" : "off"}
              </div>
              <p className="text-[12px] text-slate-600 mt-1 max-w-xl">
                {config.enabled
                  ? "Pages are served from cached data within each entry's lifetime."
                  : "Every request reads live from the database. Slower, but nothing can ever be stale — useful while debugging a content problem. Switch it back on when you are done."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => updateConfig({ enabled: !config.enabled }, "toggle")}
            disabled={busy === "toggle"}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50 ${
              config.enabled
                ? "bg-amber-600 text-white hover:bg-amber-700"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {busy === "toggle" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : config.enabled ? (
              <ZapOff className="w-4 h-4" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            {config.enabled ? "Disable caching" : "Enable caching"}
          </button>
        </div>

        {config.lastPurgedAt ? (
          <div className="mt-4 pt-4 border-t border-slate-200 text-[12px] text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Last cleared {new Date(config.lastPurgedAt).toLocaleString()}
          </div>
        ) : null}
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">Cached data</h3>
          <button
            type="button"
            onClick={() => purge("purge-all")}
            disabled={busy === "purge-all"}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
          >
            {busy === "purge-all" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            Clear everything
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {entries.map((entry) => (
            <div
              key={entry.tag}
              className="py-4 flex flex-wrap items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-900">{entry.label}</div>
                <p className="text-[12px] text-slate-500 mt-0.5">{entry.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <label className="sr-only" htmlFor={`ttl-${entry.tag}`}>
                  Lifetime for {entry.label}
                </label>
                <select
                  id={`ttl-${entry.tag}`}
                  value={entry.ttlSeconds}
                  onChange={(e) =>
                    updateConfig(
                      { ttlSeconds: { [entry.tag]: Number(e.target.value) } },
                      `ttl-${entry.tag}`
                    )
                  }
                  disabled={!config.enabled || busy === `ttl-${entry.tag}`}
                  className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 disabled:opacity-50"
                >
                  {TTL_CHOICES.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                  {TTL_CHOICES.every((c) => c.value !== entry.ttlSeconds) ? (
                    <option value={entry.ttlSeconds}>{describeTtl(entry.ttlSeconds)}</option>
                  ) : null}
                </select>

                <button
                  type="button"
                  onClick={() => purge("purge-tag", { tag: entry.tag }, `tag-${entry.tag}`)}
                  disabled={busy === `tag-${entry.tag}`}
                  className="px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 hover:border-sky-500 flex items-center gap-1.5 disabled:opacity-50"
                >
                  {busy === `tag-${entry.tag}` ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  Clear
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Clear a single page</h3>
        <p className="text-[12px] text-slate-500 -mt-2">
          Rebuilds one URL on its next visit. Useful after editing something that only affects one
          page, such as a blog post.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={pathInput}
            onChange={(e) => setPathInput(e.target.value)}
            placeholder="/blog/my-article"
            className="flex-1 min-w-[240px] px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
          <button
            type="button"
            onClick={() => purge("purge-path", { path: pathInput }, "path")}
            disabled={busy === "path" || !pathInput.startsWith("/")}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
          >
            {busy === "path" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            Clear page
          </button>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Default lifetime</h3>
        <p className="text-[12px] text-slate-500 -mt-2">
          Used by anything without its own setting above.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={config.defaultTtlSeconds}
            onChange={(e) =>
              setConfig({ ...config, defaultTtlSeconds: Number(e.target.value) })
            }
            className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            {TTL_CHOICES.map((choice) => (
              <option key={choice.value} value={choice.value}>
                {choice.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() =>
              updateConfig({ defaultTtlSeconds: config.defaultTtlSeconds }, "default-ttl")
            }
            disabled={busy === "default-ttl"}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
          >
            {busy === "default-ttl" ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            Save
          </button>
        </div>
      </section>
    </div>
  );
}
