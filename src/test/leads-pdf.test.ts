// @vitest-environment node
import { describe, it, expect } from "vitest";
import { POST as leadsPost, GET as leadsGet } from "@/app/api/leads/route";
import { POST as pdfPost } from "@/app/api/quote-pdf/route";
import { buildQuoteRequest } from "@/lib/calculator";

describe("Lead Capture and PDF Generation API", () => {
  it("persists a lead with phone + email via POST /api/leads and returns it via GET", async () => {
    const payload = {
      name: "Rodrigo Morales",
      phone: "+52 55 9876 5432",
      email: "rodrigo@email.com",
      notes: "Cabina con balcón",
      folio: "PANDI-TEST-LEAD-99",
      destination: "Orlando: Disney & Universal",
      adults: 2,
      children: 2,
      travelMonth: "julio",
      experienceStyle: "clasico",
      estimatedPandiUsd: 0,
      estimatedDiyUsd: 0,
    };

    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await leadsPost(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.lead.folio).toBe("PANDI-TEST-LEAD-99");
    expect(json.lead.customerName).toBe("Rodrigo Morales");
    expect(json.lead.customerContact).toBe("+52 55 9876 5432");
    expect(json.lead.customerEmail).toBe("rodrigo@email.com");

    const getRes = await leadsGet();
    const getJson = await getRes.json();
    expect(getJson.success).toBe(true);
    expect(getJson.leads.some((l: any) => l.folio === "PANDI-TEST-LEAD-99")).toBe(true);
  });

  it("validates input and returns 400 when phone is missing", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Solo Nombre", folio: "PANDI-X" }),
    });

    const res = await leadsPost(req);
    expect(res.status).toBe(400);
  });

  it("accepts leads without email and skips advisor email", async () => {
    const payload = {
      name: "Sin Correo",
      phone: "+52 55 9999 8888",
      email: "",
      folio: "PANDI-TEST-NO-EMAIL",
      destination: "Cancún & Riviera Maya All-Inclusive",
      adults: 2,
      children: 0,
      travelMonth: "mayo",
    };

    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await leadsPost(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.emailSent).toBe(false);
  });

  it("generates a valid application/pdf response from /api/quote-pdf", async () => {
    const quote = buildQuoteRequest({
      destination: "crucero",
      adults: 2,
      children: 1,
      travelMonth: "agosto",
    });

    const req = new Request("http://localhost/api/quote-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quote,
        customerName: "Lucía Méndez",
      }),
    });

    const res = await pdfPost(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("application/pdf");

    const arrayBuffer = await res.arrayBuffer();
    expect(arrayBuffer.byteLength).toBeGreaterThan(1000);
  });
});
