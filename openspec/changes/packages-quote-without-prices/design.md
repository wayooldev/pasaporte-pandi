## Context

See proposal.md — Why. The public cotizador already builds a `QuoteCalculationResult` (folio, destination, travelers, month), opens `LeadModal`, and hands off via `generateWhatsAppHandoffUrl` without prices. Package cards still render `priceFromUsd` / `installmentsText` and open a raw `wa.me` string that embeds the list price. Package `category` already matches wizard destination keys (`disney` | `crucero` | `europa` | `playa`).

## Goals / Non-Goals

**Goals:**
- Remove all public price/installment UI from package card and detail.
- Reuse the existing quote-request + lead + WhatsApp path with package identity attached.
- Collect adults / children / month in-context (mini form / modal), not via deep-link alone.

**Non-Goals:**
- Removing `priceFromUsd` from DB, seed, admin, or APIs used only internally.
- Redesigning the full-page `#cotizador` wizard UX.
- Fixing hero/trust DIY copy outside the packages section (optional follow-up).
- Attaching PDF files inside WhatsApp (same limitation as cotizador).

## Decisions

### 1. Mini-wizard modal from the package (Approach B), not deep-link only
**Choice:** From card/detail, open an in-context form (travelers + month) with package locked, then feed the same `LeadModal` / WhatsApp handoff as the cotizador.

**Why:** Keeps the user on the package they chose; matches “igual adultos/niños… por WhatsApp”. Deep-link to `#cotizador` alone would drop package title to a generic category.

**Alternative considered:** Deep-link with `?destination=` only — rejected as primary path because package-specific identity is a requirement.

### 2. Anchor to concrete package + map category → destination
**Choice:** Carry `packageTitle` / `packageSlug` (and optional duration) on the quote request payload used for WhatsApp (and lead notes if no dedicated column). Use `pkg.category` as `destinationKey` for `buildQuoteRequest` / inclusions.

**Why:** Spec requires package identity; destination config already powers inclusions/folio mechanics.

**Alternative considered:** New destination key per package slug — overkill; packages share category baselines.

### 3. Extend WhatsApp / quote result, keep LeadModal shape
**Choice:** Extend `QuoteCalculationResult` (or a thin wrapper / optional fields) with package reference fields; update `generateWhatsAppHandoffUrl` to include a package line when present. Reuse `LeadModal` as-is for contact capture. Prefer putting package title into lead `notes` prefix or destination label enrichment if schema change is undesirable this round.

**Why:** Minimal blast radius; admin lead list already shows destination text.

**Alternative considered:** New DB column `packageSlug` — defer unless product needs filtering/reporting now.

### 4. Replace price block with quote CTA chrome
**Choice:** Card footer becomes duration/highlights + “Solicitar cotización” (and keep “Ver itinerario”). Detail footer drops “Inversión sugerida” block for the same quote CTA. Remove installment badge entirely from public UI.

**Why:** Spec forbids installment marketing as well as USD amounts.

### 5. Admin keeps prices
**Choice:** No migration to drop columns; public components simply stop reading price fields for display and messaging.

## Risks / Trade-offs

- [Users expect a number on cards] → Mitigation: clear copy that an advisor quotes with real availability; same messaging as cotizador result.
- [Package title lost if only destinationLabel is sent] → Mitigation: explicit package fields in WA message and lead notes.
- [Duplicated traveler/month UI vs wizard] → Mitigation: extract a small shared travelers/month form or reuse schema (`quoteWizardSchema` fields) to avoid drift.
- [Tests still assert prices] → Mitigation: update `packages-catalog.test.tsx` / card tests in the same change.

## Migration Plan

1. Ship UI + handoff changes together (no feature flag required for a marketing site).
2. Rollback = revert front-end; DB unchanged.
3. No data backfill.

## Open Questions

- None blocking: PDF branding for package-anchored requests can keep current cotizador PDF and mention package in WhatsApp/notes first; enriching PDF title is optional if time allows in tasks.
