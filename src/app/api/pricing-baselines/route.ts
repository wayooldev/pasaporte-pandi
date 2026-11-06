import { NextResponse } from "next/server";
import { dataRepository } from "@/db";

export async function GET() {
  try {
    const baselines = await dataRepository.getPricingBaselines();
    return NextResponse.json({ success: true, baselines });
  } catch (error: any) {
    console.error("Error fetching pricing baselines:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener reglas de precios" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { destinationKey, ...updates } = body;

    if (!destinationKey) {
      return NextResponse.json(
        { success: false, message: "destinationKey es requerido" },
        { status: 400 }
      );
    }

    const updated = await dataRepository.updatePricingBaseline(destinationKey, updates);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Regla no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, baseline: updated });
  } catch (error: any) {
    console.error("Error updating pricing baseline:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar regla de precios" },
      { status: 500 }
    );
  }
}
