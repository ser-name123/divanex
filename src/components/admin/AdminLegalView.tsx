"use client";

import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import {
  LEGAL_LABELS,
  LEGAL_SLUGS,
  type LegalCard,
  type LegalDocument,
  type LegalPages,
  type LegalSection,
  type LegalSlug,
} from "@/data/legalPages";
import { ICON_NAMES } from "@/lib/iconRegistry";

/**
 * The legal pages editor.
 *
 * These were five React components, so changing a retention period or a
 * warranty length meant a developer and a deploy. The section index on each
 * page is generated from the sections below it, which is why there is nothing
 * here to keep it in step.
 */

const inputClass =
  "w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 disabled:opacity-50";

const labelClass = "text-[11px] font-semibold text-slate-500 uppercase tracking-wide";

function Field({
  label,
  value,
  onChange,
  disabled,
  hint,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hint?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {rows ? (
        <textarea
          rows={rows}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1 ${inputClass} leading-relaxed`}
        />
      ) : (
        <input
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1 ${inputClass}`}
        />
      )}
      {hint && <span className="block mt-1 text-[10px] text-slate-400">{hint}</span>}
    </label>
  );
}

function IconPicker({
  value,
  onChange,
  disabled,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>Icon</span>
      <select
        disabled={disabled}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1 ${inputClass} cursor-pointer`}
      >
        <option value="">None</option>
        {ICON_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function AdminLegalView({ canEdit }: { canEdit: boolean }) {
  const [pages, setPages] = useState<LegalPages | null>(null);
  const [slug, setSlug] = useState<LegalSlug>("privacy");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ text: string; bad?: boolean } | null>(null);

  const announce = (text: string, bad = false) => {
    setNotice({ text, bad });
    setTimeout(() => setNotice(null), 6000);
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/content/legal");
        const json = await res.json();
        if (active && json?.success) setPages(json.data);
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
      const res = await fetch("/api/content/legal");
      const json = await res.json();
      if (json?.success) {
        setPages(json.data);
        setDirty(false);
      }
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!pages) return;
    setSaving(true);
    try {
      const res = await fetch("/api/content/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: pages }),
      });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not save.", true);
        return;
      }
      setDirty(false);
      announce("Saved and published.");
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !pages) {
    return <p className="text-xs text-slate-500">Loading the legal pages…</p>;
  }

  const doc = pages[slug];

  const patchDoc = (next: Partial<LegalDocument>) => {
    setPages({ ...pages, [slug]: { ...doc, ...next } });
    setDirty(true);
  };

  const patchSection = (index: number, next: Partial<LegalSection>) => {
    const sections = doc.sections.map((s, i) => (i === index ? { ...s, ...next } : s));
    patchDoc({ sections });
  };

  const moveSection = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= doc.sections.length) return;
    const sections = [...doc.sections];
    [sections[index], sections[target]] = [sections[target], sections[index]];
    patchDoc({ sections });
  };

  const addSection = () => {
    const section: LegalSection = {
      id: `section-${Date.now()}`,
      eyebrow: `${doc.sections.length + 1}. New section`,
      heading: "New section",
      body: "",
    };
    patchDoc({ sections: [...doc.sections, section] });
    setOpen(section.id);
  };

  const removeSection = (index: number) => {
    const section = doc.sections[index];
    if (!window.confirm(`Remove "${section.heading}" from ${LEGAL_LABELS[slug]}?`)) return;
    patchDoc({ sections: doc.sections.filter((_, i) => i !== index) });
  };

  const patchCard = (sectionIndex: number, cardIndex: number, next: Partial<LegalCard>) => {
    const section = doc.sections[sectionIndex];
    const cards = (section.cards || []).map((c, i) => (i === cardIndex ? { ...c, ...next } : c));
    patchSection(sectionIndex, { cards });
  };

  const addCard = (sectionIndex: number) => {
    const section = doc.sections[sectionIndex];
    const card: LegalCard = { id: `card-${Date.now()}`, title: "New card", body: "", tone: "sky" };
    patchSection(sectionIndex, { cards: [...(section.cards || []), card] });
  };

  const removeCard = (sectionIndex: number, cardIndex: number) => {
    const section = doc.sections[sectionIndex];
    patchSection(sectionIndex, { cards: (section.cards || []).filter((_, i) => i !== cardIndex) });
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-sky-600" />
            Legal pages
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Privacy, terms, cookies, NDA and refunds. The index on each page is built from its
            sections, so there is nothing separate to keep in step.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View page
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

      {!canEdit && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          You can read these, but your role cannot change them.
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {LEGAL_SLUGS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setSlug(value);
              setOpen(null);
            }}
            className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
              slug === value
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {LEGAL_LABELS[value]}
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <p className="text-xs font-bold text-slate-900">Summary card</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Badge"
            value={doc.badge}
            disabled={!canEdit}
            onChange={(badge) => patchDoc({ badge })}
            hint="The small line beside the green dot."
          />
          <Field
            label="Index title"
            value={doc.indexTitle}
            disabled={!canEdit}
            onChange={(indexTitle) => patchDoc({ indexTitle })}
          />
        </div>
        <Field
          label="Title"
          value={doc.summaryTitle}
          disabled={!canEdit}
          onChange={(summaryTitle) => patchDoc({ summaryTitle })}
        />
        <Field
          label="Body"
          rows={3}
          value={doc.summaryBody}
          disabled={!canEdit}
          onChange={(summaryBody) => patchDoc({ summaryBody })}
        />
        <Field
          label="Stamp"
          value={doc.stamp}
          disabled={!canEdit}
          onChange={(stamp) => patchDoc({ stamp })}
          hint="Free text, e.g. “Effective Version: 2026.4 • Last Updated: September 2026”."
        />
      </section>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-slate-900">
            Sections ({doc.sections.length})
          </p>
          {canEdit && (
            <button
              type="button"
              onClick={addSection}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3 h-3" />
              Add section
            </button>
          )}
        </div>

        {doc.sections.map((section, index) => {
          const expanded = open === section.id;
          return (
            <div key={section.id} className="rounded-2xl border border-slate-200 bg-white">
              <div className="p-3.5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : section.id)}
                  className="flex-1 min-w-[200px] text-left cursor-pointer"
                >
                  <p className="text-xs font-semibold text-slate-900">{section.heading}</p>
                  <p className="text-[11px] text-slate-500">{section.eyebrow}</p>
                </button>

                {canEdit && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSection(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, 1)}
                      disabled={index === doc.sections.length - 1}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {expanded && (
                <div className="px-3.5 pb-3.5 space-y-3 border-t border-slate-100 pt-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field
                      label="Anchor id"
                      value={section.id}
                      disabled={!canEdit}
                      onChange={(id) => patchSection(index, { id })}
                      hint="Changing it breaks links people saved."
                    />
                    <Field
                      label="Index line"
                      value={section.eyebrow}
                      disabled={!canEdit}
                      onChange={(eyebrow) => patchSection(index, { eyebrow })}
                    />
                    <IconPicker
                      value={section.icon}
                      disabled={!canEdit}
                      onChange={(icon) => patchSection(index, { icon })}
                    />
                  </div>

                  <Field
                    label="Heading"
                    value={section.heading}
                    disabled={!canEdit}
                    onChange={(heading) => patchSection(index, { heading })}
                  />

                  <Field
                    label="Body"
                    rows={8}
                    value={section.body}
                    disabled={!canEdit}
                    onChange={(body) => patchSection(index, { body })}
                    hint="**bold**, - bullets, [links](/path). A blank line starts a paragraph."
                  />

                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={labelClass}>Cards ({(section.cards || []).length})</span>
                      {canEdit && (
                        <button
                          type="button"
                          onClick={() => addCard(index)}
                          className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 cursor-pointer inline-flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add card
                        </button>
                      )}
                    </div>

                    {(section.cards || []).map((card, cardIndex) => (
                      <div
                        key={card.id}
                        className="p-3 mb-2 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="grid gap-2 sm:grid-cols-4">
                          <Field
                            label="Title"
                            value={card.title}
                            disabled={!canEdit}
                            onChange={(title) => patchCard(index, cardIndex, { title })}
                          />
                          <Field
                            label="Badge"
                            value={card.badge || ""}
                            disabled={!canEdit}
                            onChange={(badge) => patchCard(index, cardIndex, { badge })}
                          />
                          <IconPicker
                            value={card.icon}
                            disabled={!canEdit}
                            onChange={(icon) => patchCard(index, cardIndex, { icon })}
                          />
                          <label className="block">
                            <span className={labelClass}>Tone</span>
                            <select
                              disabled={!canEdit}
                              value={card.tone || "sky"}
                              onChange={(e) =>
                                patchCard(index, cardIndex, {
                                  tone: e.target.value as LegalCard["tone"],
                                })
                              }
                              className={`mt-1 ${inputClass} cursor-pointer`}
                            >
                              <option value="sky">Sky</option>
                              <option value="emerald">Emerald</option>
                              <option value="amber">Amber</option>
                              <option value="slate">Slate</option>
                            </select>
                          </label>
                        </div>
                        <Field
                          label="Body"
                          rows={3}
                          value={card.body}
                          disabled={!canEdit}
                          onChange={(body) => patchCard(index, cardIndex, { body })}
                        />
                        {canEdit && (
                          <button
                            type="button"
                            onClick={() => removeCard(index, cardIndex)}
                            className="text-[11px] font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                          >
                            Remove card
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
        <p className="text-xs font-bold text-slate-900">Closing call to action</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Title"
            value={doc.cta?.title || ""}
            disabled={!canEdit}
            onChange={(title) =>
              patchDoc({
                cta: { href: "/contact", label: "Contact us", body: "", ...doc.cta, title },
              })
            }
          />
          <Field
            label="Button label"
            value={doc.cta?.label || ""}
            disabled={!canEdit}
            onChange={(label) =>
              patchDoc({
                cta: { href: "/contact", title: "", body: "", ...doc.cta, label },
              })
            }
          />
        </div>
        <Field
          label="Body"
          rows={2}
          value={doc.cta?.body || ""}
          disabled={!canEdit}
          onChange={(body) =>
            patchDoc({ cta: { href: "/contact", title: "", label: "", ...doc.cta, body } })
          }
        />
        <Field
          label="Button link"
          value={doc.cta?.href || ""}
          disabled={!canEdit}
          onChange={(href) =>
            patchDoc({ cta: { title: "", label: "", body: "", ...doc.cta, href } })
          }
        />
      </section>
    </div>
  );
}
