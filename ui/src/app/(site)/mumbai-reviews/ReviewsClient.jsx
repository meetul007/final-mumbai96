"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./style.css";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function ReviewsClient({ initialReviews = [] }) {
  useEffect(() => {
    let _cachedReviews = initialReviews.length > 0 ? initialReviews : null;

    async function getReviews() {
      if (_cachedReviews) return _cachedReviews;
      try {
        const res = await fetch(`${API}/api/public/reviews?per_page=100&sort=newest`);
        if (res.ok) {
          const data = await res.json();
          const apiReviews = (data.reviews || []).map(r => ({
            ...r,
            id: r.id || 'api-' + r.id,
            date: r.created_at ? r.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
            helpful: r.helpful_count || 0,
          }));
          _cachedReviews = apiReviews;
          return _cachedReviews;
        }
      } catch(e) {}
      return [];
    }

    function clearCache() { _cachedReviews = null; }

    function requireAuth() {
      if (!localStorage.getItem('owner_token')) {
        const p = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/auth/login?redirect=${p}`;
        return false;
      }
      return true;
    }

    let currentRating = 0;
    let activeTab = 'all';
    let currentPage = 1;
    const PER_PAGE = 5;

    function starsHTML(r, size=14) {
      return [1,2,3,4,5].map(i => `<span class="star${i <= r ? ' filled' : ''}" style="font-size:${size}px">${i <= r ? '★' : '☆'}</span>`).join('');
    }

    const ratingMeta = {
      1: {label:'Terrible',col:'var(--danger)'},
      2: {label:'Poor',col:'#DC6803'},
      3: {label:'Average',col:'#D97706'},
      4: {label:'Good',col:'var(--green)'},
      5: {label:'Excellent',col:'var(--green)'}
    };

    function avatarColor(e) {
      const c = ['#371b58','#ff6b00','#059669','#DC2626','#7C3AED','#0369A1','#B45309'];
      let h = 0; for (let x of e) h = (h * 31 + x.charCodeAt(0)) % c.length; return c[h];
    }

    function toggleHeroForm() {
      const fields = document.getElementById('heroFormFields');
      const btn = document.getElementById('heroPostBtn');
      const open = fields.classList.contains('open');
      fields.classList.toggle('open', !open);
      btn.classList.toggle('expanded', !open);
    }

    window.toggleHeroForm = toggleHeroForm;

    function scrollToForm() {
      const card = document.getElementById('heroFormCard');
      card.scrollIntoView({behavior:'smooth',block:'center'});
      setTimeout(() => {
        const fields = document.getElementById('heroFormFields');
        if (!fields.classList.contains('open')) toggleHeroForm();
      }, 500);
    }

    window.scrollToForm = scrollToForm;

    function doSearch() {
      const q = document.getElementById('heroSearch').value.trim();
      if (!q) return;
      document.getElementById('searchQ').value = q;
      document.getElementById('allReviewsSection').scrollIntoView({behavior:'smooth',block:'start'});
      renderReviews();
    }

    window.doSearch = doSearch;

    function setRating(n) {
      currentRating = n;
      document.querySelectorAll('#starInput .si').forEach((s,i) => {
        s.style.color = i < n ? '#F59E0B' : '#D1D5DB';
      });
      const lbl = document.getElementById('starLabel');
      if (ratingMeta[n]) { lbl.textContent = ratingMeta[n].label; lbl.style.color = ratingMeta[n].col; }
    }

    window.setRating = setRating;

    function updateCharCount(el, countId, min, max) {
      const n = el.value.length;
      const el2 = document.getElementById(countId);
      if (n < min) el2.textContent = `Minimum ${min} characters (${n}/${min})`;
      else el2.textContent = `${n}/${max} characters`;
      el2.style.color = n < min ? 'var(--danger)' : n > max * 0.9 ? '#D97706' : 'var(--muted)';
    }

    window.updateCharCount = updateCharCount;

    let _rvImgData = null;

    function rvImgSelect(input) {
      const f = input.files[0]; if (!f) return;
      if (f.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }
      const rd = new FileReader();
      rd.onload = e => {
        _rvImgData = e.target.result;
        document.getElementById('reviewImgPrompt').style.display = 'none';
        document.getElementById('reviewImgPreviewArea').style.display = 'block';
        document.getElementById('reviewImgThumb').src = _rvImgData;
        document.getElementById('reviewImgFileName').textContent = f.name;
        document.getElementById('reviewImgFileSize').textContent = (f.size / 1024).toFixed(0) + ' KB';
      };
      rd.readAsDataURL(f);
    }

    window.rvImgSelect = rvImgSelect;

    function rvImgRemove(e) {
      e.stopPropagation();
      _rvImgData = null;
      document.getElementById('reviewImgPrompt').style.display = 'block';
      document.getElementById('reviewImgPreviewArea').style.display = 'none';
      document.getElementById('reviewImgFileInput').value = '';
    }

    window.rvImgRemove = rvImgRemove;

    function rvImgDrag(e, on) { e.preventDefault(); document.getElementById('reviewImgUploadZone').classList.toggle('drag', on); }

    window.rvImgDrag = rvImgDrag;

    function rvImgDrop(e) {
      e.preventDefault(); document.getElementById('reviewImgUploadZone').classList.remove('drag');
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/')) {
        const dt = new DataTransfer(); dt.items.add(f);
        document.getElementById('reviewImgFileInput').files = dt.files;
        rvImgSelect(document.getElementById('reviewImgFileInput'));
      }
    }

    window.rvImgDrop = rvImgDrop;

    function rvOpenLightbox(src) {
      document.getElementById('rvLightboxImg').src = src;
      document.getElementById('rvLightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function rvCloseLightbox() {
      document.getElementById('rvLightbox').classList.remove('open');
      document.body.style.overflow = '';
    }

    window.rvOpenLightbox = rvOpenLightbox;
    window.rvCloseLightbox = rvCloseLightbox;
    document.addEventListener('keydown', e => { if (e.key === 'Escape') rvCloseLightbox(); });

    async function submitReview() {
      if (!requireAuth()) return;
      const entity   = document.getElementById('fEntity').value.trim();
      const category = document.getElementById('fCategory').value;
      const area     = document.getElementById('fArea').value;
      const title    = document.getElementById('fTitle').value.trim();
      const review   = document.getElementById('fReview').value.trim();
      const reviewer = document.getElementById('fReviewer').value.trim();
      const amount   = document.getElementById('fAmount').value.trim();
      const contact  = document.getElementById('fContact').value.trim();

      if (!entity)   { alert('Please enter the company or person name'); return; }
      if (!category) { alert('Please select a category'); return; }
      if (!area)     { alert('Please select an area in Mumbai'); return; }
      if (currentRating === 0) { alert('Please give a star rating'); return; }
      if (!title)    { alert('Please add a review title'); return; }
      if (review.length < 50) { alert('Please write a more detailed review (minimum 50 characters)'); return; }
      if (!reviewer) { alert('Please enter your name or initials'); return; }

      const payload = {
        entity, category, area,
        rating: currentRating,
        title, review,
        reviewer_name: reviewer,
        amount: amount || undefined,
        contact: contact || undefined,
        image_url: _rvImgData || undefined,
      };

      try {
        await fetch(`${API}/api/public/reviews`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch(e) {}

      clearCache();

      const sp = document.getElementById('successPanel');
      sp.style.display = 'block';
      sp.scrollIntoView({behavior:'smooth',block:'center'});
      document.getElementById('successMsg').textContent = 'Thank you! Your review has been submitted and is pending approval. It will appear in the feed once reviewed.';

      setTimeout(() => {
        ['fEntity','fTitle','fReview','fReviewer','fAmount','fContact'].forEach(id => {
          const el = document.getElementById(id); if (el) el.value = '';
        });
        ['fCategory','fArea'].forEach(id => {
          const el = document.getElementById(id); if (el) el.value = '';
        });
        currentRating = 0;
        document.querySelectorAll('#starInput .si').forEach(s => s.style.color = '#D1D5DB');
        document.getElementById('starLabel').textContent = 'Click to rate';
        document.getElementById('fReviewCount').textContent = 'Minimum 50 characters';
        _rvImgData = null;
        document.getElementById('reviewImgPrompt').style.display = 'block';
        document.getElementById('reviewImgPreviewArea').style.display = 'none';
        document.getElementById('reviewImgFileInput').value = '';
        setTimeout(() => { sp.style.display = 'none'; }, 6000);
        updateStats(); updateCatCounts(); renderReviews(); renderTopReviewed(); updateRatingSummary();
      }, 1000);
    }

    window.submitReview = submitReview;

    function renderCard(r) {
      const init = (r.entity || '??').split(' ').slice(0,2).map(w => w[0] || '?').join('').toUpperCase();
      const rm = ratingMeta[r.rating] || {label:'',col:'var(--muted)'};
      const imgHTML = (r.image || r.image_url)
        ? `<img class="rc-sq-img" src="${r.image || r.image_url}" alt="Review photo" onclick="rvOpenLightbox(this.src)"/>`
        : '';
      const reviewer = r.reviewer || r.reviewer_name || 'Anonymous';
      const isPending = r.is_approved === false;
      return `<div class="review-card" id="card-${r.id}">
        <div class="rc-top">
          <div class="rc-avatar" style="background:${avatarColor(r.entity)}">${init}</div>
          <div class="rc-meta">
            <div class="rc-entity">${r.entity}</div>
            <div class="rc-category">${r.category} · 📍 ${r.area}</div>
            ${isPending ? '<div class="rc-pending" style="font-size:11px;color:#D97706;font-weight:700;margin-top:4px">⏳ Pending Approval</div>' : ''}
          </div>
        </div>
        <div class="rc-body-wrap">
          <div class="rc-body-inner">
            <div class="rc-title">"${r.title}"</div>
            <div class="rc-review-text" style="margin-bottom:0">${r.review}</div>
          </div>
          ${imgHTML}
        </div>
        <div class="rc-footer">
          <div>
            <div class="rc-reviewer">By <strong>${reviewer}</strong></div>
            <div class="rc-date">📅 ${r.date}</div>
          </div>
          <div class="rc-footer-stars">
            ${starsHTML(r.rating)}
            <span style="font-size:11px;font-weight:800;color:${rm.col};margin-left:4px">${rm.label}</span>
          </div>
          ${r.amount ? `<div style="font-size:11px;color:var(--danger);font-weight:700;">💸 ${r.amount}</div>` : ''}
          <button class="helpful-btn" onclick="markHelpful('${r.id}',this)">👍 Helpful (${r.helpful || r.helpful_count || 0})</button>
        </div>
      </div>`;
    }

    function setTab(t, btn) {
      activeTab = t;
      currentPage = 1;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      renderReviews();
    }

    window.setTab = setTab;

    function filterByCat(cat) {
      document.getElementById('fCatFilter').value = cat;
      activeTab = 'all';
      document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', i === 0));
      currentPage = 1;
      document.getElementById('allReviewsSection').scrollIntoView({behavior:'smooth',block:'start'});
      renderReviews();
    }

    window.filterByCat = filterByCat;

    async function renderReviews() {
      const q    = (document.getElementById('searchQ') || {}).value || '';
      const cat  = (document.getElementById('fCatFilter') || {}).value || '';
      const area = (document.getElementById('fAreaFilter') || {}).value || '';
      const rat  = (document.getElementById('fRatingFilter') || {}).value || '';
      const sort = (document.getElementById('fSortFilter') || {}).value || 'newest';

      let rs = await getReviews();

      if (activeTab === 'negative') rs = rs.filter(r => r.rating <= 2);
      else if (activeTab === 'neutral') rs = rs.filter(r => r.rating === 3);
      else if (activeTab === 'positive') rs = rs.filter(r => r.rating >= 4);

      if (q) { const ql = q.toLowerCase(); rs = rs.filter(r => (r.entity + r.review + r.area + r.category + r.title).toLowerCase().includes(ql)); }
      if (cat)  rs = rs.filter(r => r.category === cat);
      if (area) rs = rs.filter(r => r.area === area);
      if (rat)  rs = rs.filter(r => r.rating === parseInt(rat));

      if (sort === 'newest')   rs = [...rs].reverse();
      else if (sort === 'helpful') rs = [...rs].sort((a,b) => (b.helpful||0) - (a.helpful||0));
      else if (sort === 'lowest')  rs = [...rs].sort((a,b) => a.rating - b.rating);
      else if (sort === 'highest') rs = [...rs].sort((a,b) => b.rating - a.rating);

      const total = rs.length;
      const pages = Math.ceil(total / PER_PAGE) || 1;
      if (currentPage > pages) currentPage = 1;
      const pageRs = rs.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

      const count = document.getElementById('resultCount');
      if (count) count.textContent = `Showing ${pageRs.length} of ${total} review${total !== 1 ? 's' : ''}`;

      const feed = document.getElementById('reviewsFeed');
      if (feed) feed.innerHTML = pageRs.length ? pageRs.map(renderCard).join('') :
        '<div class="empty-state"><div class="es-icon">🔍</div><p>No reviews match your filters.<br/>Be the first to write one!</p></div>';

      const pg = document.getElementById('paginationBar');
      if (pg && pages > 1) {
        let html = `<button class="pg-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Prev</button>`;
        for (let i = 1; i <= pages; i++) html += `<button class="pg-btn${i === currentPage ? ' active' : ''}" onclick="goPage(${i})">${i}</button>`;
        html += `<button class="pg-btn" onclick="goPage(${currentPage + 1})" ${currentPage === pages ? 'disabled' : ''}>Next →</button>`;
        pg.innerHTML = html;
      } else if (pg) pg.innerHTML = '';
    }

    window.renderReviews = renderReviews;

    function goPage(p) {
      currentPage = p;
      renderReviews();
      window.scrollTo({top: document.getElementById('allReviewsSection').offsetTop - 80, behavior:'smooth'});
    }

    window.goPage = goPage;

    async function updateStats() {
      const rs = await getReviews();
      const avg = (rs.reduce((a,r) => a + r.rating, 0) / rs.length).toFixed(1);
      ['statTotal'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = rs.length; });
      ['statAvg'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = avg + '★'; });
    }

    const catMap = {
      'builder':'Builder / Developer','broker':'Property Broker / Agent','contractor':'Individual / Company',
      'doctor':'Doctor / Clinic / Hospital','school':'Coaching Classes / Teacher','finance':'Finance / Loan / Insurance',
      'transport':'Transport / Packers Movers','food':'Restaurant / Food','online':'Online Seller / E-commerce',
      'job':'Job Placement / HR Agency','society':'Society / Housing Management','other':'Other'
    };

    async function updateCatCounts() {
      const rs = await getReviews();
      Object.entries(catMap).forEach(([key,cat]) => {
        const el = document.getElementById('cnt-' + key);
        if (el) { const n = rs.filter(r => r.category === cat).length; el.textContent = n + ' review' + (n !== 1 ? 's' : ''); }
      });
    }

    async function updateRatingSummary() {
      const rs = await getReviews();
      if (!rs.length) return;
      const avg = (rs.reduce((a,r) => a + r.rating, 0) / rs.length).toFixed(1);
      document.getElementById('avgRating').textContent = avg;
      document.getElementById('avgStars').innerHTML = starsHTML(Math.round(avg), 16);
      document.getElementById('avgTotal').textContent = rs.length + ' reviews';
      const bars = document.getElementById('ratingBars');
      bars.innerHTML = [5,4,3,2,1].map(n => {
        const cnt = rs.filter(r => r.rating === n).length;
        const pct = rs.length ? Math.round(cnt / rs.length * 100) : 0;
        const col = n >= 4 ? 'var(--green)' : n === 3 ? '#F59E0B' : 'var(--danger)';
        return `<div class="rs-bar-row"><span class="rs-bar-label">${n}★</span><div class="rs-bar-track"><div class="rs-bar-fill" style="width:${pct}%;background:${col}"></div></div><span class="rs-bar-pct">${pct}%</span></div>`;
      }).join('');
    }

    async function renderTopReviewed() {
      const rs = await getReviews();
      const counts = {};
      rs.forEach(r => { counts[r.entity] = (counts[r.entity] || 0) + 1; });
      const top = Object.entries(counts).sort((a,b) => b[1] - a[1]).slice(0, 5);
      const el = document.getElementById('topReviewedList');
      if (!el) return;
      el.innerHTML = top.map(([name,cnt]) =>
        `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);align-items:center">
          <span style="font-size:12px;font-weight:700;color:var(--ink)">${name.length > 28 ? name.slice(0,28) + '…' : name}</span>
          <span style="font-size:10px;font-weight:800;color:var(--red)">${cnt} review${cnt > 1 ? 's' : ''}</span>
        </div>`
      ).join('') || '<div style="font-size:12px;color:var(--muted)">No data yet</div>';
    }

    async function markHelpful(id, btn) {
      if (!requireAuth()) return;
      const rs = await getReviews();
      const r = rs.find(x => x.id === id);
      if (!r) return;
      const newCount = (r.helpful || 0) + 1;
      r.helpful = newCount;
      btn.textContent = `👍 Helpful (${newCount})`;
      btn.classList.add('active');
      btn.disabled = true;

      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        try {
          await fetch(`${API}/api/public/reviews/${numericId}/helpful`, { method: 'POST' });
        } catch(e) {}
      }
    }

    window.markHelpful = markHelpful;

    function applyURLParams() {
      const p = new URLSearchParams(window.location.search);
      const q = p.get('q'); if (q) { const el = document.getElementById('searchQ'); if (el) el.value = q; }
      const cat = p.get('cat'); if (cat) { const el = document.getElementById('fCatFilter'); if (el) el.value = cat; }
    }

    applyURLParams();
    (async () => {
      await updateStats();
      await updateCatCounts();
      await updateRatingSummary();
      await renderReviews();
      await renderTopReviewed();
    })();

    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), {threshold:.05});
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));
  }, []);

  return (
    <div className="mumbai-reviews-page">
      {/* HERO */}
      <div className="page-hero">
        <div className="ph-grid"></div>
        <div className="ph-glow" style={{background:'rgba(255,107,0,.12)',top:'-80px',right:'-80px',width:'600px',height:'400px'}}></div>
        <div className="ph-glow" style={{background:'rgba(55,27,88,.5)',bottom:'-100px',left:'-80px',width:'600px',height:'400px'}}></div>
        <div className="con">
          <div className="ph-inner">
            <div className="ph-bc"><Link href="/">Home</Link><span>/</span><span>Mumbai Reviews</span></div>
            <div className="ph-kicker">Mumbai96 · Community Reviews · Always Free</div>
            <h1 className="ph-h1">Mumbai <em>Reviews</em> — <span className="gold">Rate</span> &amp; Share</h1>
            <p className="ph-desc">Real reviews from real Mumbaikars — builders, brokers, contractors, doctors, service providers and more. Read before you deal. Write to help others.</p>

            <div className="ph-search" style={{marginTop:'22px',marginBottom:'0'}}>
              <input type="text" id="heroSearch" placeholder="Search company, area or service..." onKeyDown={e => { if (e.key === 'Enter') doSearch(); }} />
              <button onClick={() => doSearch()}>Search Reviews</button>
            </div>

            <div className="hero-form-card" id="heroFormCard">
              <h3>✍️ Write Your Review</h3>
              <p>Your honest experience protects thousands of Mumbaikars. Takes 2 minutes. Always free.</p>
              <div className="hero-card-top">
                <div className="hero-card-top-left" style={{fontSize:'12px',color:'var(--muted)',fontWeight:'300'}}>Share your experience with a builder, broker, contractor, doctor or any service in Mumbai.</div>
                <button className="hero-post-btn" id="heroPostBtn" onClick={() => toggleHeroForm()}>
                  ✍️ Write a Review <em className="btn-chevron">▼</em>
                </button>
              </div>
              <div className="hero-form-fields" id="heroFormFields">
                <div className="hff-inner">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Company / Person Name <span className="req">*</span></label>
                      <input className="form-input" id="fEntity" placeholder="e.g. ABC Builders, Rajesh Broker, XYZ Clinic"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Category <span className="req">*</span></label>
                      <select className="form-select" id="fCategory">
                        <option value="">Select Category</option>
                        <option>Builder / Developer</option>
                        <option>Property Broker / Agent</option>
                        <option>Individual / Company</option>
                        <option>Doctor / Clinic / Hospital</option>
                        <option>Coaching Classes / Teacher</option>
                        <option>Finance / Loan / Insurance</option>
                        <option>Transport / Packers Movers</option>
                        <option>Restaurant / Food</option>
                        <option>Online Seller / E-commerce</option>
                        <option>Job Placement / HR Agency</option>
                        <option>Society / Housing Management</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Area in Mumbai <span className="req">*</span></label>
                      <select className="form-select" id="fArea">
                        <option value="">Select Area</option>
                        <option>Andheri</option><option>Bandra</option><option>Borivali</option><option>Chembur</option>
                        <option>Churchgate / Fort</option><option>Colaba</option><option>Dadar</option><option>Dahisar</option>
                        <option>Dharavi</option><option>Ghatkopar</option><option>Goregaon</option><option>Juhu</option>
                        <option>Kandivali</option><option>Kurla</option><option>Lower Parel</option><option>Malad</option>
                        <option>Matunga</option><option>Mulund</option><option>Navi Mumbai</option><option>Powai</option>
                        <option>Santacruz</option><option>Sion</option><option>Thane</option><option>Versova</option>
                        <option>Vikhroli</option><option>Vile Parle</option><option>Wadala</option><option>Worli</option><option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Transaction Amount (Optional)</label>
                      <input className="form-input" id="fAmount" placeholder="e.g. ₹50,000 advance paid"/>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Rating <span className="req">*</span></label>
                    <div className="star-input-wrap">
                      <div className="star-input" id="starInput">
                        {[1,2,3,4,5].map(n => (
                          <span key={n} className="si" data-val={n} onClick={() => setRating(n)}>★</span>
                        ))}
                      </div>
                      <span className="star-label-txt" id="starLabel">Click to rate</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Review Title <span className="req">*</span></label>
                    <input className="form-input" id="fTitle" placeholder="Summarise your experience in one line"/>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review <span className="req">*</span></label>
                    <textarea className="form-textarea" id="fReview" placeholder="Describe your experience — what was promised vs delivered, key facts, outcome. More detail = more helpful." onInput={e => updateCharCount(e.target,'fReviewCount',50,2000)}></textarea>
                    <div className="char-count" id="fReviewCount">Minimum 50 characters</div>
                  </div>

                  <div className="warn-box">
                    <div className="warn-icon">⚖️</div>
                    <div className="warn-body">
                      <h4>Write Responsibly</h4>
                      <p>Only post reviews based on your personal first-hand experience. Do not post false reviews or share private personal contact details of individuals. Defamatory reviews without factual basis may be removed and may expose the poster to legal action under IT Act 2000.</p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Attach Photo <span style={{color:'var(--muted)',fontWeight:'400',textTransform:'none',letterSpacing:'0'}}>(Optional)</span></label>
                    <div className="img-upload-zone" id="reviewImgUploadZone"
                      onDragOver={e => rvImgDrag(e,true)} onDragLeave={e => rvImgDrag(e,false)} onDrop={e => rvImgDrop(e)}>
                      <input type="file" id="reviewImgFileInput" accept="image/*" onChange={e => rvImgSelect(e.target)}/>
                      <div id="reviewImgPrompt">
                        <div className="iuz-icon">📷</div>
                        <div className="iuz-label">Upload a photo (optional)</div>
                        <div className="iuz-sub">Drag & drop or click · JPG, PNG, WebP · Max 5MB</div>
                      </div>
                      <div id="reviewImgPreviewArea" style={{display:'none'}}>
                        <div className="img-preview-wrap">
                          <img className="img-preview-thumb" id="reviewImgThumb" src="" alt=""/>
                          <div className="img-preview-info">
                            <div className="img-preview-name" id="reviewImgFileName"></div>
                            <div className="img-preview-size" id="reviewImgFileSize"></div>
                          </div>
                          <button className="img-remove-btn" type="button" onClick={e => rvImgRemove(e)}>✕ Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name / Initials <span className="req">*</span></label>
                      <input className="form-input" id="fReviewer" placeholder="e.g. Rahul M. or 'Anonymous Mumbaikar'"/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact (Optional — not shown publicly)</label>
                      <input className="form-input" id="fContact" placeholder="For Mumbai96 verification only"/>
                    </div>
                  </div>

                  <button className="form-btn" id="submitBtn" onClick={() => submitReview()}>📋 Post My Review</button>

                  <div className="success-panel" id="successPanel">
                    <div className="sp-icon">✅</div>
                    <h4>Review Posted!</h4>
                    <p id="successMsg">Thank you! Your review is now live and helping fellow Mumbaikars make informed decisions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ph-bottom">
          <div className="con">
            <div className="ph-stats">
              <div className="phs"><div className="phs-n" id="statTotal">—</div><div className="phs-l">Total Reviews</div></div>
              <div className="phs"><div className="phs-n" id="statAvg">—</div><div className="phs-l">Avg Rating</div></div>
              <div className="phs"><div className="phs-n">12</div><div className="phs-l">Categories</div></div>
              <div className="phs"><div className="phs-n">Free</div><div className="phs-l">Always Free to Post</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="page-body">
        <div className="con">
          <div className="page-layout">

            {/* MAIN */}
            <main>
              <div className="sec rv">
                <div className="sec-kicker">Simple Process</div>
                <h2 className="sec-title">How It <em>Works</em></h2>
                <div className="hiw-grid">
                  <div className="hiw-card"><div className="hiw-num">01</div><div className="hiw-icon">🔍</div><div className="hiw-title">Search & Read</div><div className="hiw-body">Search the company or service you want to check before dealing.</div></div>
                  <div className="hiw-card"><div className="hiw-num">02</div><div className="hiw-icon">✍️</div><div className="hiw-title">Write a Review</div><div className="hiw-body">Share your first-hand experience — good or bad. Takes 2 minutes.</div></div>
                  <div className="hiw-card"><div className="hiw-num">03</div><div className="hiw-icon">👍</div><div className="hiw-title">Mark Helpful</div><div className="hiw-body">Upvote reviews you found useful so they surface for others.</div></div>
                  <div className="hiw-card"><div className="hiw-num">04</div><div className="hiw-icon">🤝</div><div className="hiw-title">Protect Mumbai</div><div className="hiw-body">Every honest review protects thousands of fellow Mumbaikars.</div></div>
                </div>
              </div>

              <div className="sec rv">
                <div className="sec-kicker">Community Reviews</div>
                <h2 className="sec-title">What Mumbaikars Are <em>Saying</em></h2>
                <div className="cat-grid" id="catGrid">
                  {[
                    {cat:'Builder / Developer',icon:'🏗️',id:'cnt-builder'},
                    {cat:'Property Broker / Agent',icon:'🏠',id:'cnt-broker'},
                    {cat:'Individual / Company',icon:'🔧',id:'cnt-contractor'},
                    {cat:'Doctor / Clinic / Hospital',icon:'🏥',id:'cnt-doctor'},
                    {cat:'Coaching Classes / Teacher',icon:'📚',id:'cnt-school'},
                    {cat:'Finance / Loan / Insurance',icon:'💰',id:'cnt-finance'},
                    {cat:'Transport / Packers Movers',icon:'🚛',id:'cnt-transport'},
                    {cat:'Restaurant / Food',icon:'🍽️',id:'cnt-food'},
                    {cat:'Online Seller / E-commerce',icon:'📦',id:'cnt-online'},
                    {cat:'Job Placement / HR Agency',icon:'💼',id:'cnt-job'},
                    {cat:'Society / Housing Management',icon:'🏢',id:'cnt-society'},
                    {cat:'Other',icon:'⭐',id:'cnt-other'},
                  ].map(c => (
                    <div key={c.id} className="cat-card" onClick={() => filterByCat(c.cat)}>
                      <div className="cat-icon">{c.icon}</div>
                      <div className="cat-name">{c.cat}</div>
                      <div className="cat-count" id={c.id}>Loading…</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sec rv" id="allReviewsSection">
                <div className="rating-summary" id="ratingSummary">
                  <div className="rs-big">
                    <div className="rs-num" id="avgRating">—</div>
                    <div className="rs-stars" id="avgStars"></div>
                    <div className="rs-total" id="avgTotal">out of 5</div>
                  </div>
                  <div className="rs-bars" id="ratingBars"></div>
                </div>

                <div className="tab-row">
                  <button className="tab-btn active" onClick={e => setTab('all', e.target)}>All Reviews</button>
                  <button className="tab-btn" onClick={e => setTab('negative', e.target)}>👎 Negative</button>
                  <button className="tab-btn" onClick={e => setTab('neutral', e.target)}>😐 Neutral</button>
                  <button className="tab-btn" onClick={e => setTab('positive', e.target)}>👍 Positive</button>
                </div>

                <div className="filter-bar">
                  <input className="search-input-bar" id="searchQ" placeholder="🔍  Search company, area or keyword…" onInput={() => renderReviews()}/>
                  <select className="filter-select" id="fCatFilter" onChange={() => renderReviews()}>
                    <option value="">All Categories</option>
                    <option>Builder / Developer</option><option>Property Broker / Agent</option>
                    <option>Individual / Company</option><option>Doctor / Clinic / Hospital</option>
                    <option>Coaching Classes / Teacher</option><option>Finance / Loan / Insurance</option>
                    <option>Transport / Packers Movers</option><option>Restaurant / Food</option>
                    <option>Online Seller / E-commerce</option><option>Job Placement / HR Agency</option>
                    <option>Society / Housing Management</option><option>Other</option>
                  </select>
                  <select className="filter-select" id="fAreaFilter" onChange={() => renderReviews()}>
                    <option value="">All Areas</option>
                    <option>Andheri</option><option>Bandra</option><option>Borivali</option><option>Chembur</option>
                    <option>Dadar</option><option>Ghatkopar</option><option>Goregaon</option><option>Juhu</option>
                    <option>Kandivali</option><option>Kurla</option><option>Lower Parel</option><option>Malad</option>
                    <option>Mulund</option><option>Powai</option><option>Santacruz</option><option>Thane</option>
                    <option>Vile Parle</option><option>Worli</option>
                  </select>
                  <select className="filter-select" id="fRatingFilter" onChange={() => renderReviews()}>
                    <option value="">All Ratings</option>
                    <option value="1">⭐ 1 Star — Terrible</option>
                    <option value="2">⭐⭐ 2 Stars — Poor</option>
                    <option value="3">⭐⭐⭐ 3 Stars — Average</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars — Good</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars — Excellent</option>
                  </select>
                  <select className="filter-select" id="fSortFilter" onChange={() => renderReviews()}>
                    <option value="newest">Newest First</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="highest">Highest Rated</option>
                  </select>
                </div>

                <div className="result-count" id="resultCount"></div>
                <div id="reviewsFeed"></div>
                <div className="pagination" id="paginationBar"></div>
              </div>

              <div className="cta-bar rv">
                <div>
                  <h3>Had a Good or Bad <em>Experience?</em></h3>
                  <p>Write your review and help thousands of Mumbaikars make informed decisions. Free, always.</p>
                </div>
                <button className="cta-btn" onClick={() => scrollToForm()}>✍️ Write a Review →</button>
              </div>

              <div className="prose rv">
                <h2>Mumbai Reviews — Why This Platform Exists</h2>
                <p>Mumbai is a city of 2 crore people and millions of daily transactions — property deals, home renovation, school admissions, medical consultations, financial investments. Despite this scale, there was no dedicated, hyperlocal consumer review platform built specifically for Mumbai. <strong>Mumbai96 Reviews fills that gap</strong> — a free, community-driven platform where Mumbaikars can share honest experiences and protect each other.</p>

                <h3>Most Reviewed Categories in Mumbai</h3>
                <p>Based on community submissions, the most frequently reviewed categories on Mumbai96 are: <strong>builders and real estate developers</strong>, <strong>property brokers and agents</strong>, <strong>home renovation contractors</strong>, <strong>doctors and clinics</strong>, and <strong>job placement agencies</strong>. Whether your experience was exceptional or disappointing, your review matters.</p>

                <h3>How Reviews Are Moderated</h3>
                <p>Mumbai96 relies on community moderation — users can mark reviews as "helpful" or flag them as inaccurate. We follow the IT Act guidelines and Information Technology (Intermediary Guidelines) Rules 2021 for content moderation. We do not edit or suppress genuine negative reviews of businesses, and we do not allow false or defamatory content.</p>

                <h3>Protecting Consumer Rights in Mumbai</h3>
                <p>If you have had a serious negative experience with a business, beyond writing a review you have formal channels available — the <strong>National Consumer Helpline (1800-11-4000)</strong>, the <strong>eDaakhil Consumer Forum portal</strong> for filing cases online, and <strong>MahaRERA</strong> for builder-related disputes. Mumbai96 is a review platform, not a legal service, but we aim to equip every Mumbaikar with information to act on their rights.</p>
              </div>
            </main>

            {/* SIDEBAR */}
            <aside className="page-sidebar">
              <div className="sb-widget">
                <div className="sbw-head">🔥 Most <em>Reviewed</em></div>
                <div className="sbw-body">
                  <div id="topReviewedList" style={{fontSize:'12px',color:'var(--muted)',fontWeight:'300'}}>Loading…</div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">⚖️ Consumer <em>Rights</em></div>
                <div className="sbw-body">
                  <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener" className="quick-link"><div className="ql-icon">📞</div><div className="ql-text">National Consumer Helpline 1800-11-4000</div><div className="ql-arrow">→</div></a>
                  <a href="https://edaakhil.nic.in" target="_blank" rel="noopener" className="quick-link"><div className="ql-icon">📋</div><div className="ql-text">File Consumer Forum Case Online</div><div className="ql-arrow">→</div></a>
                  <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener" className="quick-link"><div className="ql-icon">🏗️</div><div className="ql-text">MahaRERA — Builder Complaint</div><div className="ql-arrow">→</div></a>
                  <a href="https://pgportal.gov.in" target="_blank" rel="noopener" className="quick-link"><div className="ql-icon">📝</div><div className="ql-text">PM Grievance Portal</div><div className="ql-arrow">→</div></a>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">🔗 Quick <em>Links</em></div>
                <div className="sbw-body">
                  <Link href="/mumbai-voice" className="quick-link"><div className="ql-icon">🗣️</div><div className="ql-text">Mumbai Voice — Polls & Opinions</div><div className="ql-arrow">→</div></Link>
                  <Link href="/mumbai-lost-found" className="quick-link"><div className="ql-icon">🔍</div><div className="ql-text">Mumbai Lost & Found</div><div className="ql-arrow">→</div></Link>
                  <Link href="/ngos-mumbai" className="quick-link"><div className="ql-icon">🤝</div><div className="ql-text">Verified NGOs Mumbai</div><div className="ql-arrow">→</div></Link>
                  <Link href="/coop-society-mumbai" className="quick-link"><div className="ql-icon">🏘️</div><div className="ql-text">Co-op Society Bye Laws</div><div className="ql-arrow">→</div></Link>
                  <Link href="/property-tax-mumbai" className="quick-link"><div className="ql-icon">🏦</div><div className="ql-text">Property Tax Payment</div><div className="ql-arrow">→</div></Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      <div className="rv-lightbox" id="rvLightbox" onClick={() => rvCloseLightbox()}>
        <button className="rv-lb-close" onClick={() => rvCloseLightbox()}>✕</button>
        <img id="rvLightboxImg" src="" alt="Review photo"/>
      </div>
    </div>
  );
}
