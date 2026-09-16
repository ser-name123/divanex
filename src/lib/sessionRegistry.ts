/**
 * Session revocation registry.
 *
 * Admin and portal sessions are stateless signed tokens, which means that
 * without this a logout only deletes the client's copy: a token captured from a
 * shared machine, a proxy log, or an XSS payload stays valid for its full
 * lifetime and nothing server-side can stop it. Two kinds of revocation:
 *
 *   - by token id (`jti`)  — one session, e.g. a logout.
 *   - by subject           — every session for an account at once, e.g. after a
 *                            password change or a suspected compromise.
 *
 * Caveat worth knowing: this lives in process memory, like the rest of this
 * app's state. A server restart forgets revocations while the tokens themselves
 * (signed with AUTH_SECRET) stay valid until they expire. Rotating AUTH_SECRET
 * invalidates everything immediately and is the answer during an incident. Move
 * this to Redis or a table when the app runs more than one instance.
 */

interface RegistryState {
  /** jti -> epoch seconds after which the entry can be dropped. */
  revokedTokens: Map<string, number>;
  /** subject -> epoch seconds; tokens issued at or before this are dead. */
  subjectCutoffs: Map<string, number>;
}

declare global {
  var __DIVANEX_SESSION_REGISTRY__: RegistryState | undefined;
}

function registry(): RegistryState {
  if (!globalThis.__DIVANEX_SESSION_REGISTRY__) {
    globalThis.__DIVANEX_SESSION_REGISTRY__ = {
      revokedTokens: new Map(),
      subjectCutoffs: new Map(),
    };
  }
  return globalThis.__DIVANEX_SESSION_REGISTRY__;
}

function sweep(nowSec: number) {
  const state = registry();
  if (state.revokedTokens.size < 10000) return;
  for (const [jti, expiry] of state.revokedTokens) {
    if (expiry <= nowSec) state.revokedTokens.delete(jti);
  }
}

/** Revokes a single session. `expSec` lets the entry be dropped once the token would have expired anyway. */
export function revokeToken(jti: string | undefined, expSec: number): void {
  if (!jti) return;
  const state = registry();
  sweep(Math.floor(Date.now() / 1000));
  state.revokedTokens.set(jti, expSec);
}

/** Revokes every session issued for a subject up to now. */
export function revokeAllForSubject(subject: string): void {
  if (!subject) return;
  registry().subjectCutoffs.set(subject.toLowerCase(), Math.floor(Date.now() / 1000));
}

export function isSessionRevoked(
  payload: { sub?: string; jti?: string; iat?: number } | null | undefined
): boolean {
  if (!payload) return true;
  const state = registry();

  if (payload.jti && state.revokedTokens.has(payload.jti)) return true;

  const cutoff = payload.sub ? state.subjectCutoffs.get(payload.sub.toLowerCase()) : undefined;
  if (cutoff !== undefined) {
    // A token with no issued-at cannot prove it postdates the cutoff, so it loses.
    if (typeof payload.iat !== "number" || payload.iat <= cutoff) return true;
  }

  return false;
}
