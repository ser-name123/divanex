"use client";

import RichTextEditor from "@/components/admin/RichTextEditor";
import { useState, useEffect } from "react";
import {
  MessageSquareQuote,
  Plus,
  Search,
  Star,
  ShieldCheck,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Globe2,
  Award,
  Sparkles,
  Check
} from "lucide-react";
import { testimonialsData, TestimonialItem } from "@/data/testimonials";
import { useAdminContent } from "@/lib/useAdminContent";

export default function AdminTestimonialsView() {
  // Server-backed: edits reach every visitor and every other admin browser,
  // which a localStorage copy never did.
  const {
    data: testimonials,
    save: persistContent,
    loading: contentLoading,
    saving: contentSaving,
  } = useAdminContent("testimonials", testimonialsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    name: "",
    role: "Chief Technology Officer",
    company: "",
    country: "United States",
    rating: 5,
    headline: "",
    quote: "",
    projectType: "Enterprise SaaS",
    metricsAchieved: "Sub-35ms query latency at 14,000+ tenants",
    verifiedBadge: "Clutch Verified 5.0",
    avatarText: "CL",
    avatarBg: "bg-blue-600"
  });


  const saveToStorage = async (updated: TestimonialItem[]) => {
    const ok = await persistContent(updated);
    if (!ok) showToast("Could not save. Your change was not published.");
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      id: `t-${Date.now()}`,
      name: "",
      role: "VP of Engineering",
      company: "",
      country: "United States (San Francisco)",
      rating: 5,
      headline: "",
      quote: "",
      projectType: "Enterprise SaaS",
      metricsAchieved: "99.99% Uptime & 2x Faster Sprint Velocity",
      verifiedBadge: "Verified Client 5.0",
      avatarText: "CL",
      avatarBg: "bg-sky-600"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove testimonial from ${name}?`)) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveToStorage(updated);
      showToast(`Testimonial from ${name} deleted.`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.quote?.trim() || !formData.company?.trim()) return;

    const initials = formData.name
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const itemToSave: TestimonialItem = {
      id: editingItem ? editingItem.id : (formData.id || `t-${Date.now()}`),
      name: formData.name.trim(),
      role: formData.role?.trim() || "Executive",
      company: formData.company.trim(),
      country: formData.country?.trim() || "Global",
      rating: formData.rating || 5,
      headline: formData.headline?.trim() || "Exceptional engineering execution",
      quote: formData.quote.trim(),
      projectType: (formData.projectType as TestimonialItem["projectType"]) || "Enterprise SaaS",
      metricsAchieved: formData.metricsAchieved?.trim() || "Verified Production SLA",
      verifiedBadge: formData.verifiedBadge?.trim() || "Clutch Verified 5.0",
      avatarText: initials || "CL",
      avatarBg: formData.avatarBg || "bg-blue-600"
    };

    let updatedList: TestimonialItem[];
    if (editingItem) {
      updatedList = testimonials.map((t) => (t.id === editingItem.id ? itemToSave : t));
      showToast(`Testimonial from ${itemToSave.name} updated.`);
    } else {
      updatedList = [itemToSave, ...testimonials];
      showToast(`New testimonial from ${itemToSave.name} (${itemToSave.company}) published.`);
    }

    saveToStorage(updatedList);
    setIsModalOpen(false);
  };

  const projectTypes = [
    "all",
    "Enterprise SaaS",
    "Healthcare HMIS",
    "Fintech Web Platform",
    "AI Automation",
    "Supply Chain ERP",
    "Mobile & Web App",
    "E-Commerce & Headless",
    "Cloud & DevOps"
  ];

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesType = selectedType === "all" || t.projectType === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.quote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
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
            <MessageSquareQuote className="w-3.5 h-3.5 text-sky-600" />
            <span>CLIENT TESTIMONIALS & AUDIT RATINGS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            Client Reviews & Verification Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-sans">
            Manage 50+ enterprise reviews, verified Clutch/G2 badges, client testimonials, and KPI outcomes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Reviews</span>
            <MessageSquareQuote className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{testimonials.length}</div>
          <span className="text-[10px] text-emerald-700 font-bold">100% Verified Clients</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Overall Rating</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">5.0 / 5.0</div>
          <span className="text-[10px] text-slate-500">50+ Enterprise Reviews</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Verified Badges</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">Clutch / G2</div>
          <span className="text-[10px] text-emerald-700 font-bold">SOC 2 / ISO Aligned</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Global Presence</span>
            <Globe2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">18+ Countries</div>
          <span className="text-[10px] text-sky-700 font-bold">US, UK, EU, UAE, India</span>
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
            placeholder="Search client name, company, country, or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-400 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1 lg:pb-0">
          {projectTypes.map((t) => {
            const isActive = selectedType === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-sky-600 text-white font-bold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Header: User Info & Controls */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs ${
                      item.avatarBg || "bg-blue-600"
                    }`}
                  >
                    {item.avatarText || "CL"}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-sans">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 font-sans">
                      {item.role}, <span className="font-semibold text-slate-700">{item.company}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.country}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-sky-700 transition-all cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-700 transition-all cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rating & Badge */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {item.verifiedBadge}
                </span>
              </div>

              {/* Headline */}
              <h4 className="text-xs font-bold text-slate-900 font-sans line-clamp-2 italic">
                &ldquo;{item.headline}&rdquo;
              </h4>
            </div>

            {/* Quote */}
            <p className="text-xs text-slate-600 font-sans line-clamp-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              {item.quote}
            </p>

            {/* Metrics Outcome Pill */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 text-[10px] font-bold border border-sky-200 truncate">
                {item.projectType}
              </span>
              <span className="font-mono text-emerald-700 font-bold text-[10px] truncate">
                ✓ {item.metricsAchieved}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn font-mono">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 space-y-5 text-slate-800 max-h-[90vh] overflow-y-auto scrollbar-thin">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-sm">
                <MessageSquareQuote className="w-4 h-4" />
                <span>{editingItem ? "EDIT CLIENT TESTIMONIAL" : "PUBLISH NEW TESTIMONIAL"}</span>
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
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.company || ""}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. SaaSify Global"
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Client Role / Designation
                  </label>
                  <input
                    type="text"
                    value={formData.role || ""}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Chief Technology Officer"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Country & Region
                  </label>
                  <input
                    type="text"
                    value={formData.country || ""}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United States (San Francisco)"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Project Type Category
                  </label>
                  <select
                    value={formData.projectType || "Enterprise SaaS"}
                    onChange={(e) =>
                      setFormData({ ...formData, projectType: e.target.value as TestimonialItem["projectType"] })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  >
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="Healthcare HMIS">Healthcare HMIS</option>
                    <option value="Fintech Web Platform">Fintech Web Platform</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Supply Chain ERP">Supply Chain ERP</option>
                    <option value="Mobile & Web App">Mobile & Web App</option>
                    <option value="E-Commerce & Headless">E-Commerce & Headless</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                    Verification Badge
                  </label>
                  <input
                    type="text"
                    value={formData.verifiedBadge || ""}
                    onChange={(e) => setFormData({ ...formData, verifiedBadge: e.target.value })}
                    placeholder="Clutch Verified 5.0"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Key Metric / Business Outcome Achieved
                </label>
                <input
                  type="text"
                  value={formData.metricsAchieved || ""}
                  onChange={(e) => setFormData({ ...formData, metricsAchieved: e.target.value })}
                  placeholder="e.g. Sub-35ms query latency at 14,000+ tenants"
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Testimonial Headline *
                </label>
                <input
                  type="text"
                  value={formData.headline || ""}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Delivered our multi-tenant SaaS MVP 3 weeks ahead of schedule."
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-sky-500 text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-700 uppercase font-bold mb-1">
                  Full Client Testimonial / Quote *
                </label>
                <RichTextEditor
                  value={formData.quote || ""}
                  onChange={(quote) => setFormData({ ...formData, quote })}
                  rows={4}
                  inline
                  placeholder="Divanex transformed our entire architectural blueprint. Their mastery of Next.js 15, PostgreSQL..."
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
                  {editingItem ? "Save Changes" : "Publish Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
