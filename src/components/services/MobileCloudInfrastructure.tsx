"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Smartphone, CheckCircle2 } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Mobile & Cloud Runtime Foundation",
  "title": "High-Performance Mobile &",
  "highlight": "Cloud Infrastructure",
  "description": "Software built to withstand real-world enterprise load. We architect every mobile client and cloud backend for sub-second latency and seamless auto-scaling."
};

const DEFAULT_ITEMS = [
    {
      category: "Cross-Platform Mobile Engineering",
      badge: "60 FPS NATIVE FEEL",
      badgeColor: "text-sky-800 bg-sky-50 border-sky-200",
      description: "Production iOS and Android apps engineered with React Native and Flutter, featuring offline sync, hardware encryption, biometric authentication, and sub-100ms response times.",
      capabilities: [
        "Offline-first sync engine with SQLite / WatermelonDB",
        "Biometric authentication (FaceID, TouchID, Android Keystore)",
        "Zero-latency push notifications via Firebase & Apple APNs",
        "Universal design system matching Figma token specifications"
      ],
      metrics: { label: "App Store Rating Target", val: "4.8+" }
    },
    {
      category: "Cloud Native & DevOps Infrastructure",
      badge: "ZERO-DOWNTIME SCALE",
      badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200",
      description: "Enterprise-grade infrastructure as code (IaC) with Terraform, automated Kubernetes orchestration, multi-region failover, and automated CI/CD deployment pipelines.",
      capabilities: [
        "Terraform-managed AWS, GCP & DigitalOcean environments",
        "Kubernetes (EKS/GKE) horizontal pod auto-scaling (HPA)",
        "Zero-trust VPC networks with Cloudflare WAF perimeter",
        "Automated GitHub Actions CI/CD with security scanning"
      ],
      metrics: { label: "Deployment Uptime SLA", val: "99.99%" }
    }
  ];

export default function MobileCloudInfrastructure() {
  const { heading, items: stacks } = useSection("services/mobile-cloud", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Smartphone className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {stacks.map((stack, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-lg relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${stack.badgeColor}`}>
                    {stack.badge}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-mono text-slate-500 font-bold uppercase">{stack.metrics.label}:</span>
                    <span className="text-lg font-bold font-mono text-sky-700">{stack.metrics.val}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                  {stack.category}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                  {stack.description}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  {stack.capabilities.map((cap, cIdx) => (
                    <div key={cIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between text-xs text-slate-500 font-mono font-bold border-t border-slate-100">
                <span>STAGE: PRODUCTION-VERIFIED</span>
                <span className="text-sky-700">AUTOMATED CI/CD GATED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
