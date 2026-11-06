import { NextResponse } from "next/server";
import { z } from "zod";
import { dataRepository } from "@/db";

const createLeadSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  contact: z.string().min(6, "Ingresa un número de WhatsApp o correo válido"),
  folio: z.string().min(5),
  destination: z.string().min(2),
  adults: z.number().int().min(1),
  children: z.number().int().min(0),
  travelMonth: z.string().min(2),
  experienceStyle: z.string().min(2),
  estimatedPandiUsd: z.number().positive(),
  estimatedDiyUsd: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createLeadSchema.parse(body);

    const savedLead = await dataRepository.saveQuoteLead({
      folio: validated.folio,
      customerName: validated.name,
      customerContact: validated.contact,
      destination: validated.destination,
      adults: validated.adults,
      children: validated.children,
      travelMonth: validated.travelMonth,
      experienceStyle: validated.experienceStyle,
      estimatedPandiUsd: validated.estimatedPandiUsd.toFixed(2),
      estimatedDiyUsd: validated.estimatedDiyUsd.toFixed(2),
      status: "new",
    });

    return NextResponse.json({
      success: true,
      lead: savedLead,
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
