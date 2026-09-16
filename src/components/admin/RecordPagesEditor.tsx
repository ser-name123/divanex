"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Copy, Plus, Search, Trash2 } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import type { ContentCollection, ContentShapes } from "@/data/siteContent";
import {
  Field,
  JsonEditor,
  Panel,
  PlainField,
  RichField,
  SaveBar,
  TextInput,
  slugify,
} from "@/components/admin/fields";

/**
 * Editor for a collection of slug-keyed detail pages.
 *
 * Service pages, case studies and technology pages are the same problem three
 * times: a record keyed by slug, each entry a handful of headline fields plus
 * several deeply nested sections. This renders the headline fields as proper
 * inputs and each nested section as its own JSON block.
 *
 * The nested sections are JSON on purpose. A generated form for, say, a
 * benchmark table five levels deep is harder to work with than the data, and
 * splitting the JSON per section means an operator edits one list at a time and
 * a syntax error in the FAQs cannot take the pricing tiers down with it. The
 * editor refuses to stage anything that does not parse, so a half-typed edit
 * can never be saved.
 */

export interface FieldSpec {
  key: string;
  label: string;
  hint?: string;
  /**
   * How the value is edited.
   *
   *  - "line" (the default) is a single-line input.
   *  - "rich" is the prose editor, for copy the site renders as formatted text.
   *  - "plain" is a plain multi-line box, for values that must stay literal — a
   *    search description ends up inside a <meta> tag, where markdown syntax
   *    would show up verbatim in the Google snippet.
   */
  kind?: "line" | "rich" | "plain";
  /** Character budget, shown as a counter. */
  limit?: number;
}

export interface SectionSpec {
  key: string;
  label: string;
  hint?: string;
  rows?: number;
}

type Entry = Record<string, unknown>;

