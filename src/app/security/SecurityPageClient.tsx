"use client";

import { useSection } from "@/lib/useSection";
import { useSiteConfig } from "@/context/SiteConfigContext";
import RichText from "@/components/RichText";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { ShieldCheck, Lock, Server, CheckCircle2, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  eyebrow: "DEFENSE IN DEPTH",
  title: "Multi-Layered Security Infrastructure",
  highlight: "",
  description:
    "Every layer of our software lifecycle is hardened against sophisticated attack vectors, unauthorized inspection, and zero-day threats.",
};

const DEFAULT_ITEMS = [
    {
      icon: Lock,
      title: "Zero-Trust Data Protection",
      badge: "DATA ENCRYPTION",
      description: "All customer records, database shards, and sensitive credentials are encrypted using AES-256-GCM at rest and TLS 1.3 in transit with automated secret rotation.",
      points: [
        "Row-Level Security (RLS) partition boundaries",
        "Hardware Security Module (HSM) key storage",
        "Zero plaintext password or token logging",
        "Zero cross-tenant data leakage guarantees"
      ]
    },
    {
      icon: Server,
      title: "Network & Ingress Defense",
      badge: "DEEP PACKET FIREWALL",
      description: "Distributed edge proxy with real-time threat signature matching, sliding-window rate limiters, and automated bot vulnerability scanner blocking.",
      points: [
        "Real-time SQLi, XSS, and Path Traversal filters",
        "Malicious scanner (sqlmap, nikto) auto-drop",
        "Sliding-window IP rate limiting against DoS",
        "CSRF and Origin header cryptographic validation"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance Suite",
      badge: "GLOBAL STANDARDS",
      description: "Engineered from the ground up to comply with the most stringent global healthcare, fintech, and data sovereignty compliance mandates.",
      points: [
        "HIPAA & ABDM Health ID compliance ready",
        "PCI-DSS–aware tokenized payment gateways",
        "ISO 27001–Aligned Information Security Controls",
        "GDPR & CCPA strict right-to-be-forgotten"
      ]
    },
    {
      icon: Terminal,
      title: "Client-Side DevTools Guard",
      badge: "BROWSER PROTECTION",
      description: "Continuous in-browser anti-tampering protection shielding user sessions from Self-XSS, prototype pollution, and malicious iframe clickjacking.",
      points: [
        "Object and Array prototype sealing",
        "Anti-Clickjacking automatic iframe breakout",
        "Memory hygiene clearing runtime credentials",
        "Automated CSP violation telemetry logging"
      ]
    }
  ];

export default function SecurityPageClient() {
  const siteConfig = useSiteConfig();

  const { heading, items: securityPillars } = useSection("security/pillars", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: Page Header */}
        <PageHeader route="/security" />

        {/* Section 2: Four Core Security Pillars */}
        <section className="py-20 max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200">
              {heading.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {heading.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              <RichText inline value={heading.description} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                    <p className="text-slate-600 text-sm mt-2 leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    {pillar.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Vulnerability Disclosure Program (VDP) */}
        <section id="vdp" className="py-16 bg-slate-50 border-t border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="space-y-3 text-center">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                RESPONSIBLE DISCLOSURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Vulnerability Disclosure Program (VDP)
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We welcome responsible security researchers to audit our public endpoints and software packages. We commit to reviewing all security reports within 24 hours.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-mono block">SECURITY CONTACT</span>
                  <span className="text-sm font-bold text-sky-800 font-mono">{siteConfig.securityEmail}</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs text-slate-500 font-mono block">TRIAGE SLA</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">Under 24 Hours Response</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
                <h4 className="font-bold text-slate-900 uppercase font-mono text-xs">Disclosure Guidelines:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                  <li>Do not access, modify, or destroy user data or system integrity.</li>
                  <li>Do not execute denial-of-service (DoS/DDoS) attacks or spam form endpoints.</li>
                  <li>Give our engineering team reasonable time (at least 14 days) to remediate before public disclosure.</li>
                  <li>Valid zero-day reports qualify for recognition in our Security Hall of Fame.</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-mono">PGP Fingerprint: 4E91 B7A2 88FC 1943 00DE</span>
                <Link
                  href="/contact"
                  className="btn-futuristic-primary !py-2.5 !px-5 text-xs flex items-center gap-1.5"
                >
                  <span>Submit Security Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
