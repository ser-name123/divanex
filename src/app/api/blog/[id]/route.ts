import { NextResponse } from "next/server";
import { getBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/blogStore";
import { requirePermission } from "@/lib/guard";
import { sanitizeInput, safeHttpUrl } from "@/lib/security";
import type { BlogPost } from "@/data/blogData";

const BLOG_CATEGORIES: readonly string[] = [
  "Architecture & SaaS",
  "Healthcare HMIS",
  "Enterprise ERP",
  "Fintech & Security",
  "AI & Autonomous Agents",
  "Cloud & DevOps",
];

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const check = await requirePermission("content.edit");
    if (!check.ok) return check.response;

    const { id } = await params;
    const body = await request.json();

    const posts = await getBlogPosts();
    const existing = posts.find((p) => p.id === id);

    if (!existing) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    // Explicit allowlist rather than a blind spread: {...existing, ...body}
    // lets any caller overwrite fields the editor never exposes, and lets an
    // unvalidated coverImage or author.avatar carry a javascript: URL.
    const updated = {
      ...existing,
      id: existing.id, // Primary key stays immutable
      ...(body.title !== undefined && { title: sanitizeInput(body.title) }),
      ...(body.subtitle !== undefined && { subtitle: sanitizeInput(body.subtitle) }),
      ...(body.excerpt !== undefined && { excerpt: sanitizeInput(body.excerpt) }),
      ...(body.content !== undefined && { content: String(body.content).slice(0, 200000) }),
      ...(BLOG_CATEGORIES.includes(body.category) && {
        category: body.category as BlogPost["category"],
      }),
      ...(body.readTime !== undefined && { readTime: sanitizeInput(body.readTime) }),
      ...(body.slug !== undefined && {
        slug: String(body.slug).toLowerCase().replace(/[^a-z0-9-]+/g, "-").slice(0, 120),
      }),
      ...(body.coverImage !== undefined && {
        coverImage: safeHttpUrl(body.coverImage, existing.coverImage),
      }),
      ...(body.author !== undefined && {
        author: {
          name: sanitizeInput(body.author?.name || existing.author.name),
          role: sanitizeInput(body.author?.role || existing.author.role),
          avatar: safeHttpUrl(body.author?.avatar, existing.author.avatar),
        },
      }),
      ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
      ...(body.status !== undefined && {
        status: (body.status === "draft" ? "draft" : "published") as BlogPost["status"],
      }),
      ...(Array.isArray(body.tags) && {
        tags: (body.tags as unknown[])
          .filter((t): t is string => typeof t === "string")
          .slice(0, 20)
          .map((t) => sanitizeInput(t)),
      }),
      ...(Array.isArray(body.tableOfContents) && {
        tableOfContents: body.tableOfContents.slice(0, 100) as BlogPost["tableOfContents"],
      }),
    };

    const saved = await saveBlogPost(updated);

    return NextResponse.json({
      success: true,
      post: saved,
      message: "Article updated successfully."
    });
  } catch (error) {
    console.error("[api:blog:PUT]", error);
    return NextResponse.json({ success: false, error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const check = await requirePermission("content.edit");
    if (!check.ok) return check.response;

    const { id } = await params;
    await deleteBlogPost(id);

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully."
    });
  } catch (error) {
    console.error("[api:blog:DELETE]", error);
    return NextResponse.json({ success: false, error: "Failed to delete post" }, { status: 500 });
  }
}
