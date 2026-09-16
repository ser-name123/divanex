/**
 * HTML for the emails a form submission sends.
 *
 * Two templates, because they are read by two different people for two
 * different reasons. The visitor's copy is a letter: a headline, a paragraph,
 * what happens next, one button. The team's copy is a record: the submitted
 * fields in a table, with a link straight into the admin console. Sending the
 * same markup to both would mean one of them got a page laid out for the other.
 *
 * Both are light-themed and built from nested tables with inline styles. Email
 * clients are not browsers: Outlook ignores most of a <style> block, Gmail
 * strips <head> entirely, and none of them run Tailwind. Anything that must
 * survive is inlined on the element itself.
 *
 * Every interpolated value passes through `esc`. These strings come from a
 * form a stranger filled in — an unescaped `<` in a name is, at best, a broken
 * email, and in a webmail client that renders HTML it is worse than that.
 */

import type { FormFlow, FormKind, FormSettings } from "@/data/formSettings";

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/** Escapes text for HTML. Ampersand first, or it double-escapes the rest. */
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Only http(s) and mailto survive.
 *
 * A link target is the one place a submitted string becomes executable, and
 * `javascript:` in an href is still live in some HTML mail readers.
 */
function safeUrl(value: string, siteUrl: string): string {
  const raw = String(value || "").trim();
  if (!raw) return siteUrl;
  if (/^https?:\/\//i.test(raw) || /^mailto:/i.test(raw)) return raw;
  if (raw.startsWith("/")) return `${siteUrl.replace(/\/$/, "")}${raw}`;
  return siteUrl;
}

/** Substitutes `{{name}}`-style placeholders, escaping each value. */
export function fill(template: string, values: Record<string, string>): string {
  return String(template || "").replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match
  );
}

/** Same, but for a subject line — plain text, so no escaping. */
export function fillSubject(template: string, values: Record<string, string>): string {
  return fill(template, values).trim();
}

export interface ShellOptions {
  settings: FormSettings;
  siteUrl: string;
  /** Sits above the card, in the preview pane of most clients. */
  preheader: string;
  body: string;
  /** Appended under the shared footer note. */
  extraFooter?: string;
}

/**
 * The frame both templates sit in.
 *
 * The outer table paints the page background, because `background` on <body>
 * is dropped by Outlook and by Gmail's web client.
 */
function shell({ settings, siteUrl, preheader, body, extraFooter }: ShellOptions): string {
  const brand = esc(settings.brandName);
  const tagline = esc(settings.brandTagline);
  const home = safeUrl("/", siteUrl);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${brand}</title>
</head>
<body style="margin:0;padding:0;background-color:#eef0f2;">
<div style="display:none;font-size:1px;color:#eef0f2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(
    preheader
  )}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef0f2;padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

        <tr>
          <td align="center" style="padding:0 0 22px 0;">
            <a href="${esc(home)}" style="text-decoration:none;color:#0a1130;">
              <span style="font-family:${FONT};font-size:19px;font-weight:700;letter-spacing:-0.3px;color:#0a1130;">${brand}</span>
            </a>
            <div style="font-family:${FONT};font-size:12px;color:#858585;margin-top:5px;">${tagline}</div>
          </td>
        </tr>

        <tr>
          <td style="background-color:#ffffff;border:1px solid #dfe2e6;border-radius:16px;overflow:hidden;">
            ${body}
          </td>
        </tr>

        <tr>
          <td style="padding:22px 16px 0 16px;font-family:${FONT};font-size:12px;line-height:1.6;color:#a3a8b1;text-align:center;">
            ${esc(settings.footerNote)}
            ${extraFooter ? `<div style="margin-top:8px;">${extraFooter}</div>` : ""}
            <div style="margin-top:12px;color:#c8ccd2;">
              &copy; ${new Date().getFullYear()} ${brand}. All rights reserved.
            </div>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** A button that still looks like a button in Outlook, which ignores padding on <a>. */
