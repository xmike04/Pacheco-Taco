// Normalises the photos dropped into photos/originals/ and writes web-ready copies to
// src/assets/photos/. Run with: npm run photos
//
// What it does for every image:
//   - applies the EXIF orientation, then drops ALL metadata (phone photos carry GPS)
//   - caps the longest edge at 2400px (Astro makes the smaller responsive sizes at build time)
//   - writes JPEG (quality 84, mozjpeg), or PNG when the source has transparency (cut-outs)
//   - prints a manifest stub to paste into src/data/photos.ts
//
// photos/originals/ is git-ignored on purpose: only the processed copies get committed.
import { readdir, readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'photos/originals';
const OUT = 'src/assets/photos';
const MANIFEST = 'src/data/photos.ts';
const MAX_EDGE = 2400;
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);

// `npm run photos -- --check` (used in CI): the manifest and the folder must agree.
// Everything in src/assets/photos/ is published with the site — listed or not — so strays matter.
if (process.argv.includes('--check')) {
  const manifest = await readFile(MANIFEST, 'utf8');
  const listed = [...manifest.matchAll(/file:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
  const onDisk = (await readdir(OUT).catch(() => [])).filter((f) => EXTS.has(path.extname(f).toLowerCase()));
  const missing = listed.filter((f) => !onDisk.includes(f));
  const unlisted = onDisk.filter((f) => !listed.includes(f));
  const todoAlts = [...manifest.matchAll(/alt:\s*['"]\s*TODO/gi)].length;
  if (missing.length) console.error(`✗ listed in photos.ts but missing from ${OUT}/: ${missing.join(', ')}`);
  if (unlisted.length) console.error(`✗ in ${OUT}/ but not in photos.ts (they would still be published): ${unlisted.join(', ')}`);
  if (todoAlts) console.error(`✗ ${todoAlts} photo(s) still have a TODO alt text`);
  const bad = missing.length + unlisted.length + todoAlts;
  console.log(bad ? `\nphoto manifest: ${bad} problem(s)` : `photo manifest OK (${listed.length} photo${listed.length === 1 ? '' : 's'})`);
  process.exit(bad ? 1 : 0);
}

const slugify = (file) =>
  path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'photo';

let files = [];
try {
  files = (await readdir(SRC)).filter((f) => EXTS.has(path.extname(f).toLowerCase())).sort();
} catch {
  /* folder missing — handled below */
}

if (files.length === 0) {
  console.log(`No images found in ${SRC}/.\nDrop JPG/PNG/WebP/AVIF files there (HEIC: export as JPEG first), then run again.`);
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
const stubs = [];
const used = new Set();

for (const file of files) {
  const input = path.join(SRC, file);
  try {
    const before = await sharp(input, { failOn: 'none' }).metadata();
    const transparent = Boolean(before.hasAlpha) && path.extname(file).toLowerCase() === '.png';
    let slug = slugify(file);
    for (let i = 2; used.has(slug); i++) slug = `${slugify(file)}-${i}`;
    used.add(slug);

    const outName = `${slug}.${transparent ? 'png' : 'jpg'}`;
    const pipeline = sharp(input, { failOn: 'none' })
      .rotate() // honour EXIF orientation; sharp strips the rest of the metadata on write
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
    const info = await (transparent
      ? pipeline.png({ compressionLevel: 9 })
      : pipeline.jpeg({ quality: 84, mozjpeg: true, progressive: true })
    ).toFile(path.join(OUT, outName));

    const notes = [];
    if (before.exif) notes.push('EXIF/GPS removed');
    if (transparent) notes.push('transparent → use shape: "cutout"');
    if (Math.max(info.width, info.height) < 1200) notes.push('small (<1200px): fine for cards, soft as a hero');
    const shape = info.width > info.height * 1.1 ? 'landscape' : info.height > info.width * 1.1 ? 'portrait' : 'square';

    console.log(
      `${file.padEnd(34)} → ${outName.padEnd(30)} ${String(info.width).padStart(4)}×${String(info.height).padEnd(4)} ${String(Math.round(info.size / 1024)).padStart(5)} KB  ${shape}${notes.length ? '  · ' + notes.join(' · ') : ''}`,
    );
    stubs.push(
      `  { file: '${outName}', slot: 'strip', alt: 'TODO: describe the food', credit: 'TODO: who took it'${transparent ? ", shape: 'cutout'" : ''} },`,
    );
  } catch (err) {
    const heic = /heif|heic/i.test(String(err?.message));
    console.error(
      `✗ ${file}: ${err?.message ?? err}${heic ? '\n  (HEIC isn’t supported — export as JPEG from the Photos app or share as "Most Compatible".)' : ''}`,
    );
  }
}

console.log(`\nPaste into src/data/photos.ts (set slot, alt and credit for each):\n${stubs.join('\n')}\n`);
