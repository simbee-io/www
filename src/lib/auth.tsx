"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { apiFetch, ApiError } from "./api";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthClient {
  id: string;
  slug: string;
  name: string;
  tier: string;
  status: string;
}

interface Session {
  token: string;
  expiresAt: number;
  scopes: string[];
  user: AuthUser;
  client: AuthClient;
}

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  login: (clientId: string, userId: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    companyName: string,
    tier?: string
  ) => Promise<{ client: AuthClient; user: AuthUser; token: string }>;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "simbee_session";

// External store for session — avoids setState-in-effect
let currentSession: Session | null = null;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function getSnapshot(): Session | null {
  return currentSession;
}

function getServerSnapshot(): Session | null {
  return null;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Initialize from localStorage (runs once at module load in the browser)
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const session: Session = JSON.parse(raw);
      if (session.expiresAt > Date.now()) {
        currentSession = session;
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    }
  } catch {
    // corrupt data — ignore
  }
}

function saveSession(session: Session) {
  currentSession = session;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  emitChange();
}

function clearSession() {
  currentSession = null;
  localStorage.removeItem(SESSION_KEY);
  emitChange();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = useCallback(
    async (clientId: string, userId: string, password: string) => {
      const res = await apiFetch<{
        data: {
          token: string;
          scopes: string[];
          expires_in: number;
          user: AuthUser;
          client: AuthClient;
        };
      }>("/auth/token", {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId,
          user_id: userId,
          password,
        }),
      });
      const s: Session = {
        token: res.data.token,
        expiresAt: Date.now() + res.data.expires_in * 1000,
        scopes: res.data.scopes,
        user: res.data.user,
        client: res.data.client,
      };
      saveSession(s);
    },
    []
  );

  const signup = useCallback(
    async (
      email: string,
      password: string,
      companyName: string,
      tier = "graph"
    ) => {
      const res = await apiFetch<{
        data: {
          client: AuthClient;
          user: AuthUser;
          token: string;
          scopes: string[];
        };
      }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          company_name: companyName,
          tier,
        }),
      });
      const s: Session = {
        token: res.data.token,
        expiresAt: Date.now() + 900 * 1000,
        scopes: res.data.scopes,
        user: res.data.user,
        client: res.data.client,
      };
      saveSession(s);
      return res.data;
    },
    []
  );

  const logout = useCallback(() => {
    clearSession();
  }, []);

  const getToken = useCallback(() => {
    const s = getSnapshot();
    if (!s) return null;
    if (s.expiresAt < Date.now()) {
      clearSession();
      return null;
    }
    return s.token;
  }, []);

  // loading is false on the client once hydrated (module-level init already ran),
  // true on the server since getServerSnapshot returns null
  const loading = false;

  const value = useMemo(
    () => ({ session, loading, login, signup, logout, getToken }),
    [session, loading, login, signup, logout, getToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

export { ApiError };
export type { Session, AuthUser, AuthClient };
