#!/usr/bin/env node
/**
 * Downloads glyph-subset WOFF2 files for the Japanese-capable fonts.
 *
 * Google serves Dela Gothic One / Zen Kaku Gothic New as ~120 unicode-range
 * slices per weight, which bloats the render-blocking CSS. We only need
 * Latin plus the handful of kana/kanji used for SFX, so we ask the Google
 * Fonts `text=` API for exactly those glyphs.
 *
 * Re-run (`npm run fonts`) whenever you add new Japanese text or symbols.
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'app/fonts');
const SCAN = ['app', 'components', 'data', 'lib'];
const EXT = new Set(['.ts', '.tsx', '.json', '.css']);

const FONTS = [
  { family: 'Dela Gothic One', weight: 400, file: 'dela-gothic-one-400.woff2' },
  { family: 'Zen Kaku Gothic New', weight: 400, file: 'zen-kaku-gothic-new-400.woff2' },
  { family: 'Zen Kaku Gothic New', weight: 700, file: 'zen-kaku-gothic-new-700.woff2' },
];

// Printable ASCII + Latin-1 + common typographic punctuation, always included.
const BASE = [
  ...range(0x20, 0x7e),
  ...range(0xa0, 0xff),
  ...'‘’‚“”„–—…•·→←↑↓↩■□★☆※€™',
].join('');

function range(a, b) {
  return Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i));
}

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(e.name))) yield p;
  }
}

async function collectChars() {
  const set = new Set(BASE);
  for (const d of SCAN) {
    for await (const f of walk(join(ROOT, d))) {
      for (const ch of await readFile(f, 'utf8')) if (ch.codePointAt(0) > 0x7f && !/\s/.test(ch)) set.add(ch);
    }
  }
  return [...set].sort().join('');
}

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

async function main() {
  const text = await collectChars();
  const extra = [...text].filter((c) => !BASE.includes(c)).join('');
  console.log(`Subsetting ${[...text].length} glyphs (extra: ${extra || 'none'})`);
  await mkdir(OUT, { recursive: true });

  for (const f of FONTS) {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f.family)}:wght@${f.weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();
    const srcs = [...css.matchAll(/url\((https:[^)]+)\)\s*format\('woff2'\)/g)].map((m) => m[1]);
    if (srcs.length !== 1) throw new Error(`${f.family} ${f.weight}: expected 1 woff2, got ${srcs.length}\n${css}`);
    const buf = Buffer.from(await (await fetch(srcs[0])).arrayBuffer());
    await writeFile(join(OUT, f.file), buf);
    console.log(`  ${f.file}  ${(buf.length / 1024).toFixed(1)} KB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
