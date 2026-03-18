# GTMStack Animations
Free collection of Tailwind/CSS marketing-themed animations for marketers, creators, and builders.

## Table of contents

- [What’s in this repo](#whats-in-this-repo)
- [Quick start](#quick-start)
- [Animations index](#animations-index)
- [Contributing (optional)](#contributing-optional)
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

## Contributing (optional)

- **Folder naming**: lowercase, kebab-case, no spaces.
- **Duplicates**: if two folders would collide, use suffixes like `-v2`, `-v3`.
- **Avoid committing secrets**: never add `.env` files; keep them local only.

## Maintenance scripts

- `scripts/safe_cleanup_repo.py`
  - **Default**: `--dry-run`
  - **Apply**: `--apply`
  - Generates: `reports/cleanup-report.md`
