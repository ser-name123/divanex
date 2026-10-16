import { ok, serverError } from "@/lib/api";
import { noStore, requirePermission } from "@/lib/guard";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getContent } from "@/lib/contentStore";
import { getBlogPosts } from "@/lib/blogStore";
import { SEO_MANAGED_ROUTES } from "@/data/siteSettings";
import { runSeoChecks, summarise, type SeoIssue } from "@/lib/seoChecks";

/**
 * Runs the metadata checks over everything at once.
 *
 * The console could check the page it has open and nothing else, but the
 * findings that matter most are the ones a single page cannot see: two pages
 * sharing a title, a record whose address collides with another, a page kept
 * out of search that the menus still link to. Those need the whole picture,
 * so the whole picture is gathered here.
 *
 * Behind `settings.view`, like the screen that shows it. Never cached: a
 * check that reports yesterday's problems is worse than none, because it gets
 * believed.
 */

/** Every internal route the header or footer points at. */
function linkedRoutes(navigation: unknown): string[] {
  const found = new Set<string>();

  const walk = (node: unknown): void => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!node || typeof node !== "object") return;

    for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
      if (key === "href" && typeof value === "string" && value.startsWith("/")) {
        found.add(value.split("#")[0].split("?")[0] || "/");
      } else {
        walk(value);
      }
    }
  };

  walk(navigation);
  return [...found];
}

export async function GET() {
  const check = await requirePermission("settings.view");
  if (!check.ok) return check.response;

  try {
    const [settings, navigation, services, caseStudies, technologies, posts] =
      await Promise.all([
        getSiteSettings(),
        getContent("navigation").catch(() => ({})),
        getContent("service-details").catch(() => ({})),
        getContent("case-studies").catch(() => ({})),
        getContent("tech-details").catch(() => ({})),
        getBlogPosts().catch(() => []),
      ]);

    const linked = linkedRoutes(navigation);

    const issues: SeoIssue[] = runSeoChecks({
      settings,
      managedRoutes: SEO_MANAGED_ROUTES.map((r) => r.path),
      linkedRoutes: linked,
      slugs: {
        services: Object.keys(services),
        caseStudies: Object.keys(caseStudies),
        technologies: Object.keys(technologies),
        posts: posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          status: String(p.status),
        })),
      },
    });

    // The browser re-runs the per-field rules against unsaved edits, and
    // needs the link map to do it; working it out there would mean shipping
    // the whole navigation record to the console for no other reason.
    return noStore(ok({ issues, linkedRoutes: linked, ...summarise(issues) }));
  } catch (cause) {
    return serverError("Could not run the metadata checks.", cause);
  }
}
