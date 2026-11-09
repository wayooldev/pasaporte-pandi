"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { QuoteCalculationResult } from "@/lib/calculator";
import { generateWhatsAppHandoffUrl } from "@/lib/whatsapp";
import {
  DEFAULT_PHONE_DIAL,
  formatInternationalPhone,
  getPhoneCountry,
  PHONE_COUNTRIES,
} from "@/lib/phone-countries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CountryFlag } from "@/components/ui/country-flag";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { X, CheckCircle2, Loader2, Sparkles, ShieldCheck } from "lucide-react";

const leadFormSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo"),
  dialCode: z.string().min(1),
  phoneLocal: z
    .string()
    .min(8, "Ingresa tu número de WhatsApp (sin lada de país)")
    .refine((v) => /^\d[\d\s-]{6,}$/.test(v.trim()), {
      message: "Solo dígitos del número local (sin + ni código de país)",
    }),
  email: z
    .string()
    .trim()
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Ingresa un correo electrónico válido",
    }),
  notes: z.string().max(1000).optional(),
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
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      notes: "",
      email: "",
      dialCode: DEFAULT_PHONE_DIAL,
      phoneLocal: "",
    },
  });

  const dialCode = watch("dialCode");
  const selectedCountry = getPhoneCountry(dialCode);

  if (!isOpen || !quote) return null;

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const phone = formatInternationalPhone(data.dialCode, data.phoneLocal);
    const userNotes = data.notes?.trim() || "";

    // Generar y abrir WhatsApp en el mismo gesto del clic (antes de cualquier await).
    // Si se abre después del fetch, el navegador bloquea el popup.
    const handoffUrl = generateWhatsAppHandoffUrl(quote, {
      customerName: data.name,
      phone,
      email: data.email || undefined,
      notes: userNotes || undefined,
    });
    setWhatsappUrl(handoffUrl);
    // Sin "noopener" en features: con noopener window.open a menudo devuelve null
    // aunque la pestaña sí abrió, y no podríamos detectar bloqueo real.
    const waWindow = window.open(handoffUrl, "_blank");
    if (waWindow) {
      waWindow.opener = null;
    }
    const popupBlocked = !waWindow;

    try {
      const leadPayload = {
        name: data.name,
        phone,
        email: data.email || "",
        notes: userNotes,
        folio: quote.folio,
        destination: quote.destinationLabel,
        adults: quote.adults,
        children: quote.children,
        travelMonth: quote.travelMonth,
        experienceStyle: quote.experienceStyle || "clasico",
        estimatedPandiUsd: 0,
        estimatedDiyUsd: 0,
      };

      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      if (!leadRes.ok) {
        throw new Error("No se pudo registrar la solicitud en el sistema");
      }

      setIsSuccess(true);
      // Si el popup se bloqueó, no auto-cerrar: el usuario necesita el botón manual.
      if (!popupBlocked) {
        setTimeout(() => {
          setIsSuccess(false);
          setWhatsappUrl(null);
          reset({ notes: "", email: "", dialCode: DEFAULT_PHONE_DIAL, phoneLocal: "" });
          onClose();
        }, 6000);
      }
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
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
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
            <h3 className="text-2xl font-black text-foreground">¡Solicitud enviada!</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Registramos tu folio{" "}
              <strong className="text-foreground">{quote.folio}</strong>. Se abre WhatsApp con el
              mensaje listo; confirma <strong className="text-foreground">Enviar</strong> en el chat.
            </p>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-whatsapp-hover hover:shadow-lg active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Abrir WhatsApp</span>
              </a>
            ) : null}
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Solicitud por WhatsApp</span>
              </div>
              <h3 className="text-2xl font-black text-foreground">
                Solicitar cotización
              </h3>
              <p className="text-xs text-muted-foreground">
                WhatsApp es obligatorio. El correo es opcional: si lo dejas, avisamos también al asesor por email.
              </p>
            </div>

            <div className="rounded-2xl bg-muted/50 p-4 border border-border/80 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold text-foreground">{quote.destinationLabel}</p>
                {quote.packageTitle && quote.packageTitle !== quote.destinationLabel ? (
                  <p className="text-[11px] font-semibold text-foreground/80 truncate">
                    {quote.packageTitle}
                  </p>
                ) : null}
                <p className="text-[11px] text-muted-foreground">
                  {quote.adults} Adulto(s) · {quote.children} Menor(es) · Mes {quote.travelMonth}
                </p>
              </div>
              <div className="shrink-0 text-right space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Folio
                </p>
                <Badge variant="outline" className="font-mono text-xs font-extrabold text-primary border-primary/30">
                  {quote.folio}
                </Badge>
              </div>
            </div>

            {errorMessage && (
              <div className="space-y-3">
                <div className="rounded-xl bg-destructive/10 p-3 text-xs text-destructive font-medium">
                  {errorMessage}
                </div>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-whatsapp-hover"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    <span>Abrir WhatsApp de todos modos</span>
                  </a>
                ) : null}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Nombre completo
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
                  WhatsApp / celular
                </label>
                <div className="flex gap-2">
                  <Controller
                    name="dialCode"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger
                          className="h-11 w-[10.5rem] shrink-0 px-3"
                          aria-label="País y lada"
                        >
                          <span className="inline-flex items-center">
                            <CountryFlag
                              iso={selectedCountry.iso}
                              alt={selectedCountry.label}
                              className="h-4 w-[1.4rem] self-center"
                            />
                            <span className="ml-2.5 font-semibold tabular-nums leading-none self-center">
                              +{selectedCountry.dial}
                            </span>
                          </span>
                        </SelectTrigger>
                        <SelectContent className="min-w-[16rem]">
                          {PHONE_COUNTRIES.map((c) => (
                            <SelectItem
                              key={`${c.short}-${c.dial}`}
                              value={c.dial}
                              textValue={`${c.label} +${c.dial}`}
                            >
                              <CountryFlag iso={c.iso} alt={c.label} />
                              <span className="font-medium">{c.label}</span>
                              <span className="text-muted-foreground tabular-nums">
                                +{c.dial}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Input
                    {...register("phoneLocal")}
                    type="tel"
                    inputMode="numeric"
                    placeholder="55 1234 5678"
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Elige el país (México por defecto) y escribe solo tu número local.
                </p>
                {(errors.dialCode || errors.phoneLocal) && (
                  <p className="text-xs text-destructive mt-1 font-medium">
                    {errors.phoneLocal?.message || errors.dialCode?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Correo electrónico{" "}
                  <span className="font-medium text-muted-foreground">(opcional)</span>
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Ej. sofia@email.com"
                  disabled={isSubmitting}
                />
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Si lo agregas, el asesor recibe constancia por correo además del WhatsApp.
                </p>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-foreground block mb-1.5">
                  Información adicional{" "}
                  <span className="font-medium text-muted-foreground">(opcional)</span>
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Ej. fechas exactas, tipo de cabina, presupuesto aproximado…"
                  disabled={isSubmitting}
                  className="flex w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.notes && (
                  <p className="text-xs text-destructive mt-1 font-medium">{errors.notes.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Tus datos están protegidos. Solo se usan para atender tu cotización.</span>
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              disabled={isSubmitting}
              className="w-full font-bold rounded-xl py-3 text-sm gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <WhatsAppIcon className="h-4 w-4" />
                  <span>Enviar por WhatsApp</span>
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
