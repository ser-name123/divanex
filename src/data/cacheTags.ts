/**
 * Cache tag names.
 *
 * Plain constants with no imports, deliberately: these names are referenced
 * from client components (the admin views) as well as from the server cache
 * layer. Keeping them here stops a client bundle from pulling in `next/cache`,
 * which is server-only and fails the build.
 */

export const CACHE_TAGS = {
  siteConfig: "content:site-config",
  testimonials: "content:testimonials",
  portfolio: "content:portfolio",
  techStack: "content:tech-stack",
  integrations: "content:integrations",
  blog: "content:blog",
  seo: "content:seo",
  services: "content:services",
  navigation: "content:navigation",
  pages: "content:pages",
  sections: "content:sections",
  forms: "content:forms",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/** Everything the admin console can purge, with the label it shows. */
export const CACHE_ENTRIES: Array<{ tag: CacheTag; label: string; description: string }> = [
  {
    tag: CACHE_TAGS.siteConfig,
    label: "Site content",
    description: "Announcement bar, hero copy, contact details, social links, feature toggles.",
  },
  {
    tag: CACHE_TAGS.seo,
    label: "Search & metadata",
    description: "Titles, descriptions, canonicals, structured data, sitemap and robots.",
  },
  {
    tag: CACHE_TAGS.testimonials,
    label: "Testimonials",
    description: "Client quotes and ratings shown on the home and testimonials pages.",
  },
  {
    tag: CACHE_TAGS.portfolio,
    label: "Portfolio",
    description: "Case study cards and the portfolio listing.",
  },
  {
    tag: CACHE_TAGS.techStack,
    label: "Tech stack",
    description: "Technology grid and per-technology detail pages.",
  },
  {
    tag: CACHE_TAGS.blog,
    label: "Blog",
    description: "Published posts, the blog index and article pages.",
  },
  {
    tag: CACHE_TAGS.services,
    label: "Services",
    description: "Service catalogue and pricing tiers.",
  },
  {
    tag: CACHE_TAGS.navigation,
    label: "Navigation",
    description: "Header menu, mega menu, footer columns and the bottom link strip.",
  },
  {
    tag: CACHE_TAGS.pages,
    label: "Page content",
    description:
      "Page headers, home sections, why-us pillars, the process timeline and FAQs.",
  },
  {
    tag: CACHE_TAGS.sections,
    label: "Page sections",
    description: "The per-page sections: deep dives, policies, guides and comparison blocks.",
  },
  {
    tag: CACHE_TAGS.forms,
    label: "Forms & notifications",
    description:
      "Thank-you page copy, the visitor acknowledgement email and the team alert for every website form.",
  },
  {
    tag: CACHE_TAGS.integrations,
    label: "Integrations",
    description: "Third-party keys and endpoints configured in system settings.",
  },
];
