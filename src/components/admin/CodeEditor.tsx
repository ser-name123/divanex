"use client";

import { useMemo, useRef, useState } from "react";
import { AlertCircle, Check, Copy, Minimize2, Wand2 } from "lucide-react";

/**
 * JSON editor for the nested sections of a detail page.
 *
 * The bare textarea this replaces gave an operator no way to see where they
 * were, and a parse error told them only that something, somewhere, was wrong.
 * This keeps line numbers beside the text, names the failing line, and refuses
 * to stage anything that does not parse — so a half-typed edit can never be
 * saved over working content.
 */

interface ParseError {
  message: string;
  line: number | null;
}

/** Locates the failing line from the character offset the parser reports. */
function parseWithPosition(source: string): { value: unknown } | { error: ParseError } {
  try {
    return { value: JSON.parse(source) };
  } catch (caught) {
    const message = caught instanceof Error ? caught.message : "Invalid JSON";
    const atPosition = /position (\d+)/i.exec(message);
    const atLine = /line (\d+)/i.exec(message);

    let line: number | null = null;
    if (atLine) {
      line = Number(atLine[1]);
    } else if (atPosition) {
      const offset = Number(atPosition[1]);
      line = source.slice(0, offset).split("\n").length;
    }

    return { error: { message: message.replace(/\s*in JSON at position \d+.*/i, ""), line } };
  }
}

export default function CodeEditor({
  value,
  onChange,
  rows = 14,
  /** Shown above the editor, e.g. "12 entries". */
  summary,
}: {
  value: unknown;
  onChange: (next: unknown) => void;
  rows?: number;
  summary?: string;
}) {
  const [draft, setDraft] = useState(() => JSON.stringify(value ?? null, null, 2));
  const [error, setError] = useState<ParseError | null>(null);
  const [copied, setCopied] = useState(false);

  const textRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lineCount = useMemo(() => draft.split("\n").length, [draft]);

  const stage = (next: string) => {
    setDraft(next);
    const result = parseWithPosition(next);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setError(null);
    onChange(result.value);
  };

  /** Pretty-prints, so a pasted one-line blob becomes readable. */
  const format = () => {
    const result = parseWithPosition(draft);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    const pretty = JSON.stringify(result.value, null, 2);
    setDraft(pretty);
    setError(null);
    onChange(result.value);
  };

  const minify = () => {
    const result = parseWithPosition(draft);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setDraft(JSON.stringify(result.value));
    setError(null);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; the text is selectable either way.
    }
  };

  /** Tab indents instead of moving focus out of the editor. */
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const field = textRef.current;
    if (!field) return;

    if (event.key === "Tab") {
      event.preventDefault();
      const start = field.selectionStart;
      const end = field.selectionEnd;
      const next = `${draft.slice(0, start)}  ${draft.slice(end)}`;
      stage(next);
      requestAnimationFrame(() => field.setSelectionRange(start + 2, start + 2));
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "f") {
      event.preventDefault();
      format();
    }
  };

  /** Keeps the line numbers aligned with the text as it scrolls. */
  const syncScroll = () => {
    if (gutterRef.current && textRef.current) {
      gutterRef.current.scrollTop = textRef.current.scrollTop;
    }
  };

  // Loading a different document is a remount, not an update: callers give the
  // editor a `key` that includes the page being edited. That keeps the draft
  // the operator is typing from being overwritten by a re-render.

  return (
    <div
      className={`rounded-xl border overflow-hidden bg-slate-950 transition-all ${
        error ? "border-rose-400" : "border-slate-800 focus-within:border-sky-500"
      }`}
    >
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border-b border-slate-800">
        <span className="text-[10px] font-mono font-bold text-sky-400">JSON</span>
        {summary && <span className="text-[10px] text-slate-500 font-mono">{summary}</span>}
        <span className="flex-1" />
        <button
          type="button"
          onClick={format}
          title="Format (Ctrl+Shift+F)"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Wand2 className="w-3 h-3" />
          <span>Format</span>
        </button>
        <button
          type="button"
          onClick={minify}
          title="Collapse to one line"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <Minimize2 className="w-3 h-3" />
          <span>Minify</span>
        </button>
        <button
          type="button"
          onClick={copy}
          title="Copy"
          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold text-slate-400 hover:text-sky-300 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="flex">
        <div
          ref={gutterRef}
          aria-hidden
          className="shrink-0 py-2.5 px-2 text-right select-none overflow-hidden bg-slate-900/60 border-r border-slate-800"
          style={{ maxHeight: `${rows * 1.5}rem` }}
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div
              key={index}
              className={`text-[11px] font-mono leading-6 ${
                error?.line === index + 1 ? "text-rose-400 font-bold" : "text-slate-600"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <textarea
          ref={textRef}
          value={draft}
          rows={rows}
          spellCheck={false}
          onScroll={syncScroll}
          onKeyDown={onKeyDown}
          onChange={(event) => stage(event.target.value)}
          className="flex-1 px-3 py-2.5 bg-slate-950 text-slate-200 text-[11px] font-mono leading-6 resize-y focus:outline-none"
        />
      </div>

      <div className="px-3 py-1.5 border-t border-slate-800 bg-slate-900 text-[10px] font-sans">
        {error ? (
          <span className="inline-flex items-center gap-1.5 text-rose-400 font-semibold">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>
              Not staged{error.line ? ` — line ${error.line}` : ""}: {error.message}
            </span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <Check className="w-3 h-3 shrink-0" />
            <span>Valid. Staged — press Save &amp; publish to make it live.</span>
          </span>
        )}
      </div>
    </div>
  );
}
