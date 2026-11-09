"use client";

import React, { useState } from "react";
import { Package } from "@/db/schema";
import { QuoteCalculationResult } from "@/lib/calculator";
import { PackageCard } from "./package-card";
import { Sparkles, Compass } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

interface PackagesCatalogProps {
  initialPackages: Package[];
  onRequestQuote?: (quote: QuoteCalculationResult) => void;
}

const CATEGORIES = [
  { key: "todos", label: "Todos los Destinos" },
  { key: "disney", label: "Disney & Universal" },
  { key: "crucero", label: "Cruceros" },
  { key: "europa", label: "Europa" },
  { key: "playa", label: "Playas" },
] as const;

export function PackagesCatalog({ initialPackages, onRequestQuote }: PackagesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  const filteredPackages =
    selectedCategory === "todos"
      ? initialPackages
      : initialPackages.filter((p) => p.category === selectedCategory);

  return (
    <section id="paquetes" className="py-20 bg-background border-b border-border/60 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <Reveal className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1 text-xs font-bold text-secondary-foreground">
            <Compass className="h-3.5 w-3.5 text-accent" />
            <span>Catálogo de Experiencias</span>
          </div>
          <h2 className="font-display text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Paquetes destacados diseñados a la medida
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Elige tu destino y solicita cotización por WhatsApp. Un asesor Pandi arma tu propuesta con disponibilidad real — sin precios publicados en la web.
          </p>
        </Reveal>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 scale-105"
                    : "bg-card border border-border text-foreground hover:bg-muted hover:border-primary/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <Stagger
            key={selectedCategory}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {filteredPackages.map((pkg) => (
              <StaggerItem key={pkg.id}>
                <PackageCard pkg={pkg} onRequestQuote={onRequestQuote} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="text-center py-16 rounded-3xl bg-card border border-border p-8">
            <Sparkles className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <h4 className="font-bold text-foreground">No encontramos paquetes en esta categoría</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Podemos armar tu viaje a la medida: usa el cotizador o solicita cotización por WhatsApp.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
