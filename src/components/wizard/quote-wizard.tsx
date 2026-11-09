"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteWizardSchema, QuoteWizardFormData } from "./wizard-schema";
import { buildQuoteRequest, QuoteCalculationResult } from "@/lib/calculator";
import { QuoteResult } from "./quote-result";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Calendar,
  Check,
  Sparkles,
} from "lucide-react";

const DESTINATION_OPTIONS = [
  {
    key: "disney",
    title: "Orlando: Disney & Universal",
    subtitle: "Magia in-resort, filas rápidas y restaurantes temáticos",
    image: "/brand/destinations/disney.jpg",
    tag: "Más Popular",
  },
  {
    key: "crucero",
    title: "Crucero Caribe & Bahamas",
    subtitle: "Gastronomía gourmet, shows y playas privadas",
    image: "/brand/destinations/crucero.jpg",
    tag: "Todo Incluido",
  },
  {
    key: "europa",
    title: "Europa: Madrid, París y Roma",
    subtitle: "Trenes de alta velocidad, hoteles céntricos y tours",
    image: "/brand/destinations/europa.jpg",
    tag: "Inolvidable",
  },
  {
    key: "playa",
    title: "Cancún & Riviera Maya All-Inclusive",
    subtitle: "Resorts 5 estrellas, cenotes y traslados privados",
    image: "/brand/destinations/playa.jpg",
    tag: "Relax Total",
  },
] as const;

const MONTH_OPTIONS = [
  { value: "enero", label: "Enero", hint: "Temporada media" },
  { value: "febrero", label: "Febrero", hint: "Temporada media" },
  { value: "marzo", label: "Marzo", hint: "Primavera / vacaciones" },
  { value: "abril", label: "Abril", hint: "Semana Santa" },
  { value: "mayo", label: "Mayo", hint: "Temporada media" },
  { value: "junio", label: "Junio", hint: "Inicio de verano" },
  { value: "julio", label: "Julio", hint: "Temporada alta" },
  { value: "agosto", label: "Agosto", hint: "Temporada alta" },
  { value: "septiembre", label: "Septiembre", hint: "Mejores ofertas" },
  { value: "octubre", label: "Octubre", hint: "Halloween / otoño" },
  { value: "noviembre", label: "Noviembre", hint: "Thanksgiving" },
  { value: "diciembre", label: "Diciembre", hint: "Navidad y Año Nuevo" },
];

interface QuoteWizardProps {
  onRequestQuote?: (quote: QuoteCalculationResult) => void;
}

