## Context

See proposal.md — Why. Today `QuoteWizard` is 3 steps; `calculateQuote` drives priced UI in `quote-result.tsx`, priced PDF in `pdf-template.tsx`, and priced copy in `whatsapp.ts`. Step 3 (`experienceStyle`) is easy to skip because the footer CTA swaps from `type="button"` to `type="submit"` in the same position while defaulting to `clasico`. Lead capture already downloads PDF via `/api/quote-pdf` but does not open WhatsApp.

## Goals / Non-Goals

**Goals:**
- Two-step wizard → solicitud summary without prices/DIY.
- Branded PDF as solicitud (logo from `/brand/pandi-logo.png`, brand colors).
- Unified handoff: capture lead → download PDF → open WhatsApp with solicitud message.
- Keep folio generation and lead persistence working for admin.

**Non-Goals:**
- Uploading PDF to storage / deep link in WhatsApp (wa.me cannot attach; link-hosting deferred).
- Rewriting the entire marketing site (hero/footer DIY badges) beyond cotizador copy needed for coherence.
- Building a real pricing engine for advisors inside admin.
- Clerk/admin redesign beyond nullable or defaulted lead fields if schema requires numbers.

## Decisions

### 1. Drop experience style from the public wizard
- **Choice:** Remove step 3 and `experienceStyle` from the public form schema / result labels. Use a fixed internal default (e.g. `clasico`) only if DB/API still require the column, or stop sending style from the client and default server-side.
- **Why:** Spec says PDF/request use steps 1–2 only; step 3 was skipped/confusing.
- **Alternatives:** Keep step 3 with label fix and click-guard — rejected for this change.

### 2. Keep a slim “request builder” instead of deleting `calculator.ts`
- **Choice:** Retain folio + destination label + inclusions lookup; stop surfacing price fields in UI/PDF/WA. Price fields may remain on the type for now but MUST NOT render; prefer a dedicated `buildQuoteRequest()` (or slim `calculateQuote` path) that omits presenting DIY/savings.
- **Why:** Minimal churn for inclusions config and folio; admin/leads may still store optional estimates later.
- **Alternatives:** Delete pricing engine entirely — higher risk to tests/admin in one PR.

### 3. Lead modal becomes the WhatsApp + PDF gate
- **Choice:** Primary CTA on summary opens lead modal (name + contact). On success: persist lead → generate PDF download → `window.open` WhatsApp URL with solicitud text (include name when known). Secondary “solo PDF” optional only if needed; default is one flow.
- **Why:** Already persists leads and generates PDF; closes the gap that WA and PDF were separate.
- **Alternatives:** Separate buttons — weaker than the requested single intent.

### 4. PDF = solicitud layout with embedded logo
- **Choice:** Rewrite `QuotePdfDocument` sections: header with logo image + brand name, folio badge, trip meta (destino, viajeros, mes, solicitante), short “solicitud de cotización — sin tarifa” disclaimer, inclusions without money, footer contact (no price/DIY banners). Embed `public/brand/pandi-logo.png` via absolute file URL or base64 suitable for `@react-pdf/renderer` in the Node route.
- **Why:** Matches brand and removes false price proposal framing.

### 5. WhatsApp copy without prices
- **Choice:** Rewrite `generateWhatsAppHandoffUrl` lines to solicitud language; drop presupuesto/ahorro lines; keep folio, destino, viajeros, mes.
- **Why:** Spec requirement; avoids contradicting “no prices on web.”

### 6. Leads API compatibility
- **Choice:** Continue posting leads with `estimatedPandiUsd` / `estimatedDiyUsd` only if columns remain NOT NULL — use `0` or omit-and-default server-side rather than showing numbers to users. Prefer making estimates optional in API validation if schema allows; otherwise send `0` with a code comment that values are not customer-facing.
- **Why:** Avoid a Neon migration in this change unless trivial; do not block the UX change.

## Risks / Trade-offs

- **[Risk] Users still expect instant prices** → Mitigation: clear copy on wizard (“Solicitud de cotización”; “Un asesor te responde con disponibilidad y tarifa”).
- **[Risk] WhatsApp without attached PDF** → Mitigation: message instructs attaching the downloaded PDF / references folio; document limitation in UI microcopy.
- **[Risk] Logo fails in react-pdf** → Mitigation: resolve path via `path.join(process.cwd(), 'public/brand/pandi-logo.png')` or pass data URL from the API route; fallback to text wordmark if image missing.
- **[Risk] Admin still shows $0 estimates** → Mitigation: acceptable short-term; follow-up to hide/optionalize columns.

## Migration Plan

1. Ship UI/PDF/WA/tests together (feature is UX-coherent only as a unit).
2. No DB migration required if leads keep numeric placeholders.
3. Rollback: revert change; previous priced flow returns.

## Open Questions

None blocking — storage-backed PDF links deferred by design.
