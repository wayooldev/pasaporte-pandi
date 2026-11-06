import { describe, it, expect, beforeEach } from "vitest";
import { dataRepository } from "@/db";
import { initialPackages, initialPricingBaselines } from "@/db/seed-data";

describe("Database Client and Mock Fallback Repository", () => {
  beforeEach(async () => {
    await dataRepository.seedDatabase();
  });

  it("retrieves packages and filters by category", async () => {
    const all = await dataRepository.getPackages();
    expect(all.length).toBeGreaterThanOrEqual(initialPackages.length);

    const disney = await dataRepository.getPackages("disney");
    expect(disney.length).toBeGreaterThanOrEqual(1);
    expect(disney.every((p) => p.category === "disney")).toBe(true);

    const playa = await dataRepository.getPackages("playa");
    expect(playa.length).toBeGreaterThanOrEqual(1);
    expect(playa.some((p) => /Cancún|Cabos|Punta Cana/i.test(p.title))).toBe(true);
  });

  it("finds a package by slug", async () => {
    const pkg = await dataRepository.getPackageBySlug("crucero-caribe-magico-bahamas");
    expect(pkg).not.toBeNull();
    expect(pkg?.category).toBe("crucero");
  });

  it("persists a new quote lead and updates status", async () => {
    const folio = `PANDI-TEST-${Date.now()}`;
    const newLead = await dataRepository.saveQuoteLead({
      folio,
      customerName: "Camila Torres",
      customerContact: "+52 55 1234 5678",
      destination: "Orlando: Disney & Universal",
      adults: 2,
      children: 2,
      travelMonth: "julio",
      experienceStyle: "deluxe",
      estimatedPandiUsd: "5200.00",
      estimatedDiyUsd: "6800.00",
      status: "new",
    });

    expect(newLead.id).toBeDefined();
    expect(newLead.folio).toBe(folio);

    const leads = await dataRepository.getQuoteLeads();
    expect(leads.some((l) => l.folio === folio)).toBe(true);

    const updated = await dataRepository.updateQuoteLeadStatus(newLead.id, "contacted");
    expect(updated?.status).toBe("contacted");
  });

  it("reads and updates pricing baselines", async () => {
    const baselines = await dataRepository.getPricingBaselines();
    expect(baselines.length).toBeGreaterThanOrEqual(initialPricingBaselines.length);

    const updated = await dataRepository.updatePricingBaseline("disney", {
      basePandiAdultUsd: "1500.00",
    });
    expect(updated?.basePandiAdultUsd).toBe("1500.00");

    // restore seed baseline so live Neon stays consistent after tests
    await dataRepository.updatePricingBaseline("disney", {
      basePandiAdultUsd: "1450.00",
    });
  });
});
