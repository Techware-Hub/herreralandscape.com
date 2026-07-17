// Generates labeled SVG placeholder images so the site builds with zero network
// access and no missing images. Replace any file in /public/images with a real
// photo of the same name/path when the client provides assets.
//
// Run: node scripts/gen-placeholders.mjs

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");

// Palette pairs (top -> bottom gradient) derived from the brand logo colors.
const THEMES = {
  forest: ["#102d18", "#2b5320"], // forest-green -> deep green
  grass: ["#365f17", "#758817"], // grass -> olive
  earth: ["#4c321e", "#75451f"], // soil -> wood brown
  stone: ["#75451f", "#d7cbb5"], // wood -> stone beige
  gold: ["#8a6a2f", "#d7cbb5"], // warm wood -> sand
  dusk: ["#102d18", "#365f17"], // forest -> grass
  sky: ["#183b21", "#526f16"], // deep green -> moss
  lavender: ["#59405d", "#88628d"], // muted lavender floral
};

// Accent colors pulled straight from the logo.
const LAVENDER = "#88628d";
const CREAM = "#f5f1e7";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Build a decorative landscaping-ish SVG placeholder. */
function svg({ w, h, theme = "forest", label = "", sub = "" }) {
  const [c1, c2] = THEMES[theme] || THEMES.forest;
  const fontSize = Math.round(Math.min(w, h) / 14);
  const subSize = Math.round(fontSize * 0.5);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <!-- rolling hills -->
  <path d="M0 ${h * 0.72} Q ${w * 0.25} ${h * 0.6} ${w * 0.5} ${h * 0.7} T ${w} ${h * 0.68} V ${h} H 0 Z" fill="#000" opacity="0.10"/>
  <path d="M0 ${h * 0.82} Q ${w * 0.3} ${h * 0.72} ${w * 0.6} ${h * 0.82} T ${w} ${h * 0.8} V ${h} H 0 Z" fill="url(#ground)"/>
  <!-- sun/moon accent -->
  <circle cx="${w * 0.82}" cy="${h * 0.24}" r="${Math.min(w, h) * 0.07}" fill="${CREAM}" opacity="0.10"/>
  <!-- logo-echo: lavender flower spikes -->
  <g opacity="0.5">
    <rect x="${w * 0.12}" y="${h * 0.62}" width="${w * 0.012}" height="${h * 0.16}" fill="${LAVENDER}" opacity="0.5"/>
    <ellipse cx="${w * 0.126}" cy="${h * 0.6}" rx="${w * 0.018}" ry="${h * 0.05}" fill="${LAVENDER}"/>
    <rect x="${w * 0.16}" y="${h * 0.66}" width="${w * 0.012}" height="${h * 0.12}" fill="${LAVENDER}" opacity="0.5"/>
    <ellipse cx="${w * 0.166}" cy="${h * 0.64}" rx="${w * 0.015}" ry="${h * 0.04}" fill="${LAVENDER}"/>
  </g>
  <!-- logo-echo: cream flower cluster -->
  <g opacity="0.6">
    <circle cx="${w * 0.88}" cy="${h * 0.7}" r="${Math.min(w, h) * 0.014}" fill="${CREAM}"/>
    <circle cx="${w * 0.9}" cy="${h * 0.68}" r="${Math.min(w, h) * 0.012}" fill="${CREAM}"/>
    <circle cx="${w * 0.865}" cy="${h * 0.685}" r="${Math.min(w, h) * 0.011}" fill="${CREAM}"/>
  </g>
  <!-- label -->
  <text x="50%" y="47%" text-anchor="middle" font-family="Georgia, serif" font-size="${fontSize}" fill="#ffffff" opacity="0.96" font-weight="600">${esc(label)}</text>
  ${sub ? `<text x="50%" y="47%" dy="${fontSize * 0.95}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${subSize}" fill="#ffffff" opacity="0.7" letter-spacing="2">${esc(sub.toUpperCase())}</text>` : ""}
  <text x="50%" y="94%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${subSize * 0.85}" fill="#ffffff" opacity="0.55" letter-spacing="3">HERRERA LANDSCAPE • PLACEHOLDER</text>
</svg>`;
}

async function write(path, content) {
  const full = join(OUT, path);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, content, "utf8");
  console.log("wrote", path);
}

const files = [];

// Hero slides
const heroThemes = ["forest", "grass", "sky"];
["Residential Landscape Design", "Outdoor Transformation", "Hardscape & Pavers"].forEach(
  (label, i) =>
    files.push(["hero/hero-" + (i + 1) + ".svg", { w: 1920, h: 1080, theme: heroThemes[i], label, sub: "Sunnyvale, CA" }])
);

// About / owner
files.push(["team/owner.svg", { w: 1000, h: 1200, theme: "earth", label: "Arturo Herrera", sub: "Owner" }]);
files.push(["about/about-1.svg", { w: 1200, h: 900, theme: "forest", label: "Our Crew at Work", sub: "About" }]);
files.push(["about/about-2.svg", { w: 1200, h: 900, theme: "grass", label: "Finished Landscape", sub: "About" }]);

// Services — slug -> theme
const services = [
  ["landscaping", "Landscaping", "grass"],
  ["hardscaping", "Hardscaping", "stone"],
  ["paver-installation", "Paver Installation", "earth"],
  ["fence-installation", "Fence Installation", "earth"],
  ["irrigation-systems", "Irrigation Systems", "sky"],
  ["natural-grass-installation", "Natural Grass", "grass"],
  ["artificial-grass-installation", "Artificial Grass", "grass"],
  ["plants-garden-installation", "Plants & Garden", "forest"],
  ["landscape-maintenance", "Landscape Maintenance", "forest"],
  ["property-cleanup", "Property Cleanup", "stone"],
  ["outdoor-renovations", "Outdoor Renovations", "gold"],
];
services.forEach(([slug, label, theme]) => {
  files.push([`services/${slug}.svg`, { w: 1200, h: 900, theme, label, sub: "Service" }]);
  files.push([`services/${slug}-wide.svg`, { w: 1600, h: 700, theme, label, sub: "Service" }]);
});

// Projects — 12 items across categories
const projects = [
  ["project-01", "Backyard Paver Patio", "earth"],
  ["project-02", "Front Yard Renewal", "grass"],
  ["project-03", "Modern Fence Line", "earth"],
  ["project-04", "Artificial Turf Lawn", "grass"],
  ["project-05", "Drip Irrigation Install", "sky"],
  ["project-06", "Stone Pathway", "stone"],
  ["project-07", "Garden Bed Planting", "forest"],
  ["project-08", "Retaining Wall Build", "stone"],
  ["project-09", "Full Yard Transformation", "dusk"],
  ["project-10", "Commercial Grounds", "forest"],
  ["project-11", "Poolside Hardscape", "gold"],
  ["project-12", "Seasonal Cleanup", "grass"],
];
projects.forEach(([slug, label, theme]) => {
  files.push([`projects/${slug}.svg`, { w: 1200, h: 900, theme, label, sub: "Project" }]);
});

// Before / after pair
files.push(["before-after/before.svg", { w: 1200, h: 800, theme: "stone", label: "Before", sub: "Overgrown Yard" }]);
files.push(["before-after/after.svg", { w: 1200, h: 800, theme: "grass", label: "After", sub: "Herrera Landscape" }]);

// Open Graph
files.push(["og.svg", { w: 1200, h: 630, theme: "forest", label: "Herrera Landscape", sub: "Landscaping & Hardscaping — Sunnyvale, CA" }]);

// Generic fallbacks
files.push(["placeholder.svg", { w: 1200, h: 900, theme: "forest", label: "Herrera Landscape", sub: "Photo Coming Soon" }]);
files.push(["cta-bg.svg", { w: 1920, h: 700, theme: "dusk", label: "", sub: "" }]);

for (const [path, opts] of files) {
  await write(path, svg(opts));
}

console.log(`\nDone. Generated ${files.length} placeholder images in public/images.`);
