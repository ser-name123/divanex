import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { buildNonceCsp, buildStaticCsp, usesNoncePolicy } from "@/lib/csp";
import {
  checkRateLimit,
  containsThreatSignature,
  isMaliciousBotUserAgent,
  isDangerousHttpMethod
} from "@/lib/security";

/**
 * Ingress filter and optimistic access gate.
 *
 * Scope note: the Next.js docs are explicit that proxy "should not be used as a
 * full session management or authorization solution". Everything here is a
 * first line — cheap rejection of traffic that has no business reaching a
 * handler. The authoritative check lives in each route handler via
 * `requireAdmin()` in src/lib/guard.ts, so a matcher gap or a framework bypass
 * cannot expose a privileged endpoint on its own.
 *
 * Enforces:
 * 1. Unauthorized HTTP method rejection (TRACE, TRACK, DEBUG, CONNECT)
 * 2. Vulnerability-scanner user-agent blocklist
 * 3. Threat signature scanning of path and query
 * 4. Payload size guard
 * 5. Per-IP rate limiting, with a tighter bucket for auth endpoints
 * 6. Fail-closed CSRF origin verification on state-changing methods
 * 7. Admin route gating
 * 8. Security response headers
 */

/** Hosts allowed to originate state-changing requests, beyond the request host. */
function allowedOrigins(host: string): Set<string> {
  const allowed = new Set<string>([host]);

  const configured = process.env.ALLOWED_ORIGINS;
  if (configured) {
    for (const entry of configured.split(",")) {
      const trimmed = entry.trim();
      if (!trimmed) continue;
      try {
        allowed.add(new URL(trimmed).host);
      } catch {
        allowed.add(trimmed);
      }
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowed.add("localhost:3000");
    allowed.add("127.0.0.1:3000");
  }

  return allowed;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const method = request.method;
  const userAgent = request.headers.get("user-agent") || "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // -------------------------------------------------------------
  // 1. Dangerous HTTP Method Filter
  // -------------------------------------------------------------
  if (isDangerousHttpMethod(method)) {
    return new NextResponse(
      JSON.stringify({
        status: 405,
        error: "METHOD_NOT_ALLOWED",
        message: `HTTP Method ${method} is prohibited by enterprise security policy.`
      }),
      { status: 405, headers: { "Content-Type": "application/json" } }
    );
  }

  // -------------------------------------------------------------
  // 2. Malicious Bot & Vulnerability Scanner Blocker
  // -------------------------------------------------------------
  if (isMaliciousBotUserAgent(userAgent)) {
    return new NextResponse(
      JSON.stringify({
        status: 403,
        error: "SCANNER_PROBE_BLOCKED",
        message: "Automated vulnerability scanning activity has been blocked and logged."
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  // -------------------------------------------------------------
  // 3. Threat Signature & Honeypot Scanner (Path & Query)
  // -------------------------------------------------------------
  let hasMaliciousParam = false;
  try {
    for (const val of request.nextUrl.searchParams.values()) {
      if (containsThreatSignature(val)) {
        hasMaliciousParam = true;
        break;
      }
    }
  } catch {
    // Ignore URL parse edge cases
  }

  if (
    hasMaliciousParam ||
    containsThreatSignature(pathname) ||
    containsThreatSignature(search)
  ) {
    return new NextResponse(
      JSON.stringify({
        status: 403,
        error: "ACCESS_DENIED_BY_SECURITY_POLICY",
        message: "Malicious payload signature detected. Incident logged.",
        timestamp: new Date().toISOString()
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "X-Security-Action": "BLOCK_MALICIOUS_INGRESS",
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff"
        }
      }
    );
  }

  // -------------------------------------------------------------
  // 4. Request Payload Size Guard
  // -------------------------------------------------------------
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 2 * 1024 * 1024) {
    // > 2MB rejected to prevent memory exhaustion DoS
    return NextResponse.json(
      { success: false, error: "PAYLOAD_TOO_LARGE: Maximum payload size is 2MB." },
      { status: 413 }
    );
  }

  // -------------------------------------------------------------
  // 5. Sliding-Window Rate Limiting Engine
  // -------------------------------------------------------------
  const isAuthPath =
    pathname.startsWith("/api/auth");
  const isAdminPath = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api/");
  const maxReq = isAuthPath ? 20 : isAdminPath ? 60 : isApi ? 80 : 200;

  // Separate bucket per traffic class, so ordinary browsing cannot consume the
  // allowance that throttles credential guessing.
  const bucketClass = isAuthPath ? "auth" : isApi ? "api" : "page";
  const rateCheck = checkRateLimit(`${bucketClass}:${ip}`, maxReq, 60000);
  if (!rateCheck.allowed) {
    return new NextResponse(
      JSON.stringify({
        status: 429,
        error: "TOO_MANY_REQUESTS",
        message: `Rate limit exceeded. Please retry after ${rateCheck.resetInSec} seconds.`,
        retryAfter: rateCheck.resetInSec
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.resetInSec),
          "X-RateLimit-Limit": String(maxReq),
          "X-RateLimit-Remaining": "0",
          "X-Content-Type-Options": "nosniff"
        }
      }
    );
  }

  // -------------------------------------------------------------
  // 6. CSRF & Origin Header Guard on Mutation Requests
  // -------------------------------------------------------------
  if (["POST", "PUT", "DELETE", "PATCH"].includes(method) && pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const secFetchSite = request.headers.get("sec-fetch-site");
    const host = request.headers.get("host");

    if (!host) {
      return NextResponse.json({ success: false, error: "MISSING_HOST_HEADER" }, { status: 400 });
    }

    const allowed = allowedOrigins(host);

    if (origin) {
      let originHost: string;
      try {
        originHost = new URL(origin).host;
      } catch {
        return NextResponse.json({ success: false, error: "INVALID_ORIGIN_HEADER" }, { status: 400 });
      }

      // Exact host match only. A substring test lets an attacker register a
      // domain such as "localhost.example.com" and sail straight through.
      if (!allowed.has(originHost)) {
        return NextResponse.json(
          { success: false, error: "CSRF_ORIGIN_MISMATCH: Cross-site request rejected." },
          { status: 403 }
        );
      }
    } else if (secFetchSite && secFetchSite !== "same-origin" && secFetchSite !== "none") {
      // No Origin, but the browser told us the request is cross-site.
      return NextResponse.json(
        { success: false, error: "CSRF_CROSS_SITE_REQUEST_REJECTED." },
        { status: 403 }
      );
    } else if (!secFetchSite) {
      const referer = request.headers.get("referer");
      if (referer) {
        try {
          const refererHost = new URL(referer).host;
          if (!allowed.has(refererHost)) {
            return NextResponse.json(
              { success: false, error: "CSRF_REFERER_MISMATCH: Cross-site request rejected." },
              { status: 403 }
            );
          }
        } catch {
          return NextResponse.json(
            { success: false, error: "CSRF_ORIGIN_REQUIRED: Missing Origin on a state-changing request." },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          { success: false, error: "CSRF_ORIGIN_REQUIRED: Missing Origin on a state-changing request." },
          { status: 403 }
        );
      }
    }
  }

  // -------------------------------------------------------------
  // 7. Admin Authentication & Gating
  // -------------------------------------------------------------
  const session = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // If visiting /admin/login directly, redirect to /admin to maintain clean URL
  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Optimistic gate. Route handlers re-check; this only avoids pointless work.
  const isProtectedAdminRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/projects") ||
    pathname.startsWith("/api/services") ||
    pathname.startsWith("/api/logs") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/notifications") ||
    // Email previews and test sends are operator tools, never public.
    pathname.startsWith("/api/forms") ||
    // Blog reads are public; authoring is not.
    (pathname.startsWith("/api/blog") && method !== "GET") ||
    // Signing up is public; the subscriber list is not. Without the method
    // check a public endpoint would hand any caller every address on it.
    (pathname.startsWith("/api/subscribers") && method !== "POST") ||
    // The chat widget writes with POST; reading or deleting transcripts is admin.
    (pathname.startsWith("/api/chat") && method !== "POST");

  if (isProtectedAdminRoute && !session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { success: false, error: "Authentication required for admin telemetry." },
        { status: 401 }
      );
    }
    const nonce = newNonce();
    const loginRewrite = NextResponse.rewrite(new URL("/admin/login", request.url), {
      request: { headers: withNonceHeaders(request, nonce) },
    });
    applySecurityHeaders(loginRewrite, rateCheck, pathname, nonce);
    return loginRewrite;
  }

  // -------------------------------------------------------------
  // 8. Proceed with Security Headers Applied
  // -------------------------------------------------------------
  if (usesNoncePolicy(pathname)) {
    // Next.js reads the nonce out of the Content-Security-Policy on the
    // *request* headers and stamps it onto the scripts it renders, so the
    // policy has to travel inbound as well as outbound.
    const nonce = newNonce();
    const response = NextResponse.next({
      request: { headers: withNonceHeaders(request, nonce) },
    });
    applySecurityHeaders(response, rateCheck, pathname, nonce);
    return response;
  }

  const response = NextResponse.next();
  applySecurityHeaders(response, rateCheck, pathname);
  return response;
}

/** A fresh, unguessable nonce per request — a reused one is no protection. */
function newNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString("base64");
}

function withNonceHeaders(request: NextRequest, nonce: string): Headers {
  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", buildNonceCsp(nonce));
  return headers;
}

/**
 * Applies security headers to outgoing responses
 */
function applySecurityHeaders(
  response: NextResponse,
  rateCheck: { remaining: number; resetInSec: number },
  pathname: string,
  nonce?: string
) {
  // The whole policy is set here rather than in next.config.ts: two
  // Content-Security-Policy headers are enforced as two separate policies a
  // response must satisfy at once, which makes the effective rules very hard
  // to reason about. One header, one policy.
  response.headers.set(
    "Content-Security-Policy",
    nonce ? buildNonceCsp(nonce) : buildStaticCsp()
  );
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  // 0, not 1. The legacy auditor is disabled deliberately: it has its own
  // known cross-site-leak issues and CSP is the real control here.
  response.headers.set("X-XSS-Protection", "0");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(self)"
  );
  response.headers.set("X-RateLimit-Remaining", String(rateCheck.remaining));
  response.headers.set("X-RateLimit-Reset", String(rateCheck.resetInSec));

  // Authenticated surfaces must not be retained by a browser, proxy, or CDN.
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api/")
  ) {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    response.headers.set("Vary", "Cookie");
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static Next.js bundles and media assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
