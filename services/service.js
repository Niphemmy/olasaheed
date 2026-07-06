// Shared "Book this" modal behaviour for service detail pages
(function () {
  var overlay = document.getElementById('bookModal');
  if (!overlay) return;

  function open() { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  // any element with data-book opens the modal
  document.querySelectorAll('[data-book]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(); });
  });

  // close controls
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  var x = overlay.querySelector('.close');
  if (x) x.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // auto-open once when the reader nears the end (the page has done the selling)
  var fired = false;
  window.addEventListener('scroll', function () {
    if (fired) return;
    var scrolled = window.scrollY + window.innerHeight;
    var trigger = document.body.scrollHeight * 0.82;
    if (scrolled >= trigger) { fired = true; open(); }
  }, { passive: true });
})();
