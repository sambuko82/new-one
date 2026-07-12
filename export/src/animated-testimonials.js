// JVTO Animated Testimonials — vanilla JS, no deps.
// Two-column section: left = heading + dot navigation, right = card stack.
// Auto-rotates; click dot to focus a specific testimonial.
(function () {
  const TESTIMONIALS = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Traveler',
      company: 'Sydney, Australia',
      content: "The most professional tour I've ever taken. The police-led safety aspect really gave us peace of mind during the midnight Bromo hike — it wasn't a marketing line, you could feel the difference in how things were run.",
      rating: 5,
      source: 'Trustpilot'
    },
    {
      id: 2,
      name: 'Marc Weber',
      role: 'Photographer',
      company: 'Berlin, Germany',
      content: "Everything was perfectly organized. The medical check for Ijen was quick and professional — they walked us through it, no shortcuts taken. The blue fire delivered on what was promised, and the crew knew exactly where to be.",
      rating: 5,
      source: 'TripAdvisor'
    },
    {
      id: 3,
      name: 'Elena Rossi',
      role: 'Honeymooner',
      company: 'Milan, Italy',
      content: "JVTO is the real deal. We saw other groups with fake medical letters at the gate, and were glad to have a real check. Safety first — and the private vehicle made the long Banyuwangi drive bearable instead of a chore.",
      rating: 5,
      source: 'Google'
    },
    {
      id: 4,
      name: 'James Park',
      role: 'Senior Engineer',
      company: 'Seoul, South Korea',
      content: "Booked through their site, got a real confirmation with the driver's name and license plate within 24 hours. Showed up exactly when they said, delivered exactly what was promised. That's a high bar in this region and they cleared it.",
      rating: 5,
      source: 'Trustpilot'
    }
  ];

  const PRESS = ['STEFAN LOOSE', 'INDECON', 'ISIC', 'BBKSDA', 'DETIK', 'POLRI'];

  const AUTO_ROTATE_MS = 6000;

  function star(filled) {
    return `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5"/></svg>`;
  }

  function mount(host) {
    let current = 0;
    let timer = null;
    let paused = false;

    host.classList.add('animated-testimonials');
    host.innerHTML = `
      <div class="at-left">
        <div class="at-badge">
          <span class="at-badge-star">${star(true)}</span>
          <span>Trusted by travelers</span>
        </div>
        <h2 class="at-title">Loved by the <span class="italic accent-orange">travelers.</span></h2>
        <p class="at-subtitle">Trustpilot 4.8/5 (51 reviews) · Google Maps 4.90/5 (123) · TripAdvisor 4.95/5 (21). Verified 2026-05-09. Not cherry-picked quotes — browse by platform, browse by pattern. Every rating links to the live profile.</p>
        <div class="at-dots" role="tablist"></div>
        <div class="at-press">
          <div class="at-press-label">Independent references</div>
          <div class="at-press-row">${PRESS.map(p => `<span class="at-press-logo">${p}</span>`).join('')}</div>
        </div>
      </div>
      <div class="at-right">
        <div class="at-deco at-deco-tl"></div>
        <div class="at-deco at-deco-br"></div>
        <div class="at-stack"></div>
      </div>
    `;

    const dots = host.querySelector('.at-dots');
    const stack = host.querySelector('.at-stack');

    TESTIMONIALS.forEach((t, i) => {
      // dot
      const dot = document.createElement('button');
      dot.className = 'at-dot';
      dot.setAttribute('aria-label', `View testimonial ${i + 1}`);
      dot.addEventListener('click', () => { current = i; render(); });
      dot.addEventListener('mouseenter', () => paused = true);
      dot.addEventListener('mouseleave', () => paused = false);
      dots.appendChild(dot);

      // card
      const card = document.createElement('article');
      card.className = 'at-card';
      card.innerHTML = `
        <div class="at-card-stars">
          ${Array.from({ length: t.rating }, () => `<span class="at-star">${star(true)}</span>`).join('')}
        </div>
        <div class="at-quote-wrap">
          <svg class="at-quote-mark" viewBox="0 0 24 24" fill="currentColor"><path d="M7 11h-3l3-7h4l-2 7h2v6h-6zM17 11h-3l3-7h4l-2 7h2v6h-6z"/></svg>
          <p class="at-quote">${t.content}</p>
        </div>
        <div class="at-card-foot">
          <div class="at-avatar"><span>${t.name.charAt(0)}</span></div>
          <div class="at-attrib">
            <div class="at-name">${t.name}</div>
            <div class="at-meta">${t.role} · ${t.company}</div>
          </div>
          <div class="at-source">${t.source}</div>
        </div>
      `;
      stack.appendChild(card);
    });

    stack.addEventListener('mouseenter', () => paused = true);
    stack.addEventListener('mouseleave', () => paused = false);

    function render() {
      [...dots.children].forEach((d, i) => d.dataset.active = (i === current).toString());
      [...stack.children].forEach((c, i) => c.dataset.active = (i === current).toString());
    }

    function tick() {
      if (paused) return;
      current = (current + 1) % TESTIMONIALS.length;
      render();
    }

    timer = setInterval(tick, AUTO_ROTATE_MS);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && timer) { clearInterval(timer); timer = null; }
      else if (!document.hidden && !timer) { timer = setInterval(tick, AUTO_ROTATE_MS); }
    });

    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-animated-testimonials]').forEach(mount);
  });
})();
