# Photos

The brand's rule is **real photos of the real food — no stock, no AI renders**. Until photos are
added, every photo slot on the site falls back to brand graphics, so nothing is broken or empty.

## Add photos in three steps

1. Drop the originals in `photos/originals/` (JPG, PNG, WebP or AVIF; for iPhone HEIC, share/export as JPEG).
   That folder is git-ignored — raw phone photos carry GPS and other metadata.
2. `npm run photos` — resizes to ≤2400px, applies orientation, **strips EXIF/GPS** and writes
   `src/assets/photos/<name>.jpg`. It prints a manifest stub for each file.
3. Add one entry per photo to `src/data/photos.ts` (`slot`, `alt`, `credit`). Run `npm run dev` and look.

Astro generates the AVIF/WebP + responsive sizes at build time, so don't pre-shrink beyond step 2.

## Shot list (what each slot wants)

| Slot | How many | What | Shape |
|---|---|---|---|
| `hero` | 1 | **Texas Sun Smash**, 3/4 view on basket paper, warm light. A transparent cut-out PNG works great on the red hero (`shape: 'cutout'`). | portrait 4:5 (≥1600px tall) |
| `strip` | 3–6 | Overhead tacos in the basket · Carne Asada Fries with the queso pull · a smash patty hitting the flat-top · the aguas frescas lineup · Loaded Nachos · a burger held in a hand | portrait 4:5 |
| `story` | 1 | The mom-and-son team at the counter or on the line (with their OK) | landscape 5:4 |
| `visit` | 1 | The counter / taproom entrance at Four Corners Brewing Co. | landscape 4:3 |
| `menu` | optional | Tight close-ups for any menu card (`menu: '<item id>'` from `src/data/menu.ts`) | landscape 4:3 |

Good photos: close, overhead or 3/4, natural warm light, food filling the frame. Avoid heavy filters,
visible phone numbers/receipts, and anyone's face who hasn't agreed to be on the website.

## Where the photos should come from

Best → worst:

1. **The family's own phone originals** (camera roll, or the originals behind their Instagram/Facebook posts). Highest
   resolution, rights are unambiguous.
2. **Photos the business itself posted** (its Facebook page, Instagram, or photos the owner uploaded to Yelp/Google).
3. **A customer's photo, with their permission** (they own it — message the reviewer, or ask them to send the original).

Photos that customers uploaded to Yelp belong to those customers, not to Yelp or the restaurant, so they shouldn't be
copied onto the site without permission. Yelp also blocks automated downloading (DataDome), and the site doesn't try
to get around that. Saving a handful of the owner's own photos from the Yelp page by hand is fine; record who took
each one in `credit`.
