"use client";

import { useState } from "react";
import { usePageContent } from "@/context/SiteContentContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { HelpCircle, ChevronDown, MessageCircle } from "lucide-react";
import RichText from "@/components/RichText";

export default function FAQSection() {
  // Admin-managed: the questions, the heading above them, and the WhatsApp
  // number in the footer card were all literals in this file.
  const content = usePageContent();
  const faqs = content.faqs ?? [];
  const heading = content.faqHeading;
  const whatsapp = useSiteConfig().whatsappNumber.replace(/[^0-9]/g, "");

  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faqs" className="scroll-mt-24 relative py-8 lg:py-10 bg-slate-50/50 overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>{heading.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            {heading.title}{" "}
            <span className="gradient-text font-semibold">{heading.highlight}</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            <RichText inline value={heading.description} />
          </p>
        </div>

        {/* Accordion List */}
        <div className="reveal-init reveal-delay-1 mt-6 sm:mt-8 space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? "border-sky-300 bg-white shadow-md shadow-sky-500/5 ring-1 ring-sky-200"
                    : "border-slate-200 hover:border-slate-300 bg-white shadow-xs"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 border border-sky-200 font-mono">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-600 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    <RichText value={faq.answer} className="space-y-2" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Ask Question CTA */}
        <div className="mt-12 rounded-2xl border border-emerald-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-emerald-50/50 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-2xs">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Have a specific question not listed here?</div>
              <div className="text-xs text-slate-600 font-medium">Chat directly with our senior solutions architect.</div>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsapp}?text=Hi%20Divanex%20team,%20I%20have%20a%20question%20regarding%20my%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
