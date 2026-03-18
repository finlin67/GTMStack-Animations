#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
import re
import shutil
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable


JUNK_FILE_PATTERNS = [
    ".DS_Store",
    "Thumbs.db",
]

JUNK_GLOB_PATTERNS = [
    "*.log",
    ".env",
    ".env.*",
]

JUNK_DIR_NAMES = {
    "node_modules",
    "dist",
    "build",
}

REFERENCE_EXTS = {".html", ".css", ".js", ".md"}

# Only rename files that are very likely to be referenced by HTML/CSS/JS/MD,
# and that won't break build systems (avoid renaming source code / config).
RENAMEABLE_FILE_EXTS = {
    ".html",
    ".css",
    ".js",
    ".md",
    ".json",
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".mp4",
    ".webm",
    ".lottie",
}

NEVER_RENAME_FILENAMES_CASEFOLD = {
    "readme.md",  # GitHub convention; keep as-is
    "license",
    "license.md",
    "package.json",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "tsconfig.json",
    "jsconfig.json",
    "tailwind.config.js",
    "postcss.config.js",
    "vite.config.js",
    "vite.config.ts",
    "next.config.js",
    "next.config.ts",
    "webpack.config.js",
    "rollup.config.js",
    "eslint.config.js",
    ".eslintrc",
    ".eslintrc.js",
    ".eslintrc.json",
    ".prettierrc",
    ".prettierrc.js",
    ".prettierrc.json",
    ".editorconfig",
}

ROOT_GITIGNORE_LINES = [
    ".DS_Store",
    "Thumbs.db",
    "node_modules/",
    "dist/",
    "build/",
    ".env",
    ".env.*",
    "*.log",
]


PROTECTED_TOP_LEVEL_DIRS = {
    ".git",
    ".github",
    "scripts",
    "reports",
}

# Conflict resolution preferences (repo-relative POSIX paths).
# For each conflicting destination slug, pick one source to keep as the base slug.
# Other colliding sources will get a suffix like "-v2", "-v3", ...
PREFERRED_BASE_BY_DEST_REL: dict[str, str] = {
    "abm/abm-pipeline-strategy-dashboard": "abm/ABM Pipeline Strategy Dashboard",
    "events-media/executive-logistics-dashboard": "events-media/Executive-Logistics-Dashboard",
    "industries/edtech-compact-roi-funnel": "industries/EDtech-Compact-Roi-Funnel",
    "industries/fintech-growth-animated-sales-tile": "industries/Fintech-Growth-Animated-Sales-Tile",
    "industries/nonprofithero-impact-visualization": "industries/Nonprofithero-Impact-Visualization",
    "operations/marketing-analytics-carousel": "operations/Marketing-Analytics-Carousel",
    "operations/live-email-automation-ecosystem": "operations/Live-Email-Automation-Ecosystem",
}


