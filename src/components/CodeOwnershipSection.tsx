"use client";

import Link from "next/link";
import { 
  ShieldCheck, 
  Code2, 
  GitBranch, 
  Database, 
  Cloud, 
  Palette, 
  FileText, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Lock 
} from "lucide-react";

const OWNERSHIP_ASSETS = [
  {
    icon: Code2,
    title: "100% Source Code",
    subtitle: "Zero proprietary lock-in",
    description: "Clean, modular, fully typed TypeScript, Python, or Go codebases. No encrypted libraries, no obfuscated logic.",
    tag: "Clean Code",
    color: "emerald"
  },
  {
    icon: GitBranch,
    title: "Full Git Repository",
    subtitle: "Complete commit history",
    description: "Entire version history, branches, automated CI/CD pipelines, and pull requests transferred to your GitHub or GitLab organization.",
    tag: "GitHub / GitLab",
    color: "sky"
  },
  {
    icon: Database,
    title: "Database & Schemas",
    subtitle: "Direct database access",
    description: "PostgreSQL schemas, ORM migrations (Prisma/Drizzle), seeders, and automated backup configurations with zero middleman traps.",
    tag: "All Data & Models",
    color: "teal"
  },
  {
    icon: Cloud,
    title: "Cloud & Hosting Accounts",
    subtitle: "Your cloud, your billing",
    description: "Infrastructure deployed directly to your AWS, GCP, Cloudflare, or Vercel accounts via repeatable Terraform IaC scripts.",
    tag: "Direct Cloud Root",
    color: "indigo"
  },
  {
    icon: Palette,
    title: "Design Files & UI Systems",
    subtitle: "Tokenized Figma workspaces",
    description: "Figma design files, component libraries, typography scale, vector assets, and responsive responsive layouts handed over completely.",
    tag: "Full Figma File",
    color: "purple"
  },
  {
    icon: FileText,
    title: "Architecture & Documentation",
    subtitle: "Comprehensive runbooks",
    description: "System architecture blueprints, OpenAPI / Swagger specifications, data flow diagrams, and step-by-step developer onboarding guides.",
    tag: "Swagger & Runbooks",
    color: "amber"
  },
  {
    icon: KeyRound,
    title: "Deployment & Credentials",
    subtitle: "Root administrative control",
    description: "Production environment keys, API integrations, DNS configurations, and SSL certificates transferred directly to your team.",
    tag: "Root Access",
    color: "rose"
  }
];

export default function CodeOwnershipSection() {
  return (
    <section className="relative py-12 lg:py-16 bg-slate-50/70 border-t border-slate-200 overflow-hidden select-none">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="reveal-init text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>100% INTELLECTUAL PROPERTY PLEDGE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-semibold tracking-tight text-slate-900">
            You Own <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0f7670] to-[#5c9556] font-bold">Everything</span> We Build
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            No proprietary lock-in, no hostage codebases, no hidden maintenance traps. From day one of milestone completion, every single asset belongs 100% to your company.
          </p>
        </div>

        {/* Ownership Grid + Agency Contrast Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left / Main Grid: 7 Ownership Asset Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {OWNERSHIP_ASSETS.map((asset, idx) => {
              const IconComp = asset.icon;
              return (
                <div
                  key={idx}
                  className={`reveal-init reveal-delay-${(idx % 3) + 1} rounded-2xl p-5 bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#0f7670] group-hover:scale-110 transition-transform shadow-2xs">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {asset.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0f7670] transition-colors">
                        {asset.title}
                      </h3>
                      <span className="text-[11px] font-mono font-medium text-slate-500 block mt-0.5">
                        {asset.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {asset.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Transferred To You</span>
                  </div>
                </div>
              );
            })}

            {/* Extra summary pill spanning if odd number */}
            <div className="reveal-init sm:col-span-2 md:col-span-2 rounded-2xl p-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block font-mono">
                    Mutual NDA & Direct IP Assignment
                  </span>
                  <span className="text-[11px] text-slate-600 block">
                    Legally enforceable contract clauses guaranteeing complete IP ownership from milestone sign-off.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Highlight Card: Comprehensive Ownership Standard Panel */}
          <div className="reveal-init lg:col-span-4 rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/40 border border-emerald-200/90 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0f7670] via-[#189a91] to-[#5c9556]" />
            
            {/* Background Subtle Ambient Glow */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-800 shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ZERO VENDOR LOCK-IN</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-emerald-700 shadow-2xs">
                  Day-1 Transfer
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  Why Code Ownership Is Our Core Standard
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1.5">
                  Traditional agencies often retain code in private repositories or charge heavy exit fees. We believe your software cannot scale on rented foundations.
                </p>
              </div>

              {/* Highlight callout */}
              <div className="p-3 rounded-xl bg-white/95 border border-emerald-200/80 shadow-2xs flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <p className="text-emerald-950 font-semibold text-xs leading-snug">
                  You receive full intellectual property rights, root cloud access, and complete repository ownership.
                </p>
              </div>

              {/* 5 Concrete Guarantees */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct GitHub / GitLab organization root admin invite</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Cloud accounts &amp; billing created directly in your name</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Readable, fully-typed standard codebases without locked blobs</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>PostgreSQL schemas, ORM migrations &amp; automated seeders</span>
                </div>
                <div className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>OpenAPI Swagger specifications &amp; developer runbooks</span>
                </div>
              </div>

              {/* 3 Telemetry Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-100">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-center space-y-0.5 shadow-2xs">
                  <span className="text-base font-bold text-emerald-700 font-mono block">100%</span>
                  <span className="text-[10px] text-slate-600 font-mono block leading-tight">IP Transfer</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-center space-y-0.5 shadow-2xs">
                  <span className="text-base font-bold text-sky-700 font-mono block">0%</span>
                  <span className="text-[10px] text-slate-600 font-mono block leading-tight">Vendor Lock</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-center space-y-0.5 shadow-2xs">
                  <span className="text-base font-bold text-[#0f7670] font-mono block">30-Day</span>
                  <span className="text-[10px] text-slate-600 font-mono block leading-tight">Hypercare</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-emerald-100">
              <Link
                href="/contact"
                className="btn-futuristic-primary w-full !py-3.5 !px-5 text-xs sm:text-sm font-bold !rounded-xl text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Book a Consultation with 100% IP Transfer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
