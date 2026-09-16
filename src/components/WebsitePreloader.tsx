"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function WebsitePreloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setProgress(0);
    setIsDone(false);
    setShouldRender(true);

    const isFirst = isFirstLoadRef.current;
    isFirstLoadRef.current = false;

    // Fast, silky smooth counter (~600ms first time, ~380ms afterwards)
    const duration = isFirst ? 650 : 380;
    const startTime = performance.now();

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Luxurious ease-out cubic curve
      const easeProgress = 1 - Math.pow(1 - rawProgress, 3);
      const currentVal = Math.round(easeProgress * 100);

      setProgress(currentVal);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            setShouldRender(false);
          }, 600); // Wait for transition
        }, 120);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setIsDone(true);
      setTimeout(() => setShouldRender(false), 200);
    }, duration + 800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyTimer);
    };
  }, [pathname, isMounted]);

  const handleSkip = () => {
    setProgress(100);
    setIsDone(true);
    setTimeout(() => setShouldRender(false), 200);
  };

  if (!shouldRender) return null;

  // SVG circular radius & circumference
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-[#f8fafc] text-slate-900 select-none cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isDone
          ? "opacity-0 pointer-events-none scale-110 blur-xl"
          : "opacity-100 scale-100 blur-0"
      }`}
      style={{
        clipPath: isDone ? "circle(0% at 50% 50%)" : "circle(150% at 50% 50%)",
        transition: "clip-path 0.75s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.6s ease, transform 0.7s cubic-bezier(0.85, 0, 0.15, 1), filter 0.6s ease",
      }}
    >
      {/* ─── LUXURY LIGHT AMBIENT AURORA BACKGROUND ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft, vibrant atmospheric light orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#0f7670]/10 via-[#189a91]/8 to-[#5c9556]/10 blur-[120px] animate-pulse" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-100/60 blur-[90px]" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-50/70 blur-[90px]" />

        {/* Subtle geometric dot grid for light theme */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, #000838 1.5px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* ─── ELEGANT LIGHT CENTER DISPLAY ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-sm w-full">
        
        {/* 1. KINETIC SVG LIQUID RING + FLOATING EMBLEM */}
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
          
          {/* Outer Soft Light Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#0f7670]/20 to-[#5c9556]/20 blur-xl opacity-80 animate-pulse" />

          {/* SVG Progress Circle */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background track circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="rgba(0, 8, 56, 0.07)"
              strokeWidth="3.5"
              fill="transparent"
            />
            {/* Animated glowing progress stroke */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="url(#gradient-brand-light)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-75 ease-out"
              style={{
                filter: "drop-shadow(0 3px 10px rgba(15, 118, 112, 0.4))",
              }}
            />
            {/* SVG Gradient Definition */}
            <defs>
              <linearGradient id="gradient-brand-light" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f7670" />
                <stop offset="50%" stopColor="#189a91" />
                <stop offset="100%" stopColor="#5c9556" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Light Glass Capsule with Brand Logo */}
          <div className="absolute inset-7 rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 p-5 flex items-center justify-center shadow-[0_12px_36px_rgba(0,8,56,0.08)] transition-transform duration-500 hover:scale-105">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
              <Image
                src="/brand-logo-icon.png"
                alt="Divanex Emblem"
                width={64}
                height={64}
                className="w-full h-full object-contain filter drop-shadow-[0_4px_16px_rgba(15,118,112,0.3)] animate-pulse"
                priority
              />
            </div>
          </div>
        </div>

        {/* 2. REFINED BRAND LOGO & TAGLINE */}
        <div className="mt-7 flex flex-col items-center text-center space-y-1.5">
          <Image
            src="/divanex-logo.png"
            alt="Divanex Technologies"
            width={1400}
            height={286}
            sizes="210px"
            className="w-[190px] sm:w-[220px] h-auto drop-shadow-xs"
            priority
          />
          <p className="text-[11px] font-mono tracking-[0.22em] text-[#0f7670] uppercase font-semibold">
            Engineering High-Scale Reality
          </p>
        </div>

        {/* 3. LUXURY LIGHT NUMERIC PERCENTAGE COUNTER */}
        <div className="mt-7 flex items-baseline font-mono">
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#000838] drop-shadow-xs">
            {progress}
          </span>
          <span className="ml-1 text-base sm:text-lg font-bold text-[#5c9556]">
            %
          </span>
        </div>

        {/* 4. SLEEK MINIMALIST PROGRESS LINE */}
        <div className="mt-4 w-48 h-[2.5px] bg-slate-200/90 rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556] rounded-full transition-all duration-75 relative shadow-[0_0_8px_rgba(15,118,112,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Skip hint */}
        <span className="mt-6 text-[10px] font-mono tracking-widest text-slate-400 uppercase opacity-75 hover:opacity-100 transition-opacity">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
}
