const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node sync-manifests-audit.js --exports <path> --site <path> --repo <repoRoot> [--remove-stale]');
  process.exit(1);
}

// simple arg parsing (no external deps)
const rawArgs = process.argv.slice(2);
let exportsPath = path.join(__dirname, '..', 'exports', 'gallery-manifest.json');
let sitePath = path.join(__dirname, '..', '..', 'GTMStack_pro_production', 'src', 'data', 'gallery-manifest.json');
let repoRoot = path.join(__dirname, '..');
let removeStale = false;
for (let i = 0; i < rawArgs.length; i++) {
  const a = rawArgs[i];
  if ((a === '--exports' || a === '-e') && rawArgs[i+1]) { exportsPath = rawArgs[i+1]; i++; }
  else if ((a === '--site' || a === '-s') && rawArgs[i+1]) { sitePath = rawArgs[i+1]; i++; }
  else if ((a === '--repo' || a === '-r') && rawArgs[i+1]) { repoRoot = rawArgs[i+1]; i++; }
  else if (a === '--remove-stale') { removeStale = true; }
  else if (a === '--help' || a === '-h') { usage(); }
}

if (!fs.existsSync(exportsPath)) { console.error('Exports manifest not found:', exportsPath); process.exit(2); }
if (!fs.existsSync(sitePath)) { console.error('Site manifest not found:', sitePath); process.exit(2); }

const exportsManifest = JSON.parse(fs.readFileSync(exportsPath, 'utf8'));
const siteManifest = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

const timestamp = new Date().toISOString().replace(/[:.]/g,'-');
const outDir = path.join(__dirname, 'output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const csvPath = path.join(outDir, `broken-animations-${timestamp}.csv`);

function checkItem(item) {
  const projectRel = item.projectPath;
  const projectFull = path.resolve(repoRoot, projectRel);
  const projectExists = fs.existsSync(projectFull);
  let thumbnailExists = true;
  if (item.thumbnailPath) {
    const thumb = path.resolve(repoRoot, item.thumbnailPath);
    thumbnailExists = fs.existsSync(thumb);
  }
  let entryExists = true;
  if (item.entryType === 'html') {
    if (!item.entryHtml || item.entryHtml.trim() === '') entryExists = false;
    else entryExists = fs.existsSync(path.resolve(repoRoot, item.entryHtml));
  }
  const missingReasons = [];
  if (!projectExists) missingReasons.push('project_missing');
  if (!thumbnailExists) missingReasons.push('thumbnail_missing');
  if (!entryExists) missingReasons.push('entry_missing');
  return { projectRel, projectFull, projectExists, thumbnailExists, entryExists, missingReasons };
}

const exportChecks = exportsManifest.map(it => ({ id: it.id, slug: it.slug, source: 'exports', meta: it, check: checkItem(it) }));
const siteChecks = siteManifest.map(it => ({ id: it.id, slug: it.slug, source: 'site', meta: it, check: checkItem(it) }));

// Build CSV headers
const header = ['id','slug','source','projectPath','projectExists','thumbnailPath','thumbnailExists','entryType','entryHtml','entryExists','missingReasons','githubUrl','updatedAt'];
const rows = [header.join(',')];

function safeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val).replace(/"/g,'""');
  if (s.indexOf(',') !== -1 || s.indexOf('\n') !== -1) return `"${s}"`;
  return s;
}

for (const e of exportChecks) {
  const m = e.meta;
  const c = e.check;
  const row = [e.id,e.slug,e.source,c.projectRel,c.projectExists,m.thumbnailPath,c.thumbnailExists,m.entryType,m.entryHtml,c.entryExists,c.missingReasons.join('|'),m.githubUrl,m.updatedAt].map(safeCSV).join(',');
  rows.push(row);
}
for (const s of siteChecks) {
  const m = s.meta;
  const c = s.check;
  const row = [s.id,s.slug,s.source,c.projectRel,c.projectExists,m.thumbnailPath,c.thumbnailExists,m.entryType,m.entryHtml,c.entryExists,c.missingReasons.join('|'),m.githubUrl,m.updatedAt].map(safeCSV).join(',');
  rows.push(row);
}

fs.writeFileSync(csvPath, rows.join('\n'), 'utf8');
console.log('CSV report written:', csvPath);

// Identify stale entries in site manifest: project missing OR (entryType html and entry missing)
const staleSiteIds = siteChecks.filter(s => (!s.check.projectExists) || (s.meta.entryType === 'html' && !s.check.entryExists)).map(s => s.id);
console.log('Stale entries in site manifest:', staleSiteIds.length);
if (staleSiteIds.length > 0) console.log(staleSiteIds.join(', '));

if (removeStale && staleSiteIds.length > 0) {
  const backupPath = sitePath + `.bak.${timestamp}`;
  fs.copyFileSync(sitePath, backupPath);
  console.log('Site manifest backed up to', backupPath);
  const newSite = siteManifest.filter(it => !staleSiteIds.includes(it.id));
  fs.writeFileSync(sitePath, JSON.stringify(newSite, null, 2), 'utf8');
  console.log('Removed', staleSiteIds.length, 'stale entries from site manifest. Updated file:', sitePath);
}

console.log('Done.');
