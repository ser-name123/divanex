import "server-only";
import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { isRole, type Role } from "@/lib/permissions";

/**
 * The admin directory.
 *
 * Before this, every operator signed in with one shared password from the
 * environment, against a hardcoded list of two names. Nothing could attribute
 * an action to a person, so the role beside each name was decoration. One row
 * per admin, each with their own password, makes both possible.
 *
 * A password hash never leaves this module. The exported shape has no field for
 * one, so a route cannot serialise it into a response by accident.
 */

const TABLE = "admin_users";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: "active" | "suspended";
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

interface AdminRow {
  id: string;
  email: string;
  name: string;
  role: string;
  password_hash: string;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

type PublicRow = Omit<AdminRow, "password_hash">;

const COLUMNS = "id, email, name, role, status, created_by, created_at, updated_at, last_login_at";

function toUser(row: PublicRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: isRole(row.role) ? row.role : "viewer",
    status: row.status === "suspended" ? "suspended" : "active",
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    lastLoginAt: row.last_login_at,
  };
}

export function normaliseEmail(value: string): string {
  return String(value || "").trim().toLowerCase();
}

/**
 * Creates the first owner from the environment credentials.
 *
 * Without this, deploying the directory would lock out the one person able to
 * populate it: the console would have no accounts, and the only credentials in
 * existence would no longer be accepted. So the first sign-in after the upgrade
 * turns the existing ADMIN_EMAIL and ADMIN_PASSWORD_HASH into a real owner row,
 * and the environment password becomes simply that owner's initial password.
 *
 * It runs only while the table is empty. Once an owner exists the environment
 * hash is never consulted again, and a password changed in the console is what
 * takes effect.
 */
export async function ensureBootstrapOwner(): Promise<void> {
  const email = normaliseEmail(process.env.ADMIN_EMAIL || "");
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!email || !hash) return;

  // Refuse a hash that did not survive being read out of the environment.
  //
  // Next loads .env.local through dotenv-expand, which reads `$` as the start
  // of a variable reference — so an unescaped `scrypt$salt$hash` arrives as the
  // word "scrypt". Seeding an owner with that would create an account whose
  // password can never be entered, and the failure would look like a wrong
  // password rather than a malformed file.
  if (!/^scrypt\$[0-9a-f]+\$[0-9a-f]+$/.test(hash)) {
    console.error(
      "[admin] ADMIN_PASSWORD_HASH is malformed, so no owner was seeded. " +
        "In .env.local each $ must be written as \\$; in a host's env settings it must not be."
    );
    return;
  }

  try {
    const supabase = getSupabase();
    const { count, error } = await supabase.from(TABLE).select("id", { count: "exact", head: true });
    if (error || (count ?? 0) > 0) return;

    await supabase.from(TABLE).insert({
      id: `admin-${randomUUID()}`,
      email,
      name: process.env.ADMIN_USERNAME || "Owner",
      role: "owner",
      password_hash: hash,
      status: "active",
      created_by: "bootstrap",
    });
    console.info(`[admin] seeded the first owner account from the environment: ${email}`);
  } catch {
    // A failure here leaves the table empty and the next sign-in retries it.
  }
}

/** Every admin, oldest first. Never includes a password hash. */
export async function listAdmins(): Promise<AdminUser[]> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select(COLUMNS)
      .order("created_at", { ascending: true });
    if (error || !Array.isArray(data)) return [];
    return (data as PublicRow[]).map(toUser);
  } catch {
    return [];
  }
}

export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select(COLUMNS)
      .eq("email", normaliseEmail(email))
      .maybeSingle<PublicRow>();
    if (error || !data) return null;
    return toUser(data);
  } catch {
    return null;
  }
}

export async function getAdminById(id: string): Promise<AdminUser | null> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select(COLUMNS)
      .eq("id", id)
      .maybeSingle<PublicRow>();
    if (error || !data) return null;
    return toUser(data);
  } catch {
    return null;
  }
}

/**
 * Checks a password against the stored hash.
 *
 * A suspended account fails here rather than at some later gate, so suspending
 * somebody takes effect on their next sign-in attempt and not merely on what
 * the console draws for them.
 */
