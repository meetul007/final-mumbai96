"use client";
import Link from "next/link";
import { useEffect } from "react";
import "./style.css";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function VoiceClient({ initialTopics = [], initialPagination = null }) {
  useEffect(() => {
    function toggleSearch() {
      const w = document.getElementById('m96SearchWrap'), i = document.getElementById('m96SearchInput');
      const a = w.classList.toggle('active');
      if (a) setTimeout(() => i.focus(), 310);
      else { i.value = ''; i.blur(); }
    }
    document.addEventListener('click', e => {
      const w = document.getElementById('m96SearchWrap');
      if (w && !w.contains(e.target)) w.classList.remove('active');
    });

    function switchTab(el, tab) {
      document.querySelectorAll('.vh-tab').forEach(t => t.classList.remove('on'));
      el.classList.add('on');
    }

    function filterBy(el, cat) {
      document.querySelectorAll('.fc').forEach(c => c.classList.remove('on'));
      el.classList.add('on');
    }

    function requireAuth() {
      if (!localStorage.getItem('owner_token')) {
        const p = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/auth/login?redirect=${p}`;
        return false;
      }
      return true;
    }

    function upvote(btn) {
      if (!requireAuth()) return;
      const c = btn.querySelector('.uv-count');
      const n = parseInt(c.textContent);
      if (btn.classList.toggle('voted')) { c.textContent = n + 1 } else { c.textContent = n }

      const card = btn.closest('.topic-card');
      if (card) {
        const id = card.id;
        const numericId = id ? parseInt(id.replace('card', '')) : null;
        if (numericId) {
          fetch(`${API}/api/public/voice/${numericId}/upvote`, { method: 'POST' }).catch(() => {});
        }
      }
    }

    const pollVoted = {};

    function vote(btn, option, pollId) {
      if (!requireAuth()) return;
      if (pollVoted[pollId]) return;
      pollVoted[pollId] = option;
      const widget = btn.closest('.poll-widget');
      widget.querySelectorAll('.poll-option').forEach(p => {
        p.querySelector('.po-inner').classList.add('voted');
        p.style.cursor = 'default';
      });
      btn.querySelector('.po-inner').classList.add('voted');
      const bar = btn.querySelector('.po-bar');
      if (bar) { const curr = parseFloat(bar.style.width) || 0; bar.style.width = (curr + 2) + '%'; }

      fetch(`${API}/api/public/voice/poll/${pollId}/vote`, { method: 'POST' }).catch(() => {});
    }

    let _activeCard = null;

    async function openComments(id) {
      _activeCard = id;
      const overlay = document.getElementById('commentsOverlay');
      const list = document.getElementById('cpCommentsList');
      const title = document.getElementById('cpTitle');
      const textarea = document.getElementById('cpTextarea');
      title.textContent = 'Comments';

      const topicId = id.replace('card-', '');
      let comments = [];

      try {
        const res = await fetch(`${API}/api/public/voice/${topicId}/comments`);
        if (res.ok) {
          const data = await res.json();
          comments = data.comments || [];
        }
      } catch(e) {}

      if (!comments.length) {
        const seedMap = SEED_COMMENTS[topicId];
        if (seedMap) comments = seedMap;
      }

      if (comments.length === 0) {
        list.innerHTML = '<div class="cp-empty"><span>💬</span>Be the first to comment!</div>';
      } else {
        list.innerHTML = comments.map(c =>
          `<div class="cp-comment">
            <div class="cp-c-avatar" style="background:var(--dark)">${c.author_name ? c.author_name.charAt(0).toUpperCase() : '👤'}</div>
            <div class="cp-c-bubble">
              <div class="cp-c-meta"><span class="cp-c-name">${c.author_name || 'Anonymous'}</span><span class="cp-c-time">${c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Just now'}</span></div>
              <div class="cp-c-text">${c.text}</div>
            </div>
          </div>`
        ).join('');
      }
      textarea.value = '';
      updateCharCount(textarea);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => textarea.focus(), 320);
    }

    function closeComments() {
      document.getElementById('commentsOverlay').classList.remove('open');
      document.body.style.overflow = '';
      _activeCard = null;
    }

    function closeCommentsOnBg(e) {
      if (e.target === document.getElementById('commentsOverlay')) closeComments();
    }

    function updateCharCount(textarea) {
      const remaining = 150 - textarea.value.length;
      const el = document.getElementById('cpCharCount');
      const btn = document.getElementById('cpSubmitBtn');
      el.textContent = remaining + ' left';
      el.className = 'cp-char-count' + (remaining <= 20 && remaining > 5 ? ' warn' : remaining <= 5 ? ' danger' : '');
      btn.disabled = textarea.value.trim().length === 0;
    }

    function submitComment() {
      if (!requireAuth()) return;
      const textarea = document.getElementById('cpTextarea');
      const text = textarea.value.trim();
      if (!text || !_activeCard) return;
      const list = document.getElementById('cpCommentsList');
      const div = document.createElement('div');
      div.className = 'cp-comment';
      div.style.cssText = 'opacity:0;transform:translateY(10px);transition:opacity .3s ease,transform .3s ease';
      div.innerHTML =
        `<div class="cp-c-avatar" style="background:var(--red)">👤</div>
          <div class="cp-c-bubble" style="background:rgba(55,27,88,.05);border-radius:12px 0 12px 12px">
            <div class="cp-c-meta"><span class="cp-c-name">You</span><span class="cp-c-time">Just now</span></div>
            <div class="cp-c-text">${text}</div>
          </div>`;
      list.appendChild(div);
      requestAnimationFrame(() => requestAnimationFrame(() => { div.style.opacity = '1'; div.style.transform = 'translateY(0)' }));
      list.scrollTop = list.scrollHeight;
      textarea.value = '';
      updateCharCount(textarea);

      const topicId = _activeCard ? _activeCard.replace('card-', '') : null;
      if (topicId) {
        fetch(`${API}/api/public/voice/${topicId}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, author_name: 'Anonymous' }),
        }).catch(() => {});
      }
    }

    function sharePost() {
      if (navigator.share) { navigator.share({ title: 'Mumbai Voice — Mumbai96', url: location.href }); }
      else { navigator.clipboard.writeText(location.href).then(() => alert('Link copied!')); }
    }

    function submitQuickComplaint() {
      const sel = document.querySelector('.qc-select').value;
      const txt = document.querySelector('.qc-input').value.trim();
      if (!sel || !txt) { alert('Please fill in your area and issue.'); return; }
      document.querySelector('.qc-input').value = '';
      document.querySelector('.qc-select').value = '';
      const btn = document.querySelector('.qc-btn');
      const orig = btn.textContent;
      btn.textContent = '✓ Complaint Submitted!';
      btn.style.background = '#059669';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
    }

    let _paginationPage = 1;
    let _paginationTotal = 0;
    let _hasMore = false;
    let _allTopics = [];

    async function loadMore() {
      if (!_hasMore) return;
      const btn = document.getElementById('loadMoreBtn');
      if (!btn) return;
      btn.textContent = 'Loading…';
      btn.disabled = true;

      _paginationPage++;
      try {
        const res = await fetch(`${API}/api/public/voice?page=${_paginationPage}&per_page=10&sort=newest`);
        if (res.ok) {
          const data = await res.json();
          if (data.topics && data.topics.length > 0) {
            const newTopics = data.topics.map(t => ({
              ...t,
              handle: null,
              time: t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Just now',
            }));
            _allTopics = _allTopics.concat(newTopics);
            _paginationTotal = data.pagination.total;
            _hasMore = data.pagination.has_next;

            const feed = document.getElementById('topicsFeed');
            if (feed) {
              feed.innerHTML += newTopics.map(t => buildTopicCardHTML(t)).join('');
            }
            updateHeroStats(_allTopics);
            updateHotNow(_allTopics);
          }
        }
      } catch(e) {}
      btn.textContent = `Load More Topics (${Math.max(0, _paginationTotal - _allTopics.length)} remaining)`;
      btn.disabled = false;
    }

    function openModal() {
      document.getElementById('modalOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    function closeModalOnBg(e) {
      if (e.target === document.getElementById('modalOverlay')) closeModal();
    }

    function selectType(el, type) {
      document.querySelectorAll('.type-opt').forEach(o => o.classList.remove('on'));
      el.classList.add('on');
      document.getElementById('pollBuilderSection').style.display = (type === 'poll') ? 'block' : 'none';
      document.getElementById('imgUploadGroup').style.display = (type === 'poll') ? 'none' : 'block';
    }

    document.getElementById('pollBuilderSection').style.display = 'block';
    document.getElementById('imgUploadGroup').style.display = 'none';

    const emojis = ['✅', '😐', '😤', '🚨', '😊', '🤔'];

    function addOption() {
      const pb = document.getElementById('pollBuilder');
      const opts = pb.querySelectorAll('.pb-option');
      if (opts.length >= 6) { alert('Maximum 6 options allowed.'); return; }
      const idx = opts.length;
      const div = document.createElement('div');
      div.className = 'pb-option';
      div.innerHTML = `<span class="pb-emoji">${emojis[idx] || '•'}</span><input class="pb-input" type="text" placeholder="Option ${idx + 1}"/><button class="pb-del" onclick="delOption(this)">✕</button>`;
      pb.insertBefore(div, pb.querySelector('.add-option-btn'));
    }

    function delOption(btn) {
      const pb = document.getElementById('pollBuilder');
      const opts = pb.querySelectorAll('.pb-option');
      if (opts.length <= 2) { alert('Minimum 2 options required.'); return; }
      btn.closest('.pb-option').remove();
    }

    function toggleUrgent(el) {
      el.classList.toggle('on');
      if (el.classList.contains('on')) { el.style.background = 'rgba(239,68,68,.08)'; el.style.borderColor = 'var(--tag-safety)'; el.style.color = 'var(--tag-safety)'; }
      else { el.style.background = '#fff'; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--ink)'; }
    }

    function handleCategoryChange(val) {
      const grp = document.getElementById('bmcSubGroup');
      if (val === 'BMC') {
        grp.style.display = 'block';
        grp.style.opacity = '0';
        grp.style.transform = 'translateY(-6px)';
        grp.style.transition = 'opacity .3s ease, transform .3s ease';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          grp.style.opacity = '1';
          grp.style.transform = 'translateY(0)';
        }));
      } else {
        grp.style.opacity = '0';
        grp.style.transform = 'translateY(-6px)';
        setTimeout(() => { grp.style.display = 'none'; }, 280);
      }
    }

    let _imgData = null;

    function imgSelect(input) {
      const f = input.files[0]; if (!f) return;
      if (f.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }
      const r = new FileReader();
      r.onload = e => {
        _imgData = e.target.result;
        document.getElementById('imgUploadPrompt').style.display = 'none';
        document.getElementById('imgPreviewArea').style.display = 'block';
        document.getElementById('imgThumb').src = _imgData;
        document.getElementById('imgFileName').textContent = f.name;
        document.getElementById('imgFileSize').textContent = (f.size / 1024).toFixed(0) + ' KB';
        document.querySelector('#imgUploadZone input[type=file]').style.pointerEvents = 'none';
      };
      r.readAsDataURL(f);
    }

    function imgRemove(e) {
      e.stopPropagation();
      _imgData = null;
      document.getElementById('imgUploadPrompt').style.display = 'block';
      document.getElementById('imgPreviewArea').style.display = 'none';
      document.getElementById('imgFileInput').value = '';
      document.querySelector('#imgUploadZone input[type=file]').style.pointerEvents = 'all';
    }

    function imgDrag(e, on) { e.preventDefault(); document.getElementById('imgUploadZone').classList.toggle('drag', on); }

    function imgDrop(e) {
      e.preventDefault();
      document.getElementById('imgUploadZone').classList.remove('drag');
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/')) {
        const dt = new DataTransfer();
        dt.items.add(f);
        document.getElementById('imgFileInput').files = dt.files;
        imgSelect(document.getElementById('imgFileInput'));
      }
    }

    function openLightbox(src) {
      document.getElementById('lbImg').src = src;
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }

    async function submitTopic() {
      if (!requireAuth()) return;
      const title = document.querySelector('.form-input[type=text]').value.trim();
      if (!title) { alert('Please add a title for your topic.'); return; }

      const selectedTypeEl = document.querySelector('.type-opt.on');
      const selectedType = selectedTypeEl ? selectedTypeEl.querySelector('.to-label').textContent.toLowerCase() : 'discussion';
      const typeMap = { poll: 'poll', complaint: 'complaint', discussion: 'discussion', 'win / update': 'win' };
      const topicType = typeMap[selectedType] || 'discussion';

      const areaEl = document.querySelector('.modal-body select.form-select');
      const area = areaEl ? areaEl.value : '';

      const catEl = document.getElementById('mainCategorySelect');
      const category = catEl ? catEl.value : '';

      const bmcEl = document.getElementById('bmcSubSelect');
      const bmcSubcategory = bmcEl ? bmcEl.value : '';

      const descEl = document.querySelector('.modal-body textarea.form-textarea');
      const description = descEl ? descEl.value.trim() : '';

      const isUrgent = document.querySelector('[onclick*="toggleUrgent"]')?.classList.contains('on');

      const pollOptions = [];
      if (topicType === 'poll') {
        document.querySelectorAll('.pb-option').forEach(el => {
          const label = el.querySelector('.pb-input')?.value.trim();
          const emoji = el.querySelector('.pb-emoji')?.textContent.trim();
          if (label) pollOptions.push({ label, emoji });
        });
      }

      const payload = {
        type: topicType,
        title,
        description: description || undefined,
        area: area || 'Mumbai',
        category: category || undefined,
        bmc_subcategory: bmcSubcategory || undefined,
        image_url: _imgData || undefined,
        urgency: !!isUrgent,
        reporter_name: 'Anonymous',
        poll_options: pollOptions,
      };

      try {
        await fetch(`${API}/api/public/voice`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch(e) {}

      if (_imgData) {
        const feed = document.querySelector('.voice-layout > div');
        const card = document.createElement('div');
        card.className = 'topic-card rv in';
        card.style.marginBottom = '16px';
        card.innerHTML =
          `<div class="tc-header">
            <div class="tc-avatar">👤</div>
            <div class="tc-meta">
              <div class="tc-author-row"><span class="tc-author">You</span><span class="tc-dot">·</span><span class="tc-time">Just now</span></div>
              <div class="tc-badges"><span class="badge-type discussion">💬 Post</span></div>
            </div>
          </div>
          <div class="tc-title">${title}</div>
          <div class="tc-body-wrap">
            <div class="tc-body-inner"><p style="font-size:13px;color:#4B5563;line-height:1.75;font-weight:300;margin:0;">Your post is now live on Mumbai Voice.</p></div>
            <img class="tc-sq-img" src="${_imgData}" alt="${title}" onclick="openLightbox(this.src)"/>
          </div>
          <div class="tc-footer">
            <button class="tc-action upvote" onclick="upvote(this)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span class="uv-count">0</span> Upvotes</button>
            <div class="tc-sep"></div>
            <button class="tc-action share" onclick="sharePost()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share</button>
          </div>`;
        feed.insertBefore(card, feed.firstChild);
        _imgData = null;
      }
      closeModal();
      alert('Topic published successfully! It will appear in the feed shortly.');
    }

    const api = {
      switchTab, filterBy, upvote, vote, openComments, closeComments, closeCommentsOnBg,
      submitComment, sharePost, submitQuickComplaint, loadMore, openModal, closeModal,
      closeModalOnBg, selectType, addOption, delOption, toggleUrgent, handleCategoryChange,
      imgSelect, imgRemove, imgDrag, imgDrop, openLightbox, closeLightbox, submitTopic
    };
    Object.assign(window, api);

    // ====== SEED DATA (fallback when API unavailable) ======
    const SEED_TOPICS = [
      { id:1, type:'poll', title:'How would you rate the road conditions on S V Road, Borivali West right now?', description:'The stretch from Borivali Station to IC Colony has been deteriorating for months. Potholes are getting worse after last month\'s rains. Sharing this poll so we can collectively voice this to the BMC ward office. Please vote honestly.', area:'Borivali West', category:'Infrastructure', reporter_name:'Rahul D.', upvotes:218, views:1200, comment_count:47, urgency:false, poll_options:[{id:1,emoji:'✅',label:'Good — No major issues',votes:41,pct:12},{id:2,emoji:'😐',label:'Okay — Could be better',votes:82,pct:24},{id:3,emoji:'😤',label:'Bad — Potholes everywhere',votes:130,pct:38},{id:4,emoji:'🚨',label:'Unacceptable — Dangerous & ignored',votes:89,pct:26}], total_poll_votes:342, poll_status:'Live', handle:'@rahul_bw', time:'2 hrs ago' },
      { id:2, type:'complaint', title:'Broken street lights on Lokhandwala Road for 3 weeks — no response from BMC', description:'The stretch between DN Nagar and Lokhandwala Circle has had 6 non-functional streetlights for over 3 weeks. I\'ve filed 2 complaints on the BMC portal (complaint numbers BMC-2026-3471 and BMC-2026-3892) with zero response. This is creating a serious safety hazard for women walking at night.', area:'Andheri West', category:'Safety', reporter_name:'Sunita A.', upvotes:341, views:2100, comment_count:28, urgency:true, image_url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', handle:'@sunita_andheri', time:'5 hrs ago', agree_label:'I have this issue too', agree_count:89 },
      { id:3, type:'poll', title:'How often do you face auto-rickshaw refusal in Kandivali West?', description:'Auto refusals have been a persistent issue on Poisar–Kandivali stretch. Before filing an RTI, I want to understand how many Mumbaikars face this daily.', area:'Kandivali West', category:'Transport', reporter_name:'Vikram N.', upvotes:127, views:876, comment_count:22, urgency:false, poll_options:[{id:5,emoji:'😊',label:'Rarely or never',votes:15,pct:8},{id:6,emoji:'😐',label:'Occasionally (once a week)',votes:36,pct:19},{id:7,emoji:'😤',label:'Often — Almost every other day',votes:78,pct:41},{id:8,emoji:'🤬',label:'Daily — It\'s a nightmare',votes:60,pct:32}], total_poll_votes:189, poll_status:'Live', handle:'@vikram_kandivali', time:'Yesterday' },
      { id:4, type:'win', title:'BMC fixed the Carter Road footpath after 247 upvotes on Mumbai Voice! 🙌', description:'Remember the Carter Road footpath complaint I posted 6 weeks ago? After 247 upvotes and 89 comments, a BMC ward officer reached out via Mumbai96. The repairs were completed yesterday. Proof that our voices matter when we\'re loud enough together. Thank you all!', area:'Bandra West', category:'Civic Success', reporter_name:'Meera J.', upvotes:412, views:3400, comment_count:64, urgency:false, image_url:'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=300&q=80', handle:'@meera_bandra', time:'2 days ago', is_win:true },
      { id:5, type:'discussion', title:'Tree felling on Gokhale Road without prior notice — who gave permission?', description:'At least 4 trees were cut on Gokhale Road last Tuesday morning without any visible notice or BMC permission boards. These trees were 20+ years old. Has anyone filed an RTI? I\'m looking to understand the process and would welcome support from other residents who witnessed this.', area:'Dadar West', category:'Environment', reporter_name:'Priya K.', upvotes:156, views:1100, comment_count:31, urgency:false, handle:'@priya_dadar', time:'3 days ago', agree_label:'I saw this', agree_count:34 },
    ];

    const SEED_COMMENTS = {
      '1': [{author_name:'Rahul D.',text:'Completely agree — this stretch has been a nightmare since March.',created_at:'2026-05-26T12:00:00Z'},{author_name:'Amit M.',text:'Filed a complaint last week, still no acknowledgement from BMC ward 94.',created_at:'2026-05-26T13:00:00Z'},{author_name:'Priya S.',text:'Sharing this to our Borivali residents WhatsApp group right now!',created_at:'2026-05-26T13:15:00Z'}],
      '2': [{author_name:'Vikram K.',text:'This is a known issue — I nearly tripped here last Monday night.',created_at:'2026-05-26T08:00:00Z'},{author_name:'Sneha A.',text:'Filed the same complaint on the MyBMC app. Zero response in 2 weeks.',created_at:'2026-05-26T09:00:00Z'},{author_name:'Rohan N.',text:'The women\'s safety aspect is serious. Ward officer needs to be held accountable.',created_at:'2026-05-26T11:00:00Z'}],
      '3': [{author_name:'Meera J.',text:'Kandivali stretch is the worst — refused 3 times in one morning!',created_at:'2026-05-25T22:00:00Z'},{author_name:'Kiran P.',text:'RTI is a great idea. I can help draft it if you want to collaborate.',created_at:'2026-05-26T02:00:00Z'}],
      '4': [{author_name:'Sunita A.',text:'This gives me hope! Will keep pushing on my Lokhandwala complaint too.',created_at:'2026-05-25T10:00:00Z'},{author_name:'Dev J.',text:'Incredible result. Mumbai96 is actually making a difference. 🙌',created_at:'2026-05-25T14:00:00Z'}],
    };

    // ====== BUILD CARD HTML ======
    function buildTopicCardHTML(t) {
      const badges = t.type === 'poll' ? '📊 Poll' : t.type === 'complaint' ? '⚠️ Complaint' : t.type === 'discussion' ? '💬 Discussion' : '🎉 Win';
      const badgeClass = t.type === 'poll' ? 'poll' : t.type === 'complaint' ? 'complaint' : t.type === 'discussion' ? 'discussion' : 'appreciation';
      const imgHtml = t.image_url
        ? `<div class="tc-body-wrap" style="padding:0 20px;margin-bottom:14px;align-items:flex-start"><div style="flex:1;min-width:0"><div class="tc-title" style="padding:0;margin-bottom:8px">${t.title}</div>${t.description ? `<p style="font-size:13px;color:#4B5563;line-height:1.75;font-weight:300;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">${t.description}</p>` : ''}</div><img class="tc-sq-img" src="${t.image_url}" alt="" loading="lazy" onclick="openLightbox(this.src)" style="width:100px;height:100px;border-radius:12px;object-fit:cover;flex-shrink:0;cursor:pointer"/></div>`
        : t.description
          ? `<p class="tc-body-text">${t.description}</p>`
          : '';
      const urgencyBadge = t.urgency ? '<span class="badge-urgent">Urgent</span>' : '';
      const handle = t.handle ? `<span class="tc-handle">${t.handle}</span>` : '';

      let pollHTML = '';
      if (t.type === 'poll' && t.poll_options) {
        const total = t.total_poll_votes || t.poll_options.reduce((s,o) => s + o.votes, 0);
        pollHTML = `<div class="poll-widget">
          <div class="poll-header"><div class="poll-header-left"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>${total} votes cast</div><span class="poll-status">● ${t.poll_status || 'Live'}</span></div>
          ${t.poll_options.map(o => `<button class="poll-option" onclick="vote(this,'${o.label}',${o.id})"><div class="po-inner"><div class="po-bar ${o.pct <= 15 ? 'good' : o.pct <= 30 ? 'ok' : o.pct <= 40 ? 'bad' : 'unacceptable'}" style="width:${o.pct}%"></div><div class="po-check"></div><span class="po-emoji">${o.emoji}</span><span class="po-label">${o.label}</span><span class="po-pct">${o.pct}%</span><span class="po-count">${o.votes} votes</span></div></button>`).join('')}
          <div class="poll-result-show"><span>${total} Mumbaikars voted</span><span style="color:var(--red);font-weight:700;font-size:11px">Share Poll →</span></div>
        </div>`;
      }

      const agreeBtn = t.agree_label
        ? `<div class="tc-sep"></div><button class="tc-action agree on" onclick="this.classList.toggle('on')">✓ ${t.agree_label} — <span>${t.agree_count}</span></button>`
        : '';

      const flagBtn = t.type === 'complaint' ? `<div class="tc-sep"></div><button class="tc-action report-btn">⚑ Flag to BMC</button>` : '';
      const celebrationBtn = t.is_win ? `<div class="tc-sep"></div><button class="tc-action agree on">❤️ <span>${t.upvotes}</span> Celebrations</button>` : '';

      return `<div class="topic-card ${t.type === 'poll' ? 'poll-card' : ''} rv in" id="card-${t.id}" style="margin-bottom:16px">
        <div class="tc-header">
          <div class="tc-avatar">${t.type === 'poll' ? '🏗️' : t.type === 'complaint' ? '⚠️' : t.type === 'discussion' ? '🌳' : '🎉'}</div>
          <div class="tc-meta">
            <div class="tc-author-row">
              <span class="tc-author">${t.reporter_name || 'Anonymous'}</span>
              ${handle}
              <span class="tc-dot">·</span>
              <span class="tc-time">${t.time || 'Just now'}</span>
              <span class="tc-hood-tag">📍 ${t.area}</span>
            </div>
            <div class="tc-badges">
              <span class="badge-type ${badgeClass}">${badges}</span>
              ${t.category ? `<span class="badge-cat">${t.category}</span>` : ''}
              ${urgencyBadge}
            </div>
          </div>
        </div>
        ${!t.image_url && t.type !== 'poll' ? `<div class="tc-title" style="${!t.description ? 'margin-bottom:14px' : ''}">${t.title}</div>` : ''}
        ${imgHtml}
        ${!t.image_url ? (t.type !== 'poll' ? '' : `<div class="tc-title" style="${!t.description ? '' : ''}">${t.title}</div>`) : ''}
        ${pollHTML}
        <div class="tc-footer">
          ${!t.is_win ? `<button class="tc-action upvote" onclick="upvote(this)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg><span class="uv-count">${t.upvotes || 0}</span> Upvotes</button>` : ''}
          ${celebrationBtn}
          ${agreeBtn}
          <div class="tc-sep"></div>
          <button class="tc-action" onclick="openComments('card-${t.id}')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ${t.comment_count || 0} Comments</button>
          <div class="tc-sep"></div>
          <button class="tc-action share" onclick="sharePost()"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>Share</button>
          ${flagBtn}
          <div class="tc-action-views">👁 ${(t.views || 0).toLocaleString()} views</div>
        </div>
      </div>`;
    }

    function updateHeroStats(topics) {
      const totalTopics = document.getElementById('statTotalTopics');
      const totalVotes = document.getElementById('statTotalVotes');
      const totalAreas = document.getElementById('statTotalAreas');
      const totalVoteCount = topics.reduce((s,t) => s + (t.upvotes || 0) + (t.total_poll_votes || 0), 0);
      const areas = new Set(topics.map(t => t.area));
      if (totalTopics) totalTopics.textContent = topics.length;
      if (totalVotes) totalVotes.textContent = totalVoteCount > 999 ? Math.round(totalVoteCount / 1000) + 'k' : totalVoteCount;
      if (totalAreas) totalAreas.textContent = areas.size;

      document.getElementById('statBarTopics') && (document.getElementById('statBarTopics').textContent = topics.length > 999 ? Math.round(topics.length / 1000) + 'k' : topics.length);
      document.getElementById('statBarVotes') && (document.getElementById('statBarVotes').textContent = totalVoteCount > 999 ? Math.round(totalVoteCount / 1000) + 'k' : totalVoteCount);
      document.getElementById('statBarAreas') && (document.getElementById('statBarAreas').textContent = areas.size);

      const polls = topics.filter(t => t.type === 'poll').length;
      const complaints = topics.filter(t => t.type === 'complaint').length;
      const discussions = topics.filter(t => t.type === 'discussion').length;
      const wins = topics.filter(t => t.type === 'win').length;
      document.querySelectorAll('.vh-tab').forEach((el, i) => {
        const counts = [topics.length, polls, complaints, discussions, wins];
        const span = el.querySelector('.vh-tab-count');
        if (span) span.textContent = counts[i] || 0;
      });

      const areaGrid = document.getElementById('activeAreasGrid');
      if (areaGrid) {
        const areaCounts = {};
        topics.forEach(t => { areaCounts[t.area] = (areaCounts[t.area] || 0) + 1; });
        const sorted = Object.entries(areaCounts).sort((a,b) => b[1] - a[1]).slice(0, 6);
        areaGrid.innerHTML = sorted.map(([area, count]) =>
          `<div class="hood-tag">${area} <strong style="font-size:9px;color:var(--red);display:block">${count} topics</strong></div>`
        ).join('') || '<div style="font-size:11px;color:var(--muted)">No active areas</div>';
      }

      const loadBtn = document.getElementById('loadMoreBtn');
      if (loadBtn) {
        const remaining = _hasMore ? Math.max(0, _paginationTotal - _allTopics.length) : 0;
        loadBtn.textContent = remaining > 0 ? `Load More Topics (${remaining.toLocaleString()} remaining)` : 'All Topics Loaded';
        loadBtn.disabled = !_hasMore;
      }
    }

    function updateHotNow(topics) {
      const el = document.getElementById('hotRightNow');
      if (!el) return;
      const sorted = [...topics].sort((a,b) => (b.upvotes || 0) - (a.upvotes || 0)).slice(0, 5);
      el.innerHTML = sorted.map((t, i) =>
        `<div class="hot-item">
          <div class="hi-rank">${String(i+1).padStart(2,'0')}</div>
          <div class="hi-info">
            <div class="hi-tag">${t.category || 'General'}</div>
            <div class="hi-title">${t.title.length > 40 ? t.title.slice(0,40) + '…' : t.title}</div>
            <div class="hi-meta">${t.area} · ${t.time || 'Just now'}</div>
          </div>
        </div>`
      ).join('');
    }

    // ====== LOAD & RENDER TOPICS ======
    async function loadAndRenderTopics() {
      let topics = SEED_TOPICS;
      _paginationPage = 1;
      _paginationTotal = 0;
      _hasMore = false;
      _allTopics = [];

      if (initialTopics.length > 0) {
        topics = initialTopics;
        _allTopics = initialTopics;
        if (initialPagination) {
          _paginationTotal = initialPagination.total;
          _hasMore = initialPagination.has_next;
        }
      } else {
        try {
          const res = await fetch(`${API}/api/public/voice?per_page=10&sort=newest`);
          if (res.ok) {
            const data = await res.json();
            if (data.topics && data.topics.length > 0) {
              topics = data.topics.map(t => ({
                ...t,
                handle: null,
                time: t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Just now',
              }));
              _allTopics = topics;
              _paginationTotal = data.pagination.total;
              _hasMore = data.pagination.has_next;
              _paginationPage = 1;
            }
          }
        } catch(e) {}
      }

      const feed = document.getElementById('topicsFeed');
      if (feed) {
        feed.innerHTML = topics.map(t => buildTopicCardHTML(t)).join('');
      }

      updateHeroStats(topics);
      updateHotNow(topics);
    }

    loadAndRenderTopics();

    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .05 });
    document.querySelectorAll('.rv').forEach(el => obs.observe(el));

    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeComments(); } });

    return () => Object.keys(api).forEach(k => delete window[k]);
  }, []);

  return (
    <>
      {/* HERO */}
      <div className="voice-hero">
        <div className="vh-grid"></div>
        <div className="vh-glow1"></div>
        <div className="vh-glow2"></div>
        <div className="con">
          <div className="vh-inner">
            <div>
              <div className="vh-eyebrow">Mumbai96 · Your City. Your Voice.</div>
              <h1 className="vh-h1">Mumbai <em>Voice</em></h1>
              <p className="vh-desc">Vote on area issues. Raise complaints. Start discussions. This is your platform to be heard — by your community, by local authorities, and by Mumbai itself.</p>
            </div>
            <div className="vh-stats">
              <div className="vhs-item"><div className="vhs-n" id="statTotalTopics">—</div><div className="vhs-l">Topics</div></div>
              <div className="vhs-item"><div className="vhs-n" id="statTotalVotes">—</div><div className="vhs-l">Votes Cast</div></div>
              <div className="vhs-item"><div className="vhs-n" id="statTotalAreas">—</div><div className="vhs-l">Areas</div></div>
            </div>
          </div>
          <div className="create-banner rv" onClick={() => openModal()} style={{ marginTop: '28px', marginBottom: '0' }}>
            <div className="cb-avatar">👤</div>
            <div className="cb-input-fake">What's happening in your area? Start a poll, raise a complaint, share a win…</div>
            <div className="cb-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Raise Your Voice
            </div>
          </div>

          <div className="vh-tabs">
            <span className="vh-tab on" onClick={e => switchTab(e.target, 'all')}>🔥 Trending <span className="vh-tab-count">24</span></span>
            <span className="vh-tab" onClick={e => switchTab(e.target, 'polls')}>📊 Active Polls <span className="vh-tab-count">12</span></span>
            <span className="vh-tab" onClick={e => switchTab(e.target, 'complaints')}>⚠️ Complaints <span className="vh-tab-count">38</span></span>
            <span className="vh-tab" onClick={e => switchTab(e.target, 'discussions')}>💬 Discussions <span className="vh-tab-count">19</span></span>
            <span className="vh-tab" onClick={e => switchTab(e.target, 'wins')}>🎉 Wins <span className="vh-tab-count">7</span></span>
          </div>
        </div>
      </div>

      <div className="voice-body">
        <div className="con">
          <div className="voice-layout">
            {/* FEED COLUMN */}
            <div>
              <div className="filter-row rv">
                <div className="filter-chips">
                  <span className="fc on" onClick={e => filterBy(e.target, 'all')}>All</span>
                  <span className="fc" onClick={e => filterBy(e.target, 'infra')}>🏗️ Infrastructure</span>
                  <span className="fc" onClick={e => filterBy(e.target, 'traffic')}>🚦 Traffic</span>
                  <span className="fc" onClick={e => filterBy(e.target, 'safety')}>🔒 Safety</span>
                  <span className="fc" onClick={e => filterBy(e.target, 'civic')}>🏛️ Civic</span>
                  <span className="fc" onClick={e => filterBy(e.target, 'env')}>🌿 Environment</span>
                </div>
                <div className="filter-sort">
                  Sort:
                  <select>
                    <option>Most Votes</option>
                    <option>Most Recent</option>
                    <option>Most Comments</option>
                    <option>Unresolved</option>
                  </select>
                </div>
              </div>

              <div id="topicsFeed"></div>

              <div style={{textAlign:'center',marginTop:'8px'}} className="rv">
                <button id="loadMoreBtn" onClick={() => loadMore()} style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#fff',border:'1.5px solid var(--border)',borderRadius:'100px',padding:'13px 36px',fontFamily:'Sora,sans-serif',fontSize:'13px',fontWeight:'700',cursor:'pointer',transition:'all .2s'}}
                  onMouseOver={e => { e.target.style.borderColor='var(--red)'; e.target.style.color='var(--red)' }}
                  onMouseOut={e => { e.target.style.borderColor='var(--border)'; e.target.style.color='var(--ink)' }}>
                  Load More Topics
                </button>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="voice-sidebar rv d2">
              <div className="sb-widget">
                <div className="sbw-head">How It <em>Works</em></div>
                <div className="sbw-body">
                  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                    <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'var(--dark)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',flexShrink:'0'}}>1</div>
                      <div><strong style={{fontSize:'12px',display:'block',marginBottom:'3px'}}>Create a Topic</strong><span style={{fontSize:'11px',color:'var(--muted)',fontWeight:'300',lineHeight:'1.5'}}>Start a poll, raise a complaint or share an issue in your locality.</span></div>
                    </div>
                    <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'var(--red)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',flexShrink:'0'}}>2</div>
                      <div><strong style={{fontSize:'12px',display:'block',marginBottom:'3px'}}>Community Votes</strong><span style={{fontSize:'11px',color:'var(--muted)',fontWeight:'300',lineHeight:'1.5'}}>Mumbaikars upvote, vote in polls and add their voice in comments.</span></div>
                    </div>
                    <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
                      <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'var(--gold)',color:'#111',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'800',flexShrink:'0'}}>3</div>
                      <div><strong style={{fontSize:'12px',display:'block',marginBottom:'3px'}}>Change Happens</strong><span style={{fontSize:'11px',color:'var(--muted)',fontWeight:'300',lineHeight:'1.5'}}>High-upvote complaints get flagged to relevant civic bodies. Collectively, we're louder.</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">🔥 Hot Right <em>Now</em></div>
                <div className="sbw-body" id="hotRightNow">
                  <div style={{fontSize:'12px',color:'var(--muted)',fontWeight:'300'}}>Loading…</div>
                </div>
              </div>

              <div className="sb-widget">
                <div className="sbw-head">Active <em>Areas</em></div>
                <div className="sbw-body">
                  <div className="hood-grid" id="activeAreasGrid">
                    <div style={{fontSize:'12px',color:'var(--muted)',fontWeight:'300'}}>Loading…</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="con">
          <div className="sb-inner">
            <div className="sbi"><div className="sbi-n" id="statBarTopics">—</div><div className="sbi-l">Topics Created</div></div>
            <div className="sbi"><div className="sbi-n" id="statBarVotes">—</div><div className="sbi-l">Votes Cast</div></div>
            <div className="sbi"><div className="sbi-n">47</div><div className="sbi-l">Issues Resolved</div></div>
            <div className="sbi"><div className="sbi-n" id="statBarAreas">—</div><div className="sbi-l">Areas Active</div></div>
            <div className="sbi"><div className="sbi-n">6.2k</div><div className="sbi-l">Mumbaikars Participating</div></div>
          </div>
        </div>
      </div>

      {/* CREATE TOPIC MODAL */}
      <div className="modal-overlay" id="modalOverlay" onClick={e => closeModalOnBg(e)}>
        <div className="modal">
          <div className="modal-head">
            <h3>Create a <em>Topic</em></h3>
            <button className="modal-close" onClick={() => closeModal()}>✕</button>
          </div>
          <div className="modal-body">
            <div className="form-label">What type of post is this? <span>*</span></div>
            <div className="type-selector">
              <div className="type-opt on" onClick={e => selectType(e.target, 'poll')}><div className="to-icon">📊</div><div className="to-label">Poll</div></div>
              <div className="type-opt" onClick={e => selectType(e.target, 'complaint')}><div className="to-icon">⚠️</div><div className="to-label">Complaint</div></div>
              <div className="type-opt" onClick={e => selectType(e.target, 'discussion')}><div className="to-icon">💬</div><div className="to-label">Discussion</div></div>
              <div className="type-opt" onClick={e => selectType(e.target, 'win')}><div className="to-icon">🎉</div><div className="to-label">Win / Update</div></div>
            </div>

            <div className="form-group">
              <div className="form-label">Title / Question <span>*</span></div>
              <input className="form-input" type="text" placeholder="e.g. How are the roads in Borivali West right now?" maxLength="120"/>
              <div style={{fontSize:'10px',color:'var(--muted)',marginTop:'5px'}}>Keep it clear and specific. 120 chars max.</div>
            </div>

            <div className="modal-inline-row">
              <div className="form-group">
                <div className="form-label">Area <span>*</span></div>
                <select className="form-select">
                  <option value="">Select area…</option>
                  <option>Andheri West</option><option>Borivali West</option><option>Kandivali West</option>
                  <option>Bandra West</option><option>Dadar West</option><option>Goregaon West</option>
                  <option>Malad West</option><option>Juhu</option><option>Worli</option>
                  <option>South Mumbai</option><option>Other (City-wide)</option>
                </select>
              </div>
              <div className="form-group">
                <div className="form-label">Category <span>*</span></div>
                <select className="form-select" id="mainCategorySelect" onChange={e => handleCategoryChange(e.target.value)}>
                  <option value="">Select…</option>
                  <option value="BMC">🏛️ BMC</option>
                  <option value="Traffic Police">🚦 Traffic Police</option>
                  <option value="Police">👮 Police</option>
                  <option value="MHADA">🏢 MHADA</option>
                  <option value="Environment">🌿 Environment</option>
                  <option value="Noise">🔊 Noise / Pollution</option>
                  <option value="Passport">📄 Passport / Govt Documents</option>
                  <option value="Other">📌 Other</option>
                </select>
              </div>
            </div>

            <div className="form-group" id="bmcSubGroup" style={{display:'none',marginTop:'-8px'}}>
              <div className="form-label" style={{display:'flex',alignItems:'center',gap:'6px'}}>
                🏛️ BMC Department <span style={{color:'var(--tag-safety)'}}>*</span>
              </div>
              <select className="form-select" id="bmcSubSelect">
                <option value="">Select BMC department…</option>
                <option value="Garbage & Sanitation">🗑️ Garbage & Sanitation</option>
                <option value="Roads">🛣️ Roads</option>
                <option value="Dogs">🐕 Dogs (Stray / Menace)</option>
                <option value="Water">💧 Water Supply</option>
                <option value="Sewerage">🚰 Sewerage</option>
                <option value="Cleanliness">🧹 Cleanliness</option>
                <option value="Storm Water">🌧️ Storm Water / Drainage</option>
                <option value="Bridges">🌉 Bridges</option>
                <option value="Hospitals">🏥 Hospitals</option>
                <option value="Schools">🏫 Schools</option>
                <option value="Garden">🌳 Garden / Parks</option>
                <option value="Tree">🌲 Tree (Cutting / Fallen)</option>
                <option value="Encroachment">🚧 Encroachment</option>
                <option value="Pest Control">🐜 Pest Control</option>
                <option value="Property Tax">🏠 Property Tax</option>
                <option value="Birth/Death Certificate">📋 Birth / Death Certificate</option>
                <option value="Disaster Management">🆘 Disaster Management</option>
                <option value="Fire Brigade">🚒 Fire Brigade</option>
                <option value="Other">📌 Other BMC Issue</option>
              </select>
              <div className="bmc-hint">📌 This helps route your complaint to the right BMC department faster.</div>
            </div>

            <div className="form-group">
              <div className="form-label">Description</div>
              <textarea className="form-textarea" placeholder="Give more context. Include street names, dates, any complaint numbers you've filed…"></textarea>
            </div>

            <div className="form-group" id="pollBuilderSection">
              <div className="form-label">Poll Options <span>*</span></div>
              <div className="poll-builder" id="pollBuilder">
                <div className="pb-option"><span className="pb-emoji">✅</span><input className="pb-input" type="text" placeholder="Option 1 (e.g. Good)"/><button className="pb-del" onClick={e => delOption(e.target)}>✕</button></div>
                <div className="pb-option"><span className="pb-emoji">😐</span><input className="pb-input" type="text" placeholder="Option 2 (e.g. Okay)"/><button className="pb-del" onClick={e => delOption(e.target)}>✕</button></div>
                <div className="pb-option"><span className="pb-emoji">😤</span><input className="pb-input" type="text" placeholder="Option 3 (e.g. Bad)"/><button className="pb-del" onClick={e => delOption(e.target)}>✕</button></div>
                <div className="pb-option"><span className="pb-emoji">🚨</span><input className="pb-input" type="text" placeholder="Option 4 (e.g. Unacceptable)"/><button className="pb-del" onClick={e => delOption(e.target)}>✕</button></div>
                <button className="add-option-btn" onClick={() => addOption()}>+ Add another option</button>
              </div>
              <div style={{fontSize:'10px',color:'var(--muted)',marginTop:'6px'}}>2–6 options. Voters can only pick one.</div>
            </div>

            <div className="form-group" id="imgUploadGroup" style={{display:'none'}}>
              <div className="form-label">📷 Add a Photo <span style={{fontWeight:'300',textTransform:'none',letterSpacing:'0',fontSize:'10px',color:'var(--muted)'}}>(optional · 1 image · helps get noticed)</span></div>
              <div className="img-upload-zone" id="imgUploadZone" onDragOver={e => imgDrag(e,true)} onDragLeave={e => imgDrag(e,false)} onDrop={e => imgDrop(e)}>
                <input type="file" accept="image/*" id="imgFileInput" onChange={e => imgSelect(e.target)}/>
                <div id="imgUploadPrompt">
                  <div className="iuz-icon">🖼️</div>
                  <div className="iuz-label">Tap to upload or drag & drop</div>
                  <div className="iuz-sub">JPG, PNG, WEBP · Max 5MB</div>
                </div>
                <div id="imgPreviewArea" style={{display:'none'}}>
                  <div className="img-preview-wrap">
                    <img id="imgThumb" className="img-preview-thumb" src="" alt=""/>
                    <div className="img-preview-info">
                      <div className="img-preview-name" id="imgFileName"></div>
                      <div className="img-preview-size" id="imgFileSize"></div>
                    </div>
                    <button className="img-remove-btn" onClick={e => imgRemove(e)}>✕ Remove</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">Mark as Urgent?</div>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                <span onClick={e => toggleUrgent(e.target)} style={{padding:'8px 16px',borderRadius:'100px',border:'1.5px solid var(--border)',fontSize:'12px',fontWeight:'700',cursor:'pointer',transition:'all .18s',background:'#fff'}}>🚨 Yes — Needs immediate attention</span>
                <span style={{padding:'8px 16px',borderRadius:'100px',border:'1.5px solid var(--border)',fontSize:'12px',fontWeight:'700',cursor:'pointer',background:'rgba(55,27,88,.05)',borderColor:'var(--dark)',color:'var(--dark)'}}>No — General issue</span>
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <div className="modal-foot-note">Your name will appear as your Mumbai96 username. Posts are public.</div>
            <button className="modal-submit" onClick={() => submitTopic()}>
              Raise Your Voice
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* COMMENTS MODAL */}
      <div className="comments-overlay" id="commentsOverlay" onClick={e => closeCommentsOnBg(e)}>
        <div className="comments-panel" id="commentsPanel">
          <div className="cp-head">
            <div className="cp-head-left">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span id="cpTitle">Comments</span>
            </div>
            <button className="cp-close" onClick={() => closeComments()}>✕</button>
          </div>
          <div className="cp-comments-list" id="cpCommentsList"></div>
          <div className="cp-composer">
            <div className="cp-avatar">👤</div>
            <div className="cp-input-wrap">
              <textarea className="cp-textarea" id="cpTextarea" placeholder="Share your thoughts… (150 chars max)" maxLength="150" rows="2" onInput={e => updateCharCount(e.target)}></textarea>
              <div className="cp-input-footer">
                <span className="cp-char-count" id="cpCharCount">150 left</span>
                <button className="cp-submit" id="cpSubmitBtn" onClick={() => submitComment()} disabled>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <div className="lightbox" id="lightbox" onClick={() => closeLightbox()}>
        <img id="lbImg" src="" alt=""/>
        <button className="lb-close" onClick={() => closeLightbox()}>✕</button>
      </div>
    </>
  );
}
