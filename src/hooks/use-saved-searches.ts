import { useCallback, useEffect, useState } from "react";

export interface SavedSearch<T = unknown> {
  id: string;
  name: string;
  filters: T;
  createdAt: number;
}

export function useSavedSearches<T = unknown>(storageKey: string) {
  const [searches, setSearches] = useState<SavedSearch<T>[]>([]);

  // Load on mount (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setSearches(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [storageKey]);

  const persist = useCallback(
    (next: SavedSearch<T>[]) => {
      setSearches(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore quota / privacy errors
      }
    },
    [storageKey],
  );

  const save = useCallback(
    (name: string, filters: T) => {
      const item: SavedSearch<T> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim() || "Untitled search",
        filters,
        createdAt: Date.now(),
      };
      persist([item, ...searches].slice(0, 12));
      return item;
    },
    [searches, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(searches.filter((s) => s.id !== id));
    },
    [searches, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { searches, save, remove, clear };
}
