export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  gradient: string;
  features: string[];
  deliverables: string[];
  idealFor: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "hospital-healthcare-management",
    title: "Hospital & Healthcare Systems",
    tagline: "Hospital and clinic software: records, OPD, pharmacy, billing",
    description:
      "Software for hospitals, clinic chains and diagnostic labs. Patient registration through discharge, prescriptions the pharmacy can actually read, lab and imaging results linked to the right file, and stock that reconciles. Built to ABDM and HIPAA rules where they apply.",
    iconName: "Stethoscope",
    color: "#0f7670",
    gradient: "from-sky-600/20 via-cyan-500/10 to-transparent",
    features: [
      "End-to-End Hospital Management (OPD, IPD, OT, ICU & ER)",
      "Electronic Health Records (EHR/EMR) & Digital Prescriptions",
      "Real-time Doctor Appointment Scheduling & Patient Mobile App",
      "Diagnostic Lab Management (LIS) & DICOM Imaging Integration",
      "Automated Pharmacy Inventory, Billing & Insurance Claims",
      "HIPAA, ABDM & ISO 27001 Data Privacy Compliance"
    ],
    deliverables: ["Full HMIS Architecture", "Doctor & Patient Web/Mobile Portals", "DICOM/Lab API Handlers", "Compliance Audit Certificate"],
    idealFor: "Multi-specialty Hospitals, Polyclinic Chains, Diagnostic Labs & Telehealth Startups"
  },
  {
    id: "enterprise-erp-systems",
    title: "Enterprise ERP & Supply Chain",
    tagline: "ERP built around how you work, not the other way round",
    description:
      "For manufacturers, distributors and retail chains who have outgrown spreadsheets and refuse to bend their process to fit packaged software. Stock across locations, production, purchase, accounts and payroll in one place, with no per-seat licence to renew.",
    iconName: "Briefcase",
    color: "#213473",
    gradient: "from-indigo-600/20 via-blue-500/10 to-transparent",
    features: [
      "Multi-Location Inventory Management & Barcode/RFID Tracking",
      "Automated Double-Entry Accounting, GST/VAT & Multi-Currency Ledger",
      "Manufacturing MRP-II (BOM, Work Orders & Machine Telemetry)",
      "Automated Procurement, Vendor Portals & RFQ Workflows",
      "End-to-End HRMS, Biometric Attendance & Automated Payroll",
      "Real-time Executive BI Analytics & Predictive Stock Forecasting"
    ],
    deliverables: ["Custom Modular ERP Codebase", "Database Migration Scripts", "Hardware/Barcode SDK", "Executive Analytics Cockpit"],
    idealFor: "Manufacturing Plants, Global Distributors, Wholesale Chains & Corporate Enterprises"
  },
  {
    id: "fintech-banking-solutions",
    title: "Fintech & Digital Banking",
    tagline: "Ledgers that balance and payments that reconcile",
    description:
      "Lending platforms, wallets, payment flows and the double-entry ledger underneath them. The kind of work where an off-by-one paisa is a real incident, so correctness and a full audit trail come before everything else.",
    iconName: "Banknote",
    color: "#447541",
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
    features: [
      "High-Concurrency Core Banking Engine & Ledger Reconciliation",
      "Digital Wallet Systems, Escrow Accounts & Peer-to-Peer Rails",
      "Automated KYC/AML Verification with Facial Biometrics & OCR",
      "Lending & Micro-Finance Engine with Automated Credit Scoring",
      "Multi-Gateway Payment Switch (Stripe, UPI, Razorpay, Swift)",
      "PCI-DSS–Aware Payment Architecture & SOC-2 Compliant Encryption Architecture"
    ],
    deliverables: ["Double-Entry Ledger Engine", "KYC Automated Pipeline", "Payment Gateway Switch", "Security Audit Package"],
    idealFor: "Neo-Banks, NBFCs, Lending Platforms, Forex Brokers & Payment Gateways"
  },
  {
    id: "custom-crm-automation",
    title: "Custom CRM & Sales Engines",
    tagline: "A CRM your sales team will actually open",
    description:
      "Most teams abandon the CRM because logging a call takes longer than making one. We build around how your reps really work — WhatsApp where the conversation already happens, quotes generated in a click, and field visits captured from the phone in their pocket.",
    iconName: "UserCheck",
    color: "#4a7c43",
    gradient: "from-orange-600/20 via-amber-500/10 to-transparent",
    features: [
      "Omnichannel Ingestion (Meta Ads, Google, Website, Email & Phone)",
      "Native WhatsApp Business Cloud API Automated Conversations",
      "Dynamic PDF Quotation, Proposal & Invoicing Generator",
      "Built-in Cloud Telephony CTI (Click-to-Call & Audio Recording)",
      "Field Sales GPS Tracking, Attendance & Territory Mapping",
      "AI-Powered Lead Scoring & Predictive Deal Closing Forecasting"
    ],
    deliverables: ["Tailored CRM Web & Mobile App", "WhatsApp Bot Workflows", "Telephony Gateway Connector", "Sales Rep Training Guide"],
    idealFor: "Real Estate Developers, B2B Sales Agencies, Financial Consultancies & High-Ticket Closers"
  },
  {
    id: "ecommerce-marketplace-platforms",
    title: "Multi-Vendor Marketplaces",
    tagline: "B2B/B2C Marketplaces, Automated Vendor Payouts & Global Shipping",
    description:
      "Enterprise-grade e-commerce ecosystems engineered to handle millions of SKUs, sub-second search indexing, automated vendor commissions, split payments, and multi-warehouse fulfillment.",
    iconName: "ShoppingCart",
    color: "#2e3e7e",
    gradient: "from-purple-600/20 via-indigo-500/10 to-transparent",
    features: [
      "Multi-Vendor Seller Portals & Automated Catalog Approval",
      "Automated Split-Payment Escrow & Instant Vendor Commission Settlement",
      "Algolia/Elasticsearch Sub-30ms Faceted Product Search",
      "Multi-Warehouse Inventory Routing & Real-time Carrier Tracking",
      "B2B Wholesale Portals with Tiered Volume Pricing & Credit Limits",
      "High-Conversion Mobile PWA & Native iOS/Android Shopping Apps"
    ],
    deliverables: ["Customer Storefront", "Vendor Merchant Dashboard", "Super-Admin Ops Portal", "Mobile Apps (iOS & Android)"],
    idealFor: "Multi-Vendor Retailers, B2B Wholesalers, D2C Conglomerates & Niche Marketplaces"
  },
  {
    id: "edtech-learning-management",
    title: "EdTech & University Systems",
    tagline: "Next-Gen LMS, School ERP, AI Exam Proctoring & Live Classrooms",
    description:
      "Comprehensive educational management platforms built for universities, K-12 school networks, coaching institutes, and global course creators. Streamline admissions, fees, live streams, and automated AI grading.",
    iconName: "GraduationCap",
    color: "#0f7670",
    gradient: "from-cyan-600/20 via-sky-500/10 to-transparent",
    features: [
      "Comprehensive School/University SIS & Student Lifecycle Management",
      "Live Interactive Video Classrooms with WebRTC & Whiteboard",
      "Automated Fee Collection, Online Invoicing & Installment Reminders",
      "AI-Powered Exam Proctoring & Automated Quiz Grading Engine",
      "Gamified Student Learning Portal & Progress Certification",
      "Parent Mobile App with Real-time Bus GPS & Attendance Alerts"
    ],
    deliverables: ["Student/Teacher/Parent Apps", "LMS Video Streaming Engine", "Fee Billing Gateways", "Accreditation Reporting Suite"],
    idealFor: "Universities, International Schools, Test Prep Institutes & EdTech SaaS Startups"
  },
  {
    id: "saas-development",
    title: "Build a SaaS Product",
    tagline: "Launch your multi-tenant SaaS platform with subscriptions & billing",
    description:
      "Launch your multi-tenant SaaS platform with automated Stripe subscriptions, metered usage billing, subscriber analytics, and scalable cloud architecture.",
    iconName: "Layers",
    color: "#3a5296",
    gradient: "from-blue-600/20 via-blue-500/10 to-transparent",
    features: [
      "Multi-Tenant Setup with 100% Customer Data Isolation",
      "Automated Stripe & Razorpay Recurring Billing",
      "Self-Serve Customer Onboarding & User Management",
      "Real-Time Usage Metering & Tiered Subscription Plans",
      "Role-Based Access Control (RBAC) & Team Invites",
      "Executive Analytics Cockpit & Churn Telemetry"
    ],
    deliverables: ["Full SaaS Codebase", "API Documentation", "Cloud Deployment Scripts", "Admin Super-Dashboard"],
    idealFor: "Startups & Enterprises launching recurring revenue software products"
  },
  {
    id: "web-app-development",
    title: "Web & Mobile App Development",
    tagline: "iOS and Android apps, web portals & custom dashboards",
    description:
      "iOS and Android apps with real-time features, secure payment checkout, GPS maps, push notifications, and fast, responsive web applications.",
    iconName: "Smartphone",
    color: "#189a91",
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    features: [
      "Cross-Platform Mobile Apps (iOS & Android Single Codebase)",
      "Progressive Web Apps (PWA) with Offline Data Sync",
      "High-Performance Custom Web Portals & Dashboards",
      "Push Notifications, Camera & GPS Hardware APIs",
      "App Store & Google Play Store Submission Support",
      "Secure User Authentication, Checkout & Payment Gateways"
    ],
    deliverables: ["iOS & Android Builds", "SEO Optimized Web App", "Source Code & Assets", "Store Submission Support"],
    idealFor: "Brands seeking unified web + mobile presence with blistering performance"
  },
  {
    id: "ai-solutions-automation",
    title: "Automate Your Business",
    tagline: "Connect existing tools & eliminate repetitive workflows with AI",
    description:
      "Connect your existing tools and automate repetitive workflows with custom AI assistants, smart document processing, and automated API pipelines.",
    iconName: "Cpu",
    color: "#5c9556",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    features: [
      "Custom AI Chatbots Trained on Private Company Data & SOPs",
      "Automated Data Sync Across CRM, Email, Spreadsheets & ERP",
      "Intelligent Document Processing & OCR Data Extraction",
      "Automated Customer Support Triage & Ticket Resolution",
      "Predictive Business Analytics & Customer Churn Modeling",
      "Cut 50%+ Manual Hours on Repetitive Operational Tasks"
    ],
    deliverables: ["Custom AI Agent", "Vector Database Indexing", "Webhook Automation", "Integration SDK"],
    idealFor: "Companies aiming to reduce human operational hours by 60%+ using AI"
  },
  {
    id: "seo-digital-growth",
    title: "SEO & Digital Growth",
    tagline: "Technical SEO, Local Domination & Conversion Optimization",
    description:
      "Data-driven search engine dominance and conversion rate engineering designed to turn organic search traffic into qualified enterprise leads and recurring revenue.",
    iconName: "TrendingUp",
    color: "#5c9556",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    features: [
      "Deep Technical & On-Page SEO Architecture",
      "Local SEO & Google Business Profile Domination",
      "High-Intent Keyword Strategy & Content Roadmaps",
      "Core Web Vitals & PageSpeed 95+ Optimization",
      "Conversion Rate Optimization (CRO) & A/B Testing",
      "Programmatic SEO for SaaS Landing Pages"
    ],
    deliverables: ["Comprehensive Audit", "Keyword Strategy Deck", "Schema Markup Setup", "Monthly Growth Analytics"],
    idealFor: "High-growth businesses that want organic pipeline and compounding leads"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    tagline: "User-Centric Interfaces & Interactive Prototypes",
    description:
      "Transform complex digital journeys into intuitive, visually breathtaking digital products. We build design systems that mesmerize users and maximize conversion rates.",
    iconName: "Palette",
    color: "#43569a",
    gradient: "from-purple-500/20 via-blue-500/10 to-transparent",
    features: [
      "User-Centric Mobile & Web Interface Design",
      "Interactive Wireframes & High-Fidelity Prototypes",
      "Comprehensive Design Systems & Component Libraries",
      "Brand Identity Design, Logos & Visual Guidelines",
      "User Journey Mapping & Usability Testing",
      "Developer-Ready Figma Hand-off Specs"
    ],
    deliverables: ["Complete Figma Workspace", "Design Token Specs", "Interactive Clickable Prototype", "Asset Export Kit"],
    idealFor: "Founders needing world-class aesthetic appeal that builds investor and customer trust"
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    tagline: "Server Architecture, Ironclad Security & CI/CD",
    description:
      "Zero-downtime serverless infrastructure, Kubernetes cluster orchestration, continuous deployment pipelines, and proactive cloud cost optimization.",
    iconName: "Cloud",
    color: "#189a91",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    features: [
      "Server Setup & Auto-scaling Cloud Infrastructure",
      "Continuous Integration & Deployment (CI/CD Pipelines)",
      "Proactive 24/7 Security, SSL & DDoS Protection",
      "AWS, Google Cloud, Azure & Vercel Optimization",
      "Docker Containerization & Kubernetes Orchestration",
      "Cloud Cost Auditing (Save up to 40% monthly)"
    ],
    deliverables: ["Terraform / Docker Scripts", "CI/CD Pipeline Setup", "Monitoring Alert System", "Security Audit Report"],
    idealFor: "Fast-moving engineering teams needing rock-solid infrastructure and zero maintenance headaches"
  },

  // ==========================================
  // 10 NEW ENTERPRISE SERVICES
  // ==========================================
  {
    id: "cybersecurity-compliance",
    title: "Cybersecurity & Zero-Trust Defense",
    tagline: "Penetration Testing, SOC-2 Hardening & Threat Intelligence",
    description:
      "Institutional perimeter defenses and automated application security audits. We harden codebases against OWASP Top 10 exploits, deploy zero-trust RBAC IAM, and fast-track SOC-2 / ISO 27001 compliance certifications.",
    iconName: "ShieldCheck",
    color: "#000838",
    gradient: "from-blue-950/20 via-sky-600/10 to-transparent",
    features: [
      "Full SAST/DAST Penetration Testing (Web, Mobile & API)",
      "Zero-Trust IAM, MFA & Role-Based Access Control (RBAC)",
      "Cloud Security Posture Management (CSPM) & Cloudflare WAF",
      "SOC 2–Aligned, ISO 27001 & GDPR Regulatory Fast-Tracking",
      "Real-time SIEM Threat Intelligence & Automated Anomaly Blocking",
      "Disaster Recovery, Automated Backups & Incident Response Runbooks"
    ],
    deliverables: ["Penetration Audit Report", "Remediation Code Fixes", "WAF Ruleset Configuration", "Compliance Readiness Certificate"],
    idealFor: "Fintechs, Healthcare Portals, Enterprise SaaS & High-Security Government Systems"
  },
  {
    id: "real-estate-proptech",
    title: "Real Estate & PropTech Systems",
    tagline: "MLS / IDX Integration, 3D Virtual Tours & Lease Automation",
    description:
      "Comprehensive digital real estate ecosystems engineered for brokerages, property managers, and REITs. Featuring live MLS feed syndication, 3D WebGL virtual walkthroughs, automated tenant screening, and rent collection.",
    iconName: "Building2",
    color: "#447541",
    gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
    features: [
      "RESO Web API & Real-time MLS/IDX Feed Synchronization",
      "Interactive 3D WebGL & 360° Virtual Property Walkthroughs",
      "Automated Tenant KYC Screening & Background Credit Verification",
      "Digital Lease Signing (DocuSign API) & Automated Rent Escrow",
      "Landlord, Tenant & Property Manager Multi-Tenant Portals",
      "Real Estate Lead Ingestion CRM with Instant WhatsApp Automation"
    ],
    deliverables: ["PropTech Web Portal", "Tenant & Landlord Mobile Apps", "MLS Feed Connector", "Payment Escrow Integration"],
    idealFor: "Real Estate Brokerages, Property Management Firms, Coworking Chains & REITs"
  },
  {
    id: "logistics-fleet-telematics",
    title: "Logistics, Fleet & Telematics OS",
    tagline: "Live GPS Telemetry, Dynamic Route Optimization & Carrier Dispatch",
    description:
      "Mission-critical transport management systems (TMS) orchestrating carrier fleets, live OBD-II sensor telematics, fuel consumption analytics, and cross-border digital customs manifests.",
    iconName: "Truck",
    color: "#4a7c43",
    gradient: "from-amber-600/20 via-yellow-500/10 to-transparent",
    features: [
      "Sub-Second Live Vehicle GPS Tracking & Geofencing Alerts",
      "AI Dynamic Route Optimization & Load Distribution Engine",
      "Automated Carrier Dispatching & Driver Navigation Mobile Apps",
      "Fuel Monitoring & Cold-Chain Sensor Telemetry Logging",
      "Digital Bill of Lading, e-Way Bills & Proof of Delivery (POD)",
      "Carrier Settlement & Multi-Currency Freight Invoicing Gateway"
    ],
    deliverables: ["Fleet Management Console", "Driver Mobile App", "GPS IoT Webhook Ingestion", "Automated Billing Rails"],
    idealFor: "Freight Forwarders, 3PL/4PL Logistics, Cold-Chain Transporters & Courier Fleets"
  },
  {
    id: "iot-embedded-telemetry",
    title: "IoT & Smart Hardware Telemetry",
    tagline: "Industrial IoT Gateways, MQTT Ingestion & Predictive Diagnostics",
    description:
      "High-frequency industrial IoT dashboards, firmware OTA update pipelines, and sensor data ingestion engines handling millions of events per second with sub-50ms anomaly alerts.",
    iconName: "Activity",
    color: "#26397a",
    gradient: "from-blue-600/20 via-sky-500/10 to-transparent",
    features: [
      "High-Density MQTT / WebSockets Sensor Telemetry Ingestion",
      "TimescaleDB & ClickHouse Time-Series Data Lake Storage",
      "Real-Time Hardware Diagnostics, Heatmaps & Threshold Alarms",
      "Automated Machine Learning Predictive Maintenance Modeling",
      "Cryptographically Signed OTA Firmware Update Pipeline",
      "Industrial SCADA, Modbus & PLC Hardware Protocols"
    ],
    deliverables: ["IoT Telemetry Dashboard", "MQTT Ingestion Microservices", "Time-Series Database", "Hardware Firmware Connector"],
    idealFor: "Smart Factory Manufacturers, Connected Hardware Startups & Utility Providers"
  },
  {
    id: "headless-cms-media",
    title: "Headless CMS & High-Speed Media",
    tagline: "Strapi, Sanity, Headless WP & Sub-50ms Global Publishing",
    description:
      "High-throughput editorial newsrooms, content hubs, and multi-language media portals delivering sub-50ms TTFB across global CDNs with real-time collaborative editing and programmatic SEO.",
    iconName: "Globe2",
    color: "#0f7670",
    gradient: "from-cyan-600/20 via-teal-500/10 to-transparent",
    features: [
      "Decoupled Headless CMS (Strapi, Sanity, Headless WordPress)",
      "Sub-50ms Global Edge TTFB with Incremental Static Regeneration",
      "Multi-Language & Multi-Region Dynamic Localization Engine",
      "High-Resolution Video & Audio Media Streaming CDN Pipeline",
      "Granular Role Permissions, Editorial Workflows & Live Preview",
      "Programmatic SEO Engine Generating 10,000+ Structured Pages"
    ],
    deliverables: ["Headless CMS Architecture", "Next.js Frontend", "Global CDN Configuration", "Editorial Workflow Specs"],
    idealFor: "Digital Publishers, News Networks, Media Companies & Global Marketing Teams"
  },
  {
    id: "generative-ai-agentic-fabric",
    title: "Generative AI & Agentic Fabric",
    tagline: "Multi-Actor LangGraph Agents, RAG Pipelines & LLM Fine-Tuning",
    description:
      "Autonomous AI workforce systems capable of multi-step reasoning, tool execution, enterprise data vector indexing, and grounded, citation-backed customer copilot workflows.",
    iconName: "Sparkles",
    color: "#2e3e7e",
    gradient: "from-purple-600/20 via-fuchsia-500/10 to-transparent",
    features: [
      "Multi-Actor Agent Orchestration (LangGraph, CrewAI, AutoGen)",
      "Private Vector Database Indexing (pgvector, Pinecone, Qdrant)",
      "Custom Model Fine-Tuning & Quantized On-Premise Weights (vLLM)",
      "Multimodal Vision, Audio & Document Understanding Pipelines",
      "Grounded AI Guardrails & PII Redaction Proxy",
      "Automated Tool Calling, SQL Querying & External API Invocations"
    ],
    deliverables: ["Custom Agentic AI Engine", "Private Vector Indexing Pipeline", "Guardrails Proxy", "Full SDK & Webhooks"],
    idealFor: "Enterprises seeking autonomous AI operations and contextual copilots"
  },
  {
    id: "restaurant-pos-hospitality",
    title: "Restaurant POS & Hospitality Systems",
    tagline: "Cloud POS, Kitchen Display (KDS), Table QR & Multi-Outlet Inventory",
    description:
      "Zero-latency offline-first restaurant management software featuring touch POS, contactless QR ordering, kitchen display dispatch, table reservations, and automated recipe inventory depletion.",
    iconName: "Flame",
    color: "#4a7c43",
    gradient: "from-emerald-600/20 via-sky-500/10 to-transparent",
    features: [
      "Offline-First Touch POS (Windows, Mac, iPad, Android Tablets)",
      "Kitchen Display System (KDS) & Order Dispatch HUD",
      "Table QR Code Digital Ordering & Instant Contactless Payments",
      "Automated Recipe-Level Raw Material Inventory Depletion",
      "Multi-Branch Franchise Central Super-Admin & Royalty Tracking",
      "Third-Party Delivery Aggregator Sync (Zomato, Swiggy, UberEats)"
    ],
    deliverables: ["Touch POS Application", "KDS Screen Software", "Table QR Menu PWA", "Central Franchise Portal"],
    idealFor: "Restaurant Chains, Quick-Service Food Brands, Cafes & Fine-Dining Venues"
  },
  {
    id: "web3-defi-blockchain",
    title: "Web3, DeFi & Blockchain Systems",
    tagline: "Audited Smart Contracts, Non-Custodial Wallets & Tokenization",
    description:
      "Institutional-grade decentralized applications, EVM smart contracts, tokenized asset trading platforms, multi-party computation (MPC) institutional wallets, and zero-knowledge privacy layers.",
    iconName: "Database",
    color: "#344c8e",
    gradient: "from-indigo-600/20 via-purple-500/10 to-transparent",
    features: [
      "EVM Smart Contract Architecture (Solidity, Foundry, Hardhat)",
      "Decentralized Exchange (DEX) & AMM Liquidity Pooling Rails",
      "Institutional Multi-Party Computation (MPC) Wallet Integrations",
      "Real-World Asset (RWA) Tokenization & Fractional Ownership",
      "High-Throughput Blockchain Indexers & Graph Subgraphs",
      "Formal Security Verification & Automated Audit Reports"
    ],
    deliverables: ["Audited Smart Contracts", "Web3 Frontend dApp", "MPC Wallet Architecture", "Subgraphs Indexer Engine"],
    idealFor: "Crypto Startups, Institutional Asset Custodians & DeFi Protocol Teams"
  },
  {
    id: "data-engineering-bi-analytics",
    title: "Data Engineering & BI Warehousing",
    tagline: "Petabyte Data Lakes, Real-Time ETL Pipelines & BI Dashboards",
    description:
      "Modern data stack engineering unifying disparate data sources into Snowflake, BigQuery, and ClickHouse with real-time dbt transformations and executive interactive BI cockpits.",
    iconName: "Terminal",
    color: "#0f7670",
    gradient: "from-sky-600/20 via-blue-500/10 to-transparent",
    features: [
      "Real-Time & Batch ETL/ELT Ingestion Pipelines (Airflow, Kafka)",
      "Modern Cloud Data Warehousing (Snowflake, BigQuery, ClickHouse)",
      "dbt Data Modeling, Schema Lineage & Automated Testing",
      "Interactive Executive BI Dashboards (Tableau, Custom React)",
      "Automated Data Quality Monitoring & Outlier Anomaly Detection",
      "Machine Learning Feature Stores & Data Lakehouse Architectures"
    ],
    deliverables: ["Cloud Data Warehouse Setup", "ETL Ingestion Pipelines", "Executive BI Dashboard", "Data Governance Documentation"],
    idealFor: "Enterprises with high data volume seeking single-pane business intelligence"
  },
  {
    id: "legaltech-contract-automation",
    title: "LegalTech & Contract Automation",
    tagline: "AI Contract Review, Automated Drafting, E-Signatures & Case CMS",
    description:
      "Enterprise legal operating systems automating clause analysis, redlining, digital signatures, matter management, and court calendar scheduling with strict cryptographic confidentiality.",
    iconName: "Zap",
    color: "#666c77",
    gradient: "from-slate-600/20 via-zinc-500/10 to-transparent",
    features: [
      "AI-Powered Contract Clause Analysis & Automated Risk Redlining",
      "Automated Legal Document Drafting & Dynamic Template Assembly",
      "Cryptographic E-Signature & Tamper-Proof Audit Trail Compliance",
      "Law Firm Matter Management, Time Tracking & LEDES Billing",
      "Secure Client Virtual Data Rooms with Granular Watermarking",
      "Automated Court Calendar Synchronization & Deadline Calculations"
    ],
    deliverables: ["LegalTech Web Suite", "AI Contract Redline Engine", "E-Signature Pipeline", "Virtual Data Room"],
    idealFor: "Corporate Legal Departments, Law Firms, Compliance Teams & Contract Managers"
  },
  {
    id: "ar-vr-spatial-computing",
    title: "AR/VR & Spatial Computing",
    tagline: "Apple Vision Pro (visionOS), WebXR, Digital Twins & 3D Interactive Simulators",
    description:
      "Immersive spatial computing architectures, photorealistic WebXR 3D digital twins, industrial AR maintenance HUDs, and native visionOS/Meta Quest applications with sub-15ms motion-to-photon latency.",
    iconName: "Glasses",
    color: "#189a91",
    gradient: "from-cyan-600/20 via-sky-500/10 to-transparent",
    features: [
      "Native Apple Vision Pro (visionOS & RealityKit) & Meta Quest 3 Spatial Applications",
      "WebXR & Three.js/Babylon.js Photorealistic 3D Product Visualizers",
      "Industrial IoT Digital Twins with Real-Time Sensor Telemetry Overlays",
      "Multi-User Collaborative Spatial Workspaces & WebRTC Spatial Audio",
      "Photogrammetry 3D Gaussian Splatting & Unreal Engine 5 Pixel Streaming",
      "Medical & Defense Precision Interactive Simulators with Zero-Latency Tracking"
    ],
    deliverables: ["visionOS & Quest App Builds", "Interactive WebXR 3D Portal", "Digital Twin Telemetry Connector", "3D Shader & Asset Library"],
    idealFor: "Automotive Brands, Aerospace & Industrial Manufacturers, MedTech Simulators & Immersive Startups"
  },
  {
    id: "energytech-smart-grid",
    title: "EnergyTech & Smart Grid Systems",
    tagline: "OCPP 2.0.1 EV Charging Hubs, Microgrid Telemetry & Carbon Accounting",
    description:
      "Mission-critical energy management platforms, distributed smart-grid load balancers, OCPP 2.0.1-compliant EV charging network orchestrators, and automated ESG carbon compliance accounting pipelines.",
    iconName: "BatteryCharging",
    color: "#5c9556",
    gradient: "from-emerald-600/20 via-green-500/10 to-transparent",
    features: [
      "OCPP 1.6J / 2.0.1 Compliant EV Charging Station Management System (CSMS)",
      "Real-Time Distributed Microgrid Load Balancing & Peak Shaving Algorithms",
      "Solar PV & BESS Battery Energy Storage System Telemetry HUD",
      "Automated ESG Carbon Footprint Accounting & Scope 1/2/3 Audit Trails",
      "Dynamic Energy Spot Pricing Engine with Automated Grid Tariffs & Billing",
      "Smart Meter Ingestion (DLMS/COSEM, Modbus) with Sub-Second Anomaly Alerts"
    ],
    deliverables: ["EV CSMS Network Portal", "Driver Mobile App (iOS/Android)", "Microgrid Dispatch Algorithms", "ESG Carbon Audit Reporting Suite"],
    idealFor: "EV Charging Operators, Renewable Energy Farms, Commercial Real Estate Grids & CleanTech Enterprises"
  }
];
