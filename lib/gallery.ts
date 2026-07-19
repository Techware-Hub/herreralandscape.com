import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Server-only gallery utility.
 *
 * Scans `public/assets/images/gallery` at BUILD time and returns every image it
 * finds, so new photos appear on the site simply by dropping them into that
 * folder — no filenames are hardcoded.
 *
 * Notes:
 * - This module uses `node:fs` and `sharp` and must never be imported into a
 *   Client Component. The /gallery page is statically prerendered
 *   (`force-static`), so the filesystem is read during the build and never at
 *   request time. That keeps it working on Netlify, where serverless functions
 *   do not have access to the `public/` directory at runtime.
 * - Filenames containing spaces, parentheses, or other unsafe characters are
 *   URL-encoded so they resolve correctly.
 */

const GALLERY_DIR = path.join(process.cwd(), "public", "assets", "images", "gallery");
const PUBLIC_PREFIX = "/assets/images/gallery";
const FALLBACK_BANNER = "/assets/images/backgrounds/garden-path-banner.webp";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export interface GalleryImage {
  /** URL-safe public path, e.g. /assets/images/gallery/image%20(1).png */
  src: string;
  /** Accessible label. Filenames are intentionally never shown in the UI. */
  alt: string;
  /** Intrinsic dimensions, when they could be read at build time. */
  width?: number;
  height?: number;
}

/** Reads the gallery folder and returns the image filenames, naturally sorted. */
function readGalleryFileNames(): string[] {
  try {
    return fs
      .readdirSync(GALLERY_DIR, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() &&
          !entry.name.startsWith(".") &&
          ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())
      )
      .map((entry) => entry.name)
      // Natural sort: "image (2).png" before "image (10).png".
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    // Folder does not exist yet — the UI renders a friendly empty state.
    return [];
  }
}

/**
 * Returns all gallery images. Returns an empty array if the folder is missing
 * or contains no supported images.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const fileNames = readGalleryFileNames();

  return Promise.all(
    fileNames.map(async (name, index) => {
      let width: number | undefined;
      let height: number | undefined;

      try {
        const metadata = await sharp(path.join(GALLERY_DIR, name)).metadata();
        width = metadata.width;
        height = metadata.height;
      } catch {
        // Dimensions are optional — the UI uses `fill`, so this is non-fatal.
      }

      return {
        // encodeURIComponent handles spaces (%20); the path separator stays intact.
        src: `${PUBLIC_PREFIX}/${encodeURIComponent(name)}`,
        alt: `Herrera Landscape completed landscaping project, photo ${index + 1} of ${fileNames.length}`,
        width,
        height,
      };
    })
  );
}

/**
 * Picks the best photo for the wide page banner: the most landscape-oriented
 * image, so it crops cleanly in a wide strip. Falls back to a brand background
 * when the gallery is empty.
 */
export function getGalleryBanner(images: GalleryImage[]): string {
  if (images.length === 0) return FALLBACK_BANNER;

  const widest = images.reduce((best, image) => {
    const ratio = image.width && image.height ? image.width / image.height : 0;
    const bestRatio = best.width && best.height ? best.width / best.height : 0;
    return ratio > bestRatio ? image : best;
  }, images[0]);

  return widest.src;
}
