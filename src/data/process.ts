export interface ProcessStep {
  stepNumber: string;
  title: string;
  hindiSummary: string;
  description: string;
  duration: string;
  deliverables: string[];
  color: string;
  /** Name from ICON_REGISTRY. Was a switch on the array index. */
  icon?: string;
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Discovery & Strategic Planning",
    hindiSummary: "Strategic Scope & Requirements",
    description:
      "We dissect your business goals, target user personas, technical constraints, and competitive landscape to engineer a high-velocity product blueprint, architectural diagram, and sprint milestones.",
    duration: "Week 1",
    deliverables: ["Product Requirements Document (PRD)", "System Architecture Diagram", "Sprint Timeline & Milestones"],
    color: "#3a5296",
    icon: "Layers",
  },
  {
    stepNumber: "02",
    title: "UI/UX Design & Systems Architecture",
    hindiSummary: "UX Blueprint & Design Tokens",
    description:
      "Crafting pixel-perfect, interactive Figma prototypes, defining custom design tokens, and locking in database schemas, microservice boundaries, and REST/GraphQL API specifications.",
    duration: "Week 2 - 3",
    deliverables: ["Interactive High-Fidelity Prototype", "Component Design System", "Database & API Schema Design"],
    color: "#189a91",
    icon: "Cpu",
  },
  {
    stepNumber: "03",
    title: "High-Velocity Development & AI Integration",
    hindiSummary: "Sprint Engineering & AI Pipeline",
    description:
      "Writing modular, type-safe code in structured 2-week agile sprints. We wire up custom AI pipelines, payment gateways, and backend endpoints with regular staging previews and demo videos.",
    duration: "Week 4 - 8",
    deliverables: ["Working Staging Environment", "Bi-weekly Demo Recordings", "Clean Modular Git Commits"],
    color: "#5c9556",
    icon: "Terminal",
  },
  {
    stepNumber: "04",
    title: "Security Audits & Quantum QA Testing",
    hindiSummary: "OWASP Security & Performance QA",
    description:
      "Rigorous end-to-end automated testing, OWASP Top 10 security audits, cross-browser compatibility checks, and Lighthouse performance tuning for sub-second Core Web Vitals.",
    duration: "Week 9",
    deliverables: ["Automated QA Test Suite", "Security & Pen-test Report", "Lighthouse 95+ Core Web Vitals"],
    color: "#5c9556",
    icon: "ShieldCheck",
  },
  {
    stepNumber: "05",
    title: "Zero-Downtime Launch & Continuous Growth",
    hindiSummary: "Global Launch & Autonomous Scaling",
    description:
      "Production deployment to serverless edge and multi-region cloud clusters, complete DNS configuration, programmatic search engine indexing, and 24/7 post-launch monitoring.",
    duration: "Week 10 & Beyond",
    deliverables: ["Production Live Deployment", "100% Code & IP Transfer", "24/7 Monitoring & Growth Strategy"],
    color: "#5c9556",
    icon: "Rocket",
  }
];
