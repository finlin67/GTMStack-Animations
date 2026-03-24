/**
 * scaffold-meta.ts
 *
 * One-shot script: generates a stub meta.json for every animation directory
 * that does not already have one.
 *
 * Usage:
 *   tsx scripts/scaffold-meta.ts            # write files
 *   tsx scripts/scaffold-meta.ts --dry-run  # preview only
 *
 * The script handles both flat (animations/<slug>/) and nested
 * (animations/<category>/<slug>/) structures.
 * Slug conflicts (same id already registered) are skipped with a warning.
 */

import fs from "node:fs";
import path from "node:path";

const REPO_ROOT = process.cwd();
const ANIMATIONS_ROOT = path.join(REPO_ROOT, "animations");
const NOW = "2026-03-23T20:00:00.000Z";

/** Parent-folder → AnimationCategory enum value */
const FOLDER_CATEGORY_MAP: Record<string, string> = {
  abm: "card",
  "dashboard-tiles": "card",
  "digital-demand": "hero",
  "events-media": "card",
  industries: "other",
  misc: "other",
  operations: "card",
};

function slugToTitle(slug: string): string {
  return slug
    .replace(/-v\d+$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function inferCategory(slug: string, parentFolder: string): string {
  const lower = slug.toLowerCase();
  if (lower.includes("hero")) return "hero";
  if (lower.includes("background")) return "background";
  if (lower.includes("loader") || lower.includes("loading")) return "loader";
  if (/\bnav\b/.test(lower)) return "nav";
  if (lower.includes("button")) return "button";
  if (lower.includes("text-animi") || lower.includes("typewriter")) return "text";
  return FOLDER_CATEGORY_MAP[parentFolder] ?? "other";
}

function findThumbnail(dir: string, relBase: string): string | null {
  for (const name of [
    "preview.png",
    "preview.jpg",
    "thumbnail.png",
    "thumbnail.jpg",
    "thumbnail.webp",
  ]) {
    if (fs.existsSync(path.join(dir, name))) {
      return `${relBase}/${name}`;
    }
  }
  try {
    const pngs = fs.readdirSync(dir).filter((f) => f.endsWith(".png"));
    if (pngs.length > 0) return `${relBase}/${pngs[0]}`;
  } catch {
    // ignore
  }
  return null;
}

function findComponentPath(dir: string, relBase: string): string | null {
  // 1. Root-level .tsx files (first alphabetically)
  try {
    const rootTsx = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .sort();
    if (rootTsx.length > 0) return `${relBase}/${rootTsx[0]}`;
  } catch {
    // ignore
  }

  // 2. components/*.tsx (first alphabetically)
  const compDir = path.join(dir, "components");
  if (fs.existsSync(compDir)) {
    try {
      const compTsx = fs
        .readdirSync(compDir)
        .filter((f) => f.endsWith(".tsx"))
        .sort();
      if (compTsx.length > 0) return `${relBase}/components/${compTsx[0]}`;
    } catch {
      // ignore
    }
  }

  // 3. app-v2.html fallback
  if (fs.existsSync(path.join(dir, "app-v2.html"))) {
    return `${relBase}/app-v2.html`;
  }

  return null;
}

function safeReadDirNames(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function isDirectory(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function generateTags(slug: string, parentFolder: string): string[] {
  const baseSlug = slug.replace(/-v\d+$/, "");
  const words = baseSlug.split("-").filter((w) => w.length > 2);
  const tagSet = new Set<string>([parentFolder, ...words]);
  return Array.from(tagSet);
}

function main(): void {
  const isDryRun = process.argv.includes("--dry-run");

  if (isDryRun) {
    console.log("DRY RUN — no files will be written.\n");
  }

  // Collect IDs that already have meta.json (flat + nested)
  const existingIds = new Set<string>();

  for (const entry of safeReadDirNames(ANIMATIONS_ROOT)) {
    if (entry.startsWith(".")) continue;
    const topDir = path.join(ANIMATIONS_ROOT, entry);
    if (!isDirectory(topDir)) continue;

    // Flat: animations/<slug>/meta.json
    if (fs.existsSync(path.join(topDir, "meta.json"))) {
      existingIds.add(entry);
      continue;
    }

    // Nested: animations/<category>/<slug>/meta.json
    for (const sub of safeReadDirNames(topDir)) {
      if (sub.startsWith(".")) continue;
      const subDir = path.join(topDir, sub);
      if (!isDirectory(subDir)) continue;
      if (fs.existsSync(path.join(subDir, "meta.json"))) {
        existingIds.add(sub);
      }
    }
  }

  let created = 0;
  let skipped = 0;

  // Walk each category folder and scaffold missing meta.json files
  for (const catEntry of safeReadDirNames(ANIMATIONS_ROOT).sort()) {
    if (catEntry.startsWith(".")) continue;
    const catDir = path.join(ANIMATIONS_ROOT, catEntry);
    if (!isDirectory(catDir)) continue;

    // Skip flat animation dirs (handled separately / already exist)
    if (fs.existsSync(path.join(catDir, "meta.json"))) continue;

    const slugEntries = safeReadDirNames(catDir)
      .filter((e) => !e.startsWith(".") && isDirectory(path.join(catDir, e)))
      .sort();

    if (slugEntries.length === 0) continue;

    for (const slugEntry of slugEntries) {
      const animDir = path.join(catDir, slugEntry);
      const metaPath = path.join(animDir, "meta.json");

      // Already has meta.json
      if (fs.existsSync(metaPath)) {
        skipped++;
        continue;
      }

      // Slug conflict — same id already registered by flat or earlier nested entry
      if (existingIds.has(slugEntry)) {
        console.warn(`SKIP (duplicate id: ${slugEntry})  ${catEntry}/${slugEntry}`);
        skipped++;
        continue;
      }

      const relBase = `animations/${catEntry}/${slugEntry}`;
      const thumbnail = findThumbnail(animDir, relBase);
      const componentPath = findComponentPath(animDir, relBase);

      if (!thumbnail) {
        console.warn(`SKIP (no thumbnail)  ${catEntry}/${slugEntry}`);
        skipped++;
        continue;
      }

      if (!componentPath) {
        console.warn(`SKIP (no component)  ${catEntry}/${slugEntry}`);
        skipped++;
        continue;
      }

      const title = slugToTitle(slugEntry);
      const category = inferCategory(slugEntry, catEntry);
      const tags = generateTags(slugEntry, catEntry);

      const meta = {
        id: slugEntry,
        title,
        description: `${title} — GTMStack animation for ${catEntry.replace(/-/g, " ")} use cases.`,
        tags,
        category,
        published: true,
        featured: false,
        createdAt: NOW,
        updatedAt: NOW,
        thumbnail,
        componentPath,
      };

      if (isDryRun) {
        console.log(`WOULD CREATE  ${relBase}/meta.json`);
      } else {
        fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
        console.log(`CREATED  ${relBase}/meta.json`);
        created++;
      }

      // Register so cross-category duplicates are caught
      existingIds.add(slugEntry);
    }
  }

  console.log(
    isDryRun
      ? `\nDry run complete. Would create: ~${
          Object.keys(
            Object.fromEntries(Array.from({ length: created }, (_, i) => [i, i]))
          ).length
        }, Skipped: ${skipped}`
      : `\nDone. Created: ${created}, Skipped: ${skipped}`
  );
}

main();
