import { dataRepository } from "@/db";
import { HomePageClient } from "@/components/home-page-client";
import { EvergreenFaq } from "@/components/sections/evergreen-faq";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const packages = await dataRepository.getPackages();

  return (
    <>
      <JsonLdScript data={buildFaqPageJsonLd()} />
      <HomePageClient initialPackages={packages}>
        <EvergreenFaq />
      </HomePageClient>
    </>
  );
}
