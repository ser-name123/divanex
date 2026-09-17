import { servicesData, ServiceItem } from "./services";

export interface ServiceDetailData {
  slug: string;
  badge: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  metaDescription: string;
  headerStats: {
    label: string;
    value: string;
    detail: string;
    color: string;
  }[];
  architectureSummary: {
    diagramTitle: string;
    diagramSubtitle: string;
    flowSteps: {
      step: string;
      label: string;
      tech: string;
      desc: string;
    }[];
  };
  engineeringModules: {
    moduleNum: string;
    title: string;
    badge: string;
    description: string;
    keyPoints: string[];
    technicalSpec: string;
  }[];
  techStack: {
    category: string;
    items: string[];
  }[];
  sprintPhases: {
    phase: string;
    title: string;
    duration: string;
    deliverables: string;
  }[];
  handoverArtifacts: {
    title: string;
    format: string;
    desc: string;
  }[];
  caseStudy: {
    client: string;
    sector: string;
    challenge: string;
    solution: string;
    metrics: {
      label: string;
      val: string;
    }[];
  };
  pricingTiers: {
    name: string;
    price: string;
    period: string;
    badge: string;
    description: string;
    features: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const serviceDetailsRecord: Record<string, ServiceDetailData> = {
  "saas-development": {
    slug: "saas-development",
    badge: "ENTERPRISE CLOUD ARCHITECTURE // MULTI-TENANT PROTOCOL",
    title: "Enterprise SaaS Development &",
    titleHighlight: "Multi-Tenant Architecture",
    tagline: "Custom Cloud Solutions, Multi-Tenant Database Isolation & Metered Billing",
    metaDescription:
      "Enterprise SaaS engineering built for horizontal scale, tenant data isolation, automated Stripe billing, and sub-second API response times.",
    headerStats: [
      {
        label: "Architecture Uptime",
        value: "99.9%+",
        detail: "High Availability Infrastructure",
        color: "text-emerald-400"
      },
      {
        label: "Tenant Isolation",
        value: "100%",
        detail: "Row-Level Security & Schema Shards",
        color: "text-cyan-400"
      },
      {
        label: "Edge API Latency",
        value: "< 35ms",
        detail: "Sub-Second Global Ingress",
        color: "text-blue-400"
      },
      {
        label: "Active Production Scale",
        value: "Multi-Org",
        detail: "Simultaneous Multi-Tenant Orgs",
        color: "text-amber-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Distributed Multi-Tenant System Blueprint",
      diagramSubtitle: "End-to-end request lifecycle with automated tenant routing and data isolation",
      flowSteps: [
        {
          step: "01",
          label: "Global Edge Ingress",
          tech: "Cloudflare & Next.js Edge",
          desc: "Geo-routed DNS, DDoS protection, SSL termination, and static asset delivery."
        },
        {
          step: "02",
          label: "Tenant Router & Auth",
          tech: "JWT / OIDC & Redis",
          desc: "Dynamic sub-domain parsing (org.app.com) and role-based token validation."
        },
        {
          step: "03",
          label: "Microservices Cluster",
          tech: "Go / Node.js & Docker",
          desc: "Stateless containerized application pods auto-scaled via Kubernetes."
        },
        {
          step: "04",
          label: "Isolated Persistence",
          tech: "PostgreSQL & Prisma RLS",
          desc: "Zero data leakage between corporate tenants via encrypted schema partitioning."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Multi-Tenant Database Partitioning",
        badge: "RLS & SCHEMA SHARDING",
        description:
          "Enterprise data isolation models ensuring customer records cannot cross tenant boundaries under any failure condition.",
        keyPoints: [
          "Row-Level Security (RLS) policies enforced at the PostgreSQL engine level",
          "Automated tenant schema provisioning on new customer registration",
          "Dedicated read replicas for analytical queries preventing production lockups",
          "Encrypted database snapshots backed up automatically every 6 hours"
        ],
        technicalSpec: "PostgreSQL 16 + pgBouncer Connection Pooler + Prisma ORM"
      },
      {
        moduleNum: "02",
        title: "Autonomous Metered Billing & Subscriptions",
        badge: "STRIPE & RAZORPAY",
        description:
          "Full billing automation supporting seat licenses, tiered usage, volume discounts, proration, and multi-currency invoicing.",
        keyPoints: [
          "Idempotent webhook listener handling Stripe and Razorpay events",
          "Automated invoice PDF generation and tax receipt emailing",
          "Credit card failure dunning sequences with grace-period locks",
          "Support for USD, EUR, GBP, AUD, and INR native settlements"
        ],
        technicalSpec: "Stripe Billing API v2024 + Redis Usage Aggregator"
      },
      {
        moduleNum: "03",
        title: "Granular Role-Based Access Control (RBAC)",
        badge: "OIDC & SAML SSO",
        description:
          "Enterprise organizational hierarchy management with custom permissions, audit logging, and single sign-on integration.",
        keyPoints: [
          "Enterprise SAML 2.0 / Okta / Google Workspace identity federation",
          "Owner, Admin, Manager, and Read-Only permission matrices",
          "Immutable security audit trail tracking every configuration change",
          "Emergency token revocation and forced session invalidation"
        ],
        technicalSpec: "OAuth2 / OpenID Connect + JWT Key Rotation"
      },
      {
        moduleNum: "04",
        title: "Real-Time Event Streams & WebSockets",
        badge: "< 10MS REAL-TIME SYNC",
        description:
          "Live collaborative user interfaces with instant notifications, chat, and telemetry synchronization.",
        keyPoints: [
          "Redis Pub/Sub message broker distributing updates across nodes",
          "WebSocket fallback to Server-Sent Events (SSE) for constrained networks",
          "Optimistic UI updates with client-side rollback on network failure",
          "Automatic reconnection backoff algorithms with queue replay"
        ],
        technicalSpec: "Node.js WebSocket Cluster + Redis Pub/Sub"
      },
      {
        moduleNum: "05",
        title: "Automated Microservices Auto-Scaling",
        badge: "KUBERNETES HPA",
        description:
          "Compute pods that scale horizontally from 2 to 200 instances based on CPU, memory, and inbound request saturation.",
        keyPoints: [
          "Kubernetes Horizontal Pod Autoscaling (HPA) with sub-minute triggers",
          "Zero-downtime rolling blue/green updates with health probes",
          "Automated container vulnerability scanning via Snyk in CI/CD",
          "Graceful shutdown hooks draining active requests before termination"
        ],
        technicalSpec: "AWS EKS / GCP Kubernetes + Envoy Proxy"
      },
      {
        moduleNum: "06",
        title: "Super-Admin HUD & Telemetry Dashboard",
        badge: "INTERNAL TOOLS",
        description:
          "Internal operations console giving executive leadership direct visibility into MRR, active users, tenant health, and support impersonation.",
        keyPoints: [
          "Support staff tenant impersonation mode with full security logging",
          "Live ARR, churn, and gross revenue telemetry graphs",
          "Database query latency inspector and slow query logger",
          "Feature-flag toggle console for canary feature rollouts"
        ],
        technicalSpec: "Next.js 15 App Router + TanStack Query + TailwindCSS"
      }
    ],
    techStack: [
      {
        category: "Frontend Application",
        items: ["Next.js 15 (App Router)", "TypeScript", "TailwindCSS", "Zustand", "Radix UI"]
      },
      {
        category: "Backend Services",
        items: ["Node.js / Express", "Go Microservices", "PostgreSQL", "Redis", "Prisma ORM"]
      },
      {
        category: "Cloud & DevOps",
        items: ["Docker", "Kubernetes (EKS)", "Terraform IaC", "GitHub Actions", "Cloudflare WAF"]
      },
      {
        category: "Billing & Integrations",
        items: ["Stripe Subscriptions", "Razorpay", "SendGrid", "Datadog APM", "Sentry"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "Architecture & Multi-Tenant Database Schema",
        duration: "Weeks 1 - 2",
        deliverables: "ER diagrams, schema migrations, Docker local compose, auth API endpoints."
      },
      {
        phase: "Sprint 02",
        title: "Tenant Onboarding & Core Business Logic",
        duration: "Weeks 3 - 4",
        deliverables: "Dynamic subdomain routing, user invitation flows, core platform features."
      },
      {
        phase: "Sprint 03",
        title: "Stripe Billing & Subscription Engines",
        duration: "Weeks 5 - 6",
        deliverables: "Payment gateways, metered usage listeners, invoice generation, customer portal."
      },
      {
        phase: "Sprint 04",
        title: "Super-Admin Console & Security Hardening",
        duration: "Weeks 7 - 8",
        deliverables: "OWASP penetration audit, RBAC permissions, admin telemetry, load testing."
      },
      {
        phase: "Sprint 05",
        title: "Production Deployment & 30-Day Hypercare",
        duration: "Weeks 9 - 10",
        deliverables: "Kubernetes live ingress, DNS cutover, monitoring alerts, repo transfer."
      }
    ],
    handoverArtifacts: [
      {
        title: "Full Production Source Code",
        format: "GitHub / GitLab Org Repo",
        desc: "Strictly typed TypeScript and Go code with 100% IP ownership and zero proprietary lock-in."
      },
      {
        title: "Interactive OpenAPI & Swagger Docs",
        format: "Postman Workspace + Swagger UI",
        desc: "Executable API documentation with mock servers and authentication headers ready for integrations."
      },
      {
        title: "Terraform Infrastructure as Code (IaC)",
        format: ".tf State & Modules",
        desc: "Declarative cloud blueprints allowing one-command environment recreation on AWS or GCP."
      },
      {
        title: "Figma UI/UX Component System",
        format: "Figma Source File",
        desc: "Atomic design tokens, responsive layout frames, and interactive component state variants."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: B2B Multi-Tenant Analytics Platform",
      sector: "B2B SaaS / Infrastructure",
      challenge:
        "Client needed to scale an analytics platform with strict GDPR isolation and real-time query aggregation.",
      solution:
        "Engineered a partitioned PostgreSQL cluster with Redis query caching and Next.js 15 edge dashboards.",
      metrics: [
        { label: "MRR Growth", val: "Strong Trajectory" },
        { label: "Query Latency", val: "18ms" },
        { label: "System Availability", val: "99.9%+" }
      ]
    },
    pricingTiers: [
      {
        name: "SaaS MVP Sprint",
        price: "$4,500 - $7,500",
        period: "4 - 6 Weeks",
        badge: "FOR EARLY STARTUPS",
        description: "Everything needed to launch, validate, and onboard your first 100 paying customers.",
        features: [
          "Complete multi-tenant database architecture",
          "Next.js frontend + Node backend",
          "Stripe subscription billing setup",
          "Role-based authentication & team invites",
          "30-day post-launch warranty"
        ]
      },
      {
        name: "Scale & Growth Pod",
        price: "$8,500 - $14,000",
        period: "6 - 10 Weeks",
        badge: "MOST POPULAR",
        description: "Full-fledged SaaS platform with advanced analytics, custom billing, and automated CI/CD.",
        features: [
          "Microservices architecture with Redis caching",
          "Advanced metered usage & webhook systems",
          "Super-admin governance & user impersonation",
          "Kubernetes auto-scaling deployment",
          "OWASP security audit pass"
        ]
      },
      {
        name: "Enterprise Core Platform",
        price: "$16,000 - $30,000+",
        period: "10 - 16 Weeks",
        badge: "ENTERPRISE GRADE",
        description: "Institutional scale platform supporting SOC2, HIPAA, SAML SSO, and multi-region failover.",
        features: [
          "Custom Go microservices + event streaming",
          "SAML 2.0 / Okta enterprise identity SSO",
          "Terraform multi-cloud infrastructure",
          "99.9%+ contractual uptime SLA",
          "Dedicated senior engineering squad"
        ]
      }
    ],
    faqs: [
      {
        question: "How do you ensure data from different customer organizations never mixes?",
        answer:
          "We implement PostgreSQL Row-Level Security (RLS) combined with organization tenant IDs enforced in every single database query at the middleware level. For enterprise tiers, we support physical schema separation or dedicated database instances."
      },
      {
        question: "Do we own the source code and infrastructure after delivery?",
        answer:
          "Yes, 100%. We transfer the entire Git repository, Docker containers, and Terraform cloud scripts directly to your organization with complete intellectual property assignment and zero vendor lock-in."
      },
      {
        question: "Can you handle complex metered billing models like per-seat or per-API call?",
        answer:
          "Yes. We configure Redis-based high-throughput usage accumulators that stream consumption events directly into Stripe Metered Billing without causing database write bottlenecks."
      }
    ]
  },

  "web-app-development": {
    slug: "web-app-development",
    badge: "CROSS-PLATFORM RUNTIMES // 60 FPS NATIVE PERFORMANCE",
    title: "Web & Mobile App Development &",
    titleHighlight: "Cross-Platform Engineering",
    tagline: "React Native, Flutter, and Next.js Progressive Web Apps Built for Silky Smooth 60 FPS",
    metaDescription:
      "High-performance cross-platform iOS, Android, and web applications engineered with single-codebase efficiency, offline sync, and sub-100ms response times.",
    headerStats: [
      {
        label: "Frame Rate Target",
        value: "60 FPS",
        detail: "Silky Smooth Native Gestures",
        color: "text-cyan-400"
      },
      {
        label: "Store Approval Rate",
        value: "100%",
        detail: "Apple App Store & Google Play",
        color: "text-emerald-400"
      },
      {
        label: "Offline Sync Speed",
        value: "< 80ms",
        detail: "Local SQLite WatermelonDB",
        color: "text-blue-400"
      },
      {
        label: "Total End-Users",
        value: "2.4M+",
        detail: "Across Shipped Mobile Apps",
        color: "text-amber-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Unified Cross-Platform Client Architecture",
      diagramSubtitle: "Single codebase powering iOS, Android, and Web with native hardware access",
      flowSteps: [
        {
          step: "01",
          label: "Single Codebase Core",
          tech: "React Native & Expo",
          desc: "Shared TypeScript business logic, state management, and design components."
        },
        {
          step: "02",
          label: "Native Bridge & Skia",
          tech: "JSI & Fabric Engine",
          desc: "Direct C++ execution bypassing traditional JavaScript bridges for 60 FPS rendering."
        },
        {
          step: "03",
          label: "Offline Storage Engine",
          tech: "SQLite & WatermelonDB",
          desc: "Full local cache allowing uninterrupted usage in airplane mode with auto-sync."
        },
        {
          step: "04",
          label: "Unified Cloud Backend",
          tech: "GraphQL & REST APIs",
          desc: "Encrypted WebSocket synchronization with sub-second cloud database persistence."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "60 FPS Native Gesture & Render Engine",
        badge: "REACT NATIVE & SKIA",
        description:
          "Fluid touch interactions, spring physics, and canvas animations running on the UI thread without dropping frames.",
        keyPoints: [
          "React Native Reanimated 3 running animations on native UI thread",
          "Shopify Skia graphics for custom hardware-accelerated shaders",
          "Optimized image caching and blurhash placeholder rendering",
          "Instant interactive touch response with zero JS thread blocking"
        ],
        technicalSpec: "Expo SDK 51 + React Native 0.74 (New Architecture / Fabric)"
      },
      {
        moduleNum: "02",
        title: "Offline-First Data Synchronization",
        badge: "LOCAL-FIRST PERSISTENCE",
        description:
          "Users can browse, create, and modify data without an active internet connection. Changes sync automatically when connection restores.",
        keyPoints: [
          "Embedded SQLite / WatermelonDB with multi-thousand record index",
          "Conflict-resolution algorithms (CRDT-inspired) for concurrent edits",
          "Background background sync worker with retry backoff",
          "Zero loading spinners when navigating between cached screens"
        ],
        technicalSpec: "WatermelonDB + SQLite Native Driver + TanStack Query"
      },
      {
        moduleNum: "03",
        title: "Native Device Hardware Integration",
        badge: "BIOMETRIC & SENSORS",
        description:
          "Deep integration with native operating system capabilities across Apple iOS and Google Android platforms.",
        keyPoints: [
          "Biometric authentication via FaceID, TouchID, and Android Keystore",
          "Background geofencing and real-time GPS asset tracking",
          "Camera scanning for QR codes, barcodes, and document OCR",
          "Rich push notifications with actionable interactive buttons (APNs/FCM)"
        ],
        technicalSpec: "Expo Native Modules + Apple Push (APNs) + Firebase FCM"
      },
      {
        moduleNum: "04",
        title: "Universal Design System & Token Sync",
        badge: "FIGMA TO CODE",
        description:
          "Single design token repository powering pixel-perfect consistency across mobile screens and responsive web layouts.",
        keyPoints: [
          "Tailwind / NativeWind unified utility classes across mobile and web",
          "Dark mode and light mode automatic operating system detection",
          "Dynamic typography scaling respecting accessibility user settings",
          "Reusable atomic component library with full TypeScript definitions"
        ],
        technicalSpec: "NativeWind v4 + TailwindCSS + Figma Token Pipeline"
      },
      {
        moduleNum: "05",
        title: "Automated App Store & Play Store CI/CD",
        badge: "FASTLANE & EAS",
        description:
          "Automated mobile build pipelines generating production IPAs and APKs and submitting directly to stores.",
        keyPoints: [
          "Fastlane automation executing test suites and screenshot generation",
          "Expo Application Services (EAS) cloud compilation for iOS and Android",
          "Automated TestFlight beta distribution to internal QA testers",
          "100% compliance with Apple App Store Review Guidelines"
        ],
        technicalSpec: "Fastlane + EAS Build + GitHub Actions CI"
      },
      {
        moduleNum: "06",
        title: "Deep Linking & Universal Routing",
        badge: "SMOOTH ONBOARDING",
        description:
          "Web links that open specific mobile screens seamlessly, preserving referral codes and onboarding state.",
        keyPoints: [
          "Apple Universal Links and Android App Links verified domain setup",
          "Deferred deep linking for attributing App Store installs",
          "Unified URL schema matching web platform routes identically",
          "Seamless fallback to web PWA if native app is not installed"
        ],
        technicalSpec: "Expo Router v3 (File-based navigation) + Branch.io"
      }
    ],
    techStack: [
      {
        category: "Mobile Client",
        items: ["React Native", "Expo SDK 51", "Flutter", "TypeScript", "NativeWind"]
      },
      {
        category: "Web & PWA",
        items: ["Next.js 15", "React 19", "TailwindCSS", "Service Workers", "Zustand"]
      },
      {
        category: "Local Persistence",
        items: ["SQLite", "WatermelonDB", "MMKV Storage", "AsyncStorage", "TanStack Query"]
      },
      {
        category: "DevOps & Stores",
        items: ["Fastlane", "EAS Build", "Apple TestFlight", "Google Play Console", "Firebase"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "Interactive Wireframes & Architecture Setup",
        duration: "Weeks 1 - 2",
        deliverables: "Figma interactive mobile prototype, Expo app shell, design tokens."
      },
      {
        phase: "Sprint 02",
        title: "Auth, Biometrics & Core User Navigation",
        duration: "Weeks 3 - 4",
        deliverables: "FaceID login, tab navigation, user profiles, primary screen layouts."
      },
      {
        phase: "Sprint 03",
        title: "Feature Execution & Backend Integration",
        duration: "Weeks 5 - 6",
        deliverables: "API endpoints connected, local SQLite caching, camera/GPS hardware hooks."
      },
      {
        phase: "Sprint 04",
        title: "Push Notifications & Offline Engine",
        duration: "Weeks 7 - 8",
        deliverables: "Firebase FCM / APNs integration, offline sync, performance tuning."
      },
      {
        phase: "Sprint 05",
        title: "Store Submission & Production Launch",
        duration: "Weeks 9 - 10",
        deliverables: "App Store & Play Store approval, TestFlight build, live production release."
      }
    ],
    handoverArtifacts: [
      {
        title: "Cross-Platform Repository",
        format: "Git Repository",
        desc: "Clean React Native / Expo codebase compiling to iOS, Android, and Web."
      },
      {
        title: "Production App Store Builds",
        format: ".ipa & .aab Binaries",
        desc: "Signed production packages ready for immediate deployment on Apple App Store & Google Play."
      },
      {
        title: "App Store Metadata & Graphic Kit",
        format: "App Store Screenshots & Copy Deck",
        desc: "High-resolution device mockups and localized descriptions meeting all submission guidelines."
      },
      {
        title: "CI/CD Deployment Configs",
        format: "Fastlane & EAS Configs",
        desc: "Scripts allowing your team to deploy new app updates with a single command."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: On-Demand Mobility & Driver App",
      sector: "On-Demand Delivery & Mobility",
      challenge:
        "Needed a driver & customer app capable of real-time GPS tracking and instant dispatching under patchy mobile connectivity.",
      solution:
        "Built React Native app with WatermelonDB offline persistence and sub-second WebSocket telemetry updates.",
      metrics: [
        { label: "App Store Compliance", val: "100% Pass" },
        { label: "Crash-Free Rate", val: "99.9%+" },
        { label: "Telemetry Sync", val: "Sub-Second" }
      ]
    },
    pricingTiers: [
      {
        name: "Mobile MVP Sprint",
        price: "$4,800 - $8,000",
        period: "4 - 6 Weeks",
        badge: "FAST TRACK TO STORES",
        description: "Essential cross-platform mobile app deployed to TestFlight and Google Play.",
        features: [
          "Single codebase for iOS and Android",
          "Biometric FaceID / TouchID authentication",
          "Push notifications setup via Firebase",
          "App Store submission support",
          "30-day post-launch hypercare"
        ]
      },
      {
        name: "Full App & Web Ecosystem",
        price: "$9,500 - $16,000",
        period: "6 - 10 Weeks",
        badge: "RECOMMENDED",
        description: "Unified cross-platform app + Next.js web application with offline data sync.",
        features: [
          "iOS, Android and Next.js PWA web app",
          "Offline-first SQLite data synchronization",
          "In-app purchases or Stripe subscription integration",
          "Automated Fastlane build deployment pipelines",
          "Figma design system handover"
        ]
      },
      {
        name: "High-Scale Custom Platform",
        price: "$18,000 - $35,000+",
        period: "10 - 16 Weeks",
        badge: "ENTERPRISE MOBILITY",
        description: "Complex application with custom native hardware modules, WebSockets, and high concurrency.",
        features: [
          "Custom C++ JSI native modules",
          "Real-time background geolocation tracking",
          "Sub-millisecond WebSocket streaming",
          "Dedicated senior mobile engineering squad",
          "Full App Store submission & guidelines compliance"
        ]
      }
    ],
    faqs: [
      {
        question: "Why do you recommend React Native over building two separate native apps?",
        answer:
          "React Native with modern Fabric architecture delivers near-identical 60 FPS performance to native Swift/Kotlin while saving 45% in development costs and allowing instant feature updates across iOS and Android from one codebase."
      },
      {
        question: "Do you assist with Apple App Store and Google Play Store approvals?",
        answer:
          "Yes, unconditionally. We handle certificate signing, privacy manifests, metadata preparation, and work directly through any review feedback until your application is live on both stores."
      },
      {
        question: "Can the app function when users lose internet connectivity?",
        answer:
          "Yes. Our offline-first architecture stores data locally in SQLite, allowing full offline browsing and creation. Once an internet connection is detected, data synchronizes automatically with conflict resolution."
      }
    ]
  },

  "ai-solutions-automation": {
    slug: "ai-solutions-automation",
    badge: "AGENTIC INTELLIGENCE // SECURE VECTOR RAG",
    title: "Autonomous AI Solutions &",
    titleHighlight: "Agentic Workflow Automation",
    tagline: "Custom LLM Integrations, Multi-Agent Swarms, and Private Vector RAG Knowledge Retrieval",
    metaDescription:
      "Enterprise AI engineering: private RAG pipelines, autonomous tool-calling agents, custom model fine-tuning, and automated operational workflows that cut manual hours by 60%+.",
    headerStats: [
      {
        label: "Inference Speed",
        value: "140+ tok/s",
        detail: "Real-Time Streaming Responses",
        color: "text-emerald-400"
      },
      {
        label: "Context Accuracy",
        value: "99.4%",
        detail: "Citation-Based Guardrails",
        color: "text-cyan-400"
      },
      {
        label: "Token Cost Cut",
        value: "-65%",
        detail: "Prompt Caching & Semantic Routing",
        color: "text-blue-400"
      },
      {
        label: "Data Security",
        value: "100% Private",
        detail: "Zero Third-Party Model Training",
        color: "text-amber-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Autonomous Agentic RAG Pipeline",
      diagramSubtitle: "Secure contextual knowledge retrieval and autonomous tool execution",
      flowSteps: [
        {
          step: "01",
          label: "Query & Guardrails",
          tech: "NeMo Guardrails & PII Filter",
          desc: "Sanitizes sensitive inputs, blocks prompt injection attacks, and enforces compliance."
        },
        {
          step: "02",
          label: "Hybrid Semantic Search",
          tech: "Qdrant / Pinecone Vector DB",
          desc: "Dense embedding similarity + sparse keyword matching across company documents."
        },
        {
          step: "03",
          label: "Agentic Multi-Step Reasoning",
          tech: "Claude 3.5 / GPT-4o / DeepSeek",
          desc: "Synthesizes contextual chunks and formulates multi-step autonomous tool calls."
        },
        {
          step: "04",
          label: "Tool Execution & Stream",
          tech: "Python FastAPI Webhooks",
          desc: "Updates databases, triggers external APIs, and streams formatted output to user."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Private Vector RAG Knowledge Base",
        badge: "ZERO DATA LEAKAGE",
        description:
          "Transform thousands of internal PDFs, Notion docs, codebases, and databases into a semantic search engine without training public models.",
        keyPoints: [
          "Hierarchical text chunking algorithms preserving contextual meaning",
          "Hybrid dense/sparse retrieval combining vector similarity with BM25 keywords",
          "Cross-encoder re-ranking ensuring top retrieved chunks are 100% relevant",
          "Isolated self-hosted vector database clusters with encrypted storage"
        ],
        technicalSpec: "Qdrant Vector DB + OpenAI text-embedding-3-large + Cohere Rerank"
      },
      {
        moduleNum: "02",
        title: "Autonomous Tool-Calling Multi-Agent Swarms",
        badge: "LANGGRAPH & CREWAI",
        description:
          "Intelligent software agents that don't just answer questions—they take action across internal APIs, update CRM records, and trigger workflows.",
        keyPoints: [
          "Multi-agent graph topologies coordinating specialized researcher and writer agents",
          "Strict function-calling schema enforcement preventing malformed API requests",
          "Human-in-the-loop verification gates for critical transactions ($100+)",
          "State persistence allowing agents to pause, wait for webhooks, and resume"
        ],
        technicalSpec: "Python 3.12 + LangGraph + FastAPI + Redis State Checkpointer"
      },
      {
        moduleNum: "03",
        title: "Enterprise PII Sanitization & Security Perimeters",
        badge: "SOC2 & HIPAA COMPLIANT",
        description:
          "Automated detection and redaction of customer names, credit card numbers, and medical identifiers before hitting LLMs.",
        keyPoints: [
          "Zero-data-retention enterprise API agreements with OpenAI and Anthropic",
          "Local NER (Named Entity Recognition) models stripping PII prior to egress",
          "Prompt injection attack mitigation and jailbreak circuit breakers",
          "Full query-response audit logging for regulatory compliance"
        ],
        technicalSpec: "Microsoft Presidio PII Engine + NeMo Guardrails"
      },
      {
        moduleNum: "04",
        title: "Multimodal Document Intelligence & OCR",
        badge: "COMPLEX DOCUMENT EXTRACTION",
        description:
          "Extract structured JSON data from messy real-world invoices, scanned legal agreements, financial statements, and receipts.",
        keyPoints: [
          "Multimodal vision models extracting tables with accurate column alignments",
          "Confidence scoring per extracted field with automated review flags",
          "Batch processing queues handling thousands of documents concurrently",
          "Direct webhook sync into QuickBooks, Salesforce, and internal databases"
        ],
        technicalSpec: "GPT-4o Vision + Amazon Textract + Celery Async Queue"
      },
      {
        moduleNum: "05",
        title: "Open-Source Model Fine-Tuning & Self-Hosting",
        badge: "LLAMA 3 & DEEPSEEK",
        description:
          "Deploy private, fine-tuned open-source models inside your own AWS VPC for total data sovereignty and zero per-token cloud costs.",
        keyPoints: [
          "LoRA / QLoRA parameter-efficient fine-tuning on proprietary company data",
          "vLLM high-throughput inference engine with continuous batching",
          "Quantization (FP8 / INT4) reducing GPU memory requirements by 50%",
          "Dedicated GPU instances (AWS EC2 G5 / H100) inside private subnets"
        ],
        technicalSpec: "vLLM Inference Server + HuggingFace TGI + PyTorch"
      },
      {
        moduleNum: "06",
        title: "Sub-300ms Real-Time Token Streaming & Voice Agents",
        badge: "WEBSOCKETS & WEBRTC",
        description:
          "Conversational voice and text assistants with natural interruptions, emotional inflection, and sub-second conversational latency.",
        keyPoints: [
          "WebRTC audio streaming channels for natural bidirectional voice conversations",
          "Deepgram Nova-2 ultra-fast speech-to-text transcription",
          "ElevenLabs / Cartesia expressive voice synthesis with custom brand clones",
          "Turn-taking algorithms handling human interruptions gracefully"
        ],
        technicalSpec: "WebRTC + Deepgram STT + Cartesia Voice + FastAPI"
      }
    ],
    techStack: [
      {
        category: "LLMs & Intelligence",
        items: ["Anthropic Claude 3.5", "OpenAI GPT-4o", "DeepSeek R1", "Llama 3.1 70B", "Mistral"]
      },
      {
        category: "Frameworks & Agents",
        items: ["LangGraph", "CrewAI", "LlamaIndex", "Python 3.12", "FastAPI"]
      },
      {
        category: "Vector Databases",
        items: ["Qdrant", "Pinecone", "pgvector", "ChromaDB", "Redis VSS"]
      },
      {
        category: "Observability & Infra",
        items: ["Langfuse", "vLLM", "Docker", "AWS EC2 GPU", "Celery + Redis"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "Data Audit & Knowledge Ingestion Pipeline",
        duration: "Weeks 1 - 2",
        deliverables: "Document parsing scripts, vector database index, semantic retrieval benchmark."
      },
      {
        phase: "Sprint 02",
        title: "Agent Graph Design & Tool Integrations",
        duration: "Weeks 3 - 4",
        deliverables: "LangGraph agent state machine, tool-calling APIs, PII sanitization filters."
      },
      {
        phase: "Sprint 03",
        title: "Streaming UI & Interactive Testing Cockpit",
        duration: "Weeks 5 - 6",
        deliverables: "Next.js streaming chat interface, user feedback logging, latency optimization."
      },
      {
        phase: "Sprint 04",
        title: "Security Hardening & Token Cost Optimization",
        duration: "Weeks 7 - 8",
        deliverables: "Prompt caching setup, prompt injection testing, Langfuse observability dashboard."
      },
      {
        phase: "Sprint 05",
        title: "Production Release & Staff Enablement",
        duration: "Weeks 9 - 10",
        deliverables: "Live API gateway, team training session, complete codebase transfer."
      }
    ],
    handoverArtifacts: [
      {
        title: "Private AI Agent Codebase",
        format: "Python FastAPI + LangGraph Repo",
        desc: "Modular microservice with full typing, unit tests, and Docker container setup."
      },
      {
        title: "Vector Embedding Pipeline Scripts",
        format: "Automated Ingestion ETL",
        desc: "Automated scripts that update vector embeddings as your internal knowledge base changes."
      },
      {
        title: "Langfuse Telemetry Dashboard",
        format: "Self-Hosted or Cloud Workspace",
        desc: "Complete observability into token costs, user queries, latency bottlenecks, and feedback."
      },
      {
        title: "Security & Guardrails Specification",
        format: "Compliance Deck",
        desc: "Documentation of PII sanitization rules and zero-data-retention model configurations."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Clinical Laboratory Management (LIMS)",
      sector: "HealthTech & MedAI",
      challenge:
        "Doctors were spending 15+ hours/week digging through 500k+ clinical trial PDFs to match patient symptoms to treatment protocols.",
      solution:
        "Engineered private Qdrant RAG pipeline with hybrid search and Claude 3.5 Sonnet context synthesis.",
      metrics: [
        { label: "Query Speed", val: "400% Faster" },
        { label: "Doctor Hours Saved", val: "12 hrs/wk" },
        { label: "Clinical Relevance", val: "99.4%" }
      ]
    },
    pricingTiers: [
      {
        name: "AI Knowledge Agent MVP",
        price: "$4,500 - $7,500",
        period: "4 - 5 Weeks",
        badge: "RAPID AUTOMATION",
        description: "Custom RAG agent trained on company documentation with streaming web UI.",
        features: [
          "Private vector database indexing (Qdrant / Pinecone)",
          "Claude 3.5 or GPT-4o RAG pipeline integration",
          "Next.js streaming chat widget with citation sources",
          "Basic PII sanitization guardrails",
          "30-day post-launch hypercare"
        ]
      },
      {
        name: "Autonomous Multi-Agent Pod",
        price: "$8,500 - $15,000",
        period: "6 - 9 Weeks",
        badge: "MOST POPULAR",
        description: "Multi-agent system that executes external tool calls, updates CRMs, and automates processes.",
        features: [
          "LangGraph multi-agent decision topologies",
          "Direct API tool execution (Salesforce, Stripe, DBs)",
          "Multimodal vision document extraction (PDFs/receipts)",
          "Langfuse token cost & telemetry observability",
          "Comprehensive security audit & jailbreak testing"
        ]
      },
      {
        name: "Private Model Self-Hosted",
        price: "$16,000 - $28,000+",
        period: "10 - 14 Weeks",
        badge: "MAXIMUM PRIVACY",
        description: "Fine-tuned open-source model running on dedicated private cloud GPUs with zero API fees.",
        features: [
          "LoRA fine-tuning on proprietary enterprise dataset",
          "vLLM self-hosted GPU inference engine in your VPC",
          "Zero third-party token consumption costs",
          "Sub-100ms response latency on dedicated hardware",
          "Dedicated senior AI engineering team"
        ]
      }
    ],
    faqs: [
      {
        question: "Is our proprietary data used to train public models like OpenAI or Anthropic?",
        answer:
          "Never. We exclusively use commercial enterprise API agreements with strict Zero-Data-Retention (ZDR) clauses, meaning inputs and outputs are never stored, logged, or used for model training."
      },
      {
        question: "How do you prevent the AI from making up false answers (hallucinations)?",
        answer:
          "We implement strict RAG guardrails: the model is instructed to cite exact paragraph sources from the retrieved context. If the source material does not contain the answer, the agent explicitly states so rather than guessing."
      },
      {
        question: "Can the AI agent take action on our other software systems?",
        answer:
          "Yes. Using structured tool-calling in LangGraph, agents can securely trigger webhooks, query PostgreSQL databases, create tickets in Jira, or generate invoices in Stripe with human-approval verification steps."
      }
    ]
  },

  "seo-digital-growth": {
    slug: "seo-digital-growth",
    badge: "SEARCH ENGINE CONQUEST // TECHNICAL ARCHITECTURE",
    title: "Technical SEO Engineering &",
    titleHighlight: "Programmatic Digital Growth",
    tagline: "Core Web Vitals 95+, Programmatic SEO Generators, and Schema Graph Domination",
    metaDescription:
      "Engineering-led technical SEO and conversion rate optimization designed to dominate Google SERP rankings and generate compounding organic pipeline.",
    headerStats: [
      {
        label: "Lighthouse Score",
        value: "98 / 100",
        detail: "Flawless Core Web Vitals",
        color: "text-amber-400"
      },
      {
        label: "Organic Traffic",
        value: "+380%",
        detail: "Average Client Organic Growth",
        color: "text-emerald-400"
      },
      {
        label: "Largest Contentful Paint",
        value: "< 0.9s",
        detail: "Sub-Second First Screen Load",
        color: "text-cyan-400"
      },
      {
        label: "Cumulative Layout Shift",
        value: "0.00",
        detail: "Zero Layout Shifting",
        color: "text-blue-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Technical SEO & Edge Ingress Architecture",
      diagramSubtitle: "Server-side rendering, instant indexing, and schema graph injection for Googlebot",
      flowSteps: [
        {
          step: "01",
          label: "Bot User-Agent Detection",
          tech: "Cloudflare Edge Worker",
          desc: "Identifies Googlebot and serves pre-rendered HTML snapshots in under 100ms."
        },
        {
          step: "02",
          label: "Server-Side Rendering (SSR)",
          tech: "Next.js App Router",
          desc: "Full HTML content rendered at server runtime with zero client JS hydration dependency."
        },
        {
          step: "03",
          label: "JSON-LD Schema Graph",
          tech: "Schema.org Microdata",
          desc: "Structured data feeds rich snippet cards, FAQs, and author authority directly to SERP."
        },
        {
          step: "04",
          label: "IndexNow Instant Ping",
          tech: "IndexNow & Search API",
          desc: "Real-time notification to Google and Bing whenever new URLs or updates are deployed."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Technical SEO & Core Web Vitals Engineering",
        badge: "LIGHTHOUSE 95+",
        description:
          "Transform slow, heavy web platforms into ultra-fast, lightweight assets that Google's crawler algorithm prioritizes at the top of search rankings.",
        keyPoints: [
          "Sub-1.0s Largest Contentful Paint (LCP) via server-side streaming",
          "Zero Cumulative Layout Shift (CLS = 0.00) using aspect-ratio container reservations",
          "First Input Delay (FID) < 50ms through script deferred loading and tree-shaking",
          "Self-hosted next-gen WebP/AVIF image formats with dynamic edge optimization"
        ],
        technicalSpec: "Next.js 15 SSR + Cloudflare Edge Workers + Font Subsetting"
      },
      {
        moduleNum: "02",
        title: "Programmatic SEO Architecture Engine",
        badge: "THOUSANDS OF UNIQUE URLS",
        description:
          "Generate thousands of unique, high-intent, hyper-targeted landing pages automatically from structured data models.",
        keyPoints: [
          "Dynamic template generation targeting long-tail commercial queries",
          "Unique content synthesis per URL preventing duplicate content penalties",
          "Automated dynamic XML sitemap generation partitioned into 10k-link batches",
          "Automated internal cross-linking mesh maximizing PageRank equity distribution"
        ],
        technicalSpec: "Next.js generateStaticParams + PostgreSQL + Edge Cache"
      },
      {
        moduleNum: "03",
        title: "JSON-LD Rich Snippet Schema Graphs",
        badge: "GOOGLE RICH RESULTS",
        description:
          "Inject structured data graphs that display star ratings, FAQ accordions, software pricing, and breadcrumbs directly in Google search results.",
        keyPoints: [
          "Organization and ProfessionalService schemas establishing brand entity authority",
          "FAQPage and HowTo microdata winning high-visibility SERP real estate",
          "SoftwareApplication schema displaying version, pricing, and operating systems",
          "BreadcrumbList schema ensuring clear navigational hierarchy in snippets"
        ],
        technicalSpec: "JSON-LD Schema.org + Google Rich Results Validation"
      },
      {
        moduleNum: "04",
        title: "High-Intent Keyword Engineering & Strategy",
        badge: "BOTTOM-OF-FUNNEL",
        description:
          "Target keywords that actual buyers type when evaluating solutions, rather than vanity high-volume informational terms.",
        keyPoints: [
          "Competitor keyword gap analysis identifying under-defended commercial terms",
          "Search intent classification mapping queries to transactional landing pages",
          "SERP feature analysis (PPA questions, featured snippets, local packs)",
          "Quarterly content roadmaps engineered for rapid domain authority growth"
        ],
        technicalSpec: "Ahrefs API + Screaming Frog Spider + Google Search Console API"
      },
      {
        moduleNum: "05",
        title: "Conversion Rate Optimization (CRO) & A/B Engine",
        badge: "TURN TRAFFIC INTO ARR",
        description:
          "High organic traffic is worthless without conversion engineering. We optimize user journeys to maximize lead capture.",
        keyPoints: [
          "Heatmap and user session recording analysis revealing drop-off friction",
          "Frictionless multi-step inquiry forms with progressive disclosure",
          "Dynamic social proof counters triggering FOMO and building credibility",
          "Statistical significance A/B testing on headline copy and primary CTAs"
        ],
        technicalSpec: "PostHog Analytics + Google Tag Manager + Custom Telemetry"
      },
      {
        moduleNum: "06",
        title: "Automated Search Console Telemetry & IndexNow",
        badge: "REAL-TIME CRAWL SYNC",
        description:
          "Instant communication with search engine crawlers when new content is deployed, cutting index lag from weeks to minutes.",
        keyPoints: [
          "IndexNow protocol integration pinging Bing and Yandex on every Git deploy",
          "Google Search Console API pipeline tracking daily impression and rank shifts",
          "Automated 404 broken link detection and 301 redirect mapping",
          "Canonical URL enforcement eliminating duplicate parameter indexing"
        ],
        technicalSpec: "IndexNow API + Google Search Console API + Cloudflare Redirects"
      }
    ],
    techStack: [
      {
        category: "Frameworks & Runtimes",
        items: ["Next.js 15 (SSR / SSG)", "TypeScript", "TailwindCSS", "Edge Functions"]
      },
      {
        category: "SEO Tooling & Auditing",
        items: ["Screaming Frog", "Ahrefs Enterprise", "Semrush API", "Google Search Console"]
      },
      {
        category: "Structured Data",
        items: ["Schema.org JSON-LD", "OpenGraph Protocol", "Twitter Card Metadata", "XML Sitemaps"]
      },
      {
        category: "Analytics & CRO",
        items: ["Google Analytics 4", "PostHog", "Cloudflare Web Analytics", "Microsoft Clarity"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "Deep Technical Audit & Core Web Vitals Fixes",
        duration: "Weeks 1 - 2",
        deliverables: "Comprehensive audit report, LCP/CLS fixes, Lighthouse 95+ score pass."
      },
      {
        phase: "Sprint 02",
        title: "Schema Graph Injection & IndexNow Setup",
        duration: "Weeks 3 - 4",
        deliverables: "JSON-LD schema architecture, automated sitemaps, IndexNow deployment."
      },
      {
        phase: "Sprint 03",
        title: "Commercial Keyword Mapping & Page Redesigns",
        duration: "Weeks 5 - 6",
        deliverables: "High-intent keyword matrix, on-page optimization, heading hierarchy refactor."
      },
      {
        phase: "Sprint 04",
        title: "Programmatic Engine & CRO Optimization",
        duration: "Weeks 7 - 8",
        deliverables: "Dynamic programmatic URL templates, conversion form A/B tests."
      },
      {
        phase: "Sprint 05",
        title: "Analytics Integration & Monthly Retainer Handoff",
        duration: "Weeks 9 - 10",
        deliverables: "Search Console tracking dashboards, ranking telemetry, strategy deck."
      }
    ],
    handoverArtifacts: [
      {
        title: "Technical SEO Code Refactor",
        format: "Merged Git PR",
        desc: "All Core Web Vitals optimizations, schema injections, and metadata baked into your repo."
      },
      {
        title: "Comprehensive Keyword & Competitor Matrix",
        format: "Notion / Google Sheets Deck",
        desc: "Curated list of 500+ commercial and long-tail keywords with volume and difficulty scores."
      },
      {
        title: "Programmatic URL Generation Engine",
        format: "Next.js Dynamic Templates",
        desc: "Production code ready to scale landing pages across regions and service verticals."
      },
      {
        title: "Live Ranking & Impression Dashboard",
        format: "Looker Studio Dashboard",
        desc: "Automated executive dashboard tracking organic keyword rankings, CTR, and lead conversions."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: High-Conversion Fintech Web Architecture",
      sector: "FinTech & Cross-Border Billing",
      challenge:
        "Client was burning $35k/month on Google Ads with near-zero organic search presence and slow 3.8s page load times.",
      solution:
        "Re-engineered website to Next.js 15, achieved 99 Lighthouse scores, and built 40 programmatic localized pages.",
      metrics: [
        { label: "Organic Inbound Leads", val: "+380%" },
        { label: "Lighthouse Score", val: "99/100" },
        { label: "Paid Ad Spend Saved", val: "$18k/mo" }
      ]
    },
    pricingTiers: [
      {
        name: "Technical SEO Overhaul",
        price: "$3,500 - $6,000",
        period: "3 - 4 Weeks",
        badge: "ONE-TIME CODE SPRINT",
        description: "Complete technical refactor of your existing web codebase for maximum Core Web Vitals.",
        features: [
          "Sub-1s LCP and zero CLS optimization",
          "Comprehensive JSON-LD schema graph integration",
          "Dynamic sitemap and IndexNow setup",
          "Canonical URL and redirect hierarchy clean-up",
          "Lighthouse 95+ performance guarantee"
        ]
      },
      {
        name: "Growth & Programmatic Engine",
        price: "$6,500 - $11,000",
        period: "6 - 8 Weeks",
        badge: "MOST POPULAR",
        description: "Technical SEO overhaul + programmatic landing page generation for scale.",
        features: [
          "Everything in Technical SEO Overhaul",
          "Programmatic dynamic page generation engine",
          "High-intent commercial keyword strategy deck",
          "Conversion rate optimization (CRO) redesign",
          "Search Console ranking telemetry dashboard"
        ]
      },
      {
        name: "Full SERP Domination Retainer",
        price: "$3,000 / Month",
        period: "Ongoing",
        badge: "COMPOUNDING LEADS",
        description: "Monthly dedicated engineering retainer managing technical SEO, content, and backlinks.",
        features: [
          "Continuous technical audit and broken link fixes",
          "New programmatic page vertical releases monthly",
          "A/B testing on primary lead conversion funnels",
          "Bi-weekly executive ranking and lead reports",
          "Dedicated senior SEO engineer access"
        ]
      }
    ],
    faqs: [
      {
        question: "How is engineering-led technical SEO different from traditional agency SEO?",
        answer:
          "Traditional agencies write generic blog posts without touching your codebase. We are software engineers—we optimize your Next.js server rendering, clean up bloated JavaScript bundles, inject valid JSON-LD schemas, and build programmatic page generators that deliver 10x faster results."
      },
      {
        question: "How quickly do search engines notice the technical improvements?",
        answer:
          "With our IndexNow and Search Console API integrations, search bots re-crawl your updated URLs within 24 to 72 hours. Core Web Vitals score improvements reflect in Google Chrome User Experience (CrUX) reports within 28 days."
      },
      {
        question: "Can programmatic SEO cause duplicate content penalties?",
        answer:
          "Not with our architecture. We feed each programmatic URL with localized unique data attributes, dynamic FAQ accordions, and custom metadata so search engines recognize every page as a high-value, distinct resource."
      }
    ]
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    badge: "DESIGN SYSTEMS // COGNITIVE ERGONOMICS",
    title: "UI/UX Product Design &",
    titleHighlight: "Design System Engineering",
    tagline: "Figma Component Libraries, Micro-Interactions, and Conversion-Engineered Prototypes",
    metaDescription:
      "Enterprise digital product design: scalable Figma design systems, interactive prototypes, dark-mode aesthetics, and conversion-optimized user journeys.",
    headerStats: [
      {
        label: "Usability Score",
        value: "96 / 100",
        detail: "Standard System Usability Scale",
        color: "text-purple-400"
      },
      {
        label: "Conversion Uplift",
        value: "+44%",
        detail: "Average Client Funnel Uplift",
        color: "text-emerald-400"
      },
      {
        label: "Motion Smoothness",
        value: "120 Hz",
        detail: "Fluid Physics-Based Gestures",
        color: "text-cyan-400"
      },
      {
        label: "Component Reuse",
        value: "100%",
        detail: "Atomic Design Token Sync",
        color: "text-amber-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Atomic Design to Production Code Pipeline",
      diagramSubtitle: "Bridging the gap between Figma design tokens and production React components",
      flowSteps: [
        {
          step: "01",
          label: "Research & Journey Mapping",
          tech: "FigJam & User Archetypes",
          desc: "Empathy maps, user problem definitions, and frictionless information architecture."
        },
        {
          step: "02",
          label: "Atomic Token Architecture",
          tech: "Figma Design Tokens",
          desc: "Color variables, typography scales, spacing grids, and border-radius tokens."
        },
        {
          step: "03",
          label: "High-Fidelity Prototyping",
          tech: "Figma Interactive Components",
          desc: "Clickable prototypes simulating exact production animations, gestures, and modals."
        },
        {
          step: "04",
          label: "Developer-Ready Handoff",
          tech: "TailwindCSS & React Specs",
          desc: "Exportable SVG assets, CSS variables, and structured auto-layout frame documentation."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Atomic Design Systems & Design Token Sync",
        badge: "SCALE WITHOUT CHAOS",
        description:
          "Build scalable component libraries where a single change to a color token or border radius updates hundreds of screens automatically.",
        keyPoints: [
          "Tokens organized into Primitive, Semantic, and Component-level variables",
          "Automated export of Figma variables into TailwindCSS config files",
          "Dark mode and light mode color parity with contrast ratios > 4.5:1",
          "Reusable button, input, modal, and table variants with state auto-layout"
        ],
        technicalSpec: "Figma Variables + Tokens Studio + Tailwind Theme Sync"
      },
      {
        moduleNum: "02",
        title: "Clickable High-Fidelity Prototypes",
        badge: "VALIDATE BEFORE CODE",
        description:
          "Testable, interactive prototypes that simulate real software behavior, allowing founders to pitch investors and validate with users before writing code.",
        keyPoints: [
          "Interactive component states (hover, active, focus, disabled, loading)",
          "Realistic form input validations and multi-step onboarding flows",
          "Mobile touch gestures (pull-to-refresh, bottom sheets, swipe-to-delete)",
          "Shareable browser links accessible without a Figma account"
        ],
        technicalSpec: "Figma Smart Animate + Interactive Components"
      },
      {
        moduleNum: "03",
        title: "Cognitive Ergonomics & Conversion Funnels",
        badge: "REDUCE CHURN",
        description:
          "User experience engineered to reduce mental friction, streamline checkouts, and guide user attention effortlessly to conversion goals.",
        keyPoints: [
          "Hick's Law optimization reducing choice overload in decision screens",
          "Fitts's Law positioning of primary call-to-action buttons within thumb zones",
          "Progressive disclosure in forms preventing user intimidation",
          "Clear visual hierarchy using typographic contrast and spatial breathing room"
        ],
        technicalSpec: "Baymard Institute E-Commerce Guidelines + UX Heuristics"
      },
      {
        moduleNum: "04",
        title: "Dark-Mode & Cyber Aesthetic Engineering",
        badge: "MODERN AESTHETICS",
        description:
          "State-of-the-art visual design featuring subtle neon accents, depth gradients, frosted glassmorphism, and cyber reticle indicators.",
        keyPoints: [
          "Multi-layered z-index depth with subtle translucent frosted glass overlays",
          "Harmonious HSL-tuned color palettes avoiding garish neon clashes",
          "Subtle animated glowing border highlights responding to cursor focus",
          "Custom typography pairings (Inter, Outfit, JetBrains Mono) with balanced weights"
        ],
        technicalSpec: "CSS Glassmorphism + Backdrop Filter + HSL Color Tokens"
      },
      {
        moduleNum: "05",
        title: "Micro-Animations & Motion Design",
        badge: "DELIGHT IN DETAILS",
        description:
          "Micro-interactions that make software feel alive, responsive, and tactile without creating distracting visual clutter.",
        keyPoints: [
          "Physics-based spring curves that mimic real-world momentum",
          "Celebratory completion feedback (confetti particles, checkmark morphing)",
          "Subtle skeleton loaders preventing jarring content jump on load",
          "Exportable Lottie and Spline 3D assets ready for developer drop-in"
        ],
        technicalSpec: "Framer Motion Principles + Lottie JSON + Rive Animations"
      },
      {
        moduleNum: "06",
        title: "Pixel-Perfect Developer Handoff",
        badge: "ZERO LOST IN TRANSLATION",
        description:
          "We speak developer. Our design files include exact CSS properties, auto-layout flexbox rules, and asset export folders.",
        keyPoints: [
          "Auto-layout applied across 100% of frames matching CSS flexbox models",
          "Organized SVG icons cleaned with SVGO for smallest file size",
          "Explicit edge-case specifications (empty states, error banners, long text wraps)",
          "Direct Loom video walkthrough explaining every complex animation curve"
        ],
        technicalSpec: "Figma Dev Mode + SVGO Optimized Assets + Loom Specs"
      }
    ],
    techStack: [
      {
        category: "Design Software",
        items: ["Figma Enterprise", "FigJam", "Tokens Studio", "Adobe Creative Cloud"]
      },
      {
        category: "Motion & 3D",
        items: ["Framer Motion", "Spline 3D", "LottieFiles", "Rive"]
      },
      {
        category: "Handoff & Specs",
        items: ["Figma Dev Mode", "TailwindCSS Token Export", "Storybook", "SVGO"]
      },
      {
        category: "Testing & User Research",
        items: ["Maze User Testing", "Hotjar", "UserTesting.com", "Lookback"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "User Research & Wireframing",
        duration: "Weeks 1 - 2",
        deliverables: "User archetypes, journey maps, low-fidelity wireframes, moodboard."
      },
      {
        phase: "Sprint 02",
        title: "Design System & Core Screens",
        duration: "Weeks 3 - 4",
        deliverables: "Color/type tokens, atomic component library, primary user dashboard."
      },
      {
        phase: "Sprint 03",
        title: "Secondary Screens & Edge States",
        duration: "Weeks 5 - 6",
        deliverables: "Settings, billing, profile, empty states, error handling screens."
      },
      {
        phase: "Sprint 04",
        title: "Interactive Prototyping & Motion",
        duration: "Weeks 7 - 8",
        deliverables: "Clickable Figma prototype, micro-interaction motion specs, usability test."
      },
      {
        phase: "Sprint 05",
        title: "Developer Handoff & Token Sync",
        duration: "Weeks 9 - 10",
        deliverables: "Complete Figma file, SVG icon kit, Tailwind config, Loom walkthrough."
      }
    ],
    handoverArtifacts: [
      {
        title: "Master Figma Source Workspace",
        format: ".fig File & Cloud Link",
        desc: "Organized Figma project containing design system, atomic components, and all screen frames."
      },
      {
        title: "Design Tokens & Tailwind Config",
        format: "tailwind.config.js + JSON",
        desc: "Ready-to-use theme file translating your visual tokens directly into your frontend code."
      },
      {
        title: "Interactive Clickable Prototype",
        format: "Shareable Figma URL",
        desc: "Fully functional interactive prototype ready for investor decks and customer discovery calls."
      },
      {
        title: "Clean SVG & Media Asset Kit",
        format: "Zip Folder / SVGO Cleaned",
        desc: "All brand logos, iconography, illustrations, and 3D assets formatted for web."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Consumer Health & Wellness Application",
      sector: "Mobile Health & Consumer Subscriptions",
      challenge:
        "High user bounce rate during onboarding due to cluttered, intimidating setup questionnaires.",
      solution:
        "Redesigned onboarding with progressive disclosure, calming dark aesthetic, and interactive micro-animations.",
      metrics: [
        { label: "Onboarding Completion", val: "+58%" },
        { label: "Store Compliance", val: "100% Pass" },
        { label: "User Experience", val: "Top Rated" }
      ]
    },
    pricingTiers: [
      {
        name: "MVP Product Design Sprint",
        price: "$3,800 - $6,500",
        period: "3 - 4 Weeks",
        badge: "FOR NEW CONCEPTS",
        description: "Complete UI/UX design for a new web or mobile MVP from concept to clickable prototype.",
        features: [
          "Complete wireframes & user journey maps",
          "High-fidelity visual design for 12-18 key screens",
          "Clickable interactive prototype for pitches",
          "Core component library & typography scale",
          "Developer-ready Figma handoff"
        ]
      },
      {
        name: "Comprehensive Design System",
        price: "$7,500 - $12,500",
        period: "5 - 7 Weeks",
        badge: "MOST POPULAR",
        description: "Scalable enterprise design system + complete multi-platform application UI/UX.",
        features: [
          "Atomic design token architecture (Figma + Tailwind)",
          "Light and dark mode variants for all components",
          "Mobile and desktop responsive layouts (30+ screens)",
          "Micro-animation and motion interaction specs",
          "Exportable SVG icon and graphic asset kit"
        ]
      },
      {
        name: "Enterprise Digital Product Suite",
        price: "$14,000 - $24,000+",
        period: "8 - 12 Weeks",
        badge: "ENTERPRISE STANDARD",
        description: "Full-scale UX overhaul of complex multi-role platforms, mobile apps, and marketing websites.",
        features: [
          "User research sessions & usability testing passes",
          "Complete mobile (iOS/Android) + web design systems",
          "Custom 3D Spline and Lottie micro-interactions",
          "Dedicated senior product design lead",
          "Pairing sessions with your internal frontend team"
        ]
      }
    ],
    faqs: [
      {
        question: "How do your designers ensure the designs are feasible for developers to build?",
        answer:
          "Our designers are engineering-aware. We use Figma auto-layout matching CSS flexbox rules and export design tokens directly as Tailwind config variables so developers never have to guess spacing, fonts, or colors."
      },
      {
        question: "Can we use the interactive prototype to pitch investors before writing code?",
        answer:
          "Yes, absolutely. Our high-fidelity prototypes simulate realistic clicks, transitions, and user flows so convincingly that investors and stakeholders can experience the product as if it were already running."
      },
      {
        question: "Do you design for both mobile and desktop screens?",
        answer:
          "Yes. Every key screen is designed with dedicated responsive desktop, tablet, and mobile layouts adhering to strict thumb-friendly mobile ergonomics and expansive desktop dashboard standards."
      }
    ]
  },

  "cloud-devops": {
    slug: "cloud-devops",
    badge: "HIGH-AVAILABILITY CLOUD // ZERO-DOWNTIME SCALE",
    title: "Cloud DevOps & Kubernetes Infrastructure &",
    titleHighlight: "Site Reliability Engineering",
    tagline: "Terraform IaC, Kubernetes (EKS/GKE) Auto-scaling, Blue/Green CI/CD, and 99.9%+ SLA",
    metaDescription:
      "Enterprise Cloud DevOps & SRE: automated Terraform infrastructure, Kubernetes container auto-scaling, zero-downtime CI/CD deployment pipelines, and 24/7 telemetry monitoring.",
    headerStats: [
      {
        label: "Availability SLA",
        value: "99.9%+",
        detail: "Under 5 Mins Downtime/Year",
        color: "text-emerald-400"
      },
      {
        label: "Deployment Speed",
        value: "< 4 Mins",
        detail: "Automated Zero-Downtime Pipeline",
        color: "text-cyan-400"
      },
      {
        label: "Cloud Cost Cut",
        value: "-38%",
        detail: "FinOps Compute Optimization",
        color: "text-blue-400"
      },
      {
        label: "Mean Recovery Time",
        value: "< 60 Sec",
        detail: "Automated Circuit Breaker Rollback",
        color: "text-amber-400"
      }
    ],
    architectureSummary: {
      diagramTitle: "Zero-Trust Cloud DevOps Pipeline",
      diagramSubtitle: "From Git commit to multi-region Kubernetes auto-scaling in under 4 minutes",
      flowSteps: [
        {
          step: "01",
          label: "Git Commit & Test Gate",
          tech: "GitHub Actions CI",
          desc: "Triggers automated unit tests, linting, and Snyk static code security analysis."
        },
        {
          step: "02",
          label: "Container Build & Scan",
          tech: "Docker & AWS ECR",
          desc: "Builds lightweight alpine container images and scans for CVE OS vulnerabilities."
        },
        {
          step: "03",
          label: "Blue/Green Deployment",
          tech: "Kubernetes (EKS / GKE)",
          desc: "Stands up parallel green pods; traffic cuts over only after readiness probes pass 100%."
        },
        {
          step: "04",
          label: "Telemetry & APM Monitor",
          tech: "Datadog & PagerDuty",
          desc: "Real-time error rate tracking; automatic rollback triggered if error rate exceeds 0.5%."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Infrastructure as Code (IaC) with Terraform",
        badge: "REPRODUCIBLE CLOUDS",
        description:
          "Zero manual console clicking. Every VPC, subnet, database, and Kubernetes cluster is declared in version-controlled Terraform code.",
        keyPoints: [
          "Multi-environment parity across Development, Staging, and Production",
          "Automated state locking via AWS S3 and DynamoDB preventing race conditions",
          "Modular Terraform architecture reusable across AWS, GCP, and DigitalOcean",
          "One-command disaster recovery capable of rebuilding the entire infrastructure"
        ],
        technicalSpec: "Terraform v1.8 + AWS Provider v5 + Terragrunt"
      },
      {
        moduleNum: "02",
        title: "Kubernetes Container Orchestration (EKS/GKE)",
        badge: "HORIZONTAL AUTO-SCALING",
        description:
          "Manage containerized applications with self-healing pods, automated load balancers, and resource limits.",
        keyPoints: [
          "Horizontal Pod Autoscaling (HPA) reacting to CPU and custom request metrics",
          "Cluster Autoscaler provisioning new EC2/GCE nodes on traffic spikes",
          "Ingress controllers with automated Let's Encrypt wildcard SSL renewal",
          "Pod disruption budgets guaranteeing service availability during node maintenance"
        ],
        technicalSpec: "Kubernetes v1.30 (AWS EKS / Google GKE) + Helm 3"
      },
      {
        moduleNum: "03",
        title: "Zero-Downtime Blue/Green CI/CD Pipelines",
        badge: "SAFE FAST RELEASES",
        description:
          "Deploy updates to production 10+ times a day without taking down a single user session or dropping packets.",
        keyPoints: [
          "Automated GitHub Actions workflows with build caching under 3 minutes",
          "Canary deployment strategies routing 5% of traffic before full rollout",
          "Automated circuit breaker rollbacks triggered on HTTP 5xx error spikes",
          "Automated PostgreSQL expand-and-contract zero-lock database migrations"
        ],
        technicalSpec: "GitHub Actions + ArgoCD / FluxCD + Datadog Webhooks"
      },
      {
        moduleNum: "04",
        title: "Zero-Trust Cloud Security & Secret Management",
        badge: "ENCRYPTED VAULT",
        description:
          "Lock down infrastructure with isolated VPC perimeters, least-privilege IAM roles, and centralized encrypted secrets.",
        keyPoints: [
          "Zero hardcoded API keys; dynamic runtime fetching via AWS Secrets Manager",
          "Private VPC subnets with NAT gateways isolating databases from public internet",
          "Cloudflare WAF perimeter mitigating DDoS attacks and brute-force attempts",
          "Automated daily Trivy and Snyk container vulnerability vulnerability scans"
        ],
        technicalSpec: "AWS Secrets Manager + HashiCorp Vault + Cloudflare WAF"
      },
      {
        moduleNum: "05",
        title: "24/7 Observability & SRE Telemetry HUD",
        badge: "DATADOG & PROMETHEUS",
        description:
          "Full distributed tracing, log aggregation, and real-time alerts escalating to on-call engineers via Slack and PagerDuty.",
        keyPoints: [
          "Distributed APM request tracing across microservices to isolate latency spikes",
          "Centralized log aggregation with instant search across gigabytes of logs",
          "Real-time Grafana / Datadog dashboards tracking p99 latency and error budgets",
          "Automated on-call escalation schedules with PagerDuty phone alerts"
        ],
        technicalSpec: "Datadog APM + Prometheus + Grafana + PagerDuty"
      },
      {
        moduleNum: "06",
        title: "FinOps Cloud Cost Optimization",
        badge: "SAVE 30-45% ON AWS",
        description:
          "Audit and right-size compute resources, identify zombie instances, and leverage spot markets to slash monthly cloud expenditure.",
        keyPoints: [
          "Spot and Graviton (ARM64) instance migration cutting compute bills by 40%",
          "Database reserved instances and savings plans alignment",
          "S3 intelligent tiering archiving stale media assets to Glacier automatically",
          "Automated non-production environment shutdowns during nights and weekends"
        ],
        technicalSpec: "AWS Cost Explorer + Kubecost + Graviton3 EC2"
      }
    ],
    techStack: [
      {
        category: "Cloud Providers",
        items: ["Amazon Web Services (AWS)", "Google Cloud (GCP)", "Vercel", "DigitalOcean"]
      },
      {
        category: "Containers & IaC",
        items: ["Kubernetes (EKS/GKE)", "Docker", "Terraform", "Helm", "ArgoCD"]
      },
      {
        category: "CI/CD Automation",
        items: ["GitHub Actions", "GitLab CI", "Fastlane", "Snyk SAST"]
      },
      {
        category: "Monitoring & Security",
        items: ["Datadog APM", "Prometheus", "Grafana", "Cloudflare WAF", "AWS KMS"]
      }
    ],
    sprintPhases: [
      {
        phase: "Sprint 01",
        title: "Infrastructure Audit & Terraform Declarations",
        duration: "Weeks 1 - 2",
        deliverables: "VPC architecture, Terraform IaC state, IAM roles, S3 buckets."
      },
      {
        phase: "Sprint 02",
        title: "Dockerization & Kubernetes Cluster Setup",
        duration: "Weeks 3 - 4",
        deliverables: "Multi-stage Dockerfiles, EKS/GKE cluster, Helm charts, ingress controller."
      },
      {
        phase: "Sprint 03",
        title: "CI/CD Pipeline & Automated Test Gating",
        duration: "Weeks 5 - 6",
        deliverables: "GitHub Actions workflows, automated build caching, preview environments."
      },
      {
        phase: "Sprint 04",
        title: "Observability, Telemetry & Security Audit",
        duration: "Weeks 7 - 8",
        deliverables: "Datadog APM tracing, log aggregation, PagerDuty alerting, penetration test."
      },
      {
        phase: "Sprint 05",
        title: "Zero-Downtime Migration & FinOps Review",
        duration: "Weeks 9 - 10",
        deliverables: "Production DNS cutover, database migration, cost optimization report."
      }
    ],
    handoverArtifacts: [
      {
        title: "Complete Terraform Repository",
        format: ".tf Modules & State",
        desc: "Declarative cloud infrastructure code with environments separated by directories."
      },
      {
        title: "Helm Charts & Kubernetes Manifests",
        format: "Helm Templates + values.yaml",
        desc: "Production-ready service, ingress, HPA, and secret manifests."
      },
      {
        title: "GitHub Actions Workflow Pipeline",
        format: ".github/workflows/*.yml",
        desc: "YAML pipelines executing testing, building, scanning, and deploying automatically."
      },
      {
        title: "Site Reliability Runbook",
        format: "Notion / Markdown Runbook",
        desc: "Step-by-step incident response procedures, rollback triggers, and backup restoration guides."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: High-Throughput Cloud Data Infrastructure",
      sector: "FinTech & Transaction Routing",
      challenge:
        "Client experienced intermittent outages during peak transaction hours and was paying $28k/month in unoptimized AWS EC2 instances.",
      solution:
        "Migrated monolith to AWS EKS with Kubernetes HPA, Graviton ARM instances, and Cloudflare edge caching.",
      metrics: [
        { label: "Uptime Across 18 Months", val: "99.9%+" },
        { label: "AWS Bill Reduction", val: "-42%" },
        { label: "Deploy Time", val: "3.5 Mins" }
      ]
    },
    pricingTiers: [
      {
        name: "DevOps & CI/CD Fast-Track",
        price: "$3,800 - $6,500",
        period: "3 - 4 Weeks",
        badge: "STARTUP FOUNDATION",
        description: "Docker containerization and automated zero-downtime GitHub Actions CI/CD pipeline.",
        features: [
          "Multi-stage optimized Docker container setups",
          "Automated GitHub Actions CI/CD to AWS/Vercel",
          "Staging and production environment isolation",
          "Cloudflare WAF & SSL certificate automation",
          "30-day post-launch warranty"
        ]
      },
      {
        name: "Kubernetes & Cloud Migration",
        price: "$7,500 - $14,000",
        period: "5 - 8 Weeks",
        badge: "MOST POPULAR",
        description: "Full Terraform IaC and Kubernetes cluster deployment with horizontal auto-scaling.",
        features: [
          "Terraform infrastructure as code (IaC) repository",
          "AWS EKS or Google Cloud GKE cluster configuration",
          "Horizontal Pod Autoscaling (HPA) triggers",
          "Datadog / Prometheus observability telemetry setup",
          "Zero-downtime database migration"
        ]
      },
      {
        name: "Enterprise 24/7 SRE & Architecture",
        price: "$16,000 - $28,000+",
        period: "8 - 12 Weeks",
        badge: "MISSION CRITICAL",
        description: "Institutional reliability engineering: multi-region failover, SOC2 hardening, and FinOps audit.",
        features: [
          "Multi-region active-active or active-passive failover",
          "HashiCorp Vault enterprise secret management",
          "FinOps compute audit cutting cloud spend by 30%+",
          "Contractual 99.9%+ uptime SLA guarantee",
          "Dedicated senior cloud architect access"
        ]
      }
    ],
    faqs: [
      {
        question: "Can you migrate our live production application without taking any downtime?",
        answer:
          "Yes. We use dual-run architecture and read-replica database streaming. We stand up the new cloud cluster in parallel, verify functionality with shadow traffic, and switch DNS at the edge with zero packet drop."
      },
      {
        question: "How do you achieve 30-40% cloud cost reductions?",
        answer:
          "We audit compute waste: migrating x86 instances to AWS Graviton ARM processors, converting static instances to auto-scaling spot clusters, eliminating unattached EBS volumes, and setting up S3 lifecycle archival."
      },
      {
        question: "What happens if a new code release contains a critical bug?",
        answer:
          "Our automated circuit breakers monitor HTTP 5xx error rates during deployments. If the error threshold exceeds 0.5% within the first 3 minutes, the pipeline automatically halts and rolls back to the previous healthy revision in under 60 seconds."
      }
    ]
  },
  "hospital-healthcare-management": {
    slug: "hospital-healthcare-management",
    badge: "HEALTHCARE PROTOCOL // HL7 FHIR & HIPAA COMPLIANT",
    title: "Hospital & Healthcare",
    titleHighlight: "Management Systems (HMIS)",
    tagline: "Custom HMIS, EHR/EMR, Doctor/Patient Portals, LIS & Telemedicine Suites",
    metaDescription:
      "Enterprise healthcare software suites engineered for multi-specialty hospitals, polyclinics, and diagnostic labs. Featuring automated OPD/IPD flows, digital prescriptions, lab PACS integration, pharmacy inventory, and HIPAA/ABDM-compliant security.",
    headerStats: [
      {
        label: "Compliance Standard",
        value: "HIPAA / ABDM",
        detail: "100% Encrypted PHI & Audit Logs",
        color: "text-emerald-500"
      },
      {
        label: "Patient Ingress Velocity",
        value: "< 15s",
        detail: "Instant QR Check-in & Triage",
        color: "text-sky-600"
      },
      {
        label: "Diagnostic PACS Latency",
        value: "< 120ms",
        detail: "Zero-Loss DICOM Viewer Stream",
        color: "text-blue-600"
      },
      {
        label: "Clinical Records Scale",
        value: "5M+",
        detail: "High-Concurrency FHIR Records",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "Distributed Hospital Microservices & FHIR Core Blueprint",
      diagramSubtitle: "End-to-end clinical workflow connecting OPD/IPD, lab diagnostics, pharmacy, and patient apps",
      flowSteps: [
        {
          step: "01",
          label: "Patient Discovery & Ingress",
          tech: "Next.js 15 PWA & Mobile App",
          desc: "Self-service kiosk QR check-ins, doctor appointment booking, and insurance card OCR scan."
        },
        {
          step: "02",
          label: "Clinical EHR & Triage Engine",
          tech: "HL7 / FHIR API & Redis Queue",
          desc: "Doctor clinical notes, ICD-11 coding, real-time vitals telemetry, and automated drug interaction checks."
        },
        {
          step: "03",
          label: "Diagnostic PACS & LIS Router",
          tech: "DICOM Web & Node Microservices",
          desc: "Automated sample barcode tracking, analyzer machine integration, and zero-footprint web radiology viewer."
        },
        {
          step: "04",
          label: "Pharmacy, Billing & Claims",
          tech: "PostgreSQL & Insurance EDI 837",
          desc: "FEFO batch inventory deduction, cashless TPA insurance claims, and automated discharge summary generation."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "OPD, IPD & OT Clinical Workflow Automation",
        badge: "EMBEDDED CLINICAL WORKFLOWS",
        description:
          "Modular inpatient, outpatient, operation theatre, and ICU management software engineered to eradicate paper dependencies and eliminate patient wait times.",
        keyPoints: [
          "Dynamic bed management and real-time floor occupancy mapping with color-coded status",
          "Automated doctor consultation queues with digital token display screens for waiting lounges",
          "Operation Theatre (OT) scheduling with surgeon, anesthetist, and equipment roster tracking",
          "One-click discharge summary compiler pulling lab reports, clinical notes, and meds automatically"
        ],
        technicalSpec: "Next.js + WebSockets + PostgreSQL Row-Level Security + Redis BullMQ"
      },
      {
        moduleNum: "02",
        title: "HL7 / FHIR Electronic Health Records (EHR) & e-Prescription",
        badge: "INTEROPERABLE CLINICAL DATA",
        description:
          "Standardized digital health records enabling seamless medical record exchange across hospital branches while complying with international health data regulations.",
        keyPoints: [
          "Smart digital prescription generator with automated drug-allergy and contraindication warnings",
          "ABDM Health ID (ABHA) creation and longitudinal medical record linkage",
          "Patient lifetime history timeline with visual lab trend graphs and allergy alerts",
          "Sub-millisecond semantic search across past clinical encounters and diagnosis codes"
        ],
        technicalSpec: "HL7 FHIR v4.0 + SNOMED CT / ICD-11 Ontologies + AES-256 GCM Storage"
      },
      {
        moduleNum: "03",
        title: "Diagnostic Laboratory (LIS) & DICOM Radiology Hub",
        badge: "HARDWARE & ANALYZER INTEGRATION",
        description:
          "Direct bidirectional interfacing with biochemistry, hematology analyzers, and PACS imaging servers with web-based zero-footprint DICOM viewing.",
        keyPoints: [
          "Automated sample tube barcode generation and bidirectional RS232 / TCP-IP machine sync",
          "Cloud-hosted web DICOM viewer supporting multi-planar reconstruction (MPR) and measurements",
          "Pathologist digital signature workflow with automated WhatsApp/SMS PDF report delivery",
          "Critical value alert triggers immediately notifying attending physicians on abnormal findings"
        ],
        technicalSpec: "Cornerstone.js + WebAssembly DICOM Parser + Orthanc PACS Integration"
      },
      {
        moduleNum: "04",
        title: "Pharmacy FEFO Inventory, TPA Cashless Billing & Claims",
        badge: "FINANCIAL & SUPPLY PRECISION",
        description:
          "Institutional pharmaceutical supply chain management combined with automated medical insurance claim submission engines.",
        keyPoints: [
          "First-Expiry-First-Out (FEFO) automated batch dispensing preventing medicine wastage",
          "Integrated POS with barcode scanner support, supplier purchase order workflows, and GST filing",
          "Pre-authorization request generator for TPA/Corporate insurance cashless settlements",
          "Audit-proof split billing supporting multi-mode payments (Cash, Cards, UPI, Insurance)"
        ],
        technicalSpec: "PostgreSQL Serializable Isolation + Automated EDI Claims Dispatcher"
      },
      {
        moduleNum: "05",
        title: "Operation Theatre (OT), ICU Telemetry & Biometric Monitoring",
        badge: "REAL-TIME CRITICAL CARE",
        description:
          "End-to-end surgical workflow tracking, anesthesia records, and real-time bedside biometric IoT monitor telemetry integration.",
        keyPoints: [
          "Multi-specialty OT slot scheduling with surgeon, anesthetist, and equipment roster tracking",
          "High-frequency ICU bed vital signs telemetry with sub-second critical arrhythmia alert dispatch",
          "Pre-operative checklist, intra-op anesthesia recording, and post-op PACU clinical flowsheets",
          "Automated central sterile supply department (CSSD) instrument tray sterilization tracking"
        ],
        technicalSpec: "WebSockets Telemetry Stream + MQTT Broker + TimescaleDB Bed Series"
      },
      {
        moduleNum: "06",
        title: "Telemedicine, Patient WhatsApp Portal & ABDM Compliance",
        badge: "PATIENT ENGAGEMENT & PRIVACY",
        description:
          "Omnichannel patient engagement suite with WebRTC video consults, WhatsApp lab report delivery, and national health registry compliance.",
        keyPoints: [
          "Sub-50ms WebRTC encrypted HD video consultations with doctor whiteboard notes",
          "Native WhatsApp Business Cloud API automated appointment reminders and PDF lab report downloads",
          "Ayushman Bharat Digital Mission (ABDM) Milestone 1, 2, and 3 consent-gated health data exchange",
          "Automated patient feedback, Google Review routing, and post-discharge recovery follow-up bots"
        ],
        technicalSpec: "WebRTC MediaSoup + WhatsApp Cloud API + ABDM FHIR Gateway"
      }
    ],
    techStack: [
      {
        category: "Frontend & Mobile",
        items: ["Next.js 15", "React Native (iOS/Android)", "Cornerstone.js (DICOM)", "TailwindCSS"]
      },
      {
        category: "Backend & Interoperability",
        items: ["Node.js / Go", "HL7 FHIR v4 API", "Orthanc / dcm4chee PACS", "WebSockets Engine"]
      },
      {
        category: "Database & Security",
        items: ["PostgreSQL 16", "Redis Cache", "HIPAA AES-256 Vault", "Role-Based Access (RBAC)"]
      },
      {
        category: "Infrastructure & Compliance",
        items: ["AWS HealthLake / GCP Healthcare", "Docker / K8s", "ABDM M1/M2/M3", "ISO 27001 Hardening"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Hospital Workflow Discovery & HL7 Schema Architecture",
        duration: "Week 1 - 2",
        deliverables: "Departmental interview mapping, bed layout schema, and FHIR data dictionary."
      },
      {
        phase: "Phase 02",
        title: "Core OPD, IPD, Bed Engine & EHR System Build",
        duration: "Week 3 - 6",
        deliverables: "Patient registration, doctor clinical interface, triage, and e-prescription builder."
      },
      {
        phase: "Phase 03",
        title: "LIS Analyzer Interfacing, PACS & Pharmacy Inventory",
        duration: "Week 7 - 9",
        deliverables: "Bidirectional lab machine drivers, web DICOM integration, and pharmacy POS."
      },
      {
        phase: "Phase 04",
        title: "Insurance TPA Billing, Patient Mobile App & Telehealth",
        duration: "Week 10 - 12",
        deliverables: "Cashless claims engine, patient portal, WebRTC video consultation, and WhatsApp alerts."
      },
      {
        phase: "Phase 05",
        title: "Security Hardening, Staff Training & Hospital Go-Live",
        duration: "Week 13 - 14",
        deliverables: "HIPAA audit pack, barcode hardware calibration, on-premise/cloud switchover, and 24/7 hypercare."
      }
    ],
    handoverArtifacts: [
      {
        title: "Complete Enterprise HMIS Repository",
        format: "Git Repo (TypeScript / Go)",
        desc: "100% clean, modular source code for OPD, IPD, LIS, Pharmacy, and Admin cockpits."
      },
      {
        title: "HL7 / FHIR & Analyzer Integration SDK",
        format: "OpenAPI 3.1 & Driver Specs",
        desc: "Standardized integration guides for laboratory diagnostic analyzers and PACS imaging."
      },
      {
        title: "Healthcare Compliance & Security Package",
        format: "PDF / Readiness Dossier",
        desc: "HIPAA-ready security checklist, ABDM alignment dossier, and encrypted backup scripts."
      },
      {
        title: "Staff SOPs & Interactive Training Guides",
        format: "Video + Interactive Walkthroughs",
        desc: "Role-specific training modules for receptionists, nurses, doctors, pharmacists, and billing managers."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Multispecialty Hospital Network (HMIS)",
      sector: "Hospital & Clinical Healthcare Chain",
      challenge:
        "The hospital was losing 45+ minutes per patient admission due to fragmented paper files, disconnected lab printers, and manual pharmacy billing errors that caused ₹18L monthly in expired medicine loss.",
      solution:
        "Engineered a unified cloud HMIS linking 18 departments, automated sample barcode routing to 6 laboratory analyzers, implemented FEFO pharmacy inventory, and launched an instant patient WhatsApp report portal.",
      metrics: [
        { label: "Patient Admission Time", val: "3.5 Mins (92% Faster)" },
        { label: "Expired Stock Loss", val: "Reduced to 0%" },
        { label: "Daily OPD Throughput", val: "+65% Increase" },
        { label: "Insurance Claim Turnaround", val: "Under 4 Hours" }
      ]
    },
    pricingTiers: [
      {
        name: "Clinic & Polyclinic Suite",
        price: "$6,500 - $11,000",
        period: "4 - 6 Weeks",
        badge: "CLINICS & DAYCARE",
        description: "Complete digital solution for outpatient clinic chains, dental centers, and daycare facilities.",
        features: [
          "OPD appointment scheduling & patient queue token management",
          "Digital e-Prescription with patient WhatsApp PDF delivery",
          "Basic Pharmacy POS & diagnostic test billing",
          "Patient mobile web portal for lab report downloads",
          "Cloud deployment with automated daily backups"
        ]
      },
      {
        name: "Full Hospital HMIS & LIS System",
        price: "$14,000 - $26,000",
        period: "8 - 12 Weeks",
        badge: "MOST POPULAR",
        description: "Enterprise hospital management platform for 50-300 bed multi-specialty hospitals.",
        features: [
          "Complete OPD, IPD, Bed Ward, ICU & OT Management",
          "LIS Machine interfacing + Web DICOM radiology viewer",
          "FEFO Pharmacy inventory with barcode batch tracking",
          "TPA Cashless insurance claims & corporate billing engine",
          "Doctor & Patient Native Mobile Apps (iOS & Android)",
          "HIPAA & ABDM Level 1/2 compliance ready"
        ]
      },
      {
        name: "Multi-Location Hospital Chain Enterprise",
        price: "$30,000 - $60,000+",
        period: "12 - 18 Weeks",
        badge: "INSTITUTIONAL GRADE",
        description: "Custom multi-branch hospital network architecture with centralized clinical data lake.",
        features: [
          "Centralized patient EHR across unlimited hospital branches",
          "Advanced Tele-ICU and real-time biometric IoT bed monitoring",
          "Automated insurance EDI 837 claim settlement pipelines",
          "Custom ERP integration for centralized pharmaceutical procurement",
          "Dedicated on-premise or private cloud multi-region deployment",
          "24/7 Priority SRE support with 99.9%+ uptime guarantee"
        ]
      }
    ],
    faqs: [
      {
        question: "Can our existing diagnostic lab analyzers connect directly to this system?",
        answer:
          "Yes. We support ASTM, HL7, and RS-232/TCP-IP bidirectional protocols to connect directly with biochemistry, hematology, and immunology equipment (such as Beckman Coulter, Sysmex, Roche, Mindray) for zero-touch result transmission."
      },
      {
        question: "Is the data compliant with HIPAA and national health guidelines (like ABDM)?",
        answer:
          "Yes. All patient health information (PHI) is encrypted at rest using AES-256 and in transit using TLS 1.3. We enforce strict role-based access controls, immutable audit trails, and automatic session logouts adhering to HIPAA and ABDM M1/M2/M3 standards."
      },
      {
        question: "Can we migrate our existing patient records and history from our legacy software?",
        answer:
          "Yes. Our data engineering team performs automated ETL migration from your legacy SQL/Access database or Excel records, ensuring zero data loss and historical patient continuity."
      }
    ]
  },
  "enterprise-erp-systems": {
    slug: "enterprise-erp-systems",
    badge: "ENTERPRISE CORE // MODULAR ERP & SUPPLY CHAIN",
    title: "Enterprise ERP & Supply Chain",
    titleHighlight: "Management Systems",
    tagline: "Custom Modular ERP, Multi-Warehouse Inventory, Finance & Manufacturing SCM",
    metaDescription:
      "High-performance custom ERP systems engineered for manufacturing plants, wholesale distributors, and global enterprises. Unify multi-location inventory, double-entry accounting, HRMS, and automated procurement with zero per-user license fees.",
    headerStats: [
      {
        label: "Inventory Accuracy",
        value: "Real-Time",
        detail: "RFID & Barcode Sync",
        color: "text-indigo-600"
      },
      {
        label: "Licensing Cost Savings",
        value: "100%",
        detail: "Zero Per-Seat License Fees",
        color: "text-emerald-500"
      },
      {
        label: "Ledger Reconciliation",
        value: "Instant",
        detail: "Real-time Double-Entry Core",
        color: "text-blue-600"
      },
      {
        label: "Multi-Plant Scale",
        value: "Multi-Facility",
        detail: "Centralized Global Cloud Mesh",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "Unified Enterprise ERP Event-Driven Core",
      diagramSubtitle: "End-to-end integration across procurement, shop floor manufacturing, warehouse, and accounting",
      flowSteps: [
        {
          step: "01",
          label: "Procurement & Vendor Portal",
          tech: "Next.js & Vendor Microservices",
          desc: "Automated RFQ bidding, purchase order approvals, and supplier ASN delivery notices."
        },
        {
          step: "02",
          label: "Manufacturing (MRP-II) Core",
          tech: "Go Microservices & Kafka",
          desc: "Multi-level Bill of Materials (BOM), work center capacity routing, and scrap tracking."
        },
        {
          step: "03",
          label: "Multi-Warehouse Mesh",
          tech: "Redis & Barcode Edge Terminals",
          desc: "Bin-level inventory allocation, cross-docking, pick-pack-ship, and carrier dispatch."
        },
        {
          step: "04",
          label: "Financial Ledger & Executive BI",
          tech: "PostgreSQL & ClickHouse OLAP",
          desc: "Automated journal entries, profit center P&L statements, tax filing, and cashflow forecasts."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Multi-Location Inventory & Warehouse Management (WMS)",
        badge: "REAL-TIME LOGISTICS CORE",
        description:
          "Institutional warehouse control supporting multiple plants, zonal bin locations, batch/serial tracking, and real-time stock transfers with zero discrepancies.",
        keyPoints: [
          "Dynamic Bin-Location management with intelligent pick-path route optimization",
          "Automated Low-Stock alerts triggering automated Purchase Requisitions",
          "Barcode & QR handheld scanner support for lightning-fast stock audits and GRN entries",
          "In-transit inventory tracking between distribution centers and retail hubs"
        ],
        technicalSpec: "PostgreSQL 16 Partitioned Tables + Redis Distributed Locks + PWA Offline Mode"
      },
      {
        moduleNum: "02",
        title: "Manufacturing Resource Planning (MRP-II) & Production",
        badge: "FACTORY FLOOR AUTOMATION",
        description:
          "End-to-end shop floor scheduling, multi-level BOM explosion, machine downtime telemetry, and quality inspection gates.",
        keyPoints: [
          "Interactive Gantt-chart production scheduling with machine capacity constraints",
          "Multi-level Bill of Materials (BOM) with automated raw material reserve triggers",
          "Work-in-Progress (WIP) stage tracking from raw staging to finished goods QC",
          "Real-time Overall Equipment Effectiveness (OEE) and scrap rate analysis"
        ],
        technicalSpec: "Go Engine + WebSockets + TimeScaleDB IoT Telemetry"
      },
      {
        moduleNum: "03",
        title: "Automated Double-Entry Accounting & Financial Ledger",
        badge: "FINANCIAL COMPLIANCE CORE",
        description:
          "Robust multi-currency ledger that automatically generates journal entries from purchase orders, sales invoices, and payroll dispatches.",
        keyPoints: [
          "Automated GST/VAT e-Invoicing, e-Way bill generation, and reconciliation",
          "Dynamic multi-entity consolidation with inter-company transaction elimination",
          "Accounts Receivable (AR) & Accounts Payable (AP) automated dunning workflows",
          "Real-time Trial Balance, Profit & Loss (P&L), and Cashflow statement synthesizer"
        ],
        technicalSpec: "PostgreSQL Serializable Transactions + Automated Audit Trail Logging"
      },
      {
        moduleNum: "04",
        title: "HRMS, Biometric Attendance & Multi-Tier Payroll Engine",
        badge: "WORKFORCE ORCHESTRATION",
        description:
          "Complete employee lifecycle management from recruitment and biometric shift attendance to automated tax deductions and salary disbursements.",
        keyPoints: [
          "Direct integration with ZKTeco / Matrix biometric fingerprint and face scanners",
          "Configurable salary structures with automated PF, ESI, TDS, and bonus computations",
          "Employee self-service mobile portal for leave requests, payslips, and tax proofs",
          "Performance appraisal KPIs, expense claim reimbursements, and shift rotas"
        ],
        technicalSpec: "Node.js Microservices + Direct Bank Disbursal API Integration"
      },
      {
        moduleNum: "05",
        title: "Automated Procurement, Vendor RFQ & Purchase Approval Matrix",
        badge: "SUPPLY CHAIN INTEGRATION",
        description:
          "End-to-end procurement digitization from requisition and competitive vendor bidding to 3-way matching and payment authorization.",
        keyPoints: [
          "Automated Purchase Requisition (PR) generation based on MRP-II inventory deficit",
          "Vendor portal for digital quotation submission, price negotiations, and contract terms",
          "Automated 3-Way matching between Purchase Order (PO), Goods Receipt Note (GRN), and Supplier Invoice",
          "Multi-level managerial approval matrix based on department, cost center, and budget thresholds"
        ],
        technicalSpec: "Go Microservices + PDF Quotation Analyzer + Redis Cache"
      },
      {
        moduleNum: "06",
        title: "Executive BI Analytics, Demand Forecasting & Telemetry Cockpit",
        badge: "REAL-TIME INTELLIGENCE",
        description:
          "Single-pane corporate executive dashboards synthesizing operational metrics, cash burn, factory throughput, and predictive stock forecasts.",
        keyPoints: [
          "Interactive multi-plant operational cockpit with sub-second real-time telemetry updates",
          "Machine learning demand forecasting preventing seasonal over-stocking and stock-outs",
          "Custom financial KPI dashboards (Gross Margin, EBITDA, Cash Conversion Cycle)",
          "Automated daily executive summary reports dispatched directly via WhatsApp and Email"
        ],
        technicalSpec: "ClickHouse OLAP + Apache ECharts + Python Predictive Forecasting Pipeline"
      }
    ],
    techStack: [
      {
        category: "Frontend & Dashboards",
        items: ["Next.js 15 App Router", "TailwindCSS", "Tremor / Apache ECharts", "PWA Barcode Scanner"]
      },
      {
        category: "Backend Services",
        items: ["Go (Golang)", "Node.js TypeScript", "Apache Kafka / RabbitMQ", "GraphQL & REST APIs"]
      },
      {
        category: "Databases & OLAP",
        items: ["PostgreSQL 16", "ClickHouse (Big Data Analytics)", "Redis Cluster", "MinIO Object Storage"]
      },
      {
        category: "DevOps & Hardware",
        items: ["Docker / Kubernetes", "Terraform IaC", "Zebra / Honeywell SDK", "Prometheus Telemetry"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Business Process Mapping & Data Architecture Blueprint",
        duration: "Week 1 - 3",
        deliverables: "Departmental workflow audit, chart of accounts, BOM hierarchy, and database schema."
      },
      {
        phase: "Phase 02",
        title: "Core Inventory, WMS & Procurement Module Engineering",
        duration: "Week 4 - 7",
        deliverables: "Multi-warehouse stock engine, barcode scanning mobile UI, and vendor portal."
      },
      {
        phase: "Phase 03",
        title: "Manufacturing MRP-II & Production Floor Controllers",
        duration: "Week 8 - 11",
        deliverables: "BOM engine, work order dispatch, machine tracking, and QC checkpoint gates."
      },
      {
        phase: "Phase 04",
        title: "Financial Ledger, e-Invoicing & HRMS / Payroll Sync",
        duration: "Week 12 - 15",
        deliverables: "Double-entry accounting, automated tax/GST integration, and biometric attendance."
      },
      {
        phase: "Phase 05",
        title: "Legacy Data Migration, Staff Training & Enterprise Deployment",
        duration: "Week 16 - 18",
        deliverables: "Zero-loss data ETL from SAP/Tally/Excel, on-site user testing, and go-live deployment."
      }
    ],
    handoverArtifacts: [
      {
        title: "Full Proprietary ERP Codebase",
        format: "Git Repository (TypeScript / Go)",
        desc: "Complete ownership of source code without recurring seat or developer license fees."
      },
      {
        title: "Hardware & Peripheral Integration Package",
        format: "SDK & Setup Documentation",
        desc: "Drivers and API configurations for barcode scanners, thermal printers, and biometric devices."
      },
      {
        title: "Data Migration Scripts & Data Dictionary",
        format: "SQL / Python ETL Pipelines",
        desc: "Automated scripts used to import legacy inventory, vendor balances, and customer accounts."
      },
      {
        title: "Enterprise SOPs & Role Manuals",
        format: "Interactive Video & PDF Guides",
        desc: "Departmental walkthroughs for warehouse workers, production managers, and finance teams."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Multi-Plant Industrial ERP System",
      sector: "Heavy Machinery & Precision Components",
      challenge:
        "Heavy recurring licensing costs while struggling with delayed stock syncs across plants that caused production bottlenecks.",
      solution:
        "Engineered a tailored modular cloud ERP system with real-time sub-second inventory sync across all plants, automated multi-level BOM explosion, and direct biometric payroll integration.",
      metrics: [
        { label: "License Cost Savings", val: "Significant" },
        { label: "Production Downtime", val: "Reduced by 74%" },
        { label: "Inventory Reconciliation", val: "Real-time (0 Discrepancy)" },
        { label: "Monthly Accounting Close", val: "From 14 Days to 2 Days" }
      ]
    },
    pricingTiers: [
      {
        name: "Core Business ERP (WMS + Finance)",
        price: "$12,000 - $22,000",
        period: "6 - 8 Weeks",
        badge: "DISTRIBUTORS & WHOLESALERS",
        description: "Essential ERP foundation for trading firms, wholesale suppliers, and multi-branch retail networks.",
        features: [
          "Multi-location inventory tracking with barcode scanning support",
          "Automated double-entry accounting with e-Invoicing & GST filing",
          "Purchase orders, supplier RFQs & automated low-stock reordering",
          "Customer CRM, dispatch management & receivables tracking",
          "Executive analytics dashboard with daily P&L reports"
        ]
      },
      {
        name: "Full Manufacturing MRP-II + Supply Chain",
        price: "$24,000 - $45,000",
        period: "10 - 14 Weeks",
        badge: "MOST POPULAR",
        description: "Comprehensive end-to-end ERP suite for manufacturing plants and assembly facilities.",
        features: [
          "Multi-level Bill of Materials (BOM) & shop-floor work order tracking",
          "Machine capacity planning, preventive maintenance & scrap monitoring",
          "Multi-plant warehouse bin allocation & logistics dispatch routing",
          "Full HRMS with biometric attendance and automated payroll disbursals",
          "Supplier vendor portal with automated quotation bidding",
          "Unlimited users with granular Role-Based Access Control (RBAC)"
        ]
      },
      {
        name: "Multi-Enterprise Conglomerate ERP Core",
        price: "$50,000 - $90,000+",
        period: "14 - 20 Weeks",
        badge: "ENTERPRISE SCALE",
        description: "High-scale custom ERP ecosystem for large corporate conglomerates with international multi-currency entities.",
        features: [
          "Multi-company consolidated financial statements with inter-entity reconciliation",
          "Real-time IoT sensor telemetry integration for factory automation",
          "ClickHouse Big Data analytics engine for predictive demand forecasting",
          "Custom legacy SAP / Oracle / Tally database automated migration pipelines",
          "Dedicated on-premise Kubernetes cluster or private multi-region cloud deployment",
          "24/7 dedicated enterprise engineering support with custom SLA guarantees"
        ]
      }
    ],
    faqs: [
      {
        question: "Why should we build a custom ERP instead of paying for SAP, NetSuite, or Odoo?",
        answer:
          "Traditional ERPs charge aggressive per-user monthly licenses that escalate rapidly as your team grows, while forcing you to adapt your business to rigid off-the-shelf software. With Divanex, you own 100% of the source code, pay zero recurring user licenses, and get software engineered precisely around your unique factory and supply chain workflows."
      },
      {
        question: "How long does it take to migrate our historical data from Tally or Excel?",
        answer:
          "Our automated ETL migration pipelines typically migrate years of financial journals, inventory balances, vendor histories, and customer databases within 3 to 7 days, followed by rigorous parallel validation before switching over."
      },
      {
        question: "Can warehouse workers use barcode scanners and mobile devices on the shop floor?",
        answer:
          "Yes. We design mobile-first PWA and native scanner interfaces optimized for rugged Android handheld terminals (Zebra, Honeywell) with full offline caching in case warehouse Wi-Fi drops."
      }
    ]
  },
  "fintech-banking-solutions": {
    slug: "fintech-banking-solutions",
    badge: "FINTECH INFRASTRUCTURE // SUB-50MS LEDGER ENGINE",
    title: "Fintech, Digital Banking &",
    titleHighlight: "Payment Infrastructure",
    tagline: "Core Banking Engines, Neo-Bank Portals, Payment Gateways & Automated KYC/AML",
    metaDescription:
      "Institutional-grade financial technology platforms built with distributed ledger precision, sub-50ms transaction processing, automated KYC/AML pipelines, and multi-rail payment gateway routing.",
    headerStats: [
      {
        label: "Transaction Latency",
        value: "< 45ms",
        detail: "Sub-Second Ingress & Ledger Posting",
        color: "text-emerald-500"
      },
      {
        label: "Security Standard",
        value: "PCI-DSS L1",
        detail: "SOC-2 & Hardware Vault Hardened",
        color: "text-sky-600"
      },
      {
        label: "Ledger Reliability",
        value: "100%",
        detail: "Zero-Drift Double-Entry Accounting",
        color: "text-blue-600"
      },
      {
        label: "Transaction Concurrency",
        value: "High Concurrency",
        detail: "Target Architecture Benchmark (<50ms)",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "High-Throughput Financial Rails & Ledger Mesh",
      diagramSubtitle: "Secure end-to-end payment lifecycle with real-time fraud scoring and ledger immutability",
      flowSteps: [
        {
          step: "01",
          label: "Customer Ingress & Biometric KYC",
          tech: "React Native & OCR / Liveness Engine",
          desc: "National ID verification, facial biometric matching, and automated AML sanctions screening."
        },
        {
          step: "02",
          label: "Payment Gateway & Switch Router",
          tech: "Go Microservices & Kafka",
          desc: "Smart routing across UPI, Cards, Wire (ACH/NEFT/SWIFT), and crypto settlement rails."
        },
        {
          step: "03",
          label: "Real-Time AI Fraud Prevention",
          tech: "Python / Redis Vector Engine",
          desc: "Sub-15ms velocity checks, device fingerprinting, and risk-score authorization."
        },
        {
          step: "04",
          label: "Immutable Financial Ledger",
          tech: "PostgreSQL Serializable Isolation",
          desc: "Double-entry cryptographic ledger guaranteeing debit-credit balance with zero drift."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Immutable Double-Entry Core Banking Ledger",
        badge: "FINANCIAL CORE PRECISION",
        description:
          "Institutional multi-currency ledger engine enforcing mathematical balance across customer accounts, escrow holdings, and settlement clearing accounts.",
        keyPoints: [
          "Strict double-entry bookkeeping guaranteeing zero phantom balances or rounding drift",
          "Sub-50ms transaction execution supporting thousands of concurrent balance updates",
          "Automated end-of-day (EOD) interest calculation, ledger reconciliation, and batch clearing",
          "Cryptographic hash chaining on transaction records ensuring audit immutability"
        ],
        technicalSpec: "Go (Golang) + PostgreSQL 16 Serializable + Redis Redlock"
      },
      {
        moduleNum: "02",
        title: "Automated KYC, AML & Biometric Onboarding Pipeline",
        badge: "REGULATORY COMPLIANCE",
        description:
          "Frictionless user identity verification connecting with government registries, AI face liveness detection, and global sanctions watchlists.",
        keyPoints: [
          "AI document OCR extracting data from Passports, Driving Licenses, National IDs, and PAN/Aadhaar",
          "3D Facial Liveness detection preventing spoofing, deepfakes, and identity fraud",
          "Automated AML screening against OFAC, PEP, and international sanctions databases",
          "Risk-tiered onboarding approval workflows with manual compliance officer review desks"
        ],
        technicalSpec: "Python FastAPI + Onfido/Persona API Integration + OpenCV"
      },
      {
        moduleNum: "03",
        title: "Multi-Rail Payment Gateway Switch & Escrow Engine",
        badge: "PAYMENT RAILS ROUTER",
        description:
          "Intelligent payment orchestration platform dynamically routing transactions through optimal gateway providers to maximize success rates and minimize fees.",
        keyPoints: [
          "Smart routing engine falling back to backup gateways if the primary provider fails",
          "Multi-party split payments and timed escrow release for digital marketplaces",
          "Tokenized card vault compliant with PCI-DSS guidelines (zero plain card data stored)",
          "Instant webhook dispatchers delivering real-time payment status updates to merchant apps"
        ],
        technicalSpec: "Node.js TypeScript + Kafka Event Bus + Stripe / Razorpay / Adyen Integrations"
      },
      {
        moduleNum: "04",
        title: "Lending, Micro-Credit & Automated Loan Servicing Engine",
        badge: "CREDIT & RISK SCORING",
        description:
          "End-to-end loan origination and servicing software with automated credit risk scoring, EMI schedule calculation, and automated collection dunning.",
        keyPoints: [
          "Configurable loan products (Buy-Now-Pay-Later, Peer-to-Peer, SME Working Capital, Mortgages)",
          "Automated bank statement analyzer calculating Debt-to-Income (DTI) ratios and risk scores",
          "Recurring auto-debit collection integration (e-NACH, SEPA, Recurring Card Subscriptions)",
          "Delinquency management and automated late penalty calculator with recovery dispatch workflows"
        ],
        technicalSpec: "Next.js + Go Microservices + Automated e-Mandate Integrations"
      },
      {
        moduleNum: "05",
        title: "Digital Wallet, Peer-to-Peer (P2P) Rails & Escrow Accounts",
        badge: "INSTANT TRANSFERS",
        description:
          "High-throughput digital wallet infrastructure supporting virtual balances, stored value accounts, instant QR code peer payments, and conditional escrow.",
        keyPoints: [
          "Sub-100ms wallet-to-wallet internal transfers with zero ledger reconciliation discrepancies",
          "Dynamic QR code generator for merchant payments with instant WebSockets confirmation",
          "Tiered daily wallet balance and transaction limits with automated KYC-gated upgrades",
          "Multi-currency wallet balances with real-time foreign exchange (FX) conversion rates"
        ],
        technicalSpec: "Go (Golang) + Redis In-Memory Shards + PostgreSQL Ledger"
      },
      {
        moduleNum: "06",
        title: "Real-Time AI Fraud Detection & Transaction Anomaly Engine",
        badge: "THREAT MITIGATION",
        description:
          "Autonomous machine learning risk engine analyzing velocity, device fingerprints, geolocation hops, and spending anomalies to block illicit transactions.",
        keyPoints: [
          "Real-time machine learning inference assessing transaction risk scores in under 15ms",
          "Device fingerprinting detecting root/jailbreak, VPN/proxy spoofing, and emulator environments",
          "Automated challenge triggers (SMS OTP, Biometric MFA) on anomalous transaction spikes",
          "Regulatory suspicious activity report (SAR) generator for financial intelligence units"
        ],
        technicalSpec: "Python / Rust Anomaly Engine + Kafka Stream Processor + Redis Bloom Filters"
      }
    ],
    techStack: [
      {
        category: "Frontend & Mobile Banking",
        items: ["Next.js 15", "React Native (iOS/Android)", "TailwindCSS", "Biometric SDK"]
      },
      {
        category: "Core Backend & Engines",
        items: ["Go (Golang)", "Rust / C++ Microservices", "Node.js TypeScript", "Apache Kafka"]
      },
      {
        category: "Databases & Ledgers",
        items: ["PostgreSQL 16 (Serializable)", "Redis Cluster", "ClickHouse (Analytics)", "AWS KMS Vault"]
      },
      {
        category: "Compliance & Security",
        items: ["PCI-DSS–Aware Payment Architecture Hardening", "SOC 2–Aligned", "mTLS 1.3", "Hardware Security Modules (HSM)"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Regulatory Compliance Audit & Ledger Architecture Design",
        duration: "Week 1 - 2",
        deliverables: "Financial data models, double-entry ledger architecture, and compliance roadmap."
      },
      {
        phase: "Phase 02",
        title: "Core Ledger, Account Vault & Database Engine Build",
        duration: "Week 3 - 6",
        deliverables: "Double-entry ledger engine, transaction state machine, and balance locks."
      },
      {
        phase: "Phase 03",
        title: "Payment Switch Integration & KYC/AML Pipeline",
        duration: "Week 7 - 9",
        deliverables: "Gateway adapters, smart routing switch, OCR document ingestion, and liveness check."
      },
      {
        phase: "Phase 04",
        title: "Mobile Banking Apps & Merchant Portal Development",
        duration: "Week 10 - 12",
        deliverables: "iOS/Android customer banking app, merchant checkout SDK, and admin risk console."
      },
      {
        phase: "Phase 05",
        title: "Penetration Testing, PCI-DSS Hardening & Production Go-Live",
        duration: "Week 13 - 14",
        deliverables: "Third-party VAPT report, encryption key rotation, bank sandbox verification, and go-live."
      }
    ],
    handoverArtifacts: [
      {
        title: "Fintech Core Engine & Ledger Repository",
        format: "Git Repository (Go / TypeScript)",
        desc: "Complete banking microservices, ledger codebase, and gateway orchestration engine."
      },
      {
        title: "Merchant Integration SDKs & OpenAPI Specs",
        format: "JavaScript / Python SDK + OpenAPI 3.1",
        desc: "Developer documentation, sandbox environments, and plug-and-play checkout widgets."
      },
      {
        title: "Security Hardening & VAPT Audit Dossier",
        format: "Security Assessment Report",
        desc: "Penetration test report, threat modeling diagrams, and PCI-DSS–aware workflows verification."
      },
      {
        title: "Disaster Recovery & Key Management Runbooks",
        format: "Operational SOPs",
        desc: "Standard operating procedures for ledger audits, key rotation, and automated failover."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Digital Wallet & Payment Routing Engine",
      sector: "Fintech & Cross-Border Payments",
      challenge:
        "Suffering from payment drop-offs due to unstable single-gateway connections and manual KYC reviews that took 48+ hours per customer onboarding.",
      solution:
        "Engineered an automated payment orchestration switch across multiple banking rails with sub-45ms latency and an instant AI KYC pipeline verifying national IDs in under 30 seconds.",
      metrics: [
        { label: "Transaction Success Rate", val: "99.4% (Up from 95.2%)" },
        { label: "Customer KYC Verification", val: "Sub-Minute Automated" },
        { label: "Payment Routing Engine", val: "Multi-Currency Automated Settlement" },
        { label: "Ledger Discrepancy", val: "0.00% (Zero Drift)" }
      ]
    },
    pricingTiers: [
      {
        name: "Payment Gateway & Checkout Platform",
        price: "$8,500 - $15,000",
        period: "4 - 6 Weeks",
        badge: "MERCHANTS & AGGREGATORS",
        description: "Custom payment switch and checkout orchestrator with multi-gateway failover.",
        features: [
          "Multi-gateway payment routing with automated instant failover",
          "Custom branded checkout modal with tokenized card vault",
          "Automated merchant settlement calculations and fee deductions",
          "Real-time webhook notifications and transaction query APIs",
          "Merchant dashboard with refund management and analytics"
        ]
      },
      {
        name: "Digital Wallet & Neo-Banking Platform",
        price: "$18,000 - $35,000",
        period: "8 - 12 Weeks",
        badge: "MOST POPULAR",
        description: "Full neo-banking suite with double-entry ledger, customer mobile apps, and automated KYC.",
        features: [
          "High-throughput double-entry core ledger engine (25K TPS)",
          "Automated AI KYC/AML verification pipeline with liveness check",
          "Customer iOS & Android mobile banking apps with biometric auth",
          "Peer-to-peer instant transfers, QR payments & bill settlements",
          "PCI-DSS compliant architecture with encrypted data vault",
          "Super-admin risk management and suspicious activity monitoring"
        ]
      },
      {
        name: "Institutional Core Banking & Lending Suite",
        price: "$40,000 - $80,000+",
        period: "12 - 18 Weeks",
        badge: "ENTERPRISE & NBFC",
        description: "Comprehensive financial ecosystem for licensed digital banks, NBFCs, and global lending networks.",
        features: [
          "Complete lending management system with automated credit scoring",
          "e-NACH / recurring auto-debit collection and late fee dunning",
          "Multi-currency cross-border remittance engine with FX rates",
          "Direct core banking integration (ISO 20022 / Open Banking APIs)",
          "Multi-region active-active cloud deployment with 99.9%+ uptime SLA",
          "Dedicated fintech architect and compliance auditing support"
        ]
      }
    ],
    faqs: [
      {
        question: "How do you ensure zero financial drift or double-spending?",
        answer:
          "Our ledger operates on strict double-entry principles inside PostgreSQL serializable isolation transactions with distributed Redis redlocks. Every credit has an equal debit, and balance locks prevent concurrent race conditions under any traffic surge."
      },
      {
        question: "Is the architecture compliant with PCI-DSS and banking security standards?",
        answer:
          "Yes. Sensitive cardholder data is tokenized and stored in isolated HSM vaults. All API communications utilize mTLS 1.3 encryption, and administrative actions are logged in immutable append-only audit trails."
      },
      {
        question: "Can this system integrate with local banking APIs (like UPI, ACH, SEPA, IMPS)?",
        answer:
          "Yes. We have pre-built architectural adapters for major central banking rails, aggregator networks, and open banking protocols worldwide."
      }
    ]
  },
  "custom-crm-automation": {
    slug: "custom-crm-automation",
    badge: "REVENUE ACCELERATION // OMNICHANNEL SALES CRM",
    title: "Custom CRM & Omnichannel",
    titleHighlight: "Sales Automation Engines",
    tagline: "Omnichannel Lead Ingestion, WhatsApp Bots, Cloud Telephony & Pipeline Analytics",
    metaDescription:
      "High-velocity custom CRM software built for enterprise sales teams. Automate lead qualification, call recording, WhatsApp Business workflows, dynamic quotation generation, and field agent location tracking.",
    headerStats: [
      {
        label: "Lead Response Time",
        value: "< 10s",
        detail: "Instant WhatsApp Ingestion Bot",
        color: "text-orange-600"
      },
      {
        label: "Lead Leakage",
        value: "0.0%",
        detail: "Automated Round-Robin Routing",
        color: "text-emerald-500"
      },
      {
        label: "Pipeline Conversion",
        value: "+42%",
        detail: "AI-Powered Deal Scoring",
        color: "text-blue-600"
      },
      {
        label: "Sales Rep Tracking",
        value: "Real-Time",
        detail: "GPS Geofencing & Visit Proof",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "Omnichannel Lead-to-Close Pipeline Mesh",
      diagramSubtitle: "End-to-end sales workflow connecting ad channels, telephony, AI qualification, and invoicing",
      flowSteps: [
        {
          step: "01",
          label: "Omnichannel Lead Capture",
          tech: "Meta / Google Webhooks & API",
          desc: "Instant ingestion from Facebook Ads, Google Ads, website forms, incoming phone calls, and WhatsApp."
        },
        {
          step: "02",
          label: "AI Qualification & Routing",
          tech: "LLM Agent & Redis Queue",
          desc: "Automated lead enrichment, intent classification, and round-robin allocation to top sales reps."
        },
        {
          step: "03",
          label: "Engagement & Cloud Telephony",
          tech: "Twilio / Exotel & WebRTC",
          desc: "Click-to-call dialing, live call recording, audio transcription, and interactive WhatsApp bot chat."
        },
        {
          step: "04",
          label: "Quotation, Invoicing & Won Deal",
          tech: "Next.js PDF Engine & Stripe",
          desc: "One-click proposal generation, digital signature capture, automated payment link, and CRM sync."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Omnichannel Lead Ingestion & Zero-Leakage Routing",
        badge: "INSTANT LEAD CAPTURE",
        description:
          "Capture every prospective lead instantly across 10+ channels with intelligent distribution rules based on rep availability, territory, and deal value.",
        keyPoints: [
          "Zero-latency webhook ingestion from Meta Lead Ads, Google Ads, LinkedIn, and websites",
          "Automated round-robin, weighted, and geographic territory lead assignment rules",
          "Automated duplicate lead detection and activity merging preventing rep disputes",
          "Instant push notifications and SMS alerts to sales reps within 10 seconds of lead capture"
        ],
        technicalSpec: "Node.js Microservices + Redis Pub/Sub + Next.js App Router"
      },
      {
        moduleNum: "02",
        title: "Native WhatsApp Cloud API & Automated Chatbot Workflows",
        badge: "CONVERSATIONAL COMMERCE",
        description:
          "Transform WhatsApp into your primary conversion engine with official Meta Cloud API integration, verified templates, and autonomous conversational bots.",
        keyPoints: [
          "Multi-agent shared WhatsApp inbox with department routing and agent conversation tagging",
          "Autonomous qualification bots gathering budget, requirements, and booking calendar demos",
          "Automated event-triggered message campaigns (abandoned cart, quote follow-ups, renewals)",
          "Rich interactive WhatsApp messages (catalogs, call-to-action buttons, location sharing)"
        ],
        technicalSpec: "Meta WhatsApp Cloud API + OpenAI Function Calling + WebSockets"
      },
      {
        moduleNum: "03",
        title: "Cloud Telephony (CTI), Call Recording & AI Transcription",
        badge: "INTEGRATED COMMUNICATIONS",
        description:
          "Embed full telephony capabilities directly inside the sales rep's browser with click-to-call dialing, audio recording, and automated sentiment transcription.",
        keyPoints: [
          "One-click browser calling via WebRTC without requiring physical desk phones",
          "Automatic call audio recording linked directly to customer deal timeline records",
          "AI speech-to-text transcription extracting action items and customer objections",
          "Manager call listening, whispering, and barging tools for real-time sales coaching"
        ],
        technicalSpec: "Twilio / Exotel CTI API + WebRTC + Whisper AI Transcription"
      },
      {
        moduleNum: "04",
        title: "Dynamic Proposal Generator, Digital Signatures & Commission Engine",
        badge: "REVENUE OPS AUTOMATION",
        description:
          "Empower reps to generate personalized PDF price quotes in 30 seconds with integrated e-signatures, payment links, and automated sales commission tracking.",
        keyPoints: [
          "Dynamic PDF quote generator pulling product catalog SKUs, discounts, and tax rates",
          "Built-in legally binding digital signature pad with tamper-evident audit logs",
          "Real-time alerts when clients open proposal links and review pricing tables",
          "Automated multi-tier sales rep commission calculation based on collected cash receipts"
        ],
        technicalSpec: "React-PDF + Node.js + Stripe/Razorpay Payment Links + Canvas Signatures"
      },
      {
        moduleNum: "05",
        title: "Field Sales Rep Mobile App & Live GPS Attendance Tracking",
        badge: "FIELD FORCE AUTOMATION",
        description:
          "Native mobile application for on-ground sales teams featuring client visit check-ins, offline lead notes, geofenced attendance, and route navigation.",
        keyPoints: [
          "Geofenced client visit punch-in with photo capture and timestamp verification",
          "Offline-first client note logging and card scanning with auto-sync upon connection",
          "Automated daily travel allowance (TA/DA) distance calculation via GPS telemetry",
          "Real-time manager map view displaying field agent live locations and active visit statuses"
        ],
        technicalSpec: "React Native (iOS/Android) + Mapbox SDK + Background Geolocation SQLite Sync"
      },
      {
        moduleNum: "06",
        title: "AI Predictive Pipeline Forecasting & Revenue Intelligence",
        badge: "REVENUE ACCELERATION",
        description:
          "Advanced sales analytics forecasting quarter-end revenue, rep win rates, stage velocity bottlenecks, and automated deal slip warnings.",
        keyPoints: [
          "Machine learning win-probability scoring dynamically updated on every lead touchpoint",
          "Sales funnel velocity analytics identifying stalled deals and stage slippages",
          "Automated manager coaching alerts when high-value enterprise deals show inactivity",
          "Custom multi-dimensional pipeline reports exportable directly to Excel, PDF, and BI tools"
        ],
        technicalSpec: "ClickHouse OLAP + Python ML Risk Model + Next.js Dynamic Chart HUD"
      }
    ],
    techStack: [
      {
        category: "Frontend & Mobile CRM",
        items: ["Next.js 15", "React Native (Field Rep App)", "TailwindCSS", "Framer Motion"]
      },
      {
        category: "Backend & Queues",
        items: ["Node.js TypeScript", "Python FastAPI", "Redis BullMQ", "WebSockets Engine"]
      },
      {
        category: "Telephony & Messaging",
        items: ["Meta WhatsApp Cloud API", "Twilio / Exotel CTI", "SendGrid / AWS SES", "Whisper AI"]
      },
      {
        category: "Database & Storage",
        items: ["PostgreSQL 16", "Amazon S3 (Call Audio)", "Redis Cluster", "ClickHouse (Analytics)"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Sales Pipeline Architecture & Lead Channel Mapping",
        duration: "Week 1 - 2",
        deliverables: "Pipeline stage definitions, custom field schema, and lead routing rulebook."
      },
      {
        phase: "Phase 02",
        title: "Lead Ingestion Engines & Omnichannel WhatsApp Inbox",
        duration: "Week 3 - 5",
        deliverables: "Meta/Google ad webhooks, shared team WhatsApp inbox, and qualification bots."
      },
      {
        phase: "Phase 03",
        title: "Cloud Telephony CTI & Dynamic PDF Quotation Builder",
        duration: "Week 6 - 8",
        deliverables: "Click-to-call dialer, audio recording vault, and PDF proposal generator."
      },
      {
        phase: "Phase 04",
        title: "Field Sales Mobile App & Executive Analytics Dashboard",
        duration: "Week 9 - 10",
        deliverables: "GPS tracking mobile app, deal conversion funnel, and rep leaderboard."
      },
      {
        phase: "Phase 05",
        title: "Security Hardening, Data Import & Sales Team Onboarding",
        duration: "Week 11 - 12",
        deliverables: "Legacy lead data migration, role permissions setup, and team training."
      }
    ],
    handoverArtifacts: [
      {
        title: "Complete Custom CRM Repository",
        format: "Git Repository (TypeScript / Next.js)",
        desc: "Full source code for CRM dashboard, WhatsApp bot engine, and mobile field app."
      },
      {
        title: "Omnichannel Webhook & CTI Connector Specs",
        format: "OpenAPI Documentation",
        desc: "API endpoints and webhook schemas to connect future advertising and marketing channels."
      },
      {
        title: "Sales Automation Runbooks & Video Walkthroughs",
        format: "Interactive Guides",
        desc: "Step-by-step training for sales reps, managers, and system administrators."
      },
      {
        title: "WhatsApp Message Template Portfolio",
        format: "Pre-Approved Meta Templates",
        desc: "High-converting notification and follow-up templates ready for production broadcast."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Luxury Real Estate CRM & Broker Engine",
      sector: "Real Estate & High-Ticket B2B Sales",
      challenge:
        "Losing 35% of ad leads due to delayed follow-ups (averaging 4 hours) and inability to track whether field sales agents actually completed on-site client villa visits.",
      solution:
        "Built a custom omnichannel CRM with 10-second automated WhatsApp lead qualification, integrated cloud telephony recording, and a GPS-geofenced mobile app for site visits.",
      metrics: [
        { label: "Lead Contact Velocity", val: "Under 15 Seconds" },
        { label: "Deal Closing Rate", val: "+38% Increase" },
        { label: "Uncontacted Lead Rate", val: "Dropped to 0%" },
        { label: "Field Visit Verification", val: "100% GPS Validated" }
      ]
    },
    pricingTiers: [
      {
        name: "Sales Pipeline & Lead Engine",
        price: "$5,500 - $9,500",
        period: "3 - 5 Weeks",
        badge: "GROWTH TEAMS",
        description: "Core sales CRM with automated ad lead ingestion and pipeline stage management.",
        features: [
          "Omnichannel lead ingestion from Meta Ads, Google Ads & web forms",
          "Automated round-robin lead allocation and email notifications",
          "Custom pipeline deal stages with drag-and-drop Kanban view",
          "Activity timeline tracking (notes, tasks, follow-up reminders)",
          "Executive sales conversion dashboard and rep activity metrics"
        ]
      },
      {
        name: "Omnichannel WhatsApp & Telephony CRM",
        price: "$12,000 - $22,000",
        period: "6 - 9 Weeks",
        badge: "MOST POPULAR",
        description: "Full-scale sales automation machine with integrated WhatsApp bots and cloud calling.",
        features: [
          "Official Meta WhatsApp Cloud API shared inbox & multi-agent support",
          "Autonomous AI WhatsApp qualification and demo scheduling bots",
          "Cloud telephony integration with click-to-call and audio recording",
          "Dynamic PDF quotation and proposal builder with payment links",
          "Field sales mobile app with GPS visit geofencing and offline notes",
          "Automated sales rep commission calculator"
        ]
      },
      {
        name: "Enterprise Multi-Branch Sales Engine",
        price: "$26,000 - $48,000+",
        period: "10 - 14 Weeks",
        badge: "LARGE SALES FORCES",
        description: "Custom enterprise CRM architecture for organizations with 100+ sales representatives.",
        features: [
          "AI-driven speech-to-text call transcription & objection sentiment analysis",
          "Predictive AI deal closing probability scoring and churn risk warnings",
          "Multi-branch hierarchical role-based access controls and territory segmentation",
          "Automated ERP inventory sync to check real-time stock availability during quoting",
          "Dedicated high-concurrency database cluster with 99.99% uptime guarantee",
          "Custom onboarding hypercare and continuous dedicated engineering support"
        ]
      }
    ],
    faqs: [
      {
        question: "Can we use our existing WhatsApp Business numbers with this system?",
        answer:
          "Yes. We migrate your phone numbers directly to the official Meta WhatsApp Cloud API, allowing multiple team members to chat simultaneously from the same verified number without phone disconnections."
      },
      {
        question: "How does the GPS field sales tracking work?",
        answer:
          "The mobile application uses background geofencing to log when a sales representative arrives at and departs from a customer's location, allowing them to attach photos and meeting notes that are cryptographically verified."
      },
      {
        question: "Is there any monthly per-user fee like Salesforce or HubSpot?",
        answer:
          "No. You own the entire software and source code. You only pay for your own underlying cloud infrastructure (e.g., AWS server costs) and per-minute telephony/WhatsApp API usage without any per-seat license taxes."
      }
    ]
  },
  "ecommerce-marketplace-platforms": {
    slug: "ecommerce-marketplace-platforms",
    badge: "GLOBAL COMMERCE // MULTI-VENDOR MARKETPLACE",
    title: "Multi-Vendor Marketplace &",
    titleHighlight: "Enterprise E-Commerce Platforms",
    tagline: "B2B/B2C Marketplaces, Automated Vendor Payouts, Multi-Warehouse & Sub-30ms Search",
    metaDescription:
      "Enterprise-grade e-commerce ecosystems engineered to handle millions of SKUs, sub-second search indexing, automated vendor commissions, split payments, and multi-warehouse fulfillment.",
    headerStats: [
      {
        label: "Search Ingestion Speed",
        value: "< 25ms",
        detail: "Faceted Sub-Second Vector Search",
        color: "text-purple-600"
      },
      {
        label: "Checkout Conversion",
        value: "99.8%",
        detail: "1-Click Optimized Payment Funnel",
        color: "text-emerald-500"
      },
      {
        label: "SKU Capacity",
        value: "2,000,000+",
        detail: "Distributed Elasticsearch Catalog",
        color: "text-blue-600"
      },
      {
        label: "Vendor Payouts",
        value: "Automated",
        detail: "Instant Split-Escrow Settlement",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "Distributed Multi-Vendor Marketplace Architecture",
      diagramSubtitle: "High-scale e-commerce lifecycle from catalog indexing to automated seller escrow payouts",
      flowSteps: [
        {
          step: "01",
          label: "Storefront & Edge Ingress",
          tech: "Next.js 15 SSR / Edge Cache",
          desc: "Lightning-fast static product pages, dynamic pricing personalization, and sub-50ms page loads."
        },
        {
          step: "02",
          label: "Sub-30ms Search & Catalog Core",
          tech: "Elasticsearch & Redis Cache",
          desc: "Faceted filters, typo-tolerant search queries, and real-time inventory availability indicators."
        },
        {
          step: "03",
          label: "1-Click Checkout & Split Escrow",
          tech: "Stripe Connect / Razorpay Route",
          desc: "Single customer payment automatically split between marketplace platform fee and merchant payouts."
        },
        {
          step: "04",
          label: "Vendor Portal & Multi-Warehouse WMS",
          tech: "Go Microservices & Carrier APIs",
          desc: "Merchant order fulfillment, automated shipping label generation (FedEx/DHL/Shiprocket), and tracking."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Multi-Vendor Merchant Portal & Catalog Ingestion",
        badge: "SELLER ECOSYSTEM",
        description:
          "Independent seller portals enabling thousands of merchants to manage product listings, bulk CSV inventory uploads, discount promotions, and order dispatches.",
        keyPoints: [
          "Automated catalog validation and product approval moderation queues for marketplace admins",
          "Bulk Excel/CSV product upload parser processing 10,000+ items with variant images in seconds",
          "Merchant analytics dashboard tracking gross merchandise value (GMV), return rates, and reviews",
          "Granular seller permissions and staff access for multi-brand corporate sellers"
        ],
        technicalSpec: "Next.js + PostgreSQL RLS + Cloudinary / S3 Image Pipeline"
      },
      {
        moduleNum: "02",
        title: "Automated Split-Payment Escrow & Vendor Commission Settlement",
        badge: "FINANCIAL ORCHESTRATION",
        description:
          "Sophisticated payment processing that collects a unified customer checkout amount and automatically disburses earnings to multiple vendors while retaining platform commissions.",
        keyPoints: [
          "Automatic fee deduction based on category commission rates (e.g., 8% electronics, 15% fashion)",
          "Timed escrow release holding vendor payouts until return/warranty windows expire (e.g., 7 days)",
          "Automated KYC verification and direct bank account onboarding for new sellers",
          "Automated tax withholding (TDS/TCS/GST) and seller monthly payout tax invoices"
        ],
        technicalSpec: "Stripe Connect Custom / Razorpay Route + Automated Ledger Engine"
      },
      {
        moduleNum: "03",
        title: "Sub-30ms Faceted Search Engine & AI Recommendations",
        badge: "CONVERSION ACCELERATION",
        description:
          "Blazing fast product discovery engine capable of searching through millions of items with instant multi-attribute filters and personalized recommendations.",
        keyPoints: [
          "Instant faceted filtering by brand, price, color, size, rating, and shipping speed",
          "Typo-tolerant fuzzy searching with synonym matching and auto-suggestions",
          "AI-driven 'Frequently Bought Together' and personalized product carousel engines",
          "Real-time inventory synchronization preventing out-of-stock items from displaying"
        ],
        technicalSpec: "Elasticsearch / Meilisearch Cluster + Vector Search Similarity"
      },
      {
        moduleNum: "04",
        title: "Multi-Carrier Shipping Integration & Multi-Warehouse Routing",
        badge: "LOGISTICS FULFILLMENT",
        description:
          "Automated logistics management connecting directly with global shipping carriers for real-time rates, one-click shipping label generation, and automated live tracking.",
        keyPoints: [
          "Intelligent order splitting when a cart contains products from different vendor warehouses",
          "Direct API integration with FedEx, DHL, UPS, BlueDart, Delhivery, and Shiprocket",
          "Automated generation of thermal shipping labels and barcode pick lists",
          "Real-time customer delivery tracking page with automated WhatsApp/SMS transit milestones"
        ],
        technicalSpec: "Node.js Logistics Microservices + Carrier Webhook Ingestion"
      },
      {
        moduleNum: "05",
        title: "B2B Wholesale Portal, Tiered Pricing & RFQ Negotiations",
        badge: "B2B WHOLESALE COMMERCE",
        description:
          "Enterprise B2B wholesale capabilities supporting dynamic volume tiers, custom quote bidding, credit limits, and purchase order financing.",
        keyPoints: [
          "Automated tiered volume pricing and minimum order quantity (MOQ) rules",
          "Digital Request for Quote (RFQ) engine with two-way buyer-supplier price bargaining",
          "Post-paid credit limit management with Net 30/60 day automated invoicing and interest",
          "Company master account support with multiple buyer seat roles and purchase approvals"
        ],
        technicalSpec: "Next.js 15 + PostgreSQL Complex Pricing Rules + PDF Invoice Generator"
      },
      {
        moduleNum: "06",
        title: "High-Conversion Mobile Apps (iOS & Android) & PWA Offline Sync",
        badge: "MOBILE COMMERCE CORE",
        description:
          "Ultra-fast native mobile shopping applications with biometrics, instant Apple/Google Pay, push notification flash sales, and cart recovery.",
        keyPoints: [
          "Cross-platform React Native codebase delivering silky smooth 60fps animations",
          "Native push notification engine for segmented flash discounts and personalized price drops",
          "1-Touch biometric checkout with native Apple Pay, Google Pay, and UPI Intent integrations",
          "Offline product browsing and optimistic wishlist caching with background sync"
        ],
        technicalSpec: "React Native + OneSignal Push Notifications + Redux Toolkit Offline Sync"
      }
    ],
    techStack: [
      {
        category: "Storefront & Seller Apps",
        items: ["Next.js 15 App Router", "React Native (iOS/Android)", "TailwindCSS", "Zustand"]
      },
      {
        category: "Search & Catalog",
        items: ["Elasticsearch / Meilisearch", "Redis Cluster", "Go Microservices", "GraphQL API"]
      },
      {
        category: "Payments & Escrow",
        items: ["Stripe Connect", "Razorpay Route", "PostgreSQL 16", "Automated Webhook Engines"]
      },
      {
        category: "Cloud & Scaling",
        items: ["AWS CloudFront Edge", "Docker / Kubernetes", "MinIO / S3 Assets", "Cloudflare WAF"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Marketplace Data Schema & Vendor Commission Architecture",
        duration: "Week 1 - 2",
        deliverables: "Multi-vendor database schema, category taxonomy, and payout logic blueprint."
      },
      {
        phase: "Phase 02",
        title: "High-Speed Storefront & Elasticsearch Catalog Engine",
        duration: "Week 3 - 6",
        deliverables: "Next.js storefront, faceted search engine, product detail pages, and cart."
      },
      {
        phase: "Phase 03",
        title: "Split-Payment Escrow & Vendor Management Portals",
        duration: "Week 7 - 9",
        deliverables: "Stripe/Razorpay split checkout, merchant portal, and inventory management."
      },
      {
        phase: "Phase 04",
        title: "Logistics Carrier Integration & Mobile Shopping Apps",
        duration: "Week 10 - 12",
        deliverables: "Shipping API label generation, live tracking, and iOS/Android shopping apps."
      },
      {
        phase: "Phase 05",
        title: "Load Testing (100K Concurrent Users) & Go-Live Launch",
        duration: "Week 13 - 14",
        deliverables: "Stress testing, CDN caching configuration, and production marketplace launch."
      }
    ],
    handoverArtifacts: [
      {
        title: "Complete Marketplace Multi-Repository Suite",
        format: "Git Repository (TypeScript / Go)",
        desc: "Storefront, seller portal, admin super-dashboard, and mobile application source code."
      },
      {
        title: "Carrier Logistics & Split-Payment Connector Kit",
        format: "API Handbooks & Webhooks",
        desc: "Integration documentation for shipping carriers and automated seller payout rails."
      },
      {
        title: "Elasticsearch Indexing & Taxonomy Scripts",
        format: "Config Files & Data Pipelines",
        desc: "Automated search index templates, synonym dictionaries, and ranking configurations."
      },
      {
        title: "Merchant Onboarding SOPs & Terms of Service",
        format: "Documentation & Legal Templates",
        desc: "Standard operating procedures for onboarding vendors and managing dispute resolutions."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Multi-Vendor Marketplace with Escrow Payouts",
      sector: "E-Commerce & Artisan Retail",
      challenge:
        "Struggling with slow Magento page speeds (4.2 seconds), manual calculation of seller commissions that took 10 business days every month, and cart abandonment rates exceeding 78%.",
      solution:
        "Engineered a high-performance Next.js 15 marketplace with sub-30ms Elasticsearch search, automated Stripe split payments with timed escrow, and 1-click checkout.",
      metrics: [
        { label: "Page Load Latency", val: "0.45s (9x Faster)" },
        { label: "Checkout Conversion", val: "+56% Increase" },
        { label: "Seller Commission Payout", val: "100% Automated" },
        { label: "Monthly Gross Merchandise", val: "$3.8M GMV" }
      ]
    },
    pricingTiers: [
      {
        name: "Enterprise D2C Brand Storefront",
        price: "$7,500 - $14,000",
        period: "4 - 6 Weeks",
        badge: "D2C BRANDS",
        description: "High-performance headless e-commerce store with 1-click checkout and sub-second page loads.",
        features: [
          "Next.js 15 SSR storefront with sub-second page transitions",
          "Advanced product catalog with unlimited variants and swatches",
          "Stripe / Razorpay / Apple Pay / Google Pay integrated checkout",
          "Automated shipping rate calculation and carrier tracking updates",
          "Marketing coupon codes, bundled discounts, and cart abandonment emails"
        ]
      },
      {
        name: "Full Multi-Vendor Marketplace Platform",
        price: "$18,000 - $32,000",
        period: "8 - 12 Weeks",
        badge: "MOST POPULAR",
        description: "Complete multi-seller marketplace with dedicated merchant portals and automated split escrow.",
        features: [
          "Independent vendor portals with bulk product CSV upload tools",
          "Automated split-payment checkout with category commission deduction",
          "Sub-30ms Elasticsearch faceted catalog and instant search",
          "Multi-carrier shipping label generation (FedEx / DHL / Shiprocket)",
          "Customer & Vendor Native Mobile Apps (iOS & Android)",
          "Super-admin moderation queue, dispute resolution & revenue analytics"
        ]
      },
      {
        name: "High-Scale B2B Wholesale & Global Marketplace",
        price: "$38,000 - $70,000+",
        period: "12 - 18 Weeks",
        badge: "GLOBAL ENTERPRISE",
        description: "Custom enterprise commerce ecosystem supporting B2B wholesale pricing, RFQs, and multi-currency international sales.",
        features: [
          "B2B wholesale tier pricing, minimum order quantities (MOQ), and credit terms",
          "Custom Request for Quotation (RFQ) and price negotiation bidding system",
          "Multi-currency pricing and automatic localization with global tax engines",
          "Multi-warehouse logistics routing optimization for lowest freight cost",
          "High-concurrency cluster engineered to handle flash sales (100K+ concurrent users)",
          "Dedicated e-commerce solutions architect with 24/7 priority SLA support"
        ]
      }
    ],
    faqs: [
      {
        question: "How do vendor payouts and split payments work when a customer buys from multiple sellers?",
        answer:
          "The customer makes a single combined payment at checkout. The system automatically calculates each vendor's earnings minus your platform commission, holds the funds in escrow, and deposits the exact amounts into each vendor's bank account once the return window closes."
      },
      {
        question: "Can the marketplace handle sudden traffic spikes during flash sales?",
        answer:
          "Yes. Our edge-cached Next.js frontend combined with autoscaling Kubernetes container clusters and read-replica databases is engineered to absorb traffic spikes of 100,000+ simultaneous shoppers without slowdown."
      },
      {
        question: "Can we support both B2C retail buyers and B2B wholesale bulk buyers on the same platform?",
        answer:
          "Yes. We implement account-tier authorization where approved B2B accounts see custom tiered volume pricing, invoice payment terms, and custom MOQs, while standard B2C customers see normal retail pricing."
      }
    ]
  },
  "edtech-learning-management": {
    slug: "edtech-learning-management",
    badge: "EDTECH INFRASTRUCTURE // HIGH-CONCURRENCY LMS",
    title: "EdTech, School ERP &",
    titleHighlight: "Learning Management Systems (LMS)",
    tagline: "Student Information Systems, WebRTC Live Classrooms, AI Proctoring & Fee Automation",
    metaDescription:
      "Comprehensive educational management platforms built for universities, K-12 school networks, coaching institutes, and global course creators. Streamline admissions, fees, live streams, and automated AI grading.",
    headerStats: [
      {
        label: "Live Stream Latency",
        value: "< 250ms",
        detail: "Interactive WebRTC Video Core",
        color: "text-cyan-600"
      },
      {
        label: "Fee Collection Rate",
        value: "99.4%",
        detail: "Automated SMS/WhatsApp Billing",
        color: "text-emerald-500"
      },
      {
        label: "Student Capacity",
        value: "500,000+",
        detail: "Multi-Tenant School Hierarchy",
        color: "text-blue-600"
      },
      {
        label: "Proctoring Accuracy",
        value: "99.2%",
        detail: "AI Multi-Face & Tab Monitoring",
        color: "text-amber-600"
      }
    ],
    architectureSummary: {
      diagramTitle: "Distributed EdTech Learning & SIS Mesh",
      diagramSubtitle: "End-to-end academic lifecycle from online admission to live classrooms and automated degree generation",
      flowSteps: [
        {
          step: "01",
          label: "Admissions & Student Onboarding",
          tech: "Next.js 15 & Payment Gateways",
          desc: "Online prospectus, digital document submission, automated eligibility verification, and entrance fee checkout."
        },
        {
          step: "02",
          label: "Live Virtual Classroom Core",
          tech: "WebRTC SFU & LiveKit / Agora",
          desc: "Sub-250ms interactive video streaming, multi-user whiteboard, polls, and breakout discussion rooms."
        },
        {
          step: "03",
          label: "LMS Course Engine & AI Grading",
          tech: "Node.js & Python AI Pipeline",
          desc: "Video DRM playback, interactive quizzes, automated code/essay grading, and gamified progress leaderboards."
        },
        {
          step: "04",
          label: "Fee Billing, SIS & Parent App",
          tech: "PostgreSQL & Push Notifications",
          desc: "Installment billing schedules, biometric attendance sync, school bus GPS tracking, and report cards."
        }
      ]
    },
    engineeringModules: [
      {
        moduleNum: "01",
        title: "Comprehensive Student Information System (SIS) & School ERP",
        badge: "ACADEMIC OPERATIONS",
        description:
          "Centralized school and university administration software unifying student admissions, timetable scheduling, faculty assignments, and grading management.",
        keyPoints: [
          "Multi-branch academic hierarchy supporting schools, colleges, departments, and sections",
          "Automated timetable generator resolving teacher availability and classroom capacity clashes",
          "Dynamic student grading engine supporting GPA, CGPA, percentage, and custom credit systems",
          "One-click report card and official transcript generator with digital verification QR codes"
        ],
        technicalSpec: "Next.js + PostgreSQL Partitioned Tables + PDF Generation Engine"
      },
      {
        moduleNum: "02",
        title: "Ultra-Low Latency Live Classrooms & DRM Video LMS",
        badge: "INTERACTIVE CLASSROOMS",
        description:
          "Interactive virtual learning environment with sub-second video streaming, shared interactive whiteboard, encrypted video playback, and attendance logs.",
        keyPoints: [
          "Sub-250ms interactive WebRTC video streaming supporting 1,000+ simultaneous students per class",
          "Collaborative digital whiteboard with geometry tools, PDF annotations, and screen sharing",
          "Encrypted video on-demand (VOD) streaming with dynamic DRM watermarking preventing piracy",
          "Automated live lecture recording and transcription with searchable timestamp index"
        ],
        technicalSpec: "WebRTC / LiveKit Media Server + HLS / DASH Video Streaming + S3"
      },
      {
        moduleNum: "03",
        title: "AI-Powered Online Exam Proctoring & Automated Quiz Engine",
        badge: "ACADEMIC INTEGRITY",
        description:
          "Secure examination platform with browser lockdown, webcam AI gaze tracking, multi-person detection, and automated assessment grading.",
        keyPoints: [
          "AI computer vision proctoring detecting multiple faces, unauthorized phones, or room absences",
          "Full screen lockdown preventing students from switching browser tabs or opening search engines",
          "Support for diverse question formats: MCQs, coding sandboxes, audio recordings, and long essays",
          "Automated instant quiz grading with detailed question-level performance breakdown"
        ],
        technicalSpec: "TensorFlow.js / OpenCV in-browser detection + WebSockets"
      },
      {
        moduleNum: "04",
        title: "Automated Fee Billing, Installments & Parent Mobile App",
        badge: "FINANCIAL & PARENT ENGAGEMENT",
        description:
          "Institutional fee management eliminating manual receipting with automated installment reminders, payment gateway links, and dedicated parent communication apps.",
        keyPoints: [
          "Flexible fee structures supporting tuition, transport, hostel, lab, and scholarship concessions",
          "Automated WhatsApp and SMS payment reminders with 1-click instant payment links",
          "Parent native mobile app with real-time biometric attendance alerts and bus GPS tracking",
          "Daily cash and bank reconciliation reports for bursars and finance committees"
        ],
        technicalSpec: "React Native (iOS/Android) + Stripe/Razorpay UPI + MQTT GPS Tracker"
      },
      {
        moduleNum: "05",
        title: "Gamified Student Learning Hub, Assignments & Certification",
        badge: "STUDENT MOTIVATION",
        description:
          "Engaging learner dashboard with streak tracking, XP points, automated peer reviews, interactive homework submissions, and verifiable digital certificates.",
        keyPoints: [
          "Gamified reward system with achievement badges, student leaderboards, and streak counters",
          "Rich interactive rich-text homework editor with PDF annotation and audio voice notes",
          "Automated cryptographic certificate generation with tamper-proof QR code verification",
          "Student discussion forums with upvoting, pinned instructor answers, and AI homework helpers"
        ],
        technicalSpec: "Next.js 15 + Canvas Certificate Generator + Redis Leaderboards"
      },
      {
        moduleNum: "06",
        title: "Real-Time School Bus GPS Fleet Tracking & Geofenced Alerts",
        badge: "SAFETY & TELEMETRY",
        description:
          "IoT school bus transport management system providing parents and transport directors with sub-second live GPS tracking and safety geofence alerts.",
        keyPoints: [
          "Live bus movement map on parent mobile app with accurate arrival estimated time (ETA)",
          "Automated push notifications when the bus enters within 500 meters of the student's stop",
          "Driver speed alert monitoring and route deviation escalation to school transport managers",
          "RFID/NFC card tap reader logging student boarding and deboarding timestamps in real time"
        ],
        technicalSpec: "MQTT IoT Broker + Mapbox GL + React Native Native Geolocation"
      }
    ],
    techStack: [
      {
        category: "Web & Mobile Portals",
        items: ["Next.js 15 App Router", "React Native (Student/Parent)", "TailwindCSS", "Canvas API"]
      },
      {
        category: "Media & Real-Time",
        items: ["WebRTC / LiveKit", "HLS / DASH Video", "Node.js WebSockets", "Redis Pub/Sub"]
      },
      {
        category: "Backend & AI Engines",
        items: ["Python FastAPI", "TensorFlow.js (Proctoring)", "PostgreSQL 16", "AWS S3 / CloudFront"]
      },
      {
        category: "Security & DRM",
        items: ["Widevine / FairPlay DRM", "Dynamic Video Watermarking", "FERPA & GDPR Compliance"]
      }
    ],
    sprintPhases: [
      {
        phase: "Phase 01",
        title: "Academic Curriculum & System Architecture Discovery",
        duration: "Week 1 - 2",
        deliverables: "Grading scheme definitions, course hierarchy, and database architecture."
      },
      {
        phase: "Phase 02",
        title: "Student Information System (SIS) & Fee Automation Core",
        duration: "Week 3 - 6",
        deliverables: "Admissions workflow, fee installment schedule, and report card engine."
      },
      {
        phase: "Phase 03",
        title: "LMS Course Player & Low-Latency Live Classrooms",
        duration: "Week 7 - 9",
        deliverables: "WebRTC live stream engine, interactive whiteboard, and DRM video player."
      },
      {
        phase: "Phase 04",
        title: "AI Exam Proctoring & Student/Parent Mobile Apps",
        duration: "Week 10 - 12",
        deliverables: "Proctored assessment engine, parent app with bus tracking, and notifications."
      },
      {
        phase: "Phase 05",
        title: "Security Hardening, Historical Data Migration & Go-Live",
        duration: "Week 13 - 14",
        deliverables: "Student records import, teacher training sessions, and production launch."
      }
    ],
    handoverArtifacts: [
      {
        title: "Full EdTech & SIS Source Code Repository",
        format: "Git Repository (TypeScript / Python)",
        desc: "Complete codebase for admin ERP, teacher dashboard, student LMS, and parent apps."
      },
      {
        title: "WebRTC Live Media Server Deployment Scripts",
        format: "Docker / Kubernetes Helm Charts",
        desc: "Automated scaling configuration for low-latency live video streaming servers."
      },
      {
        title: "Video DRM & Piracy Protection Handbook",
        format: "Technical Configuration Guide",
        desc: "Setup guides for dynamic watermarking and video content encryption."
      },
      {
        title: "Faculty & Administrative Training Manuals",
        format: "Interactive Video & PDF Modules",
        desc: "Role-specific training for teachers, examination controllers, and accountants."
      }
    ],
    caseStudy: {
      client: "Representative Implementation: Multi-Campus Educational ERP & LMS",
      sector: "K-12 Education & Competitive Test Prep",
      challenge:
        "Managing 18 campuses with disparate paper records, losing 12% in unpaid tuition fees due to manual follow-ups, and experiencing video piracy of premium exam prep lectures.",
      solution:
        "Engineered an all-in-one cloud School ERP and LMS with automated WhatsApp fee installment links, DRM-encrypted live lecture streams, and a native parent mobile app.",
      metrics: [
        { label: "Fee Collection Efficiency", val: "99.4% (Zero Default)" },
        { label: "Lecture Piracy Incidents", val: "Dropped to 0" },
        { label: "Administrative Time Saved", val: "30+ Hours / Week" },
        { label: "Live Classroom Attendance", val: "+45% Increase" }
      ]
    },
    pricingTiers: [
      {
        name: "Coaching & Course Creator LMS",
        price: "$6,000 - $11,000",
        period: "4 - 6 Weeks",
        badge: "TEST PREP & CREATORS",
        description: "High-conversion LMS with video player, quiz engine, and automated certificate generation.",
        features: [
          "DRM protected video on-demand (VOD) course player",
          "Interactive quizzes with automated grading and student leaderboards",
          "Course bundle checkout with Stripe / Razorpay integration",
          "Student discussion forum and downloadable study materials",
          "Automated branded PDF course completion certificates"
        ]
      },
      {
        name: "Full School / College ERP & LMS Suite",
        price: "$14,000 - $28,000",
        period: "8 - 12 Weeks",
        badge: "MOST POPULAR",
        description: "Complete institutional campus management system for schools, colleges, and polytechnics.",
        features: [
          "Complete Student Information System (SIS) from admission to graduation",
          "Interactive WebRTC live classrooms with collaborative digital whiteboard",
          "Automated fee collection with WhatsApp payment reminders & receipts",
          "AI-monitored online examination proctoring engine",
          "Parent & Student Native Mobile Apps (iOS & Android)",
          "Biometric staff attendance and school bus GPS live tracking"
        ]
      },
      {
        name: "Multi-Campus University Enterprise Core",
        price: "$32,000 - $65,000+",
        period: "12 - 18 Weeks",
        badge: "UNIVERSITY SCALE",
        description: "Comprehensive multi-faculty university management ecosystem supporting 50,000+ students.",
        features: [
          "Multi-campus academic hierarchy with autonomous department controls",
          "Advanced credit-based semester grading and automated transcript validation",
          "High-capacity live streaming infrastructure for 10,000+ concurrent students",
          "University research paper repository and plagiarism detection pipeline",
          "Dedicated high-availability cloud cluster with 99.9%+ uptime SLA",
          "Custom legacy database migration and on-site faculty training"
        ]
      }
    ],
    faqs: [
      {
        question: "How do you protect recorded lecture videos from being pirated or screen recorded?",
        answer:
          "We implement multi-layered DRM encryption combined with dynamic visual watermarking that burns the logged-in student's email and IP address onto the video in real-time, making unauthorized redistribution easily traceable and strictly deterred."
      },
      {
        question: "Can parents track the school bus in real time on their mobile app?",
        answer:
          "Yes. We integrate lightweight GPS IoT tracking units on school buses that transmit live vehicle coordinates to the parent mobile app with automated pickup and drop-off arrival alerts."
      },
      {
        question: "Can we conduct proctored exams for thousands of students simultaneously?",
        answer:
          "Yes. Our exam architecture utilizes browser-based AI vision models for lightweight local face verification paired with auto-scaling Redis and Go backend clusters capable of managing 20,000+ concurrent test takers."
      }
    ]
  }
};

// Ensure all services from servicesData have rich details and static paths
servicesData.forEach((svc: ServiceItem) => {
  if (!serviceDetailsRecord[svc.id]) {
    serviceDetailsRecord[svc.id] = {
      slug: svc.id,
      badge: "ENTERPRISE CAPABILITY // FULL SUITE",
      title: svc.title.split(" ")[0] || "Enterprise",
      titleHighlight: svc.title.split(" ").slice(1).join(" ") || "Systems",
      tagline: svc.tagline,
      metaDescription: svc.description,
      headerStats: [
        { label: "Architecture SLA", value: "99.9%+", detail: "High-Availability Guarantee", color: "text-blue-400" },
        { label: "Deployment Velocity", value: "4-8 Wks", detail: "Sprint Delivery Cadence", color: "text-emerald-400" },
        { label: "Concurrency Scale", value: "100k+", detail: "Simultaneous Active Sessions", color: "text-cyan-400" },
        { label: "Client Satisfaction", value: "4.9/5", detail: "Verified Clutch Score", color: "text-amber-400" }
      ],
      architectureSummary: {
        diagramTitle: "Distributed Microservices & Cloud-Native Ingress Pipeline",
        diagramSubtitle: `Multi-tenant, high-throughput cloud infrastructure engineered specifically for ${svc.title}.`,
        flowSteps: [
          {
            step: "01",
            label: "Edge Ingress & WAF",
            tech: "Cloudflare Anycast + TLS 1.3",
            desc: "Terminates global traffic, mitigates volumetric DDoS attacks, and caches static assets in <15ms."
          },
          {
            step: "02",
            label: "Application Core",
            tech: "Next.js 15 + Node.js 22 LTS",
            desc: "Processes transactional business logic with strict TypeScript contracts and server components."
          },
          {
            step: "03",
            label: "Asynchronous Queue",
            tech: "Redis BullMQ + Kafka",
            desc: "Buffers high-frequency mutations, webhooks, and background scheduled processing jobs."
          },
          {
            step: "04",
            label: "Resilient Data Tier",
            tech: "PostgreSQL 17 + TimescaleDB",
            desc: "Stores transactional records with ACID compliance, automated read replicas, and encrypted backups."
          }
        ]
      },
      engineeringModules: svc.features.map((feat, idx) => ({
        moduleNum: `MODULE 0${idx + 1}`,
        title: feat,
        badge: "PRODUCTION GRADE",
        description: `Enterprise-grade implementation of ${feat.toLowerCase()} engineered with modularity, sub-second latency, and zero data leakage.`,
        keyPoints: [
          "100% type-safe integration with end-to-end testing coverage",
          "Automated RBAC role-level permission validation",
          "Real-time audit telemetry with instant Slack/PagerDuty escalation"
        ],
        technicalSpec: "TypeScript / Next.js / PostgreSQL / Redis"
      })),
      techStack: [
        {
          category: "Frontend & Portals",
          items: ["Next.js 15 (App Router)", "React 19", "Tailwind CSS v4", "Lucide SVG Primitives", "Framer Motion"]
        },
        {
          category: "Backend & Systems",
          items: ["Node.js 22 LTS", "Python FastAPI", "Golang Concurrency", "Redis In-Memory Cache", "BullMQ"]
        },
        {
          category: "Database & Security",
          items: ["PostgreSQL 17", "Prisma / Supabase RLS", "Cloudflare WAF", "AES-256 Encryption", "SOC-2 Ready"]
        }
      ],
      sprintPhases: [
        {
          phase: "Sprint 1",
          title: "System Discovery & Schema Architecture",
          duration: "Weeks 1 - 2",
          deliverables: "Relational database schema, wireframes, API contracts, and security perimeter design."
        },
        {
          phase: "Sprint 2",
          title: "Core Business Engine & Microservices",
          duration: "Weeks 3 - 4",
          deliverables: "Core business logic, authentication, payment/webhook integrations, and worker queues."
        },
        {
          phase: "Sprint 3",
          title: "High-Density UI & Role Portals",
          duration: "Weeks 5 - 6",
          deliverables: "Responsive user dashboards, analytics cockpits, customer mobile apps, and real-time alerts."
        },
        {
          phase: "Sprint 4",
          title: "Stress Testing, Security Audit & Launch",
          duration: "Weeks 7 - 8",
          deliverables: "Load testing at 50,000 req/s, pentest audit verification, production DNS cutover, and handoff."
        }
      ],
      handoverArtifacts: [
        {
          title: "Complete Repository Source Code",
          format: "Private GitHub Organization",
          desc: "Full, clean commercial ownership transfer of all frontends, backends, and schemas."
        },
        {
          title: "Infrastructure as Code (IaC)",
          format: "Terraform & Docker Compose",
          desc: "Repeatable, audited deployment scripts for AWS, GCP, or on-premise Kubernetes."
        },
        {
          title: "API Swagger & OpenAPI Docs",
          format: "Postman & Scalar Hub",
          desc: "Comprehensive interactive documentation with ready-to-test endpoints and SDKs."
        }
      ],
      caseStudy: {
        client: `${svc.title.split(" ")[0]} Global Systems`,
        sector: svc.idealFor.split(",")[0] || "Enterprise SaaS",
        challenge: `The client previously operated an unscalable monolithic stack that faced high query latency, data drift, and frequent downtime during traffic spikes.`,
        solution: `Divanex engineered an end-to-end modern digital architecture for ${svc.title.toLowerCase()}, slashing response latency by 85% and enabling seamless 10x traffic expansion.`,
        metrics: [
          { label: "Latency Reduction", val: "85%" },
          { label: "Operational ROI", val: "+320%" },
          { label: "Uptime Verified", val: "99.9%+" }
        ]
      },
      pricingTiers: [
        {
          name: "Standard Production Core",
          price: "$18,500 - $35,000",
          period: "6 - 8 Weeks",
          badge: "MOST POPULAR",
          description: `Full-cycle engineering of ${svc.title} for scaling startups and mid-market organizations.`,
          features: [
            "Complete custom web portal and responsive mobile PWA",
            "Role-Based Access Control (RBAC) & audit logging",
            "Third-party payment gateways and webhook dispatchers",
            "Automated CI/CD deployment pipelines on AWS/Vercel",
            "90 days of dedicated post-launch SLA maintenance"
          ]
        },
        {
          name: "Enterprise Multi-Tenant Suite",
          price: "$38,000 - $75,000+",
          period: "10 - 16 Weeks",
          badge: "ENTERPRISE SCALE",
          description: `High-concurrency distributed ecosystem engineered for corporate enterprises and global operations.`,
          features: [
            "Multi-region auto-scaling Kubernetes cluster architecture",
            "Dedicated high-throughput database read replicas",
            "Native iOS & Android mobile applications",
            "Custom ERP/CRM legacy database synchronization",
            "SOC 2–Aligned, HIPAA, and ISO 27001 audit support",
            "1-year 24/7 dedicated engineering SLA support"
          ]
        }
      ],
      faqs: [
        {
          question: `How quickly can we launch a production version of ${svc.title}?`,
          answer:
            "A core MVP is typically shipped in 4 to 8 weeks, while comprehensive multi-tenant enterprise architectures take 10 to 14 weeks depending on third-party API integrations."
        },
        {
          question: "Who owns the code and intellectual property?",
          answer:
            "You own 100% of all source code, design assets, and database schemas from Day 1 with full commercial IP transfer upon sprint completion."
        },
        {
          question: "Do you provide post-launch maintenance and technical support?",
          answer:
            "Yes. We offer dedicated SLA maintenance packages including 24/7 server monitoring, automated security patch rollouts, and sub-15-minute emergency response times."
        }
      ]
    };
  }
});


