"use client";

import { useState } from "react";

// import "./contact.css";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [urgency, setUrgency] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  return (
    <section className="main-wrap">
      <div className="con">
        <div className="main-grid">
          {/* FORM */}
          <div>
            <div className="form-shell rv">
              {/* Progress */}
              <div className="form-progress">
                <div
                  className="form-progress-fill"
                  style={{
                    width:
                      step === 1
                        ? "33%"
                        : step === 2
                          ? "66%"
                          : step === 3
                            ? "100%"
                            : "100%",
                  }}
                ></div>
              </div>

              {/* STEP 1 */}
              <div
                id="step1"
                style={{ display: step === 1 ? "block" : "none" }}
              >
                <div className="form-hd">
                  <h2>
                    WHAT CAN WE
                    <br />
                    HELP YOU WITH?
                  </h2>
                </div>

                <div className="form-body">
                  <div className="cat-grid">
                    {[
                      ["listing", "🏢", "Business Listing"],
                      ["fraud", "🚨", "Report Fraud / Scam"],
                      ["partnership", "🤝", "Partnership"],
                      ["press", "📰", "Press & Media"],
                      ["community", "🌆", "Community"],
                      ["safety", "🛡️", "Safety"],
                      ["technical", "⚙️", "Technical"],
                      ["hello", "👋", "Hello"],
                    ].map(([key, icon, title]) => (
                      <div
                        key={key}
                        className={`cat-card ${category === key ? "active" : ""}`}
                        data-cat={key}
                        onClick={() => setCategory(key)}
                      >
                        <span className="cat-card-icon">{icon}</span>
                        <div className="cat-card-title">{title}</div>
                      </div>
                    ))}
                  </div>

                  <div className="form-nav">
                    <button
                      className="btn-next"
                      style={{ flex: 1 }}
                      onClick={() => {
                        if (!category) return;
                        setStep(2);
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div
                id="step2"
                style={{ display: step === 2 ? "block" : "none" }}
              >
                <div className="form-hd">
                  <h2>TELL US MORE</h2>
                </div>

                <div className="form-body">
                  {/* Name */}
                  <div className="fg-row">
                    <div className="fg">
                      <label>First Name</label>
                      <input className="fi" type="text" />
                    </div>
                    <div className="fg">
                      <label>Last Name</label>
                      <input className="fi" type="text" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="fg-row">
                    <div className="fg">
                      <label>Email</label>
                      <input className="fi" type="email" />
                    </div>
                    <div className="fg">
                      <label>Phone</label>
                      <input className="fi" type="tel" />
                    </div>
                  </div>

                  {/* CONDITIONAL */}
                  <div
                    className="cond-section"
                    style={{
                      display: category === "listing" ? "block" : "none",
                    }}
                  >
                    <div className="fg">
                      <label>Business Name</label>
                      <input className="fi" type="text" />
                    </div>
                  </div>

                  <div
                    className="cond-section"
                    style={{
                      display: category === "fraud" ? "block" : "none",
                    }}
                  >
                    <div className="fg">
                      <label>Fraud Type</label>
                      <input className="fi" type="text" />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="cond-section">
                    <div className="urgency-row">
                      {["low", "medium", "high"].map((u) => (
                        <button
                          key={u}
                          className={`urgency-btn ${urgency === u ? "active" : ""}`}
                          onClick={() => setUrgency(u)}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-nav">
                    <button className="btn-prev" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button className="btn-next" onClick={() => setStep(3)}>
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              {/* STEP 3 */}
              <div
                id="step3"
                style={{ display: step === 3 ? "block" : "none" }}
              >
                <div className="form-hd">
                  <h2>YOUR MESSAGE</h2>
                </div>

                <div className="form-body">
                  {/* Message */}
                  <div className="fg">
                    <textarea
                      className="ft"
                      maxLength={1000}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <span className="char-count">{message.length}/1000</span>
                  </div>

                  {/* Rating */}
                  <div className="star-row">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <span
                        key={r}
                        className={`star-btn ${rating >= r ? "active" : ""}`}
                        onClick={() => setRating(r)}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>

                  {/* File Upload */}
                  <div
                    className="file-drop"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => setFiles([...e.target.files])}
                    />
                    <p>Upload Files</p>
                  </div>

                  <div className="form-nav">
                    <button className="btn-prev" onClick={() => setStep(2)}>
                      Back
                    </button>
                    <button
                      className="btn-next"
                      onClick={() => setStep("success")}
                    >
                      Send →
                    </button>
                  </div>
                </div>
              </div>

              {/* SUCCESS */}
              <div
                id="successState"
                className="success-state"
                style={{ display: step === "success" ? "block" : "none" }}
              >
                <div className="success-title">
                  MESSAGE <em>SENT!</em>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR (UNCHANGED) */}
          <div className="sidebar rv d2">
            {/* Map */}
            <div className="map-card">
              <div
                className="map-dot"
                style={{ top: "38%", left: "45%" }}
              ></div>
              <div className="map-label">96 Neighbourhoods · Mumbai</div>
            </div>

            {/* Email */}
            <div className="contact-card">
              <div className="cc-head">
                <div
                  className="cc-icon"
                  style={{ background: "rgba(255,107,0,.1)" }}
                >
                  📧
                </div>
                <div>
                  <div className="cc-title">General Enquiries</div>
                  <div className="cc-sub">Email our team directly</div>
                </div>
              </div>
              <div className="cc-val">hello@mumbai96.com</div>
              <div className="cc-time">Mon – Sat · Reply within 24 hrs</div>
              <a href="mailto:hello@mumbai96.com" className="cc-action">
                Send Email →
              </a>
            </div>

            {/* WhatsApp */}
            <div className="contact-card">
              <div className="cc-head">
                <div
                  className="cc-icon"
                  style={{ background: "rgba(37,211,102,.1)" }}
                >
                  💬
                </div>
                <div>
                  <div className="cc-title">WhatsApp</div>
                  <div className="cc-sub">Quick queries only</div>
                </div>
              </div>
              <div className="cc-val">+91 99999 99996</div>
              <div className="cc-time">Mon – Sat · 10am to 7pm IST</div>
              <a
                href="https://wa.me/919999999996"
                className="cc-action"
                style={{ color: "#25D366" }}
              >
                Chat Now →
              </a>
            </div>

            {/* Fraud */}
            <div className="contact-card">
              <div className="cc-head">
                <div
                  className="cc-icon"
                  style={{ background: "rgba(16,185,129,.1)" }}
                >
                  🚨
                </div>
                <div>
                  <div className="cc-title">Report Fraud / Safety</div>
                  <div className="cc-sub">Anonymous & fast-tracked</div>
                </div>
              </div>
              <div className="cc-val">report@mumbai96.com</div>
              <div className="cc-time">Reviewed within 24 hours</div>
              <a
                href="/report-fraud-scam"
                className="cc-action"
                style={{ color: "#10B981" }}
              >
                Report Now →
              </a>
            </div>

            {/* Press */}
            <div className="contact-card">
              <div className="cc-head">
                <div
                  className="cc-icon"
                  style={{ background: "rgba(99,102,241,.1)" }}
                >
                  📰
                </div>
                <div>
                  <div className="cc-title">Press & Media</div>
                  <div className="cc-sub">For journalists & bloggers</div>
                </div>
              </div>
              <div className="cc-val">press@mumbai96.com</div>
              <div className="cc-time">Priority response</div>
              <a
                href="mailto:press@mumbai96.com"
                className="cc-action"
                style={{ color: "#6366F1" }}
              >
                Get in Touch →
              </a>
            </div>

            {/* Hours */}
            <div className="hours-card">
              <h4>Response Hours</h4>

              <div className="hour-row">
                <span className="hour-day">
                  <span className="hour-dot"></span>Monday – Friday
                </span>
                <span className="hour-time">9am – 8pm</span>
              </div>

              <div className="hour-row">
                <span className="hour-day">
                  <span className="hour-dot"></span>Saturday
                </span>
                <span className="hour-time">10am – 6pm</span>
              </div>

              <div className="hour-row">
                <span className="hour-day" style={{ color: "var(--muted)" }}>
                  Sunday
                </span>
                <span className="hour-closed">Closed</span>
              </div>

              <div className="hour-row">
                <span
                  className="hour-day"
                  style={{ color: "rgba(255,255,255,.4)" }}
                >
                  Public Holidays
                </span>
                <span className="hour-closed">Closed</span>
              </div>
            </div>

            {/* Team */}
            <div className="team-card">
              <h4>Right Team, Right Query</h4>

              <div className="team-member">
                <div className="tm-avatar" style={{ background: "var(--red)" }}>
                  LS
                </div>
                <div>
                  <div className="tm-name">Listings Team</div>
                  <div className="tm-role">Business listings & edits</div>
                  <div className="tm-mail">listings@mumbai96.com</div>
                </div>
              </div>

              <div className="team-member">
                <div
                  className="tm-avatar"
                  style={{ background: "var(--gold)", color: "#111" }}
                >
                  PT
                </div>
                <div>
                  <div className="tm-name">Partnerships</div>
                  <div className="tm-role">Collaborations & sponsors</div>
                  <div className="tm-mail">partners@mumbai96.com</div>
                </div>
              </div>

              <div className="team-member">
                <div className="tm-avatar" style={{ background: "#6366F1" }}>
                  PR
                </div>
                <div>
                  <div className="tm-name">Press Office</div>
                  <div className="tm-role">Media & interviews</div>
                  <div className="tm-mail">press@mumbai96.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
