"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ExternalLink,
  Eye,
  EyeOff,
  Map as MapIcon,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import {
  CHANGE_FREQUENCIES,
  GROUP_LABELS,
  SITEMAP_GROUPS,
  normalisePath,
  type ChangeFrequency,
  type SitemapGroup,
  type SitemapSettings,
} from "@/data/sitemapSettings";

/**
 * Sitemap control.
 *
 * The list is not a list of things to maintain — it is what /sitemap.xml
 * currently contains, generated from the same module the route uses. An
 * operator drops a URL, changes what one claims about itself, or adds one the
 * site does not generate; everything else keeps following the site on its own.
 */

interface Decision {
  path: string;
  group: SitemapGroup;
  label: string;
  lastModified: string;
  defaultPriority: number;
  defaultChangeFrequency: ChangeFrequency;
  included: boolean;
  priority: number;
  changeFrequency: ChangeFrequency;
  reason: "group" | "rule" | null;
  overridden: boolean;
}

interface Payload {
  settings: SitemapSettings;
  entries: Decision[];
  extras: Decision[];
  baseUrl: string;
  included: number;
  total: number;
  discouraged: boolean;
}

export default function AdminSitemapView({ canEdit }: { canEdit: boolean }) {
  const [data, setData] = useState<Payload | null>(null);
  const [settings, setSettings] = useState<SitemapSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [query, setQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<SitemapGroup | "all">("all");
  const [notice, setNotice] = useState<{ text: string; bad?: boolean } | null>(null);
  const [newUrl, setNewUrl] = useState("");

  const announce = (text: string, bad = false) => {
    setNotice({ text, bad });
    setTimeout(() => setNotice(null), 6000);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/sitemap");
        const json = await res.json();
        if (active && json?.success) {
          setData(json);
          setSettings(json.settings);
        }
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
      const res = await fetch("/api/sitemap");
      const json = await res.json();
      if (json?.success) {
        setData(json);
        setSettings(json.settings);
        setDirty(false);
      }
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Saves through the shared content route, so this write is permission
   * checked and audited exactly like every other content change.
   */
  const save = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content/sitemap", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: settings }),
      });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not save.", true);
        return;
      }
      setDirty(false);
      announce("Saved. The sitemap rebuilds on its next request.");
      await reload();
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setSaving(false);
    }
  };

  const patchSettings = (next: SitemapSettings) => {
    setSettings(next);
    setDirty(true);
  };

  const setRule = (path: string, patch: Record<string, unknown>) => {
    if (!settings) return;
    const existing = settings.rules[path] || {};
    const merged = { ...existing, ...patch };

    // Drop a rule that no longer says anything, so the stored row does not
    // accumulate an entry per URL anybody ever clicked.
    const meaningful =
      merged.include === false || merged.priority !== undefined || merged.changeFrequency;

    const rules = { ...settings.rules };
    if (meaningful) rules[path] = merged;
    else delete rules[path];

    patchSettings({ ...settings, rules });
  };

  const toggleGroup = (group: SitemapGroup) => {
    if (!settings) return;
    patchSettings({
      ...settings,
      groups: { ...settings.groups, [group]: !settings.groups[group] },
    });
  };

  const addExtra = () => {
    if (!settings) return;
    const path = normalisePath(newUrl);
    if (!path || path === "/") {
      announce("Enter a path like /landing/offer.", true);
      return;
    }
    if (settings.extraUrls.some((u) => normalisePath(u.path) === path)) {
      announce("That URL is already in the list.", true);
      return;
    }
    patchSettings({
      ...settings,
      extraUrls: [...settings.extraUrls, { path, priority: 0.5, changeFrequency: "monthly" }],
    });
    setNewUrl("");
  };

  const removeExtra = (path: string) => {
    if (!settings) return;
    patchSettings({
      ...settings,
      extraUrls: settings.extraUrls.filter((u) => u.path !== path),
    });
  };

  /**
   * The list reflects unsaved edits.
   *
   * The server computed decisions from what is stored; re-applying the local
   * rules on top means a toggle shows its effect immediately rather than after
   * a save and a reload.
   */
  const rows = useMemo(() => {
    if (!data || !settings) return [];
    const term = query.trim().toLowerCase();

    return data.entries
      .map((entry) => {
        const rule = settings.rules[entry.path];
        const groupOn = settings.groups[entry.group] !== false;
        const ruleExcludes = rule?.include === false;
        return {
          ...entry,
          included: groupOn && !ruleExcludes,
          priority: rule?.priority ?? entry.defaultPriority,
          changeFrequency: rule?.changeFrequency ?? entry.defaultChangeFrequency,
          reason: ruleExcludes ? ("rule" as const) : !groupOn ? ("group" as const) : null,
          overridden: Boolean(
            rule && (rule.include === false || rule.priority !== undefined || rule.changeFrequency)
          ),
        };
      })
      .filter((entry) => groupFilter === "all" || entry.group === groupFilter)
      .filter(
        (entry) =>
          !term ||
          entry.path.toLowerCase().includes(term) ||
          entry.label.toLowerCase().includes(term)
      );
  }, [data, settings, query, groupFilter]);

  const liveCount = useMemo(() => {
    if (!data || !settings) return 0;
    const generated = data.entries.filter((entry) => {
      const rule = settings.rules[entry.path];
      return settings.groups[entry.group] !== false && rule?.include !== false;
    }).length;
    return generated + settings.extraUrls.length;
  }, [data, settings]);

  if (loading || !settings || !data) {
    return <p className="text-xs text-slate-500">Loading the sitemap…</p>;
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapIcon className="w-4.5 h-4.5 text-sky-600" />
            Sitemap
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {liveCount} URL{liveCount === 1 ? "" : "s"} of {data.total} generated. New pages join on
            their own — this is for the exceptions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View XML
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
            <strong>The sitemap is empty right now.</strong> &ldquo;Discourage search
            engines&rdquo; is on in Search &amp; metadata, which empties it whatever is set here.
          </span>
        </div>
      )}

      {!canEdit && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          You can see the sitemap, but your role cannot change it.
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-900">Serve a sitemap</p>
            <p className="text-[11px] text-slate-500">
              Off means /sitemap.xml returns an empty document.
            </p>
          </div>
          <button
            type="button"
            disabled={!canEdit}
            onClick={() => patchSettings({ ...settings, enabled: !settings.enabled })}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer disabled:opacity-50 ${
              settings.enabled
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-slate-100 border-slate-200 text-slate-500"
            }`}
          >
            {settings.enabled ? "On" : "Off"}
          </button>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Sections
          </p>
          <div className="flex flex-wrap gap-2">
            {SITEMAP_GROUPS.map((group) => {
              const on = settings.groups[group] !== false;
              const count = data.entries.filter((e) => e.group === group).length;
              return (
                <button
                  key={group}
                  type="button"
                  disabled={!canEdit}
                  onClick={() => toggleGroup(group)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5 ${
                    on
                      ? "bg-white border-slate-300 text-slate-800"
                      : "bg-slate-100 border-slate-200 text-slate-400 line-through"
                  }`}
                >
                  {on ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {GROUP_LABELS[group]}
                  <span className="text-slate-400">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search a URL or page name…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
          />
        </div>
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value as SitemapGroup | "all")}
          className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
        >
          <option value="all">Every section</option>
          {SITEMAP_GROUPS.map((group) => (
            <option key={group} value={group}>
              {GROUP_LABELS[group]}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {rows.length === 0 && (
          <p className="p-6 text-xs text-slate-500 text-center">Nothing matches that search.</p>
        )}

        {rows.map((entry) => (
          <div
            key={entry.path}
            className={`p-3.5 border-b border-slate-100 last:border-b-0 flex flex-wrap items-center gap-3 ${
              entry.included ? "" : "bg-slate-50/70"
            }`}
          >
            <button
              type="button"
              disabled={!canEdit || entry.reason === "group"}
              title={
                entry.reason === "group"
                  ? "Its whole section is switched off"
                  : entry.included
                    ? "Remove from the sitemap"
                    : "Put back in the sitemap"
              }
              onClick={() => setRule(entry.path, { include: entry.included ? false : undefined })}
              className={`p-2 rounded-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                entry.included
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "bg-slate-200 text-slate-500 hover:bg-slate-300"
              }`}
            >
              {entry.included ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>

            <div className="flex-1 min-w-[200px]">
              <p
                className={`text-xs font-semibold ${
                  entry.included ? "text-slate-900" : "text-slate-400 line-through"
                }`}
              >
                {entry.label}
              </p>
              <p className="text-[11px] text-slate-500 font-mono break-all">{entry.path}</p>
              {entry.reason === "group" && (
                <p className="text-[10px] text-amber-700 mt-0.5">
                  Hidden because {GROUP_LABELS[entry.group]} is off.
                </p>
              )}
            </div>

            <label className="flex items-center gap-1.5 text-[10px] text-slate-500">
              Priority
              <input
                type="number"
                min={0}
                max={1}
                step={0.1}
                disabled={!canEdit}
                value={entry.priority}
                onChange={(e) =>
                  setRule(entry.path, {
                    priority:
                      e.target.value === "" ? undefined : Math.min(Number(e.target.value), 1),
                  })
                }
                className="w-16 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 disabled:opacity-50"
              />
            </label>

            <select
              disabled={!canEdit}
              value={entry.changeFrequency}
              onChange={(e) => setRule(entry.path, { changeFrequency: e.target.value })}
              className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer disabled:opacity-50"
            >
              {CHANGE_FREQUENCIES.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>

            {entry.overridden && (
              <span className="px-2 py-0.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-[10px] font-semibold">
                edited
              </span>
            )}
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Extra URLs</p>
          <p className="text-[11px] text-slate-500">
            For pages this site does not generate. They are listed exactly as typed, so a URL that
            404s will be submitted as one.
          </p>
        </div>

        {settings.extraUrls.length > 0 && (
          <div className="space-y-2">
            {settings.extraUrls.map((extra) => (
              <div key={extra.path} className="flex flex-wrap items-center gap-2">
                <span className="flex-1 min-w-[180px] text-[11px] font-mono text-slate-700 break-all">
                  {extra.path}
                </span>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.1}
                  disabled={!canEdit}
                  value={extra.priority}
                  onChange={(e) =>
                    patchSettings({
                      ...settings,
                      extraUrls: settings.extraUrls.map((u) =>
                        u.path === extra.path
                          ? { ...u, priority: Math.min(Number(e.target.value) || 0, 1) }
                          : u
                      ),
                    })
                  }
                  className="w-16 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 disabled:opacity-50"
                />
                <select
                  disabled={!canEdit}
                  value={extra.changeFrequency}
                  onChange={(e) =>
                    patchSettings({
                      ...settings,
                      extraUrls: settings.extraUrls.map((u) =>
                        u.path === extra.path
                          ? { ...u, changeFrequency: e.target.value as ChangeFrequency }
                          : u
                      ),
                    })
                  }
                  className="px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-900 cursor-pointer disabled:opacity-50"
                >
                  {CHANGE_FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                      {freq}
                    </option>
                  ))}
                </select>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => removeExtra(extra.path)}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {canEdit && (
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addExtra();
                }
              }}
              placeholder="/landing/offer"
              className="flex-1 min-w-[200px] px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
            />
            <button
              type="button"
              onClick={addExtra}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
