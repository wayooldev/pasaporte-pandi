import { describe, it, expect } from "vitest";
import { generateWhatsAppHandoffUrl } from "@/lib/whatsapp";
import { buildQuoteRequest } from "@/lib/calculator";

describe("WhatsApp Direct Handoff Utility", () => {
  it("generates wa.me URL with solicitud details, contact, and notes without prices", () => {
    const quote = buildQuoteRequest({
      destination: "disney",
      adults: 2,
      children: 2,
      travelMonth: "julio",
    });

    const url = generateWhatsAppHandoffUrl(quote, {
      customerName: "Mariana Ruiz",
      phone: "+52 55 1234 5678",
      email: "mariana@email.com",
      notes: "Preferimos salida la 2a semana",
    });

    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=.+$/);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain(quote.folio);
    expect(decoded).toContain("Mariana Ruiz");
    expect(decoded).toContain("Orlando: Disney & Universal");
    expect(decoded).toContain("2 Adulto(s), 2 Menor(es)");
    expect(decoded).toContain("JULIO");
    expect(decoded).toContain("solicitar una cotización formal");
    expect(decoded).toContain("+52 55 1234 5678");
    expect(decoded).toContain("mariana@email.com");
    expect(decoded).toContain("Preferimos salida la 2a semana");
    expect(decoded).not.toContain("Presupuesto estimado");
    expect(decoded).not.toContain("Ahorro estimado");
    expect(decoded).not.toMatch(/\$\d/);
  });

  it("includes package reference when present and still omits list prices", () => {
    const quote = buildQuoteRequest({
      destination: "disney",
      adults: 2,
      children: 1,
      travelMonth: "julio",
      packageTitle: "Magia Total en Orlando: Disney & Universal",
      packageSlug: "magia-total-orlando",
    });

    const url = generateWhatsAppHandoffUrl(quote, { customerName: "Ana" });
    const decoded = decodeURIComponent(url);

    expect(decoded).toContain(quote.folio);
    expect(decoded).toContain("Magia Total en Orlando: Disney & Universal");
    // Con destinationLabel genérico de categoría, el paquete aparece como línea aparte
    expect(decoded).toContain("*Paquete:*");
    expect(decoded).not.toContain("USD");
    expect(decoded).not.toContain("MSI");
    expect(decoded).not.toMatch(/desde \$/i);
  });
});