function button(label: string, href: string, color: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" bgcolor="${esc(color)}" style="border-radius:10px;">
        <a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:${FONT};font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px;">${esc(
          label
        )}</a>
      </td>
    </tr>
  </table>`;
}

// ---------------------------------------------------------------------------
// The visitor's acknowledgement
// ---------------------------------------------------------------------------

export interface VisitorEmailOptions {
  settings: FormSettings;
  flow: FormFlow;
  siteUrl: string;
  /** Empty for a newsletter signup, where we only ever have an address. */
  name: string;
  /** Shown as a reference line when the form stores a record. */
  reference?: string;
  referenceLabel?: string;
}

export function renderVisitorEmail({
  settings,
  flow,
  siteUrl,
  name,
  reference,
  referenceLabel,
}: VisitorEmailOptions): { subject: string; html: string; text: string } {
  const content = flow.visitorEmail;
  const accent = settings.accentColor || "#0f7670";
  const person = name.trim() || "there";
  const values = { name: person, siteName: settings.brandName };

  const subject = fillSubject(content.subject, values);
  const intro = fill(esc(content.intro), { name: esc(person), siteName: esc(settings.brandName) });

  const highlights = (content.highlights || []).filter(Boolean);
  const highlightRows = highlights
    .map(
      (item) => `<tr>
        <td valign="top" style="padding:0 10px 12px 0;font-family:${FONT};font-size:15px;line-height:1.5;color:${esc(
          accent
        )};font-weight:700;">&#10003;</td>
        <td valign="top" style="padding:0 0 12px 0;font-family:${FONT};font-size:14px;line-height:1.6;color:#4e535d;">${esc(
          item
        )}</td>
      </tr>`
    )
    .join("");

  const referenceBlock =
    reference && referenceLabel
      ? `<tr>
          <td style="padding:0 34px 26px 34px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f7f9f9;border:1px solid #dfe2e6;border-radius:10px;">
              <tr>
                <td style="padding:14px 18px;font-family:${FONT};">
                  <div style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#a3a8b1;">${esc(
                    referenceLabel
                  )}</div>
                  <div style="font-size:13px;color:#0a1130;margin-top:4px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;">${esc(
                    reference
                  )}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>`
      : "";

  const body = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="height:4px;background-color:${esc(accent)};font-size:0;line-height:0;">&nbsp;</td></tr>

    <tr>
      <td style="padding:34px 34px 0 34px;font-family:${FONT};">
        <h1 style="margin:0 0 14px 0;font-size:23px;line-height:1.3;font-weight:700;color:#0a1130;">${esc(
          content.heading
        )}</h1>
        <p style="margin:0 0 20px 0;font-size:15px;line-height:1.65;color:#666c77;">${intro}</p>
      </td>
    </tr>

    ${
      highlightRows
        ? `<tr>
      <td style="padding:0 34px 6px 34px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${highlightRows}</table>
      </td>
    </tr>`
        : ""
    }

    ${referenceBlock}

    ${
      content.ctaLabel
        ? `<tr>
      <td style="padding:6px 34px 26px 34px;">
        ${button(content.ctaLabel, safeUrl(content.ctaHref, siteUrl), accent)}
      </td>
    </tr>`
        : ""
    }

    <tr>
      <td style="padding:0 34px 0 34px;">
        <div style="height:1px;background-color:#eef0f2;font-size:0;line-height:0;">&nbsp;</div>
      </td>
    </tr>

    <tr>
      <td style="padding:22px 34px 32px 34px;font-family:${FONT};">
        <p style="margin:0 0 18px 0;font-size:14px;line-height:1.65;color:#858585;">${esc(
          content.outro
        )}</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#4e535d;">
          ${esc(content.signOff)}<br />
          <strong style="color:#0a1130;">${esc(content.signature)}</strong>
        </p>
      </td>
    </tr>
  </table>`;

  const text = [
    content.heading,
    "",
    fill(content.intro, values),
    "",
    ...highlights.map((item) => `- ${item}`),
    reference && referenceLabel ? `\n${referenceLabel}: ${reference}` : "",
    "",
    content.outro,
    "",
    content.signOff,
    content.signature,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return {
    subject,
    text,
    html: shell({
      settings,
      siteUrl,
      preheader: fill(content.intro, values).slice(0, 140),
      body,
      extraFooter: settings.unsubscribeNote ? esc(settings.unsubscribeNote) : undefined,
    }),
  };
}

