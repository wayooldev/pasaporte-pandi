import { dataRepository } from "./index";

async function main() {
  console.log("Seeding Pasaporte Pandi database...");
  const result = await dataRepository.seedDatabase();
  console.log(
    `✓ Seed complete: ${result.packagesCount} packages, ${result.baselinesCount} pricing baselines, ${result.leadsCount} sample leads.`
  );
}

main().catch((err) => {
  console.error("Seed execution failed:", err);
  process.exit(1);
});
