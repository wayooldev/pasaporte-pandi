## Context

See proposal.md — Why. Today `QuoteWizard` step 1 renders flat bordered cards from `DESTINATION_OPTIONS` (Lucide icon + title + subtitle + tag). The site already has the aspirational pattern in `DestinationsStrip` (full-bleed `/brand/destinations/*.jpg` + gradient + white type) and a related product pattern in `PackageCard` (photo hero + content panel). Destination keys already match asset filenames.

## Goals / Non-Goals

**Goals:**
- Implement cinematic destination cards in the wizard step 1 using existing brand photos.
- Match the emotional language of `DestinationsStrip` while remaining a selectable form control inside the wizard shell.
- Preserve form behavior (`destination` enum, default `disney`, validation, step 2 CTA).
- Keep tests locator-friendly (role/text/`data-testid`).

**Non-Goals:**
- New photography or Unsplash fetches for these four options.
- Auto-advance to step 2 on click.
- Redesign of step 2, result, PDF, WhatsApp, or package catalog cards.
- Shared design-system package extraction beyond optional small constant reuse.

## Decisions

### 1. Pattern: cinematic full-bleed (option A), not hybrid PackageCard
- **Choice:** Card surface is the photo; bottom gradient; white title + muted subtitle; tag top-right; selected ring + check/"Seleccionado".
- **Why:** Step 1 copy is desire (“¿A dónde sueñas?”); poster cards convert better than product sheets. Aligns with `DestinationsStrip`.
- **Alternatives:** Hybrid image+white body (more catalog, less desire); tall 4:5 posters (stronger wow, taller wizard — deferred unless cards feel short after implement).

### 2. Image mapping
- **Choice:** Extend `DESTINATION_OPTIONS` with `image: "/brand/destinations/<key>.jpg"` for `disney`, `crucero`, `europa`, `playa`.
- **Why:** Zero new assets; same paths as strip/seed.
- **Alternatives:** Import shared constant from strip — optional cleanup if duplication bothers; not required for ship.

### 3. Rendering
- **Choice:** Prefer `next/image` with `fill` + fixed aspect (e.g. ~4/3 or ~16/10) inside `rounded-2xl overflow-hidden`, mirroring strip’s `object-cover` + hover scale.
- **Why:** Consistent performance/cropping with existing brand section; local public assets work with current Next config.
- **Alternatives:** Plain `<img>` like `PackageCard` — acceptable fallback if wizard client constraints prefer simplicity.

### 4. Icons and tags
- **Choice:** Drop Lucide icons as primary chrome; keep urgency tags (`Más Popular`, etc.) as small pills over the image (backdrop blur / semi-opaque).
- **Why:** Photo replaces icon semantics; tags add sales framing without clutter.

### 5. Accessibility & selection semantics
- **Choice:** Keep click-to-select; add `role="button"` or radio-group semantics + `aria-pressed`/`aria-checked` as fits existing RHF `setValue`; ensure focus ring; ensure gradient keeps WCAG-ish contrast for title.
- **Why:** Visual redesign must not regress keyboard/AT; form value remains the source of truth.

### 6. Layout inside wizard shell
- **Choice:** Keep `grid-cols-1 sm:grid-cols-2 gap-4` inside the existing rounded wizard card; give each destination card a min-height so images feel substantial without exploding mobile scroll before “Siguiente”.
- **Why:** Minimal layout churn; sales impact comes from media, not a new page structure.

## Risks / Trade-offs

- **[Contrast fail on bright photos]** → Strong bottom gradient (`from-black/80` or brand `from-primary/90`) tested against all four JPGs.
- **[Wizard height / scroll fatigue on mobile]** → Cap aspect ratio; avoid portrait 4:5 in the wizard unless desktop-only enhancement is added later.
- **[Duplicate destination metadata vs strip]** → Accept short-term duplication; optional shared map later.
- **[Tests brittle to markup]** → Assert titles, selection, and step advance; add `data-testid` per destination if helpful (`destination-card-disney`).

## Migration Plan

- Pure UI deploy; no data migration.
- Rollback: revert wizard card markup to prior bordered cards; assets remain unused by wizard only.

## Open Questions

- None blocking; aspect ratio fine-tuning can happen during apply/review.
