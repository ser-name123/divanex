import type { PageSeo, SiteSettings } from "@/data/siteSettings";

/**
 * The checks the console runs over search metadata.
 *
 * Deliberately a pure function over data the caller supplies: the same rules
 * then answer for the live record on the server and for unsaved edits in the
 * browser, and neither can drift from the other.
 *
 * Two rules about what belongs here.
 *
 * Every finding must be actionable. There is no field for image alt text yet,
 * so "missing alt text" would be a complaint nobody can answer and is not
 * raised — it belongs with the work that adds the field.
 *
 * Nothing here predicts rankings. These are mechanical facts about the text:
 * a description over a hundred and sixty characters is cut off in the result,
 * two pages sharing a title are hard to tell apart. Whether any of it moves a
 * position is not something this or any other tool can say.
 */

export type Severity = "error" | "warning";

export interface SeoIssue {
  /** Route or record the finding belongs to, e.g. "/services". */
  scope: string;
  /** Which field, so the console can point at it. */
  field: "title" | "description" | "slug" | "indexing" | "image";
  severity: Severity;
  /** One line, written to be read by whoever has to fix it. */
  message: string;
}

/**
 * Google truncates around these lengths. They are not limits the site
 * enforces — a longer title still works, it is just not all read.
 */
export const TITLE_MAX = 60;
export const TITLE_MIN = 20;
export const DESCRIPTION_MAX = 160;
export const DESCRIPTION_MIN = 70;

