/**
 * Divanex Institutional Security Shield & Defense Utilities
 *
 * Provides enterprise-grade input sanitization, rate limiting,
 * threat signature detection, bot blocking, and client encryption.
 */

// In-Memory Sliding Window Rate Limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up stale IP records every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Check if an IP has exceeded rate limits.
 */
export function checkRateLimit(
  ip: string,
  maxRequests = 60,
  windowMs = 60000
): { allowed: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + windowMs
    });
    return { allowed: true, remaining: maxRequests - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInSec: Math.ceil((entry.resetTime - now) / 1000)
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetInSec: Math.ceil((entry.resetTime - now) / 1000)
  };
}

/**
 * Known Malicious Bot Scanners, Exploit Crawlers & Pentest Tools
 */
const MALICIOUS_BOT_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /wpscan/i,
  /zgrab/i,
  /gobuster/i,
  /dirbuster/i,
  /hydra/i,
  /acunetix/i,
  /netsparker/i,
  /shodan/i,
  /censys/i,
  /whatweb/i,
  /burpcollaborator/i,
  /fuzz/i,
  /havij/i
];

/**
 * Check if incoming User-Agent is a known malicious vulnerability scanner.
 */
export function isMaliciousBotUserAgent(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  return MALICIOUS_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

/**
 * Malicious Threat Signatures (SQLi, XSS, Path Traversal, Bot Probes, RCE)
 */
const SUSPICIOUS_PATTERNS = [
  // Path traversal & sensitive file probes
  /\.\.\//i,
  /\/\.env/i,
  /\/\.git/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/phpmyadmin/i,
  /\/xmlrpc\.php/i,
  /\/\.aws/i,
  /\/etc\/passwd/i,
  /\/bin\/sh/i,
  /\/\.config/i,
  /\/\.ssh/i,
  
  // SQL Injection signatures
  /union(\s+all)?\s+select/i,
  /\bselect\b.*\bfrom\b/i,
  /\binsert\s+into\b/i,
  /\bdrop\s+table\b/i,
  /\bexec(\s|\+)+(s|x)p\w+/i,
  /--\s*$/m,
  /'\s+or\s+'1'\s*=\s*'1/i,
  /"\s+or\s+"1"\s*=\s*"1/i,
  /benchmark\s*\(/i,
  /sleep\s*\(\s*\d+\s*\)/i,

  // Cross-Site Scripting (XSS) & Injections
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript\s*:/i,
  /vbscript\s*:/i,
  /data:text\/html/i,
  /onload\s*=/i,
  /onerror\s*=/i,
  /onclick\s*=/i,
  /onmouseover\s*=/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /eval\s*\(/i,
  /document\.cookie/i,
  /document\.write/i
];

/**
 * Checks if a string contains known cyber attack signatures.
 */
export function containsThreatSignature(input: string): boolean {
  if (!input || typeof input !== "string") return false;
  return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Checks if an HTTP method is dangerous/unauthorized.
 */
export function isDangerousHttpMethod(method: string): boolean {
  const disallowed = ["TRACE", "TRACK", "DEBUG", "CONNECT"];
  return disallowed.includes(method.toUpperCase());
}

/**
 * Sanitizes input strings by escaping HTML entities and stripping dangerous characters.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>]/g, "") // Strip brackets
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .slice(0, 5000); // Prevent buffer exhaustion
}

/**
 * Sanitizes an object deeply.
 */
export function sanitizeObject<T>(obj: T): T {
  if (typeof obj === "string") {
    return sanitizeInput(obj) as unknown as T;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObject(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === "object") {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      cleanObj[key] = sanitizeObject(value);
    }
    return cleanObj as unknown as T;
  }
  return obj;
}

/**
 * Returns the input only if it is an http(s) URL, otherwise the fallback.
 *
 * Anything that ends up in an href or src must pass through here: a stored
 * `javascript:` or `data:text/html` value is script execution on every visitor
 * who loads the page, with no injected tag required.
 */
export function safeHttpUrl(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;

  // Relative paths stay on this origin and are safe. "//host" is not relative.
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed.slice(0, 2048);

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return fallback;
    return parsed.toString().slice(0, 2048);
  } catch {
    return fallback;
  }
}

/**
 * Validates an uploaded document reference before it is stored.
 *
 * Document URLs are opened straight from the portal and the admin console
 * (`window.open(doc.url)` and `<a href={doc.url}>`), and clients can upload.
 * That makes this a client-to-admin escalation path: a `javascript:` or
 * `data:text/html` value stored here runs in the admin session the moment an
 * operator clicks the file. Only http(s), and only inline data of types that
 * cannot execute, are allowed through.
 */
const INERT_DATA_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/zip",
  "application/json",
];

/** 6 MB of base64 is roughly 4.5 MB of file, which is plenty for a spec document. */
const MAX_INLINE_DATA_CHARS = 6 * 1024 * 1024;

export function safeDocumentUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("data:")) {
    if (trimmed.length > MAX_INLINE_DATA_CHARS) return undefined;
    const header = trimmed.slice(5, trimmed.indexOf(",")).toLowerCase();
    const mime = header.split(";")[0];
    // SVG is deliberately absent: it is a document format that can carry script.
    if (!INERT_DATA_TYPES.includes(mime)) return undefined;
    if (!header.includes("base64")) return undefined;
    return trimmed;
  }

  const http = safeHttpUrl(trimmed);
  return http || undefined;
}
