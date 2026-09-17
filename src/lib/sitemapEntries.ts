import "server-only";
import type { MetadataRoute } from "next";
import { getAllTechSlugs } from "@/data/techDetails";
import { getContent } from "@/lib/contentStore";
import { getBlogPosts } from "@/lib/blogStore";
import {
  normalisePath,
  normalisePriority,
  type ChangeFrequency,
  type SitemapGroup,
  type SitemapSettings,
} from "@/data/sitemapSettings";

/**
 * What the sitemap would contain, and what the operator did to it.
 *
 * Both /sitemap.xml and the admin screen call this. That is the whole point:
 * a preview built from a second implementation is a preview of something else,
 * and the first time the two disagreed nobody would be able to tell which one
 * search engines were being served.
 */

export interface SitemapCandidate {
  /** Normalised, no origin: "/", "/services/saas-development". */
  path: string;
  group: SitemapGroup;
  /** What the console shows in the list. */
  label: string;
  lastModified: string;
  defaultPriority: number;
  defaultChangeFrequency: ChangeFrequency;
}

/** A candidate plus the decision made about it, for the admin list. */
export interface SitemapDecision extends SitemapCandidate {
  included: boolean;
  priority: number;
  changeFrequency: ChangeFrequency;
  /** Why it is out, when it is out. */
  reason: "group" | "rule" | null;
  /** True when an operator has overridden something about this URL. */
  overridden: boolean;
}

