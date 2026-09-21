"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import RichText from "@/components/RichText";
import { Icon } from "@/lib/iconRegistry";
import type { LegalCard, LegalDocument } from "@/data/legalPages";

/**
 * Renders a legal page.
 *
 * Privacy, terms, cookies, NDA and refunds were five components with the same
 * layout written five times, so a change to the index or the summary card had
 * to be repeated five times and usually was not. This is that layout once, and
 * the pages are now rows an operator can edit.
 *
 * The index is derived from the sections rather than stored beside them. A
 * hand-kept index is a list that eventually disagrees with the page it indexes
 * — which is what happened here, where one page's index named a section the
 * page did not have.
 */

const TONES: Record<string, { icon: string; pill: string }> = {
  sky: { icon: "text-sky-600", pill: "bg-sky-50 text-sky-700 border-sky-200" },
  emerald: { icon: "text-emerald-600", pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  amber: { icon: "text-amber-600", pill: "bg-amber-50 text-amber-800 border-amber-200" },
  slate: { icon: "text-slate-600", pill: "bg-slate-100 text-slate-700 border-slate-200" },
};

function CardBlock({ card }: { card: LegalCard }) {
  const tone = TONES[card.tone || "sky"] ?? TONES.sky;

  return (
    <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs space-y-2">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          {card.icon && <Icon name={card.icon} className={`w-4 h-4 ${tone.icon}`} />}
          <span>{card.title}</span>
        </h3>
        {card.badge && (
          <span
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${tone.pill}`}
          >
            {card.badge}
          </span>
        )}
      </div>
      <RichText
        value={card.body}
        className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal"
      />
    </div>
  );
}

export default function LegalDocumentView({
  route,
  document,
}: {
  /** The page path, for the shared header record. */
  route: string;
  document: LegalDocument;
}) {
  const sections = document.sections || [];

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />
      <Navbar />

      <main>
        <PageHeader route={route} />

        <section id="policy" className="scroll-mt-24 py-16 sm:py-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{document.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {document.summaryTitle}
                  </h3>
                  <RichText
                    value={document.summaryBody}
                    className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal"
                  />
                  {document.stamp && (
                    <div className="pt-2 text-[11px] font-mono text-slate-500 border-t border-slate-100">
                      <span>{document.stamp}</span>
                    </div>
                  )}
                </div>

                {sections.length > 0 && (
                  <div className="rounded-3xl p-6 bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block pb-1 border-b border-slate-100">
                      {document.indexTitle}
                    </span>
                    <nav className="space-y-1.5">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block text-slate-600 hover:text-sky-700 transition-colors py-1"
                        >
                          {section.eyebrow}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className={
                    index === 0
                      ? "scroll-mt-28 space-y-4 pt-2"
                      : "scroll-mt-28 space-y-4 pt-6 border-t border-slate-200"
                  }
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-800 uppercase tracking-wider">
                    {section.icon && <Icon name={section.icon} className="w-4 h-4 text-sky-600" />}
                    <span>{section.eyebrow}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {section.heading}
                  </h2>

                  {section.body?.trim() && (
                    <RichText
                      value={section.body}
                      className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed space-y-3 font-normal"
                    />
                  )}

                  {section.cards && section.cards.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {section.cards.map((card) => (
                        <CardBlock key={card.id} card={card} />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {document.cta && (
                <div id="contact" className="scroll-mt-28 pt-6 border-t border-slate-200">
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center sm:text-left">
                      <h4 className="text-base font-bold text-slate-900">{document.cta.title}</h4>
                      <p className="text-xs text-slate-600">{document.cta.body}</p>
                    </div>

                    <Link
                      href={document.cta.href}
                      className="btn-futuristic-primary !py-2.5 !px-5 text-xs sm:text-sm font-semibold !rounded-xl shrink-0"
                    >
                      <span>{document.cta.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
