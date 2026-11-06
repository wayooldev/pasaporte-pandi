import { pgTable, uuid, varchar, text, integer, numeric, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const packages = pgTable("packages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 50 }).notNull(), // 'disney' | 'crucero' | 'europa' | 'playa'
  description: text("description").notNull(),
  durationDays: integer("duration_days").notNull(),
  priceFromUsd: numeric("price_from_usd", { precision: 10, scale: 2 }).notNull(),
  installmentsText: varchar("installments_text", { length: 100 }).notNull(),
  inclusions: jsonb("inclusions").$type<string[]>().notNull(),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const quoteLeads = pgTable("quote_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  folio: varchar("folio", { length: 30 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 150 }).notNull(),
  customerContact: varchar("customer_contact", { length: 100 }).notNull(),
  destination: varchar("destination", { length: 100 }).notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0).notNull(),
  travelMonth: varchar("travel_month", { length: 50 }).notNull(),
  experienceStyle: varchar("experience_style", { length: 50 }).notNull(),
  estimatedPandiUsd: numeric("estimated_pandi_usd", { precision: 10, scale: 2 }).notNull(),
  estimatedDiyUsd: numeric("estimated_diy_usd", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 30 }).default("new").notNull(), // 'new' | 'contacted' | 'converted'
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const pricingBaselines = pgTable("pricing_baselines", {
  id: uuid("id").defaultRandom().primaryKey(),
  destinationKey: varchar("destination_key", { length: 50 }).notNull().unique(),
  destinationLabel: varchar("destination_label", { length: 100 }).notNull(),
  basePandiAdultUsd: numeric("base_pandi_adult_usd", { precision: 10, scale: 2 }).notNull(),
  basePandiChildUsd: numeric("base_pandi_child_usd", { precision: 10, scale: 2 }).notNull(),
  baseDiyAdultUsd: numeric("base_diy_adult_usd", { precision: 10, scale: 2 }).notNull(),
  baseDiyChildUsd: numeric("base_diy_child_usd", { precision: 10, scale: 2 }).notNull(),
  seasonMultipliers: jsonb("season_multipliers").$type<Record<string, number>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;
export type QuoteLead = typeof quoteLeads.$inferSelect;
export type NewQuoteLead = typeof quoteLeads.$inferInsert;
export type PricingBaseline = typeof pricingBaselines.$inferSelect;
export type NewPricingBaseline = typeof pricingBaselines.$inferInsert;
