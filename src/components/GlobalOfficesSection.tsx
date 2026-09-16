"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  ArrowUpRight,
  Sparkles,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface OfficeLocation {
  id: string;
  country: string;
  city: string;
  isoCode: string;
  roleBadge: string;
  accentColor: "teal" | "sky" | "amber" | "rose";
  tagline: string;
  address: string;
  timeZoneName: string;
  timeZoneOffset: string;
  timeZoneIana: string;
  primaryPhone: string;
  phoneRaw: string;
  email: string;
  whatsappNumber?: string;
  mapQuery: string;
  flagSvg: React.ReactNode;
}

// Clean Vector SVG Flags (Windows-compatible with zero emoji font dependency)
const FlagIndia = () => (
  <svg className="w-7 h-5 rounded-sm shadow-xs border border-slate-200 shrink-0" viewBox="0 0 640 480">
    <path fill="#f93" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#128807" d="M0 320h640v160H0z" />
    <circle cx="320" cy="240" r="50" fill="none" stroke="#000088" strokeWidth="6" />
    <circle cx="320" cy="240" r="10" fill="#000088" />
  </svg>
);

const FlagHongKong = () => (
  <svg className="w-7 h-5 rounded-sm shadow-xs border border-slate-200 shrink-0" viewBox="0 0 640 480">
    <path fill="#de2910" d="M0 0h640v480H0z" />
    <circle cx="320" cy="240" r="80" fill="none" stroke="#fff" strokeWidth="4" />
    <path
      fill="#fff"
      d="M320 180c10 20 20 25 35 25-10-15-5-30-2-45-15 10-25 10-33 20zm50 40c20 5 30 15 40 30-10-15-25-18-40-20 5-15 0-25 0-10zm-15 55c10 15 10 30 5 45-5-15-18-22-30-25 15-5 25-10 25-20zm-65-15c-15 10-30 10-45 5 15-5 22-18 25-30 5 15 10 25 20 25zm-10-60c-5-20-15-30-30-40 15 10 18 25 20 40 15-5 25 0 10 0z"
    />
  </svg>
);

const FlagUAE = () => (
  <svg className="w-7 h-5 rounded-sm shadow-xs border border-slate-200 shrink-0" viewBox="0 0 640 480">
    <path fill="#00732f" d="M0 0h640v160H0z" />
    <path fill="#fff" d="M0 160h640v160H0z" />
    <path fill="#000" d="M0 320h640v160H0z" />
    <path fill="#f00" d="M0 0h180v480H0z" />
  </svg>
);

const FlagCanada = () => (
  <svg className="w-7 h-5 rounded-sm shadow-xs border border-slate-200 shrink-0" viewBox="0 0 640 480">
    <path fill="#f00" d="M0 0h160v480H0zm480 0h160v480H480z" />
    <path fill="#fff" d="M160 0h320v480H160z" />
    <path
      fill="#f00"
      d="M320 120l15 45 40-15-15 35 45 15-35 25 10 45-45-15-15 45-15-45-45 15 10-45-35-25 45-15-15-35 40 15z"
    />
  </svg>
);

