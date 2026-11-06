"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QuoteCalculationResult } from "@/lib/calculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, FileDown, CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";

const leadFormSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  contact: z.string().min(6, "Ingresa tu número de WhatsApp o correo electrónico"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: QuoteCalculationResult | null;
}

export function LeadModal({ isOpen, onClose, quote }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  if (!isOpen || !quote) return null;

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Persist lead in database
      const leadPayload = {
        name: data.name,
        contact: data.contact,
        folio: quote.folio,
        destination: quote.destinationLabel,
        adults: quote.adults,
        children: quote.children,
        travelMonth: quote.travelMonth,
        experienceStyle: quote.experienceStyle,
        estimatedPandiUsd: quote.pandiTotalUsd,
        estimatedDiyUsd: quote.diyTotalUsd,
      };

      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (!leadRes.ok) {
        throw new Error("No se pudo registrar la cotización en el sistema");
      }

      // 2. Request PDF generation
      const pdfRes = await fetch("/api/quote-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quote,
          customerName: data.name,
        }),
      });

      if (!pdfRes.ok) {
        throw new Error("Error al descargar el archivo PDF");
      }

      // 3. Trigger browser download
      const blob = await pdfRes.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `Cotizacion-Pandi-${quote.folio}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        reset();
        onClose();
      }, 2500);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ocurrió un error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-testid="lead-capture-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-foreground">¡Cotización Descargada!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Tu archivo PDF se ha descargado exitosamente. Un asesor Pandi revisará tu folio{" "}
              <strong className="text-foreground">{quote.folio}</strong> para preparar promociones adicionales.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Itinerario Personalizado en PDF</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Descarga tu Propuesta de Viaje
              </h3>
              <p className="text-xs text-muted-foreground">
                Te enviaremos el documento oficial con desglose de servicios, folio único y código QR de asesoría directa.
              </p>
            </div>

            {/* Folio mini card */}
            <div className="rounded-2xl bg-muted/50 p-4 border border-border/80 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-foreground">{quote.destinationLabel}</p>
                <p className="text-[11px] text-muted-foreground">
                  {quote.adults} Adulto(s) · {quote.children} Menor(es) · Mes {quote.travelMonth}
                </p>
              </div>
              <span className="text-xs font-extrabold text-primary font-mono">
                {quote.folio}
              </span>
            </div>

            {errorMessage && (
              <div className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive font-medium">
                {errorMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Nombre Completo
                </label>
                <Input
                  {...register("name")}
                  placeholder="Ej. Sofía Hernández"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  WhatsApp o Correo Electrónico
                </label>
                <Input
                  {...register("contact")}
                  placeholder="Ej. +52 55 1234 5678 o sofia@email.com"
                  disabled={isSubmitting}
                />
                {errors.contact && (
                  <p className="text-xs text-destructive mt-1 font-medium">{errors.contact.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Tus datos están protegidos. Cero spam, solo asesoría experta.</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold rounded-xl py-3 text-sm gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generando PDF oficial...</span>
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  <span>Generar y Descargar PDF</span>
                </>
              )}
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}
