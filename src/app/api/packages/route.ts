import { NextResponse } from "next/server";
import { dataRepository } from "@/db";
import { z } from "zod";

const packageSchema = z.object({
  slug: z.string().min(2),
  title: z.string().min(3),
  category: z.string().min(2),
  description: z.string().min(10),
  durationDays: z.number().int().positive(),
  priceFromUsd: z.string().min(1),
  installmentsText: z.string().min(2),
  inclusions: z.array(z.string()).min(1),
  imageUrl: z.string().url(),
  isFeatured: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const packages = await dataRepository.getPackages(category);
    return NextResponse.json({ success: true, packages });
  } catch (error: any) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { success: false, message: "Error al obtener paquetes vacacionales" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = packageSchema.parse(body);
    const created = await dataRepository.createPackage(validated);
    return NextResponse.json({ success: true, package: created }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    console.error("Error creating package:", error);
    return NextResponse.json(
      { success: false, message: "Error al crear paquete vacacional" },
      { status: 500 }
    );
  }
}
