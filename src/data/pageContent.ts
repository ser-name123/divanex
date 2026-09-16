import { faqsData, type FAQItem } from "@/data/testimonials";
import { whyChoosePillars, comparisonData, type WhyPillar, type ComparisonRow } from "@/data/whyChooseUs";
import { processSteps, type ProcessStep } from "@/data/process";

/**
 * Editable page content.
 *
 * Everything here used to be a literal inside a page or section component:
 * page headers, the home-page section copy, the why-us pillars, the process
 * timeline, the FAQ list. Renaming a heading meant a code change and a deploy.
 *
 * It is one database record now — the values below are only the seed a fresh
 * install starts from. Two rules hold throughout:
 *
 *  - Icons are stored as names from ICON_REGISTRY, never as components.
 *  - Colours are stored as accent names from ACCENTS, never as Tailwind class
 *    strings: Tailwind only generates classes it can see in the source, so a
 *    class that lives only in the database renders unstyled.
 */

/** One figure in a page header's telemetry strip. */
export interface HeaderStat {
  id: string;
  label: string;
  value: string;
  detail: string;
  icon: string;
  accent: string;
}

/** The two-column header at the top of every page except the home page. */
export interface PageHeaderContent {
  badge: string;
  badgeIcon: string;
  breadcrumbLabel: string;
  title: string;
  titleHighlight: string;
  description: string;
  statusText: string;
  actionLabel: string;
  actionHref: string;
  stats: HeaderStat[];
}

/** One logo in the partner marquee. */
export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  /** An emoji or one or two characters. */
  badge: string;
}

/** One counter in the impact strip. */
export interface StatCounter {
  id: string;
  target: number;
  suffix: string;
  label: string;
  subtitle: string;
  icon: string;
  accent: string;
}

