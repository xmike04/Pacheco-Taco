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

const CREDIT =
  'Yelp user photo — rights NOT confirmed; get permission or replace before launch';

export const photos: PhotoEntry[] = [
  { file: 'hero-smash-burger.jpg', slot: 'hero', alt: "Smash burger with melted American cheese in a black basket lined with Pacheco Taco N Burger paper", position: '50% 55%', credit: CREDIT },
  { file: 'strip-sauce-drizzle.jpg', slot: 'strip', alt: "Sauce squeezed from a bottle onto a burger on a Pacheco-branded metal tray", credit: CREDIT },
  { file: 'strip-tacos-and-fries.jpg', slot: 'strip', alt: "Tacos and loaded fries in red baskets lined with Pacheco paper", credit: CREDIT },
  { file: 'strip-carne-asada-fries.jpg', slot: 'strip', alt: "Carne asada fries topped with steak, queso, crema and salsa verde", credit: CREDIT },
  { file: 'strip-taco-lime.jpg', slot: 'strip', alt: "Taco with salsa and a lime wedge in a foam clamshell", credit: CREDIT },
  { file: 'strip-burger-loaded-fries.jpg', slot: 'strip', alt: "Cheeseburger beside fries loaded with steak, crema and bacon", credit: CREDIT },
  { file: 'story-team.jpg', slot: 'story', alt: "Two Pacheco team members in black Pacheco hoodies, laughing together", position: '50% 40%', credit: CREDIT },
  { file: 'visit-taproom.jpg', slot: 'visit', alt: "Four Corners Brewing taproom with the red FCBC sign and yellow barstools", credit: CREDIT },
  { file: 'menu-smash-burger.jpg', slot: 'menu', menu: 'smash-burger', alt: "Double smash burger with American cheese and a pickle on a Pacheco tray", credit: CREDIT },
  { file: 'menu-carne-asada-fries.jpg', slot: 'menu', menu: 'carne-asada-fries', alt: "Crinkle-cut carne asada fries with steak, crema and bacon", credit: CREDIT },
  { file: 'menu-tacos.jpg', slot: 'menu', menu: 'two-tacos', alt: "Tacos with pickled red onion, salsa verde and chipotle crema, with lime", credit: CREDIT },
  { file: 'menu-pollo-chingon.jpg', slot: 'menu', menu: 'pollo-chingon', alt: "Crispy fried chicken sandwich with lettuce beside crinkle fries", credit: CREDIT },
  { file: 'menu-loaded-nachos.jpg', slot: 'menu', menu: 'loaded-nachos', alt: "Loaded nachos with queso and cilantro in a red checkered basket", credit: CREDIT },
  { file: 'menu-aguas-frescas.jpg', slot: 'menu', menu: 'aguas-frescas', alt: "Bottled agua fresca with the Pacheco Taco N Burger logo", credit: CREDIT },
];
