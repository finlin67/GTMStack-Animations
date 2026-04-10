#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const META_FILE = "meta.json";
const VALID_COMPONENT_EXT = new Set([".tsx", ".html"]);

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function findMetaFiles(animationsRoot) {
  const metas = [];
  for (const top of safeReadDir(animationsRoot)) {
    if (!top.isDirectory() || top.name.startsWith(".")) continue;
    const topDir = path.join(animationsRoot, top.name);
    const directMeta = path.join(topDir, META_FILE);
    if (fs.existsSync(directMeta)) {
      metas.push(directMeta);
      continue;
    }
    for (const sub of safeReadDir(topDir)) {
      if (!sub.isDirectory() || sub.name.startsWith(".")) continue;
      const nestedMeta = path.join(topDir, sub.name, META_FILE);
      if (fs.existsSync(nestedMeta)) metas.push(nestedMeta);
    }
  }
  return metas;
}

function hasComponentCandidateRecursively(dir) {
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of safeReadDir(current)) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith(".")) stack.push(full);
        continue;
      }
      if (!entry.isFile()) continue;
      if (VALID_COMPONENT_EXT.has(path.extname(entry.name).toLowerCase())) {
        return true;
      }
    }
  }
  return false;
}

function toPosix(filePath) {
  return filePath.replace(/\\/g, "/");
}

function main() {
  const repoRoot = process.cwd();
  const animationsRoot = path.join(repoRoot, "animations");
  const metaFiles = findMetaFiles(animationsRoot);

  const unusable = [];
  for (const metaPath of metaFiles) {
    const unitDir = path.dirname(metaPath);
    if (!hasComponentCandidateRecursively(unitDir)) {
      unusable.push({
        id: path.basename(unitDir),
        dir: toPosix(path.relative(repoRoot, unitDir)),
      });
    }
  }

  if (unusable.length > 0) {
    console.error("Found animation folders with no .tsx/.html files:");
    for (const row of unusable) {
      console.error(`- ${row.id} (${row.dir})`);
    }
    console.error(`\nTotal unusable folders: ${unusable.length}`);
    process.exit(1);
  }

  console.log(`OK: all ${metaFiles.length} animation folders have at least one .tsx/.html candidate.`);
}

main();
