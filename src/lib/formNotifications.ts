import "server-only";
import { getContent } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { sendMail } from "@/lib/email";
import { renderTeamEmail, renderVisitorEmail, type SubmissionField } from "@/lib/emailTemplates";
import {
  FORM_KIND_LABELS,
  formFlow,
  type FormKind,
  type FormSettings,
} from "@/data/formSettings";

/**
 * Sends the two emails a form submission produces.
 *
 * Called after the row is stored, never before: the record an operator reads
 * in the console is the thing that must not be lost, and an SMTP timeout is
 * not a reason to tell a visitor their enquiry failed. Every failure here is
 * logged and swallowed, and the caller is told what happened without being
 * made to care.
 *
 * Both sends are awaited rather than left dangling. A promise not awaited in a
 * route handler is not guaranteed to run to completion once the response is
 * returned — on a serverless host the function can be frozen the moment the
 * response flushes, and the mail silently never leaves.
 */

export interface NotifyParams {
  kind: FormKind;
  /** Who filled the form in. Empty for a newsletter signup. */
  name: string;
  email: string;
  /** Rendered as the table in the team's copy, in this order. */
  fields: SubmissionField[];
  /** The stored row's id, shown to both sides so they can quote it. */
  reference?: string;
  /** Which console tab holds the record. */
  /** Omitted for forms that are not stored, so there is nothing to open. */
  adminHref?: string;
  /** Server-observed address, for the team's copy only. */
  ipAddress?: string;
}

export interface NotifyResult {
  teamSent: boolean;
  visitorSent: boolean;
  errors: string[];
}

/**
 * Where team alerts go.
 *
 * The per-form extras are added to the shared list rather than replacing it,
 * so pointing quotes at sales does not quietly stop the general inbox seeing
 * them. If nothing is configured at all we fall back to the published contact
 * address — a fresh install that has never opened the settings tab should
 * still reach somebody rather than send into the void.
 */
function teamRecipients(settings: FormSettings, kind: FormKind, fallback: string): string[] {
  const flow = formFlow(settings, kind);
  const merged = [...(settings.teamRecipients || []), ...(flow.teamEmail.extraRecipients || [])]
    .map((address) => address.trim().toLowerCase())
    .filter((address) => address.includes("@"));

  const unique = [...new Set(merged)];
  if (unique.length > 0) return unique;

  const fallbackAddress = fallback.trim().toLowerCase();
  return fallbackAddress.includes("@") ? [fallbackAddress] : [];
}

export async function sendFormNotifications(params: NotifyParams): Promise<NotifyResult> {
  const result: NotifyResult = { teamSent: false, visitorSent: false, errors: [] };

  try {
    const [settings, site] = await Promise.all([getContent("forms"), getSiteSettings()]);
    const flow = formFlow(settings, params.kind);
    const siteUrl = (site.siteUrl || "https://divanextechnologies.com").replace(/\/$/, "");
    const kindLabel = FORM_KIND_LABELS[params.kind];

    const jobs: Array<Promise<void>> = [];

    // --- the team's copy ---
    if (flow.notifyTeam && flow.teamEmail.enabled) {
      const recipients = teamRecipients(settings, params.kind, site.contactEmail || "");

      if (recipients.length === 0) {
        result.errors.push("No team recipient configured.");
      } else {
        const mail = renderTeamEmail({
          settings,
          flow,
          siteUrl,
          kind: params.kind,
          kindLabel,
          name: params.name,
          email: params.email,
          fields: params.fields,
          adminHref: params.adminHref,
          ipAddress: params.ipAddress,
        });

        jobs.push(
          sendMail({
            to: recipients,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
            fromName: settings.senderName,
            // So hitting reply on the alert answers the visitor, not the
            // no-reply mailbox the site sends from.
            ...(params.email ? { replyTo: params.email } : {}),
          }).then((sent) => {
            result.teamSent = sent.success;
            if (!sent.success && sent.error) result.errors.push(`team: ${sent.error}`);
          })
        );
      }
    }

    // --- the visitor's copy ---
    if (flow.notifyVisitor && flow.visitorEmail.enabled && params.email.includes("@")) {
      const mail = renderVisitorEmail({
        settings,
        flow,
        siteUrl,
        name: params.name,
        ...(params.reference && flow.thankYou.showReference
          ? { reference: params.reference, referenceLabel: flow.thankYou.referenceLabel }
          : {}),
      });

      jobs.push(
        sendMail({
          to: params.email,
          subject: mail.subject,
          html: mail.html,
          text: mail.text,
          fromName: settings.senderName,
          ...(settings.replyToEmail ? { replyTo: settings.replyToEmail } : {}),
        }).then((sent) => {
          result.visitorSent = sent.success;
          if (!sent.success && sent.error) result.errors.push(`visitor: ${sent.error}`);
        })
      );
    }

    await Promise.all(jobs);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[form-notifications]", message);
    result.errors.push(message);
  }

  if (result.errors.length > 0) {
    console.error(`[form-notifications] ${params.kind}:`, result.errors.join("; "));
  }

  return result;
}
