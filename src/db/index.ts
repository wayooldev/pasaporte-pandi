import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { initialPackages, initialPricingBaselines, initialQuoteLeads } from "./seed-data";
import { eq, desc } from "drizzle-orm";

const databaseUrl = process.env.DATABASE_URL;

export const isLiveDb = Boolean(databaseUrl && databaseUrl.startsWith("postgres"));

const sqlClient = isLiveDb ? neon(databaseUrl!) : null;
export const db = sqlClient ? drizzle(sqlClient, { schema }) : null;

// In-Memory fallback store for local development & automated testing
class MockDataStore {
  packages: schema.Package[] = [];
  quoteLeads: schema.QuoteLead[] = [];
  pricingBaselines: schema.PricingBaseline[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.packages = initialPackages.map((p, index) => ({
      ...p,
      id: `pkg-${index + 1}-0000-0000-000000000000`,
      isFeatured: p.isFeatured ?? false,
      createdAt: new Date(),
    }));

    this.pricingBaselines = initialPricingBaselines.map((pb, index) => ({
      ...pb,
      id: `pb-${index + 1}-0000-0000-000000000000`,
      updatedAt: new Date(),
    }));

    this.quoteLeads = initialQuoteLeads.map((lead, index) => ({
      ...lead,
      id: `lead-${index + 1}-0000-0000-000000000000`,
      status: lead.status ?? "new",
      children: lead.children ?? 0,
      createdAt: new Date(Date.now() - index * 86_400_000),
    }));
  }
}

const mockStore = new MockDataStore();

export const dataRepository = {
  async getPackages(category?: string): Promise<schema.Package[]> {
    if (db) {
      try {
        const query = category && category !== "todos"
          ? db.select().from(schema.packages).where(eq(schema.packages.category, category)).orderBy(desc(schema.packages.createdAt))
          : db.select().from(schema.packages).orderBy(desc(schema.packages.createdAt));
        return await query;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    if (!category || category === "todos") {
      return [...mockStore.packages];
    }
    return mockStore.packages.filter((p) => p.category === category);
  },

  async getPackageBySlug(slug: string): Promise<schema.Package | null> {
    if (db) {
      try {
        const results = await db.select().from(schema.packages).where(eq(schema.packages.slug, slug)).limit(1);
        if (results.length > 0) return results[0];
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    return mockStore.packages.find((p) => p.slug === slug) || null;
  },

  async createPackage(data: schema.NewPackage): Promise<schema.Package> {
    if (db) {
      try {
        const [created] = await db.insert(schema.packages).values(data).returning();
        return created;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const created: schema.Package = {
      ...data,
      id: `pkg-custom-${Date.now()}`,
      isFeatured: data.isFeatured ?? false,
      createdAt: new Date(),
    };
    mockStore.packages.unshift(created);
    return created;
  },

  async updatePackage(id: string, data: Partial<schema.NewPackage>): Promise<schema.Package | null> {
    if (db) {
      try {
        const [updated] = await db.update(schema.packages).set(data).where(eq(schema.packages.id, id)).returning();
        return updated || null;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const index = mockStore.packages.findIndex((p) => p.id === id);
    if (index === -1) return null;
    mockStore.packages[index] = { ...mockStore.packages[index], ...data };
    return mockStore.packages[index];
  },

  async deletePackage(id: string): Promise<boolean> {
    if (db) {
      try {
        await db.delete(schema.packages).where(eq(schema.packages.id, id));
        return true;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const initialLength = mockStore.packages.length;
    mockStore.packages = mockStore.packages.filter((p) => p.id !== id);
    return mockStore.packages.length < initialLength;
  },

  async getQuoteLeads(): Promise<schema.QuoteLead[]> {
    if (db) {
      try {
        return await db.select().from(schema.quoteLeads).orderBy(desc(schema.quoteLeads.createdAt));
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    return [...mockStore.quoteLeads];
  },

  async saveQuoteLead(lead: schema.NewQuoteLead): Promise<schema.QuoteLead> {
    if (db) {
      try {
        const [saved] = await db.insert(schema.quoteLeads).values(lead).returning();
        return saved;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const saved: schema.QuoteLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: lead.status || "new",
      children: lead.children || 0,
      createdAt: new Date(),
    };
    mockStore.quoteLeads.unshift(saved);
    return saved;
  },

  async updateQuoteLeadStatus(id: string, status: string): Promise<schema.QuoteLead | null> {
    if (db) {
      try {
        const [updated] = await db.update(schema.quoteLeads).set({ status }).where(eq(schema.quoteLeads.id, id)).returning();
        return updated || null;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const target = mockStore.quoteLeads.find((l) => l.id === id);
    if (!target) return null;
    target.status = status;
    return target;
  },

  async getPricingBaselines(): Promise<schema.PricingBaseline[]> {
    if (db) {
      try {
        return await db.select().from(schema.pricingBaselines);
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    return [...mockStore.pricingBaselines];
  },

  async updatePricingBaseline(destinationKey: string, data: Partial<schema.NewPricingBaseline>): Promise<schema.PricingBaseline | null> {
    if (db) {
      try {
        const [updated] = await db
          .update(schema.pricingBaselines)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(schema.pricingBaselines.destinationKey, destinationKey))
          .returning();
        return updated || null;
      } catch (e) {
        console.warn("Live DB error, falling back to mock store:", e);
      }
    }

    const index = mockStore.pricingBaselines.findIndex((pb) => pb.destinationKey === destinationKey);
    if (index === -1) return null;
    mockStore.pricingBaselines[index] = {
      ...mockStore.pricingBaselines[index],
      ...data,
      updatedAt: new Date(),
    };
    return mockStore.pricingBaselines[index];
  },

  async seedDatabase(): Promise<{
    packagesCount: number;
    baselinesCount: number;
    leadsCount: number;
  }> {
    if (db) {
      for (const pkg of initialPackages) {
        await db.insert(schema.packages).values(pkg).onConflictDoNothing();
      }
      for (const baseline of initialPricingBaselines) {
        await db.insert(schema.pricingBaselines).values(baseline).onConflictDoNothing();
      }
      for (const lead of initialQuoteLeads) {
        await db.insert(schema.quoteLeads).values(lead).onConflictDoNothing();
      }
      const allPkgs = await db.select().from(schema.packages);
      const allBaselines = await db.select().from(schema.pricingBaselines);
      const allLeads = await db.select().from(schema.quoteLeads);
      return {
        packagesCount: allPkgs.length,
        baselinesCount: allBaselines.length,
        leadsCount: allLeads.length,
      };
    }

    mockStore.reset();
    return {
      packagesCount: mockStore.packages.length,
      baselinesCount: mockStore.pricingBaselines.length,
      leadsCount: mockStore.quoteLeads.length,
    };
  },
};
