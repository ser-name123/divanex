"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Bold,
  Code,
  Eye,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  PenLine,
  Quote,
  Strikethrough,
  SquareCode,
} from "lucide-react";
import { renderInline, renderRich } from "@/lib/richText";

/**
 * Prose editor for the admin console.
 *
 * Replaces the bare textareas the content views used to carry. It writes
 * markdown rather than HTML deliberately: the value is rendered on the public
 * site through a renderer that escapes everything first and emits only its own
 * tags, so no markup an operator types — pasted or otherwise — can become live
 * HTML on the site. A contenteditable HTML editor would hand that guarantee
 * away for a formatting toolbar.
 *
 * The preview is the real renderer, not an approximation, so what the operator
 * checks here is what a visitor gets.
 */

interface Action {
  id: string;
  label: string;
  icon: typeof Bold;
  /** Wraps the selection. */
  wrap?: [string, string];
  /** Prefixes each selected line. */
  linePrefix?: string;
  /** Inserts a block on its own lines. */
  block?: string;
  /** Keyboard shortcut letter, with ctrl/cmd. */
  key?: string;
  /** Hidden when the field only accepts inline markup. */
  blockOnly?: boolean;
  /** Shown only where fenced code blocks are supported, i.e. the blog. */
  codeBlockOnly?: boolean;
}

const ACTIONS: Action[] = [
  { id: "bold", label: "Bold", icon: Bold, wrap: ["**", "**"], key: "b" },
  { id: "italic", label: "Italic", icon: Italic, wrap: ["*", "*"], key: "i" },
  { id: "strike", label: "Strikethrough", icon: Strikethrough, wrap: ["~~", "~~"] },
  { id: "code", label: "Inline code", icon: Code, wrap: ["`", "`"], key: "e" },
  { id: "link", label: "Link", icon: Link2, key: "k" },
  { id: "h2", label: "Heading", icon: Heading2, linePrefix: "## ", blockOnly: true },
  { id: "h3", label: "Subheading", icon: Heading3, linePrefix: "### ", blockOnly: true },
  { id: "ul", label: "Bulleted list", icon: List, linePrefix: "- ", blockOnly: true },
  { id: "ol", label: "Numbered list", icon: ListOrdered, linePrefix: "1. ", blockOnly: true },
  { id: "quote", label: "Quote", icon: Quote, linePrefix: "> ", blockOnly: true },
  { id: "rule", label: "Divider", icon: Minus, block: "---", blockOnly: true },
  {
    id: "fence",
    label: "Code block",
    icon: SquareCode,
    block: "```typescript\n// code here\n```",
    blockOnly: true,
    codeBlockOnly: true,
  },
];

