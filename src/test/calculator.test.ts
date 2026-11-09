import { describe, it, expect } from "vitest";
import {
  buildQuoteRequest,
  calculateQuote,
  generateQuoteFolio,
  toDestinationKey,
} from "@/lib/calculator";

describe("Quote request builder (public flow)", () => {
  it("generates a valid folio starting with PANDI-", () => {
    const folio = generateQuoteFolio();
    expect(folio).toMatch(/^PANDI-\d{4}-[A-Z0-9]{4}$/);
  });

  it("builds a request with folio, destination label, and inclusions without requiring experience style", () => {
    const result = buildQuoteRequest({
      destination: "disney",
      adults: 2,
      children: 1,
      travelMonth: "julio",
    });

    expect(result.destinationKey).toBe("disney");
    expect(result.destinationLabel).toContain("Disney");
    expect(result.totalTravelers).toBe(3);
    expect(result.adults).toBe(2);
    expect(result.children).toBe(1);
    expect(result.travelMonth).toBe("julio");
    expect(result.folio).toMatch(/^PANDI-\d{4}-[A-Z0-9]{4}$/);
    expect(result.inclusions.length).toBeGreaterThan(3);
    expect(result.pandiTotalUsd).toBe(0);
    expect(result.diyTotalUsd).toBe(0);
    expect(result.packageTitle).toBeUndefined();
  });

  it("preserves optional package title and slug on the quote request", () => {
    const result = buildQuoteRequest({
      destination: "disney",
      adults: 2,
      children: 1,
      travelMonth: "julio",
      packageTitle: "Magia Total en Orlando: Disney & Universal",
      packageSlug: "magia-total-orlando",
    });

    expect(result.packageTitle).toBe("Magia Total en Orlando: Disney & Universal");
    expect(result.packageSlug).toBe("magia-total-orlando");
    expect(result.pandiTotalUsd).toBe(0);
  });

  it("uses destinationLabel override for package-driven requests instead of category label", () => {
    const result = buildQuoteRequest({
      destination: "playa",
      adults: 2,
      children: 1,
      travelMonth: "julio",
      packageTitle: "Punta Cana Familiar All-Inclusive",
      packageSlug: "punta-cana-familia-todo-incluido",
      destinationLabel: "Punta Cana Familiar All-Inclusive",
    });

    expect(result.destinationKey).toBe("playa");
    expect(result.destinationLabel).toBe("Punta Cana Familiar All-Inclusive");
    expect(result.destinationLabel).not.toContain("Cancún");
  });
});

describe("toDestinationKey", () => {
  it("maps package categories to destination keys and falls back safely", () => {
    expect(toDestinationKey("crucero")).toBe("crucero");
    expect(toDestinationKey("unknown")).toBe("disney");
  });
});

describe("Quote Pricing & DIY Savings Calculator Engine", () => {
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
