import type { SiteConfig } from "@/data/siteContent";

/**
 * Builds the contact links from the stored site config.
 *
 * Every component that showed a phone number, an email address or a WhatsApp
 * link used to hold its own copy as a module constant — six components, three
 * different numbers between them, none of them the value in the admin console.
 * Changing the agency's number meant finding all six, and missing one meant a
 * dead line on a page nobody looked at.
 */

/** Strips formatting so `+91 89496 85588` becomes a dialable `wa.me` target. */
export function whatsappDigits(value: string): string {
  return String(value || "").replace(/[^0-9]/g, "");
}

/**
 * A WhatsApp deep link, with the greeting pre-filled.
 *
 * `message` overrides the configured greeting for the places that need their
 * own — an emergency escalation should not open with "I'd like to inquire".
 */
export function whatsappUrl(config: SiteConfig, message?: string): string {
  const digits = whatsappDigits(config.whatsappNumber);
  const text = message ?? config.whatsappGreeting ?? "";
  if (!digits) return "/contact";
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** `tel:` needs the number without spaces; the display value keeps them. */
export function telHref(phone: string): string {
  return `tel:${String(phone || "").replace(/\s+/g, "")}`;
}

export function mailtoHref(email: string): string {
  return `mailto:${String(email || "").trim()}`;
}

/**
 * The teaser shown before a visitor clicks "Reveal".
 *
 * Every reveal button had its own hardcoded teaser — `sofm•••••@gmail.com`,
 * `+91 89496•••••` — so after the real address moved into the admin console
 * the masked hint still advertised the old one, and clicking Reveal showed
 * something that did not match what the button had promised.
 */
export function maskEmail(email: string): string {
  const value = String(email || "").trim();
  const at = value.indexOf("@");
  if (at < 1) return "•••••";

  const local = value.slice(0, at);
  const domain = value.slice(at);
  // Short local parts would otherwise be shown almost in full.
  const keep = local.length <= 4 ? 1 : 4;
  return `${local.slice(0, keep)}•••••${domain}`;
}

/** Keeps the dialling prefix visible and hides the last five digits. */
export function maskPhone(phone: string): string {
  const value = String(phone || "").trim();
  if (!value) return "•••••";

  let hidden = 0;
  const chars = value.split("");
  for (let i = chars.length - 1; i >= 0 && hidden < 5; i--) {
    if (/[0-9]/.test(chars[i])) {
      chars[i] = "";
      hidden++;
    }
  }
  return `${chars.join("").trimEnd()}•••••`;
}
