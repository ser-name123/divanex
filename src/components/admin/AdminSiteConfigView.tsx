"use client";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState } from "react";
import { DEFAULT_SITE_CONFIG as DEFAULT_CONFIG, type SiteConfig as SiteConfigState } from "@/data/siteContent";
import { useAdminContent } from "@/lib/useAdminContent";
import {
  Sliders,
  Save,
  CheckCircle2,
  Megaphone,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Link2 as LinkIcon,
  Bot,
  RotateCcw
} from "lucide-react";


export default function AdminSiteConfigView() {
  /**
   * Server-backed. This panel used to write to localStorage and nothing read
   * it back — announcement bars, hero copy and contact details edited here
   * never reached a single visitor. It now writes to the database and the
   * public site renders from the same record.
   */
  const {
    data: config,
    setData: setConfig,
    save,
    reset,
    loading,
    saving,
  } = useAdminContent("site-config", DEFAULT_CONFIG);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleSave = async () => {
    const ok = await save(config);
    showToast(
      ok
        ? "Saved and published. The site picks this up on the next page load."
        : "Could not save. Your change was not published."
    );
  };

  const handleReset = async () => {
    if (confirm("Reset website configuration to system defaults?")) {
      const ok = await reset();
      showToast(ok ? "Reset to factory defaults completed." : "Could not reset.");
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn font-mono">
      {/* Toast Notice */}
      {toastMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <Sliders className="w-3.5 h-3.5 text-sky-600" />
            <span>GLOBAL SITE CONTENT & LIVE CUSTOMIZER</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Website Content & System Controls
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Manage top announcement banners, hero headlines, agency contact info, social links, and AI widget toggles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
                disabled={saving || loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Announcement Bar & Hero Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Top Announcement Bar */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">Top Announcement Bar</h3>
                  <p className="text-[11px] text-slate-500 font-sans">Header marquee banner visible to all visitors</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfig({ ...config, announcementEnabled: !config.announcementEnabled })}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  config.announcementEnabled ? "bg-sky-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    config.announcementEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {config.announcementEnabled && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                      Pill Badge
                    </label>
                    <input
                      type="text"
                      value={config.announcementPill}
                      onChange={(e) => setConfig({ ...config, announcementPill: e.target.value })}
                      placeholder="SPRINT OPEN"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                      Banner Text
                    </label>
                    <input
                      type="text"
                      value={config.announcementText}
                      onChange={(e) => setConfig({ ...config, announcementText: e.target.value })}
                      placeholder="Q3 SaaS & AI Engineering Sprint Slots Open"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                      CTA Link Label
                    </label>
                    <input
                      type="text"
                      value={config.announcementLinkText}
                      onChange={(e) => setConfig({ ...config, announcementLinkText: e.target.value })}
                      placeholder="Reserve Slot →"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                      Target URL
                    </label>
                    <input
                      type="text"
                      value={config.announcementLinkUrl}
                      onChange={(e) => setConfig({ ...config, announcementLinkUrl: e.target.value })}
                      placeholder="/contact"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2: Hero Section Messaging */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">Hero Section Copy & Calls to Action</h3>
                <p className="text-[11px] text-slate-500 font-sans">Primary above-the-fold value proposition</p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Eyebrow Pill Tag
                </label>
                <input
                  type="text"
                  value={config.heroEyebrow}
                  onChange={(e) => setConfig({ ...config, heroEyebrow: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={config.heroHeadlineMain}
                    onChange={(e) => setConfig({ ...config, heroHeadlineMain: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Gradient Highlighted Words
                  </label>
                  <input
                    type="text"
                    value={config.heroHeadlineHighlight}
                    onChange={(e) => setConfig({ ...config, heroHeadlineHighlight: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Sub-headline Description
                </label>
                <RichTextEditor
                  value={config.heroSubhead}
                  onChange={(heroSubhead) => setConfig({ ...config, heroSubhead })}
                  rows={3}
                  inline
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={config.heroCtaQuoteText}
                    onChange={(e) => setConfig({ ...config, heroCtaQuoteText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Secondary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={config.heroCtaConsultText}
                    onChange={(e) => setConfig({ ...config, heroCtaConsultText: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Agency Contact, Socials & Global Toggles */}
        <div className="lg:col-span-5 space-y-6">
          {/* SECTION 3: Agency Contact & Headquarters */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">Agency Contact Hub</h3>
                <p className="text-[11px] text-slate-500 font-sans">Public contact details & office coordinates</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>Support / Inquiries Email</span>
                </label>
                <input
                  type="email"
                  value={config.contactEmail}
                  onChange={(e) => setConfig({ ...config, contactEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

<div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span>Existing-client Support Email</span>
                </label>
                <input
                  type="email"
                  value={config.supportEmail}
                  onChange={(e) => setConfig({ ...config, supportEmail: e.target.value })}
                  placeholder="support@yourcompany.com"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-slate-500" />
                  <span>Security Disclosure Email</span>
                </label>
                <input
                  type="email"
                  value={config.securityEmail}
                  onChange={(e) => setConfig({ ...config, securityEmail: e.target.value })}
                  placeholder="security@yourcompany.com"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>Direct Sales Hotline</span>
                </label>
                <input
                  type="text"
                  value={config.contactPhone}
                  onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp Business Link / Number</span>
                </label>
                <input
                  type="text"
                  value={config.whatsappNumber}
                  onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp Pre-filled Message</span>
                </label>
                <textarea
                  rows={2}
                  value={config.whatsappGreeting}
                  onChange={(e) => setConfig({ ...config, whatsappGreeting: e.target.value })}
                  placeholder="Hello! I would like to inquire about your services."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none resize-y leading-relaxed"
                />
                <p className="text-[10px] text-slate-400 mt-1">Opens already typed in the visitor&apos;s WhatsApp. The emergency escalation link sends its own text instead.</p>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>Headquarters Address</span>
                </label>
                <input
                  type="text"
                  value={config.officeAddress}
                  onChange={(e) => setConfig({ ...config, officeAddress: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION: Social profiles */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                <LinkIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">Social Profiles</h3>
                <p className="text-[11px] text-slate-500 font-sans">
                  A profile with an address shows in the footer. Clear the address to take it down.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  <span>LinkedIn</span>
                </label>
                <input
                  type="url"
                  value={config.linkedinUrl ?? ""}
                  onChange={(e) => setConfig({ ...config, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/company/yourcompany"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  <span>GitHub</span>
                </label>
                <input
                  type="url"
                  value={config.githubUrl ?? ""}
                  onChange={(e) => setConfig({ ...config, githubUrl: e.target.value })}
                  placeholder="https://github.com/yourcompany"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  <span>X (Twitter)</span>
                </label>
                <input
                  type="url"
                  value={config.twitterUrl ?? ""}
                  onChange={(e) => setConfig({ ...config, twitterUrl: e.target.value })}
                  placeholder="https://x.com/yourcompany"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-slate-500" />
                  <span>Instagram</span>
                </label>
                <input
                  type="url"
                  value={config.instagramUrl ?? ""}
                  onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/yourcompany"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              Order, labels and colours live under Page Sections &rarr; Footer &rarr; Footer social links.
            </p>
          </div>

          {/* SECTION 4: Live Features & Widget Controls */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-sans">Widgets & Maintenance Controls</h3>
                <p className="text-[11px] text-slate-500 font-sans">Live AI conversational assistant & system status</p>
              </div>
            </div>

            <div className="space-y-3">
              {/* AI Chat Widget Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans">DT AI Live Chatbot</h4>
                  <p className="text-[10px] text-slate-500 font-sans">Floating assistant on bottom right</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig({ ...config, enableAiChat: !config.enableAiChat })}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                    config.enableAiChat ? "bg-sky-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      config.enableAiChat ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Maintenance Banner Toggle */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">Emergency Maintenance Mode</h4>
                    <p className="text-[10px] text-slate-500 font-sans">Display system maintenance notice</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({ ...config, enableMaintenanceBanner: !config.enableMaintenanceBanner })
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                      config.enableMaintenanceBanner ? "bg-red-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        config.enableMaintenanceBanner ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {config.enableMaintenanceBanner && (
                  <div className="pt-2 text-xs">
                    <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                      Maintenance Notice Text
                    </label>
                    <input
                      type="text"
                      value={config.maintenanceMessage}
                      onChange={(e) => setConfig({ ...config, maintenanceMessage: e.target.value })}
                      className="w-full p-2 rounded-lg bg-white border border-red-300 text-red-900 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
