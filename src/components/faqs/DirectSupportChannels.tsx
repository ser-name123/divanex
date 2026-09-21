"use client";

import Link from "next/link";
import { useSection } from "@/lib/useSection";
import RichText from "@/components/RichText";
import { useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { maskEmail, maskPhone, whatsappDigits } from "@/lib/contactLinks";
import {
  MessageCircle,
  Mail,
  Phone,
  Calendar,
  Check
} from "lucide-react";

/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_HEADING = {
  "eyebrow": "Real Human Assistance",
  "title": "Didn't Find Your Answer?",
  "highlight": "Direct Support Channels",
  "description": "Our engineering team is always on standby to discuss your technical architecture or answer questions."
};

export default function DirectSupportChannels() {
  const { heading } = useSection("faqs/channels", {
    heading: DEFAULT_HEADING,
    items: [],
  });

  const siteConfig = useSiteConfig();
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // From the admin console. These were two constants holding a different
  // number and mailbox from the ones the rest of the site advertised.
  const CONTACT_PHONE = siteConfig.contactPhone;
  const CONTACT_EMAIL = siteConfig.supportEmail || siteConfig.contactEmail;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="py-20 relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Phone className="w-3.5 h-3.5 text-sky-600" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-2xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">WhatsApp Business Hotline</h3>
              {phoneRevealed ? (
                <div className="text-base font-mono text-emerald-700 font-bold mb-2 flex items-center justify-between">
                  <span>{CONTACT_PHONE}</span>
                  <a
                    href={`https://wa.me/${whatsappDigits(siteConfig.whatsappNumber)}?text=${encodeURIComponent("Hi Divanex team, I have a question regarding my project.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-emerald-600 text-white font-sans px-2.5 py-1 rounded-lg hover:bg-emerald-700 transition-all"
                  >
                    Chat
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setPhoneRevealed(true)}
                  className="w-full text-left font-mono text-sm font-bold text-emerald-700 bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between mb-2"
                >
                  <span>{maskPhone(CONTACT_PHONE)}</span>
                  <span className="text-[10px] bg-white text-emerald-800 px-2 py-0.5 rounded font-sans font-bold shadow-2xs">Click to Reveal</span>
                </button>
              )}
              <p className="text-slate-600 text-xs sm:text-sm font-normal">Fastest response for quick architecture questions (&lt; 15 mins).</p>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mb-4 shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Engineering Email Desk</h3>
              {emailRevealed ? (
                <div className="text-base font-mono text-sky-700 font-bold mb-2 flex items-center justify-between">
                  <span className="truncate mr-2">{CONTACT_EMAIL}</span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="text-xs bg-sky-600 text-white font-sans px-2.5 py-1 rounded-lg hover:bg-sky-700 transition-all cursor-pointer shrink-0"
                  >
                    {copiedEmail ? "Copied!" : "Copy"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setEmailRevealed(true)}
                  className="w-full text-left font-mono text-sm font-bold text-sky-700 bg-sky-50/60 hover:bg-sky-100/70 border border-sky-200 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between mb-2"
                >
                  <span>{maskEmail(CONTACT_EMAIL)}</span>
                  <span className="text-[10px] bg-white text-sky-800 px-2 py-0.5 rounded font-sans font-bold shadow-2xs">Click to Reveal</span>
                </button>
              )}
              <p className="text-slate-600 text-xs sm:text-sm font-normal">Send PRDs, RFPs, and architecture specifications for 24h review.</p>
            </div>
          </div>

          {/* Discovery Call Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 mb-4 shadow-2xs">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Discovery Call Calendar</h3>
              <Link
                href="/contact#schedule"
                className="inline-block text-base font-mono text-indigo-700 font-bold mb-2 hover:text-indigo-800"
              >
                Book 30-Min Call →
              </Link>
              <p className="text-slate-600 text-xs sm:text-sm font-normal">Select a convenient time for a video discussion with a lead architect.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
