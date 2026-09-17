"use client";

import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Bot,
  ExternalLink,
  Lock,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import {
  AI_CRAWLERS,
  ALWAYS_DISALLOWED,
  normaliseRobotsPath,
  normaliseUserAgent,
  type RobotsAgentRule,
  type RobotsSettings,
} from "@/data/robotsSettings";

/**
 * robots.txt control.
 *
 * The preview is the file, rendered from the same rules the route returns, so
 * an operator can see the effect of a change before saving it rather than
 * saving and then reading the live URL.
 */

interface Payload {
  settings: RobotsSettings;
  preview: string;
  siteUrl: string;
  discouraged: boolean;
  legacyDisallow: string[];
}

/** A comma or newline separated list, which is how people type these. */
function parseList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminRobotsView({ canEdit }: { canEdit: boolean }) {
  const [data, setData] = useState<Payload | null>(null);
  const [settings, setSettings] = useState<RobotsSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [notice, setNotice] = useState<{ text: string; bad?: boolean } | null>(null);

  // Held as text while typing, so a half-typed path is not parsed into a rule.
  const [disallowText, setDisallowText] = useState("");
  const [allowText, setAllowText] = useState("");

  const announce = (text: string, bad = false) => {
    setNotice({ text, bad });
    setTimeout(() => setNotice(null), 6000);
  };

  const apply = (payload: Payload) => {
    setData(payload);
    setSettings(payload.settings);
    setDisallowText((payload.settings.disallow || []).join("\n"));
    setAllowText((payload.settings.allow || []).join("\n"));
    setDirty(false);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/robots");
        const json = await res.json();
        if (active && json?.success) apply(json);
      } catch {
        if (active) announce("Could not reach the server.", true);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const reload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/robots");
      const json = await res.json();
      if (json?.success) apply(json);
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setLoading(false);
    }
  };

  const patch = (next: RobotsSettings) => {
    setSettings(next);
    setDirty(true);
  };

  /** Saves through the shared content route, so the write is audited. */
  const save = async () => {
    if (!settings) return;
    setSaving(true);

    const payload: RobotsSettings = {
      ...settings,
      disallow: parseList(disallowText).map(normaliseRobotsPath),
      allow: parseList(allowText).map(normaliseRobotsPath),
      rules: settings.rules
        .map((rule) => ({ ...rule, userAgent: normaliseUserAgent(rule.userAgent) }))
        .filter((rule) => rule.userAgent),
    };

    try {
      const res = await fetch("/api/content/robots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload }),
      });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not save.", true);
        return;
      }
      announce("Saved. robots.txt rebuilds on its next request.");
      await reload();
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setSaving(false);
    }
  };

  const addRule = () => {
    if (!settings) return;
    const rule: RobotsAgentRule = {
      id: `ua-${Date.now()}`,
      userAgent: "",
      allow: [],
      disallow: ["/"],
    };
    patch({ ...settings, rules: [...settings.rules, rule] });
  };

  const updateRule = (id: string, next: Partial<RobotsAgentRule>) => {
    if (!settings) return;
    patch({
      ...settings,
      rules: settings.rules.map((rule) => (rule.id === id ? { ...rule, ...next } : rule)),
    });
  };

  const removeRule = (id: string) => {
    if (!settings) return;
    patch({ ...settings, rules: settings.rules.filter((rule) => rule.id !== id) });
  };

  if (loading || !settings || !data) {
    return <p className="text-xs text-slate-500">Loading robots.txt…</p>;
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 disabled:opacity-50";

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-4.5 h-4.5 text-sky-600" />
            Robots
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            What crawlers are asked to do. It is a request, not a lock — it keeps well-behaved
            crawlers out of a path, it does not protect one.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View live
          </a>
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {canEdit && (
            <button
              type="button"
              onClick={save}
              disabled={!dirty || saving}
              className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all disabled:opacity-40 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : dirty ? "Save changes" : "Saved"}
            </button>
          )}
        </div>
      </header>

      {notice && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold ${
            notice.bad
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-sky-50 border-sky-200 text-sky-800"
          }`}
        >
          {notice.text}
        </div>
      )}

      {data.discouraged && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Everything below is being ignored.</strong> &ldquo;Discourage search
            engines&rdquo; is on in Search &amp; metadata, so robots.txt currently refuses the
            whole site to every crawler.
          </span>
        </div>
      )}

      {!canEdit && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          You can see the file, but your role cannot change it.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">Block AI crawlers</p>
                <p className="text-[11px] text-slate-500">
                  Refuses the {AI_CRAWLERS.length} agents that collect training data or answer
                  from your content instead of sending readers to it.
                </p>
              </div>
              <button
                type="button"
                disabled={!canEdit}
                onClick={() => patch({ ...settings, blockAiCrawlers: !settings.blockAiCrawlers })}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer disabled:opacity-50 shrink-0 ${
                  settings.blockAiCrawlers
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}
              >
                {settings.blockAiCrawlers ? "Blocked" : "Allowed"}
              </button>
            </div>
            {settings.blockAiCrawlers && (
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed">
                {AI_CRAWLERS.join(", ")}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-900">Paths kept out of every index</p>
              <p className="text-[11px] text-slate-500">
                One per line. <code>*</code> and <code>$</code> work. A trailing slash matches only
                the folder.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ALWAYS_DISALLOWED.map((path) => (
                <span
                  key={path}
                  title="Always disallowed — not editable"
                  className="px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-mono inline-flex items-center gap-1"
                >
                  <Lock className="w-2.5 h-2.5" />
                  {path}
                </span>
              ))}
              {data.legacyDisallow.map((path) => (
                <span
                  key={path}
                  title="Set in Search & metadata"
                  className="px-2 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-mono"
                >
                  {path}
                </span>
              ))}
            </div>

            <textarea
              rows={5}
              disabled={!canEdit}
              value={disallowText}
              onChange={(e) => {
                setDisallowText(e.target.value);
                setDirty(true);
              }}
              placeholder={"/drafts/\n/*.pdf$\n/search"}
              className={`${inputClass} font-mono`}
            />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-slate-900">Allowed back</p>
              <p className="text-[11px] text-slate-500">
                A more specific Allow beats a Disallow, which is how one file inside a blocked
                folder is let through.
              </p>
            </div>
            <textarea
              rows={3}
              disabled={!canEdit}
              value={allowText}
              onChange={(e) => {
                setAllowText(e.target.value);
                setDirty(true);
              }}
              placeholder="/drafts/public-preview"
              className={`${inputClass} font-mono`}
            />

            <label className="flex items-center gap-2 text-[11px] text-slate-500">
              Crawl delay (seconds)
              <input
                type="number"
                min={0}
                max={120}
                disabled={!canEdit}
                value={settings.crawlDelay ?? ""}
                onChange={(e) =>
                  patch({
                    ...settings,
                    crawlDelay: e.target.value === "" ? undefined : Number(e.target.value),
                  })
                }
                placeholder="off"
                className="w-20 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 disabled:opacity-50"
              />
              <span className="text-[10px] text-slate-400">Google ignores it; Bing honours it.</span>
            </label>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">Specific crawlers</p>
                <p className="text-[11px] text-slate-500">
                  For one agent that needs its own rules. Left empty, it is refused everything.
                </p>
              </div>
              {canEdit && (
                <button
                  type="button"
                  onClick={addRule}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              )}
            </div>

            {settings.rules.length === 0 && (
              <p className="text-[11px] text-slate-400">None. The rules above apply to everyone.</p>
            )}

            {settings.rules.map((rule) => (
              <div key={rule.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    disabled={!canEdit}
                    value={rule.userAgent}
                    onChange={(e) => updateRule(rule.id, { userAgent: e.target.value })}
                    placeholder="SemrushBot"
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-900 disabled:opacity-50"
                  />
                  {canEdit && (
                    <button
                      type="button"
                      onClick={() => removeRule(rule.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <input
                  disabled={!canEdit}
                  value={rule.disallow.join(", ")}
                  onChange={(e) => updateRule(rule.id, { disallow: parseList(e.target.value) })}
                  placeholder="Disallow: / "
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-mono text-slate-900 disabled:opacity-50"
                />
              </div>
            ))}
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-4 lg:self-start">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-900">Currently served</p>
            <span className="text-[10px] text-slate-400 font-mono">
              {data.siteUrl}/robots.txt
            </span>
          </div>
          {dirty && (
            <p className="text-[11px] text-amber-700 mb-2">
              This is the saved version. Save to see your changes here.
            </p>
          )}
          <pre className="text-[11px] font-mono text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 overflow-x-auto whitespace-pre leading-relaxed">
            {data.preview}
          </pre>
        </section>
      </div>
    </div>
  );
}
