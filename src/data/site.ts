/**
 * Single source of truth for everything a customer might call or drive to.
 * Hours, phone, address and links render in the header, hero, footer, visit
 * section, 404 page and the Restaurant JSON-LD — change them here only.
 *
 * ⚠ VERIFY WITH THE FAMILY BEFORE LAUNCH (see README → "Before launch"):
 *   - hours: public listings disagree (details on `hours` below)
 *   - the order link (currently the Uber Eats listing — replace if they have direct ordering)
 *   - whether the phone accepts texts
 */

export const site = {
  name: 'Pacheco Taco N Burger',
  neighborhood: 'The Cedars',
  city: 'Dallas',
  tagline: 'Smash burgers and street tacos, hecho con amor in The Cedars, Dallas.',
  description:
    'Family-owned smash burgers and street tacos in The Cedars, Dallas — inside Four Corners Brewing Co. at 1311 S Ervay St. Smashed to order, seasoned with love.',
  inside: 'Four Corners Brewing Co.',

  phone: { display: '(972) 375-7960', tel: '+19723757960' },

  address: {
    street: '1311 S Ervay St',
    city: 'Dallas',
    region: 'TX',
    postalCode: '75215',
    country: 'US',
  },

  timezone: 'America/Chicago',

  links: {
    // Verified via search results; replace `order` with a direct ordering URL if one exists.
    order: 'https://www.ubereats.com/store/pacheco-taco-n-burger/Tie-4uMTUw6gbbwIPd3V1g',
    orderLabel: 'Uber Eats',
    maps: 'https://www.google.com/maps/search/?api=1&query=1311+S+Ervay+St%2C+Dallas%2C+TX+75215',
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=1311+S+Ervay+St%2C+Dallas%2C+TX+75215',
    facebook: 'https://www.facebook.com/pachecotaconburger/',
    // Confirmed: the profile is indexed by search (@pachecotaconburger).
    instagram: 'https://www.instagram.com/pachecotaconburger/',
    // Paste a reel/post URL (https://www.instagram.com/reel/XXXX/) to show a click-to-play video on the home page.
    instagramReel: '',
    yelp: 'https://www.yelp.com/biz/pacheco-taco-n-burger-dallas',
  },

  amenities: ['Take-out', 'Delivery', 'Wheelchair accessible'],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

/* ------------------------------------------------------------------ hours --
 * Day index follows JS Date#getDay(): 0 = Sunday … 6 = Saturday.
 *
 * What the sources said (checked 2026-10-01):
 *   Yelp (via search summary)  Mon closed · Tue–Wed 3–9 PM · Thu–Sat 11 AM–9:45 PM · Sun 11 AM–7 PM
 *   Apple Maps, Yahoo Local    Mon closed · Tue 3–9 PM · Wed 11 AM–9 PM · Thu–Sat 11 AM–9:45 PM · Sun 11 AM–7 PM
 *   Uber Eats / Postmates      Mon 3–8:45 PM · Tue 3–8:45 · Wed 11–8:45 · Thu–Sat 11–9:30 · Sun 11–6:45
 *                              (delivery cut-offs run ~15 min early; its Monday looks stale)
 *   Design doc                 "11 AM – 9:30 PM daily per Uber Eats" — matches none of the above.
 * Used below: the Apple Maps / Yahoo schedule (best agreement, day by day).
 * The only open conflict is Wednesday's opening time (11 AM vs 3 PM) — confirm it.
 */
export type DayHours = { day: number; open: string; close: string } | { day: number; closed: true };

export const hours: DayHours[] = [
  { day: 1, closed: true },
  { day: 2, open: '15:00', close: '21:00' },
  { day: 3, open: '11:00', close: '21:00' }, // ← Yelp says 15:00; Apple Maps + Yahoo say 11:00
  { day: 4, open: '11:00', close: '21:45' },
  { day: 5, open: '11:00', close: '21:45' },
  { day: 6, open: '11:00', close: '21:45' },
  { day: 0, open: '11:00', close: '19:00' },
];

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** "21:45" → "9:45 PM", "11:00" → "11 AM" (brand style: "11 AM – 9:30 PM"). */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}

export function formatRange(d: DayHours): string {
  return 'closed' in d ? 'Closed' : `${formatTime(d.open)} – ${formatTime(d.close)}`;
}

/** "Tue–Sun" style summary of the days that are open. */
export function openDaysSummary(): string {
  const open = hours.filter((d) => !('closed' in d)).map((d) => d.day);
  const order = [1, 2, 3, 4, 5, 6, 0];
  const runs: number[][] = [];
  for (const day of order) {
    if (!open.includes(day)) continue;
    const last = runs[runs.length - 1];
    if (last && order.indexOf(last[last.length - 1]) === order.indexOf(day) - 1) last.push(day);
    else runs.push([day]);
  }
  return runs
    .map((r) => (r.length === 1 ? dayNames[r[0]] : `${dayShort[r[0]]}–${dayShort[r[r.length - 1]]}`))
    .join(', ');
}

export const closedDays = () =>
  hours.filter((d) => 'closed' in d).map((d) => dayNames[d.day] + 's');

/** Payload for the client-side "open now" badge. */
export const hoursPayload = {
  tz: site.timezone,
  days: hours.map((d) => ('closed' in d ? { d: d.day } : { d: d.day, o: d.open, c: d.close })),
};
