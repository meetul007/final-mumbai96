"use client";

import api from "@/service/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("owner_token");

      if (!token) {
        router.replace("/auth/login");
        return;
      }

      try {
        await api.get("/owner/profile");
        setLoading(false);
      } catch {
        localStorage.removeItem("owner_token");
        router.replace("/auth/login");
      }
    };

    verify();
  }, [router]);

  // prevent flicker
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return children;
}
