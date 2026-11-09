/* =========================================================
   motion.js: every anime.js animation on the page
   ========================================================= */

import { pauseWhenHidden, rand } from './utils.js';
import { initUndersea } from './undersea.js';

const ANIME_URL = 'https://cdn.jsdelivr.net/npm/animejs@4.0.2/+esm';
const root = document.documentElement;

export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Load anime.js, or return null (reduced motion, offline, CDN blocked). */
export async function loadAnime() {
  if (reduceMotion) return null;
  try {
    return await import(ANIME_URL);
  } catch (err) {
    console.warn('anime.js failed to load; showing the page without animation.', err);
    return null;
  }
}

/** Start all animations, or reveal everything statically if we can't. */
export function initMotion(anime) {
  // the 2.5s safety timer in <head> may already have revealed the page
  if (!anime || !root.classList.contains('js')) {
    root.classList.remove('js');
    document.querySelector('.map')?.classList.add('is-drawn');
    return;
  }
  root.classList.add('anim-ok');

  intro(anime);
  pauseWhenHidden(document.querySelector('.hero'), heroAmbience(anime));
  scrollReveals(anime);
  gomuButtons(anime);
  denDenMushi(anime);
  pauseWhenHidden(document.querySelector('.deep'), deepSea(anime));
  initUndersea(anime);
}

/* ---------- hero intro: text, wanted poster, bounty ---------- */

function intro({ animate, stagger }) {
  animate('[data-intro]', {
    opacity: { from: 0, to: 1 },
    translateY: { from: 24, to: 0 },
    duration: 750,
    delay: stagger(100, { start: 100 }),
    ease: 'outExpo',
  });

  // poster drops, sways on its pin, settles
  animate('[data-poster]', {
    opacity: { from: 0, to: 1, duration: 300 },
    translateY: { from: -160, to: 0, duration: 950, ease: 'outBounce' },
    rotate: [
      { from: -14, to: 7, duration: 700, ease: 'outQuad' },
      { to: -5, duration: 500, ease: 'inOutSine' },
      { to: 2, duration: 450, ease: 'inOutSine' },
      { to: -2, duration: 600, ease: 'outSine' },
    ],
    delay: 300,
  });

  // bounty counts up
  const el = document.getElementById('bounty');
  const target = Number(el.dataset.value);
  const counter = { value: 0 };
  el.textContent = '0';
  animate(counter, {
    value: target,
    duration: 1900,
    delay: 950,
    ease: 'outExpo',
    onUpdate: () => { el.textContent = Math.round(counter.value).toLocaleString('en-US'); },
  });
}

/* ---------- hero loops: ship, flag, clouds, gulls, waves ---------- */

