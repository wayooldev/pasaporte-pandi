import { brandConfig } from "@/config/brand";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "Organization"],
    name: brandConfig.name,
    legalName: brandConfig.legalName,
    url: brandConfig.siteUrl,
    logo: `${brandConfig.siteUrl}/brand/pandi-logo.png`,
    description: brandConfig.description,
    email: brandConfig.contact.email,
    telephone: brandConfig.contact.whatsapp,
    sameAs: brandConfig.sameAs,
    areaServed: {
      "@type": "Country",
      name: "Mexico",
    },
    knowsAbout: brandConfig.specialties.map((s) => s.label),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: brandConfig.contact.whatsapp,
        email: brandConfig.contact.email,
        availableLanguage: ["es"],
      },
    ],
  };
}

export function buildFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brandConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
