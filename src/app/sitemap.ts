import type { MetadataRoute } from "next";
import { getAllTechSlugs } from "@/data/techDetails";
import { getContent } from "@/lib/contentStore";
import { getBlogPosts } from "@/lib/blogStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";

/**
 * Generated from the same records that drive generateStaticParams, so detail
 * pages can never silently drop out the way a hand-maintained sitemap does.
 *
 * The previous version listed services and case studies only, which left the
 * entire blog and all ~55 tech-stack detail pages undiscoverable except by
 * internal linking.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, serviceDetails, caseStudies, techDetails, techGrid] = await Promise.all([
    getSiteSettings(),
    getContent("service-details"),
    getContent("case-studies"),
    getContent("tech-details"),
    getContent("tech-stack"),
  ]);
  const baseUrl = settings.siteUrl;
  const lastModified = new Date();

  // A site marked noindex should not be advertising URLs either.
  if (settings.discourageSearchEngines) return [];

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/portfolio", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/why-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/process", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/tech-stack", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/faqs", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/security", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/cookies", priority: 0.4, changeFrequency: "monthly" as const },
    { path: "/nda", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/refund-policy", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  // Published posts only: a draft in the sitemap is a 404 or a thin page.
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogEntries = posts
      .filter((post) => post.status === "published")
      .map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : lastModified,
        changeFrequency: "monthly" as const,
        priority: post.featured ? 0.8 : 0.7,
      }));
  } catch {
    // A database hiccup must not fail the whole sitemap.
  }

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...Object.keys(serviceDetails).map((slug) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...Object.keys(caseStudies).map((slug) => ({
      url: `${baseUrl}/portfolio/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getAllTechSlugs(techDetails, techGrid).map((slug) => ({
      url: `${baseUrl}/tech-stack/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogEntries,
  ];
}
