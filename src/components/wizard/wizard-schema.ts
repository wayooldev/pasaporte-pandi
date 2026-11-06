import { z } from "zod";

export const quoteWizardSchema = z.object({
  destination: z.enum(["disney", "crucero", "europa", "playa"]),
  adults: z.number().int().min(1, "Debe viajar al menos 1 adulto").max(12, "Máximo 12 adultos"),
  children: z.number().int().min(0, "Mínimo 0").max(12, "Máximo 12 niños"),
  travelMonth: z.string().min(1, "Selecciona el mes tentativo de viaje"),
  experienceStyle: z.enum(["esencial", "clasico", "deluxe"]),
});

export type QuoteWizardFormData = z.infer<typeof quoteWizardSchema>;
