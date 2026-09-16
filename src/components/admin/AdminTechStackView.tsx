"use client";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Cpu,
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  Code2,
  Check
} from "lucide-react";
import { techStackData, TechItem, getTechSlug } from "@/data/techStack";
import { useAdminContent } from "@/lib/useAdminContent";

export default function AdminTechStackView() {
  // Server-backed: edits reach every visitor and every other admin browser,
  // which a localStorage copy never did.
  const {
    data: techList,
    save: persistContent,
    loading: contentLoading,
    saving: contentSaving,
  } = useAdminContent("tech-stack", techStackData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingTech, setEditingTech] = useState<TechItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<TechItem>>({
    name: "",
    category: "frontend",
    iconText: "▲",
    description: "",
    version: "v1.0",
    useCase: "Enterprise Web Applications",
    badgeColor: "border-sky-400/30 text-sky-800 bg-sky-50"
  });


  const saveToStorage = async (updated: TechItem[]) => {
    const ok = await persistContent(updated);
    if (!ok) showToast("Could not save. Your change was not published.");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingTech(null);
    setFormData({
      name: "",
      category: "frontend",
      iconText: "⚡",
      description: "",
      version: "v1.0+",
      useCase: "High-Performance Cloud Systems",
      badgeColor: "border-sky-400/30 text-sky-800 bg-sky-50"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TechItem) => {
    setEditingTech(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (name: string) => {
    if (confirm(`Remove ${name} from active technology registry?`)) {
      const updated = techList.filter((t) => t.name !== name);
      saveToStorage(updated);
      showToast(`Technology "${name}" removed.`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.description?.trim()) return;

    const itemToSave: TechItem = {
      name: formData.name.trim(),
      category: (formData.category as TechItem["category"]) || "frontend",
      iconText: formData.iconText?.trim() || "⚡",
      description: formData.description.trim(),
      version: formData.version?.trim() || "v1.0+",
      useCase: formData.useCase?.trim() || "Enterprise Web Apps",
      badgeColor: formData.badgeColor || "border-sky-400/30 text-sky-800 bg-sky-50",
      slug: formData.slug || getTechSlug(formData.name.trim())
    };

    let updatedList: TechItem[];
    if (editingTech) {
      updatedList = techList.map((t) => (t.name === editingTech.name ? itemToSave : t));
      showToast(`Technology "${itemToSave.name}" updated.`);
    } else {
      updatedList = [itemToSave, ...techList];
      showToast(`New technology "${itemToSave.name}" added to registry.`);
    }

    saveToStorage(updatedList);
    setIsModalOpen(false);
  };

  const categories = [
    "all",
    "frontend",
    "backend",
    "php",
    "cms",
    "ai",
    "mobile",
    "database",
    "devops",
    "security"
  ];

  const filteredTech = techList.filter((t) => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.useCase && t.useCase.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.version && t.version.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-mono">
      {/* Toast */}
      {toastMsg && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>TECHNOLOGY ARSENAL & FRAMEWORKS REGISTRY</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Tech Stack Directory & Public Blueprint Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Manage 50+ enterprise frameworks, runtime benchmarks, category tags, versions, and dedicated detail pages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Technology</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Arsenal</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{techList.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">50+ Battle-Tested Tech</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>AI & LLM Fabric</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">6 Engines</div>
          <span className="text-[10px] text-purple-700 font-bold">GPT-4o, Claude, LangGraph</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Database & Cloud</span>
            <Code2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">18 Stacks</div>
          <span className="text-[10px] text-slate-500">Postgres, Redis, Kafka, AWS</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Dynamic Detail Pages</span>
            <ExternalLink className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-sky-700">/tech-stack/*</div>
          <span className="text-[10px] text-emerald-700 font-bold">SSG Static Indexing</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technology, framework, use case, or version..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 lg:pb-0">
          {categories.map((c) => {
            const isActive = selectedCategory === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-sky-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTech.map((t, idx) => {
          const slug = getTechSlug(t.name);

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-sm">
                      {t.iconText}
                    </span>
                    <div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-sky-50 text-sky-800 border border-sky-200">
                        {t.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/tech-stack/${slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg hover:bg-sky-50 text-slate-400 hover:text-sky-700 transition-all"
                      title="View Live Public Detail Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(t)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-sky-700 transition-all cursor-pointer"
                      title="Edit Technology"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.name)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-700 transition-all cursor-pointer"
                      title="Delete Technology"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 font-sans group-hover:text-sky-700 transition-colors">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed">
                  {t.description}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-semibold truncate">
                  Target: {t.useCase || "High-Scale Reality"}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono font-bold text-slate-700 shrink-0">
                  {t.version || "Active"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn font-mono">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 space-y-5 text-slate-800 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>{editingTech ? "EDIT TECHNOLOGY CAPABILITY" : "ADD NEW TECHNOLOGY"}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Technology Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Next.js 15 (App Router)"
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || "frontend"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as TechItem["category"] })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  >
                    <option value="frontend">Frontend & Web</option>
                    <option value="backend">Backend Microservices</option>
                    <option value="php">Laravel & PHP</option>
                    <option value="cms">Headless CMS & E-Commerce</option>
                    <option value="ai">AI, Machine Learning & RAG</option>
                    <option value="mobile">Mobile Apps</option>
                    <option value="database">Database & Cache</option>
                    <option value="devops">Cloud & DevOps</option>
                    <option value="security">Security & Identity</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Icon Emoji / Symbol
                  </label>
                  <input
                    type="text"
                    value={formData.iconText || "▲"}
                    onChange={(e) => setFormData({ ...formData, iconText: e.target.value })}
                    placeholder="▲ or ⚡ or 🐘"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Version / Release Tag
                  </label>
                  <input
                    type="text"
                    value={formData.version || "v15.2+"}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="e.g. v15.2+ / LTS"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Primary Enterprise Use Case
                </label>
                <input
                  type="text"
                  value={formData.useCase || ""}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  placeholder="e.g. High-Traffic Multi-Tenant SaaS & SEO Web Apps"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Technical Architecture Description *
                </label>
                <RichTextEditor
                  value={formData.description || ""}
                  onChange={(description) => setFormData({ ...formData, description })}
                  rows={3}
                  inline
                  placeholder="Server-side rendering, Partial Prerendering (PPR), Turbopack & Edge caching..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md transition-all cursor-pointer"
                >
                  {editingTech ? "Save Changes" : "Register Technology"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
