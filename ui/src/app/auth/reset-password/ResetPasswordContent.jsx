"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/context/toast/toast-provider";
import api from "@/service/api";
import "../style.css";

export default function ResetPasswordContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { addToast } = useToast();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!token) {
      toastService.error("Invalid reset link");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/reset-password", {
        token,
        password,
      });

      addToast("Password updated successfully", "success");
      router.push("/auth/login");
    } catch (err) {
      addToast(
        err.response?.data?.error || "Failed to reset password",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="auth-card">
        <div className="auth-head">
          <h1>
            RESET
            <em>PASSWORD</em>
          </h1>
          <p>Create a strong password for your account</p>
        </div>

        <form onSubmit={submit}>
          <div className="f-group">
            <label className="f-label">New Password</label>
            <input
              type="password"
              className="f-input"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </section>
  );
}
