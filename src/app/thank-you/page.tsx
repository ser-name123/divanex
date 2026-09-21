import type { Metadata } from "next";
import Link from "next/link";
import SmartLink from "@/components/SmartLink";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";
import { getContent } from "@/lib/contentStore";
import { Icon } from "@/lib/iconRegistry";
import { formFlow, isFormKind, type FormKind } from "@/data/formSettings";

/**
 * Where every website form lands once its submission is stored.
 *
 * Each form used to flip a React flag and swap the form for an inline banner.
 * That banner was indistinguishable from a validation message, it vanished on
 * a refresh, it left no URL to return to or share, and the newsletter forms
 * showed it without having submitted anything at all. A real page means the
 * visitor can see that something happened, and analytics has a destination to
 * count instead of a state change it cannot observe.
 *
 * `noIndex`, deliberately: a thank-you page in search results is a page people
 * reach without submitting anything, and it is how a conversion goal ends up
 * counting strangers.
 */

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: "/thank-you",
    title: "Thank you",
    description: "Your submission has been received by the Divanex engineering team.",
    noIndex: true,
  });
}

interface PageProps {
  searchParams: Promise<{ kind?: string; ref?: string }>;
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const kind: FormKind = isFormKind(params.kind || "") ? (params.kind as FormKind) : "contact";

  const settings = await getContent("forms");
  const content = formFlow(settings, kind).thankYou;

  // Only ever our own generated ids reach the page, but it arrives from the
  // query string, so it is trimmed and capped rather than trusted. React
  // escapes it on render; this stops a long string breaking the layout.
  const reference = (params.ref || "").trim().slice(0, 80);
  const showReference = content.showReference && reference.length > 0;

  return (
    <main className="relative min-h-screen bg-slate-50 pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
      {/* Soft wash behind the card, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-100/70 via-slate-50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {content.eyebrow}
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {content.headline}{" "}
            <span className="text-sky-600">{content.headlineHighlight}</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {content.subhead}
          </p>

          {showReference && (
            <div className="mt-7 w-full max-w-md rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                {content.referenceLabel}
              </div>
              <div className="mt-1 break-all font-mono text-sm text-slate-900">{reference}</div>
            </div>
          )}
        </div>

        {content.steps.length > 0 && (
          <ol className="mt-12 grid gap-4 sm:grid-cols-3">
            {content.steps.map((step, index) => (
              <li
                key={step.id}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <Icon name={step.iconName} className="h-4.5 w-4.5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-4 text-sm font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        )}

        {content.responseNote && (
          <p className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
            <Clock className="h-4 w-4 text-sky-600" />
            {content.responseNote}
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {content.primaryCtaLabel && (
            <SmartLink
              href={content.primaryCtaHref || "/"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-600/20 transition-all hover:from-sky-700 hover:to-blue-700 sm:w-auto"
            >
              {content.primaryCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </SmartLink>
          )}
          {content.secondaryCtaLabel && (
            <SmartLink
              href={content.secondaryCtaHref || "/"}
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
            >
              {content.secondaryCtaLabel}
            </SmartLink>
          )}
        </div>
      </div>
    </main>
  );
}
