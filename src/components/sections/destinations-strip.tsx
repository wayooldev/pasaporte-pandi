"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

const DESTINATIONS = [
  {
    key: "europa",
    title: "Europa",
    subtitle: "Madrid · París · Roma",
    image: "/brand/destinations/europa.jpg",
    href: "#paquetes",
  },
  {
    key: "disney",
    title: "Disney & Universal",
    subtitle: "Orlando mágico",
    image: "/brand/destinations/disney.jpg",
    href: "#paquetes",
  },
  {
    key: "crucero",
    title: "Cruceros",
    subtitle: "Caribe & Mediterráneo",
    image: "/brand/destinations/crucero.jpg",
    href: "#paquetes",
  },
  {
    key: "playa",
    title: "Playas",
    subtitle: "Cancún · Cabos · Punta Cana",
    image: "/brand/destinations/playa.jpg",
    href: "#paquetes",
  },
] as const;

export function DestinationsStrip() {
  return (
    <section className="border-b border-border/60 bg-card/40 py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Destinos Pandi</p>
          <h2 className="font-display mt-2 text-2xl font-black text-foreground sm:text-3xl">
            Elige tu próxima aventura
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {DESTINATIONS.map((d) => (
            <StaggerItem key={d.key}>
              <Link
                href={d.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-3xl shadow-md ring-1 ring-border/80"
              >
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-display text-lg font-bold leading-tight">{d.title}</p>
                  <p className="text-xs font-medium text-white/85">{d.subtitle}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
