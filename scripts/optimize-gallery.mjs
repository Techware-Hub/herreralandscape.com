// Compresses gallery photos to optimized WebP in place.
//
// Originals are preserved in .image-originals/gallery (gitignored) before the
// source files are replaced. Dimensions are kept identical so proportions and
// framing are unchanged — only the encoding changes.
//
// The gallery scanner (lib/gallery.ts) auto-discovers any supported extension,
// so switching .png -> .webp requires no code changes.
//
// Run: node scripts/optimize-gallery.mjs

import { readdir, stat, unlink, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const GALLERY = path.join(ROOT, "public", "assets", "images", "gallery");
const BACKUP = path.join(ROOT, ".image-originals", "gallery");

const SOURCE_EXT = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 82;

await mkdir(BACKUP, { recursive: true });

const entries = await readdir(GALLERY, { withFileTypes: true });
const targets = entries
  .filter((e) => e.isFile() && SOURCE_EXT.has(path.extname(e.name).toLowerCase()))
  .map((e) => e.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (targets.length === 0) {
  console.log("Nothing to optimize — no .png/.jpg sources found.");
  process.exit(0);
}

let beforeTotal = 0;
let afterTotal = 0;

for (const name of targets) {
  const srcPath = path.join(GALLERY, name);
  const base = path.basename(name, path.extname(name));
  const outPath = path.join(GALLERY, `${base}.webp`);

  // Preserve the original before replacing it.
  const backupPath = path.join(BACKUP, name);
  if (!existsSync(backupPath)) await copyFile(srcPath, backupPath);

  const before = (await stat(srcPath)).size;
  const meta = await sharp(srcPath).metadata();

  // Keep intrinsic dimensions — re-encode only.
  await sharp(srcPath).webp({ quality: QUALITY, effort: 6 }).toFile(outPath);

  const after = (await stat(outPath)).size;
  beforeTotal += before;
  afterTotal += after;

  // Remove the heavy source now that the WebP exists.
  await unlink(srcPath);

  const pct = (100 - (after / before) * 100).toFixed(1);
  console.log(
    `✓ ${base}.webp  ${meta.width}x${meta.height}  ` +
      `${(before / 1048576).toFixed(2)}MB -> ${(after / 1024).toFixed(0)}KB  (-${pct}%)`
  );
}

console.log(
  `\nTotal: ${(beforeTotal / 1048576).toFixed(1)}MB -> ${(afterTotal / 1048576).toFixed(2)}MB ` +
    `(-${(100 - (afterTotal / beforeTotal) * 100).toFixed(1)}%)`
);
console.log(`Originals preserved in .image-originals/gallery`);
