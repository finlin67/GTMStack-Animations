# GTMStack Animations
Free collection of Tailwind/CSS marketing-themed animations for marketers, creators, and builders.

## Table of contents

- [What’s in this repo](#whats-in-this-repo)
- [Quick start](#quick-start)
- [Animations index](#animations-index)
- [Content Model](#content-model)
- [How to add animation](#how-to-add-animation)
- [Contributing](#contributing)
- [Maintenance scripts](#maintenance-scripts)

## What’s in this repo

- **Purpose**: a parent repo that groups many small “animation projects” into browseable categories.
- **Structure**: all categories live under `./animations/*`.
- **Each project folder**: typically contains a `README.md` and/or HTML/CSS/JS/TSX assets.

## Quick start

- **Browse**: open [`./animations/`](./animations/) and pick a category.
- **Open a project**: click into a project folder and read its `README.md` (if present).
- **Run locally (if a project supports it)**:
  - Some projects are just static HTML — open the `.html` file.
  - Some are React/TSX examples — they may need a Node toolchain inside that folder.

## Animations index

- [ABM](./animations/abm/)
- [Dashboard tiles](./animations/dashboard-tiles/)
- [Digital demand](./animations/digital-demand/)
- [Events & media](./animations/events-media/)
- [Industries](./animations/industries/)
- [Misc](./animations/misc/)
- [Operations](./animations/operations/)

## Content Model

Every animation is a self-contained **content unit** with:

```
animations/
  <category>/            # e.g. abm, dashboard-tiles, industries …
    <slug>/              # kebab-case animation identifier
      component.tsx      # (or app-v2.html for HTML-only animations)
      preview.png        # (or thumbnail.png / .jpg / .webp)
      meta.json          # canonical metadata
      components/        # optional sub-components
```

Flat animations (no category sub-folder) also supported:

```
animations/<slug>/
  component.tsx
  meta.json
  thumbnail.png
```

### meta.json fields

| Field | Type | Notes |
|---|---|---|
| `id` | string | Unique slug — **must match folder name** |
| `title` | string | Display name |
| `description` | string | Short description |
| `tags` | string[] | Searchable keywords |
| `category` | enum | `hero` \| `background` \| `button` \| `text` \| `card` \| `loader` \| `nav` \| `other` |
| `published` | boolean | `true` → included in distributed index |
| `featured` | boolean | Highlight flag |
| `createdAt` | ISO datetime | e.g. `2026-03-23T20:00:00.000Z` |
| `updatedAt` | ISO datetime | Must be ≥ `createdAt` |
| `thumbnail` | relative path | `animations/…/preview.png` |
| `componentPath` | relative path | `animations/…/Component.tsx` or `…/app-v2.html` |

### Toolchain

- **Schema**: `schemas/animation-meta.schema.json`
- **Validation**: `scripts/validate-meta.ts` (AJV 2020-12)
- **Index generation**: `scripts/build-index.ts`
- **Scaffold helper**: `scripts/scaffold-meta.ts` (generates stub `meta.json` for new folders)
- **Generated index**: `dist/animations.index.json`

### Index behavior

- Default: only `published: true` entries
- `--include-unpublished` flag includes draft entries
- Sorted by `updatedAt` descending; deterministic JSON for clean diffs

## How to add animation

### Developer workflow (new animation from scratch)

1. Create `animations/<category>/<slug>/` (or flat `animations/<slug>/` — both structures supported)
2. Add your component at `animations/<category>/<slug>/component.tsx` (or `app-v2.html` for HTML-only)
3. Add a thumbnail: `preview.png` or `thumbnail.png` in the same folder
4. Create `meta.json` — copy from a neighbor and adjust, **or** run the scaffold helper:
   ```bash
   npm run scaffold:meta    # auto-generates stubs for all folders missing meta.json
   ```
5. Edit the generated stub to set real `title`, `description`, `tags`, `category`, and `featured`
6. Validate and regenerate the index:
   ```bash
   npm run build:content
   ```
7. Commit all changes including `dist/animations.index.json`

### Updating an existing animation

1. Edit the animation files
2. Bump `updatedAt` in `meta.json` to the current ISO timestamp
3. Run `npm run build:content` and commit

## Contributing

For **non-technical contributors** — adding a new animation:

1. Create a new folder under `animations/<category>/` or ask a developer to confirm the right category.
   - Folder name must be lowercase kebab-case (e.g. `my-new-hero-tile-v2`)
2. Drop your animation files in the folder (HTML, TSX, images)
3. Add one thumbnail image — name it `preview.png` or `thumbnail.png`
4. Copy `meta.json` from any neighbour folder and fill in:
   - `id` — must be the exact folder name
   - `title`, `description`, `tags` — human-readable metadata
   - `category` — one of `hero`, `background`, `button`, `text`, `card`, `loader`, `nav`, `other`
   - `published: true` to include in the public index
   - `createdAt` / `updatedAt` — ISO format, e.g. `2026-03-23T20:00:00.000Z`
5. Ask a developer to run `npm run build:content` and review the diff
6. Commit your folder **and** the updated `dist/animations.index.json`

**Rules**:
- IDs must be unique across all animation folders
- `id` must exactly match the folder name
- Timestamps must be valid ISO 8601 (`updatedAt ≥ createdAt`)
- Do not delete existing animation files without a dedicated migration PR

## Maintenance scripts

- `scripts/safe_cleanup_repo.py`
  - **Default**: `--dry-run`
  - **Apply**: `--apply`
  - Generates: `reports/cleanup-report.md`
