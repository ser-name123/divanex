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
    id: "senior-engineering-team",
    title: "Senior Engineering Team",
    subtitle: "Seasoned architects & full-stack leads on every project",
    description:
      "Every project is engineered directly by experienced developers who have shipped production systems at scale. Zero junior handoffs, zero outsourced code, and no learning curves on your budget.",
    iconName: "Award",
    badge: "Senior Engineers",
    metrics: "10+ Years Exp",
    color: "#0f7670"
  },
  {
    id: "source-code-ownership",
    title: "100% Source-Code & IP Ownership",
    subtitle: "Day-1 Git repository transfer & cloud infrastructure in your name",
    description:
      "You receive complete intellectual property rights, direct Git organization access, and cloud hosting accounts created in your name from day one. Zero vendor lock-in.",
    iconName: "ShieldCheck",
    badge: "100% IP Transfer",
    metrics: "Day-1 Rights",
    color: "#189a91"
  },
  {
    id: "direct-communication",
    title: "Direct Communication & Dedicated Pod",
    subtitle: "Direct Slack / Teams access with your core engineering pod",
    description:
      "Collaborate directly with the engineers writing your code in your private Slack/Teams channels. Fast feedback, transparent technical answers, and no non-technical middleman telephone games.",
    iconName: "Users",
    badge: "Dedicated Pod",
    metrics: "Direct Slack",
    color: "#0f7670"
  },
  {
    id: "weekly-staging-demos",
    title: "Weekly Staging & Demos",
    subtitle: "Clickable test environments & interactive video walkthroughs",
    description:
      "Every week you receive a live staging URL and video walkthrough of newly completed features. If anything needs adjustment, we catch and refine it immediately.",
    iconName: "Zap",
    badge: "Visible Progress",
    metrics: "Weekly Demos",
    color: "#5c9556"
  },
  {
    id: "nda-ip-protection",
    title: "NDA & IP Protection",
    subtitle: "Legally binding non-disclosure & strict security compliance",
    description:
      "We execute comprehensive bilateral NDAs, enforce strict client data isolation, and follow standard OWASP Top 10 and ISO 27001 security benchmarks across all production environments.",
    iconName: "Lock",
    badge: "Legally Binding",
    metrics: "Strict NDA",
    color: "#000838"
  },
  {
    id: "post-launch-support",
    title: "Post-Launch Support & Hypercare",
    subtitle: "24/7 uptime monitoring, security updates & fast bug fixes",
    description:
      "We stand behind our code after launch. You get dedicated hypercare, continuous uptime monitoring, security patches, and rapid bug remediation when real users arrive.",
    iconName: "CheckCircle2",
    badge: "Guaranteed SLA",
    metrics: "Post-Launch",
    color: "#5c9556"
  },
  {
    id: "unified-stack",
    title: "Web + Mobile + AI Under One Team",
    subtitle: "Next.js, Flutter / React Native & AI RAG workflows in one pod",
    description:
      "No more coordinating separate agencies that blame each other. Web applications, iOS/Android mobile apps, and custom AI agents engineered together under one roof.",
    iconName: "Layers",
    badge: "Unified Stack",
    metrics: "Full-Stack Pod",
    color: "#0f7670"
  },
  {
    id: "modern-architecture",
    title: "Modern Architecture & Performance",
    subtitle: "Production Next.js 15, FastAPI, React Native & PostgreSQL",
    description:
      "We build exclusively with high-performance, maintainable frameworks designed for sub-second global latency, strict type-safety, and horizontal scalability.",
    iconName: "Cpu",
    badge: "Production Stack",
    metrics: "Sub-Second TTFB",
    color: "#189a91"
  },
  {
    id: "predictable-pricing",
    title: "Predictable Milestones & Transparent Pricing",
    subtitle: "Transparent fixed-sprint budgets with zero surprise fee traps",
    description:
      "Clear milestone deliverables, transparent pricing tiers, and payments tied directly to verified staging releases. No hidden change-order fees or runaway billing surprises.",
    iconName: "TrendingUp",
    badge: "Zero Surprises",
    metrics: "Milestone SLA",
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
    feature: "How often you see progress",
    divanex: "A working staging link and a walkthrough every two weeks",
    traditional: "Status decks for months, then a demo near the deadline",
    freelancers: "Depends entirely on the week and how busy they are"
  },
  {
    feature: "Who writes the code",
    divanex: "The senior engineers you met in the first call",
    traditional: "Whoever is on the bench, often juniors behind an account manager",
    freelancers: "One person, with nobody reviewing their work"
  },
  {
    feature: "Who owns it at the end",
    divanex: "You do, from day one — repository, cloud accounts and database",
    traditional: "Licensing terms and hosting you cannot easily leave",
    freelancers: "Usually yours, if the repository and credentials survive"
  },
  {
    feature: "What happens after launch",
    divanex: "Monitoring, security patches and direct access to the engineers",
    traditional: "A retainer and a ticket queue measured in days",
    freelancers: "Often gone, or busy with the next client"
  }
];
