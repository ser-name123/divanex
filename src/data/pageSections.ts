/**
 * Copy for the per-page sections.
 *
 * Each page carries a handful of sections that belong only to it — the SaaS
 * deep dive on /services, the IP policies on /faqs, the migration guide on
 * /tech-stack. Their headings and card copy were literals inside their own
 * components, which is where most of the site's words actually lived.
 *
 * A section stores its heading and its cards. The card *shapes* stay in the
 * component that renders them, because they differ from section to section;
 * what is stored is the text. A stored card is merged over the component's
 * built-in card at the same position, so an edit to one line never has to
 * restate the rest of it, and the icon a card was designed with survives.
 */

export interface SectionHeadingContent {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
}

export interface SectionCta {
  label: string;
  href: string;
}

export interface SectionContent {
  heading: SectionHeadingContent;
  /** The button some sections carry beside their heading. */
  cta: SectionCta;
  /**
   * The cards, as plain objects. `iconName` on any card overrides the icon the
   * component was written with, resolved through ICON_REGISTRY.
   */
  items: Array<Record<string, unknown>>;
}

/** Keyed by section id, e.g. "services/saas-deep-dive". */
export type PageSections = Record<string, Partial<SectionContent>>;

/**
 * Empty by default: a section with no record renders the copy compiled into
 * its component, so nothing has to be seeded for the site to look right.
 */
export const DEFAULT_PAGE_SECTIONS: PageSections = {};

/**
 * The sections the admin console lists, and the page each belongs to.
 *
 * Registered here rather than discovered, so the admin console can show a
 * section that has never been edited — a list built from the stored record
 * alone would start empty and stay that way.
 */
export const SECTION_REGISTRY: Array<{ id: string; page: string; label: string }> = [
  // /services
  { id: "services/saas-deep-dive", page: "/services", label: "SaaS architecture deep dive" },
  { id: "services/ai-agents", page: "/services", label: "AI agent capabilities" },
  { id: "services/mobile-cloud", page: "/services", label: "Mobile & cloud runtime" },
  { id: "services/deliverables", page: "/services", label: "Technical deliverables matrix" },
  { id: "services/pricing-tiers", page: "/services", label: "Investment tiers" },
  { id: "services/slas", page: "/services", label: "Service level agreements" },

  // /why-us
  { id: "why-us/comparison", page: "/why-us", label: "Agency vs freelancer vs Divanex" },
  { id: "why-us/retention", page: "/why-us", label: "Client retention metrics" },
  { id: "why-us/ownership", page: "/why-us", label: "Code ownership manifesto" },
  { id: "why-us/communication", page: "/why-us", label: "Communication protocols" },
  { id: "why-us/culture", page: "/why-us", label: "Engineering culture" },
  { id: "why-us/guarantees", page: "/why-us", label: "Risk reversal guarantees" },

  // /process
  { id: "process/involvement", page: "/process", label: "Client involvement guide" },
  { id: "process/launch", page: "/process", label: "Launch & hypercare" },
  { id: "process/qa", page: "/process", label: "Quality assurance pipeline" },
  { id: "process/release", page: "/process", label: "Release & deployment playbook" },
  { id: "process/tooling", page: "/process", label: "Tooling ecosystem" },

  // /tech-stack
  { id: "tech/philosophy", page: "/tech-stack", label: "Architecture philosophy" },
  { id: "tech/data", page: "/tech-stack", label: "Database & data pipelines" },
  { id: "tech/devops", page: "/tech-stack", label: "DevOps & cloud infrastructure" },
  { id: "tech/frontend-backend", page: "/tech-stack", label: "Frontend & backend deep dive" },
  { id: "tech/migration", page: "/tech-stack", label: "Legacy migration guide" },
  { id: "tech/security", page: "/tech-stack", label: "Security & encryption stack" },

  // /portfolio
  { id: "portfolio/architecture", page: "/portfolio", label: "Architecture case studies" },
  { id: "portfolio/timeline", page: "/portfolio", label: "Client delivery timeline" },
  { id: "portfolio/roi", page: "/portfolio", label: "Client ROI analysis" },
  { id: "portfolio/confidential", page: "/portfolio", label: "Confidential work notice" },
  { id: "portfolio/impact", page: "/portfolio", label: "Industry impact stats" },
  { id: "portfolio/audit", page: "/portfolio", label: "Portfolio audit criteria" },


  // /testimonials
  { id: "testimonials/reference-calls", page: "/testimonials", label: "Client reference call policy" },
  { id: "testimonials/outcomes", page: "/testimonials", label: "Client success outcomes" },
  { id: "testimonials/spotlights", page: "/testimonials", label: "Executive video spotlights" },
  { id: "testimonials/map", page: "/testimonials", label: "Global client map" },
  { id: "testimonials/nps", page: "/testimonials", label: "NPS scorecard" },
  { id: "testimonials/verification", page: "/testimonials", label: "Third-party verification badges" },

  // /faqs
  { id: "faqs/channels", page: "/faqs", label: "Direct support channels" },
  { id: "faqs/categories", page: "/faqs", label: "FAQ category cards" },
  { id: "faqs/ip", page: "/faqs", label: "IP & contract policies" },
  { id: "faqs/payment", page: "/faqs", label: "Payment & invoicing terms" },
  { id: "faqs/support", page: "/faqs", label: "Post-launch support guide" },
  { id: "faqs/timezone", page: "/faqs", label: "Timezone & communication policy" },

  // /security
  { id: "security/pillars", page: "/security", label: "Security pillars" },

  // /contact
  { id: "contact/scheduler", page: "/contact", label: "Discovery call scheduler" },
  { id: "contact/escalation", page: "/contact", label: "Emergency escalation protocol" },
  { id: "contact/hubs", page: "/contact", label: "Global hubs & hours" },
  { id: "contact/rfp", page: "/contact", label: "RFP submission guide" },
  { id: "contact/24-hours", page: "/contact", label: "What happens in 24 hours" },
  { id: "contact/privacy", page: "/contact", label: "Zero-spam privacy pledge" },
];
