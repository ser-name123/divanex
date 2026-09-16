/**
 * Blog body renderer.
 *
 * Blog content is stored as markdown-ish text and rendered through
 * `dangerouslySetInnerHTML`. Any raw HTML surviving that path is stored XSS, so
 * the rule here is: escape the entire document FIRST, then build markup only
 * from our own templates. Author text can never re-enter as markup.
 */

const ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

/** Escapes every HTML-significant character. Safe for text and attribute values. */
export function escapeHtml(input: string): string {
  return String(input ?? "").replace(/[&<>"']/g, (ch) => ENTITIES[ch]);
}

/** Anchor slug for a heading. Entity noise from escaping is dropped first. */
function slugify(escapedTitle: string): string {
  return escapedTitle
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const FENCE = /```(sql|typescript|json|bash|go)?\n([\s\S]*?)```/g;

/** Full-fidelity blog body markup, matching the public article styling. */
export function renderBlogContent(content: string): string {
  return escapeHtml(content)
    .replace(/^## (.*)$/gm, (_m, title: string) => {
      const id = slugify(title);
      return `<h2 id="${id}" class="group flex items-center gap-2 scroll-mt-24 font-extrabold text-slate-900">${title} <a href="#${id}" class="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity text-base font-normal">#</a></h2>`;
    })
    .replace(/^### (.*)$/gm, (_m, title: string) => {
      const id = slugify(title);
      return `<h3 id="${id}" class="group flex items-center gap-2 scroll-mt-24 font-bold text-slate-800">${title} <a href="#${id}" class="text-sky-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-normal">#</a></h3>`;
    })
    .replace(FENCE, (_m, lang: string | undefined, code: string) => {
      const langLabel = (lang || "code").toUpperCase();
      return `
                        <div class="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
                          <div class="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400 font-bold">
                            <div class="flex items-center gap-2">
                              <div class="flex items-center gap-1.5">
                                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                              </div>
                              <span class="text-sky-400 font-bold ml-2">${escapeHtml(langLabel)} SNIPPET</span>
                            </div>
                            <span class="text-[10px] text-slate-500 font-mono">PRODUCTION SPEC</span>
                          </div>
                          <pre class="overflow-x-auto p-5 text-sm font-mono leading-relaxed text-slate-200"><code>${code}</code></pre>
                        </div>
                      `;
    })
    .replace(/\n\n/g, "<br/><br/>");
}

/** Compact preview markup for the admin editor pane. */
export function renderBlogPreview(content: string): string {
  return escapeHtml(content)
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(
      FENCE,
      '<pre class="bg-slate-900 text-slate-100 p-3 rounded-lg"><code>$2</code></pre>'
    )
    .replace(/\n\n/g, "<br/><br/>");
}

/**
 * Serializes structured data for a `<script type="application/ld+json">` tag.
 * `JSON.stringify` alone is not enough: a `</script>` inside any string field
 * closes the tag and everything after it becomes live markup.
 */
const BACKSLASH = String.fromCharCode(92);
const UNSAFE_JSONLD = new RegExp(
  "[<>&" + String.fromCharCode(0x2028) + String.fromCharCode(0x2029) + "]",
  "g"
);

export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    UNSAFE_JSONLD,
    (ch) => BACKSLASH + "u" + ch.charCodeAt(0).toString(16).padStart(4, "0")
  );
}
