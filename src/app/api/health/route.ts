import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { noStore, requirePermission } from "@/lib/guard";

/**
 * Database health, for the admin console.
 *
 * Distinguishes "not configured" from "unreachable" on purpose. Every store in
 * this app falls back to in-memory data when Supabase is unavailable, so the
 * site keeps rendering and the admin console keeps accepting edits — while
 * nothing is actually being saved. That failure is silent by design, which
 * makes it dangerous: the only defence is saying so plainly where an operator
 * will see it.
 *
 * Admin-only, and deliberately free of project ref, region or provider detail.
 */

export type HealthStatus = "connected" | "not_configured" | "unreachable";

/** Tables the app expects. A missing one means setup-db has not been run. */
const REQUIRED_TABLES = [
  "leads",
  "estimates",
  "projects",
  "services",
  "system_logs",
  "site_settings",
  "site_content",
] as const;

export async function GET() {
  const check = await requirePermission("settings.view");
    if (!check.ok) return check.response;

  const start = Date.now();

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return noStore(
      NextResponse.json({
        success: true,
        status: "not_configured" satisfies HealthStatus,
        persisting: false,
        missingTables: [],
        message:
          "SUPABASE_SERVICE_ROLE_KEY is not set. The site is running entirely from in-memory data — leads, estimates, content and settings are lost when the server restarts.",
      })
    );
  }

  try {
    const supabase = getSupabase();
    const missingTables: string[] = [];

    for (const table of REQUIRED_TABLES) {
      const { error } = await supabase.from(table).select("*", { count: "exact", head: true });
      if (error) missingTables.push(table);
    }

    if (missingTables.length === REQUIRED_TABLES.length) {
      throw new Error("no tables reachable");
    }

    return noStore(
      NextResponse.json({
        success: true,
        status: "connected" satisfies HealthStatus,
        persisting: missingTables.length === 0,
        latencyMs: Date.now() - start,
        missingTables,
        message:
          missingTables.length === 0
            ? "Connected. Data is being saved."
            : `Connected, but ${missingTables.length} table(s) are missing. Run "npm run setup-db".`,
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error("[health]", error);
    return noStore(
      NextResponse.json(
        {
          success: true,
          status: "unreachable" satisfies HealthStatus,
          persisting: false,
          missingTables: [],
          message:
            "The database did not respond. Check that the Supabase project is running and not paused. Nothing is being saved until it is.",
        },
        { status: 503 }
      )
    );
  }
}
