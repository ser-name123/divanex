/**
 * Puts the reader where the URL's fragment says they should be.
 *
 * Two things were taking the fragment away. The route transition scrolls to
 * the top of every new page, which is right for /contact and wrong for
 * /contact#schedule; and the page keeps growing after that first scroll — a
 * font swaps, a hero image arrives — so a target aligned at mount had drifted
 * hundreds of pixels by the time anyone looked at it.
 *
 * So this aligns the target, then keeps re-aligning it for a short while, and
 * stops the moment the reader scrolls themselves. `scroll-margin-top` on the
 * target keeps it clear of the fixed navbar; `scrollIntoView` honours it.
 */

/** Long enough for late images; short enough not to fight the reader. */
const SETTLE_MS = 1200;

/** Ignore sub-pixel drift, and the browser's own rounding. */
const DRIFT_TOLERANCE = 2;

/**
 * Scrolls to `location.hash` if it names an element on the page.
 *
 * Returns a teardown that stops the settling passes, or `null` when there is
 * no fragment to honour — which is the caller's signal that it is free to
 * scroll to the top as usual.
 */
export function scrollToHash(): (() => void) | null {
  if (typeof window === "undefined") return null;

  const raw = window.location.hash.slice(1);
  if (!raw) return null;

  let id: string;
  try {
    id = decodeURIComponent(raw);
  } catch {
    id = raw;
  }

  const target = document.getElementById(id);
  if (!target) return null;

  target.scrollIntoView();

  // Re-align while the page above the target is still settling.
  let stopped = false;
  let expected = window.scrollY;
  const deadline = Date.now() + SETTLE_MS;

  const giveUp = () => {
    stopped = true;
    window.removeEventListener("wheel", giveUp);
    window.removeEventListener("touchstart", giveUp);
    window.removeEventListener("keydown", giveUp);
  };

  // The reader's own scrolling wins immediately.
  window.addEventListener("wheel", giveUp, { passive: true });
  window.addEventListener("touchstart", giveUp, { passive: true });
  window.addEventListener("keydown", giveUp);

  const settle = () => {
    if (stopped) return;

    // Anything that moved the page other than our own alignment is either the
    // reader or another script; either way, stop interfering.
    if (Math.abs(window.scrollY - expected) > DRIFT_TOLERANCE) {
      giveUp();
      return;
    }

    target.scrollIntoView();
    expected = window.scrollY;

    if (Date.now() < deadline) {
      requestAnimationFrame(settle);
    } else {
      giveUp();
    }
  };

  requestAnimationFrame(settle);

  return giveUp;
}
