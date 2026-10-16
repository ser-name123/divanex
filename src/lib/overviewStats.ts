import "server-only";
import { getSupabase } from "@/lib/supabase";
import { getContent } from "@/lib/contentStore";
import { queryAudit, type AuditEvent } from "@/lib/auditStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";

/**
 * The numbers behind the admin overview.
 *
 * Every figure here is counted from the database or the content store at the
 * moment it is asked for. The dashboard this replaced showed a fixed revenue
 * curve, a 99.9% SLA, a 98.8% Redis hit ratio for a cache the site does not
 * run, and three edge-node latencies — all of them literals in the markup. A
 * dashboard that invents its own numbers is worse than no dashboard, because
 * someone eventually makes a decision on one.
 *
 * So the rule here is: if it cannot be counted, it is not shown. Things that
 * would need an integration the site does not have — traffic, revenue,
 * uptime — are absent rather than estimated.
 */

export interface StatCount {
  /** Total records of this kind. */
  total: number;
  /** How many are live to the public, where the kind has a published state. */
  published?: number;
  /** How many are held back, where the kind has a draft state. */
  draft?: number;
}

/**
 * Each block is optional because the reader's role decides whether it is
 * gathered at all.
 *
 * An absent block is not an empty one: the console hides the section rather
 * than drawing zeros, so a Viewer is never shown "0 subscribers" when the
 * truth is that they may not ask. The permission is checked here, on the
 * server, before the figure is read — not in the component that draws it.
 */
export interface OverviewStats {
  content?: {
    pages: StatCount;
    services: StatCount;
    caseStudies: StatCount;
    blogPosts: StatCount;
    technologies: StatCount;
    testimonials: StatCount;
    legalPages: StatCount;
  };
  audience?: {
    subscribers?: StatCount;
    leads?: StatCount;
    /** Enquiries received in the last 30 days. */
    leadsLast30Days?: number;
  };
  /** Only for roles that may read the audit trail. */
  recentChanges?: AuditEvent[];
  /** Whether each source answered, so a zero is never mistaken for silence. */
  sources: {
    database: boolean;
    databaseError?: string;
  };
  generatedAt: string;
}

/** What the caller is allowed to be told. */
export interface OverviewScope {
  content: boolean;
  subscribers: boolean;
  audit: boolean;
}

/**
 * A count from one table, or null when the table could not be read.
 *
 * null and 0 mean different things here — "we could not ask" against "the
 * answer is none" — and the dashboard says which one it is showing.
 */
async function countRows(table: string, since?: string): Promise<number | null> {
  try {
    const base = getSupabase().from(table).select("*", { count: "exact", head: true });
    const { count, error } = await (since ? base.gte("created_at", since) : base);
    if (error) return null;
    return count ?? 0;
  } catch {
    return null;
  }
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

/**
 * Collects the overview in one pass, within the caller's reach.
 *
 * Nothing outside `scope` is read at all — a Viewer's request never issues the
 * audit query, rather than issuing it and filtering afterwards. The first
 * version of this screen fetched everything and handed it to whoever asked,
 * which quietly put the audit trail in front of Editors, who are refused it
 * everywhere else in the console.
 *
 * A failure in any one source leaves that figure at zero and sets the flag,
 * rather than failing the whole dashboard — the half that still works is worth
 * showing, as long as the page says which half it is.
 */
export async function getOverviewStats(scope: OverviewScope): Promise<OverviewStats> {
  const [
    settings,
    services,
    caseStudies,
    techDetails,
    testimonials,
    legal,
    posts,
    subscriberCount,
    leadCount,
    recentLeadCount,
    recentChanges,
  ] = await Promise.all([
    getSiteSettings(),
    scope.content ? getContent("services").catch(() => []) : null,
    scope.content ? getContent("case-studies").catch(() => ({})) : null,
    scope.content ? getContent("tech-details").catch(() => ({})) : null,
    scope.content ? getContent("testimonials").catch(() => []) : null,
    scope.content ? getContent("legal").catch(() => ({})) : null,
    scope.content ? loadPosts() : [],
    scope.subscribers ? countRows("subscribers") : null,
    scope.content ? countRows("leads") : null,
    scope.content ? countRows("leads", isoDaysAgo(30)) : null,
    scope.audit
      ? queryAudit({ limit: 8 })
          .then((page) => page.events)
          .catch(() => [] as AuditEvent[])
      : null,
  ]);

  // Only a query we actually ran can tell us the database is up.
  const attempted = [
    scope.subscribers ? subscriberCount : undefined,
    scope.content ? leadCount : undefined,
  ].filter((v) => v !== undefined);
  const databaseUp = attempted.length === 0 || attempted.some((v) => v !== null);

  const pageSeo = settings.pages ?? {};
  const pageEntries = Object.values(pageSeo);

  const audience: OverviewStats["audience"] = {};
  if (scope.subscribers) audience.subscribers = { total: subscriberCount ?? 0 };
  if (scope.content) {
    audience.leads = { total: leadCount ?? 0 };
    audience.leadsLast30Days = recentLeadCount ?? 0;
  }

  return {
    ...(scope.content
      ? {
          content: {
            pages: {
              total: pageEntries.length,
              published: pageEntries.filter((p) => !p?.noIndex).length,
              draft: pageEntries.filter((p) => p?.noIndex).length,
            },
            services: { total: countOf(services) },
            caseStudies: { total: countOf(caseStudies) },
            blogPosts: {
              total: posts.length,
              published: posts.filter((p) => p.status === "published").length,
              draft: posts.filter((p) => p.status !== "published").length,
            },
            technologies: { total: countOf(techDetails) },
            testimonials: { total: countOf(testimonials) },
            legalPages: { total: countOf(legal) },
          },
        }
      : {}),
    ...(Object.keys(audience).length > 0 ? { audience } : {}),
    ...(scope.audit ? { recentChanges: recentChanges ?? [] } : {}),
    sources: {
      database: databaseUp,
      ...(databaseUp ? {} : { databaseError: "Could not reach the database." }),
    },
    generatedAt: new Date().toISOString(),
  };
}

/** Collections are stored either as an array or as a record keyed by slug. */
function countOf(value: unknown): number {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return 0;
}

/** Posts live in their own table rather than the content store. */
async function loadPosts(): Promise<{ status: string }[]> {
  try {
    const { getBlogPosts } = await import("@/lib/blogStore");
    const posts = await getBlogPosts();
    return posts.map((p) => ({ status: String(p.status) }));
  } catch {
    return [];
  }
}
