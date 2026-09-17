import { portfolioProjects, PortfolioProject } from "./portfolio";

export interface CaseStudyScreenshot {
  id: string;
  title: string;
  description: string;
  type: "mobile" | "web" | "dashboard" | "telemetry";
  badge: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "SaaS Development" | "AI & Automation" | "Mobile Engineering" | "High-Frequency Web" | "FinTech Systems" | "IoT & Telemetry";
  clientName: string;
  industry: string;
  timeline: string;
  duration: string;
  contractValue: string;
  impactHighlight: string;
  impactLabel: string;
  metaDescription: string;
  team: string[];
  problem: {
    headline: string;
    description: string;
    frictionPoints: string[];
  };
  whatWeBuilt: {
    headline: string;
    summary: string;
    pillars: {
      title: string;
      description: string;
      tech: string;
    }[];
  };
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
  screenshots?: CaseStudyScreenshot[];
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
    timeline: "8 Weeks (4 Sprints of 2 Weeks)",
    duration: "8 Weeks to App Store & Play Store",
    contractValue: "$42,000",
    impactHighlight: "Sub-Second",
    impactLabel: "Automated Order Flow with Low-Latency Dispatch Engine",
    metaDescription: "How Divanex engineered Fynito's end-to-end food delivery mobile app ecosystem, real-time rider tracking, and ultra-fast checkout.",
    team: [
      "1 Principal Solutions Architect",
      "2 Senior Full-Stack Engineers",
      "1 React Native Specialist",
      "1 QA & Load Test Engineer",
      "1 UI/UX Systems Designer"
    ],
    problem: {
      headline: "Peak Hour Concurrency Bottlenecks & High Rider Dispatch Latency",
      description: "Fynito's initial MVP suffered from frequent GPS sync drops during dinner rush hours, delayed order state transitions between kitchen POS and riders, and abandoned checkouts due to slow payment redirects.",
      frictionPoints: [
        "GPS location packets from 1,200+ simultaneous delivery riders overloaded the legacy single-node backend.",
        "Kitchen preparation status was out of sync with customer order views by up to 45 seconds.",
        "Legacy payment gateway failures during lunch/dinner peak hours caused an 38.5% cart abandonment rate."
      ]
    },
    whatWeBuilt: {
      headline: "End-to-End Cross-Platform Mobile Apps, Kitchen POS & Live Telemetry Engine",
      summary: "Divanex redesigned Fynito from the ground up: building custom cross-platform React Native mobile apps for customers and riders, a high-throughput Node.js microservice cluster, and a live kitchen display web portal.",
      pillars: [
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
    stats: [
      { label: "Order Dispatch Latency", value: "< 120ms", subtext: "Real-time Redis pub/sub routing" },
      { label: "Active Delivery Riders", value: "1,200+", subtext: "Live GPS telemetry HUD" },
      { label: "Driver Dispatch Time", value: "6.8s", subtext: "Reduced from 90s (13.2x faster)" },
      { label: "Cart Drop-Off Reduction", value: "-81.3%", subtext: "Sub-second 1-click checkout" }
    ],
    challenge: {
      title: "Peak Hour Concurrency Bottlenecks & High Rider Dispatch Latency",
      summary: "Fynito's initial MVP suffered from frequent GPS sync drops during dinner rush hours, delayed order state transitions between kitchen POS and riders, and abandoned checkouts due to slow payment redirects.",
      frictionPoints: [
        "GPS location packets from 1,200+ simultaneous delivery riders overloaded the legacy single-node backend.",
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
      { milestone: "Sprint 1: Discovery & UX Wireframes", description: "Design of customer app, rider app, and merchant tablet POS in Figma.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Core API & Live Telemetry", description: "Node.js microservices, PostgreSQL schema, and Socket.io GPS sync engine.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: Mobile App Development", description: "React Native iOS & Android builds with live maps, push notifications, and payment gateways.", timeline: "Week 5–6" },
      { milestone: "Sprint 4: Production Launch & Stress Testing", description: "Load tested at 5,000 req/sec; deployed to Apple App Store & Google Play Store.", timeline: "Week 7–8" }
    ],
    businessImpact: {
      headline: "Fynito Scaled Peak Delivery Throughput with High-Concurrency Telemetry Architecture",
      metrics: [
        { metric: "Peak Order Throughput", before: "180 orders/hr", after: "4,200 orders/hr", gain: "+2,230%" },
        { metric: "Driver Matching Time", before: "90 seconds", after: "6.8 seconds", gain: "13.2x Faster" },
        { metric: "Checkout Drop-off Rate", before: "38.5%", after: "7.2%", gain: "-81.3% Cart Abandonment" }
      ]
    },
    screenshots: [
      { id: "fynito-customer-app", title: "Customer Mobile App & Live Map Tracking", description: "Fluid React Native interface with real-time ETA countdown, sub-second 1-click checkout, and live rider map marker tracking.", type: "mobile", badge: "iOS & Android" },
      { id: "fynito-rider-hud", title: "Rider Telemetry & Smart Dispatch Console", description: "High-contrast driver HUD with dead-reckoning turn-by-turn guidance and battery-optimized GPS broadcast.", type: "mobile", badge: "Driver App" },
      { id: "fynito-kitchen-pos", title: "Live Kitchen Display & Dispatch Portal", description: "Audio-assisted kitchen dashboard for restaurant staff to accept tickets, adjust prep times, and hand off to arriving riders.", type: "web", badge: "Merchant POS" }
    ],
    testimonial: {
      quote: "Divanex didn't just build an app; they built the engine our whole business runs on. Our riders love the simplicity, and our order volume increased 10x without a single crash.",
      author: "Vikram Malhotra",
      role: "Co-Founder & COO",
      company: "Fynito Technologies",
      avatarInitials: "VM"
    },
    complianceBadges: ["PCI-DSS–Aware Payment Architecture", "ISO 27001–Aligned Security Controls", "End-to-End Encrypted Rider Telemetry"],
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
    timeline: "6 Weeks (3 Sprints of 2 Weeks)",
    duration: "6 Weeks to Multi-Property Rollout",
    contractValue: "$34,000",
    impactHighlight: "Multi-Property OS",
    impactLabel: "Digitized with Automated Rent Settlement & Occupancy Grid",
    metaDescription: "How Divanex engineered the Our PG property management platform, automating rent collection, room allocation matrix, and tenant onboarding.",
    team: [
      "1 Lead SaaS Architect",
      "2 Full-Stack Engineers",
      "1 Flutter Mobile Developer",
      "1 Product & Systems Designer"
    ],
    problem: {
      headline: "Manual Paper Registers, Cash Leakage & Chaotic Room Occupancy Tracking",
      description: "Hostel and PG owners were struggling with manual WhatsApp rent reminders, lost security deposits, unrecorded maintenance complaints, and ghost vacancies where empty beds went unbooked for weeks.",
      frictionPoints: [
        "Property managers spent 20+ hours each month manually calculating electricity sub-meters and food billing.",
        "Delayed rent payments averaged 18 days per resident with frequent bad-debt write-offs.",
        "Zero visibility for multi-branch PG owners across property performance and staff accountability."
      ]
    },
    whatWeBuilt: {
      headline: "Interactive Bed Matrix, AutoPay Integration & Tenant Mobile App",
      summary: "Divanex engineered an intuitive visual Bed Allocation Grid where managers can see vacant, occupied, and reserved beds at a glance, coupled with automated recurring rent invoicing and a tenant mobile app.",
      pillars: [
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
    stats: [
      { label: "Occupancy Visibility", value: "Real-Time", subtext: "Live visual bed allocation grid" },
      { label: "On-Time Rent Rate", value: "98.2%", subtext: "Automated recurring AutoPay reminders" },
      { label: "AutoPay Invoicing", value: "Automated", subtext: "Automated UPI & Netbanking AutoPay" },
      { label: "Tenant Onboarding Time", value: "3 mins", subtext: "Digital Aadhaar KYC & e-agreement" }
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
      { milestone: "Sprint 1: Schema & Multi-Tenant Setup", description: "Design of multi-tenant hostel hierarchy, room-bed matrix, and ledger structure.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Owner SaaS Portal & Billing", description: "Interactive bed dashboard, automated billing, complaint hub, and staff roles.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: Tenant Mobile App & Rollout", description: "Rent payments, food menu, gate pass generation, and 400+ properties migration.", timeline: "Week 5–6" }
    ],
    businessImpact: {
      headline: "Digitized Coliving Operations with Automated Invoicing & Visual Occupancy Grid",
      metrics: [
        { metric: "Rent Collection Velocity", before: "18 days average delay", after: "1.2 days average", gain: "15x Faster Inflow" },
        { metric: "Owner Administrative Hours", before: "35 hrs/month", after: "3.5 hrs/month", gain: "-90% Time Saved" },
        { metric: "Bed Vacancy Downtime", before: "24 days", after: "4 days", gain: "6x Faster Occupancy" }
      ]
    },
    screenshots: [
      { id: "ourpg-matrix", title: "Visual Bed & Room Occupancy Grid", description: "Color-coded dynamic room matrix indicating occupied beds, reserved slots, maintenance tickets, and rent payment statuses.", type: "dashboard", badge: "Admin SaaS" },
      { id: "ourpg-tenant-app", title: "Tenant Mobile App & AutoPay Hub", description: "Seamless Flutter mobile app for monthly digital rent payment, electricity meter checks, and food mess preferences.", type: "mobile", badge: "Tenant App" }
    ],
    testimonial: {
      quote: "Our PG completely transformed our hostel business. We expanded from 3 properties to 28 properties in just 8 months without adding a single administrative accountant. Divanex delivered beyond expectations.",
      author: "Rajesh Khandelwal",
      role: "Managing Director",
      company: "OurPG Coliving Spaces",
      avatarInitials: "RK"
    },
    complianceBadges: ["Data Privacy Safeguards", "Automated GST Invoicing", "SOC 2–Aligned Cloud Infrastructure"],
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
    timeline: "5 Weeks (3 Sprints)",
    duration: "5 Weeks to Global Launch",
    contractValue: "$31,000",
    impactHighlight: "260+ /mo",
    impactLabel: "Qualified Inquiries & -71.2% Mobile Bounce Rate",
    metaDescription: "How Divanex built the SM Real Estate portal with sub-second page speeds, interactive 3D floor plans, and intelligent buyer qualification.",
    team: [
      "1 Principal Frontend Architect",
      "1 3D / WebGL Engineer",
      "1 Full-Stack Developer",
      "1 Luxury UI/UX Designer"
    ],
    problem: {
      headline: "Slow Heavy Real Estate Sites Causing 64% Bounce Rates on Mobile",
      description: "SM Real Estate's previous WordPress portal was weighed down by uncompressed 4K render images, taking 7.4 seconds to load on mobile devices and losing overseas investors before they could view off-plan penthouses.",
      frictionPoints: [
        "Mobile load times exceeded 7.4 seconds, leading to a 64.2% bounce rate on paid ad traffic.",
        "Floor plans were static PDFs that were frustrating to zoom into on smartphones.",
        "Leads captured through contact forms took up to 48 hours to reach the senior sales desk."
      ]
    },
    whatWeBuilt: {
      headline: "Sub-Second Next.js 15 Web Platform with Interactive 3D Floor Views",
      summary: "Divanex architected a cinematic, luxury real estate portal using Next.js 15 App Router, edge-optimized WebP asset pipelines, WebGL 3D architectural views, and instant WhatsApp/CRM lead routing.",
      pillars: [
        {
          title: "Next.js 15 App Router with Sub-Second Edge TTFB",
          description: "Statically generated property profile pages with ISR (Incremental Static Regeneration) ensuring instantaneous loads globally.",
          tech: "Next.js 15 • React 19 • Cloudflare Edge"
        },
        {
          title: "Three.js & Canvas 3D Interactive Floor Explorer",
          description: "Touch-friendly architectural unit visualizer allowing prospective buyers to inspect sunlight angles, floor layouts, and balcony vistas.",
          tech: "Three.js • WebGL • Tailwind CSS"
        },
        {
          title: "Zero-Leakage WhatsApp & CRM Lead Dispatch",
          description: "High-intent buyer inquiries are verified via OTP and dispatched directly to the assigned relationship manager within 15 seconds.",
          tech: "Node.js • WhatsApp Cloud API • HubSpot Sync"
        }
      ]
    },
    stats: [
      { label: "Sales Qualified Inquiries", value: "260+/mo", subtext: "Up from 45/mo on legacy portal" },
      { label: "Lead-to-Site Visit Ratio", value: "+72%", subtext: "Interactive 3D unit walkthroughs" },
      { label: "Global Edge TTFB", value: "0.8s", subtext: "Cloudflare Edge cache optimization" },
      { label: "Mobile Bounce Rate", value: "18.5%", subtext: "Down from 64.2% on old WordPress site" }
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
          title: "Next.js 15 App Router with Sub-Second Edge TTFB",
          description: "Statically generated property profile pages with ISR (Incremental Static Regeneration) ensuring instantaneous loads globally.",
          tech: "Next.js 15 • React 19 • Cloudflare Edge"
        },
        {
          title: "Three.js & Canvas 3D Interactive Floor Explorer",
          description: "Touch-friendly architectural unit visualizer allowing prospective buyers to inspect sunlight angles, floor layouts, and balcony vistas.",
          tech: "Three.js • WebGL • Tailwind CSS"
        },
        {
          title: "Zero-Leakage WhatsApp & CRM Lead Dispatch",
          description: "High-intent buyer inquiries are verified via OTP and dispatched directly to the assigned relationship manager within 15 seconds.",
          tech: "Node.js • WhatsApp Cloud API • HubSpot Sync"
        }
      ]
    },
    architectureBlueprint: {
      title: "SM Real Estate Lead Acquisition & High-Speed Edge Flow",
      flowSteps: [
        { step: "1. Global Visitor Arrival", component: "Cloudflare Edge Network", detail: "Visitor arrives via campaign ad; edge cache serves pre-rendered HTML in <60ms." },
        { step: "2. 3D Unit Walkthrough", component: "WebGL Canvas Engine", detail: "Buyer interacts with 3D model, selects unit #402, and views verified floor layout." },
        { step: "3. Direct WhatsApp Booking", component: "Server Action + Webhook", detail: "Buyer enters phone number; instant verification and WhatsApp brochure sent in <5s." },
        { step: "4. CRM & Sales Assignment", component: "PostgreSQL & CRM API", detail: "Lead enriched with viewing history and routed to senior property advisor." }
      ],
      highlights: [
        "Asset Optimization Pipeline: Next.js image optimizer converts 4K architectural renders to responsive WebP formats.",
        "Dynamic Multi-Currency Converter: Displays property prices in USD, AED, GBP, and INR based on IP geolocation.",
        "Instant Brochure Generation: Automated PDF compilation allows buyers to download personalized unit spec sheets."
      ]
    },
    techStack: [
      {
        category: "Frontend & 3D WebGL",
        technologies: [
          { name: "Next.js 15 (App Router)", role: "High-Performance SSR/SSG Framework", highlight: "Sub-second global TTFB" },
          { name: "Three.js / React Three Fiber", role: "3D Floorplan & Building Explorer", highlight: "60fps mobile hardware accelerated" },
          { name: "Tailwind CSS", role: "Design System & Luxury Theme", highlight: "Zero runtime CSS overhead" }
        ]
      },
      {
        category: "Backend & Integrations",
        technologies: [
          { name: "Node.js & Supabase", role: "Lead Storage & Admin Console", highlight: "Row-Level Security & Webhooks" },
          { name: "WhatsApp Business API", role: "Instant Buyer Engagement", highlight: "< 15s automated brochure dispatch" },
          { name: "Cloudflare CDN", role: "Asset Caching & DDoS Shield", highlight: "99.9% cache hit ratio" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Sprint 1: Luxury UI & Brand Identity", description: "High-fashion real estate visual language, dark luxury palette, and micro-animations.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Next.js App & 3D Explorer", description: "Headless CMS schema, Three.js 3D building visualizer, and floorplan configurator.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: Global Edge Deploy & CRM Sync", description: "Cloudflare edge routing, multi-currency engine, and instant WhatsApp booking integration.", timeline: "Week 5" }
    ],
    businessImpact: {
      headline: "Generated 260+ Qualified Inquiries Monthly and Reduced Mobile Bounce Rate by 71%",
      metrics: [
        { metric: "Mobile Page Load Time", before: "7.4 seconds", after: "0.8 seconds", gain: "9.2x Speed Boost" },
        { metric: "Mobile Bounce Rate", before: "64.2%", after: "18.5%", gain: "-71.2% Reduction" },
        { metric: "Sales Qualified Inquiries", before: "45 / month", after: "260+ / month", gain: "+477% Pipeline Growth" }
      ]
    },
    screenshots: [
      { id: "sm-3d-explorer", title: "3D Architectural Unit Visualizer", description: "Hardware-accelerated Three.js 3D building model with floor selection, sunlight angle simulation, and direct WhatsApp tour booking.", type: "web", badge: "WebGL 3D" },
      { id: "sm-lead-crm", title: "Instant Lead Qualification HUD", description: "Automated buyer qualification dashboard syncing phone numbers, unit preferences, and ad source attribution directly with HubSpot.", type: "dashboard", badge: "Sales CRM" }
    ],
    testimonial: {
      quote: "The website Divanex created for SM Supermoda Real Estate looks like a million dollars. International investors frequently compliment the 3D floor explorer, and our conversion from ad clicks to site tours has nearly quadrupled.",
      author: "Sameer Mehta",
      role: "Founder & Chief Executive",
      company: "SM Supermoda Real Estate",
      avatarInitials: "SM"
    },
    complianceBadges: ["GDPR & DPDPA Privacy Aligned", "Core Web Vitals 98+ Score", "ISO 27001–Aligned Cloud Infrastructure"],
    keyTakeaways: [
      "Sub-second page speeds reduced mobile bounce rates from 64% to under 19%.",
      "Interactive 3D unit models generated 4.7x more site tour booking requests than static brochures.",
      "Instant WhatsApp CRM integration connected buyers with brokers in seconds."
    ]
  },

  "evtor": {
    id: "evtor",
    slug: "evtor",
    title: "Evtor - EV Charging Network & Telemetry OS",
    subtitle: "OCPP 2.0.1 Charging Station Aggregator, Real-Time Hardware Telemetry & Driver Wallet App",
    category: "Mobile Engineering",
    clientName: "Evtor Mobility Network Pvt Ltd",
    industry: "Electric Mobility, Cleantech & Smart Infrastructure",
    timeline: "7 Weeks (4 Sprints)",
    duration: "7 Weeks to Field Pilot",
    contractValue: "$48,000",
    impactHighlight: "Sub-3s",
    impactLabel: "Sub-Second Station Telemetry & Instant QR Charging via OCPP 2.0.1",
    metaDescription: "How Divanex built Evtor's OCPP 2.0.1 aligned EV charging network platform, driver mobile application, and real-time station telemetry dashboard.",
    team: [
      "1 IoT & Embedded Protocol Architect",
      "2 Backend Systems Engineers",
      "1 React Native Mobile Developer",
      "1 Hardware Integration QA Specialist"
    ],
    problem: {
      headline: "Unreliable Station Connectivity, Broken QR Starts & Frustrated EV Drivers",
      description: "EV drivers frequently faced offline chargers, delayed mobile app sync, and failed payment authorizations at charging points, leading to high support tickets and stranded motorists.",
      frictionPoints: [
        "Legacy chargers took up to 28 seconds to acknowledge a mobile app remote start command.",
        "Apps showed chargers as 'Available' when they were actually occupied or under fault (76% status accuracy).",
        "Multiple charging hardware brands used proprietary, incompatible communication protocols."
      ]
    },
    whatWeBuilt: {
      headline: "Unified OCPP 1.6J/2.0.1 Telemetry Gateway & Ultra-Fast Driver Mobile App",
      summary: "Divanex engineered a universal OCPP broker service communicating with multi-brand EVSE hardware over WebSockets, coupled with a high-performance React Native driver application.",
      pillars: [
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
    stats: [
      { label: "Session Start Latency", value: "2.4s", subtext: "Instant QR scan-to-charge" },
      { label: "Station Status Accuracy", value: "99.9%", subtext: "Sub-second telemetry sync" },
      { label: "Active Fast Chargers", value: "Multi-Station", subtext: "Commercial multi-brand deployment" },
      { label: "Driver Mobile Rating", value: "4.9 ★", subtext: "Smooth map HUD & wallet checkout" }
    ],
    challenge: {
      title: "Unreliable Station Connectivity, Broken QR Starts & Frustrated EV Drivers",
      summary: "EV drivers frequently faced offline chargers, delayed mobile app sync, and failed payment authorizations at charging points, leading to high support tickets and stranded motorists.",
      frictionPoints: [
        "Legacy chargers took up to 35 seconds to acknowledge a mobile app start command.",
        "Apps showed chargers as 'Available' when they were actually occupied or under fault.",
        "Multiple charging hardware brands used proprietary, incompatible communication protocols."
      ]
    },
    solution: {
      title: "Unified OCPP 1.6J/2.0.1 Telemetry Gateway & Ultra-Fast Driver Mobile App",
      summary: "Divanex engineered a universal OCPP broker service communicating with multi-brand EVSE hardware over WebSockets, coupled with a high-performance React Native driver application.",
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
          { name: "Node.js (WSS)", role: "OCPP 1.6J / 2.0.1 Protocol Gateway", highlight: "Handles concurrent chargers" },
          { name: "MQTT Broker", role: "Hardware Pub/Sub Queue", highlight: "Sub-50ms packet transmission" }
        ]
      },
      {
        category: "Databases & Cloud",
        technologies: [
          { name: "TimescaleDB", role: "Time-Series Electrical Telemetry", highlight: "Meter values & energy logs" },
          { name: "PostgreSQL", role: "User Accounts, Wallets & Invoices", highlight: "ACID Financial Integrity" },
          { name: "AWS IoT Core & Docker", role: "Cloud Infrastructure", highlight: "High availability multi-AZ" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Sprint 1: Protocol Architecture & OCPP Broker", description: "Custom OCPP 1.6J/2.0.1 implementation and mock charger testing harness.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Driver App & Mapbox Integration", description: "Mobile app with charger search, plug filters, and route navigation.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: Wallet Payments & Telemetry HUD", description: "Prepaid wallet, instant QR authorization, and live charging dashboard.", timeline: "Week 5–6" },
      { milestone: "Sprint 4: Field Testing & Public Release", description: "Physical validation on commercial fast chargers and public app launch.", timeline: "Week 7" }
    ],
    businessImpact: {
      headline: "Evtor Charging Network Deployed with Sub-3-Second QR Charging Unlock",
      metrics: [
        { metric: "Session Initiation Time", before: "28 seconds", after: "2.4 seconds", gain: "11.6x Faster" },
        { metric: "Station Status Accuracy", before: "76%", after: "99.9%", gain: "+31.5% Reliability" },
        { metric: "Monthly Charging Sessions", before: "Manual logging", after: "Automated QR", gain: "Instant Session Start" }
      ]
    },
    screenshots: [
      { id: "evtor-driver-app", title: "Driver Charging HUD & QR Scan", description: "Real-time battery percentage stream, dynamic kW charging speed meter, and instant wallet balance deduction.", type: "mobile", badge: "Driver App" },
      { id: "evtor-station-hud", title: "OCPP Station Network Telemetry Hub", description: "Live multi-station grid load monitor, temperature alarms, voltage stability logs, and remote station reboot switch.", type: "telemetry", badge: "Network NOC" }
    ],
    testimonial: {
      quote: "The Evtor platform built by Divanex is solid as a rock. Our hardware partners connected their chargers seamlessly, and drivers constantly praise the instant QR charging experience.",
      author: "Ananya Sharma",
      role: "Chief Technology Officer",
      company: "Evtor Mobility Solutions",
      avatarInitials: "AS"
    },
    complianceBadges: ["OCPP 2.0.1 Protocol Aligned", "ISO 15118 Ready", "AES-256 Encrypted Telemetry Channels"],
    keyTakeaways: [
      "Sub-2.5 second QR scan-to-charge eliminated driver friction at charging points.",
      "Time-series database effortlessly logs real-time voltage, amperage, and kWh readings.",
      "Scalable architecture ready for growing charging networks."
    ]
  },

  "magnus-partners": {
    id: "magnus-partners",
    slug: "magnus-partners",
    title: "Magnus Partners - Enterprise Healthcare Network",
    subtitle: "Collaborative Healthcare Solutions, Clinical Case Sharing & HIPAA-Ready / ABDM-Aligned Health Data Pipeline",
    category: "High-Frequency Web",
    clientName: "Magnus Healthcare Partners",
    industry: "HealthTech, Clinical Networks & Life Sciences",
    timeline: "6 Weeks (3 Sprints)",
    duration: "6 Weeks to Enterprise Deployment",
    contractValue: "$39,000",
    impactHighlight: "HIPAA-Ready",
    impactLabel: "Encrypted DICOM Viewer & Secure Clinical Data Pipelines",
    metaDescription: "How Divanex built the Magnus Partners enterprise healthcare platform for collaborative clinical solutions and research data exchange.",
    team: [
      "1 HealthTech Security Architect",
      "2 Python / FastAPI Engineers",
      "1 Next.js 15 Frontend Dev",
      "1 HealthTech Security & QA Specialist"
    ],
    problem: {
      headline: "Fragmented Hospital Silos, Slow Cross-Consultations & Data Privacy Concerns",
      description: "Magnus Healthcare Partners needed a centralized, ultra-secure digital platform to unite independent hospitals, specialist clinics, and diagnostic labs without violating strict health data protection laws or slowing down doctor workflows.",
      frictionPoints: [
        "Patient medical records and diagnostic scans were trapped in isolated hospital EMRs, taking 72 hours for specialist consults.",
        "Doctors spent hours manually emailing patient summaries, risking data breaches and patient confidentiality.",
        "Clinical partnership onboarding took up to 6 weeks per healthcare provider."
      ]
    },
    whatWeBuilt: {
      headline: "HL7 FHIR Interoperable Platform with Encrypted Clinical Workspaces",
      summary: "Divanex constructed a zero-trust healthcare collaboration platform built on Next.js 15, FastAPI, and HL7 FHIR v4 data standards, providing secure patient referrals, shared diagnostic cases, and real-time telehealth consults.",
      pillars: [
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
    stats: [
      { label: "Partner Institutions", value: "Multi-Clinic", subtext: "Hospitals, diagnostic labs & research centers" },
      { label: "Consultation Turnaround", value: "4.5 hrs", subtext: "Down from 72 hours (16x faster)" },
      { label: "Regulatory Posture", value: "Ready", subtext: "HIPAA-ready & ABDM-aligned architecture" },
      { label: "Clinical Consultations", value: "Encrypted", subtext: "Facilitated through secure telehealth pipelines" }
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
        "Engineered with ABDM-aligned workflows and HIPAA-ready zero-trust security safeguards.",
        "Encrypted browser DICOM medical imaging viewer with sub-150ms image tile loading.",
        "Automated clinical audit trail recording every read, write, and export operation for regulatory workflows."
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
          { name: "AWS CloudFront & S3", role: "HIPAA-Ready Architecture Object Storage", highlight: "Encrypted at Rest & Transit" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Sprint 1: HIPAA-Ready & FHIR Data Schema", description: "Design of zero-trust security model, FHIR data schemas, and consent flows.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Provider Portal & Doctor Directory", description: "Institutional onboarding, doctor credentials verification, and clinical directory.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: Case Sharing, DICOM & Go-Live", description: "Encrypted DICOM radiology viewer, third-party penetration testing, and hospital rollout.", timeline: "Week 5–6" }
    ],
    businessImpact: {
      headline: "Magnus Partners Accelerated Inter-Hospital Consultations by 16x",
      metrics: [
        { metric: "Partner Hospital Onboarding", before: "6 weeks", after: "3 days", gain: "14x Faster Integration" },
        { metric: "Cross-Consultation Turnaround", before: "72 hours", after: "4.5 hours", gain: "16x Faster Patient Care" },
        { metric: "Data Security Posture", before: "Legacy vulnerabilities", after: "Zero Incidents", gain: "Institutional Grade" }
      ]
    },
    screenshots: [
      { id: "magnus-dicom-viewer", title: "Encrypted DICOM Radiology & Scan Viewer", description: "Sub-150ms tiled rendering of MRI/CT scans with measurement calipers, multi-angle slicing, and real-time cursor sync for collaborative doctor reviews.", type: "web", badge: "Clinical Workspace" },
      { id: "magnus-fhir-hub", title: "HL7 FHIR Interoperability & Consent Ledger", description: "Automated patient consent manager and FHIR REST bridge connecting independent hospital EMRs with complete immutable audit logs.", type: "dashboard", badge: "Security NOC" }
    ],
    testimonial: {
      quote: "Divanex delivered an exceptionally secure, elegant, and intuitive healthcare portal. Our participating doctors love the simplicity, and our compliance audits passed with zero non-conformances.",
      author: "Dr. Alistair Vance",
      role: "Medical Director & Head of Partnerships",
      company: "Magnus Healthcare Partners",
      avatarInitials: "AV"
    },
    complianceBadges: ["HIPAA-Ready Architecture", "HL7 FHIR v4 Interoperability", "ABDM-Aligned Workflows"],
    keyTakeaways: [
      "Standardized FHIR data pipeline reduced cross-hospital integration time from 6 weeks to 3 days.",
      "Zero-trust security model and PostgreSQL RLS protect sensitive clinical data.",
      "Intuitive design drove rapid voluntary adoption across medical specialists."
    ]
  },

  "parana-tool": {
    id: "parana-tool",
    slug: "parana-tool",
    title: "Parana Tool - Industrial CNC Tooling & Engineering Catalog",
    subtitle: "B2B Precision Tooling Configurator, CNC Component Specs, CAD STEP File Vault & Instant RFQ Pipeline",
    category: "High-Frequency Web",
    clientName: "Parana Tooling Technologies",
    industry: "Precision CNC Tooling & Industrial Manufacturing",
    timeline: "6 Weeks (3 Sprints)",
    duration: "6 Weeks to Production",
    contractValue: "$36,500",
    impactHighlight: "< 3 sec",
    impactLabel: "Instant B2B Quotes & Parametric CAD Tool Catalog",
    metaDescription: "How Divanex engineered Parana Tool's industrial CNC tooling catalog, parametric search engine, and instant B2B RFQ quoting platform.",
    team: [
      "1 Industrial Systems Solutions Architect",
      "2 Full-Stack Engineers",
      "1 3D CAD & WebGL Specialist",
      "1 B2B Product Designer"
    ],
    problem: {
      headline: "Clunky 600-Page PDF Catalogs, Missing CAD Models & 3-Day Quote Delays",
      description: "Machining workshops and CNC programming engineers had to flip through static 600-page PDF catalogues, email back and forth for 3D CAD models, and wait up to 3 business days just to receive custom volume pricing on carbide cutting tools.",
      frictionPoints: [
        "Finding an end mill with exact flute count, helix angle, and workpiece hardness (HRC 55) took 15+ minutes.",
        "Engineers could not download STEP/DXF 3D CAD files directly into CAM software.",
        "High-volume manufacturing clients churned to competitors due to slow quote response times."
      ]
    },
    whatWeBuilt: {
      headline: "High-Performance Next.js 15 Parametric Tooling Catalog + Instant RFQ Engine",
      summary: "Divanex built a specialized industrial web portal featuring sub-40ms parametric tool filtering, 3D interactive tool previews, automated bulk tier calculations, and 1-click CAD model downloads.",
      pillars: [
        {
          title: "Sub-40ms Parametric CNC Tooling Search",
          description: "Filter instantly across shank diameter, cutting length, flute count, coating type (TiAlN, AlCrN), and workpiece material suitability (Steel, Inconel, Aluminum).",
          tech: "Next.js 15 • PostgreSQL • Redis"
        },
        {
          title: "Automated 3D CAD Vault & STEP Exporter",
          description: "Provides verified 3D STEP and 2D DXF files for every single SKU, ready to drop into Mastercam and SolidWorks tooling assemblies.",
          tech: "Three.js • AWS S3 • CloudFront"
        },
        {
          title: "Instant B2B RFQ & Tiered Quoting Switch",
          description: "Machinists input quantity thresholds (10, 50, 200 units) to receive instant downloadable PDF quotes with GST breakdown and dispatch lead times.",
          tech: "Node.js • PDFKit • PostgreSQL"
        }
      ]
    },
    stats: [
      { label: "Indexed CNC SKUs", value: "3,200+", subtext: "Carbide end mills, drills & inserts" },
      { label: "Instant RFQ Speed", value: "< 3 sec", subtext: "Automated volume-tiered quoting" },
      { label: "Catalog Search Latency", value: "< 40ms", subtext: "Parametric filter by shank & flutes" },
      { label: "CAD STEP Downloads", value: "5,000+", subtext: "Direct integration into SolidWorks / Fusion360" }
    ],
    challenge: {
      title: "Clunky 600-Page PDF Catalogs, Missing CAD Models & 3-Day Quote Delays",
      summary: "Machining workshops and CNC programming engineers had to flip through static 600-page PDF catalogues, email back and forth for 3D CAD models, and wait up to 3 business days just to receive custom volume pricing on carbide cutting tools.",
      frictionPoints: [
        "Finding an end mill with exact flute count, helix angle, and workpiece hardness (HRC 55) took 15+ minutes.",
        "Engineers could not download STEP/DXF 3D CAD files directly into CAM software.",
        "High-volume manufacturing clients churned to competitors due to slow quote response times."
      ]
    },
    solution: {
      title: "High-Performance Next.js 15 Parametric Tooling Catalog + Instant RFQ Engine",
      summary: "Divanex built a specialized industrial web portal featuring sub-40ms parametric tool filtering, 3D interactive tool previews, automated bulk tier calculations, and 1-click CAD model downloads.",
      architecturalPillars: [
        {
          title: "Sub-40ms Parametric CNC Tooling Search",
          description: "Filter instantly across shank diameter, cutting length, flute count, coating type (TiAlN, AlCrN), and workpiece material suitability (Steel, Inconel, Aluminum).",
          tech: "Next.js 15 • PostgreSQL • Redis"
        },
        {
          title: "Automated 3D CAD Vault & STEP Exporter",
          description: "Provides verified 3D STEP and 2D DXF files for every single SKU, ready to drop into Mastercam and SolidWorks tooling assemblies.",
          tech: "Three.js • AWS S3 • CloudFront"
        },
        {
          title: "Instant B2B RFQ & Tiered Quoting Switch",
          description: "Machinists input quantity thresholds (10, 50, 200 units) to receive instant downloadable PDF quotes with GST breakdown and dispatch lead times.",
          tech: "Node.js • PDFKit • PostgreSQL"
        }
      ]
    },
    architectureBlueprint: {
      title: "Parana Tool Industrial Catalog & RFQ Blueprint",
      flowSteps: [
        { step: "1. Parametric Query", component: "Edge Search Engine", detail: "Machinist selects material (e.g. Stainless 316) and flute specs; matched tools render in <40ms." },
        { step: "2. Technical Spec Sheet", component: "Dynamic Datasheet", detail: "Displays cutting speeds (Vc), feed rates (Fz), and recommended coolant pressure." },
        { step: "3. 1-Click CAD Download", component: "CAD Asset Cloud", detail: "Direct signed URL delivers accurate 3D STEP file for CAM collision simulations." },
        { step: "4. Automated RFQ Generation", component: "Quote Engine", detail: "Calculates volume tiered pricing and emails formal B2B invoice quote within 3 seconds." }
      ],
      highlights: [
        "Parametric Speed & Feed Calculator built into every product page for machining technicians.",
        "Instant CAD STEP Downloads eliminate 3-day wait times for design engineers.",
        "ERP synchronization pushes confirmed quotes directly into warehouse production queues."
      ]
    },
    techStack: [
      {
        category: "Frontend & 3D Web",
        technologies: [
          { name: "Next.js 15", role: "Industrial Web Portal & SSR Catalog", highlight: "Server Components & Edge SEO" },
          { name: "TypeScript", role: "End-to-End Type Safety for Dimensions", highlight: "Zero unit conversion bugs" },
          { name: "Tailwind CSS", role: "Precision Engineering UI Design", highlight: "Crisp industrial dark/gold theme" }
        ]
      },
      {
        category: "Backend & Database",
        technologies: [
          { name: "Node.js & Express", role: "Parametric Search & RFQ API", highlight: "Sub-40ms API Latency" },
          { name: "PostgreSQL", role: "Relational Tooling Spec Database", highlight: "Complex Multi-Param B-Tree Index" },
          { name: "Redis", role: "Edge In-Memory Caching", highlight: "Instant catalog reads" }
        ]
      }
    ],
    deliverables: [
      { milestone: "Sprint 1: Taxonomy & Parametric Schema", description: "Design of CNC tool attributes, coatings, and dimension schemas.", timeline: "Week 1–2" },
      { milestone: "Sprint 2: Catalog Portal & Search Engine", description: "High-speed Next.js 15 catalog with parametric filtering and live specs.", timeline: "Week 3–4" },
      { milestone: "Sprint 3: CAD Vault, RFQ & ERP Go-Live", description: "3D STEP file distribution system, automated PDF quoting engine, and ERP sync.", timeline: "Week 5–6" }
    ],
    businessImpact: {
      headline: "Parana Tool Slashed Engineering Quote Turnaround from Days to Seconds",
      metrics: [
        { metric: "RFQ Response Time", before: "72 hours", after: "< 3 seconds", gain: "Sub-Second Quoting" },
        { metric: "Tool Discovery Time", before: "15 minutes", after: "25 seconds", gain: "36x Faster Search" },
        { metric: "B2B Conversion Rate", before: "11.2%", after: "38.4%", gain: "+242% Lead Conversion" }
      ]
    },
    screenshots: [
      { id: "parana-configurator", title: "Parametric Tool Configurator & CAD Vault", description: "Instant filtering by cutting diameter, flute count, helix angle, and workpiece hardness with 1-click STEP/DXF downloads.", type: "web", badge: "Engineering Portal" },
      { id: "parana-rfq-engine", title: "Instant Tiered Quoting & ERP Dispatch", description: "Real-time volume tier price calculator generating signed PDF quotes with tax breakdowns in under 3 seconds.", type: "dashboard", badge: "B2B Quoting" }
    ],
    testimonial: {
      quote: "Divanex revolutionized how we sell industrial tools. Machine shops can now find the exact carbide end mill they need, download CAD files instantly, and generate quotes in seconds without waiting for our sales reps.",
      author: "Carlos Parana",
      role: "Managing Director",
      company: "Parana Tooling Technologies",
      avatarInitials: "CP"
    },
    complianceBadges: ["ISO 9001:2015 Manufacturing Standards", "DIN 6535 Shank Alignment", "DIN 6527 Geometry Standard"],
    keyTakeaways: [
      "Sub-40ms parametric search replaced 600-page physical catalogues with digital precision.",
      "Instant 3D STEP CAD downloads drove strong organic adoption among CNC CAM programmers.",
      "Automated instant RFQ generation boosted B2B inquiry conversion by over 240%."
    ]
  }
};
