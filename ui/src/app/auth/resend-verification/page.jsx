"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/context/toast/toast-provider";
import api from "@/service/api";
// import "../style.css";

export default function ResendVerification() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/resend-verification", {
        email,
      });

      setSuccess(true);
      setMessage(data.message || "Verification email sent successfully");
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to send email";
      setMessage(msg);
      addToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <div className="auth-card">
        <div className="auth-head">
          <h1>
            RESEND
            <em>VERIFICATION</em>
          </h1>
          <p>We’ll send a fresh verification link to your email</p>
        </div>

        {/* SUCCESS */}
        {success ? (
          <div className="auth-center">
            <div className="auth-icon success">✅</div>

            <p className="auth-title">Email Sent</p>
            <p className="auth-text">{message}</p>

            <p className="auth-text small">
              Please check your inbox and spam folder.
            </p>

            <Link href="/auth/login" className="btn-submit">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            {/* ERROR */}
            {/* {message && <div className="auth-error">{message}</div>} */}

            <form onSubmit={submit}>
              <div className="f-group">
                <label className="f-label">Email Address</label>
                <input
                  type="email"
                  className="f-input"
                  placeholder="email@site.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Sending..." : "Resend Verification Email"}
              </button>
            </form>

            <div className="form-bottom">
              <p>
                Back to <Link href="/auth/login">Login</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
