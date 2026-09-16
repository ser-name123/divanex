"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  ShieldCheck,
  Key,
  Lock,
  FileCode
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Zero-Trust Hardening",
  "title": "Security &",
  "highlight": "Encryption Stack",
  "description": "Security isn't an afterthought. Every layer of our stack is hardened against modern attack vectors from Day 1."
};

const DEFAULT_ITEMS = [
    {
      icon: Lock,
      title: "AES-256 & TLS 1.3 Encryption",
      detail: "Hardware-level encryption for all database volumes, S3 storage buckets, and end-to-end TLS 1.3 socket cipher enforcement."
    },
    {
      icon: Key,
      title: "Zero-Trust Auth & OAuth2 / OIDC",
      detail: "Stateless JWT tokens with short expiration windows, refresh token rotation, and multi-factor biometric authentication options."
    },
    {
      icon: FileCode,
      title: "Automated SAST & Dependency Auditing",
      detail: "GitHub Actions integrated with Snyk, Trivy, and SonarQube to block merge requests that introduce CVE security vulnerabilities."
    },
    {
      icon: ShieldCheck,
      title: "OWASP Top 10 Hardened Headers",
      detail: "Configured Content Security Policy (CSP), HSTS preloading, XSS sanitization, and parameterized SQL queries preventing injection attacks."
    }
  ];

export default function SecurityAndEncryptionStack() {
  const { heading, items: securityLayers } = useSection("tech/security", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {layer.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {layer.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
