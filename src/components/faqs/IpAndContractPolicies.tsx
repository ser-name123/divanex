"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { FileCheck, Lock } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Legal Governance",
  "title": "IP Ownership &",
  "highlight": "Contract Governance Policies",
  "description": "Complete legal clarity and peace of mind. Our agreements are straightforward, institutional, and founder-friendly."
};

const DEFAULT_ITEMS = [
    {
      title: "100% Intellectual Property Assignment",
      desc: "Upon milestone completion and invoice clearance, all custom code, architectural designs, algorithms, and documentation become your sole, exclusive intellectual property."
    },
    {
      title: "Mutual Non-Disclosure Agreement (NDA)",
      desc: "We sign a comprehensive bilateral NDA before reviewing proprietary PRDs, business models, or code repositories, protecting your trade secrets with strict legal remedies."
    },
    {
      title: "No Vendor Lock-In Frameworks",
      desc: "We build strictly with open-source industry standard runtimes (Next.js, Node, Python, PostgreSQL). We never inject proprietary, closed-source dependencies."
    },
    {
      title: "Direct GitHub Organization Transfer",
      desc: "All code repositories are initialized directly under your company's GitHub or GitLab organization with your internal team retaining administrative master keys."
    }
  ];

export default function IpAndContractPolicies() {
  const { heading, items: policies } = useSection("faqs/ip", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
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
          {policies.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-1 shadow-2xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
