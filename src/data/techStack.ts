export interface TechItem {
  name: string;
  slug?: string;
  category: "frontend" | "backend" | "php" | "cms" | "ai" | "mobile" | "devops" | "database" | "security";
  iconText: string;
  description: string;
  badgeColor: string;
  version?: string;
  useCase?: string;
}

const techSlugMap: Record<string, string> = {
  "Next.js 15 (App Router)": "nextjs",
  "Laravel 11 & 12": "laravel",
  "WordPress & WooCommerce (Custom)": "wordpress-woocommerce",
  "React.js 19": "reactjs",
  "TypeScript": "typescript",
  "Tailwind CSS & Shadcn UI": "tailwind-shadcn",
  "Vue.js & Nuxt 3": "vue-nuxt",
  "Svelte 5 & SvelteKit": "svelte-sveltekit",
  "Framer Motion & Three.js": "framer-motion-threejs",
  "GraphQL & Apollo Client": "graphql-apollo",
  "Nuxt 3 & Vue.js 3": "nuxt-vue",
  "PHP 8.3 & 8.4": "php-modern",
  "Filament Admin & Livewire 3": "filament-livewire",
  "Inertia.js (Laravel + Vue/React)": "inertia-js",
  "Laravel Reverb & WebSockets": "laravel-reverb",
  "Symfony & Laravel Octane": "symfony-octane",
  "Shopify & Shopify Plus": "shopify-hydrogen",
  "Strapi Headless CMS": "strapi-headless",
  "Sanity.io": "sanity-io",
  "Webflow & Ghost CMS": "webflow-ghost",
  "Adobe Commerce & Magento 2": "magento-commerce",
  "Node.js & NestJS": "nodejs-nestjs",
  "Python (FastAPI & Django)": "python-fastapi-django",
  "Golang (Go)": "golang",
  "Rust (Actix & Axum)": "rust",
  "Apache Kafka & RabbitMQ": "kafka-rabbitmq",
  "gRPC & Protocol Buffers": "grpc-protobuf",
  "OpenAI GPT-4o & o3-mini": "openai-gpt4",
  "Anthropic Claude 3.5 Sonnet": "anthropic-claude",
  "LangChain & LangGraph": "langchain-langgraph",
  "LlamaIndex & DSPy": "llamaindex-dspy",
  "PyTorch & CUDA Acceleration": "pytorch-cuda",
  "Hugging Face & Ollama / vLLM": "huggingface-ollama-vllm",
  "PostgreSQL & pgvector": "postgresql-pgvector",
  "Redis & Dragonfly DB": "redis-dragonfly",
  "Pinecone & Qdrant": "pinecone-qdrant",
  "MongoDB Atlas": "mongodb-atlas",
  "Supabase & Prisma ORM": "supabase-prisma",
  "ClickHouse & Snowflake": "clickhouse-snowflake",
  "React Native & Expo SDK": "react-native-expo",
  "Flutter & Dart": "flutter-dart",
  "Swift & SwiftUI (iOS)": "swift-swiftui",
  "Kotlin & Jetpack Compose": "kotlin-compose",
  "Docker & Containerd": "docker-containerd",
  "Kubernetes (K8s) & Helm": "kubernetes-helm",
  "Amazon Web Services (AWS)": "aws-cloud",
  "Google Cloud Platform (GCP)": "gcp-cloud",
  "Terraform & OpenTofu (IaC)": "terraform-opentofu",
  "GitHub Actions CI/CD": "github-actions-cicd",
  "Prometheus & Grafana": "prometheus-grafana",
  "Cloudflare & Edge Shield": "cloudflare-edge",
  "OAuth 2.0 / OIDC & Auth0": "oauth-auth0-sso",
  "Stripe & Razorpay Ingress Security": "stripe-razorpay-pci"
};

export function getTechSlug(name: string): string {
  if (techSlugMap[name]) return techSlugMap[name];
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}


