/**
 * Photo manifest. Real photos of the real food only — the brand rules out stock and
 * AI-generated food images. Until photos are added, every slot falls back to brand
 * graphics (nothing is broken or empty).
 *
 * To add photos:
 *   1. Drop originals in photos/originals/ and run `npm run photos`
 *      (resizes, auto-rotates, strips EXIF/GPS, writes src/assets/photos/<slug>.jpg).
 *   2. Add one entry per photo below. `alt` is required and should describe the food,
 *      not say "photo of".
 *
 * Slots:
 *   hero    one photo beside the headline (best: 3/4 view of a burger on basket paper,
 *           or a transparent cut-out PNG with shape: 'cutout')
 *   strip   3–6 photos in the home-page gallery band (mix of overhead / close-up)
 *   story   one photo in "Our story" (the people or the counter beat food here)
 *   visit   one photo in "Visit" (storefront / taproom / counter)
 *   menu    set `menu: '<item id from menu.ts>'` to show a thumbnail on that card
 */

export interface PhotoEntry {
  /** File name inside src/assets/photos/ */
  file: string;
  alt: string;
  slot: 'hero' | 'strip' | 'story' | 'visit' | 'menu';
  /** For slot 'menu': the MenuItem id. */
  menu?: string;
  /** 'frame' (default) = rounded sticker frame; 'cutout' = transparent PNG with a hard drop shade. */
  shape?: 'frame' | 'cutout';
  /** CSS object-position for the crop, e.g. '50% 35%'. */
  position?: string;
  /** Who took it / where it came from — keep this honest, it is how rights get cleared. */
  credit?: string;
}

export const photos: PhotoEntry[] = [];
