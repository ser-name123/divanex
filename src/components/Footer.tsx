"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { maskEmail, maskPhone } from "@/lib/contactLinks";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  ArrowRight,
  ShieldCheck,
  Terminal,
  CheckCircle2,
  Lock,
  Server,
  Clock,
  Send,
  Check,
  Copy,
  MapPin,
  Zap,
  ArrowUp
} from "lucide-react";
import { Icon } from "@/lib/iconRegistry";
import { accent } from "@/lib/accents";
import { useNavigation } from "@/context/SiteContentContext";
import { visibleGroups, visibleLinks } from "@/data/navigation";
import RichText from "@/components/RichText";

/**
 * Footer column widths. Tailwind only emits classes it can read in the source,
 * so a span stored in the database has to resolve to one of these literals
 * rather than being interpolated into a class name.
 */
const COLUMN_SPAN: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterBusy, setNewsletterBusy] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);

  // Admin-managed. These were three literals that had to be found and edited
  // in code — and had already drifted from the values on the contact page.
  const siteConfig = useSiteConfig();
  const CONTACT_EMAIL = siteConfig.contactEmail;
  const CONTACT_PHONE = siteConfig.contactPhone;
  const WHATSAPP_LINK = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}`;

  // Columns, the bottom strip, the newsletter copy and the trust badges are
  // all database records now; they were four hardcoded arrays in this file.
  const footer = useNavigation().footer;
  const footerColumns = visibleGroups(footer.columns);
  const bottomLinks = visibleLinks(footer.bottomLinks);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utcString = now.toUTCString().slice(17, 25);
      setCurrentTime(utcString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  /**
   * Subscribes the visitor.
   *
   * This used to set a flag, show "Telemetry Stream Activated!", and clear
   * itself after four and a half seconds — no request, no row, no record. Every
   * address anyone typed into the footer was discarded. It now posts to
   * /api/subscribers and lands on the thank-you page.
   */
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email.includes("@")) {
      setNewsletterError("Please enter a valid email address.");
      return;
    }

    setNewsletterBusy(true);
    setNewsletterError("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/thank-you?kind=newsletter");
        return;
      }

      setNewsletterError(data.error || "Could not subscribe you. Please try again.");
    } catch {
      setNewsletterError("Network error. Please check your connection and try again.");
    }

    setNewsletterBusy(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200/80 pt-10 lg:pt-14 pb-8 overflow-hidden text-slate-600 select-none">
      {/* Subtle grid and ambient lights */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="glow-orb-blue w-[600px] h-[600px] -top-32 -left-32 opacity-15 pointer-events-none" />
      <div className="glow-orb-cyan w-[500px] h-[500px] top-1/3 -right-24 opacity-15 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* 1. FUTURISTIC ENGINEERING BRIEFING & DISPATCH TERMINAL */}
        <div className="mb-8 lg:mb-10 rounded-3xl p-6 sm:p-8 lg:p-10 bg-white border border-slate-200/90 relative overflow-hidden shadow-xl shadow-sky-950/5">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Dispatch Narrative */}
            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono font-semibold text-sky-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <Terminal className="w-3.5 h-3.5 text-sky-600" />
                <span>TECHNICAL ARCHITECTURE DISPATCH // BI-WEEKLY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900">
                {footer.newsletterTitle}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
                <RichText inline value={footer.newsletterText} />
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 4,800+ CTOs & Founders
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-sky-600" /> 100% Zero-Spam Guarantee
                </span>
                <span className="flex items-center gap-1 text-amber-700">
                  <Zap className="w-3.5 h-3.5 text-amber-600" /> 1-Click Instant Unsubscribe
                </span>
              </div>
            </div>

            {/* Right: Futuristic Terminal Input Field */}
            <div className="lg:col-span-5">
              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                  <div className="relative flex items-center">
                    <div className="absolute left-4 text-sky-600 font-mono text-xs pointer-events-none flex items-center gap-1.5">
                      <span className="text-slate-400 font-bold">$</span>
                    </div>
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="work_email@company.com"
                      required
                      className="w-full pl-9 pr-36 py-3.5 sm:py-4 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-mono focus:outline-none focus:bg-white focus:border-sky-500 focus:ring-3 focus:ring-sky-500/15 transition-all shadow-xs"
                    />
                    <button
                      type="submit"
                      disabled={newsletterBusy}
                      className="absolute right-2 px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-semibold text-xs font-mono flex items-center gap-1.5 shadow-md shadow-sky-600/20 transition-all hover:scale-102 cursor-pointer disabled:opacity-60 disabled:hover:scale-100"
                    >
                      <span>{newsletterBusy ? "Subscribing..." : footer.newsletterButtonLabel}</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {newsletterError && (
                    <p role="alert" className="px-2 text-[11px] font-mono text-red-600">
                      {newsletterError}
                    </p>
                  )}
                  <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between px-2">
                    <span>Direct engineering digest • No third-party tracking</span>
                    <span className="text-sky-700 font-semibold">TLS 1.3 Verified</span>
                  </div>
              </form>
            </div>
          </div>
        </div>

        {/* 2. REAL-TIME GLOBAL MULTI-REGION TELEMETRY HUD BAR */}
        <div className="mb-8 rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 font-mono text-xs flex flex-wrap items-center justify-between gap-4 shadow-xs">
          {/* Status Indicator */}
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span className="text-slate-900 font-bold tracking-wider uppercase text-[11px]">
              GLOBAL INGRESS CLUSTERS:
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-bold">
              100% OPERATIONAL
            </span>
          </div>

          {/* Region Node Latencies */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>US-East (N. Virginia):</span>
              <span className="text-emerald-600 font-bold">12ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>EU-Central (Frankfurt):</span>
              <span className="text-emerald-600 font-bold">24ms</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>AP-South (Mumbai):</span>
              <span className="text-emerald-600 font-bold">4ms</span>
            </div>
          </div>

          {/* Live UTC Telemetry Time Clock */}
          <div className="flex items-center gap-2 text-[11px] text-sky-700 font-semibold">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-400">UTC:</span>
            <span className="font-bold">{currentTime || "18:59:00"}</span>
          </div>
        </div>

        {/* 3. COMPREHENSIVE 5-COLUMN ENTERPRISE NAVIGATION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-5 xl:gap-6 pb-8 border-b border-slate-200">
          
          {/* Column 1: Brand DNA, Mission, Direct Comms (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="inline-flex items-center group" aria-label="Divanex Technologies — home">
              <Image
                src="/divanex-logo.png"
                alt="Divanex Technologies"
                width={1400}
                height={286}
                sizes="220px"
                className="w-[200px] sm:w-[220px] h-auto group-hover:scale-[1.03] transition-transform duration-300"
              />
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              <RichText inline value={footer.tagline} />
            </p>

            {/* Direct Comms & Quick-Action Contact Pills (Click-to-Reveal) */}
            <div className="space-y-2 text-xs font-mono">
              {/* Email Pill with Click to Reveal & Copy */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-colors shadow-2xs">
                {emailRevealed ? (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-2 text-slate-900 hover:text-sky-600 transition-colors truncate font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="text-[11px]">{CONTACT_EMAIL}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEmailRevealed(true)}
                    className="flex items-center gap-2 text-slate-600 hover:text-sky-600 transition-colors truncate font-medium cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span className="text-[11px]">{maskEmail(siteConfig.contactEmail)}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={emailRevealed ? handleCopyEmail : () => { setEmailRevealed(true); navigator.clipboard.writeText(CONTACT_EMAIL); setCopiedEmail(true); setTimeout(() => setCopiedEmail(false), 2200); }}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-50 text-[10px] text-sky-700 border border-slate-200 flex items-center gap-1 transition-all cursor-pointer font-semibold shrink-0"
                  title="Reveal and copy email"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : emailRevealed ? (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  ) : (
                    <span>Reveal</span>
                  )}
                </button>
              </div>

              {/* Direct Phone / WhatsApp Pill with Click to Reveal */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 transition-colors shadow-2xs">
                {phoneRevealed ? (
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 truncate font-semibold text-slate-900 hover:text-emerald-700"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[11px]">{CONTACT_PHONE}</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPhoneRevealed(true)}
                    className="flex items-center gap-2 truncate font-medium text-slate-600 hover:text-emerald-700 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="text-[11px]">{maskPhone(siteConfig.contactPhone)}</span>
                  </button>
                )}

                {phoneRevealed ? (
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-600 hover:text-white text-[10px] text-emerald-700 border border-emerald-200 font-bold uppercase transition-all"
                  >
                    Chat
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPhoneRevealed(true)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-emerald-50 text-[10px] text-emerald-700 border border-slate-200 font-semibold cursor-pointer"
                  >
                    Reveal
                  </button>
                )}
              </div>

              {/* Location Pill */}
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200/60 text-slate-500 text-[10.5px]">
                <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                {/* The office address from the console, not a fixed claim
                    about where the company operates. */}
                <span>{siteConfig.officeAddress}</span>
              </div>
            </div>

            {/* Social Docks */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:scale-105 transition-all shadow-xs"
                aria-label="WhatsApp Business"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:scale-105 transition-all shadow-xs"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:scale-105 transition-all shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 hover:text-white hover:bg-sky-600 hover:border-sky-600 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-sky-600" />
                <span>Discuss ROI</span>
              </Link>
            </div>
          </div>

          {/* Footer columns, in the order the admin console lists them. These
              were four near-identical hardcoded blocks; a column could not be
              renamed, reordered or added without a deploy. */}
          {footerColumns.map((column) => {
            const tone = accent(column.accent);
            return (
              <div key={column.id} className={`${COLUMN_SPAN[column.span ?? 2]} space-y-3`}>
                <div className="flex items-center gap-1.5 text-xs uppercase font-mono font-bold tracking-wider text-slate-900 pb-1 border-b border-slate-200">
                  <Icon name={column.icon} className={`w-3.5 h-3.5 ${tone.text}`} />
                  <span>{column.title}</span>
                </div>
                <ul className="space-y-2 text-xs">
                  {column.links.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group flex items-center justify-between text-slate-600 hover:text-sky-600 transition-colors py-0.5"
                      >
                        <div className="flex items-center gap-1 min-w-0">
                          <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                          <span className="group-hover:translate-x-0.5 transition-transform font-medium truncate">
                            {item.label}
                          </span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${tone.surface} border ${tone.border} ${tone.text} shrink-0 ml-1`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}


        </div>

        {/* 4. ENTERPRISE COMPLIANCE & ACCREDITATION DOCK */}
        <div className="py-4 sm:py-5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-slate-900 font-bold text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Enterprise Standards:</span>
            </span>
            {(footer.badges ?? []).map((badge) => (
              <span
                key={badge}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold shadow-2xs"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <Server className="w-3.5 h-3.5 text-emerald-600" />
            <span>Edge Infrastructure: Next.js 16 + Cloudflare Tier 1</span>
          </div>
        </div>

        {/* 5. GIGANTIC WATERMARK BRAND TYPOGRAPHY */}
        <div className="pt-8 pb-3 text-center overflow-hidden pointer-events-none opacity-5 select-none">
          <div className="text-[12vw] sm:text-[14vw] font-black uppercase tracking-[0.08em] leading-none text-slate-900">
            DIVANEX
          </div>
        </div>

        {/* 6. BOTTOM TELEMETRY BAR */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-500 font-mono">
          <div className="text-center md:text-left space-y-0.5">
            <div suppressHydrationWarning>
              {(footer.copyrightText ?? "© {year} {name}. All rights reserved.")
                .replace("{year}", String(currentYear))
                .replace("{name}", footer.copyrightName ?? "")}
            </div>
            <div className="text-[11px] text-slate-500">
              Contractually assigned IP transfer on 100% of custom software deliverables.
            </div>
          </div>

          {/* Quick Jump Routing Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600">
            {bottomLinks.map((link) => (
              <span key={link.id} className="inline-flex items-center gap-4">
                <Link href={link.href} className="hover:text-sky-600 transition-colors">
                  {link.label}
                </Link>
                <span>•</span>
              </span>
            ))}
            <Link href="/admin" className="text-slate-600 hover:text-sky-600 transition-colors inline-flex items-center gap-1 font-semibold">
              <span>Admin Console</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 border border-sky-300 text-sky-700">PRO</span>
            </Link>
          </div>

          {/* Right Status Badge & Smooth Scroll Rocket Button */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-700 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>TLS 1.3 Strict</span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-sky-700 flex items-center justify-center transition-all hover:scale-105 shadow-xs cursor-pointer"
              aria-label="Scroll to top of page"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
