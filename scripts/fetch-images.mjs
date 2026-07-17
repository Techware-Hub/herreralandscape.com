// Downloads curated royalty-free Unsplash photos and optimizes them to WebP
// (cropped to controlled aspect ratios) into public/assets/images/**.
//
// Source: images.unsplash.com (Unsplash License — free for commercial use).
// Run: node scripts/fetch-images.mjs
//
// Each entry: [unsplashId, outPath, width, height]. Every slot uses a UNIQUE
// photo so no image repeats across the site.

import { execFileSync } from "node:child_process";
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "public", "assets", "images");
const TMP = join(ROOT, ".img-tmp");

// [id, out, w, h]
const M = [
  // ── Hero (16:9) ────────────────────────────────────────────────
  ["1599365726864-ac222011504a", "hero/landscape-hero-sunnyvale", 1920, 1080],
  ["1647367918308-56b110dc969d", "hero/residential-landscape-design", 1920, 1080],
  ["1780838446281-9394772d07a8", "hero/backyard-hardscaping", 1920, 1080],

  // ── About ──────────────────────────────────────────────────────
  ["1622383563227-04401ab4e5ea", "about/landscaper-working", 1000, 1200],
  ["1631149784601-8e6c266b046a", "about/completed-residential-landscape", 1200, 900],
  ["1597868165956-03a6827955b1", "about/garden-installation", 1200, 900],
  ["1760649004090-b70cea9cce39", "about/about-banner", 1600, 760],

  // ── Service cards (4:3) ────────────────────────────────────────
  ["1685736092106-11d0099c5142", "services/residential-landscape-design", 800, 600],
  ["1780478243212-22537df4d319", "services/backyard-hardscaping", 800, 600],
  ["1761637823407-ef47925c2714", "services/paver-walkway-installation", 800, 600],
  ["1578359689698-c6113e8cf814", "services/wood-fence-installation", 800, 600],
  ["1523904200128-4f0fd6d026ad", "services/irrigation-system", 800, 600],
  ["1558904541-efa843a96f01", "services/natural-lawn-installation", 800, 600],
  ["1544914379-806667cd9489", "services/artificial-grass-installation", 800, 600],
  ["1536235918060-dd0b5d3d0dda", "services/garden-planting", 800, 600],
  ["1458245201577-fc8a130b8829", "services/landscape-maintenance", 800, 600],
  ["1634081727680-fa43e3237d5a", "services/property-cleanup", 800, 600],
  ["1681853108586-f29b4ef5c0fb", "services/outdoor-renovation", 800, 600],

  // ── Service hero banners (wide) ────────────────────────────────
  ["1701750204317-213f30c7fd6d", "services/landscaping-hero", 1600, 760],
  ["1767263318272-01a10851d5d2", "services/hardscaping-hero", 1600, 760],
  ["1759745063503-921e354f5f55", "services/paver-installation-hero", 1600, 760],
  ["1727703025566-be0b383b6d96", "services/fence-installation-hero", 1600, 760],
  ["1600266189529-58cc5dc3d63d", "services/irrigation-hero", 1600, 760],
  ["1601182977411-ef239c7ab4a3", "services/natural-grass-hero", 1600, 760],
  ["1631293624445-55f390cef754", "services/artificial-grass-hero", 1600, 760],
  ["1651029982967-7faf59d2a8b7", "services/plants-garden-hero", 1600, 760],
  ["1590820292118-e256c3ac2676", "services/maintenance-hero", 1600, 760],
  ["1730191948878-80ecf32ed66b", "services/cleanup-hero", 1600, 760],
  ["1749803915455-a7642520d0d3", "services/renovation-hero", 1600, 760],

  // ── Projects (4:3) ─────────────────────────────────────────────
  ["1702961339823-812f512a22e5", "projects/front-yard-landscaping", 1000, 750],
  ["1722725648713-f73f1cd1f5b7", "projects/backyard-transformation", 1000, 750],
  ["1663185776834-0c86f6ced17b", "projects/paver-walkway", 1000, 750],
  ["1780128541130-03a606d9a700", "projects/paver-patio", 1000, 750],
  ["1779632069298-4be3693f173c", "projects/retaining-wall", 1000, 750],
  ["1743208552250-47e51d38c9f2", "projects/stone-pathway", 1000, 750],
  ["1776283636519-3f2ce27746ea", "projects/wood-fence", 1000, 750],
  ["1655979339871-f62355759179", "projects/modern-fence", 1000, 750],
  ["1502481686408-d428268c24ff", "projects/artificial-turf", 1000, 750],
  ["1651220215941-5093b0d0d755", "projects/artificial-turf-lawn", 1000, 750],
  ["1734303023491-db8037a21f09", "projects/natural-sod", 1000, 750],
  ["1541955193702-9ca03b1bb11a", "projects/irrigation-upgrade", 1000, 750],
  ["1718565524318-b58b8b86b813", "projects/drip-irrigation", 1000, 750],
  ["1662063750282-bd23d490ad96", "projects/garden-bed", 1000, 750],
  ["1628340981113-fe1949fe5cc0", "projects/lawn-maintenance", 1000, 750],
  ["1692955523298-c361598bee0f", "projects/property-cleanup", 1000, 750],

  // ── Before / after (3:2) ───────────────────────────────────────
  ["1595797623546-5a85a990ca6c", "before-after/overgrown-yard-before", 1200, 800],
  ["1650316305075-cff140a81af5", "before-after/landscaped-yard-after", 1200, 800],

  // ── Misc ───────────────────────────────────────────────────────
  ["1772313952254-dae19b91854b", "backgrounds/california-neighborhood", 1200, 800],
  ["1783566255093-90ede776e8f5", "contact/garden-walkway", 1600, 760],
  ["1723079637087-1d4aabcd5c63", "contact/landscaped-front-yard", 1000, 750],
  ["1694885186013-5aa7d91ae5d5", "backgrounds/quote-project", 1600, 760],
  ["1666940089209-76cc8fd41906", "auth/residential-landscaping", 1200, 1500],
  ["1722881445875-bdd5f4d9e6fa", "backgrounds/projects-banner", 1600, 760],
  ["1758414335865-17baa986b85b", "backgrounds/services-banner", 1600, 760],
  ["1769581243975-d01f30d62892", "backgrounds/garden-path-banner", 1600, 760],
  ["1695151753349-ae0f062d0a8d", "backgrounds/foliage-texture", 1600, 900],
];

