import { describe, it, expect } from "vitest";
import { brandConfig } from "@/config/brand";
import { cn } from "@/lib/utils";

describe("Brand Configuration and Utils", () => {
  it("defines brand name and basic contact details", () => {
    expect(brandConfig.name).toBe("Pasaporte Pandi");
    expect(brandConfig.contact.whatsapp).toBeDefined();
    expect(brandConfig.trustBadges.length).toBeGreaterThan(0);
    expect(brandConfig.benefits.length).toBeGreaterThan(0);
  });

  it("exposes evergreen specialties, site URL, and sameAs channels", () => {
    expect(brandConfig.siteUrl).toBe("https://pasaportepandi.com");
    expect(brandConfig.specialties.map((s) => s.key)).toEqual([
      "europa",
      "disney",
      "cruceros",
      "playas",
    ]);
    expect(brandConfig.sameAs).toEqual([
      brandConfig.social.instagram,
      brandConfig.social.facebook,
      brandConfig.social.tiktok,
      brandConfig.social.linktree,
    ]);
    expect(brandConfig.description).not.toMatch(/ahorro visible|DIY|desde \$/i);
  });

  it("merges Tailwind classes correctly via cn", () => {
    const result = cn("p-4", "text-center", false && "hidden", "p-6");
    expect(result).toBe("text-center p-6");
  });
});
