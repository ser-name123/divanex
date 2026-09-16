"use client";

import { NotesField } from "@/components/admin/fields";
import { useState } from "react";
import Link from "next/link";
import { AdminProjectSprint } from "@/data/adminData";
import {
  CheckCircle2,
  Calendar,
  ShieldCheck,
  User,
  FolderGit2,
  Check,
  Zap,
  Sparkles,
  Plus,
  Search,
  Trash2,
  X,
  Globe,
  Activity
} from "lucide-react";

interface AdminProjectsProps {
  projects: AdminProjectSprint[];
  onUpdateProject: (updated: AdminProjectSprint) => void;
  onCreateProject?: (newProject: AdminProjectSprint) => void;
  onDeleteProject?: (projectId: string) => void;
}

const SERVICE_CATEGORIES = [
  "SaaS Development",
  "AI Solutions & Automation",
  "Web & Mobile Apps",
  "Cloud & DevOps",
  "Technical SEO & Growth",
  "UI/UX Product Design"
];

const DEFAULT_MILESTONES_BY_CATEGORY: Record<string, string[]> = {
  "SaaS Development": [
    "PostgreSQL Multi-Tenant Schema Sharding",
    "Stripe Metered Usage & Webhooks",
    "Granular RBAC Permission Matrix",
    "Penetration Testing & OWASP Scan",
    "Production Git Organization Transfer"
  ],
  "AI Solutions & Automation": [
    "Vector Embedding Pipeline (pgvector)",
    "Autonomous Multi-Agent Router & Tooling",
    "Retrieval Augmented Generation (RAG) Cache",
    "Strict Anti-Hallucination Guardrails",
    "Model Inference Latency Benchmarks <50ms"
  ],
  "Web & Mobile Apps": [
    "Cross-Platform Native Runtime Setup",
    "Biometric FaceID / TouchID Authentication",
    "Offline-First SQLite State Sync Engine",
    "60 FPS Native Performance Profiling",
    "App Store & Google Play Store Submission"
  ],
  "Cloud & DevOps": [
    "Terraform Multi-Region IaC Scripts",
    "Zero-Downtime Blue/Green CI/CD Pipeline",
    "Prometheus & Grafana Alerting Dashboards",
    "VPC Peering & mTLS Ingress Encryption",
    "Executive Runbook & Disaster Recovery Drill"
  ],
  "Technical SEO & Growth": [
    "Edge-Rendered Dynamic Schema Markup",
    "Core Web Vitals Optimization (100/100 CWV)",
    "Programmatic 40k URL Sitemap Generator",
    "Automated Canonical & Redirect Mesh",
    "Google Search Console Indexing Acceleration"
  ],
  "UI/UX Product Design": [
    "Figma Tokenized Design System & Primitives",
    "Interactive 60fps Micro-Animation Prototypes",
    "Multi-Device Responsive Breakpoint Specs",
    "WCAG AAA Accessibility Audit Compliance",
    "Developer Handoff Token Export (Tailwind/CSS)"
  ]
};

const PHASE_NAMES = [
  "Phase 1: Architecture & Data Modeling",
  "Phase 2: Core Microservices & Security",
  "Phase 3: High-Fi Frontend & Core Sprint",
  "Phase 4: Load Testing & Security Audit",
  "Phase 5: Production Handover & Hypercare"
];

