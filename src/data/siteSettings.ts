/**
 * Site-wide settings, including everything SEO reads.
 *
 * These values used to be literals scattered through layout.tsx, sitemap.ts,
 * robots.ts and every page's metadata, so changing a title or the canonical
 * host meant a code edit and a deploy. They live in one record now, editable
 * from the admin console.
 */

/** Per-page search metadata. Keys are route paths. */
export interface PageSeo {
  /** Shown in the results listing. Keep under ~60 characters. */
  title: string;
  /** The snippet under it. Keep under ~160 characters. */
  description: string;
  /** Leave empty to fall back to the site default. */
  ogImage?: string;
  /** Keeps the page out of the index while still crawlable for links. */
  noIndex?: boolean;
}

export interface SiteSettings {
  // --- Identity -----------------------------------------------------------
  siteName: string;
  /** Canonical origin, no trailing slash. Every absolute URL is built from it. */
  siteUrl: string;
  defaultTitle: string;
  /** "%s | Divanex" — %s is replaced by each page's own title. */
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  /** Absolute or site-relative. Social cards need 1200x630. */
  defaultOgImage: string;
  twitterHandle: string;
  locale: string;

  // --- Organization, for the knowledge panel and rich results --------------
  legalName: string;
  logoUrl: string;
  foundingYear: string;
  contactEmail: string;
  contactPhone: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  /** Profiles that belong to the same entity; feeds schema.org sameAs. */
  socialProfiles: string[];

  // --- Indexing controls --------------------------------------------------
  /**
   * Turns the whole site noindex and tells robots.txt to disallow everything.
   * For staging and pre-launch — leaving it on in production removes the site
   * from search entirely.
   */
  discourageSearchEngines: boolean;
  /** Extra paths kept out of robots.txt beyond /admin and /api. */
  robotsDisallow: string[];

  // --- Search Console / webmaster verification ----------------------------
  googleSiteVerification: string;
  bingSiteVerification: string;

  // --- Per-page overrides -------------------------------------------------
  pages: Record<string, PageSeo>;
}

/** Routes the admin console offers per-page SEO fields for. */
export const SEO_MANAGED_ROUTES = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/why-us", label: "Why Us" },
  { path: "/process", label: "Process" },
  { path: "/tech-stack", label: "Tech Stack" },
  { path: "/portfolio", label: "Portfolio" },
  { path: "/blog", label: "Blog" },
  { path: "/testimonials", label: "Testimonials" },
  { path: "/faqs", label: "FAQs" },
  { path: "/contact", label: "Contact" },
  { path: "/security", label: "Security" },
] as const;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Divanex",
  siteUrl: "https://divanextechnologies.com",
  defaultTitle:
    "Divanex | Enterprise Software Engineering, Custom SaaS & AI Solutions",
  titleTemplate: "%s | Divanex",
  defaultDescription:
    "Divanex delivers elite enterprise software engineering: multi-tenant SaaS platforms, autonomous AI agent architectures, cross-platform mobile apps, cloud DevOps, and compounding SEO growth engines with a 99.999% SLA uptime.",
  keywords: [
    "Divanex",
    "Enterprise Software Engineering",
    "SaaS Development Company",
    "Custom AI Agent Development",
    "Multi-Tenant Cloud Architecture",
    "Next.js Web Application Agency",
    "Cross-Platform Mobile App Development",
    "Cloud DevOps & Kubernetes Infrastructure",
    "Healthcare HMIS & EHR Software Development",
    "Fintech Core Banking Engineering",
    "Full Code Ownership Software Partner",
    "Technical SEO & Conversion Rate Optimization",
  ],
  defaultOgImage: "/opengraph-image",
  twitterHandle: "@divanex",
  locale: "en_US",

  legalName: "Divanex Technologies",
  logoUrl: "/brand-logo-icon.png",
  foundingYear: "2021",
  contactEmail: "business@divanextechnologies.com",
  contactPhone: "+91-6375073511",
  streetAddress: "Office 104, Vaishali Tower 2nd, Nursery Circle, Vaishali Nagar",
  addressLocality: "Jaipur",
  addressRegion: "Rajasthan",
  postalCode: "302021",
  addressCountry: "IN",
  socialProfiles: [
    "https://linkedin.com/company/divanex",
    "https://x.com/divanex",
    "https://github.com/ser-name123/divanex",
    "https://instagram.com/divanex",
  ],

  discourageSearchEngines: false,
  robotsDisallow: [],

  googleSiteVerification: "",
  bingSiteVerification: "",

  pages: {
    "/": {
      title:
        "Divanex | Enterprise Software Engineering, Custom SaaS & AI Solutions",
      description:
        "Enterprise SaaS platforms, autonomous AI agents, mobile apps and cloud infrastructure, engineered end-to-end with 100% code ownership and a 99.999% uptime SLA.",
    },
    "/services": {
      title: "Software Engineering & Digital Solutions Services",
      description:
        "Explore 22+ enterprise software services: SaaS platforms, AI agents, mobile apps, ERP, healthcare HMIS and fintech systems with milestone delivery and published SLAs.",
    },
    "/why-us": {
      title: "Why Choose Divanex | 100% Code Ownership & Senior Engineering Pods",
      description:
        "100% Day-1 IP ownership, dedicated senior engineering pods, zero technical debt pledge, and institutional risk-reversal guarantees for high-velocity scale.",
    },
    "/process": {
      title: "Agile Development Process | 5-Stage Engineering Lifecycle",
      description:
        "Discovery, UX/UI architecture, 2-week sprint cycles, automated QA pipelines, zero-downtime launch, and 24/7 hypercare support with complete transparency.",
    },
    "/tech-stack": {
      title: "Production Tech Stack & Blueprints | Next.js, Go, AI & Cloud DevOps",
      description:
        "Battle-tested production technologies: Next.js 15, React Native, Go, PostgreSQL, Kubernetes, PyTorch, and serverless edge architecture benchmarks.",
    },
    "/portfolio": {
      title: "Case Studies & Portfolio | Verified Enterprise Software Proof",
      description:
        "Real-world architecture case studies with measured ROI metrics: multi-tenant SaaS, healthcare telemetry, fintech ledgers, and logistics automation.",
    },
    "/blog": {
      title: "Engineering Blog & Architecture Blueprints | Divanex Tech Insights",
      description:
        "Deep engineering write-ups on multi-tenant SaaS architecture, FHIR-compliant healthcare systems, fintech ledgers, and production AI agents.",
    },
    "/testimonials": {
      title: "Client Testimonials & Executive Reviews | 4.95/5 Rating",
      description:
        "Verified client outcomes, Clutch 5.0 ratings, NPS scorecard, and executive video spotlights from enterprise engagements across three continents.",
    },
    "/faqs": {
      title: "Frequently Asked Questions | Pricing, IP Ownership & SLAs",
      description:
        "Answers to common client questions on project contracts, 100% IP transfer, sprint velocity, milestone payments, timezone overlap, and post-launch support.",
    },
    "/contact": {
      title: "Contact Solutions Architects | Free Technical Discovery & RFP",
      description:
        "Schedule a free 30-minute technical discovery session with senior architects. Global delivery hubs, RFP guidelines, and sub-15-minute response SLA.",
    },
    "/security": {
      title: "Enterprise Security Posture & Compliance | SOC 2 & Zero Trust",
      description:
        "Zero-trust network architecture, OWASP Top 10 automated CI/CD defenses, SOC 2 Type II, HIPAA, ISO 27001 readiness, and real-time threat telemetry.",
    },
  },
};
