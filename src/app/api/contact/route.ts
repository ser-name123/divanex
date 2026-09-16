import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/supabase";
import {
  badRequest,
  cleanString,
  cleanText,
  isValidEmail,
  ok,
  readJson,
  serverError,
  tooManyRequests,
} from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { containsThreatSignature } from "@/lib/security";
import { sendFormNotifications } from "@/lib/formNotifications";

interface ContactBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const ip = clientIp(request);

    // 5 submissions per 10 minutes per IP.
    const limit = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const body = await readJson<ContactBody>(request);
    if (!body) return badRequest("Invalid request body.");

    const name = cleanString(body.name, 120);
    const email = cleanString(body.email, 254).toLowerCase();
    const service = cleanString(body.service, 160);
    const phone = cleanString(body.phone, 40);
    const budget = cleanString(body.budget, 60);
    const timeline = cleanString(body.timeline, 60);
    const message = cleanText(body.message, 5000);

    // Threat signature inspection
    if (
      containsThreatSignature(name) ||
      containsThreatSignature(email) ||
      containsThreatSignature(service) ||
      containsThreatSignature(phone) ||
      containsThreatSignature(budget) ||
      containsThreatSignature(timeline) ||
      containsThreatSignature(message)
    ) {
      return badRequest("Security alert: Malicious characters or payload signatures detected.");
    }

    if (!name || !email) {
      return badRequest("Please fill in all required fields (Name and Email).");
    }

    if (!isValidEmail(email)) {
      return badRequest("Please enter a valid email address.");
    }

    const inquiryId = `inq-${randomUUID()}`;

    // Telemetry is best-effort: a logging failure must not fail the submission.
    const { error: logError } = await supabase.from("system_logs").insert({
      id: `log-${randomUUID()}`,
      timestamp: new Date().toISOString().slice(11, 19) + " UTC",
      level: "info",
      service: "web-contact-ingress",
      message: `Inbound inquiry received from ${name} (${email}).`,
      latency_ms: null,
      ip_address: ip,
    });

    if (logError) {
      console.error("[contact:log]", logError);
    }

    // Email is the only record of this enquiry — nothing is stored. That makes
    // a delivery failure unrecoverable, so it is surfaced to the visitor
    // instead of being swallowed, and they are given the address directly.
    const notified = await sendFormNotifications({
      kind: "contact",
      name,
      email,
      reference: inquiryId,
      ipAddress: ip,
      fields: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Service", value: service },
        { label: "Estimated Budget", value: budget || "Not specified" },
        { label: "Expected Timeline", value: timeline || "Not specified" },
        { label: "Message", value: message, wide: true },
      ],
    });

    if (!notified.teamSent) {
      console.error("[contact:notify]", notified.errors);
      return serverError(
        "contact:notify",
        new Error(notified.errors.join("; ") || "Team notification failed.")
      );
    }

    return ok({
      message:
        "Thank you for reaching out! A Divanex solutions architect will connect with you within 4 hours.",
      inquiryId,
      emailSent: notified.visitorSent,
    });
  } catch (error) {
    return serverError("contact", error);
  }
}
