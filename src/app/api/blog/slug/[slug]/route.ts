import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/blogStore";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post,
      data: post
    });
  } catch (error) {
    console.error("[api:blog:slug:GET]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch article" }, { status: 500 });
  }
}
