Pacheco Taco N Burger is a family-owned smash-burger and taco counter in The Cedars, Dallas (1311 S Ervay St, by Four Corners Brewing). The look is **Texas roadside sign-painting meets Mexican fiesta**: hand-lettered script with a hard drop shade, chunky poster caps, papel picado, a checkerboard band, and a sticker-like hard shadow. Warm, loud, unpretentious — never slick, never "fast-casual minimal".

## Content fundamentals

- **Voice:** a friendly cook behind the counter. Short, warm, a little bragging about the food, never about the business. "Smashed to order." "Seasoned with love." "Get it while it's hot."
- **Spanglish is welcome** where it's natural to the family and the menu: *Hecho con amor*, *aguas frescas*, *¡Órale!*. Don't translate menu names ("Pollo Chingon" stays "Pollo Chingon"; "Carne Asada Fries" stays as is).
- **Casing:** headlines and nav in ALL CAPS (`display-*`, `eyebrow`); body and buttons in sentence case. The name is always written **Pacheco Taco N Burger** — "N", not "&" or "'n'".
- **Second person, present tense:** "Grab a Texas Sun Smash and a horchata." Not "Customers can enjoy…".
- **No emoji** in UI. Food photos do that job.
- **Numbers:** prices with cents ($13.80), times as "11 AM – 9:30 PM".

## Visual foundations

**Colour.** Ground is `surface-000` (masa cream) with `ink` text. `chile` is the brand red — the wordmark, primary button, prices, and the hero ground. `queso` is the second loudest colour, used as a FILL (N disc, stars, delivery button, sun-burst) and never as text on cream. `nopal` marks fresh/veggie and open status; `jamaica` belongs only to aguas frescas and drink specials. Each `on-*` token is the text colour for that fill. In the Noche (dark) theme, accents lighten and their `on-*` text flips to ink.

**Type.**
- `script-hero` (Shrikhand) is the signature — "Pacheco" and at most one shouted word per screen, always with a hard ink drop shade (`text-shadow: .05em .05em 0 var(--ink)`).
- `display-xl` / `display-lg` / `display-md` (Bowlby One) for headlines and menu item names, ALL CAPS.
- `eyebrow` for kickers, nav, tags.
- `body`, `body-lg`, `body-strong`, `small` (Work Sans) for everything you read. `price` is Work Sans 800 in `chile`.

**Shape & depth.** Borders are solid `ink` at `border-thick` (cards) or `border-thin` (buttons, tags). Depth is a hard offset `shadow-sticker` — no blur, ever. Corners: `radius-md` for buttons and cards, `radius-lg` for hero panels and photo frames, `radius-pill` for chips and stickers.

**Spacing.** 4px base. Card padding `space-6`, gaps between cards `space-8`, section padding `space-16` mobile / `space-24` desktop.

**Pattern.** Use one pattern per section: papel picado along the top edge of the hero or a specials banner; the checker band (`checker-band.svg` / `checker-band-red.svg`) as a divider above the footer or below the nav; the Texas Sun burst only behind a single hero product or a social post.

**Imagery.** Real photos of the food — close, overhead or 3/4, on the counter or in the basket paper, warm light. Cut-outs (transparent PNG) of burgers and tacos work great on `chile` or `queso` with `shadow-sticker`. No stock photos, no AI food renders.

**Motion.** Small and snappy: buttons nudge 1px into their shadow on hover (120ms); papel picado may sway ±2° on a slow 4s loop. Respect `prefers-reduced-motion`.

**Focus & accessibility.** Every interactive element shows a solid 3px `focus` ring, 2px offset (ink by day, queso by night — 3:1+ on every surface). All text pairs listed in token usage notes meet 4.5:1 in both themes. Tags that mean something (spicy, favorite) carry an icon AND a word, never colour alone.

## Logos

All logos are outlined SVG (no font needed) in `assets/Logos/`.

| File | Use on |
|---|---|
| `pacheco-lockup.svg` | Primary. Cream/tortilla grounds — header, menus. |
| `pacheco-lockup-reverse.svg` | Chile red panels. |
| `pacheco-lockup-dark.svg` | Ink/char grounds and dark theme. |
| `pacheco-lockup-ink.svg` | One-colour print, stamps, engraving. |
| `pacheco-wordmark*.svg` | "Pacheco" script alone, where "Taco N Burger" is already said nearby. |
| `pacheco-seal.svg`, `-seal-dark.svg` | Round badge: footer, cups, stickers, merch. |
| `pacheco-monogram*.svg`, `pacheco-favicon.svg` | Avatars, app icon, favicon. |

Clear space = the N-disc height on all sides. Never recolour outside the palette, stretch, outline, or add soft shadows.

## Iconography

`assets/Icons/` is a custom 24px line set — 2px round strokes, food-truck friendly: taco, burger, fries, agua-fresca, chile, flame, beer, map-pin, clock, phone, bag, delivery, star, arrow-right, menu, close. Each ships in `ink` (`name.svg`) and `cream` (`name-cream.svg`). In the website, render icons with the `pt-icon` class (`<span class="pt-icon" style="--icon:url(…/taco.svg)">`) so they take `currentColor` and follow the theme. For Instagram, Facebook, Yelp and TikTok use each platform's official glyph from their brand resources — don't redraw them.

## Before launch — verify with the family

- The address shows as 1311 S Ervay St on Yelp and Uber Eats but 1315 S Ervay on some directories; confirm which one Google Business Profile uses and use it everywhere.
- Hours (11 AM – 9:30 PM daily per Uber Eats), phone number, and current menu prices.
- If they already have a logo they love (their Instagram/Facebook avatar), it replaces the marks here; keep the palette, type and components.
