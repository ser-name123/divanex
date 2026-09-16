"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";
import CurrencySelector from "@/components/CurrencySelector";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "TRANSPARENT ENGAGEMENT TIERS",
  "title": "Predictable Investment",
  "highlight": "Tiers",
  "description": "No surprise billing, no runaway agency fees. Choose the tier that matches your product maturity."
};

const DEFAULT_ITEMS = [
    {
      name: "MVP Discovery & Build",
      cadence: "3-4 Weeks",
      price: "From $2,800",
      target: "Early-Stage Startups & Core Flow Validations",
      features: [
        "Scoped core feature build (1-2 primary user journeys)",
        "Full-stack Next.js web app or React Native MVP",
        "Authentication, relational database & API models",
        "Stripe or Razorpay payment setup",
        "Cloud deployment & 100% source code ownership"
      ],
      highlight: false
    },
    {
      name: "Growth Engine",
      cadence: "6-8 Weeks",
      price: "From $5,500",
      target: "Scaling Startups & Revenue SaaS",
      features: [
        "Multi-tenant PostgreSQL schema isolation",
        "Custom private RAG or LLM agent integration",
        "Granular RBAC and admin telemetry dashboard",
        "Kubernetes or Dockerized CI/CD pipelines",
        "30-day dedicated post-launch hypercare"
      ],
      highlight: true
    },
    {
      name: "Enterprise Mesh",
      cadence: "Dedicated Sprints",
      price: "Custom Scope",
      target: "High-Concurrency Scale & Enterprises",
      features: [
        "Multi-cloud Terraform (AWS, GCP, Cloudflare)",
        "Zero-trust security & SOC2 audit readiness",
        "Dedicated senior engineering pod with daily Slack",
        "High availability architecture with 24/7 telemetry",
        "Direct architect communication & sprint alignment"
      ],
      highlight: false
    }
  ];

export default function ServicesPricingTiers() {
  const { convertPriceString } = useCurrency();
  const { heading, items: tiers } = useSection("services/pricing-tiers", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>{heading.eyebrow}</span>
          </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`reveal-init rounded-3xl p-8 bg-white flex flex-col justify-between space-y-6 transition-all duration-300 border ${
                t.highlight
                  ? "border-sky-400 shadow-xl shadow-sky-950/5 ring-2 ring-sky-200 scale-[1.03]"
                  : "border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-lg"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">{t.name}</h3>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800">
                    {t.cadence}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-sky-700 font-sans">
                  {convertPriceString(t.price)}
                </div>
                <p className="text-xs font-medium text-slate-600">{t.target}</p>

                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  {t.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/contact"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-xs font-bold transition-all ${
                    t.highlight
                      ? "btn-futuristic-primary !rounded-xl"
                      : "bg-slate-900 hover:bg-sky-600 text-white border border-slate-900 hover:border-sky-600 shadow-sm"
                  }`}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
