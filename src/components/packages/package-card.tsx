"use client";

import React, { useState } from "react";
import { Package } from "@/db/schema";
import { QuoteCalculationResult } from "@/lib/calculator";
import { PackageQuoteForm } from "@/components/packages/package-quote-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Clock, CheckCircle2, X } from "lucide-react";

interface PackageCardProps {
  pkg: Package;
  onRequestQuote?: (quote: QuoteCalculationResult) => void;
}

export function PackageCard({ pkg, onRequestQuote }: PackageCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const openQuoteForm = () => {
    setShowDetail(false);
    setShowQuoteForm(true);
  };

  const handleQuoteSubmit = (quote: QuoteCalculationResult) => {
    setShowQuoteForm(false);
    onRequestQuote?.(quote);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "disney":
        return "Disney & Universal";
      case "crucero":
        return "Cruceros";
      case "europa":
        return "Europa Clásica";
      case "playa":
        return "Caribe & Playas";
      default: {
        const _exhaustive: string = cat;
        return _exhaustive;
      }
    }
  };

  return (
    <>
      <div
        data-testid={`package-card-${pkg.slug}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card border border-border shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
      >
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <img
            src={pkg.imageUrl}
            alt={pkg.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-full bg-primary/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-white shadow-sm">
              {getCategoryLabel(pkg.category)}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>{pkg.durationDays} Días</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg sm:text-xl font-black text-white leading-tight">
              {pkg.title}
            </h3>
          </div>
        </div>

        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {pkg.description}
            </p>

            <div className="space-y-1.5 pt-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                Lo más destacado:
              </p>
              <ul className="space-y-1">
                {pkg.inclusions.slice(0, 3).map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/80 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="truncate">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-3">
            <p className="text-xs text-muted-foreground font-medium">
              Cotización personalizada con un asesor Pandi — sin precios publicados.
            </p>

            <div className="flex gap-2 pt-1">
              <Button
                onClick={() => setShowDetail(true)}
                variant="outline"
                size="sm"
                className="flex-1 text-xs font-semibold rounded-xl"
              >
                Ver Itinerario
              </Button>
              <Button
                onClick={openQuoteForm}
                variant="whatsapp"
                size="sm"
                className="flex-1 text-xs font-bold rounded-xl gap-1 shadow-sm"
                data-testid={`package-quote-cta-${pkg.slug}`}
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Cotizar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showDetail && (
        <div
          data-testid={`package-detail-modal-${pkg.slug}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowDetail(false)}
              className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">{getCategoryLabel(pkg.category)}</Badge>
                  <span className="text-xs text-muted-foreground font-semibold">
                    Duración: {pkg.durationDays} Días
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground">{pkg.title}</h2>
              </div>

              <div className="rounded-2xl overflow-hidden h-64 bg-muted">
                <img src={pkg.imageUrl} alt={pkg.title} className="h-full w-full object-cover" />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Descripción del Viaje
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Servicios e Inclusiones Completas
                </h4>
                <div className="rounded-2xl bg-muted/40 p-4 border border-border space-y-2">
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/20">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">Siguiente paso</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    Solicita tu cotización con viajeros y mes tentativo
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Un asesor te responde por WhatsApp con disponibilidad real.
                  </p>
                </div>

                <Button
                  onClick={openQuoteForm}
                  variant="whatsapp"
                  size="lg"
                  className="w-full sm:w-auto font-bold rounded-xl gap-2 shadow-md"
                  data-testid={`package-detail-quote-cta-${pkg.slug}`}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Solicitar cotización</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showQuoteForm && (
        <PackageQuoteForm
          pkg={pkg}
          onClose={() => setShowQuoteForm(false)}
          onSubmitQuote={handleQuoteSubmit}
        />
      )}
    </>
  );
}
