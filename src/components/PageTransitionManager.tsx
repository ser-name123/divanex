"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageTransitionManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // When pathname or searchParams change, conclude the transition
  useEffect(() => {
    // Jump instantly to top (0,0)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    if (isNavigating) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept internal anchor link clicks to show instant loader BEFORE page loads
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      // Only handle internal relative links and not anchor hashes or external links
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        !href.startsWith("/#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        targetAttr !== "_blank" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        try {
          const url = new URL(href, window.location.origin);
          if (url.pathname !== window.location.pathname || url.search !== window.location.search) {
            setIsNavigating(true);
            setProgress(35);

            const p1 = setTimeout(() => setProgress(70), 120);
            const p2 = setTimeout(() => setProgress(88), 350);

            return () => {
              clearTimeout(p1);
              clearTimeout(p2);
            };
          }
        } catch {
          // If URL parsing fails, ignore
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  if (!isNavigating) return null;

  return (
    <>
      {/* 1. Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[999999] pointer-events-none h-[3px] bg-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556] transition-all duration-300 ease-out shadow-[0_1px_8px_rgba(15,118,112,0.4)] relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_#0f7670]" />
        </div>
      </div>

      {/* 2. Light Glassmorphic Route Navigation Pill */}
      <div className="fixed bottom-6 right-6 z-[999998] pointer-events-none animate-fadeIn">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,8,56,0.12)] text-slate-900">
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#0f7670] border-t-transparent animate-spin" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#5c9556]" />
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-[10px] font-bold tracking-wider text-[#000838] uppercase">
              DIVANEX
            </span>
            <span className="text-[10px] text-[#0f7670] font-semibold">
              • Loading...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
