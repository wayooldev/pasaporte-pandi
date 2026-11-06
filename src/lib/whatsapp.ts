import { QuoteCalculationResult } from "./calculator";
import { brandConfig } from "@/config/brand";

export function generateWhatsAppHandoffUrl(
  quote: QuoteCalculationResult,
  customerName?: string
): string {
  const cleanNumber = (brandConfig.contact.whatsapp || "+5219991234567").replace(/\D/g, "");

  const greeting = customerName
    ? `¡Hola Pasaporte Pandi! Mi nombre es ${customerName}.`
    : `¡Hola Pasaporte Pandi! Acabo de cotizar en su web.`;

  const lines = [
    greeting,
    "",
    `📋 *Folio de Cotización:* ${quote.folio}`,
    `📍 *Destino:* ${quote.destinationLabel}`,
    `👥 *Viajeros:* ${quote.adults} Adulto(s)${quote.children > 0 ? `, ${quote.children} Menor(es)` : ""}`,
    `📅 *Mes tentativo:* ${quote.travelMonth.toUpperCase()}`,
    `✨ *Estilo:* ${quote.experienceStyle.toUpperCase()}`,
    `💵 *Presupuesto estimado Pandi:* ~$${quote.pandiTotalUsd.toLocaleString()} USD (~$${quote.pandiPerPersonUsd.toLocaleString()} USD/persona)`,
    `🎁 *Ahorro estimado vs por mi cuenta:* ~$${quote.savingsUsd.toLocaleString()} USD (${quote.savingsPercentage}%)`,
    "",
    `Me gustaría recibir asesoría personalizada y confirmar disponibilidad de fechas y promociones. ¡Gracias!`,
  ];

  const encodedText = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
