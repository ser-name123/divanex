import { renderInline, renderRich } from "@/lib/richText";

/**
 * Renders admin-written prose.
 *
 * The markup is built by src/lib/richText.ts, which escapes the author's text
 * before adding any tags, so nothing typed into the admin console can become
 * live markup here. Every call site that used to render `{value}` as plain text
 * can switch to this without changing what plain text looks like — a string
 * with no markers renders identically.
 */
export default function RichText({
  value,
  className,
  /** Emphasis, code and links only — safe inside a heading or a table cell. */
  inline = false,
  /** The wrapping element. A span for inline copy, a div for prose. */
  as,
}: {
  value: string | undefined | null;
  className?: string;
  inline?: boolean;
  as?: "div" | "span" | "p";
}) {
  const Tag = as ?? (inline ? "span" : "div");
  const html = inline ? renderInline(value) : renderRich(value);

  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
