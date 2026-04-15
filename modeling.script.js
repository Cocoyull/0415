const mainSceneImage = document.querySelector('#mainSceneImage');
const sceneModal = document.querySelector('#sceneModal');
const openSceneModal = document.querySelector('#openSceneModal');
const sceneCards = Array.from(document.querySelectorAll('.scene-card'));
const closeTargets = Array.from(document.querySelectorAll('[data-close="modal"]'));

const lengthRange = document.querySelector('#lengthRange');
const widthRange = document.querySelector('#widthRange');
const trackRange = document.querySelector('#trackRange');
const lengthNumber = document.querySelector('#lengthNumber');
const widthNumber = document.querySelector('#widthNumber');
const trackNumber = document.querySelector('#trackNumber');

const openModal = () => {
  sceneModal?.classList.remove('hidden');
  sceneModal?.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  sceneModal?.classList.add('hidden');
  sceneModal?.setAttribute('aria-hidden', 'true');
};

openSceneModal?.addEventListener('click', openModal);
closeTargets.forEach((node) => node.addEventListener('click', closeModal));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

sceneCards.forEach((card) => {
  card.addEventListener('click', () => {
    const image = card.getAttribute('data-image');
    const alt = card.getAttribute('data-alt') || '';
    const imageClass = card.getAttribute('data-image-class') || '';

    if (mainSceneImage && image) {
      mainSceneImage.src = image;
      mainSceneImage.alt = alt;
      mainSceneImage.className = `scene-image ${imageClass}`.trim();
    }

    sceneCards.forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    closeModal();
  });
});

const bindRange = (range, number) => {
  if (!range || !number) return;

  const updateRangeProgress = () => {
    const min = Number(range.min || 0);
    const max = Number(range.max || 100);
    const value = Number(range.value || min);
    const progress = ((value - min) / (max - min)) * 100;
    range.style.setProperty('--progress', `${progress}%`);
  };

  const syncFromRange = () => {
    number.value = range.value;
    updateRangeProgress();
  };

  const syncFromNumber = () => {
    const min = Number(range.min || 0);
    const max = Number(range.max || 0);
    const nextValue = Math.min(Math.max(Number(number.value || min), min), max);
    range.value = String(nextValue);
    number.value = String(nextValue);
    updateRangeProgress();
  };

  range.addEventListener('input', syncFromRange);
  number.addEventListener('change', syncFromNumber);
  syncFromRange();
};

bindRange(lengthRange, lengthNumber);
bindRange(widthRange, widthNumber);
bindRange(trackRange, trackNumber);
