import { BlogPost, initialBlogPosts } from "@/data/blogData";
import { getSupabase } from "@/lib/supabase";

let memoryBlogPosts: BlogPost[] = [...initialBlogPosts];

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      memoryBlogPosts = data.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle || "",
        excerpt: item.excerpt || "",
        content: item.content || "",
        coverImage: item.cover_image || "",
        category: item.category || "Architecture & SaaS",
        author: item.author || {
          name: "Divanex Engineering",
          role: "Solutions Architecture Team",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
        },
        publishedAt: item.published_at || new Date().toISOString().slice(0, 10),
        readTime: item.read_time || "6 min read",
        featured: Boolean(item.featured),
        status: item.status || "published",
        views: Number(item.views) || 0,
        likes: Number(item.likes) || 0,
        tags: Array.isArray(item.tags) ? item.tags : [],
        tableOfContents: Array.isArray(item.table_of_contents) ? item.table_of_contents : []
      }));
      return memoryBlogPosts;
    }
  } catch {
    // Fall back to in-memory seed posts
  }

  if (memoryBlogPosts.length === 0) {
    memoryBlogPosts = [...initialBlogPosts];
  }

  return memoryBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  // Increment view count in memory & best-effort supabase
  post.views += 1;
  try {
    const supabase = getSupabase();
    await supabase
      .from("blog_posts")
      .update({ views: post.views })
      .eq("slug", slug);
  } catch {
    // Ignore tracking failure
  }

  return post;
}

/**
 * Writes an article.
 *
 * This used to update a module-level array, attempt the database, and discard
 * whatever came back. Two things were wrong with that. The table did not
 * exist, so every write failed — and because the result was never checked,
 * the failure was invisible and the route reported success. And the array it
 * fell back to lives in one serverless instance, so even a "saved" post was
 * gone by the next request, from a different instance.
 *
 * A failed write now throws. Losing an article is bad; telling someone it was
 * published when it was not is worse, because they stop looking for it.
 */
export async function saveBlogPost(post: BlogPost): Promise<BlogPost> {
  const existingIdx = memoryBlogPosts.findIndex((p) => p.id === post.id);
  if (existingIdx >= 0) {
    memoryBlogPosts[existingIdx] = post;
  } else {
    memoryBlogPosts.unshift(post);
  }

  {
    const supabase = getSupabase();
    const { error } = await supabase.from("blog_posts").upsert({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.coverImage,
      category: post.category,
      author: post.author,
      published_at: post.publishedAt,
      read_time: post.readTime,
      featured: post.featured,
      status: post.status,
      views: post.views,
      likes: post.likes,
      tags: post.tags,
      table_of_contents: post.tableOfContents,
      updated_at: new Date().toISOString()
    });

    if (error) {
      throw new Error(`Could not save the article: ${error.message}`);
    }
  }

  return post;
}

/** Deletes an article, and says so plainly when it could not. */
export async function deleteBlogPost(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    throw new Error(`Could not delete the article: ${error.message}`);
  }

  memoryBlogPosts = memoryBlogPosts.filter((p) => p.id !== id);
  return true;
}