export default function RichTextEditor({
  value,
  onChange,
  rows = 4,
  placeholder,
  /** Emphasis, code and links only — for copy that sits inside a heading. */
  inline = false,
  /** Shows a counter, and turns it amber past the limit. */
  limit,
  /**
   * Renders the preview. Defaults to the site renderer for this field kind;
   * the blog passes its own so the preview matches the article page exactly,
   * fenced code blocks included.
   */
  renderPreview,
  /** Offers the fenced-code-block button. */
  codeBlocks = false,
}: {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
  inline?: boolean;
  limit?: number;
  renderPreview?: (text: string) => string;
  codeBlocks?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const text = value ?? "";

  const actions = ACTIONS.filter(
    (action) => (!inline || !action.blockOnly) && (codeBlocks || !action.codeBlockOnly)
  );

  /** Replaces the selection and restores the caret around the new text. */
  const replaceSelection = useCallback(
    (build: (selected: string) => { next: string; caret: [number, number] }) => {
      const field = ref.current;
      if (!field) return;

      const start = field.selectionStart;
      const end = field.selectionEnd;
      const selected = text.slice(start, end);
      const { next, caret } = build(selected);

      const updated = text.slice(0, start) + next + text.slice(end);
      onChange(updated);

      // After React writes the new value, put the caret where the operator
      // expects it — otherwise every toolbar click sends it to the end.
      requestAnimationFrame(() => {
        field.focus();
        field.setSelectionRange(start + caret[0], start + caret[1]);
      });
    },
    [onChange, text]
  );

  const apply = useCallback(
    (action: Action) => {
      if (action.id === "link") {
        const href = prompt("Link address (https://…, /page, mailto: or #anchor):", "https://");
        if (!href) return;
        replaceSelection((selected) => {
          const label = selected || "link text";
          return { next: `[${label}](${href})`, caret: [1, 1 + label.length] };
        });
        return;
      }

      if (action.wrap) {
        const [open, close] = action.wrap;
        replaceSelection((selected) => ({
          next: `${open}${selected}${close}`,
          caret: [open.length, open.length + selected.length],
        }));
        return;
      }

      if (action.linePrefix) {
        const prefix = action.linePrefix;
        replaceSelection((selected) => {
          const lines = (selected || "").split("\n");
          const next = lines
            .map((line, index) =>
              prefix === "1. " ? `${index + 1}. ${line}` : `${prefix}${line}`
            )
            .join("\n");
          return { next, caret: [0, next.length] };
        });
        return;
      }

      if (action.block) {
        const block = action.block;
        replaceSelection(() => ({
          next: `\n${block}\n`,
          caret: [block.length + 2, block.length + 2],
        }));
      }
    },
    [replaceSelection]
  );

  /** Ctrl/Cmd shortcuts, and Tab that indents rather than leaving the field. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();
      replaceSelection((selected) => ({
        next: selected ? selected.replace(/^/gm, "  ") : "  ",
        caret: selected ? [0, selected.length + 2] : [2, 2],
      }));
      return;
    }

    if (!(event.ctrlKey || event.metaKey)) return;
    const action = actions.find((entry) => entry.key === event.key.toLowerCase());
    if (!action) return;
    event.preventDefault();
    apply(action);
  };

  /** Grows with the content rather than making the operator scroll a box. */
  useEffect(() => {
    const field = ref.current;
    if (!field || tab !== "write") return;
    field.style.height = "auto";
    field.style.height = `${Math.max(field.scrollHeight, rows * 22)}px`;
  }, [text, tab, rows]);

  const count = text.length;
  const over = limit !== undefined && count > limit;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/15 transition-all">
      <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50/80 flex-wrap">
        {actions.map((action) => {
          const ActionIcon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              title={action.key ? `${action.label} (Ctrl+${action.key.toUpperCase()})` : action.label}
              aria-label={action.label}
              onClick={() => apply(action)}
              disabled={tab === "preview"}
              className="p-1.5 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-white disabled:opacity-30 transition-colors cursor-pointer"
            >
              <ActionIcon className="w-3.5 h-3.5" />
            </button>
          );
        })}

        <span className="flex-1" />

        <button
          type="button"
          onClick={() => setTab(tab === "write" ? "preview" : "write")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
            tab === "preview"
              ? "bg-sky-600 text-white"
              : "text-slate-500 hover:text-sky-700 hover:bg-white"
          }`}
        >
          {tab === "preview" ? <PenLine className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          <span>{tab === "preview" ? "Edit" : "Preview"}</span>
        </button>
      </div>

      {tab === "write" ? (
        <textarea
          ref={ref}
          value={text}
          rows={rows}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          className="w-full px-3 py-2.5 text-xs text-slate-900 bg-white leading-relaxed resize-y focus:outline-none block"
        />
      ) : (
        <div
          className="px-3 py-2.5 text-xs text-slate-700 leading-relaxed space-y-2 min-h-[4rem]"
          // The public renderer, not an approximation — it escapes the author's
          // text before emitting any tag.
          dangerouslySetInnerHTML={{
            __html:
              (renderPreview ? renderPreview(text) : inline ? renderInline(text) : renderRich(text)) ||
              '<span class="text-slate-300">Nothing to preview yet.</span>',
          }}
        />
      )}

      <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-100 bg-slate-50/60 text-[10px] font-sans">
        <span className="text-slate-400">
          {inline
            ? "**bold** · *italic* · `code` · [text](link)"
            : codeBlocks
              ? "**bold** · ## heading · - list · > quote · [text](link) · ``` code block"
              : "**bold** · *italic* · ## heading · - list · > quote · [text](link)"}
        </span>
        <span className={over ? "text-amber-700 font-semibold" : "text-slate-400"}>
          {count}
          {limit !== undefined ? ` / ${limit}` : ""}
        </span>
      </div>
    </div>
  );
}
