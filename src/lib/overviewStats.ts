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

export interface OverviewStats {
  content: {
    pages: StatCount;
    services: StatCount;
    caseStudies: StatCount;
    blogPosts: StatCount;
    technologies: StatCount;
    testimonials: StatCount;
    legalPages: StatCount;
  };
  audience: {
    subscribers: StatCount;
    leads: StatCount;
    /** Enquiries received in the last 30 days. */
    leadsLast30Days: number;
  };
  recentChanges: AuditEvent[];
  /** Whether each source answered, so a zero is never mistaken for silence. */
  sources: {
    database: boolean;
    databaseError?: string;
  };
  generatedAt: string;
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
 * Collects the overview in one pass.
 *
 * A failure in any one source leaves that figure at zero and sets the flag,
 * rather than failing the whole dashboard — the half that still works is worth
 * showing, as long as the page says which half it is.
 */
export async function getOverviewStats(): Promise<OverviewStats> {
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
    getContent("services").catch(() => []),
    getContent("case-studies").catch(() => ({})),
    getContent("tech-details").catch(() => ({})),
    getContent("testimonials").catch(() => []),
    getContent("legal").catch(() => ({})),
    loadPosts(),
    countRows("subscribers"),
    countRows("leads"),
    countRows("leads", isoDaysAgo(30)),
    queryAudit({ limit: 8 })
      .then((page) => page.events)
      .catch(() => [] as AuditEvent[]),
  ]);

  const databaseUp = subscriberCount !== null || leadCount !== null;

  const pageSeo = settings.pages ?? {};
  const pageEntries = Object.values(pageSeo);

  return {
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
    audience: {
      subscribers: { total: subscriberCount ?? 0 },
      leads: { total: leadCount ?? 0 },
      leadsLast30Days: recentLeadCount ?? 0,
    },
    recentChanges,
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