function srcUrl(id, w) {
  const rw = Math.min(2400, Math.round(w * 1.4));
  return `https://images.unsplash.com/photo-${id}?q=82&w=${rw}&fm=jpg&fit=crop&auto=format`;
}

await mkdir(TMP, { recursive: true });

const ok = [];
const failed = [];

for (let i = 0; i < M.length; i++) {
  const [id, out, w, h] = M[i];
  const dest = join(OUT, `${out}.webp`);
  await mkdir(dirname(dest), { recursive: true });
  const tmp = join(TMP, `${i}.jpg`);
  try {
    execFileSync("curl", ["-s", "-L", "--max-time", "45", "-o", tmp, srcUrl(id, w)], {
      stdio: "ignore",
    });
    const buf = await readFile(tmp);
    if (buf.length < 4000) throw new Error(`too small (${buf.length}b)`);
    await sharp(buf)
      .resize(w, h, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 80, effort: 5 })
      .toFile(dest);
    const meta = await sharp(dest).metadata();
    ok.push({ i, out, kb: Math.round((await readFile(dest)).length / 1024), dim: `${meta.width}x${meta.height}` });
    process.stdout.write(`✓ ${String(i).padStart(2)} ${out} (${ok[ok.length - 1].kb}kb)\n`);
  } catch (e) {
    failed.push({ i, out, id, err: e.message });
    process.stdout.write(`✗ ${String(i).padStart(2)} ${out} — ${e.message}\n`);
  }
}

await rm(TMP, { recursive: true, force: true });

console.log(`\nDone: ${ok.length} ok, ${failed.length} failed.`);
if (failed.length) {
  console.log("FAILED:");
  for (const f of failed) console.log(`  [${f.i}] ${f.out} (id ${f.id}) — ${f.err}`);
}

// Write a manifest for reference
await writeFile(
  join(ROOT, "scripts", "image-manifest.json"),
  JSON.stringify({ generated: "run", count: ok.length, images: M.map(([id, out, w, h]) => ({ id, out: `/assets/images/${out}.webp`, w, h })) }, null, 2)
);