def now_iso() -> str:
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def rel_posix(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def is_hidden_dotfile(path: Path) -> bool:
    return path.name.startswith(".")


_slug_invalid_re = re.compile(r"[^a-z0-9-]+")
_slug_multi_dash_re = re.compile(r"-{2,}")


def slugify_kebab(name: str) -> str:
    s = name.strip().lower()
    s = s.replace("_", "-").replace(" ", "-")
    s = _slug_invalid_re.sub("-", s)
    s = _slug_multi_dash_re.sub("-", s)
    s = s.strip("-")
    return s or "untitled"


def is_safe_name(name: str) -> bool:
    return bool(re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*(\.[a-z0-9]+)?", name))


def should_rename_file(path: Path) -> bool:
    # Keep dotfiles and common repo/build config names stable.
    if is_hidden_dotfile(path):
        return False
    if path.name.casefold() in NEVER_RENAME_FILENAMES_CASEFOLD:
        return False
    # Avoid renaming source code files (imports/exports won't be updated safely).
    if path.suffix.lower() in {".ts", ".tsx", ".jsx"}:
        return False
    # Only rename a conservative set of web-facing files/assets.
    return path.suffix.lower() in RENAMEABLE_FILE_EXTS


@dataclass(frozen=True)
class RenameOp:
    src: Path
    dst: Path
    reason: str


@dataclass(frozen=True)
class RemoveOp:
    target: Path
    reason: str


@dataclass(frozen=True)
class WriteFileOp:
    path: Path
    content: str
    reason: str


def discover_repo_root(start: Path) -> Path:
    cur = start.resolve()
    if cur.is_file():
        cur = cur.parent
    for p in [cur] + list(cur.parents):
        if (p / ".git").exists():
            return p
    return start.resolve()


def iter_all_files(root: Path) -> Iterable[Path]:
    for dirpath, dirnames, filenames in os.walk(root):
        # Skip protected dirs quickly
        dn = set(dirnames)
        for protected in list(dn):
            if protected in {".git"}:
                dirnames.remove(protected)
        for fn in filenames:
            yield Path(dirpath) / fn


def plan_move_top_level_into_animations(root: Path) -> list[RenameOp]:
    """
    If categories are top-level (e.g. ./abm), propose moving them under ./animations/*.
    This is a path move, implemented as a rename.
    """
    animations_dir = root / "animations"
    ops: list[RenameOp] = []
    for child in root.iterdir():
        if not child.is_dir():
            continue
        if child.name in PROTECTED_TOP_LEVEL_DIRS:
            continue
        if child.name == "animations":
            continue
        # Propose move (even if name is already safe) to meet required structure.
        ops.append(
            RenameOp(
                src=child,
                dst=animations_dir / child.name,
                reason="Move top-level category under ./animations/",
            )
        )
    return ops


def plan_kebab_case_renames(root: Path, animations_root: Path) -> list[RenameOp]:
    ops: list[RenameOp] = []
    for dirpath, dirnames, filenames in os.walk(animations_root):
        # avoid renaming junk/protected-like internal dirs by name
        dirnames[:] = [d for d in dirnames if d not in PROTECTED_TOP_LEVEL_DIRS and d != ".git"]

        cur_dir = Path(dirpath)
        for d in list(dirnames):
            p = cur_dir / d
            if is_hidden_dotfile(p):
                continue
            new = slugify_kebab(p.name)
            if new != p.name:
                ops.append(RenameOp(src=p, dst=p.with_name(new), reason="Kebab-case directory name"))

        for f in filenames:
            p = cur_dir / f
            if not should_rename_file(p):
                continue
            new = slugify_kebab(p.stem) + p.suffix.lower()
            if new != p.name:
                ops.append(RenameOp(src=p, dst=p.with_name(new), reason="Kebab-case file name"))
    return ops


def plan_junk_removals(root: Path, animations_root: Path) -> list[RemoveOp]:
    ops: list[RemoveOp] = []

    # Junk files by exact name
    for name in JUNK_FILE_PATTERNS:
        for p in animations_root.rglob(name):
            ops.append(RemoveOp(target=p, reason=f"Junk file: {name}"))

    # Junk by glob patterns
    for pat in JUNK_GLOB_PATTERNS:
        for p in animations_root.rglob(pat):
            # Do not delete dotfiles outside animations_root
            ops.append(RemoveOp(target=p, reason=f"Junk pattern: {pat}"))

    # Junk directories
    for dir_name in JUNK_DIR_NAMES:
        for p in animations_root.rglob(dir_name):
            if p.is_dir():
                # safety: never touch nested git repos
                if (p / ".git").exists():
                    continue
                ops.append(RemoveOp(target=p, reason=f"Junk directory: {dir_name}"))

    # Also catch junk in root (rare), but mark as risky so it shows up clearly.
    for pat in JUNK_GLOB_PATTERNS:
        for p in root.glob(pat):
            ops.append(RemoveOp(target=p, reason=f"RISKY (root): junk pattern: {pat}"))
    for name in JUNK_FILE_PATTERNS:
        p = root / name
        if p.exists():
            ops.append(RemoveOp(target=p, reason=f"RISKY (root): junk file: {name}"))

    return ops


def detect_conflicts(renames: list[RenameOp]) -> dict[Path, list[RenameOp]]:
    by_dst: dict[Path, list[RenameOp]] = {}
    for op in renames:
        by_dst.setdefault(op.dst, []).append(op)
    return {dst: ops for dst, ops in by_dst.items() if len(ops) > 1}


def resolve_conflicting_renames(root: Path, renames: list[RenameOp]) -> tuple[list[RenameOp], list[str]]:
    """
    If multiple sources map to the same destination, keep one as base and suffix others:
      foo/bar -> foo/bar-v2, foo/bar-v3, ...
    Returns (updated_renames, notes).
    """
    by_dst: dict[Path, list[RenameOp]] = {}
    for op in renames:
        by_dst.setdefault(op.dst, []).append(op)

    resolved: list[RenameOp] = []
    notes: list[str] = []

    for dst, ops in by_dst.items():
        if len(ops) == 1:
            resolved.append(ops[0])
            continue

        dst_rel = rel_posix(dst, root)
        preferred_src_rel = PREFERRED_BASE_BY_DEST_REL.get(dst_rel)

        # Determine which op keeps the base destination.
        base_op: RenameOp | None = None
        if preferred_src_rel:
            for op in ops:
                if rel_posix(op.src, root) == preferred_src_rel:
                    base_op = op
                    break

        # If preference missing/mismatched, fall back to a stable ordering.
        if base_op is None:
            base_op = sorted(ops, key=lambda o: rel_posix(o.src, root))[0]
            notes.append(f"NOTE: No preference found for `{dst_rel}`; picked base `{rel_posix(base_op.src, root)}` automatically.")

        resolved.append(base_op)

        # Suffix all others
        others = [op for op in ops if op is not base_op]
        others = sorted(others, key=lambda o: rel_posix(o.src, root))
        for idx, op in enumerate(others, start=2):
            new_dst = dst.with_name(dst.name + f"-v{idx}")
            resolved.append(RenameOp(src=op.src, dst=new_dst, reason=op.reason + f" (collision → suffixed -v{idx})"))
            notes.append(f"RESOLVED: `{rel_posix(op.src, root)}` will become `{rel_posix(new_dst, root)}` due to name collision.")

    # If there are still conflicts (e.g. pre-existing destinations), they'll be caught later at apply time.
    return resolved, notes


def _with_suffix(path: Path, suffix: str) -> Path:
    # For files, insert suffix before extension: "file-v2.html"
    # For extension-less paths (dirs), just append to the name: "folder-v2"
    if path.suffix:
        return path.with_name(path.stem + suffix + path.suffix)
    return path.with_name(path.name + suffix)


def make_unique_destination(dst: Path) -> tuple[Path, str | None]:
    """
    If dst exists, propose a non-destructive alternative by appending -vN.
    Returns (new_dst, suffix_used).
    """
    if not dst.exists():
        return dst, None
    for n in range(2, 1000):
        candidate = _with_suffix(dst, f"-v{n}")
        if not candidate.exists():
            return candidate, f"-v{n}"
    raise RuntimeError(f"Could not find unique destination for {dst}")


def resolve_existing_destination_collisions(root: Path, renames: list[RenameOp]) -> tuple[list[RenameOp], list[str]]:
    """
    If a rename destination already exists in the working tree, do not skip.
    Instead, suffix the destination with -vN to preserve all content.
    """
    resolved: list[RenameOp] = []
    notes: list[str] = []
    for op in renames:
        new_dst, suffix = make_unique_destination(op.dst)
        if suffix:
            notes.append(
                f"RESOLVED: destination existed for `{rel_posix(op.src, root)}`; will use `{rel_posix(new_dst, root)}` instead."
            )
            resolved.append(
                RenameOp(
                    src=op.src,
                    dst=new_dst,
                    reason=op.reason + f" (destination existed → suffixed {suffix})",
                )
            )
        else:
            resolved.append(op)
    return resolved, notes


def sort_renames_for_apply(renames: list[RenameOp]) -> list[RenameOp]:
    # Apply deeper paths first to avoid parent rename collisions.
    return sorted(renames, key=lambda op: len(op.src.as_posix().split("/")), reverse=True)


def apply_rename(op: RenameOp) -> None:
    op.dst.parent.mkdir(parents=True, exist_ok=True)
    # Windows filesystems are often case-insensitive; a "case-only" rename needs a temp hop.
    if os.name == "nt" and op.src.resolve().as_posix().casefold() == op.dst.resolve().as_posix().casefold():
        tmp = op.src.with_name(op.src.name + ".tmp-rename")
        op.src.rename(tmp)
        tmp.rename(op.dst)
        return
    op.src.rename(op.dst)


def apply_remove(op: RemoveOp) -> None:
    if op.target.is_dir():
        shutil.rmtree(op.target)
    else:
        op.target.unlink(missing_ok=True)


def collect_reference_files(root: Path) -> list[Path]:
    out: list[Path] = []
    for p in iter_all_files(root):
        if p.suffix.lower() in REFERENCE_EXTS:
            out.append(p)
    return out


def update_references(root: Path, renames_applied: list[tuple[Path, Path]]) -> dict[Path, int]:
    """
    Naive, safe-ish replacement:
    - Replaces old repo-relative POSIX paths with new ones.
    - Also replaces backslash variants for Windows-originated links.
    """
    mapping: list[tuple[str, str]] = []
    for old_abs, new_abs in renames_applied:
        old_rel = rel_posix(old_abs, root)
        new_rel = rel_posix(new_abs, root)
        mapping.append((old_rel, new_rel))
        mapping.append((old_rel.replace("/", "\\"), new_rel.replace("/", "\\")))

    changed: dict[Path, int] = {}
    for f in collect_reference_files(root):
        try:
            text = f.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue

        new_text = text
        for old, new in mapping:
            if old == new:
                continue
            new_text = new_text.replace(old, new)

        if new_text != text:
            f.write_text(new_text, encoding="utf-8")
            changed[f] = sum(1 for _old, _new in mapping if _old in text)
    return changed


def format_md_list(items: list[str]) -> str:
    if not items:
        return "_(none)_\n"
    return "\n".join(f"- {i}" for i in items) + "\n"


def build_report(
    *,
    root: Path,
    is_apply: bool,
    renamed: list[tuple[Path, Path, str]],
    removed: list[tuple[Path, str]],
    skipped: list[str],
    manual_followups: list[str],
    reference_updates: dict[Path, int],
    gitignore_planned: WriteFileOp | None,
) -> str:
    lines: list[str] = []
    lines.append(f"# Cleanup Report\n")
    lines.append(f"- **Run mode**: {'APPLY' if is_apply else 'DRY RUN (no filesystem changes)'}\n")
    lines.append(f"- **Generated**: {now_iso()}\n")
    lines.append(f"- **Repo root**: `{root}`\n")
    lines.append("\n---\n")

    lines.append("## Summary\n")
    lines.append(
        f"- **Proposed/Applied renames**: {len(renamed)}\n"
        f"- **Proposed/Applied removals**: {len(removed)}\n"
        f"- **Files with reference updates**: {len(reference_updates)}\n"
    )
    if gitignore_planned:
        lines.append(f"- **Root .gitignore**: {'created' if is_apply else 'would create'}\n")
    lines.append("\n")

    lines.append("## Renamed Paths\n")
    rename_lines = [f"`{rel_posix(a, root)}` → `{rel_posix(b, root)}` ({reason})" for a, b, reason in renamed]
    lines.append(format_md_list(rename_lines))
    lines.append("\n")

    lines.append("## Removed Junk\n")
    removed_lines = [f"`{rel_posix(p, root)}` ({reason})" for p, reason in removed]
    lines.append(format_md_list(removed_lines))
    lines.append("\n")

    lines.append("## Skipped/Conflicts\n")
    lines.append(format_md_list(skipped))
    lines.append("\n")

    lines.append("## Reference Updates\n")
    if not reference_updates:
        lines.append("_(none)_\n\n")
    else:
        upd = [f"`{rel_posix(p, root)}` (mentions replaced: ~{n})" for p, n in sorted(reference_updates.items(), key=lambda kv: rel_posix(kv[0], root))]
        lines.append(format_md_list(upd))
        lines.append("\n")

    lines.append("## Manual Follow-ups\n")
    lines.append(format_md_list(manual_followups))
    lines.append("\n")

    return "".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description="Safely clean and standardize this repo (dry-run by default).")
    parser.add_argument("--dry-run", action="store_true", help="Show proposed changes only (default).")
    parser.add_argument("--apply", action="store_true", help="Apply changes to the working tree.")
    args = parser.parse_args()

    is_apply = bool(args.apply)
    if args.dry_run and args.apply:
        print("Choose only one of --dry-run or --apply.")
        return 2
    if not args.dry_run and not args.apply:
        # Default behavior is dry-run
        args.dry_run = True

    root = discover_repo_root(Path(__file__).parent)
    animations_root = root / "animations"

    skipped: list[str] = []
    manual_followups: list[str] = []

    def plan_all() -> tuple[list[RenameOp], list[RemoveOp]]:
        r_ops: list[RenameOp] = []
        rm_ops: list[RemoveOp] = []

        if not animations_root.exists():
            r_ops.extend(plan_move_top_level_into_animations(root))
            manual_followups.append(
                "Review proposed move of top-level category folders into `animations/` (to match desired structure)."
            )

        if animations_root.exists():
            r_ops.extend(plan_kebab_case_renames(root, animations_root))
            rm_ops.extend(plan_junk_removals(root, animations_root))
        else:
            # Only scan inside non-protected top-level dirs (likely categories).
            for child in root.iterdir():
                if not child.is_dir():
                    continue
                if child.name in PROTECTED_TOP_LEVEL_DIRS or child.name == "animations":
                    continue
                r_ops.extend(plan_kebab_case_renames(root, child))
                rm_ops.extend(plan_junk_removals(root, child))

        r_ops, notes_a = resolve_conflicting_renames(root, r_ops)
        r_ops, notes_b = resolve_existing_destination_collisions(root, r_ops)
        skipped.extend(notes_a)
        skipped.extend(notes_b)
        return r_ops, rm_ops

    planned_renames, planned_removals = plan_all()

    conflicts = detect_conflicts(planned_renames)
    if conflicts:
        for dst, ops in conflicts.items():
            skipped.append(
                f"CONFLICT (unresolved): multiple sources would rename/move to `{rel_posix(dst, root)}`: "
                + ", ".join(f"`{rel_posix(op.src, root)}`" for op in ops)
            )
        skipped.append("STOP: unresolved naming conflicts remain; refusing to apply.")

    # Plan root .gitignore if missing
    gitignore_path = root / ".gitignore"
    gitignore_planned: WriteFileOp | None = None
    if not gitignore_path.exists():
        content = "\n".join(ROOT_GITIGNORE_LINES) + "\n"
        gitignore_planned = WriteFileOp(path=gitignore_path, content=content, reason="Add standard root .gitignore")

    renamed_applied: list[tuple[Path, Path, str]] = []
    removed_applied: list[tuple[Path, str]] = []
    reference_updates: dict[Path, int] = {}

    if is_apply:
        if conflicts:
            print("Refusing to apply due to conflicts. Re-run after resolving.")
            return 3

        # Apply renames first so references can be updated.
        applied_pairs: list[tuple[Path, Path]] = []

        # Phase 1: moves into animations/
        phase1 = [op for op in planned_renames if op.reason.startswith("Move top-level category")]
        phase2 = [op for op in planned_renames if op not in phase1]

        for op in sort_renames_for_apply(phase1):
            if not op.src.exists():
                skipped.append(f"SKIP (missing): `{rel_posix(op.src, root)}`")
                continue
            if op.dst.exists():
                skipped.append(f"SKIP (destination exists): `{rel_posix(op.src, root)}` → `{rel_posix(op.dst, root)}`")
                continue
            apply_rename(op)
            applied_pairs.append((op.src, op.dst))
            renamed_applied.append((op.src, op.dst, op.reason))

        # Re-plan after moves so we don't miss internal renames/removals.
        animations_root = root / "animations"
        planned_renames2, planned_removals2 = plan_all()
        phase2 = [op for op in planned_renames2 if not op.reason.startswith("Move top-level category")]

        for op in sort_renames_for_apply(phase2):
            if not op.src.exists():
                skipped.append(f"SKIP (missing): `{rel_posix(op.src, root)}`")
                continue
            apply_rename(op)
            applied_pairs.append((op.src, op.dst))
            renamed_applied.append((op.src, op.dst, op.reason))

        for op in planned_removals2:
            if not op.target.exists():
                continue
            apply_remove(op)
            removed_applied.append((op.target, op.reason))

        if gitignore_planned:
            gitignore_planned.path.write_text(gitignore_planned.content, encoding="utf-8")

        # Update references after filesystem changes
        reference_updates = update_references(root, [(a, b) for a, b in applied_pairs])
    else:
        # Dry run: include proposed actions in report
        renamed_applied = [(op.src, op.dst, op.reason) for op in planned_renames]
        removed_applied = [(op.target, op.reason) for op in planned_removals]

    report_path = root / "reports" / "cleanup-report.md"
    report = build_report(
        root=root,
        is_apply=is_apply,
        renamed=renamed_applied,
        removed=removed_applied,
        skipped=skipped,
        manual_followups=manual_followups,
        reference_updates=reference_updates,
        gitignore_planned=gitignore_planned,
    )
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(report, encoding="utf-8")

    # Console summary for quick preview
    print(f"[{now_iso()}] {'APPLY' if is_apply else 'DRY RUN'} complete.")
    print(f"Report: {report_path}")
    print(f"Renames: {len(renamed_applied)} | Removals: {len(removed_applied)} | Conflicts: {len(conflicts)}")
    if conflicts:
        print("Conflicts detected. See report section 'Skipped/Conflicts'.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

