import type { Metadata } from "next";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { getBlogPosts } from "@/lib/blogStore";
import BlogPageClient from "./BlogPageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: "/blog" });
}

export default async function Page() {
  const settings = await getSiteSettings();
  const posts = await getBlogPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Divanex Engineering Blog & System Architecture Blueprints",
    "description": "Deep-dive technical write-ups on multi-tenant SaaS engineering, FHIR healthcare architectures, autonomous AI agents, and high-concurrency databases.",
    "url": `${settings.siteUrl}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": settings.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${settings.siteUrl}/brand-logo-icon.png`,
      },
    },
    "blogPost": posts
      .filter((post) => post.status === "published")
      .map((post) => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.publishedAt,
        "author": {
          "@type": "Person",
          "name": post.author.name,
        },
        "url": `${settings.siteUrl}/blog/${post.slug}`,
      })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            blogSchema,
            breadcrumbSchema(settings, [
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ])
          ),
        }}
      />
      <BlogPageClient />
    </>
  );
}