/** The main pages, with the weights they have always carried. */
const STATIC_ROUTES: Array<{
  path: string;
  label: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}> = [
  { path: "/", label: "Home", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", label: "Services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/portfolio", label: "Portfolio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", label: "Contact", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", label: "Blog", priority: 0.9, changeFrequency: "daily" },
  { path: "/why-us", label: "Why us", priority: 0.8, changeFrequency: "monthly" },
  { path: "/process", label: "Process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tech-stack", label: "Tech stack", priority: 0.8, changeFrequency: "monthly" },
  { path: "/testimonials", label: "Testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faqs", label: "FAQs", priority: 0.7, changeFrequency: "monthly" },
  { path: "/security", label: "Security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/nda", label: "NDA", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", label: "Privacy policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", label: "Terms", priority: 0.5, changeFrequency: "monthly" },
  { path: "/refund-policy", label: "Refund policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/cookies", label: "Cookie policy", priority: 0.4, changeFrequency: "monthly" },
];

/** "saas-development" reads better as "Saas development" than as a slug. */
function labelFromSlug(slug: string): string {
  const words = slug.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Prefers a record's own title, since a slug rarely matches what it is called. */
function labelFromRecord(record: unknown, slug: string): string {
  if (record && typeof record === "object") {
    const candidate = record as Record<string, unknown>;
    for (const key of ["title", "name", "heading", "label"]) {
      const value = candidate[key];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
  }
  return labelFromSlug(slug);
}

/**
 * Every URL the site can offer, before any operator decision is applied.
 *
 * Generated from the records that drive the pages themselves, so a new service
 * or post is a candidate the moment it exists — the settings row never has to
 * learn about it.
 */
export async function collectSitemapCandidates(): Promise<SitemapCandidate[]> {
  const now = new Date().toISOString();

  const [serviceDetails, caseStudies, techDetails, techGrid] = await Promise.all([
    getContent("service-details"),
    getContent("case-studies"),
    getContent("tech-details"),
    getContent("tech-stack"),
  ]);

  const candidates: SitemapCandidate[] = STATIC_ROUTES.map((route) => ({
    path: route.path,
    group: "pages",
    label: route.label,
    lastModified: now,
    defaultPriority: route.priority,
    defaultChangeFrequency: route.changeFrequency,
  }));

  for (const slug of Object.keys(serviceDetails)) {
    candidates.push({
      path: `/services/${slug}`,
      group: "services",
      label: labelFromRecord(serviceDetails[slug], slug),
      lastModified: now,
      defaultPriority: 0.8,
      defaultChangeFrequency: "monthly",
    });
  }

  for (const slug of Object.keys(caseStudies)) {
    candidates.push({
      path: `/portfolio/${slug}`,
      group: "portfolio",
      label: labelFromRecord(caseStudies[slug], slug),
      lastModified: now,
      defaultPriority: 0.7,
      defaultChangeFrequency: "monthly",
    });
  }

  for (const slug of getAllTechSlugs(techDetails, techGrid)) {
    candidates.push({
      path: `/tech-stack/${slug}`,
      group: "tech",
      label: labelFromRecord(techDetails[slug], slug),
      lastModified: now,
      defaultPriority: 0.6,
      defaultChangeFrequency: "monthly",
    });
  }

  // Published posts only: a draft in the sitemap is a 404 or a thin page.
  try {
    const posts = await getBlogPosts();
    for (const post of posts) {
      if (post.status !== "published") continue;
      candidates.push({
        path: `/blog/${post.slug}`,
        group: "blog",
        label: post.title || labelFromSlug(post.slug),
        lastModified: post.publishedAt || now,
        defaultPriority: post.featured ? 0.8 : 0.7,
        defaultChangeFrequency: "monthly",
      });
    }
  } catch {
    // A database hiccup must not empty the sitemap of everything else.
  }

  return candidates;
}

/**
 * Applies the operator's settings to the candidates.
 *
 * Returns a decision per URL rather than a filtered list, so the console can
 * show what was dropped and why. /sitemap.xml keeps only the included ones.
 */
export function decideSitemap(
  candidates: SitemapCandidate[],
  settings: SitemapSettings
): SitemapDecision[] {
  return candidates.map((candidate) => {
    const rule = settings.rules[candidate.path];
    const groupOn = settings.groups[candidate.group] !== false;
    const ruleExcludes = rule?.include === false;

    return {
      ...candidate,
      included: groupOn && !ruleExcludes,
      // A rule that names a group's URL still shows its own weights, so
      // switching the group back on restores what the operator chose.
      priority: normalisePriority(rule?.priority, candidate.defaultPriority),
      changeFrequency: rule?.changeFrequency || candidate.defaultChangeFrequency,
      reason: ruleExcludes ? "rule" : !groupOn ? "group" : null,
      overridden: Boolean(
        rule && (rule.include === false || rule.priority !== undefined || rule.changeFrequency)
      ),
    };
  });
}

/** The extra URLs, shaped like decisions so the console lists them together. */
export function decideExtraUrls(settings: SitemapSettings): SitemapDecision[] {
  const now = new Date().toISOString();
  return settings.extraUrls.map((extra) => {
    const path = normalisePath(extra.path);
    return {
      path,
      group: "pages" as SitemapGroup,
      label: path,
      lastModified: now,
      defaultPriority: extra.priority,
      defaultChangeFrequency: extra.changeFrequency,
      included: true,
      priority: normalisePriority(extra.priority, 0.5),
      changeFrequency: extra.changeFrequency,
      reason: null,
      overridden: true,
    };
  });
}

/** Turns decisions into the shape Next writes out as XML. */
export function toSitemapEntries(
  decisions: SitemapDecision[],
  baseUrl: string
): MetadataRoute.Sitemap {
  const origin = baseUrl.replace(/\/+$/, "");
  const seen = new Set<string>();

  return decisions
    .filter((decision) => {
      if (!decision.included) return false;
      // An extra URL that repeats a generated one would list it twice.
      if (seen.has(decision.path)) return false;
      seen.add(decision.path);
      return true;
    })
    .map((decision) => ({
      url: `${origin}${decision.path === "/" ? "" : decision.path}`,
      lastModified: new Date(decision.lastModified),
      changeFrequency: decision.changeFrequency,
      priority: decision.priority,
    }));
}
