import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020";

import type { AnimationMeta, ValidationIssue } from "./content-types";

const META_FILE_NAME = "meta.json";
const THUMBNAIL_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const COMPONENT_EXTENSIONS = new Set([".tsx", ".html"]);

function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function isIsoDateString(value: string): boolean {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function safeReadDir(dirPath: string): Array<{ name: string; isDirectory: boolean }> {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true }).map((entry) => ({
      name: entry.name,
      isDirectory: entry.isDirectory(),
    }));
  } catch {
    return [];
  }
}

function loadSchema(repoRoot: string): unknown {
  const schemaPath = path.join(repoRoot, "schemas", "animation-meta.schema.json");
  return JSON.parse(fs.readFileSync(schemaPath, "utf8"));
}

function findAnimationUnitMetaFiles(repoRoot: string): string[] {
  const animationsRoot = path.join(repoRoot, "animations");
  const metaPaths: string[] = [];

  for (const topEntry of safeReadDir(animationsRoot).filter(
    (e) => e.isDirectory && !e.name.startsWith(".")
  )) {
    const topDir = path.join(animationsRoot, topEntry.name);
    const directMeta = path.join(topDir, META_FILE_NAME);

    if (fs.existsSync(directMeta)) {
      // Flat: animations/<slug>/meta.json
      metaPaths.push(directMeta);
    } else {
      // Nested: animations/<category>/<slug>/meta.json
      for (const subEntry of safeReadDir(topDir).filter(
        (e) => e.isDirectory && !e.name.startsWith(".")
      )) {
        const nestedMeta = path.join(topDir, subEntry.name, META_FILE_NAME);
        if (fs.existsSync(nestedMeta)) {
          metaPaths.push(nestedMeta);
        }
      }
    }
  }

  return metaPaths;
}

function validateFileReferences(repoRoot: string, meta: AnimationMeta, filePath: string): string[] {
  const errors: string[] = [];
  const unitDirName = path.basename(path.dirname(filePath));

  if (meta.id !== unitDirName) {
    errors.push(`id must match folder slug (${unitDirName}).`);
  }

  const componentAbsPath = path.join(repoRoot, meta.componentPath);
  if (!fs.existsSync(componentAbsPath)) {
    errors.push(`componentPath not found: ${meta.componentPath}`);
  } else {
    const compExt = path.extname(meta.componentPath).toLowerCase();
    if (!COMPONENT_EXTENSIONS.has(compExt)) {
      errors.push(`componentPath extension must be .tsx or .html: ${meta.componentPath}`);
    }
  }

  const thumbnailAbsPath = path.join(repoRoot, meta.thumbnail);
  if (!fs.existsSync(thumbnailAbsPath)) {
    errors.push(`thumbnail not found: ${meta.thumbnail}`);
  } else {
    const extension = path.extname(meta.thumbnail).toLowerCase();
    if (!THUMBNAIL_EXTENSIONS.has(extension)) {
      errors.push(`thumbnail extension must be one of png/jpg/jpeg/webp: ${meta.thumbnail}`);
    }
  }

  if (!isIsoDateString(meta.createdAt)) {
    errors.push(`createdAt is not a valid ISO datetime: ${meta.createdAt}`);
  }

  if (!isIsoDateString(meta.updatedAt)) {
    errors.push(`updatedAt is not a valid ISO datetime: ${meta.updatedAt}`);
  }

  const createdMs = new Date(meta.createdAt).getTime();
  const updatedMs = new Date(meta.updatedAt).getTime();
  if (!Number.isNaN(createdMs) && !Number.isNaN(updatedMs) && updatedMs < createdMs) {
    errors.push("updatedAt must be greater than or equal to createdAt.");
  }

  return errors;
}

export function loadAndValidateAnimationMeta(repoRoot: string): {
  metas: AnimationMeta[];
  issues: ValidationIssue[];
} {
  const schema = loadSchema(repoRoot);
  const validator = new Ajv2020({ allErrors: true, strict: true }).compile<AnimationMeta>(schema);
  const metaPaths = findAnimationUnitMetaFiles(repoRoot);

  if (metaPaths.length === 0) {
    return {
      metas: [],
      issues: [
        {
          filePath: toPosixPath(path.join(repoRoot, "animations")),
          messages: ["No animations/<slug>/meta.json files found."],
        },
      ],
    };
  }

  const issues: ValidationIssue[] = [];
  const metas: AnimationMeta[] = [];
  const seenIds = new Map<string, string>();

  for (const metaPath of metaPaths) {
    const relPath = toPosixPath(path.relative(repoRoot, metaPath));
    let parsed: unknown;

    try {
      parsed = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      issues.push({ filePath: relPath, messages: [`Invalid JSON: ${message}`] });
      continue;
    }

    const messages: string[] = [];
    if (!validator(parsed)) {
      for (const issue of validator.errors ?? []) {
        const instancePath = issue.instancePath || "/";
        messages.push(`${instancePath} ${issue.message}`.trim());
      }
    }

    if (messages.length > 0) {
      issues.push({ filePath: relPath, messages });
      continue;
    }

    const meta = parsed as AnimationMeta;
    const semanticMessages = validateFileReferences(repoRoot, meta, metaPath);
    if (semanticMessages.length > 0) {
      issues.push({ filePath: relPath, messages: semanticMessages });
      continue;
    }

    const existing = seenIds.get(meta.id);
    if (existing) {
      issues.push({
        filePath: relPath,
        messages: [`Duplicate id '${meta.id}' already declared in ${existing}`],
      });
      continue;
    }

    seenIds.set(meta.id, relPath);
    metas.push(meta);
  }

  return { metas, issues };
}
