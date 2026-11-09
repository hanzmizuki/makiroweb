/* Small shared helpers */

/** Pause looping animations while `el` is off-screen (saves CPU/battery). */
export function pauseWhenHidden(el, animations) {
  if (!el || !animations.length) return;
  new IntersectionObserver(([entry]) => {
    for (const a of animations) (entry.isIntersecting ? a.play() : a.pause());
  }).observe(el);
}

export const rand = (min, max) => min + Math.random() * (max - min);
