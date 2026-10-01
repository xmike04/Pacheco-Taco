/**
 * The menu. Names, descriptions and prices come from the Uber Eats / Postmates listing
 * (the only complete, structured menu available — fetched 2026-10-01), lightly tidied
 * for case and punctuation.
 *
 * ⚠ PRICES ARE UNVERIFIED. Delivery apps often add a markup (the design doc itself warns
 *   "delivery apps mark up"), and several of these are multiples of $0.60, which looks like
 *   a flat ~20% markup on round in-store prices. Replace with the POS prices before launch.
 *
 * Also seen on other listings but NOT on the Uber Eats snapshot (so not published here —
 * confirm with the family): The Don Smashburger (~$13.50, double patty), Barbacoa Chingon
 * tacos (~2 for $7), Barbacoa Grilled Cheese (~$10).
 */

export type Tag = 'spicy' | 'favorite' | 'fresh';

export interface MenuRow {
  name: string;
  price: number;
}

export interface MenuItem {
  /** Used for in-page links and to attach a photo (see src/data/photos.ts). */
  id: string;
  name: string;
  description: string;
  price?: number;
  tags?: Tag[];
  /** Small, uniform add-ons shown as a single card with dotted-leader rows. */
  rows?: MenuRow[];
  /** Flavour chips (aguas frescas). */
  flavors?: string[];
}

export interface MenuSection {
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
}

export const menu: MenuSection[] = [
  {
    id: 'burgers',
    title: 'Burgers',
    blurb: 'Smashed to order.',
    items: [
      {
        id: 'smash-burger',
        name: 'Smash Burger',
        price: 13.8,
        description: '4oz smash patty, special sauce, caramelized onions, American cheese, pickles.',
        tags: ['favorite'],
      },
      {
        id: 'texas-sun-smash',
        name: 'Texas Sun Smash',
        price: 13.8,
        description: 'Smash patty, grilled onion, Swiss, pickles and our heat sauce.',
        tags: ['spicy'],
      },
      {
        id: 'single-ceci-smash',
        name: 'Single Ceci Smash',
        price: 13.0,
        description: 'Smash burger with raw onion, lettuce, tomato, special sauce, pickles.',
      },
    ],
  },
  {
    id: 'tacos',
    title: 'Tacos',
    items: [
      {
        id: 'two-tacos',
        name: '2 Tacos',
        price: 7.8,
        description: 'Meat of choice, cilantro, onion, salsa, lime wedge.',
      },
    ],
  },
  {
    id: 'loaded',
    title: 'Loaded',
    blurb: 'Fries and nachos, piled high.',
    items: [
      {
        id: 'carne-asada-fries',
        name: 'Carne Asada Fries',
        price: 15.6,
        description: 'Steak fajita, queso, salsa verde, ranch, Mexican crema, cilantro, bacon.',
      },
      {
        id: 'loaded-nachos',
        name: 'Loaded Nachos',
        price: 18.0,
        description:
          'Meat of choice, queso, Mexican crema, green salsa, chipotle crema, cilantro, pickled red onion.',
      },
    ],
  },
  {
    id: 'sandwiches',
    title: 'Sandwiches',
    items: [
      {
        id: 'pollo-chingon',
        name: 'Pollo Chingon',
        price: 12.0,
        description: 'Fried chicken sandwich with special sauce and pickles.',
      },
    ],
  },
  {
    id: 'sides',
    title: 'Sides & salsas',
    items: [
      {
        id: 'basket-of-fries',
        name: 'Basket of Fries',
        price: 7.2,
        description: 'Crispy, golden fries in a basket.',
      },
      {
        id: 'salsas-and-sauces',
        name: 'Salsas & sauces',
        description: 'Extra, for dipping.',
        rows: [
          { name: 'Green salsa', price: 0.6 },
          { name: 'Special sauce', price: 0.6 },
          { name: 'Heat sauce', price: 0.6 },
          { name: 'Spicy ketchup', price: 1.25 },
        ],
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Aguas frescas & drinks',
    blurb: 'Seven aguas frescas to choose from.',
    items: [
      {
        id: 'aguas-frescas',
        name: 'Aguas Frescas',
        price: 6.0,
        description: 'Pick a flavor:',
        flavors: [
          'Horchata',
          'Ube horchata',
          'Jamaica',
          'Tamarindo',
          'Pineapple lemonade',
          'Strawberry lemonade',
          'Cucumber lemonade',
        ],
      },
      {
        id: 'sodas',
        name: 'Sodas',
        price: 3.3,
        description: 'Diet Coke, Fanta Pineapple, Fanta Strawberry, Fanta Orange, Big Red.',
      },
    ],
  },
];

/**
 * Home-page "Start here" picks (ids from above). Six fills a 3×2 grid on desktop; on phones
 * only the first four show (see .pt-menu--picks in site.css) to keep the page short.
 */
export const startHere = [
  'texas-sun-smash',
  'smash-burger',
  'carne-asada-fries',
  'two-tacos',
  'pollo-chingon',
  'loaded-nachos',
];

export const allItems = menu.flatMap((s) => s.items);
export const findItem = (id: string) => allItems.find((i) => i.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
