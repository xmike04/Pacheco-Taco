# Pacheco Taco N Burger — website

Front end for **Pacheco Taco N Burger**, a family-owned smash-burger and taco counter inside Four Corners Brewing Co.
in The Cedars, Dallas. Built from the brand's Design System (see [`design/`](design/)): static HTML/CSS with
[Astro](https://astro.build), no client framework, ~zero JavaScript.

- **Pages:** Home (hero, info card, picks, story, visit + live hours) · Menu · 404
- **Themes:** Masa (light) and Noche (dark) — follows the OS, remembers a manual choice, works without JS
- **Phone-first:** tap-to-call in the header, a sticky Order / Call / Directions bar on phones, live "Open now" badge
- **Local SEO:** `Restaurant` JSON-LD, Open Graph card, sitemap/robots, NAP identical everywhere (one data file)

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/ (static; deploy anywhere)
npm run preview    # serve the production build
```

Node 22+. Set `SITE_URL=https://your-domain` at build time for canonical URLs, the OG image and the sitemap
(Vercel's production domain is picked up automatically; without either, those tags are simply omitted).

## Where things live

| To change… | Edit |
|---|---|
| Phone, address, **hours**, order link, social links | `src/data/site.ts` (renders in header, hero, footer, visit, JSON-LD) |
| **Menu** items, descriptions, prices, tags | `src/data/menu.ts` |
| **Photos** | `src/data/photos.ts` + `photos/README.md` (shot list, three-step process) |
| Colours, type, spacing, shadows | `design/tokens.json` → `npm run tokens` regenerates `src/styles/tokens.css` |
| Layout and section styles | `src/styles/site.css` (the design system's `bundle.css` stays a verbatim copy) |
| Copy on the pages | `src/pages/*.astro` |

Components in `src/components/` map one-to-one to the Design System's: `Nav`, `Hero`, `InfoCard`, `MenuItem`, `Tag`,
`Button`, `Footer` (+ `Photo`, `Divider`, `StickyActions`, `ThemeToggle`, `Icon`).

## ⚠ Before launch — confirm with the family

I could verify the public facts but not everything on the site is confirmed by the owners. Each item below is flagged
in the code with a `VERIFY` / `⚠` comment.

1. **Hours.** Public listings disagree, and the design doc's "daily 11 AM – 9:30 PM" matches none of them.
   The site uses the Apple Maps / Yahoo schedule (**Mon closed · Tue 3–9 PM · Wed 11 AM–9 PM · Thu–Sat 11 AM–9:45 PM ·
   Sun 11 AM–7 PM**). Yelp (via a search summary) shows Wednesday as 3–9 PM; Uber Eats/Postmates shows Monday open and
   closings 15 minutes early (delivery cut-offs). Edit `hours` in `src/data/site.ts`.
2. **Menu prices.** Names, descriptions and prices come from the Uber Eats / Postmates listing — the only complete menu
   available. Delivery apps often add a markup (several prices are multiples of $0.60, which looks like a flat ~20%), so
   treat them as unverified until compared with the POS. Also seen on other listings but not published here: *The Don
   Smashburger* (~$13.50), *Barbacoa Chingon* tacos (~2 for $7), *Barbacoa Grilled Cheese* (~$10).
3. **Order link.** Points to the Uber Eats listing. Swap in a direct ordering URL if there is one (`links.order`).
4. **Website domain.** No official website was found (Apple Maps lists the Facebook page as the website). A search
   summary mentioned `pachecotaconburger.com` but no result confirms it — don't assume the family owns it.
5. **Instagram.** `@pachecotaconburger` comes from a Yahoo Local listing; Instagram itself is behind a login wall.
6. **Story copy** ("Mom & son. Scratch kitchen.") is the restaurant's own bio line, kept deliberately short.
   Other details seen on Yelp (17 years in Las Vegas kitchens, a culinary-school son, pop-ups since July 2022,
   a Grand Prairie kitchen before Four Corners) are *not* on the site — add them once the family confirms the wording.
7. **"Call us"** — the design doc says "Call or text". It's unknown whether (972) 375-7960 takes texts, so the site
   only says call. If it does, add an `sms:` link.
8. **Amenities** (Take-out, Delivery, Wheelchair accessible) come from the Yelp listing's attributes.
9. **Photos.** None yet — see below.

## Photos

The brand rule is *real photos of the real food — no stock, no AI*. There are no photos in the repo yet, so every
photo slot shows brand graphics (sun burst, stickers) and nothing looks broken. `photos/README.md` has the shot list
and the three-step process (`npm run photos` strips GPS, resizes, and prints manifest stubs). Layouts for every slot —
hero photo, hero **cut-out PNG**, 2–5 photo strip, story, visit, menu-card thumbnails — were tested with synthetic images.

**Where the photos should come from:** the family's own phone originals first; failing that, photos the business itself
posted. Photos customers uploaded to Yelp belong to those customers, and Yelp blocks automated downloading (DataDome),
which this project does not try to get around. This repository is **public** — don't commit raw phone photos (GPS) or
anyone else's photos. Put originals in `photos/originals/` (git-ignored); only the processed copies get committed.

## Where this departs from the design doc (and why)

Measured, not assumed — contrast ratios were computed for every token pair, in both themes.

| Doc says | Reality | What the site does |
|---|---|---|
| Focus ring is "3:1+ on every surface and on chile" | Light theme: **1.0:1** on the ink footer (invisible), 2.99:1 on chile; dark theme: 1.5–1.9:1 on chile/footer | `--focus` is overridden in the hero, mobile sheet and footer (measured 5.4:1 / 16.2:1 by keyboard test) |
| Nav lockup at 52px tall; min lockup width 140px | 52px renders **125px** wide | 144px wide (60px tall) |
| Papel picado along the top of the chile hero | The red flags vanish on chile, leaving gaps | `papel-picado-on-chile.svg`: red flags → cream (the doc's own OG image does the same) |
| `lockup-dark` / `lockup-reverse` logos | Both have a baked-in background rectangle — a visible box in Noche | Transparent derivatives in `public/assets/logos/` |
| Star divider as an SVG file | Rules are hard-coded ink: invisible on the dark ground | Redrawn inline with theme tokens (`Divider.astro`) |
| Menu grid `minmax(260px, 1fr)` | Squeezes names onto 3 lines | 300px minimum; desktop "ledger" layout on the menu page |
| Order button in the nav at every width | Doesn't fit a 360px header with logo + call + menu | Order lives in the sticky bottom bar on phones; the header keeps tap-to-call |
| Social glyphs "use official, don't redraw" | Official glyph files aren't in the kit | Text links for now; drop official glyphs in when downloaded |

Not touched: `bundle.css` is a verbatim copy; everything else extends it in `site.css`.

## Quality checks that were run

- Lighthouse (local build; "mobile" = simulated Slow 4G + 4× CPU slowdown): Performance **99**, Accessibility **100**,
  Best Practices **100**, SEO **100** on both pages (desktop: 100 across); mobile LCP 2.0–2.2 s, CLS 0
- axe-core (WCAG 2.0/2.1/2.2 A/AA + best practices): **0 violations** across 2 pages × 3 viewports × 2 themes
- No horizontal overflow at 390 / 820 / 1440; no console errors; no failed requests
- Behavior tests: theme persistence and OS-following, `<dialog>` mobile menu (focus, Esc, link, resize), "open now" logic
  across 9 clock scenarios in two visitor time zones, no-JS rendering, tel/noopener/link health, keyboard focus-ring contrast
- CI (`.github/workflows/build.yml`): tokens in sync with `design/tokens.json`, photo manifest matches the photo folder, build passes

## Deploying

Any static host works (`dist/`). On Vercel: import the repo, framework preset *Astro*, no config — set `SITE_URL` once the
real domain is known. Make sure the domain and the Google Business Profile / Yelp / Apple Maps listings carry the **same**
name, address and phone (NAP consistency drives local search).