// ---------------------------------------------------------------------------
// The team's alert
// ---------------------------------------------------------------------------

export interface SubmissionField {
  label: string;
  value: string;
  /** Renders across the full width — for a message body. */
  wide?: boolean;
}

export interface TeamEmailOptions {
  settings: FormSettings;
  flow: FormFlow;
  siteUrl: string;
  kind: FormKind;
  kindLabel: string;
  name: string;
  email: string;
  fields: SubmissionField[];
  /** Deep link into the admin console, e.g. "/admin?tab=subscribers". */
  adminHref?: string;
  /** Server-observed, never client-supplied. */
  ipAddress?: string;
}

export function renderTeamEmail({
  settings,
  flow,
  siteUrl,
  kindLabel,
  name,
  email,
  fields,
  adminHref,
  ipAddress,
}: TeamEmailOptions): { subject: string; html: string; text: string } {
  const content = flow.teamEmail;
  const accent = settings.accentColor || "#0f7670";
  const subject = fillSubject(content.subject, {
    name: name || "Unknown",
    email,
    kind: kindLabel,
  });

  const rows = fields
    .filter((field) => field.value && field.value.trim())
    .map((field) => {
      if (field.wide) {
        return `<tr>
          <td colspan="2" style="padding:14px 0 0 0;border-top:1px solid #eef0f2;font-family:${FONT};">
            <div style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#a3a8b1;margin-bottom:6px;">${esc(
              field.label
            )}</div>
            <div style="font-size:14px;line-height:1.65;color:#0a1130;white-space:pre-wrap;">${esc(
              field.value
            )}</div>
          </td>
        </tr>`;
      }
      return `<tr>
        <td valign="top" width="34%" style="padding:10px 12px 10px 0;border-top:1px solid #eef0f2;font-family:${FONT};font-size:12px;font-weight:600;color:#858585;">${esc(
          field.label
        )}</td>
        <td valign="top" style="padding:10px 0;border-top:1px solid #eef0f2;font-family:${FONT};font-size:14px;color:#0a1130;word-break:break-word;">${esc(
          field.value
        )}</td>
      </tr>`;
    })
    .join("");

  const body = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="height:4px;background-color:${esc(accent)};font-size:0;line-height:0;">&nbsp;</td></tr>

    <tr>
      <td style="padding:28px 32px 0 32px;font-family:${FONT};">
        <span style="display:inline-block;padding:4px 10px;border-radius:999px;background-color:#eef0f2;font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#666c77;">${esc(
          kindLabel
        )}</span>
        <h1 style="margin:14px 0 8px 0;font-size:21px;line-height:1.3;font-weight:700;color:#0a1130;">${esc(
          content.heading
        )}</h1>
        <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#858585;">${esc(
          content.intro
        )}</p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 22px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows}</table>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px 10px 32px;">
        ${adminHref ? button("Open in admin console", safeUrl(adminHref, siteUrl), accent) : ""}
      </td>
    </tr>

    <tr>
      <td style="padding:14px 32px 28px 32px;font-family:${FONT};font-size:11px;line-height:1.6;color:#a3a8b1;">
        Received ${esc(new Date().toUTCString())}${ipAddress ? ` &middot; from ${esc(ipAddress)}` : ""}
        ${
          email
            ? `<br />Reply directly to <a href="mailto:${esc(email)}" style="color:${esc(
                accent
              )};text-decoration:none;">${esc(email)}</a> to answer them.`
            : ""
        }
      </td>
    </tr>
  </table>`;

  const text = [
    content.heading,
    content.intro,
    "",
    ...fields
      .filter((field) => field.value && field.value.trim())
      .map((field) => `${field.label}: ${field.value}`),
    "",
    ...(adminHref ? [`Admin: ${safeUrl(adminHref, siteUrl)}`] : []),
  ].join("\n");

  return {
    subject,
    text,
    html: shell({
      settings,
      siteUrl,
      preheader: `${name || email} — ${kindLabel}`,
      body,
    }),
  };
}
