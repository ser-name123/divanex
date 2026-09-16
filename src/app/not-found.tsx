import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Divanex",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-slate-50">
      <div className="max-w-lg text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-sky-700 uppercase bg-sky-50 border border-sky-200 inline-block px-3 py-1 rounded-full">
          ERROR 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          This page doesn&apos;t exist
        </h1>
        <p className="text-slate-600 font-medium leading-relaxed">
          The link may be outdated, or the page may have been moved. Let&apos;s get you back
          to something useful.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-600 hover:to-blue-700"
          >
            Back to home
          </Link>
          <Link
            href="/services"
            className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 hover:bg-white"
          >
            Browse services
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 hover:bg-white"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
