"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import {
  Wrench,
  Terminal,
  GitBranch,
  Shield,
  Bell,
  Cloud,
  Monitor
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "DEVELOPER TOOLCHAIN",
  "title": "Our Modern",
  "highlight": "Tooling Ecosystem",
  "description": "We use industry-standard enterprise developer tools to ensure rapid velocity, automated testing, and seamless client collaboration."
};

const DEFAULT_ITEMS = [
    { category: "Sprint Management", tool: "Linear & Jira Software", desc: "Real-time issue tracking, sprint backlogs, and milestone burn-down velocity charts.", icon: Terminal },
    { category: "Version Control & CI/CD", tool: "GitHub Actions & GitLab", desc: "Automated test runs, security scans, and preview deployments on every pull request.", icon: GitBranch },
    { category: "Design Engineering", tool: "Figma & Design Systems", desc: "Tokenized design systems, responsive component libraries, and interactive high-fidelity prototypes.", icon: Monitor },
    { category: "Containerization", tool: "Docker & Kubernetes", desc: "Isolated development environments matching staging and production byte-for-byte.", icon: Cloud },
    { category: "Error Telemetry", tool: "Sentry & Datadog", desc: "24/7 crash reporting, distributed APM performance tracing, and live memory profiling.", icon: Bell },
    { category: "Security Scanning", tool: "SonarQube & Snyk", desc: "Continuous dependency vulnerability audits and OWASP static code analysis.", icon: Shield },
  ];

export default function ToolingEcosystem() {
  const { heading, items: tools } = useSection("process/tooling", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="relative py-20 lg:py-28 bg-white border-t border-slate-200 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="reveal-init bg-slate-50/70 rounded-3xl p-7 border border-slate-200 hover:border-sky-300 hover:bg-white hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-md border border-sky-200/60">
                    {t.category}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-sky-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {t.tool}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  {t.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
