## Why

Pasaporte Pandi is a quote-first travel agency (asesoría cercana via WhatsApp), not a price catalog. The public site today has only thin root metadata and almost no crawlable evergreen entity signal, so search engines and generative engines cannot reliably discover or cite what does not change: the agency identity, specialties (Europa, Disney, Cruceros, Playas), and how to request a quote. Social hubs (Linktree, IG, FB, TikTok, WhatsApp) already express that identity; the website should become the canonical evergreen source without anchoring SEO to mutable packages or prices.

## What Changes

- Establish **evergreen SEO/GEO foundation** on the existing home-first surface (no new destination hub routes in this change).
- Add technical crawl basics: `robots.txt`, `sitemap.xml`, and `noindex` for admin/auth routes.
- Publish structured entity data (`Organization` / `TravelAgency`) with stable `sameAs` links to Instagram, Facebook, TikTok, Linktree, and the official site — **without** Product/Offer/price schema.
- Strengthen home metadata and on-page evergreen copy around agency identity, four specialties, close advisory, and quote request process (FAQ / how-to-cotizar style content as needed).
- Align residual marketing copy that still implies public DIY price comparison or “best price” guarantees with the quote-only product model.
- Document a **manual** follow-up: add `https://pasaportepandi.com` as the official site link on Linktree (outside the repo).
- **Out of scope:** indexable package detail URLs, price-based rich results, blog/SKU inventory SEO, new `/europa|/disney|/cruceros|/playas` hubs.

## Capabilities

### New Capabilities

- `seo-geo-evergreen`: Evergreen agency discoverability for search and generative engines — crawl controls, entity structured data, stable metadata/copy about specialties and quote process, without exposing prices or mutable package inventory as the SEO axis.

### Modified Capabilities

- _(none — `openspec/specs/` has no archived capabilities; quote-without-prices behavior remains as previously shipped in archived changes)_

## Impact

- App Router: root `layout` metadata, likely `robots.ts` / `sitemap.ts`, optional JSON-LD component on home/layout; `noindex` on admin and Clerk sign-in/sign-up.
- Marketing UI: hero / social-proof / footer / brand-adjacent copy that contradicts quote-only positioning.
- Config: `brand.ts` (and possibly a small SEO/entity config) as source of truth for specialties, contact, and `sameAs` URLs.
- Ops/manual: Linktree “sitio oficial” → `pasaportepandi.com`.
- No DB/schema changes; package prices stay internal and unpublished.
