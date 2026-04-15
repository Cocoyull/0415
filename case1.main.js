const items = Array.from(document.querySelectorAll('.circle-item'));

if (items.length) {
  let rotation = 0;
  let autoplayId;

  const layout = [
    { x: 0, y: -120, z: 2, opacity: 0.52, blur: 1.2, scale: 0.72, role: 'top' },
    { x: 220, y: -88, z: 3, opacity: 0.66, blur: 0.8, scale: 0.82, role: 'upper-right' },
    { x: 372, y: 8, z: 4, opacity: 0.82, blur: 0.4, scale: 0.88, role: 'right' },
    { x: 254, y: 112, z: 7, opacity: 0.96, blur: 0, scale: 1, role: 'bottom-right' },
    { x: 0, y: 148, z: 8, opacity: 1, blur: 0, scale: 1, role: 'bottom' },
    { x: -254, y: 112, z: 7, opacity: 0.96, blur: 0, scale: 1, role: 'bottom-left' },
    { x: -372, y: 8, z: 4, opacity: 0.82, blur: 0.4, scale: 0.88, role: 'left' },
    { x: -220, y: -88, z: 3, opacity: 0.66, blur: 0.8, scale: 0.82, role: 'upper-left' },
  ];

  const getSlot = (index) => layout[(index + rotation + layout.length) % layout.length];

  const applyLayout = () => {
    items.forEach((item, index) => {
      const slot = getSlot(index);
      item.style.opacity = String(slot.opacity);
      item.style.zIndex = String(slot.z);
      item.style.filter = `blur(${slot.blur}px)`;
      item.style.transform = `translate(-50%, -50%) translate(${slot.x}px, ${slot.y}px) scale(${slot.scale})`;
      item.dataset.role = slot.role;
      item.classList.toggle('is-clickable', slot.role === 'left' || slot.role === 'right');
    });
  };

  const rotateClockwise = () => {
    rotation += 1;
    applyLayout();
  };

  const rotateCounterclockwise = () => {
    rotation -= 1;
    applyLayout();
  };

  const startAutoplay = () => {
    clearInterval(autoplayId);
    autoplayId = window.setInterval(rotateClockwise, 2600);
  };

  const restartAutoplay = () => {
    startAutoplay();
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      const slot = getSlot(index);
      if (slot.role === 'left') {
        rotateClockwise();
        restartAutoplay();
      } else if (slot.role === 'right') {
        rotateCounterclockwise();
        restartAutoplay();
      }
    });
  });

  applyLayout();
  startAutoplay();
}

const parallaxScene = document.querySelector('.parallax-scene');
const parallaxCards = Array.from(document.querySelectorAll('.feature-card[data-depth]'));

if (parallaxScene && parallaxCards.length) {
  const resetCards = () => {
    parallaxCards.forEach((card) => {
      card.style.transform = 'translate3d(0, 0, 0)';
    });
  };

  parallaxScene.addEventListener('mousemove', (event) => {
    const rect = parallaxScene.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    parallaxCards.forEach((card) => {
      const depth = Number(card.dataset.depth || 0);
      const moveX = -(offsetX / rect.width) * depth;
      const moveY = -(offsetY / rect.height) * depth;
      card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });

  parallaxScene.addEventListener('mouseleave', resetCards);
  resetCards();
}
