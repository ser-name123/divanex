import { badRequest, cleanString, ok, readJson, serverError } from "@/lib/api";
import { requirePermission } from "@/lib/guard";
import { clientIp } from "@/lib/rate-limit";
import { recordAudit, type AuditAction, type FieldChange } from "@/lib/auditStore";
import { deleteAdmin, getAdminById, updateAdmin } from "@/lib/adminUserStore";
import { ROLE_LABELS, isRole, type Role } from "@/lib/permissions";

/**
 * One admin account.
 *
 * Every branch here is owner-only and every branch writes an audit row, because
 * these are the changes that decide who can make every other change.
 *
 * Two edits are refused outright rather than merely discouraged: an owner
 * cannot change their own role, and the last active owner cannot be demoted,
 * suspended or deleted. Both would leave the console with nobody able to
 * repair it from inside. The second check also lives in the store, so it holds
 * for any future caller; this one exists to return a useful message.
 */

interface PatchBody {
  name?: unknown;
  role?: unknown;
  status?: unknown;
  password?: unknown;
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const check = await requirePermission("users.manage");
    if (!check.ok) return check.response;

    const { id } = await context.params;
    const body = await readJson<PatchBody>(request);
    if (!body) return badRequest("Invalid request body.");

    const existing = await getAdminById(id);
    if (!existing) return badRequest("That admin no longer exists.");

    const patch: { name?: string; role?: Role; status?: "active" | "suspended"; password?: string } =
      {};

    if (body.name !== undefined) {
      const name = cleanString(body.name, 120);
      if (!name) return badRequest("Enter a name.");
      patch.name = name;
    }

    if (body.role !== undefined) {
      if (!isRole(body.role)) return badRequest("Choose a valid role.");
      if (existing.id === check.admin.id && body.role !== existing.role) {
        return badRequest("You cannot change your own role. Ask another owner to do it.");
      }
      patch.role = body.role as Role;
    }

    if (body.status !== undefined) {
      if (body.status !== "active" && body.status !== "suspended") {
        return badRequest("Status must be active or suspended.");
      }
      if (existing.id === check.admin.id && body.status === "suspended") {
        return badRequest("You cannot suspend your own account.");
      }
      patch.status = body.status;
    }

    if (body.password !== undefined) {
      if (typeof body.password !== "string" || body.password.length < 12) {
        return badRequest("The password must be at least 12 characters.");
      }
      patch.password = body.password;
    }

    if (Object.keys(patch).length === 0) return badRequest("Nothing to change.");

    const updated = await updateAdmin(id, patch);
    if (!updated.ok) return badRequest(updated.error);

    const changes: FieldChange[] = [];
    if (patch.name !== undefined && patch.name !== existing.name) {
      changes.push({ field: "name", before: existing.name, after: patch.name });
    }
    if (patch.role !== undefined && patch.role !== existing.role) {
      changes.push({ field: "role", before: existing.role, after: patch.role });
    }
    if (patch.status !== undefined && patch.status !== existing.status) {
      changes.push({ field: "status", before: existing.status, after: patch.status });
    }
    if (patch.password !== undefined) {
      changes.push({ field: "password", before: null, after: null });
    }

    // The most specific action available, so the trail can be filtered by the
    // thing that actually happened rather than by a catch-all "updated".
    let action: AuditAction = "admin.user.updated";
    let detail = "profile updated";
    if (patch.password !== undefined) {
      action = "admin.user.password_reset";
      detail = "password reset by an owner";
    } else if (patch.status === "suspended") {
      action = "admin.user.suspended";
      detail = "account suspended";
    } else if (patch.status === "active" && existing.status === "suspended") {
      action = "admin.user.reactivated";
      detail = "account reactivated";
    } else if (patch.role !== undefined && patch.role !== existing.role) {
      action = "admin.user.role_changed";
      detail = `${ROLE_LABELS[existing.role]} → ${ROLE_LABELS[patch.role]}`;
    }

    await recordAudit({
      actor: { email: check.admin.email, name: check.admin.name, role: check.admin.role },
      action,
      targetType: "admin_user",
      targetId: existing.id,
      targetLabel: `${existing.name} <${existing.email}>`,
      ip: clientIp(request),
      detail,
      changes,
    });

    return ok({ user: updated.value });
  } catch (error) {
    return serverError("admin:users:update", error);
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const check = await requirePermission("users.manage");
    if (!check.ok) return check.response;

    const { id } = await context.params;

    if (id === check.admin.id) {
      return badRequest("You cannot remove your own account.");
    }

    const removed = await deleteAdmin(id);
    if (!removed.ok) return badRequest(removed.error);

    await recordAudit({
      actor: { email: check.admin.email, name: check.admin.name, role: check.admin.role },
      action: "admin.user.deleted",
      targetType: "admin_user",
      targetId: removed.value.id,
      targetLabel: `${removed.value.name} <${removed.value.email}>`,
      ip: clientIp(request),
      detail: `removed a ${ROLE_LABELS[removed.value.role]}`,
      changes: [
        { field: "email", before: removed.value.email, after: null },
        { field: "role", before: removed.value.role, after: null },
      ],
    });

    return ok({ id: removed.value.id });
  } catch (error) {
    return serverError("admin:users:delete", error);
  }
}
