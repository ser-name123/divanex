import nodemailer, { type Transporter } from "nodemailer";

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
  recipientName = "Master Administrator",
  ipAddress = "server",
}: SendOtpEmailParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const transport = getMailTransporter();
    const fromName = process.env.SMTP_FROM_NAME || "Divanex Security";
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "objectsquarerajan@gmail.com";

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `[Divanex] Your Admin Security Verification Code: ${otp}`,
      text: `Hello ${recipientName},\n\nYour Divanex Executive Admin two-factor security verification code is: ${otp}\n\nThis code expires in 10 minutes.\n\nIf you did not request this code, please immediately check your account security.\n\nDivanex Technologies Ltd.`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050b24; color: #eef0f2; margin: 0; padding: 24px; }
            .card { max-width: 520px; margin: 0 auto; background: #000838; border: 1px solid rgba(24, 154, 145, 0.3); border-radius: 20px; padding: 36px 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; background: rgba(24, 154, 145, 0.15); border: 1px solid rgba(24, 154, 145, 0.4); color: #35b5ac; font-size: 11px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; }
            h1 { font-size: 22px; font-weight: 700; color: #ffffff; margin: 16px 0 8px 0; }
            p { font-size: 14px; line-height: 1.6; color: #a3a8b1; margin: 0 0 20px 0; }
            .otp-box { background: #050a20; border: 2px dashed #189a91; border-radius: 14px; padding: 20px; text-align: center; margin: 24px 0; }
            .otp-code { font-family: monospace; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #35b5ac; text-shadow: 0 0 12px rgba(24, 154, 145, 0.6); margin-left: 8px; }
            .meta { font-size: 12px; color: #858585; margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; }
            .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #666c77; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">SECURE 2FA HANDSHAKE</div>
            <h1>Executive Access Token</h1>
            <p>Hello <strong style="color: #ffffff;">${recipientName}</strong>,</p>
            <p>A request was received to sign in to the <strong>Divanex Executive Command Console</strong>. Enter the single-use 6-digit security verification code below to authorize your session:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>

            <p style="font-size: 13px; color: #dfe2e6;">
              ⏳ This code is cryptographically sealed and expires in <strong>10 minutes</strong>.
            </p>

            <div class="meta">
              <div>Session Host: <code>${ipAddress}</code></div>
              <div>Audit Time: <code>${new Date().toUTCString()}</code></div>
              <div style="margin-top: 8px; color: #ef4444; font-size: 11px;">
                ⚠️ If you did not initiate this login request, please ignore this email.
              </div>
            </div>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Divanex Technologies Ltd. All rights reserved.
          </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log(`[email] 2FA OTP dispatched successfully to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] Gmail SMTP dispatch failed:", message);
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
  userName = "Valued Partner",
  userPhone
}: SendChatOtpParams): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const transport = getMailTransporter();
    const fromName = process.env.SMTP_FROM_NAME || "Divanex AI Support";
    const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "objectsquarerajan@gmail.com";

    const mailOptions = {
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `[Divanex] Your Live AI Support Verification Code: ${otp}`,
      text: `Hello ${userName},\n\nYour Divanex Live Chat & AI Support verification code is: ${otp}\n\nEnter this code on the website to instantly start your live conversation with our AI Assistant and Senior Engineers.\n\nThis code expires in 10 minutes.\n\nDivanex Technologies\nhttps://divanextechnologies.com`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f9; color: #0a1130; margin: 0; padding: 32px 16px; }
            .card { max-width: 540px; margin: 0 auto; background: #ffffff; border: 1px solid #dfe2e6; border-radius: 24px; padding: 40px 32px; box-shadow: 0 10px 30px rgba(24, 154, 145, 0.08); }
            .logo-header { text-align: center; margin-bottom: 24px; }
            .brand-pill { display: inline-block; padding: 6px 16px; border-radius: 999px; background: #eefaf8; border: 1px solid #9ee6de; color: #0f7670; font-size: 11px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
            h1 { font-size: 24px; font-weight: 800; color: #0a1130; margin: 18px 0 8px 0; text-align: center; }
            p { font-size: 14px; line-height: 1.65; color: #666c77; margin: 0 0 18px 0; }
            .otp-container { background: #f7f9f9; border: 2px dashed #0f7670; border-radius: 16px; padding: 24px 16px; text-align: center; margin: 24px 0; }
            .otp-label { font-size: 12px; font-weight: 700; color: #858585; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
            .otp-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #0f7670; margin-left: 8px; }
            .badge-secure { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: #447541; font-weight: 600; margin-top: 12px; }
            .features-box { background: #f3f8f2; border: 1px solid #c6e1c3; border-radius: 14px; padding: 16px; margin: 20px 0; font-size: 12px; color: #2f4b2e; line-height: 1.5; }
            .meta { font-size: 12px; color: #a3a8b1; margin-top: 24px; border-top: 1px solid #eef0f2; padding-top: 16px; text-align: center; }
            .footer { text-align: center; margin-top: 24px; font-size: 11px; color: #a3a8b1; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo-header">
              <div class="brand-pill">⚡ DIVANEX AI LIVE SUPPORT</div>
            </div>
            <h1>Your Verification Code</h1>
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Thank you for reaching out to <strong>Divanex Technologies</strong>. Please use the verification code below to authenticate your session and unlock live AI assistance and senior engineer chat:</p>
            
            <div class="otp-container">
              <div class="otp-label">SINGLE-USE VERIFICATION OTP</div>
              <div class="otp-code">${otp}</div>
            </div>

            <p style="font-size: 13px; color: #858585; text-align: center;">
              ⏳ This code is valid for <strong>10 minutes</strong>. Please do not share this code with anyone.
            </p>

            <div class="features-box">
              <strong>✨ What you get upon verification:</strong><br>
              • Instant answers regarding our 22 core engineering services.<br>
              • Live architectural estimates & tech stack consultation.<br>
              • Direct 1-click takeover by our Senior Technical Leads.
            </div>

            <div class="meta">
              <div>Requested for: <code>${to}</code> ${userPhone ? `(${userPhone})` : ""}</div>
              <div>Timestamp: <code>${new Date().toUTCString()}</code></div>
            </div>
          </div>

          <div class="footer">
            © ${new Date().getFullYear()} Divanex Technologies Ltd. All rights reserved.<br>
            Next-Gen Enterprise Digital Solutions & AI Engineering.
          </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log(`[email] Chat OTP email dispatched successfully to ${to}. MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[email] Chat OTP SMTP dispatch failed:", message);
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
