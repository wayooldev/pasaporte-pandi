import { describe, expect, it } from "vitest";
import { brandConfig } from "@/config/brand";
import { buildFaqPageJsonLd, buildOrganizationJsonLd } from "@/lib/seo/json-ld";

describe("evergreen SEO JSON-LD", () => {
  it("builds TravelAgency entity with sameAs and without offers or prices", () => {
    const jsonLd = buildOrganizationJsonLd();
    const serialized = JSON.stringify(jsonLd);

    expect(jsonLd["@type"]).toEqual(["TravelAgency", "Organization"]);
    expect(jsonLd.url).toBe(brandConfig.siteUrl);
    expect(jsonLd.sameAs).toEqual(brandConfig.sameAs);
    expect(jsonLd.sameAs).toContain(brandConfig.social.instagram);
    expect(jsonLd.sameAs).toContain(brandConfig.social.facebook);
    expect(jsonLd.sameAs).toContain(brandConfig.social.tiktok);
    expect(jsonLd.sameAs).toContain(brandConfig.social.linktree);
    expect(jsonLd.knowsAbout).toEqual(["Europa", "Disney", "Cruceros", "Playas"]);
    expect(serialized).not.toMatch(/Offer|price|priceCurrency|AggregateOffer/i);
  });

  it("builds FAQPage JSON-LD that mirrors visible FAQ copy without prices", () => {
    const jsonLd = buildFaqPageJsonLd();
    const serialized = JSON.stringify(jsonLd);

    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity).toHaveLength(brandConfig.faqs.length);
    expect(jsonLd.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: brandConfig.faqs[0].question,
      acceptedAnswer: {
        "@type": "Answer",
        text: brandConfig.faqs[0].answer,
      },
    });
    expect(serialized).not.toMatch(/\$\d|USD|MXN|precio desde/i);
  });
});
