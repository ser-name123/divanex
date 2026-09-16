"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import NeuralBackground from "@/components/NeuralBackground";
import ScrollObserver from "@/components/ScrollObserver";
import { initialBlogPosts, BlogPost } from "@/data/blogData";
import BlogDirectoryClient from "@/components/blog/BlogDirectoryClient";

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setPosts(data.data);
        }
      })
      .catch(() => {
        // Fallback to defaultBlogPosts
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f7f9f9] text-slate-900 selection:bg-sky-500 selection:text-white overflow-x-hidden">
      <NeuralBackground />
      <CustomCursor />
      <ScrollObserver />

      <Navbar />

      <main>
        {/* Section 1: 2-Column Telemetry Header */}
        <PageHeader route="/blog" tokens={{ postCount: posts.length }} />

        {/* Section 2: Interactive Blog Directory */}
        <BlogDirectoryClient initialPosts={posts} />
      </main>

      <Footer />
    </div>
  );
}
