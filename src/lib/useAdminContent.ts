"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ContentCollection, ContentShapes } from "@/data/siteContent";

/**
 * Loads and saves an admin-editable content collection.
 *
 * Replaces the `localStorage` read/write each admin view used to do. That
 * pattern meant an edit lived in one browser and never reached a visitor, so
 * two people editing the site saw different sites and neither matched what was
 * published. Everything now round-trips through /api/content.
 */
export function useAdminContent<K extends ContentCollection>(
  collection: K,
  seed: ContentShapes[K]
) {
  const [data, setData] = useState<ContentShapes[K]>(seed);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    (async () => {
      try {
        const res = await fetch(`/api/content/${collection}`);
        const json = await res.json();
        if (mounted.current && json?.success && json.data !== undefined) {
          setData(json.data as ContentShapes[K]);
        }
      } catch {
        // Keep the seed on screen rather than an empty editor.
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();
    return () => {
      mounted.current = false;
    };
  }, [collection]);

  /**
   * Persists and returns whether it worked, so callers can decide what to tell
   * the operator. Local state is only updated from the server's response —
   * showing a change that failed to save is how content silently goes missing.
   */
  const save = useCallback(
    async (next: ContentShapes[K]): Promise<boolean> => {
      setSaving(true);
      setError(null);
      try {
        const res = await fetch(`/api/content/${collection}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: next }),
        });
        const json = await res.json();
        if (res.ok && json?.success) {
          if (mounted.current) setData(json.data as ContentShapes[K]);
          return true;
        }
        if (mounted.current) setError(json?.error || "Could not save.");
        return false;
      } catch {
        if (mounted.current) setError("Could not reach the server.");
        return false;
      } finally {
        if (mounted.current) setSaving(false);
      }
    },
    [collection]
  );

  /** Discards the stored record and falls back to the built-in defaults. */
  const reset = useCallback(async (): Promise<boolean> => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/content/${collection}`, { method: "DELETE" });
      const json = await res.json();
      if (res.ok && json?.success) {
        if (mounted.current) setData(json.data as ContentShapes[K]);
        return true;
      }
      if (mounted.current) setError(json?.error || "Could not reset.");
      return false;
    } catch {
      if (mounted.current) setError("Could not reach the server.");
      return false;
    } finally {
      if (mounted.current) setSaving(false);
    }
  }, [collection]);

  return { data, setData, save, reset, loading, saving, error };
}
