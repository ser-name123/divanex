"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
          {/* Full wordmark on tablet and up, where there is room for it */}
          <Image
            src="/divanex-logo.png"
            alt="Divanex Technologies"
            width={1400}
            height={286}
            sizes="(min-width: 640px) 210px, 0px"
            className="hidden sm:block w-[196px] lg:w-[210px] h-auto group-hover:scale-[1.03] transition-transform duration-300"
            priority
          />
          {/* Icon mark alone on phones, so the navbar stays uncrowded */}
          <Image
            src="/brand-logo-icon.png"
            alt="Divanex Technologies"
            width={512}
            height={512}
            sizes="44px"
            className="sm:hidden w-[44px] h-[44px] group-hover:scale-105 transition-transform duration-300"
            priority
          />
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
              {/* ADVANCED MEGA MENU POPOVER CARD */}
              {/* ------------------------------------------------------------- */}
              {moreDropdownOpen && (
                <div className="absolute right-0 top-full pt-2 w-[820px] 2xl:w-[860px] animate-fadeIn z-50 pointer-events-auto">
                  <div className="bg-white/98 backdrop-blur-2xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 p-6 lg:p-7 relative overflow-hidden space-y-6">
                    {/* Ambient Radial Accent */}
                    <div className="absolute -top-16 -right-16 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

                    {/* 3-Column Mega Grid */}
                    <div className="grid grid-cols-12 gap-6 relative z-10">
                      
                      {/* Mega-menu columns, in the order the admin console lists
                          them. The hardcoded columns this replaced could not be
                          renamed or reordered without a deploy. */}
                      {megaGroups.map((group) => (
                        <div key={group.id} className="col-span-4 space-y-3">
                          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                              {group.eyebrow ? `${group.eyebrow} // ` : ""}
                              {group.title}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {group.links.map((item) => {
                              const isActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onClick={() => setMoreDropdownOpen(false)}
                                  className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all border group ${
                                    isActive
                                      ? "bg-sky-50 text-sky-900 border-sky-200"
                                      : "bg-transparent hover:bg-sky-50/70 text-slate-800 border-transparent hover:border-sky-200/80"
                                  }`}
                                >
                                  <div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 border ${
                                      isActive
                                        ? "bg-sky-600 border-sky-600 shadow-sm"
                                        : "bg-sky-50 border-sky-200/80 shadow-2xs group-hover:bg-white group-hover:border-sky-300 group-hover:scale-105"
                                    }`}
                                  >
                                    <Icon
                                      name={item.icon}
                                      className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                                        isActive ? "text-white" : "text-sky-600 group-hover:text-sky-700"
                                      }`}
                                    />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                                        {item.label}
                                      </span>
                                      {item.badge && (
                                        <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200 shrink-0">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5 font-medium line-clamp-2">
                                      <RichText inline value={item.description} />
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Column 3: Featured Architecture Advisory Spotlight (4 Cols) */}
                      <div className="col-span-4 bg-gradient-to-br from-sky-50 via-white to-blue-50/90 border border-sky-200/90 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm">
                        <div className="space-y-2.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-200 inline-flex items-center gap-1 shadow-2xs">
                            <Sparkles className="w-3 h-3 text-sky-600" />
                            <span>SOLUTIONS ARCHITECTURE</span>
                          </span>

                          <h4 className="text-sm font-extrabold text-slate-900 leading-snug">
                            {header.megaMenuPromoTitle}
                          </h4>

                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                            <RichText inline value={header.megaMenuPromoText} />
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-sky-100">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>2 Review Slots Available Today</span>
                          </div>

                          <Link
                            href={header.megaMenuPromoCtaHref}
                            onClick={() => setMoreDropdownOpen(false)}
                            className="btn-futuristic-primary w-full !py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 !rounded-xl shadow-xs"
                          >
                            <span>{header.megaMenuPromoCtaLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Status & Quick Utilities Strip */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 relative z-10">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-slate-700 font-bold">{header.megaMenuStatusText}</span>
                        <span className="text-slate-400">{`// ${header.megaMenuStatusDetail}`}</span>
                      </div>

                      <div className="flex items-center gap-3.5 text-xs font-bold">
                        {quickLinks.map((link, index) =>
                          // The last entry is rendered as the accented button.
                          index === quickLinks.length - 1 ? (
                            <Link
                              key={link.id}
                              href={link.href}
                              onClick={() => setMoreDropdownOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-bold shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                            >
                              <Icon name={link.icon} className="w-3.5 h-3.5" />
                              <span>{link.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ) : (
                            <Link
                              key={link.id}
                              href={link.href}
                              onClick={() => setMoreDropdownOpen(false)}
                              className="text-slate-600 hover:text-sky-700 transition-colors flex items-center gap-1"
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="w-3 h-3 text-slate-400" />
                            </Link>
                          )
                        )}
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
