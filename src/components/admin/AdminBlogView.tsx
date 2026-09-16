"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost, initialBlogPosts } from "@/data/blogData";
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  ThumbsUp,
  Clock,
  Calendar,
  CheckCircle2,
  Sparkles,
  FileText,
  X,
  Layers,
  Save,
  Tag,
  AlertCircle
} from "lucide-react";
import { renderBlogPreview } from "@/lib/blogMarkdown";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { ImageField, PlainField } from "@/components/admin/fields";

interface AdminBlogViewProps {
  initialPosts?: BlogPost[];
}

export default function AdminBlogView({ initialPosts }: AdminBlogViewProps) {
  // Seeded from the server render. Posts live in the database via /api/blog;
  // the localStorage mirror this used to keep could go stale against it and
  // showed one browser a different set of posts from every other.
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || initialBlogPosts);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState<"All" | "published" | "draft">("All");

  // Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCategory, setFormCategory] = useState<BlogPost["category"]>("Architecture & SaaS");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formAuthorName, setFormAuthorName] = useState("Rajan S.");
  const [formAuthorRole, setFormAuthorRole] = useState("Lead Solutions Architect, Divanex");
  const [formAuthorAvatar, setFormAuthorAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
  const [formReadTime, setFormReadTime] = useState("8 min read");
  const [formTags, setFormTags] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Local view state only. The write itself already went to /api/blog.
  const persistPosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
  };

  // KPIs
  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "published").length;
    const drafts = posts.filter((p) => p.status === "draft").length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
    return { total, published, drafts, totalViews, totalLikes };
  }, [posts]);

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchStatus = selectedStatus === "All" || p.status === selectedStatus;
      const matchSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchStatus && matchSearch;
    });
  }, [posts, selectedCategory, selectedStatus, searchQuery]);

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setFormTitle("");
    setFormSlug("");
    setFormSubtitle("");
    setFormExcerpt("");
    setFormContent("## Architecture Overview\n\nEnter detailed technical content here...\n\n### Technical Specifications\n\n* Point 1\n* Point 2");
    setFormCategory("Architecture & SaaS");
    setFormCoverImage("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80");
    setFormAuthorName("Rajan S.");
    setFormAuthorRole("Lead Solutions Architect, Divanex");
    setFormAuthorAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
    setFormReadTime("8 min read");
    setFormTags("Architecture, SaaS, Engineering");
    setFormFeatured(false);
    setFormStatus("published");
    setSaveStatus(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormSubtitle(post.subtitle || "");
    setFormExcerpt(post.excerpt || "");
    setFormContent(post.content || "");
    setFormCategory(post.category);
    setFormCoverImage(post.coverImage);
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormAuthorAvatar(post.author.avatar);
    setFormReadTime(post.readTime);
    setFormTags(post.tags.join(", "));
    setFormFeatured(post.featured);
    setFormStatus(post.status);
    setSaveStatus(null);
    setIsEditorOpen(true);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving article...");

    const slug = (formSlug || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")).slice(0, 120);

    const tagsArray = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const postPayload: BlogPost = {
      id: editingPost ? editingPost.id : `post-${Date.now()}`,
      slug,
      title: formTitle,
      subtitle: formSubtitle,
      excerpt: formExcerpt,
      content: formContent,
      coverImage: formCoverImage,
      category: formCategory,
      author: {
        name: formAuthorName,
        role: formAuthorRole,
        avatar: formAuthorAvatar
      },
      publishedAt: editingPost ? editingPost.publishedAt : new Date().toISOString().slice(0, 10),
      readTime: formReadTime,
      featured: formFeatured,
      status: formStatus,
      views: editingPost ? editingPost.views : 0,
      likes: editingPost ? editingPost.likes : 0,
      tags: tagsArray,
      tableOfContents: []
    };

    let updated: BlogPost[];
    if (editingPost) {
      updated = posts.map((p) => (p.id === editingPost.id ? postPayload : p));
      // Call backend API
      try {
        await fetch(`/api/blog/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayload)
        });
      } catch (err) {
        console.warn("API update:", err);
      }
    } else {
      updated = [postPayload, ...posts];
      // Call backend API
      try {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayload)
        });
      } catch (err) {
        console.warn("API create:", err);
      }
    }

    persistPosts(updated);
    setSaveStatus("Saved successfully!");
    setTimeout(() => {
      setIsEditorOpen(false);
      setSaveStatus(null);
    }, 800);
  };

  const handleToggleStatus = async (post: BlogPost) => {
    const nextStatus: "published" | "draft" = post.status === "published" ? "draft" : "published";
    const updatedPost: BlogPost = { ...post, status: nextStatus };
    const updated = posts.map((p) => (p.id === post.id ? updatedPost : p));
    persistPosts(updated);

    try {
      await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
      });
    } catch {
      // Ignore
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this engineering article?")) return;
    const updated = posts.filter((p) => p.id !== id);
    persistPosts(updated);

    try {
      await fetch(`/api/blog/${id}`, {
        method: "DELETE"
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ------------------------------------------------------------- */}
      {/* KPI METRIC CARDS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Total Articles</span>
          <div className="text-2xl font-black text-slate-900">{stats.total}</div>
          <span className="text-[10px] text-sky-700 font-semibold block">Knowledge Base</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Published</span>
          <div className="text-2xl font-black text-emerald-700">{stats.published}</div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Live on /blog</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Drafts</span>
          <div className="text-2xl font-black text-amber-700">{stats.drafts}</div>
          <span className="text-[10px] text-amber-600 font-semibold block">In Review</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Total Views</span>
          <div className="text-2xl font-black text-sky-700">{stats.totalViews.toLocaleString()}</div>
          <span className="text-[10px] text-sky-600 font-semibold block">Cumulative Reads</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase">Reader Likes</span>
          <div className="text-2xl font-black text-purple-700">{stats.totalLikes.toLocaleString()}</div>
          <span className="text-[10px] text-purple-600 font-semibold block">Helpful Feedback</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER & ACTIONS TOOLBAR */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="Architecture & SaaS">Architecture & SaaS</option>
            <option value="Healthcare HMIS">Healthcare HMIS</option>
            <option value="Enterprise ERP">Enterprise ERP</option>
            <option value="Fintech & Security">Fintech & Security</option>
            <option value="AI & Autonomous Agents">AI & Autonomous Agents</option>
            <option value="Cloud & DevOps">Cloud & DevOps</option>
          </select>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
            {(["All", "published", "draft"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedStatus === st
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {st === "All" ? "All Status" : st === "published" ? "Published" : "Drafts"}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Create Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="btn-futuristic-primary !py-2 !px-4 text-xs font-bold flex items-center gap-2 !rounded-xl whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ARTICLES TABLE */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-bold">Article & Details</th>
                <th className="py-3.5 px-4 font-bold">Category</th>
                <th className="py-3.5 px-4 font-bold">Author</th>
                <th className="py-3.5 px-4 font-bold text-center">Engagement</th>
                <th className="py-3.5 px-4 font-bold text-center">Status</th>
                <th className="py-3.5 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No articles found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Article Thumbnail + Title */}
                    <td className="py-4 px-4 max-w-md">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-14 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 truncate block text-sm">
                              {post.title}
                            </span>
                            {post.featured && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 flex-shrink-0">
                                ⭐ FEATURED
                              </span>
                            )}
                          </div>
                          <p className="text-slate-500 text-[11px] truncate font-mono">
                            /blog/{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200"
                        />
                        <span className="text-xs font-bold text-slate-800">{post.author.name}</span>
                      </div>
                    </td>

                    {/* Views & Likes */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3 text-slate-600 font-mono text-[11px]">
                        <span className="flex items-center gap-1" title="Views">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center gap-1" title="Likes">
                          <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.likes}</span>
                        </span>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                        }`}
                      >
                        {post.status === "published" ? "● Published" : "○ Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-sky-700 border border-slate-200 transition-colors"
                          title="View Live Article"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEditModal(post)}
                          className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ARTICLE EDITOR MODAL */}
      {/* ------------------------------------------------------------- */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl animate-fadeIn">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingPost ? "Edit Engineering Article" : "Create New Engineering Article"}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Markdown-powered content studio with live preview
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architecting High-Concurrency Microservices in Go"
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                      if (!editingPost) {
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. architecting-microservices-go"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-sky-800 font-mono focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as BlogPost["category"])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 font-bold focus:outline-none focus:border-sky-500 focus:bg-white text-xs cursor-pointer"
                  >
                    <option value="Architecture & SaaS">Architecture & SaaS</option>
                    <option value="Healthcare HMIS">Healthcare HMIS</option>
                    <option value="Enterprise ERP">Enterprise ERP</option>
                    <option value="Fintech & Security">Fintech & Security</option>
                    <option value="AI & Autonomous Agents">AI & Autonomous Agents</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>

                {/* Subtitle */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Subtitle / Deck
                  </label>
                  <input
                    type="text"
                    placeholder="Brief secondary summary headline..."
                    value={formSubtitle}
                    onChange={(e) => setFormSubtitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Executive Summary / Excerpt *
                  </label>
                  <PlainField
                    value={formExcerpt}
                    onChange={setFormExcerpt}
                    rows={2}
                    limit={160}
                    placeholder="Short summary for article cards and the search snippet..."
                  />
                </div>

                {/* Cover Image URL */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Cover Image URL
                  </label>
                  <ImageField
                    value={formCoverImage}
                    onChange={setFormCoverImage}
                    placeholder="https://images.unsplash.com/…"
                  />
                </div>

                {/* Author Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Author role. Shown on the article byline. */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Author photo. There was no field for this, so the byline
                    always carried whatever the form was seeded with. */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Author Photo
                  </label>
                  <ImageField
                    value={formAuthorAvatar}
                    onChange={setFormAuthorAvatar}
                    shape="square"
                  />
                </div>

                {/* Read Time */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Read Time (e.g. 8 min read)
                  </label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Tags */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-700 block font-mono uppercase text-[11px]">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="SaaS, Architecture, Go, Postgres"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white text-xs"
                  />
                </div>

                {/* Options: Featured & Status */}
                <div className="sm:col-span-2 flex flex-wrap items-center gap-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>⭐ Mark as Featured Article</span>
                  </label>

                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700 font-mono text-[11px] uppercase">Status:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={formStatus === "published"}
                        onChange={() => setFormStatus("published")}
                        className="text-emerald-600"
                      />
                      <span className="font-bold text-emerald-700">Published</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={formStatus === "draft"}
                        onChange={() => setFormStatus("draft")}
                        className="text-amber-600"
                      />
                      <span className="font-bold text-amber-700">Draft</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Article body */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <label className="font-bold text-slate-800 block font-mono uppercase text-[11px]">
                  Article content *
                </label>

                {/* The preview uses the article renderer itself, so what is
                    checked here is exactly what the published page shows. */}
                <RichTextEditor
                  value={formContent}
                  onChange={setFormContent}
                  rows={14}
                  codeBlocks
                  renderPreview={renderBlogPreview}
                  placeholder="## Section heading — open with the problem, then the architecture"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                {saveStatus ? (
                  <span className="text-xs font-bold text-sky-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{saveStatus}</span>
                  </span>
                ) : (
                  <span />
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-futuristic-primary !py-2.5 !px-6 text-xs font-bold flex items-center gap-2 !rounded-xl"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingPost ? "Update Article" : "Publish Article"}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
