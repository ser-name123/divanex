import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { AdminSystemLog } from "@/data/adminData";
import { badRequest, cleanString, ok, oneOf, readJson, serverError } from "@/lib/api";
import { clientIp } from "@/lib/rate-limit";
import { requireAdmin } from "@/lib/guard";

/** Admin-only. Access is gated by src/proxy.ts. */

const LEVELS = ["info", "warn", "error"] as const;

interface LogRow {
  id: string;
  timestamp: string;
  level: AdminSystemLog["level"];
  service: string;
  message: string;
  latency_ms: number | null;
  ip_address: string | null;
}

export async function GET() {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("system_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) return serverError("logs:get", error);

    const logs: AdminSystemLog[] = ((data as LogRow[]) || []).map((row) => ({
      id: row.id,
      timestamp: row.timestamp,
      level: row.level,
      service: row.service,
      message: row.message,
      latencyMs: row.latency_ms ?? undefined,
      ipAddress: row.ip_address || "unknown",
    }));

    return ok({ logs });
  } catch (error) {
    return serverError("logs:get", error);
  }
}

export async function POST(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const body = await readJson<Partial<AdminSystemLog>>(request);
    if (!body) return badRequest("Invalid request body.");

    const latency = Number(body.latencyMs);

    const { error } = await supabase.from("system_logs").insert({
      id: `log-${randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: oneOf(body.level, LEVELS, "info"),
      service: cleanString(body.service, 80) || "app-runtime",
      message: cleanString(body.message, 1000) || "System event recorded.",
      latency_ms: Number.isFinite(latency) && latency >= 0 ? Math.round(latency) : null,
      // Recorded server-side. A client-supplied IP would be trivially forgeable
      // and would make the audit trail worthless.
      ip_address: clientIp(request),
    });

    if (error) return serverError("logs:post", error);

    return ok({});
  } catch (error) {
    return serverError("logs:post", error);
  }
}

export async function DELETE() {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const { error } = await supabase.from("system_logs").delete().neq("id", "");

    if (error) return serverError("logs:delete", error);

    return ok({});
  } catch (error) {
    return serverError("logs:delete", error);
  }
}
