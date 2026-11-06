import { describe, it, expect } from "vitest";
import { generateWhatsAppHandoffUrl } from "@/lib/whatsapp";
import { calculateQuote } from "@/lib/calculator";

describe("WhatsApp Direct Handoff Utility", () => {
  it("generates correctly formatted wa.me URL containing quote folio and traveler party", () => {
    const quote = calculateQuote({
      destination: "disney",
      adults: 2,
      children: 2,
      travelMonth: "julio",
      experienceStyle: "deluxe",
    });

    const url = generateWhatsAppHandoffUrl(quote, "Mariana Ruiz");

    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+$/);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(quote.folio);
    expect(decoded).toContain("Mariana Ruiz");
    expect(decoded).toContain("Orlando: Disney & Universal");
    expect(decoded).toContain("2 Adulto(s), 2 Menor(es)");
    expect(decoded).toContain("JULIO");
    expect(decoded).toContain("Ahorro estimado vs por mi cuenta");
  });
});
