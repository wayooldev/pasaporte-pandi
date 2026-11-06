"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteWizardSchema, QuoteWizardFormData } from "./wizard-schema";
import { calculateQuote, QuoteCalculationResult } from "@/lib/calculator";
import { QuoteResult } from "./quote-result";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowLeft,
  Users,
  Calendar,
  Check,
  Compass,
  Sparkles,
  Palmtree,
  Ship,
  Castle,
} from "lucide-react";

const DESTINATION_OPTIONS = [
  {
    key: "disney",
    title: "Orlando: Disney & Universal",
    subtitle: "Magia in-resort, filas rápidas y restaurantes temáticos",
    icon: Castle,
    tag: "Más Popular",
  },
  {
    key: "crucero",
    title: "Crucero Caribe & Bahamas",
    subtitle: "Gastronomía gourmet, shows y playas privadas",
    icon: Ship,
    tag: "Todo Incluido",
  },
  {
    key: "europa",
    title: "Europa: Madrid, París y Roma",
    subtitle: "Trenes de alta velocidad, hoteles céntricos y tours",
    icon: Compass,
    tag: "Inolvidable",
  },
  {
    key: "playa",
    title: "Cancún & Riviera Maya All-Inclusive",
    subtitle: "Resorts 5 estrellas, cenotes y traslados privados",
    icon: Palmtree,
    tag: "Relax Total",
  },
] as const;

const MONTH_OPTIONS = [
  { value: "enero", label: "Enero" },
  { value: "febrero", label: "Febrero" },
  { value: "marzo", label: "Marzo (Temporada de Primavera)" },
  { value: "abril", label: "Abril (Semana Santa / Pascua)" },
  { value: "mayo", label: "Mayo" },
  { value: "junio", label: "Junio (Verano)" },
  { value: "julio", label: "Julio (Temporada Alta Verano)" },
  { value: "agosto", label: "Agosto" },
  { value: "septiembre", label: "Septiembre (Mejores Ofertas)" },
  { value: "octubre", label: "Octubre (Halloween temático)" },
  { value: "noviembre", label: "Noviembre (Thanksgiving)" },
  { value: "diciembre", label: "Diciembre (Navidad y Fin de Año)" },
];

interface QuoteWizardProps {
  onDownloadPdfRequest?: (quote: QuoteCalculationResult) => void;
}

export function QuoteWizard({ onDownloadPdfRequest }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [calculatedQuote, setCalculatedQuote] = useState<QuoteCalculationResult | null>(null);

  const {
    register,
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
      experienceStyle: "clasico",
    },
  });

  const selectedDestination = watch("destination");
  const selectedAdults = watch("adults");
  const selectedChildren = watch("children");
  const selectedStyle = watch("experienceStyle");

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger("destination");
    } else if (currentStep === 2) {
      isValid = await trigger(["adults", "children", "travelMonth"]);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(3, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const onSubmit = (data: QuoteWizardFormData) => {
    const result = calculateQuote(data);
    setCalculatedQuote(result);
  };

  const handleModify = () => {
    setCalculatedQuote(null);
    setCurrentStep(1);
  };

  return (
    <div id="cotizador" className="py-16 md:py-20 scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Cotizador Inteligente en 3 Pasos</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Calcula tu viaje y descubre cuánto ahorras con Pandi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Presupuesto instantáneo con desglose de servicios, comparador contra hacerlo solo y asesoría personalizada.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="rounded-3xl bg-card border border-border shadow-xl p-6 sm:p-10">
          
          {calculatedQuote ? (
            <QuoteResult
              quote={calculatedQuote}
              onModify={handleModify}
              onDownloadPdf={() => onDownloadPdfRequest?.(calculatedQuote)}
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Stepper Progress Indicator */}
              <div className="flex items-center justify-between max-w-md mx-auto border-b border-border pb-6">
                {[
                  { step: 1, label: "Destino" },
                  { step: 2, label: "Viajeros y Fecha" },
                  { step: 3, label: "Estilo" },
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

              {/* STEP 1: DESTINATION SELECTION */}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DESTINATION_OPTIONS.map((dest) => {
                      const Icon = dest.icon;
                      const isSelected = selectedDestination === dest.key;
                      return (
                        <div
                          key={dest.key}
                          onClick={() => setValue("destination", dest.key as any)}
                          className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                              : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`p-2.5 rounded-xl ${isSelected ? "bg-primary text-white" : "bg-muted text-foreground"}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-accent/20 text-amber-800 px-2 py-0.5">
                              {dest.tag}
                            </span>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-bold text-foreground text-base">{dest.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                              {dest.subtitle}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.destination && (
                    <p className="text-xs text-destructive font-medium">{errors.destination.message}</p>
                  )}
                </div>
              )}

              {/* STEP 2: TRAVELERS & DATES */}
              {currentStep === 2 && (
                <div data-testid="wizard-step-2" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Paso 2: ¿Quiénes viajan y cuándo?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Indica el número de personas y el mes aproximado para calcular temporadas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Adults Stepper */}
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

                    {/* Children Stepper */}
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

                  {/* Month Selection */}
                  <div className="rounded-2xl border border-border p-5 bg-card space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Mes tentativo de viaje</h4>
                        <p className="text-xs text-muted-foreground">Ajustamos temporadas de alta demanda y promociones</p>
                      </div>
                    </div>
                    <select
                      {...register("travelMonth")}
                      className="mt-2 w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {MONTH_OPTIONS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                    {errors.travelMonth && (
                      <p className="text-xs text-destructive font-medium">{errors.travelMonth.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: EXPERIENCE STYLE */}
              {currentStep === 3 && (
                <div data-testid="wizard-step-3" className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Paso 3: ¿Qué estilo de experiencia prefieres?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Elige el nivel de comodidad y comodidades para tu grupo.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      {
                        key: "esencial",
                        title: "Esencial",
                        badge: "Económico",
                        desc: "Hoteles 3 estrellas certificados, accesos estándar y mejor relación valor-precio.",
                      },
                      {
                        key: "clasico",
                        title: "Confort Superior",
                        badge: "Más Recomendado",
                        desc: "Hoteles 4 estrellas o in-resort estándar, traslados prioritarios y pases de filas rápidas.",
                      },
                      {
                        key: "deluxe",
                        title: "VIP / Deluxe",
                        badge: "Ultra Confort",
                        desc: "Resorts temáticos de lujo, suite con vista, accesos VIP sin filas y amenidades premium.",
                      },
                    ].map((style) => {
                      const isSelected = selectedStyle === style.key;
                      return (
                        <div
                          key={style.key}
                          onClick={() => setValue("experienceStyle", style.key as any)}
                          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                              : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary px-2.5 py-0.5">
                              {style.badge}
                            </span>
                            <h4 className="font-bold text-foreground text-base mt-3">{style.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                              {style.desc}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-border/60">
                            <span className="text-xs font-semibold text-primary">
                              {isSelected ? "✓ Seleccionado" : "Elegir este estilo"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.experienceStyle && (
                    <p className="text-xs text-destructive font-medium">{errors.experienceStyle.message}</p>
                  )}
                </div>
              )}

              {/* Navigation Footer Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack} className="gap-1.5 rounded-xl">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Atrás</span>
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <Button type="button" onClick={handleNext} className="gap-1.5 rounded-xl font-bold">
                    <span>Siguiente</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" variant="accent" size="lg" className="rounded-xl font-black shadow-lg">
                    <span>Calcular Mi Cotización Mágica</span>
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
