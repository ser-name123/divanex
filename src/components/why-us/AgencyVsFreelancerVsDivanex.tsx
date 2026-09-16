"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Check, X, Minus, Scale } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "THE HONEST COMPARISON",
  "title": "Where Each Option",
  "highlight": "Tends To Break",
  "description": "A freelancer, an agency and us are three different trade-offs, and all three are sometimes the right answer. Here is what usually goes wrong with each so you can pick knowingly."
};

const DEFAULT_ITEMS = [
    {
      vector: "Time to something usable",
      freelancers: "Fast if they are free, unpredictable if not",
      agencies: "Four to eight months, much of it in planning",
      divanex: "Six to ten weeks for a first working version",
    },
    {
      vector: "Who owns it afterwards",
      freelancers: "Usually you, if the repo and logins survive",
      agencies: "Their hosting, their framework, their terms",
      divanex: "Yours from week one, in your accounts",
    },
    {
      vector: "Who writes it",
      freelancers: "One person, nobody reviewing them",
      agencies: "Whoever is free, often behind a manager",
      divanex: "The seniors you met, reviewing each other",
    },
    {
      vector: "Getting hold of someone",
      freelancers: "Good until they take another contract",
      agencies: "Through an account manager, on their calendar",
      divanex: "Shared channel with the engineers",
    },
    {
      vector: "How you are billed",
      freelancers: "Hourly, and the hours grow",
      agencies: "Large monthly retainer regardless of output",
      divanex: "Fixed per milestone, agreed in advance",
    },
    {
      vector: "Six months after launch",
      freelancers: "Often unreachable",
      agencies: "Billable hours and a ticket queue",
      divanex: "Same engineers, small monthly arrangement",
    }
  ];

export default function AgencyVsFreelancerVsDivanex() {
  const { heading, items: comparisons } = useSection("why-us/comparison", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div className="grid grid-cols-4 p-5 bg-slate-50 border-b border-slate-200 text-xs font-mono tracking-wider uppercase">
              <div className="text-slate-700 font-semibold">What you are comparing</div>
              <div className="text-slate-600 font-medium text-center">A solo freelancer</div>
              <div className="text-slate-600 font-medium text-center">A traditional agency</div>
              <div className="text-sky-900 font-semibold text-center bg-sky-50 py-1 rounded">Working with us</div>
            </div>

            <div className="divide-y divide-slate-100">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 p-5 items-center hover:bg-slate-50 transition-colors text-xs sm:text-sm"
                >
                  <div className="font-semibold text-slate-900 pr-4">{row.vector}</div>
                  <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                    <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{row.freelancers}</span>
                  </div>
                  <div className="text-slate-600 text-center flex items-center justify-center gap-1.5 px-2 font-normal">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{row.agencies}</span>
                  </div>
                  <div className="text-sky-900 font-medium text-center flex items-center justify-center gap-1.5 px-2 bg-sky-50/80 py-2 rounded-lg border border-sky-200">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 font-bold" />
                    <span>{row.divanex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
