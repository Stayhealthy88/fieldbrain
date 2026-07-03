// FIELDBRAIN deck — slide nav, reveal, progress. No external deps.
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const cur = document.getElementById('cur');
  const total = document.getElementById('total');
  const progress = document.getElementById('progress');
  total.textContent = String(slides.length);

  let active = 0;

  const pad = (n) => String(n + 1).padStart(2, '0');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        active = slides.indexOf(e.target);
        cur.textContent = pad(active);
        progress.style.transform = `scaleX(${(active + 1) / slides.length})`;
      }
    });
  }, { threshold: 0.55 });

  slides.forEach((s) => io.observe(s));

  const go = (delta) => {
    const next = Math.min(slides.length - 1, Math.max(0, active + delta));
    slides[next].scrollIntoView({ behavior: 'smooth' });
  };

  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); go(1); }
    if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    if (e.key === 'Home') { e.preventDefault(); slides[0].scrollIntoView({ behavior: 'smooth' }); }
    if (e.key === 'End') { e.preventDefault(); slides[slides.length - 1].scrollIntoView({ behavior: 'smooth' }); }
  });
})();