export function QuoteWizard({ onRequestQuote }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [quoteRequest, setQuoteRequest] = useState<QuoteCalculationResult | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteWizardFormData>({
    resolver: zodResolver(quoteWizardSchema),
    defaultValues: {
      destination: "disney",
      adults: 2,
      children: 1,
      travelMonth: "julio",
    },
  });

  const selectedDestination = watch("destination");
  const selectedAdults = watch("adults");
  const selectedChildren = watch("children");
  const selectedMonth = watch("travelMonth");

  const handleNext = async () => {
    const isValid = await trigger("destination");
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const onSubmit = (data: QuoteWizardFormData) => {
    const result = buildQuoteRequest(data);
    setQuoteRequest(result);
  };

  const handleModify = () => {
    setQuoteRequest(null);
    setCurrentStep(1);
  };

  return (
    <div id="cotizador" className="py-16 md:py-20 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Solicitud de cotización en 2 pasos</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Arma tu solicitud y recibe cotización de un asesor
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Cuéntanos destino, viajeros y mes. Generamos un PDF de solicitud y te conectamos por WhatsApp con un asesor Pandi.
          </p>
        </div>

        <div className="rounded-3xl bg-card border border-border shadow-xl p-6 sm:p-10">
          {quoteRequest ? (
            <QuoteResult
              quote={quoteRequest}
              onModify={handleModify}
              onRequestQuote={() => onRequestQuote?.(quoteRequest)}
            />
          ) : (
            <form
              onSubmit={(e) => {
                // Prevent implicit submit (Enter / button swap under cursor).
                e.preventDefault();
              }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between max-w-sm mx-auto border-b border-border pb-6">
                {[
                  { step: 1, label: "Destino" },
                  { step: 2, label: "Viajeros y Fecha" },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        currentStep === item.step
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : currentStep > item.step
                          ? "bg-emerald-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > item.step ? <Check className="h-4 w-4" /> : item.step}
                    </div>
                    <span
                      className={`text-xs font-semibold hidden sm:inline ${
                        currentStep === item.step ? "text-foreground font-bold" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <div data-testid="wizard-step-1" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Paso 1: ¿A dónde sueñas viajar?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Selecciona uno de nuestros destinos insignia especializados.
                    </p>
                  </div>

                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    role="group"
                    aria-label="Destinos disponibles"
                  >
                    {DESTINATION_OPTIONS.map((dest) => {
                      const isSelected = selectedDestination === dest.key;
                      return (
                        <button
                          key={dest.key}
                          type="button"
                          data-testid={`destination-card-${dest.key}`}
                          aria-pressed={isSelected}
                          aria-label={dest.title}
                          onClick={() => setValue("destination", dest.key)}
                          className={`group relative aspect-[16/10] w-full overflow-hidden rounded-2xl text-left shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
                            isSelected
                              ? "ring-4 ring-primary ring-offset-2 shadow-xl"
                              : "ring-1 ring-border/80 hover:shadow-xl hover:ring-primary/40"
                          }`}
                        >
                          <Image
                            src={dest.image}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width:640px) 100vw, 40vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3.5">
                            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm backdrop-blur-sm">
                              {dest.tag}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                                <Check className="h-3 w-3" aria-hidden />
                                Seleccionado
                              </span>
                            )}
                          </div>

                          <div className="absolute inset-x-0 bottom-0 space-y-1 p-4 text-white">
                            <h4 className="text-base font-black leading-tight sm:text-lg">
                              {dest.title}
                            </h4>
                            <p className="text-xs font-medium leading-relaxed text-white/85">
                              {dest.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  {errors.destination && (
                    <p className="text-xs text-destructive font-medium">{errors.destination.message}</p>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <div data-testid="wizard-step-2" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Paso 2: ¿Quiénes viajan y cuándo?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Indica el número de personas y el mes aproximado para preparar tu solicitud.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-border p-5 bg-card space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">Adultos (12+ años)</h4>
                          <p className="text-xs text-muted-foreground">Boletos completos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setValue("adults", Math.max(1, selectedAdults - 1))}
                          className="h-10 w-10 rounded-xl border border-border bg-muted text-foreground font-bold hover:bg-muted/80 text-base"
                        >
                          -
                        </button>
                        <span className="text-lg font-black text-foreground w-8 text-center">
                          {selectedAdults}
                        </span>
                        <button
                          type="button"
                          onClick={() => setValue("adults", Math.min(10, selectedAdults + 1))}
                          className="h-10 w-10 rounded-xl border border-border bg-muted text-foreground font-bold hover:bg-muted/80 text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border p-5 bg-card space-y-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        <div>
                          <h4 className="text-sm font-bold text-foreground">Menores (0 - 11 años)</h4>
                          <p className="text-xs text-muted-foreground">Tarifas preferentes</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setValue("children", Math.max(0, selectedChildren - 1))}
                          className="h-10 w-10 rounded-xl border border-border bg-muted text-foreground font-bold hover:bg-muted/80 text-base"
                        >
                          -
                        </button>
                        <span className="text-lg font-black text-foreground w-8 text-center">
                          {selectedChildren}
                        </span>
                        <button
                          type="button"
                          onClick={() => setValue("children", Math.min(10, selectedChildren + 1))}
                          className="h-10 w-10 rounded-xl border border-border bg-muted text-foreground font-bold hover:bg-muted/80 text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border p-5 bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Mes tentativo de viaje</h4>
                        <p className="text-xs text-muted-foreground">
                          Ideal para cotizar: las fechas exactas las afinamos con tu asesor
                        </p>
                      </div>
                    </div>
                    <Controller
                      name="travelMonth"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="mt-1 w-full" aria-label="Mes tentativo">
                            <SelectValue placeholder="Selecciona un mes" />
                          </SelectTrigger>
                          <SelectContent>
                            {MONTH_OPTIONS.map((m) => (
                              <SelectItem key={m.value} value={m.value}>
                                {m.label} · {m.hint}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <div className="rounded-xl border border-amber-500/30 bg-amber-50 px-3.5 py-3 text-sm text-amber-950">
                      <p className="font-bold">
                        Mes elegido:{" "}
                        <span className="capitalize text-primary">{selectedMonth}</span>
                      </p>
                      <p className="mt-1 text-xs font-medium text-amber-900/90 leading-relaxed">
                        Si ya tienes días fijos, escríbelos en{" "}
                        <span className="font-extrabold">Información adicional</span> al solicitar
                        por WhatsApp. Ahí tu asesor ajusta fechas exactas.
                      </p>
                    </div>
                    {errors.travelMonth && (
                      <p className="text-xs text-destructive font-medium">{errors.travelMonth.message}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack} className="gap-1.5 rounded-xl">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 2 ? (
                  <Button type="button" onClick={handleNext} className="gap-1.5 rounded-xl font-bold">
                    <span>Siguiente</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="accent"
                    size="lg"
                    className="rounded-xl font-black shadow-lg"
                    onClick={handleSubmit(onSubmit)}
                  >
                    <span>Crear mi solicitud</span>
                    <Sparkles className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
