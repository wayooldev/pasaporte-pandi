import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { QuoteCalculationResult } from "./calculator";
import { brandConfig } from "@/config/brand";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#0284c7",
    paddingBottom: 16,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0284c7",
  },
  brandTagline: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 2,
  },
  folioBox: {
    alignItems: "flex-end",
  },
  folioBadge: {
    backgroundColor: "#f0fdfa",
    borderWidth: 1,
    borderColor: "#0284c7",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#0284c7",
  },
  dateText: {
    fontSize: 8,
    color: "#94a3b8",
    marginTop: 4,
  },
  tripOverview: {
    backgroundColor: "#f8fafc",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 14,
    marginBottom: 16,
  },
  destinationTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  metaItem: {
    fontSize: 9,
    color: "#475569",
  },
  metaBold: {
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  pricingBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#a7f3d0",
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  priceMain: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#065f46",
  },
  priceSub: {
    fontSize: 9,
    color: "#047857",
    marginTop: 2,
  },
  savingsHighlight: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  savingsAmount: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#047857",
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  inclusionsList: {
    marginBottom: 18,
  },
  inclusionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletCheck: {
    fontSize: 9,
    color: "#059669",
    marginRight: 6,
    fontFamily: "Helvetica-Bold",
  },
  inclusionText: {
    fontSize: 9,
    color: "#334155",
    flex: 1,
  },
  comparatorBox: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    backgroundColor: "#fafafa",
  },
  diyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  footerHandoff: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 14,
    marginTop: "auto",
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  qrImage: {
    width: 75,
    height: 75,
  },
  qrCaption: {
    fontSize: 7.5,
    color: "#64748b",
    marginTop: 3,
  },
  contactDetails: {
    maxWidth: 320,
  },
  contactTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  contactText: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.3,
  },
});

interface PdfDocumentProps {
  quote: QuoteCalculationResult;
  customerName: string;
  qrCodeDataUrl: string;
}

export function QuotePdfDocument({ quote, customerName, qrCodeDataUrl }: PdfDocumentProps) {
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document title={`Cotización ${quote.folio} - Pasaporte Pandi`}>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>Pasaporte Pandi</Text>
            <Text style={styles.brandTagline}>{brandConfig.tagline}</Text>
          </View>
          <View style={styles.folioBox}>
            <Text style={styles.folioBadge}>{quote.folio}</Text>
            <Text style={styles.dateText}>Emitida el {currentDate}</Text>
          </View>
        </View>

        {/* Trip Overview */}
        <View style={styles.tripOverview}>
          <Text style={styles.destinationTitle}>{quote.destinationLabel}</Text>
          <View style={styles.metaGrid}>
            <Text style={styles.metaItem}>
              Pasajero(a): <Text style={styles.metaBold}>{customerName}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Viajeros: <Text style={styles.metaBold}>{quote.adults} Adulto(s){quote.children > 0 ? `, ${quote.children} Menor(es)` : ""}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Mes: <Text style={styles.metaBold}>{quote.travelMonth.toUpperCase()}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Estilo: <Text style={styles.metaBold}>{quote.experienceStyle.toUpperCase()}</Text>
            </Text>
          </View>
        </View>

        {/* Price & Savings Banner */}
        <View style={styles.pricingBanner}>
          <View>
            <Text style={styles.priceMain}>
              ${quote.pandiMinRangeUsd.toLocaleString()} - ${quote.pandiMaxRangeUsd.toLocaleString()} USD
            </Text>
            <Text style={styles.priceSub}>
              Promedio de ${quote.pandiPerPersonUsd.toLocaleString()} USD por persona · Asesoría 100% Incluida
            </Text>
          </View>
          <View style={styles.savingsHighlight}>
            <Text style={styles.savingsAmount}>
              Ahorro Pandi: ~${quote.savingsUsd.toLocaleString()} USD ({quote.savingsPercentage}%)
            </Text>
            <Text style={{ fontSize: 8, color: "#065f46", marginTop: 2 }}>
              vs. reserva individual directa (~${quote.diyTotalUsd.toLocaleString()} USD)
            </Text>
          </View>
        </View>

        {/* Inclusions */}
        <Text style={styles.sectionTitle}>Servicios y Beneficios Incluidos</Text>
        <View style={styles.inclusionsList}>
          {quote.inclusions.map((item, index) => (
            <View key={index} style={styles.inclusionRow}>
              <Text style={styles.bulletCheck}>✓</Text>
              <Text style={styles.inclusionText}>{item}</Text>
            </View>
          ))}
          <View style={styles.inclusionRow}>
            <Text style={styles.bulletCheck}>✓</Text>
            <Text style={styles.inclusionText}>
              Acompañamiento y soporte concierge 24/7 de un asesor personal asignado
            </Text>
          </View>
          <View style={styles.inclusionRow}>
            <Text style={styles.bulletCheck}>✓</Text>
            <Text style={styles.inclusionText}>
              Monitoreo continuo de promociones aplicables antes de la salida
            </Text>
          </View>
        </View>

        {/* Value comparator */}
        <Text style={styles.sectionTitle}>Ventajas Pasaporte Pandi vs. Reservar por tu cuenta</Text>
        <View style={styles.comparatorBox}>
          <View style={styles.diyRow}>
            <Text style={{ fontSize: 8.5, color: "#64748b" }}>Costo directo estimado sin agencia:</Text>
            <Text style={{ fontSize: 8.5, color: "#64748b", textDecoration: "line-through" }}>
              ${quote.diyTotalUsd.toLocaleString()} USD
            </Text>
          </View>
          <View style={styles.diyRow}>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#059669" }}>
              Tarifa preferencial Pasaporte Pandi:
            </Text>
            <Text style={{ fontSize: 8.5, fontFamily: "Helvetica-Bold", color: "#059669" }}>
              ${quote.pandiTotalUsd.toLocaleString()} USD
            </Text>
          </View>
          <Text style={{ fontSize: 7.5, color: "#475569", marginTop: 4 }}>
            * Precios sujetos a disponibilidad al momento de confirmar reservas. Esta cotización no representa una reserva confirmada.
          </Text>
        </View>

        {/* Footer with WhatsApp QR code and Contact Details */}
        <View style={styles.footerHandoff}>
          <View style={styles.contactDetails}>
            <Text style={styles.contactTitle}>¿Listo para hacer realidad tu viaje?</Text>
            <Text style={styles.contactText}>
              Escanea el código QR con la cámara de tu teléfono para iniciar un chat directo con tu asesor asignado en WhatsApp.
            </Text>
            <Text style={[styles.contactText, { marginTop: 4 }]}>
              WhatsApp: {brandConfig.contact.whatsappDisplay} · {brandConfig.contact.email}
            </Text>
          </View>

          <View style={styles.qrContainer}>
            {qrCodeDataUrl ? (
              <Image src={qrCodeDataUrl} style={styles.qrImage} />
            ) : null}
            <Text style={styles.qrCaption}>Escanear para WhatsApp</Text>
          </View>
        </View>

      </Page>
    </Document>
  );
}
