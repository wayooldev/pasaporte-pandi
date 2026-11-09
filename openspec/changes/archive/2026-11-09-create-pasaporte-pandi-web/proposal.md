# Proposal: Create Pasaporte Pandi Travel Web Platform

## Why

Pasaporte Pandi is a specialized travel agency (Disney/Universal, Cruises, Europe, Caribbean Resorts) currently operating through social channels (Linktree, Instagram, TikTok, Facebook, WhatsApp). Without a centralized digital platform, prospective travelers face high friction when exploring destinations, estimating travel costs, and understanding the financial and logistical value of booking through an agency.

Building a fast, responsive, conversion-focused web platform equipped with an instant 3-step quote wizard, a tangible savings comparator ("Independent vs. Pandi"), PDF itinerary export, packages catalog, Neon persistence, and Clerk-protected administration will drastically elevate lead capture, build trust, and automate sales qualification.

## What Changes

- **Branding & Theme Tokens**: Implement a centralized design token architecture (`globals.css` + `src/config/brand.ts`) using Tailwind CSS and shadcn/ui to allow instant brand and color palette adjustments without touching component code.
- **Conversion Landing Page**: High-impact, mobile-first responsive homepage featuring Hero with value proposition, Pandi trust badges, social proof from TikTok/Instagram, dynamic WhatsApp floating widget with preset intent selectors, and discreet footer admin access.
- **Interactive 3-Step Quote Wizard**: Real-time travel cost estimator based on destination, traveler party, dates, and experience style, featuring:
  - Instant pricing breakdown and inclusion lists.
  - Interactive "Savings & Value Comparator" contrasting DIY costs vs. Pasaporte Pandi benefits and savings.
  - WhatsApp direct handoff with pre-populated quote folio and summary.
- **PDF Itinerary & Quote Export**: Generate branded, downloadable PDF quotes with travel breakdown, inclusion details, and QR code linked to WhatsApp assistance. Requires traveler name and phone/email to capture leads into database.
- **Travel Packages Catalog**: Interactive catalog with category filters (Disney & Universal, Cruceros, Europa, Playas), detailed cards, pricing, payment installment messaging, and pre-seeded production-ready travel packages.
- **Admin Dashboard & Database Persistence**:
  - PostgreSQL persistence on Neon serverless via Drizzle ORM for travel packages, pricing baselines, generated quotes, and leads.
  - Role-protected administration powered by Clerk Auth with discreet entrypoint in the footer.
- **Testing & CI/CD Pipeline**:
  - Unit and integration tests with Vitest and React Testing Library.
  - GitHub Actions workflow (`.github/workflows/ci.yml`) enforcing linting, type-checking, automated testing, and build verification on push and pull requests.
  - Vercel deployment configuration optimized for Cloudflare Full (Strict) SSL and edge performance.

## Capabilities

### New Capabilities
- `travel-platform`: Covers the core Pasaporte Pandi web application, including the design system, landing page, 3-step quote wizard with savings comparator, PDF exporter, packages catalog, Neon/Drizzle persistence, and Clerk-protected admin portal.
- `ci-cd-pipeline`: Covers automated quality gates, Vitest testing harness, GitHub Actions CI workflow, and deployment configuration for Vercel behind Cloudflare.

### Modified Capabilities
<!-- None: This is a greenfield project -->

## Impact

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, shadcn/ui, Framer Motion, Lucide Icons.
- **Backend / Database**: Neon PostgreSQL, Drizzle ORM, Drizzle Kit.
- **Auth**: Clerk (`@clerk/nextjs`).
- **Exporting**: `@react-pdf/renderer` with serverless-compatible node runtime.
- **Testing & Quality**: Vitest, `@testing-library/react`, ESLint, TypeScript.
- **Deployment & DNS**: Vercel Git integration, Cloudflare DNS & SSL proxy.
