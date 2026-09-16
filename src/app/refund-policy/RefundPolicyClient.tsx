"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { CheckCircle2, ShieldCheck, Clock, Banknote, RefreshCw, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RefundPolicyClient() {
  const lastUpdated = "September 2026";

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route="/refund-policy" />

        <section className="py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Milestone Transparency</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Pay Only for Delivered & Verified Engineering
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Our milestone model eliminates financial risk: work is verified on clickable staging builds prior to milestone release, backed by our 60-day post-launch warranty.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                    <span>Effective Version: 2026.4 • Last Updated: {lastUpdated}</span>
                  </div>
                </div>

                {/* Index */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                    Policy Index
                  </span>
                  <nav className="space-y-1.5">
                    <a href="#milestones" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      1. Milestone-Based Billing Model
                    </a>
                    <a href="#verification" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      2. Acceptance & Staging Review
                    </a>
                    <a href="#cancellation" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      3. Project Cancellation & Phase Exit
                    </a>
                    <a href="#refund-terms" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      4. Refund Eligibility & Deposits
                    </a>
                    <a href="#hypercare-warranty" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      5. 60-Day Post-Launch Warranty
                    </a>
                  </nav>
                </div>

              </div>
            </div>

            {/* Right Column: Full Policy Details */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: Milestone Model */}
              <div id="milestones" className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Banknote className="w-4 h-4 text-sky-600" />
                  <span>1. Milestone-Based Engineering Model</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Structured Sprint-by-Sprint Payments
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Divanex operates on transparent milestone tranches agreed in your Statement of Work (SOW). Rather than demanding full upfront payment for complex multi-month platforms, payments are tied to delivered functional increments:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Phase 1: Architecture & UI/UX Sprint:</strong> Wireframes, database schema design, and interactive Figma prototypes.</li>
                    <li><strong>Phase 2: Core Feature & API Sprints:</strong> Working backend APIs, authentication, core database entities, and web/mobile UI.</li>
                    <li><strong>Phase 3: Integration, QA & Staging:</strong> Payment gateway webhooks, third-party integrations, security audits, and load testing.</li>
                    <li><strong>Phase 4: Production Deployment & Handover:</strong> DNS propagation, cloud infrastructure handover, and 60-day warranty initiation.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: Acceptance */}
              <div id="verification" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>2. Acceptance Testing & Staging Verification</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Verification on Clickable Staging Environments
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Every sprint deliverable is deployed to an isolated staging environment for Client inspection. Client has a standard 7-business-day acceptance review period to test newly completed features against the agreed user stories.
                  </p>
                  <p>
                    If any feature does not conform to the agreed SOW criteria, our engineering pod refactors and resolves it promptly before milestone sign-off.
                  </p>
                </div>
              </div>

              {/* Section 3: Cancellation */}
              <div id="cancellation" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <RefreshCw className="w-4 h-4 text-sky-600" />
                  <span>3. Project Cancellation & Sprint Exit Terms</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Clean Exit Rights at Any Sprint Boundary
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    We understand that business priorities can pivot. If you ever choose to pause or cancel a project:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>You may cancel at the completion of any milestone with written notice.</li>
                    <li>You retain <strong>100% ownership</strong> of all source code, design files, database schemas, and documentation delivered and paid for up to the exit date.</li>
                    <li>You will not be billed for subsequent unstarted sprint phases.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4: Refund Eligibility */}
              <div id="refund-terms" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>4. Refund Eligibility & Unused Retainers</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Transparent Handling of Milestone Funds
                </h2>
                <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                  <p className="font-semibold text-emerald-950">
                    Deposit & Retainer Refund Terms:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>If a project is cancelled prior to the commencement of technical discovery and engineering sprints, 100% of the initial sprint deposit is refunded.</li>
                    <li>For in-progress milestones, billing is calculated strictly on hours/deliverables completed; any unallocated pre-paid balance is refunded directly to your original payment method.</li>
                    <li>Milestone payments already approved and accepted following staging review are non-refundable, as corresponding intellectual property and source code have been transferred to the Client.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5: Warranty */}
              <div id="hypercare-warranty" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>5. 60-Day Post-Launch Hypercare Guarantee</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Zero Additional Charges for Defect Fixes
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    All delivered software includes our <strong>60-Day Post-Launch Warranty</strong>. If unexpected defects or errors within the original scope emerge after real traffic hits production, our team fixes them immediately without additional invoices or hourly ticketing charges.
                  </p>
                </div>
              </div>

              {/* Bottom Action Card */}
              <div className="pt-6 border-t border-slate-200">
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold text-slate-900">
                      Have Questions About Milestone Payments or SOW Terms?
                    </h4>
                    <p className="text-xs text-slate-600">
                      Speak directly with our technical leadership for transparent contract scoping.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                  >
                    <span>Book a Consultation</span>
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
