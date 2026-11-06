// @vitest-environment node
import { describe, it, expect } from "vitest";
import { POST as createPkg, GET as getPkgs } from "@/app/api/packages/route";
import { PUT as updatePkg, DELETE as deletePkg } from "@/app/api/packages/[id]/route";
import { GET as getBaselines, PUT as updateBaselines } from "@/app/api/pricing-baselines/route";
import { PATCH as updateLeadStatus } from "@/app/api/leads/[id]/status/route";
import { POST as createLead } from "@/app/api/leads/route";

describe("Admin API Endpoints and CRUD Operations", () => {
  it("creates, retrieves, updates, and deletes a package", async () => {
    // 1. Create
    const createReq = new Request("http://localhost/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Tour Especial Disney & Star Wars",
        slug: "tour-especial-disney-star-wars",
        category: "disney",
        description: "Experiencia galáctica con pases temáticos y acceso preferencial.",
        durationDays: 5,
        priceFromUsd: "1150.00",
        installmentsText: "12 MSI de $96 USD",
        inclusions: ["3 días Disney", "Hotel temático"],
        imageUrl: "https://images.unsplash.com/photo-1597466599360-3b9775841aec",
        isFeatured: false,
      }),
    });

    const createRes = await createPkg(createReq);
    expect(createRes.status).toBe(201);
    const createJson = await createRes.json();
    const pkgId = createJson.package.id;
    expect(pkgId).toBeDefined();

    // 2. Retrieve
    const getRes = await getPkgs(new Request("http://localhost/api/packages"));
    const getJson = await getRes.json();
    expect(getJson.packages.some((p: any) => p.id === pkgId)).toBe(true);

    // 3. Update
    const updateReq = new Request(`http://localhost/api/packages/${pkgId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceFromUsd: "1250.00" }),
    });
    const updateRes = await updatePkg(updateReq, { params: Promise.resolve({ id: pkgId }) });
    expect(updateRes.status).toBe(200);

    // 4. Delete
    const deleteRes = await deletePkg(
      new Request(`http://localhost/api/packages/${pkgId}`, { method: "DELETE" }),
      { params: Promise.resolve({ id: pkgId }) }
    );
    expect(deleteRes.status).toBe(200);
  });

  it("updates pricing baselines via PUT /api/pricing-baselines", async () => {
    const updateReq = new Request("http://localhost/api/pricing-baselines", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinationKey: "disney",
        basePandiAdultUsd: "1550.00",
        basePandiChildUsd: "1250.00",
      }),
    });

    const res = await updateBaselines(updateReq);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.baseline.basePandiAdultUsd).toBe("1550.00");
  });

  it("updates lead status via PATCH /api/leads/[id]/status", async () => {
    // Create a lead first
    const leadReq = new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Valeria Gómez",
        contact: "+52 33 1122 3344",
        folio: "PANDI-STATUS-TEST-1",
        destination: "Crucero Caribe",
        adults: 2,
        children: 0,
        travelMonth: "mayo",
        experienceStyle: "esencial",
        estimatedPandiUsd: 1780,
        estimatedDiyUsd: 2380,
      }),
    });
    const leadRes = await createLead(leadReq);
    const leadJson = await leadRes.json();
    const leadId = leadJson.lead.id;

    // Toggle status to contacted
    const statusReq = new Request(`http://localhost/api/leads/${leadId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "contacted" }),
    });

    const statusRes = await updateLeadStatus(statusReq, { params: Promise.resolve({ id: leadId }) });
    expect(statusRes.status).toBe(200);
    const statusJson = await statusRes.json();
    expect(statusJson.lead.status).toBe("contacted");
  });
});
