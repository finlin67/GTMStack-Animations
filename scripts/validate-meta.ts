import { loadAndValidateAnimationMeta } from "./content-lib";

function main(): void {
  const repoRoot = process.cwd();
  const { metas, issues } = loadAndValidateAnimationMeta(repoRoot);

  if (issues.length > 0) {
    console.error("Metadata validation failed:\n");
    for (const issue of issues) {
      console.error(`- ${issue.filePath}`);
      for (const message of issue.messages) {
        console.error(`  - ${message}`);
      }
    }
    console.error(`\nValidated ${metas.length + issues.length} metadata file(s): ${metas.length} passed, ${issues.length} failed.`);
    process.exit(1);
  }

  for (const meta of metas) {
    console.log(`OK  ${meta.id}`);
  }

  console.log(`Validated ${metas.length} metadata file(s): ${metas.length} passed, 0 failed.`);
}

main();