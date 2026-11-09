/* =========================================================
   undersea.js: life under the sea (anime.js)
   whale & Sea King cruise across, fish schools dart by,
   jellyfish pulse, diving ship bobs, seaweed sways, treasure glows
   ========================================================= */

import { pauseWhenHidden, rand } from './utils.js';

export function initUndersea({ animate }) {
  const ocean = document.querySelector('.ocean');
  const deep = document.querySelector('.deep');
  const loops = [];

  const layer = document.querySelector('.undersea');
  const layerLeft = layer.getBoundingClientRect().left;

  // fish art faces left: mirror the ones in right-swimming schools
  // (done on <use> so it doesn't fight the animated transform)
  document.querySelectorAll('.school[data-swim="right"] use').forEach((u) => {
    u.setAttribute('transform', 'matrix(-1 0 0 1 40 0)');
  });

  // anything with data-swim crosses the whole screen, then loops
  document.querySelectorAll('.undersea [data-swim]').forEach((el) => {
    if (getComputedStyle(el).display === 'none') return; // hidden on small screens
    const toRight = el.dataset.swim === 'right';
    const box = el.getBoundingClientRect();
    const left = box.left - layerLeft;
    const offLeft = -left - box.width - 40;
    const offRight = window.innerWidth - left + 40;

    loops.push(animate(el, {
      translateX: toRight ? { from: offLeft, to: offRight } : { from: offRight, to: offLeft },
      duration: Number(el.dataset.speed) || 40000,
      delay: rand(0, 8000),
      loopDelay: rand(2000, 9000),
      ease: 'linear',
      loop: true,
    }));

    // gentle up-and-down while swimming
    loops.push(animate(el, {
      translateY: { from: -10, to: 12 },
      duration: rand(2800, 4200),
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    }));
  });

  // fish tails wiggle
  loops.push(animate('.undersea .fish', {
    rotate: { from: -6, to: 6 },
    duration: 320,
    delay: (_, i) => i * 60,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  // jellyfish pulse and drift
  document.querySelectorAll('.jelly').forEach((jelly) => {
    loops.push(animate(jelly, {
      scaleY: { from: 1, to: 0.82 },
      scaleX: { from: 1, to: 1.08 },
      duration: rand(900, 1400),
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    }));
    loops.push(animate(jelly, {
      translateY: { from: 20, to: -50 },
      translateX: { from: -8, to: 8 },
      duration: rand(5000, 8000),
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    }));
  });

  // Sea King's eye glows
  loops.push(animate('.seaking__eye', {
    opacity: { from: 1, to: 0.35 },
    duration: 1400,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  // diving ship rocks inside its bubble
  loops.push(animate('.dive__ship', {
    rotate: { from: -6, to: 6 },
    translateY: { from: -4, to: 4 },
    duration: 2600,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));
  loops.push(animate('.dive__trail circle', {
    translateY: { from: 0, to: -24 },
    opacity: { from: 0.9, to: 0 },
    duration: 1800,
    delay: (_, i) => i * 450,
    ease: 'outQuad',
    loop: true,
  }));

  // Fish-Man Island breathes light
  loops.push(animate('.fmi__glow', {
    opacity: { from: 0.08, to: 0.22 },
    duration: 3000,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));

  pauseWhenHidden(ocean, loops);

  // sea floor: seaweed sways, treasure glimmers
  const floorLoops = [];
  document.querySelectorAll('.weed').forEach((weed, i) => {
    floorLoops.push(animate(weed, {
      skewX: { from: -8, to: 8 },
      duration: rand(1800, 2800),
      delay: i * 150,
      ease: 'inOutSine',
      loop: true,
      alternate: true,
    }));
  });
  floorLoops.push(animate('.treasure-glow', {
    opacity: { from: 0.1, to: 0.35 },
    scale: { from: 0.9, to: 1.1 },
    duration: 1600,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  }));
  pauseWhenHidden(deep, floorLoops);
}
