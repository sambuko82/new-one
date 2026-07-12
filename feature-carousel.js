// JVTO Feature Carousel — vanilla JS, no deps.
// Vertical chip stack on the left + image card on the right.
// Auto-rotates every 3.5s; pauses on hover/touch over chips or card.
(function () {
  const FEATURES = [
    {
      id: 'police',
      label: 'Police-Led',
      icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
      photoLabel: 'Bripka Agung Sambuko · Tourist Police, East Java',
      caption: 'Founder Bripka Agung Sambuko is an active officer of the Indonesian Tourist Police (Ditpamobvit, East Java). Every route, rule, and safety boundary answers to police protocol — not a marketing brief.',
      warm: false
    },
    {
      id: 'private',
      label: '100% Private',
      icon: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="17" cy="7" r="3"/>',
      photoLabel: 'Private 4WD jeep · Bromo sea of sand',
      caption: 'Every tour is private by default — your vehicle, your driver, your guide. No shared transfers, no schedule compromises with strangers, no last-minute logistics surprises.',
      warm: true
    },
    {
      id: 'inclusive',
      label: 'All-Inclusive',
      icon: '<path d="M21 8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>',
      photoLabel: 'Booking reference · inclusions in writing',
      caption: 'Entrance fees, the Bromo 4WD jeep, accommodation, breakfast, gas masks, and transfers are bundled in writing — published before you pay. No surprise local payments.',
      warm: false
    },
    {
      id: 'health',
      label: 'Ijen Health-Screening',
      icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
      photoLabel: 'Pre-ascent screening · partner clinic',
      caption: 'When BBKSDA access rules require a recent health certificate, we coordinate the clinic before the hike — with Dr. Ahmad Irwandanu, SIP-verified at satusehat.kemkes.go.id (Kemenkes RI).',
      warm: true
    },
    {
      id: 'licenses',
      label: 'Verifiable Licenses',
      icon: '<circle cx="12" cy="8" r="6"/><path d="M8.4 13.5L7 22l5-3 5 3-1.4-8.5"/>',
      photoLabel: 'NIB · HPWKI · BBKSDA · ISIC',
      caption: 'NIB 1102230032918 at oss.go.id, HPWKI specialist guide training, BBKSDA park clearance, ISIC Provider 259268. SHA-256 hashes for every credential document are published in public/llms.txt.',
      warm: false
    },
    {
      id: 'planb',
      label: 'Plan B When Conditions Change',
      icon: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/>',
      photoLabel: 'Plan-B route map · written SOP',
      caption: 'Bromo and Ijen can both close without warning. Our written Plan-B framework gives you an alternative route — briefed in advance, not improvised at the gate. You don\'t lose a day.',
      warm: true
    }
  ];

  const ITEM_HEIGHT = 56; // px — chip stride
  const AUTO_INTERVAL_MS = 3500;
  const TOTAL = FEATURES.length;

  function mod(a, n) { return ((a % n) + n) % n; }
  function wrap(v, len) {
    let d = v;
    if (d > len / 2) d -= len;
    if (d < -len / 2) d += len;
    return d;
  }

  // Build a single carousel instance from a host element
  function mount(host) {
    let current = 0;
    let paused = false;
    let timer = null;

    // ── chip column ──────────────────────────────────────────────
    const chipsCol = document.createElement('div');
    chipsCol.className = 'fc-chips';
    chipsCol.innerHTML = `
      <div class="fc-fade fc-fade-top"></div>
      <div class="fc-fade fc-fade-bottom"></div>
      <div class="fc-chip-track"></div>
    `;
    const track = chipsCol.querySelector('.fc-chip-track');

    FEATURES.forEach((f, i) => {
      const btn = document.createElement('button');
      btn.className = 'fc-chip';
      btn.dataset.idx = i;
      btn.innerHTML = `
        <span class="fc-chip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${f.icon}</svg></span>
        <span class="fc-chip-label">${f.label}</span>
      `;
      btn.addEventListener('click', () => {
        const diff = (i - current + TOTAL) % TOTAL;
        if (diff > 0) { current = i; render(); }
      });
      btn.addEventListener('mouseenter', () => paused = true);
      btn.addEventListener('mouseleave', () => paused = false);
      track.appendChild(btn);
    });

    // ── card column ──────────────────────────────────────────────
    const cardsCol = document.createElement('div');
    cardsCol.className = 'fc-cards';
    cardsCol.innerHTML = `<div class="fc-card-stack"></div>`;
    const stack = cardsCol.querySelector('.fc-card-stack');
    cardsCol.addEventListener('mouseenter', () => paused = true);
    cardsCol.addEventListener('mouseleave', () => paused = false);

    FEATURES.forEach((f, i) => {
      const card = document.createElement('div');
      card.className = 'fc-card';
      card.dataset.idx = i;
      card.innerHTML = `
        <div class="fc-card-img"><div class="ph-stripes${f.warm ? ' warm' : ''}"></div></div>
        <span class="ph-label tl" style="color:rgba(255,255,255,0.55);">${f.photoLabel}</span>
        <div class="fc-card-livedot">
          <span class="fc-dot"></span>
          <span class="fc-live">Live · ${String(i + 1).padStart(2, '0')} / ${String(TOTAL).padStart(2, '0')}</span>
        </div>
        <div class="fc-card-overlay">
          <div class="fc-card-chip">${String(i + 1).padStart(2, '0')} · ${f.label}</div>
          <p class="fc-card-cap">${f.caption}</p>
        </div>
      `;
      stack.appendChild(card);
    });

    // wrap both columns
    host.innerHTML = '';
    host.appendChild(chipsCol);
    host.appendChild(cardsCol);

    // ── render loop ──────────────────────────────────────────────
    function statusOf(i) {
      const d = wrap(i - current, TOTAL);
      if (d === 0) return 'active';
      if (d === -1) return 'prev';
      if (d === 1) return 'next';
      return 'hidden';
    }

    function render() {
      // chips
      [...track.children].forEach((el, i) => {
        const d = wrap(i - current, TOTAL);
        const opacity = Math.max(0, 1 - Math.abs(d) * 0.28);
        el.style.transform = `translateY(${d * ITEM_HEIGHT}px)`;
        el.style.opacity = opacity;
        el.dataset.active = (d === 0).toString();
      });
      // cards
      [...stack.children].forEach((el, i) => {
        const s = statusOf(i);
        el.dataset.status = s;
      });
    }

    function tick() {
      if (paused) return;
      current = mod(current + 1, TOTAL);
      render();
    }
    function startTimer() {
      stopTimer();
      timer = setInterval(tick, AUTO_INTERVAL_MS);
    }
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // visibility pause
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer(); else startTimer();
    });

    render();
    startTimer();
  }

  // Init all hosts on the page
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-carousel').forEach(mount);
  });
})();