export default function GlobalOfficesSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTimes, setActiveTimes] = useState<Record<string, string>>({});

  const offices: OfficeLocation[] = [
    {
      id: "india-hq",
      country: "India",
      city: "Jaipur, Rajasthan",
      isoCode: "IN",
      roleBadge: "Global Engineering HQ & Core R&D",
      accentColor: "teal",
      tagline: "Primary Engineering Hub & Architecture Lab",
      address: "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur 302021",
      timeZoneName: "India Standard Time",
      timeZoneOffset: "IST (UTC+5:30)",
      timeZoneIana: "Asia/Kolkata",
      primaryPhone: "+91-6375073511",
      phoneRaw: "+916375073511",
      email: "business@divanextechnologies.com",
      whatsappNumber: "919571618625",
      mapQuery: "Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar, Jaipur",
      flagSvg: <FlagIndia />,
    },
    {
      id: "hong-kong",
      country: "Hong Kong",
      city: "Tsuen Wan, New Territories",
      isoCode: "HK",
      roleBadge: "APAC Client Coverage Hub",
      accentColor: "sky",
      tagline: "Asia-Pacific Client Coverage & Ingress",
      address: "FLAT/RM E (36) 3/F Superluck Industrial Centre Phase 2, 57 Sha Tsui Rd, Tsuen Wan",
      timeZoneName: "Hong Kong Time",
      timeZoneOffset: "HKT (UTC+8:00)",
      timeZoneIana: "Asia/Hong_Kong",
      primaryPhone: "+852-90270926",
      phoneRaw: "+85290270926",
      email: "business@divanextechnologies.com",
      whatsappNumber: "919571618625",
      mapQuery: "Superluck Industrial Centre Phase 2, Sha Tsui Road, Tsuen Wan, Hong Kong",
      flagSvg: <FlagHongKong />,
    },
    {
      id: "dubai-uae",
      country: "United Arab Emirates",
      city: "Dubai Media City",
      isoCode: "AE",
      roleBadge: "MENA Client Coverage Desk",
      accentColor: "amber",
      tagline: "Middle East & GCC Client Coverage",
      address: "Building C8, Dubai Media City, Dubai, United Arab Emirates",
      timeZoneName: "Gulf Standard Time",
      timeZoneOffset: "GST (UTC+4:00)",
      timeZoneIana: "Asia/Dubai",
      primaryPhone: "+91-6375073511",
      phoneRaw: "+916375073511",
      email: "business@divanextechnologies.com",
      whatsappNumber: "919571618625",
      mapQuery: "Dubai Media City, Dubai, UAE",
      flagSvg: <FlagUAE />,
    },
    {
      id: "canada",
      country: "Canada",
      city: "Newmarket, Greater Toronto",
      isoCode: "CA",
      roleBadge: "North America Client Coverage",
      accentColor: "rose",
      tagline: "Americas Client Relations & Timezone Support",
      address: "105 Sawmill Valley Dr, Newmarket, ON L3X 1S4, Canada",
      timeZoneName: "Eastern Standard Time",
      timeZoneOffset: "EST (UTC-5:00)",
      timeZoneIana: "America/Toronto",
      primaryPhone: "+91-6375073511",
      phoneRaw: "+916375073511",
      email: "business@divanextechnologies.com",
      whatsappNumber: "919571618625",
      mapQuery: "105 Sawmill Valley Dr, Newmarket, ON, Canada",
      flagSvg: <FlagCanada />,
    },
  ];

  // Real-time time updater for all offices
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      offices.forEach((office) => {
        try {
          const now = new Date();
          times[office.id] = new Intl.DateTimeFormat("en-US", {
            timeZone: office.timeZoneIana,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          }).format(now);
        } catch {
          times[office.id] = "--:--:--";
        }
      });
      setActiveTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getAccentStyles = (accent: OfficeLocation["accentColor"]) => {
    switch (accent) {
      case "teal":
        return {
          borderTop: "from-[#0f7670] to-[#5c9556]",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          iconBg: "bg-emerald-50 text-[#0f7670] border-emerald-200",
          hoverBorder: "hover:border-[#0f7670]/40",
          hoverGlow: "hover:shadow-emerald-950/5",
          timeBadge: "text-emerald-700 bg-emerald-50/80 border-emerald-200/60",
        };
      case "sky":
        return {
          borderTop: "from-sky-500 to-blue-600",
          badgeBg: "bg-sky-50 text-sky-800 border-sky-200/80",
          iconBg: "bg-sky-50 text-sky-600 border-sky-200",
          hoverBorder: "hover:border-sky-400/40",
          hoverGlow: "hover:shadow-sky-950/5",
          timeBadge: "text-sky-700 bg-sky-50/80 border-sky-200/60",
        };
      case "amber":
        return {
          borderTop: "from-amber-500 to-orange-500",
          badgeBg: "bg-amber-50 text-amber-900 border-amber-200/80",
          iconBg: "bg-amber-50 text-amber-600 border-amber-200",
          hoverBorder: "hover:border-amber-400/40",
          hoverGlow: "hover:shadow-amber-950/5",
          timeBadge: "text-amber-800 bg-amber-50/80 border-amber-200/60",
        };
      case "rose":
      default:
        return {
          borderTop: "from-rose-500 to-red-600",
          badgeBg: "bg-rose-50 text-rose-900 border-rose-200/80",
          iconBg: "bg-rose-50 text-rose-600 border-rose-200",
          hoverBorder: "hover:border-rose-400/40",
          hoverGlow: "hover:shadow-rose-950/5",
          timeBadge: "text-rose-800 bg-rose-50/80 border-rose-200/60",
        };
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-t border-slate-200/90 overflow-hidden select-none">
      {/* Background Decorative Mesh & Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Top Header & Operational HUD */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>GLOBAL TIMEZONE OVERLAP // CLIENT COVERAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#000838] tracking-tight">
              Global Client Coverage & Regional Desks
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Primary engineering runs out of our Jaipur HQ, with dedicated client coverage and active timezone overlap across APAC, the Middle East, and North America.
            </p>
          </div>

          {/* Operational Status & Business Hours HUD */}
          <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    OPERATING HOURS
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 font-mono">
                  Mon – Fri: 10:00 AM – 08:00 PM
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Sat–Sun: Closed <span className="text-emerald-700 font-semibold">(24/7 Escalations Active)</span>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919571618625?text=Hello%20Divanex!%20I%20would%20like%20to%20connect%20with%20your%20nearest%20regional%20office."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* 4-Card Multi-Region Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offices.map((office) => {
            const styles = getAccentStyles(office.accentColor);
            const liveTime = activeTimes[office.id] || "Loading...";

            return (
              <div
                key={office.id}
                className={`group relative rounded-3xl bg-white border border-slate-200/90 ${styles.hoverBorder} shadow-sm hover:shadow-xl ${styles.hoverGlow} transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1`}
              >
                {/* Top Accent Gradient Line */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${styles.borderTop}`} />

                <div className="p-6 space-y-4">
                  {/* Top Bar: Flag, Country, ISO Code */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {office.flagSvg}
                      <div>
                        <h3 className="font-extrabold text-base text-[#000838] tracking-tight group-hover:text-[#0f7670] transition-colors">
                          {office.country}
                        </h3>
                        <p className="text-[11px] font-semibold text-slate-500">{office.city}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {office.isoCode}
                    </span>
                  </div>

                  {/* Strategic Role Badge */}
                  <div
                    className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${styles.badgeBg} w-full`}
                  >
                    <Building2 className="w-3 h-3 shrink-0" />
                    <span className="truncate">{office.roleBadge}</span>
                  </div>

                  {/* Live Local Time HUD Box */}
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-medium text-slate-500">
                      <span>LOCAL TIME ({office.timeZoneOffset.split(" ")[0]})</span>
                      <span className="text-[9px] text-slate-400 font-normal">{office.timeZoneOffset}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-900">
                        <Clock className="w-3 h-3 text-[#0f7670]" />
                        <span>{liveTime}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                      </span>
                    </div>
                  </div>

                  {/* Physical Address Card */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" /> PHYSICAL ADDRESS
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(`addr-${office.id}`, office.address)}
                        className="text-[10px] font-mono text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
                        title="Copy full address"
                      >
                        {copiedId === `addr-${office.id}` ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50/70 border border-slate-200/60 text-[11.5px] leading-relaxed text-slate-700 min-h-[56px]">
                      {office.address}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer with Direct Communication Buttons */}
                <div className="p-4 bg-slate-50/90 border-t border-slate-100 space-y-2 text-xs font-mono">
                  {/* Phone Call Link */}
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 transition-colors">
                    <a
                      href={`tel:${office.phoneRaw}`}
                      className="flex items-center gap-2 text-slate-800 hover:text-emerald-700 font-semibold text-[11px] truncate flex-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{office.primaryPhone}</span>
                    </a>
                    <a
                      href={`tel:${office.phoneRaw}`}
                      className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] text-emerald-700 font-bold hover:bg-emerald-100 transition-colors uppercase shrink-0"
                    >
                      Call
                    </a>
                  </div>

                  {/* Email & Map Directions Links */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`mailto:${office.email}?subject=Inquiry to ${office.country} Hub`}
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-lg bg-white border border-slate-200 hover:border-sky-300 text-slate-700 hover:text-sky-700 text-[10.5px] font-semibold transition-colors"
                      title={office.email}
                    >
                      <Mail className="w-3 h-3 text-sky-600 shrink-0" />
                      <span>Email Hub</span>
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(office.mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-lg bg-white border border-slate-200 hover:border-amber-300 text-slate-700 hover:text-amber-700 text-[10.5px] font-semibold transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>Map View</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global SLA & Escalation Assurance Banner */}
        <div className="mt-8 rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-slate-700 text-[11px] sm:text-xs">
              <strong className="text-slate-900 font-bold">Enterprise Multi-Region SLA:</strong> All client communications routed to nearest regional engineering lead within <span className="text-emerald-700 font-bold">&lt; 15 minutes</span>.
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% In-House Engineers
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-sky-700 font-semibold">
              <Zap className="w-3.5 h-3.5 text-sky-600" /> Zero Outsourcing
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
