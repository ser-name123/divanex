"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { servicesData, type ServiceItem } from "@/data/services";
import {
  Layers,
  Smartphone,
  Cpu,
  TrendingUp,
  Palette,
  Cloud,
  Stethoscope,
  Briefcase,
  Banknote,
  UserCheck,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Activity,
  Database,
  Terminal,
  Play,
  RotateCcw,
  Flame,
  ShieldCheck,
  Building2,
  Truck,
  Globe2,
  Check,
  Search,
  X,
  SlidersHorizontal,
  Glasses,
  BatteryCharging
} from "lucide-react";

// Category membership. Hoisted to module scope so the filter memo below can
// depend on it honestly instead of rebuilding these arrays every render.
const enterpriseIds = [
  "hospital-healthcare-management",
  "enterprise-erp-systems",
  "custom-crm-automation",
  "edtech-learning-management",
  "cybersecurity-compliance",
  "real-estate-proptech",
  "logistics-fleet-telematics",
  "legaltech-contract-automation",
  "energytech-smart-grid"
];


const fintechIds = [
  "fintech-banking-solutions",
  "ecommerce-marketplace-platforms",
  "saas-development",
  "restaurant-pos-hospitality",
  "web3-defi-blockchain"
];

const aiCloudIds = [
  "ai-solutions-automation",
  "cloud-devops",
  "web-app-development",
  "seo-digital-growth",
  "ui-ux-design",
  "headless-cms-media",
  "generative-ai-agentic-fabric",
  "data-engineering-bi-analytics",
  "iot-embedded-telemetry",
  "ar-vr-spatial-computing"
];

interface ServicesSectionProps {
  isHome?: boolean;
  limit?: number;
  /**
   * The catalogue, read from the database by the page above. Falls back to the
   * built-in seed so the section still renders if a caller forgets to pass it.
   */
  items?: ServiceItem[];
}

