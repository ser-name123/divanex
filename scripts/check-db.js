/**
 * Verifies that the app can actually persist data.
 *
 *   npm run check-db
 *
 * Checks the whole chain the way the app uses it, not just that a host
 * resolves: the service-role key, the REST endpoint, every required table, and
 * a real write followed by a read-back and cleanup. The stores all fall back to
 * in-memory data on failure, so "the site loads" proves nothing — this does.
 */
const { createClient } = require("@supabase/supabase-js");

const REQUIRED_TABLES = [
  "leads",
  "estimates",
  "projects",
  "services",
  "system_logs",
  "site_settings",
  "site_content",
];

let failures = 0;
const ok = (msg) => console.log("  ✓ " + msg);
const bad = (msg, detail) => {
  failures++;
  console.log("  ✗ " + msg + (detail ? "\n      " + detail : ""));
};

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  console.log("\nConfiguration");
  if (url) ok("NEXT_PUBLIC_SUPABASE_URL is set");
  else bad("NEXT_PUBLIC_SUPABASE_URL is not set");

  if (serviceKey) {
    ok("SUPABASE_SERVICE_ROLE_KEY is set");
  } else {
    bad(
      "SUPABASE_SERVICE_ROLE_KEY is not set",
      "This is the only key the server uses. Without it nothing is saved:\n      Supabase dashboard -> Settings -> API Keys -> secret key."
    );
  }

  if (!url || !serviceKey) {
    console.log("\nStopping here — the checks below need both values.\n");
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log("\nTables");
  for (const table of REQUIRED_TABLES) {
    const { error, count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });
    if (error) bad(`${table} — ${error.message}`, 'Run "npm run setup-db".');
    else ok(`${table} (${count ?? 0} rows)`);
  }

  console.log("\nWrite and read back");
  const probeId = `healthcheck-${Date.now()}`;
  const { error: writeError } = await supabase
    .from("site_content")
    .upsert({ id: probeId, payload: { probe: true }, updated_at: new Date().toISOString() });

  if (writeError) {
    bad("could not write", writeError.message);
  } else {
    ok("wrote a row");
    const { data, error: readError } = await supabase
      .from("site_content")
      .select("payload")
      .eq("id", probeId)
      .maybeSingle();

    if (readError) bad("could not read it back", readError.message);
    else if (data?.payload?.probe === true) ok("read it back correctly");
    else bad("read it back but the contents were wrong");

    const { error: deleteError } = await supabase.from("site_content").delete().eq("id", probeId);
    if (deleteError) bad("could not clean up the probe row", deleteError.message);
    else ok("cleaned up");
  }

  console.log("");
  if (failures === 0) {
    console.log("Everything checks out. Data is being persisted.\n");
    process.exit(0);
  }
  console.log(`${failures} check(s) failed. Data is NOT being persisted.\n`);
  process.exit(1);
}

main().catch((err) => {
  console.error("\nCheck failed to run:", err.message, "\n");
  process.exit(1);
});
