"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { mailtoHref, maskEmail, maskPhone, telHref, whatsappUrl } from "@/lib/contactLinks";
import {
  Send,
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    timeline: "",
    message: ""
  });

  const router = useRouter();
  const siteConfig = useSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Errors only. A successful submission leaves this page for /thank-you, so
  // there is no success state to hold — the banner that used to live here was
  // indistinguishable from a validation message and vanished on a refresh.
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Deliberately not clearing isSubmitting: the button stays disabled
        // until the navigation completes, so a slow route change cannot be
        // double-submitted by an impatient second click.
        const reference = typeof data.inquiryId === "string" ? data.inquiryId : "";
        router.push(
          `/thank-you?kind=contact${reference ? `&ref=${encodeURIComponent(reference)}` : ""}`
        );
        return;
      }

      setErrorMessage(
        data.error || "Something went wrong. Please try again or WhatsApp us directly."
      );
    } catch (err) {
      console.error(err);
      setErrorMessage(
        "Network error. Please check your connection or reach out on WhatsApp."
      );
    }

    setIsSubmitting(false);
  };

  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // From the admin console, not from three constants that disagreed with it.
  const CONTACT_EMAIL = siteConfig.contactEmail;
  const CONTACT_PHONE = siteConfig.contactPhone;
  const whatsappDirectUrl = whatsappUrl(siteConfig);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="contact" className="relative py-8 lg:py-10 bg-white overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>Tell us what you are building</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Start With a Conversation, <span className="gradient-text font-semibold">Not a Contract</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            Send us a short note about the problem you are trying to solve. You will hear back from an engineer within a working day — with questions, a rough scope and a number, not a brochure.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards & WhatsApp */}
          <div className="reveal-init reveal-delay-1 lg:col-span-5 space-y-6">
            {/* WhatsApp Business Featured Card */}
            <div className="rounded-3xl p-7 border border-emerald-300 bg-emerald-50/70 space-y-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-bold text-slate-900">WhatsApp Business</div>
                  <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                    <span>Online Now • Typical reply in &lt; 15 mins</span>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Connect directly with our senior solutions architect for quick technical consultations, NDA requests, or immediate project kickoff.
              </p>
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Business</span>
              </a>
            </div>

            {/* Direct Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Business Inquiries Email Card */}
              <div className="rounded-2xl p-5 border border-slate-200 bg-slate-50 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  {emailRevealed && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-[11px] font-mono font-bold text-sky-700 bg-white border border-slate-200 px-2 py-1 rounded-md hover:bg-sky-50 transition-all cursor-pointer"
                    >
                      {copiedEmail ? "Copied!" : "Copy"}
                    </button>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-semibold">Business Inquiries</div>
                {emailRevealed ? (
                  <a
                    href={mailtoHref(CONTACT_EMAIL)}
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-sky-700 block truncate"
                  >
                    {CONTACT_EMAIL}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEmailRevealed(true)}
                    className="w-full text-left font-mono text-xs font-bold text-sky-700 hover:text-sky-800 bg-white border border-slate-200 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{maskEmail(CONTACT_EMAIL)}</span>
                    <span className="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded">Reveal</span>
                  </button>
                )}
              </div>

              {/* Careers / Job Applications Card */}
              <div className="rounded-2xl p-5 border border-purple-200/80 bg-purple-50/40 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a
                    href={`mailto:${siteConfig.careersEmail || "hr@divanextechnologies.com"}?subject=Job Application - [Your Role]`}
                    className="text-[11px] font-mono font-bold text-purple-700 bg-white border border-purple-200 px-2 py-1 rounded-md hover:bg-purple-100 transition-all"
                  >
                    Apply Now
                  </a>
                </div>
                <div className="text-xs text-purple-900 font-semibold">Job Applications / Careers</div>
                <a
                  href={`mailto:${siteConfig.careersEmail || "hr@divanextechnologies.com"}?subject=Job Application - [Your Role]`}
                  className="text-xs sm:text-sm font-bold text-purple-950 hover:text-purple-700 block truncate"
                >
                  {siteConfig.careersEmail || "hr@divanextechnologies.com"}
                </a>
              </div>

              {/* Phone Card */}
              <div className="rounded-2xl p-5 border border-slate-200 bg-slate-50 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  {phoneRevealed && (
                    <a
                      href={telHref(CONTACT_PHONE)}
                      className="text-[11px] font-mono font-bold text-cyan-700 bg-white border border-slate-200 px-2 py-1 rounded-md hover:bg-cyan-50 transition-all"
                    >
                      Call Now
                    </a>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-semibold">Direct Call & Support</div>
                {phoneRevealed ? (
                  <a
                    href={telHref(CONTACT_PHONE)}
                    className="text-xs sm:text-sm font-bold text-slate-900 hover:text-cyan-700 block truncate"
                  >
                    {CONTACT_PHONE}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPhoneRevealed(true)}
                    className="w-full text-left font-mono text-xs font-bold text-cyan-700 hover:text-cyan-800 bg-white border border-slate-200 p-2 rounded-xl transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{maskPhone(CONTACT_PHONE)}</span>
                    <span className="text-[10px] bg-cyan-50 text-cyan-700 px-1.5 py-0.5 rounded">Reveal</span>
                  </button>
                )}
              </div>

              {/* Direct WhatsApp Pill Card */}
              <div className="rounded-2xl p-5 border border-emerald-200 bg-emerald-50/40 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-1 rounded-md hover:bg-emerald-100 transition-all"
                  >
                    Open WA
                  </a>
                </div>
                <div className="text-xs text-emerald-900 font-semibold">WhatsApp Chat Number</div>
                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-bold text-emerald-950 hover:text-emerald-700 block truncate"
                >
                  +91 9571618625
                </a>
              </div>
            </div>

            {/* Location & Response Commitment */}
            <div className="rounded-2xl p-5 border border-slate-200 bg-slate-50 space-y-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-xs sm:text-sm text-slate-700">
                  <strong className="text-slate-900 font-bold">Office</strong> — {siteConfig.officeAddress}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
                <Clock className="w-5 h-5 text-sky-600 shrink-0" />
                <div className="text-xs text-slate-600 font-medium">
                  {siteConfig.businessHours}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Inquiry Form */}
          <div className="reveal-init reveal-delay-2 lg:col-span-7 rounded-3xl p-7 sm:p-10 border border-slate-200 bg-white shadow-xl shadow-sky-950/5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">Send Us a Quick Inquiry</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Share a few details about your vision, and our engineering team will review it.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm font-medium bg-red-50 text-red-900 border border-red-300"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-bold text-slate-700">
                    Your Full Name <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name" id="contact-name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe / Alex Smith"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-bold text-slate-700">
                    Email Address <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email" id="contact-email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-phone" className="text-xs font-semibold text-slate-700">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone" id="contact-phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 555-0199 or +91 98765..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-service" className="text-xs font-semibold text-slate-700">
                    Target Core Service <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    name="service" id="contact-service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  >
                    <option value="">Select Your Service</option>
                    <option value="Hospital HMIS & Healthcare">Hospital HMIS & Healthcare Systems</option>
                    <option value="Enterprise ERP Systems">Enterprise ERP & Supply Chain</option>
                    <option value="Fintech & Core Banking">Fintech & Digital Banking</option>
                    <option value="Custom CRM & Sales Engine">Custom CRM & Sales Engines</option>
                    <option value="AI Solutions & Automation">AI Agents & Vector RAG</option>
                    <option value="SaaS Development">Multi-Tenant SaaS Development</option>
                    <option value="Ecommerce & Marketplace">E-Commerce & Multi-Vendor Platforms</option>
                    <option value="Web & App Development">Cross-Platform Mobile & Web Apps</option>
                    <option value="Cloud & DevOps Automation">Cloud Architecture & DevOps</option>
                    <option value="UI/UX Design Engineering">UI/UX Design & Brand Systems</option>
                    <option value="Cybersecurity & Compliance">Cybersecurity & SOC 2 Alignment</option>
                    <option value="Other Custom Solution">Other Custom Enterprise Solution</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-budget" className="text-xs font-semibold text-slate-700">
                    Estimated Project Budget <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    name="budget" id="contact-budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  >
                    <option value="">Select Estimated Budget</option>
                    <option value="Under $5,000">Under $5,000 (MVP Discovery & Build)</option>
                    <option value="$5,000 - $15,000">$5,000 – $15,000 (Growth Engine / Core App)</option>
                    <option value="$15,000 - $30,000">$15,000 – $30,000 (Scale & Enterprise Platform)</option>
                    <option value="$30,000+">$30,000+ (Full Multi-Module System)</option>
                    <option value="Not sure / Need estimation">Not sure / Need estimation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-timeline" className="text-xs font-semibold text-slate-700">
                    Expected Timeline <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    name="timeline" id="contact-timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
                  >
                    <option value="">Select Expected Timeline</option>
                    <option value="ASAP (Immediate Sprint)">ASAP (Immediate Sprint)</option>
                    <option value="1 - 3 months">1 – 3 months (Standard MVP)</option>
                    <option value="3 - 6 months">3 – 6 months (Comprehensive Build)</option>
                    <option value="Planning & scoping stage">Planning & scoping stage</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-bold text-slate-700">
                  Project Vision & Scope Details <span className="text-sky-600">*</span>
                </label>
                <textarea
                  name="message" id="contact-message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you're building, key features required, timeline, or current bottlenecks..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-futuristic-primary w-full !py-3.5 sm:!py-4 text-sm font-bold flex items-center justify-center gap-2 !rounded-xl cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Dispatching Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Technical Inquiry</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strict NDA Protection. We never share your data.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
