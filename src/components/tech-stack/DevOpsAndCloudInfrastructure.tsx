"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Cloud, Terminal } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Infrastructure Reliability",
  "title": "DevOps &",
  "highlight": "Cloud Infrastructure",
  "description": "Deployments that scale from 10 to 1,000,000 requests per minute without human intervention. We engineer infrastructure for maximum uptime and minimal cloud cost."
};

const DEFAULT_ITEMS = [
    {
      title: "Infrastructure as Code (IaC)",
      tech: "Terraform & Pulumi",
      desc: "Reproducible multi-environment provisioning (Development, Staging, Production) with version-controlled state files."
    },
    {
      title: "Container Orchestration",
      tech: "Docker & AWS ECS / EKS",
      desc: "Microservice cluster isolation, horizontal auto-scaling triggers based on CPU/RAM metrics, and self-healing pods."
    },
    {
      title: "Edge Delivery Network & WAF",
      tech: "Cloudflare Workers & Fastly",
      desc: "Global CDN asset caching, DDoS mitigation, rate-limiting, and geo-distributed DNS routing with SSL/TLS termination."
    },
    {
      title: "Observability & APM Telemetry",
      tech: "Datadog, Sentry & Prometheus",
      desc: "Real-time error tracking, distributed request tracing, log aggregation, and automated Slack alert escalation."
    }
  ];

export default function DevOpsAndCloudInfrastructure() {
  const { heading, items: infra } = useSection("tech/devops", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Cloud className="w-3.5 h-3.5 text-blue-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infra.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-sky-600 shrink-0 mt-1 shadow-2xs">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-sky-700 font-bold mb-1">{item.tech}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
