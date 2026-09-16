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

console.log("\nAdd these to .env.local:\n");
console.log(`AUTH_SECRET=${randomBytes(48).toString("base64url")}`);
console.log(`ADMIN_USERNAME=admin`);
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt}$${hash}`);
console.log("\nThe plaintext password is never stored. Keep it in your password manager.\n");
