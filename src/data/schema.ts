import { site, fullAddress, hours, dayNames } from './site';

/** schema.org Restaurant for the home page. `origin` is only known when SITE_URL is set. */
export function restaurantSchema(origin?: string) {
  // Group days that share the same hours so the markup stays compact.
  const groups = new Map<string, number[]>();
  for (const h of hours) {
    if ('closed' in h) continue;
    const key = `${h.open}|${h.close}`;
    groups.set(key, [...(groups.get(key) ?? []), h.day]);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.description,
    ...(origin && {
      url: origin,
      image: `${origin}/assets/social/og-image.png`,
      hasMenu: `${origin}/menu/`,
    }),
    telephone: site.phone.tel,
    servesCuisine: ['Mexican', 'Tacos', 'Burgers'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [...groups].map(([key, days]) => {
      const [opens, closes] = key.split('|');
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: days.map((d) => dayNames[d]),
        opens,
        closes,
      };
    }),
    sameAs: [site.links.facebook, site.links.instagram, site.links.yelp],
  };
}

export { fullAddress };
