"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import CodeOwnershipSection from "@/components/CodeOwnershipSection";
import { Lock, ShieldCheck, CheckCircle2, GitBranch, Cloud, Database, FileText, KeyRound, Sparkles, ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function NdaIpClient() {
  const lastUpdated = "September 2026";

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route="/nda" />

        {/* Section: Dedicated Code Ownership Showcase */}
        <CodeOwnershipSection />

        <section className="py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Immediate Execution</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Bilateral Non-Disclosure Before Any Architecture Review
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We routinely sign bilateral NDAs with international founders, enterprise CTOs, and healthcare organizations before inspecting existing codebases or sharing technical roadmaps.
                  </p>
                  
                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      href="/contact"
                      className="btn-futuristic-primary w-full !py-3 !px-4 text-xs font-bold text-center !rounded-xl flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Request Mutual NDA</span>
                    </Link>
                  </div>
                </div>

                {/* Index */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                    Legal Topics
                  </span>
                  <nav className="space-y-1.5">
                    <a href="#bilateral-nda" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      1. Bilateral Non-Disclosure Terms
                    </a>
                    <a href="#what-you-own" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      2. Complete 7-Pillar Asset Transfer
                    </a>
                    <a href="#trade-secrets" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      3. Non-Compete & Trade Secrets
                    </a>
                    <a href="#zero-lockin" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      4. Zero Vendor Lock-in Standards
                    </a>
                  </nav>
                </div>

              </div>
            </div>

            {/* Right Column: Full Contract Specifications */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: Bilateral NDA */}
              <div id="bilateral-nda" className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-sky-600" />
                  <span>1. Bilateral Non-Disclosure Terms</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Mutual Confidentiality Protocol
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    All proprietary information shared during discovery discussions, sprint planning, and architecture reviews is governed by strict mutual non-disclosure obligations:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Definition of Confidential Information:</strong> Business plans, proprietary algorithms, patient workflows, financial transaction mechanics, customer lists, API schemas, and unreleased feature roadmaps.</li>
                    <li><strong>Standard of Care:</strong> Divanex treats Client confidential material with the same strict standard of care it applies to its own core intellectual property.</li>
                    <li><strong>No Unauthorized Disclosure:</strong> Information is disclosed strictly to developer pod members directly assigned to your project who are bound by matching employment confidentiality agreements.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: 7 Pillars */}
              <div id="what-you-own" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>2. Full 7-Pillar Asset Transfer</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Everything We Build Is Transferred to You
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Unlike agencies that retain proprietary frameworks to lock clients into expensive maintenance retainers, Divanex executes a total asset transfer:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 not-prose">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>100% Source Code</span>
                      </span>
                      <p className="text-[11.5px] text-slate-600">TypeScript, Python, Go, and React Native source code with complete comments.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <GitBranch className="w-3.5 h-3.5 text-sky-600" />
                        <span>Git Repository Access</span>
                      </span>
                      <p className="text-[11.5px] text-slate-600">Direct GitHub / GitLab organization ownership with complete commit history.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-purple-600" />
                        <span>Databases & Schemas</span>
                      </span>
                      <p className="text-[11.5px] text-slate-600">PostgreSQL DDL, migration scripts, seeders, and vector indexing configurations.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Cloud className="w-3.5 h-3.5 text-teal-600" />
                        <span>Cloud Accounts</span>
                      </span>
                      <p className="text-[11.5px] text-slate-600">Direct AWS, GCP, Cloudflare, or Vercel accounts provisioned in your company name.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Trade Secrets */}
              <div id="trade-secrets" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>3. Trade Secret & Non-Compete Protections</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Protecting Your Competitive Advantage
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Divanex will never take your custom proprietary algorithms, specialized medical formulas, or bespoke financial scoring models and resell them to competing entities. Your custom codebase is uniquely yours.
                  </p>
                </div>
              </div>

              {/* Section 4: Zero Lock-in */}
              <div id="zero-lockin" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <KeyRound className="w-4 h-4 text-sky-600" />
                  <span>4. Zero Vendor Lock-In Standards</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Clean Architecture Any Senior Developer Can Run
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    We build on open, battle-tested modern standards (Next.js, Docker, PostgreSQL, OpenAPI). If your internal engineering team ever takes over the project, they will find modular codebases, automated CI/CD configurations, and comprehensive setup documentation that can be built and deployed in minutes.
                  </p>
                </div>
              </div>

              {/* Bottom Action Card */}
              <div className="pt-6 border-t border-slate-200">
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold text-slate-900">
                      Ready to Execute an NDA for Your Upcoming Project?
                    </h4>
                    <p className="text-xs text-slate-600">
                      We send our standard bilateral NDA within 1 hour or review your legal team&rsquo;s template.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                  >
                    <span>Request Bilateral NDA</span>
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
