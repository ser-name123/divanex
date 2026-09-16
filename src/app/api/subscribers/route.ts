import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import {
  badRequest,
  cleanString,
  isValidEmail,
  ok,
  oneOf,
  readJson,
  serverError,
  tooManyRequests,
} from "@/lib/api";
import { requireAdmin } from "@/lib/guard";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { containsThreatSignature } from "@/lib/security";
import { sendFormNotifications } from "@/lib/formNotifications";

/**
 * Newsletter subscribers.
 *
 * Creating one is public — the footer and blog signup forms are on pages
 * nobody is logged in to. Reading, editing and deleting are admin-only, so a
 * public endpoint can add an address but can never enumerate the list.
 *
 * Before this route existed both signup forms were decorative: they set a
 * React flag, showed "you're subscribed", cleared themselves after a few
 * seconds, and never made a request. Nothing was stored anywhere, so every
 * address a visitor typed was lost and the admin console had no idea anyone
 * had ever signed up.
 */

const STATUSES = ["subscribed", "unsubscribed"] as const;
const SOURCES = ["footer", "blog", "admin", "website"] as const;

export interface Subscriber {
  id: string;
  email: string;
  name: string;
  source: string;
  status: (typeof STATUSES)[number];
  createdAt: string;
  unsubscribedAt: string | null;
}

interface SubscriberRow {
  id: string;
  email: string;
  name: string | null;
  source: string;
  status: Subscriber["status"];
  created_at: string;
  unsubscribed_at: string | null;
}

function toSubscriber(row: SubscriberRow): Subscriber {
  return {
    id: row.id,
    email: row.email,
    name: row.name || "",
    source: row.source || "website",
    status: row.status,
    createdAt: row.created_at,
    unsubscribedAt: row.unsubscribed_at,
  };
}

export async function GET() {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return serverError("subscribers:get", error);

    return ok({ subscribers: ((data as SubscriberRow[]) || []).map(toSubscriber) });
  } catch (error) {
    return serverError("subscribers:get", error);
  }
}

/**
 * Public signup.
 *
 * Insert-only, with a server-generated id and a forced status: a visitor may
 * add their own address but cannot set anyone's status, cannot choose an id
 * that would overwrite an existing row, and cannot read what is already there.
 * Re-subscribing an address that already exists is treated as success rather
 * than an error — telling a stranger "that address is already on the list"
 * turns the form into a way to test whether somebody subscribed.
 */
export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const ip = clientIp(request);

    const limit = rateLimit(`subscribe:${ip}`, 6, 10 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<{ email?: unknown; name?: unknown; source?: unknown }>(request);
    if (!body) return badRequest("Invalid request body.");

    const email = cleanString(body.email, 254).toLowerCase();
    const name = cleanString(body.name, 120);
    const source = oneOf(cleanString(body.source, 20), SOURCES, "website");

    if (containsThreatSignature(email) || containsThreatSignature(name)) {
      return badRequest("Security alert: Malicious characters or payload signatures detected.");
    }

    if (!email) return badRequest("Please enter your email address.");
    if (!isValidEmail(email)) return badRequest("Please enter a valid email address.");

    const id = `sub-${randomUUID()}`;

    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, status")
      .eq("email", email)
      .maybeSingle();

    let subscriberId = id;

    if (existing) {
      subscriberId = (existing as { id: string }).id;
      // An address that unsubscribed and came back should go live again
      // rather than stay silently switched off.
      const { error } = await supabase
        .from("subscribers")
        .update({ status: "subscribed", unsubscribed_at: null, ...(name ? { name } : {}) })
        .eq("id", subscriberId);

      if (error) return serverError("subscribers:resubscribe", error);
    } else {
      const { error } = await supabase.from("subscribers").insert({
        id,
        email,
        name,
        source,
        status: "subscribed",
        ip_address: ip,
      });

      if (error) return serverError("subscribers:insert", error);
    }

    const { error: logError } = await supabase.from("system_logs").insert({
      id: `log-${randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "info",
      service: "newsletter-ingress",
      message: `Newsletter subscription recorded for ${email} (${source}).`,
      latency_ms: null,
      ip_address: ip,
    });

    if (logError) console.error("[subscribers:log]", logError);

    const notified = await sendFormNotifications({
      kind: "newsletter",
      name,
      email,
      reference: subscriberId,
      adminHref: "/admin?tab=subscribers",
      ipAddress: ip,
      fields: [
        { label: "Email", value: email },
        { label: "Name", value: name },
        { label: "Signed up from", value: source },
      ],
    });

    return ok({
      subscriberId,
      emailSent: notified.visitorSent,
      message: "You are subscribed. Watch your inbox for the next engineering dispatch.",
    });
  } catch (error) {
    return serverError("subscribers:post", error);
  }
}

/** Admin-only: flip a subscriber between subscribed and unsubscribed. */
export async function PUT(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const supabase = getSupabase();
    const body = await readJson<{ id?: unknown; status?: unknown }>(request);
    if (!body) return badRequest("Invalid request body.");

    const id = cleanString(body.id, 100);
    if (!id) return badRequest("Missing subscriber ID.");

    const status = oneOf(body.status, STATUSES, "subscribed");

    const { error } = await supabase
      .from("subscribers")
      .update({
        status,
        unsubscribed_at: status === "unsubscribed" ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (error) return serverError("subscribers:put", error);

    return ok({});
  } catch (error) {
    return serverError("subscribers:put", error);
  }
}

export async function DELETE(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const { searchParams } = new URL(request.url);
    const id = cleanString(searchParams.get("id"), 100);
    if (!id) return badRequest("Missing subscriber ID.");

    const supabase = getSupabase();
    const { error } = await supabase.from("subscribers").delete().eq("id", id);

    if (error) return serverError("subscribers:delete", error);

    return ok({ removed: 1 });
  } catch (error) {
    return serverError("subscribers:delete", error);
  }
}
