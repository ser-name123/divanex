import nodemailer, { type Transporter } from "nodemailer";
import { getContent } from "@/lib/contentStore";
import { getSiteSettings } from "@/lib/siteSettingsStore";
import { renderOtpEmail } from "@/lib/emailTemplates";

/**
 * Brand settings for the one-time-code mails.
 *
 * Resolved at send time rather than imported as a constant, so an operator who
 * changes the logo or the name in the console sees it in these too — they used
 * to be the only messages that could not be edited from anywhere.
 */
async function brandContext() {
  const [settings, site] = await Promise.all([getContent("forms"), getSiteSettings()]);
  return { settings, siteUrl: (site.siteUrl || "").replace(/\/$/, "") };
}

export interface SendOtpEmailParams {
  to: string;
  otp: string;
  recipientName?: string;
  ipAddress?: string;
}

let transporter: Transporter | null = null;

/**
 * The shared SMTP transport.
 *
 * Honours SMTP_HOST / SMTP_PORT / SMTP_SECURE when they are set, and falls
 * back to Gmail's service preset otherwise. Those three variables were already
 * in .env.local but were silently ignored — the transport was pinned to Gmail
 * regardless, so moving to a real sending domain would have looked configured
 * and still gone out through the old mailbox.
 */
function getMailTransporter(): Transporter {
  if (transporter) return transporter;

  const user = process.env.SMTP_USER || "objectsquarerajan@gmail.com";
  // Gmail shows app passwords in groups of four, and people paste the spaces.
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const auth = { user, pass };

  const host = (process.env.SMTP_HOST || "").trim();

  if (host && !/smtp\.gmail\.com$/i.test(host)) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host,
      port,
      // 465 is implicit TLS; 587 upgrades through STARTTLS. Getting this wrong
      // surfaces as a connection timeout, which reads like a network fault.
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth,
    });
  } else {
    transporter = nodemailer.createTransport({ service: "gmail", auth });
  }

  return transporter;
}

/** Authenticates against the mail server without sending anything. */
export async function verifyMailTransport(): Promise<{ success: boolean; error?: string }> {
  try {
    await getMailTransporter().verify();
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function sendOtpEmail({
  to,
  otp,
  recipientName = "Administrator",
  ipAddress = "server",
}: SendOtpEmailParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const { settings, siteUrl } = await brandContext();
    const transport = getMailTransporter();
    const fromName = process.env.SMTP_FROM_NAME || settings.senderName;
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "";

    const intro = `A sign-in to the ${settings.brandName} admin console was requested. Enter the code below to finish signing in.`;

    const info = await transport.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `${otp} is your ${settings.brandName} admin sign-in code`,
      text: [
        `Hello ${recipientName},`,
        "",
        intro,
        "",
        `Code: ${otp}`,
        "It expires in 10 minutes.",
        "",
        `Requested from: ${ipAddress}`,
        "If this was not you, ignore this email and check your account security.",
        "",
        settings.brandName,
      ].join("\n"),
      html: renderOtpEmail({
        settings,
        siteUrl,
        heading: "Admin sign-in code",
        intro: `Hello ${recipientName}. ${intro}`,
        code: otp,
        expiry: "10 minutes",
        meta: [
          { label: "Requested from", value: ipAddress },
          { label: "Time", value: new Date().toUTCString() },
        ],
        warning: "If this was not you, ignore this email and check your account security.",
      }),
    });

    console.log(`[email] admin sign-in code sent to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] admin sign-in code failed:", message);
    return { success: false, error: message || "Failed to dispatch email." };
  }
}

export interface SendChatOtpParams {
  to: string;
  otp: string;
  userName: string;
  userPhone?: string;
}

export async function sendChatVerificationOtpEmail({
  to,
  otp,
  userName = "there",
  userPhone,
}: SendChatOtpParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const { settings, siteUrl } = await brandContext();
    const transport = getMailTransporter();
    const fromName = process.env.SMTP_FROM_NAME || settings.senderName;
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "";

    const intro = `Enter this code on the site to start chatting with ${settings.brandName}.`;

    const info = await transport.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `${otp} is your ${settings.brandName} chat verification code`,
      text: [
        `Hello ${userName},`,
        "",
        intro,
        "",
        `Code: ${otp}`,
        "It expires in 10 minutes. Do not share it with anyone.",
        "",
        settings.brandName,
        siteUrl,
      ].join("\n"),
      html: renderOtpEmail({
        settings,
        siteUrl,
        heading: "Your chat verification code",
        intro: `Hello ${userName}. ${intro}`,
        code: otp,
        expiry: "10 minutes",
        meta: [
          { label: "Requested for", value: userPhone ? `${to} (${userPhone})` : to },
          { label: "Time", value: new Date().toUTCString() },
        ],
      }),
    });

    console.log(`[email] chat verification code sent to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] chat verification code failed:", message);
    return { success: false, error: message || "Failed to dispatch email." };
  }
}


/**
 * Sends one message through the shared transport.
 *
 * The OTP senders above each build their own mail options; this is the generic
 * path the form notifications use, where the body is rendered elsewhere and
 * only addressing is decided here.
 *
 * It resolves rather than throws. A submission is already stored by the time
 * this runs, so a mail failure must be reported and logged, never allowed to
 * turn a saved enquiry into an error the visitor sees.
 */
export interface SendMailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  fromName?: string;
}

export async function sendMail({
  to,
  subject,
  html,
  text,
  replyTo,
  fromName,
}: SendMailParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  const recipients = (Array.isArray(to) ? to : [to]).map((value) => value.trim()).filter(Boolean);
  if (recipients.length === 0) {
    return { success: false, error: "No recipient address." };
  }

  try {
    const transport = getMailTransporter();
    const name = fromName || process.env.SMTP_FROM_NAME || "Divanex";
    const fromEmail =
      process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "objectsquarerajan@gmail.com";

    const info = await transport.sendMail({
      from: `"${name}" <${fromEmail}>`,
      to: recipients.join(", "),
      subject,
      html,
      ...(text ? { text } : {}),
      ...(replyTo ? { replyTo } : {}),
    });

    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] send failed:", message);
    return { success: false, error: message || "Failed to dispatch email." };
  }
}
