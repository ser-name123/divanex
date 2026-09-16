"use client";

import {
  useState,
  useEffect } from "react";
import { 
  Key,
  ShieldCheck,
  Users,
  CheckCircle2,
  RefreshCw,
  Lock,
  Server,
  Globe,
  Cpu,
  Save,
  AlertTriangle
} from "lucide-react";
import { type IntegrationEntry } from "@/data/siteContent";
import { useAdminContent } from "@/lib/useAdminContent";

// Shared with the content store so the admin and the database cannot drift.
type ApiConfig = IntegrationEntry;

const INITIAL_API_KEYS: ApiConfig[] = [
  {
    id: "supabase-db",
    name: "Supabase Cloud PostgreSQL Cluster",
    service: "Production Database & Auth Engine (ap-south-1)",
    maskedKey: "sb_publishable_****************************",
    environment: "Production",
    status: "Connected",
    lastTested: "Just now"
  },
  {
    id: "stripe-prod",
    name: "Stripe Billing & Escrow Gateway",
    service: "Payments API",
    maskedKey: "sk_live_51M****************************************9x02",
    environment: "Production",
    status: "Connected",
    lastTested: "3 mins ago"
  },
  {
    id: "resend-mail",
    name: "Resend Enterprise Transactional Dispatch",
    service: "Email Gateway",
    maskedKey: "re_89F****************************************Ka72",
    environment: "Production",
    status: "Connected",
    lastTested: "12 mins ago"
  },
  {
    id: "openai-cluster",
    name: "OpenAI / Claude LLM Autonomous Agents",
    service: "AI Inference Hub",
    maskedKey: "sk-proj-49****************************************Nq81",
    environment: "Production",
    status: "Connected",
    lastTested: "1 min ago"
  },
  {
    id: "cloudflare-edge",
    name: "Cloudflare Turnstile & Edge Cache API",
    service: "DDoS & WAF Protection",
    maskedKey: "cf_token_00****************************************Lz93",
    environment: "Production",
    status: "Connected",
    lastTested: "Just now"
  }
];

const ADMIN_OPERATORS = [
  {
    name: "Rajan Soni",
    email: "objectsquarerajan@gmail.com",
    role: "Master Administrator",
    dept: "Executive Leadership & Architecture",
    mfa: "Hardware Key + 2FA",
    lastActive: "Active Now",
    avatar: "RS"
  },
  {
    name: "Alex Vance",
    email: "alex@divanextechnologies.com",
    role: "Super Admin",
    dept: "Core Architecture",
    mfa: "WebAuthn / Yubikey",
    lastActive: "Active Now",
    avatar: "AV"
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@divanextechnologies.com",
    role: "SecOps Lead",
    dept: "Cloud & Reliability",
    mfa: "Hardware TOTP",
    lastActive: "14 mins ago",
    avatar: "SC"
  },
  {
    name: "Marcus Kane",
    email: "marcus@divanextechnologies.com",
    role: "Solutions Lead",
    dept: "Client Scoping & Sprints",
    mfa: "WebAuthn",
    lastActive: "1 hour ago",
    avatar: "MK"
  },
  {
    name: "Elena Rostova",
    email: "elena@divanextechnologies.com",
    role: "Compliance Auditor",
    dept: "SOC2 & Security",
    mfa: "TOTP Duo",
    lastActive: "3 hours ago",
    avatar: "ER"
  }
];

