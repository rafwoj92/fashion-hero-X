"use client";

import { useState, useEffect, useCallback } from "react";

export interface RecentlyViewedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

const STORAGE_KEY = "rh_recently_viewed";
const MAX_ITEMS = 8;

function load(): RecentlyViewedItem[] {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentlyViewedItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: RecentlyViewedItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage unavailable
  }
}

export function useRecentlyViewed() {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  const addItem = useCallback((item: RecentlyViewedItem) => {
    setItems((prev) => {
      const deduped = prev.filter((i) => i.id !== item.id);
      const next = [item, ...deduped].slice(0, MAX_ITEMS);
      save(next);
      return next;
    });
  }, []);

  const clearItems = useCallback(() => {
    save([]);
    setItems([]);
  }, []);

  return { items, addItem, clearItems };
}
