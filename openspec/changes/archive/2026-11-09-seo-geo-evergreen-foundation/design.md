## Context

See proposal.md — Why. Today the Next.js App Router site has root `Metadata` + Open Graph for `pasaportepandi.com`, `lang="es"`, and brand config with specialties/contact/social, but no `robots`/`sitemap`, no JSON-LD entity, noindex gaps on admin/auth, and marketing copy that still mentions DIY savings / “mejor precio” after the quote-without-prices product shift. Catalog packages have slugs and internal prices; public SEO must not depend on them. Linktree currently links only IG / WhatsApp / Facebook / TikTok — not the website.

## Goals / Non-Goals

**Goals:**
- Make the agency entity crawlable and citable from the existing home-first surface.
- Centralize evergreen SEO facts (name, specialties, contact, sameAs) from brand/config so catalog churn does not invalidate SEO.
- Align public copy with quote-only behavior.
- Leave a clear manual step for Linktree → official site.

**Non-Goals:**
- New routes for `/europa`, `/disney`, `/cruceros`, `/playas`, or `/paquetes/[slug]`.
- Product/Offer schema, price rich results, or packaging inventory into the sitemap.
- Editorial blog program or external PR/backlink campaigns.
- Removing internal `priceFromUsd` from DB/admin.

## Decisions

### 1. Home-first evergreen surface (no specialty hubs yet)
**Choice:** Deliver SEO/GEO on `/` (+ legal pages already public) rather than adding destination hubs in this change.  
**Why:** Matches agreed scope; specialties are already stated in brand, destinations strip, and Linktree bio; hubs can be a later change if home entity + FAQ prove insufficient.  
**Alternative considered:** Ship four specialty landings now — deferred to keep the first change foundational and low-churn.

### 2. Next.js MetadataRoute for robots + sitemap
**Choice:** Use App Router `src/app/robots.ts` and `src/app/sitemap.ts` (or equivalent MetadataRoute handlers).  
**Why:** Native, typed, stays in sync with `metadataBase`. Sitemap entries: `/`, `/terminos`, `/privacidad` only.  
**Alternative considered:** Static `public/robots.txt` — rejected because disallow lists and sitemap URL are easier to keep consistent in code next to routes.

### 3. JSON-LD Organization / TravelAgency without Offers
**Choice:** Inject a single JSON-LD block (layout or home) built from brand/SEO config: `@type` Organization and/or TravelAgency, `url`, `logo`, `description`, `areaServed` / specialty keywords in text fields as appropriate, `contactPoint`, `sameAs` = Instagram, Facebook, TikTok, Linktree. No `Offer`, `Product`, `price`, or package list.  
**Why:** GEO/SEO need a stable entity graph; prices and SKUs are explicitly out of product policy.  
**Alternative considered:** FAQPage-only schema — useful but incomplete without Organization; FAQ can be added alongside if on-page FAQ markup is present.

### 4. Brand/config as single source for evergreen SEO facts
**Choice:** Extend or companion `brandConfig` with explicit specialties list and `sameAs` URLs used by metadata, JSON-LD, and FAQ copy.  
**Why:** Prevents drift between Linktree-aligned social URLs, UI, and structured data.  
**Alternative considered:** Hard-coding JSON-LD in layout — rejected as duplication risk.

### 5. noindex for admin and auth
**Choice:** Export `robots: { index: false, follow: false }` (or equivalent) from admin and Clerk sign-in/sign-up page metadata, plus robots.txt Disallow.  
**Why:** Defense in depth; auth pages should not compete or leak into SERP/GEO context.  
**Alternative considered:** robots.txt only — insufficient if URLs are linked or submitted.

### 6. Copy alignment is in scope; inventing new long-form blog is not
**Choice:** Rewrite residual hero/social-proof/footer claims that contradict quote-only (DIY savings on cotizador, catalog “Garantía de Mejor Precio” as priced promise). Prefer “asesoría cercana / cotización personalizada / especialidades”. Add a compact FAQ or “cómo cotizar” block on home if needed for GEO extractability.  
**Why:** Specs require non-contradiction and explainable quote process; a full content site is out of scope.

### 7. Linktree is operational, not code
**Choice:** Track “add official site button on Linktree” as a tasks.md checklist item with owner = human/ops.  
**Why:** Cannot automate Linktree from this repo; still required for entity canonization.

## Risks / Trade-offs

- **[Risk] Home remains a heavy client island** → Mitigation: ensure evergreen headings/FAQ/entity copy are present in initial HTML (server-rendered section or static text in the RSC tree), not only behind post-hydration UI.
- **[Risk] Over-claiming certifications (EarMarked, CLIA, etc.) in schema/copy** → Mitigation: only put verifiable evergreen facts in JSON-LD; leave unverified badge claims out of structured data unless confirmed.
- **[Risk] “Playas” vs “Europa/Disney/Cruceros” emphasis** → Mitigation: all four are first-class specialties per product decision; treat equally in metadata and entity description.
- **[Trade-off] No package URLs** → Fewer long-tail landing pages now; cleaner evergreen entity and no inventory churn tax. Specialty hubs can follow later.

## Migration Plan

1. Ship code: robots, sitemap, JSON-LD, metadata, noindex, copy/FAQ.
2. Verify locally/production: `/robots.txt`, `/sitemap.xml`, Rich Results / schema lint, view-source for FAQ/specialties.
3. Manually add Linktree official site link; spot-check social bios still match `sameAs`.
4. Rollback: revert the change deploy; Linktree button can be removed independently if needed.

## Open Questions

- None blocking: specialty hubs deferred; official domain assumed `https://pasaportepandi.com` as in current `metadataBase`.
