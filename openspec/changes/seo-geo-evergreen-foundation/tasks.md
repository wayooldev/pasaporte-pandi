## 1. Evergreen config source of truth

- [x] 1.1 Extend brand/SEO config with explicit specialties (`europa`, `disney`, `cruceros`, `playas`), official site URL, and `sameAs` social/Linktree URLs; verify TypeScript types compile and values match current public channels
- [x] 1.2 Wire root metadata (title/description/Open Graph) to evergreen agency + specialties + cotización messaging without price language; verify `npm run typecheck` and that rendered meta tags omit “desde $” / DIY savings amounts

## 2. Crawl controls

- [x] 2.1 Add `robots.ts` allowing public pages and disallowing admin/auth paths; verify `/robots.txt` lists sitemap URL and expected Disallow rules
- [x] 2.2 Add `sitemap.ts` with only evergreen public URLs (`/`, `/terminos`, `/privacidad`); verify `/sitemap.xml` excludes admin, auth, and package routes
- [x] 2.3 Add `noindex` robots metadata on admin and sign-in/sign-up pages; verify those routes emit robots noindex in head

## 3. Entity structured data and on-page evergreen content

- [x] 3.1 Add Organization/TravelAgency JSON-LD (no Offer/price/package SKUs) using the config from 1.1; verify page HTML includes JSON-LD with `sameAs` for IG, FB, TikTok, Linktree
- [x] 3.2 Ensure home presents crawlable evergreen copy for the four specialties and how-to-cotizar / FAQ-style process (solicitud → asesor WhatsApp); verify content is present in initial HTML independent of package inventory
- [x] 3.3 Optionally add FAQPage JSON-LD only for the evergreen FAQ questions actually rendered; verify FAQ schema questions match visible copy and contain no prices

## 4. Copy alignment with quote-only product

- [x] 4.1 Rewrite hero / benefits / footer residual DIY-savings and “compara ahorro” claims to asesoría + cotización language; verify those strings no longer appear in the named components
- [x] 4.2 Align social-proof “Garantía de Mejor Precio” (and similar) with non-catalog positioning or remove; verify public marketing sections do not claim on-site price comparison

## 5. Verification and ops follow-up

- [x] 5.1 Run lint/typecheck/tests relevant to touched UI and confirm production build succeeds (`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`)
- [ ] 5.2 Manually add Linktree button/link to official site `https://pasaportepandi.com` labeled as sitio oficial; verify Linktree shows the new destination alongside existing social/WhatsApp links
