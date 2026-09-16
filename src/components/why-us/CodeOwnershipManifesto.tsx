"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  GitBranch,
  Shield,
  Key,
  FileCheck,
  Lock
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "100% CODE SOVEREIGNTY",
  "title": "Our Code",
  "highlight": "Ownership Manifesto",
  "description": "Many traditional agencies trap clients by hosting apps on their internal servers or using proprietary CMSs. At Divanex, you own 100% of everything we build."
};

const DEFAULT_ITEMS = [
    {
      icon: GitBranch,
      title: "Direct Git Repository Transfer",
      desc: "All source code is committed directly to your GitHub/GitLab organization from Day 1. You hold the master keys at all times."
    },
    {
      icon: Lock,
      title: "Zero Proprietary Lock-In",
      desc: "We write clean, standard, idiomatic code without proprietary frameworks or black-box libraries. Any competent engineering team can pick it up immediately."
    },
    {
      icon: Key,
      title: "Root Infrastructure Access",
      desc: "Cloud accounts (AWS, GCP, Vercel, Supabase) are created under your organization. We deploy via your permissions, not our agency servers."
    },
    {
      icon: FileCheck,
      title: "Signed Legal Assignment",
      desc: "Full intellectual property assignment contracts legally transferring all copyright, patents, and trade secrets to your legal entity upon payment."
    }
  ];

export default function CodeOwnershipManifesto() {
  const { heading, items: points } = useSection("why-us/ownership", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-slate-50/70 border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
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
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="reveal-init bg-white rounded-3xl p-7 border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
