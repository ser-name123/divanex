/**
 * Header and footer navigation.
 *
 * These menus used to be arrays declared inside Navbar.tsx and Footer.tsx, so
 * adding a link or renaming a section meant a code change and a deploy. They
 * are a database record now — the arrays here are only the seed a fresh
 * install starts from.
 *
 * Icons are stored as names from src/lib/iconRegistry.tsx, not components: a
 * JSONB column cannot hold a React component.
 */

/** A single link, in any menu. */
export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** Small pill rendered beside the label. Optional everywhere. */
  badge?: string;
  /** Supporting line, used by the header mega menu. */
  description?: string;
  /** Name from ICON_REGISTRY. */
  icon?: string;
  /** Opens in a new tab and gets rel="noopener noreferrer". */
  external?: boolean;
  /** Hidden from the site without being deleted from the admin console. */
  hidden?: boolean;
}

/** A titled group of links — one mega-menu column, or one footer column. */
export interface NavGroup {
  id: string;
  title: string;
  /** Shown above the title in the header mega menu. */
  eyebrow?: string;
  /** Name from ICON_REGISTRY, shown beside a footer column title. */
  icon?: string;
  /** Accent name from ACCENTS, used for the column icon and its badges. */
  accent?: string;
  /** Footer grid width out of 12. Defaults to 2. */
  span?: number;
  links: NavLink[];
  hidden?: boolean;
}

/** A call-to-action button, in the header bar or the mobile sheet. */
export interface NavCta {
  id: string;
  label: string;
  href: string;
  style: "primary" | "ghost";
  icon?: string;
  hidden?: boolean;
}

export interface HeaderNav {
  /** Links rendered directly in the bar. */
  primary: NavLink[];
  /** Label on the mega-menu trigger. */
  moreLabel: string;
  /** Mega-menu columns. */
  megaMenu: NavGroup[];
  /** Panel shown to the right of the mega-menu columns. */
  megaMenuPromoTitle: string;
  megaMenuPromoText: string;
  megaMenuPromoCtaLabel: string;
  megaMenuPromoCtaHref: string;
  /** Strip along the bottom of the mega menu. */
  megaMenuStatusText: string;
  megaMenuStatusDetail: string;
  megaMenuQuickLinks: NavLink[];
  /** Buttons at the right of the bar. */
  ctas: NavCta[];
}

export interface FooterNav {
  /** Blurb under the logo. */
  tagline: string;
  columns: NavGroup[];
  newsletterTitle: string;
  newsletterText: string;
  newsletterButtonLabel: string;
  /** Bottom strip, below the columns. */
  bottomLinks: NavLink[];
  copyrightName: string;
  /** "{year}" is replaced with the current year at render time. */
  copyrightText: string;
  /** Trust pills, e.g. "SOC 2–Aligned". */
  badges: string[];
}

export interface SiteNavigation {
  header: HeaderNav;
  footer: FooterNav;
}

