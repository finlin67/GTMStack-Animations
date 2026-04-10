#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const META_FILE = "meta.json";
const VALID_COMPONENT_EXT = new Set([".tsx", ".html"]);

function parseArgs(argv) {
  const args = {
    dryRun: true,
    apply: false,
    target: "animations/_missing",
    report: "reports/move-missing-report.md",
  };

  for (const raw of argv.slice(2)) {
    if (raw === "--dry-run") {
      args.dryRun = true;
      args.apply = false;
    } else if (raw === "--apply") {
      args.apply = true;
      args.dryRun = false;
    } else if (raw.startsWith("--target=")) {
      args.target = raw.split("=", 2)[1] || args.target;
    } else if (raw.startsWith("--report=")) {
      args.report = raw.split("=", 2)[1] || args.report;
    } else {
      console.warn(`Unknown argument ignored: ${raw}`);
    }
  }

  return args;
}

function safeReadDir(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function toPosix(filePath) {
  return filePath.replace(/\\/g, "/");
}

function findMetaFiles(animationsRoot) {
  const metas = [];
  for (const top of safeReadDir(animationsRoot)) {
    if (!top.isDirectory() || top.name.startsWith(".")) continue;
    if (top.name === "_missing") continue;

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

function buildUniqueDestination(rootDestDir, sourceDir) {
  const baseName = path.basename(sourceDir);
  let candidate = path.join(rootDestDir, baseName);
  if (!fs.existsSync(candidate)) return candidate;

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  candidate = path.join(rootDestDir, `${baseName}__${stamp}`);
  let n = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(rootDestDir, `${baseName}__${stamp}__${n}`);
    n += 1;
  }
  return candidate;
}

function buildReport(reportData) {
  const lines = [];
  lines.push("# Move Missing Assets Report");
  lines.push("");
  lines.push(`- Mode: ${reportData.applied ? "APPLY" : "DRY RUN"}`);
  lines.push(`- Timestamp: ${new Date().toISOString()}`);
  lines.push(`- Target folder: \`${reportData.targetRel}\``);
  lines.push(`- Total flagged: ${reportData.flagged.length}`);
  lines.push(`- Total moved: ${reportData.moved.length}`);
  lines.push("");

  lines.push("## Flagged folders");
  lines.push("");
  if (!reportData.flagged.length) {
    lines.push("_(none)_");
  } else {
    for (const item of reportData.flagged) {
      lines.push(`- \`${item.sourceRel}\``);
    }
  }
  lines.push("");

  lines.push("## Move actions");
  lines.push("");
  if (!reportData.moved.length) {
    lines.push("_(none)_");
  } else {
    for (const item of reportData.moved) {
      lines.push(`- \`${item.sourceRel}\` -> \`${item.destRel}\``);
    }
  }
  lines.push("");

  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv);
  const repoRoot = process.cwd();
  const animationsRoot = path.join(repoRoot, "animations");
  const targetAbs = path.resolve(repoRoot, args.target);
  const reportAbs = path.resolve(repoRoot, args.report);
  const reportDir = path.dirname(reportAbs);

  const metaFiles = findMetaFiles(animationsRoot);
  const flagged = [];
  const moved = [];

  for (const metaPath of metaFiles) {
    const unitDir = path.dirname(metaPath);
    if (!hasComponentCandidateRecursively(unitDir)) {
      flagged.push(unitDir);
    }
  }

  if (args.apply && flagged.length > 0) {
    ensureDir(targetAbs);
    for (const sourceDir of flagged) {
      const destDir = buildUniqueDestination(targetAbs, sourceDir);
      fs.renameSync(sourceDir, destDir);
      moved.push({ sourceDir, destDir });
      console.log(`Moved: ${toPosix(path.relative(repoRoot, sourceDir))} -> ${toPosix(path.relative(repoRoot, destDir))}`);
    }
  }

  const reportData = {
    applied: args.apply,
    targetRel: toPosix(path.relative(repoRoot, targetAbs)),
    flagged: flagged.map((dir) => ({ sourceRel: toPosix(path.relative(repoRoot, dir)) })),
    moved: moved.map((m) => ({
      sourceRel: toPosix(path.relative(repoRoot, m.sourceDir)),
      destRel: toPosix(path.relative(repoRoot, m.destDir)),
    })),
  };

  ensureDir(reportDir);
  fs.writeFileSync(reportAbs, buildReport(reportData), "utf8");

  console.log(`Flagged folders: ${flagged.length}`);
  if (!args.apply) {
    console.log("Dry run only; no folders moved.");
  } else {
    console.log(`Moved folders: ${moved.length}`);
  }
  console.log(`Report written: ${toPosix(path.relative(repoRoot, reportAbs))}`);
}

main();
