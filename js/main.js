/* Entry point: wires up the page modules */

import { initNav } from './nav.js';
import { loadAnime, initMotion } from './motion.js';
import { initEasterEggs } from './easter-eggs.js';

document.getElementById('year').textContent = new Date().getFullYear();
initNav();

const anime = await loadAnime();
initMotion(anime);
initEasterEggs(anime);

console.log(
  '%cKiro%c  ahoy, fellow dev! source: github.com/hanzmizuki. try typing "gomu".',
  'color:#f2c14e;font-family:Georgia,serif;font-weight:700;font-size:16px',
  'color:#8aa9c7'
);
