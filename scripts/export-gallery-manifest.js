#!/usr/bin/env node

/**
 * Export a gallery manifest for the animations repo.
 *
 * - Scans a source directory (default: ./animations)
 * - Any folder containing at least one .html file is treated as a project
 * - Collects metadata and writes exports/gallery-manifest.json (on --apply)
 * - Always writes a human-readable report to reports/gallery-manifest-report.md
 *
 * CLI:
 *   node scripts/export-gallery-manifest.js --dry-run --source=animations --out=exports/gallery-manifest.json
 *   node scripts/export-gallery-manifest.js --apply   --source=animations --out=exports/gallery-manifest.json
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_SOURCE = "animations";
const DEFAULT_OUT = "exports/gallery-manifest.json";
const REPO_SLUG = "finlin67/GTMStack-Animations";
const REPO_MAIN_BRANCH = "main";

/**
 * Optional mapping from manifest `id` -> GTMStack_pro_production ANIMATION_REGISTRY id.
 * Keep this conservative and extend it as you add/standardize animation ids on the website side.
 *
 * Example:
 *   {
 *     "revenue-systems-data-flow-v2": "rev-ops-mesh-tile",
 *     "martech-ai-dashboard-engine-v2": "mar-tech-tile",
 *   }
 */
const animationIdMap = {
  "revenue-systems-data-flow-v2": "rev-ops-mesh-tile",
  "martech-ai-dashboard-engine-v2": "mar-tech-tile",
};

function parseArgs(argv) {
  const args = {
    dryRun: true,
    apply: false,
    source: DEFAULT_SOURCE,
    out: DEFAULT_OUT,
  };

  for (const raw of argv.slice(2)) {
    if (raw === "--dry-run") {
      args.dryRun = true;
      args.apply = false;
    } else if (raw === "--apply") {
      args.apply = true;
      args.dryRun = false;
    } else if (raw.startsWith("--source=")) {
      args.source = raw.split("=", 2)[1] || DEFAULT_SOURCE;
    } else if (raw.startsWith("--out=")) {
      args.out = raw.split("=", 2)[1] || DEFAULT_OUT;
    } else {
      console.warn(`Unknown argument ignored: ${raw}`);
    }
  }

  if (!args.dryRun && !args.apply) {
    // Default to dry-run when no explicit mode was provided.
    args.dryRun = true;
  }

  return args;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isHiddenOrSystemDir(name) {
  if (!name) return false;
  if (name.startsWith(".")) return true;
  if (name === "node_modules") return true;
  return false;
}

function isInternalSubdirName(name) {
  if (!name) return false;
  const lower = name.toLowerCase();
  return ["components", "src", "lib", "utils", "hooks", "styles", "services", "types"].includes(lower);
}

function listDirSafe(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function safeReadText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function isPlaceholderPreviewHtml(filePath) {
  const source = safeReadText(filePath);
  if (!source) return false;

  return (
    source.includes("Gallery thumbnail placeholder (Option B)") ||
    source.includes("Run and deploy your AI Studio app") ||
    source.includes("This contains everything you need to run your app locally.")
  );
}

function scoreHtmlCandidate(fileName) {
  const lower = fileName.toLowerCase();
  let score = 0;

  if (lower.includes("app-v2")) score += 50;
  if (lower === "app.html") score += 34;
  if (lower.includes("index")) score += 24;
  if (lower.includes("demo")) score += 20;
  if (lower.includes("main")) score += 16;
  if (lower.includes("tile")) score += 10;
  if (lower.includes("preview")) score -= 40;

  return score;
}

function isCanonicalContentDir(dir) {
  const entries = listDirSafe(dir);
  let hasMeta = false;
  let hasComponent = false;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const lower = entry.name.toLowerCase();
    if (lower === "meta.json") hasMeta = true;
    if (lower === "component.tsx") hasComponent = true;
  }

  return hasMeta && hasComponent;
}

function directoryHasProjectSignals(dir) {
  const entries = listDirSafe(dir);
  let hasReadme = false;
  let hasHtml = false;
  let hasTsxOrTs = false;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const lower = entry.name.toLowerCase();
    if (lower === "readme.md") hasReadme = true;
    if (lower.endsWith(".html")) hasHtml = true;
    if (lower.endsWith(".tsx") || lower.endsWith(".ts")) hasTsxOrTs = true;
  }

  return { hasReadme, hasHtml, hasTsxOrTs };
}

