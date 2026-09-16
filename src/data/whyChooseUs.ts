export interface WhyPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  metrics: string;
  color: string;
}

export const whyChoosePillars: WhyPillar[] = [
  {
    id: "end-to-end",
    title: "Full-Cycle Digital Engineering",
    subtitle: "From Inception & Design to Scaled Cloud Deployment",
    description:
      "No more coordinating between disjointed design agencies, backend contractors, and marketing vendors. Divanex provides an elite cross-functional engineering squad that drives your product from concept to market leadership.",
    iconName: "Compass",
    badge: "Full Cycle Delivery",
    metrics: "1 Unified Partner",
    color: "#3a5296"
  },
  {
    id: "cutting-edge-tech",
    title: "Battle-Tested Modern Tech Stack",
    subtitle: "Engineered on Next.js 15, TypeScript, FastAPI & PyTorch",
    description:
      "We avoid brittle legacy systems. Everything we build leverages modern, high-concurrency frameworks (Next.js, React 19, TypeScript, Python FastAPI, PostgreSQL, Docker) ensuring sub-second response times and enterprise durability.",
    iconName: "Code2",
    badge: "Modern Architecture",
    metrics: "Sub-100ms Latency",
    color: "#189a91"
  },
  {
    id: "agile-fast",
    title: "High-Velocity Agile Sprints",
    subtitle: "Two-Week Sprints with Transparent Client Milestones",
    description:
      "Time-to-market is your greatest advantage. Our disciplined 2-week sprint cadence, transparent Git tracking, and weekly live demo milestones ensure your software launches on schedule with zero surprises.",
    iconName: "Zap",
    badge: "Sprint Velocity",
    metrics: "3x Faster Launch",
    color: "#5c9556"
  },
  {
    id: "dedicated-support",
    title: "Enterprise SLA & 24/7 Support",
    subtitle: "Direct Senior Architect Access & 99.999% Cloud Uptime",
    description:
      "We treat your platform with mission-critical diligence. Every engagement includes a dedicated solutions architect, proactive telemetry monitoring, automated security patches, and SLA-guaranteed support.",
    iconName: "ShieldCheck",
    badge: "Always-On Support",
    metrics: "99.999% SLA Uptime",
    color: "#5c9556"
  }
];

export interface ComparisonRow {
  feature: string;
  divanex: string;
  traditional: string;
  freelancers: string;
}

export const comparisonData: ComparisonRow[] = [
  {
    feature: "Development Velocity",
    divanex: "Rapid 2-week agile sprints with working staging builds",
    traditional: "Slow, quarterly release cycles and lengthy delays",
    freelancers: "Unpredictable hours & inconsistent timelines"
  },
  {
    feature: "Modern AI & Tech Stack",
    divanex: "Native LLM integration, Next.js 15 SSR, Serverless Edge",
    traditional: "Legacy PHP, slow WordPress or rigid monoliths",
    freelancers: "Limited to individual skillsets without peer review"
  },
  {
    feature: "Ownership of Code & IP",
    divanex: "100% Client Ownership on Day 1 (Full Git & Cloud Transfer)",
    traditional: "Complex licensing fees or proprietary agency locks",
    freelancers: "Hostage code or missing documentation risks"
  },
  {
    feature: "Ongoing Post-Launch SLA",
    divanex: "24/7 Monitoring & Dedicated Maintenance Squad",
    traditional: "Expensive retainer fees with slow ticket queues",
    freelancers: "Often unavailable or unresponsive after handover"
  }
];
