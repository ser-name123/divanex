import { badRequest, cleanString, isValidEmail, ok, readJson, serverError } from "@/lib/api";
import { requirePermission } from "@/lib/guard";
import { clientIp } from "@/lib/rate-limit";
import { recordAudit } from "@/lib/auditStore";
import { createAdmin, listAdmins } from "@/lib/adminUserStore";
import { ROLE_LABELS, isRole, type Role } from "@/lib/permissions";

/**
 * The admin directory.
 *
 * Reading it needs `users.view`, which a manager has: knowing who else can
 * reach the console is part of operating it. Changing it needs `users.manage`,
 * which only an owner has — a console where a manager can promote themselves
 * has four roles and one privilege level.
 */

interface CreateBody {
  email?: unknown;
  name?: unknown;
  role?: unknown;
  password?: unknown;
}

export async function GET() {
  try {
    const check = await requirePermission("users.view");
    if (!check.ok) return check.response;

    return ok({ users: await listAdmins() });
  } catch (error) {
    return serverError("admin:users:list", error);
  }
}

export async function POST(request: Request) {
  try {
    const check = await requirePermission("users.manage");
    if (!check.ok) return check.response;

    const body = await readJson<CreateBody>(request);
    if (!body) return badRequest("Invalid request body.");

    const email = cleanString(body.email, 150).toLowerCase();
    const name = cleanString(body.name, 120);
    const role = body.role;
    const password = typeof body.password === "string" ? body.password : "";

    if (!isValidEmail(email)) return badRequest("Enter a valid email address.");
    if (!name) return badRequest("Enter a name.");
    if (!isRole(role)) return badRequest("Choose a valid role.");

    const created = await createAdmin({
      email,
      name,
      role: role as Role,
      password,
      createdBy: check.admin.email,
    });

    if (!created.ok) return badRequest(created.error);

    // The password is not in the audit row, and could not be: `recordAudit`
    // redacts any field whose name looks like a secret.
    await recordAudit({
      actor: { email: check.admin.email, name: check.admin.name, role: check.admin.role },
      action: "admin.user.created",
      targetType: "admin_user",
      targetId: created.value.id,
      targetLabel: `${created.value.name} <${created.value.email}>`,
      ip: clientIp(request),
      detail: `created as ${ROLE_LABELS[created.value.role]}`,
      changes: [
        { field: "email", before: null, after: created.value.email },
        { field: "name", before: null, after: created.value.name },
        { field: "role", before: null, after: created.value.role },
      ],
    });

    return ok({ user: created.value });
  } catch (error) {
    return serverError("admin:users:create", error);
  }
}