/** A titled section heading anywhere on the site. */
export interface SectionHeading {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export interface CtaBannerContent {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

/** One pricing/engagement model card. */
export interface EngagementModel {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  accent: string;
}

/** One trust pillar on the security strip. */
export interface SecurityPillar {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
}

/** One step in the sprint cadence timeline. */
export interface CadenceStep {
  id: string;
  num: string;
  title: string;
  time: string;
  description: string;
  icon: string;
  accent: string;
}

export interface PageContent {
  /** Keyed by route, e.g. "/services". */
  headers: Record<string, PageHeaderContent>;
  partnersEyebrow: string;
  partners: PartnerItem[];
  statCounters: StatCounter[];
  ctaBanner: CtaBannerContent;
  /**
   * Per-route overrides of the closing call-to-action's headline. Each page
   * used to pass its own copy as props, which put nine variations of this
   * banner in the source with no way to edit any of them.
   */
  ctaOverrides: Record<string, { title: string; highlight: string; subtitle: string }>;
  whyUsHeading: SectionHeading;
  whyUsPillars: WhyPillar[];
  whyUsComparison: ComparisonRow[];
  comparisonHeading: SectionHeading;
  /** Column titles on the comparison table. */
  comparisonColumns: {
    feature: string;
    divanex: string;
    traditional: string;
    freelancers: string;
  };
  processHeading: SectionHeading;
  processSteps: ProcessStep[];
  faqs: FAQItem[];
  faqHeading: SectionHeading;
  engagementModels: EngagementModel[];
  engagementHeading: SectionHeading;
  securityPillars: SecurityPillar[];
  securityHeading: SectionHeading;
  cadenceSteps: CadenceStep[];
  cadenceHeading: SectionHeading;
}

const s = (
  id: string,
  label: string,
  value: string,
  detail: string,
  icon: string,
  accentName: string
): HeaderStat => ({ id, label, value, detail, icon, accent: accentName });

export const DEFAULT_PAGE_CONTENT: PageContent = {
  headers: {
    "/services": {
      badge: "HIGH-TECH CAPABILITY MATRIX // ENGINEERING SUITE",
      badgeIcon: "Layers",
      breadcrumbLabel: "Services",
      title: "Enterprise Digital & Tech",
      titleHighlight: "Engineering Services",
      description:
        "From custom multi-tenant SaaS platforms and autonomous AI agents to high-concurrency cloud infrastructure and cross-platform mobile apps—explore our full spectrum of specialized engineering capabilities built for exponential business scale.",
      statusText: "ENGINEERING SUITE // READY FOR DEPLOYMENT",
      actionLabel: "Explore Services",
      actionHref: "#services",
      stats: [
        s("sv-1", "Cloud Architecture", "99.999%", "Enterprise SLA Availability", "ShieldCheck", "emerald"),
        s("sv-2", "Edge Response", "< 50ms", "Sub-Second Global Latency", "Zap", "cyan"),
        s("sv-3", "Production Deployments", "50+", "SaaS, Mobile & AI Platforms", "Layers", "blue"),
        s("sv-4", "AI Inference Speed", "140+", "Tokens/sec RAG Pipelines", "Cpu", "amber"),
      ],
    },
    "/why-us": {
      badge: "THE DIVANEX ADVANTAGE // ZERO COMPROMISE",
      badgeIcon: "ShieldCheck",
      breadcrumbLabel: "Why Choose Us",
      title: "Engineered for High Velocity &",
      titleHighlight: "100% Code Ownership",
      description:
        "Traditional digital agencies move slow and lock you into expensive retainers. Fragmented freelancers lack enterprise-grade architectural rigor. Discover how Divanex bridges the gap with dedicated high-caliber product engineering teams.",
      statusText: "ENGINEERING GUARANTEE // VERIFIED",
      actionLabel: "See the Comparison",
      actionHref: "#comparison",
      stats: [
        s("wu-1", "Code Ownership", "100%", "Full IP Transfer on Delivery", "ShieldCheck", "emerald"),
        s("wu-2", "Velocity Boost", "3.5x", "Faster Than Legacy Agencies", "Zap", "cyan"),
        s("wu-3", "Client Retention", "96%", "Long-Term Scaled Partnerships", "Award", "blue"),
        s("wu-4", "Guaranteed SLA", "100%", "Milestone-Backed Contracts", "CheckCircle2", "amber"),
      ],
    },
    "/process": {
      badge: "EXECUTION PIPELINE // HYPER-LOOP PROTOCOL",
      badgeIcon: "Workflow",
      breadcrumbLabel: "Process",
      title: "From Architectural Blueprint to",
      titleHighlight: "Production Launch in 5 Phases",
      description:
        "Our structured agile engineering protocol accelerates time-to-market without cutting corners. Every 2-week sprint yields verifiable staging builds, automated CI/CD test passes, bi-weekly client demos, and complete IP transfer.",
      statusText: "PIPELINE PROTOCOL // ZERO DEFECT GATE",
      actionLabel: "View the Pipeline",
      actionHref: "#process",
      stats: [
        s("pr-1", "Sprint Cadence", "14-Day", "Iterative Rapid Delivery", "Clock", "blue"),
        s("pr-2", "Client Demo Rhythm", "Bi-Weekly", "Live Interactive Staging", "Laptop", "cyan"),
        s("pr-3", "Code Review Pass", "100%", "Senior Peer Code Reviews", "CheckCircle2", "emerald"),
        s("pr-4", "Deployment Speed", "< 5 Mins", "Automated Zero-Downtime CI/CD", "Workflow", "amber"),
      ],
    },
    "/tech-stack": {
      badge: "PRODUCTION STACK // ENTERPRISE ECOSYSTEM",
      badgeIcon: "Code2",
      breadcrumbLabel: "Tech Stack",
      title: "Battle-Tested Technologies for",
      titleHighlight: "High-Scale Reality",
      description:
        "Zero bloat, type-safe integrity, sub-second latency, and horizontal scalability. We build exclusively with modern, long-term durable frameworks including Next.js, React Native, Python, Go, Kubernetes, and PostgreSQL.",
      statusText: "PRODUCTION ARSENAL // MODERN RUNTIMES",
      actionLabel: "Browse the Stack",
      actionHref: "#stack",
      stats: [
        s("ts-1", "TypeScript Coverage", "100%", "Strict Type-Safety Contract", "Code2", "blue"),
        s("ts-2", "Cloud Architecture", "Multi-Cloud", "AWS, GCP & Kubernetes Ingress", "Cloud", "cyan"),
        s("ts-3", "AI Model Ecosystem", "Hybrid", "DeepSeek, Claude & GPT-4o RAG", "Cpu", "emerald"),
        s("ts-4", "Database Integrity", "ACID", "PostgreSQL, Redis & Vector DBs", "Server", "amber"),
      ],
    },
    "/portfolio": {
      badge: "CASE STUDIES // PRODUCTION DELIVERIES",
      badgeIcon: "Briefcase",
      breadcrumbLabel: "Portfolio",
      title: "Featured Projects We've",
      titleHighlight: "Engineered & Scaled",
      description:
        "Explore our proven track record engineering custom multi-tenant SaaS platforms, autonomous AI agents, cross-platform mobile apps, and low-latency fintech web applications that deliver compounding ROI.",
      statusText: "CLIENT SHOWCASE // VERIFIABLE SUCCESS",
      actionLabel: "View Case Studies",
      actionHref: "#cases",
      stats: [
        s("pf-1", "Platforms Shipped", "50+", "SaaS, Mobile & AI Apps", "Briefcase", "blue"),
        s("pf-2", "Average ARR Growth", "+320%", "Client Business Expansion", "TrendingUp", "emerald"),
        s("pf-3", "End Users Served", "2.4M+", "High-Concurrency Scale", "Users", "cyan"),
        s("pf-4", "Client Satisfaction", "4.9/5", "Verified Clutch/Google Score", "Award", "amber"),
      ],
    },
    "/testimonials": {
      badge: "SOCIAL PROOF // VERIFIED CLIENT OUTCOMES",
      badgeIcon: "MessageSquareQuote",
      breadcrumbLabel: "Testimonials",
      title: "What Founders, CTOs & Product Leads",
      titleHighlight: "Say About Divanex",
      description:
        "Read verified feedback from tech founders, startup executives, and enterprise decision-makers across the United States, United Kingdom, UAE, and India who built and scaled their software with Divanex.",
      statusText: "CLIENT SATISFACTION // 98.4 NPS SCORE",
      actionLabel: "Read Reviews",
      actionHref: "#reviews",
      stats: [
        s("tm-1", "Overall Rating", "4.9 / 5", "Based on 50+ Client Reviews", "Star", "amber"),
        s("tm-2", "Net Promoter Score", "98.4", "Industry Leading Customer Loyalty", "MessageSquareQuote", "cyan"),
        s("tm-3", "Global Reach", "15+ Nations", "US, UK, UAE, India & Europe", "Globe", "blue"),
        s("tm-4", "On-Time Milestone SLA", "99.2%", "Sprint Delivery Assurance", "ShieldCheck", "emerald"),
      ],
    },
    "/faqs": {
      badge: "FREQUENTLY ASKED QUESTIONS // TRANSPARENT CLARITY",
      badgeIcon: "HelpCircle",
      breadcrumbLabel: "FAQs",
      title: "Everything You Need to Know About",
      titleHighlight: "Partnering With Divanex",
      description:
        "Clear, transparent answers regarding milestone-based pricing, 100% intellectual property ownership, 2-week sprint cadences, SLA guarantees, and ongoing technical maintenance.",
      statusText: "KNOWLEDGE BASE // TRANSPARENT POLICIES",
      actionLabel: "Read FAQs",
      actionHref: "#faqs",
      stats: [
        s("fq-1", "Support Availability", "24/7/365", "Global Engineer Coverage", "Clock", "emerald"),
        s("fq-2", "Response Window", "< 15 Mins", "WhatsApp Business & Slack", "HelpCircle", "cyan"),
        s("fq-3", "IP Transfer Policy", "100%", "Zero Vendor Lock-In", "FileCheck", "blue"),
        s("fq-4", "Warranty Period", "30-Day", "Free Post-Launch Hypercare", "ShieldCheck", "amber"),
      ],
    },
    "/contact": {
      badge: "INITIATE YOUR SPRINT // 24-HOUR RESPONSE SLA",
      badgeIcon: "Mail",
      breadcrumbLabel: "Contact",
      title: "Let's Discuss Your Project &",
      titleHighlight: "Build High-Scale Software",
      description:
        "Submit a quick technical inquiry below to receive a comprehensive milestone proposal and investment breakdown within 24 hours, or connect directly on WhatsApp Business for immediate assistance.",
      statusText: "DIRECT CHANNELS // ARCHITECTS ONLINE",
      actionLabel: "Send an Inquiry",
      actionHref: "#contact-form",
      stats: [
        s("ct-1", "Proposal SLA", "< 24-Hours", "Detailed Milestone Breakdown", "Clock", "emerald"),
        s("ct-2", "WhatsApp Response", "< 15 Mins", "Direct Architect Connect", "MessageCircle", "cyan"),
        s("ct-3", "Confidentiality", "Strict NDA", "Immediate Mutual Execution", "ShieldCheck", "blue"),
        s("ct-4", "Timezone Coverage", "US / UK / UAE", "Full Global Overlap", "Mail", "amber"),
      ],
    },
    "/security": {
      badge: "ZERO-TRUST CYBERSECURITY // TRUST & COMPLIANCE CENTER",
      badgeIcon: "ShieldCheck",
      breadcrumbLabel: "Security",
      title: "Institutional Trust &",
      titleHighlight: "Cybersecurity Architecture",
      description:
        "At Divanex, security is not an afterthought—it is foundational. Explore our multi-layer perimeter defense, encryption protocols, regulatory compliance certifications, and Vulnerability Disclosure Program.",
      statusText: "INGRESS FIREWALL // ALL SYSTEMS NOMINAL & ARMED",
      actionLabel: "Report a Vulnerability",
      actionHref: "#vdp",
      stats: [
        s("se-1", "Zero-Trust Architecture", "SOC-2 Type II", "Institutional Compliance", "ShieldCheck", "emerald"),
        s("se-2", "Encryption Standard", "AES-256-GCM", "In-Transit TLS 1.3 & At-Rest", "Lock", "sky"),
        s("se-3", "Ingress Firewall", "Active", "Sliding-Window Rate Limiting", "Zap", "blue"),
        s("se-4", "Vulnerability Policy", "VDP / Bounty", "24-Hour Triage SLA", "KeyRound", "amber"),
      ],
    },
    "/blog": {
      badge: "ENGINEERING DISPATCHES // ARCHITECTURE & CASE STUDIES",
      badgeIcon: "BookOpen",
      breadcrumbLabel: "Blog",
      title: "Engineering Insights &",
      titleHighlight: "Architectural Blueprints",
      description:
        "Direct insights from our solutions architects: deep technical breakdowns on building multi-tenant SaaS platforms, hospital information systems (HMIS), double-entry core banking ledgers, modular ERPs, and autonomous AI agents.",
      statusText: "ENGINEERING BLOG // PRODUCTION KNOWLEDGE REPOSITORY",
      actionLabel: "Read Articles",
      actionHref: "#articles",
      stats: [
        // "{postCount}" is replaced with the live number of published posts.
        s("bl-1", "Technical Articles", "{postCount}+ Guides", "In-Depth Engineering Blueprints", "Code2", "sky"),
        s("bl-2", "Code & Architecture", "100%", "Production-Tested Snippets", "Terminal", "blue"),
        s("bl-3", "Monthly Readers", "45K+", "CTOs, Founders & Engineers", "BookOpen", "emerald"),
        s("bl-4", "Average Read Depth", "8.5 Min", "High Technical Rigor", "Sparkles", "amber"),
      ],
    },
  },

  partnersEyebrow:
    "Powering High-Growth Startups & Enterprise Workflows With Proven Tech Ecosystems",
  partners: [
    { id: "p-next", name: "Next.js 15", category: "Full-Stack Web", badge: "▲" },
    { id: "p-aws", name: "Amazon Web Services", category: "Cloud Infra", badge: "☁️" },
    { id: "p-openai", name: "OpenAI GPT-4o", category: "AI & LLM", badge: "🧠" },
    { id: "p-gcp", name: "Google Cloud", category: "Enterprise Cloud", badge: "🌐" },
    { id: "p-rn", name: "React Native", category: "Mobile Apps", badge: "📱" },
    { id: "p-fastapi", name: "Python FastAPI", category: "AI Backend", badge: "🐍" },
    { id: "p-docker", name: "Docker & K8s", category: "Containerization", badge: "🐳" },
    { id: "p-flutter", name: "Flutter", category: "Cross-Platform", badge: "🦋" },
    { id: "p-stripe", name: "Stripe & Razorpay", category: "Global Payments", badge: "💳" },
    { id: "p-tailwind", name: "Tailwind CSS", category: "Modern UI/UX", badge: "🎨" },
    { id: "p-postgres", name: "PostgreSQL", category: "Relational DB", badge: "🐘" },
    { id: "p-vercel", name: "Vercel Edge", category: "Serverless CDN", badge: "⚡" },
  ],

  statCounters: [
    {
      id: "sc-platforms",
      target: 50,
      suffix: "+",
      label: "Platforms Delivered",
      subtitle: "Enterprise SaaS, Mobile & AI Solutions",
      icon: "CheckCircle2",
      accent: "blue",
    },
    {
      id: "sc-satisfaction",
      target: 99,
      suffix: "%",
      label: "Client Satisfaction",
      subtitle: "SLA-Backed On-Time Milestone Delivery",
      icon: "HeartHandshake",
      accent: "sky",
    },
    {
      id: "sc-support",
      target: 24,
      suffix: "/7",
      label: "Dedicated Support",
      subtitle: "Live Monitoring & 99.999% Uptime SLA",
      icon: "ShieldCheck",
      accent: "emerald",
    },
    {
      id: "sc-countries",
      target: 15,
      suffix: "+",
      label: "Countries Served",
      subtitle: "US, UK, UAE, India & Europe",
      icon: "Globe",
      accent: "amber",
    },
  ],

  ctaBanner: {
    badge: "Zero Obligation // Rapid Onboarding",
    title: "Ready to Turn Your Vision into a",
    highlight: "Market-Leading Product?",
    subtitle:
      "Schedule a free technical architecture briefing with our engineering leads. No sales pitch, just actionable engineering strategy and a clear roadmap.",
    primaryLabel: "Discuss Project Cost",
    primaryHref: "/contact",
    secondaryLabel: "Book a Free Consultation",
    secondaryHref: "/contact",
  },
  ctaOverrides: {
    "/services": {
      title: "Need a Custom Architecture for Your",
      highlight: "Enterprise or Startup?",
      subtitle:
        "Talk directly with our solutions architect to map out technical specifications, database schema, infrastructure costs, and deployment milestones.",
    },
    "/why-us": {
      title: "Ready to Partner with an Engineering Team That",
      highlight: "Actually Delivers on Time?",
      subtitle:
        "Join 50+ scaling startups and global enterprises that rely on Divanex for mission-critical software engineering.",
    },
    "/process": {
      title: "Plan Your Project's Next Sprint with",
      highlight: "Our Senior Technical Leads",
      subtitle:
        "We analyze your product specifications, create a sprint backlog, and outline clear milestone dates before any contracts are signed.",
    },
    "/tech-stack": {
      title: "Have Specific Stack Requirements or",
      highlight: "Legacy Code to Migrate?",
      subtitle:
        "Whether you're starting a greenfield project or modernizing monolithic systems to microservices, our technical architects can guide your stack selection.",
    },
    "/portfolio": {
      title: "Want Results Like These for Your",
      highlight: "Own Digital Product?",
      subtitle:
        "Let's analyze your concept, study market feasibility, and engineer an MVP or enterprise release engineered for rapid customer acquisition.",
    },
    "/testimonials": {
      title: "Ready to Build a High-Performance",
      highlight: "Success Story of Your Own?",
      subtitle:
        "Join dozens of thriving businesses that scaled their technical infrastructure with Divanex's engineering standards.",
    },
    "/faqs": {
      title: "Still Have Questions About",
      highlight: "Your Specific Architecture?",
      subtitle:
        "Speak directly with our technical leads on WhatsApp or book a free 30-minute discovery call to discuss your exact project requirements.",
    },
    "/contact": {
      title: "Prefer a Direct Face-to-Face Technical Briefing?",
      highlight: "Schedule a Discovery Call",
      subtitle:
        "Select a convenient time on our calendar to discuss system requirements, tech stack selection, and milestone dates directly with our senior architect.",
    },
  },

  whyUsHeading: {
    eyebrow: "ADVANTAGE ENGINE // ENTERPRISE ASSURANCE",
    title: "Engineered for Velocity.",
    highlight: "Zero Compromise.",
    description:
      "Traditional agencies move slow and lock you in. Fragmented freelancers lack architectural rigor. We give you a dedicated high-caliber engineering team with 100% code ownership.",
  },
  whyUsPillars: whyChoosePillars,
  whyUsComparison: comparisonData,
  comparisonHeading: {
    eyebrow: "MARKET BENCHMARK AUDIT",
    title: "The Divanex Standard vs. The Legacy Market",
    highlight: "",
    description:
      "Compare engineering velocity, code ownership, transparency, and architectural quality head-to-head.",
  },
  comparisonColumns: {
    feature: "Evaluation Vector",
    divanex: "Divanex (Modern Standard)",
    traditional: "Traditional Agency",
    freelancers: "Freelancers / Gig Market",
  },
  processHeading: {
    eyebrow: "EXECUTION PIPELINE // HYPER-LOOP PROTOCOL",
    title: "How We Take You From",
    highlight: "Brief to Production",
    description:
      "A fixed, auditable sequence. Every phase ends in something you can open, run and sign off.",
  },
  processSteps,
  faqs: faqsData,
  faqHeading: {
    eyebrow: "FREQUENTLY ASKED",
    title: "Answers Before You",
    highlight: "Have to Ask",
    description:
      "Pricing, ownership, cadence and support — the questions every serious buyer asks, answered plainly.",
  },

  engagementModels: [
    {
      id: "em-fixed",
      badge: "MOST POPULAR FOR STARTUPS",
      title: "Fixed-Price Milestone Sprint",
      tagline: "Predictable Budget & Guaranteed Delivery SLA",
      description:
        "Ideal for clear scopes, MVPs, and feature build-outs. Every sprint milestone is pre-defined with crystal clear deliverables and fixed payment milestones.",
      features: [
        "Guaranteed delivery SLA with clear milestone gates",
        "Bi-weekly interactive staging review & client demos",
        "100% intellectual property & code transfer",
        "30-day post-launch hypercare & bug-free guarantee",
      ],
      ctaLabel: "Discuss Project Scope",
      ctaHref: "/contact",
      accent: "sky",
    },
    {
      id: "em-pod",
      badge: "ENTERPRISE FAVORITE",
      title: "Dedicated Engineering Pod",
      tagline: "Full-Stack Senior Talent Embedded in Your Workflow",
      description:
        "A dedicated team of senior engineers, system architects, and QA specialists dedicated exclusively to scaling your product roadmap continuously.",
      features: [
        "Senior engineers, UI/UX designers & DevOps leads",
        "Direct Slack, Linear, and daily standup integration",
        "Flexible scaling: expand or contract team as needed",
        "Continuous CI/CD deployment to production",
      ],
      ctaLabel: "Book Pod Briefing",
      ctaHref: "/contact",
      accent: "blue",
    },
    {
      id: "em-cto",
      badge: "STRATEGIC ADVISORY",
      title: "Fractional CTO & Architecture",
      tagline: "Senior Technical Leadership Without the Headcount",
      description:
        "Architecture reviews, technology selection, hiring support and delivery governance from a principal engineer embedded part-time in your leadership team.",
      features: [
        "System architecture and scalability reviews",
        "Technology selection and build-versus-buy analysis",
        "Engineering hiring scorecards and interview support",
        "Quarterly technical roadmap and risk register",
      ],
      ctaLabel: "Discuss Advisory",
      ctaHref: "/contact",
      accent: "emerald",
    },
  ],
  engagementHeading: {
    eyebrow: "ENGAGEMENT MODELS",
    title: "Three Ways to",
    highlight: "Work With Us",
    description:
      "Fixed scope, embedded pod, or fractional leadership — chosen by how your work actually arrives.",
  },

  securityPillars: [
    {
      id: "sp-ip",
      icon: "ShieldCheck",
      title: "100% IP & Code Ownership",
      subtitle: "Full Intellectual Property Transfer",
      description:
        "You own every single line of code, design asset, database schema, and deployment script upon milestone completion. Zero vendor lock-in, forever.",
      accent: "emerald",
    },
    {
      id: "sp-soc2",
      icon: "Lock",
      title: "SOC2 & GDPR Compliance",
      subtitle: "Enterprise Regulatory Adherence",
      description:
        "Architectures engineered with role-based access controls (RBAC), end-to-end TLS 1.3 encryption, and compliance-ready data audit logging.",
      accent: "sky",
    },
    {
      id: "sp-zerotrust",
      icon: "Key",
      title: "Zero-Trust Architecture",
      subtitle: "Least Privilege Isolation",
      description:
        "Microservices and multi-tenant databases communicate over private VPC networks with mTLS, secret rotation, and strict network perimeter firewalls.",
      accent: "blue",
    },
    {
      id: "sp-owasp",
      icon: "FileCheck",
      title: "OWASP Top 10 Hardened",
      subtitle: "Automated Penetration & Vulnerability Scans",
      description:
        "Every staging and production build passes continuous vulnerability scans, static code analysis, and SQL-injection/XSS penetration checks.",
      accent: "amber",
    },
  ],
  securityHeading: {
    eyebrow: "TRUST & COMPLIANCE",
    title: "Security Built In,",
    highlight: "Not Bolted On",
    description:
      "The controls below apply to every engagement by default — there is no premium security tier.",
  },

  cadenceSteps: [
    {
      id: "cs-1",
      num: "01",
      title: "Sprint Planning & Backlog Alignment",
      time: "Day 1 of Each Sprint",
      description:
        "Detailed user-story grooming, technical architecture sign-off, acceptance criteria definition, and story-point estimation.",
      icon: "Terminal",
      accent: "blue",
    },
    {
      id: "cs-2",
      num: "02",
      title: "Asynchronous Daily Telemetry Updates",
      time: "Daily at 10:00 AM UTC",
      description:
        "Clear daily progress reports delivered via Slack/Linear. You see PRs merged, blockers resolved, and features shipped every single day.",
      icon: "MessageSquare",
      accent: "sky",
    },
    {
      id: "cs-3",
      num: "03",
      title: "Automated Continuous Integration",
      time: "Continuous Per Commit",
      description:
        "Every commit runs through automated linting, unit test suites, TypeScript strict checking, and Dockerized staging deployments.",
      icon: "GitPullRequest",
      accent: "emerald",
    },
    {
      id: "cs-4",
      num: "04",
      title: "Live Staging Review & Client Demo",
      time: "End of Every 2 Weeks",
      description:
        "We jump on a 30-minute interactive live demo where you test the working software on a private staging URL before milestone release.",
      icon: "Laptop",
      accent: "amber",
    },
    {
      id: "cs-5",
      num: "05",
      title: "Milestone Sign-Off & Release",
      time: "Sprint Close",
      description:
        "Signed-off milestones are tagged, released to production behind feature flags, and billed — nothing is invoiced before you accept it.",
      icon: "CheckCircle2",
      accent: "violet",
    },
  ],
  cadenceHeading: {
    eyebrow: "SPRINT CADENCE",
    title: "What a Fortnight",
    highlight: "Actually Looks Like",
    description:
      "No status theatre. A fixed rhythm you can plan your own quarter around.",
  },
};

/** The routes whose headers the admin console can edit. */
export const HEADER_ROUTES = Object.keys(DEFAULT_PAGE_CONTENT.headers);

/**
 * Header for a route, falling back to the seed so a page never renders with an
 * empty heading if a record was saved before that route existed.
 */
export function pageHeader(content: PageContent, route: string): PageHeaderContent {
  return (
    content.headers?.[route] ??
    DEFAULT_PAGE_CONTENT.headers[route] ??
    DEFAULT_PAGE_CONTENT.headers["/services"]
  );
}
