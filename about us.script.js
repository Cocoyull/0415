const parallaxItems = Array.from(document.querySelectorAll('.parallax'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

let latestY = 0;
let ticking = false;

function updateParallax() {
  if (prefersReducedMotion.matches) {
    parallaxItems.forEach((el) => {
      el.style.transform = '';
    });
    ticking = false;
    return;
  }

  const viewportH = window.innerHeight || 1;

  parallaxItems.forEach((el) => {
    const speed = Number(el.dataset.speed || 0.08);
    const rect = el.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - viewportH / 2;
    const translateY = -centerOffset * speed;
    el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
  });

  ticking = false;
}

function onScroll() {
  latestY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
prefersReducedMotion.addEventListener('change', updateParallax);
window.addEventListener('load', updateParallax);
