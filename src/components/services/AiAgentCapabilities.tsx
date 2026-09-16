"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Bot, Cpu } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "AI NEURAL WORKFLOWS",
  "title": "Autonomous",
  "highlight": "AI Agents & RAG Systems",
  "description": "Move beyond simple ChatGPT wrappers. We build enterprise-grade intelligence layers with real vector stores, self-hosted models, and structured business task automation."
};

const DEFAULT_ITEMS = [
    {
      title: "Private Vector Search (RAG)",
      desc: "Connect your enterprise knowledge base to private embeddings in Pinecone or pgvector with strict semantic caching for sub-50ms retrieval.",
      badge: "Sub-50ms RAG"
    },
    {
      title: "Autonomous Multi-Agent Swarms",
      desc: "LangGraph and CrewAI workflows where specialized agents plan, review code, execute SQL queries, and synthesize executive reports autonomously.",
      badge: "Autonomous Execution"
    },
    {
      title: "Grounded AI & Hallucination Mitigation",
      desc: "Multi-layered citation verification and strict prompt guardrails ensuring AI responses are grounded strictly in your proprietary documentation.",
      badge: "Citation-Backed"
    },
    {
      title: "Fine-Tuning & Open-Source LLMs",
      desc: "Self-hosted DeepSeek-R1, LLaMA-3, and Mistral models deployed on private Kubernetes GPUs for total data sovereignty and zero vendor lock-in.",
      badge: "On-Prem / Private Cloud"
    }
  ];

export default function AiAgentCapabilities() {
  const { heading, items: capabilities } = useSection("services/ai-agents", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/50 border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="reveal-init bg-white rounded-3xl p-7 border border-slate-200 hover:border-emerald-300 transition-all duration-300 space-y-4 group shadow-sm hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                  <Bot className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {cap.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
