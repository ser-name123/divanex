import "server-only";
import { getContent } from "@/lib/contentStore";
import { SECTION_DEFAULTS } from "@/data/sectionDefaults";

/**
 * The categories a blog post may be filed under.
 *
 * There were two lists: the filter bar on /blog offered ten, and the update
 * route validated against six written into the file beside it. They did not
 * overlap — several seeded posts are filed under categories the route did not
 * recognise — and a category outside its six was dropped from the save without
 * an error, so an operator saw the edit succeed and the category not change.
 *
 * One list now, the one an operator edits, read from the same stored section
 * the filter bar renders.
 */

const SECTION_ID = "blog/categories";

/** Not a category: it is the filter bar's "no filter" control. */
const ALL = "all";

function labelsFrom(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) =>
      item && typeof item === "object" ? String((item as { label?: unknown }).label ?? "") : ""
    )
    .map((label) => label.trim())
    .filter((label) => label && label.toLowerCase() !== ALL);
}

export async function getBlogCategories(): Promise<string[]> {
  const fallback = labelsFrom(SECTION_DEFAULTS[SECTION_ID]?.items);

  try {
    const sections = await getContent("sections");
    const stored = labelsFrom(sections[SECTION_ID]?.items);
    return stored.length > 0 ? stored : fallback;
  } catch {
    return fallback;
  }
}

/** Case-insensitive, because an operator types the category into a field. */
export async function isBlogCategory(value: unknown): Promise<boolean> {
  if (typeof value !== "string" || !value.trim()) return false;
  const categories = await getBlogCategories();
  return categories.some((category) => category.toLowerCase() === value.trim().toLowerCase());
}
