"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
// import api from '../../../service/api'
import Link from "next/link";
// import toastService from '../../../service/toast'
import { useToast } from "@/context/toast/toast-provider";
import api from "@/service/api";
// import "../style.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldownMessage, setCooldownMessage] = useState("");
  const { addToast } = useToast();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCooldownMessage("");

    try {
      const { data } = await api.post("/api/auth/forgot-password", { email });

      setSuccess(true);
      addToast(data.message || "Reset link sent to your email", "success");
    } catch (err) {
      if (err.response?.status === 429) {
        setCooldownMessage(err.response.data.error);
      } else {
        addToast(
          err.response?.data?.error || "Failed to send reset link",
          "error",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-card">
        {/* SUCCESS */}
        {success ? (
          <>
            <div className="auth-head">
              <h1>
                EMAIL <em>SENT</em>
              </h1>
              <p>Check your inbox for reset link</p>
            </div>

            <div className="auth-success">
              If the email exists, a reset link has been sent.
            </div>

            <Link href="/auth/login" className="btn-submit">
              Back to Login
            </Link>
          </>
        ) : (
          <>
            {/* HEADER */}
            <div className="auth-head">
              <h1>
                FORGOT
                <em>PASSWORD</em>
              </h1>
              <p>Enter your email to receive a reset link</p>
            </div>

            <form onSubmit={submit}>
              {/* EMAIL */}
              <div className="f-group">
                <label className="f-label">Email Address</label>
                <input
                  type="email"
                  className="f-input"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* ERROR / COOLDOWN */}
              {cooldownMessage && (
                <div className="auth-error">{cooldownMessage}</div>
              )}

              {/* SUBMIT */}
              <button className="btn-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              {/* BACK LINK */}
              <div className="form-bottom">
                <p>
                  Back to <Link href="/auth/login">Login →</Link>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
