"use client";

import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { ShieldCheck, Lock, EyeOff, Server, Database, Globe, KeyRound, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function PrivacyPageClient() {
  const lastUpdated = "September 2026";

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route="/privacy" />

        <section className="py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Quick Navigation Index & Privacy Trust Highlights */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                {/* Trust Highlight Box */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Zero-Data-Monetization Pledge</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    Your Data Is Never Sold, Rented, or Monitored for Ads
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We are a dedicated software engineering partner, not an advertising network. All contact submissions, project specifications, source code, and customer records remain 100% confidential and under your ownership.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                    <span>Effective Version: 2026.4 • Last Updated: {lastUpdated}</span>
                  </div>
                </div>

                {/* Table of Contents Pill List */}
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                    Policy Index
                  </span>
                  <nav className="space-y-1.5">
                    <a href="#collection" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      1. Information We Collect
                    </a>
                    <a href="#usage" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      2. Purpose & Lawful Processing
                    </a>
                    <a href="#non-disclosure" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      3. Zero-Sale & Confidentiality
                    </a>
                    <a href="#security" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      4. Data Storage & Encryption
                    </a>
                    <a href="#rights" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      5. GDPR, CCPA & Global Rights
                    </a>
                    <a href="#retention" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      6. Data Retention & Deletion
                    </a>
                    <a href="#dpo" className="block text-slate-600 hover:text-sky-700 transition-colors py-1">
                      7. Contact Data Protection Officer
                    </a>
                  </nav>
                </div>

              </div>
            </div>

            {/* Right Column: Full Privacy Documentation */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Section 1: Information We Collect */}
              <div id="collection" className="space-y-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Database className="w-4 h-4 text-sky-600" />
                  <span>1. Information We Collect</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Direct Inquiries & Technical Scoping Data
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    When you contact Divanex Technologies through our website forms, WhatsApp links, or consultation schedulers, we collect information necessary to evaluate your engineering requirements and formulate technical proposals:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Contact Credentials:</strong> Full Name, Business Email, and Telephone / WhatsApp Number.</li>
                    <li><strong>Project Scoping Details:</strong> Target Core Service, Project Vision / Technical Requirements, Estimated Budget Range, and Target Launch Timeline.</li>
                    <li><strong>Client Engineering Metadata:</strong> When collaborating on active client repositories, access credentials, API keys, and server infrastructure parameters provided explicitly by the client under bilateral NDA.</li>
                    <li><strong>Privacy-Preserving Telemetry:</strong> Aggregated, anonymized performance metrics (HTTP latency, TLS handshake time, and device viewport) to ensure site reliability without tracking personal browsing history.</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: Purpose & Lawful Processing */}
              <div id="usage" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Server className="w-4 h-4 text-sky-600" />
                  <span>2. How We Use Your Information</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Strictly Engineering & Contractual Execution
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    We process information strictly on lawful contractual and legitimate business bases:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li>Evaluating feasibility, database schema architecture, and sprint timelines for your custom software or SaaS product.</li>
                    <li>Communicating directly between your technical leadership and our senior solutions architects via email, Slack, or video calls.</li>
                    <li>Executing legally binding Non-Disclosure Agreements (NDAs), Master Service Agreements (MSAs), and Statements of Work (SOWs).</li>
                    <li>Deploying, maintaining, and supporting production systems during hypercare and warranty periods.</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Zero-Sale & Confidentiality */}
              <div id="non-disclosure" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  <EyeOff className="w-4 h-4 text-emerald-600" />
                  <span>3. Zero Data Monetization & Strict Confidentiality</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  We Never Sell, Rent, or Trade Your Data
                </h2>
                <div className="rounded-2xl p-5 bg-emerald-50/70 border border-emerald-200 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
                  <p className="font-semibold text-emerald-950">
                    Our Ironclad Commercial Pledge:
                  </p>
                  <p>
                    Divanex Technologies has never sold, rented, or commercialized client data, contact lists, proprietary business ideas, or source code to third-party advertisers, data brokers, or AI training scrapers. All data shared with us is treated as strictly proprietary trade secret information under professional non-disclosure.
                  </p>
                </div>
              </div>

              {/* Section 4: Storage & Encryption */}
              <div id="security" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Lock className="w-4 h-4 text-sky-600" />
                  <span>4. Enterprise Storage & Encryption Standards</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Zero-Trust Architecture & AES-256 Encryption
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    All electronic communications and database records are safeguarded by enterprise-grade cryptographic controls:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Data in Transit:</strong> Encrypted using TLS 1.3 with strict HSTS and Perfect Forward Secrecy across all HTTP and WebSocket connections.</li>
                    <li><strong>Data at Rest:</strong> Stored in SOC 2 Type II and ISO 27001 certified cloud database clusters with AES-256-GCM encryption.</li>
                    <li><strong>Row-Level Isolation (RLS):</strong> Database architecture utilizes strict tenant partitioning ensuring zero cross-client inspection.</li>
                    <li><strong>Access Controls:</strong> Principle of Least Privilege (PoLP) enforced with biometric multi-factor authentication (MFA) on all developer workstations.</li>
                  </ul>
                </div>
              </div>

              {/* Section 5: GDPR, CCPA & Global Rights */}
              <div id="rights" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-sky-600" />
                  <span>5. GDPR, CCPA & Global Client Rights</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Your Statutory Data Rights
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Regardless of your geographic jurisdiction (European Union, United Kingdom, United States, UAE, Canada, or India), Divanex extends complete data rights to all prospective and active clients:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>Right to Access:</strong> You may request a complete copy of all personal and project data associated with your contact record.</li>
                    <li><strong>Right to Rectification:</strong> You may update or correct any inaccuracies in your recorded contact information at any time.</li>
                    <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You may request permanent deletion of all proposal submissions and communication archives.</li>
                    <li><strong>Right to Data Portability:</strong> All project artifacts, schemas, and documentation are provided in machine-readable standard formats (JSON, OpenAPI, SQL).</li>
                  </ul>
                </div>
              </div>

              {/* Section 6: Data Retention & Deletion */}
              <div id="retention" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <KeyRound className="w-4 h-4 text-sky-600" />
                  <span>6. Data Retention & Secure Discard</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Retention Periods & Automated Purging
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal">
                  <p>
                    Contact form submissions that do not proceed to active commercial contracts are archived and securely purged after 12 months unless explicit continuation of scoping is requested. For active client contracts, technical runbooks and billing records are retained as required by corporate statutory and tax regulations.
                  </p>
                </div>
              </div>

              {/* Section 7: Contact Data Protection Officer */}
              <div id="dpo" className="space-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-sky-600" />
                  <span>7. Data Protection Officer & Privacy Inquiries</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Direct Privacy Governance Channel
                </h2>
                <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h4 className="text-base font-bold text-slate-900">
                      Divanex Data Protection Officer (DPO)
                    </h4>
                    <p className="text-xs text-slate-600">
                      For data subject access requests, encryption verification, or bilateral NDA execution:
                    </p>
                    <div className="pt-1 flex items-center justify-center sm:justify-start gap-2 font-mono text-xs font-bold text-sky-700">
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      <span>security@divanextechnologies.com</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                  >
                    <span>Submit Privacy Request</span>
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