export default function AdminProjectsView({
  projects,
  onUpdateProject,
  onCreateProject,
  onDeleteProject
}: AdminProjectsProps) {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<AdminProjectSprint | null>(null);

  // State for Inline Creation Studio (Zero Popups!)
  const [isCreating, setIsCreating] = useState(false);
  const [quickMilestoneInput, setQuickMilestoneInput] = useState<Record<string, string>>({});
  const [creationNotification, setCreationNotification] = useState<string | null>(null);

  // Credentials & Extended URLs for Project Creation
  const [creationProductionUrl, setCreationProductionUrl] = useState("");
  const [creationFigmaUrl, setCreationFigmaUrl] = useState("");

  // New Project Form State.
  const [newProject, setNewProject] = useState<Partial<AdminProjectSprint>>(() => ({
    projectName: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceCategory: "SaaS Development",
    contractValue: "$25,000",
    paidEscrowValue: "$12,500",
    priority: "urgent",
    status: "active",
    currentPhase: 1,
    phaseName: PHASE_NAMES[0],
    progressPercent: 15,
    startDate: new Date().toISOString().slice(0, 10),
    targetHandover: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
    assignedLead: "Rajan S. (Lead Architect)",
    repoUrl: "https://github.com/divanex-enterprise/client-repo",
    stagingUrl: "https://staging.clientplatform.cloud",
    internalNotes: "Project initiated from client discovery brief. Scope verified.",
    teamMembers: ["Rajan S.", "Sarah C."],
    handoverChecklist: DEFAULT_MILESTONES_BY_CATEGORY["SaaS Development"].map(item => ({ item, completed: false }))
  }));

  const [customMilestoneDraft, setCustomMilestoneDraft] = useState("");

  // Handler for category change in creation form to populate default milestones
  const handleCategoryChange = (category: string) => {
    const defaultItems = DEFAULT_MILESTONES_BY_CATEGORY[category] || DEFAULT_MILESTONES_BY_CATEGORY["SaaS Development"];
    setNewProject(prev => ({
      ...prev,
      serviceCategory: category,
      handoverChecklist: defaultItems.map(item => ({ item, completed: false }))
    }));
  };

  // Add custom milestone in creation form
  const handleAddCreationMilestone = () => {
    if (!customMilestoneDraft.trim()) return;
    const currentList = newProject.handoverChecklist || [];
    setNewProject(prev => ({
      ...prev,
      handoverChecklist: [...currentList, { item: customMilestoneDraft.trim(), completed: false }]
    }));
    setCustomMilestoneDraft("");
  };

  // Remove milestone from creation form
  const handleRemoveCreationMilestone = (index: number) => {
    const currentList = newProject.handoverChecklist || [];
    setNewProject(prev => ({
      ...prev,
      handoverChecklist: currentList.filter((_, i) => i !== index)
    }));
  };

  // Submit New Project
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.projectName || !newProject.clientName) return;

    const projectId = newProject.id || `proj-${Math.floor(200 + Math.random() * 800)}`;

    const fullProject: AdminProjectSprint = {
      id: projectId,
      projectName: newProject.projectName,
      clientName: newProject.clientName,
      clientEmail: newProject.clientEmail || "client@company.com",
      clientPhone: newProject.clientPhone || "+1 (555) 019-2831",
      serviceCategory: newProject.serviceCategory || "SaaS Development",
      currentPhase: newProject.currentPhase || 1,
      phaseName: PHASE_NAMES[(newProject.currentPhase || 1) - 1],
      progressPercent: newProject.progressPercent || 10,
      startDate: newProject.startDate || new Date().toISOString().slice(0, 10),
      targetHandover: newProject.targetHandover || new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
      assignedLead: newProject.assignedLead || "Rajan S. (Lead Architect)",
      contractValue: newProject.contractValue || "$20,000",
      paidEscrowValue: newProject.paidEscrowValue || "$10,000",
      priority: newProject.priority || "urgent",
      status: newProject.status || "active",
      repoUrl: newProject.repoUrl || "https://github.com/divanex-enterprise/core",
      stagingUrl: newProject.stagingUrl || "https://staging.domain.com",
      productionUrl: creationProductionUrl || "",
      figmaUrl: creationFigmaUrl || "",
      internalNotes: newProject.internalNotes || "Project enrolled in active sprints.",
      teamMembers: newProject.teamMembers || ["Rajan S."],
      handoverChecklist: newProject.handoverChecklist || [
        { item: "Architecture Specification Review", completed: true },
        { item: "Production Environment Provisioning", completed: false }
      ],
      documents: [],
      feedbacks: [],
      deliverables: [
        ...(newProject.stagingUrl ? [{ id: "del-stg", title: "Live Staging Environment", url: newProject.stagingUrl, category: "staging" as const }] : []),
        ...(creationProductionUrl ? [{ id: "del-prd", title: "Production Application", url: creationProductionUrl, category: "production" as const }] : []),
        ...(creationFigmaUrl ? [{ id: "del-fig", title: "Figma Prototype", url: creationFigmaUrl, category: "figma" as const }] : []),
        ...(newProject.repoUrl ? [{ id: "del-git", title: "Enterprise Git Repository", url: newProject.repoUrl, category: "github" as const }] : []),
      ]
    };

    if (onCreateProject) {
      onCreateProject(fullProject);
    } else {
      onUpdateProject(fullProject);
    }

    setIsCreating(false);
    setCreationNotification(`Project "${fullProject.projectName}" successfully created.`);
    setTimeout(() => setCreationNotification(null), 4000);

    // Reset Form
    setNewProject({
      projectName: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      serviceCategory: "SaaS Development",
      contractValue: "$25,000",
      paidEscrowValue: "$12,500",
      priority: "urgent",
      status: "active",
      currentPhase: 1,
      phaseName: PHASE_NAMES[0],
      progressPercent: 15,
      startDate: new Date().toISOString().slice(0, 10),
      targetHandover: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10),
      assignedLead: "Rajan S. (Lead Architect)",
      repoUrl: "https://github.com/divanex-enterprise/client-repo",
      stagingUrl: "https://staging.clientplatform.cloud",
      internalNotes: "Project initiated from client discovery brief.",
      teamMembers: ["Rajan S."],
      handoverChecklist: DEFAULT_MILESTONES_BY_CATEGORY["SaaS Development"].map(item => ({ item, completed: false }))
    });
    setCreationProductionUrl("");
    setCreationFigmaUrl("");
  };

  // Toggle Checklist item in project card
  const toggleChecklistItem = (project: AdminProjectSprint, itemIndex: number) => {
    const updatedChecklist = project.handoverChecklist.map((item, idx) => {
      if (idx === itemIndex) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    const completedCount = updatedChecklist.filter((c) => c.completed).length;
    const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

    const updated: AdminProjectSprint = {
      ...project,
      progressPercent: newProgress,
      handoverChecklist: updatedChecklist
    };

    onUpdateProject(updated);
    if (selectedProject?.id === project.id) {
      setSelectedProject(updated);
    }
  };

  // Quick add milestone to an existing project card
  const handleQuickAddMilestone = (project: AdminProjectSprint) => {
    const text = (quickMilestoneInput[project.id] || "").trim();
    if (!text) return;

    const updatedChecklist = [...project.handoverChecklist, { item: text, completed: false }];
    const completedCount = updatedChecklist.filter((c) => c.completed).length;
    const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);

    const updated: AdminProjectSprint = {
      ...project,
      progressPercent: newProgress,
      handoverChecklist: updatedChecklist
    };

    onUpdateProject(updated);
    if (selectedProject?.id === project.id) {
      setSelectedProject(updated);
    }

    setQuickMilestoneInput(prev => ({ ...prev, [project.id]: "" }));
  };

  // Advance Phase of a Project
  const handleAdvancePhase = (project: AdminProjectSprint) => {
    const nextPhase = Math.min(project.currentPhase + 1, 5);
    const updated: AdminProjectSprint = {
      ...project,
      currentPhase: nextPhase,
      phaseName: PHASE_NAMES[nextPhase - 1],
      status: nextPhase === 5 ? "completed" : project.status
    };
    onUpdateProject(updated);
    if (selectedProject?.id === project.id) {
      setSelectedProject(updated);
    }
  };

  // Filter projects based on Search and Status/Priority
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      !searchQuery ||
      proj.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.serviceCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.assignedLead.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter === "pending_proposal") {
      matchesStatus = proj.proposalStatus === "submitted" || proj.proposalStatus === "revision_requested";
    } else if (statusFilter === "proposal_sent") {
      matchesStatus = proj.proposalStatus === "proposal_sent";
    } else if (statusFilter === "active") {
      matchesStatus = proj.status === "active" && (proj.proposalStatus === "accepted" || !proj.proposalStatus);
    } else if (statusFilter === "completed") {
      matchesStatus = proj.status === "completed";
    } else if (statusFilter !== "all") {
      matchesStatus = proj.status === statusFilter;
    }
    const matchesPriority = priorityFilter === "all" || proj.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Calculate top HUD summary values
  const totalContractValue = projects.reduce((acc, p) => {
    const num = parseInt(p.contractValue.replace(/[^0-9]/g, ""), 10) || 0;
    return acc + num;
  }, 0);

  const totalMilestones = projects.reduce((acc, p) => acc + p.handoverChecklist.length, 0);
  const completedMilestones = projects.reduce(
    (acc, p) => acc + p.handoverChecklist.filter((c) => c.completed).length,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Notice for Project Creation */}
      {creationNotification && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm font-mono shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
          <span>{creationNotification}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. PROJECT PORTFOLIO TELEMETRY HUD */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-t-2xl pointer-events-none" />
          <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Total Active Portfolio</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-1">
            ${totalContractValue.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Escrow Backed
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-2xl pointer-events-none" />
          <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Production Sprints</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-1">
            {projects.length} Active Sprints
          </div>
          <div className="text-xs font-mono text-sky-700 mt-1 flex items-center gap-1 font-semibold">
            <Zap className="w-3.5 h-3.5 text-sky-600" /> 0 Delivery Bottlenecks
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-2xl pointer-events-none" />
          <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Milestones Delivered</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-1">
            {completedMilestones} / {totalMilestones}
          </div>
          <div className="text-xs font-mono text-emerald-700 mt-1 font-semibold">
            {totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}% Global Completion
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-t-2xl pointer-events-none" />
          <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Contractual SLA Uptime</div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 font-mono mt-1">
            99.999% SLA
          </div>
          <div className="text-xs font-mono text-purple-700 mt-1 flex items-center gap-1 font-semibold">
            <Activity className="w-3.5 h-3.5 text-purple-600" /> High-Availability Cluster
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ACTIONS & FILTER CONTROLS BAR */}
      {/* ======================================================== */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500 font-bold uppercase">Status:</span>
          {[
            { id: "all", label: `All (${projects.length})` },
            { id: "pending_proposal", label: `Proposals Pending (${projects.filter(p => p.proposalStatus === 'submitted' || p.proposalStatus === 'revision_requested').length})` },
            { id: "proposal_sent", label: `Proposals Sent (${projects.filter(p => p.proposalStatus === 'proposal_sent').length})` },
            { id: "active", label: `Active Sprints (${projects.filter(p => p.status === 'active' && p.proposalStatus === 'accepted').length})` },
            { id: "completed", label: `Completed (${projects.filter(p => p.status === 'completed').length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                statusFilter === tab.id
                  ? "bg-sky-600 text-white shadow-sm scale-105"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search + priority controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search project, client, lead…"
              aria-label="Search projects"
              className="w-56 pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>

          <label htmlFor="project-priority-filter" className="text-slate-500 font-bold uppercase">
            Priority:
          </label>
          <select
            id="project-priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
          >
            <option value="all">All</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* Action Button: Manual Project Creation */}
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs font-mono shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 stroke-[3]" />}
          <span>{isCreating ? "Close Project Studio" : "+ New Client Project (Manual Entry)"}</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 3. ZERO-POPUP INLINE PROJECT CREATION STUDIO */}
      {/* ======================================================== */}
      {isCreating && (
        <form
          onSubmit={handleCreateSubmit}
          className="p-6 sm:p-8 rounded-2xl bg-white border-2 border-sky-500 shadow-md space-y-6 animate-fadeIn relative"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-t-2xl pointer-events-none" />

          {/* Form Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>PROJECT INGESTION & MANUAL SPRINT ENROLLMENT</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1.5">
                Deploy New Client Project
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Define architectural deliverables, contract valuation, milestones, and assign lead engineers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grid Inputs: Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NeuroPulse AI Assistant"
                value={newProject.projectName}
                onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Client / Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. NeuroPulse Therapeutics Ltd."
                value={newProject.clientName}
                onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Service Category *
              </label>
              <select
                value={newProject.serviceCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sky-800 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid Inputs: Row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Total Contract Value ($) *
              </label>
              <input
                type="text"
                placeholder="$25,000"
                value={newProject.contractValue}
                onChange={(e) => setNewProject({ ...newProject, contractValue: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-700 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Escrow Deposited ($)
              </label>
              <input
                type="text"
                placeholder="$12,500"
                value={newProject.paidEscrowValue}
                onChange={(e) => setNewProject({ ...newProject, paidEscrowValue: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Sprint Priority
              </label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as AdminProjectSprint["priority"] })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
              >
                <option value="urgent">Urgent SLA</option>
                <option value="high">High Velocity</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Target Handover Date
              </label>
              <input
                type="date"
                value={newProject.targetHandover}
                onChange={(e) => setNewProject({ ...newProject, targetHandover: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sky-800 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Grid Inputs: Row 3 (Engineering Links & Lead) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Assigned Lead Architect
              </label>
              <input
                type="text"
                placeholder="Rajan S. (Lead Solutions Architect)"
                value={newProject.assignedLead}
                onChange={(e) => setNewProject({ ...newProject, assignedLead: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Production Git Repo URL
              </label>
              <input
                type="text"
                placeholder="https://github.com/divanex-enterprise/repo"
                value={newProject.repoUrl}
                onChange={(e) => setNewProject({ ...newProject, repoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-700 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Staging Preview URL
              </label>
              <input
                type="text"
                placeholder="https://staging.client.cloud"
                value={newProject.stagingUrl}
                onChange={(e) => setNewProject({ ...newProject, stagingUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sky-700 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Grid Inputs: Row 4 (Production & Figma Prototype URLs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Live Production Application URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://app.client.com"
                value={creationProductionUrl}
                onChange={(e) => setCreationProductionUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-emerald-700 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="text-[10px] text-slate-500 uppercase font-bold block mb-1">
                Figma Architecture / Design System URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://figma.com/@divanex/spec"
                value={creationFigmaUrl}
                onChange={(e) => setCreationFigmaUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-purple-700 focus:outline-none focus:border-sky-500 focus:bg-white"
              />
            </div>
          </div>


          {/* Milestones & Handover Checklist Builder */}
          <div className="space-y-3 font-mono text-xs pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-sky-700 uppercase font-bold tracking-wider">
                Handover Deliverables Checklist ({newProject.handoverChecklist?.length || 0} Milestones):
              </span>
              <span className="text-slate-500 text-[10px]">
                Auto-seeded by category • Add custom items below
              </span>
            </div>

            {/* List of current milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-thin p-1">
              {newProject.handoverChecklist?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 group"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                    <span className="truncate font-medium">{item.item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCreationMilestone(idx)}
                    className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                    title="Remove milestone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Custom Milestone Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Add custom milestone (e.g. SAML SSO Integration / SOC2 Compliance)..."
                value={customMilestoneDraft}
                onChange={(e) => setCustomMilestoneDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCreationMilestone();
                  }
                }}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddCreationMilestone}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-sky-600" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm transition-all hover:scale-105"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Deploy Project to Sprints Registry</span>
            </button>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* 4. ACTIVE PROJECTS GRID & INLINE SPLIT-PANE INSPECTOR */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Projects Cards Column */}
        <div
          className={`${
            selectedProject ? "lg:col-span-7" : "lg:col-span-12"
          } space-y-6 transition-all duration-300`}
        >
          <div
            className={`grid grid-cols-1 ${
              selectedProject ? "sm:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-3"
            } gap-6`}
          >
            {filteredProjects.map((proj) => {
              const isSelected = selectedProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  className={`p-6 rounded-2xl bg-white border transition-all shadow-sm space-y-5 flex flex-col justify-between relative group ${
                    isSelected
                      ? "border-sky-500 ring-2 ring-sky-500/20 shadow-md bg-sky-50/10"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md hover:bg-slate-50/40"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-t-2xl pointer-events-none opacity-80" />

                  <div className="space-y-4">
                    {/* Header Tags */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                          {proj.serviceCategory}
                        </span>
                        {proj.priority === "urgent" && (
                          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[9px] font-bold">
                            URGENT
                          </span>
                        )}
                      </div>

                      <span className="text-emerald-700 font-bold text-xs sm:text-sm bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {proj.contractValue}
                      </span>
                    </div>

                    {/* Title & Client */}
                    <div>
                      <Link href={`/admin/projects/${proj.id}`} className="group/title inline-block">
                        <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover/title:text-sky-700 transition-colors flex items-center gap-1.5">
                          <span>{proj.projectName}</span>
                          <FolderGit2 className="w-3.5 h-3.5 text-sky-600 opacity-60 group-hover/title:opacity-100" />
                        </h4>
                      </Link>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Client: <strong className="text-slate-800">{proj.clientName}</strong>
                      </div>
                    </div>

                    {/* Phase Progress Bar */}
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">{proj.phaseName}</span>
                        <span className="text-sky-700 font-bold">{proj.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200 shadow-inner">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 transition-all duration-500"
                          style={{ width: `${proj.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Handover Checklist */}
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                          Milestones ({proj.handoverChecklist.filter(c => c.completed).length}/{proj.handoverChecklist.length}):
                        </span>
                        <span className="text-slate-400 text-[10px]">Click to toggle</span>
                      </div>

                      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200 max-h-40 overflow-y-auto scrollbar-thin">
                        {proj.handoverChecklist.map((item, idx) => (
                          <div
                            key={idx}
                            onClick={() => toggleChecklistItem(proj, idx)}
                            className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer group"
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                                item.completed
                                  ? "bg-sky-600 text-white font-bold shadow-sm"
                                  : "border border-slate-300 group-hover:border-sky-500 bg-white"
                              }`}
                            >
                              {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-xs select-none transition-colors truncate ${
                                item.completed
                                  ? "text-slate-400 line-through"
                                  : "text-slate-700 group-hover:text-sky-700 font-medium"
                              }`}
                            >
                              {item.item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Quick inline add milestone input */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="+ Add milestone..."
                          value={quickMilestoneInput[proj.id] || ""}
                          onChange={(e) =>
                            setQuickMilestoneInput({ ...quickMilestoneInput, [proj.id]: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleQuickAddMilestone(proj);
                            }
                          }}
                          className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleQuickAddMilestone(proj)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-xs font-bold transition-all"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-slate-100 space-y-3 font-mono text-xs text-slate-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate pr-2">
                        <User className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate text-slate-700">{proj.assignedLead}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sky-800 font-bold">{proj.targetHandover}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 gap-2">
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all hover:scale-[1.02]"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Open Project Page ➔</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAdvancePhase(proj)}
                        className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-900 text-xs font-bold transition-all"
                        title="Advance to Next Architectural Phase"
                      >
                        Advance ➔
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Zero-Popup Inline Project Inspector & Editor */}
        {selectedProject && (
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-6 shadow-md relative animate-fadeIn">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 rounded-t-2xl pointer-events-none" />

            {/* Inspector Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold">
                  <FolderGit2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>PROJECT STUDIO // {selectedProject.id.toUpperCase()}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {selectedProject.projectName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Client: {selectedProject.clientName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Phase Advancement Matrix */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-bold text-sky-700 uppercase text-[10px]">
                  Sprint Delivery Phase:
                </span>
                <span className="text-xs text-slate-900 font-bold">
                  Phase {selectedProject.currentPhase} / 5
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((phaseNum) => (
                  <button
                    key={phaseNum}
                    type="button"
                    onClick={() => {
                      const updated: AdminProjectSprint = {
                        ...selectedProject,
                        currentPhase: phaseNum,
                        phaseName: PHASE_NAMES[phaseNum - 1]
                      };
                      onUpdateProject(updated);
                      setSelectedProject(updated);
                    }}
                    className={`py-2 rounded-lg text-center font-bold text-xs transition-all ${
                      selectedProject.currentPhase === phaseNum
                        ? "bg-sky-600 text-white shadow-sm font-black"
                        : selectedProject.currentPhase > phaseNum
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    P{phaseNum}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-sky-800 font-bold text-center">
                {selectedProject.phaseName}
              </div>
            </div>

            {/* Quick External Links (Git & Staging) */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href={selectedProject.stagingUrl ? selectedProject.stagingUrl : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>Launch Staging ↗</span>
              </a>

              <a
                href={`https://${selectedProject.repoUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Git Repository ↗</span>
              </a>
            </div>

            {/* Edit Project Financials & Dates */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                Project Parameters:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Contract Value</span>
                  <input
                    type="text"
                    value={selectedProject.contractValue}
                    onChange={(e) => {
                      const updated = { ...selectedProject, contractValue: e.target.value };
                      setSelectedProject(updated);
                      onUpdateProject(updated);
                    }}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 font-bold text-emerald-700 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase">Target Due Date</span>
                  <input
                    type="date"
                    value={selectedProject.targetHandover}
                    onChange={(e) => {
                      const updated = { ...selectedProject, targetHandover: e.target.value };
                      setSelectedProject(updated);
                      onUpdateProject(updated);
                    }}
                    className="w-full bg-white border border-slate-300 rounded px-2 py-1 font-bold text-sky-800 text-xs focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Architecture Notes Editor */}
            <div className="space-y-2 font-mono text-xs">
              <span className="text-[10px] text-slate-500 uppercase font-bold">
                Internal Architecture Notes
              </span>
              <NotesField
                rows={3}
                value={selectedProject.internalNotes || ""}
                onChange={(internalNotes) => {
                  const updated = { ...selectedProject, internalNotes };
                  setSelectedProject(updated);
                  onUpdateProject(updated);
                }}
                placeholder="Add deployment details, security pentest findings, or client requests..."
              />
            </div>

            {/* Danger Zone: Delete Project */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
              {onDeleteProject && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to archive and delete project "${selectedProject.projectName}"?`)) {
                      onDeleteProject(selectedProject.id);
                      setSelectedProject(null);
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold flex items-center gap-1.5 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Sprint</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium"
              >
                Close Studio
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
