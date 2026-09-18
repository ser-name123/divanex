"use client";

import { useState, useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { useNavigation } from "@/context/SiteContentContext";
import { visibleGroups, visibleLinks } from "@/data/navigation";
import RichText from "@/components/RichText";


interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation: _onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Every menu below is a database record edited from the admin console. The
  // arrays that used to live here meant renaming a link was a code change.
  const header = useNavigation().header;
  const primaryNavLinks = visibleLinks(header.primary);
  const megaGroups = visibleGroups(header.megaMenu);
  const allMoreLinks = megaGroups.flatMap((group) => group.links);
  const ctas = (header.ctas ?? []).filter((cta) => !cta.hidden);
  const quickLinks = visibleLinks(header.megaMenuQuickLinks);

  /**
   * The wordmark on tablet and up, the icon mark on phones.
   *
   * `getImageProps` gives the optimised srcset without rendering an element,
   * which is what lets both live inside one <picture>.
   */
  const { props: wordmark } = getImageProps({
    src: "/divanex-logo.png",
    alt: "Divanex Technologies",
    width: 1400,
    height: 286,
    sizes: "(min-width: 1024px) 210px, 196px",
    priority: true,
  });
  const wordmarkSrcSet = wordmark.srcSet;

  const { props: iconProps } = getImageProps({
    src: "/brand-logo-icon.png",
    alt: "Divanex Technologies",
    width: 512,
    height: 512,
    sizes: "44px",
    priority: true,
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-200/50 py-3"
          : "bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm shadow-slate-100/50 py-4"
      }`}
    >
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        {/* Brand Logo — official Divanex Technologies lockup */}
        <Link href="/" className="flex items-center group" aria-label="Divanex Technologies — home">
          {/*
            One picture, two sources, one download.
            
            These used to be two <Image>s, one hidden by CSS at each breakpoint —
            which hides an image but does not stop the browser fetching it. The
            wordmark was being downloaded on phones that never show it, and the
            variant it asked for there was 32px wide for a 1400px file, whose
            rounded dimensions no longer matched its declared aspect ratio.
            
            A <picture> fetches only the source whose media query matches.
          */}
          <picture>
            <source media="(min-width: 640px)" srcSet={wordmarkSrcSet} />
            <img
              {...iconProps}
              className="w-[44px] h-[44px] sm:w-[196px] lg:w-[210px] sm:h-auto group-hover:scale-105 sm:group-hover:scale-[1.03] transition-transform duration-300"
            />
          </picture>
        </Link>

        {/* Right Section: Desktop Navigation + Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-2.5 py-1.5 xl:px-3 rounded-xl text-[13px] xl:text-[13.5px] font-semibold transition-colors duration-150 tracking-wide whitespace-nowrap relative border ${
                    isActive
                      ? "text-sky-700 bg-sky-100/80 border-sky-300/80 shadow-2xs"
                      : "text-slate-700 hover:text-sky-700 hover:bg-slate-100/80 border-transparent"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-600 shadow-sm shadow-sky-500"></span>
                  )}
                </Link>
              );
            })}

            {/* ADVANCED MEGA MENU TRIGGER FOR 'MORE' */}
            <div
              ref={moreDropdownRef}
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-2.5 py-1.5 xl:px-3 rounded-xl text-[13px] xl:text-[13.5px] font-semibold transition-colors duration-150 tracking-wide whitespace-nowrap flex items-center gap-1 cursor-pointer relative border ${
                  moreDropdownOpen
                    ? "text-sky-700 bg-slate-100/90 border-slate-200"
                    : "text-slate-700 hover:text-sky-700 hover:bg-slate-100/80 border-transparent"
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>{header.moreLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${
                    moreDropdownOpen ? "rotate-180 text-sky-600" : "text-slate-400"
                  }`}
                />
              </button>

              {/* ------------------------------------------------------------- */}
              {/* ADVANCED MEGA MENU POPOVER CARD (LIGHT THEME) */}
              {/* ------------------------------------------------------------- */}
              {moreDropdownOpen && (
                <div className="absolute right-0 top-full pt-2.5 w-[920px] 2xl:w-[960px] animate-fadeIn z-50 pointer-events-auto">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 p-6 lg:p-7 relative overflow-hidden space-y-5">
                    {/* Top Gradient Accent Strip */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556]" />
                    
                    {/* Ambient Radial Accent */}
                    <div className="absolute -top-16 -right-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

                    {/* 3-Column Mega Grid */}
                    <div className="grid grid-cols-12 gap-5 relative z-10 items-stretch">
                      
                      {/* Mega-menu columns (4 Cols each) */}
                      {megaGroups.map((group) => (
                        <div key={group.id} className="col-span-4 space-y-3 flex flex-col">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0f7670]" />
                            <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              {group.eyebrow ? `${group.eyebrow} // ` : ""}
                              {group.title}
                            </span>
                          </div>

                          <div className="space-y-2 flex-1">
                            {group.links.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onClick={() => setMoreDropdownOpen(false)}
                                  className={`flex items-start gap-3 p-3 rounded-2xl transition-all border group ${
                                    isActive
                                      ? "bg-emerald-50/80 text-emerald-950 border-emerald-300/80 shadow-xs"
                                      : "bg-slate-50/70 hover:bg-white text-slate-800 border-slate-200/70 hover:border-[#0f7670]/40 hover:shadow-md hover:shadow-[#0f7670]/5"
                                  }`}
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 border ${
                                      isActive
                                        ? "bg-[#0f7670] text-white border-[#0f7670] shadow-sm"
                                        : "bg-white border-slate-200/80 shadow-2xs text-[#0f7670] group-hover:bg-[#0f7670] group-hover:text-white group-hover:border-[#0f7670] group-hover:scale-105"
                                    }`}
                                  >
                                    <Icon
                                      name={item.icon}
                                      className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1 mb-0.5">
                                      <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-[#0f7670] transition-colors leading-snug">
                                        {item.label}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[8.5px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md bg-emerald-50 text-[#385d36] border border-emerald-200/80 shrink-0 whitespace-nowrap">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-snug font-medium line-clamp-2 group-hover:text-slate-600 transition-colors">
                                      <RichText inline value={item.description} />
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Column 3: Featured Architecture Advisory Spotlight (LIGHT THEME) */}
                      <div className="col-span-4 rounded-2xl p-5 bg-gradient-to-br from-[#f0f9f8] via-white to-[#f4faf3] border border-[#0f7670]/25 shadow-sm relative overflow-hidden flex flex-col justify-between space-y-4">
                        {/* Background Ambient Glow */}
                        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#5c9556]/15 rounded-full blur-2xl pointer-events-none" />

                        <div className="space-y-2 relative z-10">
                          <span className="px-2.5 py-1 rounded-full text-[9.5px] font-mono font-bold bg-[#0f7670]/10 text-[#0f7670] border border-[#0f7670]/20 inline-flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-[#5c9556]" />
                            <span>SOLUTIONS ARCHITECTURE</span>
                          </span>

                          <h4 className="text-sm font-extrabold text-[#000838] leading-snug pt-1">
                            {header.megaMenuPromoTitle || "Book a Free Architecture Review"}
                          </h4>

                          <p className="text-[11.5px] text-slate-600 leading-relaxed font-normal">
                            <RichText
                              inline
                              value={
                                header.megaMenuPromoText ||
                                "45-minute deep-dive with a senior solutions architect. Feasibility, schema, stack & delivery roadmap."
                              }
                            />
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-2 border-t border-slate-200/80 relative z-10">
                          <div className="flex items-center gap-1.5 text-[10.5px] font-mono font-bold text-[#385d36]">
                            <span className="w-2 h-2 rounded-full bg-[#5c9556] animate-pulse" />
                            <span>2 Review Slots Open Today</span>
                          </div>

                          <Link
                            href={header.megaMenuPromoCtaHref || "/contact"}
                            onClick={() => setMoreDropdownOpen(false)}
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0f7670] to-[#5c9556] hover:from-[#0d645f] hover:to-[#4e8149] text-white font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-md shadow-[#0f7670]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                          >
                            <span>{header.megaMenuPromoCtaLabel || "Book Free Consultation"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Quick Utilities Strip */}
                    <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-slate-800 font-bold">{header.megaMenuStatusText || "ALL SYSTEMS PRODUCTION READY"}</span>
                        <span className="text-slate-400">{`// ${header.megaMenuStatusDetail || "99.99% SLA"}`}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold">
                        <Link
                          href="/contact"
                          onClick={() => setMoreDropdownOpen(false)}
                          className="text-slate-600 hover:text-[#0f7670] transition-colors flex items-center gap-1 text-[11.5px] font-mono"
                        >
                          <span>WhatsApp Fast Support</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </Link>

                        <Link
                          href="/portfolio"
                          onClick={() => setMoreDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0f7670] to-[#5c9556] hover:from-[#0d645f] hover:to-[#4e8149] text-white font-mono text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                        >
                          <span>Case Studies</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 2xl:gap-3 lg:pl-3 lg:border-l lg:border-slate-200">
            {ctas.map((cta) =>
              cta.style === "primary" ? (
                <Link key={cta.id} href={cta.href} className="btn-nav-primary">
                  <span>{cta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link key={cta.id} href={cta.href} className="btn-nav-glass">
                  <Icon name={cta.icon} className="w-3.5 h-3.5 text-sky-600" />
                  <span>{cta.label}</span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/contact"
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-200"
            >
              Consult
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-sky-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-6 py-6 space-y-5 shadow-xl backdrop-blur-2xl animate-fadeIn">
          {/* Primary Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs sm:text-sm font-semibold p-2.5 rounded-xl border transition-colors ${
                    isActive
                      ? "text-sky-800 bg-sky-50 border-sky-200 font-bold shadow-2xs"
                      : "text-slate-700 hover:text-sky-600 border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Secondary Submenu Links */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block px-1">
              ADDITIONAL ARCHITECTURE RESOURCES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allMoreLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      isActive
                        ? "text-sky-800 bg-sky-50 border-sky-200 font-bold"
                        : "text-slate-700 hover:text-sky-700 border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <Icon name={link.icon} className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>


          {/* Action Buttons */}
          <div className="pt-1 flex flex-col gap-2.5">
            {ctas.map((cta) =>
              cta.style === "primary" ? (
                <Link
                  key={cta.id}
                  href={cta.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-sky-600 to-teal-600 shadow-md shadow-sky-600/20"
                >
                  <span>{cta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  key={cta.id}
                  href={cta.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  <Icon name={cta.icon} className="w-4 h-4 text-sky-600" />
                  <span>{cta.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
