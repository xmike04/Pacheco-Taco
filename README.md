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
2. **Menu.** Rebuilt from a photo of the in-store board (`src/data/menu.ts`). The board is undated and shows no prices,
   so **no prices are published** — the menu page says "Ask at the counter". Older dishes seen on delivery listings
   (Texas Sun Smash, The Don, Single Ceci) aren't on the board and are left out. Confirm the board is current and
   add `price:` per item once you have the POS prices.
3. **Order link.** Points to the Uber Eats listing. Swap in a direct ordering URL if there is one (`links.order`).
4. **Website domain.** No official website was found (Apple Maps lists the Facebook page as the website). A search
   summary mentioned `pachecotaconburger.com` but no result confirms it — don't assume the family owns it.
5. **Instagram.** Profile confirmed (`@pachecotaconburger`). The home page has a click-to-load video slot that stays
   hidden until you paste a reel URL into `links.instagramReel` (`src/data/site.ts`) — Instagram blocks automated
   access, so a popular reel couldn't be picked from here.
   **Brand.** The look follows their signage: Barlow Condensed wordmark, black / cream / orange-red. The wordmark
   (`Wordmark.astro`) is *typeset*, not their real logo — swap in a vector file when the family has one. The orange
   (`sign` in `design/tokens.json`) was matched by eye from photos. The footer seal and favicons come from their
   150px Instagram avatar, so they're a bit soft. Photos are Yelp user uploads with rights unconfirmed (see `photos.ts`).
6. **Story copy** ("Mom & son. Scratch kitchen.") is the restaurant's own bio line, kept deliberately short.
   Other details seen on Yelp (17 years in Las Vegas kitchens, a culinary-school son, pop-ups since July 2022,
   a Grand Prairie kitchen before Four Corners) are *not* on the site — add them once the family confirms the wording.
7. **"Call us"** — the design doc says "Call or text". It's unknown whether (972) 375-7960 takes texts, so the site
   only says call. If it does, add an `sms:` link.
8. **Amenities** (Take-out, Delivery, Wheelchair accessible) come from the Yelp listing's attributes.
9. **Photo rights** — see below.

## Photos

14 real photos from the restaurant's Yelp gallery (curated from 173 supplied in `pacheco-yelp-gallery.zip`) are in
`src/assets/photos/`: hero, five-photo strip, team portrait (story), taproom (visit) and six menu-card thumbnails.
Picked for brand fit (Pacheco-branded paper, warm light), no customers' faces, current Four Corners location only.

**Rights are not cleared.** Yelp customers took most of these photos, so they belong to those customers, not to Yelp or
the restaurant. Every entry in `src/data/photos.ts` carries that caveat in `credit`. Before launch, get the family's own
originals or each photographer's permission and swap the files (same names, or edit the manifest). This repository is
public, so the photos are public too.

Adding or replacing photos: `photos/README.md` (shot list, `npm run photos` strips GPS and resizes).
Without a photo, a slot falls back to brand graphics.

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
