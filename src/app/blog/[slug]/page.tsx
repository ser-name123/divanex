import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/blogStore";
import BlogPostDetailClient from "@/components/blog/BlogPostDetailClient";
import { breadcrumbSchema, buildPageMetadata, jsonLdScript } from "@/lib/seo";
import { getSiteSettings } from "@/lib/siteSettingsStore";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found", robots: { index: false, follow: false } };
  }

  const keywords = [
    ...(post.tags || []),
    post.category,
    "Software Architecture",
    "Divanex Engineering Blog",
    "Cloud Infrastructure",
    "Production Systems"
  ];

  return buildPageMetadata({
    path: `/blog/${post.slug}`,
    title: `${post.title} | Divanex Engineering`,
    description: post.excerpt,
    keywords,
    ogImage: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt,
    authorName: post.author.name,
    // A draft that is still reachable by URL should not be indexed.
    noIndex: post.status !== "published",
  });
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts.filter(
    (p) => p.slug !== post.slug && (p.category === post.category || p.featured)
  );

  // JSON-LD Schema for Google Rich Article Cards
  const seoSettings = await getSiteSettings();
  const breadcrumbLeafName = post.title;
  const breadcrumbLeafPath = `/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": post.publishedAt,
    "keywords": (post.tags || []).join(", "),
    "articleSection": post.category,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": seoSettings.siteName,
      "url": seoSettings.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${seoSettings.siteUrl}/brand-logo-icon.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${seoSettings.siteUrl}/blog/${post.slug}`
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      {/* Dynamic SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript(
            articleSchema,
            breadcrumbSchema(seoSettings, [
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: breadcrumbLeafName, path: breadcrumbLeafPath },
            ])
          ),
        }}
      />

      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      {/* Global Navigation */}
      <Navbar />

      <main className="pt-20">
        <BlogPostDetailClient post={post} relatedPosts={relatedPosts} />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
