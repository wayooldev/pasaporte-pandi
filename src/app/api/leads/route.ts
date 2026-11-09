import { NextResponse } from "next/server";
import { z } from "zod";
import { dataRepository } from "@/db";
import { notifyAdvisorByEmail } from "@/lib/notify-advisor";

const createLeadSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  phone: z.string().min(8, "Ingresa un número de WhatsApp válido"),
  email: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || z.string().email().safeParse(v).success, {
      message: "Ingresa un correo electrónico válido",
    }),
  notes: z.string().max(1000).optional().default(""),
  folio: z.string().min(5),
  destination: z.string().min(2),
  adults: z.number().int().min(1),
  children: z.number().int().min(0),
  travelMonth: z.string().min(2),
  experienceStyle: z.string().min(2).optional().default("clasico"),
  estimatedPandiUsd: z.number().min(0).optional().default(0),
  estimatedDiyUsd: z.number().min(0).optional().default(0),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createLeadSchema.parse(body);

    const savedLead = await dataRepository.saveQuoteLead({
      folio: validated.folio,
      customerName: validated.name,
      customerContact: validated.phone,
      customerEmail: validated.email || "",
      notes: validated.notes?.trim() || null,
      destination: validated.destination,
      adults: validated.adults,
      children: validated.children,
      travelMonth: validated.travelMonth,
      experienceStyle: validated.experienceStyle,
      estimatedPandiUsd: validated.estimatedPandiUsd.toFixed(2),
      estimatedDiyUsd: validated.estimatedDiyUsd.toFixed(2),
      status: "new",
    });

    // Solo constancia por email si el cliente dejó correo
    const emailResult = validated.email
      ? await notifyAdvisorByEmail({
          folio: validated.folio,
          customerName: validated.name,
          phone: validated.phone,
          email: validated.email,
          destination: validated.destination,
          adults: validated.adults,
          children: validated.children,
          travelMonth: validated.travelMonth,
          notes: validated.notes,
        })
      : { sent: false };

    return NextResponse.json({
      success: true,
      lead: savedLead,
      emailSent: emailResult.sent,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error("Error saving lead:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await dataRepository.getQuoteLeads();
    return NextResponse.json({ success: true, leads });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener prospectos" },
      { status: 500 }
    );
  }
}
