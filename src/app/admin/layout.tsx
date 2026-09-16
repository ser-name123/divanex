import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Divanex Enterprise Admin Console | Autonomous Command Center",
  description:
    "Enterprise operations command center for Divanex. Live telemetry, CRM lead triage, cost estimates, catalog pricing controller, active client sprint delivery tracking, and continuous security audit.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * The admin console runs under a nonce-based CSP (see src/proxy.ts), and a
 * nonce only exists when the page is rendered per request. This surface is
 * never cacheable anyway — it is behind a login and served no-store.
 */
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {children}
    </div>
  );
}

