"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { apiFetch, ApiError } from "./api";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(path: string | null): UseApiState<T> {
  const { getToken, logout } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resolvedPath, setResolvedPath] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!path) return;

    const token = getToken();
    if (!token) {
      logout();
      return;
    }

    let cancelled = false;

    apiFetch<T>(path, { token })
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
          setResolvedPath(path);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 401) {
          logout();
          return;
        }
        setError(err instanceof ApiError ? err.message : "Request failed");
        setResolvedPath(path);
      });

    return () => {
      cancelled = true;
    };
  }, [path, tick, getToken, logout]);

  // Loading when we have a path but haven't resolved it yet, or a refetch was triggered
  const loading = !!path && (resolvedPath !== path || (data === null && error === null));

  return { data, loading, error, refetch };
}

export function useApiMutation<TReq, TRes>(path: string, method = "POST") {
  const { getToken, logout } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (body?: TReq): Promise<TRes | null> => {
      const token = getToken();
      if (!token) {
        logout();
        return null;
      }

      setSubmitting(true);
      setError(null);

      try {
        const res = await apiFetch<TRes>(path, {
          method,
          token,
          body: body ? JSON.stringify(body) : undefined,
        });
        return res;
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          logout();
          return null;
        }
        const msg = err instanceof ApiError ? err.message : "Request failed";
        setError(msg);
        throw err;
      } finally {
        setSubmitting(false);
      }
    },
    [path, method, getToken, logout]
  );

  return { mutate, submitting, error };
}

export { ApiError };
