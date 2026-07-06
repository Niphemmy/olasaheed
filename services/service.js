// Shared modal behaviour for service detail pages (book modal + included-item detail modal)
(function () {
  var book = document.getElementById('bookModal');
  var detail = document.getElementById('detailModal');
  var body = document.getElementById('detailBody');

  function open(m) { if (!m) return; m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeAll() {
    document.querySelectorAll('.modal-overlay.open').forEach(function (m) { m.classList.remove('open'); });
    document.body.style.overflow = '';
  }

  // Delegated clicks so injected buttons work too
  document.addEventListener('click', function (e) {
    var d = e.target.closest('[data-detail]');
    if (d) { e.preventDefault(); var s = document.getElementById(d.getAttribute('data-detail')); if (s && body) { body.innerHTML = s.innerHTML; closeAll(); open(detail); } return; }
    var b = e.target.closest('[data-book]');
    if (b) { e.preventDefault(); closeAll(); open(book); return; }
    var c = e.target.closest('.modal-overlay .close');
    if (c) { closeAll(); return; }
    var ov = e.target.closest('.modal-overlay');
    if (ov && e.target === ov) { closeAll(); return; }
  });

  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

  // Auto-open the booking prompt once, after the reader nears the end
  var fired = false;
  window.addEventListener('scroll', function () {
    if (fired || !book) return;
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight * 0.82) { fired = true; open(book); }
  }, { passive: true });
})();
