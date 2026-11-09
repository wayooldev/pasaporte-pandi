import { Resend } from "resend";
import { brandConfig } from "@/config/brand";

export interface AdvisorNotificationPayload {
  folio: string;
  customerName: string;
  phone: string;
  email: string;
  destination: string;
  adults: number;
  children: number;
  travelMonth: string;
  notes?: string;
}

/**
 * Emails the advisor a quote-request notice (constancia).
 * Soft-fails when RESEND_API_KEY is missing so WhatsApp handoff still works locally.
 */
export async function notifyAdvisorByEmail(
  payload: AdvisorNotificationPayload
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADVISOR_NOTIFY_EMAIL || brandConfig.contact.email;
  const from =
    process.env.RESEND_FROM_EMAIL || "Pasaporte Pandi <onboarding@resend.dev>";

  const notesBlock = payload.notes?.trim()
    ? `\nInfo adicional:\n${payload.notes.trim()}\n`
    : "";

  const text = [
    `Nueva solicitud de cotización`,
    ``,
    `Folio: ${payload.folio}`,
    `Cliente: ${payload.customerName}`,
    `WhatsApp: ${payload.phone}`,
    `Correo: ${payload.email}`,
    `Destino: ${payload.destination}`,
    `Viajeros: ${payload.adults} adulto(s)${payload.children > 0 ? `, ${payload.children} menor(es)` : ""}`,
    `Mes tentativo: ${payload.travelMonth}`,
    notesBlock,
    `El cliente también abrirá WhatsApp con el mismo folio.`,
  ].join("\n");

  if (!apiKey) {
    console.warn(
      "[notify-advisor] RESEND_API_KEY no configurada; se omite el correo al asesor."
    );
    return { sent: false, error: "RESEND_API_KEY missing" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: `Solicitud ${payload.folio} · ${payload.destination}`,
      text,
    });

    if (error) {
      console.error("[notify-advisor] Resend error:", error);
      return { sent: false, error: error.message };
    }

    return { sent: true };
  } catch (err: any) {
    console.error("[notify-advisor] Failed:", err);
    return { sent: false, error: err?.message || "email_failed" };
  }
}