export const DEFAULT_NAVIGATION: SiteNavigation = {
  header: {
    primary: [
      { id: "nav-services", label: "Services", href: "/services" },
      { id: "nav-why-us", label: "Why Us", href: "/why-us" },
      { id: "nav-tech", label: "Tech Stack", href: "/tech-stack" },
      { id: "nav-portfolio", label: "Portfolio", href: "/portfolio" },
      { id: "nav-testimonials", label: "Testimonials", href: "/testimonials" },
      { id: "nav-contact", label: "Contact", href: "/contact" },
    ],
    moreLabel: "More",
    megaMenu: [
      {
        id: "mega-execution",
        title: "Engineering & Delivery",
        eyebrow: "Delivery",
        links: [
          {
            id: "mega-cases",
            label: "Engineering Case Studies",
            href: "/portfolio",
            description:
              "Production case studies on SaaS platforms, AI agents, mobile apps & measured ROI",
            icon: "Briefcase",
            badge: "ROI Proof",
          },
          {
            id: "mega-process",
            label: "Agile Sprint Process",
            href: "/process",
            description: "Structured 5-stage sprint methodology from Day 1 to 24/7 hypercare",
            icon: "Workflow",
            badge: "14-Day Sprints",
          },
          {
            id: "mega-tech",
            label: "Production Tech Stack",
            href: "/tech-stack",
            description: "Modern Next.js 15, React Native, Python FastAPI & PostgreSQL blueprints",
            icon: "Code2",
            badge: "Sub-50ms Edge",
          },
        ],
      },
      {
        id: "mega-knowledge",
        title: "Trust, Security & Insights",
        eyebrow: "Knowledge",
        links: [
          {
            id: "mega-blog",
            label: "Technical Blog & Blueprints",
            href: "/blog",
            description: "In-depth blueprints on PostgreSQL RLS, HMIS systems & AI agent workflows",
            icon: "BookOpen",
            badge: "Engineering Guides",
          },
          {
            id: "mega-faqs",
            label: "Client FAQs & IP Ownership",
            href: "/faqs",
            description: "Full IP code transfer, milestone pricing, strict NDAs & hypercare support",
            icon: "HelpCircle",
            badge: "Full IP Transfer",
          },
          {
            id: "mega-security",
            label: "Security & Compliance Specs",
            href: "/security",
            description: "SOC 2–Aligned, HIPAA readiness, zero-trust network & OWASP hardening",
            icon: "ShieldCheck",
            badge: "SOC 2 / HIPAA",
          },
        ],
      },
    ],
    megaMenuPromoTitle: "Book a Free Architecture Review",
    megaMenuPromoText:
      "45 minutes with a principal engineer. Scope, stack and a delivery plan — no obligation.",
    megaMenuPromoCtaLabel: "Book a Consultation",
    megaMenuPromoCtaHref: "/contact",
    megaMenuStatusText: "ALL SYSTEMS PRODUCTION READY",
    megaMenuStatusDetail: "High Availability",
    megaMenuQuickLinks: [
      { id: "quick-cases", label: "View Case Studies", href: "/portfolio" },
    ],
    ctas: [
      {
        id: "cta-contact",
        label: "Book a Consultation",
        href: "/contact",
        style: "primary",
        icon: "Calendar",
      },
    ],
  },
  footer: {
    tagline:
      "Engineering across 5 core disciplines: Custom SaaS, AI & Automation, Web & Mobile Apps, Enterprise Business Software, and Healthcare / ERP / Marketplace Systems with complete code ownership & IP assignment.",
    columns: [
      {
        id: "col-services",
        title: "Services",
        icon: "Layers",
        accent: "sky",
        span: 2,
        links: [
          {
            id: "f-saas",
            label: "Custom SaaS Platforms",
            href: "/services/saas-development",
            badge: "MULTI-TENANT",
          },
          {
            id: "f-ai",
            label: "AI & Workflow Automation",
            href: "/services/ai-solutions-automation",
            badge: "AI AGENTS",
          },
          {
            id: "f-apps",
            label: "Web & Mobile Applications",
            href: "/services/web-app-development",
            badge: "IOS & ANDROID",
          },
          {
            id: "f-enterprise",
            label: "Enterprise ERP Systems",
            href: "/services/enterprise-erp-systems",
            badge: "ZERO SEAT FEES",
          },
          {
            id: "f-devops",
            label: "Cloud & DevOps Infra",
            href: "/services/cloud-devops",
            badge: "AUTO-SCALE",
          },
          {
            id: "f-all-services",
            label: "All 24 Capabilities",
            href: "/services",
            badge: "CATALOGUE",
          },
        ],
      },
      {
        id: "col-solutions",
        title: "Solutions",
        icon: "Cpu",
        accent: "emerald",
        span: 2,
        links: [
          {
            id: "f-hmis",
            label: "Healthcare & Clinic HMIS",
            href: "/services/hospital-healthcare-management",
            badge: "HIPAA / ABDM",
          },
          {
            id: "f-marketplace",
            label: "Multi-Vendor Marketplaces",
            href: "/services/ecommerce-marketplace-platforms",
            badge: "ESCROW",
          },
          {
            id: "f-fintech",
            label: "Fintech & Banking Rails",
            href: "/services/fintech-banking-solutions",
            badge: "PCI-DSS",
          },
          {
            id: "f-crm",
            label: "Custom CRM & Sales",
            href: "/services/custom-crm-automation",
            badge: "WHATSAPP",
          },
          {
            id: "f-proptech",
            label: "Real Estate & PropTech",
            href: "/services/real-estate-proptech",
          },
          {
            id: "f-logistics",
            label: "Logistics & Fleet OS",
            href: "/services/logistics-fleet-telematics",
          },
        ],
      },
      {
        id: "col-company",
        title: "Company",
        icon: "ShieldCheck",
        accent: "blue",
        span: 2,
        links: [
          {
            id: "f-why",
            label: "Why Clients Choose Us",
            href: "/why-us",
            badge: "PROOF",
          },
          {
            id: "f-portfolio",
            label: "Case Studies & ROI",
            href: "/portfolio",
            badge: "FEATURED BUILDS",
          },
          {
            id: "f-reviews",
            label: "Verified Client Reviews",
            href: "/testimonials",
            badge: "5.0 ★",
          },
          {
            id: "f-ownership",
            label: "Full Code Ownership",
            href: "/why-us",
            badge: "DAY 1",
          },
          {
            id: "f-techstack",
            label: "Technology Stack",
            href: "/tech-stack",
          },
          {
            id: "f-contact",
            label: "Book a Consultation",
            href: "/contact",
            badge: "PROPOSAL",
          },
        ],
      },
      {
        id: "col-resources",
        title: "Resources",
        icon: "Terminal",
        accent: "purple",
        span: 2,
        links: [
          {
            id: "f-blog",
            label: "Engineering Blog",
            href: "/blog",
            badge: "GUIDES",
          },
          {
            id: "f-process",
            label: "Sprint Delivery Process",
            href: "/process",
          },
          {
            id: "f-faqs",
            label: "Client FAQs & SLAs",
            href: "/faqs",
          },
          {
            id: "f-security",
            label: "Security & Compliance",
            href: "/security",
            badge: "SOC 2",
          },
          {
            id: "f-blueprints",
            label: "Architecture Blueprints",
            href: "/blog",
          },
          {
            id: "f-vdp",
            label: "Vulnerability Disclosure",
            href: "/security#vdp",
          },
        ],
      },
    ],
    newsletterTitle: "Engineering Dispatch",
    newsletterText:
      "Architecture teardowns and delivery notes. Monthly, technical, no marketing.",
    newsletterButtonLabel: "Subscribe",
    bottomLinks: [
      { id: "b-privacy", label: "Privacy", href: "/privacy" },
      { id: "b-terms", label: "Terms", href: "/terms" },
      { id: "b-cookies", label: "Cookies", href: "/cookies" },
      { id: "b-nda", label: "NDA & IP", href: "/nda" },
      { id: "b-security", label: "Security", href: "/security" },
      { id: "b-refund", label: "Refund Policy", href: "/refund-policy" },
      { id: "b-sitemap", label: "Sitemap", href: "/sitemap.xml", external: true },
      { id: "b-robots", label: "Robots.txt", href: "/robots.txt", external: true },
    ],
    copyrightName: "Divanex Technologies",
    copyrightText: "© {year} {name}. All rights reserved.",
    badges: ["SOC 2–Aligned", "ISO 27001 Aligned", "HIPAA Ready", "GDPR Aligned"],
  },
};

/** Drops entries an admin hid, so callers never filter at each render site. */
export function visibleLinks(links: NavLink[] | undefined): NavLink[] {
  return (links ?? []).filter((link) => !link.hidden);
}

export function visibleGroups(groups: NavGroup[] | undefined): NavGroup[] {
  return (groups ?? [])
    .filter((group) => !group.hidden)
    .map((group) => ({ ...group, links: visibleLinks(group.links) }));
}
