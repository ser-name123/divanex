"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { Users } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "HOW WE WORK // INSIDE THE TEAM",
  "title": "Who Actually",
  "highlight": "Writes Your Code",
  "description": "Software is a craft with boring, unglamorous standards behind it. We would rather ship something maintainable in week nine than something impressive in week three that nobody can change afterwards."
};

const DEFAULT_ITEMS = [
    {
      title: "The Same People You Met",
      desc: "The engineers in your first call are the ones on the project. Nobody gets swapped for a cheaper pair of hands once the contract is signed.",
    },
    {
      title: "You Can Look At Anything",
      desc: "Pull requests, review comments, the issue board — open to you throughout. When something is going badly you will see it in the same week we do.",
    },
    {
      title: "Nothing Merges Unreviewed",
      desc: "Every change is read by a second engineer before it reaches staging. It slows us down slightly and it catches the bugs that are expensive later.",
    }
  ];

export default function EngineeringCulture() {
  const { heading, items: standards } = useSection("why-us/culture", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>{heading.eyebrow}</span>
          </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {heading.title}{" "}
            <span className="gradient-text font-bold">{heading.highlight}</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              <RichText inline value={heading.description} />
            </p>
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
              ✦ The people on your project have been writing production software for 7+ years
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="reveal-init bg-slate-50/70 rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-2 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-100/80 border border-sky-200 flex items-center justify-center text-sky-700 font-extrabold font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {std.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium pl-11 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
