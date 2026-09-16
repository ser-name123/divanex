import { testimonialsData, type TestimonialItem } from "@/data/testimonials";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";
import { techStackData, type TechItem } from "@/data/techStack";
import { CACHE_TAGS, type CacheTag } from "@/data/cacheTags";
import { DEFAULT_NAVIGATION, type SiteNavigation } from "@/data/navigation";
import { DEFAULT_PAGE_CONTENT, type PageContent } from "@/data/pageContent";
import { DEFAULT_PAGE_SECTIONS, type PageSections } from "@/data/pageSections";
import { DEFAULT_FORM_SETTINGS, type FormSettings } from "@/data/formSettings";
import { servicesData, type ServiceItem } from "@/data/services";
import { serviceDetailsRecord, type ServiceDetailData } from "@/data/serviceDetails";
import { caseStudiesRecord, type CaseStudy } from "@/data/caseStudiesData";
import { techDetailsRecord, type TechDetailData } from "@/data/techDetails";

/**
 * Editable site content.
 *
 * Every collection here used to live in a `localStorage` key written by one of
 * the admin views, which meant edits existed only in the browser that made
 * them and never reached a visitor. They are database records now, with the
 * static arrays in src/data kept as the seed a fresh install starts from.
 */

/** Announcement bar, hero copy, contact details and feature toggles. */
export interface SiteConfig {
  announcementEnabled: boolean;
  announcementPill: string;
  announcementText: string;
  announcementLinkText: string;
  announcementLinkUrl: string;

  heroEyebrow: string;
  heroHeadlineMain: string;
  heroHeadlineHighlight: string;
  heroSubhead: string;
  heroCtaQuoteText: string;
  heroCtaConsultText: string;

  contactEmail: string;
  /** Existing clients and technical support. Shown by the chat widget. */
  supportEmail: string;
  /** Job applicants and talent recruitment. */
  careersEmail?: string;
  /** Responsible-disclosure address on the security page. */
  securityEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  /** Pre-filled text on every WhatsApp link, so the operator controls it. */
  whatsappGreeting: string;
  officeAddress: string;
  businessHours: string;

  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;

  enableAiChat: boolean;
  enableMaintenanceBanner: boolean;
  maintenanceMessage: string;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  announcementEnabled: true,
  announcementPill: "SPRINT OPEN",
  announcementText: "Q3 SaaS & AI Engineering Sprint Slots Open • 14-Day Delivery Guarantee",
  announcementLinkText: "Reserve Slot →",
  announcementLinkUrl: "/contact",

  heroEyebrow: "Next-Gen Digital Solutions & Cloud Architecture • SaaS & AI Specialized",
  heroHeadlineMain: "Transforming Businesses with",
  heroHeadlineHighlight: "Next-Gen Tech Solutions.",
  heroSubhead:
    "SaaS, Web, Mobile Apps, AI & Digital Marketing Solutions for Scaling Businesses. From conceptual system architecture to resilient global serverless deployment, we engineer digital engines that outperform.",
  heroCtaQuoteText: "Get a Free Quote",
  heroCtaConsultText: "Book a Free Consultation",

  contactEmail: "business@divanextechnologies.com",
  supportEmail: "business@divanextechnologies.com",
  careersEmail: "hr@divanextechnologies.com",
  securityEmail: "security@divanextechnologies.com",
  contactPhone: "+91-6375073511",
  whatsappNumber: "+919571618625",
  whatsappGreeting:
    "Hello Divanex! I would like to inquire about your digital & tech solutions for my business.",
  officeAddress: "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar Jaipur 302021",
  businessHours: "Monday – Friday: 10:00 AM – 08:00 PM (Sat–Sun: Closed)",

  githubUrl: "https://github.com/ser-name123/divanex",
  linkedinUrl: "https://linkedin.com/company/divanex",
  twitterUrl: "https://x.com/divanex",
  instagramUrl: "https://instagram.com/divanex",

  enableAiChat: true,
  enableMaintenanceBanner: false,
  maintenanceMessage:
    "Scheduled database indexing in progress. All services remain 100% operational.",
};

/** Third-party services shown in system settings. Never holds a real key. */
export interface IntegrationEntry {
  id: string;
  name: string;
  service: string;
  /** Display-only, e.g. "sk_live_••••4821". The secret itself lives in env. */
  maskedKey: string;
  environment: "Production" | "Sandbox";
  status: "Connected" | "Degraded" | "Pending";
  lastTested: string;
}

