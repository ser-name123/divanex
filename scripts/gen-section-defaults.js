/**
 * Generates src/data/sectionDefaults.ts from the section components.
 *
 * Each section component carries the copy it was written with in
 * DEFAULT_HEADING / DEFAULT_ITEMS / DEFAULT_CTA, and the live site falls back
 * to those when a section has no stored record. The admin console needs the
 * same values to show a section nobody has edited yet — but importing 50-odd
 * client components into an admin bundle to read four constants is not a
 * trade worth making, so they are extracted into a plain data file here.
 *
 * Re-run with `npm run gen-sections` after editing a section's built-in copy.
 *
 * Icon values are dropped: they are React components in the source, they
 * cannot be represented as data, and the admin console edits text.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "sectionDefaults.ts");

/** Finds the matching close for the bracket that starts at `open`. */
function matchBracket(source, open) {
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "[" || ch === "{") depth += 1;
    else if (ch === "]" || ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Reads a `const NAME = <literal>` out of the source, as JS. */
function readLiteral(source, name) {
  const at = source.indexOf(`const ${name} = `);
  if (at === -1) return undefined;
  const open = source.search.call(source, /[[{]/) === -1 ? -1 : source.indexOf("=", at) + 1;
  let bracket = open;
  while (bracket < source.length && !"[{".includes(source[bracket])) bracket += 1;
  const close = matchBracket(source, bracket);
  if (close === -1) return undefined;

  const literal = source.slice(bracket, close + 1);
  try {
    // The literal may reference imported icon components, so those identifiers
    // are neutralised before it is evaluated as data.
    const safe = literal.replace(/\b(icon|Icon)\s*:\s*[A-Z]\w*/g, '"$1": null');
    // eslint-disable-next-line no-new-func
    return new Function(`"use strict"; return (${safe});`)();
  } catch {
    return undefined;
  }
}

/** Every component that calls useSection, keyed by the id it passes. */
function collect(dir, found = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collect(full, found);
      continue;
    }
    if (!entry.name.endsWith(".tsx")) continue;

    const source = fs.readFileSync(full, "utf8");

    /**
     * Every useSection call in the file, not just the first.
     *
     * A component may render two stored sections — a grid and the panel
     * beside it — and reading only the first left the second invisible to the
     * console, which then offered it as a section with no content.
     *
     * The constant names are read from the call rather than assumed, so a
     * component can name them after what they hold.
     */
    let cursor = 0;
    for (;;) {
      const at = source.indexOf("useSection", cursor);
      if (at === -1) break;
      cursor = at + 10;

      // Only a call site: the import statement and any prose mentioning the
      // hook also contain the word.
      const after = source.slice(at + 10).match(/^s*([(<])/);
      if (!after) continue;

      const quote = source.indexOf('"', at);
      if (quote === -1) break;
      const idEnd = source.indexOf('"', quote + 1);
      if (idEnd === -1) break;
      const id = source.slice(quote + 1, idEnd);

      // The options object starts at the first brace after the id.
      const brace = source.indexOf("{", idEnd);
      if (brace === -1) break;
      const close = matchBracket(source, brace);
      if (close === -1) break;
      const options = source.slice(brace, close + 1);
      cursor = close;

      const named = (key) => {
        const match = new RegExp(key + "\\s*:\\s*([A-Za-z_$][\\w$]*)").exec(options);
        return match ? match[1] : undefined;
      };

      const headingName = named("heading");
      const itemsName = named("items");
      const ctaName = named("cta");

      const heading = headingName ? readLiteral(source, headingName) : undefined;
      const items = itemsName ? readLiteral(source, itemsName) : undefined;
      const cta = ctaName ? readLiteral(source, ctaName) : undefined;

      if (!heading) {
        console.warn(`  ! ${id}: no readable heading constant`);
        continue;
      }

      found[id] = {
        heading,
        items: Array.isArray(items) ? items : [],
        ...(cta ? { cta } : {}),
      };
    }
  }
  return found;
}

const defaults = collect(path.join(ROOT, "src", "components"));
Object.assign(defaults, collect(path.join(ROOT, "src", "app")));

const ids = Object.keys(defaults).sort();
const ordered = Object.fromEntries(ids.map((id) => [id, defaults[id]]));

const banner = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Produced by scripts/gen-section-defaults.js from the DEFAULT_HEADING,
 * DEFAULT_ITEMS and DEFAULT_CTA constants in the section components. It exists
 * so the admin console can show a section that has never been edited without
 * importing every section component into the admin bundle.
 *
 * Run \`npm run gen-sections\` after changing a section's built-in copy.
 *
 * Icons are null here: they are React components in the source and the admin
 * console edits text.
 */

import type { SectionContent } from "@/data/pageSections";

export const SECTION_DEFAULTS: Record<string, Partial<SectionContent>> =
`;

fs.writeFileSync(OUT, `${banner}${JSON.stringify(ordered, null, 2)};\n`, "utf8");
console.log(`wrote ${ids.length} section defaults to src/data/sectionDefaults.ts`);
