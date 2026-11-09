"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Package } from "@/db/schema";
import { buildQuoteRequest, QuoteCalculationResult, toDestinationKey } from "@/lib/calculator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Calendar, Users, X } from "lucide-react";

const packageQuoteSchema = z.object({
  adults: z.number().int().min(1, "Debe viajar al menos 1 adulto").max(12),
  children: z.number().int().min(0).max(12),
  travelMonth: z.string().min(1, "Selecciona el mes tentativo de viaje"),
});

type PackageQuoteFormData = z.infer<typeof packageQuoteSchema>;

const MONTH_OPTIONS = [
  { value: "enero", label: "Enero" },
  { value: "febrero", label: "Febrero" },
  { value: "marzo", label: "Marzo" },
  { value: "abril", label: "Abril" },
  { value: "mayo", label: "Mayo" },
  { value: "junio", label: "Junio" },
  { value: "julio", label: "Julio" },
  { value: "agosto", label: "Agosto" },
  { value: "septiembre", label: "Septiembre" },
  { value: "octubre", label: "Octubre" },
  { value: "noviembre", label: "Noviembre" },
  { value: "diciembre", label: "Diciembre" },
];

interface PackageQuoteFormProps {
  pkg: Package;
  onClose: () => void;
  onSubmitQuote: (quote: QuoteCalculationResult) => void;
}

export function PackageQuoteForm({ pkg, onClose, onSubmitQuote }: PackageQuoteFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PackageQuoteFormData>({
    resolver: zodResolver(packageQuoteSchema),
    defaultValues: {
      adults: 2,
      children: 1,
      travelMonth: "julio",
    },
  });

  const adults = watch("adults");
  const children = watch("children");

  const onSubmit = (data: PackageQuoteFormData) => {
    const quote = buildQuoteRequest({
      destination: toDestinationKey(pkg.category),
      adults: data.adults,
      children: data.children,
      travelMonth: data.travelMonth,
      packageTitle: pkg.title,
      packageSlug: pkg.slug,
      // Evita el label genérico de categoría (ej. "Cancún…") cuando el paquete es otro destino.
      destinationLabel: pkg.title,
    });
    onSubmitQuote(quote);
  };

  return (
    <div
      data-testid={`package-quote-form-${pkg.slug}`}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 pr-8">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Solicitud de cotización
            </p>
            <h3 className="text-xl font-black text-foreground leading-tight">{pkg.title}</h3>
            <p className="text-xs text-muted-foreground">
              Indica viajeros y mes tentativo. Un asesor Pandi te cotiza por WhatsApp con tarifas reales.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border p-4 bg-card space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-bold text-foreground">Adultos</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setValue("adults", Math.max(1, adults - 1))}
                  className="h-9 w-9 rounded-xl border border-border bg-muted text-foreground font-bold"
                  aria-label="Menos adultos"
                >
                  -
                </button>
                <span className="text-base font-black text-foreground w-6 text-center">{adults}</span>
                <button
                  type="button"
                  onClick={() => setValue("adults", Math.min(12, adults + 1))}
                  className="h-9 w-9 rounded-xl border border-border bg-muted text-foreground font-bold"
                  aria-label="Más adultos"
                >
                  +
                </button>
              </div>
              {errors.adults && (
                <p className="text-[11px] text-destructive font-medium">{errors.adults.message}</p>
              )}
            </div>

            <div className="rounded-2xl border border-border p-4 bg-card space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <h4 className="text-xs font-bold text-foreground">Menores</h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setValue("children", Math.max(0, children - 1))}
                  className="h-9 w-9 rounded-xl border border-border bg-muted text-foreground font-bold"
                  aria-label="Menos menores"
                >
                  -
                </button>
                <span className="text-base font-black text-foreground w-6 text-center">{children}</span>
                <button
                  type="button"
                  onClick={() => setValue("children", Math.min(12, children + 1))}
                  className="h-9 w-9 rounded-xl border border-border bg-muted text-foreground font-bold"
                  aria-label="Más menores"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border p-4 bg-card space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h4 className="text-xs font-bold text-foreground">Mes tentativo</h4>
            </div>
            <Controller
              name="travelMonth"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-label="Mes tentativo">
                    <SelectValue placeholder="Selecciona un mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTH_OPTIONS.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.travelMonth && (
              <p className="text-[11px] text-destructive font-medium">{errors.travelMonth.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            className="w-full font-bold rounded-xl gap-2"
            data-testid={`package-quote-submit-${pkg.slug}`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span>Solicitar cotización</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
