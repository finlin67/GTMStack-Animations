## GTMStack Animations – Developer Notes

This document summarizes the technical setup of the repo so another developer can work on it safely.

---

## 1. Repository structure

- **Root**
  - `animations/` – all animation projects, grouped by category.
  - `reports/` – generated reports (cleanup + thumbnails).
  - `scripts/` – maintenance scripts (Python and Node).
  - `.gitattributes`, `.gitignore`, `README.md`, `DEVELOPERS.md`.

- **Categories under `animations/`**
  - `animations/abm/`
  - `animations/dashboard-tiles/`
  - `animations/digital-demand/`
  - `animations/events-media/`
  - `animations/industries/`
  - `animations/misc/`
  - `animations/operations/`

Many category subfolders end with `-v2`, `-v3`, etc. where original names would have collided.

---

## 2. Git / normalization decisions

- This repo is the **parent** for many smaller animation projects that were previously standalone.
- All previous nested git repositories inside animation folders had their inner `.git/` directories removed; everything is now tracked by **this** top-level repo.
- Folder and file naming is normalized to be:
  - Lowercase
  - Kebab-case (dashes instead of spaces/underscores)
  - With `-v2`, `-v3`, etc. suffixes where name collisions occurred.

Root `.gitignore`:

```text
.DS_Store
Thumbs.db
node_modules/
dist/
build/
.env
.env.*
*.log
```

---

## 3. Python cleanup script

- **File**: `scripts/safe_cleanup_repo.py`
- **Purpose**: safely clean/normalize the repo (junk removal + kebab-case names) with a **dry-run** mode.

### Behavior

- **Junk detection/removal** (on `--apply`):
  - Files: `.DS_Store`, `Thumbs.db`, `*.log`, `.env`, `.env.*`
  - Directories: `node_modules`, `dist`, `build`
- **Renames (kebab-case)**:
  - Directories and a conservative set of files (HTML/CSS/JS/MD and common asset types).
  - Avoids renaming TS/TSX and config files (e.g. `tailwind.config.js`, `tsconfig.json`, etc.) to avoid breaking imports/builds.
  - Resolves conflicts by keeping one “base” target name and suffixing others with `-v2`, `-v3`, … (never overwrites existing content).
- **Reference updates**:
  - After successful apply, updates path references in:
    - `*.html`, `*.css`, `*.js`, `*.md`
  - Performs simple string replace of repo-relative paths (including Windows backslash variants).
- **Reporting**:
  - Writes `reports/cleanup-report.md` with sections:
    - Summary
    - Renamed Paths
    - Removed Junk
    - Skipped/Conflicts
    - Reference Updates
    - Manual Follow-ups

### Usage

From the repo root:

```bash
# Preview only – no filesystem changes
python scripts/safe_cleanup_repo.py --dry-run

# Apply renames/removals + reference updates
python scripts/safe_cleanup_repo.py --apply
```

The script is designed to be **conservative** and to refuse `--apply` if unresolved naming conflicts remain.

---

## 4. Node + Playwright thumbnail generator

- **Node version**: tested with Node 24.x
- **Dev deps**: `"playwright"` in `package.json`
- **Script file**: `scripts/generate-thumbnails.js`

### What it does

- Scans a **source root** (default: `animations/`) recursively.
- Any directory containing at least one `.html` file is treated as an **animation project**.
  - Prefers `index.html` if present; otherwise uses the first `.html` file found.
- For each project, it uses Playwright **Chromium** (headless) to:
  - Open the HTML via a `file://` URL.
  - Set viewport to **1200x630**.
  - Wait **1.5 seconds** for the animation to settle.
  - Capture a screenshot:
    - `preview.png` in the project directory.
    - Optionally, a centralized thumbnail under `assets/thumbnails/`.

### Outputs

- **Per-project thumbnail**:
  - `preview.png` in the project directory, e.g.:
    - `animations/digital-demand/growth-ai-animation/preview.png`
