export interface PortfolioProject {
  id: string;
  title: string;
  category: "SaaS" | "AI" | "Mobile App" | "Web Platform" | "E-Commerce" | "FinTech";
  tagline: string;
  description: string;
  impactMetric: string;
  impactLabel: string;
  techStack: string[];
  gradient: string;
  imagePlaceholderColor: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "cloudscale-erp",
    title: "CloudScale Multi-Tenant SaaS",
    category: "SaaS",
    tagline: "Enterprise workflow automation & subscription management engine",
    description:
      "Engineered an all-in-one cloud platform allowing enterprises to manage inventory, automate invoices, and onboard thousands of B2B tenants seamlessly.",
    impactMetric: "+340%",
    impactLabel: "Operational Efficiency Gain",
    techStack: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Stripe API", "AWS ECS"],
    gradient: "from-blue-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-blue-600/20"
  },
  {
    id: "neurochat-ai",
    title: "NeuroChat Autonomous Agent",
    category: "AI",
    tagline: "Custom RAG conversational intelligence for financial services",
    description:
      "Trained and deployed a secure, SOC2-compliant AI support agent on enterprise private knowledge bases, handling customer queries with 88% first-touch resolution.",
    impactMetric: "88%",
    impactLabel: "Support Deflection Rate",
    techStack: ["Python FastAPI", "OpenAI GPT-4o", "LangChain", "Pinecone Vector DB", "React"],
    gradient: "from-emerald-600/30 via-teal-900/20 to-slate-950",
    imagePlaceholderColor: "bg-emerald-600/20"
  },
  {
    id: "healthpulse-go",
    title: "HealthPulse Telehealth Suite",
    category: "Mobile App",
    tagline: "HIPAA-ready doctor consultations and prescription tracking app",
    description:
      "Engineered a high-performance cross-platform mobile app for real-time video doctor appointments, patient medical records, and automated prescription refills.",
    impactMetric: "150K+",
    impactLabel: "Active Patient Downloads",
    techStack: ["React Native", "WebRTC", "Firebase", "Node.js", "Tailwind CSS"],
    gradient: "from-cyan-600/30 via-sky-900/20 to-slate-950",
    imagePlaceholderColor: "bg-cyan-600/20"
  },
  {
    id: "apexfin-analytics",
    title: "ApexFin Wealth Dashboard",
    category: "FinTech",
    tagline: "Ultra-low latency institutional trading & portfolio analytics PWA",
    description:
      "Developed a sub-100ms real-time trading dashboard streaming live market data, risk calculation algorithms, and portfolio rebalancing workflows.",
    impactMetric: "< 85ms",
    impactLabel: "Real-Time WebSocket Latency",
    techStack: ["Next.js App Router", "Tailwind CSS", "WebSockets", "Docker", "Redis"],
    gradient: "from-orange-600/30 via-amber-900/20 to-slate-950",
    imagePlaceholderColor: "bg-orange-600/20"
  },
  {
    id: "luminex-iot",
    title: "Luminex Industrial IoT Telemetry",
    category: "Web Platform",
    tagline: "High-frequency sensor ingestion & predictive maintenance pipeline",
    description:
      "Engineered a mission-critical telemetry engine ingesting sensor data from 12,000+ factory machines with sub-50ms anomaly alarms.",
    impactMetric: "2.8M/s",
    impactLabel: "Telemetry Data Points Ingested",
    techStack: ["Golang", "TimescaleDB", "Apache Kafka", "Grafana", "Docker"],
    gradient: "from-purple-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-purple-600/20"
  },
  {
    id: "zenith-storefront",
    title: "Zenith Headless Commerce Engine",
    category: "E-Commerce",
    tagline: "Sub-second headless Shopify Plus architecture with edge caching",
    description:
      "Replaced an overloaded monolithic theme with a decoupled Next.js storefront yielding sub-80ms page loads and instantaneous instant search.",
    impactMetric: "+62%",
    impactLabel: "Mobile Checkout Conversion",
    techStack: ["Next.js 15", "Shopify Storefront API", "Tailwind CSS", "Algolia", "Vercel Edge"],
    gradient: "from-blue-600/30 via-blue-900/20 to-slate-950",
    imagePlaceholderColor: "bg-pink-600/20"
  },
  {
    id: "omnilog-supply",
    title: "OmniLog Global Freight & TMS",
    category: "SaaS",
    tagline: "Multi-modal logistics dispatch, route optimization & carrier telemetry",
    description:
      "Architected a centralized supply chain operating system coordinating 5,000+ freight haulers with real-time GPS tracking and dynamic routing.",
    impactMetric: "-28%",
    impactLabel: "Fleet Fuel & Delay Costs",
    techStack: ["Laravel 11", "PostgreSQL", "Redis BullMQ", "Livewire 3", "AWS Lambda"],
    gradient: "from-amber-600/30 via-yellow-900/20 to-slate-950",
    imagePlaceholderColor: "bg-amber-600/20"
  },
  {
    id: "medivision-ai",
    title: "MediVision Radiology Neural Net",
    category: "AI",
    tagline: "Automated X-ray anomaly detection & clinical triage copilot",
    description:
      "Trained high-accuracy computer vision neural networks to pre-screen radiographic scans, reducing emergency room radiological triage delays.",
    impactMetric: "99.4%",
    impactLabel: "Clinical Anomaly Recall",
    techStack: ["PyTorch", "Python FastAPI", "CUDA Acceleration", "Docker", "React 19"],
    gradient: "from-teal-600/30 via-emerald-900/20 to-slate-950",
    imagePlaceholderColor: "bg-teal-600/20"
  },
  {
    id: "urbanmove-ride",
    title: "UrbanMove On-Demand Mobility",
    category: "Mobile App",
    tagline: "Real-time driver dispatch, geospatial mapping & split-fare payments",
    description:
      "Engineered driver and passenger mobile apps handling 80,000+ daily rides with sub-second driver matching and automated route pricing.",
    impactMetric: "4.9★",
    impactLabel: "App Store Rating (500k+ Users)",
    techStack: ["Flutter", "Dart", "Google Maps SDK", "WebSockets", "Stripe API"],
    gradient: "from-blue-500/30 via-sky-900/20 to-slate-950",
    imagePlaceholderColor: "bg-blue-500/20"
  },
  {
    id: "paystream-global",
    title: "PayStream Cross-Border Ingress",
    category: "FinTech",
    tagline: "PCI-DSS multi-currency payment orchestration & fraud scoring engine",
    description:
      "Engineered a resilient payment gateway supporting 32 currencies, automated KYC verification, and smart routing across 8 payment acquirers.",
    impactMetric: "$120M+",
    impactLabel: "Annual Transaction Volume",
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Cloudflare Workers"],
    gradient: "from-emerald-500/30 via-green-900/20 to-slate-950",
    imagePlaceholderColor: "bg-emerald-500/20"
  },
  {
    id: "eduverse-lms",
    title: "EduVerse Enterprise LMS & AI Tutor",
    category: "SaaS",
    tagline: "Scalable virtual classroom, proctored exams & personalized AI study paths",
    description:
      "Built an enterprise learning management system serving universities with low-bandwidth WebRTC streaming, dynamic assignments, and adaptive quizzes.",
    impactMetric: "350K+",
    impactLabel: "Concurrent Student Sessions",
    techStack: ["Next.js 15", "Tailwind CSS", "Supabase", "WebRTC", "OpenAI"],
    gradient: "from-violet-600/30 via-purple-900/20 to-slate-950",
    imagePlaceholderColor: "bg-violet-600/20"
  },
  {
    id: "cybershield-soc",
    title: "CyberShield Threat Defense SIEM",
    category: "Web Platform",
    tagline: "Real-time zero-trust network packet inspection & automated incident response",
    description:
      "Constructed a high-throughput Security Operations Center (SOC) dashboard processing 40Gbps of network logs with automated attack mitigation.",
    impactMetric: "< 15s",
    impactLabel: "Mean Time to Threat Neutralization",
    techStack: ["Rust (Axum)", "ClickHouse", "Apache Kafka", "React", "Docker"],
    gradient: "from-sky-600/30 via-blue-900/20 to-slate-950",
    imagePlaceholderColor: "bg-sky-600/20"
  },
  {
    id: "proptech-realty",
    title: "PropTech Realty OS & MLS Hub",
    category: "SaaS",
    tagline: "Automated tenant screening, lease signing, and multi-listing syndication",
    description:
      "Delivered an enterprise property management suite automating rent collection, maintenance ticketing, and multi-MLS syndication for 45,000 units.",
    impactMetric: "4x",
    impactLabel: "Property Listing Velocity",
    techStack: ["Laravel 11", "Filament Admin", "MySQL", "Tailwind CSS", "DocuSign API"],
    gradient: "from-lime-600/30 via-emerald-900/20 to-slate-950",
    imagePlaceholderColor: "bg-lime-600/20"
  },
  {
    id: "vibeai-studio",
    title: "VibeAI Generative Creative Studio",
    category: "AI",
    tagline: "High-fidelity text-to-video, voice synthesis & dynamic marketing assets",
    description:
      "Created an AI-driven creative automation engine allowing marketing teams to generate localized video variations and ad copies in seconds.",
    impactMetric: "10x",
    impactLabel: "Creative Production Speed",
    techStack: ["Python", "Diffusers", "FastAPI", "Next.js 15", "AWS EC2 GPU"],
    gradient: "from-indigo-600/30 via-blue-900/20 to-slate-950",
    imagePlaceholderColor: "bg-fuchsia-600/20"
  },
  {
    id: "fitpulse-coach",
    title: "FitPulse AI Fitness & Biometrics",
    category: "Mobile App",
    tagline: "Computer-vision form correction, wearable sync & smart workout plans",
    description:
      "Engineered an on-device computer vision mobile app tracking exercise biomechanics via device camera with real-time audio posture coaching.",
    impactMetric: "82%",
    impactLabel: "30-Day User Retention",
    techStack: ["React Native", "Apple HealthKit", "Google Fit", "TensorFlow Lite", "Firebase"],
    gradient: "from-orange-500/30 via-amber-900/20 to-slate-950",
    imagePlaceholderColor: "bg-orange-500/20"
  },
  {
    id: "aurora-cms",
    title: "Aurora Global Media Network",
    category: "Web Platform",
    tagline: "Headless multi-language editorial engine delivering sub-50ms TTFB across 40 countries",
    description:
      "Engineered an enterprise publishing hub with live collaborative editing, automated translation, and global edge cache distribution.",
    impactMetric: "12M+",
    impactLabel: "Monthly Active Readers",
    techStack: ["Strapi Headless CMS", "Next.js 15", "PostgreSQL", "Cloudflare CDN"],
    gradient: "from-cyan-500/30 via-blue-900/20 to-slate-950",
    imagePlaceholderColor: "bg-cyan-500/20"
  },
  {
    id: "agrosense-iot",
    title: "AgroSense Precision Agriculture",
    category: "Web Platform",
    tagline: "Soil moisture IoT telemetry, automated irrigation & weather prediction",
    description:
      "Integrated IoT sensor networks across 20,000 hectares of commercial farmland to automate drip irrigation valves based on micro-climate AI forecasts.",
    impactMetric: "-40%",
    impactLabel: "Water & Fertilizer Resource Waste",
    techStack: ["Python", "MQTT Broker", "TimescaleDB", "React 19", "AWS IoT Core"],
    gradient: "from-green-600/30 via-emerald-900/20 to-slate-950",
    imagePlaceholderColor: "bg-green-600/20"
  },
  {
    id: "cryptoledger-dex",
    title: "CryptoLedger Institutional DEX",
    category: "FinTech",
    tagline: "Sub-second automated market maker (AMM) with order book liquidity aggregation",
    description:
      "Built a non-custodial decentralized exchange interface with MEV protection, multi-chain bridges, and institutional liquidity pooling.",
    impactMetric: "$450M",
    impactLabel: "Total Value Locked (TVL)",
    techStack: ["Solidity", "Ethers.js", "Next.js 15", "Wagmi", "Tailwind CSS"],
    gradient: "from-indigo-600/30 via-blue-900/20 to-slate-950",
    imagePlaceholderColor: "bg-indigo-600/20"
  },
  {
    id: "restohub-pos",
    title: "RestoHub Cloud POS & KDS",
    category: "SaaS",
    tagline: "Offline-first restaurant POS with QR table ordering, kitchen dispatch & inventory",
    description:
      "Delivered a zero-latency hybrid offline POS system deployed across multi-location restaurant chains with automated inventory deduction.",
    impactMetric: "1,200+",
    impactLabel: "Active Restaurant Locations",
    techStack: ["Electron", "React", "SQLite Local", "Node.js", "Thermal Print SDK"],
    gradient: "from-emerald-500/30 via-emerald-900/20 to-slate-950",
    imagePlaceholderColor: "bg-emerald-500/20"
  },
  {
    id: "talentflow-ats",
    title: "TalentFlow AI Applicant Engine",
    category: "SaaS",
    tagline: "Automated resume semantic parsing, skill matching & asynchronous video interviews",
    description:
      "Built a modern hiring intelligence platform evaluating 100k+ candidate profiles monthly with unbiased semantic scoring and automated calendar scheduling.",
    impactMetric: "65%",
    impactLabel: "Reduction in Time-to-Hire",
    techStack: ["Next.js 15", "Python NLP", "PostgreSQL", "Tailwind CSS", "SendGrid"],
    gradient: "from-sky-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-sky-600/20"
  },
  {
    id: "autovault-dealer",
    title: "AutoVault Digital Showroom",
    category: "E-Commerce",
    tagline: "360-degree vehicle visualization, online financing approvals & trade-in valuation",
    description:
      "Engineered an interactive 3D WebGL car buying experience enabling digital contract signing, instant loan approval, and doorstep delivery tracking.",
    impactMetric: "+84%",
    impactLabel: "Online Finance Conversions",
    techStack: ["Three.js", "React 19", "Laravel 11", "Stripe API", "AWS S3"],
    gradient: "from-slate-600/30 via-zinc-900/20 to-slate-950",
    imagePlaceholderColor: "bg-slate-600/20"
  },
  {
    id: "medicare-abdm-vault",
    title: "MediCare ABDM & Health Vault",
    category: "SaaS",
    tagline: "National ABDM M1/M2/M3 compliant EHR platform & HL7 FHIR clinical data pipeline",
    description:
      "Architected an enterprise health records exchange network integrating ABDM Ayushman Bharat Health Accounts (ABHA), diagnostic LIS device interfacing, and encrypted cloud DICOM PACS radiology viewer with sub-120ms latency.",
    impactMetric: "2.4M+",
    impactLabel: "ABHA Health Records Synced",
    techStack: ["Next.js 15", "HL7 FHIR v4", "PostgreSQL RLS", "Docker", "AWS S3", "Python FastAPI"],
    gradient: "from-teal-600/30 via-sky-900/20 to-slate-950",
    imagePlaceholderColor: "bg-teal-600/20"
  },
  {
    id: "nexus-agentic-rag",
    title: "NexusAgent Autonomous Enterprise LLM",
    category: "AI",
    tagline: "Sub-40ms vector RAG agent automating claims processing, contract redlining & compliance audits",
    description:
      "Trained and orchestrated a private multi-agent LLM ecosystem with semantic caching, hybrid BM25/Dense retrieval, and strict hallucination guardrails for 500+ legal and financial risk analysts.",
    impactMetric: "94.2%",
    impactLabel: "Autonomous Processing Accuracy",
    techStack: ["Python", "FastAPI", "Pinecone Vector DB", "LangGraph", "vLLM", "Next.js 15"],
    gradient: "from-purple-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-purple-600/20"
  },
  {
    id: "quantumpay-split",
    title: "QuantumPay Instant Split Escrow & UPI 2.0",
    category: "FinTech",
    tagline: "Automated instant vendor split-settlement engine, dispute escrow & multi-gateway payment switch",
    description:
      "Engineered a high-concurrency fintech orchestration switch handling 50,000+ daily split-escrow transactions with sub-30ms double-entry ledger reconciliation and automated chargeback shielding.",
    impactMetric: "₹850 Cr+",
    impactLabel: "Annual GTV Orchestrated",
    techStack: ["Next.js 15", "Go Microservices", "PostgreSQL", "Apache Kafka", "Razorpay / Stripe", "Redis"],
    gradient: "from-blue-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-blue-600/20"
  }
];
