/* Nav: solid background after scrolling + highlight the section in view */

export function initNav() {
  const nav = document.querySelector('.nav');
  const links = [...document.querySelectorAll('.nav__links a')];

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of links) a.classList.toggle('is-active', a.hash === '#' + entry.target.id);
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));
}
