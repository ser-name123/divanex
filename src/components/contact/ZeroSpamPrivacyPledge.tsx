"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { ShieldCheck, Lock, MailCheck, UserX } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Integrity Guarantee",
  "title": "Our Zero Spam &",
  "highlight": "Privacy Pledge",
  "description": "We treat your privacy with the same architectural rigor as your software code."
};

const DEFAULT_ITEMS = [
    {
      icon: UserX,
      title: "No Pushy Sales Reps",
      desc: "You will never be contacted by commission-driven sales reps. Your inquiry is handled directly by experienced technical leads."
    },
    {
      icon: Lock,
      title: "Data Confidentiality",
      desc: "Your email, phone number, and project ideas are never sold, rented, or shared with third-party lead brokers."
    },
    {
      icon: MailCheck,
      title: "Zero Spam Policy",
      desc: "We do not enroll you in marketing newsletters or automated cold sequences. You only receive direct answers to your inquiry."
    },
    {
      icon: ShieldCheck,
      title: "Immediate Mutual NDA",
      desc: "We gladly sign our standard mutual non-disclosure agreement or your company's proprietary NDA prior to technical deep-dives."
    }
  ];

export default function ZeroSpamPrivacyPledge() {
  const { heading, items: points } = useSection("contact/privacy", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
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
          {points.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 mt-1 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
