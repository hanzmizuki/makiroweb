# makiroweb

Personal site of **Kiro**: Computer Science student at UKM (Software Technology track), into cybersecurity, AI and building cool stuff with code.

One Piece-inspired, single page: you start in the sky, sail across the sea and sink into the deep ocean as you scroll. Plain HTML/CSS/JS, no build step. All drawings (ship, Den Den Mushi, devil fruits, islands, Jolly Roger) are original inline SVGs.

## Sections
| Chapter | Section | What it is |
|---|---|---|
| 0 | Hero | Sky, sun, clouds, seagulls, wanted poster, ship on the waves |
| 1 | Captain's Log | Bio on a parchment scroll + crew profile card |
| 2 | Devil Fruits & Haki | Languages as devil fruits, focus areas as Haki, tools in a treasure chest |
| 3 | Adventures | Projects as islands on a treasure map |
| 4 | Join the Crew | Contact links on wooden signs + Den Den Mushi |
| – | Underwater | Whale (a Laboon nod), Sea King, fish schools, jellyfish, a bubble-coated ship diving as you scroll, Fish-Man Island |
| – | Footer | Deep sea with bubbles, a waving Jolly Roger, coral, seaweed, sunken anchor and treasure |

Easter eggs: type `gomu` or `onepiece` anywhere, or click the ship.

## Project structure
```
index.html          page markup + SVG sprite (cloud, gull, fruit, island, roger)
assets/luffy.jpg    avatar on the wanted poster
css/base.css        design tokens, reset, nav, buttons, toast, animation states
css/hero.css        sky, wanted poster, sea, ship
css/sections.css    ocean sections and deep-sea footer
css/undersea.css    whale, Sea King, fish, jellyfish, diving ship, Fish-Man Island, sea floor
js/main.js          entry point
js/nav.js           sticky nav + active section highlight
js/motion.js        hero, reveal and footer animations (loops pause when off-screen)
js/undersea.js      underwater life animations
js/utils.js         shared helpers
js/easter-eggs.js   gomu / onepiece / ship click
```

Animations use [anime.js](https://animejs.com) v4 from a CDN. They are skipped if the visitor prefers reduced motion, and the page still shows everything if the CDN is blocked.

## Run locally
ES modules don't load from `file://`, so use any static server:

```bash
python -m http.server 5173
```

Then open http://localhost:5173.

## Make it yours
Search `index.html` for `EDIT:`:
- **Adventures:** project titles, descriptions, tags and links
- **Treasure chest:** the tools list
- **Avatar:** replace `assets/luffy.jpg` (square works best)

## Deploy
Works as-is on GitHub Pages: Settings → Pages → deploy from branch.
