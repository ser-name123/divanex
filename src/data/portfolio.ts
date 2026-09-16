export interface PortfolioProject {
  id: string;
  title: string;
  clientSubtitle: string;
  category: "Mobile App" | "Web Platform" | "SaaS" | "E-Commerce" | "Healthcare" | "AI" | "FinTech";
  serviceTags: string[];
  tagline: string;
  description: string;
  impactMetric: string;
  impactLabel: string;
  techStack: string[];
  gradient: string;
  imagePlaceholderColor: string;
  themeColor: string;
  badgeBg: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "fynito",
    title: "Fynito",
    clientSubtitle: "Food Delivery",
    category: "Mobile App",
    serviceTags: ["Mobile App", "Web Development", "UI/UX Design"],
    tagline: "Hyperlocal On-Demand Food Delivery Ecosystem & Real-Time Logistics",
    description:
      "Architected and engineered a high-concurrency food delivery platform featuring real-time rider dispatch algorithms, interactive live kitchen tracking, automated surge pricing, and sub-second multi-gateway checkout.",
    impactMetric: "10,000+",
    impactLabel: "Orders Processed with Zero Dispatch Lag",
    techStack: ["React Native", "Next.js 15", "Node.js", "Socket.io", "PostgreSQL", "Google Maps API", "Stripe"],
    gradient: "from-rose-500/20 via-pink-900/10 to-slate-900",
    imagePlaceholderColor: "bg-rose-500/20",
    themeColor: "#f43f5e",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "our-pg",
    title: "Our PG",
    clientSubtitle: "PG Management",
    category: "SaaS",
    serviceTags: ["Mobile App", "Web Development", "UI/UX Design"],
    tagline: "Smart PG, Hostel & Coliving Operations Platform with Automated Invoicing",
    description:
      "Developed a comprehensive cloud and mobile management suite for hostels and coliving properties, featuring automated rent invoicing, room/bed occupancy matrix, biometric check-in sync, and tenant ticketing.",
    impactMetric: "10,000+",
    impactLabel: "Beds Managed & Automated Rent Collection",
    techStack: ["Flutter", "Next.js 15", "Node.js", "PostgreSQL", "Razorpay AutoPay", "Tailwind CSS", "AWS S3"],
    gradient: "from-blue-500/20 via-indigo-900/10 to-slate-900",
    imagePlaceholderColor: "bg-blue-500/20",
    themeColor: "#3b82f6",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "sm-supermoda",
    title: "SM Supermoda",
    clientSubtitle: "Real Estate",
    category: "Web Platform",
    serviceTags: ["Web Development", "UI/UX Design"],
    tagline: "Luxury Real Estate Portal, Off-Plan Developments & 3D Interactive Floor Explorer",
    description:
      "Engineered an ultra-premium real estate discovery platform featuring dynamic off-plan property showcases, interactive 3D architectural views, high-resolution photo galleries, and instant high-intent broker lead routing.",
    impactMetric: "3.2x",
    impactLabel: "Increase in High-Intent Property Leads",
    techStack: ["Next.js 15", "TypeScript", "Three.js / WebGL", "Tailwind CSS", "Sanity CMS", "Algolia"],
    gradient: "from-emerald-500/20 via-teal-900/10 to-slate-900",
    imagePlaceholderColor: "bg-emerald-500/20",
    themeColor: "#10b981",
    badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "evtor",
    title: "Evtor",
    clientSubtitle: "EV vehicles",
    category: "Mobile App",
    serviceTags: ["Mobile App", "Web Development", "UI/UX Design"],
    tagline: "Smart EV Charging Station Network, Telemetry HUD & Instant QR Charging App",
    description:
      "Constructed a connected EV infrastructure platform supporting live charger availability telemetry, OCPP 2.0.1 smart station synchronization, automated slot booking, dynamic tariffs, and in-app wallet payments.",
    impactMetric: "500+",
    impactLabel: "Active EV Chargers with Live Telemetry",
    techStack: ["React Native", "Next.js 15", "OCPP 2.0.1", "TimescaleDB", "MQTT Broker", "Tailwind CSS", "Redis"],
    gradient: "from-green-500/20 via-emerald-900/10 to-slate-900",
    imagePlaceholderColor: "bg-green-500/20",
    themeColor: "#22c55e",
    badgeBg: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: "magnus-partners",
    title: "Magnus Partners",
    clientSubtitle: "Magnus",
    category: "Healthcare",
    serviceTags: ["Web Development", "UI/UX Design"],
    tagline: "Enterprise Healthcare Collaboration & Clinical Partnership Network",
    description:
      "Built a HIPAA-compliant medical collaboration platform connecting healthcare institutions, pharmaceutical researchers, and clinical providers with secure case sharing, diagnostic directory, and telehealth sync.",
    impactMetric: "50+",
    impactLabel: "Partner Healthcare Clinics Synced",
    techStack: ["Next.js 15", "TypeScript", "Python FastAPI", "HL7 FHIR v4", "PostgreSQL RLS", "AWS CloudFront"],
    gradient: "from-cyan-500/20 via-blue-900/10 to-slate-900",
    imagePlaceholderColor: "bg-cyan-500/20",
    themeColor: "#06b6d4",
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200"
  },
  {
    id: "parana-tool",
    title: "Parana Tool",
    clientSubtitle: "Parana Tool",
    category: "Web Platform",
    serviceTags: ["Web Development", "UI/UX Design"],
    tagline: "Industrial Tooling Catalog, CNC Component Configurator & B2B Inquiry Portal",
    description:
      "Engineered an industrial tool catalog and engineering component configurator for B2B precision tooling buyers with dynamic technical datasheets and instant quote calculation.",
    impactMetric: "40%",
    impactLabel: "Reduction in Engineering Quote Turnaround Time",
    techStack: ["Next.js 15", "React Native", "Node.js", "PostgreSQL", "Redis", "Algolia", "Stripe API"],
    gradient: "from-amber-500/20 via-orange-900/10 to-slate-900",
    imagePlaceholderColor: "bg-amber-500/20",
    themeColor: "#f59e0b",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200"
  }
];
