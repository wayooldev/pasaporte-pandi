import { NextResponse } from "next/server";
import { dataRepository } from "@/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await dataRepository.updatePackage(id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Paquete no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar paquete" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await dataRepository.deletePackage(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Paquete no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Paquete eliminado" });
  } catch (error: any) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { success: false, message: "Error al eliminar paquete" },
      { status: 500 }
    );
  }
}
