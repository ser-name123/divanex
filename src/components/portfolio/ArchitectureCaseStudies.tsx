"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import Link from "next/link";
import { Layers, ArrowRight, ArrowUpRight, Cpu, Server, ShieldCheck } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Technical Deep-Dives",
  "title": "Complex Engineering Challenges:",
  "highlight": "Architectural Case Studies",
  "description": "Beyond pretty interfaces: real distributed systems, concurrency bottlenecks solved, and mission-critical reliability delivered."
};

const DEFAULT_ITEMS = [
    {
      slug: "fynito",
      title: "Hyperlocal Real-Time Rider Telemetry HUD",
      sector: "Food & Logistics",
      icon: Cpu,
      challenge: "Handling high-concurrency rider GPS streams and low-latency kitchen order state transitions.",
      solution: "Engineered Node.js worker clusters backed by Socket.io and Redis Pub/Sub geospatial clustering.",
      metrics: "<120ms live map latency, high-throughput delivery architecture."
    },
    {
      slug: "evtor",
      title: "OCPP 2.0.1 Connected EV Telemetry Gateway",
      sector: "IoT & Mobility",
      icon: Server,
      challenge: "Standardizing heterogeneous EV charging station firmware with sub-second QR charge session triggering.",
      solution: "Universal OCPP 2.0.1 WebSocket broker ingesting real-time meter telemetry into TimescaleDB.",
      metrics: "High-availability telemetry SLA, <2.5s QR charge flow."
    },
    {
      slug: "magnus-partners",
      title: "HIPAA & ABDM Clinical Case Sharing Pipeline",
      sector: "HealthTech & MedAI",
      icon: ShieldCheck,
      challenge: "Secure multi-hospital clinical consultation exchange with zero patient health information leakage.",
      solution: "HL7 FHIR v4 data pipeline, PostgreSQL row-level security, and encrypted DICOM radiology viewer.",
      metrics: "Multi-hospital network, HIPAA-ready clinical architecture."
    }
  ];

export default function ArchitectureCaseStudies() {
  const { heading, items: caseStudies } = useSection("portfolio/architecture", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => {
            const Icon = cs.icon;
            return (
              <Link
                key={cs.slug}
                href={`/portfolio/${cs.slug}`}
                className="group p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-800">
                      {cs.sector}
                    </span>
                    <Icon className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors flex items-center justify-between gap-2">
                    <span>{cs.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <p>
                      <strong className="text-slate-900 font-bold">Challenge:</strong> {cs.challenge}
                    </p>
                    <p>
                      <strong className="text-slate-900 font-bold">Solution:</strong> {cs.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-semibold text-sky-700">
                  <span className="truncate pr-2">IMPACT: {cs.metrics}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-sky-700 group-hover:translate-x-1 transition-transform shrink-0">
                    Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
