import { getSupabase } from "@/lib/supabase";
import { AdminServiceConfig } from "@/data/adminData";
import { badRequest, cleanString, ok, readJson, serverError } from "@/lib/api";
import { requireAdmin } from "@/lib/guard";

/** Admin-only. Access is gated by src/proxy.ts. */

interface ServiceRow {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  mvp_price: string;
  scale_price: string;
  enterprise_price: string;
  sprint_duration: string;
  sla_uptime: string;
  lead_count_this_month: number;
}

function toService(row: ServiceRow): AdminServiceConfig {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    active: row.active,
    mvpPrice: row.mvp_price,
    scalePrice: row.scale_price,
    enterprisePrice: row.enterprise_price,
    sprintDuration: row.sprint_duration,
    slaUptime: row.sla_uptime,
    leadCountThisMonth: row.lead_count_this_month,
  };
}

export async function GET() {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("id", { ascending: true });

    if (error) return serverError("services:get", error);

    return ok({ services: ((data as ServiceRow[]) || []).map(toService) });
  } catch (error) {
    return serverError("services:get", error);
  }
}

export async function PUT(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const body = await readJson<Partial<AdminServiceConfig>>(request);
    if (!body) return badRequest("Invalid request body.");

    const id = cleanString(body.id, 100);
    if (!id) return badRequest("Missing service ID.");

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (body.active !== undefined) updates.active = body.active === true;
    if (body.mvpPrice !== undefined) updates.mvp_price = cleanString(body.mvpPrice, 60);
    if (body.scalePrice !== undefined) updates.scale_price = cleanString(body.scalePrice, 60);
    if (body.enterprisePrice !== undefined) {
      updates.enterprise_price = cleanString(body.enterprisePrice, 60);
    }
    if (body.sprintDuration !== undefined) {
      updates.sprint_duration = cleanString(body.sprintDuration, 60);
    }
    if (body.slaUptime !== undefined) updates.sla_uptime = cleanString(body.slaUptime, 60);

    if (Object.keys(updates).length === 1) {
      return badRequest("No updatable fields provided.");
    }

    const { error } = await supabase.from("services").update(updates).eq("id", id);

    if (error) return serverError("services:put", error);

    return ok({});
  } catch (error) {
    return serverError("services:put", error);
  }
}
