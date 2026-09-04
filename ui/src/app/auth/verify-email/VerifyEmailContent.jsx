"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// import api from '../../../service/api'
// import toastService from '../../../service/toast'
import Link from "next/link";
import { useToast } from "@/context/toast/toast-provider";
import api from "@/service/api";
import "../style.css";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  const verifyEmail = useCallback(async () => {
    try {
      await api.post("/api/auth/verify-email", { token });
      setVerified(true);
      addToast("Email verified successfully", "success");
    } catch (err) {
      addToast(
        err.response?.data?.error || "Verification failed or expired",
        "error",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    verifyEmail();
  }, [token, verifyEmail]);

  return (
    <>
      <div className="page">
        <div className="auth-card">
          <div className="auth-head">
            <h1>EMAIL VERIFICATION</h1>
            <p>Securing your Mumbai96 account</p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="auth-center">
              <div className="auth-spinner"></div>
              <p className="auth-text">Verifying your email...</p>
            </div>
          )}

          {/* SUCCESS */}
          {!loading && verified && (
            <div>
              <div className="auth-center" style={{ paddingBottom: "20px" }}>
                <div className="auth-icon success">✅</div>

                <p className="auth-title">Email Verified Successfully 🎉</p>
                <p className="auth-text">You can now login to your account.</p>
              </div>
              <Link href="/auth/login" className="btn-submit">
                Go to Login
              </Link>
            </div>
          )}

          {/* FAILED */}
          {!loading && !verified && (
            <>
              <div>
                <div className="auth-center" style={{ paddingBottom: "20px" }}>
                  <div className="auth-icon error">⚠️</div>

                  <p className="auth-title">Verification Failed</p>
                  <p className="auth-text">
                    The link may be expired or invalid.
                  </p>
                </div>
                <Link href="/auth/resend-verification" className="btn-submit">
                  Resend Verification
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
