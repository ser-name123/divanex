"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { Cookie, ShieldCheck, Lock, EyeOff, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CookiePolicyClient() {
  const lastUpdated = "September 2026";

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route="/cookies" />

        <section className="py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Summary Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Zero Ad Trackers</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Privacy-First Local Storage & Security Tokens
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Divanex uses strictly necessary browser cookies and local tokens to operate currency preferences, theme state, and secure admin sessions. We do not use cross-site advertising trackers or sell browsing data.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                    Cookie Topics
                  </span>
                  <nav className="space-y-1.5">
                    <a href="#what-are-cookies" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      1. What Are Cookies
                    </a>
                    <a href="#how-we-use" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      2. Types of Cookies We Use
                    </a>
                    <a href="#third-parties" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      3. Third-Party Services
                    </a>
                    <a href="#managing" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      4. Managing Cookie Settings
                    </a>
                  </nav>
                </div>

              </div>
            </div>

            {/* Right Column: Detailed Cookie Breakdown */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: What Are Cookies */}
              <div id="what-are-cookies" className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Cookie className="w-4 h-4 text-sky-600" />
                  <span>1. What Are Cookies & Local Storage</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Small State Identifiers in Your Browser
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Cookies and HTML5 LocalStorage are small text records placed on your device by websites you visit. They allow modern web applications to remember your session, preserve selected preferences (such as your chosen display currency), and ensure secure authenticated operations.
                  </p>
                </div>
              </div>

              {/* Section 2: Types We Use */}
              <div id="how-we-use" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>2. Exactly What Divanex Stores</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Strictly Functional & Performance Telemetry
                </h2>
                
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-sky-600" />
                        <span>A. Strictly Necessary & Security Tokens</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                        ESSENTIAL
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Required for basic site navigation, CSRF protection, admin console authentication, and ensuring interactive contact forms operate securely. These cannot be disabled without breaking website functionality.
                    </p>
                  </div>

                  <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-600" />
                        <span>B. Functional Preferences</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        PREFERENCES
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Stores your selected currency preference (e.g. USD, EUR, GBP, AED, INR) in `localStorage` so that prices across the services catalogue remain in your preferred denomination as you browse.
                    </p>
                  </div>

                  <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <EyeOff className="w-4 h-4 text-amber-600" />
                        <span>C. Zero Third-Party Advertising Cookies</span>
                      </h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        ZERO AD TRACKERS
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Divanex does not embed third-party advertising tracking pixels (like Meta Pixel, TikTok Pixel, or retargeting ad networks) that follow you across the internet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Managing */}
              <div id="managing" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>3. Managing Cookies in Your Browser</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Complete Browser-Level Control
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    You can restrict, block, or delete browser cookies and local storage items at any time through your browser settings (Chrome, Safari, Firefox, Edge). Please note that clearing local storage may reset your selected currency preference.
                  </p>
                </div>
              </div>

              {/* Bottom CTA Card */}
              <div className="pt-6 border-t border-slate-200">
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold text-slate-900">
                      Have Questions Regarding Privacy or Compliance?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Our security and privacy team is available to answer all enterprise data inquiries.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                  >
                    <span>Contact Privacy Team</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
