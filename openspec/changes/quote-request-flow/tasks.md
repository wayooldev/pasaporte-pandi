## 1. Request model and wizard (2 steps)

- [x] 1.1 Slim the quote builder (folio, destination label, inclusions; no style step in public inputs) and verify unit tests still cover folio/destination without requiring experience-style UI
- [x] 1.2 Remove wizard step 3 and experience-style UI/schema from `quote-wizard` / `wizard-schema`; update headings to solicitud copy; verify wizard test goes step 1 → 2 → summary without style options
- [x] 1.3 Rewrite `quote-result` as request summary (folio, trip data, inclusions, no prices/DIY); verify result test asserts absence of DIY/price copy and presence of WhatsApp CTA

## 2. PDF solicitud branded

- [x] 2.1 Redesign `pdf-template` as solicitud (logo, brand colors, trip meta, disclaimer, no price/DIY blocks); verify PDF generation test still returns `application/pdf`
- [x] 2.2 Wire logo loading in `/api/quote-pdf` (filesystem or data URL) and verify generated PDF path does not throw when logo file exists

## 3. WhatsApp + lead handoff

- [x] 3.1 Rewrite `generateWhatsAppHandoffUrl` as solicitud message without prices/savings; verify `whatsapp.test.ts` expectations
- [x] 3.2 Update lead modal flow to download PDF then open WhatsApp; keep lead persistence compatible with API; verify leads/PDF tests and that success path invokes WhatsApp URL construction

## 4. Copy and regression

- [x] 4.1 Align cotizador section copy (and any blocking wizard-adjacent strings) with solicitud framing; verify no “calcula cuánto ahorras” / DIY comparator CTA remains in the wizard block
- [x] 4.2 Run the relevant Vitest suites (`wizard`, `whatsapp`, `leads-pdf`, `calculator` as needed) and verify they pass