export default function RecordPagesEditor<K extends ContentCollection>({
  collection,
  seed,
  badge,
  title,
  description,
  labelOf,
  makeEntry,
  fields,
  sections,
  previewPath,
}: {
  collection: K;
  seed: ContentShapes[K];
  badge: string;
  title: string;
  description: string;
  /** The name shown in the list for one entry. */
  labelOf: (entry: Entry) => string;
  /** A blank entry for a new slug. */
  makeEntry: (slug: string) => Entry;
  /** Headline fields, rendered as inputs. */
  fields: FieldSpec[];
  /** Nested blocks, each edited as its own JSON document. */
  sections: SectionSpec[];
  /** Live URL prefix, e.g. "/services/". */
  previewPath: string;
}) {
  const {
    data,
    setData,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent(collection, seed);

  const record = useMemo(
    () => (data ?? {}) as unknown as Record<string, Entry>,
    [data]
  );
  const slugs = useMemo(() => Object.keys(record).sort(), [record]);

  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);
  const [toast, setToast] = useState<string | null>(null);

  const activeSlug = selected && record[selected] ? selected : slugs[0] ?? null;
  const entry = activeSlug ? record[activeSlug] : null;

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const writeRecord = (next: Record<string, Entry>) => {
    setData(next as unknown as ContentShapes[K]);
    setDirty(true);
  };

  const updateEntry = (patch: Entry) => {
    if (!activeSlug) return;
    writeRecord({ ...record, [activeSlug]: { ...record[activeSlug], ...patch } });
  };

  const addEntry = () => {
    const name = prompt("New page slug (letters, numbers and hyphens):");
    if (!name) return;
    const slug = slugify(name);
    if (!slug) {
      notify("That slug was empty after cleaning. Nothing was added.");
      return;
    }
    if (record[slug]) {
      notify(`"${slug}" already exists. Open it from the list instead.`);
      return;
    }
    writeRecord({ ...record, [slug]: makeEntry(slug) });
    setSelected(slug);
  };

  const duplicateEntry = () => {
    if (!activeSlug) return;
    const name = prompt("Slug for the copy:", `${activeSlug}-copy`);
    if (!name) return;
    const slug = slugify(name);
    if (!slug || record[slug]) {
      notify(record[slug] ? `"${slug}" already exists.` : "That slug was empty.");
      return;
    }
    writeRecord({ ...record, [slug]: { ...record[activeSlug], slug } });
    setSelected(slug);
  };

  const removeEntry = () => {
    if (!activeSlug) return;
    if (
      !confirm(
        `Delete "${activeSlug}"? The live page at ${previewPath}${activeSlug} will start returning 404.`
      )
    ) {
      return;
    }
    const next = { ...record };
    delete next[activeSlug];
    writeRecord(next);
    setSelected(null);
  };

  const handleSave = async () => {
    const ok = await save(data);
    setDirty(!ok);
    notify(ok ? "Saved and published." : "Could not save. Nothing was published.");
  };

  const handleReset = async () => {
    if (!confirm("Restore the built-in pages? Every page you added or edited here is lost."))
      return;
    const ok = await reset();
    setDirty(false);
    setSelected(null);
    notify(ok ? "Restored to the built-in pages." : "Could not reset.");
  };

  const visible = slugs.filter((slug) => {
    if (!query.trim()) return true;
    const needle = query.toLowerCase();
    return (
      slug.toLowerCase().includes(needle) ||
      labelOf(record[slug]).toLowerCase().includes(needle)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {toast && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">{description}</p>
        </div>

        <SaveBar
          onSave={handleSave}
          onReset={handleReset}
          saving={saving}
          loading={loading}
          dirty={dirty}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Page list */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              placeholder="Search pages"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
            />
          </div>

          <button
            type="button"
            onClick={addEntry}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-[11px] font-semibold transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New page</span>
          </button>

          <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 max-h-[32rem] overflow-y-auto">
            {visible.length === 0 && (
              <p className="p-3 text-[11px] text-slate-400 font-sans">No pages match.</p>
            )}
            {visible.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => setSelected(slug)}
                className={`w-full text-left px-3 py-2.5 transition-colors cursor-pointer ${
                  activeSlug === slug ? "bg-sky-50" : "hover:bg-slate-50"
                }`}
              >
                <span
                  className={`block text-xs font-semibold truncate ${
                    activeSlug === slug ? "text-sky-800" : "text-slate-800"
                  }`}
                >
                  {labelOf(record[slug])}
                </span>
                <span className="block text-[10px] text-slate-400 truncate">
                  {previewPath}
                  {slug}
                </span>
              </button>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
            {slugs.length} pages. A page added here is live immediately and is prerendered
            on the next deploy.
          </p>
        </aside>

        {/* Editor */}
        <div className="lg:col-span-9 space-y-6">
          {!entry && (
            <p className="text-xs text-slate-500 font-sans">
              No pages yet. Add one to get started.
            </p>
          )}

          {entry && activeSlug && (
            <>
              <Panel
                title={`${labelOf(entry)}`}
                description={`Live at ${previewPath}${activeSlug}`}
                right={
                  <div className="flex items-center gap-2">
                    <a
                      href={`${previewPath}${activeSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all"
                    >
                      View live
                    </a>
                    <button
                      type="button"
                      onClick={duplicateEntry}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>
                    <button
                      type="button"
                      onClick={removeEntry}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-[11px] font-semibold transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fields.map((spec) => {
                    const kind = spec.kind ?? "line";
                    const value =
                      typeof entry[spec.key] === "string" ? (entry[spec.key] as string) : "";

                    const input =
                      kind === "rich" ? (
                        <RichField
                          value={value}
                          rows={3}
                          inline
                          limit={spec.limit}
                          onChange={(next) => updateEntry({ [spec.key]: next })}
                        />
                      ) : kind === "plain" ? (
                        <PlainField
                          value={value}
                          limit={spec.limit}
                          onChange={(next) => updateEntry({ [spec.key]: next })}
                        />
                      ) : (
                        <TextInput
                          value={value}
                          onChange={(next) => updateEntry({ [spec.key]: next })}
                        />
                      );

                    return (
                      <div key={spec.key} className={kind === "line" ? "" : "sm:col-span-2"}>
                        <Field label={spec.label} hint={spec.hint}>
                          {input}
                        </Field>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              {sections.map((spec) => (
                <Panel key={`${activeSlug}-${spec.key}`} title={spec.label} description={spec.hint}>
                  <JsonEditor
                    // Keyed by page so switching pages reloads the editor rather
                    // than leaving the previous page's text in the box.
                    key={`${activeSlug}-${spec.key}`}
                    value={entry[spec.key] ?? null}
                    rows={spec.rows ?? 12}
                    onChange={(next) => updateEntry({ [spec.key]: next })}
                  />
                </Panel>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
