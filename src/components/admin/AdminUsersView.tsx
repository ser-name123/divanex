"use client";

import { useEffect, useMemo, useState } from "react";
import {
  KeyRound,
  PauseCircle,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { ROLE_LABELS, ROLE_SUMMARIES, ROLES, type Role } from "@/lib/permissions";

/**
 * The admin directory.
 *
 * A new screen, because until now there was nothing to manage: every operator
 * signed in with one shared password against a hardcoded list of two names.
 *
 * What this draws is decided by the caller's role, which is presentation only —
 * every action here is checked again on the server, because a disabled button
 * is not a permission.
 */

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: "active" | "suspended";
  createdBy: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

interface Props {
  /** The signed-in operator, so the screen can refuse to offer self-harm. */
  currentUserId: string;
  canManage: boolean;
}

const ROLE_STYLES: Record<Role, string> = {
  owner: "bg-blue-950 text-white border-blue-950",
  manager: "bg-sky-50 text-sky-800 border-sky-200",
  editor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  viewer: "bg-slate-100 text-slate-700 border-slate-200",
};

function when(value: string | null): string {
  if (!value) return "never";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminUsersView({ currentUserId, canManage }: Props) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState<{ text: string; bad?: boolean } | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "editor" as Role,
    password: "",
  });

  const announce = (text: string, bad = false) => {
    setNotice({ text, bad });
    setTimeout(() => setNotice(null), 6000);
  };

  useEffect(() => {
    let active = true;

    // Inlined rather than calling a helper, so every setState is demonstrably
    // after an await: a synchronous setState in an effect body is a cascading
    // render, and the lint rule cannot see through a function call.
    (async () => {
      try {
        const res = await fetch("/api/admin/users");
        const json = await res.json();
        if (active && json?.success && Array.isArray(json.users)) setUsers(json.users);
      } catch {
        if (active) announce("Could not reach the server.", true);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const reload = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json?.success && Array.isArray(json.users)) setUsers(json.users);
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.includes(term)
    );
  }, [users, query]);

  const ownerCount = users.filter((u) => u.role === "owner" && u.status === "active").length;

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusyId("new");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not create the admin.", true);
        return;
      }
      setUsers((current) => [...current, json.user]);
      setForm({ name: "", email: "", role: "editor", password: "" });
      setAdding(false);
      announce(`${json.user.name} can now sign in as ${ROLE_LABELS[json.user.role as Role]}.`);
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setBusyId(null);
    }
  };

  const patch = async (user: AdminUser, body: Record<string, unknown>, success: string) => {
    setBusyId(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not save the change.", true);
        return;
      }
      setUsers((current) => current.map((u) => (u.id === user.id ? json.user : u)));
      announce(success);
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setBusyId(null);
    }
  };

  const removeUser = async (user: AdminUser) => {
    if (
      !window.confirm(
        `Remove ${user.name} (${user.email})? They lose access immediately. This cannot be undone.`
      )
    ) {
      return;
    }

    setBusyId(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json?.success) {
        announce(json?.error || "Could not remove the admin.", true);
        return;
      }
      setUsers((current) => current.filter((u) => u.id !== user.id));
      announce(`${user.name} no longer has access.`);
    } catch {
      announce("Could not reach the server.", true);
    } finally {
      setBusyId(null);
    }
  };

  const resetPassword = async (user: AdminUser) => {
    const next = window.prompt(
      `New password for ${user.name}. At least 12 characters — tell it to them over something other than email.`
    );
    if (next === null) return;
    if (next.length < 12) {
      announce("The password must be at least 12 characters.", true);
      return;
    }
    await patch(user, { password: next }, `${user.name}'s password has been changed.`);
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-sky-600" />
            Admin users &amp; roles
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {loading
              ? "Loading…"
              : `${users.length} account${users.length === 1 ? "" : "s"}, ${ownerCount} owner${
                  ownerCount === 1 ? "" : "s"
                }. Each signs in with their own password and their own code.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          {canManage && (
            <button
              type="button"
              onClick={() => setAdding((open) => !open)}
              className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add admin
            </button>
          )}
        </div>
      </header>

      {notice && (
        <div
          className={`p-3 rounded-xl border text-xs font-semibold ${
            notice.bad
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-sky-50 border-sky-200 text-sky-800"
          }`}
        >
          {notice.text}
        </div>
      )}

      {!canManage && (
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          You can see who has access, but only an owner can change it.
        </div>
      )}

      {adding && canManage && (
        <form
          onSubmit={createUser}
          className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Role
              </span>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                className="mt-1 w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 cursor-pointer"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {ROLE_LABELS[role]}
                  </option>
                ))}
              </select>
              <span className="block mt-1 text-[11px] text-slate-500">
                {ROLE_SUMMARIES[form.role]}
              </span>
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                Initial password
              </span>
              <input
                required
                minLength={12}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="At least 12 characters"
                className="mt-1 w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
              />
            </label>
          </div>

          <p className="text-[11px] text-slate-500">
            They will still need the one-time code sent to that address, so it has to be a mailbox
            they can actually open.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={busyId === "new"}
              className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              {busyId === "new" ? "Creating…" : "Create admin"}
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email or role…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 transition-all"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {filtered.length === 0 && !loading && (
          <p className="p-6 text-xs text-slate-500 text-center">No admins match that search.</p>
        )}

        {filtered.map((user) => {
          const isSelf = user.id === currentUserId;
          const busy = busyId === user.id;

          return (
            <div
              key={user.id}
              className="p-4 border-b border-slate-100 last:border-b-0 flex flex-wrap items-center gap-3"
            >
              <div className="flex-1 min-w-[200px]">
                <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  {user.name}
                  {isSelf && (
                    <span className="text-[10px] font-semibold text-slate-500 uppercase">you</span>
                  )}
                  {user.status === "suspended" && (
                    <span className="px-2 py-0.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[10px] font-semibold uppercase">
                      suspended
                    </span>
                  )}
                </p>
                <p className="text-xs text-slate-500">{user.email}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Last signed in {when(user.lastLoginAt)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {canManage && !isSelf ? (
                  <select
                    value={user.role}
                    disabled={busy}
                    onChange={(e) =>
                      patch(
                        user,
                        { role: e.target.value },
                        `${user.name} is now ${ROLE_LABELS[e.target.value as Role]}.`
                      )
                    }
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer disabled:opacity-50 ${ROLE_STYLES[user.role]}`}
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {ROLE_LABELS[role]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold inline-flex items-center gap-1 ${ROLE_STYLES[user.role]}`}
                  >
                    <ShieldCheck className="w-3 h-3" />
                    {ROLE_LABELS[user.role]}
                  </span>
                )}

                {canManage && (
                  <>
                    <button
                      type="button"
                      title="Reset password"
                      disabled={busy}
                      onClick={() => resetPassword(user)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                    </button>

                    {!isSelf && (
                      <button
                        type="button"
                        title={user.status === "active" ? "Suspend" : "Reactivate"}
                        disabled={busy}
                        onClick={() =>
                          patch(
                            user,
                            { status: user.status === "active" ? "suspended" : "active" },
                            user.status === "active"
                              ? `${user.name} is suspended and cannot sign in.`
                              : `${user.name} can sign in again.`
                          )
                        }
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {user.status === "active" ? (
                          <PauseCircle className="w-3.5 h-3.5" />
                        ) : (
                          <PlayCircle className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    {!isSelf && (
                      <button
                        type="button"
                        title="Remove"
                        disabled={busy}
                        onClick={() => removeUser(user)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          What each role can do
        </p>
        <dl className="grid gap-2 sm:grid-cols-2">
          {ROLES.map((role) => (
            <div key={role} className="flex gap-2">
              <dt
                className={`px-2 py-0.5 h-fit rounded-lg border text-[10px] font-semibold ${ROLE_STYLES[role]}`}
              >
                {ROLE_LABELS[role]}
              </dt>
              <dd className="text-[11px] text-slate-600">{ROLE_SUMMARIES[role]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
