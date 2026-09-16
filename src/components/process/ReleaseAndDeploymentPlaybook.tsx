"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Rocket } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Production Release Safety",
  "title": "Release & Deployment",
  "highlight": "Playbook",
  "description": "Deploying to production shouldn't be a high-stress event. Our automated pipeline guarantees zero downtime, automated rollbacks, and rock-solid reliability."
};

const DEFAULT_ITEMS = [
    {
      title: "Blue/Green Zero-Downtime Traffic Ingress",
      badge: "ZERO PACKET DROP",
      desc: "New Docker images are stood up in parallel green clusters. Cloudflare and Kubernetes ingress only cut over traffic once health check probes pass 100%."
    },
    {
      title: "Automated Rollback Circuit Breakers",
      badge: "< 60 SEC ROLLBACK",
      desc: "If HTTP 5xx error spikes or latency increases occur within the first 5 minutes post-deploy, automated Datadog webhooks instantly roll back to previous healthy revision."
    },
    {
      title: "Database Migration Zero-Lock Protocol",
      badge: "EXPAND / CONTRACT",
      desc: "All PostgreSQL schema alterations follow the dual-phase expand-and-contract pattern, ensuring backward compatibility with running instances during migrations."
    },
    {
      title: "Secrets Isolation & Runtime Environment Locks",
      badge: "VAULT ENCRYPTED",
      desc: "Zero hardcoded keys. Production secrets are fetched dynamically from AWS Secrets Manager or HashiCorp Vault at container launch with automated key rotation."
    }
  ];

export default function ReleaseAndDeploymentPlaybook() {
  const { heading, items: steps } = useSection("process/release", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Rocket className="w-3.5 h-3.5 text-blue-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-sky-50 border border-sky-200 text-sky-800">
                    STAGE 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
                <span>GATEWAY: AUTOMATED PROBE</span>
                <span className="text-emerald-700 font-bold">PASSED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
