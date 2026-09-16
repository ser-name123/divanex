"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Layers } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "FULL-STACK BREAKDOWN",
  "title": "Frontend, Backend &",
  "highlight": "Data Layer Anatomy",
  "description": "Every layer of our application architecture is carefully chosen to ensure optimal developer experience, developer velocity, and runtime reliability."
};

const DEFAULT_ITEMS = [
    {
      title: "Next.js 16 & React 19 App Router",
      category: "Frontend Layer",
      desc: "Server-side rendering (SSR), Streaming Server Components (RSC), and Turbopack for near-instant cold loads and 100/100 Google Lighthouse Core Web Vitals.",
      tags: ["React 19", "Server Components", "Turbopack", "TailwindCSS v4"]
    },
    {
      title: "Python FastAPI & Go Microservices",
      category: "Backend Engine",
      desc: "High-throughput asynchronous APIs capable of handling 50,000+ requests per second with automatic OpenAPI schema generation and native Pydantic validation.",
      tags: ["FastAPI", "Go / Golang", "gRPC", "tRPC"]
    },
    {
      title: "PostgreSQL & Pinecone Hybrid Storage",
      category: "Data & Vectors",
      desc: "Relational ACID transaction safety paired with pgvector and Pinecone serverless indexes for high-speed AI embeddings and semantic search.",
      tags: ["PostgreSQL 17", "pgvector", "Redis 7", "Pinecone"]
    },
    {
      title: "React Native Fabric & Flutter",
      category: "Mobile Runtimes",
      desc: "Universal iOS and Android apps compiled with native C++ bridges, CRDT offline-first data synchronization, and 120 FPS fluid gestures.",
      tags: ["React Native", "Flutter", "Hermes Engine", "SQLite"]
    }
  ];

export default function FrontendBackendDeepDive() {
  const { heading, items: layers } = useSection("tech/frontend-backend", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-2xs">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {layers.map((l, idx) => (
            <div
              key={idx}
              className="reveal-init rounded-3xl p-8 bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md border border-sky-200">
                  {l.category}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  Tier-1 Standard
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {l.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {l.desc}
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {l.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white border border-slate-200 text-slate-700"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
