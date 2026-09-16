"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    // Returning early *before* this hook would change the hook count between
    // admin and public routes, which crashes React on client-side navigation.
    // This component sits in the root layout, so guard inside the effect.
    if (isAdminRoute) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
      setIsScrolled(scrollTop > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminRoute]);

  const handleClick = () => {
    if (isScrolled) {
      // Scroll to Top
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      // Scroll to Content / Bottom
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: "smooth"
      });
    }
  };

  // SVG Circular progress math
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * scrollProgress) / 100;

  // Safe to return after every hook has run.
  if (isAdminRoute) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-500 ease-out ${
        isScrolled
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-85 translate-y-0 pointer-events-auto hover:opacity-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div
        className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/95 border border-sky-200 text-[11px] font-mono font-semibold text-sky-700 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none backdrop-blur-md ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        <span>{isScrolled ? "Scroll to Top" : "Scroll to Content"}</span>
        <span className="ml-1 text-slate-500">({Math.round(scrollProgress)}%)</span>
      </div>

      {/* Futuristic Floating Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label={isScrolled ? "Scroll to Top" : "Scroll to Content"}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-400 backdrop-blur-xl shadow-lg shadow-sky-900/10 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
      >
        {/* Ambient Pulsing Radar Ring */}
        <span className="absolute -inset-1 rounded-full bg-sky-500/10 blur-sm group-hover:bg-sky-500/25 transition-all pointer-events-none"></span>

        {/* Circular SVG Scroll Progress Indicator */}
        <svg
          className="w-full h-full -rotate-90 pointer-events-none absolute inset-0 p-0.5"
          viewBox="0 0 52 52"
        >
          {/* Background Track Ring */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-slate-200"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Active Gradient Progress Ring */}
          <circle
            cx="26"
            cy="26"
            r={radius}
            className="stroke-sky-600 transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Arrow Icon with Smooth Direction Toggle */}
        <div className="relative z-10 text-sky-600 group-hover:text-sky-800 transition-colors duration-200">
          {isScrolled ? (
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          ) : (
            <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-200 animate-bounce" />
          )}
        </div>
      </button>
    </div>
  );
}
