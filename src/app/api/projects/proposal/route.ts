import { NextResponse } from "next/server";
import { getProjectById, upsertProject } from "@/lib/projectsStore";
import { createNotification } from "@/lib/notificationsStore";
import { readJson, serverError } from "@/lib/api";
import { ProjectInstallment, ProjectDocument } from "@/data/adminData";
import { requirePermission } from "@/lib/guard";

export async function POST(request: Request) {
  try {
    const check = await requirePermission("projects.edit");
    if (!check.ok) return check.response;

    const body = await readJson<{
      projectId: string;
      action: "send_proposal" | "create_milestones";
      proposalData?: {
        proposedBudget: number;
        currency?: string;
        proposedTimelineWeeks: number;
        scopeSummary: string;
        deliverables?: string[];
        sowDocUrl?: string;
        adminNotes?: string;
      };
      milestones?: ProjectInstallment[];
    }>(request);

    if (!body?.projectId) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    const project = getProjectById(body.projectId);
    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    if (body.action === "send_proposal") {
      const pData = body.proposalData;
      if (!pData) {
        return NextResponse.json({ success: false, error: "Proposal data is required" }, { status: 400 });
      }

      project.proposalStatus = "proposal_sent";
      project.totalBudget = pData.proposedBudget || project.totalBudget;
      project.currency = pData.currency || project.currency || "USD";
      const currSymbol = project.currency === "INR" ? "₹" : project.currency === "EUR" ? "€" : project.currency === "GBP" ? "£" : "$";
      project.contractValue = `${currSymbol}${project.totalBudget?.toLocaleString()}`;
      project.targetHandover = new Date(Date.now() + (pData.proposedTimelineWeeks || 8) * 7 * 86400000).toISOString().split("T")[0];

      if (Array.isArray(body.milestones) && body.milestones.length > 0) {
        project.installments = body.milestones;
      }

      project.proposalDetails = {
        sentAt: new Date().toISOString(),
        proposedBudget: pData.proposedBudget,
        currency: project.currency,
        proposedTimelineWeeks: pData.proposedTimelineWeeks,
        scopeSummary: pData.scopeSummary,
        deliverables: pData.deliverables || [],
        sowDocUrl: pData.sowDocUrl,
        adminNotes: pData.adminNotes,
      };

      // Add Proposal SOW Document to documents
      if (!project.documents) {
        project.documents = [];
      }

      const docId = `doc-sow-${Date.now()}`;
      project.documents.unshift({
        id: docId,
        title: `${project.projectName} — Formal Technical Proposal & SOW`,
        category: "contract",
        fileName: `${project.projectName.replace(/\s+/g, "_")}_Official_Proposal.pdf`,
        fileSize: "1.8 MB",
        uploadedBy: "admin",
        uploadedAt: new Date().toISOString(),
        version: "v1.0",
        tags: ["Official Proposal", "SOW"],
        description: pData.scopeSummary || "Formulated technical architecture and milestone scope.",
      });

      // Notify Client
      createNotification({
        target: "client",
        clientId: project.clientId || "client",
        clientName: project.clientName,
        projectId: project.id,
        projectName: project.projectName,
        sender: "admin",
        senderName: "Divanex Lead Architect",
        title: "Official Project Proposal Received",
        message: `Our Lead Solutions Architect has reviewed your scope and formulated an official proposal for "${project.projectName}". Our team will follow up with you directly to review and approve it.`,
        type: "project",
        priority: "urgent",
        actionUrl: "overview",
      });

      upsertProject(project);

      return NextResponse.json({
        success: true,
        message: "Proposal sent to client successfully!",
        project,
      });
    } else if (body.action === "create_milestones") {
      if (!Array.isArray(body.milestones) || body.milestones.length === 0) {
        return NextResponse.json({ success: false, error: "At least one milestone is required." }, { status: 400 });
      }

      project.installments = body.milestones;
      project.currentPhase = 1;
      project.phaseName = project.installments[0]?.title || "Phase 1: Architecture & Data Modeling";

      // Notify Client that milestones are established
      createNotification({
        target: "client",
        clientId: project.clientId || "client",
        clientName: project.clientName,
        projectId: project.id,
        projectName: project.projectName,
        sender: "admin",
        senderName: "Divanex Engineering Lead",
        title: "Sprint Milestones & Payment Schedule Established",
        message: `Your project "${project.projectName}" now has ${body.milestones.length} configured sprint milestones. You can track progress and releases in Milestones & Finance.`,
        type: "milestone",
        priority: "urgent",
        actionUrl: "milestones",
      });

      upsertProject(project);

      return NextResponse.json({
        success: true,
        message: "Milestones configured successfully!",
        project,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    return serverError("projects:proposal", err);
  }
}
