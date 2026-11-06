import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import QRCode from "qrcode";
import React from "react";
import { QuotePdfDocument } from "@/lib/pdf-template";
import { generateWhatsAppHandoffUrl } from "@/lib/whatsapp";
import { QuoteCalculationResult } from "@/lib/calculator";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quote, customerName } = body as {
      quote: QuoteCalculationResult;
      customerName: string;
    };

    if (!quote || !quote.folio) {
      return NextResponse.json(
        { error: "Se requiere la información de la cotización" },
        { status: 400 }
      );
    }

    const whatsAppUrl = generateWhatsAppHandoffUrl(quote, customerName);
    const qrCodeDataUrl = await QRCode.toDataURL(whatsAppUrl, {
      margin: 1,
      width: 200,
      color: {
        dark: "#0284c7",
        light: "#ffffff",
      },
    });

    const pdfBuffer = await renderToBuffer(
      React.createElement(QuotePdfDocument, {
        quote,
        customerName: customerName || "Viajero Estimado",
        qrCodeDataUrl,
      }) as any
    );

    return new Response(pdfBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Cotizacion-Pandi-${quote.folio}.pdf"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Error al generar documento PDF", details: error.message },
      { status: 500 }
    );
  }
}
