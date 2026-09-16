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
    title: "Working Out What You Actually Need",
    hindiSummary: "Scope, data model and a fixed plan",
    description:
      "We go through how your business really operates, where the volume will come from, and what must never break. Out of that comes a system design, a database model and a milestone plan with dates on it.",
    duration: "Week 1",
    deliverables: ["System design document", "Database and API structure", "Agreed milestones and dates"],
    color: "#0f7670",
    icon: "Layers",
  },
  {
    stepNumber: "02",
    title: "Designing the Screens Before Building Them",
    hindiSummary: "Clickable prototype you can react to",
    description:
      "You get a prototype you can actually click through, with the real navigation and the real states. Changing a screen here takes an afternoon. Changing it after it is built takes a week.",
    duration: "Week 2 - 3",
    deliverables: ["Clickable prototype", "Reusable component library", "Signed-off screen flows"],
    color: "#189a91",
    icon: "Cpu",
  },
  {
    stepNumber: "03",
    title: "Building It, Two Weeks at a Time",
    hindiSummary: "Staging builds and fortnightly walkthroughs",
    description:
      "The build runs in two-week blocks. At the end of each one there is a staging link with the new work on it, and a short walkthrough from the engineer who built it, so nothing drifts quietly off course.",
    duration: "Week 4 - 8",
    deliverables: ["Staging build every two weeks", "Recorded walkthrough of each release", "Readable, reviewed commits"],
    color: "#5c9556",
    icon: "Terminal",
  },
  {
    stepNumber: "04",
    title: "Trying to Break It Before Your Users Do",
    hindiSummary: "Security review, load testing and fixes",
    description:
      "Automated tests across the main journeys, a pass over the common attack routes, and load testing at a few multiples of the traffic you expect. Whatever that turns up gets fixed before launch, not after.",
    duration: "Week 9",
    deliverables: ["Security review and fixes", "Automated test suite", "Performance results under load"],
    color: "#5c9556",
    icon: "ShieldCheck",
  },
  {
    stepNumber: "05",
    title: "Going Live and Handing You the Keys",
    hindiSummary: "Launch, handover and support",
    description:
      "We put it live, move DNS and certificates across, and transfer the repository and cloud accounts into your name. Then we watch it closely for the first month while the real traffic arrives.",
    duration: "Week 10 and after",
    deliverables: ["Production launch", "Repository and cloud accounts in your name", "First month of close monitoring"],
    color: "#000838",
    icon: "Rocket",
  }
];
