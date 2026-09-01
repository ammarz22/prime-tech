"use client";

import { useCallback, useEffect, useState } from "react";

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Storage unavailable (private mode, quota, etc.) — fail silently, the
    // in-memory state still works for the current page view.
  }
}

/**
 * A small ID list persisted to localStorage — used for Saved Products and
 * Recently Viewed now that neither requires an account. Per-device, not
 * per-account; that's the deliberate tradeoff of not requiring sign-in.
 */
export function useLocalIds(key: string, options?: { max?: number }) {
  const max = options?.max;
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    // localStorage is a browser-only API — reading it must happen after
    // mount, not during SSR/first paint, to avoid a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIds(readIds(key));
  }, [key]);

  const persist = useCallback(
    (next: string[]) => {
      setIds(next);
      writeIds(key, next);
    },
    [key],
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const add = useCallback(
    (id: string) => {
      const withoutExisting = ids.filter((existing) => existing !== id);
      const next = [id, ...withoutExisting];
      persist(max ? next.slice(0, max) : next);
    },
    [ids, max, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(ids.filter((existing) => existing !== id));
    },
    [ids, persist],
  );

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) {
        persist(ids.filter((existing) => existing !== id));
      } else {
        const next = [id, ...ids];
        persist(max ? next.slice(0, max) : next);
      }
    },
    [ids, max, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { ids, has, add, remove, toggle, clear };
}
