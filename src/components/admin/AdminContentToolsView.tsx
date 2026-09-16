"use client";

import { useCallback, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileSearch,
  Loader2,
  Search,
  ShieldCheck,
  Upload,
  Wrench,
} from "lucide-react";
import { CONTENT_COLLECTIONS, type ContentCollection } from "@/data/siteContent";
import { stripRich } from "@/lib/richText";
import { Panel, Tabs } from "@/components/admin/fields";

/**
 * Backup, audit and search across every content collection.
 *
 * The per-collection editors each know their own record and nothing else, so
 * the questions that span them had no home: is any link pointing at a page that
 * no longer exists, is a search description over budget, where does this phrase
 * appear. This view answers those, and takes the backup an operator wants
 * before a large edit.
 */

const COLLECTIONS = Object.keys(CONTENT_COLLECTIONS) as ContentCollection[];

/** Routes the site serves that are not content records. */
const STATIC_ROUTES = new Set([
  "/",
  "/services",
  "/why-us",
  "/process",
  "/tech-stack",
  "/portfolio",
  "/testimonials",
  "/faqs",
  "/contact",
  "/security",
  "/blog",
  "/admin",
]);

interface Finding {
  severity: "error" | "warning";
  collection: string;
  where: string;
  message: string;
}

interface Hit {
  collection: string;
  path: string;
  excerpt: string;
}

