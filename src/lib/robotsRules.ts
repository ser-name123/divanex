import type { MetadataRoute } from "next";
import {
  AI_CRAWLERS,
  ALWAYS_DISALLOWED,
  normaliseRobotsPath,
  normaliseUserAgent,
  type RobotsSettings,
} from "@/data/robotsSettings";

/**
 * Builds the robots rules.
 *
 * Shared so /robots.txt and the console preview describe the same file. The
 * route returns this object; the console serialises it. Only the formatting is
 * written twice, and Next's own serialiser decides the real one — so the two
 * can differ in whitespace but never in what they permit.
 */

export interface BuildRobotsInput {
  settings: RobotsSettings;
  /** Paths from the Search & metadata screen, kept working after the move. */
  legacyDisallow?: string[];
  discourageSearchEngines: boolean;
  siteUrl: string;
}

function clean(paths: string[] | undefined): string[] {
  return [...new Set((paths || []).map(normaliseRobotsPath).filter(Boolean))];
}

export function buildRobots({
  settings,
  legacyDisallow,
  discourageSearchEngines,
  siteUrl,
}: BuildRobotsInput): MetadataRoute.Robots {
  const host = siteUrl.replace(/\/+$/, "");

  // Staging and pre-launch: keep the whole site out of every index. Nothing
  // below applies, and no sitemap is advertised either.
  if (discourageSearchEngines) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      host,
    };
  }

  const disallow = clean([...ALWAYS_DISALLOWED, ...(legacyDisallow || []), ...settings.disallow]);
  const allow = clean(settings.allow);

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",
      allow: allow.length > 0 ? ["/", ...allow] : "/",
      disallow,
      ...(settings.crawlDelay ? { crawlDelay: settings.crawlDelay } : {}),
    },
  ];

  // One block listing every AI agent, rather than one block each: the file is
  // read by people as well, and fifteen identical stanzas hide the one rule
  // that is actually different.
  if (settings.blockAiCrawlers) {
    rules.push({
      userAgent: [...AI_CRAWLERS],
      disallow: "/",
    });
  }

  for (const rule of settings.rules) {
    const userAgent = normaliseUserAgent(rule.userAgent);
    if (!userAgent) continue;

    const ruleDisallow = clean(rule.disallow);
    const ruleAllow = clean(rule.allow);

    rules.push({
      userAgent,
      ...(ruleAllow.length > 0 ? { allow: ruleAllow } : {}),
      // A block with neither line permits everything, which is almost never
      // what somebody naming a crawler meant.
      disallow: ruleDisallow.length > 0 ? ruleDisallow : "/",
      ...(rule.crawlDelay ? { crawlDelay: rule.crawlDelay } : {}),
    });
  }

  return {
    rules,
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}

/**
 * Renders the rules as text, for the console preview only.
 *
 * Next writes the served file itself. This exists so an operator can see what
 * they are about to save without deploying it, and matches Next's output in
 * content — the order of directives within a block is the same.
 */
export function serialiseRobots(robots: MetadataRoute.Robots): string {
  const lines: string[] = [];
  const list = Array.isArray(robots.rules) ? robots.rules : robots.rules ? [robots.rules] : [];

  for (const rule of list) {
    const agents = Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent || "*"];
    for (const agent of agents) lines.push(`User-agent: ${agent}`);

    const allow = rule.allow === undefined ? [] : Array.isArray(rule.allow) ? rule.allow : [rule.allow];
    for (const path of allow) lines.push(`Allow: ${path}`);

    const disallow =
      rule.disallow === undefined ? [] : Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
    for (const path of disallow) lines.push(`Disallow: ${path}`);

    if (rule.crawlDelay) lines.push(`Crawl-delay: ${rule.crawlDelay}`);

    lines.push("");
  }

  if (robots.host) lines.push(`Host: ${robots.host}`);

  const sitemaps = robots.sitemap
    ? Array.isArray(robots.sitemap)
      ? robots.sitemap
      : [robots.sitemap]
    : [];
  for (const url of sitemaps) lines.push(`Sitemap: ${url}`);

  return `${lines.join("\n").trim()}\n`;
}
