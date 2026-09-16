"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { Scale, ShieldCheck, CheckCircle2, Clock, Code2, Banknote, HelpCircle, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsPageClient() {
  const lastUpdated = "September 2026";

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route="/terms" />

        <section className="py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Quick Navigation Index & Terms Overview */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                {/* Highlights Card */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-sky-600" />
                    <span>Engineering Governance</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Transparent, Milestone-Based Client Agreement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    These Terms govern technical consulting, software architecture, custom application engineering, and dedicated developer pod engagements with Divanex Technologies.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                    <span>Effective Version: 2026.4 • Last Updated: {lastUpdated}</span>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                    Contract Sections
                  </span>
                  <nav className="space-y-1.5">
                    <a href="#engagement" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      1. Engagement & Service Scope
                    </a>
                    <a href="#proposals" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      2. SOWs & Sprint Deliverables
                    </a>
                    <a href="#ip" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      3. 100% IP & Code Ownership
                    </a>
                    <a href="#client-duties" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      4. Client Responsibilities
                    </a>
                    <a href="#billing" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      5. Milestone Billing & Escrow
                    </a>
                    <a href="#warranty" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      6. 60-Day Warranty & Hypercare
                    </a>
                    <a href="#liability" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      7. Liability & Indemnification
                    </a>
                    <a href="#governing" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      8. Governing Law & Mediation
                    </a>
                  </nav>
                </div>

              </div>
            </div>

            {/* Right Column: Full Terms Contract Documentation */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: Scope */}
              <div id="engagement" className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Code2 className="w-4 h-4 text-sky-600" />
                  <span>1. Engagement & Service Scope</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Software Engineering & Architecture Advisory
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Divanex Technologies (&ldquo;Divanex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides high-caliber custom software engineering, cloud architecture, mobile app development, SaaS engineering, and AI workflow integration services to corporate clients, startups, and institutions worldwide (&ldquo;Client&rdquo;, &ldquo;you&rdquo;).
                  </p>
                  <p>
                    All engineering engagements are executed under clear Statements of Work (SOWs), agile sprint backlogs, or dedicated team pod arrangements as formally agreed between the parties.
                  </p>
                </div>
              </div>

              {/* Section 2: SOWs & Deliverables */}
              <div id="proposals" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>2. Statements of Work & Sprint Milestones</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Agile Sprint Delivery Cadence
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Engineering is organized into defined sprint milestones (typically 14-day delivery cycles). Each milestone defines explicit deliverable criteria:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Live Staging Builds:</strong> Fully interactive, clickable staging URLs provided every week for verification.</li>
                    <li><strong>Automated Code Pass:</strong> All deliverables must pass automated linting, strict TypeScript checks, and security test suites before milestone sign-off.</li>
                    <li><strong>Review Window:</strong> Client has a standard 7-business-day acceptance review window following staging delivery to request adjustments within the agreed scope.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: 100% Code Ownership */}
              <div id="ip" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>3. 100% Intellectual Property & Source Code Transfer</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  You Own Everything We Build
                </h2>
                <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                  <p className="font-semibold text-emerald-950">
                    Comprehensive Intellectual Property Assignment:
                  </p>
                  <p>
                    Upon settlement of corresponding sprint milestone invoices, Divanex irrevocably assigns 100% of all intellectual property rights, copyrights, source code, database architectures, schema migrations, Figma design files, and deployment credentials created for the project exclusively to the Client. Divanex retains zero residual claims or licensing lock-in.
                  </p>
                </div>
              </div>

              {/* Section 4: Client Duties */}
              <div id="client-duties" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-sky-600" />
                  <span>4. Client Responsibilities & Collaboration</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Cooperative Agile Engineering
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Successful software delivery relies on direct, transparent collaboration:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Client agrees to designate a Primary Product Lead or Technical Stakeholder empowered to make scope and design decisions.</li>
                    <li>Providing necessary third-party API credentials, domain DNS access, or external service accounts in a timely manner.</li>
                    <li>Prompt review of staging builds to ensure continuous sprint velocity.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5: Billing & Escrow */}
              <div id="billing" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Banknote className="w-4 h-4 text-sky-600" />
                  <span>5. Milestone Billing & Payment Terms</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Transparent Invoicing & Milestone Security
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    We support direct international bank wire (SWIFT / ACH), Stripe, Razorpay, and verified platform milestone escrows:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Fixed-scope projects are billed in milestone tranches tied to delivered software features.</li>
                    <li>Invoices are payable upon milestone acceptance within net 7 business days unless specified otherwise in the SOW.</li>
                    <li>Transparent quote guarantee: No hidden software licensing seat charges or arbitrary maintenance fees.</li>
                  </ul>
                </div>
              </div>

              {/* Section 6: Warranty & Hypercare */}
              <div id="warranty" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>6. 60-Day Warranty & Post-Launch Hypercare</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Defect-Free Software Guarantee
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Every production software deployment is backed by our standard <strong>60-day Post-Launch Hypercare Warranty</strong>. If any bug, defect, or variance from the agreed technical specifications is identified within this window, our engineering team fixes it immediately at zero additional cost to the client.
                  </p>
                </div>
              </div>

              {/* Section 7: Limitation of Liability */}
              <div id="liability" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-sky-600" />
                  <span>7. Limitation of Liability & Warranties</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Standard Commercial Protections
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Except as expressly provided in the SOW and warranty clauses, software deliverables are provided &ldquo;as is&rdquo;. To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, consequential, or punitive damages. Total aggregate liability shall not exceed the total fees paid by Client under the specific SOW giving rise to the claim.
                  </p>
                </div>
              </div>

              {/* Section 8: Governing Law */}
              <div id="governing" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-sky-600" />
                  <span>8. Governing Law & Dispute Resolution</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Good-Faith Engineering Mediation
                </h2>
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold text-slate-900">
                      Need a Customized Enterprise MSA or Bilateral NDA?
                    </h4>
                    <p className="text-xs text-slate-600">
                      We execute custom Master Service Agreements tailored to corporate procurement guidelines.
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                  >
                    <span>Request Custom Contract</span>
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
