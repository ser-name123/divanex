import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { AdminProjectSprint } from "@/data/adminData";
import {
  badRequest,
  cleanString,
  cleanText,
  ok,
  oneOf,
  readJson,
  toStringArray,
} from "@/lib/api";
import {
  getAllProjects,
  upsertProject as upsertInStore,
  deleteProject as deleteFromStore,
  getProjectById,
} from "@/lib/projectsStore";
import { requirePermission } from "@/lib/guard";

/** Admin-only. Access is gated by src/proxy.ts. */

const PRIORITIES = ["urgent", "high", "normal"] as const;
const STATUSES = ["active", "in_review", "completed", "on_hold"] as const;

interface ProjectRow {
  id: string;
  project_name: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  service_category: string;
  current_phase: number;
  phase_name: string;
  progress_percent: number;
  start_date: string;
  target_handover: string;
  assigned_lead: string;
  contract_value: string;
  paid_escrow_value: string | null;
  priority: AdminProjectSprint["priority"];
  status: AdminProjectSprint["status"];
  repo_url: string | null;
  staging_url: string | null;
  internal_notes: string | null;
  team_members: string[] | null;
  handover_checklist: AdminProjectSprint["handoverChecklist"] | null;
}

function toProject(row: ProjectRow): AdminProjectSprint {
  const existing = getProjectById(row.id);
  return {
    id: row.id,
    projectName: row.project_name,
    clientName: row.client_name,
    clientEmail: row.client_email || "",
    clientPhone: row.client_phone || "",
    serviceCategory: row.service_category,
    currentPhase: row.current_phase,
    phaseName: row.phase_name,
    progressPercent: row.progress_percent,
    startDate: row.start_date,
    targetHandover: row.target_handover,
    assignedLead: row.assigned_lead,
    contractValue: row.contract_value,
    paidEscrowValue: row.paid_escrow_value || "",
    priority: row.priority,
    status: row.status,
    repoUrl: row.repo_url || "",
    stagingUrl: row.staging_url || "",
    productionUrl: existing?.productionUrl || "",
    figmaUrl: existing?.figmaUrl || "",
    internalNotes: row.internal_notes || "",
    teamMembers: row.team_members || [],
    handoverChecklist: row.handover_checklist || [],
    documents: existing?.documents || [],
    feedbacks: existing?.feedbacks || [],
    deliverables: existing?.deliverables || [],
  };
}

/** Clamps a number into range, falling back when the value is not numeric. */
function clampNumber(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(Math.max(Math.round(n), min), max);
}

function cleanChecklist(value: unknown): AdminProjectSprint["handoverChecklist"] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry): entry is { item: unknown; completed: unknown } =>
      Boolean(entry) && typeof entry === "object" && !Array.isArray(entry)
    )
    .slice(0, 100)
    .map((entry) => ({
      item: cleanString(entry.item, 300),
      completed: entry.completed === true,
    }))
    .filter((entry) => entry.item.length > 0);
}

export async function GET() {
  try {
    const check = await requirePermission("projects.view");
    if (!check.ok) return check.response;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return ok({ projects: ((data as ProjectRow[]) || []).map(toProject) });
    }
  } catch {
    // Supabase not configured or unreachable; proceed with server projectsStore
  }

  return ok({ projects: getAllProjects() });
}

