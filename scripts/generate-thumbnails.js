#!/usr/bin/env node

/**
 * Thumbnail generator for animation projects.
 *
 * - Scans a source directory (default: ./animations)
 * - For each subfolder, looks for an index.html (preferred) or any .html file
 * - Uses Playwright (Chromium) to capture a 1200x630 screenshot
 * - Saves as preview.png in the project folder by default
 * - Optionally also writes to a central assets/thumbnails/ folder
 *
 * CLI:
 *   node scripts/generate-thumbnails.js --dry-run
 *   node scripts/generate-thumbnails.js --apply
 *   node scripts/generate-thumbnails.js --apply --source=animations --central-output=assets/thumbnails
 */

const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const DEFAULT_SOURCE = "animations";
const DEFAULT_CENTRAL_OUTPUT = null; // opt-in via --central-output
const VIEWPORT = { width: 1200, height: 630 };
const WAIT_MS = 1500;

function parseArgs(argv) {
  const args = {
    dryRun: true,
    apply: false,
    source: DEFAULT_SOURCE,
    centralOutput: DEFAULT_CENTRAL_OUTPUT,
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
    } else if (raw.startsWith("--central-output=")) {
      args.centralOutput = raw.split("=", 2)[1] || DEFAULT_CENTRAL_OUTPUT;
    } else {
      console.warn(`Unknown argument ignored: ${raw}`);
    }
  }

  return args;
}

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function findHtmlEntry(projectDir) {
  const entries = fs.readdirSync(projectDir, { withFileTypes: true });

  let indexHtml = null;
  let otherHtml = null;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith(".html")) continue;
    if (entry.name.toLowerCase() === "index.html") {
      indexHtml = path.join(projectDir, entry.name);
      break;
    }
    if (!otherHtml) {
      otherHtml = path.join(projectDir, entry.name);
    }
  }

  return indexHtml || otherHtml;
}

async function generateThumbnailForProject(browser, rootDir, projectDir, options) {
  const relProject = path.relative(rootDir, projectDir).replace(/\\/g, "/");
  const htmlPath = findHtmlEntry(projectDir);

  if (!htmlPath) {
    return { status: "skipped", project: relProject, reason: "No .html file found" };
  }

  const relHtml = path.relative(rootDir, htmlPath).replace(/\\/g, "/");

  const localUrl = "file://" + htmlPath;

  const previewPath = path.join(projectDir, "preview.png");
  const willOverwritePreview = fs.existsSync(previewPath);

  let centralPath = null;
  let willOverwriteCentral = false;
  if (options.centralOutput) {
    const relSafe = relProject.replace(/[\\/]/g, "__");
    centralPath = path.join(options.centralOutput, `${relSafe}.png`);
    if (fs.existsSync(centralPath)) {
      willOverwriteCentral = true;
    }
  }

  if (options.dryRun) {
    return {
      status: "dry-run",
      project: relProject,
      html: relHtml,
      previewPath: path.relative(rootDir, previewPath).replace(/\\/g, "/"),
      centralPath: centralPath ? path.relative(rootDir, centralPath).replace(/\\/g, "/") : null,
      willOverwritePreview,
      willOverwriteCentral,
    };
  }

  const page = await browser.newPage({
    viewport: VIEWPORT,
  });

  try {
    await page.goto(localUrl, { waitUntil: "load" });
    await page.waitForTimeout(WAIT_MS);

    await page.screenshot({
      path: previewPath,
      fullPage: false,
    });

    if (centralPath) {
      ensureDir(path.dirname(centralPath));
      await page.screenshot({
        path: centralPath,
        fullPage: false,
      });
    }

    return {
      status: "captured",
      project: relProject,
      html: relHtml,
      previewPath: path.relative(rootDir, previewPath).replace(/\\/g, "/"),
      centralPath: centralPath ? path.relative(rootDir, centralPath).replace(/\\/g, "/") : null,
      overwrotePreview: willOverwritePreview,
      overwroteCentral: willOverwriteCentral,
    };
  } catch (err) {
    return {
      status: "error",
      project: relProject,
      html: relHtml,
      error: String(err && err.message ? err.message : err),
    };
  } finally {
    await page.close();
  }
}

function* iterProjectDirs(sourceDir) {
  const stack = [sourceDir];
  while (stack.length) {
    const dir = stack.pop();
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let hasHtml = false;

    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith(".")) continue;
        stack.push(full);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
        hasHtml = true;
      }
    }

    if (hasHtml) {
      yield dir;
    }
  }
}

