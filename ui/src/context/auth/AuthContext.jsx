"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("owner_token");
    const raw = localStorage.getItem("owner_user");
    if (token && raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("owner_token");
        localStorage.removeItem("owner_user");
      }
    }
    setLoading(false);
  }, []);

  const isLoggedIn = !!user;

  const login = useCallback((token, userData) => {
    localStorage.setItem("owner_token", token);
    localStorage.setItem("owner_user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("owner_token");
    localStorage.removeItem("owner_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
