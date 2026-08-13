import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { ADMIN_CREDENTIALS, drivers } from "../data/mockData";

export type Role = "admin" | "driver";

export interface AuthUser {
  role: Role;
  name: string;
  email: string;
  driverId?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (role: Role, email: string, password: string) => { ok: true } | { ok: false; error: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "dtp_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login: (role, email, password) => {
      const cleanEmail = email.trim().toLowerCase();
      if (role === "admin") {
        if (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) {
          setUser({ role: "admin", name: "Business Admin", email: ADMIN_CREDENTIALS.email });
          return { ok: true };
        }
        return { ok: false, error: "Incorrect email or password. Please check with your admin credentials." };
      }
      const driver = drivers.find(d => d.email.toLowerCase() === cleanEmail);
      if (!driver) {
        return { ok: false, error: "No driver account found with this email. Ask your Business Admin for your login details." };
      }
      if (driver.password !== password) {
        return { ok: false, error: "Incorrect password. Please check the credentials given to you by your admin." };
      }
      if (driver.status === "Suspended") {
        return { ok: false, error: "Your driver account has been suspended. Please contact your Business Admin." };
      }
      setUser({ role: "driver", name: driver.name, email: driver.email, driverId: driver.id });
      return { ok: true };
    },
    logout: () => setUser(null),
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
