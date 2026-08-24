/* CATALYST — progressive enhancement only.
   Every feature here is additive: with JavaScript off the site stays fully
   readable, all work items stay visible, and every section remains reachable. */
(function () {
  'use strict';

  /* ---------- Scroll reveal ---------- */
  var targets = document.querySelectorAll('.reveal');
  if (targets.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }

  /* ---------- Reading progress ---------- */
  var bar = document.querySelector('.progress i');
  if (bar) {
    var tick = function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      bar.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + '%';
    };
    addEventListener('scroll', tick, { passive: true });
    addEventListener('resize', tick);
    tick();
  }

  /* ---------- Section rail scroll-spy ---------- */
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
        if (id === bestId) { links[id].setAttribute('aria-current', 'true'); }
        else { links[id].removeAttribute('aria-current'); }
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.75, 1] });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---------- Work filters ---------- */
  var bank = document.querySelector('[data-filters]');
  if (bank) {
    var chips = bank.querySelectorAll('.chip');
    var items = document.querySelectorAll('[data-kind]');

    var apply = function (key) {
      items.forEach(function (el) {
        var match = key === 'all' || (el.dataset.kind || '').split(' ').indexOf(key) > -1;
        if (match) { el.removeAttribute('data-filtered-out'); }
        else { el.setAttribute('data-filtered-out', ''); }
      });
      // Hide a whole section once every item inside it is filtered away.
      document.querySelectorAll('[data-group]').forEach(function (sec) {
        var all = sec.querySelectorAll('[data-kind]');
        var gone = sec.querySelectorAll('[data-kind][data-filtered-out]');
        if (all.length && all.length === gone.length) { sec.setAttribute('data-filtered-out', ''); }
        else { sec.removeAttribute('data-filtered-out'); }
      });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === key)); });
    };

    chips.forEach(function (c) {
      c.addEventListener('click', function () { apply(c.dataset.filter); });
    });
    bank.hidden = false;   // the control only appears once it can actually work
    apply('all');
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