function* walkProjectDirs(rootDir) {
  const stack = [rootDir];
  while (stack.length) {
    const dir = stack.pop();
    if (isCanonicalContentDir(dir)) {
      // Canonical wrappers are indexed by the TypeScript content build and should not be emitted
      // as legacy gallery projects.
      continue;
    }

    const entries = listDirSafe(dir);
    const rel = pathRelativePosix(rootDir, dir);
    const depth = rel ? rel.split("/").filter(Boolean).length : 0;

    const { hasReadme, hasHtml, hasTsxOrTs } = directoryHasProjectSignals(dir);

    // Treat as a project if:
    // 1) it has a README (strongest signal), OR
    // 2) it is category/project depth and has HTML/TSX/TS entry files.
    // This avoids pulling in internal folders like */components as standalone projects.
    const looksLikeProject = hasReadme || (depth <= 2 && (hasHtml || hasTsxOrTs));

    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (isHiddenOrSystemDir(entry.name)) continue;
        if (looksLikeProject && isInternalSubdirName(entry.name)) {
          // Don't recurse into common internal implementation folders once a project root is found.
          continue;
        }
        stack.push(full);
      }
    }

    if (looksLikeProject) {
      yield dir;
    }
  }
}

function findEntryFile(projectDir) {
  const entries = listDirSafe(projectDir);
  const htmlCandidates = [];
  let indexTsx = null;
  let appTsx = null;
  let firstTsx = null;
  let firstTs = null;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const lower = entry.name.toLowerCase();
    const full = path.join(projectDir, entry.name);
    if (lower.endsWith(".html")) {
      if (!isPlaceholderPreviewHtml(full)) {
        htmlCandidates.push(full);
      }
      continue;
    }
    if (lower.endsWith(".tsx")) {
      if (lower === "index.tsx") {
        indexTsx = full;
        continue;
      }
      if (lower === "app.tsx") {
        appTsx = full;
        continue;
      }
      if (!firstTsx) firstTsx = full;
      continue;
    }
    if (lower.endsWith(".ts")) {
      if (!firstTs) firstTs = full;
      continue;
    }
  }

  htmlCandidates.sort((a, b) => {
    const scoreDiff = scoreHtmlCandidate(path.basename(b)) - scoreHtmlCandidate(path.basename(a));
    return scoreDiff || a.localeCompare(b);
  });

  const entryAbs = htmlCandidates[0] || indexTsx || appTsx || firstTsx || firstTs;
  if (!entryAbs) {
    return null;
  }
  const lower = entryAbs.toLowerCase();
  let entryType = "unknown";
  if (lower.endsWith(".html")) entryType = "html";
  else if (lower.endsWith(".tsx")) entryType = "tsx";
  else if (lower.endsWith(".ts")) entryType = "ts";

  return { entryAbs, entryType };
}

function findFallbackEntryInSubdirs(projectDir) {
  // Last-resort fallback for projects where entry is nested under src/components.
  const stack = [projectDir];
  const htmlCandidates = [];
  let tsxEntry = null;
  let tsEntry = null;
  while (stack.length) {
    const dir = stack.pop();
    const entries = listDirSafe(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (isHiddenOrSystemDir(entry.name)) continue;
        stack.push(full);
        continue;
      }
      if (!entry.isFile()) continue;
      const lower = entry.name.toLowerCase();
      if (lower.endsWith(".html")) {
        if (!isPlaceholderPreviewHtml(full)) {
          htmlCandidates.push(full);
        }
        continue;
      }
      if (!tsxEntry && (lower === "index.tsx" || lower === "app.tsx" || lower.endsWith(".tsx"))) {
        tsxEntry = full;
        continue;
      }
      if (!tsEntry && lower.endsWith(".ts")) {
        tsEntry = full;
      }
    }
  }

  htmlCandidates.sort((a, b) => {
    const scoreDiff = scoreHtmlCandidate(path.basename(b)) - scoreHtmlCandidate(path.basename(a));
    return scoreDiff || a.localeCompare(b);
  });

  if (htmlCandidates.length) return { entryAbs: htmlCandidates[0], entryType: "html" };
  if (tsxEntry) return { entryAbs: tsxEntry, entryType: "tsx" };
  if (tsEntry) return { entryAbs: tsEntry, entryType: "ts" };
  return null;
}