export async function POST(request: Request) {
  try {
    const check = await requirePermission("projects.edit");
    if (!check.ok) return check.response;

    const body = await readJson<Partial<AdminProjectSprint>>(request);
    if (!body) return badRequest("Invalid request body.");

    const id = cleanString(body.id, 100) || `proj-${randomUUID()}`;
    const existing = getProjectById(id);

    const fullProject: AdminProjectSprint = {
      id,
      projectName: cleanString(body.projectName, 200) || "New Client Initiative",
      clientName: cleanString(body.clientName, 120) || "Enterprise Client",
      clientEmail: cleanString(body.clientEmail, 254).toLowerCase(),
      clientPhone: cleanString(body.clientPhone, 40),
      serviceCategory: cleanString(body.serviceCategory, 160) || "SaaS Development",
      currentPhase: clampNumber(body.currentPhase, 1, 20, 1),
      phaseName:
        cleanString(body.phaseName, 200) || "Phase 1: Architecture & Data Modeling",
      progressPercent: clampNumber(body.progressPercent, 0, 100, 0),
      startDate: cleanString(body.startDate, 40) || new Date().toISOString().slice(0, 10),
      targetHandover: cleanString(body.targetHandover, 40),
      assignedLead:
        cleanString(body.assignedLead, 120) || "Rajan S. (Lead Solutions Architect)",
      contractValue: cleanString(body.contractValue, 60) || "$25,000",
      paidEscrowValue: cleanString(body.paidEscrowValue, 60),
      priority: oneOf(body.priority, PRIORITIES, "normal"),
      status: oneOf(body.status, STATUSES, "active"),
      repoUrl: cleanString(body.repoUrl, 500),
      stagingUrl: cleanString(body.stagingUrl, 500),
      productionUrl: cleanString(body.productionUrl, 500),
      figmaUrl: cleanString(body.figmaUrl, 500),
      internalNotes: cleanText(body.internalNotes, 5000),
      teamMembers: toStringArray(body.teamMembers, 50, 120),
      handoverChecklist: cleanChecklist(body.handoverChecklist),
      documents: body.documents || existing?.documents || [],
      feedbacks: body.feedbacks || existing?.feedbacks || [],
      deliverables: body.deliverables || existing?.deliverables || [],
    };

    // Save in memory store
    const saved = upsertInStore(fullProject);

    // Also attempt Supabase upsert if service role is available
    try {
      const supabase = getSupabase();
      const payload = {
        id: saved.id,
        project_name: saved.projectName,
        client_name: saved.clientName,
        client_email: saved.clientEmail,
        client_phone: saved.clientPhone,
        service_category: saved.serviceCategory,
        current_phase: saved.currentPhase,
        phase_name: saved.phaseName,
        progress_percent: saved.progressPercent,
        start_date: saved.startDate,
        target_handover: saved.targetHandover,
        assigned_lead: saved.assignedLead,
        contract_value: saved.contractValue,
        paid_escrow_value: saved.paidEscrowValue,
        priority: saved.priority,
        status: saved.status,
        repo_url: saved.repoUrl,
        staging_url: saved.stagingUrl,
        internal_notes: saved.internalNotes,
        team_members: saved.teamMembers,
        handover_checklist: saved.handoverChecklist,
      };
      await supabase.from("projects").upsert(payload);
    } catch {
      // Supabase is optional; in-memory store and localStorage keep data alive
    }

    return ok({ project: saved });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal error";
    return badRequest(msg);
  }
}

export async function PUT(request: Request) {
  try {
    const check = await requirePermission("projects.edit");
    if (!check.ok) return check.response;

    const body = await readJson<Partial<AdminProjectSprint>>(request);
    if (!body) return badRequest("Invalid request body.");

    const id = cleanString(body.id, 100);
    if (!id) return badRequest("Missing project ID.");

    const existing = getProjectById(id);
    if (!existing) return badRequest("Project not found.");

    const updated: AdminProjectSprint = {
      ...existing,
      ...body,
      id,
    };

    upsertInStore(updated);

    try {
      const supabase = getSupabase();
      const updates: Record<string, unknown> = {};
      if (body.currentPhase !== undefined) updates.current_phase = body.currentPhase;
      if (body.phaseName !== undefined) updates.phase_name = body.phaseName;
      if (body.progressPercent !== undefined) updates.progress_percent = body.progressPercent;
      if (body.status !== undefined) updates.status = body.status;
      if (body.priority !== undefined) updates.priority = body.priority;
      if (body.handoverChecklist !== undefined) updates.handover_checklist = body.handoverChecklist;
      if (body.internalNotes !== undefined) updates.internal_notes = body.internalNotes;
      if (Object.keys(updates).length > 0) {
        await supabase.from("projects").update(updates).eq("id", id);
      }
    } catch {
      // Ignored if Supabase not configured
    }

    return ok({ project: updated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal error";
    return badRequest(msg);
  }
}

export async function DELETE(request: Request) {
  try {
    const check = await requirePermission("projects.edit");
    if (!check.ok) return check.response;

    const id = new URL(request.url).searchParams.get("id");
    if (!id) return badRequest("Missing project ID.");

    deleteFromStore(id);

    try {
      const supabase = getSupabase();
      await supabase.from("projects").delete().eq("id", id);
    } catch {
      // Ignored if Supabase not configured
    }

    return ok({});
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Internal error";
    return badRequest(msg);
  }
}