export async function verifyAdminPassword(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select(`${COLUMNS}, password_hash`)
      .eq("email", normaliseEmail(email))
      .maybeSingle<AdminRow>();

    if (error || !data) return null;
    if (data.status === "suspended") return null;
    if (!verifyPassword(password, data.password_hash)) return null;
    return toUser(data);
  } catch {
    return null;
  }
}

export async function countAdmins(): Promise<number> {
  try {
    const { count, error } = await getSupabase()
      .from(TABLE)
      .select("id", { count: "exact", head: true });
    return error ? 0 : count ?? 0;
  } catch {
    return 0;
  }
}

async function countActiveOwners(excludingId?: string): Promise<number> {
  const admins = await listAdmins();
  return admins.filter((a) => a.role === "owner" && a.status === "active" && a.id !== excludingId)
    .length;
}

export interface CreateAdminInput {
  email: string;
  name: string;
  role: Role;
  password: string;
  createdBy: string;
}

export type StoreResult<T> = { ok: true; value: T } | { ok: false; error: string };

export async function createAdmin(input: CreateAdminInput): Promise<StoreResult<AdminUser>> {
  const email = normaliseEmail(input.email);
  if (!email.includes("@")) return { ok: false, error: "Enter a valid email address." };
  if (!input.name.trim()) return { ok: false, error: "Enter a name." };
  if (input.password.length < 12) {
    return { ok: false, error: "The password must be at least 12 characters." };
  }

  if (await getAdminByEmail(email)) {
    return { ok: false, error: "An admin with that email already exists." };
  }

  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .insert({
        id: `admin-${randomUUID()}`,
        email,
        name: input.name.trim(),
        role: input.role,
        password_hash: hashPassword(input.password),
        status: "active",
        created_by: input.createdBy,
      })
      .select(COLUMNS)
      .maybeSingle<PublicRow>();

    if (error || !data) return { ok: false, error: error?.message || "Could not create the admin." };
    return { ok: true, value: toUser(data) };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not create the admin.",
    };
  }
}

export interface UpdateAdminInput {
  name?: string;
  role?: Role;
  status?: "active" | "suspended";
  password?: string;
}

/**
 * Applies an edit, refusing the ones that would leave nobody in charge.
 *
 * The last active owner cannot be demoted or suspended. The check lives here
 * rather than only in the route so any future caller inherits it — a console
 * with no owner cannot be repaired from inside the console.
 */
export async function updateAdmin(
  id: string,
  input: UpdateAdminInput
): Promise<StoreResult<AdminUser>> {
  const existing = await getAdminById(id);
  if (!existing) return { ok: false, error: "That admin no longer exists." };

  const losesOwnership =
    existing.role === "owner" &&
    ((input.role !== undefined && input.role !== "owner") || input.status === "suspended");

  if (losesOwnership && (await countActiveOwners(id)) === 0) {
    return { ok: false, error: "This is the last owner. Promote somebody else first." };
  }

  if (input.password !== undefined && input.password.length < 12) {
    return { ok: false, error: "The password must be at least 12 characters." };
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (input.name !== undefined) patch.name = input.name.trim();
  if (input.role !== undefined) patch.role = input.role;
  if (input.status !== undefined) patch.status = input.status;
  if (input.password !== undefined) patch.password_hash = hashPassword(input.password);

  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .update(patch)
      .eq("id", id)
      .select(COLUMNS)
      .maybeSingle<PublicRow>();

    if (error || !data) return { ok: false, error: error?.message || "Could not save the changes." };
    return { ok: true, value: toUser(data) };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not save the changes.",
    };
  }
}

export async function deleteAdmin(id: string): Promise<StoreResult<AdminUser>> {
  const existing = await getAdminById(id);
  if (!existing) return { ok: false, error: "That admin no longer exists." };

  if (existing.role === "owner" && (await countActiveOwners(id)) === 0) {
    return { ok: false, error: "This is the last owner. Promote somebody else first." };
  }

  try {
    const { error } = await getSupabase().from(TABLE).delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    return { ok: true, value: existing };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Could not remove the admin.",
    };
  }
}

/** Stamps a successful sign-in. Best effort: it must never fail the login. */
export async function recordLogin(email: string): Promise<void> {
  try {
    await getSupabase()
      .from(TABLE)
      .update({ last_login_at: new Date().toISOString() })
      .eq("email", normaliseEmail(email));
  } catch {
    // A missing timestamp is cosmetic.
  }
}