/** Walks a record, calling back with every string and the path that holds it. */
function walkStrings(
  value: unknown,
  visit: (path: string, text: string) => void,
  path = ""
): void {
  if (typeof value === "string") {
    visit(path, value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => walkStrings(entry, visit, `${path}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      walkStrings(entry, visit, path ? `${path}.${key}` : key);
    }
  }
}

export default function AdminContentToolsView() {
  const [tab, setTab] = useState("backup");
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);

  const [findings, setFindings] = useState<Finding[] | null>(null);
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[] | null>(null);

  const notify = (text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 5000);
  };

  /** Reads every collection through the admin API, in parallel. */
  const loadAll = useCallback(async (): Promise<Record<string, unknown>> => {
    const entries = await Promise.all(
      COLLECTIONS.map(async (collection) => {
        const res = await fetch(`/api/content/${collection}`);
        const json = await res.json();
        return [collection, json?.data] as const;
      })
    );
    return Object.fromEntries(entries);
  }, []);

  // ------------------------------------------------------------------ backup

  const exportAll = async () => {
    setBusy("export");
    try {
      const all = await loadAll();
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `divanex-content-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      notify("Backup downloaded. Keep it somewhere you can find it again.");
    } catch {
      notify("Could not read the content. Nothing was downloaded.", false);
    } finally {
      setBusy(null);
    }
  };

  const importAll = async (file: File) => {
    setBusy("import");
    try {
      const parsed = JSON.parse(await file.text()) as Record<string, unknown>;
      const names = Object.keys(parsed).filter((name) =>
        COLLECTIONS.includes(name as ContentCollection)
      );

      if (!names.length) {
        notify("That file holds no recognised collections. Nothing was changed.", false);
        return;
      }

      if (
        !confirm(
          `Replace ${names.length} collection(s) — ${names.join(", ")} — with the contents of this file? ` +
            "The current content is overwritten and the site updates immediately."
        )
      ) {
        return;
      }

      let restored = 0;
      for (const name of names) {
        const res = await fetch(`/api/content/${name}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: parsed[name] }),
        });
        if (res.ok) restored += 1;
      }

      notify(
        restored === names.length
          ? `Restored ${restored} collection(s). Reload the other tabs to see the new content.`
          : `Restored ${restored} of ${names.length}. Check the ones that failed.`,
        restored === names.length
      );
    } catch {
      notify("That file is not valid JSON. Nothing was changed.", false);
    } finally {
      setBusy(null);
    }
  };

  // -------------------------------------------------------------- validation

  const runAudit = async () => {
    setBusy("audit");
    setFindings(null);
    try {
      const all = await loadAll();
      const found: Finding[] = [];

      // Every slug the site can serve, so a link can be checked against it.
      const known = new Set(STATIC_ROUTES);
      for (const slug of Object.keys((all["service-details"] as object) ?? {})) {
        known.add(`/services/${slug}`);
      }
      for (const slug of Object.keys((all["case-studies"] as object) ?? {})) {
        known.add(`/portfolio/${slug}`);
      }
      for (const slug of Object.keys((all["tech-details"] as object) ?? {})) {
        known.add(`/tech-stack/${slug}`);
      }

      for (const [collection, record] of Object.entries(all)) {
        walkStrings(record, (path, text) => {
          // Internal links that point nowhere.
          if (path.endsWith("href") || path.endsWith("Href")) {
            if (!text.startsWith("/")) return;
            const base = text.split(/[?#]/)[0].replace(/\/$/, "") || "/";
            if (!known.has(base)) {
              found.push({
                severity: "error",
                collection,
                where: path,
                message: `Links to ${text}, which no page serves.`,
              });
            }
            return;
          }

          // Search descriptions Google will cut off.
          if (path.endsWith("metaDescription") || path.endsWith("defaultDescription")) {
            if (text.length > 160) {
              found.push({
                severity: "warning",
                collection,
                where: path,
                message: `${text.length} characters — search results cut off around 160.`,
              });
            }
            if (stripRich(text) !== text) {
              found.push({
                severity: "warning",
                collection,
                where: path,
                message: "Contains formatting markers, which show up verbatim in the snippet.",
              });
            }
            return;
          }

          // Copy left empty where the page expects something.
          if (
            !text.trim() &&
            /(title|label|description|question|answer|name)$/i.test(path)
          ) {
            found.push({
              severity: "warning",
              collection,
              where: path,
              message: "Empty — the page renders a gap here.",
            });
          }
        });
      }

      // A catalogue card whose detail page does not exist.
      const services = (all.services as Array<{ id?: string; title?: string }>) ?? [];
      const details = (all["service-details"] as object) ?? {};
      for (const service of services) {
        if (service.id && !(service.id in details)) {
          found.push({
            severity: "error",
            collection: "services",
            where: service.id,
            message: `"${service.title ?? service.id}" links to /services/${service.id}, which has no page.`,
          });
        }
      }

      setFindings(found);
      notify(
        found.length
          ? `${found.length} thing(s) to look at.`
          : "Nothing to fix — every link resolves and no copy is missing.",
        found.length === 0
      );
    } catch {
      notify("Could not read the content to audit it.", false);
    } finally {
      setBusy(null);
    }
  };

  // ------------------------------------------------------------------ search

  const runSearch = async () => {
    const needle = query.trim().toLowerCase();
    if (!needle) return;

    setBusy("search");
    setHits(null);
    try {
      const all = await loadAll();
      const found: Hit[] = [];

      for (const [collection, record] of Object.entries(all)) {
        walkStrings(record, (path, text) => {
          const at = text.toLowerCase().indexOf(needle);
          if (at === -1) return;
          found.push({
            collection,
            path,
            excerpt: text.slice(Math.max(0, at - 40), at + needle.length + 40),
          });
        });
      }

      setHits(found);
      notify(found.length ? `${found.length} match(es).` : "No matches anywhere in the content.");
    } catch {
      notify("Could not read the content to search it.", false);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {toast && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-xs shadow-sm border ${
            toast.ok
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {toast.ok ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
          <Wrench className="w-3.5 h-3.5 text-sky-600" />
          <span>CONTENT TOOLS</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
          Backup, Audit &amp; Search
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
          The things that span every collection: take a backup before a big edit, find broken
          links and missing copy, and search every field on the site at once.
        </p>
      </div>

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "backup", label: "Backup & restore" },
          { id: "audit", label: "Content audit" },
          { id: "search", label: "Search content" },
        ]}
      />

      {tab === "backup" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Panel
            title="Download a backup"
            description="Every collection in one JSON file. Take one before a large edit — restoring it is the fastest way back."
          >
            <button
              type="button"
              onClick={exportAll}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
            >
              {busy === "export" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>Download all content</span>
            </button>
            <p className="text-[11px] text-slate-500 font-sans">
              Covers {COLLECTIONS.length} collections: {COLLECTIONS.join(", ")}.
            </p>
          </Panel>

          <Panel
            title="Restore from a backup"
            description="Replaces the collections present in the file. Anything not in the file is left alone."
          >
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-semibold transition-all cursor-pointer">
              {busy === "import" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5" />
              )}
              <span>Choose a backup file</span>
              <input
                type="file"
                accept="application/json,.json"
                className="hidden"
                disabled={busy !== null}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  // Clear the input so choosing the same file twice still fires.
                  event.target.value = "";
                  if (file) importAll(file);
                }}
              />
            </label>
            <p className="text-[11px] text-slate-500 font-sans">
              You are asked to confirm, and told which collections the file covers, before
              anything is overwritten.
            </p>
          </Panel>
        </div>
      )}

      {tab === "audit" && (
        <Panel
          title="Content audit"
          description="Checks every internal link against the pages that actually exist, flags search descriptions that will be cut off, and finds copy left empty."
          right={
            <button
              type="button"
              onClick={runAudit}
              disabled={busy !== null}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer"
            >
              {busy === "audit" ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileSearch className="w-3.5 h-3.5" />
              )}
              <span>Run audit</span>
            </button>
          }
        >
          {findings === null && (
            <p className="text-xs text-slate-500 font-sans">
              Run the audit to see what needs attention.
            </p>
          )}

          {findings?.length === 0 && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 font-sans">
              <ShieldCheck className="w-4 h-4" />
              <span>Every internal link resolves, and no expected copy is missing.</span>
            </div>
          )}

          {findings && findings.length > 0 && (
            <div className="space-y-1.5 max-h-[32rem] overflow-y-auto">
              {findings.map((finding, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-[11px] ${
                    finding.severity === "error"
                      ? "bg-rose-50 border-rose-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                >
                  <AlertTriangle
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                      finding.severity === "error" ? "text-rose-600" : "text-amber-600"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 font-sans">
                      {finding.message}
                    </div>
                    <div className="text-slate-500 truncate">
                      {finding.collection} · {finding.where}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}

      {tab === "search" && (
        <Panel
          title="Search every field"
          description="Looks inside every collection, including the nested sections of the detail pages, and tells you exactly which field holds the match."
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                placeholder="A phrase, a URL, an old product name…"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") runSearch();
                }}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
              />
            </div>
            <button
              type="button"
              onClick={runSearch}
              disabled={busy !== null || !query.trim()}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shrink-0"
            >
              {busy === "search" ? "Searching…" : "Search"}
            </button>
          </div>

          {hits && hits.length === 0 && (
            <p className="text-xs text-slate-500 font-sans">
              Nothing anywhere in the content matches that.
            </p>
          )}

          {hits && hits.length > 0 && (
            <div className="space-y-1.5 max-h-[32rem] overflow-y-auto">
              {hits.map((hit, index) => (
                <div
                  key={index}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px]"
                >
                  <div className="text-slate-500 truncate">
                    {hit.collection} · {hit.path}
                  </div>
                  <div className="text-slate-800 font-sans mt-0.5">…{hit.excerpt}…</div>
                </div>
              ))}
            </div>
          )}
        </Panel>
      )}
    </div>
  );
}
