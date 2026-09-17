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
    name: "Vikram M.",
    role: "Co-Founder & COO",
    company: "Fynito Technologies",
    country: "India / Singapore",
    avatarText: "VM",
    avatarBg: "bg-blue-600",
    rating: 5,
    headline: "Delivered our food delivery & rider dispatch platform ahead of schedule.",
    quote: "Bharat and the Divanex team delivered our on-demand platform exactly as specified. From rider GPS telemetry to automated merchant order dispatch, they handled every sprint milestone with exceptional transparency and clean code documentation.",
    projectType: "Mobile & Web App",
    projectName: "Hyperlocal Food Delivery & Live Telemetry Engine",
    platform: "Upwork",
    platformBadge: "Upwork Verified Contract (5.0 ★)",
    metricsAchieved: "Shipped Ahead of Milestone Schedule",
    verifiedBadge: "Upwork Verified Hire"
  },
  {
    id: "2",
    name: "Rajesh K.",
    role: "Managing Director",
    company: "OurPG Coliving Spaces",
    country: "India (Jaipur / Bangalore)",
    avatarText: "RK",
    avatarBg: "bg-indigo-600",
    rating: 5,
    headline: "Automated monthly rent invoicing and visual bed occupancy grid.",
    quote: "Our PG completely streamlined our operations. The visual bed matrix eliminated room allocation confusion, and automated WhatsApp AutoPay reminders dramatically reduced payment follow-up overhead. Delivered with complete code ownership.",
    projectType: "Enterprise SaaS",
    projectName: "Multi-Property Coliving OS & AutoPay Invoicing",
    platform: "Direct Client",
    platformBadge: "Direct Client (5.0 ★)",
    metricsAchieved: "Automated Invoicing & Zero Double Bookings",
    verifiedBadge: "Verified Client"
  },
  {
    id: "3",
    name: "Sameer M.",
    role: "Founder & CEO",
    company: "SM Supermoda Real Estate",
    country: "UAE / India",
    avatarText: "SM",
    avatarBg: "bg-teal-600",
    rating: 5,
    headline: "Ultra-fast luxury real estate portal with interactive 3D unit explorer.",
    quote: "The portal Divanex created for SM Supermoda looks stunning and performs effortlessly. Buyers frequently compliment the 3D floor explorer, and our lead conversion from high-intent campaigns has improved markedly.",
    projectType: "E-Commerce & Headless",
    projectName: "Luxury Real Estate 3D Off-Plan Portal",
    platform: "Direct Client",
    platformBadge: "Direct Contract (5.0 ★)",
    metricsAchieved: "Sub-Second Global TTFB & 3D WebGL",
    verifiedBadge: "Verified Client"
  },
  {
    id: "4",
    name: "Ananya S.",
    role: "Chief Technology Officer",
    company: "Evtor Mobility Solutions",
    country: "India / UAE",
    avatarText: "AS",
    avatarBg: "bg-emerald-600",
    rating: 5,
    headline: "OCPP 2.0.1 smart telemetry gateway and sub-3s QR charging app.",
    quote: "We hired Divanex to build our connected EV charging platform. The architecture handles live charger telemetry over WebSockets and provides drivers with instant QR scan-to-charge flow. Highly dependable engineering team with great work ethic.",
    projectType: "AI Automation",
    projectName: "OCPP 2.0.1 EV Telemetry & Driver Mobile App",
    platform: "Direct Client",
    platformBadge: "Direct Contract (5.0 ★)",
    metricsAchieved: "Sub-3s QR Charge Initiation",
    verifiedBadge: "Verified Client"
  },
  {
    id: "5",
    name: "Dr. Alistair V.",
    role: "Medical Director",
    company: "Magnus Healthcare Partners",
    country: "United States",
    avatarText: "AV",
    avatarBg: "bg-sky-600",
    rating: 5,
    headline: "HIPAA-ready clinical collaboration portal with seamless EHR workflows.",
    quote: "The Divanex team took our clinical workflows and engineered a secure, HIPAA-compliant collaboration portal with DICOM scan viewing and doctor telehealth sync. Communication was prompt, and weekly staging demos kept our stakeholders aligned.",
    projectType: "Healthcare HMIS",
    projectName: "Clinical Case Sharing & Telehealth Portal",
    platform: "Direct Client",
    platformBadge: "Direct Contract (5.0 ★)",
    metricsAchieved: "HIPAA-Ready Architecture & EHR Interoperability",
    verifiedBadge: "Verified Client"
  },
  {
    id: "6",
    name: "Carlos P.",
    role: "Managing Director",
    company: "Parana Tooling Technologies",
    country: "International / India",
    avatarText: "CP",
    avatarBg: "bg-amber-600",
    rating: 5,
    headline: "High-speed parametric tool catalog with instant B2B RFQ quoting.",
    quote: "Divanex revolutionized how we present precision tooling to B2B buyers. Machinists can now search parametric specifications in milliseconds, download verified 3D STEP CAD models, and generate volume quote PDFs in seconds.",
    projectType: "Supply Chain ERP",
    projectName: "Industrial B2B Catalog & Instant RFQ Engine",
    platform: "Direct Client",
    platformBadge: "Direct Client (5.0 ★)",
    metricsAchieved: "Instant B2B Quotes & CAD STEP Vault",
    verifiedBadge: "Verified Client"
  },
  {
    id: "7",
    name: "Sarah J.",
    role: "Product Founder",
    company: "Mobile App Startup",
    country: "United States (California)",
    avatarText: "SJ",
    avatarBg: "bg-cyan-600",
    rating: 5,
    headline: "Apple App Store and Google Play approval on the first submission.",
    quote: "Bharat and the Divanex team built our mobile app for both iOS and Android. Smooth 60fps animations, payment gateway integration, and biometric login. Approved on the Apple App Store and Google Play on the very first attempt.",
    projectType: "Mobile & Web App",
    projectName: "React Native Cross-Platform Mobile Application",
    platform: "Upwork",
    platformBadge: "Upwork Top Rated (5.0 ★)",
    metricsAchieved: "First-Attempt App Store Approval",
    verifiedBadge: "Upwork 100% Job Success"
  },
  {
    id: "8",
    name: "Natasha R.",
    role: "Head of Engineering",
    company: "FinTech Platform Client",
    country: "United Kingdom (London)",
    avatarText: "NR",
    avatarBg: "bg-emerald-700",
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
    id: "9",
    name: "David S.",
    role: "VP of Engineering",
    company: "Financial Analytics Client",
    country: "United States (New York)",
    avatarText: "DS",
    avatarBg: "bg-blue-800",
    rating: 5,
    headline: "Flawless communication, clean TypeScript code, and bi-weekly demos.",
    quote: "Divanex rebuilt our financial analytics dashboard using Next.js Server Components and WebSockets. The UI is ultra-responsive and their bi-weekly staging demos made tracking sprint deliverables completely transparent.",
    projectType: "Fintech Web Platform",
    projectName: "Real-Time Financial Analytics Dashboard",
    platform: "Upwork",
    platformBadge: "Upwork Top Rated (5.0 ★)",
    metricsAchieved: "Sub-100ms Perceived UI Latency",
    verifiedBadge: "Upwork Verified Hire"
  },
  {
    id: "10",
    name: "Siddharth V.",
    role: "Co-Founder & CTO",
    company: "Restaurant POS SaaS Client",
    country: "India (Delhi NCR)",
    avatarText: "SV",
    avatarBg: "bg-sky-800",
    rating: 5,
    headline: "Offline-first sync engine that never misses a bill or kitchen ticket.",
    quote: "Internet connectivity in busy restaurant food courts can be spotty. Divanex built an offline-first SQLite sync engine that takes orders instantly offline and syncs with cloud ledgers as soon as network returns. Solid engineering.",
    projectType: "Enterprise SaaS",
    projectName: "Offline-First Cloud Restaurant POS",
    platform: "Freelancer",
    platformBadge: "Freelancer.com Verified (5.0 ★)",
    metricsAchieved: "100% Offline-First Transaction Durability",
    verifiedBadge: "Verified Contract"
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