export const DEFAULT_INTEGRATIONS: IntegrationEntry[] = [];

/**
 * The collections the admin console can edit. Each one maps to a row in
 * `site_content`, a cache tag, and the seed used before anything is saved.
 */
export const CONTENT_COLLECTIONS = {
  "site-config": {
    tag: CACHE_TAGS.siteConfig,
    seed: DEFAULT_SITE_CONFIG as unknown,
    label: "Site content",
    /**
     * A record with a fixed set of keys, so a stored row is merged over the
     * seed rather than replacing it. Without this, a row saved today would be
     * missing any key added tomorrow and the page rendering it would throw on
     * the undefined value — which is exactly what happened the first time a
     * heading was added after a save.
     */
    mergeWithSeed: true,
  },
  testimonials: {
    tag: CACHE_TAGS.testimonials,
    seed: testimonialsData as unknown,
    label: "Testimonials",
  },
  portfolio: {
    tag: CACHE_TAGS.portfolio,
    seed: portfolioProjects as unknown,
    label: "Portfolio",
  },
  "tech-stack": {
    tag: CACHE_TAGS.techStack,
    seed: techStackData as unknown,
    label: "Tech stack",
  },
  services: {
    tag: CACHE_TAGS.services,
    seed: servicesData as unknown,
    label: "Services catalogue",
  },
  // Shares the services tag deliberately: editing a service page should clear
  // the catalogue card that links to it in the same purge.
  "service-details": {
    tag: CACHE_TAGS.services,
    seed: serviceDetailsRecord as unknown,
    label: "Service pages",
  },
  "case-studies": {
    tag: CACHE_TAGS.portfolio,
    seed: caseStudiesRecord as unknown,
    label: "Case study pages",
  },
  "tech-details": {
    tag: CACHE_TAGS.techStack,
    seed: techDetailsRecord as unknown,
    label: "Technology pages",
  },
  navigation: {
    tag: CACHE_TAGS.navigation,
    seed: DEFAULT_NAVIGATION as unknown,
    label: "Navigation",
    mergeWithSeed: true,
  },
  pages: {
    tag: CACHE_TAGS.pages,
    seed: DEFAULT_PAGE_CONTENT as unknown,
    label: "Page content",
    mergeWithSeed: true,
  },
  sections: {
    tag: CACHE_TAGS.sections,
    seed: DEFAULT_PAGE_SECTIONS as unknown,
    label: "Page sections",
  },
  forms: {
    tag: CACHE_TAGS.forms,
    seed: DEFAULT_FORM_SETTINGS as unknown,
    label: "Forms & notifications",
    mergeWithSeed: true,
  },
  integrations: {
    tag: CACHE_TAGS.integrations,
    seed: DEFAULT_INTEGRATIONS as unknown,
    label: "Integrations",
  },
} as const;

export type ContentCollection = keyof typeof CONTENT_COLLECTIONS;

export function isContentCollection(value: string): value is ContentCollection {
  return Object.prototype.hasOwnProperty.call(CONTENT_COLLECTIONS, value);
}

export function collectionTag(collection: ContentCollection): CacheTag {
  return CONTENT_COLLECTIONS[collection].tag;
}

/**
 * Whether a stored row for this collection is merged over its seed.
 *
 * True for the fixed-shape records — site config, navigation, page content —
 * where a key added to the seed after a save must still resolve. False for the
 * collections whose keys are the content itself (a list of testimonials, a
 * record of case studies), where merging would resurrect deleted entries.
 */
export function mergesWithSeed(collection: ContentCollection): boolean {
  const entry = CONTENT_COLLECTIONS[collection] as { mergeWithSeed?: boolean };
  return entry.mergeWithSeed === true;
}

/** Type map so callers get the right shape back without casting at each site. */
export interface ContentShapes {
  "site-config": SiteConfig;
  testimonials: TestimonialItem[];
  portfolio: PortfolioProject[];
  "tech-stack": TechItem[];
  services: ServiceItem[];
  "service-details": Record<string, ServiceDetailData>;
  "case-studies": Record<string, CaseStudy>;
  "tech-details": Record<string, TechDetailData>;
  navigation: SiteNavigation;
  pages: PageContent;
  sections: PageSections;
  forms: FormSettings;
  integrations: IntegrationEntry[];
}
