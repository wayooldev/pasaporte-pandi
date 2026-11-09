## 1. Quote model + WhatsApp package reference

- [x] 1.1 Extend quote request result (or thin wrapper) with optional `packageTitle` / `packageSlug` (and map package category → destination) and verify unit coverage still builds a folio without requiring prices
- [x] 1.2 Update `generateWhatsAppHandoffUrl` to include package reference when present and omit any package list price / installment lines; verify `whatsapp.test.ts` covers package-anchored message without USD prices

## 2. Package UI without prices + mini quote flow

- [x] 2.1 Remove public price and installment UI from package card and detail; verify no `priceFromUsd` / `installmentsText` / “Desde” / “USD” pricing chrome remains in those surfaces
- [x] 2.2 Replace “Apartar” / price-embedded WhatsApp with a package-anchored travelers+month form (card and detail entry points) that builds a quote request for that package; verify the form requires adults, children, and month before handoff
- [x] 2.3 Wire the package quote request into the existing lead + WhatsApp handoff (`LeadModal` or equivalent) and verify opening WhatsApp includes folio + package title and no list prices
- [x] 2.4 Align catalog/section copy away from “inversión / mensualidades como precio” where it contradicts no-price UX; verify package section CTA language is quote-oriented

## 3. Tests

- [x] 3.1 Update/add package catalog/card tests to assert absence of public prices and presence of quote CTA / travelers flow; verify the relevant Vitest suite passes