export default function ServicesSection({ isHome = false, limit, items }: ServicesSectionProps) {
  const services = items && items.length > 0 ? items : servicesData;
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<"all" | "enterprise" | "fintech_commerce" | "ai_cloud">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);

  // Micro-widget 1: Hospital Triage & Bed Occupancy Simulator
  const [hospitalBedOccupancy, setHospitalBedOccupancy] = useState(88);
  const [activeClinicalWard, setActiveClinicalWard] = useState<"icu" | "opd" | "ot">("icu");

  // Micro-widget 2: ERP Factory Telemetry Simulator
  const [erpPlantEfficiency, setErpPlantEfficiency] = useState(96.4);
  const [activeErpModule, setActiveErpModule] = useState<"wms" | "mrp" | "ledger">("mrp");

  // Micro-widget 3: SaaS Multi-Tenant Interactive State
  const [activeTenant, setActiveTenant] = useState<"alpha" | "fintech" | "global">("alpha");
  const [tenantQps, setTenantQps] = useState(14280);

  // Micro-widget 4: AI Engine Model Selector & Streaming Prompt
  const [activeModel, setActiveModel] = useState<"r1" | "claude" | "gpt4">("r1");
  const [aiTokensSec, setAiTokensSec] = useState(128);

  // Dynamic simulation timer for telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setTenantQps((prev) => prev + Math.floor(Math.random() * 31) - 15);
      setAiTokensSec(120 + Math.floor(Math.random() * 18));
      setHospitalBedOccupancy((prev) => Math.min(98, Math.max(78, prev + (Math.random() > 0.5 ? 1 : -1))));
      setErpPlantEfficiency((prev) => Number((95.5 + Math.random() * 3).toFixed(1)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Stethoscope":
        return <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Banknote":
        return <Banknote className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "UserCheck":
        return <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Layers":
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "TrendingUp":
        return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Palette":
        return <Palette className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Building2":
        return <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Truck":
        return <Truck className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Activity":
        return <Activity className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Globe2":
        return <Globe2 className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Flame":
        return <Flame className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Database":
        return <Database className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Zap":
        return <Zap className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "Glasses":
        return <Glasses className="w-5 h-5 sm:w-6 sm:h-6" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const getServiceBadge = (id: string) => {
    switch (id) {
      case "hospital-healthcare-management":
        return "HL7 FHIR / ABDM";
      case "enterprise-erp-systems":
        return "MODULAR MRP-II";
      case "fintech-banking-solutions":
        return "PCI-DSS LEVEL 1";
      case "custom-crm-automation":
        return "WHATSAPP CTI";
      case "ecommerce-marketplace-platforms":
        return "SPLIT ESCROW";
      case "edtech-learning-management":
        return "WEBRTC LIVE";
      case "saas-development":
        return "MULTI-TENANT RLS";
      case "web-app-development":
        return "NEXT.JS & REACT NATIVE";
      case "ai-solutions-automation":
        return "140+ TOK/SEC RAG";
      case "seo-digital-growth":
        return "CORE WEB VITALS 98+";
      case "ui-ux-design":
        return "FIGMA DESIGN TOKENS";
      case "cloud-devops":
        return "ZERO-DOWNTIME K8S";
      case "cybersecurity-compliance":
        return "ZERO-TRUST / SOC-2";
      case "real-estate-proptech":
        return "RESO / MLS / 3D";
      case "logistics-fleet-telematics":
        return "OBD-II & GPS MESH";
      case "iot-embedded-telemetry":
        return "MQTT & CLICKHOUSE";
      case "headless-cms-media":
        return "SUB-50MS EDGE TTFB";
      case "generative-ai-agentic-fabric":
        return "LANGGRAPH / vLLM";
      case "restaurant-pos-hospitality":
        return "OFFLINE-FIRST POS";
      case "web3-defi-blockchain":
        return "AUDITED CONTRACTS";
      case "data-engineering-bi-analytics":
        return "PETABYTE DATA LAKES";
      case "legaltech-contract-automation":
        return "AI REDLINE & E-SIGN";
      case "ar-vr-spatial-computing":
        return "VISIONOS / WEBXR 3D";
      case "energytech-smart-grid":
        return "OCPP 2.0.1 / SMART GRID";
      default:
        return "ENTERPRISE READY";
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      // Category match
      let matchCat = true;
      if (activeCategory === "enterprise") matchCat = enterpriseIds.includes(svc.id);
      if (activeCategory === "fintech_commerce") matchCat = fintechIds.includes(svc.id);
      if (activeCategory === "ai_cloud") matchCat = aiCloudIds.includes(svc.id);

      if (!matchCat) return false;

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = svc.title.toLowerCase().includes(query);
        const inTag = svc.tagline.toLowerCase().includes(query);
        const inDesc = svc.description.toLowerCase().includes(query);
        const inFeat = svc.features.some((f) => f.toLowerCase().includes(query));
        const inIdeal = svc.idealFor.toLowerCase().includes(query);
        return inTitle || inTag || inDesc || inFeat || inIdeal;
      }

      return true;
    });
  }, [services, activeCategory, searchQuery]);

  return (
    <section id="services" className="relative py-8 lg:py-10 overflow-hidden bg-slate-50/50">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header with High-Contrast Badge */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#5c9556] animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5 text-[#0f7670]" />
            <span className="tracking-wider uppercase">WHAT WE BUILD // 22 PRACTICE AREAS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
            The Systems Your Business Runs On,{" "}
            <span className="gradient-text font-semibold">Built Properly</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            Hospital and clinic software, multi-tenant SaaS products, ERP and inventory platforms, payment and ledger engines, AI agents, mobile apps. If it has to stay up and stay correct, it is the kind of work we take on.
          </p>

          {/* Category Filter Pills & Search Bar (Rendered on /services or when viewing all) */}
          {!isHome && (
            <div className="space-y-4 pt-6">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === "all"
                      ? "bg-sky-600 text-white shadow-md scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>All Capabilities ({services.length})</span>
                </button>
                <button
                  onClick={() => setActiveCategory("enterprise")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === "enterprise"
                      ? "bg-sky-600 text-white shadow-md scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Enterprise & Industry ({enterpriseIds.length})</span>
                </button>
                <button
                  onClick={() => setActiveCategory("fintech_commerce")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === "fintech_commerce"
                      ? "bg-emerald-600 text-white shadow-md scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Banknote className="w-3.5 h-3.5" />
                  <span>Fintech & Commerce ({fintechIds.length})</span>
                </button>
                <button
                  onClick={() => setActiveCategory("ai_cloud")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 ${
                    activeCategory === "ai_cloud"
                      ? "bg-purple-700 text-white shadow-md scale-105"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>AI, Cloud & Data ({aiCloudIds.length})</span>
                </button>
              </div>

              {/* Instant Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search any capability (e.g. Healthcare, PropTech, AI, Logistics, POS, Web3, DevOps)..."
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-2 pt-1.5">
                  <span>Showing {filteredServices.length} of {services.length} Specialized Engineering Tracks</span>
                  {searchQuery && <span>Filter Active</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* HOMEPAGE VIEW: CURATED FLAGSHIP BENTO GRID (5 FEATURED) */}
        {/* ======================================================== */}
        {isHome && (
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xl:gap-8">
            
            {/* BENTO CARD 1: Hospital HMIS & Healthcare Systems (Large 7 Cols) */}
            <div
              onClick={() => {
                setSelectedService(services[0]);
                router.push("/services/hospital-healthcare-management");
              }}
              className={`reveal-init reveal-delay-1 lg:col-span-7 rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                selectedService.id === "hospital-healthcare-management"
                  ? "bg-white border-sky-400 shadow-xl shadow-sky-500/10 ring-1 ring-sky-300"
                  : "bg-white border-slate-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-500/5"
              }`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/60 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-200/50 transition-all"></div>

              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-sky-50 border border-sky-200 text-sky-700 shadow-xs">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <Link
                      href="/services/hospital-healthcare-management"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl sm:text-2xl font-semibold text-slate-900 group-hover:text-sky-700 transition-colors inline-flex items-center gap-2"
                    >
                      <span>Hospital HMIS & Healthcare Systems</span>
                      <ArrowRight className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <p className="text-xs text-sky-700 font-mono font-semibold">
                      HL7_FHIR_V4 // HIPAA & ABDM LEVEL-2 COMPLIANT
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CLINICAL GRADE</span>
                </span>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 relative z-10 font-medium">
                For hospitals, clinic chains and diagnostic labs. Registration through discharge, prescriptions the pharmacy can read, lab and scan results attached to the right patient, and stock that reconciles at month end.
              </p>

              {/* Micro-Interactive Widget: Hospital Ward & Bed Occupancy Simulator */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-5 font-mono text-xs mb-6 relative z-10 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 text-slate-600 font-sans">
                  <div className="flex items-center gap-2 text-sky-900 font-bold font-mono">
                    <Activity className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                    <span>CLINICAL WARD TELEMETRY</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>OCCUPANCY: {hospitalBedOccupancy}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
                  <span className="text-[11px] text-slate-500 uppercase font-sans font-bold">Active Dept:</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClinicalWard("icu");
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                      activeClinicalWard === "icu"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    ICU / Critical Care
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClinicalWard("opd");
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                      activeClinicalWard === "opd"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    OPD Triage Tokens
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClinicalWard("ot");
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-sans font-semibold transition-all cursor-pointer ${
                      activeClinicalWard === "ot"
                        ? "bg-sky-600 text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Operation Theatre (OT)
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px] font-sans font-semibold">FHIR Protocol</span>
                    <span className="text-sky-800 font-bold">HL7 v4 Encrypted</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px] font-sans font-semibold">PACS Radiology</span>
                    <span className="text-emerald-700 font-bold">&lt; 120ms Web DICOM</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px] font-sans font-semibold">Pharmacy Stock</span>
                    <span className="text-purple-800 font-bold">FEFO Batch Auto</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block text-[10px] font-sans font-semibold">TPA Cashless</span>
                    <span className="text-amber-800 font-bold">EDI 837 Live Claims</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> OPD/IPD Management
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> LIS Machine Drivers
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Doctor & Patient Portals
                  </span>
                </div>

                <Link
                  href="/services/hospital-healthcare-management"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-xs font-bold text-sky-800 border border-sky-200 group-hover:border-sky-300 transition-all shadow-xs group-hover:translate-x-0.5"
                >
                  <span>View Full HMIS Architecture</span>
                  <ArrowRight className="w-4 h-4 text-sky-700" />
                </Link>
              </div>
            </div>

            {/* BENTO CARD 2: Enterprise ERP & Supply Chain (5 Cols) */}
            <div
              onClick={() => {
                setSelectedService(services[1]);
                router.push("/services/enterprise-erp-systems");
              }}
              className={`reveal-init reveal-delay-2 lg:col-span-5 rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                selectedService.id === "enterprise-erp-systems"
                  ? "bg-white border-indigo-400 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-300"
                  : "bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5"
              }`}
            >
              <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-200/50 transition-all"></div>

              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-xs">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <Link
                      href="/services/enterprise-erp-systems"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl sm:text-2xl font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors inline-flex items-center gap-2"
                    >
                      <span>Enterprise ERP & Supply Chain</span>
                      <ArrowRight className="w-4 h-4 text-indigo-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <p className="text-xs text-indigo-700 font-mono font-semibold">
                      MODULAR_MRP2 // ZERO_PER_SEAT_LICENSES
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-5 relative z-10 font-medium">
                For manufacturers and distributors who have outgrown spreadsheets and refuse to bend their process to packaged software. Stock across locations, production, purchase, accounts and payroll in one place.
              </p>

              <div
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-4 font-mono text-xs mb-5 shadow-xs relative z-10"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-[11px] text-indigo-900 font-bold flex items-center gap-1.5 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    PLANT PRODUCTION MESH
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300">
                    {erpPlantEfficiency}% OEE EFFICIENCY
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mt-3 mb-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveErpModule("mrp");
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-sans font-semibold transition-all text-center cursor-pointer ${
                      activeErpModule === "mrp"
                        ? "bg-sky-600 text-white shadow-2xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Shopfloor MRP-II
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveErpModule("wms");
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-sans font-semibold transition-all text-center cursor-pointer ${
                      activeErpModule === "wms"
                        ? "bg-sky-600 text-white shadow-2xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    Multi-Plant WMS
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveErpModule("ledger");
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-sans font-semibold transition-all text-center cursor-pointer ${
                      activeErpModule === "ledger"
                        ? "bg-sky-600 text-white shadow-2xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    GST / e-Invoice
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between text-[10px]">
                  <div>
                    <span className="text-slate-500 block font-semibold">Inventory Accuracy</span>
                    <span className="text-emerald-700 font-bold">99.98% Barcode / RFID</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 block font-semibold">Annual License Tax</span>
                    <span className="text-indigo-800 font-bold">$0.00 (100% Owned)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 relative z-10">
                <span className="text-xs text-slate-600 font-semibold">Unlimited User Seats</span>
                <Link
                  href="/services/enterprise-erp-systems"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-xs font-bold text-indigo-800 border border-indigo-200 group-hover:border-indigo-300 transition-all shadow-xs group-hover:translate-x-0.5"
                >
                  <span>View Full ERP Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-700" />
                </Link>
              </div>
            </div>

            {/* BENTO CARD 3: Fintech & Digital Banking (4 Cols) */}
            <div
              onClick={() => {
                setSelectedService(services[2]);
                router.push("/services/fintech-banking-solutions");
              }}
              className={`reveal-init reveal-delay-1 lg:col-span-4 rounded-3xl p-6 sm:p-7 transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                selectedService.id === "fintech-banking-solutions"
                  ? "bg-white border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-300"
                  : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs">
                  <Banknote className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  PCI-DSS LEVEL 1
                </span>
              </div>

              <Link
                href="/services/fintech-banking-solutions"
                onClick={(e) => e.stopPropagation()}
                className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Fintech & Digital Banking</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <p className="text-xs text-emerald-700 font-mono font-semibold mt-0.5 mb-3">
                CORE_LEDGER // SUB-50MS PAYMENTS
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                Lending platforms, wallets and payment flows, sitting on a double-entry ledger that balances. Correctness and a full audit trail come before anything else here.
              </p>

              <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-200 shadow-xs font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-800 mb-1">
                  <span>Ledger Balance Drift:</span>
                  <span className="text-emerald-700 font-bold">0.00% (Strict Double-Entry)</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                  <span>Throughput:</span>
                  <span className="text-sky-800 font-bold">25,000 TPS Scalable</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">ISO 20022 Ready</span>
                <Link
                  href="/services/fintech-banking-solutions"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-200 group-hover:border-emerald-300 transition-all shadow-xs group-hover:translate-x-0.5"
                >
                  <span>View Fintech Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </Link>
              </div>
            </div>

            {/* BENTO CARD 4: Custom CRM & Sales Engines (4 Cols) */}
            <div
              onClick={() => {
                setSelectedService(services[3]);
                router.push("/services/custom-crm-automation");
              }}
              className={`reveal-init reveal-delay-2 lg:col-span-4 rounded-3xl p-6 sm:p-7 transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                selectedService.id === "custom-crm-automation"
                  ? "bg-white border-orange-400 shadow-xl shadow-orange-500/10 ring-1 ring-orange-300"
                  : "bg-white border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-orange-50 border border-orange-200 text-orange-700 shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
                  WHATSAPP CTI
                </span>
              </div>

              <Link
                href="/services/custom-crm-automation"
                onClick={(e) => e.stopPropagation()}
                className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-orange-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Custom CRM & Sales Engines</span>
                <ArrowRight className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <p className="text-xs text-orange-700 font-mono font-semibold mt-0.5 mb-3">
                OMNICHANNEL // CLOUD TELEPHONY
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                Built around how your reps actually work — WhatsApp where the conversation already happens, quotes in a click, and field visits logged from the phone rather than typed up later.
              </p>

              <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-200 shadow-xs font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-800 mb-1">
                  <span>Lead Response Velocity:</span>
                  <span className="text-orange-700 font-bold">&lt; 10s Automated Bot</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                  <span>Rep Allocation:</span>
                  <span className="text-emerald-800 font-bold">Round-Robin + Territory</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Zero Per-User Fees</span>
                <Link
                  href="/services/custom-crm-automation"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-xs font-bold text-orange-800 border border-orange-200 group-hover:border-orange-300 transition-all shadow-xs group-hover:translate-x-0.5"
                >
                  <span>View CRM Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-700" />
                </Link>
              </div>
            </div>

            {/* BENTO CARD 5: Autonomous AI Agents & Vector RAG (4 Cols) */}
            <div
              onClick={() => {
                setSelectedService(services[8]);
                router.push("/services/ai-solutions-automation");
              }}
              className={`reveal-init reveal-delay-3 lg:col-span-4 rounded-3xl p-6 sm:p-7 transition-all duration-300 relative overflow-hidden group cursor-pointer border ${
                selectedService.id === "ai-solutions-automation"
                  ? "bg-white border-emerald-400 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-300"
                  : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  140+ TOK/SEC
                </span>
              </div>

              <Link
                href="/services/ai-solutions-automation"
                onClick={(e) => e.stopPropagation()}
                className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>AI Agents & Vector RAG</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
              <p className="text-xs text-emerald-700 font-mono font-semibold mt-0.5 mb-3">
                PRIVATE_LLM // SUB-50MS VECTOR RETRIEVAL
              </p>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                Agents that read your own documents and answer from them, support that clears the repetitive half of the queue, and automations between systems nobody wanted to integrate.
              </p>

              <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-200 shadow-xs font-mono text-[11px]">
                <div className="flex items-center justify-between text-slate-800 mb-1">
                  <span>RAG Retrieval Latency:</span>
                  <span className="text-emerald-700 font-bold">&lt; 40ms Vector Index</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 text-[10px]">
                  <span>Operational Hours:</span>
                  <span className="text-sky-800 font-bold">60%+ Labor Reduction</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500 font-medium">DeepSeek & Claude 3.5</span>
                <Link
                  href="/services/ai-solutions-automation"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 border border-emerald-200 group-hover:border-emerald-300 transition-all shadow-xs group-hover:translate-x-0.5"
                >
                  <span>View AI Specs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* SERVICES PAGE VIEW: ALL 22 SERVICES DYNAMIC GRID */}
        {/* ======================================================== */}
        {!isHome && (
          <div className="mt-12">
            {filteredServices.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-4 border border-sky-200">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Capabilities Match Your Search</h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Try searching for keywords like &ldquo;Healthcare&rdquo;, &ldquo;Cloud&rdquo;, &ldquo;PropTech&rdquo;, &ldquo;AI&rdquo;, or reset the filters.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-sky-700 transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((svc, idx) => {
                  const isCurrent = selectedService.id === svc.id;
                  const badgeText = getServiceBadge(svc.id);

                  return (
                    <div
                      key={svc.id}
                      onClick={() => {
                        setSelectedService(svc);
                        router.push(`/services/${svc.id}`);
                      }}
                      className={`reveal-init rounded-3xl p-6 sm:p-7 transition-all duration-300 relative overflow-hidden group cursor-pointer border flex flex-col justify-between ${
                        isCurrent
                          ? "bg-white border-sky-500 shadow-xl shadow-sky-500/10 ring-2 ring-sky-300/60"
                          : "bg-white border-slate-200 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1"
                      }`}
                    >
                      {/* Ambient Accent Light */}
                      <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-sky-100/40 to-transparent rounded-full blur-2xl pointer-events-none group-hover:from-sky-200/40 transition-all"></div>

                      <div>
                        {/* Card Header: Icon + Badge */}
                        <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900 group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:border-sky-200 transition-all shadow-xs shrink-0">
                            {getServiceIcon(svc.iconName)}
                          </div>
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-sky-50 group-hover:text-sky-800 group-hover:border-sky-200 transition-all truncate max-w-[170px]">
                            {badgeText}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <div className="relative z-10 mb-3">
                          <Link
                            href={`/services/${svc.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-lg sm:text-xl font-semibold text-slate-900 group-hover:text-sky-700 transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>{svc.title}</span>
                            <ArrowRight className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                          </Link>
                          <p className="text-xs text-sky-700 font-mono font-semibold mt-1 line-clamp-1">
                            {svc.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 font-normal line-clamp-3 relative z-10">
                          {svc.description}
                        </p>

                        {/* Key Features List */}
                        <div className="space-y-2 mb-6 relative z-10">
                          {svc.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer: Ideal For & Navigation Button */}
                      <div className="pt-4 border-t border-slate-100 relative z-10 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500 font-mono truncate max-w-[140px]">
                          {svc.idealFor.split(",")[0]}
                        </span>

                        <Link
                          href={`/services/${svc.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs font-bold text-slate-800 hover:text-sky-800 border border-slate-200 hover:border-sky-300 group-hover:border-sky-300 transition-all shadow-xs group-hover:translate-x-0.5"
                        >
                          <span>Specs & Stack</span>
                          <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* HOMEPAGE ONLY: VIEW ALL 22+ SERVICES DISCOVERY PORTAL */}
        {/* ======================================================== */}
        {isHome && (
          <div className="reveal-init mt-14 rounded-3xl p-6 sm:p-10 bg-white border-2 border-sky-100 hover:border-sky-300 shadow-xl shadow-sky-900/5 relative overflow-hidden transition-all duration-300">
            {/* Ambient Lighting Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-100/60 via-cyan-50/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-50/50 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-8">
              {/* Header & Status Indicator */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#385d36] text-xs font-mono font-bold shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#5c9556] animate-pulse" />
                    <span>EVERYTHING ELSE WE TAKE ON</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900">
                    The Other Areas We Work In
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-2xl">
                    Past the systems above, we also build for property, logistics, education, retail and manufacturing. Pick any of these to see the stack, the timeline and what a build usually involves:
                  </p>
                </div>

                {/* Progress Meter */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 min-w-[220px] text-center md:text-right shrink-0 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <span className="text-slate-600 font-semibold">Catalog Status</span>
                    <span className="text-sky-700 font-bold">22 / 22 Active</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-500 to-teal-500 h-full rounded-full w-full transition-all duration-500"></div>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1.5 block font-mono font-medium">
                    100% Production Ready
                  </span>
                </div>
              </div>

              {/* 22 Services Discovery Grid (Interactive Light Tiles) */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Click Any Discipline to View Architecture, Tech Stack & SLAs:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {services.map((svc) => (
                    <Link
                      key={svc.id}
                      href={`/services/${svc.id}`}
                      className="p-3.5 rounded-2xl bg-white hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 shadow-2xs hover:shadow-md transition-all duration-200 group flex items-start gap-3 cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 text-slate-700 border border-slate-200 shrink-0 group-hover:bg-sky-50 group-hover:text-sky-700 group-hover:border-sky-300 group-hover:scale-105 transition-all">
                        {getServiceIcon(svc.iconName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate flex items-center gap-1">
                          <span>{svc.title}</span>
                          <ArrowRight className="w-3 h-3 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500 block truncate font-mono">{getServiceBadge(svc.id)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Big High-Impact Navigation Button Row */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-600 font-medium text-center sm:text-left">
                  Ready to view detailed technology stacks, milestone timelines & deliverables?
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
                  <Link
                    href="/services"
                    className="btn-futuristic-primary w-full sm:w-auto text-xs sm:text-sm !py-3 !px-6 !rounded-xl"
                  >
                    <span>View All 22 Services with Interactive Filters</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 text-center transition-all cursor-pointer"
                  >
                    Discuss Scope & ROI →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SERVICES PAGE ONLY: INTERACTIVE FEATURE DEEP DIVE SPOTLIGHT BAR */}
        {/* ======================================================== */}
        {!isHome && (
          <div className="mt-14 rounded-3xl border border-sky-200 p-6 sm:p-8 bg-white relative overflow-hidden shadow-lg shadow-sky-950/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-700">
                  <Sparkles className="w-4 h-4 text-sky-600" />
                  <span>SELECTED ARCHITECTURAL FOCUS // {selectedService.title}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900">
                  {selectedService.tagline}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {selectedService.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {selectedService.features.map((feat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 rounded-2xl bg-slate-50 border border-slate-200 p-6 space-y-4 text-center sm:text-left shadow-sm">
                <div className="text-xs uppercase tracking-wider font-mono font-bold text-sky-800">
                  Guaranteed Deliverables
                </div>
                <div className="space-y-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-sky-600 flex-shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href={`/services/${selectedService.id}`}
                    className="btn-futuristic-primary w-full text-xs sm:text-sm !py-3.5 !px-5 text-center flex items-center justify-center gap-2 !rounded-xl cursor-pointer"
                  >
                    <span>Explore Full {selectedService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-center text-xs text-slate-600 hover:text-sky-700 font-semibold transition-colors pt-1 cursor-pointer"
                  >
                    Or Discuss Scope & ROI →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
