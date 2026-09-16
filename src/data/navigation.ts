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
  /** Trust pills, e.g. "SOC 2 Type II". */
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
        title: "Engineering & Lifecycle",
        eyebrow: "Delivery",
        links: [
          {
            id: "mega-cases",
            label: "Engineering Case Studies",
            href: "/portfolio",
            description:
              "Proven production case studies on SaaS platforms, AI agents, mobile apps & ROI",
            icon: "Briefcase",
            badge: "Case Studies",
          },
          {
            id: "mega-process",
            label: "Engineering Process",
            href: "/process",
            description: "Our 6-phase agile lifecycle from Day 0 to 30-day hypercare",
            icon: "GitBranch",
            badge: "Methodology",
          },
        ],
      },
      {
        id: "mega-knowledge",
        title: "Research, Trust & Compliance",
        eyebrow: "Evidence",
        links: [
          {
            id: "mega-blog",
            label: "Architectural Case Studies & Blog",
            href: "/blog",
            description: "10+ Technical blueprints on PostgreSQL RLS, Kafka IoT & HMIS",
            icon: "BookOpen",
            badge: "10+ Guides",
          },
          {
            id: "mega-faqs",
            label: "Client FAQs & Code Ownership",
            href: "/faqs",
            description: "100% intellectual property transfer, strict NDAs & warranties",
            icon: "HelpCircle",
            badge: "IP Security",
          },
          {
            id: "mega-security",
            label: "Security & Encryption Specs",
            href: "/security",
            description: "SOC 2 Type II, HIPAA compliance & OWASP penetration hardening",
            icon: "Lock",
            badge: "Compliance",
          },
        ],
      },
    ],
    megaMenuPromoTitle: "Book a Free Architecture Review",
    megaMenuPromoText:
      "45 minutes with a principal engineer. Scope, stack and a delivery plan — no obligation.",
    megaMenuPromoCtaLabel: "Book a Free Consultation",
    megaMenuPromoCtaHref: "/contact",
    megaMenuStatusText: "ALL SYSTEMS PRODUCTION READY",
    megaMenuStatusDetail: "99.99% SLA",
    megaMenuQuickLinks: [
      { id: "quick-cases", label: "Case Studies", href: "/portfolio" },
    ],
    ctas: [
      {
        id: "cta-estimate",
        label: "Get a Free Quote",
        href: "/contact",
        style: "ghost",
        icon: "Mail",
      },
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
      "Enterprise-grade SaaS, AI and cloud engineering. We design, build and operate the systems that scaling businesses run on.",
    columns: [
      {
        id: "col-services",
        title: "Core Services",
        icon: "Layers",
        accent: "sky",
        span: 3,
        links: [
          {
            id: "f-hmis",
            label: "Hospital HMIS & Healthcare",
            href: "/services/hospital-healthcare-management",
            badge: "HIPAA / ABDM",
          },
          {
            id: "f-erp",
            label: "Enterprise ERP & Supply Chain",
            href: "/services/enterprise-erp-systems",
            badge: "MODULAR MRP",
          },
          {
            id: "f-fintech",
            label: "Fintech & Banking Rails",
            href: "/services/fintech-banking-solutions",
            badge: "PCI-DSS",
          },
          {
            id: "f-crm",
            label: "Custom CRM & Omnichannel Sales",
            href: "/services/custom-crm-automation",
            badge: "WHATSAPP CTI",
          },
          {
            id: "f-marketplace",
            label: "Multi-Vendor Marketplaces",
            href: "/services/ecommerce-marketplace-platforms",
            badge: "SPLIT ESCROW",
          },
          {
            id: "f-edtech",
            label: "EdTech, School ERP & LMS",
            href: "/services/edtech-learning-management",
            badge: "WEBRTC LIVE",
          },
          {
            id: "f-saas",
            label: "SaaS Multi-Tenancy Engine",
            href: "/services/saas-development",
            badge: "v4.2",
          },
          {
            id: "f-ai",
            label: "Autonomous AI Agents & RAG",
            href: "/services/ai-solutions-automation",
            badge: "AI CORE",
          },
          {
            id: "f-devops",
            label: "Cloud DevOps & Kubernetes",
            href: "/services/cloud-devops",
            badge: "99.999%",
          },
          {
            id: "f-cyber",
            label: "Cybersecurity & Compliance",
            href: "/services/cybersecurity-compliance",
            badge: "SOC-2",
          },
        ],
      },
      {
        id: "col-engineering",
        title: "Architecture",
        icon: "Cpu",
        accent: "blue",
        span: 2,
        links: [
          { id: "f-blog", label: "Engineering Blog & Tech Papers", href: "/blog", badge: "8+ PAPERS" },
          { id: "f-mesh", label: "Multi-Tenant Cloud Mesh Guide", href: "/services/saas-development" },
          { id: "f-rag", label: "Sub-50ms RAG Vector Retrieval", href: "/services/ai-solutions-automation" },
          { id: "f-crdt", label: "CRDT Conflict-Free Mobile Sync", href: "/services/web-app-development" },
          { id: "f-terraform", label: "Zero-Downtime Terraform CD", href: "/services/cloud-devops" },
          { id: "f-stack", label: "Enterprise Architecture Stack", href: "/tech-stack" },
          { id: "f-sprint", label: "Agile 2-Week Sprint Cadence", href: "/process" },
          { id: "f-micro", label: "Distributed Microservices Mesh", href: "/tech-stack" },
          { id: "f-rls", label: "PostgreSQL 16 Multi-Tenant RLS", href: "/blog" },
          { id: "f-edge", label: "Edge API Caching & Ingress", href: "/tech-stack" },
        ],
      },
      {
        id: "col-company",
        title: "Company & Proof",
        icon: "ShieldCheck",
        accent: "emerald",
        span: 2,
        links: [
          { id: "f-roi", label: "Engineering Case Studies & ROI", href: "/portfolio", badge: "24+ SYSTEMS" },
          { id: "f-vs", label: "Why Divanex vs Legacy Agency", href: "/why-us" },
          { id: "f-nps", label: "Verified Client Reviews & NPS", href: "/testimonials" },
          { id: "f-faq", label: "Client FAQs & Code Ownership", href: "/faqs" },
          { id: "f-techbreak", label: "Technology Stack Breakdown", href: "/tech-stack" },
          { id: "f-hypercare", label: "60-Day Post-Launch Hypercare", href: "/why-us" },
          { id: "f-nda", label: "Bilateral NDA & Code Transfer", href: "/why-us" },
          { id: "f-consult", label: "Schedule Technical Consultation", href: "/contact" },
        ],
      },
      {
        id: "col-governance",
        title: "Governance & SLA",
        icon: "Lock",
        accent: "violet",
        span: 2,
        links: [
          { id: "f-trust", label: "Enterprise Trust & Security", href: "/security", badge: "HARDENED" },
          { id: "f-sla", label: "Enterprise SLA & 99.999% Uptime", href: "/why-us" },
          { id: "f-ip", label: "100% IP Assignment & Ownership", href: "/why-us" },
          { id: "f-bnda", label: "Bilateral Non-Disclosure Agreement", href: "/contact" },
          { id: "f-privacy", label: "Zero-Trust Privacy & Data Pledge", href: "/security" },
          { id: "f-vdp", label: "Vulnerability Disclosure (VDP)", href: "/security#vdp" },
          { id: "f-escrow", label: "Milestone-Based Escrow Terms", href: "/contact" },
          { id: "f-hipaa", label: "HIPAA & ABDM Compliance Rules", href: "/security" },
          { id: "f-soc2", label: "SOC-2 Type II Certified Controls", href: "/security" },
          { id: "f-gdpr", label: "GDPR & Data Sovereignty Policy", href: "/security" },
        ],
      },
    ],
    newsletterTitle: "Engineering Dispatch",
    newsletterText:
      "Architecture teardowns and delivery notes. Monthly, technical, no marketing.",
    newsletterButtonLabel: "Subscribe",
    bottomLinks: [
      { id: "b-home", label: "Home", href: "/" },
      { id: "b-services", label: "Services", href: "/services" },
      { id: "b-why", label: "Why Us", href: "/why-us" },
      { id: "b-tech", label: "Tech Stack", href: "/tech-stack" },
      { id: "b-portfolio", label: "Portfolio", href: "/portfolio" },
      { id: "b-contact", label: "Contact", href: "/contact" },
    ],
    copyrightName: "Divanex Technologies",
    copyrightText: "© {year} {name}. All rights reserved.",
    badges: ["SOC 2 Type II", "ISO 27001 Aligned", "HIPAA Ready", "GDPR Compliant"],
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
