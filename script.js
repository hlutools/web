// HLU TOOLS — interactions, vanilla JS, không dependency.
// Chỉ dùng transform/opacity + IntersectionObserver để không lag neon glow.
(function () {
  'use strict';

  // Năm hiện tại ở footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var navMenu = document.getElementById('navMenu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal khi scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Counter animation (chạy 1 lần khi stats vào viewport)
  var counters = document.querySelectorAll('.counter');
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10) || 0;
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // Filter công cụ
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.tool-card');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      cards.forEach(function (card) {
        var show = f === 'all' || card.dataset.category === f;
        card.classList.toggle('hide', !show);
        if (show) card.classList.add('visible');
      });
    });
  });

  // Cursor glow — chỉ chuột thật, dùng rAF throttle, tắt trên mobile
  var glow = document.querySelector('.cursor-glow');
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  if (glow && finePointer) {
    var x = -500, y = -500, tx = x, ty = y, raf = null;
    document.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(tick); });
    function tick() {
      raf = null;
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      glow.style.left = x + 'px'; glow.style.top = y + 'px';
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(tick);
    }
  } else if (glow) { glow.style.display = 'none'; }

  // Form liên hệ: UI demo — chưa có backend, chỉ báo đã nhận.
  // Muốn gửi thật: thay đoạn này bằng fetch tới Formspree / Google Form (xem README).
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      note.textContent = '✓ Đã nhận góp ý của bạn (bản demo — chưa gửi đi đâu). Anh gắn backend/Formspree vào là chạy thật.';
      form.reset();
    });
  }
})();
