/**
 * Generates the secrets the admin console needs.
 *
 *   node scripts/generate-admin-credentials.js "your-admin-password"
 *
 * Copy the printed lines into .env.local (and into your host's env settings).
 */
const { randomBytes, scryptSync } = require("node:crypto");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/generate-admin-credentials.js \"<password>\"");
  process.exit(1);
}

if (password.length < 12) {
  console.error("Refusing: use a password of at least 12 characters.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
const stored = `scrypt$${salt}$${hash}`;

/**
 * The separators have to be escaped for a .env file.
 *
 * Next loads .env.local through dotenv-expand, which treats `$name` as a
 * variable reference. An unescaped hash therefore arrives as the single word
 * "scrypt" — everything from the first `$` expands to nothing, and no password
 * on earth verifies against it. It fails silently, which is the worst way for a
 * credential to fail: the file looks right, and sign-in simply never works.
 *
 * A host's environment settings do not expand anything, so the raw value is
 * what belongs there.
 */
const escaped = stored.split("$").join("\\$");

console.log("\nAdd these to .env.local (the backslashes are required):\n");
console.log(`AUTH_SECRET=${randomBytes(48).toString("base64url")}`);
console.log(`ADMIN_USERNAME=admin`);
console.log(`ADMIN_PASSWORD_HASH=${escaped}`);
console.log("\nFor Vercel or another host, paste the hash without the backslashes:\n");
console.log(`ADMIN_PASSWORD_HASH=${stored}`);
console.log("\nThe plaintext password is never stored. Keep it in your password manager.\n");
