"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  Users,
  Clock,
  MessageSquare,
  Laptop,
  FileCheck
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Founder & Stakeholder Time Investment",
  "title": "What We Need From You:",
  "highlight": "Client Involvement Guide",
  "description": "We respect your time. Our async-first workflows mean you don't sit in endless meetings—just high-leverage decision checkpoints that keep momentum surging."
};

const DEFAULT_ITEMS = [
    {
      icon: Clock,
      commitment: "30 Min / Week",
      title: "Sprint Planning & Prioritization",
      desc: "Review sprint goals on Linear, confirm user stories for the upcoming 14 days, and align business priorities with our tech lead."
    },
    {
      icon: Laptop,
      commitment: "45 Min / Bi-Weekly",
      title: "Live Interactive Staging Demo",
      desc: "Our engineers walk through testable features in live preview environments. You test user journeys, provide feedback, and sign off milestones."
    },
    {
      icon: MessageSquare,
      commitment: "5 Min / Daily (Async)",
      title: "Slack / WhatsApp Daily Digest",
      desc: "Read brief bullet-point updates from your dedicated pod: what was merged yesterday, today's targets, and any blocker resolutions."
    },
    {
      icon: FileCheck,
      commitment: "15 Min / Milestone",
      title: "Sign-Off & Code Repository Sync",
      desc: "Review automated test pass reports, inspect PRs, and authorize milestone release with clean Git sync directly to your private org."
    }
  ];

export default function ClientInvolvementGuide() {
  const { heading, items: rituals } = useSection("process/involvement", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/70 border-b border-slate-200 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase shadow-2xs">
            <Users className="w-3.5 h-3.5 text-sky-600" />
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
          {rituals.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="inline-block text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-lg bg-sky-100/80 text-sky-800 border border-sky-200 mb-1">
                    TIME: {r.commitment}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
