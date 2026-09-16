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
    const call = /useSection\(\s*"([^"]+)"/.exec(source);
    if (!call) continue;

    const id = call[1];
    const heading = readLiteral(source, "DEFAULT_HEADING");
    const items = readLiteral(source, "DEFAULT_ITEMS");
    const cta = readLiteral(source, "DEFAULT_CTA");

    if (!heading) {
      console.warn(`  ! ${id}: no readable DEFAULT_HEADING`);
      continue;
    }

    found[id] = {
      heading,
      items: Array.isArray(items) ? items : [],
      ...(cta ? { cta } : {}),
    };
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
