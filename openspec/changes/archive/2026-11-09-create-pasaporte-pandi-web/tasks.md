# Tasks: Create Pasaporte Pandi Web Platform

## 1. Project Initialization & Architecture Setup

- [x] 1.1 Initialize Next.js 15 project with TypeScript, Tailwind CSS, and ESLint, and verify project builds and starts via `npm run build`
- [x] 1.2 Setup shadcn/ui and configure semantic CSS design tokens in `globals.css` and brand metadata in `src/config/brand.ts`, verifying token colors render on a test page
- [x] 1.3 Configure Vitest and React Testing Library testing harness, verifying execution via `npm test`
- [x] 1.4 Setup GitHub Actions CI workflow in `.github/workflows/ci.yml` verifying linting, type-checking, and test jobs

## 2. Database & Data Layer (Neon & Drizzle)

- [x] 2.1 Install Drizzle ORM and `@neondatabase/serverless`, defining schema for `packages` and `quote_leads`, and verify TypeScript compilation
- [x] 2.2 Create database seed script with the 4 flagship packages (Disney Orlando, Caribe Cruise, Europa Clásica, Cancún Resort) and baseline pricing rules, verifying seed script execution
- [x] 2.3 Implement database client helper with mock fallback for local development without active credentials, verifying query execution

## 3. Brand Identity & Visual Storefront Components

- [x] 3.1 Build navigation header with Pandi SVG logo, navigation anchors, WhatsApp CTA, and mobile hamburger menu, verifying responsive toggle
- [x] 3.2 Build Hero section with high-converting value copy, Pandi trust badges, and quick CTA triggers, verifying visual alignment across screen sizes
- [x] 3.3 Build Social Proof & Community section with Instagram/TikTok traveler testimonials and certified agency badges, verifying layout
- [x] 3.4 Build persistent mobile bottom action bar with pulsating WhatsApp trigger, verifying visibility only on viewport widths under 768px
- [x] 3.5 Build footer with brand description, social links (IG, TikTok, FB), copyright, and discreet admin login link

## 4. Interactive 3-Step Quote Wizard & Savings Comparator

- [x] 4.1 Implement quote pricing calculation and DIY savings comparison engine with unit tests verifying calculations and edge cases
- [x] 4.2 Build 3-step Wizard UI (Destination, Travelers & Dates, Experience Style) using React Hook Form and Zod, verifying navigation and validation
- [x] 4.3 Build Quote Result card displaying estimated price range, inclusions checklist, and the DIY vs Pandi savings breakdown, verifying reactive updates
- [x] 4.4 Build direct WhatsApp handoff utility generating pre-filled encoded chat links containing the quote folio and details, verifying URL format

## 5. Lead Capture & PDF Quote Export

- [x] 5.1 Implement Lead Capture modal requesting name and WhatsApp/email with Zod validation, verifying lead persistence in database
- [x] 5.2 Implement PDF quote generation template with `@react-pdf/renderer` in a Node.js API route, verifying downloadable PDF includes folio, inclusions, and WhatsApp QR code

## 6. Packages Catalog & Detail Views

- [x] 6.1 Build packages catalog section with category filter buttons (Todos, Disney & Universal, Cruceros, Europa, Playas), verifying filter behavior
- [x] 6.2 Build package card and detailed view displaying duration, itinerary highlights, price from USD, installment notes, and WhatsApp CTA

## 7. Protected Admin Portal (Clerk Auth)

- [x] 7.1 Configure Clerk authentication middleware protecting `/admin/*` routes, verifying unauthorized requests are redirected to sign-in
- [x] 7.2 Build Admin Dashboard page displaying captured quote leads with status toggles (new, contacted, converted)
- [x] 7.3 Build Admin Package Management interface allowing package creation, editing, and pricing baseline adjustments, verifying updates in database

## 8. Quality Assurance & Deployment Configuration

- [x] 8.1 Execute full test suite (`npm test`) and typecheck (`npm run typecheck`), verifying 100% pass rate
- [x] 8.2 Verify production build (`npm run build`) and validate Cloudflare Full (Strict) SSL compatibility and OpenGraph metadata
