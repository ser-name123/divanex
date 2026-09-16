export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  headline: string;
  quote: string;
  projectType: "Enterprise SaaS" | "Healthcare HMIS" | "Fintech Web Platform" | "AI Automation" | "Supply Chain ERP" | "Mobile & Web App" | "E-Commerce & Headless" | "Cloud & DevOps";
  projectName?: string;
  platform?: "Upwork" | "Freelancer" | "Clutch" | "Direct Client";
  platformBadge?: string;
  metricsAchieved: string;
  verifiedBadge: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Vikram Malhotra",
    role: "Chief Technology Officer",
    company: "SaaSify Global",
    country: "India / Singapore",
    avatarText: "VM",
    avatarBg: "bg-blue-600",
    rating: 5,
    headline: "Delivered our multi-tenant SaaS MVP 3 weeks ahead of schedule.",
    quote: "Bharat and his team delivered our multi-tenant SaaS platform exactly as required. From tenant database isolation to Stripe billing and edge routing, they handled every single sprint milestone with exceptional transparency. Shipped 3 weeks ahead of schedule with clean documentation.",
    projectType: "Enterprise SaaS",
    projectName: "B2B Multi-Tenant SaaS Platform (Next.js + Stripe)",
    platform: "Upwork",
    platformBadge: "Upwork Top Rated (5.0 ★)",
    metricsAchieved: "Delivered 3 Weeks Ahead of Schedule",
    verifiedBadge: "Upwork Verified Hire"
  },
  {
    id: "2",
    name: "Dr. Michael Vance",
    role: "VP of Health Informatics",
    company: "MedVantage Health",
    country: "United States (Boston)",
    avatarText: "MV",
    avatarBg: "bg-sky-600",
    rating: 5,
    headline: "Seamless clinic workflow portal with digital prescription & billing.",
    quote: "Bharat's team took our clinical workflows and turned them into a HIPAA-compliant management portal with digital prescriptions, OPD queues, and automated pharmacy stock. Communication was prompt, and weekly sprint demos kept us 100% aligned.",
    projectType: "Healthcare HMIS",
    projectName: "Clinical HMIS & Doctor/Patient Web Portal",
    platform: "Direct Client",
    platformBadge: "Direct Contract (5.0 ★)",
    metricsAchieved: "Complete Clinic Workflow Digitization",
    verifiedBadge: "Verified Client"
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    role: "Founder & CEO",
    company: "AuraHealth Tech",
    country: "United States (San Francisco)",
    avatarText: "SJ",
    avatarBg: "bg-cyan-600",
    rating: 5,
    headline: "App Store approval on the first attempt with zero rejections.",
    quote: "Bharat and the Divanex team built our mobile app for both iOS and Android. Smooth 60fps animations, payment gateway integration, and biometric login. Approved on the Apple App Store and Google Play on the very first attempt.",
    projectType: "Mobile & Web App",
    projectName: "Cross-Platform React Native iOS & Android App",
    platform: "Upwork",
    platformBadge: "Upwork Top Rated (5.0 ★)",
    metricsAchieved: "First-Attempt App Store Approval",
    verifiedBadge: "Upwork 100% Job Success"
  },
  {
    id: "4",
    name: "Natasha Rostova",
    role: "Head of Product Engineering",
    company: "PaySphere Digital",
    country: "United Kingdom (London)",
    avatarText: "NR",
    avatarBg: "bg-emerald-600",
    rating: 5,
    headline: "Engineered a strict double-entry ledger with zero reconciliation errors.",
    quote: "In financial workflows, there is zero room for race conditions. Bharat and his team engineered a strict double-entry ledger with automated audit trails and multi-gateway switches. Flawless execution and zero reconciliation discrepancies in production.",
    projectType: "Fintech Web Platform",
    projectName: "Double-Entry Payment Reconciliation Engine",
    platform: "Freelancer",
    platformBadge: "Freelancer.com Preferred (5.0 ★)",
    metricsAchieved: "Zero Reconciliation Discrepancies",
    verifiedBadge: "Verified Contract"
  },
  {
    id: "5",
    name: "Arjun Mehta",
    role: "Head of Operations & Logistics",
    company: "Quantix Logistics",
    country: "UAE (Dubai)",
    avatarText: "AM",
    avatarBg: "bg-indigo-600",
    rating: 5,
    headline: "Real-time fleet tracking dashboard with sub-second WebSocket updates.",
    quote: "We hired Bharat to build our real-time logistics telematics dashboard. The architecture handles live fleet tracking with smooth map rendering and sub-second WebSocket updates. Highly dependable engineering team with great work ethic.",
    projectType: "AI Automation",
    projectName: "Real-Time Fleet Telematics & GPS Routing Portal",
    platform: "Upwork",
    platformBadge: "Upwork Verified (5.0 ★)",
    metricsAchieved: "Sub-Second Live Telemetry Sync",
    verifiedBadge: "Upwork Verified Hire"
  },
  {
    id: "6",
    name: "Rajesh Parana",
    role: "Director of Operations",
    company: "Parana Tool & Automation",
    country: "India (Gujarat)",
    avatarText: "RP",
    avatarBg: "bg-purple-600",
    rating: 5,
    headline: "Digitized 45,000+ tool catalog with automated GST billing.",
    quote: "Bharat and the Divanex team rebuilt our legacy inventory into a custom modular ERP with automated GST billing, CAD drawing previews, and barcode scanning. We eliminated hours of daily manual paperwork.",
    projectType: "Supply Chain ERP",
    projectName: "Industrial B2B Catalog & Inventory ERP",
    platform: "Direct Client",
    platformBadge: "Direct Client (5.0 ★)",
    metricsAchieved: "45,000+ SKU Indexing & GST Automation",
    verifiedBadge: "Verified Client"
  },
  {
    id: "7",
    name: "David Sterling",
    role: "VP of Engineering",
    company: "ApexTrade Capital",
    country: "United States (New York)",
    avatarText: "DS",
    avatarBg: "bg-blue-700",
    rating: 5,
    headline: "Flawless communication, clean code, and weekly interactive demos.",
    quote: "Divanex rebuilt our financial analytics dashboard using Next.js Server Components and WebSockets. The UI is ultra-responsive and their bi-weekly staging demos made tracking milestones effortless.",
    projectType: "Fintech Web Platform",
    projectName: "Real-Time Financial Analytics Terminal",
    platform: "Clutch",
    platformBadge: "Clutch Verified 5.0 ★",
    metricsAchieved: "Sub-100ms Perceived UI Response",
    verifiedBadge: "Clutch Verified Review"
  },
  {
    id: "8",
    name: "Elena Rostova",
    role: "Director of Digital Commerce",
    company: "Zenith Retail Global",
    country: "Germany (Berlin)",
    avatarText: "ER",
    avatarBg: "bg-pink-600",
    rating: 5,
    headline: "Modern headless storefront boosted our mobile checkout speed.",
    quote: "Bharat's team migrated us from a slow legacy store to a high-speed decoupled Next.js storefront. Page loads are instant, checkout abandonment dropped significantly, and the code is structured cleanly.",
    projectType: "E-Commerce & Headless",
    projectName: "Headless Next.js Multi-Language Storefront",
    platform: "Freelancer",
    platformBadge: "Freelancer.com Top Rated (5.0 ★)",
    metricsAchieved: "2.5x Faster Mobile Page Load",
    verifiedBadge: "Verified Client"
  },
  {
    id: "9",
    name: "Siddharth Verma",
    role: "Co-Founder & CTO",
    company: "OrderFast POS",
    country: "India (Delhi NCR)",
    avatarText: "SV",
    avatarBg: "bg-sky-800",
    rating: 5,
    headline: "Offline-first sync engine that never misses a bill or kitchen ticket.",
    quote: "Internet connectivity in busy restaurant food courts can be spotty. Divanex built a local SQLite sync engine that takes orders instantly offline and syncs with cloud ledgers as soon as network returns. Solid engineering.",
    projectType: "Enterprise SaaS",
    projectName: "Offline-First Cloud Restaurant POS",
    platform: "Direct Client",
    platformBadge: "Direct Client (5.0 ★)",
    metricsAchieved: "100% Offline-First Transaction Durability",
    verifiedBadge: "Verified Client"
  },
  {
    id: "10",
    name: "Claire Fontaine",
    role: "Head of Product",
    company: "Verde Living B2B",
    country: "Belgium (Brussels)",
    avatarText: "CF",
    avatarBg: "bg-emerald-700",
    rating: 5,
    headline: "Custom wholesale portal with tier pricing and automated invoices.",
    quote: "Divanex built our wholesale furniture e-commerce portal connecting our ERP with a modern Next.js interface. Retailers now place bulk orders online with personalized negotiated tier discounts seamlessly.",
    projectType: "E-Commerce & Headless",
    projectName: "B2B Wholesale Portal & Contract Pricing",
    platform: "Direct Client",
    platformBadge: "Direct Contract (5.0 ★)",
    metricsAchieved: "Seamless B2B Tier Pricing & ERP Sync",
    verifiedBadge: "Verified Client"
  }
];

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    question: "What does a project actually cost?",
    answer:
      "It depends on scope, but we quote a fixed price per milestone rather than an open hourly meter, so you always know the number before work starts. Smaller products usually land in the low tens of lakhs; a full ERP or hospital system is more. Send us a short brief and you will get a real figure, not a vague range.",
    category: "Pricing"
  },
  {
    id: "faq-2",
    question: "Who owns the code when we are done?",
    answer:
      "You do, and not only at the end — the repository is in your organisation from the first week, and the cloud accounts are in your name. If you decided tomorrow to continue with another team, you could hand them everything without asking us for anything.",
    category: "Ownership"
  },
  {
    id: "faq-3",
    question: "How long does it take?",
    answer:
      "A first usable version is typically six to ten weeks. Larger platforms run three to six months. The plan we agree in week one has dates on it, and you can check progress against them yourself every fortnight instead of taking our word for it.",
    category: "Timelines"
  },
  {
    id: "faq-4",
    question: "What if we want to change something halfway through?",
    answer:
      "That is expected, and the two-week cycle exists partly for this. Swapping something out of an upcoming block costs nothing. Adding genuinely new scope changes the price, and we will say so plainly at the time rather than absorbing it quietly and running late.",
    category: "Process"
  },
  {
    id: "faq-5",
    question: "What happens if you miss a deadline?",
    answer:
      "You will know before the date, not after it, because you are watching the same staging builds we are. If the delay is ours we absorb the cost of catching up. If it came from a change in scope or a decision we are waiting on, we will have flagged that in writing when it happened.",
    category: "Process"
  },
  {
    id: "faq-6",
    question: "Who do we talk to after launch?",
    answer:
      "The engineers who built it. There is no ticket queue between you and them. For the first month after going live we watch the system closely, and after that most clients keep a small monthly arrangement for monitoring, security updates and small changes.",
    category: "Support"
  }
];
