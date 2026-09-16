import { NextResponse } from "next/server";
import { badRequest, cleanString, isValidEmail, ok, readJson, serverError } from "@/lib/api";
import { noStore, requireAdmin } from "@/lib/guard";
import { getContentFresh } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { sendMail } from "@/lib/email";
import { renderTeamEmail, renderVisitorEmail } from "@/lib/emailTemplates";
import {
  FORM_KIND_LABELS,
  formFlow,
  isFormKind,
  type FormKind,
  type FormSettings,
} from "@/data/formSettings";

/**
 * Renders a form's emails so an operator can see them before a client does.
 *
 * Admin-only, and gated in src/proxy.ts as well. Without this the only way to
 * check a wording change was to submit the live form and read the result in
 * your own inbox — which puts a fake enquiry in the CRM every time somebody
 * fixes a typo.
 *
 * GET returns the HTML for one audience. POST sends the same message to a
 * nominated address as a test.
 */

/** Stand-in values, so a preview shows the placeholders filled rather than raw. */
const SAMPLE = {
  name: "Priya Sharma",
  email: "priya@example.com",
  reference: "lead-0f3c9a71-preview",
};

function sampleFields(kind: FormKind) {
  if (kind === "newsletter") {
    return [
      { label: "Email", value: SAMPLE.email },
      { label: "Name", value: SAMPLE.name },
      { label: "Signed up from", value: "footer" },
    ];
  }
  return [
    { label: "Name", value: SAMPLE.name },
    { label: "Email", value: SAMPLE.email },
    { label: "Phone", value: "+91 98765 43210" },
    { label: "Service", value: "Custom SaaS Platform" },
    { label: "Budget", value: "$25,000 - $50,000" },
    {
      label: "Message",
      value:
        "We run a 40-clinic network on three disconnected systems and need one platform. Looking for a partner who has done HL7 work before.",
      wide: true,
    },
  ];
}

async function build(kind: FormKind, audience: "visitor" | "team", settings: FormSettings) {
  const site = await getSiteSettings();
  const siteUrl = (site.siteUrl || "https://divanextechnologies.com").replace(/\/$/, "");
  const flow = formFlow(settings, kind);

  if (audience === "visitor") {
    return renderVisitorEmail({
      settings,
      flow,
      siteUrl,
      name: SAMPLE.name,
      ...(flow.thankYou.showReference
        ? { reference: SAMPLE.reference, referenceLabel: flow.thankYou.referenceLabel }
        : {}),
    });
  }

  return renderTeamEmail({
    settings,
    flow,
    siteUrl,
    kind,
    kindLabel: FORM_KIND_LABELS[kind],
    name: SAMPLE.name,
    email: SAMPLE.email,
    fields: sampleFields(kind),
    ipAddress: "203.0.113.42",
  });
}

export async function GET(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const { searchParams } = new URL(request.url);
    const kindParam = searchParams.get("kind") || "contact";
    if (!isFormKind(kindParam)) return badRequest("Unknown form.");

    const audience = searchParams.get("audience") === "team" ? "team" : "visitor";

    // The stored record, not the cached one: an operator previewing a change
    // they just saved must see that change, not a copy up to an hour old.
    const settings = await getContentFresh("forms");
    const mail = await build(kindParam, audience, settings);

    // Served as a document so the console can show it in an iframe. The
    // sandbox attribute on that iframe is what stops this markup running
    // anything; nothing here is executable, but the preview is still treated
    // as untrusted because parts of it are operator-authored.
    return noStore(
      new NextResponse(mail.html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; img-src data:",
        },
      })
    );
  } catch (error) {
    return serverError("forms:preview", error);
  }
}

/** Sends the previewed message to a nominated address. */
export async function POST(request: Request) {
  try {
    const denied = await requireAdmin();
    if (denied) return denied;

    const body = await readJson<{ kind?: unknown; audience?: unknown; to?: unknown }>(request);
    if (!body) return badRequest("Invalid request body.");

    const kindParam = cleanString(body.kind, 40);
    if (!isFormKind(kindParam)) return badRequest("Unknown form.");

    const audience = body.audience === "team" ? "team" : "visitor";
    const to = cleanString(body.to, 254).toLowerCase();

    if (!to || !isValidEmail(to)) return badRequest("Enter a valid address to send the test to.");

    const settings = await getContentFresh("forms");
    const mail = await build(kindParam, audience, settings);

    const sent = await sendMail({
      to,
      subject: `[Test] ${mail.subject}`,
      html: mail.html,
      text: mail.text,
      fromName: settings.senderName,
    });

    if (!sent.success) {
      return NextResponse.json(
        { success: false, error: sent.error || "The mail server rejected the message." },
        { status: 502 }
      );
    }

    return ok({ message: `Test sent to ${to}.` });
  } catch (error) {
    return serverError("forms:preview:send", error);
  }
}
