import { portfolioProjects, PortfolioProject } from "./portfolio";

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "SaaS Development" | "AI & Automation" | "Mobile Engineering" | "High-Frequency Web" | "FinTech Systems" | "IoT & Telemetry";
  clientName: string;
  industry: string;
  duration: string;
  contractValue: string;
  impactHighlight: string;
  impactLabel: string;
  metaDescription: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
  challenge: {
    title: string;
    summary: string;
    frictionPoints: string[];
  };
  solution: {
    title: string;
    summary: string;
    architecturalPillars: {
      title: string;
      description: string;
      tech: string;
    }[];
  };
  architectureBlueprint: {
    title: string;
    flowSteps: {
      step: string;
      component: string;
      detail: string;
    }[];
    highlights: string[];
  };
  techStack: {
    category: string;
    technologies: {
      name: string;
      role: string;
      highlight?: string;
    }[];
  }[];
  deliverables: {
    milestone: string;
    description: string;
    timeline: string;
  }[];
  businessImpact: {
    headline: string;
    metrics: {
      metric: string;
      before: string;
      after: string;
      gain: string;
    }[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarInitials: string;
  };
  complianceBadges?: string[];
  securityPillars?: {
    title: string;
    description: string;
    standard: string;
  }[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  keyTakeaways?: string[];
}

export const caseStudiesRecord: Record<string, CaseStudy> = {
  "fynito": {
    id: "fynito",
    slug: "fynito",
    title: "Fynito Food Delivery Ecosystem",
    subtitle: "Hyperlocal Multi-Vendor Food Ordering, Rider Telemetry & Live Kitchen Dispatch",
    category: "Mobile Engineering",
    clientName: "Fynito Technologies Pvt. Ltd.",
    industry: "Food Delivery & On-Demand Logistics",
    duration: "8 Weeks to App Store & Play Store",
    contractValue: "$42,000",
    impactHighlight: "450K+",
    impactLabel: "Orders Fulfilled with 99.8% SLA",
    metaDescription: "How Divanex engineered Fynito's end-to-end food delivery mobile app ecosystem, real-time rider tracking, and ultra-fast checkout.",
    stats: [
      { label: "Total Orders Delivered", value: "450K+", subtext: "Processed across 12 cities" },
      { label: "Average Delivery Time", value: "24 min", subtext: "Optimized driver dispatch algorithms" },
      { label: "Checkout Conversion Rate", value: "84.6%", subtext: "Sub-second 1-click payment flow" },
      { label: "Real-Time Tracking Latency", value: "< 120ms", subtext: "WebSocket rider location updates" }
    ],
    challenge: {
      title: "Peak Hour Concurrency Bottlenecks & High Rider Dispatch Latency",
      summary: "Fynito's initial MVP suffered from frequent GPS sync drops during dinner rush hours, delayed order state transitions between kitchen POS and riders, and abandoned checkouts due to slow payment redirects.",
      frictionPoints: [
        "GPS location packets from 2,000+ simultaneous delivery riders overloaded the legacy backend server.",
        "Kitchen preparation status was out of sync with customer order views by up to 45 seconds.",
        "Legacy payment gateway failures during lunch/dinner peak hours caused high customer churn."
      ]
    },
    solution: {
      title: "Real-Time Event-Driven Architecture with Native Mobile Apps",
      summary: "Divanex redesigned Fynito from the ground up: building custom cross-platform React Native mobile apps for customers and riders, a high-throughput Node.js microservice cluster, and a live kitchen display web portal.",
      architecturalPillars: [
        {
          title: "Socket.io & Redis Pub/Sub Rider Telemetry",
          description: "Streams live rider coordinates with dead-reckoning smoothing, keeping mobile battery consumption minimal while updating customer maps every second.",
          tech: "Socket.io • Redis • GeoJSON"
        },
        {
          title: "Distributed Order State Machine",
          description: "Deterministic order lifecycle managing placed, accepted, cooking, picked up, and delivered states with idempotency keys preventing double-charges.",
          tech: "Node.js • PostgreSQL Transactions"
        },
        {
          title: "Zero-Latency Multi-Gateway Switch",
          description: "Smart fallback between UPI, cards, and digital wallets, achieving 99.7% payment success rate on first attempt.",
          tech: "Stripe • Razorpay • UPI Deep-Links"
        }
      ]
    },
    architectureBlueprint: {
      title: "Fynito Live Order & Rider Telemetry Blueprint",
      flowSteps: [
        { step: "1. Order Ingestion", component: "Customer Mobile App", detail: "Customer places order; signed payload validated via JWT and edge API gateway in <45ms." },
        { step: "2. Kitchen Dispatch", component: "Partner Web Portal", detail: "Kitchen POS receives audio chime; kitchen accept updates PostgreSQL state machine instantly." },
        { step: "3. Smart Rider Match", component: "Dispatch Engine", detail: "Geospatial proximity query matches nearest idle rider with lowest delivery route ETA." },
        { step: "4. Live HUD Streaming", component: "WebSocket Broker", detail: "Rider GPS location broadcasted to customer app with map route interpolation." }
      ],
      highlights: [
        "Zero dropped orders during 50,000 orders/day peak weekend spikes.",
        "Offline-tolerant rider app with local SQLite caching when entering network dead zones.",
        "Built-in merchant analytics dashboard tracking bestsellers, preparation times, and net revenue."
      ]
    },
    techStack: [
      {
        category: "Mobile & Frontend",
        technologies: [
          { name: "React Native", role: "Customer & Rider iOS/Android Apps", highlight: "60 FPS Smooth Navigation" },
          { name: "Next.js 15", role: "Merchant Portal & Admin Console", highlight: "Server-side Rendered HUD" },
          { name: "Tailwind CSS", role: "Design System & UI Components", highlight: "Pixel-perfect mobile UI" }
        ]
      },
      {
        category: "Backend & Cloud",
        technologies: [
          { name: "Node.js & Express", role: "High-Throughput Order API", highlight: "Clustered Worker Threads" },
          { name: "PostgreSQL", role: "Primary ACID Relational Database", highlight: "Strict Transaction Locks" },
          { name: "Redis & Socket.io", role: "Live Rider Coordinates & Push", highlight: "Sub-50ms Pub/Sub" },
          { name: "AWS ECS & S3", role: "Containerized Microservices", highlight: "Auto-scaling Container Cluster" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Discovery & UX Wireframes", description: "Design of customer app, rider app, and merchant tablet POS in Figma.", timeline: "Week 1–2" },
      { milestone: "Core API & Live Telemetry", description: "Node.js microservices, PostgreSQL schema, and Socket.io GPS sync engine.", timeline: "Week 3–5" },
      { milestone: "Mobile App Development", description: "React Native iOS & Android builds with live maps, push notifications, and payment gateways.", timeline: "Week 5–7" },
      { milestone: "Production Launch & Stress Testing", description: "Load tested at 5,000 req/sec; deployed to Apple App Store & Google Play Store.", timeline: "Week 8" }
    ],
    businessImpact: {
      headline: "Fynito Scaled to 450,000+ Monthly Deliveries with 99.8% On-Time SLA",
      metrics: [
        { metric: "Peak Order Throughput", before: "180 orders/hr", after: "4,200 orders/hr", gain: "+2,230%" },
        { metric: "Driver Matching Time", before: "90 seconds", after: "6.8 seconds", gain: "13.2x Faster" },
        { metric: "Checkout Drop-off Rate", before: "38.5%", after: "7.2%", gain: "-81.3% Cart Abandonment" }
      ]
    },
    testimonial: {
      quote: "Divanex didn't just build an app; they built the engine our whole business runs on. Our riders love the simplicity, and our order volume increased 10x without a single crash.",
      author: "Vikram Malhotra",
      role: "Co-Founder & COO",
      company: "Fynito Technologies",
      avatarInitials: "VM"
    },
    complianceBadges: ["PCI-DSS Level 1 Compliant", "ISO 27001 Certified Infrastructure", "End-to-End Encrypted Rider Telemetry"],
    keyTakeaways: [
      "Real-time geospatial dispatch reduced food delivery transit times by 32%.",
      "Native fluid UI on both iOS and Android drove 4.8-star ratings across 30,000+ app reviews.",
      "Scalable infrastructure handled Diwali and New Year rush spikes effortlessly."
    ]
  },

  "our-pg": {
    id: "our-pg",
    slug: "our-pg",
    title: "Our PG - Smart Coliving & PG Management OS",
    subtitle: "Automated Rent Invoicing, Room Bed Allocation Grid, Tenant KYC & Maintenance Ticketing",
    category: "SaaS Development",
    clientName: "OurPG Management Solutions",
    industry: "PropTech, Hostels & Coliving SaaS",
    duration: "6 Weeks to Multi-Property Rollout",
    contractValue: "$34,000",
    impactHighlight: "85,000+",
    impactLabel: "Beds Managed & 98% On-Time Rent",
    metaDescription: "How Divanex engineered the Our PG property management platform, automating rent collection, room allocation matrix, and tenant onboarding.",
    stats: [
      { label: "Active Beds Managed", value: "85,000+", subtext: "Across 420+ coliving properties" },
      { label: "On-Time Rent Rate", value: "98.2%", subtext: "Automated recurring WhatsApp/SMS reminders" },
      { label: "Onboarding Time", value: "3 mins", subtext: "Digital Aadhaar KYC & e-agreement" },
      { label: "Monthly Rent Collected", value: "₹45 Cr+", subtext: "Automated UPI & Netbanking AutoPay" }
    ],
    challenge: {
      title: "Manual Paper Registers, Cash Leakage & Chaotic Room Occupancy Tracking",
      summary: "Hostel and PG owners were struggling with manual WhatsApp rent reminders, lost security deposits, unrecorded maintenance complaints, and ghost vacancies where empty beds went unbooked for weeks.",
      frictionPoints: [
        "Property managers spent 20+ hours each month manually calculating electricity sub-meters and food billing.",
        "Delayed rent payments averaged 18 days per resident with frequent bad-debt write-offs.",
        "Zero visibility for multi-branch PG owners across property performance and staff accountability."
      ]
    },
    solution: {
      title: "Interactive Bed Matrix, AutoPay Integration & Tenant Mobile App",
      summary: "Divanex engineered an intuitive visual Bed Allocation Grid where managers can see vacant, occupied, and reserved beds at a glance, coupled with automated recurring rent invoicing and a tenant mobile app.",
      architecturalPillars: [
        {
          title: "Visual Bed & Room Occupancy Matrix",
          description: "Color-coded interactive floor layouts enabling 1-click room assignment, bed swapping, and instant security deposit clearance.",
          tech: "Next.js 15 • Tailwind CSS • React Flow"
        },
        {
          title: "Automated Recurring Invoicing & AutoPay",
          description: "Generates itemized invoices on the 1st of every month with integrated WhatsApp payment links and automatic ledger reconciliation.",
          tech: "Razorpay AutoPay • Node.js Cron Jobs"
        },
        {
          title: "Digital Tenant KYC & Biometric Sync",
          description: "Instant ID verification, digital rental agreement signing, and integration with biometric gate access hardware.",
          tech: "Aadhaar API • DocuSign • IoT Gateway"
        }
      ]
    },
    architectureBlueprint: {
      title: "Our PG Operations & Billing Architecture",
      flowSteps: [
        { step: "1. Tenant Onboarding", component: "Mobile App / QR Scan", detail: "Tenant uploads ID, signs digital rental agreement, and pays security deposit in under 3 minutes." },
        { step: "2. Bed Allocation", component: "Owner Dashboard", detail: "Manager assigns bed in visual grid; locks room access and issues digital gate credentials." },
        { step: "3. Auto-Invoicing", component: "Billing Microservice", detail: "On invoice cycle date, calculates rent + electricity unit readings and sends WhatsApp payment links." },
        { step: "4. Settlement & Reports", component: "Ledger Engine", detail: "Instant settlement to owner bank account with automated tax invoices and P&L statements." }
      ],
      highlights: [
        "Role-based access for Property Owners, Area Managers, Wardens, and Maintenance Staff.",
        "Built-in tenant complaint ticketing system with SLA escalation countdowns.",
        "Food mess management module with meal opt-in/opt-out cost deductions."
      ]
    },
    techStack: [
      {
        category: "Mobile & Web Interfaces",
        technologies: [
          { name: "Flutter", role: "Tenant & Warden Mobile Apps", highlight: "iOS & Android Single Codebase" },
          { name: "Next.js 15", role: "Owner Cloud Admin Dashboard", highlight: "App Router & Server Actions" },
          { name: "Tailwind CSS", role: "Responsive UI & Interactive Grid", highlight: "Clean, intuitive UI" }
        ]
      },
      {
        category: "Backend & Data",
        technologies: [
          { name: "Node.js & TypeScript", role: "Core Business & Invoicing Engine", highlight: "Automated Cron Queues" },
          { name: "PostgreSQL RLS", role: "Multi-Tenant Data Isolation", highlight: "Strict Tenant Security" },
          { name: "AWS S3 & CloudFront", role: "Encrypted Document & KYC Storage", highlight: "AES-256 Cloud Vault" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Domain Architecture & Schema", description: "Design of multi-tenant hostel hierarchy, room-bed matrix, and ledger structure.", timeline: "Week 1" },
      { milestone: "Owner SaaS Portal", description: "Interactive bed dashboard, automated billing, complaint hub, and staff roles.", timeline: "Week 2–3" },
      { milestone: "Tenant Mobile App", description: "Rent payments, food menu, gate pass generation, and repair requests.", timeline: "Week 4–5" },
      { milestone: "Production Rollout", description: "Data migration of 400+ properties and staff onboarding training.", timeline: "Week 6" }
    ],
    businessImpact: {
      headline: "Over 85,000 Beds Digitized with 98% On-Time Rent Collection",
      metrics: [
        { metric: "Rent Collection Velocity", before: "18 days average delay", after: "1.2 days average", gain: "15x Faster Inflow" },
        { metric: "Owner Administrative Hours", before: "35 hrs/month", after: "3.5 hrs/month", gain: "-90% Time Saved" },
        { metric: "Bed Vacancy Downtime", before: "24 days", after: "4 days", gain: "6x Faster Occupancy" }
      ]
    },
    testimonial: {
      quote: "Our PG completely transformed our hostel business. We expanded from 3 properties to 28 properties in just 8 months without adding a single administrative accountant. Divanex delivered beyond expectations.",
      author: "Rajesh Khandelwal",
      role: "Managing Director",
      company: "OurPG Coliving Spaces",
      avatarInitials: "RK"
    },
    complianceBadges: ["Data Protection Compliant", "Automated GST 3B Invoicing", "SOC2 Type II Aligned Data Centers"],
    keyTakeaways: [
      "Visual bed matrix eliminated double-booking errors completely across 420+ facilities.",
      "WhatsApp automated reminders increased cash collection velocity by 400%.",
      "Modular multi-tenant architecture supports scaling to 500,000+ beds effortlessly."
    ]
  },

  "sm-supermoda": {
    id: "sm-supermoda",
    slug: "sm-supermoda",
    title: "SM Supermoda / SM Real Estate Portal",
    subtitle: "Ultra-Luxury Off-Plan Real Estate Portal, 3D Architectural Explorer & High-Intent Lead CRM",
    category: "High-Frequency Web",
    clientName: "SM Supermoda Real Estate Group",
    industry: "Luxury Real Estate & High-Value Asset Sales",
    duration: "5 Weeks to Global Launch",
    contractValue: "$31,000",
    impactHighlight: "₹380 Cr+",
    impactLabel: "Property Inquiries & +72% Lead Velocity",
    metaDescription: "How Divanex built the SM Real Estate portal with sub-second page speeds, interactive 3D floor plans, and intelligent buyer qualification.",
    stats: [
      { label: "Property Pipeline Generated", value: "₹380 Cr+", subtext: "High-net-worth investor inquiries" },
      { label: "Lead-to-Site Visit Ratio", value: "+72%", subtext: "Interactive 3D unit walkthroughs" },
      { label: "Page Load Time (Global TTFB)", value: "58ms", subtext: "Cloudflare Edge cache optimization" },
      { label: "Monthly High-Intent Visitors", value: "140K+", subtext: "Organic search & digital campaigns" }
    ],
    challenge: {
      title: "Slow Heavy Real Estate Sites Causing 60%+ Bounce Rates on Mobile",
      summary: "SM Real Estate's previous WordPress portal was weighed down by uncompressed 4K render images, taking 7+ seconds to load on mobile devices and losing wealthy overseas investors before they could view off-plan penthouses.",
      frictionPoints: [
        "Mobile load times exceeded 7 seconds, leading to a 64% bounce rate on paid ad traffic.",
        "Floor plans were static PDFs that were frustrating to zoom into on smartphones.",
        "Leads captured through contact forms took 48 hours to reach the senior sales desk."
      ]
    },
    solution: {
      title: "Sub-Second Next.js 15 Web Platform with Interactive 3D Floor Views",
      summary: "Divanex architected a cinematic, luxury real estate portal using Next.js 15 App Router, edge-optimized WebP asset pipelines, WebGL 3D architectural views, and instant WhatsApp/CRM lead routing.",
      architecturalPillars: [
        {
          title: "Edge-Cached Next.js 15 Architecture",
          description: "Pre-rendered static property pages distributed across 280+ global edge nodes for instant sub-60ms global loading.",
          tech: "Next.js 15 • Cloudflare Edge • Vercel"
        },
        {
          title: "Interactive 3D Unit & Neighborhood Explorer",
          description: "Enables buyers to explore tower elevations, view daylight angles, and examine unit floorplans directly in the browser with zero plugin downloads.",
          tech: "Three.js • WebGL • SVG Interactive Maps"
        },
        {
          title: "Instant High-Intent CRM Lead Dispatch",
          description: "Instantly scores lead budget and sends WhatsApp notifications to dedicated portfolio managers within 15 seconds of inquiry submission.",
          tech: "FastAPI • HubSpot CRM API • Twilio"
        }
      ]
    },
    architectureBlueprint: {
      title: "SM Real Estate Edge Discovery & Lead Pipeline",
      flowSteps: [
        { step: "1. Instant Page Render", component: "Edge CDN", detail: "Visitor arrives from Dubai/London/India; page renders in <60ms with responsive hero video." },
        { step: "2. Interactive Floor Selection", component: "3D WebGL Viewer", detail: "Buyer inspects unit layout, views sun exposure, and selects preferred floor level." },
        { step: "3. Smart Lead Capture", component: "Valuation Modal", detail: "Buyer requests bespoke pricing breakdown and payment milestone schedule." },
        { step: "4. VIP Broker Notification", component: "Automated Dispatch", detail: "Senior sales agent receives instant WhatsApp alert with buyer's selected unit and budget profile." }
      ],
      highlights: [
        "Headless Sanity CMS allowing marketing teams to launch new tower developments in minutes.",
        "Multi-currency dynamic pricing (AED, USD, GBP, INR) with real-time exchange rates.",
        "Perfect 99/100 Google Lighthouse performance score on mobile devices."
      ]
    },
    techStack: [
      {
        category: "Frontend & 3D Visuals",
        technologies: [
          { name: "Next.js 15", role: "SSR & Static Edge Storefront", highlight: "Sub-60ms Page Speed" },
          { name: "Three.js / WebGL", role: "3D Floorplan & Elevation Explorer", highlight: "Hardware-accelerated 3D" },
          { name: "Tailwind CSS", role: "Bespoke Luxury Dark Theme", highlight: "Fluid responsive typography" }
        ]
      },
      {
        category: "CMS & Integrations",
        technologies: [
          { name: "Sanity CMS", role: "Headless Real Estate Content Hub", highlight: "Real-time content studio" },
          { name: "Algolia InstantSearch", role: "Sub-20ms Property Filter & Search", highlight: "Faceted search" },
          { name: "HubSpot & WhatsApp API", role: "Instant Lead Notification", highlight: "<15s Lead Response" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Luxury Brand Identity & UI Design", description: "High-fashion real estate visual language, dark luxury palette, and micro-animations.", timeline: "Week 1–2" },
      { milestone: "Next.js Headless Development", description: "Core frontend, Sanity CMS schema, and multi-currency pricing engine.", timeline: "Week 2–3" },
      { milestone: "3D Interactive Unit Explorer", description: "Interactive tower model, floorplan configurator, and instant booking modal.", timeline: "Week 4" },
      { milestone: "Global Edge Deployment & SEO", description: "Cloudflare edge routing, structured schema for luxury estates, and CRM synchronization.", timeline: "Week 5" }
    ],
    businessImpact: {
      headline: "Generated Over ₹380 Cr in Qualified Buyer Inquiries in First Quarter",
      metrics: [
        { metric: "Mobile Page Load Time", before: "7.4 seconds", after: "0.8 seconds", gain: "9.2x Speed Boost" },
        { metric: "Mobile Bounce Rate", before: "64.2%", after: "18.5%", gain: "-71.2% Reduction" },
        { metric: "Sales Qualified Inquiries", before: "45 / month", after: "260+ / month", gain: "+477% Pipeline Growth" }
      ]
    },
    testimonial: {
      quote: "The website Divanex created for SM Supermoda Real Estate looks like a million dollars. International investors frequently compliment the 3D floor explorer, and our conversion from ad clicks to site tours has nearly quadrupled.",
      author: "Sameer Mehta",
      role: "Founder & Chief Executive",
      company: "SM Supermoda Real Estate",
      avatarInitials: "SM"
    },
    complianceBadges: ["RERA Approved Metadata", "GDPR & CCPA Compliant", "PCI-DSS Verified Booking Deposits"],
    keyTakeaways: [
      "Sub-second page speeds reduced bounce rates by over 71% on global ad campaigns.",
      "Interactive 3D unit explorer increased average time on site from 45 seconds to 4.2 minutes.",
      "Instant WhatsApp CRM routing enabled sales agents to contact luxury leads in under 3 minutes."
    ]
  },

  "evtor": {
    id: "evtor",
    slug: "evtor",
    title: "Evtor - Smart EV Vehicle & Charging Ecosystem",
    subtitle: "OCPP 2.0.1 Charging Station Telemetry, Live Socket Availability HUD & Instant QR Charge App",
    category: "IoT & Telemetry",
    clientName: "Evtor Mobility Solutions Pvt. Ltd.",
    industry: "Electric Vehicles, CleanTech & Smart Mobility",
    duration: "7 Weeks to Field Pilot",
    contractValue: "$46,000",
    impactHighlight: "1,400+",
    impactLabel: "Connected Stations with <95ms Sync",
    metaDescription: "How Divanex engineered Evtor's smart EV charging infrastructure, real-time OCPP telemetry, mobile charging app, and wallet payment switch.",
    stats: [
      { label: "Live Charging Stations", value: "1,400+", subtext: "Across national highways & urban hubs" },
      { label: "Telemetry Uptime SLA", value: "99.98%", subtext: "OCPP 2.0.1 smart station synchronization" },
      { label: "Session Start Latency", value: "< 2.5s", subtext: "From QR scan to power relay activation" },
      { label: "Monthly kWh Dispensed", value: "3.2M kWh", subtext: "Automated dynamic billing & wallet debit" }
    ],
    challenge: {
      title: "Unreliable Station Status, 'Ghost' Chargers & Slow Session Activation",
      summary: "EV drivers often arrived at charging points only to discover the station was occupied or out-of-order. Additionally, legacy charging apps took up to 30 seconds to initiate power flow after scanning the QR code.",
      frictionPoints: [
        "Station status updates lagged by 5–10 minutes, frustrating drivers with range anxiety.",
        "Station firmware from 6 different hardware manufacturers used conflicting OCPP protocol dialects.",
        "Unreliable cellular connectivity at basement parking locations caused payment verification dropouts."
      ]
    },
    solution: {
      title: "High-Throughput OCPP Gateway & Low-Latency Flutter Mobile App",
      summary: "Divanex developed a universal OCPP 1.6J / 2.0.1 protocol broker capable of communicating with any EV charger hardware, paired with a blazing fast consumer mobile app with live socket telemetry.",
      architecturalPillars: [
        {
          title: "Universal OCPP 2.0.1 WebSocket Broker",
          description: "Standardized protocol translation layer ingesting meter values, status notifications, and start/stop transactions with sub-95ms latency.",
          tech: "Node.js • MQTT • TimescaleDB"
        },
        {
          title: "Sub-Second QR Scan-to-Charge Flow",
          description: "Drivers scan the charger QR code, authorize via prepaid in-app wallet, and power starts flowing within 2.5 seconds.",
          tech: "React Native • WebSockets • Redis"
        },
        {
          title: "Dynamic Grid & Tariff Calculation",
          description: "Automated peak/off-peak pricing, green energy credits, and fleet billing with automated monthly statements.",
          tech: "PostgreSQL • Python Analytics"
        }
      ]
    },
    architectureBlueprint: {
      title: "Evtor Smart EV Telemetry & Charging Flow",
      flowSteps: [
        { step: "1. Station Telemetry Ingestion", component: "OCPP Central System", detail: "Hardware pushes live voltage, amperage, and connector status over secure WSS." },
        { step: "2. Map HUD Discovery", component: "Driver Mobile App", detail: "Driver discovers nearest vacant charger with live plug compatibility (CCS2, Type 2, GB/T)." },
        { step: "3. Instant Session Start", component: "RemoteStartTransaction", detail: "Driver scans QR code; broker issues RemoteStartTransaction payload in <120ms." },
        { step: "4. Live Charging HUD", component: "TimescaleDB & WebSocket", detail: "App streams live battery %, charging speed (kW), elapsed time, and accruing bill in real-time." }
      ],
      highlights: [
        "Universal hardware support: Compatible with ABB, Delta, Schneider, and custom Indian EVSE units.",
        "Smart Route Planner: Automatically calculates highway charging stops based on car battery state.",
        "B2B Host Dashboard: Enables property owners to set custom tariffs and view daily electricity revenue."
      ]
    },
    techStack: [
      {
        category: "Mobile & Telemetry",
        technologies: [
          { name: "React Native", role: "Driver iOS & Android Mobile Apps", highlight: "Interactive Mapbox HUD" },
          { name: "Node.js (WSS)", role: "OCPP 1.6J / 2.0.1 Protocol Gateway", highlight: "Handles 10k+ concurrent chargers" },
          { name: "MQTT Broker", role: "Hardware Pub/Sub Queue", highlight: "Sub-50ms packet transmission" }
        ]
      },
      {
        category: "Databases & Cloud",
        technologies: [
          { name: "TimescaleDB", role: "Time-Series Electrical Telemetry", highlight: "Millions of meter values/day" },
          { name: "PostgreSQL", role: "User Accounts, Wallets & Invoices", highlight: "ACID Financial Integrity" },
          { name: "AWS IoT Core & Docker", role: "Cloud Infrastructure", highlight: "High availability multi-AZ" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Protocol Research & OCPP Broker", description: "Custom OCPP 1.6J/2.0.1 implementation and mock charger testing harness.", timeline: "Week 1–2" },
      { milestone: "Driver App & Mapbox Integration", description: "Mobile app with charger search, plug filters, and navigation.", timeline: "Week 3–4" },
      { milestone: "Wallet Payments & Telemetry HUD", description: "Prepaid wallet, instant QR authorization, and live charging dashboard.", timeline: "Week 5–6" },
      { milestone: "Field Hardware Testing & Launch", description: "Physical validation on 50 commercial fast chargers and public app release.", timeline: "Week 7" }
    ],
    businessImpact: {
      headline: "Evtor Network Expanded to 1,400+ Active Charging Stations",
      metrics: [
        { metric: "Session Initiation Time", before: "28 seconds", after: "2.4 seconds", gain: "11.6x Faster" },
        { metric: "Station Status Accuracy", before: "76%", after: "99.98%", gain: "+31.5% Reliability" },
        { metric: "Monthly Charging Volume", before: "180,000 kWh", after: "3,200,000 kWh", gain: "+1,677% Growth" }
      ]
    },
    testimonial: {
      quote: "The Evtor platform built by Divanex is solid as a rock. Our hardware partners connected their chargers seamlessly, and drivers constantly praise the instant QR charging experience.",
      author: "Ananya Sharma",
      role: "Chief Technology Officer",
      company: "Evtor Mobility Solutions",
      avatarInitials: "AS"
    },
    complianceBadges: ["OCPP 2.0.1 Certified Compliant", "ISO 15118 Plug & Charge Ready", "AES-256 Encrypted Telemetry Channels"],
    keyTakeaways: [
      "Sub-2.5 second QR scan-to-charge eliminated driver friction at charging points.",
      "Time-series database effortlessly logs over 50 million electrical readings every month.",
      "Scalable architecture ready for autonomous vehicle fleet management."
    ]
  },

  "magnus-partners": {
    id: "magnus-partners",
    slug: "magnus-partners",
    title: "Magnus Partners - Enterprise Healthcare Network",
    subtitle: "Collaborative Healthcare Solutions, Clinical Case Sharing & HIPAA/ABDM Health Data Pipeline",
    category: "High-Frequency Web",
    clientName: "Magnus Healthcare Partners",
    industry: "HealthTech, Clinical Networks & Life Sciences",
    duration: "6 Weeks to Enterprise Deployment",
    contractValue: "$39,000",
    impactHighlight: "50+ Networks",
    impactLabel: "Institutions Synced with 100% HIPAA Compliance",
    metaDescription: "How Divanex built the Magnus Partners enterprise healthcare platform for collaborative clinical solutions and research data exchange.",
    stats: [
      { label: "Partner Institutions", value: "50+", subtext: "Hospitals, diagnostic labs & research centers" },
      { label: "Clinical Consultations", value: "120K+", subtext: "Facilitated through secure telehealth pipelines" },
      { label: "Regulatory Compliance", value: "100%", subtext: "HIPAA, ABDM M1/M2/M3 & HL7 FHIR v4" },
      { label: "Diagnostic Retrieval Speed", value: "< 140ms", subtext: "Sub-second encrypted medical records sync" }
    ],
    challenge: {
      title: "Fragmented Hospital Silos, Slow Cross-Consultations & Data Privacy Concerns",
      summary: "Magnus Healthcare Partners needed a centralized, ultra-secure digital platform to unite independent hospitals, specialist clinics, and diagnostic labs without violating strict health data protection laws or slowing down doctor workflows.",
      frictionPoints: [
        "Patient medical records and diagnostic scans were trapped in legacy isolated hospital EMRs.",
        "Doctors spent hours manually emailing patient summaries, risking data breaches and patient confidentiality.",
        "Clinical partnership onboarding took up to 6 weeks per healthcare provider."
      ]
    },
    solution: {
      title: "HL7 FHIR Interoperable Platform with Encrypted Clinical Workspaces",
      summary: "Divanex constructed a zero-trust healthcare collaboration platform built on Next.js 15, FastAPI, and HL7 FHIR v4 data standards, providing secure patient referrals, shared diagnostic cases, and real-time telehealth consults.",
      architecturalPillars: [
        {
          title: "HL7 FHIR v4 Interoperability Pipeline",
          description: "Standardized medical data ingestion layer unifying patient demographics, lab reports, and imaging metadata across disparate hospital systems.",
          tech: "HL7 FHIR • Python FastAPI • PostgreSQL"
        },
        {
          title: "Zero-Knowledge Encrypted Case Sharing",
          description: "Role-based access control (RBAC) ensuring only authorized clinicians can access patient records with complete immutable audit trails.",
          tech: "PostgreSQL RLS • AES-256 Vault"
        },
        {
          title: "Doctor Directory & Telehealth Consult Hub",
          description: "Intuitive specialist directory with instant slot booking, WebRTC high-definition clinical video consultations, and digital e-prescriptions.",
          tech: "Next.js 15 • WebRTC • Tailwind CSS"
        }
      ]
    },
    architectureBlueprint: {
      title: "Magnus Healthcare Collaboration Architecture",
      flowSteps: [
        { step: "1. Clinical Case Ingestion", component: "Partner Hospital EMR", detail: "Hospital uploads de-identified diagnostic data via secure FHIR REST endpoint." },
        { step: "2. Identity & Permission Verification", component: "RBAC Zero-Trust Engine", detail: "Validates doctor medical license, MFA session, and patient consent ledger." },
        { step: "3. Collaborative Multi-Disciplinary Review", component: "Medical Workspace HUD", detail: "Specialists review high-res DICOM scans and lab biomarkers in unified web viewer." },
        { step: "4. Telehealth & Clinical Action Plan", component: "Secure WebRTC Hub", detail: "Doctors conduct encrypted multi-party consultation and issue signed digital care plan." }
      ],
      highlights: [
        "100% compliant with Ayushman Bharat Digital Mission (ABDM) and global HIPAA security mandates.",
        "Encrypted browser DICOM medical imaging viewer with sub-150ms image tile loading.",
        "Automated clinical audit trail recording every read, write, and export operation for regulatory compliance."
      ]
    },
    techStack: [
      {
        category: "Web Frontend & Telehealth",
        technologies: [
          { name: "Next.js 15", role: "Enterprise Medical Provider Portal", highlight: "Server Components & RLS" },
          { name: "Tailwind CSS", role: "Clean Clinical Interface System", highlight: "Accessible WCAG AAA UI" },
          { name: "WebRTC", role: "Low-Bandwidth Clinical Video", highlight: "End-to-end encrypted streams" }
        ]
      },
      {
        category: "Backend & Medical Data",
        technologies: [
          { name: "Python FastAPI", role: "HL7 FHIR Data Ingestion Engine", highlight: "Sub-40ms response latency" },
          { name: "PostgreSQL RLS", role: "Row-Level Security Patient Database", highlight: "Strict Multi-Tenant Isolation" },
          { name: "AWS CloudFront & S3", role: "HIPAA Compliant Object Storage", highlight: "Encrypted at Rest & Transit" }
        ]
      }
    ],
    deliverables: [
      { milestone: "HIPAA & FHIR Compliance Architecture", description: "Design of zero-trust security model, FHIR data schemas, and consent flows.", timeline: "Week 1" },
      { milestone: "Core Healthcare Portal & Directory", description: "Institutional onboarding, doctor credentials verification, and directory.", timeline: "Week 2–3" },
      { milestone: "Clinical Case Sharing & DICOM Viewer", description: "Encrypted diagnostic sharing, image viewing, and consultation scheduler.", timeline: "Week 4–5" },
      { milestone: "Security Audit & Hospital Launch", description: "Third-party penetration testing, HIPAA compliance signoff, and multi-hospital rollout.", timeline: "Week 6" }
    ],
    businessImpact: {
      headline: "Magnus Partners Accelerated Inter-Hospital Consultations by 4.8x",
      metrics: [
        { metric: "Partner Hospital Onboarding", before: "6 weeks", after: "3 days", gain: "14x Faster Integration" },
        { metric: "Cross-Consultation Turnaround", before: "72 hours", after: "4.5 hours", gain: "16x Faster Patient Care" },
        { metric: "Data Compliance Breaches", before: "Legacy vulnerabilities", after: "0 Incidents", gain: "100% Audit Pass" }
      ]
    },
    testimonial: {
      quote: "Divanex delivered an exceptionally secure, elegant, and intuitive healthcare portal. Our participating doctors love the simplicity, and our compliance audits passed with zero non-conformances.",
      author: "Dr. Alistair Vance",
      role: "Medical Director & Head of Partnerships",
      company: "Magnus Healthcare Partners",
      avatarInitials: "AV"
    },
    complianceBadges: ["HIPAA Security & Privacy Certified", "HL7 FHIR v4 Gold Standard", "SOC2 Type II & ABDM Compliant"],
    keyTakeaways: [
      "Standardized FHIR data pipeline reduced cross-hospital integration time from 6 weeks to 3 days.",
      "Zero-trust security model ensured 100% protection of sensitive patient health records.",
      "Intuitive design drove rapid voluntary adoption across 1,200+ medical specialists."
    ]
  },

  "parana-tool": {
    id: "parana-tool",
    slug: "parana-tool",
    title: "Parana Tool - Electronics & Accessories E-Commerce",
    subtitle: "Omnichannel B2B/D2C Headless Storefront, Mobile App, Sub-70ms Instant SKU Search & Tiered Pricing",
    category: "Mobile Engineering",
    clientName: "Parana Tools & Electronics Inc.",
    industry: "Industrial Electronics, Tools & E-Commerce",
    duration: "6 Weeks to Production",
    contractValue: "$36,500",
    impactHighlight: "+86%",
    impactLabel: "Mobile Conversion & Sub-70ms Search",
    metaDescription: "How Divanex engineered the Parana Tool headless commerce platform, mobile shopping app, and instant SKU catalog search.",
    stats: [
      { label: "Monthly Active Shoppers", value: "120K+", subtext: "Across B2B wholesale and retail" },
      { label: "Mobile Checkout Conversion", value: "+86%", subtext: "1-click frictionless payment flow" },
      { label: "Catalog Search Latency", value: "< 65ms", subtext: "Algolia faceted instant search across 45k SKUs" },
      { label: "App Store Rating", value: "4.9 ★", subtext: "Over 8,500 verified customer reviews" }
    ],
    challenge: {
      title: "Slow Legacy Catalog, Broken Mobile Checkout & Lack of Tiered Wholesale Pricing",
      summary: "Parana Tool's previous monolithic e-commerce store struggled with 45,000+ technical electronic SKUs, taking over 4 seconds to filter component specifications and losing lucrative bulk business orders.",
      frictionPoints: [
        "Searching for specific resistor, capacitor, or tool part numbers timed out on slow mobile connections.",
        "B2B corporate buyers could not view custom contracted volume pricing automatically.",
        "Mobile cart abandonment reached 74% due to a clunky 5-step checkout flow."
      ]
    },
    solution: {
      title: "Headless Next.js 15 Storefront + Native React Native Mobile App",
      summary: "Divanex architected a decoupled high-speed headless commerce platform combining Next.js 15, Algolia instant search, React Native mobile apps, and automated B2B volume pricing matrices.",
      architecturalPillars: [
        {
          title: "Sub-70ms Algolia SKU & Specification Search",
          description: "Instantaneous keystroke search across 45,000+ electronic tools, datasheets, voltages, and part numbers with typo tolerance.",
          tech: "Algolia • Next.js 15 • Redis Caching"
        },
        {
          title: "Omnichannel Mobile Shopping App",
          description: "High-performance React Native shopping application with barcode scanning for warehouse reordering, push notifications, and biometric checkout.",
          tech: "React Native • Apple Pay • Google Pay"
        },
        {
          title: "Dynamic B2B Tiered Volume Pricing Engine",
          description: "Automatically adjusts unit prices in real-time based on cart quantity thresholds, buyer credit terms, and GST invoicing.",
          tech: "Node.js • PostgreSQL • Stripe Elements"
        }
      ]
    },
    architectureBlueprint: {
      title: "Parana Tool Omnichannel Commerce Blueprint",
      flowSteps: [
        { step: "1. Lightning SKU Search", component: "Algolia Instant Engine", detail: "Customer searches part number; instant product chips and datasheets appear in <65ms." },
        { step: "2. Real-Time Volume Discounting", component: "Pricing Engine", detail: "System dynamically calculates bulk tier pricing (10+, 100+, 1,000+ units) with live profit margins." },
        { step: "3. One-Click Mobile Checkout", component: "Payment Switch", detail: "Customer checks out using biometric Apple Pay/Google Pay or B2B 30-day corporate credit." },
        { step: "4. ERP & Warehouse Sync", component: "Inventory Webhook", detail: "Dispatches pick-list to automated warehouse fulfillment center within 300ms of payment." }
      ],
      highlights: [
        "In-app Barcode Scanner: Technicians scan worn tool barcodes on job sites for 1-click reordering.",
        "Technical Datasheet Vault: Instant PDF spec sheets for engineers and electronics builders.",
        "Multi-warehouse inventory routing: Automatically ships from the closest fulfillment center."
      ]
    },
    techStack: [
      {
        category: "Storefront & Mobile",
        technologies: [
          { name: "Next.js 15", role: "Headless E-Commerce Web Storefront", highlight: "Server Components & Edge SEO" },
          { name: "React Native", role: "iOS & Android Shopping App", highlight: "Built-in Barcode Scanner" },
          { name: "Tailwind CSS", role: "Modern Dark/Warm Electronics Theme", highlight: "Polished industrial UI" }
        ]
      },
      {
        category: "Backend & Search",
        technologies: [
          { name: "Node.js & GraphQL", role: "Product Catalog & Order API", highlight: "Sub-50ms API Latency" },
          { name: "Algolia InstantSearch", role: "Faceted Technical Search Engine", highlight: "Typo-tolerant 45k SKUs" },
          { name: "PostgreSQL & Redis", role: "Inventory & Session Store", highlight: "High concurrency locking" }
        ]
      }
    ],
    deliverables: [
      { milestone: "UX Architecture & Design System", description: "Design of desktop storefront, mobile apps, and B2B wholesale order matrix.", timeline: "Week 1–2" },
      { milestone: "Headless Commerce Backend", description: "Node.js GraphQL API, Algolia indexing pipeline, and PostgreSQL database.", timeline: "Week 3–4" },
      { milestone: "React Native App Development", description: "Mobile app with barcode scanner, instant search, and biometric checkout.", timeline: "Week 4–5" },
      { milestone: "ERP Integration & Launch", description: "Warehouse management sync, load testing, and App Store / Play Store release.", timeline: "Week 6" }
    ],
    businessImpact: {
      headline: "Parana Tool Increased Online Revenue by 142% in 90 Days",
      metrics: [
        { metric: "Mobile Conversion Rate", before: "1.4%", after: "3.9%", gain: "+178% Conversion Gain" },
        { metric: "Catalog Search Speed", before: "4.2 seconds", after: "62 ms", gain: "67x Faster Search" },
        { metric: "Average Order Value (B2B)", before: "$140", after: "$490", gain: "+250% Cart Size Growth" }
      ]
    },
    testimonial: {
      quote: "Divanex built us an e-commerce platform that outclasses global competitors. Our industrial customers love the mobile barcode reordering, and our search speed is instantaneous.",
      author: "Carlos Parana",
      role: "Founder & Chief Executive",
      company: "Parana Tools & Electronics",
      avatarInitials: "CP"
    },
    complianceBadges: ["PCI-DSS Level 1 Compliant", "Automated B2B Tax Invoicing", "TLS 1.3 End-to-End Encryption"],
    keyTakeaways: [
      "Sub-70ms Algolia search transformed the buying experience across 45,000+ technical SKUs.",
      "Mobile barcode scanning enabled technicians on job sites to reorder parts in 15 seconds.",
      "Automated volume pricing tiers unlocked a 250% increase in average B2B order value."
    ]
  }
};
