"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Database, X } from "lucide-react";

interface Health {
  status: "connected" | "not_configured" | "unreachable";
  persisting: boolean;
  message: string;
  missingTables: string[];
}

/**
 * Warns when nothing is being saved.
 *
 * Every store falls back to in-memory data when the database is unavailable,
 * so the console looks like it is working: forms submit, edits save, toasts
 * appear. Then the process restarts and all of it is gone. This is the one
 * place that says so.
 *
 * Silent when the database is healthy — a banner that is always there stops
 * being read.
 */
export default function DatabaseStatusBanner() {
  const [health, setHealth] = useState<Health | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/health");
        const data = await res.json();
        if (!cancelled && data?.status) setHealth(data as Health);
      } catch {
        // A failed check is not itself worth shouting about.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!health || health.persisting || dismissed) return null;

  const isConfigIssue = health.status === "not_configured";

  return (
    <div
      role="alert"
      className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3"
    >
      {isConfigIssue ? (
        <Database className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      ) : (
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
      )}

      <div className="flex-1 min-w-0 text-sm text-amber-900">
        <div className="font-bold">Nothing is being saved right now</div>
        <p className="mt-1 leading-relaxed">{health.message}</p>

        {health.missingTables.length > 0 ? (
          <p className="mt-1.5 font-mono text-[12px]">
            Missing tables: {health.missingTables.join(", ")}
          </p>
        ) : null}

        {isConfigIssue ? (
          <p className="mt-2 text-[12px]">
            Add the <code className="font-mono font-bold">secret</code> key from your Supabase
            dashboard (Settings → API Keys) to{" "}
            <code className="font-mono font-bold">.env.local</code> as{" "}
            <code className="font-mono font-bold">SUPABASE_SERVICE_ROLE_KEY</code>, then restart
            the server.
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="p-1 rounded-lg text-amber-700 hover:bg-amber-100 shrink-0"
        title="Dismiss for this session"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
