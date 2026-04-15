const items = Array.from(document.querySelectorAll('.circle-item'));

if (items.length) {
  let rotation = 0;
  let autoplayId;

  const layout = [
    { x: 0, y: -126, z: 2, opacity: 0.5, blur: 1.4, scale: 0.7, role: 'top', side: 'center' },
    { x: 298, y: -64, z: 4, opacity: 0.74, blur: 0.8, scale: 0.84, role: 'upper-right', side: 'right' },
    { x: 278, y: 66, z: 7, opacity: 0.96, blur: 0, scale: 0.98, role: 'lower-right', side: 'right' },
    { x: 0, y: 126, z: 8, opacity: 1, blur: 0, scale: 1.03, role: 'bottom', side: 'center' },
    { x: -278, y: 66, z: 7, opacity: 0.96, blur: 0, scale: 0.98, role: 'lower-left', side: 'left' },
    { x: -298, y: -64, z: 4, opacity: 0.74, blur: 0.8, scale: 0.84, role: 'upper-left', side: 'left' },
  ];

  const getSlot = (index) => layout[(index + rotation + items.length) % items.length];

  const applyLayout = () => {
    items.forEach((item, index) => {
      const slot = getSlot(index);
      item.style.opacity = String(slot.opacity);
      item.style.zIndex = String(slot.z);
      item.style.filter = `blur(${slot.blur}px)`;
      item.style.transform = `translate(-50%, -50%) translate(${slot.x}px, ${slot.y}px) scale(${slot.scale})`;
      item.dataset.role = slot.role;
      item.dataset.side = slot.side;
      item.classList.toggle('is-clickable', slot.side === 'left' || slot.side === 'right');
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
    autoplayId = window.setInterval(rotateClockwise, 2200);
  };

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      const slot = getSlot(index);
      if (slot.side === 'left') {
        rotateClockwise();
        startAutoplay();
      } else if (slot.side === 'right') {
        rotateCounterclockwise();
        startAutoplay();
      }
    });
  });

  applyLayout();
  startAutoplay();
}


