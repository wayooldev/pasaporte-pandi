import { QuoteCalculationResult } from "./calculator";
import { brandConfig } from "@/config/brand";

export interface WhatsAppHandoffDetails {
  customerName?: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export function generateWhatsAppHandoffUrl(
  quote: QuoteCalculationResult,
  details?: WhatsAppHandoffDetails | string
): string {
  const cleanNumber = (brandConfig.contact.whatsapp || "+5219991234567").replace(/\D/g, "");

  const opts: WhatsAppHandoffDetails =
    typeof details === "string" ? { customerName: details } : details || {};

  const greeting = opts.customerName
    ? `¡Hola Pasaporte Pandi! Mi nombre es ${opts.customerName}.`
    : `¡Hola Pasaporte Pandi!`;

  const lines = [
    greeting,
    "",
    `Quiero solicitar una cotización formal con estos datos:`,
    "",
    `*Folio de solicitud:* ${quote.folio}`,
    `*Destino:* ${quote.destinationLabel}`,
  ];

  // Solo si el paquete aporta un nombre distinto al destino (evita duplicar el título).
  if (quote.packageTitle && quote.packageTitle !== quote.destinationLabel) {
    lines.push(`*Paquete:* ${quote.packageTitle}`);
  }

  lines.push(
    `*Viajeros:* ${quote.adults} Adulto(s)${quote.children > 0 ? `, ${quote.children} Menor(es)` : ""}`,
    `*Mes tentativo:* ${quote.travelMonth.toUpperCase()}`
  );

  if (opts.phone) {
    lines.push(`*WhatsApp:* ${opts.phone}`);
  }
  if (opts.email) {
    lines.push(`*Correo:* ${opts.email}`);
  }
  if (opts.notes?.trim()) {
    lines.push("", `*Info adicional:* ${opts.notes.trim()}`);
  }

  lines.push("", `¿Me pueden ayudar con disponibilidad y tarifas? ¡Gracias!`);

  const encodedText = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
