"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { ICON_NAMES, Icon } from "@/lib/iconRegistry";
import RichTextEditor from "@/components/admin/RichTextEditor";
import CodeEditor from "@/components/admin/CodeEditor";
import { ACCENTS, ACCENT_NAMES, accent } from "@/lib/accents";

/**
 * Shared form parts for the content admin views.
 *
 * The navigation, page-content, services, case-study and technology editors all
 * do the same handful of things — a labelled input, a reorderable list, an icon
 * picker — so they are written once here. The alternative was five views each
 * carrying its own copy of a list editor, which is how the old localStorage
 * views drifted apart from each other.
 */

export function Panel({
  title,
  description,
  children,
  right,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-sans">{title}</h3>
          {description && (
            <p className="text-[11px] text-slate-500 mt-0.5 font-sans">{description}</p>
          )}
        </div>
        {right}
      </header>
      {children}
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </span>
      {children}
      {hint && <span className="block text-[10px] text-slate-400 font-sans">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 transition-all";

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <input
      type="text"
      value={value ?? ""}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={inputClass}
    />
  );
}

export function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => onChange(Number(event.target.value))}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value ?? ""}
      rows={rows}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClass} resize-y leading-relaxed`}
    />
  );
}

/**
 * Plain multi-line text, with a character budget.
 *
 * For values that must stay literal: a search description ends up inside a
 * `<meta>` tag, where `**bold**` would appear verbatim in the Google snippet.
 * The counter turns amber past the limit rather than truncating — a hard cut
 * would silently lose the end of a sentence someone meant to keep.
 */
export function PlainField({
  value,
  onChange,
  rows = 3,
  placeholder,
  limit,
}: {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
  limit?: number;
}) {
  const count = (value ?? "").length;
  const over = limit !== undefined && count > limit;

  return (
    <div className="space-y-1">
      <TextArea value={value} onChange={onChange} rows={rows} placeholder={placeholder} />
      {limit !== undefined && (
        <span
          className={`block text-[10px] font-sans text-right ${
            over ? "text-amber-700 font-semibold" : "text-slate-400"
          }`}
        >
          {count} / {limit}
          {over ? " — over budget" : ""}
        </span>
      )}
    </div>
  );
}

/**
 * A list of short strings — features, deliverables, badges, disallowed paths.
 *
 * One input per entry rather than a newline-separated textarea. The textarea
 * looked simpler but silently dropped blank lines on every keystroke, so the
 * caret jumped whenever someone pressed Enter in the middle of the list, and
 * reordering meant cut-and-paste.
 */
export function StringListEditor({
  value,
  onChange,
  placeholder,
  addLabel = "Add item",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  const list = value ?? [];

  const replace = (index: number, next: string) => {
    const copy = [...list];
    copy[index] = next;
    onChange(copy);
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const copy = [...list];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  };

  return (
    <div className="space-y-1.5">
      {list.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span className="w-5 shrink-0 text-[10px] text-slate-400 text-right font-mono">
            {index + 1}
          </span>
          <input
            type="text"
            value={entry}
            placeholder={placeholder}
            onChange={(event) => replace(index, event.target.value)}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => move(index, -1)}
            disabled={index === 0}
            aria-label="Move up"
            className="p-1 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer shrink-0"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => move(index, 1)}
            disabled={index === list.length - 1}
            aria-label="Move down"
            className="p-1 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer shrink-0"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onChange(list.filter((_, position) => position !== index))}
            aria-label="Remove"
            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 cursor-pointer shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...list, ""])}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-[11px] font-semibold transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}

/**
 * The previous name for the same thing.
 *
 * Kept so the existing call sites do not all have to change at once; blank
 * entries are dropped on the way out, which is what the newline-separated
 * version did.
 */
export function LinesInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  /** Unused; accepted so old call sites that passed `rows` still type-check. */
  rows?: number;
  placeholder?: string;
}) {
  return (
    <StringListEditor
      value={value}
      placeholder={placeholder}
      onChange={(next) => onChange(next.map((line) => line.trim()).filter(Boolean))}
    />
  );
}

/**
 * Working notes, kept inside the console.
 *
 * Plain on purpose — nobody reads these on the public site, so formatting
 * markers would be noise. It grows with what is typed instead of trapping the
 * writer in a three-line box.
 */
export function NotesField({
  value,
  onChange,
  placeholder,
  rows = 3,
  /** Callers that persist on blur rather than on every keystroke. */
  onBlur,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
  onBlur?: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const text = value ?? "";

  useEffect(() => {
    const field = ref.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.max(field.scrollHeight, rows * 22)}px`;
  }, [text, rows]);

  return (
    <div className="space-y-1">
      <textarea
        ref={ref}
        value={text}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={`${inputClass} resize-y leading-relaxed font-sans`}
      />
      <span className="block text-[10px] text-slate-400 font-sans text-right">
        {text.trim() ? `${text.trim().split(/\s+/).length} words` : "Empty"}
      </span>
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-semibold transition-all cursor-pointer ${
        checked
          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
          : "bg-slate-50 border-slate-200 text-slate-500"
      }`}
    >
      {checked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </button>
  );
}

/**
 * An image URL, with the image itself beside it.
 *
 * A bare text box gave no sign that a URL was wrong until someone loaded the
 * public page, by which time a card was rendering a broken image to visitors.
 * The preview fails visibly here instead.
 */
export function ImageField({
  value,
  onChange,
  placeholder,
  /** Square for an avatar, wide for a cover image. */
  shape = "wide",
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  shape?: "wide" | "square";
}) {
  const [broken, setBroken] = useState(false);
  const url = (value ?? "").trim();

  return (
    <div className="space-y-2">
      <input
        type="url"
        value={value ?? ""}
        placeholder={placeholder ?? "https://…"}
        onChange={(event) => {
          setBroken(false);
          onChange(event.target.value);
        }}
        className={inputClass}
      />

      {url ? (
        <div
          className={`relative overflow-hidden rounded-xl border bg-slate-50 ${
            shape === "square" ? "w-16 h-16" : "w-full aspect-[16/7]"
          } ${broken ? "border-rose-300" : "border-slate-200"}`}
        >
          {broken ? (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] text-rose-600 font-sans px-2 text-center">
              This address does not load an image.
            </span>
          ) : (
            // A plain <img>: the source is arbitrary and operator-supplied, so
            // it cannot go through next/image's configured-domains allowlist.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt=""
              onError={() => setBroken(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        <span className="block text-[10px] text-slate-400 font-sans">
          No image set — the card falls back to its placeholder.
        </span>
      )}
    </div>
  );
}

/** Picks a name from ICON_REGISTRY, with the icon itself shown beside it. */
export function IconPicker({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (next: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
        <Icon name={value} className="w-4 h-4" />
      </span>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        <option value="">None</option>
        {ICON_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Picks an accent name.
 *
 * Deliberately not a free-text colour field: Tailwind only builds the classes
 * it can see in the source, so an arbitrary colour typed here would render as
 * no styling at all on the live site.
 */
export function AccentPicker({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (next: string) => void;
}) {
  const tone = accent(value);
  return (
    <div className="flex items-center gap-2">
      <span
        className={`w-8 h-8 rounded-xl border shrink-0 ${tone.surface} ${tone.border}`}
        style={{ boxShadow: `inset 0 0 0 2px ${tone.hex}33` }}
      />
      <select
        value={value ?? "sky"}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      >
        {ACCENT_NAMES.map((name) => (
          <option key={name} value={name}>
            {ACCENTS[name].label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Add, remove, reorder and edit a list of records.
 *
 * Reordering is buttons rather than drag-and-drop on purpose: these lists are
 * edited rarely and a keyboard-reachable control beats a mouse-only gesture.
 */
export function ListEditor<T>({
  items,
  onChange,
  title,
  addLabel,
  makeItem,
  itemLabel,
  renderItem,
  collapsible = true,
}: {
  items: T[];
  onChange: (next: T[]) => void;
  title?: string;
  addLabel: string;
  makeItem: () => T;
  itemLabel: (item: T, index: number) => string;
  renderItem: (item: T, update: (next: T) => void, index: number) => React.ReactNode;
  collapsible?: boolean;
}) {
  const list = items ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(collapsible ? null : 0);
  const listId = useId();

  const replace = (index: number, next: T) => {
    const copy = [...list];
    copy[index] = next;
    onChange(copy);
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const copy = [...list];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
    setOpenIndex((current) => (current === index ? target : current));
  };

  const remove = (index: number) => {
    onChange(list.filter((_, position) => position !== index));
    setOpenIndex(null);
  };

  return (
    <div className="space-y-2.5">
      {title && (
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            {title}
          </span>
          <span className="text-[10px] text-slate-400">{list.length} items</span>
        </div>
      )}

      {list.map((item, index) => {
        const open = !collapsible || openIndex === index;
        return (
          <div
            key={`${listId}-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <GripVertical className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <button
                type="button"
                onClick={() => setOpenIndex(open && collapsible ? null : index)}
                className="flex-1 text-left text-xs font-semibold text-slate-800 truncate cursor-pointer"
              >
                {itemLabel(item, index) || "Untitled"}
              </button>
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label="Move up"
                className="p-1 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === list.length - 1}
                aria-label="Move down"
                className="p-1 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="Remove"
                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {open && (
              <div className="px-3 pb-3 pt-1 border-t border-slate-200 bg-white space-y-3">
                {renderItem(item, (next) => replace(index, next), index)}
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => {
          onChange([...list, makeItem()]);
          setOpenIndex(list.length);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-[11px] font-semibold transition-all cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>{addLabel}</span>
      </button>
    </div>
  );
}

/**
 * Edits one nested block as JSON.
 *
 * Kept as a named export so existing call sites do not change; the editor
 * itself is CodeEditor, which adds line numbers, a formatter and an error that
 * names the line rather than just saying the document is invalid.
 */
export function JsonEditor({
  value,
  onChange,
  rows = 12,
  summary,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
  rows?: number;
  summary?: string;
}) {
  return <CodeEditor value={value} onChange={onChange} rows={rows} summary={summary} />;
}

/**
 * Prose field.
 *
 * Every description, answer and quote an operator writes goes through this
 * rather than a bare textarea: it has a formatting toolbar, a preview rendered
 * by the same code the public site uses, and a character counter.
 */
export function RichField({
  value,
  onChange,
  rows = 3,
  placeholder,
  inline = false,
  limit,
}: {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
  inline?: boolean;
  limit?: number;
}) {
  return (
    <RichTextEditor
      value={value ?? ""}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      inline={inline}
      limit={limit}
    />
  );
}

/** Small tab strip, for views with several sections. */
export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Array<{ id: string; label: string }>;
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`px-3.5 py-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border ${
            active === tab.id
              ? "bg-sky-600 border-sky-600 text-white shadow-sm"
              : "bg-white border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/** Save / reset bar, identical across the content views. */
export function SaveBar({
  onSave,
  onReset,
  saving,
  loading,
  dirty,
}: {
  onSave: () => void;
  onReset: () => void;
  saving: boolean;
  loading: boolean;
  dirty: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {dirty && (
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
          Unsaved changes
        </span>
      )}
      <button
        type="button"
        onClick={onReset}
        disabled={saving || loading}
        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer"
      >
        Reset to defaults
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving || loading}
        className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
      >
        {saving ? "Saving…" : "Save & publish"}
      </button>
    </div>
  );
}

/** Slug/id helper, so new entries get a stable key without the operator typing one. */
export function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Turns a title into a URL slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
