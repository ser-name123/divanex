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

function connectSrc(isDev: boolean): string {
  const origin = supabaseOrigin();
  return [
    "'self'",
    origin,
    origin ? origin.replace(/^https:/, "wss:") : "",
    // Turbopack HMR.
    isDev ? "ws: wss:" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

const SHARED = (isDev: boolean) => [
  "font-src 'self' https://fonts.gstatic.com data:",
  // Remote imagery is served over TLS only; plain http: would let a network
  // attacker swap assets on the page.
  "img-src 'self' data: blob: https:",
  `connect-src ${connectSrc(isDev)}`,
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
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    ...SHARED(isDev),
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
    ...SHARED(isDev),
  ].join("; ");
}

/** True for the surfaces that render per request and take the strict policy. */
export function usesNoncePolicy(pathname: string): boolean {
  return pathname.startsWith("/admin");
}
