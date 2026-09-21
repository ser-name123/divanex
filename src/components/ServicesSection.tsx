"use client";

import { useState, useMemo } from "react";
import { useSection } from "@/lib/useSection";
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
  Flame,
  ShieldCheck,
  Building2,
  Truck,
  Globe2,
  Search,
  X,
  SlidersHorizontal,
  Glasses,
  BatteryCharging
} from "lucide-react";

// The 8 Core Flagship Services showcased on the top-level / homepage (Business-Problem Oriented)
/**
 * A home page service card.
 *
 * The index signature is what lets `useSection` merge a stored record over one
 * of these: an operator can add a field the component does not read yet.
 */
interface CoreServiceItem extends Record<string, unknown> {
  id: string;
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  modulesSummary: string;
  description: string;
  iconName: string;
  modules: string[];
  features: string[];
  theme: {
    badgeClass: string;
    iconBg: string;
    iconColor: string;
    tagBg: string;
    tagText: string;
    glowBg: string;
  };
}


/** What this section was written with. A stored record replaces it field by field. */
const DEFAULT_CORE_HEADING = {
  "eyebrow": "CORE ENGINEERING CAPABILITIES",
  "title": "Eight Practices We Build In",
  "highlight": "",
  "description": ""
};

const DEFAULT_CORE_SERVICES: CoreServiceItem[] = [
  {
    id: "hospital-healthcare-management",
    slug: "hospital-healthcare-management",
    title: "Healthcare & Clinic Software",
    badge: "CLINICAL & COMPLIANT",
    tagline: "End-to-end digital hospital, clinic & telehealth operations",
    modulesSummary: "HMIS • Patient Portal • Doctor App • Lab • Pharmacy",
    description:
      "Modernize clinical workflows with automated electronic health records, doctor scheduling, integrated diagnostic lab workflows, and automated pharmacy inventory.",
    iconName: "Stethoscope",
    modules: ["HMIS & EMR", "Patient Portal", "Doctor App", "Lab / LIS", "Pharmacy POS", "Telehealth"],
    features: [
      "OPD/IPD patient flow, triage & digital prescriptions",
      "Automated pharmacy stock, billing & insurance claims",
      "Doctor mobile apps & secure patient health portals"
    ],
    theme: {
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
      iconBg: "bg-emerald-50 border-emerald-200",
      iconColor: "text-emerald-700",
      tagBg: "bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200/80",
      tagText: "text-emerald-900",
      glowBg: "from-emerald-100/30 to-transparent"
    }
  },
  {
    id: "saas-development",
    slug: "saas-development",
    title: "SaaS Platforms & Products",
    badge: "RECURRING REVENUE",
    tagline: "Subscriptions, metered billing & multi-tenant cloud scale",
    modulesSummary: "Multi-tenant • Subscription • Billing • Analytics",
    description:
      "Launch your multi-tenant SaaS platform with automated Stripe subscriptions, metered usage billing, subscriber analytics, and scalable cloud architecture.",
    iconName: "Layers",
    modules: ["Multi-tenant RLS", "Stripe Subscriptions", "Metered Billing", "Subscriber Analytics", "Admin Telemetry"],
    features: [
      "Multi-tenant setup with 100% customer data isolation",
      "Automated Stripe & Razorpay recurring billing",
      "Self-serve customer onboarding & admin telemetry"
    ],
    theme: {
      badgeClass: "bg-indigo-50 text-indigo-800 border-indigo-200",
      iconBg: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-700",
      tagBg: "bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-200/80",
      tagText: "text-indigo-900",
      glowBg: "from-indigo-100/30 to-transparent"
    }
  },
  {
    id: "ai-solutions-automation",
    slug: "ai-solutions-automation",
    title: "AI & Workflow Automation",
    badge: "AI AGENTS & RAG",
    tagline: "Connect existing tools & eliminate repetitive manual tasks",
    modulesSummary: "AI Agents • RAG • Document AI • Automation",
    description:
      "Connect your existing tools and automate repetitive workflows with custom AI assistants, smart document processing, vector search, and automated API pipelines.",
    iconName: "Cpu",
    modules: ["AI Agents", "RAG Pipelines", "Document AI / OCR", "Workflow Automation", "Custom LLM Integrations"],
    features: [
      "Custom AI assistants trained on your company data & SOPs",
      "Automated data sync across CRM, emails & spreadsheets",
      "Eliminate manual data entry and save 20+ hours per week"
    ],
    theme: {
      badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
      iconBg: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-700",
      tagBg: "bg-purple-50/70 hover:bg-purple-100/70 border-purple-200/80",
      tagText: "text-purple-900",
      glowBg: "from-purple-100/30 to-transparent"
    }
  },
  {
    id: "ecommerce-marketplace-platforms",
    slug: "ecommerce-marketplace-platforms",
    title: "E-Commerce & Marketplaces",
    badge: "MULTI-VENDOR ENGINE",
    tagline: "Sell products online with vendor payouts & fast checkout",
    modulesSummary: "Buyer • Seller • Payments • Commission • Admin",
    description:
      "Launch high-converting online storefronts or multi-vendor marketplaces with sub-second product search, automated commission splits, escrow, and merchant dashboards.",
    iconName: "ShoppingCart",
    modules: ["Buyer App", "Seller Portal", "Split Payments", "Commission Engine", "Superadmin Console"],
    features: [
      "Multi-vendor seller onboarding & automated commission splits",
      "Sub-second catalog search & friction-free mobile checkout",
      "Wholesale B2B tiered pricing, bulk discounts & customer accounts"
    ],
    theme: {
      badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
      iconBg: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-700",
      tagBg: "bg-amber-50/70 hover:bg-amber-100/70 border-amber-200/80",
      tagText: "text-amber-900",
      glowBg: "from-amber-100/30 to-transparent"
    }
  },
  {
    id: "mobile-app-development",
    slug: "web-app-development",
    title: "Mobile App Development",
    badge: "IOS & ANDROID NATIVE",
    tagline: "Fast, engaging mobile apps for Apple & Google Play",
    modulesSummary: "iOS • Android • GPS & Maps • Payments • Offline Sync",
    description:
      "iOS and Android apps with real-time features, secure payment checkout, live GPS maps, push notifications, and offline data synchronization.",
    iconName: "Smartphone",
    modules: ["iOS & Android Apps", "Live GPS & Maps", "Biometric Auth", "In-App Payments", "Offline Data Sync"],
    features: [
      "Single codebase for Apple App Store & Google Play",
      "Push notifications, camera & location hardware access",
      "Integrated checkout, subscriptions & biometric login"
    ],
    theme: {
      badgeClass: "bg-sky-50 text-sky-800 border-sky-200",
      iconBg: "bg-sky-50 border-sky-200",
      iconColor: "text-sky-700",
      tagBg: "bg-sky-50/70 hover:bg-sky-100/70 border-sky-200/80",
      tagText: "text-sky-900",
      glowBg: "from-sky-100/30 to-transparent"
    }
  },
  {
    id: "custom-web-applications",
    slug: "web-app-development",
    title: "Custom Web Applications",
    badge: "HIGH-SPEED PORTALS",
    tagline: "Client portals, internal tools & customer dashboards",
    modulesSummary: "Client Portals • Admin Tools • Dashboards • APIs • RBAC",
    description:
      "Transform your manual business operations into intuitive, lightning-fast web applications, self-serve customer portals, and interactive analytical dashboards.",
    iconName: "Globe2",
    modules: ["Client Portals", "Admin Consoles", "Real-Time Dashboards", "Role-Based RBAC", "REST/GraphQL APIs"],
    features: [
      "Custom customer portals, admin consoles & dashboards",
      "Role-based user permissions & secure authentication",
      "Fast, responsive design optimized for high conversion"
    ],
    theme: {
      badgeClass: "bg-blue-50 text-blue-800 border-blue-200",
      iconBg: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-700",
      tagBg: "bg-blue-50/70 hover:bg-blue-100/70 border-blue-200/80",
      tagText: "text-blue-900",
      glowBg: "from-blue-100/30 to-transparent"
    }
  },
  {
    id: "enterprise-erp-systems",
    slug: "enterprise-erp-systems",
    title: "ERP & Business Systems",
    badge: "ZERO SEAT FEES",
    tagline: "Unified inventory, supply chain, accounts & payroll",
    modulesSummary: "Inventory • GST Billing • Production • Supply Chain • HR",
    description:
      "Replace messy spreadsheets and rigid off-the-shelf software with an ERP tailored to your exact business operations—without recurring per-user license fees.",
    iconName: "Briefcase",
    modules: ["Multi-Warehouse Stock", "GST Invoicing", "Production & MRP", "Vendor Procurement", "Automated Payroll"],
    features: [
      "Multi-location warehouse inventory & barcode tracking",
      "Automated GST invoicing, double-entry ledger & payroll",
      "Production planning, vendor purchasing & live profit reports"
    ],
    theme: {
      badgeClass: "bg-slate-100 text-slate-800 border-slate-300",
      iconBg: "bg-slate-100 border-slate-300",
      iconColor: "text-slate-800",
      tagBg: "bg-slate-100/80 hover:bg-slate-200/80 border-slate-300/80",
      tagText: "text-slate-900",
      glowBg: "from-slate-200/30 to-transparent"
    }
  },
  {
    id: "cloud-devops",
    slug: "cloud-devops",
    title: "Cloud & DevOps Infrastructure",
    badge: "CRASH-PROOF CLOUD",
    tagline: "Zero-downtime hosting, security & cloud cost reduction",
    modulesSummary: "AWS • GCP • Docker Pods • Auto-Scaling • CI/CD",
    description:
      "Ensure your applications never crash under heavy traffic. We engineer auto-scaling cloud servers, automated CI/CD pipelines, 24/7 security, and reduce monthly cloud bills.",
    iconName: "Cloud",
    modules: ["AWS & GCP Setup", "Docker & Kubernetes", "Zero-Downtime CI/CD", "Automated Backups", "Cost Optimization"],
    features: [
      "Auto-scaling servers that handle traffic surges seamlessly",
      "Automated daily backups & continuous disaster recovery",
      "Cloud audit to reduce your AWS/GCP hosting costs by up to 40%"
    ],
    theme: {
      badgeClass: "bg-teal-50 text-teal-800 border-teal-200",
      iconBg: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-700",
      tagBg: "bg-teal-50/70 hover:bg-teal-100/70 border-teal-200/80",
      tagText: "text-teal-900",
      glowBg: "from-teal-100/30 to-transparent"
    }
  }
];

