"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled route error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-slate-50">
      <div className="max-w-lg text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <p className="font-mono text-xs font-bold tracking-[0.3em] text-amber-800 uppercase bg-amber-50 border border-amber-200 inline-block px-3 py-1 rounded-full">
          SOMETHING WENT WRONG
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          We hit an unexpected error
        </h1>
        <p className="text-slate-600 font-medium leading-relaxed">
          The issue has been logged. You can retry, or head back and try a different route.
        </p>
        {/* The digest is safe to show and is what identifies this error in the
            server logs — the message itself is deliberately not rendered. */}
        {error.digest && (
          <p className="font-mono text-xs text-slate-500">Reference: {error.digest}</p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition hover:from-sky-600 hover:to-blue-700"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-600 hover:bg-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
