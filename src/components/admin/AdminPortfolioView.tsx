"use client";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState, useEffect } from "react";
import {
  FolderGit2,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  Layers,
  BarChart3,
  Globe,
  Tag,
  ArrowUpRight
} from "lucide-react";
import { portfolioProjects, PortfolioProject } from "@/data/portfolio";
import { useAdminContent } from "@/lib/useAdminContent";

export default function AdminPortfolioView() {
  // Server-backed: edits reach every visitor and every other admin browser,
  // which a localStorage copy never did.
  const {
    data: projects,
    save: persistContent,
    loading: contentLoading,
    saving: contentSaving,
  } = useAdminContent("portfolio", portfolioProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State for Create/Edit
  const [formData, setFormData] = useState<Partial<PortfolioProject>>({
    title: "",
    category: "SaaS",
    tagline: "",
    description: "",
    impactMetric: "+150%",
    impactLabel: "Performance Metric",
    techStack: ["Next.js 15", "TypeScript", "PostgreSQL"],
    gradient: "from-blue-600/30 via-indigo-900/20 to-slate-950",
    imagePlaceholderColor: "bg-blue-600/20"
  });

  const [techStackInput, setTechStackInput] = useState("Next.js 15, TypeScript, PostgreSQL");


  const saveToStorage = async (updated: PortfolioProject[]) => {
    const ok = await persistContent(updated);
    if (!ok) showToast("Could not save. Your change was not published.");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      id: `proj-${Date.now()}`,
      title: "",
      category: "SaaS",
      tagline: "",
      description: "",
      impactMetric: "+250%",
      impactLabel: "Efficiency / Revenue Gain",
      techStack: ["Next.js 15", "TypeScript", "PostgreSQL"],
      gradient: "from-blue-600/30 via-indigo-900/20 to-slate-950",
      imagePlaceholderColor: "bg-blue-600/20"
    });
    setTechStackInput("Next.js 15, TypeScript, PostgreSQL");
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (p: PortfolioProject) => {
    setEditingProject(p);
    setFormData(p);
    setTechStackInput(p.techStack.join(", "));
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove case study "${title}"?`)) {
      const updated = projects.filter((p) => p.id !== id);
      saveToStorage(updated);
      showToast(`Project "${title}" deleted successfully.`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.description?.trim()) return;

    const stackList = techStackInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectToSave: PortfolioProject = {
      id: editingProject ? editingProject.id : (formData.id || `proj-${Date.now()}`),
      title: formData.title.trim(),
      category: (formData.category as PortfolioProject["category"]) || "SaaS",
      tagline: formData.tagline?.trim() || "Engineered for high performance",
      description: formData.description.trim(),
      impactMetric: formData.impactMetric?.trim() || "+100%",
      impactLabel: formData.impactLabel?.trim() || "Operational Gain",
      techStack: stackList.length > 0 ? stackList : ["Next.js", "TypeScript"],
      gradient: formData.gradient || "from-blue-600/30 via-indigo-900/20 to-slate-950",
      imagePlaceholderColor: formData.imagePlaceholderColor || "bg-blue-600/20"
    };

    let updatedList: PortfolioProject[];
    if (editingProject) {
      updatedList = projects.map((p) => (p.id === editingProject.id ? projectToSave : p));
      showToast(`Case study "${projectToSave.title}" updated.`);
    } else {
      updatedList = [projectToSave, ...projects];
      showToast(`New case study "${projectToSave.title}" added to portfolio.`);
    }

    saveToStorage(updatedList);
    setIsCreateModalOpen(false);
  };

  // Filter logic
  const categories = ["all", "SaaS", "AI", "Mobile App", "Web Platform", "E-Commerce", "FinTech"];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Toast Banner */}
      {toastMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <FolderGit2 className="w-3.5 h-3.5 text-sky-600" />
            <span>PORTFOLIO & CASE STUDIES CMS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Client Portfolio & Architecture Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Manage live public case studies, engineering impact metrics, stack tags, and client deliverables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Projects</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">100% Production Live</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Top Category</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">SaaS & AI</div>
          <span className="text-[10px] text-purple-700 font-bold">14 Flagship Sprints</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Avg Impact Metric</span>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">+180%</div>
          <span className="text-[10px] text-slate-500">Client Velocity Gain</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Public Visibility</span>
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">/portfolio</div>
          <span className="text-[10px] text-sky-700 font-bold">Synchronized Live</span>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, client taglines, or technologies..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 lg:pb-0">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-sky-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Top Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase font-bold bg-sky-50 border border-sky-200 text-sky-800">
                  {p.category}
                </span>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-sky-700 transition-all cursor-pointer"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-700 transition-all cursor-pointer"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-sans group-hover:text-sky-700 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-500 font-sans line-clamp-1 italic">
                &ldquo;{p.tagline}&rdquo;
              </p>
            </div>

            {/* Impact Metric Card */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">{p.impactLabel}</span>
                <span className="text-lg font-bold font-mono text-emerald-700">{p.impactMetric}</span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-emerald-600 shrink-0" />
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 font-sans line-clamp-3 leading-relaxed">
              {p.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
              <Tag className="w-3 h-3 text-slate-400 shrink-0" />
              {p.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
          <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700 font-sans">No portfolio projects found</h4>
          <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords.</p>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn font-mono">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 space-y-5 text-slate-800 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                <FolderGit2 className="w-4 h-4" />
                <span>{editingProject ? "EDIT CASE STUDY" : "ADD NEW PORTFOLIO PROJECT"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. CloudScale Multi-Tenant SaaS"
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || "SaaS"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PortfolioProject["category"] })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  >
                    <option value="SaaS">SaaS</option>
                    <option value="AI">AI</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Web Platform">Web Platform</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="FinTech">FinTech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Tagline / High-Level Scope
                </label>
                <input
                  type="text"
                  value={formData.tagline || ""}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="e.g. Enterprise workflow automation & subscription management engine"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Impact Metric (e.g. +340%, &lt;85ms)
                  </label>
                  <input
                    type="text"
                    value={formData.impactMetric || ""}
                    onChange={(e) => setFormData({ ...formData, impactMetric: e.target.value })}
                    placeholder="+340%"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Impact Label
                  </label>
                  <input
                    type="text"
                    value={formData.impactLabel || ""}
                    onChange={(e) => setFormData({ ...formData, impactLabel: e.target.value })}
                    placeholder="Operational Efficiency Gain"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  placeholder="Next.js 15, TypeScript, Node.js, PostgreSQL, Stripe API"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Detailed Case Study Description *
                </label>
                <RichTextEditor
                  value={formData.description || ""}
                  onChange={(description) => setFormData({ ...formData, description })}
                  rows={4}
                  inline
                  placeholder="Engineered an all-in-one cloud platform allowing enterprises to manage inventory, automate invoices..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md transition-all cursor-pointer"
                >
                  {editingProject ? "Save Changes" : "Publish Case Study"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