function findMetaFile(projectDir) {
  const metaPath = path.join(projectDir, "meta.json");
  if (!fs.existsSync(metaPath)) return null;
  return metaPath;
}

function readMeta(projectDir) {
  const metaPath = findMetaFile(projectDir);
  if (!metaPath) return null;

  try {
    return JSON.parse(fs.readFileSync(metaPath, "utf8"));
  } catch {
    return null;
  }
}

function findReadme(projectDir) {
  const entries = listDirSafe(projectDir);
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const lower = entry.name.toLowerCase();
    if (lower === "readme.md") {
      return path.join(projectDir, entry.name);
    }
  }
  return null;
}

function kebabToTitle(str) {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function stripMarkdownToPlain(text) {
  // Very light markdown stripping just for short excerpts.
  let t = text.replace(/`+/g, "");
  t = t.replace(/\[(.*?)\]\((.*?)\)/g, "$1"); // [text](url) -> text
  t = t.replace(/[*_]+/g, "");
  t = t.replace(/^#+\s*/gm, "");
  return t.trim();
}

function parseReadmeMeta(readmePath) {
  try {
    const raw = fs.readFileSync(readmePath, "utf8");
    const lines = raw.split(/\r?\n/);
    let title = null;
    let summary = null;
    let i = 0;

    // Find first heading "# ..."
    for (; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith("# ")) {
        title = stripMarkdownToPlain(line.replace(/^#\s*/, ""));
        i++;
        break;
      }
    }

    // Find first non-empty paragraph after heading
    let paragraphLines = [];
    let collecting = false;
    for (; i < lines.length; i++) {
      const line = lines[i];
      if (!collecting && line.trim() === "") {
        continue;
      }
      if (!collecting && line.trim() !== "") {
        collecting = true;
      }
      if (collecting) {
        if (line.trim() === "") break;
        paragraphLines.push(line);
      }
    }

    if (paragraphLines.length) {
      const para = stripMarkdownToPlain(paragraphLines.join(" "));
      summary = para.slice(0, 240);
    }

    return { title, summary };
  } catch {
    return { title: null, summary: null };
  }
}

function buildIdAndSlug(category, projectDirRel, usedIds, idConflictNotes) {
  const baseName = path.basename(projectDirRel);
  let id = baseName;

  const addId = (candidate) => {
    if (!usedIds.has(candidate)) {
      usedIds.add(candidate);
      return candidate;
    }
    return null;
  };

  // Try base
  if (!addId(id)) {
    const prefixed = `${category}-${baseName}`;
    if (!addId(prefixed)) {
      let n = 2;
      let candidate = `${prefixed}-${n}`;
      while (usedIds.has(candidate)) {
        n += 1;
        candidate = `${prefixed}-${n}`;
      }
      usedIds.add(candidate);
      idConflictNotes.push(
        `Duplicate id for base \`${baseName}\`; using \`${candidate}\` (category-prefixed, with numeric suffix).`
      );
      id = candidate;
    } else {
      idConflictNotes.push(
        `Duplicate id for base \`${baseName}\`; using category-prefixed id \`${prefixed}\`.`
      );
      id = prefixed;
    }
  }

  return { id, slug: id };
}

function inferTags(category, titleOrSlug) {
  const tags = new Set();
  tags.add(category);

  if (titleOrSlug) {
    const base = titleOrSlug.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
    const parts = base.split(/[\s-]+/).filter(Boolean);
    for (const p of parts) {
      if (p.length < 3) continue;
      if (["the", "and", "for", "with", "tile", "hero", "dashboard"].includes(p)) continue;
      tags.add(p);
      if (tags.size >= 8) break;
    }
  }

  return Array.from(tags);
}

