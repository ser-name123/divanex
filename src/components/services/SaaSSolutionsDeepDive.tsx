"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  Database,
  Zap,
  Layers,
  RefreshCw,
  Key
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "SAAS ARCHITECTURE MATRIX",
  "title": "Architected for",
  "highlight": "Multi-Tenant Scale",
  "description": "We don't just write frontend wrappers. We engineer deep cloud primitives designed to support millions in monthly recurring revenue without architectural rewrites."
};

const DEFAULT_ITEMS = [
    {
      icon: Database,
      title: "Isolated PostgreSQL Schema Tenancy",
      desc: "Every tenant gets dedicated database schema isolation, preventing cross-tenant data leakage with GDPR & HIPAA-ready privacy safeguards.",
      stat: "Zero Data Leakage"
    },
    {
      icon: RefreshCw,
      title: "Metered Billing & Stripe Webhooks",
      desc: "Native integration with Stripe Billing, Razorpay, and Lemon Squeezy with automated tier upgrades, invoice generation, and dunning management.",
      stat: "100% Automated"
    },
    {
      icon: Key,
      title: "Granular Role-Based Access (RBAC)",
      desc: "Enterprise SSO (SAML / Okta), Multi-Factor Authentication (MFA), and customizable permission policies for organizations with 1,000+ seats.",
      stat: "SSO & SAML Ready"
    },
    {
      icon: Zap,
      title: "Sub-20ms Redis Caching Fabric",
      desc: "Multi-tiered Redis cache invalidation and distributed locking ensure lightning-fast read operations under million-user traffic spikes.",
      stat: "< 20ms Latency"
    }
  ];

export default function SaaSSolutionsDeepDive() {
  const { heading, items: saasFeatures } = useSection("services/saas-deep-dive", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {saasFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="reveal-init bg-slate-50/70 rounded-3xl p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-xs font-mono font-bold text-sky-700 bg-sky-100/60 px-2.5 py-1 rounded-md inline-block uppercase tracking-wider">
                  {feat.stat}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
