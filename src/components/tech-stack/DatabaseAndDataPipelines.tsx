"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Database } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Persistence & Data Flow",
  "title": "Database &",
  "highlight": "Real-Time Data Pipelines",
  "description": "Data integrity without speed bottlenecks. We configure dual-layer persistence engines combining relational guarantees with sub-millisecond edge caching."
};

const DEFAULT_ITEMS = [
    {
      name: "PostgreSQL & Supabase",
      role: "Primary Relational Core",
      badge: "ACID COMPLIANT",
      desc: "Robust relational data integrity, row-level security (RLS), custom indexing, and pgvector embeddings for hybrid transactional and vector queries."
    },
    {
      name: "Redis & Upstash",
      role: "Sub-Millisecond In-Memory Caching",
      badge: "< 1MS LATENCY",
      desc: "Session state synchronization, distributed locks, rate-limiting tokens, and lightning-fast edge cache warming for frequent API responses."
    },
    {
      name: "Pinecone & Qdrant",
      role: "Vector Search & Semantic RAG",
      badge: "HIGH-DIMENSIONAL",
      desc: "Instant cosine-similarity searches across billions of embeddings, powering autonomous AI agent contextual retrieval and enterprise semantic search."
    },
    {
      name: "ClickHouse & BigQuery",
      role: "Real-Time Event Analytics",
      badge: "PETABYTE SCALE",
      desc: "Columnar database architecture for real-time telemetry processing, financial transaction logs, and analytical user journey queries."
    }
  ];

export default function DatabaseAndDataPipelines() {
  const { heading, items: dbs } = useSection("tech/data", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Database className="w-3.5 h-3.5 text-sky-600" />
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
          {dbs.map((db, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-sky-100/80 border border-sky-200 text-sky-800">
                    {db.role}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                    {db.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {db.name}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {db.desc}
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500 font-medium">
                <span>REPLICATION: ACTIVE-REACTIVE</span>
                <span className="text-emerald-700 font-bold">ENCRYPTED AT REST</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
