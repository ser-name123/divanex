"use client";

import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { DollarSign, CreditCard } from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Financial Logistics",
  "title": "Payment &",
  "highlight": "Invoicing Terms",
  "description": "Frictionless global billing tailored for early-stage startups and multinational enterprise accounting teams alike."
};

const DEFAULT_ITEMS = [
    {
      title: "Global Currencies Supported",
      detail: "Invoices issued in USD ($), EUR (€), GBP (£), and INR (₹) with zero cross-currency conversion markups."
    },
    {
      title: "Payment Rails & Methods",
      detail: "Bank wire transfers (ACH, SWIFT, SEPA, NEFT/RTGS), corporate credit cards via Stripe, and escrow options for enterprise contracts."
    },
    {
      title: "GST & Tax Compliance",
      detail: "Full corporate invoicing with tax IDs, GST / VAT compliance receipts, and standardized accounting documentation."
    },
    {
      title: "Milestone-Gated Releases",
      detail: "No open-ended monthly burn. Payments are tied to agreed sprint gates and explicit customer acceptance."
    }
  ];

export default function PaymentAndInvoicingTerms() {
  const { heading, items: terms } = useSection("faqs/payment", {
    heading: DEFAULT_HEADING,
    items: DEFAULT_ITEMS,
  });


  return (
    <section className="py-20 relative bg-slate-50/50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <DollarSign className="w-3.5 h-3.5 text-sky-600" />
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
          {terms.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 mt-1 shadow-2xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{t.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