function buildReport(rootDir, modeLabel, results, centralOutput) {
  const captured = results.filter((r) => r.status === "captured");
  const dry = results.filter((r) => r.status === "dry-run");
  const skipped = results.filter((r) => r.status === "skipped");
  const errors = results.filter((r) => r.status === "error");

  const lines = [];
  lines.push(`# Thumbnail Generation Report`);
  lines.push("");
  lines.push(`- **Mode**: ${modeLabel}`);
  lines.push(`- **Root**: \`${rootDir}\``);
  lines.push(`- **Central output**: ${centralOutput ? `\`${centralOutput}\`` : "_none_"}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Captured: ${captured.length}`);
  lines.push(`- Dry-run entries: ${dry.length}`);
  lines.push(`- Skipped: ${skipped.length}`);
  lines.push(`- Errors: ${errors.length}`);
  lines.push("");

  function rel(p) {
    return path.relative(rootDir, p).replace(/\\/g, "/");
  }

  lines.push("## Captured");
  lines.push("");
  if (!captured.length) {
    lines.push("_(none)_");
  } else {
    for (const r of captured) {
      lines.push(
        `- \`${r.project}\` → preview: \`${r.previewPath}\`${r.centralPath ? `; central: \`${r.centralPath}\`` : ""}${
          r.overwrotePreview || r.overwroteCentral ? " (overwrote existing)" : ""
        }`
      );
    }
  }
  lines.push("");

  lines.push("## Dry-run (would capture)");
  lines.push("");
  if (!dry.length) {
    lines.push("_(none)_");
  } else {
    for (const r of dry) {
      lines.push(
        `- \`${r.project}\` → preview: \`${r.previewPath}\`${r.centralPath ? `; central: \`${r.centralPath}\`` : ""}${
          r.willOverwritePreview || r.willOverwriteCentral ? " (would overwrite existing)" : ""
        }`
      );
    }
  }
  lines.push("");

  lines.push("## Skipped");
  lines.push("");
  if (!skipped.length) {
    lines.push("_(none)_");
  } else {
    for (const r of skipped) {
      lines.push(`- \`${r.project}\` — ${r.reason}`);
    }
  }
  lines.push("");

  lines.push("## Errors");
  lines.push("");
  if (!errors.length) {
    lines.push("_(none)_");
  } else {
    for (const r of errors) {
      lines.push(`- \`${r.project}\` — ${r.error || "Unknown error"}`);
    }
  }
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const args = parseArgs(process.argv);
  const rootDir = process.cwd();
  const sourceDir = path.resolve(rootDir, args.source);
  const centralOutputDir = args.centralOutput ? path.resolve(rootDir, args.centralOutput) : null;

  if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
    console.error(`Source directory does not exist or is not a directory: ${sourceDir}`);
    process.exitCode = 1;
    return;
  }

  if (!args.dryRun && !args.apply) {
    args.dryRun = true;
  }

  const modeLabel = args.dryRun ? "DRY RUN (no files written)" : "APPLY (screenshots captured)";

  console.log(`Thumbnail generator`);
  console.log(`- Mode: ${modeLabel}`);
  console.log(`- Source: ${path.relative(rootDir, sourceDir) || "."}`);
  console.log(`- Central output: ${centralOutputDir ? path.relative(rootDir, centralOutputDir) : "(none)"}`);
  console.log("");

  if (!args.dryRun && centralOutputDir) {
    ensureDir(centralOutputDir);
  }

  const results = [];
  let browser = null;

  try {
    if (!args.dryRun) {
      browser = await chromium.launch();
    }

    for (const projectDir of iterProjectDirs(sourceDir)) {
      const relProject = path.relative(rootDir, projectDir).replace(/\\/g, "/");
      try {
        const res = await generateThumbnailForProject(browser, rootDir, projectDir, {
          dryRun: args.dryRun,
          centralOutput: centralOutputDir,
        });
        results.push(res);
        if (res.status === "captured") {
          console.log(`✅ Captured: ${relProject}`);
        } else if (res.status === "dry-run") {
          console.log(`ℹ️ Would capture: ${relProject}`);
        } else if (res.status === "skipped") {
          console.log(`⏭ Skipped: ${relProject} — ${res.reason}`);
        } else if (res.status === "error") {
          console.log(`❌ Error: ${relProject} — ${res.error}`);
        }
      } catch (err) {
        results.push({
          status: "error",
          project: relProject,
          error: String(err && err.message ? err.message : err),
        });
        console.log(`❌ Error: ${relProject} — ${err && err.message ? err.message : err}`);
      }
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  const reportsDir = path.join(rootDir, "reports");
  ensureDir(reportsDir);
  const reportPath = path.join(reportsDir, "thumbnail-report.md");
  const report = buildReport(rootDir, modeLabel, results, centralOutputDir);
  fs.writeFileSync(reportPath, report, "utf8");

  console.log("");
  console.log(`Report written to: ${path.relative(rootDir, reportPath)}`);
  console.log("");
  console.log("How to run again:");
  console.log("  npm run thumbs:dry");
  console.log("  npm run thumbs:gen");
}

main().catch((err) => {
  console.error("Fatal error in thumbnail generator:", err);
  process.exitCode = 1;
});

