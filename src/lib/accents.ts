/**
 * Named colour presets for admin-editable content.
 *
 * Tailwind builds its stylesheet by scanning the source for literal class
 * names, so a class that only ever exists in a database row is never generated
 * and renders as no styling at all. Admin-editable sections therefore store an
 * accent *name* and resolve it here, where the classes are literals the
 * compiler can see.
 */

export interface AccentPreset {
  /** Shown in the admin picker. */
  label: string;
  /** Text colour for headings and icons. */
  text: string;
  /** Tinted surface behind an icon. */
  surface: string;
  /** Border for cards and chips. */
  border: string;
  /** Border on hover, for interactive cards. */
  hoverBorder: string;
  /** Coloured shadow on hover. */
  glow: string;
  /** Raw hex, for inline styles and SVG strokes. */
  hex: string;
}

export const ACCENTS = {
  blue: {
    label: "Navy",
    text: "text-blue-600",
    surface: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    glow: "hover:shadow-blue-500/10",
    hex: "#3a5296",
  },
  sky: {
    label: "Teal",
    text: "text-sky-600",
    surface: "bg-sky-50",
    border: "border-sky-200",
    hoverBorder: "hover:border-sky-300",
    glow: "hover:shadow-sky-500/10",
    hex: "#189a91",
  },
  cyan: {
    label: "Teal Light",
    text: "text-cyan-600",
    surface: "bg-cyan-50",
    border: "border-cyan-200",
    hoverBorder: "hover:border-cyan-300",
    glow: "hover:shadow-cyan-500/10",
    hex: "#189a91",
  },
  emerald: {
    label: "Green",
    text: "text-emerald-600",
    surface: "bg-emerald-50",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    glow: "hover:shadow-emerald-500/10",
    hex: "#5c9556",
  },
  amber: {
    label: "Green Deep",
    text: "text-amber-600",
    surface: "bg-amber-50",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    glow: "hover:shadow-amber-500/10",
    hex: "#447541",
  },
  orange: {
    label: "Green Soft",
    text: "text-orange-600",
    surface: "bg-orange-50",
    border: "border-orange-200",
    hoverBorder: "hover:border-orange-300",
    glow: "hover:shadow-orange-500/10",
    hex: "#6fae69",
  },
  violet: {
    label: "Navy Soft",
    text: "text-violet-600",
    surface: "bg-violet-50",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    glow: "hover:shadow-violet-500/10",
    hex: "#43569a",
  },
  rose: {
    label: "Navy Deep",
    text: "text-blue-950",
    surface: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-400",
    glow: "hover:shadow-blue-900/10",
    hex: "#000838",
  },
  slate: {
    label: "Gray",
    text: "text-slate-600",
    surface: "bg-slate-50",
    border: "border-slate-200",
    hoverBorder: "hover:border-slate-300",
    glow: "hover:shadow-slate-500/10",
    hex: "#858585",
  },
} as const satisfies Record<string, AccentPreset>;

export type AccentName = keyof typeof ACCENTS;

export const ACCENT_NAMES = Object.keys(ACCENTS) as AccentName[];

/** Resolves a stored name, falling back so a bad value still renders styled. */
export function accent(name: string | undefined): AccentPreset {
  return ACCENTS[(name ?? "") as AccentName] ?? ACCENTS.sky;
}
