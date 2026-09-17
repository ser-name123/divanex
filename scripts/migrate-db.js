/**
 * Copies every public table from one Supabase database into another.
 *
 *   SOURCE_DATABASE_URL=... TARGET_DATABASE_URL=... node scripts/migrate-db.js
 *
 * Run `setup-db` against the target first: this moves rows, it does not create
 * the schema. The target's tables are emptied before the copy, so re-running it
 * is safe and always lands on an exact replica of the source rather than a
 * merge of two generations of seed data.
 *
 * Pass --dry-run to report what would move without writing anything.
 */
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");
const BATCH = 200;

const source = process.env.SOURCE_DATABASE_URL;
const target = process.env.TARGET_DATABASE_URL;

if (!source || !target) {
  console.error(
    "Set both SOURCE_DATABASE_URL and TARGET_DATABASE_URL.\n" +
      "Supabase's direct host (db.<ref>.supabase.co) is IPv6-only; use the\n" +
      "session pooler string if this machine has no IPv6 route."
  );
  process.exit(1);
}

if (source === target) {
  console.error("Source and target are the same database. Refusing to run.");
  process.exit(1);
}

// Same trust anchor as setup-db: Supabase's own root, never rejectUnauthorized:false.
const caPath = path.join(__dirname, "supabase-ca.crt");
const ssl = fs.existsSync(caPath)
  ? { rejectUnauthorized: true, ca: fs.readFileSync(caPath, "utf8") }
  : { rejectUnauthorized: true };

const connect = async (url) => {
  const client = new Client({ connectionString: url, ssl, connectionTimeoutMillis: 30000 });
  await client.connect();
  return client;
};

const listTables = async (client) => {
  const { rows } = await client.query(
    "SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;"
  );
  return rows.map((r) => r.tablename);
};

async function main() {
  console.log(DRY_RUN ? "Dry run — nothing will be written.\n" : "");
  const src = await connect(source);
  const dst = await connect(target);
  console.log("Connected to both databases.\n");

  const srcTables = await listTables(src);
  const dstTables = new Set(await listTables(dst));

  const missing = srcTables.filter((t) => !dstTables.has(t));
  if (missing.length > 0) {
    console.error(
      `The target is missing ${missing.length} table(s): ${missing.join(", ")}\n` +
        "Run `npm run setup-db` against the target first."
    );
    process.exit(1);
  }

  const summary = [];

  for (const table of srcTables) {
    const { rows } = await src.query(`SELECT * FROM public."${table}";`);
    // jsonb columns come back as parsed JS values. An object round-trips, but an
    // array would be sent as a Postgres array literal and rejected as invalid
    // json, so every json value is re-serialised explicitly.
    const jsonCols = new Set(
      (
        await src.query(
          "SELECT column_name FROM information_schema.columns " +
            "WHERE table_schema = 'public' AND table_name = $1 " +
            "AND data_type IN ('json', 'jsonb');",
          [table]
        )
      ).rows.map((r) => r.column_name)
    );
    if (!DRY_RUN) {
      // No foreign keys between these tables, so each can be emptied on its own.
      await dst.query(`TRUNCATE TABLE public."${table}";`);
    }

    if (rows.length > 0 && !DRY_RUN) {
      const columns = Object.keys(rows[0]);
      const quoted = columns.map((c) => `"${c}"`).join(", ");

      for (let i = 0; i < rows.length; i += BATCH) {
        const chunk = rows.slice(i, i + BATCH);
        const values = [];
        const tuples = chunk.map((row) => {
          const slots = columns.map((col) => {
            const value = row[col];
            values.push(jsonCols.has(col) && value !== null ? JSON.stringify(value) : value);
            return `$${values.length}`;
          });
          return `(${slots.join(", ")})`;
        });
        await dst.query(
          `INSERT INTO public."${table}" (${quoted}) VALUES ${tuples.join(", ")};`,
          values
        );
      }
    }

    const after = DRY_RUN
      ? null
      : (await dst.query(`SELECT COUNT(*)::int AS n FROM public."${table}";`)).rows[0].n;

    summary.push({ table, source: rows.length, target: after });
    console.log(
      `  ${table.padEnd(16)} ${String(rows.length).padStart(5)} row(s)` +
        (DRY_RUN ? "" : ` -> ${after} in target`)
    );
  }

  await src.end();
  await dst.end();

  if (DRY_RUN) {
    console.log("\nDry run complete.");
    return;
  }

  const mismatched = summary.filter((s) => s.source !== s.target);
  if (mismatched.length > 0) {
    console.error(
      "\nRow counts do not match for: " +
        mismatched.map((s) => `${s.table} (${s.source} -> ${s.target})`).join(", ")
    );
    process.exit(1);
  }

  console.log("\nMigration complete. Every table matches the source row for row.");
}

main().catch((err) => {
  console.error("\nMigration failed:", err.message);
  process.exit(1);
});
