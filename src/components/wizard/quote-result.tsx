"use client";

import React from "react";
import { QuoteCalculationResult } from "@/lib/calculator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import {
  CheckCircle2,
  ShieldCheck,
  RotateCcw,
  ClipboardCheck,
} from "lucide-react";

interface QuoteResultProps {
  quote: QuoteCalculationResult;
  onModify: () => void;
  onRequestQuote: () => void;
}

export function QuoteResult({ quote, onModify, onRequestQuote }: QuoteResultProps) {
  return (
    <div data-testid="quote-result-card" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
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
            Solicitud de cotización para {quote.adults} Adulto(s)
            {quote.children > 0 ? ` y ${quote.children} Menor(es)` : ""}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={onModify} className="self-start sm:self-auto gap-1 text-xs">
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Modificar Opciones</span>
        </Button>
      </div>

      <div className="rounded-3xl bg-card border-2 border-primary/40 p-6 sm:p-8 shadow-lg space-y-6">
        <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4 flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
            <ClipboardCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Tu solicitud está lista</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Un asesor Pandi preparará tu cotización formal con disponibilidad y tarifas reales.
              No mostramos precios estimados en la web porque cada viaje se arma a medida.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Qué suele incluir este destino</span>
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

        <div className="pt-6 border-t border-border flex flex-col gap-3">
          <Button
            onClick={onRequestQuote}
            variant="whatsapp"
            size="lg"
            className="w-full font-bold shadow-md rounded-xl text-sm"
            data-testid="request-quote-whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>Solicitar cotización por WhatsApp</span>
          </Button>
          <p className="text-[11px] text-center text-muted-foreground">
            Pediremos tu WhatsApp y correo, notificaremos al asesor y abriremos el chat con tu folio.
          </p>
        </div>
      </div>
    </div>
  );
}
