/**
 * Operator control over robots.txt.
 *
 * The file was already generated rather than static — it follows the canonical
 * URL and the noindex switch on its own — but everything it said beyond that
 * was fixed in code. These settings add the parts an operator actually needs to
 * change: which paths to keep out of every index, and which crawlers to refuse
 * outright.
 *
 * Two things are deliberately not settings. `/admin` and `/api/` are always
 * disallowed, because there is no version of this site where advertising them
 * is wanted. And robots.txt is a request, not a fence: it keeps well-behaved
 * crawlers out of a path, it does not protect anything. Access control is the
 * session guard, not this file.
 */

/**
 * The crawlers that collect training data and answer questions from a site's
 * content rather than sending readers to it.
 *
 * Grouped because they are one decision. An operator does not want to reason
 * about `anthropic-ai` and `Google-Extended` separately — they want to know
 * whether their writing feeds somebody's model.
 */
export const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "PerplexityBot",
  "Applebot-Extended",
  "Bytespider",
  "Amazonbot",
  "meta-externalagent",
  "Diffbot",
  "cohere-ai",
] as const;

/** One `User-agent` block. */
export interface RobotsAgentRule {
  id: string;
  /** "*", "Googlebot", "SemrushBot". */
  userAgent: string;
  allow: string[];
  disallow: string[];
  /** Seconds between requests. Ignored by Google; honoured by Bing and Yandex. */
  crawlDelay?: number;
}

export interface RobotsSettings {
  /** Paths refused to every crawler, on top of the built-in ones. */
  disallow: string[];
  /**
   * Paths allowed back.
   *
   * An Allow beats a Disallow when it is more specific, which is how a single
   * file under a disallowed folder is let through.
   */
  allow: string[];
  /** Applied to the `*` rule. Left undefined to omit the line entirely. */
  crawlDelay?: number;
  /** Refuses every agent in AI_CRAWLERS. */
  blockAiCrawlers: boolean;
  /** Extra per-agent blocks, for a crawler that needs its own treatment. */
  rules: RobotsAgentRule[];
}

/** Never served, whatever is configured. */
export const ALWAYS_DISALLOWED = ["/admin", "/admin/", "/api/"] as const;

export const DEFAULT_ROBOTS_SETTINGS: RobotsSettings = {
  disallow: [],
  allow: [],
  blockAiCrawlers: false,
  rules: [],
};

/**
 * Normalises a robots path.
 *
 * Unlike a sitemap URL this is a prefix pattern, so a trailing slash is
 * meaningful ("/admin/" matches only the folder) and `*` and `$` are legal.
 * Only the leading slash is enforced.
 */
export function normaliseRobotsPath(value: string): string {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

/** A user-agent token: no whitespace, since the line is `User-agent: <token>`. */
export function normaliseUserAgent(value: string): string {
  return String(value || "").trim().replace(/\s+/g, "-");
}
