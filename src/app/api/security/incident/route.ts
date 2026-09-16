import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import { ok, badRequest, tooManyRequests, readJson } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeInput } from "@/lib/security";

interface IncidentPayload {
  type?: unknown;
  details?: unknown;
  userAgent?: unknown;
  url?: unknown;
  timestamp?: unknown;
}

/**
 * Security Incident Intake API
 * Captures CSP violations, DevTools tampering alerts, and honeypot triggers
 */
export async function POST(request: Request) {
  try {
    const ip = clientIp(request);

    // Rate limit: 20 incident reports per 10 minutes per IP
    const limit = rateLimit(`security:incident:${ip}`, 20, 10 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<IncidentPayload>(request);
    if (!body) return badRequest("Invalid payload.");

    const incidentType = sanitizeInput(String(body.type || "UNKNOWN_INCIDENT")).slice(0, 80);
    const details = sanitizeInput(String(body.details || "No details provided")).slice(0, 1000);
    const url = sanitizeInput(String(body.url || request.url)).slice(0, 300);

    const supabase = getSupabase();

    // Log the security violation to audit logs
    const { error: logError } = await supabase.from("system_logs").insert({
      id: `sec-incident-${randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "warn",
      service: "perimeter-security-shield",
      message: `[SECURITY_ALERT] ${incidentType}: ${details} at ${url}`,
      latency_ms: null,
      ip_address: ip,
    });

    if (logError) {
      console.error("[security:incident:logError]", logError);
    }

    return ok({
      status: "INCIDENT_LOGGED",
      incidentId: `INC-${randomUUID().slice(0, 8).toUpperCase()}`,
      recordedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("[security:incident]", error);
    return ok({ status: "ACKNOWLEDGED" });
  }
}
