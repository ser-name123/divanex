/**
 * Responsive variants for images hosted on a CDN that resizes by query string.
 *
 * The blog covers and author portraits are Unsplash URLs with the width baked
 * in: every card asked for the 1200px version and every 32px portrait asked for
 * the 200px one, whatever the screen. On a phone that was most of a megabyte of
 * pixels nobody could see.
 *
 * These are not served through next/image on purpose. The files live on
 * somebody else's CDN, that CDN already resizes on request, and routing them
 * through our own optimizer would add a hop and a bill for work Unsplash is
 * already doing. A srcset lets the browser ask for the size it will actually
 * draw.
 */

/** Widths worth offering. Beyond this the card itself is the limit. */
const COVER_WIDTHS = [320, 480, 640, 800, 1200];
const PORTRAIT_WIDTHS = [40, 64, 96, 160];

/** Only rewrite what we know how to rewrite. */
function isResizable(url: string): boolean {
  return /^https:\/\/images\.unsplash\.com\//.test(url);
}

function atWidth(url: string, width: number): string {
  return url.replace(/([?&])w=\d+/, `$1w=${width}`);
}

/**
 * A `srcset` for the given URL, or an empty string when the host is not one we
 * can resize — in which case the caller's plain `src` still works.
 */
export function responsiveSrcSet(url: string | undefined, widths: number[]): string {
  if (!url || !isResizable(url) || !/[?&]w=\d+/.test(url)) return "";
  return widths.map((w) => `${atWidth(url, w)} ${w}w`).join(", ");
}

/** A blog cover: full width on phones, roughly a third of the grid above that. */
export function coverImageProps(url: string | undefined) {
  const srcSet = responsiveSrcSet(url, COVER_WIDTHS);
  if (!srcSet) return {};
  return {
    srcSet,
    sizes: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
  };
}

/** An author portrait, drawn at a few dozen pixels whatever the screen. */
export function portraitImageProps(url: string | undefined) {
  const srcSet = responsiveSrcSet(url, PORTRAIT_WIDTHS);
  if (!srcSet) return {};
  return { srcSet, sizes: "48px" };
}
