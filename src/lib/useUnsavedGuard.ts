"use client";

import { useEffect } from "react";

/**
 * Warns before leaving with unsaved edits.
 *
 * The content editors stage everything in memory until Save is pressed, which
 * makes a mistyped edit easy to abandon — and an hour of copywriting just as
 * easy to lose by closing the tab. The browser's own prompt is the only one
 * that can interrupt a close or a reload, so that is what this hooks into.
 *
 * Deliberately not a router guard as well: Next's App Router gives no reliable
 * way to cancel a client-side navigation, and a confirm() that fires after the
 * page has already changed is worse than none.
 */
export function useUnsavedGuard(dirty: boolean): void {
  useEffect(() => {
    if (!dirty) return;

    const warn = (event: BeforeUnloadEvent) => {
      // Required for Chrome to show its prompt. The message itself is the
      // browser's; no wording we supply is displayed.
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);
}