- **Central thumbnails (for gallery integration)**:
  - When `--central-output=assets/thumbnails` is used:
    - `assets/thumbnails/animations__digital-demand__growth-ai-animation.png`
    - Filename encodes the project path by replacing `/` or `\` with `__`.

### Safety / behavior

- **Dry-run** mode prints what would be captured; **no files are written**.
- **Apply** mode writes/overwrites thumbnails, but:
  - Never deletes source files.
  - Only overwrites existing thumbnails (`preview.png` or central outputs).
- Per-project failures are logged and do **not** stop the run.

### CLI

The script supports:

- `--dry-run` (default if neither flag is provided)
- `--apply`
- `--source=animations` (scan root directory)
- `--central-output=assets/thumbnails` (optional centralized output)

### npm scripts

Defined in `package.json`:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "thumbs:dry": "node scripts/generate-thumbnails.js --dry-run --source=animations",
  "thumbs:gen": "node scripts/generate-thumbnails.js --apply --source=animations"
}
```

Common commands:

```bash
# Preview which projects will get thumbnails
npm run thumbs:dry

# Generate thumbnails (per-project preview.png + central output)
npm run thumbs:gen -- --central-output=assets/thumbnails
```

The last run used `thumbs:gen` with `--central-output=assets/thumbnails`, producing entries like:

- `animations/.../preview.png`
- `assets/thumbnails/animations__...__.png`

### Thumbnail report

- The thumbnail generator writes `reports/thumbnail-report.md` with:
  - Summary counts (Captured / Skipped / Errors)
  - For each captured project:
    - Project path
    - Per-folder `preview.png` path
    - Central thumbnail path (if configured)

### Option B: static `preview.html` for TSX-only projects

Many projects are **TSX-only** (no `.html` in the folder). The thumbnail scanner **only** visits directories that contain at least one `.html`, so those projects were invisible to `thumbs:gen` until you add a small HTML file.

- **Script**: `scripts/scaffold-preview-html.js`
- **Data source**: `exports/gallery-manifest.json` (title, summary, category, id) — refresh with `npm run manifest:gen` first.
- **Behavior**:
  - For each manifest entry, if the project folder has **no** `.html` file, writes **`preview.html`** (a static card layout sized for 1200×630 screenshots).
  - If the folder **already** has any `.html`, it **skips** (your real demo HTML stays primary). Use `--force` only if you intentionally want to add/overwrite `preview.html` alongside other HTML (note: `generate-thumbnails.js` still prefers `index.html` when present).

**npm scripts**

```bash
npm run preview-html:dry    # list what would be written
npm run preview-html:gen    # write preview.html where missing
# optional:
node scripts/scaffold-preview-html.js --apply --force
```

**Suggested pipeline (repo root)**

```bash
npm run manifest:gen
npm run preview-html:dry
npm run preview-html:gen
npm run thumbs:gen -- --central-output=assets/thumbnails
npm run manifest:gen
```

Report: `reports/preview-html-scaffold-report.md`.

### Using Cursor for this workflow

1. Open the **animations repo** root in Cursor.
2. In the terminal: run the commands above in order.
3. Review `reports/preview-html-scaffold-report.md` for skips vs writes.
4. Commit `preview.html` files + updated thumbnails/manifest as needed.

You can also ask Cursor in chat: *“Run preview-html dry-run and summarize skips”* — it can execute the npm script and read the report.

---

## 5. How to extend

- **Adding new animations**:
  - Place new projects under the appropriate `animations/<category>/` folder.
  - For **HTML** demos: keep at least one `.html` in the project directory (or add `preview.html` via Option B).
  - For **TSX-only** demos: add a README so the project appears in the manifest, then run `preview-html:gen` and `thumbs:gen`.
  - Run:
    - `npm run manifest:gen` → `npm run preview-html:dry` / `preview-html:gen` (if needed)
    - `npm run thumbs:dry` to confirm detection.
    - `npm run thumbs:gen -- --central-output=assets/thumbnails` to generate/update thumbnails.
- **Adjusting naming rules**:
  - Tweak the Python script’s slug and exclusion rules in `scripts/safe_cleanup_repo.py`.
  - Always run `--dry-run` first and review `reports/cleanup-report.md` before applying.

