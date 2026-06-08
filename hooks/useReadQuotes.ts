'use client';

import { useState, useEffect } from 'react';

const READ_KEY = 'quote-viewer-read';

function loadReadIds(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(READ_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveReadIds(ids: number[]) {
  try {
    localStorage.setItem(READ_KEY, JSON.stringify(ids));
  } catch {}
}

export function useReadQuotes() {
  const [state, setState] = useState<{ ids: number[]; isHydrated: boolean }>({
    ids: [],
    isHydrated: false,
  });

  useEffect(() => {
    setState({ ids: loadReadIds(), isHydrated: true });
  }, []);

  const markRead = (id: number) => {
    setState((prev) => {
      if (prev.ids.includes(id)) return prev;
      const updated = [...prev.ids, id];
      saveReadIds(updated);
      return { ...prev, ids: updated };
    });
  };

  const isRead = (id: number) => state.ids.includes(id);

  return {
    readIds: state.ids,
    readCount: state.ids.length,
    markRead,
    isRead,
    isHydrated: state.isHydrated,
  };
}
