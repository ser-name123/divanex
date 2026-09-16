"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, LayoutList, RotateCcw, Search } from "lucide-react";
import { useAdminContent } from "@/lib/useAdminContent";
import { useUnsavedGuard } from "@/lib/useUnsavedGuard";
import {
  DEFAULT_PAGE_SECTIONS,
  SECTION_REGISTRY,
  type SectionContent,
} from "@/data/pageSections";
import { SECTION_DEFAULTS } from "@/data/sectionDefaults";
import {
  Field,
  JsonEditor,
  Panel,
  RichField,
  SaveBar,
  TextInput,
} from "@/components/admin/fields";

/**
 * Editor for the per-page sections.
 *
 * Each page carries several sections that belong only to it — the SaaS deep
 * dive, the IP policies, the migration guide. Their copy lived inside their own
 * components, which is where most of the site's words actually were.
 *
 * A section with no stored record renders the copy compiled into its component,
 * so this screen starts from those values rather than from an empty form: an
 * operator edits what they can see on the site, not a blank box.
 */
export default function AdminSectionsView() {
  const {
    data: sections,
    setData: setSections,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("sections", DEFAULT_PAGE_SECTIONS);

  const [dirty, setDirty] = useState(false);
  useUnsavedGuard(dirty);

  const [page, setPage] = useState("/services");
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  const pages = useMemo(
    () => [...new Set(SECTION_REGISTRY.map((entry) => entry.page))],
    []
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return SECTION_REGISTRY.filter((entry) => {
      if (needle) {
        return (
          entry.label.toLowerCase().includes(needle) ||
          entry.id.toLowerCase().includes(needle)
        );
      }
      return entry.page === page;
    });
  }, [page, query]);

  const activeId = selected && SECTION_REGISTRY.some((e) => e.id === selected)
    ? selected
    : visible[0]?.id ?? null;

  const entry = SECTION_REGISTRY.find((item) => item.id === activeId);

  /**
   * What the section currently shows.
   *
   * The stored record holds only what has been edited, so the built-in copy
   * fills the rest — the same merge the site does at render time.
   */
  const builtIn = activeId ? SECTION_DEFAULTS[activeId] : undefined;
  const stored = activeId ? sections?.[activeId] : undefined;

  const heading = {
    eyebrow: "",
    title: "",
    highlight: "",
    description: "",
    ...(builtIn?.heading ?? {}),
    ...(stored?.heading ?? {}),
  };
  const items = stored?.items ?? builtIn?.items ?? [];
  const cta = { label: "", href: "", ...(builtIn?.cta ?? {}), ...(stored?.cta ?? {}) };
  const hasCta = Boolean(builtIn?.cta || stored?.cta);

  const write = (patch: Partial<SectionContent>) => {
    if (!activeId) return;
    setSections({
      ...sections,
      [activeId]: { ...(sections?.[activeId] ?? {}), ...patch },
    });
    setDirty(true);
  };

  const revertSection = () => {
    if (!activeId || !sections?.[activeId]) return;
    if (!confirm(`Discard the stored copy for "${entry?.label}" and use the built-in text again?`))
      return;
    const next = { ...sections };
    delete next[activeId];
    setSections(next);
    setDirty(true);
  };

  const handleSave = async () => {
    const ok = await save(sections);
    setDirty(!ok);
    notify(ok ? "Sections saved and published." : "Could not save. Nothing was published.");
  };

  const handleReset = async () => {
    if (!confirm("Discard every section edit and go back to the built-in copy throughout?"))
      return;
    const ok = await reset();
    setDirty(false);
    notify(ok ? "Every section restored to its built-in copy." : "Could not reset.");
  };

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
            <LayoutList className="w-3.5 h-3.5 text-sky-600" />
            <span>PER-PAGE SECTIONS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Page Sections
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            The {SECTION_REGISTRY.length} sections that belong to a single page — deep dives,
            policies, guides and comparison blocks. A section you have not edited shows the copy
            the site is serving today.
          </p>
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
        <aside className="lg:col-span-3 space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              placeholder="Search all sections"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
            />
          </div>

          {!query.trim() && (
            <div className="flex flex-wrap gap-1.5">
              {pages.map((path) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => {
                    setPage(path);
                    setSelected(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                    page === path
                      ? "bg-slate-900 border-slate-900 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-sky-300"
                  }`}
                >
                  {path}
                </button>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-100 max-h-[30rem] overflow-y-auto">
            {visible.map((item) => {
              const edited = Boolean(sections?.[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className={`w-full text-left px-3 py-2.5 transition-colors cursor-pointer ${
                    activeId === item.id ? "bg-sky-50" : "hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span
                      className={`text-xs font-semibold truncate ${
                        activeId === item.id ? "text-sky-800" : "text-slate-800"
                      }`}
                    >
                      {item.label}
                    </span>
                    {edited && (
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500" title="Edited" />
                    )}
                  </span>
                  <span className="block text-[10px] text-slate-400 truncate">{item.page}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {entry && (
            <>
              <Panel
                title={entry.label}
                description={`Shown on ${entry.page}`}
                right={
                  <div className="flex items-center gap-2">
                    <a
                      href={entry.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-all"
                    >
                      View page
                    </a>
                    {stored && (
                      <button
                        type="button"
                        onClick={revertSection}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-[11px] font-semibold transition-all cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Use built-in copy</span>
                      </button>
                    )}
                  </div>
                }
              >
                <div className="space-y-3">
                  <Field label="Eyebrow" hint="The small badge above the heading.">
                    <TextInput
                      value={heading.eyebrow}
                      onChange={(eyebrow) => write({ heading: { ...heading, eyebrow } })}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Heading">
                      <TextInput
                        value={heading.title}
                        onChange={(title) => write({ heading: { ...heading, title } })}
                      />
                    </Field>
                    <Field label="Highlighted part" hint="Rendered in the gradient accent.">
                      <TextInput
                        value={heading.highlight}
                        onChange={(highlight) => write({ heading: { ...heading, highlight } })}
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <RichField
                      value={heading.description}
                      rows={3}
                      inline
                      onChange={(description) => write({ heading: { ...heading, description } })}
                    />
                  </Field>

                  {hasCta && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <Field label="Button label">
                        <TextInput
                          value={cta.label}
                          onChange={(label) => write({ cta: { ...cta, label } })}
                        />
                      </Field>
                      <Field label="Button link">
                        <TextInput
                          value={cta.href}
                          onChange={(href) => write({ cta: { ...cta, href } })}
                        />
                      </Field>
                    </div>
                  )}
                </div>
              </Panel>

              {items.length > 0 && (
                <Panel
                  title="Cards"
                  description="The section's own card shape — the fields differ from section to section. Add an `iconName` to any card to change its icon."
                >
                  <JsonEditor
                    // Keyed by section so switching reloads the editor rather
                    // than leaving the previous section's text in the box.
                    key={activeId ?? "none"}
                    value={items}
                    rows={18}
                    summary={`${items.length} card${items.length === 1 ? "" : "s"}`}
                    onChange={(next) => write({ items: next as SectionContent["items"] })}
                  />
                </Panel>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
