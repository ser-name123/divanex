/**
 * Content Security Policy.
 *
 * Two policies, because the site has two very different halves.
 *
 * Marketing pages are statically generated and CDN-cacheable. A nonce is
 * stamped during server rendering, so requiring one would force every page to
 * render per request and give up static generation for the whole site. Those
 * pages therefore keep `'unsafe-inline'` — which Next.js needs for its bootstrap
 * and flight-data scripts — and the injection paths are closed at the source
 * instead (see src/lib/blogMarkdown.ts).
 *
 * /admin is behind a login, never cacheable, and holds the data
 * worth stealing. Those render per request and get a strict nonce policy with
 * `strict-dynamic`, so an injected `<script>` without the request's nonce will
 * not execute even if something does manage to inject one.
 *
 * `'unsafe-eval'` is development-only: React uses eval there to rebuild server
 * error stacks, and neither React nor Next needs it in production.
 */

function supabaseOrigin(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return "";
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

/**
 * Where the Google tag loads from and reports to.
 *
 * Only the public policy gets these. The tag does not run in the admin
 * console, and widening the strict policy for a script it never loads would
 * weaken the one surface the nonce exists to protect.
 *
 * Measured before this existed: the tag was in the markup, the script was
 * refused, and no collect request ever left the page — so the property had
 * been receiving nothing at all.
 */
const ANALYTICS_SCRIPT_SRC = "https://www.googletagmanager.com";

/**
 * Where the beacons go. These were read off the blocked requests rather than
 * copied from a guide: GA4 routes each visitor to one of several collection
 * hosts, and a policy that names only the obvious one still drops the data.
 *
 * The last two belong to Google Signals — cross-device and demographics
 * reporting, which the property has switched on. They receive a beacon and
 * nothing more; neither origin is allowed to execute a script here.
 */
const ANALYTICS_CONNECT_SRC = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://analytics.google.com",
  "https://*.analytics.google.com",
  "https://stats.g.doubleclick.net",
  "https://www.google.com",
];

function connectSrc(isDev: boolean, analytics: boolean): string {
  const origin = supabaseOrigin();
  return [
    "'self'",
    origin,
    origin ? origin.replace(/^https:/, "wss:") : "",
    ...(analytics ? ANALYTICS_CONNECT_SRC : []),
    // Turbopack HMR.
    isDev ? "ws: wss:" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

const SHARED = (isDev: boolean, analytics: boolean) => [
  "font-src 'self' https://fonts.gstatic.com data:",
  // Remote imagery is served over TLS only; plain http: would let a network
  // attacker swap assets on the page.
  "img-src 'self' data: blob: https:",
  `connect-src ${connectSrc(isDev, analytics)}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
];

/** Policy for the public, statically rendered pages. */
export function buildStaticCsp(isDev = process.env.NODE_ENV === "development"): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${ANALYTICS_SCRIPT_SRC}${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    ...SHARED(isDev, true),
  ].join("; ");
}

/** Strict policy for the authenticated surfaces, bound to a per-request nonce. */
export function buildNonceCsp(
  nonce: string,
  isDev = process.env.NODE_ENV === "development"
): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // Tailwind emits a stylesheet, but Next still inlines some style; nonce it
    // in production and stay permissive in dev where HMR rewrites styles.
    `style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}' 'unsafe-inline'`} https://fonts.googleapis.com`,
    ...SHARED(isDev, false),
  ].join("; ");
}

/** True for the surfaces that render per request and take the strict policy. */
export function usesNoncePolicy(pathname: string): boolean {
  return pathname.startsWith("/admin");
}
