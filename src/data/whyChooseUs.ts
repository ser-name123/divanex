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
    title: "One Team, Start to Finish",
    subtitle: "Design, backend, mobile and infrastructure under one roof",
    description:
      "You do not end up coordinating a design shop, a backend contractor and a DevOps freelancer who blame each other when something breaks. The same group that draws the screens writes the queries and runs the deployment.",
    iconName: "Compass",
    badge: "One accountable team",
    metrics: "No hand-offs",
    color: "#0f7670"
  },
  {
    id: "cutting-edge-tech",
    title: "Written, Not Assembled",
    subtitle: "No page builders, no bought themes, no plugin towers",
    description:
      "Everything is written for your problem, on stacks we can still support in three years. That is slower to start than dragging blocks around, and far cheaper the first time you need something the template never anticipated.",
    iconName: "Code2",
    badge: "Custom built",
    metrics: "Yours to change",
    color: "#189a91"
  },
  {
    id: "agile-fast",
    title: "You See It Every Two Weeks",
    subtitle: "A staging link you can click, not a status report",
    description:
      "Every fortnight there is a URL with the current build on it and a walkthrough from whoever built it. If the direction is wrong you find out in week two, not in month four when changing it is expensive.",
    iconName: "Zap",
    badge: "Visible progress",
    metrics: "Every 2 weeks",
    color: "#5c9556"
  },
  {
    id: "dedicated-support",
    title: "We Are Still Here After Launch",
    subtitle: "Monitoring, patches and a number that a person answers",
    description:
      "Launch is when the real bugs arrive. We watch the logs, apply security updates, and you message the engineers directly rather than opening a ticket and waiting to be triaged.",
    iconName: "ShieldCheck",
    badge: "Support that answers",
    metrics: "Direct to engineers",
    color: "#000838"
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
