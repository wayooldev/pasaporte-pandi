import { describe, it, expect } from "vitest";
import { calculateQuote, generateQuoteFolio, DESTINATIONS_CONFIG } from "@/lib/calculator";

describe("Quote Pricing & DIY Savings Calculator Engine", () => {
  it("generates a valid folio starting with PANDI-", () => {
    const folio = generateQuoteFolio();
    expect(folio).toMatch(/^PANDI-\d{4}-[A-Z0-9]{4}$/);
  });

  it("calculates Disney package for standard 2 adults and 1 child", () => {
    const result = calculateQuote({
      destination: "disney",
      adults: 2,
      children: 1,
      travelMonth: "febrero",
      experienceStyle: "esencial",
    });

    expect(result.destinationKey).toBe("disney");
    expect(result.totalTravelers).toBe(3);
    expect(result.adults).toBe(2);
    expect(result.children).toBe(1);
    expect(result.pandiTotalUsd).toBeGreaterThan(0);
    expect(result.diyTotalUsd).toBeGreaterThan(result.pandiTotalUsd);
    expect(result.savingsUsd).toBe(result.diyTotalUsd - result.pandiTotalUsd);
    expect(result.savingsPercentage).toBeGreaterThan(0);
    expect(result.inclusions.length).toBeGreaterThan(3);
    expect(result.diyRisks.length).toBeGreaterThan(2);
  });

  it("correctly handles high season multiplier (e.g. July vs. January)", () => {
    const lowSeason = calculateQuote({
      destination: "crucero",
      adults: 2,
      children: 0,
      travelMonth: "septiembre",
      experienceStyle: "esencial",
    });

    const highSeason = calculateQuote({
      destination: "crucero",
      adults: 2,
      children: 0,
      travelMonth: "julio",
      experienceStyle: "esencial",
    });

    expect(highSeason.pandiTotalUsd).toBeGreaterThan(lowSeason.pandiTotalUsd);
    expect(highSeason.diyTotalUsd).toBeGreaterThan(lowSeason.diyTotalUsd);
  });

  it("correctly scales with experience style multiplier (deluxe > esencial)", () => {
    const esencial = calculateQuote({
      destination: "europa",
      adults: 2,
      children: 0,
      travelMonth: "mayo",
      experienceStyle: "esencial",
    });

    const deluxe = calculateQuote({
      destination: "europa",
      adults: 2,
      children: 0,
      travelMonth: "mayo",
      experienceStyle: "deluxe",
    });

    expect(deluxe.pandiTotalUsd).toBeGreaterThan(esencial.pandiTotalUsd);
    expect(deluxe.pandiPerPersonUsd).toBeGreaterThan(esencial.pandiPerPersonUsd);
  });

  it("handles edge cases: single adult, zero children", () => {
    const single = calculateQuote({
      destination: "playa",
      adults: 1,
      children: 0,
      travelMonth: "octubre",
      experienceStyle: "esencial",
    });

    expect(single.totalTravelers).toBe(1);
    expect(single.pandiPerPersonUsd).toBe(single.pandiTotalUsd);
    expect(single.savingsUsd).toBeGreaterThan(100);
  });

  it("handles large family parties (4 adults, 4 children)", () => {
    const largeParty = calculateQuote({
      destination: "disney",
      adults: 4,
      children: 4,
      travelMonth: "diciembre",
      experienceStyle: "clasico",
    });

    expect(largeParty.totalTravelers).toBe(8);
    expect(largeParty.pandiTotalUsd).toBeGreaterThan(8000);
    expect(largeParty.savingsUsd).toBeGreaterThan(1500);
  });
});
