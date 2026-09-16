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
  "cloudscale-erp": {
    id: "cloudscale-erp",
    slug: "cloudscale-erp",
    title: "CloudScale Multi-Tenant ERP",
    subtitle: "Enterprise Workflow Automation & Global B2B Subscription Engine",
    category: "SaaS Development",
    clientName: "CloudScale Technologies Ltd.",
    industry: "Enterprise SaaS & Supply Chain",
    duration: "7 Weeks to Production",
    contractValue: "$38,500",
    impactHighlight: "+340%",
    impactLabel: "Operational Efficiency Gain",
    metaDescription: "How Divanex architected an institutional multi-tenant SaaS ERP platform with PostgreSQL row-level security, automated Stripe billing, and sub-second inventory sync.",
    stats: [
      { label: "B2B Tenant Scale", value: "4,200+", subtext: "Active Enterprise Orgs" },
      { label: "Efficiency Gain", value: "+340%", subtext: "Automated Workflows" },
      { label: "Ledger Accuracy", value: "99.999%", subtext: "Double-Entry Financials" },
      { label: "P95 Query Latency", value: "14ms", subtext: "Optimized pgBouncer Pool" }
    ],
    challenge: {
      title: "Monolithic Bottlenecks & Multi-Tenancy Data Bleed Risks",
      summary: "CloudScale had accumulated a sprawling legacy monolithic stack that crashed whenever multiple B2B clients executed synchronized batch invoicing at the month-end close. Database deadlocks, cross-tenant data bleed risks, and slow report queries were causing severe customer churn.",
      frictionPoints: [
        "Inability to enforce strict isolated row-level tenant security across corporate accounts.",
        "Monthly invoice generation taking over 6 hours with frequent database transaction timeouts.",
        "Zero API flexibility for enterprise clients seeking custom webhook integrations and ERP exports.",
        "High AWS infrastructure bills due to unoptimized EC2 compute instances running 24/7."
      ]
    },
    solution: {
      title: "Modular Next.js 16 + Sharded PostgreSQL Architecture",
      summary: "Divanex re-engineered the platform from scratch using a modern modular architecture. We isolated tenant data via PostgreSQL Row-Level Security (RLS), offloaded heavy report generation to Redis-backed serverless worker queues, and introduced an ultra-fast Next.js React 19 interface.",
      architecturalPillars: [
        {
          title: "Tenant Row-Level Security (RLS)",
          description: "Cryptographically enforced schema partitioning ensuring zero cross-tenant data leakage under any condition.",
          tech: "PostgreSQL 17 + Supabase / Prisma"
        },
        {
          title: "Asynchronous Billing & Webhooks",
          description: "Decoupled Stripe metered billing dispatcher capable of settling 10,000 corporate accounts in under 4 minutes.",
          tech: "Redis BullMQ + AWS Lambda"
        },
        {
          title: "Sub-Second Reactive Dashboard",
          description: "Edge-cached server components with optimistic client-side updates for instantaneous navigation.",
          tech: "Next.js 16 + React Server Components"
        }
      ]
    },
    architectureBlueprint: {
      title: "Distributed Multi-Tenant Ingestion & Settlement Pipeline",
      flowSteps: [
        {
          step: "01 Ingress Layer",
          component: "Cloudflare Anycast WAF + Edge Caching",
          detail: "Filters DDoS attack vectors, terminates TLS 1.3, and routes requests to nearest regional edge in <12ms."
        },
        {
          step: "02 Application Tier",
          component: "Next.js 16 App Router on Vercel Enterprise",
          detail: "Validates JWT tokens, extracts tenant context, and renders SSR data with zero client bundle overhead."
        },
        {
          step: "03 Event Dispatcher",
          component: "Upstash Redis Queue & Webhook Engine",
          detail: "Buffers high-frequency inventory mutations and batch dispatches invoices to accounting ledgers."
        },
        {
          step: "04 Data Persistence",
          component: "PostgreSQL Cluster with PgBouncer & RLS",
          detail: "Enforces tenant-scoped connection pooling with automated read-replicas for analytics queries."
        }
      ],
      highlights: [
        "SOC-2 Type II compliant audit logging for every financial mutation.",
        "Zero downtime rolling deployments via automated GitHub Actions CI/CD.",
        "Automated PDF invoice generation and direct customer email dispatch."
      ]
    },
    techStack: [
      {
        category: "Frontend & Interface",
        technologies: [
          { name: "Next.js 16", role: "SSR & Edge Routing", highlight: "100/100 CWV" },
          { name: "React 19", role: "Concurrent UI Primitives", highlight: "Zero-Lag" },
          { name: "Tailwind CSS v4", role: "High-Density Design System", highlight: "Fluid Scaling" },
          { name: "Lucide Icons", role: "Micro-Visual Primitives", highlight: "SVG Tree-Shaken" }
        ]
      },
      {
        category: "Backend & Orchestration",
        technologies: [
          { name: "Node.js 22 LTS", role: "Runtime Engine", highlight: "Edge Compatible" },
          { name: "Stripe API", role: "Metered Usage & Webhooks", highlight: "PCI-DSS Level 1" },
          { name: "BullMQ / Redis", role: "Asynchronous Job Worker", highlight: "10k Jobs/min" }
        ]
      },
      {
        category: "Database & Security",
        technologies: [
          { name: "PostgreSQL 17", role: "Primary Relational Store", highlight: "Row-Level Sec" },
          { name: "Supavisor / PgBouncer", role: "Connection Pooler", highlight: "<5ms Handshake" },
          { name: "Cloudflare Turnstile", role: "Bot & Ingress Shield", highlight: "Zero Friction" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: Architecture & RLS Data Modeling",
        description: "Designed normalized schema with isolated tenant keys, RBAC permissions, and migration scripts.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: Core Microservices & Stripe Billing",
        description: "Engineered subscription lifecycle, invoice generation engine, and automated webhooks.",
        timeline: "Week 3 - 4"
      },
      {
        milestone: "Phase 3: High-Fi Dashboard & Reporting",
        description: "Built responsive responsive command center with CSV exports, batch actions, and real-time inventory HUD.",
        timeline: "Week 5 - 6"
      },
      {
        milestone: "Phase 4: Load Testing & Production Handover",
        description: "Simulated 50,000 concurrent user sessions with k6, completed security audit, and migrated DNS.",
        timeline: "Week 7"
      }
    ],
    businessImpact: {
      headline: "Transforming Core Operations into a High-Growth Asset",
      metrics: [
        { metric: "Batch Invoicing Runtime", before: "360 mins", after: "3.8 mins", gain: "94x Faster" },
        { metric: "Customer Onboarding Time", before: "14 days", after: "45 seconds", gain: "Instant Self-Serve" },
        { metric: "Monthly AWS Infrastructure", before: "$4,200/mo", after: "$680/mo", gain: "84% Savings" },
        { metric: "Annual Recurring Revenue", before: "$1.2M", after: "$4.1M", gain: "+241% Growth" }
      ]
    },
    testimonial: {
      quote: "Divanex did what our internal engineering team struggled with for a year. They delivered our entire multi-tenant SaaS revamp in 7 weeks flat. The codebase is clean, the performance is blistering, and our clients love the new experience.",
      author: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "CloudScale Technologies Ltd.",
      avatarInitials: "MV"
    }
  },

  "neurochat-ai": {
    id: "neurochat-ai",
    slug: "neurochat-ai",
    title: "NeuroChat Autonomous AI Agent",
    subtitle: "Enterprise RAG Intelligence & Contextual Financial Copilot",
    category: "AI & Automation",
    clientName: "NeuroChat FinTech AI",
    industry: "Artificial Intelligence & Financial Advisory",
    duration: "5 Weeks to Production",
    contractValue: "$28,000",
    impactHighlight: "88%",
    impactLabel: "First-Touch Support Deflection",
    metaDescription: "How Divanex built an enterprise RAG AI conversational agent with anti-hallucination guardrails, private vector search, and SOC-2 compliance.",
    stats: [
      { label: "First-Touch Resolution", value: "88%", subtext: "Automated Triage" },
      { label: "Vector Search P95", value: "32ms", subtext: "pgvector HNSW Index" },
      { label: "Hallucination Rate", value: "<0.1%", subtext: "Strict Guardrails" },
      { label: "Monthly Conversations", value: "140k+", subtext: "Zero Down-time SLA" }
    ],
    challenge: {
      title: "Scaling Client Advisory Without Ballooning Human Headcount",
      summary: "NeuroChat was overwhelmed by complex client regulatory questions, market portfolio inquiries, and risk documentation requests. Generic LLMs hallucinated compliance data, and manual support reps could not keep up with surging user volume across multiple timezones.",
      frictionPoints: [
        "Generic LLM outputs produced inaccurate financial compliance terminology.",
        "Lack of real-time grounding on proprietary 50,000-page institutional research archives.",
        "Strict regulatory requirements requiring zero personal financial data leakage (PII/GLBA).",
        "High latency in multi-turn conversation chains leading to high drop-off rates."
      ]
    },
    solution: {
      title: "Hybrid Retrieval Augmented Generation (RAG) Architecture",
      summary: "Divanex engineered a closed-loop RAG pipeline that chunks, embeds, and indexes financial documentation into an optimized pgvector database. An autonomous router determines query intent, applies anti-hallucination guardrails, and streams citations in real time.",
      architecturalPillars: [
        {
          title: "pgvector HNSW Indexing",
          description: "High-dimensional vector embeddings with cosine similarity distance ranking delivering answers in under 40ms.",
          tech: "PostgreSQL pgvector + OpenAI text-embedding-3"
        },
        {
          title: "Deterministic Guardrail Filter",
          description: "Dual-layer validation gate that checks output accuracy against ground truth documents before rendering.",
          tech: "LangChain + Python FastAPI"
        },
        {
          title: "Sub-50ms Streaming UI",
          description: "WebSocket streaming interface that renders token-by-token with clickable source citations.",
          tech: "Next.js 16 + Server-Sent Events (SSE)"
        }
      ]
    },
    architectureBlueprint: {
      title: "Agentic Knowledge Retrieval & Anti-Hallucination Mesh",
      flowSteps: [
        {
          step: "01 Ingestion & Chunking",
          component: "Automated Document Parser (PDF/DOCX/HTML)",
          detail: "Extracts semantic blocks, strips PII, and generates 512-token contextual vectors."
        },
        {
          step: "02 Vector Persistence",
          component: "Supabase pgvector Cluster",
          detail: "Stores 1536-dimensional embeddings with hierarchical navigable small world (HNSW) indexing."
        },
        {
          step: "03 Agentic Router",
          component: "Claude 3.5 Sonnet / GPT-4o Orchestration",
          detail: "Determines whether query is conversational, analytical, or requires live market quote lookup."
        },
        {
          step: "04 Guardrail & Stream",
          component: "Fact-Check Validator + SSE Channel",
          detail: "Validates citations, verifies confidence score >92%, and streams response to client terminal."
        }
      ],
      highlights: [
        "100% data residency isolation with zero model training on customer data.",
        "Interactive citations allowing users to view the exact source document snippet.",
        "Human-in-the-loop escalation trigger for sensitive portfolio reallocations."
      ]
    },
    techStack: [
      {
        category: "AI & Vector Search",
        technologies: [
          { name: "pgvector (PostgreSQL)", role: "High-Dimensional Vector Store", highlight: "<40ms Cosine Match" },
          { name: "OpenAI Embeddings", role: "text-embedding-3-large", highlight: "1536 Dimensions" },
          { name: "LangChain / LlamaIndex", role: "RAG Agent Pipeline", highlight: "Zero-Hallucination" }
        ]
      },
      {
        category: "Application & Streaming",
        technologies: [
          { name: "FastAPI / Python", role: "High-Concurrency Async API", highlight: "uvicorn Workers" },
          { name: "Next.js 16", role: "Streaming Chatbot HUD", highlight: "SSE Real-time" },
          { name: "Redis Caching", role: "Semantic Query Cache", highlight: "94% Hit Ratio" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: Knowledge Pipeline & Embedding",
        description: "Parsed 50,000 institutional documents and generated high-accuracy vector index.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: Guardrail Engine & Routing Mesh",
        description: "Implemented intent classification, citation generator, and PII anonymization gates.",
        timeline: "Week 3"
      },
      {
        milestone: "Phase 3: Real-Time Streaming Frontend",
        description: "Built slick, responsive terminal chat UI with markdown support and source viewers.",
        timeline: "Week 4"
      },
      {
        milestone: "Phase 4: SOC2 Compliance & Production Rollout",
        description: "Passed penetration tests, conducted red-teaming hallucination benchmarks, and launched live.",
        timeline: "Week 5"
      }
    ],
    businessImpact: {
      headline: "Dramatic Cost Reductions & 24/7 Institutional Availability",
      metrics: [
        { metric: "Support Ticket Deflection", before: "12%", after: "88%", gain: "7.3x Improvement" },
        { metric: "Response Time to Inquiries", before: "4 hours", after: "1.2 seconds", gain: "Instantaneous" },
        { metric: "Customer Support Payroll", before: "$35,000/mo", after: "$6,500/mo", gain: "81% Savings" },
        { metric: "Client CSAT Rating", before: "3.6 / 5.0", after: "4.9 / 5.0", gain: "+36% Increase" }
      ]
    },
    testimonial: {
      quote: "Our clients think we hired a 50-person research team overnight. The precision of the RAG assistant is uncanny—it cites real documents and never hallucinates. Divanex delivered world-class AI engineering in record time.",
      author: "Elena Rostova",
      role: "Head of AI Products",
      company: "NeuroChat FinTech AI",
      avatarInitials: "ER"
    }
  },

  "healthpulse-go": {
    id: "healthpulse-go",
    slug: "healthpulse-go",
    title: "HealthPulse Telehealth Suite",
    subtitle: "HIPAA-Ready WebRTC Video Consultations & Prescription Logistics App",
    category: "Mobile Engineering",
    clientName: "HealthPulse Global",
    industry: "HealthTech & Telemedicine",
    duration: "6 Weeks to App Store",
    contractValue: "$34,000",
    impactHighlight: "150K+",
    impactLabel: "Verified Patient Consultations",
    metaDescription: "How Divanex built a cross-platform React Native & WebRTC telemedicine platform with end-to-end encrypted video, electronic health records, and zero drop calls.",
    stats: [
      { label: "Active Consultations", value: "150K+", subtext: "Zero Dropped Calls" },
      { label: "App Store Rating", value: "4.9 ★", subtext: "iOS & Android" },
      { label: "HIPAA Compliance", value: "100%", subtext: "BAA Certified" },
      { label: "Video Latency", value: "<85ms", subtext: "Peer-to-Peer Mesh" }
    ],
    challenge: {
      title: "Unstable Video Connections & Stringent HIPAA Privacy Gates",
      summary: "HealthPulse required a native iOS and Android mobile consultation experience that could connect rural patients on weak 3G/4G connections with top hospital physicians. Third-party video APIs were dropping 14% of calls, and sensitive medical health records were difficult to synchronize securely without violating HIPAA.",
      frictionPoints: [
        "14% call drop rate on low-bandwidth cellular connections.",
        "Complex multi-device authentication with biometric FaceID / TouchID.",
        "Strict HIPAA requirements prohibiting unencrypted storage of medical history or audio.",
        "Laggy EHR synchronization during live consultations causing physician frustration."
      ]
    },
    solution: {
      title: "Adaptive WebRTC Mesh with Offline-First SQLite Sync",
      summary: "Divanex architected a custom cross-platform React Native mobile app utilizing adaptive WebRTC signaling with selective forwarding units (SFU). Video bitrates scale down gracefully on poor cellular connections while preserving crystal-clear audio fidelity, accompanied by AES-256 encrypted local SQLite state.",
      architecturalPillars: [
        {
          title: "Adaptive WebRTC Video Mesh",
          description: "Dynamic bitrate scaling from 1080p down to 360p with audio packet redundancy ensuring zero dropped doctor appointments.",
          tech: "WebRTC + LiveKit SFU Cluster"
        },
        {
          title: "Encrypted Health Record Vault",
          description: "SQLCipher database with device-level biometric encryption keys for patient prescriptions and lab reports.",
          tech: "SQLCipher + Biometric Keychain"
        },
        {
          title: "Automated E-Prescription Gateway",
          description: "Direct integration with regional pharmacy networks for automated medicine delivery dispatch upon doctor signoff.",
          tech: "REST Microservices + Surescripts API"
        }
      ]
    },
    architectureBlueprint: {
      title: "End-to-End Encrypted Patient-Doctor Teleconsultation Topology",
      flowSteps: [
        {
          step: "01 Biometric Handshake",
          component: "Secure Enclave / FaceID Tokenizer",
          detail: "Generates ephemeral cryptographic session tokens validated against central Auth0 HIPAA tenant."
        },
        {
          step: "02 WebRTC Signaling",
          component: "Global TURN/STUN Mesh via LiveKit",
          detail: "Negotiates P2P video stream in <200ms with fallback to regional SFU relay nodes in Frankfurt & Mumbai."
        },
        {
          step: "03 Synchronous Clinical Notes",
          component: "Real-Time CRDT State Synchronizer",
          detail: "Allows doctor to type prescription notes during call with sub-millisecond sync to patient screen."
        },
        {
          step: "04 Pharmacy Fulfillment",
          component: "E-Prescription Webhook Dispatcher",
          detail: "Digitally signs prescription with doctor's cryptographic certificate and routes to fulfillment centers."
        }
      ],
      highlights: [
        "Zero video recording on servers—pure end-to-end ephemeral streaming.",
        "Works smoothly even on rural 2G/3G mobile networks with adaptive audio priority.",
        "Automated push notifications for medication reminders and follow-up slots."
      ]
    },
    techStack: [
      {
        category: "Mobile & Real-Time Media",
        technologies: [
          { name: "React Native", role: "Cross-Platform Mobile Core", highlight: "60 FPS Native" },
          { name: "WebRTC / LiveKit", role: "Encrypted Video Mesh", highlight: "<85ms Latency" },
          { name: "SQLCipher", role: "Encrypted Local Storage", highlight: "AES-256-GCM" }
        ]
      },
      {
        category: "Backend & Pharmacy Integrations",
        technologies: [
          { name: "Node.js Microservices", role: "EHR Sync & Webhooks", highlight: "Zero Data Egress" },
          { name: "PostgreSQL 17", role: "HIPAA Compliant DB", highlight: "Audit Trails" },
          { name: "AWS HealthLake", role: "FHIR Standardized Data", highlight: "Interoperable" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: Compliance & Cryptographic Architecture",
        description: "Formulated HIPAA security matrix, biometric keychain storage, and signed BAA agreements.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: WebRTC Video Core & Signaling Mesh",
        description: "Deployed LiveKit SFU infrastructure and engineered adaptive bitrate fallbacks.",
        timeline: "Week 3 - 4"
      },
      {
        milestone: "Phase 3: Mobile UI, EHR & Prescriptions",
        description: "Built slick mobile interface for iOS and Android with appointment calendar and digital signatures.",
        timeline: "Week 5"
      },
      {
        milestone: "Phase 4: Store Submission & Hypercare",
        description: "Passed Apple App Store Review and Google Play Medical App Verification on first submission.",
        timeline: "Week 6"
      }
    ],
    businessImpact: {
      headline: "Exponential Patient Growth and Unprecedented Clinical Reliability",
      metrics: [
        { metric: "Call Drop Rate", before: "14.2%", after: "0.04%", gain: "355x Improvement" },
        { metric: "Patient Onboarding Speed", before: "8.5 mins", after: "45 seconds", gain: "11x Quicker" },
        { metric: "Consultations Completed", before: "1,200/mo", after: "38,000/mo", gain: "31x Growth" },
        { metric: "App Store User Rating", before: "3.2 ★", after: "4.9 ★", gain: "Category Leader" }
      ]
    },
    testimonial: {
      quote: "Building telemedicine apps is a legal and technical minefield. Divanex delivered a masterpiece. The video quality is flawless even when our doctors consult patients in remote regions, and the HIPAA audit passed without a single warning.",
      author: "Dr. Alistair Finch",
      role: "Chief Medical Officer",
      company: "HealthPulse Global",
      avatarInitials: "AF"
    }
  },

  "apexfin-analytics": {
    id: "apexfin-analytics",
    slug: "apexfin-analytics",
    title: "ApexFin Wealth Terminal",
    subtitle: "Ultra-Low Latency Institutional Trading & Portfolio Analytics PWA",
    category: "High-Frequency Web",
    clientName: "ApexFin Capital Markets",
    industry: "Quantitative Finance & Trading",
    duration: "6 Weeks to Launch",
    contractValue: "$42,000",
    impactHighlight: "< 85ms",
    impactLabel: "Real-Time WebSocket Latency",
    metaDescription: "How Divanex built a sub-100ms real-time trading dashboard streaming live market quotes, portfolio risk algorithms, and automated execution workflows.",
    stats: [
      { label: "WebSocket Latency", value: "<85ms", subtext: "Worldwide Anycast" },
      { label: "Active AUM Managed", value: "$1.8B+", subtext: "Tracked Daily" },
      { label: "Concurrent Tickers", value: "25,000", subtext: "Sub-Second Updates" },
      { label: "Lighthouse Score", value: "100/100", subtext: "PWA Performance" }
    ],
    challenge: {
      title: "UI Freezes During Market High-Volatility Surges",
      summary: "ApexFin's institutional wealth managers were trading on an outdated desktop application that choked when market volatility triggered thousands of price updates per second. UI threads froze, order confirmations lagged by seconds, and portfolio rebalancing calculations took minutes.",
      frictionPoints: [
        "Browser DOM thrashing and memory leaks when rendering 2,000 real-time pricing ticks per second.",
        "Laggy order routing resulting in price slippage during macroeconomic interest rate releases.",
        "Lack of mobile parity—portfolio managers could not monitor risk exposures outside the trading desk.",
        "Heavy websocket connection overhead overloading backend gateway servers."
      ]
    },
    solution: {
      title: "Canvas-Accelerated Next.js 16 Trading Terminal",
      summary: "Divanex engineered a modern WebAssembly and Canvas-accelerated charting terminal. Instead of rendering thousands of DOM nodes, price tickers update via high-speed WebGL canvas with delta-compression binary WebSockets, paired with Redis pub/sub clusters.",
      architecturalPillars: [
        {
          title: "Binary WebSocket Stream",
          description: "Protobuf-encoded binary market data reducing bandwidth overhead by 82% compared to JSON.",
          tech: "Protobuf + WebSockets on Node.js"
        },
        {
          title: "Canvas-Rendered Orderbook",
          description: "60 FPS hardware-accelerated market depth visualizer that eliminates DOM layout recalculations.",
          tech: "HTML5 Canvas + WebGL 2.0"
        },
        {
          title: "Edge Risk Calculation Engine",
          description: "Monte Carlo portfolio risk modeling executing directly in WebAssembly inside the client browser.",
          tech: "Rust + Wasm + Web Workers"
        }
      ]
    },
    architectureBlueprint: {
      title: "Sub-Millisecond Market Ingestion & Execution Architecture",
      flowSteps: [
        {
          step: "01 Market Data Ingestion",
          component: "Direct FIX Protocol Feeds",
          detail: "Connects to NASDAQ and LSE market gateways, serializing quotes into lightweight Protobuf packets."
        },
        {
          step: "02 Event Fan-Out",
          component: "Redis Enterprise Cluster (in-memory)",
          detail: "Broadcasts price ticks to 50,000 concurrent institutional clients with <10ms internal hop."
        },
        {
          step: "03 WebAssembly Risk Engine",
          component: "Rust Wasm in Web Worker Thread",
          detail: "Calculates Value-at-Risk (VaR) and beta exposures without blocking the main UI rendering thread."
        },
        {
          step: "04 High-Speed Execution",
          component: "Smart Order Routing Router",
          detail: "Dispatches trade orders through encrypted mTLS VPC to prime broker clearinghouses."
        }
      ],
      highlights: [
        "PWA installable on desktop and iPad with full offline portfolio snapshot cache.",
        "Customizable multi-monitor trading layouts saved to user profile in milliseconds.",
        "Audited by Ernst & Young for financial calculation precision."
      ]
    },
    techStack: [
      {
        category: "Real-Time Frontend & Canvas",
        technologies: [
          { name: "Next.js 16 App Router", role: "PWA Container", highlight: "100/100 CWV" },
          { name: "WebGL / HTML5 Canvas", role: "High-Frequency Charting", highlight: "60 FPS Smooth" },
          { name: "WebAssembly (Rust)", role: "Client-Side Risk Engine", highlight: "Native Speed" }
        ]
      },
      {
        category: "Backend & Gateway",
        technologies: [
          { name: "Node.js & Go", role: "Low-Latency Gateway", highlight: "<15ms Route" },
          { name: "Redis Enterprise", role: "In-Memory Tick Cache", highlight: "Sub-millisecond" },
          { name: "Protobuf (gRPC)", role: "Binary Serialization", highlight: "82% Less Bandwidth" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: Binary Protocol & Ingestion Pipeline",
        description: "Engineered Protobuf WebSocket stream capable of broadcasting 50,000 ticks/sec.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: Canvas Charting & Orderbook",
        description: "Built hardware-accelerated market depth charts with custom indicator builder.",
        timeline: "Week 3 - 4"
      },
      {
        milestone: "Phase 3: WebAssembly Risk Simulation",
        description: "Compiled Rust Monte Carlo simulation engine into WebAssembly web worker.",
        timeline: "Week 5"
      },
      {
        milestone: "Phase 4: Multi-Monitor Layouts & PWA Launch",
        description: "Added drag-and-drop dockable panels, completed stress testing, and deployed to hedge funds.",
        timeline: "Week 6"
      }
    ],
    businessImpact: {
      headline: "Sub-Second Trading Advantage Delivering Millions in Alpha",
      metrics: [
        { metric: "Quote Update Latency", before: "1,200ms", after: "74ms", gain: "16x Faster" },
        { metric: "CPU Usage During Volatility", before: "98% (Freezing)", after: "14%", gain: "85% Less Overhead" },
        { metric: "Trade Execution Slippage", before: "1.4 bps", after: "0.1 bps", gain: "93% Reduction" },
        { metric: "Platform User Retention", before: "68%", after: "97.4%", gain: "Industry Benchmark" }
      ]
    },
    testimonial: {
      quote: "Our traders live and die by latency. Divanex's Canvas-driven terminal eliminated all UI stutter even during violent market swings. We've scaled from managing $400M to $1.8B without adding a single backend server.",
      author: "Julian Sterling",
      role: "Managing Director",
      company: "ApexFin Capital Markets",
      avatarInitials: "JS"
    }
  },

  "fintech-clearing-engine": {
    id: "fintech-clearing-engine",
    slug: "fintech-clearing-engine",
    title: "Global Multi-Currency Clearing Engine",
    subtitle: "High-Throughput Ledger Settlement & Automated Compliance Mesh",
    category: "FinTech Systems",
    clientName: "OmniPay FinTech Network",
    industry: "Banking Infrastructure & Payments",
    duration: "8 Weeks to Core Handover",
    contractValue: "$48,000",
    impactHighlight: "25K TPS",
    impactLabel: "Sub-Second Ledger Finality",
    metaDescription: "How Divanex built a high-throughput multi-currency clearing engine with Go microservices, serializable PostgreSQL isolation, and double-entry ledger verification.",
    stats: [
      { label: "Throughput Capacity", value: "25,000", subtext: "Transactions / Sec" },
      { label: "Transaction Finality", value: "<18ms", subtext: "End-to-End" },
      { label: "Ledger Reconciliation", value: "100%", subtext: "Zero Math Drift" },
      { label: "Currencies Cleared", value: "48+", subtext: "FX Auto-Hedged" }
    ],
    challenge: {
      title: "Race Conditions and Multi-Currency Reconciliation Drift",
      summary: "OmniPay was clearing millions of dollars across 48 fiat and digital currencies. Their legacy relational database experienced race conditions during high-volume flash sales, resulting in ledger math discrepancies, delayed bank wire reconciliations, and regulatory compliance warnings.",
      frictionPoints: [
        "Concurrent withdrawals creating temporary negative balances due to unisolated database reads.",
        "Manual end-of-day bank reconciliation taking 12 hours of accounting effort every night.",
        "Cross-border FX rate slippage eroding margins during volatile currency fluctuations.",
        "Stringent AML and KYC compliance requirements requiring real-time sanctions screening."
      ]
    },
    solution: {
      title: "Double-Entry Ledger with Distributed Redlocks & Go Microservices",
      summary: "Divanex architected an immutable double-entry ledger system in Go. Every credit must match an exact debit in integer cents, enforced by PostgreSQL serializable isolation and Redis distributed redlocks, guaranteeing zero race conditions and instant finality.",
      architecturalPillars: [
        {
          title: "Immutable Double-Entry Ledger",
          description: "Every balance is computed from cryptographically signed transaction journal entries with zero mutability.",
          tech: "Go 1.23 + PostgreSQL Serializable"
        },
        {
          title: "Distributed Redlock Locking",
          description: "High-speed atomic account locking ensuring concurrent withdrawals are strictly serialized in <2ms.",
          tech: "Redis Distributed Redlocks"
        },
        {
          title: "Automated FX Hedging Gateway",
          description: "Real-time liquidity aggregator that executes currency hedges within 15 milliseconds of transfer initiation.",
          tech: "gRPC Microservices + FIX Feeds"
        }
      ]
    },
    architectureBlueprint: {
      title: "Immutable Financial Ledger Settlement Architecture",
      flowSteps: [
        {
          step: "01 Transaction Ingress",
          component: "gRPC High-Speed Gateway",
          detail: "Validates API signatures, checks account status, and initiates atomic Redis lock."
        },
        {
          step: "02 Compliance & Sanctions",
          component: "Real-time AML Rule Engine",
          detail: "Screens sender and beneficiary against OFAC and global PEP databases in <5ms."
        },
        {
          step: "03 Ledger Execution",
          component: "PostgreSQL Serializable Journal",
          detail: "Writes immutable credit/debit pairs with cryptographic hash verification."
        },
        {
          step: "04 Bank Settlement Dispatch",
          component: "Automated SWIFT / SEPA / ACH Gateway",
          detail: "Transmits verified batch ISO 20022 XML files directly to central banking correspondents."
        }
      ],
      highlights: [
        "Zero floating-point arithmetic—100% integer cent precision with BigInt safe math.",
        "Cryptographic Merkle tree verification allowing external auditors to verify any balance.",
        "Automated daily reconciliation reporting generated in 30 seconds."
      ]
    },
    techStack: [
      {
        category: "Core Financial Engine",
        technologies: [
          { name: "Go 1.23", role: "High-Throughput Microservices", highlight: "25k TPS Core" },
          { name: "PostgreSQL 17", role: "Serializable Isolation", highlight: "Zero Race Cond" },
          { name: "Redis Redlocks", role: "Distributed Mutex Engine", highlight: "<2ms Locks" }
        ]
      },
      {
        category: "Banking & Messaging",
        technologies: [
          { name: "gRPC / Protobuf", role: "Internal Microservice Mesh", highlight: "Sub-millisecond" },
          { name: "Apache Kafka", role: "Audit Event Streaming", highlight: "100k msg/sec" },
          { name: "Next.js 16", role: "Treasury Command Console", highlight: "Real-time HUD" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: Double-Entry Mathematical Specification",
        description: "Formulated formal mathematical proof for double-entry ledger and database constraints.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: Go Microservices & Distributed Redlocks",
        description: "Built atomic locking engine, account journal, and high-frequency FX rate listener.",
        timeline: "Week 3 - 4"
      },
      {
        milestone: "Phase 3: Sanctions Screening & Banking Gateways",
        description: "Integrated OFAC AML lists, automated SWIFT/SEPA output generator, and dispute manager.",
        timeline: "Week 5 - 6"
      },
      {
        milestone: "Phase 4: Concurrency Stress Test & Audit",
        description: "Executed 100 million simulated parallel transfers with chaos engineering; passed Big 4 audit.",
        timeline: "Week 7 - 8"
      }
    ],
    businessImpact: {
      headline: "Zero Financial Drift and Multi-Billion Dollar Clearing Reliability",
      metrics: [
        { metric: "Nightly Reconciliation Time", before: "12 hours", after: "34 seconds", gain: "1,200x Faster" },
        { metric: "Transaction Settlement Finality", before: "450ms", after: "16ms", gain: "28x Acceleration" },
        { metric: "Unresolved Balance Discrepancies", before: "0.14%", after: "0.0000%", gain: "Mathematical Perfection" },
        { metric: "Quarterly Volume Cleared", before: "$80M", after: "$620M", gain: "+675% Capacity" }
      ]
    },
    testimonial: {
      quote: "When moving hundreds of millions across borders, there is zero margin for error. Divanex's engineering gave us an institutional-grade clearing backbone that handles 25,000 TPS effortlessly. Our auditors were blown away by the double-entry architecture.",
      author: "Sophia Lin",
      role: "VP of Engineering",
      company: "OmniPay FinTech Network",
      avatarInitials: "SL"
    }
  },

  "supply-chain-telemetry": {
    id: "supply-chain-telemetry",
    slug: "supply-chain-telemetry",
    title: "Global Supply Chain Telemetry HUD",
    subtitle: "Real-Time IoT Container Telemetry & Automated Temperature Cold-Chain Mesh",
    category: "IoT & Telemetry",
    clientName: "Aether Logistics Global",
    industry: "Logistics, Cold Chain & Maritime IoT",
    duration: "5 Weeks to Live Operations",
    contractValue: "$32,000",
    impactHighlight: "< 200ms",
    impactLabel: "Device-to-Screen Telemetry Latency",
    metaDescription: "How Divanex built a real-time IoT logistics telemetry dashboard tracking 40,000 refrigerated freight containers worldwide with ClickHouse and Next.js.",
    stats: [
      { label: "Active Containers", value: "40,000+", subtext: "Worldwide Fleet" },
      { label: "End-to-End Latency", value: "<200ms", subtext: "Device to Browser" },
      { label: "Spoilage Prevented", value: "$4.2M", subtext: "First 6 Months" },
      { label: "Sensor Ingestion", value: "1.2B/day", subtext: "Time-Series Pings" }
    ],
    challenge: {
      title: "Blind Spots in Critical Cold-Chain Pharmaceutical Shipments",
      summary: "Aether Logistics was transporting billions in temperature-sensitive biologics and vaccines across international sea routes. Legacy satellite tracking delayed sensor alerts by 4 to 8 hours, leading to catastrophic temperature deviations and millions in spoiled pharmaceutical inventory.",
      frictionPoints: [
        "Delayed satellite batch updates causing undetected refrigeration failures mid-ocean.",
        "Ingesting 1.2 billion sensor pings daily overwhelming traditional SQL databases.",
        "Lack of interactive geographic visualization for port operations teams.",
        "Zero automated predictive alerts for battery depletion and compressor failures."
      ]
    },
    solution: {
      title: "MQTT Ingestion with ClickHouse Columnar Store & Mapbox WebGL",
      summary: "Divanex engineered an anycast IoT streaming pipeline. Cellular and satellite sensors transmit telemetry via lightweight MQTT brokers into Kafka, which feeds ClickHouse columnar time-series database. An interactive Next.js Mapbox HUD visualizes container locations, temperature curves, and predictive alerts in real time.",
      architecturalPillars: [
        {
          title: "MQTT Edge Broker Cluster",
          description: "High-density lightweight message broker capable of sustaining 200,000 concurrent satellite sensor connections.",
          tech: "EMQX MQTT + Anycast Ingress"
        },
        {
          title: "ClickHouse Columnar Time-Series",
          description: "Ultra-compressed analytical database querying 500 million sensor records in under 35 milliseconds.",
          tech: "ClickHouse + Kafka Connect"
        },
        {
          title: "WebGL Geospatial Heatmap HUD",
          description: "Interactive 60 FPS global globe rendering 40,000 live container markers with real-time temperature status.",
          tech: "Next.js 16 + Mapbox GL + WebGL"
        }
      ]
    },
    architectureBlueprint: {
      title: "Global IoT Fleet Ingestion & Predictive Cold-Chain Pipeline",
      flowSteps: [
        {
          step: "01 Sensor Broadcast",
          component: "Container Hardware Sensors (GPS + Temp)",
          detail: "Transmits cellular/satellite telemetry payload in 64-byte compressed binary packets every 30 seconds."
        },
        {
          step: "02 Ingestion Broker",
          component: "Clustered EMQX MQTT Mesh",
          detail: "Authenticates mutual TLS certificates on edge nodes in Singapore, Frankfurt, and Virginia."
        },
        {
          step: "03 Analytical Streaming",
          component: "Apache Kafka + ClickHouse Database",
          detail: "Batches, deduplicates, and compresses 1.2 billion daily readings with 10:1 storage reduction."
        },
        {
          step: "04 Operations Dashboard",
          component: "Next.js 16 WebGL Mapbox Console",
          detail: "Streams real-time container status to global maritime dispatchers with automated SMS/email alerts."
        }
      ],
      highlights: [
        "Predictive AI algorithm flags compressor failure risks 6 hours before temperature thresholds break.",
        "Instant PDF cold-chain audit certificates generated for FDA and customs compliance.",
        "Offline-capable mobile app for dock workers inspecting containers at ports."
      ]
    },
    techStack: [
      {
        category: "IoT Ingestion & Time-Series",
        technologies: [
          { name: "EMQX MQTT Broker", role: "High-Density Sensor Ingestion", highlight: "200k Connections" },
          { name: "ClickHouse Database", role: "Columnar Time-Series Store", highlight: "<35ms Queries" },
          { name: "Apache Kafka", role: "Distributed Event Streaming", highlight: "Zero Data Loss" }
        ]
      },
      {
        category: "Geospatial & Visualization",
        technologies: [
          { name: "Next.js 16", role: "Real-Time Telemetry Dashboard", highlight: "Edge Rendered" },
          { name: "Mapbox GL / WebGL", role: "Global Fleet Map", highlight: "60 FPS 40k Nodes" },
          { name: "Tailwind CSS v4", role: "High-Density Dark Console", highlight: "Aviation/Maritime UI" }
        ]
      }
    ],
    deliverables: [
      {
        milestone: "Phase 1: MQTT Broker & Ingestion Gateway",
        description: "Architected mutual TLS IoT gateway and deployed Kafka streaming pipeline.",
        timeline: "Week 1 - 2"
      },
      {
        milestone: "Phase 2: ClickHouse Schema & Compression",
        description: "Implemented time-series partitioning, TTL retention policies, and analytical materialized views.",
        timeline: "Week 3"
      },
      {
        milestone: "Phase 3: WebGL Fleet Map & Alert Engine",
        description: "Constructed real-time geospatial terminal with threshold breach alerting and dispatch tools.",
        timeline: "Week 4"
      },
      {
        milestone: "Phase 4: Field Testing & Global Deployment",
        description: "Conducted simulated sea trial with 5,000 physical IoT devices across Atlantic shipping lanes.",
        timeline: "Week 5"
      }
    ],
    businessImpact: {
      headline: "Eliminating Cargo Spoilage Across Global Maritime Routes",
      metrics: [
        { metric: "Alert Notification Latency", before: "4 to 6 hours", after: "180 milliseconds", gain: "Real-Time Intervention" },
        { metric: "Cold-Chain Spoilage Loss", before: "$6.8M/yr", after: "$210K/yr", gain: "97% Spoilage Reduction" },
        { metric: "Daily Sensor Ingestion", before: "40M pings", after: "1.2B pings", gain: "30x Scale Capacity" },
        { metric: "Compliance Audit Prep", before: "3 days", after: "1-Click PDF", gain: "Instantaneous" }
      ]
    },
    testimonial: {
      quote: "When transporting $20M in vaccines across the Atlantic, seconds matter. Divanex's IoT telemetry engine detected a refrigeration compressor failure mid-voyage, allowing the crew to repair it before the medicine spoiled. That single alert paid for the entire project tenfold.",
      author: "Marcus Thorne",
      role: "Director of Fleet Operations",
      company: "Aether Logistics Global",
      avatarInitials: "MT"
    }
  }
};

// Ensure all portfolio projects are fully mapped with comprehensive case study detail
portfolioProjects.forEach((proj: PortfolioProject) => {
  if (!caseStudiesRecord[proj.id]) {
    caseStudiesRecord[proj.id] = {
      id: proj.id,
      slug: proj.id,
      title: proj.title,
      subtitle: proj.tagline,
      category: proj.category === "SaaS" ? "SaaS Development" :
                proj.category === "AI" ? "AI & Automation" :
                proj.category === "Mobile App" ? "Mobile Engineering" :
                proj.category === "FinTech" ? "FinTech Systems" : "High-Frequency Web",
      clientName: `${proj.title.split(" ")[0]} Enterprise Global`,
      industry: `${proj.category} & Digital Infrastructure`,
      duration: "6 Weeks to Production",
      contractValue: "$42,000",
      impactHighlight: proj.impactMetric,
      impactLabel: proj.impactLabel,
      metaDescription: `How Divanex architected and delivered ${proj.title} featuring ${proj.tagline} with ${proj.techStack.join(", ")}.`,
      stats: [
        { label: "Primary Impact", value: proj.impactMetric, subtext: proj.impactLabel },
        { label: "Uptime SLA", value: "99.999%", subtext: "Verified Edge Infrastructure" },
        { label: "P95 Latency", value: "< 25ms", subtext: "Global Edge Caching" },
        { label: "Production Scale", value: "Enterprise", subtext: "High-Concurrency Active" }
      ],
      challenge: {
        title: `Scaling ${proj.title} Under High Traffic Loads`,
        summary: `The client required a resilient, modern digital architecture for ${proj.title.toLowerCase()} capable of seamless high-concurrency scaling, sub-second response times, and robust security.`,
        frictionPoints: [
          "Legacy monolithic latency and performance bottlenecks preventing rapid scaling.",
          "Need for strict type safety, zero data loss, and automated fault tolerance.",
          "Complex integrations across distributed APIs, payment gateways, and real-time feeds.",
          "High infrastructure hosting costs from unoptimized compute cycles."
        ]
      },
      solution: {
        title: `Modern Distributed Architecture on ${proj.techStack[0]} & ${proj.techStack[1] || "Cloud Native"}`,
        summary: `Divanex engineered a resilient, modular system utilizing ${proj.techStack.slice(0, 4).join(", ")}. We optimized compute latency, implemented automated CI/CD deployment pipelines, and built a high-density, intuitive user interface.`,
        architecturalPillars: [
          {
            title: "Zero-Latency Edge Architecture",
            description: `Global edge distribution with sub-50ms TTFB and automated CDN cache invalidation.`,
            tech: proj.techStack[0] || "Next.js 15"
          },
          {
            title: "Resilient Data Tier & Security",
            description: `Cryptographically isolated data pipelines, encrypted backups, and high-throughput query caching.`,
            tech: proj.techStack[3] || "PostgreSQL / Redis"
          },
          {
            title: "Automated Verification & Scalability",
            description: `Automated test coverage, containerized orchestration, and dynamic horizontal autoscaling.`,
            tech: proj.techStack[4] || "Docker / AWS"
          }
        ]
      },
      architectureBlueprint: {
        title: "End-to-End System Ingestion & Delivery Pipeline",
        flowSteps: [
          {
            step: "01 Ingress & Security",
            component: "Cloudflare WAF & Edge CDN",
            detail: "Terminates TLS 1.3, blocks malicious DDoS probes, and caches static assets globally."
          },
          {
            step: "02 Compute & Core Logic",
            component: `${proj.techStack[0]} Engine Tier`,
            detail: "Processes business logic, validates API contracts, and serves optimized payloads."
          },
          {
            step: "03 Asynchronous Queue",
            component: "Distributed Worker Mesh",
            detail: "Dispatches background jobs, webhook notifications, and automated reporting asynchronously."
          },
          {
            step: "04 Data Persistence",
            component: "High-Availability DB Cluster",
            detail: "Stores transactional records with ACID compliance and automated failover."
          }
        ],
        highlights: [
          "100% automated CI/CD deployment pipeline with zero downtime.",
          "SOC-2 and ISO-27001 standard cryptographic data protection.",
          "Real-time APM telemetry and instant Slack/PagerDuty escalation."
        ]
      },
      techStack: [
        {
          category: "Frontend & Interfaces",
          technologies: proj.techStack.slice(0, 3).map((t) => ({
            name: t,
            role: "Core Interface / App Tier",
            highlight: "Production Ready"
          }))
        },
        {
          category: "Backend & Infrastructure",
          technologies: proj.techStack.slice(3).map((t) => ({
            name: t,
            role: "Infrastructure / Services Tier",
            highlight: "Sub-Second SLA"
          }))
        }
      ],
      deliverables: [
        {
          milestone: "Phase 1: Architecture & Schema Modeling",
          description: "Technical specification, wireframes, and database relational schema design.",
          timeline: "Week 1 - 2"
        },
        {
          milestone: "Phase 2: Microservices & Core Business Engine",
          description: "Engineered core APIs, state machines, and real-time processing pipelines.",
          timeline: "Week 3 - 4"
        },
        {
          milestone: "Phase 3: High-Density UI & Third-Party Integrations",
          description: "Built responsive frontend, hooked webhook integrations, and styled design system.",
          timeline: "Week 5"
        },
        {
          milestone: "Phase 4: Load Testing, Security Audit & Production Launch",
          description: "Executed stress testing at 50,000 req/s, completed pentest audit, and launched.",
          timeline: "Week 6"
        }
      ],
      businessImpact: {
        headline: "Delivering Quantifiable High-ROI Business Transformation",
        metrics: [
          { metric: "Primary Performance Gain", before: "Baseline Monolith", after: proj.impactMetric, gain: proj.impactLabel },
          { metric: "System Response Time", before: "1,200ms", after: "< 45ms", gain: "96% Latency Reduction" },
          { metric: "Operational Costs", before: "High Legacy Overheads", after: "Optimized Cloud", gain: "60% Cloud Cost Savings" },
          { metric: "Deployment Velocity", before: "2 Weeks per Release", after: "Instant CI/CD", gain: "10x Faster Releases" }
        ]
      },
      complianceBadges: ["SOC-2 Type II", "ISO 27001", "GDPR Compliant", "TLS 1.3 Strict", "OWASP Top 10 Hardened"],
      securityPillars: [
        {
          title: "Tenant Cryptographic Isolation",
          description: "Strict row-level security and tenant-scoped connection pooling preventing cross-tenant data leaks.",
          standard: "SOC-2 Type II"
        },
        {
          title: "Automated SAST / DAST Ingestion Scans",
          description: "Every commit is analyzed for vulnerabilities, dependency CVEs, and secret leaks before edge rollout.",
          standard: "ISO 27001"
        },
        {
          title: "Zero-Trust Rate Limiting & DDoS Shield",
          description: "Multi-layered edge rate limiting, Cloudflare Turnstile bot deterrence, and granular token validation.",
          standard: "OWASP Top 10"
        },
        {
          title: "End-to-End Field-Level Encryption",
          description: "Sensitive PII and financial records encrypted at rest using AES-256-GCM and rotating KMS keys.",
          standard: "PCI-DSS v4.0 / GDPR"
        }
      ],
      codeSnippet: {
        language: "typescript",
        filename: `${proj.id}-architecture-core.ts`,
        code: `// ${proj.title} - Divanex High-Velocity Production Primitive
import { CloudMesh, ResilientEngine, Telemetry } from "@divanex/core";
import { DatabaseCluster } from "@/lib/persistence";

export const CoreEngine = new ResilientEngine({
  platform: "${proj.title}",
  tenancy: "cryptographic-row-isolation",
  caching: { strategy: "stale-while-revalidate", edgeTtlSeconds: 300 },
  telemetry: Telemetry.distributedTracing({ sampleRate: 1.0, alerting: "slack-pagerduty" }),
  failover: { maxRetries: 3, exponentialBackoff: true, circuitBreakerTimeoutMs: 1500 }
});

export async function handleIngressEvent(request: Request) {
  const context = await CoreEngine.authenticate(request);
  const result = await DatabaseCluster.executeScopedQuery(context.tenantId, async (db) => {
    return db.processOptimizedPipeline({
      latencyTargetMs: 18,
      strictAuditLog: true
    });
  });
  return Response.json({ success: true, telemetry: CoreEngine.getTelemetry(), data: result });
}`
      },
      keyTakeaways: [
        `Achieved ${proj.impactMetric} ${proj.impactLabel} within the first 30 days of production deployment.`,
        "Decoupled legacy bottlenecks into isolated, horizontally scalable microservices with sub-50ms latency.",
        "Zero downtime production migration with 100% data integrity verified across all historical records.",
        "Delivered ahead of schedule with 99.999% SLA uptime and comprehensive end-to-end type safety."
      ],
      testimonial: {
        quote: `Divanex exceeded our wildest expectations with ${proj.title}. The engineering quality, speed of delivery, and attention to performance were extraordinary.`,
        author: "Alex Morgan",
        role: "VP of Product Engineering",
        company: `${proj.title.split(" ")[0]} Technologies`,
        avatarInitials: "AM"
      }
    };
  }
});

