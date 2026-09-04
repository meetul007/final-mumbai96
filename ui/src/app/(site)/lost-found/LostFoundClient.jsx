"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./style.css";
import { useAuth } from "@/context/auth/AuthContext";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const AREAS = ["Andheri","Bandra","Borivali","Chembur","Churchgate / Fort","Colaba","Dadar","Dahisar","Dharavi","Ghatkopar","Goregaon","Juhu","Kandivali","Kurla","Lower Parel","Malad","Matunga","Mulund","Powai","Santacruz","Sion","Thane (nearby)","Versova","Vikhroli","Vile Parle","Wadala","Worli","Other",];
const CATEGORIES = ["Phone / Electronics","Wallet / Purse","Keys","Pet / Animal","Documents (Aadhaar/PAN etc)","Bag / Luggage","Jewellery","Vehicle","Other",];
const quickLinks = [
  { href: "/coop-society-mumbai", icon: "🏘️", label: "Co-op Society Bye Laws" },
  { href: "/lift-licence-mumbai", icon: "🛗", label: "Lift Licence & Renewal" },
  { href: "/property-tax-mumbai", icon: "🏦", label: "Property Tax Payment" },
  { href: "/mhada-lottery-mumbai", icon: "🏗️", label: "MHADA Lottery 2026" },
  { href: "/mumbai-exhibitions", icon: "🎪", label: "Mumbai Exhibitions 2026" },
  { href: "/save-electricity-mumbai", icon: "⚡", label: "Save Electricity Mumbai" },
  { href: "/coop-society-imp-mumbai", icon: "🏢", label: "Society IMP Guide" },
  { href: "/mumbai-lost-found", icon: "🔍", label: "Mumbai Lost & Found" },
  { href: "/mumbai-voice", icon: "🗣️", label: "Mumbai Voice — Polls & Opinions" },
  { href: "/mumbai-reviews", icon: "⭐", label: "Mumbai Reviews — Rate & Share" },
  { href: "/ngos-mumbai", icon: "🤝", label: "Verified NGOs Mumbai" },
  { href: "/women-empowerment-mumbai", icon: "👩", label: "Women Empowerment" },
];
const CAT_THUMBS = {
  "Phone / Electronics": { emoji: "📱", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  "Wallet / Purse": { emoji: "👛", bg: "linear-gradient(135deg,#f093fb,#f5576c)" },
  "Keys": { emoji: "🔑", bg: "linear-gradient(135deg,#4facfe,#00f2fe)" },
  "Pet / Animal": { emoji: "🐾", bg: "linear-gradient(135deg,#43e97b,#38f9d7)" },
  "Documents (Aadhaar/PAN etc)": { emoji: "📄", bg: "linear-gradient(135deg,#fa709a,#fee140)" },
  "Bag / Luggage": { emoji: "🎒", bg: "linear-gradient(135deg,#a18cd1,#fbc2eb)" },
  "Jewellery": { emoji: "💎", bg: "linear-gradient(135deg,#ffecd2,#fcb69f)" },
  "Vehicle": { emoji: "🚗", bg: "linear-gradient(135deg,#89f7fe,#66a6ff)" },
  "Other": { emoji: "📦", bg: "linear-gradient(135deg,#c3cfe2,#f5f7fa)" },
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function HeroFormCard({ formExpanded, formType, handover, formData, submitting, successMsg, setType, setHandoverType, handleInput, submitListing, formRef }) {
  return (
    <div className="hero-form-card" ref={formRef}>
      <h3>📋 Submit a Listing</h3>
      <p>Fill in details below. Your listing will appear on the board immediately. Contact info is shown only to other users — not indexed by search engines.</p>
      <div className="hero-card-top">
        <div className="radio-group" style={{ marginBottom: 0 }}>
          <div className={"radio-opt" + (formType === "lost" ? " sel-lost" : "")} onClick={() => setType("lost")}>🔴 I Lost Something</div>
          <div className={"radio-opt" + (formType === "found" ? " sel-found" : "")} onClick={() => setType("found")}>🟢 I Found Something</div>
        </div>
      </div>
      <div className={"hero-form-fields" + (formExpanded ? " open" : "")}>
        <div className="hff-inner">
          <div className="form-row" style={{ marginTop: "16px" }}>
            <div className="form-group"><label className="form-label">What Item?</label><input className="form-input" id="item_name" value={formData.item_name} onChange={handleInput} placeholder="e.g. iPhone 14, Dog, Wallet, Keys" /></div>
            <div className="form-group"><label className="form-label">Category</label>
              <select className="form-select" id="category" value={formData.category} onChange={handleInput}>
                <option value="">Select Category</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Area / Location in Mumbai</label>
              <select className="form-select" id="area" value={formData.area} onChange={handleInput}>
                <option value="">Select Area</option>
                {AREAS.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Date Lost / Found</label><input className="form-input" id="date_lost_found" type="date" value={formData.date_lost_found} onChange={handleInput} /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-textarea" id="description" value={formData.description} onChange={handleInput} placeholder="Details — colour, brand, identifying marks, last known location…" /></div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Your Name / Initials</label><input className="form-input" id="reporter_name" value={formData.reporter_name} onChange={handleInput} placeholder="e.g. Rahul M." /></div>
            <div className="form-group"><label className="form-label">Contact (Phone / Email)</label><input className="form-input" id="contact_info" value={formData.contact_info} onChange={handleInput} placeholder="Not indexed by search engines" /></div>
          </div>
          {formType === "found" && <div className="handover-section">
            <div className="handover-section-title">🛡️ Where is the item now? <span style={{ fontWeight: 300, textTransform: "none", letterSpacing: 0, fontSize: "10px", color: "#4B5563" }}>(protects your privacy)</span></div>
            <div className="handover-opts">
              <div className={"handover-opt" + (handover === "self" ? " active" : "")} onClick={() => setHandoverType("self")}>🙋 I'm Holding It</div>
              <div className={"handover-opt" + (handover === "police" ? " active" : "")} onClick={() => setHandoverType("police")}>🏛️ Handed to Police</div>
              <div className={"handover-opt" + (handover === "security" ? " active" : "")} onClick={() => setHandoverType("security")}>🏢 Handed to Security</div>
            </div>
            <div className={"handover-location-wrap" + (handover !== "self" ? " show" : "")}>
              <div className="form-group" style={{ marginBottom: 0, marginTop: "12px" }}>
                <label className="form-label" id="handoverLocationLabel">{handover === "police" ? "Police Station Name" : "Mall / Venue Name"}</label>
                <input className="form-input" id="handover_location" value={formData.handover_location} onChange={handleInput} placeholder={handover === "police" ? "e.g. Andheri Police Station" : "e.g. Phoenix Palladium Security Desk"} />
              </div>
            </div>
          </div>}
          {successMsg && <div className="success-msg" style={{ margin: "12px 0 0", fontSize: "13px", fontWeight: 700 }}>{successMsg}</div>}
          <button className="hero-post-btn" onClick={submitListing} disabled={submitting} style={{ background: "var(--red)", marginTop: "16px" }}>{submitting ? "Submitting…" : "📋 Submit Listing"}</button>
        </div>
      </div>
    </div>
  );
}

function ListingModal({ modalListing, setModalListing, claimForm, setClaimForm, fetchListings }) {
  const l = modalListing;
  if (!l) return null;
  const isLost = l.type === "lost";
  const th = CAT_THUMBS[l.category] || CAT_THUMBS["Other"];

  const hmap = {
    self:     { icon: "🙋", cls: "self",     title: "Item is with the Finder",       desc: "The finder is personally holding this item. Contact them directly." },
    police:   { icon: "🏛️", cls: "police",   title: "Handed to Police Station",      desc: "This item has been submitted to a police station. Bring proof of ownership to claim." },
    security: { icon: "🏢", cls: "security", title: "Handed to Security / Venue",    desc: "This item is with the security desk of a mall or venue. Carry your ID and proof." },
  };
  const hm = l.status === "claimed"
    ? { icon: "✅", cls: "claimed", title: "Item Already Claimed", desc: "This item has been successfully returned to its owner." }
    : (hmap[l.handover] || hmap.self);

  const locLine = l.handover !== "self" && l.handover_location && l.status !== "claimed"
    ? <div className="mhb-location">📍 {l.handover_location}</div>
    : null;

  const hbox = !isLost && (
    <div className={"modal-handover-box " + hm.cls}>
      <div className="mhb-icon">{hm.icon}</div>
      <div>
        <div className="mhb-title">{hm.title}</div>
        <div className="mhb-desc">{hm.desc}</div>
        {locLine}
      </div>
    </div>
  );

  return (
    <div className={"modal-overlay" + (l ? " open" : "")} onClick={() => setModalListing(null)}>
      <div className="modal-backdrop"></div>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-thumb-banner" style={{ background: th.bg }}>
            <span style={{ fontSize: "5.5rem", lineHeight: 1 }}>{th.emoji}</span>
            <span className={"modal-type-badge " + l.type}>{isLost ? "🔴 LOST" : "🟢 FOUND"}</span>
            <button className="modal-close" onClick={() => setModalListing(null)}>✕</button>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-item-name">{l.item_name}</div>
          <div className="modal-meta-row">
            <span className="modal-meta-chip">📍 {l.area}</span>
            <span className="modal-meta-chip">🏷️ {l.category}</span>
          </div>
          <div className="modal-section">
            <div className="modal-section-label">Description</div>
            <div className="modal-section-val">{l.description || "No description provided."}</div>
          </div>
          {hbox}
          <div className="modal-divider"></div>
          <div className="modal-contact-box">
            <div className="mcb-col">
              <div className="mcb-label">Location</div>
              <div className="mcb-val">{l.area}</div>
              <div className="mcb-sub">{formatDate(l.date_lost_found)}</div>
            </div>
            <div className="mcb-col">
              <div className="mcb-label">Posted By</div>
              <div className="mcb-val">{l.reporter_name}</div>
              <div className="mcb-sub">{formatDate(l.date_lost_found)}</div>
            </div>
            <div className="mcb-col">
              <div className="mcb-label">Contact</div>
              <div className="mcb-val">{l.contact_info}</div>
            </div>
          </div>

          {!isLost && l.status !== "claimed" && !claimForm.show && (
            <button className="claim-btn" onClick={() => {
              if (!requireAuth()) return;
              setClaimForm({ show: true, name: "", contact: "" });
            }}>
              🙋 This is Mine — Claim
            </button>
          )}
          {!isLost && l.status !== "claimed" && claimForm.show && (
            <div className="claim-form show">
              <div className="claim-form-title">🔐 Prove Ownership — Your details stay private</div>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input className="form-input" placeholder="Your full name" value={claimForm.name} onChange={e => setClaimForm({ ...claimForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Your Contact</label>
                <input className="form-input" placeholder="Phone or email" value={claimForm.contact} onChange={e => setClaimForm({ ...claimForm, contact: e.target.value })} />
              </div>
              <div className="form-group" style={{ marginBottom: "12px" }}>
                <label className="form-label">Proof of Ownership</label>
                <textarea className="form-textarea" id="claimProof" placeholder="Describe your proof — e.g. purchase receipt, IMEI number, photo, serial number, distinguishing marks..." style={{ minHeight: "80px" }} />
              </div>
              <button className="hero-post-btn" onClick={async () => {
                if (!claimForm.name || !claimForm.contact) { alert("Please fill in all fields."); return; }
                try {
                  await fetch(`${API}/api/public/lost-found/${l.id}/claim`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ claimant_name: claimForm.name, claimant_contact: claimForm.contact })
                  });
                } catch (e) {}
                setModalListing(null);
                setClaimForm({ show: false, name: "", contact: "" });
                fetchListings();
              }} style={{ background: "var(--green)", width: "100%", justifyContent: "center" }}>✅ Submit My Claim</button>
            </div>
          )}
          {!isLost && l.status === "claim_requested" && (
            <button className="claim-btn pending" disabled>⏳ Claim Already Submitted</button>
          )}
          {!isLost && l.status === "claimed" && (
            <button className="claim-btn" disabled style={{ background: "#9ca3af" }}>✅ Already Claimed</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LostFoundClient({ initialListings = [] }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [listings, setListings] = useState(initialListings);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(initialListings.length === 0);
  const [currentTab, setCurrentTab] = useState("all");
  const [areaFilter, setAreaFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [formExpanded, setFormExpanded] = useState(false);
  const [formType, setFormType] = useState("");
  const [handover, setHandover] = useState("self");
  const [modalListing, setModalListing] = useState(null);
  const [formData, setFormData] = useState({ item_name: "", category: "", area: "", date_lost_found: "", description: "", reporter_name: "", contact_info: "", handover_location: "", });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [claimForm, setClaimForm] = useState({ show: false, name: "", contact: "" });
  const formRef = useRef(null);
  const initialLoaded = useRef(initialListings.length > 0);

  const requireAuth = () => {
    if (!isLoggedIn) {
      const path = window.location.pathname + window.location.search;
      router.push(`/auth/login?redirect=${encodeURIComponent(path)}`);
      return false;
    }
    return true;
  };

  const fetchListings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (currentTab !== "all") params.set("type", currentTab);
      if (areaFilter) params.set("area", areaFilter);
      if (catFilter) params.set("category", catFilter);
      const res = await fetch(`${API}/api/public/lost-found?${params}`);
      const data = await res.json();
      setListings(data.listings || []);
      setPagination(data.pagination || null);
    } catch { setListings([]); }
    setLoading(false);
  };

  useEffect(() => {
    if (initialLoaded.current) {
      initialLoaded.current = false;
      return;
    }
    fetchListings();
  }, [currentTab, areaFilter, catFilter]);

  const openForm = () => {
    setFormExpanded(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  };

  const setType = (t) => { setFormType(t); openForm(); };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const submitListing = async () => {
    if (!requireAuth()) return;
    if (!formType) { setSuccessMsg("❌ Please select 'I Lost Something' or 'I Found Something'"); return; }
    setSubmitting(true);
    try {
      const body = { type: formType, ...formData };
      if (formType !== "found") { delete body.handover; delete body.handover_location; }
      else { body.handover = handover; }
      const res = await fetch(`${API}/api/public/lost-found`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg("✅ Your listing has been posted! It will appear below in the community board.");
        setFormData({ item_name: "", category: "", area: "", date_lost_found: "", description: "", reporter_name: "", contact_info: "", handover_location: "" });
        setFormType("");
        setFormExpanded(false);
        fetchListings();
        setTimeout(() => setSuccessMsg(""), 5000);
      } else {
        setSuccessMsg("❌ " + (data.error || "Failed to submit"));
      }
    } catch { setSuccessMsg("❌ Network error. Please try again."); }
    setSubmitting(false);
  };

  const pageListing = (idx) => {
    const l = listings[idx];
    if (!l) return;
    const isLost = l.type === "lost";
    const th = CAT_THUMBS[l.category] || CAT_THUMBS["Other"];
    return (
      <div key={l.id || idx} className={"listing-card " + l.type} onClick={() => {
        fetch(`${API}/api/public/lost-found?type=all&per_page=1`).then(r => r.json()).then(data => {
          const found = data.listings?.find(x => x.id === l.id);
          setModalListing(found || l);
        }).catch(() => setModalListing(l));
      }}>
        <div className="lc-thumb" style={{ background: th.bg }}>
          {th.emoji}
          <div className="lc-thumb-label" style={{ background: isLost ? "rgba(255,107,0,0.8)" : "rgba(5,150,105,0.8)", color: "#fff" }}>
            {isLost ? "LOST" : "FOUND"}
          </div>
        </div>
        <div className="lc-body">
          <div className={"lc-badge " + l.type}>{isLost ? "🔴 Lost" : "🟢 Found"}</div>
          <div className="lc-title">{l.item_name}</div>
          <div className="lc-area">📍 {l.area}</div>
          {l.description && <div className="lc-desc">{l.description.substring(0, 80)}{l.description.length > 80 ? "..." : ""}</div>}
          <div className="lc-contact">{l.reporter_name}</div>
          {l.date_lost_found && <div className="lc-date">{formatDate(l.date_lost_found)}</div>}
          <div style={{ display: "flex", gap: "4px", marginTop: "5px", flexWrap: "wrap" }}>
            <span className={"lc-status " + (l.status === "claimed" ? "claimed" : l.status === "claim_requested" ? "claim_requested" : l.handover || "self")}>
              {l.status === "claimed" ? "✅ Claimed" : l.status === "claim_requested" ? "⏳ Claim Req." : l.handover === "police" ? "🏛️ Police" : l.handover === "security" ? "🏢 Security" : "🙋 With Finder"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="lost-found-page">
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div className="ph-glow" style={{ background: "rgba(5,150,105,.12)", bottom: "-80px", left: "-80px" }}></div>
        <div className="ph-glow" style={{ background: "rgba(55,27,88,.3)", top: "-80px", right: "-80px" }}></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc"><Link href="/">Home</Link><span>/</span><span>Mumbai Lost & Found</span></div>
            <div className="ph-kicker">Mumbai96 · Community Board · Free Service</div>
            <h1 className="ph-h1">Mumbai <em>Lost</em> & Found <span className="gold">Board</span></h1>
            <p className="ph-desc">Free community board for all Mumbaikars — post a lost item or report something you found. Phones, keys, pets, wallets, documents — help connect Mumbai's community.</p>
            <HeroFormCard formExpanded={formExpanded} formType={formType} handover={handover} formData={formData} submitting={submitting} successMsg={successMsg} setType={setType} setHandoverType={setHandover} handleInput={handleInput} submitListing={submitListing} formRef={formRef} />
          </div>
        </div>
      </div>

      <div className="ph-bottom">
        <div className="con"><div className="ph-stats hide-mobile">
          <div className="phs"><div className="phs-n">{listings.filter(l => l.type === "lost").length}</div><div className="phs-l">Items Lost</div></div>
          <div className="phs"><div className="phs-n">{listings.filter(l => l.type === "found").length}</div><div className="phs-l">Items Found</div></div>
          <div className="phs"><div className="phs-n">{listings.filter(l => l.status === "claimed").length}</div><div className="phs-l">Reunited</div></div>
          <div className="phs"><div className="phs-n">{new Set(listings.map(l => l.area)).size}</div><div className="phs-l">Areas</div></div>
        </div></div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="lf-tabs"><span className={"lf-tab" + (currentTab === "all" ? " active" : "")} onClick={() => setCurrentTab("all")}>📋 All</span><span className={"lf-tab" + (currentTab === "lost" ? " active" : "")} onClick={() => setCurrentTab("lost")}>🔴 Lost</span><span className={"lf-tab" + (currentTab === "found" ? " active" : "")} onClick={() => setCurrentTab("found")}>🟢 Found</span><span className={"lf-tab" + (currentTab === "claimed" ? " active" : "")} onClick={() => setCurrentTab("claimed")}>✅ Claimed</span></div>
              <div className="filter-bar"><select className="filter-select" value={areaFilter} onChange={e => setAreaFilter(e.target.value)}><option value="">All Areas</option>{AREAS.map(a => <option key={a}>{a}</option>)}</select><select className="filter-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}><option value="">All Categories</option>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
              {loading ? <div className="board-loading">Loading listings…</div> : <div className="listing-grid">{listings.map((_, i) => pageListing(i))}</div>}
              {!loading && listings.length === 0 && <div className="empty-state"><div className="es-icon">🔍</div><p>No listings found. <br/>Be the first to post!</p></div>}
              {pagination?.pages > 1 && <div className="pagination-bar"><span>Page {pagination.page} of {pagination.pages}</span></div>}
            </main>
            <aside className="page-sidebar">
              <div className="sb-widget"><div className="sbw-head">📋 Quick <em>Links</em></div><div className="sbw-body">{quickLinks.map(l => <Link key={l.href} href={l.href} className="quick-link"><div className="ql-icon">{l.icon}</div><div className="ql-text">{l.label}</div><div className="ql-arrow">→</div></Link>)}</div></div>
            </aside>
          </div>
        </div>
      </div>
      <ListingModal modalListing={modalListing} setModalListing={setModalListing} claimForm={claimForm} setClaimForm={setClaimForm} fetchListings={fetchListings} />
    </div>
  );
}
