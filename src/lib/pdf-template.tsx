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
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  brandName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#0284c7",
  },
  brandTagline: {
    fontSize: 8,
    color: "#64748b",
    marginTop: 2,
  },
  folioBox: {
    alignItems: "flex-end",
  },
  folioBadge: {
    backgroundColor: "#e0f2fe",
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
  docTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  docSubtitle: {
    fontSize: 9,
    color: "#64748b",
    marginBottom: 14,
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
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  metaItem: {
    fontSize: 9,
    color: "#475569",
    width: "48%",
    marginBottom: 4,
  },
  metaBold: {
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  noticeBanner: {
    backgroundColor: "#e0f2fe",
    borderWidth: 1,
    borderColor: "#7dd3fc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
  },
  noticeTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0369a1",
    marginBottom: 3,
  },
  noticeText: {
    fontSize: 8.5,
    color: "#0c4a6e",
    lineHeight: 1.35,
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
  logoDataUrl?: string | null;
}

export function QuotePdfDocument({
  quote,
  customerName,
  qrCodeDataUrl,
  logoDataUrl,
}: PdfDocumentProps) {
  const currentDate = new Date().toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document title={`Solicitud ${quote.folio} - Pasaporte Pandi`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            {logoDataUrl ? (
              <Image src={logoDataUrl} style={styles.logo} />
            ) : null}
            <View>
              <Text style={styles.brandName}>{brandConfig.name}</Text>
              <Text style={styles.brandTagline}>{brandConfig.tagline}</Text>
            </View>
          </View>
          <View style={styles.folioBox}>
            <Text style={styles.folioBadge}>{quote.folio}</Text>
            <Text style={styles.dateText}>Emitida el {currentDate}</Text>
          </View>
        </View>

        <Text style={styles.docTitle}>Solicitud de cotización inicial</Text>
        <Text style={styles.docSubtitle}>
          Documento de preferencias del viajero. No incluye tarifas ni propuesta vinculante.
        </Text>

        <View style={styles.tripOverview}>
          <Text style={styles.destinationTitle}>{quote.destinationLabel}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>
              Solicitante: <Text style={styles.metaBold}>{customerName}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Viajeros:{" "}
              <Text style={styles.metaBold}>
                {quote.adults} Adulto(s)
                {quote.children > 0 ? `, ${quote.children} Menor(es)` : ""}
              </Text>
            </Text>
            <Text style={styles.metaItem}>
              Mes tentativo: <Text style={styles.metaBold}>{quote.travelMonth.toUpperCase()}</Text>
            </Text>
            <Text style={styles.metaItem}>
              Folio: <Text style={styles.metaBold}>{quote.folio}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.noticeBanner}>
          <Text style={styles.noticeTitle}>Pendiente de cotización formal</Text>
          <Text style={styles.noticeText}>
            El cliente solicita que un asesor prepare disponibilidad, opciones de cabina/hotel y
            tarifa real. Este PDF solo resume los datos capturados en el cotizador web.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Alcance orientativo del destino</Text>
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
              Acompañamiento concierge y seguimiento por WhatsApp con un asesor Pandi
            </Text>
          </View>
        </View>

        <View style={styles.footerHandoff}>
          <View style={styles.contactDetails}>
            <Text style={styles.contactTitle}>Contacto Pasaporte Pandi</Text>
            <Text style={styles.contactText}>
              Escanea el QR o escribe por WhatsApp mencionando el folio de esta solicitud.
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
