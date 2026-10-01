import type { APIRoute } from 'astro';

// Absolute URLs need the production origin (SITE_URL). Without it the sitemap is empty
// rather than pointing search engines at a guessed domain.
const paths = ['/', '/menu/'];

export const GET: APIRoute = ({ site }) => {
  const urls = site
    ? paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`).join('\n')
    : '  <!-- Set SITE_URL at build time to list pages here. -->';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
