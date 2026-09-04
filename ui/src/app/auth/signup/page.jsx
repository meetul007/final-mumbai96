"use client";

import { useState } from "react";
import Link from "next/link";
// import "./style.css";
import { useToast } from "@/context/toast/toast-provider";
import { useRouter } from "next/navigation";
import api from "@/service/api";

export default function SignupPage() {
  const router = useRouter();

  const { addToast } = useToast();

  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    area: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ================= VALIDATION ================= */

  const validate = () => {
    const e = {};

    if (!form.fname) e.fname = true;
    if (!form.lname) e.lname = true;

    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = true;

    if (form.password.length < 8) e.password = true;

    if (form.password !== form.confirm) e.confirm = true;

    if (!form.terms) e.terms = true;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= PASSWORD STRENGTH ================= */

  const getStrength = () => {
    const p = form.password;
    let score = 0;

    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;

    return score;
  };

  const strengthLabel = ["Weak", "Okay", "Good", "Strong"];

  const googleAuth = () => {
    console.log("Google Signup");
  };

  const strength = getStrength();

  const submitSignup = async (e) => {
    e.preventDefault();
    console.log(validate(), "validate()");
    if (!validate()) return;

    try {
      // setLoading(true);
      setErrors("");

      await api.post("/api/auth/register", {
        fname: form.fname,
        email: form.email,
        password: form.password,
        lname: form.lname,
        phone: form.phone,
        area: form.area,
      });

      router.push("/auth/login");
    } catch (err) {
      console.log(err, "===");
      addToast(err.response?.data?.error || "Registration failed", "error");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="page">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <div className="form-card">
          {/* <div className="form-head">
            <h1>
              JOIN
              <br />
              <em>MUMBAI96.</em>
            </h1>

            <p>
              Already have an account?{" "}
              <Link href="/auth/login">Login here →</Link>
            </p>
          </div>

          <button className="btn-google" onClick={googleAuth}>
            Sign Up with Google
          </button> */}

          {/* BADGES */}
          <div className="badge-row">
            <span className="benefit-badge">✅ Free Forever</span>
            <span className="benefit-badge">🔒 No Spam</span>
            <span className="benefit-badge">⚡ 2 Min Setup</span>
          </div>

          <div className="or-divider">
            <span>or sign up with email</span>
          </div>

          {/* NAME */}
          <div className="f-row-2">
            <div className="f-group">
              <label className="f-label">First Name</label>
              <input
                className="f-input"
                value={form.fname}
                onChange={(e) => update("fname", e.target.value)}
              />
              {errors.fname && <div className="f-error">Required.</div>}
            </div>

            <div className="f-group">
              <label className="f-label">Last Name</label>
              <input
                className="f-input"
                value={form.lname}
                onChange={(e) => update("lname", e.target.value)}
              />
              {errors.lname && <div className="f-error">Required.</div>}
            </div>
          </div>

          {/* EMAIL */}
          <div className="f-group">
            <label className="f-label">Email</label>
            <input
              className="f-input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <div className="f-error">Invalid email</div>}
          </div>

          {/* PHONE */}
          <div className="f-group">
            <label className="f-label">Mobile</label>
            <input
              className="f-input"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          {/* AREA */}
          <div className="f-group">
            <label className="f-label">Your Area</label>
            <select
              className="f-select"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
            >
              <option value="">Select</option>
              <option>Borivali West</option>
              <option>Andheri West</option>
              <option>Dadar West</option>
              <option>Powai</option>
            </select>
          </div>

          {/* PASSWORD */}
          <div className="f-group">
            <label className="f-label">Password</label>

            <div className="f-pass-wrap">
              <input
                className="f-input"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />

              <button
                type="button"
                className="f-pass-eye"
                onClick={() => setShowPass(!showPass)}
              >
                👁
              </button>
            </div>

            {/* STRENGTH */}
            <div className="strength-bar">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="sb-seg"
                  style={{
                    background:
                      i < strength ? "#22c55e" : "rgba(255,255,255,.1)",
                  }}
                />
              ))}
            </div>

            <div className="strength-label">
              {form.password
                ? strengthLabel[strength - 1] || "Weak"
                : "Enter a password"}
            </div>

            {errors.password && <div className="f-error">Min 8 characters</div>}
          </div>

          {/* CONFIRM */}
          <div className="f-group">
            <label className="f-label">Confirm Password</label>

            <div className="f-pass-wrap">
              <input
                className="f-input"
                type={showPass2 ? "text" : "password"}
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
              />

              <button
                type="button"
                className="f-pass-eye"
                onClick={() => setShowPass2(!showPass2)}
              >
                👁
              </button>
            </div>

            {errors.confirm && (
              <div className="f-error">Passwords do not match</div>
            )}
          </div>

          {/* TERMS */}
          <label className="f-check">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => update("terms", e.target.checked)}
            />
            <span>
              I agree to <Link href="/terms">Terms</Link> &{" "}
              <Link href="/privacy">Privacy</Link>
            </span>
          </label>

          {errors.terms && <div className="f-error">Accept terms</div>}

          {/* SUBMIT */}
          <button className="btn-submit" onClick={submitSignup}>
            Create Free Account
          </button>

          <div className="form-bottom">
            <p>
              Already a Mumbaikar? <Link href="/auth/login">Login →</Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-deco">
        <div className="rd-watermark">96</div>

        <div className="rd-kicker">Why Join Mumbai96</div>

        <h2 className="rd-title">
          YOUR CITY.
          <br />
          YOUR ACCOUNT.
          <br />
          <em>FREE.</em>
        </h2>

        <p className="rd-desc">
          Join thousands of Mumbaikars who have already made Mumbai96 their
          home. It takes 2 minutes and costs absolutely nothing.
        </p>

        <div className="steps">
          {[
            {
              num: "01",
              title: "Create Your Account",
              desc: "Sign up in 2 minutes with email or Google. Completely free.",
            },
            // {
            //   num: "02",
            //   title: "Add Your Listing",
            //   desc: "List your business, service or property — zero cost, zero catch.",
            // },
            {
              num: "02",
              title: "Connect With Your Neighbourhood",
              desc: "Join meetups, follow local stories and become part of the community.",
            },
            {
              num: "03",
              title: "Grow & Thrive",
              desc: "Get discovered by Mumbaikars in your area and across the city.",
            },
          ].map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>

              <div className="step-text">
                <strong>{step.title}</strong>
                <span>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
