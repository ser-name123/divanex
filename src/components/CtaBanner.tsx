"use client";

import Link from "next/link";
import { ArrowRight, Briefcase, MessageCircle, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { usePageContent } from "@/context/SiteContentContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import RichText from "@/components/RichText";

interface CtaBannerProps {
  onOpenConsultation?: () => void;
  /**
   * The page this banner sits on, e.g. "/services". If the admin console has
   * copy for that route it replaces the site-wide headline.
   */
  route?: string;
}

/**
 * Closing call-to-action, shown at the foot of most pages.
 *
 * The copy, both buttons and the WhatsApp number are admin-managed; they were
 * default prop values here, which meant the banner said something different
 * depending on whether a page happened to override them.
 */
export default function CtaBanner({
  onOpenConsultation: _onOpenConsultation,
  route,
}: CtaBannerProps) {
  const content = usePageContent();
  const override = route ? content.ctaOverrides?.[route] : undefined;
  const banner = { ...content.ctaBanner, ...(override ?? {}) };
  const whatsapp = useSiteConfig().whatsappNumber.replace(/[^0-9]/g, "");
  return (
    <section className="relative py-6 lg:py-8 bg-slate-50/50 border-t border-slate-200/80 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="reveal-init rounded-3xl border border-sky-200 p-6 sm:p-8 lg:p-10 bg-white shadow-xl shadow-sky-950/5 relative overflow-hidden text-center max-w-5xl mx-auto">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/60 rounded-full blur-3xl pointer-events-none"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 mb-6 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase tracking-wider">{banner.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            {banner.title}{" "}
            <span className="gradient-text font-semibold">{banner.highlight}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-4 mb-8 font-normal">
            <RichText inline value={banner.subtitle} />
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={banner.primaryHref}
              className="btn-futuristic-primary text-sm sm:text-base !py-3.5 !px-7 !rounded-2xl"
            >
              <span>{banner.primaryLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href={banner.secondaryHref}
              className="btn-futuristic-amber text-sm sm:text-base !py-3.5 !px-7 !rounded-2xl"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span>{banner.secondaryLabel}</span>
            </Link>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-futuristic-glass text-sm sm:text-base !py-3.5 !px-6 !rounded-2xl"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

          {/* SLA badges */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-700 font-mono font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% IP & Code Transfer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-sky-600" />
              <span>24-Hour Scope Response</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
