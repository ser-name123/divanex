"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  MessageSquare,
  Video,
  Globe2,
  Clock
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "COLLABORATION ARCHITECTURE",
  "title": "Transparent",
  "highlight": "Communication Protocols",
  "description": "We work as an organic extension of your internal engineering leadership. Here is how we communicate every single day."
};

const DEFAULT_ITEMS = [
    {
      icon: MessageSquare,
      title: "Direct Slack Connect",
      desc: "Real-time communication with the engineers actually writing your code. No middleman account managers playing telephone.",
      badge: "Real-Time Chat"
    },
    {
      icon: Video,
      title: "Bi-Weekly Screen Share Demos",
      desc: "Live walkthroughs of working staging builds every two weeks. You see tangible progress, test features, and guide development.",
      badge: "Every 2 Weeks"
    },
    {
      icon: Globe2,
      title: "Global Timezone Overlap",
      desc: "Coordinated overlap with US (EST/PST), UK (GMT), UAE (GST), and India (IST) business hours to ensure same-day feedback cycles.",
      badge: "4-6 Hours Overlap"
    },
    {
      icon: Clock,
      title: "Guaranteed Response SLAs",
      desc: "Under 15-minute response times during active business hours for urgent staging queries, and same-day PR turnarounds.",
      badge: "< 15 Mins SLA"
    }
  ];

export default function CommunicationProtocols() {
  const { heading, items: channels } = useSection("why-us/communication", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
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
          {channels.map((chan, idx) => {
            const Icon = chan.icon;
            return (
              <div
                key={idx}
                className="reveal-init rounded-3xl p-7 bg-slate-50/70 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all text-sky-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-sky-100/80 text-sky-800 border border-sky-200">
                    {chan.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {chan.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {chan.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
