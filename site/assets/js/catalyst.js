/* CATALYST — progressive enhancement only.
   Nothing here is required to read the site. With JavaScript off: all content is
   visible, every project stays listed, the seal renders as a static emblem whose
   nodes are ordinary anchors, and no transform is ever applied. */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Reveal — one observer drives .reveal, .stagger, .mask and .draw.

     A .mask element hides itself with clip-path, which collapses its own
     intersection rectangle to nothing — so it can never observe itself back
     into view. Masks are therefore watched through their parent element.
     ------------------------------------------------------------------ */
  var animated = [].slice.call(document.querySelectorAll('.reveal, .stagger, .mask, .draw'));

  function reveal(el) {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    if (el.hasAttribute('data-count')) countUp(el);
    // A watched parent also releases any masks inside it.
    el.querySelectorAll && el.querySelectorAll('.mask').forEach(function (m) {
      m.classList.add('is-in');
    });
  }

  if (animated.length && 'IntersectionObserver' in window) {
    var watched = [];
    animated.forEach(function (el) {
      // Clipped elements are unobservable; watch a parent that still has a box.
      var proxy = el.classList.contains('mask') ? (el.parentElement || el) : el;
      if (watched.indexOf(proxy) === -1) watched.push(proxy);
      proxy.__catalystTargets = proxy.__catalystTargets || [];
      if (proxy.__catalystTargets.indexOf(el) === -1) proxy.__catalystTargets.push(el);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        (e.target.__catalystTargets || []).forEach(reveal);
        reveal(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });
    watched.forEach(function (el) { io.observe(el); });

    /* Failsafe — content must never stay hidden because an observer misfired.
       Anything already scrolled into view is released after a beat; content
       further down keeps its entrance. */
    var failsafe = function () {
      var edge = window.innerHeight + (window.scrollY || window.pageYOffset || 0) + 80;
      animated.forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        var box = el.getBoundingClientRect();
        var top = box.top + (window.scrollY || window.pageYOffset || 0);
        if (top < edge) reveal(el);
      });
    };
    setTimeout(failsafe, 1200);
    setTimeout(failsafe, 3000);
    // Anchor jumps and fast scrolling can skip past elements entirely, so the
    // sweep runs on every throttled scroll frame rather than only once.
    window.__catalystSweep = failsafe;
  } else {
    animated.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------
     Count-up on the stat band
     ------------------------------------------------------------------ */
  function countUp(host) {
    host.querySelectorAll('.n').forEach(function (el) {
      var raw = (el.textContent || '').trim();
      var target = parseInt(raw.replace(/\D/g, ''), 10);
      if (isNaN(target)) return;
      var pad = raw.length, t0 = null, dur = 1100;
      if (reduced) return;
      function frame(t) {
        if (t0 === null) t0 = t;
        var k = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - k, 3);
        el.textContent = String(Math.round(target * eased)).padStart(pad, '0');
        if (k < 1) requestAnimationFrame(frame); else el.textContent = raw;
      }
      el.textContent = String(0).padStart(pad, '0');
      requestAnimationFrame(frame);
    });
  }

  /* ------------------------------------------------------------------
     Parallax on artwork plates — opt in from JS so no-JS gets no transform
     ------------------------------------------------------------------ */
  var plates = [];
  if (!reduced) {
    document.querySelectorAll('.has-art').forEach(function (sec) {
      if (!sec.querySelector('.art-bg img')) return;
      sec.classList.add('has-parallax');
      plates.push(sec);
    });
  }
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var vh = window.innerHeight;
      plates.forEach(function (sec) {
        var r = sec.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        // -1 above the fold … +1 below it
        var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
        sec.style.setProperty('--py', (progress * 46).toFixed(1) + 'px');
      });
      if (window.__catalystSweep) window.__catalystSweep();
      var bar = document.querySelector('.progress i');
      if (bar) {
        var d = document.documentElement;
        var max = d.scrollHeight - d.clientHeight;
        bar.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + '%';
      }
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ------------------------------------------------------------------
     The Doctrine Seal
     ------------------------------------------------------------------ */
  var sealSvg = document.querySelector('.seal');
  var dataEl = document.querySelector('[data-seal-data]');
  if (sealSvg && dataEl) {
    var laws;
    try { laws = JSON.parse(dataEl.textContent); } catch (err) { laws = null; }
    if (laws) {
      var nodes = sealSvg.querySelectorAll('.seal-node');
      var read  = document.querySelector('[data-seal-read]');
      var elK   = read.querySelector('[data-seal-k]');
      var elN   = read.querySelector('[data-seal-name]');
      var elA   = read.querySelector('[data-seal-axiom]');
      var elB   = read.querySelector('[data-seal-body]');
      var core  = sealSvg.querySelector('[data-seal-core]');
      var current = -1;

      function show(i) {
        if (i === current || !laws[i]) return;
        current = i;
        var L = laws[i];
        elK.textContent = L.k;
        elN.textContent = L.name;
        elA.textContent = '“' + L.axiom + '”';
        elB.textContent = L.body;
        core.textContent = String(i + 1).padStart(2, '0');
        nodes.forEach(function (n, j) { n.classList.toggle('is-active', j === i); });
        if (!reduced) {
          read.classList.remove('seal-fade');
          void read.offsetWidth;          // restart the animation
          read.classList.add('seal-fade');
        }
      }

      nodes.forEach(function (n, i) {
        n.addEventListener('mouseenter', function () { show(i); });
        n.addEventListener('focus', function () { show(i); });
        n.addEventListener('touchstart', function () { show(i); }, { passive: true });
      });
      show(0);
    }
  }

  /* ------------------------------------------------------------------
     Section rail scroll-spy
     ------------------------------------------------------------------ */
  var rail = document.querySelector('.doc-rail');
  if (rail && 'IntersectionObserver' in window) {
    var links = {};
    rail.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var seen = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { seen[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var bestId = null, best = 0;
      Object.keys(seen).forEach(function (id) { if (seen[id] > best) { best = seen[id]; bestId = id; } });
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle('is-active', id === bestId);
        if (id === bestId) links[id].setAttribute('aria-current', 'true');
        else links[id].removeAttribute('aria-current');
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] });
    Object.keys(links).forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) spy.observe(sec);
    });
  }

  /* ------------------------------------------------------------------
     Work filters
     ------------------------------------------------------------------ */
  var bank = document.querySelector('[data-filters]');
  if (bank) {
    var chips = bank.querySelectorAll('.chip');
    var items = document.querySelectorAll('[data-kind]');
    var apply = function (key) {
      items.forEach(function (el) {
        var match = key === 'all' || (el.dataset.kind || '').split(' ').indexOf(key) > -1;
        if (match) el.removeAttribute('data-filtered-out');
        else el.setAttribute('data-filtered-out', '');
      });
      document.querySelectorAll('[data-group]').forEach(function (sec) {
        var all = sec.querySelectorAll('[data-kind]');
        var gone = sec.querySelectorAll('[data-kind][data-filtered-out]');
        if (all.length && all.length === gone.length) sec.setAttribute('data-filtered-out', '');
        else sec.removeAttribute('data-filtered-out');
      });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === key)); });
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.dataset.filter); }); });
    bank.hidden = false;
    apply('all');
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
