"use client";

import { PlainField, StringListEditor } from "@/components/admin/fields";
import { useCallback, useEffect, useState } from "react";
import {
  Search,
  Save,
  CheckCircle2,
  Globe,
  Building2,
  ShieldAlert,
  FileText,
  AlertTriangle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import {
  DEFAULT_SITE_SETTINGS,
  SEO_MANAGED_ROUTES,
  type PageSeo,
  type SiteSettings,
} from "@/data/siteSettings";

/** Google truncates around these lengths, so the counters turn amber past them. */
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

function CharCount({ value, limit }: { value: string; limit: number }) {
  const length = value.length;
  const over = length > limit;
  return (
    <span
      className={`text-[11px] font-mono font-bold ${over ? "text-amber-600" : "text-slate-400"}`}
    >
      {length}/{limit}
      {over ? " · may be truncated in results" : ""}
    </span>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
        {label}
      </span>
      {children}
      {hint ? <span className="text-[11px] text-slate-500 block">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-sky-500 focus:bg-white";

export default function AdminSeoView() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ text: string; ok: boolean } | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>("/");

  const showToast = useCallback((text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/site-settings");
        const data = await res.json();
        if (!cancelled && data?.success && data.settings) setSettings(data.settings);
      } catch {
        // Keep the defaults on screen rather than an empty form.
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const setPage = (path: string, patch: Partial<PageSeo>) =>
    setSettings((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        [path]: { ...(prev.pages[path] ?? { title: "", description: "" }), ...patch },
      },
    }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setSettings(data.settings);
        showToast(data.message || "Saved.");
      } else {
        showToast(data?.error || "Could not save settings.", false);
      }
    } catch {
      showToast("Could not reach the server.", false);
    } finally {
      setSaving(false);
    }
  };

  const page = settings.pages[activeRoute] ?? { title: "", description: "" };

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-slate-500 text-sm p-10">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading search settings…
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {toast ? (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold flex items-center gap-2 ${
            toast.ok
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
        >
          {toast.ok ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {toast.text}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-sky-600" /> Search & Metadata
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Titles, descriptions, social cards, structured data and indexing. Changes apply on the
            next page render — no deploy needed.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save changes
        </button>
      </div>

      {settings.discourageSearchEngines ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-900">
            <strong className="font-bold">The site is hidden from search engines.</strong> Every
            page is noindex, robots.txt disallows everything and the sitemap is empty. Fine for
            staging — switch this off before launch.
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------------------------ */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-600" /> Site identity
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Site name">
            <input
              className={inputClass}
              value={settings.siteName}
              onChange={(e) => set("siteName", e.target.value)}
            />
          </Field>
          <Field
            label="Canonical site URL"
            hint="Every canonical tag, sitemap entry and social URL is built from this. No trailing slash."
          >
            <input
              className={inputClass}
              value={settings.siteUrl}
              onChange={(e) => set("siteUrl", e.target.value)}
              placeholder="https://divanextechnologies.com"
            />
          </Field>
        </div>

        <Field label="Default title">
          <input
            className={inputClass}
            value={settings.defaultTitle}
            onChange={(e) => set("defaultTitle", e.target.value)}
          />
          <CharCount value={settings.defaultTitle} limit={TITLE_LIMIT} />
        </Field>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Title template" hint="%s is replaced by each page's own title.">
            <input
              className={inputClass}
              value={settings.titleTemplate}
              onChange={(e) => set("titleTemplate", e.target.value)}
              placeholder="%s | Divanex"
            />
          </Field>
          <Field label="X / Twitter handle">
            <input
              className={inputClass}
              value={settings.twitterHandle}
              onChange={(e) => set("twitterHandle", e.target.value)}
              placeholder="@divanex"
            />
          </Field>
        </div>

        <Field label="Default description">
          <PlainField
            rows={3}
            limit={DESCRIPTION_LIMIT}
            value={settings.defaultDescription}
            onChange={(defaultDescription) => set("defaultDescription", defaultDescription)}
          />
        </Field>

        <Field label="Keywords" hint="Comma separated. Minor ranking value, still used by some crawlers.">
          <input
            className={inputClass}
            value={settings.keywords.join(", ")}
            onChange={(e) =>
              set(
                "keywords",
                e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean)
              )
            }
          />
        </Field>

        <Field
          label="Social card image"
          hint="Leave as /opengraph-image to use the generated 1200×630 card, or paste an image URL."
        >
          <div className="flex items-center gap-2">
            <input
              className={inputClass}
              value={settings.defaultOgImage}
              onChange={(e) => set("defaultOgImage", e.target.value)}
            />
            <a
              href="/opengraph-image"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-600 hover:text-slate-900 shrink-0"
              title="Preview the generated card"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Field>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-600" /> Per-page metadata
        </h3>
        <p className="text-[12px] text-slate-500 -mt-2">
          Detail pages (services, case studies, tech stack, blog posts) take their title and
          description from their own record and are not listed here.
        </p>

        <div className="flex flex-wrap gap-2">
          {SEO_MANAGED_ROUTES.map((route) => (
            <button
              key={route.path}
              type="button"
              onClick={() => setActiveRoute(route.path)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                activeRoute === route.path
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-300 hover:border-sky-500"
              }`}
            >
              {route.label}
            </button>
          ))}
        </div>

        <div className="space-y-5 pt-1">
          <Field label={`Title — ${activeRoute}`}>
            <input
              className={inputClass}
              value={page.title}
              onChange={(e) => setPage(activeRoute, { title: e.target.value })}
            />
            <CharCount value={page.title} limit={TITLE_LIMIT} />
          </Field>

          <Field label="Description">
            <PlainField
              rows={3}
              limit={DESCRIPTION_LIMIT}
              value={page.description}
              onChange={(description) => setPage(activeRoute, { description })}
            />
          </Field>

          <label className="flex items-center gap-2.5 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(page.noIndex)}
              onChange={(e) => setPage(activeRoute, { noIndex: e.target.checked })}
              className="w-4 h-4 accent-slate-900"
            />
            Keep this page out of search results
          </label>

          {/* Result preview, so copy can be judged at the length it will appear. */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
              Search result preview
            </span>
            <div className="mt-2.5">
              <div className="text-[13px] text-emerald-800 font-mono">
                {settings.siteUrl.replace(/^https?:\/\//, "")}
                {activeRoute === "/" ? "" : activeRoute}
              </div>
              <div className="text-[18px] text-[#1a0dab] font-medium leading-snug mt-0.5">
                {page.title.slice(0, TITLE_LIMIT) || "Untitled page"}
                {page.title.length > TITLE_LIMIT ? "…" : ""}
              </div>
              <div className="text-[13px] text-slate-600 leading-relaxed mt-1">
                {page.description.slice(0, DESCRIPTION_LIMIT) || "No description set."}
                {page.description.length > DESCRIPTION_LIMIT ? "…" : ""}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-600" /> Organization details
        </h3>
        <p className="text-[12px] text-slate-500 -mt-2">
          Published as schema.org structured data. Google uses it for the knowledge panel, so it
          should match your Google Business Profile exactly.
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Legal name">
            <input
              className={inputClass}
              value={settings.legalName}
              onChange={(e) => set("legalName", e.target.value)}
            />
          </Field>
          <Field label="Founded (year)">
            <input
              className={inputClass}
              value={settings.foundingYear}
              onChange={(e) => set("foundingYear", e.target.value)}
            />
          </Field>
          {/*
            Read-only on purpose. These two used to be editable here as well as
            in Site Content, which meant the address on the contact page and the
            one in the schema.org markup could drift apart with nothing on
            screen to say so. Site Content is now the only place they are set.
          */}
          <Field
            label="Contact email"
            hint="Set in Site Content & CMS → Agency Contact Hub. Shown here so you can see what search engines are given."
          >
            <input
              className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`}
              value={settings.contactEmail}
              readOnly
            />
          </Field>
          <Field
            label="Contact phone"
            hint="Set in Site Content & CMS → Agency Contact Hub."
          >
            <input
              className={`${inputClass} bg-slate-100 text-slate-500 cursor-not-allowed`}
              value={settings.contactPhone}
              readOnly
            />
          </Field>
          <Field label="Street address">
            <input
              className={inputClass}
              value={settings.streetAddress}
              onChange={(e) => set("streetAddress", e.target.value)}
            />
          </Field>
          <Field label="City">
            <input
              className={inputClass}
              value={settings.addressLocality}
              onChange={(e) => set("addressLocality", e.target.value)}
            />
          </Field>
          <Field label="Region / state">
            <input
              className={inputClass}
              value={settings.addressRegion}
              onChange={(e) => set("addressRegion", e.target.value)}
            />
          </Field>
          <Field label="Postal code">
            <input
              className={inputClass}
              value={settings.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
            />
          </Field>
          <Field label="Country code" hint="Two letters, e.g. IN or US.">
            <input
              className={inputClass}
              value={settings.addressCountry}
              onChange={(e) => set("addressCountry", e.target.value)}
            />
          </Field>
          <Field label="Logo path or URL">
            <input
              className={inputClass}
              value={settings.logoUrl}
              onChange={(e) => set("logoUrl", e.target.value)}
            />
          </Field>
        </div>

        <Field
          label="Social profiles"
          hint="Published as sameAs, which is how search engines link these accounts to your brand."
        >
          <StringListEditor
            value={settings.socialProfiles}
            placeholder="https://linkedin.com/company/…"
            addLabel="Add profile"
            onChange={(next) =>
              set("socialProfiles", next.map((entry) => entry.trim()).filter(Boolean))
            }
          />
        </Field>
      </section>

      {/* ------------------------------------------------------------------ */}
      <section className="p-6 rounded-2xl bg-white border border-slate-200 space-y-5">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-sky-600" /> Indexing & verification
        </h3>

        <label className="flex items-start gap-2.5 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={settings.discourageSearchEngines}
            onChange={(e) => set("discourageSearchEngines", e.target.checked)}
            className="w-4 h-4 accent-slate-900 mt-0.5"
          />
          <span>
            Hide the entire site from search engines
            <span className="block text-[11px] text-slate-500">
              For staging or pre-launch. Leaving this on in production removes the site from search.
            </span>
          </span>
        </label>

        <Field
          label="Additional disallowed paths"
          hint="/admin and /api are always disallowed, whatever is listed here."
        >
          <StringListEditor
            value={settings.robotsDisallow}
            placeholder="/private-path"
            addLabel="Add path"
            onChange={(next) =>
              set("robotsDisallow", next.map((entry) => entry.trim()).filter(Boolean))
            }
          />
        </Field>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Google Search Console token" hint="The content value of the verification meta tag.">
            <input
              className={inputClass}
              value={settings.googleSiteVerification}
              onChange={(e) => set("googleSiteVerification", e.target.value)}
            />
          </Field>
          <Field label="Bing Webmaster token">
            <input
              className={inputClass}
              value={settings.bingSiteVerification}
              onChange={(e) => set("bingSiteVerification", e.target.value)}
            />
          </Field>
        </div>

        <div className="flex flex-wrap gap-3 pt-1 text-xs">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 font-bold hover:border-sky-500 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View sitemap.xml
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-700 font-bold hover:border-sky-500 flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View robots.txt
          </a>
        </div>
      </section>
    </div>
  );
}
