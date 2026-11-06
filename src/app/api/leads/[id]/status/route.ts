import { NextResponse } from "next/server";
import { dataRepository } from "@/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    if (!["new", "contacted", "converted"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Estado inválido. Opciones: new, contacted, converted" },
        { status: 400 }
      );
    }

    const updated = await dataRepository.updateQuoteLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Prospecto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead: updated });
  } catch (error: any) {
    console.error("Error updating lead status:", error);
    return NextResponse.json(
      { success: false, message: "Error interno al actualizar estado" },
      { status: 500 }
    );
  }
}