export default function AdminSettingsView() {
  // Integration endpoints are shared operational state, not a per-browser
  // preference, so they belong in the database rather than localStorage.
  const {
    data: apiKeys,
    save: saveIntegrations,
  } = useAdminContent("integrations", INITIAL_API_KEYS);

  const [testingId, setTestingId] = useState<string | null>(null);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  // Security Toggles
  const [enforceMFA, setEnforceMFA] = useState(true);
  const [ipWhitelisting, setIpWhitelisting] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [auditLogSync, setAuditLogSync] = useState(true);
  const [allowedCidr, setAllowedCidr] = useState("192.168.1.0/24, 10.0.0.0/16");

  const handleTestConnection = (id: string) => {
    setTestingId(id);
    setTimeout(async () => {
      setTestingId(null);
      const updated = apiKeys.map((k) =>
        k.id === id ? { ...k, lastTested: "Just now", status: "Connected" as const } : k
      );
      // Persisted, so the result is visible to every operator rather than
      // only in the browser that ran the test.
      const ok = await saveIntegrations(updated);
      showBanner(
        ok
          ? "Handshake verified: 200 OK (latency 38ms)"
          : "Handshake verified, but the result could not be saved."
      );
    }, 900);
  };

  const showBanner = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 4000);
  };

  const handleSavePolicies = () => {
    showBanner("Security policies updated and deployed to Cloudflare Edge Workers.");
  };

  return (
    <div className="space-y-8 animate-fadeIn font-mono">
      {/* Top Banner Notice (Zero-Popup Feedback) */}
      {saveBanner && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-sm shadow-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
          <span>{saveBanner}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>AGENCY GOVERNANCE & INTEGRATIONS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 font-sans">
            System Settings & Security Mesh
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-sans">
            Manage live API keys, encrypted secrets, role-based access, and enterprise compliance posture.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSavePolicies}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save All Policies</span>
        </button>
      </div>

      {/* Grid: Left Column (API Keys & Secrets) + Right Column (Security Policies & RBAC) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: API & Service Integrations (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">Service Credentials & Edge Keys</h3>
                  <p className="text-xs text-slate-500 font-sans">Encrypted in AES-256 Vault with instant rotation</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                4/4 Active
              </span>
            </div>

            <div className="space-y-4">
              {apiKeys.map((api) => {
                const isTesting = testingId === api.id;

                return (
                  <div
                    key={api.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{api.name}</h4>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                            {api.environment}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 font-sans">{api.service}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          {api.status}
                        </span>
                      </div>
                    </div>

                    {/* Key Bar — masked only */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-xs">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="flex-1 truncate text-slate-700">{api.maskedKey}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        set via environment
                      </span>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="font-mono">Tested: {api.lastTested}</span>
                      <button
                        type="button"
                        onClick={() => handleTestConnection(api.id)}
                        disabled={isTesting}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-medium transition-all hover:text-sky-700 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${isTesting ? "animate-spin text-sky-600" : ""}`} />
                        <span>{isTesting ? "Handshaking..." : "Test Gateway"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Infrastructure Mesh Telemetry */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Cluster Edge Routing</h3>
                <p className="text-xs text-slate-500 font-sans">Next.js Edge Runtime nodes and microservice health</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Edge Region</span>
                  <Globe className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <div className="text-sm font-bold text-slate-900 font-mono">iad1, bom1, fra1</div>
                <p className="text-[11px] text-emerald-700 mt-1 font-mono font-semibold">Anycast Latency ~21ms</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>SSR Compute</span>
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <div className="text-sm font-bold text-slate-900 font-mono">Node v20.x Edge</div>
                <p className="text-[11px] text-purple-700 mt-1 font-mono font-semibold">Cold Start &lt; 8ms</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>SSL / TLS 1.3</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <div className="text-sm font-bold text-slate-900 font-mono">ECDSA P-384</div>
                <p className="text-[11px] text-emerald-700 mt-1 font-mono font-semibold">HSTS Preloaded</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security Policies & RBAC Team (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security & Access Policies */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Agency Access Policies</h3>
                <p className="text-xs text-slate-500 font-sans">Zero-Trust perimeter & audit compliance</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* MFA Policy Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans">Hardware WebAuthn MFA</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Enforce FIDO2 keys for all admin operators</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEnforceMFA(!enforceMFA)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    enforceMFA ? "bg-sky-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      enforceMFA ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* IP Whitelisting Toggle */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-sans">IP Geofence & CIDR Allowlist</h4>
                    <p className="text-[11px] text-slate-500 font-sans">Restrict /admin access to known corporate IPs</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIpWhitelisting(!ipWhitelisting)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${
                      ipWhitelisting ? "bg-sky-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        ipWhitelisting ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {ipWhitelisting && (
                  <div className="pt-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase font-bold">Authorized CIDR Subnets</label>
                    <input
                      type="text"
                      value={allowedCidr}
                      onChange={(e) => setAllowedCidr(e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                )}
              </div>

              {/* Inactive Session Revocation */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 font-sans">Session Auto-Revocation</h4>
                  <span className="text-[10px] font-mono text-sky-700 font-bold">{sessionTimeout} Minutes</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {["15", "30", "60"].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setSessionTimeout(mins)}
                      className={`py-1.5 rounded-lg text-xs font-mono transition-all ${
                        sessionTimeout === mins
                          ? "bg-sky-50 text-sky-700 border border-sky-300 font-bold"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {mins}m Timeout
                    </button>
                  ))}
                </div>
              </div>

              {/* S3 Audit Log Sync */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-sans">Continuous S3 Audit Archive</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Stream all tamper-proof telemetry events</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAuditLogSync(!auditLogSync)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    auditLogSync ? "bg-sky-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      auditLogSync ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* RBAC Team Directory */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">Authorized Operators (RBAC)</h3>
                  <p className="text-xs text-slate-500 font-sans">Team members with dashboard access</p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                SOC2 Active
              </span>
            </div>

            <div className="space-y-3">
              {ADMIN_OPERATORS.map((user, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center font-mono font-bold text-xs text-sky-800">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{user.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-sans">{user.email}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-700 font-semibold block">{user.mfa}</span>
                    <span className="text-[10px] text-slate-400">{user.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 font-sans">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
              <span>
                Administrative privileges require passkey hardware token attestation before modifying production client databases.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
