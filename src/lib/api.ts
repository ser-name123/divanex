import { NextResponse } from "next/server";

/**
 * Shared response + validation helpers for route handlers.
 *
 * The key rule here: internal error details are logged, never returned. Clients
 * get a stable, generic message so database and driver internals stay private.
 */

export function ok<T extends object>(body: T) {
  return NextResponse.json({ success: true, ...body });
}

export function badRequest(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}

/** Logs the real cause, returns a generic message. */
export function serverError(context: string, cause: unknown) {
  console.error(`[${context}]`, cause);
  return NextResponse.json(
    { success: false, error: "An internal error occurred. Please try again later." },
    { status: 500 }
  );
}

export function tooManyRequests(retryAfterSeconds: number) {
  return NextResponse.json(
    { success: false, error: "Too many requests. Please try again shortly." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}

/** Parses a JSON body, returning null when it is absent or malformed. */
export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) return null;
    return body as T;
  } catch {
    return null;
  }
}

/** Trims, collapses whitespace, and truncates. Returns "" for non-strings. */
export function cleanString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

/** Trims and truncates but preserves line breaks — for message/notes fields. */
export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

/** Restricts a value to a known set, falling back to a default. */
export function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

export function toStringArray(value: unknown, maxItems: number, maxLength: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .slice(0, maxItems)
    .map((item) => item.trim().slice(0, maxLength));
}
