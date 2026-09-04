"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import { useAuth } from "@/context/auth/AuthContext";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";
const CATEGORIES = ["Property & Housing", "Transport & Commute", "Health & Medical", "Schools & Education", "Food & Restaurants", "Government & Civic", "Jobs & Business", "Safety & Legal", "Shopping & Services", "Community & Social"];

function catColor(c) {
  const m = {"Property & Housing":"var(--dark)","Transport & Commute":"#1565C0","Health & Medical":"var(--green)","Schools & Education":"#7C3AED","Food & Restaurants":"var(--red)","Government & Civic":"#B45309","Jobs & Business":"#0369A1","Safety & Legal":"#dc2626"};
  return m[c] || "var(--muted)";
}

export default function ForumClient({ initialQuestions = [] }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [questions, setQuestions] = useState(initialQuestions);
  const [loading, setLoading] = useState(initialQuestions.length === 0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const feedRef = useRef(null);

  const requireAuth = () => {
    if (!isLoggedIn) {
      const path = window.location.pathname + window.location.search;
      router.push(`/auth/login?redirect=${encodeURIComponent(path)}`);
      return false;
    }
    return true;
  };

  async function fetchQuestions(cat) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ per_page: 50 });
      if (cat) params.set("category", cat);
      const res = await fetch(`${API}/api/public/forum?${params}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions || []);
      }
    } catch (e) {}
    setLoading(false);
  }

  useEffect(() => {
    if (initialQuestions.length === 0) {
      fetchQuestions();
    }
  }, []);

  useEffect(() => {
    renderQuestions();
  }, [questions, categoryFilter]);

  function renderQuestions() {
    const feed = feedRef.current;
    if (!feed) return;
    let qs = questions;
    if (categoryFilter) qs = qs.filter(q => q.category === categoryFilter);
    if (qs.length === 0) {
      feed.innerHTML = '<div style="text-align:center;padding:32px;color:var(--muted);font-size:13px">No questions yet. Be the first to ask!</div>';
      return;
    }
    feed.innerHTML = qs.map(q => `<div style="background:#fff;border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:14px;transition:all .2s" onmouseover="this.style.boxShadow='0 4px 24px rgba(0,0,0,.08)'" onmouseout="this.style.boxShadow='none'">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px">
        <div style="width:36px;height:36px;border-radius:50%;background:${catColor(q.category)};display:flex;align-items:center;justify-content:center;color:#fff;font-size:.85rem;font-weight:800;flex-shrink:0">${(q.author_name||"?")[0].toUpperCase()}</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:800;color:var(--ink);margin-bottom:4px">${q.title}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span style="font-size:10px;font-weight:800;background:rgba(55,27,88,.08);color:var(--dark);padding:2px 8px;border-radius:100px">${q.category}</span>
            ${q.area?`<span style="font-size:10px;color:var(--muted);font-weight:600">📍 ${q.area}</span>`:""}
            <span style="font-size:10px;color:var(--muted)">by ${q.author_name||"Anonymous"} · ${q.created_at ? q.created_at.split("T")[0] : ""}</span>
          </div>
        </div>
      </div>
      ${q.body?`<div style="font-size:13px;color:#374151;font-weight:300;line-height:1.7;margin-bottom:12px;padding-left:46px">${q.body}</div>`:""}
      ${q.answers&&q.answers.length?`<div style="background:#f0f4ff;border-radius:10px;padding:14px;margin-left:46px">
        <div style="font-size:10px;font-weight:800;color:var(--dark);letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px">💬 ${q.answers.length} Answer${q.answers.length>1?"s":""}</div>
        ${q.answers.slice(0,2).map((a,i) => `<div style="font-size:12px;color:#374151;font-weight:300;line-height:1.7;padding:6px 0;border-bottom:1px solid rgba(55,27,88,.08)"><strong style="color:var(--dark)">${a.author_name||"Mumbaikar"}:</strong> ${a.text} <button onclick="window.markHelpful(${q.id},${a.id},this)" style="background:none;border:1px solid var(--border);border-radius:100px;padding:2px 10px;font-size:10px;font-weight:700;color:var(--muted);cursor:pointer;margin-left:8px;font-family:Sora,sans-serif">👍 ${a.helpful_count||0}</button></div>`).join("")}
      </div>`:`<div style="margin-left:46px;font-size:12px;color:var(--muted);font-weight:300">No answers yet — be the first Mumbaikar to help!</div>`}
      <div style="margin-top:10px;margin-left:46px"><button onclick='window.quickAnswer(${q.id})' style="background:none;border:1px solid var(--red);color:var(--red);border-radius:100px;padding:6px 14px;font-size:10px;font-weight:800;cursor:pointer;font-family:Sora,sans-serif;transition:all .2s" onmouseover="this.style.background='var(--red)';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='var(--red)'">💬 Answer This</button></div>
    </div>`).join("");
    updateTopics(qs);
  }

  function updateTopics(qs) {
    const cats = {};
    qs.forEach(q => { cats[q.category] = (cats[q.category] || 0) + 1; });
    const top = Object.entries(cats).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const el = document.getElementById("topTopics");
    if (!el) return;
    el.innerHTML = top.map(([c, n]) => `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border);align-items:center"><span style="font-size:11px;font-weight:700;color:var(--ink)">${c}</span><span style="font-size:10px;font-weight:800;color:var(--red)">${n}q</span></div>`).join("") || '<div style="font-size:12px;color:var(--muted)">Ask the first question!</div>';
  }

  async function postQuestion() {
    if (!requireAuth()) return;
    const t = document.getElementById("qTitle").value.trim();
    const c = document.getElementById("qCat").value;
    const n = document.getElementById("qName").value.trim() || "Anonymous Mumbaikar";
    const a = document.getElementById("qArea").value;
    const b = document.getElementById("qBody").value.trim();
    if (!t) { alert("Please enter your question"); return; }
    try {
      const res = await fetch(`${API}/api/public/forum`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: t, category: c || null, area: a || null, author_name: n, body: b || null }),
      });
      if (res.ok) {
        document.getElementById("qSuccess").style.display = "block";
        document.getElementById("qTitle").value = "";
        document.getElementById("qBody").value = "";
        setTimeout(() => { const el = document.getElementById("qSuccess"); if (el) el.style.display = "none"; }, 4000);
        fetchQuestions(categoryFilter);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to post question");
      }
    } catch (e) {
      alert("Network error. Please try again.");
    }
  }

  useEffect(() => {
    window.postQuestion = postQuestion;
    window.quickAnswer = async function(qid) {
      if (!isLoggedIn) {
        const path = window.location.pathname + window.location.search;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(path)}`;
        return;
      }
      const ans = prompt("Your answer (as a fellow Mumbaikar):");
      if (!ans || !ans.trim()) return;
      try {
        const res = await fetch(`${API}/api/public/forum/${qid}/answers`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: ans.trim(), author_name: "Mumbaikar" }),
        });
        if (res.ok) {
          fetchQuestions(categoryFilter);
        }
      } catch (e) {}
    };
    window.markHelpful = async function(qid, aid, btn) {
      if (!isLoggedIn) {
        const path = window.location.pathname + window.location.search;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(path)}`;
        return;
      }
      try {
        const res = await fetch(`${API}/api/public/forum/${qid}/answers/${aid}/helpful`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          btn.textContent = "👍 " + data.helpful_count;
          btn.disabled = true;
        }
      } catch (e) {}
    };
  }, [categoryFilter, isLoggedIn]);

  return (
    <>
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div className="ph-glow" style={{ background: "rgba(55, 27, 88, 0.3)", top: "-80px", right: "-80px" }}></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc"><Link href="/">Home</Link><span>/</span><span>Mumbai Forum</span></div>
            <div className="ph-kicker">Mumbai96 · Community · Q&A · Mumbaikar to Mumbaikar</div>
            <h1 className="ph-h1">Ask <em>Mumbai</em><br/><span className="gold">Anything</span></h1>
            <p className="ph-desc">Ask, answer, and share knowledge with fellow Mumbaikars. From traffic updates to property advice — get answers from people who know Mumbai best.</p>
          </div>
        </div>
        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs"><div className="phs-n">Community</div><div className="phs-l">Free to Ask & Answer</div></div>
              <div className="phs"><div className="phs-n">All</div><div className="phs-l">Topics</div></div>
              <div className="phs"><div className="phs-n">Free</div><div className="phs-l">Post & Answer — Always</div></div>
              <div className="phs"><div className="phs-n">Community</div><div className="phs-l">Powered by Real Mumbaikars</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="con">
          <div className="page-layout">
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Ask Mumbai</div>
                <h2 className="sec-title">Community <em>Questions</em> — Browse & Ask</h2>
                <p style={{fontSize:14,color:"#374151",fontWeight:300,lineHeight:1.9,marginBottom:20}}>This is Mumbai's community Q&A — ask anything about the city and get answers from fellow Mumbaikars. Every answered question helps thousands of others facing the same situation.</p>

                <div className="post-form" id="askForm">
                  <h3 style={{fontFamily:"Bebas Neue",fontSize:"1.5rem",letterSpacing:".04em",color:"var(--ink)",marginBottom:6}}>🙋 Ask a Mumbai Question</h3>
                  <p style={{fontSize:12,color:"var(--muted)",fontWeight:300,marginBottom:20}}>Get answers from real Mumbaikars. Free, community-powered. Please login to post a question.</p>
                  <div className="form-row-ask">
                    <div className="form-group">
                      <label className="form-label" htmlFor="qTitle">Your Question <span style={{color:"var(--red)"}}>*</span></label>
                      <input id="qTitle" className="form-input" placeholder="e.g. Best doctor for knee pain in Andheri?" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="qCat">Category</label>
                      <select id="qCat" className="form-select">
                        <option value="">Select Category</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="qBody">Details (Optional)</label>
                    <textarea id="qBody" className="form-textarea" placeholder="Add more context — which area, your budget, your specific situation..."></textarea>
                  </div>
                  <div className="form-row-ask">
                    <div className="form-group">
                      <label className="form-label" htmlFor="qName">Your Name</label>
                      <input id="qName" className="form-input" placeholder="Ananya, Mukesh M. or Anonymous" />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="qArea">Area in Mumbai</label>
                      <select id="qArea" className="form-select">
                        <option value="">Select Area</option>
                        <option>Andheri</option><option>Bandra</option><option>Borivali</option><option>Dadar</option>
                        <option>Ghatkopar</option><option>Goregaon</option><option>Kandivali</option><option>Kurla</option>
                        <option>Malad</option><option>Mulund</option><option>Powai</option><option>Santacruz</option>
                        <option>Thane</option><option>Vile Parle</option><option>Worli</option><option>South Mumbai</option><option>Other</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={postQuestion} style={{background:"var(--dark)",color:"#fff",padding:"13px 28px",borderRadius:100,fontSize:13,fontWeight:800,letterSpacing:".06em",border:"none",cursor:"pointer",fontFamily:"Sora",width:"100%"}} onMouseOver={e => e.target.style.background = "var(--red)"} onMouseOut={e => e.target.style.background = "var(--dark)"}>🙋 Post My Question</button>
                  <div id="qSuccess" style={{display:"none",background:"linear-gradient(135deg,rgba(5,150,105,.1),rgba(5,150,105,.05))",border:"1.5px solid rgba(5,150,105,.3)",borderRadius:12,padding:16,textAlign:"center",marginTop:12,fontSize:13,fontWeight:700,color:"var(--green)"}}>✅ Your question is live! Fellow Mumbaikars will answer soon.</div>
                </div>

                <div style={{marginTop:32}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:16}}>
                    <h3 style={{fontFamily:"Bebas Neue",fontSize:"1.4rem",color:"var(--ink)",letterSpacing:".04em"}}>Recent Questions</h3>
                    <select id="qCatFilter" onChange={e => { setCategoryFilter(e.target.value); fetchQuestions(e.target.value); }} className="form-select" style={{width:"auto",padding:"8px 14px"}} value={categoryFilter}>
                      <option value="">All Categories</option>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  {loading ? <div style={{textAlign:"center",padding:32,color:"var(--muted)"}}>Loading questions…</div> : <div id="qFeed" ref={feedRef}></div>}
                </div>

                <div className="prose rv" style={{marginTop:32}}>
                  <h2>Ask Mumbai — Community Q&A for Every Mumbaikar</h2>
                  <p>This forum exists because the best answers to Mumbai's questions come from Mumbaikars who have lived the answer — not from a search engine. The person who switched from Andheri to Borivali knows the commute reality better than any article. The parent whose child just went through RTE admission knows the process better than any guide.</p>
                  <h3>How This Forum Works</h3>
                  <p>Post your question — about anything Mumbai. Transport, housing, schools, doctors, food, civic issues, legal questions, business queries — anything you'd ask a well-connected Mumbai friend. The community upvotes helpful answers. The most helpful answers rise to the top. Every question and answer stays permanently searchable, helping future Mumbaikars with the same question.</p>
                </div>
              </div>
            </main>

            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">🔥 Popular <em>Topics</em></div>
                <div className="sbw-body"><div id="topTopics" style={{fontSize:12,color:"#374151",fontWeight:300,lineHeight:1.9}}>Loading…</div></div>
              </div>
              <div className="sb-widget">
                <div className="sbw-head">🔗 Quick <em>Links</em></div>
                <div className="sbw-body">
                  <Link href="/mumbai-local-train" className="quick-link"><div className="ql-icon">🚂</div><div className="ql-text">Local Train</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-real-estate-guide" className="quick-link"><div className="ql-icon">💰</div><div className="ql-text">Real Estate</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-monsoon" className="quick-link"><div className="ql-icon">🌧️</div><div className="ql-text">Monsoon</div><div className="ql-arrow">→</div></Link>
                  <Link href="/senior-citizens-mumbai" className="quick-link"><div className="ql-icon">👴</div><div className="ql-text">Senior Citizens</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-cost-of-living" className="quick-link"><div className="ql-icon">💸</div><div className="ql-text">Cost of Living</div><div className="ql-arrow">→</div></Link>
                  <Link href="/pets-mumbai" className="quick-link"><div className="ql-icon">🐾</div><div className="ql-text">Pets</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-street-food" className="quick-link"><div className="ql-icon">🥘</div><div className="ql-text">Street Food</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-sports" className="quick-link"><div className="ql-icon">🏏</div><div className="ql-text">Sports Hub</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-education" className="quick-link"><div className="ql-icon">🎓</div><div className="ql-text">Education</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-corporator-ward" className="quick-link"><div className="ql-icon">🏛️</div><div className="ql-text">Corporator</div><div className="ql-arrow">→</div></Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}