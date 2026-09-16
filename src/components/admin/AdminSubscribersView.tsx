"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Mail, RefreshCw, Search, Trash2 } from "lucide-react";

/**
 * Newsletter subscribers.
 *
 * A new screen, because until now there was nothing to show: both signup forms
 * set a React flag, printed "you're subscribed", and never sent a request. No
 * address anyone entered was stored anywhere, so this list did not exist and
 * neither did the people on it.
 */

interface Subscriber {
  id: string;
  email: string;
  name: string;
  source: string;
  status: "subscribed" | "unsubscribed";
  createdAt: string;
  unsubscribedAt: string | null;
}

const SOURCE_LABELS: Record<string, string> = {
  footer: "Footer",
  blog: "Blog",
  admin: "Added by admin",
  website: "Website",
};

export default function AdminSubscribersView() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "subscribed" | "unsubscribed">("all");
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const announce = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(null), 5000);
  };

  /**
   * Fetches the list.
   *
   * Deliberately does not raise the loading flag itself: on the first run the
   * flag is already true, and setting state synchronously inside an effect
   * costs a cascading render. The Refresh button raises it separately, where
   * there is no effect in the way.
   */
  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/subscribers");
      const json = await res.json();
      if (json?.success && Array.isArray(json.subscribers)) {
        setSubscribers(json.subscribers);
      }
    } catch {
      announce("Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  const load = () => {
    setLoading(true);
    return fetchSubscribers();
  };

  useEffect(() => {
    let active = true;

    // Inlined rather than calling fetchSubscribers, so every setState here is
    // demonstrably after an await. The lint rule cannot see through a call,
    // and a synchronous setState in an effect body is a cascading render.
    (async () => {
      try {
        const res = await fetch("/api/subscribers");
        const json = await res.json();
        if (active && json?.success && Array.isArray(json.subscribers)) {
          setSubscribers(json.subscribers);
        }
      } catch {
        // The empty state below covers this; a toast on mount is noise.
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return subscribers.filter((subscriber) => {
      if (filter !== "all" && subscriber.status !== filter) return false;
      if (!term) return true;
      return (
        subscriber.email.toLowerCase().includes(term) ||
        subscriber.name.toLowerCase().includes(term)
      );
    });
  }, [subscribers, query, filter]);

  const activeCount = subscribers.filter((s) => s.status === "subscribed").length;

  /**
   * Flips one subscriber's status.
   *
   * The row is only updated once the server agrees. Dropping it optimistically
   * is how a failed write shows as a change that silently is not there after a
   * refresh.
   */
  const setStatus = async (subscriber: Subscriber, status: Subscriber["status"]) => {
    setBusyId(subscriber.id);
    try {
      const res = await fetch("/api/subscribers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: subscriber.id, status }),
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        setSubscribers((list) =>
          list.map((row) =>
            row.id === subscriber.id
              ? {
                  ...row,
                  status,
                  unsubscribedAt: status === "unsubscribed" ? new Date().toISOString() : null,
                }
              : row
          )
        );
        announce(
          status === "unsubscribed"
            ? `${subscriber.email} will no longer receive the dispatch.`
            : `${subscriber.email} is subscribed again.`
        );
      } else {
        announce(json?.error || "Could not update that subscriber.");
      }
    } catch {
      announce("Could not reach the server.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (subscriber: Subscriber) => {
    if (
      !confirm(
        `Delete ${subscriber.email} permanently? To simply stop emailing them, unsubscribe instead — a deleted record can re-subscribe and lose its history.`
      )
    ) {
      return;
    }

    setBusyId(subscriber.id);
    try {
      const res = await fetch(`/api/subscribers?id=${encodeURIComponent(subscriber.id)}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        setSubscribers((list) => list.filter((row) => row.id !== subscriber.id));
        announce(`${subscriber.email} deleted.`);
      } else {
        announce(json?.error || "Could not delete that subscriber.");
      }
    } catch {
      announce("Could not reach the server.");
    } finally {
      setBusyId(null);
    }
  };

  /**
   * Exports what is on screen, not the whole list.
   *
   * Someone who filtered to active subscribers and pressed export means the
   * active ones; handing them everybody would quietly re-add people who asked
   * to be removed.
   */
  const exportCsv = () => {
    const header = "email,name,source,status,subscribed_at";
    const rows = filtered.map((subscriber) =>
      [
        subscriber.email,
        subscriber.name,
        subscriber.source,
        subscriber.status,
        subscriber.createdAt,
      ]
        // Quote every field and double any quote inside it, so a name with a
        // comma does not shift every later column in the spreadsheet.
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    );

    const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4.5 h-4.5 text-sky-600" />
            Newsletter subscribers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {loading
              ? "Loading…"
              : `${activeCount} active of ${subscribers.length} total, from the footer and blog signup forms.`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs transition-all disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export {filtered.length}
          </button>
        </div>
      </header>

      {notice && (
        <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
          {notice}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by email or name…"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15 transition-all"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "subscribed", "unsubscribed"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer capitalize ${
                filter === value
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-xs text-slate-500">
            {loading
              ? "Loading subscribers…"
              : subscribers.length === 0
                ? "Nobody has subscribed yet. The footer and blog forms write here."
                : "No subscribers match this search."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Source
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Subscribed
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((subscriber) => (
                  <tr key={subscriber.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-slate-900 break-all">
                        {subscriber.email}
                      </div>
                      {subscriber.name && (
                        <div className="text-[11px] text-slate-500 mt-0.5">{subscriber.name}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-600">
                      {SOURCE_LABELS[subscriber.source] || subscriber.source}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-600 whitespace-nowrap">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 rounded-lg text-[10px] font-bold ${
                          subscriber.status === "subscribed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          disabled={busyId === subscriber.id}
                          onClick={() =>
                            setStatus(
                              subscriber,
                              subscriber.status === "subscribed" ? "unsubscribed" : "subscribed"
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition-all disabled:opacity-50 cursor-pointer whitespace-nowrap"
                        >
                          {subscriber.status === "subscribed" ? "Unsubscribe" : "Re-subscribe"}
                        </button>
                        <button
                          type="button"
                          disabled={busyId === subscriber.id}
                          onClick={() => remove(subscriber)}
                          aria-label={`Delete ${subscriber.email}`}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
