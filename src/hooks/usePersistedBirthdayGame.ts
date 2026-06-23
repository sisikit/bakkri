"use client";

import { useEffect } from "react";

import {
  selectPersistenceSnapshot,
  useBirthdayGameStore,
} from "@/src/store/useBirthdayGameStore";

const STORAGE_KEY = "birthday-ctf-state";

export function usePersistedBirthdayGame() {
  const hydrate = useBirthdayGameStore((state) => state.hydrate);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        hydrate(JSON.parse(raw));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [hydrate]);

  useEffect(() => {
    const unsubscribe = useBirthdayGameStore.subscribe((state) => {
      const snapshot = selectPersistenceSnapshot(state);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    });

    return unsubscribe;
  }, []);
}
