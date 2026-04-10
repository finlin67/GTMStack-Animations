const fs = require('fs');
const path = require('path');

function usage() {
  console.log('Usage: node find-broken-animations.js [--manifest <path>] [--repo <path>] [--move]');
  process.exit(1);
}

const args = process.argv.slice(2);
let manifestPath = path.join(__dirname, '..', 'exports', 'gallery-manifest.json');
let repoRoot = path.join(__dirname, '..');
let shouldMove = false;

for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--manifest' && args[i+1]) { manifestPath = args[i+1]; i++; }
  else if (a === '--repo' && args[i+1]) { repoRoot = args[i+1]; i++; }
  else if (a === '--move') { shouldMove = true; }
  else usage();
}

if (!fs.existsSync(manifestPath)) {
  console.error('Manifest not found:', manifestPath);
  process.exit(2);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const broken = [];

const needsRepairRoot = path.resolve(repoRoot, '..', 'needs repair');
if (shouldMove && !fs.existsSync(needsRepairRoot)) {
  fs.mkdirSync(needsRepairRoot, { recursive: true });
}

for (const item of manifest) {
  try {
    const projectRel = item.projectPath; // e.g. animations/operations/xyz
    const projectFull = path.resolve(repoRoot, projectRel);

    if (!fs.existsSync(projectFull)) {
      broken.push({ id: item.id, reason: 'missing project folder', projectFull, projectRel });
      continue;
    }

    // Check thumbnail
    if (item.thumbnailPath) {
      const thumbFull = path.resolve(repoRoot, item.thumbnailPath);
      if (!fs.existsSync(thumbFull)) {
        broken.push({ id: item.id, reason: 'missing thumbnail', projectFull, projectRel, thumbnail: item.thumbnailPath });
        continue;
      }
    }

    // Check entry file when entryType is html
    if (item.entryType === 'html') {
      if (!item.entryHtml || item.entryHtml.trim() === '') {
        broken.push({ id: item.id, reason: 'entryHtml missing', projectFull, projectRel });
        continue;
      }
      const entryFull = path.resolve(repoRoot, item.entryHtml);
      if (!fs.existsSync(entryFull)) {
        broken.push({ id: item.id, reason: 'missing entryHtml', projectFull, projectRel, entryHtml: item.entryHtml });
        continue;
      }
    }

  } catch (err) {
    broken.push({ id: item.id, reason: 'error checking', error: err.message });
  }
}

console.log('Checked', manifest.length, 'manifest items. Broken count:', broken.length);
if (broken.length > 0) {
  for (const b of broken) {
    console.log('- ', b.id, '|', b.reason, '|', b.projectRel || b.projectFull || '');
  }
  if (shouldMove) {
    console.log('\nMoving broken project folders to:', needsRepairRoot);
    for (const b of broken) {
      // attempt to move project folder
      const src = b.projectFull;
      if (!src || !fs.existsSync(src)) {
        console.log('  skip (src missing):', src);
        continue;
      }
      const name = path.basename(src);
      const dest = path.join(needsRepairRoot, name);
      try {
        // if dest exists, append timestamp
        let finalDest = dest;
        if (fs.existsSync(finalDest)) {
          finalDest = dest + '-' + Date.now();
        }
        fs.renameSync(src, finalDest);
        console.log('  moved:', src, '->', finalDest);
      } catch (err) {
        console.error('  failed moving', src, err.message);
      }
    }
  } else {
    console.log('\nRun with --move to move broken projects to the needs repair folder.');
  }
} else {
  console.log('No broken items found.');
}
