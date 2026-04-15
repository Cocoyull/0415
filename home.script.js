const root = document.documentElement;
const hero = document.querySelector('.hero');

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateHeroProgress = () => {
  if (!hero) return;

  const rect = hero.getBoundingClientRect();
  const scrollable = Math.max(hero.offsetHeight - window.innerHeight, 1);
  const travelled = Math.min(Math.max(-rect.top, 0), scrollable);
  const progress = travelled / scrollable;
  const eased = easeOutCubic(progress);
  const wordProgress = clamp((progress - 0.42) / 0.18, 0, 1);
  const wordEased = easeOutCubic(wordProgress);

  root.style.setProperty('--hero-progress', progress.toFixed(4));
  root.style.setProperty('--hero-progress-eased', eased.toFixed(4));
  root.style.setProperty('--hero-word-progress', wordProgress.toFixed(4));
  root.style.setProperty('--hero-word-progress-eased', wordEased.toFixed(4));
};

updateHeroProgress();
window.addEventListener('scroll', updateHeroProgress, { passive: true });
window.addEventListener('resize', updateHeroProgress);
