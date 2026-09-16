"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Server,
  Terminal
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "ARCHITECTURAL PRINCIPLES",
  "title": "How We Architect for",
  "highlight": "Decade-Long Durability",
  "description": "Technology fads come and go. We build systems on bedrock engineering principles designed to scale gracefully from 1,000 to 10,000,000 users."
};

const DEFAULT_ITEMS = [
    {
      title: "End-to-End Type Safety",
      desc: "TypeScript strict mode from the database schema (Drizzle/Prisma) through the API layer (tRPC/FastAPI) to the UI components. Zero runtime undefined errors.",
      icon: Terminal
    },
    {
      title: "Edge Compute & Serverless First",
      desc: "We leverage edge CDN nodes across 300+ global points of presence to execute compute closest to your users, driving p95 response times under 40ms.",
      icon: Zap
    },
    {
      title: "Stateless Microservices",
      desc: "Core business logic is isolated into lightweight, auto-scaling stateless services with Docker and Kubernetes, backed by persistent distributed databases.",
      icon: Server
    },
    {
      title: "Zero Vendor Lock-In",
      desc: "All frameworks used (Next.js, FastAPI, PostgreSQL, Docker) are open-source and portable. You can host on AWS, GCP, Azure, or bare metal without rewriting code.",
      icon: ShieldCheck
    }
  ];

export default function ArchitecturePhilosophy() {
  const { heading, items: principles } = useSection("tech/philosophy", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
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
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="reveal-init rounded-3xl p-7 bg-white border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300 space-y-4 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all text-sky-600">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