function pathRelativePosix(rootDir, targetPath) {
  return path.relative(rootDir, targetPath).replace(/\\/g, "/");
}

function buildGithubUrl(projectPathRel) {
  return `https://github.com/${REPO_SLUG}/tree/${REPO_MAIN_BRANCH}/${projectPathRel}`;
}

function buildGithubReadmeUrl(readmePathRel) {
  return `https://github.com/${REPO_SLUG}/blob/${REPO_MAIN_BRANCH}/${readmePathRel}`;

}

function findThumbnailPaths(rootDir, projectRel) {
  const projectDir = path.join(rootDir, projectRel);
  const previewLocal = path.join(projectDir, "preview.png");
  let previewRel = null;
  if (fs.existsSync(previewLocal)) {
    previewRel = pathRelativePosix(rootDir, previewLocal);
  }

  const centralDir = path.join(rootDir, "assets", "thumbnails");
  let centralRel = null;
  if (fs.existsSync(centralDir) && fs.statSync(centralDir).isDirectory()) {
    const safe = projectRel.replace(/\\/g, "/").replace(/[\\/]/g, "__");
    const centralCandidate = path.join(centralDir, `${safe}.png`);
    if (fs.existsSync(centralCandidate)) {
      centralRel = pathRelativePosix(rootDir, centralCandidate);
    }
  }

  return { previewRel, centralRel };
}

