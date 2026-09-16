"use client";

import { useSections } from "@/context/SiteContentContext";
import { resolveIcon } from "@/lib/iconRegistry";
import type { SectionContent, SectionCta, SectionHeadingContent } from "@/data/pageSections";

/**
 * Reads one page section's copy, falling back to the component's own.
 *
 * The component passes what it was written with. Anything the admin console has
 * stored for that section replaces it field by field, so an operator who edits
 * one heading does not have to restate the rest of the section — and a section
 * nobody has touched renders exactly as it did before this existed.
 */
export function useSection<T extends Record<string, unknown>>(
  id: string,
  defaults: { heading: SectionHeadingContent; items: T[]; cta?: SectionCta }
): { heading: SectionHeadingContent; items: T[]; cta: SectionCta } {
  const stored = useSections()[id] as Partial<SectionContent> | undefined;

  const heading: SectionHeadingContent = {
    ...defaults.heading,
    ...(stored?.heading ?? {}),
  };

  const cta: SectionCta = {
    label: "",
    href: "/contact",
    ...(defaults.cta ?? {}),
    ...(stored?.cta ?? {}),
  };

  if (!stored?.items) return { heading, items: defaults.items, cta };

  /**
   * Stored cards are merged over the built-in card at the same position.
   *
   * That is what carries the icon across: these cards hold a React component
   * in `icon`, which cannot survive a round trip through JSONB. A card added
   * beyond the built-in list borrows the first one's shape, so it renders with
   * a sensible icon rather than nothing.
   */
  const items = stored.items.map((entry, index) => {
    const base = defaults.items[index] ?? defaults.items[0] ?? ({} as T);
    const merged = { ...base, ...entry } as T & { iconName?: unknown; icon?: unknown };

    if (typeof merged.iconName === "string") {
      merged.icon = resolveIcon(merged.iconName);
    }

    return merged as T;
  });

  return { heading, items, cta };
}
