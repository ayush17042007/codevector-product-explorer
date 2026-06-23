"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Product, NextCursor } from "@/types/product";
import { fetchProducts } from "@/lib/api";

interface UseProductsReturn {
  products: Product[];
  nextCursor: NextCursor | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refetch: () => Promise<void>;
}

export function useProducts(category: string | null): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [nextCursor, setNextCursor] = useState<NextCursor | null>(null);
  const [snapshotTime, setSnapshotTime] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const loadInitial = useCallback(async () => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    setProducts([]);
    setNextCursor(null);
    setSnapshotTime(null);

    try {
      const data = await fetchProducts({
        category: category ?? undefined,
        limit: 20,
      });

      setProducts(data.products);
      setNextCursor(data.next_cursor);
      setSnapshotTime(data.snapshot_time);

      if (data.snapshot_time) {
        setSnapshotTime(data.snapshot_time);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      setError("Failed to load products. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, [category]);

  const loadMore = useCallback(async () => {
    if (!nextCursor || loadingMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const data = await fetchProducts({
        cursor_updated_at: nextCursor.updated_at,
        cursor_id: nextCursor.id,
        snapshot_time: snapshotTime ?? undefined,
        category: category ?? undefined,
        limit: 20,
      });

      setProducts((prev) => [...prev, ...data.products]);
      setNextCursor(data.next_cursor);
    } catch {
      setError("Failed to load more products. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  }, [nextCursor, loadingMore, snapshotTime, category]);

  useEffect(() => {
    loadInitial();

    return () => {
      abortRef.current?.abort();
    };
  }, [loadInitial]);

  return {
    products,
    nextCursor,
    loading,
    loadingMore,
    error,
    loadMore,
    refetch: loadInitial,
  };
}
