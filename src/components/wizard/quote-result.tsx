"use client";

import React from "react";
import { QuoteCalculationResult } from "@/lib/calculator";
import { generateWhatsAppHandoffUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  MessageCircle,
  FileDown,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
} from "lucide-react";

interface QuoteResultProps {
  quote: QuoteCalculationResult;
  onModify: () => void;
  onDownloadPdf: () => void;
}

export function QuoteResult({ quote, onModify, onDownloadPdf }: QuoteResultProps) {
  const handleWhatsApp = () => {
    const url = generateWhatsAppHandoffUrl(quote);
    window.open(url, "_blank");
  };

  return (
    <div data-testid="quote-result-card" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Top Banner: Folio & Destination */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-primary/10 border border-primary/20 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs font-bold">
              Folio: {quote.folio}
            </Badge>
            <span className="text-xs text-muted-foreground font-medium capitalize">
              Mes: {quote.travelMonth}
            </span>
          </div>
          <h3 className="text-2xl font-black text-foreground mt-1">
            {quote.destinationLabel}
          </h3>
          <p className="text-xs text-muted-foreground">
            Cotización estimada para {quote.adults} Adulto(s)
            {quote.children > 0 ? ` y ${quote.children} Menor(es)` : ""} · Estilo {quote.experienceStyle}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={onModify} className="self-start sm:self-auto gap-1 text-xs">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Modificar Opciones</span>
        </Button>
      </div>

      {/* Main Pricing & DIY Savings Comparator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Pasaporte Pandi Card */}
        <div className="lg:col-span-7 rounded-3xl bg-card border-2 border-primary/40 p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3" />
            Tarifa Pandi Recomendada
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Presupuesto Total Estimado
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-foreground">
                  ${quote.pandiMinRangeUsd.toLocaleString()} - ${quote.pandiMaxRangeUsd.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-muted-foreground uppercase">USD</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">
                Promedio de <strong className="text-foreground font-bold">${quote.pandiPerPersonUsd.toLocaleString()} USD</strong> por persona
              </p>
            </div>

            {/* Savings Callout */}
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-800">
                  ¡Ahorras aproximadamente ${quote.savingsUsd.toLocaleString()} USD ({quote.savingsPercentage}%)!
                </p>
                <p className="text-[11px] text-emerald-700">
                  Respecto a reservar vuelos, hoteles y tickets individualmente por tu cuenta.
                </p>
              </div>
            </div>

            {/* Inclusions list */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>¿Qué incluye este presupuesto?</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {quote.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/90 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleWhatsApp}
              variant="whatsapp"
              size="lg"
              className="flex-1 font-bold shadow-md rounded-xl text-sm"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Cotizar por WhatsApp</span>
            </Button>
            <Button
              onClick={onDownloadPdf}
              variant="outline"
              size="lg"
              className="border-2 font-semibold rounded-xl text-sm gap-2"
            >
              <FileDown className="h-4 w-4 text-primary" />
              <span>Descargar Itinerario PDF</span>
            </Button>
          </div>
        </div>

        {/* DIY Comparison Side Card */}
        <div className="lg:col-span-5 rounded-3xl bg-muted/40 border border-border p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Comparativa
              </span>
              <h4 className="text-lg font-bold text-foreground mt-2">
                Hacerlo por tu cuenta (DIY)
              </h4>
              <p className="text-xs text-muted-foreground">
                Reservando por separado en múltiples plataformas
              </p>
            </div>

            <div className="rounded-2xl bg-card border border-border p-4">
              <p className="text-xs text-muted-foreground font-medium">Costo estimado directo</p>
              <p className="text-2xl font-black text-foreground/70 line-through">
                ${quote.diyTotalUsd.toLocaleString()} USD
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                (~${quote.diyPerPersonUsd.toLocaleString()} USD por persona)
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Riesgos comunes al viajar sin agencia:
              </p>
              <ul className="space-y-2">
                {quote.diyRisks.map((risk, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <XCircle className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/80">
            <p className="text-xs text-center text-muted-foreground font-medium">
              💡 <strong className="text-foreground">Recuerda:</strong> En Pasaporte Pandi nuestra asesoría no tiene costo extra.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
