import { defineConfig } from 'astro/config';

// The production origin is only needed for canonical URLs, og:image and the sitemap.
// Set SITE_URL at build time (e.g. SITE_URL=https://example.com). On Vercel the
// production domain is picked up automatically. With neither, those tags are omitted
// rather than pointing at a guessed domain.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export default defineConfig({
  site,
  output: 'static',
  compressHTML: true,
  // The whole stylesheet is ~6KB gzipped: inlining it removes a render-blocking request.
  build: { inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
});