// Category membership for the full /services catalog
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
  const { items: coreServices } = useSection<CoreServiceItem>("home/core-services", {
    heading: DEFAULT_CORE_HEADING,
    items: DEFAULT_CORE_SERVICES,
  });

  const [activeCategory, setActiveCategory] = useState<"all" | "enterprise" | "fintech_commerce" | "ai_cloud">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);

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
        return "CLINIC & HMIS WORKFLOWS";
      case "enterprise-erp-systems":
        return "INVENTORY & GST BILLING";
      case "fintech-banking-solutions":
        return "PAYMENT RAILS & LEDGERS";
      case "custom-crm-automation":
        return "WHATSAPP & SALES LEADS";
      case "ecommerce-marketplace-platforms":
        return "MULTI-VENDOR COMMERCE";
      case "edtech-learning-management":
        return "STUDENT LMS & CLASSROOM";
      case "saas-development":
        return "MULTI-TENANT & BILLING";
      case "web-app-development":
        return "WEB & MOBILE APPS";
      case "ai-solutions-automation":
        return "AI WORKFLOW AUTOMATION";
      case "seo-digital-growth":
        return "HIGH-CONVERSION SPEED";
      case "ui-ux-design":
        return "FIGMA TO PRODUCTION UI";
      case "cloud-devops":
        return "HIGH-AVAILABILITY CLOUD";
      case "cybersecurity-compliance":
        return "DATA PRIVACY SAFEGUARDS";
      case "real-estate-proptech":
        return "PROPERTY CRM & 3D TOURS";
      case "logistics-fleet-telematics":
        return "LIVE GPS FLEET TRACKING";
      case "iot-embedded-telemetry":
        return "HARDWARE & SENSOR IOT";
      case "headless-cms-media":
        return "FAST MEDIA & CMS HUB";
      case "generative-ai-agentic-fabric":
        return "AI AGENTS & RAG PIPELINES";
      case "restaurant-pos-hospitality":
        return "OFFLINE-FIRST RESTAURANT POS";
      case "web3-defi-blockchain":
        return "DEFI & ASSET LEDGERS";
      case "data-engineering-bi-analytics":
        return "EXECUTIVE BI DASHBOARDS";
      case "legaltech-contract-automation":
        return "CONTRACT AI & E-SIGN";
      case "ar-vr-spatial-computing":
        return "3D PRODUCT CONFIGURATOR";
      case "energytech-smart-grid":
        return "EV CHARGING & TELEMETRY";
      default:
        return "ENTERPRISE READY";
    }
  };

  const getServiceTechStack = (id: string) => {
    switch (id) {
      case "ai-solutions-automation":
        return "OpenAI • Claude • LangGraph • RAG • FastAPI";
      case "generative-ai-agentic-fabric":
        return "DeepSeek • Claude • Python FastAPI • RAG • Vector DB";
      case "saas-development":
        return "Next.js 15 • Stripe Subscriptions • PostgreSQL • AWS";
      case "web-app-development":
        return "Next.js 15 • React Native • TypeScript • Tailwind";
      case "hospital-healthcare-management":
        return "Next.js • React Native • Node.js • PostgreSQL • HIPAA Vault";
      case "enterprise-erp-systems":
        return "Next.js • Node.js • PostgreSQL • Barcode SDK";
      case "fintech-banking-solutions":
        return "Next.js • Go / Node.js • PostgreSQL • Stripe / Razorpay";
      case "custom-crm-automation":
        return "Next.js • WhatsApp Cloud API • Node.js • Webhooks";
      case "ecommerce-marketplace-platforms":
        return "Next.js • Stripe Escrow • Algolia • PostgreSQL";
      case "edtech-learning-management":
        return "React • WebRTC Live • Node.js • PostgreSQL";
      case "real-estate-proptech":
        return "Next.js • Three.js 3D • Mapbox • WhatsApp API";
      case "logistics-fleet-telematics":
        return "React Native • WebSockets • Redis • Node.js";
      case "iot-embedded-telemetry":
        return "Node.js • MQTT Broker • TimescaleDB • Docker";
      case "restaurant-pos-hospitality":
        return "Electron • SQLite Offline • Next.js • Cloud Sync";
      case "cloud-devops":
        return "AWS • GCP • Docker • GitHub Actions CI/CD";
      case "cybersecurity-compliance":
        return "Zero-Trust IAM • SAST/DAST • Cloudflare • Vault";
      case "data-engineering-bi-analytics":
        return "Python • PostgreSQL • Apache Kafka • PowerBI";
      case "legaltech-contract-automation":
        return "Next.js • Document AI • PDFKit • Digital Signatures";
      case "ar-vr-spatial-computing":
        return "Three.js • WebGL • Canvas • WebXR";
      case "energytech-smart-grid":
        return "OCPP 2.0.1 • WebSockets • TimescaleDB • React Native";
      case "seo-digital-growth":
        return "Next.js ISR • Edge Cache • Core Web Vitals • Schema.org";
      case "ui-ux-design":
        return "Figma • Design Tokens • Tailwind CSS • Micro-animations";
      case "headless-cms-media":
        return "Next.js • Sanity / Strapi • Cloudflare CDN";
      case "web3-defi-blockchain":
        return "Solidity • Ethers.js • Node.js • WebSockets";
      default:
        return "React • Next.js • Node.js • PostgreSQL";
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
    <section id="services" className="scroll-mt-24 relative py-12 lg:py-16 overflow-hidden bg-slate-50/50">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="reveal-init text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-mono font-bold text-sky-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span className="tracking-wider uppercase">
              {isHome ? "WHAT WE BUILD // CORE CAPABILITIES" : "WHAT WE BUILD // 24 ENGINEERING CAPABILITIES"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight text-slate-900 leading-tight">
            {isHome ? (
              <>
                Software Built for Your{" "}
                <span className="gradient-text font-semibold">Exact Business Model</span>
              </>
            ) : (
              <>
                Software Built to Solve{" "}
                <span className="gradient-text font-semibold">Real Business Problems</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            {isHome
              ? "From multi-tenant SaaS and AI pipelines to clinical healthcare, ERPs, and multi-vendor marketplaces—we engineer the exact architecture, user portals, and automated backoffices your product needs."
              : "Hospital and clinic software, multi-tenant SaaS products, ERP and inventory platforms, payment and ledger engines, AI agents, mobile apps. If it has to stay up and stay correct, it is the kind of work we take on."}
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
                  <span>Showing {filteredServices.length} of {services.length} Engineering Capabilities</span>
                  {searchQuery && <span>Filter Active</span>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* HOMEPAGE VIEW: CLEAN 8 CORE SERVICES HIGH-IMPACT GRID   */}
        {/* ======================================================== */}
        {isHome && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((svc) => {
              return (
                <div
                  key={svc.id}
                  onClick={() => router.push(`/services/${svc.slug}`)}
                  className="reveal-init rounded-3xl p-6 sm:p-7 bg-white border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-950/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  {/* Ambient accent glow on hover */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${svc.theme.glowBg} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}></div>

                  <div>
                    {/* Card Header: Icon + Domain Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs shrink-0 group-hover:scale-105 transition-all ${svc.theme.iconBg} ${svc.theme.iconColor}`}>
                        {getServiceIcon(svc.iconName)}
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border transition-all truncate max-w-[170px] ${svc.theme.badgeClass}`}>
                        {svc.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="relative z-10 mb-2">
                      <Link
                        href={`/services/${svc.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>{svc.title}</span>
                        <ArrowRight className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                      </Link>
                      <p className="text-xs text-slate-500 font-mono font-medium mt-1 line-clamp-1">
                        {svc.tagline}
                      </p>
                    </div>

                    {/* Instant High-Impact Modules String Strip */}
                    <div className="relative z-10 mb-4 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 group-hover:border-sky-200 group-hover:bg-sky-50/40 transition-colors">
                      <div className="text-[10px] font-mono font-bold tracking-wide uppercase text-slate-700">
                        {svc.modulesSummary}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal line-clamp-2 relative z-10">
                      {svc.description}
                    </p>

                    {/* Included Modules Pill Cloud */}
                    <div className="relative z-10 mb-5">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-sky-600" />
                        <span>Core Modules Built</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {svc.modules.map((mod, mIdx) => (
                          <span
                            key={mIdx}
                            className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-colors ${svc.theme.tagBg} ${svc.theme.tagText}`}
                          >
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-3.5 border-t border-slate-100 relative z-10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-600 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Production Ready</span>
                    </span>
                    <Link
                      href={`/services/${svc.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs font-bold text-slate-800 hover:text-sky-800 border border-slate-200 hover:border-sky-300 group-hover:border-sky-300 transition-all shadow-xs group-hover:translate-x-0.5"
                    >
                      <span>Explore Modules</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sky-600" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* HOMEPAGE ONLY: EXPANDED 24 SERVICES DISCOVERY PORTAL     */}
        {/* ======================================================== */}
        {isHome && (
          <div className="reveal-init mt-12 rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-sm relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-100/40 via-cyan-50/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0f7670]" />
                  <span>EXPANDED PRACTICE AREAS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Looking for a Specialized or Niche Engineering Capability?
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal max-w-2xl">
                  Beyond our 8 core services, we also engineer platforms for PropTech, Fintech & Banking, Logistics & Telematics OS, Industrial IoT, EdTech, Restaurant POS, Web3, and LegalTech.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto shrink-0">
                <Link
                  href="/services"
                  className="btn-futuristic-primary w-full sm:w-auto text-xs sm:text-sm !py-3.5 !px-6 !rounded-xl"
                >
                  <span>View All 24 Engineering Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold border border-slate-200 text-center transition-all cursor-pointer"
                >
                  Book a Consultation →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SERVICES PAGE VIEW: ALL 24 SERVICES DYNAMIC GRID         */}
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
                {filteredServices.map((svc) => {
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
                            className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors inline-flex items-center gap-1.5"
                          >
                            <span>{svc.title}</span>
                            <ArrowRight className="w-4 h-4 text-sky-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                          </Link>
                          <p className="text-xs text-sky-800 font-semibold mt-1 line-clamp-1">
                            {svc.tagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-normal line-clamp-3 relative z-10">
                          {svc.description}
                        </p>

                        {/* Key Features List */}
                        <div className="space-y-2 mb-4 relative z-10">
                          {svc.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Technology Strip */}
                        <div className="pt-3 pb-2 border-t border-slate-100 relative z-10 mb-2">
                          <div className="text-[11px] font-mono flex items-center gap-1.5 truncate">
                            <span className="text-slate-400 font-medium shrink-0">Powered by:</span>
                            <span className="text-slate-700 font-bold truncate">{getServiceTechStack(svc.id)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Ideal For & Navigation Button */}
                      <div className="pt-3 border-t border-slate-100 relative z-10 flex items-center justify-between gap-2">
                        <span className="text-[11px] text-slate-500 font-mono truncate max-w-[140px]">
                          {svc.idealFor.split(",")[0]}
                        </span>

                        <Link
                          href={`/services/${svc.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 text-xs font-bold text-slate-800 hover:text-sky-800 border border-slate-200 hover:border-sky-300 group-hover:border-sky-300 transition-all shadow-xs group-hover:translate-x-0.5"
                        >
                          <span>Explore Solutions</span>
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
        {/* SERVICES PAGE ONLY: FEATURE DEEP DIVE SPOTLIGHT BAR      */}
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
                    Book a Consultation →
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