export const techStackData: TechItem[] = [
  // ==========================================
  // FLAGSHIP PRODUCTION PLATFORMS
  // ==========================================
  {
    name: "Next.js 15 (App Router)",
    category: "frontend",
    iconText: "▲",
    description: "Server-side rendering, Partial Prerendering (PPR), Turbopack & Edge caching.",
    badgeColor: "border-slate-400/30 text-slate-800 bg-slate-50",
    version: "v15.2+",
    useCase: "High-Traffic SaaS & SEO Web Apps"
  },
  {
    name: "Laravel 11 & 12",
    category: "php",
    iconText: "🔺",
    description: "Enterprise PHP web framework with Eloquent ORM, robust queues, Horizon, Sanctum auth, and scheduled tasks.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v11.x / v12",
    useCase: "Enterprise SaaS & Scalable Backends"
  },
  {
    name: "WordPress & WooCommerce (Custom)",
    category: "cms",
    iconText: "🌐",
    description: "Bespoke theme & plugin architecture, ACF Pro, Headless WP via REST/GraphQL, and high-volume WooCommerce shops.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "v6.7+",
    useCase: "Custom Corporate & E-Commerce Portals"
  },

  // ==========================================
  // FRONTEND & WEB APPS
  // ==========================================
  {
    name: "React.js 19",
    category: "frontend",
    iconText: "⚛️",
    description: "Component-based architecture with React Server Components & Actions.",
    badgeColor: "border-cyan-500/30 text-cyan-600 bg-cyan-50",
    version: "v19.x",
    useCase: "Dynamic SPAs & Enterprise Portals"
  },
  {
    name: "TypeScript",
    category: "frontend",
    iconText: "TS",
    description: "Strict compile-time type safety preventing regressions across large codebases.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "v5.7+",
    useCase: "Enterprise Codebase Maintainability"
  },
  {
    name: "Tailwind CSS & Shadcn UI",
    category: "frontend",
    iconText: "🎨",
    description: "Utility-first design tokens with Radix accessible UI primitives & micro-interactions.",
    badgeColor: "border-teal-500/30 text-teal-700 bg-teal-50",
    version: "v4.0+",
    useCase: "Pixel-Perfect Responsive Systems"
  },
  {
    name: "Vue.js & Nuxt 3",
    category: "frontend",
    iconText: "💚",
    description: "Progressive, lightweight reactivity engine with universal SSR hydration.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "v3.5+",
    useCase: "Fast-Loading B2B Dashboards"
  },
  {
    name: "Svelte 5 & SvelteKit",
    category: "frontend",
    iconText: "🧡",
    description: "Zero-virtual-DOM compiled reactive code with ultrafast runtime benchmarks.",
    badgeColor: "border-orange-500/30 text-orange-700 bg-orange-50",
    version: "v5.0+",
    useCase: "Ultra-Lightweight Embedded UIs"
  },
  {
    name: "Framer Motion & Three.js",
    category: "frontend",
    iconText: "✨",
    description: "GPU-accelerated 3D shaders, WebGL canvas scenes, and spring physics animations.",
    badgeColor: "border-purple-500/30 text-purple-700 bg-purple-50",
    version: "v12.x",
    useCase: "Interactive 3D & Micro-Animations"
  },
  {
    name: "GraphQL & Apollo Client",
    category: "frontend",
    iconText: "◈",
    description: "Declarative data-fetching with normalized caching and zero-overfetching queries.",
    badgeColor: "border-pink-500/30 text-pink-700 bg-pink-50",
    version: "v3.8+",
    useCase: "Complex Multi-Source Data Graphs"
  },
  {
    name: "Nuxt 3 & Vue.js 3",
    category: "frontend",
    iconText: "💚",
    description: "Full-stack Vue framework with Nitro engine, universal SSR, automatic routing, and instant hydration.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "v3.13+",
    useCase: "High-Performance SSR & Dynamic Portals"
  },

  // ==========================================
  // LARAVEL & MODERN PHP ECOSYSTEM
  // ==========================================
  {
    name: "Laravel 11 & 12",
    category: "php",
    iconText: "🔺",
    description: "Enterprise PHP web framework with Eloquent ORM, robust queues, Horizon, Sanctum auth, and scheduled tasks.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v11.x / v12",
    useCase: "Enterprise SaaS & Scalable Backends"
  },
  {
    name: "PHP 8.3 & 8.4",
    category: "php",
    iconText: "🐘",
    description: "Modern JIT-compiled backend engine with strict typing, readonly properties, fibers, and low memory overhead.",
    badgeColor: "border-indigo-500/30 text-indigo-700 bg-indigo-50",
    version: "v8.4.x",
    useCase: "High-Throughput Core APIs"
  },
  {
    name: "Filament Admin & Livewire 3",
    category: "php",
    iconText: "⚡",
    description: "Reactive full-stack components without JavaScript build bloat, dynamic form builders, tables, and admin suites.",
    badgeColor: "border-amber-500/30 text-amber-800 bg-amber-50",
    version: "v3.x",
    useCase: "Rapid Enterprise CRUD & Dashboards"
  },
  {
    name: "Inertia.js (Laravel + Vue/React)",
    category: "php",
    iconText: "💎",
    description: "Build modern single-page apps using classic server-side routing and controllers with Vue 3 or React components.",
    badgeColor: "border-purple-500/30 text-purple-700 bg-purple-50",
    version: "v2.0+",
    useCase: "Monolithic SPA Experiences"
  },
  {
    name: "Laravel Reverb & WebSockets",
    category: "php",
    iconText: "📡",
    description: "First-party high-speed WebSocket server engineered for real-time Laravel event broadcasting and live telemetry.",
    badgeColor: "border-rose-500/30 text-rose-700 bg-rose-50",
    version: "v1.x",
    useCase: "Real-Time Feeds, Ingress & Chat"
  },
  {
    name: "Symfony & Laravel Octane",
    category: "php",
    iconText: "🏎️",
    description: "Swoole / RoadRunner in-memory application worker supercharging request throughput to thousands of req/sec.",
    badgeColor: "border-slate-500/30 text-slate-800 bg-slate-50",
    version: "Octane 2.x",
    useCase: "Sub-10ms High-Concurrency APIs"
  },

  // ==========================================
  // HEADLESS CMS & E-COMMERCE ENGINES
  // ==========================================
  {
    name: "WordPress & WooCommerce (Custom)",
    category: "cms",
    iconText: "🌐",
    description: "Bespoke theme & plugin architecture, ACF Pro, Headless WP via REST/GraphQL, and high-volume WooCommerce shops.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "v6.7+",
    useCase: "Custom Corporate & E-Commerce Portals"
  },
  {
    name: "Shopify & Shopify Plus",
    category: "cms",
    iconText: "🛍️",
    description: "Custom Liquid storefronts, headless Hydrogen frameworks, Storefront API integrations, and checkout extensions.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "Plus / Hydrogen",
    useCase: "High-Growth DTC & Omnichannel Commerce"
  },
  {
    name: "Strapi Headless CMS",
    category: "cms",
    iconText: "🚀",
    description: "Customizable Node.js open-source headless CMS with granular role permissions, custom database schemas, and webhooks.",
    badgeColor: "border-indigo-500/30 text-indigo-700 bg-indigo-50",
    version: "v5.x",
    useCase: "Structured Multi-Channel Content Delivery"
  },
  {
    name: "Sanity.io",
    category: "cms",
    iconText: "✨",
    description: "Real-time collaborative structured content platform with GROQ querying, live preview studio, and global edge CDN.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v3 Studio",
    useCase: "Enterprise Omnichannel Content Hub"
  },
  {
    name: "Webflow & Ghost CMS",
    category: "cms",
    iconText: "⚡",
    description: "Clean semantic markup, blazing-fast TTFB, high-converting marketing landing pages, and headless publishing engines.",
    badgeColor: "border-teal-500/30 text-teal-700 bg-teal-50",
    version: "Enterprise",
    useCase: "High-Speed Marketing & Editorial Sites"
  },
  {
    name: "Adobe Commerce & Magento 2",
    category: "cms",
    iconText: "🛒",
    description: "Enterprise B2B & B2C multi-store commerce platform with complex inventory, custom checkout, and ERP integrations.",
    badgeColor: "border-orange-500/30 text-orange-700 bg-orange-50",
    version: "v2.4.7+",
    useCase: "Large-Scale Enterprise E-Commerce"
  },

  // ==========================================
  // BACKEND & DISTRIBUTED SYSTEMS
  // ==========================================
  {
    name: "Node.js & NestJS",
    category: "backend",
    iconText: "🟢",
    description: "Enterprise modular TypeScript microservices with dependency injection & OpenAPI.",
    badgeColor: "border-green-500/30 text-green-700 bg-green-50",
    version: "v22 LTS",
    useCase: "Real-Time Event Streams & APIs"
  },
  {
    name: "Python (FastAPI & Django)",
    category: "backend",
    iconText: "🐍",
    description: "Asynchronous ASGI API framework with Pydantic validation and auto-generated docs.",
    badgeColor: "border-yellow-500/30 text-yellow-700 bg-yellow-50",
    version: "v3.12+",
    useCase: "ML Inference & Data Pipelines"
  },
  {
    name: "Golang (Go)",
    category: "backend",
    iconText: "🔵",
    description: "Goroutine concurrency model delivering millions of QPS with minimal memory footprint.",
    badgeColor: "border-sky-500/30 text-sky-700 bg-sky-50",
    version: "v1.23+",
    useCase: "High-Throughput Microservices"
  },
  {
    name: "Rust (Actix & Axum)",
    category: "backend",
    iconText: "🦀",
    description: "Memory-safe, zero-cost abstractions with near C++ bare-metal execution performance.",
    badgeColor: "border-amber-500/30 text-amber-800 bg-amber-50",
    version: "v1.82+",
    useCase: "Fintech Engines & Cryptographic Services"
  },
  {
    name: "Apache Kafka & RabbitMQ",
    category: "backend",
    iconText: "📬",
    description: "Distributed pub/sub event logs guaranteeing zero message loss and replayability.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v3.8+",
    useCase: "Asynchronous Message Queues"
  },
  {
    name: "gRPC & Protocol Buffers",
    category: "backend",
    iconText: "⚡",
    description: "Binary serialization over HTTP/2 for ultra-low latency inter-service RPC communication.",
    badgeColor: "border-indigo-500/30 text-indigo-700 bg-indigo-50",
    version: "v1.65+",
    useCase: "Polyglot Microservice Fabrics"
  },

  // ==========================================
  // AI, MACHINE LEARNING & AGENTS
  // ==========================================
  {
    name: "OpenAI GPT-4o & o3-mini",
    category: "ai",
    iconText: "🧠",
    description: "Advanced multi-modal reasoning, structured JSON outputs & custom tool calling.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "Latest API",
    useCase: "Autonomous Agent Reasoning"
  },
  {
    name: "Anthropic Claude 3.5 Sonnet",
    category: "ai",
    iconText: "🔮",
    description: "200k context window with superior coding benchmarks and artifact generation.",
    badgeColor: "border-amber-500/30 text-amber-800 bg-amber-50",
    version: "Claude 3.5",
    useCase: "Deep Document & Code Analysis"
  },
  {
    name: "LangChain & LangGraph",
    category: "ai",
    iconText: "🦜",
    description: "Stateful multi-actor agent orchestration with cyclic graphs and human-in-the-loop validation.",
    badgeColor: "border-cyan-500/30 text-cyan-700 bg-cyan-50",
    version: "v0.3+",
    useCase: "Complex Workflow Automation"
  },
  {
    name: "LlamaIndex & DSPy",
    category: "ai",
    iconText: "🦙",
    description: "Advanced semantic RAG indexing, programmatic prompt compilation & reranking.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "v0.11+",
    useCase: "Enterprise Knowledge Bases"
  },
  {
    name: "PyTorch & CUDA Acceleration",
    category: "ai",
    iconText: "🔥",
    description: "Deep learning tensor computation framework for fine-tuning & self-hosted model weights.",
    badgeColor: "border-orange-500/30 text-orange-700 bg-orange-50",
    version: "v2.5+",
    useCase: "Custom Neural Net Training"
  },
  {
    name: "Hugging Face & Ollama / vLLM",
    category: "ai",
    iconText: "🤗",
    description: "High-throughput local LLM inference engines with PagedAttention and quantized GGUF models.",
    badgeColor: "border-yellow-500/30 text-yellow-800 bg-yellow-50",
    version: "vLLM v0.6+",
    useCase: "Private On-Premise AI Deployment"
  },

  // ==========================================
  // DATABASES & DISTRIBUTED CACHING
  // ==========================================
  {
    name: "PostgreSQL & pgvector",
    category: "database",
    iconText: "🐘",
    description: "ACID-compliant relational database with HNSW vector indexes for hybrid semantic search.",
    badgeColor: "border-sky-500/30 text-sky-700 bg-sky-50",
    version: "v17.x",
    useCase: "Primary Enterprise Data Tier"
  },
  {
    name: "Redis & Dragonfly DB",
    category: "database",
    iconText: "🔴",
    description: "In-memory key-value store powering distributed locking, session cache & Pub/Sub.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v7.4+",
    useCase: "Sub-Millisecond Cache & Rate Limits"
  },
  {
    name: "Pinecone & Qdrant",
    category: "database",
    iconText: "🌲",
    description: "Cloud-native vector databases engineered for billion-scale similarity search embeddings.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "v2.x",
    useCase: "Real-Time AI RAG Retrieval"
  },
  {
    name: "MongoDB Atlas",
    category: "database",
    iconText: "🍃",
    description: "Horizontally scalable document database with flexible JSON schema validation & sharding.",
    badgeColor: "border-green-500/30 text-green-700 bg-green-50",
    version: "v8.0+",
    useCase: "Unstructured Content & Catalogs"
  },
  {
    name: "Supabase & Prisma ORM",
    category: "database",
    iconText: "💎",
    description: "Type-safe database client with Row Level Security (RLS) and real-time CDC replication.",
    badgeColor: "border-indigo-500/30 text-indigo-700 bg-indigo-50",
    version: "v5.x+",
    useCase: "Type-Safe DB Migrations & Auth"
  },
  {
    name: "ClickHouse & Snowflake",
    category: "database",
    iconText: "📊",
    description: "Columnar OLAP data warehouse executing analytical queries over petabytes in seconds.",
    badgeColor: "border-yellow-500/30 text-yellow-700 bg-yellow-50",
    version: "Latest",
    useCase: "Real-Time Telemetry & Big Data BI"
  },

  // ==========================================
  // MOBILE & CROSS-PLATFORM
  // ==========================================
  {
    name: "React Native & Expo SDK",
    category: "mobile",
    iconText: "📱",
    description: "60fps cross-platform mobile apps with EAS updates and native bridge integrations.",
    badgeColor: "border-cyan-500/30 text-cyan-700 bg-cyan-50",
    version: "SDK 52",
    useCase: "iOS & Android Unified Apps"
  },
  {
    name: "Flutter & Dart",
    category: "mobile",
    iconText: "🦋",
    description: "Google's high-performance Skia/Impeller engine compiling to native ARM machine code.",
    badgeColor: "border-sky-500/30 text-sky-700 bg-sky-50",
    version: "v3.24+",
    useCase: "Pixel-Perfect Multi-Screen Apps"
  },
  {
    name: "Swift & SwiftUI (iOS)",
    category: "mobile",
    iconText: "🍎",
    description: "Native Apple framework harnessing Metal, CoreML, Dynamic Island, and Live Activities.",
    badgeColor: "border-orange-500/30 text-orange-700 bg-orange-50",
    version: "iOS 18+",
    useCase: "High-End Native iOS Experiences"
  },
  {
    name: "Kotlin & Jetpack Compose",
    category: "mobile",
    iconText: "🤖",
    description: "Modern Android architecture with declarative UI, coroutines, and material design.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "Android 15+",
    useCase: "Native Android Enterprise Apps"
  },

  // ==========================================
  // DEVOPS, CLOUD & CONTAINER MESH
  // ==========================================
  {
    name: "Docker & Containerd",
    category: "devops",
    iconText: "🐳",
    description: "Immutable container packaging ensuring parity between local development and production.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "v27.x",
    useCase: "Containerized Microservices"
  },
  {
    name: "Kubernetes (K8s) & Helm",
    category: "devops",
    iconText: "☸️",
    description: "Automated container orchestration, zero-downtime rolling deploys, and horizontal pod autoscaling.",
    badgeColor: "border-sky-500/30 text-sky-700 bg-sky-50",
    version: "v1.31+",
    useCase: "Global Scale Cluster Orchestration"
  },
  {
    name: "Amazon Web Services (AWS)",
    category: "devops",
    iconText: "☁️",
    description: "EKS, Lambda Serverless, S3, RDS Multi-AZ, CloudFront CDN, and IAM least-privilege policies.",
    badgeColor: "border-orange-500/30 text-orange-800 bg-orange-50",
    version: "Multi-Region",
    useCase: "Enterprise Cloud Infrastructure"
  },
  {
    name: "Google Cloud Platform (GCP)",
    category: "devops",
    iconText: "🌐",
    description: "Cloud Run, BigQuery data lakes, Google Kubernetes Engine (GKE), and Vertex AI infrastructure.",
    badgeColor: "border-blue-500/30 text-blue-700 bg-blue-50",
    version: "Enterprise",
    useCase: "Cloud-Native Infrastructure & ML Ops"
  },
  {
    name: "Terraform & OpenTofu (IaC)",
    category: "devops",
    iconText: "🏗️",
    description: "Declarative Infrastructure as Code for repeatable, auditable multi-cloud provisioning.",
    badgeColor: "border-purple-500/30 text-purple-700 bg-purple-50",
    version: "v1.9+",
    useCase: "Automated Cloud Provisioning"
  },
  {
    name: "GitHub Actions CI/CD",
    category: "devops",
    iconText: "⚙️",
    description: "Automated testing, security scanning (SAST/DAST), artifact build & zero-downtime CD pipeline.",
    badgeColor: "border-slate-500/30 text-slate-800 bg-slate-50",
    version: "Enterprise",
    useCase: "Automated Release Pipelines"
  },
  {
    name: "Prometheus & Grafana",
    category: "devops",
    iconText: "📈",
    description: "Real-time telemetry, APM traces (OpenTelemetry), and 24/7 automated alert escalation.",
    badgeColor: "border-red-500/30 text-red-700 bg-red-50",
    version: "v11.x",
    useCase: "Production APM & Observability"
  },

  // ==========================================
  // SECURITY & IDENTITY MANAGEMENT
  // ==========================================
  {
    name: "Cloudflare & Edge Shield",
    category: "security",
    iconText: "🛡️",
    description: "Enterprise DDoS mitigation, WAF rulesets, Bot Management, and zero-trust edge workers.",
    badgeColor: "border-orange-500/30 text-orange-700 bg-orange-50",
    version: "Enterprise",
    useCase: "Perimeter DDoS & Edge Security"
  },
  {
    name: "OAuth 2.0 / OIDC & Auth0",
    category: "security",
    iconText: "🔐",
    description: "Enterprise Single Sign-On (SSO), MFA authentication, SAML 2.0 & role-based RBAC.",
    badgeColor: "border-emerald-500/30 text-emerald-700 bg-emerald-50",
    version: "Standard",
    useCase: "Zero-Trust Identity Federation"
  },
  {
    name: "Stripe & Razorpay Ingress Security",
    category: "security",
    iconText: "💳",
    description: "PCI-DSS Level 1 compliant checkout pipelines, webhook cryptographic verification, and tokenized billing.",
    badgeColor: "border-indigo-500/30 text-indigo-700 bg-indigo-50",
    version: "PCI-DSS v4.0",
    useCase: "Global Multi-Currency Payment Security"
  }
];
