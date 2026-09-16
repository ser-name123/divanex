import { NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost } from "@/lib/blogStore";
import { randomUUID } from "node:crypto";
import { sanitizeInput, safeHttpUrl } from "@/lib/security";
import { BlogPost } from "@/data/blogData";
import { requireAdmin } from "@/lib/guard";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");
    const status = searchParams.get("status");

    let posts = await getBlogPosts();

    // If client is public, default to published only
    if (status) {
      posts = posts.filter((p) => p.status === status);
    } else {
      // Return published by default unless specified
      posts = posts.filter((p) => p.status === "published");
    }

    if (category && category !== "All") {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (tag) {
      posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      posts,
      data: posts,
      total: posts.length
    });
  } catch (error) {
    console.error("[api:blog:GET]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: "Title and content are required." }, { status: 400 });
    }

    const title = sanitizeInput(body.title);
    const slug = (body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")).slice(0, 120);

    const newPost: BlogPost = {
      id: `post-${randomUUID()}`,
      slug,
      title,
      subtitle: sanitizeInput(body.subtitle || ""),
      excerpt: sanitizeInput(body.excerpt || ""),
      // Rendered through renderBlogContent(), which escapes before it builds
      // markup, so markdown survives and raw HTML never does. Capped so a
      // single post cannot exhaust the store.
      content: String(body.content || "").slice(0, 200000),
      coverImage: safeHttpUrl(
        body.coverImage,
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80"
      ),
      category: body.category || "Architecture & SaaS",
      author: {
        name: sanitizeInput(body.author?.name || "Divanex Engineering"),
        role: sanitizeInput(body.author?.role || "Lead Solutions Architect"),
        avatar: safeHttpUrl(
          body.author?.avatar,
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        )
      },
      publishedAt: new Date().toISOString().slice(0, 10),
      readTime: body.readTime || "7 min read",
      featured: Boolean(body.featured),
      status: body.status || "published",
      views: 0,
      likes: 0,
      tags: Array.isArray(body.tags)
        ? body.tags.filter((t: unknown) => typeof t === "string").slice(0, 20).map((t: string) => sanitizeInput(t))
        : ["Engineering", "SaaS"],
      tableOfContents: Array.isArray(body.tableOfContents) ? body.tableOfContents : []
    };

    const saved = await saveBlogPost(newPost);

    return NextResponse.json({
      success: true,
      post: saved,
      message: "Article published successfully."
    });
  } catch (error) {
    console.error("[api:blog:POST]", error);
    return NextResponse.json({ success: false, error: "Failed to publish blog post" }, { status: 500 });
  }
}
