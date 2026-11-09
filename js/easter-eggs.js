/* =========================================================
   easter-eggs.js
   - type "gomu" anywhere: the ship stretches like rubber
   - type "onepiece": you get the truth
   - click the ship: set sail!
   ========================================================= */

const toastEl = document.querySelector('.toast');
let toastTimer;

function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2200);
}

export function initEasterEggs(anime) {
  const ship = document.querySelector('.ship-btn');

  const stretchShip = () => {
    toast('GOMU GOMU NO... SHIP!');
    if (!anime) return;
    anime.animate(ship, {
      scaleX: [{ to: 1.7, duration: 260, ease: 'outQuad' }, { to: 1, duration: 1200, ease: 'outElastic(1, .3)' }],
      scaleY: [{ to: 0.75, duration: 260, ease: 'outQuad' }, { to: 1, duration: 1200, ease: 'outElastic(1, .3)' }],
    });
  };

  const setSail = () => {
    toast('All hands on deck! Set sail!');
    if (!anime) return;
    anime.animate(ship, {
      translateY: [{ to: -38, duration: 280, ease: 'outQuad' }, { to: 0, duration: 700, ease: 'outBounce' }],
      rotate: [{ to: -8, duration: 280 }, { to: 0, duration: 700, ease: 'outElastic(1, .4)' }],
    });
  };

  ship.addEventListener('click', setSail);

  // listen for typed words (ignored while typing in a form field)
  const words = { gomu: stretchShip, onepiece: () => toast('The One Piece is real!') };
  let buffer = '';
  window.addEventListener('keydown', (e) => {
    const inField = e.target instanceof Element && e.target.closest('input, textarea, [contenteditable]');
    if (inField || e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-12);
    for (const [word, action] of Object.entries(words)) {
      if (buffer.endsWith(word)) {
        buffer = '';
        action();
      }
    }
  });
}