/** Normalised for comparison: case and spacing should not hide a duplicate. */
function fingerprint(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Pages sharing a value, keyed by that value. Singles are dropped. */
function duplicates(entries: Array<[string, string]>): Map<string, string[]> {
  const byValue = new Map<string, string[]>();

  for (const [route, value] of entries) {
    const key = fingerprint(value);
    if (!key) continue;
    byValue.set(key, [...(byValue.get(key) ?? []), route]);
  }

  for (const [key, routes] of byValue) {
    if (routes.length < 2) byValue.delete(key);
  }

  return byValue;
}

export interface SeoCheckInput {
  settings: SiteSettings;
  /** Routes the console offers fields for, so an unmanaged page is not blamed. */
  managedRoutes: readonly string[];
  /** Slugs per collection, for collisions a single record cannot see. */
  slugs?: {
    services?: string[];
    caseStudies?: string[];
    technologies?: string[];
    posts?: Array<{ slug: string; title: string; status: string }>;
  };
  /** Routes reachable from the header or footer, for the noindex conflict. */
  linkedRoutes?: string[];
}

export function runSeoChecks(input: SeoCheckInput): SeoIssue[] {
  const { settings, managedRoutes, slugs, linkedRoutes } = input;
  const issues: SeoIssue[] = [];

  const pageOf = (route: string): PageSeo =>
    settings.pages?.[route] ?? { title: "", description: "" };

  // ---- per page -------------------------------------------------------
  for (const route of managedRoutes) {
    const page = pageOf(route);
    const title = (page.title || "").trim();
    const description = (page.description || "").trim();

    if (!title) {
      issues.push({
        scope: route,
        field: "title",
        severity: "error",
        message: "No search title. The page falls back to the site default, so every page looks the same in results.",
      });
    } else {
      if (title.length > TITLE_MAX) {
        issues.push({
          scope: route,
          field: "title",
          severity: "warning",
          message: `Title is ${title.length} characters; past about ${TITLE_MAX} the end is cut off in results.`,
        });
      }
      if (title.length < TITLE_MIN) {
        issues.push({
          scope: route,
          field: "title",
          severity: "warning",
          message: `Title is only ${title.length} characters. There is room to say what the page is for.`,
        });
      }
    }

    if (!description) {
      issues.push({
        scope: route,
        field: "description",
        severity: "error",
        message: "No description. Google writes its own from the page, and it is rarely the sentence you would choose.",
      });
    } else {
      if (description.length > DESCRIPTION_MAX) {
        issues.push({
          scope: route,
          field: "description",
          severity: "warning",
          message: `Description is ${description.length} characters; past about ${DESCRIPTION_MAX} the end is cut off.`,
        });
      }
      if (description.length < DESCRIPTION_MIN) {
        issues.push({
          scope: route,
          field: "description",
          severity: "warning",
          message: `Description is only ${description.length} characters. Short ones often get replaced by Google's own text.`,
        });
      }
    }

    // A page kept out of search that the menus still point at. Either the
    // link is pointless or the setting is a mistake; both are worth knowing.
    if (page.noIndex && linkedRoutes?.includes(route)) {
      issues.push({
        scope: route,
        field: "indexing",
        severity: "warning",
        message: "Set to noindex but still linked from the site menus. Readers can reach it; search engines are told to ignore it.",
      });
    }
  }

  // ---- across pages ---------------------------------------------------
  const titleDupes = duplicates(
    managedRoutes.map((r) => [r, pageOf(r).title || ""] as [string, string])
  );
  for (const [, routes] of titleDupes) {
    for (const route of routes) {
      issues.push({
        scope: route,
        field: "title",
        severity: "warning",
        message: `Same title as ${routes.filter((r) => r !== route).join(", ")}. Results for these pages are hard to tell apart.`,
      });
    }
  }

  const descDupes = duplicates(
    managedRoutes.map((r) => [r, pageOf(r).description || ""] as [string, string])
  );
  for (const [, routes] of descDupes) {
    for (const route of routes) {
      issues.push({
        scope: route,
        field: "description",
        severity: "warning",
        message: `Same description as ${routes.filter((r) => r !== route).join(", ")}.`,
      });
    }
  }

  // ---- whole site -----------------------------------------------------
  if (settings.discourageSearchEngines) {
    issues.push({
      scope: "site",
      field: "indexing",
      severity: "error",
      message: "The whole site is set to discourage search engines. Nothing will be indexed while this is on — correct before launch, wrong after it.",
    });
  }

  if (!settings.defaultOgImage?.trim()) {
    issues.push({
      scope: "site",
      field: "image",
      severity: "warning",
      message: "No default social image. Links shared to WhatsApp, LinkedIn or Slack will have no picture.",
    });
  }

  if (!/^https:\/\//.test(settings.siteUrl || "")) {
    issues.push({
      scope: "site",
      field: "slug",
      severity: "error",
      message: "The canonical address is not an https URL. Every canonical, the sitemap and robots.txt are built from it.",
    });
  }

  // ---- record slugs ---------------------------------------------------
  if (slugs) {
    const seen = new Map<string, string[]>();
    const add = (kind: string, list: string[] = []) => {
      for (const slug of list) {
        const key = `${kind}:${fingerprint(slug)}`;
        seen.set(key, [...(seen.get(key) ?? []), slug]);
      }
    };
    add("services", slugs.services);
    add("portfolio", slugs.caseStudies);
    add("tech-stack", slugs.technologies);
    add("blog", slugs.posts?.map((p) => p.slug));

    for (const [key, list] of seen) {
      if (list.length < 2) continue;
      const [kind, slug] = key.split(":");
      issues.push({
        scope: `/${kind}/${slug}`,
        field: "slug",
        severity: "error",
        message: `${list.length} records share this address. Only one of them can be reached.`,
      });
    }

    for (const post of slugs.posts ?? []) {
      if (post.status !== "published") continue;
      if (!post.title?.trim()) {
        issues.push({
          scope: `/blog/${post.slug}`,
          field: "title",
          severity: "error",
          message: "Published article with no title.",
        });
      }
    }
  }

  return issues;
}

/** Counts for a summary line, so the console does not recompute them. */
export function summarise(issues: SeoIssue[]): { errors: number; warnings: number } {
  return {
    errors: issues.filter((i) => i.severity === "error").length,
    warnings: issues.filter((i) => i.severity === "warning").length,
  };
}
