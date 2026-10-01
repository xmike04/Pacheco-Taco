# Design reference (read-only copy)

Copied from the **Pacheco Taco N Burger** Design System artifact
(<https://claude.ai/artifact/MxMx8jH52stgW5VUSpy1R4>, version `1790881099-3156`, pulled 2026-10-01).

| File | What |
|---|---|
| `BRAND.md` | The brand book: voice, colour, type, shape, imagery, logos, icons |
| `tokens.json` | Design tokens — the **source of truth**. `npm run tokens` turns it into `src/styles/tokens.css` |
| `components/*.md` | Usage rules for each component (Button, Nav, Hero, InfoCard, MenuItem, Tag, Footer, LogoUsage) |

The component CSS (`bundle.css`) is copied verbatim to `src/styles/bundle.css`. Extend it in `src/styles/site.css`
rather than editing it, so a re-sync from the design system stays a clean copy.

Deliberate departures from the doc are listed at the top of `src/styles/site.css` and in the root README.