function heroAmbience({ animate, stagger }) {
  const loops = [];

  // ship bobs and rocks
  loops.push(animate('.ship', {
    translateY: { from: 0, to: -9 },
    duration: 1900,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));
  loops.push(animate('.ship', {
    rotate: { from: -2.2, to: 2.6 },
    duration: 2700,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  // flag flutters
  loops.push(animate('.ship__flag', {
    skewY: { from: -7, to: 7 },
    scaleX: { from: 1, to: 0.88 },
    duration: 650,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  // clouds drift back and forth
  document.querySelectorAll('.cloud').forEach((cloud, i) => {
    loops.push(animate(cloud, {
      translateX: { from: -40 - i * 10, to: 50 + i * 12 },
      duration: 9000 + i * 2500,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    }));
  });

  // seagulls fly across now and then, flapping
  loops.push(animate('.gulls', {
    translateX: { from: -160, to: () => window.innerWidth + 160 },
    translateY: [{ to: -24, duration: 4000 }, { to: 14, duration: 5000 }, { to: -8, duration: 5000 }],
    duration: 14000,
    ease: 'linear',
    loop: true,
    loopDelay: 5000,
  }));
  loops.push(animate('.gull', {
    scaleY: { from: 1, to: 0.35 },
    duration: 260,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
    delay: stagger(110),
  }));

  // three wave layers at different speeds
  loops.push(animate('.wave--back',  { translateX: { from: '0%', to: '-50%' }, duration: 32000, ease: 'linear', loop: true }));
  loops.push(animate('.wave--mid',   { translateX: { from: '-50%', to: '0%' }, duration: 22000, ease: 'linear', loop: true }));
  loops.push(animate('.wave--front', { translateX: { from: '0%', to: '-50%' }, duration: 14000, ease: 'linear', loop: true }));

  return loops;
}

/* ---------- scroll reveals: sections, fruits, treasure map ---------- */

function scrollReveals(anime) {
  const { animate, stagger } = anime;

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      io.unobserve(el);

      animate(el, {
        opacity: { from: 0, to: 1 },
        translateY: { from: 28, to: 0 },
        duration: 700,
        delay: Number(el.dataset.delay || 0),
        ease: 'outExpo',
      });

      if (el.classList.contains('fruits')) popFruits(anime, el);
      if (el.classList.contains('map')) sailTheMap(anime, el);
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
    el.dataset.delay = siblings.length > 1 ? siblings.indexOf(el) * 110 : 0;
    io.observe(el);
  });

  function popFruits({ animate }, list) {
    animate(list.querySelectorAll('.fruit'), {
      opacity: { from: 0, to: 1 },
      scale: { from: 0.4, to: 1 },
      rotate: { from: -25, to: 0 },
      duration: 650,
      delay: stagger(90, { start: 150 }),
      ease: 'outBack(1.8)',
    });
  }
}

// route draws itself, islands pop up one by one, the X stamps down
function sailTheMap({ animate, stagger }, map) {
  map.classList.add('is-drawn'); // CSS clip-path transition draws the dotted route

  animate(map.querySelectorAll('.island'), {
    opacity: { from: 0, to: 1 },
    translateY: { from: 30, to: 0 },
    scale: { from: 0.85, to: 1 },
    duration: 700,
    delay: stagger(450, { start: 300 }),
    ease: 'outBack(1.4)',
  });

  animate(map.querySelector('.xmark'), {
    opacity: { from: 0, to: 1, duration: 150 },
    scale: { from: 3, to: 1 },
    rotate: { from: -40, to: 0 },
    duration: 500,
    delay: 1750,
    ease: 'outBack(2.2)',
  });

  animate(map.querySelector('.map__needle'), {
    rotate: [
      { to: 120, duration: 500, ease: 'outQuad' },
      { to: 0, duration: 1500, ease: 'outElastic(1, .3)' },
    ],
    delay: 200,
  });
}

/* ---------- "Gomu Gomu" rubber buttons ---------- */

function gomuButtons({ animate }) {
  document.querySelectorAll('[data-gomu]').forEach((btn) => {
    let busy = false;
    btn.addEventListener('pointerenter', () => {
      if (busy) return;
      busy = true;
      animate(btn, {
        scaleX: [{ to: 1.18, duration: 140, ease: 'outQuad' }, { to: 1, duration: 750, ease: 'outElastic(1, .35)' }],
        scaleY: [{ to: 0.88, duration: 140, ease: 'outQuad' }, { to: 1, duration: 750, ease: 'outElastic(1, .35)' }],
        onComplete: () => { busy = false; },
      });
    });
  });
}

/* ---------- Den Den Mushi: blinks, rings on hover ---------- */

function denDenMushi({ animate }) {
  const snail = document.querySelector('.ddm');
  const bubble = document.querySelector('.ddm-bubble');
  if (!snail) return;

  animate('.ddm__eyes', {
    scaleY: [{ to: 0.1, duration: 90 }, { to: 1, duration: 130 }],
    loop: true,
    loopDelay: 3200,
    ease: 'inOutQuad',
  });

  let ringing = false;
  const ring = () => {
    if (ringing) return;
    ringing = true;
    animate(snail, {
      rotate: [{ to: -5 }, { to: 5 }, { to: -4 }, { to: 4 }, { to: -2 }, { to: 0 }],
      translateY: [{ to: -6 }, { to: 0 }, { to: -4 }, { to: 0 }],
      duration: 700,
      ease: 'inOutSine',
      onComplete: () => { ringing = false; },
    });
    animate(bubble, { scale: [{ to: 1.2, duration: 150 }, { to: 1, duration: 400, ease: 'outBack(2)' }] });
  };

  snail.addEventListener('pointerenter', ring);
  document.querySelectorAll('.sign').forEach((s) => {
    s.addEventListener('pointerenter', ring);
    s.addEventListener('focus', ring);
  });
}

/* ---------- deep sea: bubbles + flag ---------- */

function deepSea({ animate }) {
  const box = document.querySelector('.bubbles');
  if (!box) return [];
  const loops = [];

  for (let i = 0; i < 16; i++) {
    const b = document.createElement('span');
    const size = rand(6, 18);
    b.className = 'bubble';
    b.style.cssText = `left:${rand(2, 98)}%;width:${size}px;height:${size}px`;
    box.appendChild(b);

    loops.push(animate(b, {
      translateY: { from: 0, to: () => -(box.offsetHeight + 40) },
      translateX: [{ to: rand(-14, 14) }, { to: rand(-14, 14) }, { to: 0 }],
      opacity: { from: 0.9, to: 0 },
      duration: rand(5000, 9000),
      delay: rand(0, 6000),
      ease: 'inSine',
      loop: true,
    }));
  }

  loops.push(animate('.flag__cloth', {
    skewY: { from: -5, to: 5 },
    scaleX: { from: 1, to: 0.92 },
    duration: 800,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  return loops;
}