function buildReport(rootDir, projects, stats, idConflictNotes) {
  const lines = [];
  lines.push("# Gallery Manifest Report");
  lines.push("");
  lines.push(`- **Root**: \`${rootDir}\``);
  lines.push(`- **Source**: \`${stats.sourceDirRel}\``);
  lines.push(`- **Out path**: \`${stats.outPathRel}\``);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Projects found: ${projects.length}`);
  lines.push(`- Exported: ${projects.length}`);
  lines.push(`- Missing README: ${stats.missingReadme}`);
  lines.push(`- Missing thumbnail (no preview/central): ${stats.missingThumbnail}`);
  lines.push(`- ID conflicts resolved: ${idConflictNotes.length}`);
  lines.push("");

  lines.push("## ID conflict notes");
  lines.push("");
  if (!idConflictNotes.length) {
    lines.push("_(none)_");
  } else {
    for (const note of idConflictNotes) {
      lines.push(`- ${note}`);
    }
  }
  lines.push("");

  lines.push("## Skipped paths");
  lines.push("");
  if (!stats.skipped.length) {
    lines.push("_(none)_");
  } else {
    for (const s of stats.skipped) {
      lines.push(`- \`${s.path}\` — ${s.reason}`);
    }
  }
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  const rootDir = process.cwd();
  const sourceDir = path.resolve(rootDir, args.source);
  const outPath = path.resolve(rootDir, args.out);
  const outDir = path.dirname(outPath);

  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    console.error(`Source directory does not exist or is not a directory: ${sourceDir}`);
    process.exitCode = 1;
    return;
  }

  const modeLabel = args.dryRun ? "DRY RUN (no files written)" : "APPLY (manifest written)";

  console.log("Gallery manifest exporter");
  console.log(`- Mode: ${modeLabel}`);
  console.log(`- Source: ${pathRelativePosix(rootDir, sourceDir) || "."}`);
  console.log(`- Out: ${pathRelativePosix(rootDir, outPath)}`);
  console.log("");

  const projects = [];
  const usedIds = new Set();
  const idConflictNotes = [];
  const stats = {
    sourceDirRel: pathRelativePosix(rootDir, sourceDir),
    outPathRel: pathRelativePosix(rootDir, outPath),
    missingReadme: 0,
    missingThumbnail: 0,
    skipped: [],
  };

  for (const projectDir of walkProjectDirs(sourceDir)) {
    const relProject = pathRelativePosix(rootDir, projectDir);
    const relFromAnimations = pathRelativePosix(sourceDir, projectDir);
    const segments = relFromAnimations.split("/");
    if (segments.length < 1 || !segments[0]) {
      stats.skipped.push({ path: relProject, reason: "Could not determine category" });
      continue;
    }
    const category = segments[0];

    const meta = readMeta(projectDir);

    let entry = findEntryFile(projectDir);
    if (!entry) {
      entry = findFallbackEntryInSubdirs(projectDir);
    }
    if (!entry) {
      stats.skipped.push({ path: relProject, reason: "No entry file found (.html/.tsx/.ts)" });
      continue;
    }
    const entryHtmlRel = entry.entryType === "html"
      ? pathRelativePosix(rootDir, entry.entryAbs)
      : "";

    const readmeAbs = findReadme(projectDir);
    let readmeRel = null;
    let title = null;
    let summary = null;

    if (readmeAbs) {
      readmeRel = pathRelativePosix(rootDir, readmeAbs);
      const meta = parseReadmeMeta(readmeAbs);
      title = meta.title || null;
      summary = meta.summary || null;
    } else {
      stats.missingReadme += 1;
    }

    if (!title) {
      title = kebabToTitle(path.basename(projectDir));
    }

    const { previewRel, centralRel } = findThumbnailPaths(rootDir, relProject);
    let thumbnailPath = null;
    if (meta && typeof meta.thumbnail === "string" && meta.thumbnail.length > 0 && fs.existsSync(path.join(rootDir, meta.thumbnail))) {
      thumbnailPath = meta.thumbnail.replace(/\\/g, "/");
    } else {
      thumbnailPath = previewRel || centralRel || null;
    }
    if (!thumbnailPath) {
      stats.missingThumbnail += 1;
    }

    const { id, slug } = buildIdAndSlug(category, relProject, usedIds, idConflictNotes);

    const tags = inferTags(category, title || slug);
    const githubUrl = buildGithubUrl(relProject);
    const githubReadmeUrl = readmeRel ? buildGithubReadmeUrl(readmeRel) : null;

    const project = {
      id,
      slug,
      animationId: animationIdMap[id] ?? undefined,
      title: meta && typeof meta.title === "string" && meta.title.trim() ? meta.title.trim() : title,
      category,
      projectPath: relProject,
      entryHtml: entryHtmlRel,
      entryType: entry.entryType,
      readmePath: readmeRel,
      summary: meta && typeof meta.description === "string" && meta.description.trim() ? meta.description.trim() : summary,
      tags: Array.isArray(meta && meta.tags) && meta.tags.length ? meta.tags : tags,
      thumbnailPath,
      githubUrl,
      githubReadmeUrl,
      updatedAt: meta && typeof meta.updatedAt === "string" && meta.updatedAt.trim()
        ? meta.updatedAt
        : new Date().toISOString(),
    };

    projects.push(project);
  }

  // Validation: ensure ids unique (guard in case of logic error)
  const idCounts = projects.reduce((acc, p) => {
    acc[p.id] = (acc[p.id] || 0) + 1;
    return acc;
  }, {});
  const dupIds = Object.entries(idCounts)
    .filter(([, count]) => count > 1)
    .map(([id]) => id);
  if (dupIds.length) {
    console.warn("WARNING: duplicate ids detected even after conflict resolution:", dupIds);
  }

  if (args.dryRun) {
    console.log(`Found ${projects.length} projects that would be exported.`);
    console.log("");
    const sample = projects.slice(0, 10);
    if (sample.length) {
      console.log("Sample records:");
      console.log(JSON.stringify(sample, null, 2));
    } else {
      console.log("No projects detected.");
    }
  } else {
    ensureDir(outDir);
    fs.writeFileSync(outPath, JSON.stringify(projects, null, 2), "utf8");
    console.log("");
    console.log(`Manifest written to: ${pathRelativePosix(rootDir, outPath)}`);
    console.log(`Total projects: ${projects.length}`);
  }

  // Write report (always)
  const reportsDir = path.join(rootDir, "reports");
  ensureDir(reportsDir);
  const reportPath = path.join(reportsDir, "gallery-manifest-report.md");
  const report = buildReport(rootDir, projects, stats, idConflictNotes);
  fs.writeFileSync(reportPath, report, "utf8");

  console.log("");
  console.log(`Report written to: ${pathRelativePosix(rootDir, reportPath)}`);
}

main().catch((err) => {
  console.error("Fatal error in gallery manifest exporter:", err);
  process.exitCode = 1;
});
