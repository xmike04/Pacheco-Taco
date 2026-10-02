/**
 * The menu — modelled on their in-store menu board (photo supplied 2026-10-02): Main Menu,
 * Chef's Specials, protein choices and aguas frescas. Names and descriptions are as printed.
 *
 * ⚠ NO PRICES: the board shows none, and the earlier Uber Eats prices were unverified
 *   (delivery apps mark up). Add `price: 12.5` to an item once the family confirms it and it
 *   will render automatically.
 * ⚠ The board is undated — confirm it is the current menu. Dishes from older boards/listings
 *   that aren't on it (Texas Sun Smash, Single Ceci Smash, The Don, Loaded Nachos variants) are not published.
 */

export type Tag = 'spicy' | 'favorite' | 'fresh';

export interface MenuItem {
  /** Used for in-page links and to attach a photo (see src/data/photos.ts). */
  id: string;
  name: string;
  description: string;
  price?: number;
  tags?: Tag[];
  /** Shows the "choose your protein" chips. */
  proteins?: boolean;
  /** Flavour chips (aguas frescas). */
  flavors?: string[];
}

export interface MenuSection {
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
}

export const PROTEINS = ['Fajita', 'Barbacoa', 'Al Pastor', 'Chicken'];

export const menu: MenuSection[] = [
  {
    id: 'burgers',
    title: 'Burgers',
    blurb: 'Smashed to order.',
    items: [
      {
        id: 'smash-burger',
        name: 'Smash Burger',
        description: 'Special sauce, American cheese, caramelized onions, lettuce.',
        tags: ['favorite'],
      },
      {
        id: 'kelly-house-burger',
        name: 'Kelly House Burger',
        description: 'Creamy chipotle, Muenster cheese, poblano & onion, pickles, lettuce.',
      },
      {
        id: 'chorizo-smash',
        name: 'Chorizo Smash',
        description:
          'Beef chorizo patty, creamy chipotle, pickled red onion, lettuce, Muenster cheese, topped with a fried egg.',
      },
    ],
  },
  {
    id: 'specials',
    title: "Chef's Specials",
    items: [
      {
        id: 'chopped-and-screwed',
        name: 'Chopped & Screwed',
        description:
          'Beef patties chopped with onion. Topped with American cheese, spicy ketchup, guajillo mayo, lettuce & tomato on a Mexican bollillo.',
      },
      {
        id: 'el-pollo-chingon',
        name: 'El Pollo Chingon',
        description: 'Crispy chicken, creamy guajillo, pickles, lettuce.',
      },
      {
        id: 'carne-asada-fries',
        name: 'Carne Asada Fries',
        description: 'Queso, steak, ranch, sour cream, salsa verde, cilantro, bacon.',
      },
      {
        id: 'pollito-fries',
        name: 'Pollito Fries',
        description: 'Popcorn chicken, sharp cheddar, umami sauce, ranch, cilantro.',
      },
    ],
  },
  {
    id: 'tacos-and-more',
    title: 'Tacos & more',
    blurb: 'Pick your protein: Fajita, Barbacoa, Al Pastor or Chicken.',
    items: [
      {
        id: 'tacos',
        name: 'Tacos',
        description: 'Choice of protein, cilantro, onion, salsa verde.',
        proteins: true,
      },
      {
        id: 'quesadilla',
        name: 'Quesadilla',
        description: 'Muenster cheese, choice of protein.',
        proteins: true,
      },
      {
        id: 'torta',
        name: 'Torta',
        description: 'Choice of protein, pickled red onion, lettuce, chipotle cream, salsa verde.',
        proteins: true,
      },
      {
        id: 'barbacoa-grilled-cheese',
        name: 'Barbacoa Grilled Cheese',
        description: 'Salsa verde, Muenster cheese.',
      },
      {
        id: 'loaded-nachos',
        name: 'Loaded Nachos',
        description: 'Choice of protein, queso, Mexican crema, salsa verde, cilantro.',
        proteins: true,
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Aguas frescas',
    blurb: 'Seven flavors.',
    items: [
      {
        id: 'aguas-frescas',
        name: 'Aguas Frescas',
        description: 'Pick a flavor:',
        flavors: ['Cucumber lemonade', 'Horchata', 'Ube horchata', 'Mango', 'Jamaica', 'Tamarindo', 'Piña'],
      },
    ],
  },
];

/** Home-page "Start here" picks (ids from above). Four show on phones. */
export const startHere = [
  'smash-burger',
  'chorizo-smash',
  'carne-asada-fries',
  'tacos',
  'el-pollo-chingon',
  'loaded-nachos',
];

export const allItems = menu.flatMap((s) => s.items);
export const findItem = (id: string) => allItems.find((i) => i.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
