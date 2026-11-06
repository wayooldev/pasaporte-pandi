import { dataRepository } from "@/db";
import { HomePageClient } from "@/components/home-page-client";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const packages = await dataRepository.getPackages();

  return <HomePageClient initialPackages={packages} />;
}
