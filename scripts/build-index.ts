import fs from "node:fs";
import path from "node:path";

import type { AnimationMeta } from "./content-types";
import { loadAndValidateAnimationMeta } from "./content-lib";

function byUpdatedAtDesc(left: AnimationMeta, right: AnimationMeta): number {
  const leftTime = new Date(left.updatedAt).getTime();
  const rightTime = new Date(right.updatedAt).getTime();
  if (leftTime !== rightTime) {
    return rightTime - leftTime;
  }
  return left.id.localeCompare(right.id);
}

function parseArgs(argv: string[]): { includeUnpublished: boolean } {
  return {
    includeUnpublished: argv.includes("--include-unpublished"),
  };
}

function createIndexPayload(items: AnimationMeta[]): { items: AnimationMeta[] } {
  return { items };
}

function main(): void {
  const { includeUnpublished } = parseArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  const distPath = path.join(repoRoot, "dist", "animations.index.json");

  const { metas, issues } = loadAndValidateAnimationMeta(repoRoot);
  if (issues.length > 0) {
    console.error("Index build aborted because metadata validation failed:\n");
    for (const issue of issues) {
      console.error(`- ${issue.filePath}`);
      for (const message of issue.messages) {
        console.error(`  - ${message}`);
      }
    }
    process.exit(1);
  }

  const filtered = includeUnpublished ? metas : metas.filter((meta) => meta.published);
  const sorted = [...filtered].sort(byUpdatedAtDesc);
  const payload = createIndexPayload(sorted);

  fs.mkdirSync(path.dirname(distPath), { recursive: true });
  fs.writeFileSync(distPath, JSON.stringify(payload, null, 2) + "\n", "utf8");

  console.log(`Wrote ${sorted.length} animation entries to dist/animations.index.json.`);
  if (!includeUnpublished) {
    console.log("Mode: published-only (default). Use --include-unpublished to include draft entries.");
  }
}

main();