/**
 * Per-account lockout with escalating delay.
 *
 * Rate limiting in src/lib/rate-limit.ts is keyed on the source address, which
 * an attacker with a pool of addresses simply walks around. This counts
 * failures against the *account* instead, so guessing one operator's password
 * gets slower no matter where the attempts come from.
 *
 * The trade is that an attacker can lock a known account out on purpose. The
 * windows are therefore minutes, not hours, and a correct credential clears the
 * counter immediately.
 */

interface LockoutEntry {
  failures: number;
  lockedUntil: number;
  /** Last failure time; the counter decays if nobody tries for a while. */
  lastFailureAt: number;
}

declare global {
  var __DIVANEX_LOCKOUTS__: Map<string, LockoutEntry> | undefined;
}

function store(): Map<string, LockoutEntry> {
  if (!globalThis.__DIVANEX_LOCKOUTS__) globalThis.__DIVANEX_LOCKOUTS__ = new Map();
  return globalThis.__DIVANEX_LOCKOUTS__;
}

/** Failures below this are free; the browser back button should not lock anyone out. */
const FREE_ATTEMPTS = 5;
/** A quiet period this long forgets the counter entirely. */
const DECAY_MS = 30 * 60 * 1000;
const MAX_LOCK_MS = 30 * 60 * 1000;

function lockDurationFor(failures: number): number {
  const over = failures - FREE_ATTEMPTS;
  if (over <= 0) return 0;
  // 30s, 60s, 2m, 4m, 8m, ... capped at 30 minutes.
  return Math.min(30_000 * Math.pow(2, over - 1), MAX_LOCK_MS);
}

export interface LockoutStatus {
  locked: boolean;
  retryAfterSeconds: number;
}

export function checkLockout(key: string): LockoutStatus {
  const entry = store().get(key);
  if (!entry) return { locked: false, retryAfterSeconds: 0 };

  const now = Date.now();
  if (now - entry.lastFailureAt > DECAY_MS) {
    store().delete(key);
    return { locked: false, retryAfterSeconds: 0 };
  }

  if (entry.lockedUntil > now) {
    return { locked: true, retryAfterSeconds: Math.ceil((entry.lockedUntil - now) / 1000) };
  }
  return { locked: false, retryAfterSeconds: 0 };
}

export function recordFailure(key: string): LockoutStatus {
  const now = Date.now();
  const entries = store();
  const entry = entries.get(key);

  if (!entry || now - entry.lastFailureAt > DECAY_MS) {
    entries.set(key, { failures: 1, lockedUntil: 0, lastFailureAt: now });
    return { locked: false, retryAfterSeconds: 0 };
  }

  entry.failures += 1;
  entry.lastFailureAt = now;
  const lockMs = lockDurationFor(entry.failures);
  entry.lockedUntil = lockMs > 0 ? now + lockMs : 0;

  return {
    locked: lockMs > 0,
    retryAfterSeconds: lockMs > 0 ? Math.ceil(lockMs / 1000) : 0,
  };
}

/** Called after a correct credential, so a legitimate operator is never stuck. */
export function clearFailures(key: string): void {
  store().delete(key);
}
