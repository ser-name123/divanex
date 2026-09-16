"use client";


import { NotesField } from "@/components/admin/fields";
import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import {
  AdminProjectSprint,
  ProjectDocument,
  ProjectInstallment,
  initialAdminProjects
} from "@/data/adminData";
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  User,
  Zap,
  Save,
  FileText,
  MessageSquare,
  Globe,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  RefreshCw,
  Send,
  Download,
  AlertCircle,
  Activity,
  Layers,
  Sparkles,
  Coins
} from "lucide-react";

const PHASE_NAMES = [
  "Phase 1: Architecture & Data Modeling",
  "Phase 2: Core Microservices & Security",
  "Phase 3: High-Fi Frontend & Core Sprint",
  "Phase 4: Load Testing & Security Audit",
  "Phase 5: Production Handover & Hypercare"
];

interface Props {
  projectId: string;
}

export default function AdminProjectDetailClient({ projectId }: Props) {
  const [, startTransition] = useTransition();
  const [project, setProject] = useState<AdminProjectSprint | null>(() => {
    return initialAdminProjects.find((p) => p.id === projectId) || null;
  });
  const [activeTab, setActiveTab] = useState<
    "scope" | "sprint" | "documents" | "feedback" | "infrastructure"
  >("scope");

  // Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states inside detail tabs
  const [newMilestoneText, setNewMilestoneText] = useState("");
  const [proposedBudget, setProposedBudget] = useState(project?.totalBudget || 50000);
  const [proposedCurrency, setProposedCurrency] = useState(project?.currency || "INR");
  const [proposedTimelineWeeks, setProposedTimelineWeeks] = useState(project?.timelineWeeks || 8);
  const [proposalScopeSummary, setProposalScopeSummary] = useState(
    project?.proposalDetails?.scopeSummary ||
      `Comprehensive technical SOW architecture for ${project?.projectName || "the project"}, including responsive web/mobile frontend, PostgreSQL multi-tenant schema, microservices architecture, and cloud deployment.`
  );
  const [proposalAdminNotes, setProposalAdminNotes] = useState(
    project?.proposalDetails?.adminNotes ||
      "Architecture verified. Phase 1 kicks off upon initial milestone ratification."
  );
  const [proposedMilestonesList, setProposedMilestonesList] = useState<ProjectInstallment[]>(() => {
    if (project?.installments && project.installments.length > 0) {
      return project.installments;
    }
    const b = project?.totalBudget || 50000;
    const curr = project?.currency || "INR";
    const m1 = Math.round(b * 0.25);
    const m2 = Math.round(b * 0.35);
    const m3 = Math.round(b * 0.25);
    const m4 = Math.max(0, b - m1 - m2 - m3);
    return [
      {
        id: `inst-${project?.id || "temp"}-1`,
        milestoneNumber: 1,
        title: "Milestone 1: Architectural Blueprint, DB Schema & API Specification",
        amount: m1,
        currency: curr,
        percentage: 25,
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        status: "due" as const,
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-001`,
        notes: "Initial discovery, architecture diagram & project kickoff.",
        deliverablesSummary: "Database ERD, OpenAPI specs, Docker setup, and wireframe signoff.",
      },
      {
        id: `inst-${project?.id || "temp"}-2`,
        milestoneNumber: 2,
        title: "Milestone 2: Core Microservices, Auth Engine & API Integration",
        amount: m2,
        currency: curr,
        percentage: 35,
        dueDate: new Date(Date.now() + 35 * 86400000).toISOString().split("T")[0],
        status: "upcoming" as const,
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-002`,
        notes: "Core backend development & staging deployment.",
        deliverablesSummary: "Microservices logic, JWT auth, database migrations, and staging sandbox.",
      },
      {
        id: `inst-${project?.id || "temp"}-3`,
        milestoneNumber: 3,
        title: "Milestone 3: High-Performance UI, Workflows & Sandbox Testing",
        amount: m3,
        currency: curr,
        percentage: 25,
        dueDate: new Date(Date.now() + 56 * 86400000).toISOString().split("T")[0],
        status: "upcoming" as const,
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-003`,
        notes: "Client review sandbox demonstration & UAT signoff.",
        deliverablesSummary: "Polished frontend, client feedback iterations, integration tests, and sandbox demo.",
      },
      {
        id: `inst-${project?.id || "temp"}-4`,
        milestoneNumber: 4,
        title: "Milestone 4: Security Hardening, Production Deployment & IP Transfer",
        amount: m4,
        currency: curr,
        percentage: 15,
        dueDate: new Date(Date.now() + 70 * 86400000).toISOString().split("T")[0],
        status: "upcoming" as const,
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-004`,
        notes: "Production cluster handover, SSL certificates, NDA/IP code transfer.",
        deliverablesSummary: "Production deployment, OWASP audit, 100% repository transfer, and 30-day hypercare.",
      },
    ];
  });
  const [sendingProposal, setSendingProposal] = useState(false);
  const [configuringMilestones, setConfiguringMilestones] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState("");
  const [newDocCategory, setNewDocCategory] = useState<ProjectDocument["category"]>("deliverable");
  const [newDocUrl, setNewDocUrl] = useState("");
  const [newDocDescription, setNewDocDescription] = useState("");

  // Feedback admin reply state
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const recalculateStandardMilestones = (budget = proposedBudget, curr = proposedCurrency) => {
    const m1 = Math.round(budget * 0.25);
    const m2 = Math.round(budget * 0.35);
    const m3 = Math.round(budget * 0.25);
    const m4 = Math.max(0, budget - m1 - m2 - m3);
    setProposedMilestonesList([
      {
        id: `inst-${project?.id || "temp"}-1`,
        milestoneNumber: 1,
        title: "Milestone 1: Architectural Blueprint, DB Schema & API Specification",
        amount: m1,
        currency: curr,
        percentage: 25,
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
        status: "due",
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-001`,
        notes: "Initial discovery, architecture diagram & project kickoff.",
        deliverablesSummary: "Database ERD, OpenAPI specs, Docker setup, and wireframe signoff.",
      },
      {
        id: `inst-${project?.id || "temp"}-2`,
        milestoneNumber: 2,
        title: "Milestone 2: Core Microservices, Auth Engine & API Integration",
        amount: m2,
        currency: curr,
        percentage: 35,
        dueDate: new Date(Date.now() + 35 * 86400000).toISOString().split("T")[0],
        status: "upcoming",
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-002`,
        notes: "Core backend development & staging deployment.",
        deliverablesSummary: "Microservices logic, JWT auth, database migrations, and staging sandbox.",
      },
      {
        id: `inst-${project?.id || "temp"}-3`,
        milestoneNumber: 3,
        title: "Milestone 3: High-Performance UI, Workflows & Sandbox Testing",
        amount: m3,
        currency: curr,
        percentage: 25,
        dueDate: new Date(Date.now() + 56 * 86400000).toISOString().split("T")[0],
        status: "upcoming",
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-003`,
        notes: "Client review sandbox demonstration & UAT signoff.",
        deliverablesSummary: "Polished frontend, client feedback iterations, integration tests, and sandbox demo.",
      },
      {
        id: `inst-${project?.id || "temp"}-4`,
        milestoneNumber: 4,
        title: "Milestone 4: Security Hardening, Production Deployment & IP Transfer",
        amount: m4,
        currency: curr,
        percentage: 15,
        dueDate: new Date(Date.now() + 70 * 86400000).toISOString().split("T")[0],
        status: "upcoming",
        invoiceNumber: `INV-${(project?.id || "PROJ").toUpperCase()}-004`,
        notes: "Production cluster handover, SSL certificates, NDA/IP code transfer.",
        deliverablesSummary: "Production deployment, OWASP audit, 100% repository transfer, and 30-day hypercare.",
      },
    ]);
  };

  const handleMilestoneFieldChange = (index: number, field: keyof ProjectInstallment, value: any) => {
    setProposedMilestonesList((prev) => {
      const copy = [...prev];
      const target = { ...copy[index], [field]: value };
      if (field === "percentage") {
        const pct = Number(value) || 0;
        target.amount = Math.round((proposedBudget * pct) / 100);
      } else if (field === "amount") {
        const amt = Number(value) || 0;
        target.percentage = proposedBudget > 0 ? Math.round((amt / proposedBudget) * 100) : 0;
      }
      copy[index] = target;
      return copy;
    });
  };

  const handleAddCustomMilestone = () => {
    const nextIdx = proposedMilestonesList.length + 1;
    const usedPct = proposedMilestonesList.reduce((sum, m) => sum + (Number(m.percentage) || 0), 0);
    const remainingPct = Math.max(0, 100 - usedPct);
    const amt = Math.round((proposedBudget * remainingPct) / 100);
    setProposedMilestonesList((prev) => [
      ...prev,
      {
        id: `inst-${project?.id || "temp"}-${Date.now()}`,
        milestoneNumber: nextIdx,
        title: `Milestone ${nextIdx}: Custom Deliverable & Integration`,
        amount: amt,
        currency: proposedCurrency,
        percentage: remainingPct,
        dueDate: new Date(Date.now() + (nextIdx * 14) * 86400000).toISOString().split("T")[0],
        status: "upcoming" as const,
        notes: "Sprint milestone deliverable.",
        deliverablesSummary: "Custom component implementation and test signoff.",
      },
    ]);
  };

  const handleDeleteMilestoneItem = (index: number) => {
    setProposedMilestonesList((prev) => prev.filter((_, i) => i !== index));
  };

  // The API is the only source. A localStorage copy used to win over it here,
  // so an operator could be editing a project another admin had already
  // changed, and the stale version would then be written back over theirs.
  useEffect(() => {
    fetch(`/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.projects && Array.isArray(data.projects)) {
          const fresh = data.projects.find((p: AdminProjectSprint) => p.id === projectId);
          if (fresh) {
            setProject(fresh);
            if (fresh.totalBudget) setProposedBudget(fresh.totalBudget);
            if (fresh.currency) setProposedCurrency(fresh.currency);
            if (fresh.timelineWeeks) setProposedTimelineWeeks(fresh.timelineWeeks);
            if (fresh.proposalDetails?.scopeSummary) setProposalScopeSummary(fresh.proposalDetails.scopeSummary);
            if (fresh.proposalDetails?.adminNotes) setProposalAdminNotes(fresh.proposalDetails.adminNotes);
            if (fresh.installments && fresh.installments.length > 0) {
              setProposedMilestonesList(fresh.installments);
            }
          }
        }
      })
      .catch((e) => console.warn("Live project fetch:", e));
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6 font-mono">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-md space-y-4 shadow-sm">
          <AlertCircle className="w-10 h-10 text-sky-600 mx-auto animate-bounce" />
          <h2 className="text-xl font-bold">Project Not Found</h2>
          <p className="text-xs text-slate-500">
            Could not find an active sprint project with ID: <code>{projectId}</code>.
          </p>
          <Link
            href="/admin?tab=projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sprints Board
          </Link>
        </div>
      </div>
    );
  }

  // Optimistic local state, then the authoritative write to the API.
  const saveProjectUpdate = (updated: AdminProjectSprint, notification?: string) => {
    setProject(updated);

    // Update API asynchronously
    startTransition(() => {
      fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      }).catch((e) => console.warn("API update failed:", e));
    });

    if (notification) {
      showToast(notification);
    }
  };

  const handleSendProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingProposal(true);
    try {
      const formattedMilestones = proposedMilestonesList.map((m, idx) => ({
        ...m,
        id: m.id || `inst-${project.id}-${idx + 1}`,
        milestoneNumber: idx + 1,
        currency: proposedCurrency,
        amount: Number(m.amount) || Math.round((Number(proposedBudget) * (Number(m.percentage) || 25)) / 100),
        status: idx === 0 ? ("due" as const) : ("upcoming" as const),
      }));

      const res = await fetch("/api/projects/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          action: "send_proposal",
          proposalData: {
            proposedBudget: Number(proposedBudget),
            currency: proposedCurrency,
            proposedTimelineWeeks: Number(proposedTimelineWeeks),
            scopeSummary: proposalScopeSummary.trim(),
            adminNotes: proposalAdminNotes.trim(),
          },
          milestones: formattedMilestones,
        }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        saveProjectUpdate(data.project, "Formal technical proposal & milestone schedule recorded.");
      } else {
        showToast(data.error || "Failed to send proposal");
      }
    } catch (err) {
      showToast("Network error sending proposal");
    } finally {
      setSendingProposal(false);
    }
  };

  const handleCreateDefaultMilestones = async () => {
    setConfiguringMilestones(true);
    try {
      const b = project?.totalBudget || 35000;
      const m1 = Math.round(b * 0.25);
      const m2 = Math.round(b * 0.35);
      const m3 = Math.round(b * 0.25);
      const m4 = Math.max(0, b - m1 - m2 - m3);

      const generatedMilestones = [
        {
          id: `inst-${project.id}-1`,
          milestoneNumber: 1,
          title: "Milestone 1: Architectural Blueprint, Schema Isolation & OpenAPI Spec",
          amount: m1,
          currency: project.currency || "USD",
          percentage: 25,
          dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
          status: "due" as const,
          invoiceNumber: `INV-${project.id.toUpperCase()}-001`,
          notes: "Initial discovery & architectural blueprint deposit.",
        },
        {
          id: `inst-${project.id}-2`,
          milestoneNumber: 2,
          title: "Milestone 2: Core Microservices, Auth & Staging Sandbox Integration",
          amount: m2,
          currency: project.currency || "USD",
          percentage: 35,
          dueDate: new Date(Date.now() + 35 * 86400000).toISOString().split("T")[0],
          status: "upcoming" as const,
          invoiceNumber: `INV-${project.id.toUpperCase()}-002`,
          notes: "Sandbox & staging deployment verification.",
        },
        {
          id: `inst-${project.id}-3`,
          milestoneNumber: 3,
          title: "Milestone 3: High-Fi UI Frontend, Testing & Client Sandbox Verification",
          amount: m3,
          currency: project.currency || "USD",
          percentage: 25,
          dueDate: new Date(Date.now() + 56 * 86400000).toISOString().split("T")[0],
          status: "upcoming" as const,
          invoiceNumber: `INV-${project.id.toUpperCase()}-003`,
          notes: "Full feature complete staging demonstration.",
        },
        {
          id: `inst-${project.id}-4`,
          milestoneNumber: 4,
          title: "Milestone 4: Security Penetration Audit & Production Handover",
          amount: m4,
          currency: project.currency || "USD",
          percentage: 15,
          dueDate: new Date(Date.now() + 70 * 86400000).toISOString().split("T")[0],
          status: "upcoming" as const,
          invoiceNumber: `INV-${project.id.toUpperCase()}-004`,
          notes: "Production cluster handover & code transfer.",
        },
      ];

      const res = await fetch("/api/projects/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: project.id,
          action: "create_milestones",
          milestones: generatedMilestones,
        }),
      });
      const data = await res.json();
      if (data.success && data.project) {
        saveProjectUpdate(data.project, "Sprint milestones established.");
      } else {
        showToast(data.error || "Failed to configure milestones");
      }
    } catch (err) {
      showToast("Network error configuring milestones");
    } finally {
      setConfiguringMilestones(false);
    }
  };

  // 1. Milestone checklist toggle
  const toggleMilestone = (idx: number) => {
    const updatedChecklist = project.handoverChecklist.map((item, i) => {
      if (i === idx) return { ...item, completed: !item.completed };
      return item;
    });

    const completed = updatedChecklist.filter((c) => c.completed).length;
    const progress = Math.round((completed / updatedChecklist.length) * 100);

    const updated: AdminProjectSprint = {
      ...project,
      progressPercent: progress,
      handoverChecklist: updatedChecklist,
    };
    saveProjectUpdate(updated, "Milestone updated & progress recalculated");
  };

  // Add custom milestone
  const addMilestone = () => {
    if (!newMilestoneText.trim()) return;
    const updatedChecklist = [
      ...project.handoverChecklist,
      { item: newMilestoneText.trim(), completed: false },
    ];
    const completed = updatedChecklist.filter((c) => c.completed).length;
    const progress = Math.round((completed / updatedChecklist.length) * 100);

    const updated: AdminProjectSprint = {
      ...project,
      progressPercent: progress,
      handoverChecklist: updatedChecklist,
    };
    saveProjectUpdate(updated, `Milestone "${newMilestoneText}" added`);
    setNewMilestoneText("");
  };

  // Delete milestone
  const removeMilestone = (idx: number) => {
    const updatedChecklist = project.handoverChecklist.filter((_, i) => i !== idx);
    const completed = updatedChecklist.filter((c) => c.completed).length;
    const progress = updatedChecklist.length > 0 ? Math.round((completed / updatedChecklist.length) * 100) : 0;

    const updated: AdminProjectSprint = {
      ...project,
      progressPercent: progress,
      handoverChecklist: updatedChecklist,
    };
    saveProjectUpdate(updated, "Milestone removed");
  };

  // 2. Advance Phase
  const handleAdvancePhase = () => {
    const nextPhase = Math.min(project.currentPhase + 1, 5);
    const updated: AdminProjectSprint = {
      ...project,
      currentPhase: nextPhase,
      phaseName: PHASE_NAMES[nextPhase - 1],
      status: nextPhase === 5 ? "completed" : project.status,
    };
    saveProjectUpdate(updated, `Sprint advanced to ${PHASE_NAMES[nextPhase - 1]}`);
  };

  // 4. Document upload
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;

    const doc: ProjectDocument = {
      id: `doc-${crypto.randomUUID().slice(0, 8)}`,
      title: newDocTitle.trim(),
      category: newDocCategory,
      fileName: newDocTitle.replace(/\s+/g, "_") + ".pdf",
      fileSize: "2.4 MB",
      uploadedBy: "admin",
      uploadedAt: new Date().toISOString(),
      url: newDocUrl.trim() || undefined,
      description: newDocDescription.trim() || undefined,
    };

    const updatedDocs = [doc, ...(project.documents || [])];
    const updated: AdminProjectSprint = {
      ...project,
      documents: updatedDocs,
    };
    saveProjectUpdate(updated, `Deliverable "${doc.title}" added to Document Vault`);
    setNewDocTitle("");
    setNewDocUrl("");
    setNewDocDescription("");
  };

  const handleDeleteDocument = (docId: string) => {
    const updatedDocs = (project.documents || []).filter((d) => d.id !== docId);
    const updated: AdminProjectSprint = {
      ...project,
      documents: updatedDocs,
    };
    saveProjectUpdate(updated, "Document removed from vault");
  };

  // 5. Reply to client feedback
  const handleSendFeedbackReply = (feedbackId: string) => {
    const replyText = replyInputs[feedbackId]?.trim();
    if (!replyText) return;

    const updatedFeedbacks = (project.feedbacks || []).map((fb) => {
      if (fb.id === feedbackId) {
        return {
          ...fb,
          status: "resolved" as const,
          adminReply: replyText,
          replyAt: new Date().toISOString(),
        };
      }
      return fb;
    });

    const updated: AdminProjectSprint = {
      ...project,
      feedbacks: updatedFeedbacks,
    };
    saveProjectUpdate(updated, "Reply recorded.");
    setReplyInputs((prev) => ({ ...prev, [feedbackId]: "" }));
  };

  const handleUpdateFeedbackStatus = (
    feedbackId: string,
    status: "pending" | "reviewed" | "resolved"
  ) => {
    const updatedFeedbacks = (project.feedbacks || []).map((fb) => {
      if (fb.id === feedbackId) {
        return { ...fb, status };
      }
      return fb;
    });
    const updated: AdminProjectSprint = {
      ...project,
      feedbacks: updatedFeedbacks,
    };
    saveProjectUpdate(updated, `Feedback marked as ${status}`);
  };


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-sky-50 border border-sky-300 text-sky-800 text-xs font-mono shadow-lg backdrop-blur-xl animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-sky-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Breadcrumb */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-2xl sticky top-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin?tab=projects"
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
              title="Return to Active Sprints Board"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold">
                <span>PROJECT COMMAND CENTER</span>
                <span>•</span>
                <span className="text-slate-500">{project.id.toUpperCase()}</span>
              </div>
              <h1 className="text-lg sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {project.projectName}
              </h1>
            </div>
          </div>

          {/* Quick Action Badges & Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleAdvancePhase}
              disabled={project.currentPhase >= 5}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono text-xs font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>{project.currentPhase >= 5 ? "All Phases Handed Over" : "Advance Phase ➔"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ======================================================== */}
        {/* 1. PROJECT TELEMETRY HUD */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Sprint Completion</div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1 flex items-baseline gap-2">
              <span>{project.progressPercent}%</span>
              <span className="text-xs text-sky-700 font-semibold">
                ({project.handoverChecklist.filter((c) => c.completed).length}/{project.handoverChecklist.length} Milestones)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mt-3 border border-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-500"
                style={{ width: `${project.progressPercent}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Architectural Phase</div>
            <div className="text-lg font-bold text-sky-800 font-mono mt-1 truncate">
              Phase {project.currentPhase} of 5
            </div>
            <div className="text-xs text-slate-500 truncate mt-1 font-medium">
              {project.phaseName}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">Contract & Escrow</div>
            <div className="text-xl font-bold text-emerald-700 font-mono mt-1">
              {project.contractValue}
            </div>
            <div className="text-xs font-mono text-emerald-700 mt-1 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Escrow Deposited: {project.paidEscrowValue || "$0"}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
            <div className="text-[10px] font-mono text-slate-500 uppercase font-bold flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>Target Handover Date</span>
            </div>
            <div className="text-xl font-bold text-purple-800 font-mono mt-1">
              {project.targetHandover}
            </div>
            <div className="text-xs font-mono text-slate-500 mt-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span className="truncate">{project.assignedLead}</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. DEDICATED MANAGEMENT TABS */}
        {/* ======================================================== */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none font-mono text-xs">
          {[
            { id: "scope", label: "Client Ingestion & Scope Brief", icon: Sparkles },
            { id: "sprint", label: "Sprint Milestones & Phase Stepper", icon: Layers },
            { id: "documents", label: `Document Vault (${project.documents?.length || 0})`, icon: FileText },
            { id: "feedback", label: `Client Feedback & Revisions (${project.feedbacks?.length || 0})`, icon: MessageSquare },
            { id: "infrastructure", label: "Deployments & Engineering Hub", icon: Globe }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  active
                    ? "bg-sky-600 text-white shadow-sm scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-sky-600"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* TAB 0: CLIENT INGESTION & SCOPE SPECIFICATIONS */}
        {/* ======================================================== */}
        {activeTab === "scope" && (
          <div className="space-y-6 animate-fadeIn font-sans text-xs">
            {/* Scope Overview Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 font-mono">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                    <FileText className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Client Technical Requirements & Scope Ingestion
                    </h3>
                    <p className="text-slate-500 text-xs font-sans mt-0.5">
                      Submitted by {project.clientName} ({project.clientEmail || "client"}).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Proposal State:</span>
                  <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] border ${
                    project.proposalStatus === "accepted"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : project.proposalStatus === "proposal_sent"
                      ? "bg-sky-100 text-sky-900 border-sky-300"
                      : project.proposalStatus === "revision_requested"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-purple-100 text-purple-900 border-purple-300"
                  }`}>
                    {project.proposalStatus || "submitted"}
                  </span>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left Column: Scope & Environments */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="font-mono text-[11px] font-bold text-slate-700 uppercase">
                      Detailed Scope Brief & Requirements
                    </div>
                    <p className="text-slate-900 leading-relaxed font-sans text-xs sm:text-sm">
                      {project.internalNotes || "No custom scope brief provided."}
                    </p>
                  </div>

                  {/* UI/UX & Figma */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                    <div className="text-[11px] font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span>Figma Design Prototype</span>
                      {project.figmaUrl && (
                        <a
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-600 hover:text-purple-800 text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <span>Open Figma</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="text-slate-800 truncate font-sans">
                      {project.figmaUrl || "No Figma URL attached"}
                    </div>
                  </div>

                  {/* Reference Websites */}
                  {project.referenceWebsites && project.referenceWebsites.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono">
                      <div className="text-[11px] font-bold text-slate-700 uppercase">
                        Reference Benchmark Websites ({project.referenceWebsites.length})
                      </div>
                      <div className="space-y-2">
                        {project.referenceWebsites.map((refItem, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <a
                                href={refItem.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sky-700 hover:underline font-bold text-xs inline-flex items-center gap-1"
                              >
                                <span>{refItem.url}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                            {refItem.description && (
                              <p className="text-slate-600 font-sans text-[11px]">
                                Notes: {refItem.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Stacks, Integrations & Repos */}
                <div className="space-y-4">
                  {/* Platforms & Stack */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 font-mono">
                    <div className="text-[11px] font-bold text-slate-700 uppercase">
                      Target Platforms & Stack
                    </div>

                    <div className="space-y-2 font-sans">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Target Platforms:</span>
                        <div className="text-slate-900 font-bold mt-0.5">
                          {Array.isArray(project.targetPlatforms) && project.targetPlatforms.length > 0
                            ? project.targetPlatforms.join(", ")
                            : "Web & Mobile Cloud Stack"}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Preferred Tech Stack:</span>
                        <div className="text-slate-900 font-bold mt-0.5">
                          {Array.isArray(project.techStack) && project.techStack.length > 0
                            ? project.techStack.join(", ")
                            : "Next.js, Node.js, PostgreSQL, Tailwind"}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Cloud & Hosting Provider:</span>
                        <div className="text-slate-900 font-bold mt-0.5">
                          {project.cloudProvider || "AWS / Vercel Managed"}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Third-Party Integrations:</span>
                        <div className="text-slate-900 font-bold mt-0.5">
                          {project.thirdPartyIntegrations || "Standard APIs"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Existing Repos & Envs */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                    <div className="text-[11px] font-bold text-slate-700 uppercase">
                      Codebase & Environments
                    </div>
                    <div className="space-y-1.5 font-sans text-xs">
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">GitHub Repo:</span>
                        <span className="text-slate-800">{project.repoUrl || "None provided"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Live/Staging URL:</span>
                        <span className="text-slate-800">{project.stagingUrl || "None provided"}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">API Docs / Swagger:</span>
                        <span className="text-slate-800">{project.apiDocsUrl || "None provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Attached Documents */}
                  {project.documents && project.documents.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 font-mono">
                      <div className="text-[11px] font-bold text-slate-700 uppercase">
                        Attached Documents & PRDs ({project.documents.length})
                      </div>
                      <div className="space-y-1.5">
                        {project.documents.map((doc) => (
                          <div key={doc.id} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-2">
                            <div className="truncate">
                              <div className="font-bold text-slate-900 text-xs truncate">{doc.title}</div>
                              <div className="text-[10px] text-slate-400">{doc.fileName} • {doc.fileSize}</div>
                            </div>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold shrink-0">
                              {doc.uploadedBy}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button to Jump to Proposal Formulation */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-end font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("sprint")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all hover:scale-105"
                >
                  <span>Go to Proposal & Sprint Controls ➔</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 1: SPRINT MILESTONES & ROADMAP */}
        {/* ======================================================== */}
        {activeTab === "sprint" && (
          <div className="space-y-6 animate-fadeIn">
            {/* ======================================================== */}
            {/* PROPOSAL & SOW LIFECYCLE MANAGEMENT */}
            {/* ======================================================== */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Proposal & SOW Lifecycle Control
                    </h3>
                    <p className="text-slate-500 text-xs font-sans mt-0.5">
                      Review client scope ingestion, dispatch formal technical proposals, and configure milestones upon acceptance.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Status:</span>
                  <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] border ${
                    project.proposalStatus === "accepted"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : project.proposalStatus === "proposal_sent"
                      ? "bg-sky-100 text-sky-900 border-sky-300"
                      : project.proposalStatus === "revision_requested"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-purple-100 text-purple-900 border-purple-300"
                  }`}>
                    {project.proposalStatus || "submitted"}
                  </span>
                </div>
              </div>

              {/* Show Client Revision Request Message if any */}
              {project.proposalRevisions && project.proposalRevisions.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                  <div className="text-amber-900 font-bold flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-700" />
                    <span>Client Requested Revision:</span>
                  </div>
                  <p className="text-xs font-sans text-slate-800 italic bg-white p-3 rounded-lg border border-amber-200/80">
                    "{project.proposalRevisions[project.proposalRevisions.length - 1].message}"
                  </p>
                </div>
              )}

              {/* If Proposal Not Accepted Yet: Admin Form to Send Proposal */}
              {project.proposalStatus !== "accepted" ? (
                <form onSubmit={handleSendProposal} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-slate-700 uppercase font-bold block text-[11px]">
                        Currency *
                      </label>
                      <select
                        value={proposedCurrency}
                        onChange={(e) => {
                          const newCurr = e.target.value;
                          setProposedCurrency(newCurr);
                          recalculateStandardMilestones(proposedBudget, newCurr);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs"
                      >
                        <option value="INR">INR (₹) — Indian Rupee</option>
                        <option value="USD">USD ($) — US Dollar</option>
                        <option value="EUR">EUR (€) — Euro</option>
                        <option value="GBP">GBP (£) — British Pound</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 uppercase font-bold block text-[11px]">
                        Proposed Budget ({proposedCurrency}) *
                      </label>
                      <input
                        type="number"
                        required
                        value={proposedBudget}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setProposedBudget(val);
                          recalculateStandardMilestones(val, proposedCurrency);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-700 uppercase font-bold block text-[11px]">
                        Delivery Timeline (Weeks) *
                      </label>
                      <input
                        type="number"
                        required
                        value={proposedTimelineWeeks}
                        onChange={(e) => setProposedTimelineWeeks(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-bold text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase font-bold block text-[11px]">
                      Scope & SOW Deliverables Summary *
                    </label>
                    <NotesField
                      rows={3}
                      value={proposalScopeSummary}
                      onChange={setProposalScopeSummary}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 uppercase font-bold block text-[11px]">
                      Architect's Direct Notes to Client (Optional)
                    </label>
                    <input
                      type="text"
                      value={proposalAdminNotes}
                      onChange={(e) => setProposalAdminNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-sans text-xs"
                      placeholder="e.g. Architecture verified. Phase 1 kickoff scheduled for Monday."
                    />
                  </div>

                  {/* SOW Sprint Milestones Schedule */}
                  <div className="pt-4 border-t border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-sky-600" />
                          <span>Phase 2: Sprint Milestones & Escrow Payment Schedule ({proposedMilestonesList.length})</span>
                        </h4>
                        <p className="text-[11px] font-sans text-slate-500">
                          These milestones will be sent to the client for ratification and automatically lock into their billing schedule upon acceptance.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => recalculateStandardMilestones(proposedBudget, proposedCurrency)}
                          className="px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 text-[10px] font-bold border border-sky-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3 text-sky-600" />
                          <span>Reset 4 Phases (25/35/25/15%)</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAddCustomMilestone}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3 h-3 text-emerald-600" />
                          <span>+ Add Milestone</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {proposedMilestonesList.map((m, idx) => (
                        <div
                          key={m.id || idx}
                          className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 hover:border-sky-300 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                                {idx + 1}
                              </span>
                              <span className="font-bold text-slate-800 text-xs">Milestone {idx + 1} Configuration</span>
                            </div>

                            {proposedMilestonesList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleDeleteMilestoneItem(idx)}
                                className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove Milestone"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                            <div className="md:col-span-6 space-y-1">
                              <label className="text-[10px] text-slate-500 uppercase font-bold block">Milestone Title</label>
                              <input
                                type="text"
                                required
                                value={m.title}
                                onChange={(e) => handleMilestoneFieldChange(idx, "title", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-sans text-xs font-semibold"
                                placeholder="e.g. Architecture Blueprint & DB Schema"
                              />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] text-slate-500 uppercase font-bold block">Allocation (%)</label>
                              <div className="relative">
                                <input
                                  type="number"
                                  min="1"
                                  max="100"
                                  required
                                  value={m.percentage || 0}
                                  onChange={(e) => handleMilestoneFieldChange(idx, "percentage", e.target.value)}
                                  className="w-full px-3 py-2 pr-7 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold"
                                />
                                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] text-slate-500 uppercase font-bold block">Amount ({proposedCurrency})</label>
                              <input
                                type="number"
                                required
                                value={m.amount || 0}
                                onChange={(e) => handleMilestoneFieldChange(idx, "amount", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs font-bold text-emerald-700"
                              />
                            </div>

                            <div className="md:col-span-2 space-y-1">
                              <label className="text-[10px] text-slate-500 uppercase font-bold block">Target Due Date</label>
                              <input
                                type="date"
                                required
                                value={m.dueDate || ""}
                                onChange={(e) => handleMilestoneFieldChange(idx, "dueDate", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 font-mono text-xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 uppercase font-bold block">Deliverables Summary (Shown to Client)</label>
                            <input
                              type="text"
                              value={m.deliverablesSummary || ""}
                              onChange={(e) => handleMilestoneFieldChange(idx, "deliverablesSummary", e.target.value)}
                              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-sans text-xs"
                              placeholder="e.g. Database ERD schema, OpenAPI Swagger specs, and containerized Docker compose."
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Milestone Validation Status Bar */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-4 font-mono text-[11px]">
                        <div>
                          <span className="text-slate-500">Total Allocation: </span>
                          <span className={`font-bold ${
                            proposedMilestonesList.reduce((sum, m) => sum + (Number(m.percentage) || 0), 0) === 100
                              ? "text-emerald-700"
                              : "text-amber-600"
                          }`}>
                            {proposedMilestonesList.reduce((sum, m) => sum + (Number(m.percentage) || 0), 0)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500">Total Milestones Sum: </span>
                          <span className="font-bold text-slate-900">
                            {proposedCurrency === "INR" ? "₹" : proposedCurrency === "EUR" ? "€" : proposedCurrency === "GBP" ? "£" : "$"}
                            {proposedMilestonesList.reduce((sum, m) => sum + (Number(m.amount) || 0), 0).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {proposedMilestonesList.reduce((sum, m) => sum + (Number(m.percentage) || 0), 0) !== 100 && (
                        <span className="text-[11px] font-sans text-amber-600 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Tip: Milestone percentages should sum to 100%.</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={sendingProposal}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {sendingProposal ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          <span>Dispatching Proposal & Milestones...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-white" />
                          <span>{project.proposalStatus === "proposal_sent" ? "Update & Re-send Proposal & Milestones" : "Send Formal Proposal & Milestones to Client"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* When Proposal Is Accepted: Configure Milestones */
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-emerald-900 font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Proposal Ratified by Client!</span>
                      </div>
                      <p className="text-xs font-sans text-slate-600">
                        {project.installments && project.installments.length > 0
                          ? `Active milestone schedule with ${project.installments.length} phases established.`
                          : "Client has accepted terms. Configure the sprint milestones and payment installments now."}
                      </p>
                    </div>

                    {(!project.installments || project.installments.length === 0) && (
                      <button
                        type="button"
                        disabled={configuringMilestones}
                        onClick={handleCreateDefaultMilestones}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {configuringMilestones ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-white" />
                            <span>Configuring Milestones...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 text-white" />
                            <span>Establish 4 Sprint Milestones</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* 5-Phase Interactive Visual Stepper */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-sky-700 uppercase font-bold tracking-wider">
                  Enterprise Sprint Pipeline (5-Phase Delivery Lifecycle)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Current: <strong className="text-slate-900">{project.phaseName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 font-mono">
                {PHASE_NAMES.map((name, i) => {
                  const phaseNum = i + 1;
                  const isCompleted = phaseNum < project.currentPhase;
                  const isCurrent = phaseNum === project.currentPhase;

                  return (
                    <div
                      key={phaseNum}
                      onClick={() => {
                        const updated: AdminProjectSprint = {
                          ...project,
                          currentPhase: phaseNum,
                          phaseName: name,
                        };
                        saveProjectUpdate(updated, `Active phase changed to ${name}`);
                      }}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                        isCurrent
                          ? "bg-sky-50 border-sky-500 ring-2 ring-sky-500/20 shadow-sm"
                          : isCompleted
                          ? "bg-emerald-50/50 border-emerald-300 text-slate-800"
                          : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider">
                          Phase {phaseNum}
                        </span>
                        {isCompleted ? (
                          <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1">
                            <Check className="w-3 h-3" /> Done
                          </span>
                        ) : isCurrent ? (
                          <span className="px-1.5 py-0.5 rounded bg-sky-600 text-white font-bold text-[9px]">
                            ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Pending</span>
                        )}
                      </div>
                      <div className="font-bold line-clamp-2 text-slate-900">
                        {name.replace(/^Phase \d+:\s*/, "")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Handover Milestones Checklist */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono text-sky-700 uppercase font-bold tracking-wider">
                    Architectural Milestones & Deliverables Checklist
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Click any checkbox to update status. Progress percent recalculates automatically.
                  </p>
                </div>
                <span className="text-xs font-mono text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 font-bold">
                  {project.handoverChecklist.filter((c) => c.completed).length} / {project.handoverChecklist.length} Cleared
                </span>
              </div>

              <div className="space-y-2 font-mono">
                {project.handoverChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all group"
                  >
                    <div
                      onClick={() => toggleMilestone(idx)}
                      className="flex items-center gap-3 cursor-pointer flex-1 select-none pr-4"
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          item.completed
                            ? "bg-sky-600 text-white font-bold shadow-sm"
                            : "border border-slate-300 group-hover:border-sky-500 bg-white"
                        }`}
                      >
                        {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-xs transition-colors ${
                          item.completed ? "text-slate-400 line-through" : "text-slate-800 group-hover:text-sky-700 font-medium"
                        }`}
                      >
                        {item.item}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMilestone(idx)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                      title="Delete milestone"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Custom Milestone */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add custom milestone (e.g. Terraform AWS ECS Blue/Green Deployments)..."
                  value={newMilestoneText}
                  onChange={(e) => setNewMilestoneText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addMilestone();
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-mono focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={addMilestone}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-mono font-bold text-xs transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" /> Add Milestone
                </button>
              </div>
            </div>

            {/* Internal Architecture & Sprint Notes */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
              <label className="text-sky-700 uppercase font-bold block">
                Internal Architecture Notes & Engineering Logs:
              </label>
              <NotesField
                rows={4}
                value={project.internalNotes || ""}
                onChange={(internalNotes) => {
                  const updated: AdminProjectSprint = {
                    ...project,
                    internalNotes,
                  };
                  setProject(updated);
                }}
                onBlur={() => saveProjectUpdate(project, "Internal notes saved")}
                placeholder="Write internal sprint logs, security caveats, or deployment notes..."
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => saveProjectUpdate(project, "Internal notes saved successfully!")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-bold"
                >
                  <Save className="w-3.5 h-3.5 text-sky-600" /> Save Notes
                </button>
              </div>
            </div>
          </div>
        )}


        {/* ======================================================== */}
        {/* TAB 3: DOCUMENT VAULT */}
        {/* ======================================================== */}
        {activeTab === "documents" && (
          <div className="space-y-6 animate-fadeIn font-mono text-xs">
            {/* Upload Document Form */}
            <form
              onSubmit={handleAddDocument}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-2 text-sky-700 uppercase font-bold tracking-wider">
                <Plus className="w-4 h-4 text-sky-600" />
                <span>Upload New Architectural Deliverable or Document</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-slate-500 uppercase font-bold block mb-1">Document Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SOC2 Type II Audit Readiness Spec"
                    value={newDocTitle}
                    onChange={(e) => setNewDocTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="text-slate-500 uppercase font-bold block mb-1">Category</label>
                  <select
                    value={newDocCategory}
                    onChange={(e) => setNewDocCategory(e.target.value as ProjectDocument["category"])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sky-800 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                  >
                    <option value="deliverable">Architectural Deliverable</option>
                    <option value="architecture">Architecture Blueprint</option>
                    <option value="prd">PRD & Scope</option>
                    <option value="contract">Legal & Contract</option>
                    <option value="design">Figma & Design Tokens</option>
                    <option value="asset">Client Asset Pack</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-500 uppercase font-bold block mb-1">Direct URL / Cloud Link (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://docs.divanextechnologies.com/spec.pdf"
                    value={newDocUrl}
                    onChange={(e) => setNewDocUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4 stroke-[3]" /> Add to Document Vault
                </button>
              </div>
            </form>

            {/* Document Vault List */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sky-700 uppercase font-bold tracking-wider">
                  Active Project Documents ({project.documents?.length || 0})
                </span>
                <span className="text-slate-500">Internal deliverable record</span>
              </div>

              {(!project.documents || project.documents.length === 0) ? (
                <div className="p-8 text-center text-slate-500 rounded-xl bg-slate-50 border border-slate-200">
                  No documents uploaded yet. Use the form above to upload PRDs, architecture specifications, or contract deliverables.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              doc.uploadedBy === "client"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                          >
                            {doc.uploadedBy === "client" ? "Client Upload" : "Divanex Deliverable"}
                          </span>

                          <span className="text-slate-400 text-[10px]">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 tracking-tight">{doc.title}</h4>
                        <div className="text-slate-500 text-[11px] truncate">{doc.fileName} • {doc.fileSize}</div>
                        {doc.description && (
                          <p className="text-slate-600 text-[11px] line-clamp-2">{doc.description}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase font-medium">{doc.category}</span>
                        <div className="flex items-center gap-2">
                          {doc.url ? (
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-sky-800 text-[11px] font-bold"
                            >
                              <Download className="w-3 h-3 text-sky-600" /> View / Download
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => showToast(`Simulating download of ${doc.fileName}`)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-sky-800 text-[11px] font-bold"
                            >
                              <Download className="w-3 h-3 text-sky-600" /> Download
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-1 rounded text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove document"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CLIENT FEEDBACK & REVISIONS TRACKER */}
        {/* ======================================================== */}
        {activeTab === "feedback" && (
          <div className="space-y-6 animate-fadeIn font-mono text-xs">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sky-700 uppercase font-bold tracking-wider text-sm">
                    Client Feedback & Milestone Approvals Tracker
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Messages, approvals, and revision requests submitted live by the client from their portal.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 font-bold">
                  {project.feedbacks?.length || 0} Submissions
                </span>
              </div>

              {(!project.feedbacks || project.feedbacks.length === 0) ? (
                <div className="p-8 text-center text-slate-500 rounded-xl bg-slate-50 border border-slate-200">
                  No feedback received yet. As soon as the client submits milestone signoffs or revision requests on their portal, they will appear here in real time.
                </div>
              ) : (
                <div className="space-y-4">
                  {project.feedbacks.map((fb) => (
                    <div
                      key={fb.id}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 space-y-4 transition-all"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              fb.type === "approval"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : fb.type === "revision"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : fb.type === "bug"
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : "bg-sky-50 text-sky-700 border border-sky-200"
                            }`}
                          >
                            {fb.type.toUpperCase()}
                          </span>

                          <span className="text-amber-500 font-bold">
                            {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                          </span>

                          <span className="text-slate-500">
                            Milestone: <strong className="text-slate-900">{fb.milestoneOrPhase}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={fb.status}
                            onChange={(e) =>
                              handleUpdateFeedbackStatus(
                                fb.id,
                                e.target.value as "pending" | "reviewed" | "resolved"
                              )
                            }
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border focus:outline-none ${
                              fb.status === "resolved"
                                ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                : fb.status === "reviewed"
                                ? "bg-blue-50 border-blue-300 text-blue-800"
                                : "bg-amber-50 border-amber-300 text-amber-800"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Under Review</option>
                            <option value="resolved">Resolved / Approved</option>
                          </select>
                          <span className="text-slate-400 text-[10px]">
                            {new Date(fb.submittedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Feedback Body */}
                      <p className="text-slate-800 text-xs leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                        &quot;{fb.message}&quot;
                      </p>

                      {/* Existing Admin Reply */}
                      {fb.adminReply && (
                        <div className="p-3 rounded-lg bg-sky-50/80 border border-sky-200 space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-sky-800 font-bold">
                            <span>Divanex Engineering Response:</span>
                            {fb.replyAt && <span>{new Date(fb.replyAt).toLocaleString()}</span>}
                          </div>
                          <p className="text-sky-900 text-xs">{fb.adminReply}</p>
                        </div>
                      )}

                      {/* Reply Input Box */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          placeholder="Write an internal reply (e.g. Adjustments deployed to Staging)..."
                          value={replyInputs[fb.id] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({ ...prev, [fb.id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSendFeedbackReply(fb.id);
                            }
                          }}
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-sky-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSendFeedbackReply(fb.id)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-all shadow-sm"
                        >
                          <Send className="w-3 h-3" /> Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: DEPLOYMENTS & INFRASTRUCTURE */}
        {/* ======================================================== */}
        {activeTab === "infrastructure" && (
          <div className="space-y-6 animate-fadeIn font-mono text-xs">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sky-700 uppercase font-bold tracking-wider">
                  Live Deployment Environments & Deliverables
                </span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" /> 99.9% SLA Operational
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Staging URL */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-slate-500 uppercase font-bold block">
                    Staging Preview Environment
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={project.stagingUrl || ""}
                      onChange={(e) => {
                        const updated: AdminProjectSprint = { ...project, stagingUrl: e.target.value };
                        setProject(updated);
                      }}
                      onBlur={() => saveProjectUpdate(project, "Staging URL updated")}
                      placeholder="https://staging.domain.com"
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-800 font-bold focus:outline-none focus:border-sky-500"
                    />
                    {project.stagingUrl && (
                      <a
                        href={project.stagingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100"
                        title="Launch Staging"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Production URL */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-slate-500 uppercase font-bold block">
                    Production Application URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={project.productionUrl || ""}
                      onChange={(e) => {
                        const updated: AdminProjectSprint = { ...project, productionUrl: e.target.value };
                        setProject(updated);
                      }}
                      onBlur={() => saveProjectUpdate(project, "Production URL updated")}
                      placeholder="https://app.domain.com"
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-emerald-700 font-bold focus:outline-none focus:border-sky-500"
                    />
                    {project.productionUrl && (
                      <a
                        href={project.productionUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                        title="Launch Production"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Figma Design Prototype URL */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-slate-500 uppercase font-bold block">
                    Figma Architecture & Design System URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={project.figmaUrl || ""}
                      onChange={(e) => {
                        const updated: AdminProjectSprint = { ...project, figmaUrl: e.target.value };
                        setProject(updated);
                      }}
                      onBlur={() => saveProjectUpdate(project, "Figma URL updated")}
                      placeholder="https://figma.com/@divanex/design-spec"
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-purple-700 font-bold focus:outline-none focus:border-sky-500"
                    />
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100"
                        title="Launch Figma"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Git Repository */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="text-slate-500 uppercase font-bold block">
                    Enterprise Git Repository URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={project.repoUrl || ""}
                      onChange={(e) => {
                        const updated: AdminProjectSprint = { ...project, repoUrl: e.target.value };
                        setProject(updated);
                      }}
                      onBlur={() => saveProjectUpdate(project, "Git repo URL updated")}
                      placeholder="https://github.com/divanex-enterprise/repo"
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold focus:outline-none focus:border-sky-500"
                    />
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl.startsWith("http") ? project.repoUrl : `https://${project.repoUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
                        title="Open Git"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Team Members & Assigned Lead */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-2">
                  <label className="text-slate-500 uppercase font-bold block">Assigned Lead Solutions Architect</label>
                  <input
                    type="text"
                    value={project.assignedLead}
                    onChange={(e) => {
                      const updated: AdminProjectSprint = { ...project, assignedLead: e.target.value };
                      setProject(updated);
                    }}
                    onBlur={() => saveProjectUpdate(project, "Assigned Lead updated")}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-slate-500 uppercase font-bold block">Engineering Team Members</label>
                  <input
                    type="text"
                    value={project.teamMembers?.join(", ") || ""}
                    onChange={(e) => {
                      const members = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                      const updated: AdminProjectSprint = { ...project, teamMembers: members };
                      setProject(updated);
                    }}
                    onBlur={() => saveProjectUpdate(project, "Team members updated")}
                    placeholder="Rajan S., Sarah C., Vikram K."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
