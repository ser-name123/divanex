import "server-only";
import { getSupabase } from "@/lib/supabase";

/**
 * Storage for the admin sign-in one-time codes.
 *
 * These lived in a module-level Map, which works on a server that stays up and
 * fails on one that does not. The code is issued by the request that checks the
 * password and read back by the request that verifies it — two invocations, and
 * on a serverless host they land on different instances more often than not.
 * The second instance started with an empty Map, so a correct code came back as
 * "invalid or expired" and nobody could sign in.
 *
 * There is deliberately no in-memory fallback here. A cache that answers when
 * the database cannot is the same bug wearing a different hat: it would let one
 * instance accept a challenge another never issued. If the store is unreachable
 * the sign-in fails, which is the safe direction for an authentication factor.
 */

const TABLE = "auth_challenges";

export interface OtpChallenge {
  /** HMAC of the code, never the code itself. */
  digest: string;
  expiresAt: number;
  attempts: number;
}

interface ChallengeRow {
  digest: string;
  expires_at: string;
  attempts: number;
}

/** Replaces any challenge already outstanding for this account. */
export async function saveChallenge(key: string, challenge: OtpChallenge): Promise<boolean> {
  try {
    const { error } = await getSupabase().from(TABLE).upsert({
      id: key,
      digest: challenge.digest,
      expires_at: new Date(challenge.expiresAt).toISOString(),
      attempts: challenge.attempts,
    });
    if (error) {
      console.error("[auth] could not store the sign-in challenge:", error.message);
      return false;
    }
    return true;
  } catch (error: unknown) {
    console.error(
      "[auth] could not store the sign-in challenge:",
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}

/** The outstanding challenge, or null if there is none or the store is down. */
export async function readChallenge(key: string): Promise<OtpChallenge | null> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .select("digest, expires_at, attempts")
      .eq("id", key)
      .maybeSingle<ChallengeRow>();

    if (error || !data) return null;

    return {
      digest: data.digest,
      expiresAt: new Date(data.expires_at).getTime(),
      attempts: data.attempts,
    };
  } catch {
    return null;
  }
}

/**
 * Records one guess against the challenge.
 *
 * The update is conditional on the attempt count the caller read, so two
 * requests racing on the same challenge cannot both spend the same attempt —
 * without that, the cap on guesses is only a cap per request that arrives
 * alone. A false return means the row moved underneath us and the caller should
 * treat the guess as spent.
 */
export async function countAttempt(key: string, seenAttempts: number): Promise<boolean> {
  try {
    const { data, error } = await getSupabase()
      .from(TABLE)
      .update({ attempts: seenAttempts + 1 })
      .eq("id", key)
      .eq("attempts", seenAttempts)
      .select("attempts");

    return !error && Array.isArray(data) && data.length === 1;
  } catch {
    return false;
  }
}

/** Burns the challenge. Called on success and on every terminal failure. */
export async function clearChallenge(key: string): Promise<void> {
  try {
    await getSupabase().from(TABLE).delete().eq("id", key);
  } catch {
    // The expiry check makes a surviving row harmless; it is only housekeeping.
  }
}

/** Drops challenges nobody completed. Housekeeping, not a security boundary. */
export async function sweepExpiredChallenges(): Promise<void> {
  try {
    await getSupabase().from(TABLE).delete().lt("expires_at", new Date().toISOString());
  } catch {
    // Same: expired rows are rejected on read regardless.
  }
}
