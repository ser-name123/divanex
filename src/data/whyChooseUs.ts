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
    id: "engineering-experience",
    title: "10+ Years Engineering Experience",
    subtitle: "Senior full-stack, mobile & cloud architects leading every build",
    description:
      "Every project is engineered directly by seasoned developers who have shipped production systems at scale. No junior handoffs or learning curves on your budget.",
    iconName: "Award",
    badge: "Senior Engineers",
    metrics: "10+ Years Exp",
    color: "#0f7670"
  },
  {
    id: "source-code-ownership",
    title: "100% Source Code Ownership",
    subtitle: "Day-1 repository access & infrastructure in your name",
    description:
      "You receive 100% intellectual property transfer, full Git repository access, and cloud hosting accounts created in your name from day one. Zero vendor lock-in.",
    iconName: "ShieldCheck",
    badge: "100% IP Transfer",
    metrics: "Day-1 Rights",
    color: "#189a91"
  },
  {
    id: "dedicated-team",
    title: "Dedicated Development Team",
    subtitle: "Direct Slack communication with your core engineering pod",
    description:
      "A focused development squad dedicated exclusively to your sprints. You collaborate directly with the engineers writing your code, not non-technical account managers.",
    iconName: "UserCheck",
    badge: "Dedicated Pod",
    metrics: "Direct Slack",
    color: "#000838"
  },
  {
    id: "weekly-staging-demos",
    title: "Weekly Staging & Demos",
    subtitle: "Clickable test environments & interactive video walkthroughs",
    description:
      "Every week you receive a live staging URL and video walkthrough of newly completed features. If anything needs adjustment, we catch it immediately.",
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
      "We execute comprehensive bilateral NDAs, enforce strict client data isolation, and follow standard OWASP security benchmarks across all production environments.",
    iconName: "Lock",
    badge: "Legally Binding",
    metrics: "Strict NDA",
    color: "#0f7670"
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
    color: "#189a91"
  },
  {
    id: "web-mobile-ai-one-team",
    title: "Web + Mobile + AI Under One Team",
    subtitle: "Next.js, Flutter / React Native & AI RAG workflows in one pod",
    description:
      "No more coordinating separate agencies that blame each other. Web applications, iOS/Android mobile apps, and custom AI agents engineered under one roof.",
    iconName: "Layers",
    badge: "Unified Stack",
    metrics: "Web + Mobile + AI",
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
