import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the service-role key, which bypasses Row Level Security. RLS is enabled
 * on every table with no policies granting access (see scripts/setup-db.js), so
 * the anon key exposed to browsers can read and write nothing. All data access
 * must go through the authenticated route handlers in src/app/api.
 *
 * The `server-only` import above turns any accidental client-side import into a
 * build error, so this key can never leak into a browser bundle.
 *
 * Built lazily on first use rather than at module scope: `next build` evaluates
 * route modules to collect page data, and throwing there would fail the build
 * on any machine without the secret (CI, a fresh clone) even though the value
 * is only ever needed at request time.
 */

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set.");
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Copy it from your Supabase dashboard (Settings -> API) into .env.local."
    );
  }

  client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
