#!/usr/bin/env node

/**
 * Option B: create a static gallery-thumbnail HTML shell (preview.html) for projects
 * that have no .html entry yet (common for TSX-only folders).
 *
 * Uses exports/gallery-manifest.json for title + summary (run manifest:gen first).
 *
 * CLI:
 *   node scripts/scaffold-preview-html.js --dry-run
 *   node scripts/scaffold-preview-html.js --apply
 *   node scripts/scaffold-preview-html.js --apply --force
 *   node scripts/scaffold-preview-html.js --apply --manifest=exports/gallery-manifest.json
 *
 * Notes:
 * - generate-thumbnails.js only visits directories that contain at least one .html;
 *   adding preview.html makes TSX-only projects eligible for screenshots.
 * - Thumbnails prefer index.html if present; otherwise the first .html (often preview.html).
 */

const fs = require("fs");
const path = require("path");

const DEFAULT_MANIFEST = "exports/gallery-manifest.json";

function parseArgs(argv) {
  const args = {
    dryRun: true,
    apply: false,
    manifest: DEFAULT_MANIFEST,
    force: false,
  };

  for (const raw of argv.slice(2)) {
    if (raw === "--dry-run") {
      args.dryRun = true;
      args.apply = false;
    } else if (raw === "--apply") {
      args.apply = true;
      args.dryRun = false;
    } else if (raw === "--force") {
      args.force = true;
    } else if (raw.startsWith("--manifest=")) {
      args.manifest = raw.split("=", 2)[1] || DEFAULT_MANIFEST;
    } else {
      console.warn(`Unknown argument ignored: ${raw}`);
    }
  }

  if (!args.dryRun && !args.apply) {
    args.dryRun = true;
  }

  return args;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function listFilesInProjectDir(projectDir) {
  try {
    return fs.readdirSync(projectDir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function projectDirHasHtml(projectDir) {
  for (const entry of listFilesInProjectDir(projectDir)) {
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      return true;
    }
  }
  return false;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(text, maxLen) {
  const t = String(text || "").trim().replace(/\s+/g, " ");
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen - 1).trimEnd() + "…";
}

function buildPreviewHtml({ title, summary, category, id }) {
  const safeTitle = escapeHtml(title || id || "Animation");
  const safeSummary = escapeHtml(truncate(summary || "", 280));
  const safeCategory = escapeHtml(category || "animation");
  const safeId = escapeHtml(id || "");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
  <!-- Gallery thumbnail placeholder (Option B). Safe to replace with a real HTML preview later. -->
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
      background: radial-gradient(1200px 600px at 20% 0%, #1e3a5f 0%, transparent 55%),
                  radial-gradient(900px 500px at 100% 30%, #312e81 0%, transparent 50%),
                  #0f172a;
      color: #e2e8f0;
    }
    .card {
      width: min(920px, calc(100vw - 48px));
      padding: 40px 44px;
      border-radius: 16px;
      background: rgba(30, 41, 59, 0.92);
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
    }
    .badge {
      display: inline-block;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #94a3b8;
      margin-bottom: 14px;
    }
    h1 {
      margin: 0 0 16px;
      font-size: clamp(26px, 4vw, 36px);
      font-weight: 700;
      line-height: 1.15;
      color: #f8fafc;
    }
    p {
      margin: 0;
      font-size: 17px;
      line-height: 1.55;
      color: #cbd5e1;
    }
    .meta {
      margin-top: 22px;
      font-size: 12px;
      color: #64748b;
      word-break: break-all;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">${safeCategory}</div>
    <h1>${safeTitle}</h1>
    <p>${safeSummary || "Marketing animation preview."}</p>
    <div class="meta">${safeId}</div>
  </div>
</body>
</html>
`;
}

function main() {
  const args = parseArgs(process.argv);
  const rootDir = process.cwd();
  const manifestPath = path.resolve(rootDir, args.manifest);

  const modeLabel = args.dryRun ? "DRY RUN (no files written)" : "APPLY (writes preview.html)";
  console.log("Scaffold preview.html (Option B – static gallery thumbnails)");
  console.log(`- Mode: ${modeLabel}`);
  console.log(`- Manifest: ${path.relative(rootDir, manifestPath) || manifestPath}`);
  console.log(`- Force: ${args.force}`);
  console.log("");

  if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found: ${manifestPath}`);
    console.error("Run: npm run manifest:gen");
    process.exitCode = 1;
    return;
  }

  let items;
  try {
    items = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (e) {
    console.error("Failed to read manifest JSON:", e.message || e);
    process.exitCode = 1;
    return;
  }

  if (!Array.isArray(items)) {
    console.error("Manifest must be a JSON array.");
    process.exitCode = 1;
    return;
  }

  const results = [];
  for (const item of items) {
    const id = item.id || item.slug || "";
    const projectPath = item.projectPath || "";
    if (!projectPath) {
      results.push({ status: "skipped", id, reason: "Missing projectPath" });
      continue;
    }

    const projectDir = path.resolve(rootDir, ...projectPath.split("/"));
    if (!fs.existsSync(projectDir) || !fs.statSync(projectDir).isDirectory()) {
      results.push({ status: "skipped", id, reason: `Not a directory: ${projectPath}` });
      continue;
    }

    const hasHtml = projectDirHasHtml(projectDir);
    if (hasHtml && !args.force) {
      results.push({
        status: "skipped",
        id,
        projectPath,
        reason: "Folder already has a .html file (use --force to write preview.html anyway)",
      });
      continue;
    }

    const outPath = path.join(projectDir, "preview.html");
    const html = buildPreviewHtml({
      title: item.title,
      summary: item.summary,
      category: item.category,
      id,
    });

    const existedBefore = fs.existsSync(outPath);

    if (args.dryRun) {
      results.push({
        status: "dry-run",
        id,
        projectPath,
        out: path.relative(rootDir, outPath).replace(/\\/g, "/"),
        wouldOverwrite: existedBefore,
      });
      continue;
    }

    fs.writeFileSync(outPath, html, "utf8");
    results.push({
      status: "written",
      id,
      projectPath,
      out: path.relative(rootDir, outPath).replace(/\\/g, "/"),
      overwrote: existedBefore,
    });
  }

  const written = results.filter((r) => r.status === "written");
  const dry = results.filter((r) => r.status === "dry-run");
  const skipped = results.filter((r) => r.status === "skipped");

  for (const r of results) {
    if (r.status === "written") {
      console.log(`✅ Wrote: ${r.out}`);
    } else if (r.status === "dry-run") {
      console.log(`ℹ️ Would write: ${r.out}${r.wouldOverwrite ? " (overwrite)" : ""}`);
    } else if (r.status === "skipped") {
      console.log(`⏭ Skipped: ${r.id || r.projectPath || "?"} — ${r.reason}`);
    }
  }

  const reportLines = [];
  reportLines.push("# preview.html scaffold report");
  reportLines.push("");
  reportLines.push(`- **Mode**: ${modeLabel}`);
  reportLines.push(`- **Manifest**: \`${path.relative(rootDir, manifestPath).replace(/\\/g, "/") || "."}\``);
  reportLines.push(`- **Force**: ${args.force}`);
  reportLines.push("");
  reportLines.push("## Summary");
  reportLines.push("");
  reportLines.push(`- Written: ${written.length}`);
  reportLines.push(`- Dry-run: ${dry.length}`);
  reportLines.push(`- Skipped: ${skipped.length}`);
  reportLines.push("");
  reportLines.push("## Written");
  reportLines.push("");
  if (!written.length) reportLines.push("_(none)_");
  else written.forEach((r) => reportLines.push(`- \`${r.out}\` (${r.id})`));
  reportLines.push("");
  reportLines.push("## Skipped");
  reportLines.push("");
  if (!skipped.length) reportLines.push("_(none)_");
  else skipped.forEach((r) => reportLines.push(`- **${r.id || r.projectPath}** — ${r.reason}`));
  reportLines.push("");

  const reportsDir = path.join(rootDir, "reports");
  ensureDir(reportsDir);
  const reportPath = path.join(reportsDir, "preview-html-scaffold-report.md");
  fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

  console.log("");
  console.log(`Report: ${path.relative(rootDir, reportPath)}`);
  console.log("");
  console.log("Next:");
  console.log("  npm run thumbs:dry");
  console.log("  npm run thumbs:gen -- --central-output=assets/thumbnails");
  console.log("  npm run manifest:gen");
}

main();
