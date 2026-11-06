# Technical Design: Pasaporte Pandi Web Platform

## Context

See [proposal.md](proposal.md) for business motivation and [specs/](specs/) for normative behavioral requirements.

This is a greenfield project establishing the online footprint of travel agency Pasaporte Pandi. The application must achieve sub-second load times, mobile-first responsiveness, dynamic PDF generation, and secure administration, backed by Neon PostgreSQL and Clerk Auth, deployed to Vercel behind Cloudflare.

## Goals / Non-Goals

**Goals:**
- Provide a responsive, high-converting public storefront with a 3-step quote wizard, savings comparator, and packages catalog.
- Support immediate, zero-friction adjustments to colors and brand identity via centralized design tokens in `globals.css` and `src/config/brand.ts`.
- Deliver lead capture with instant PDF download and pre-filled WhatsApp handoffs.
- Enable protected administrative operations (CRUD for packages, viewing leads, editing pricing rules) via Clerk Auth.
- Ensure regression-free development through a Vitest test suite and automated GitHub Actions CI pipeline.

**Non-Goals:**
- Real-time Global Distribution System (GDS) API integration with airlines (Amadeus/Sabre) in v1 (pricing uses dynamic baseline engine).
- Direct payment processing or checkout on-site (commercial strategy is high-touch sales closing via WhatsApp).
- End-user public account creation (authentication is restricted strictly to administrators).

## Decisions

### 1. Framework & UI: Next.js 15 (App Router) + Tailwind CSS + shadcn/ui
- **Decision**: Use Next.js 15 with React Server Components, Tailwind CSS, shadcn/ui primitives, and Framer Motion for micro-interactions.
- **Rationale**: Server components maximize SEO and minimize client bundle size, critical for mobile users arriving from TikTok/Instagram ads.
- **Alternative Considered**: Single Page Application (Vite + React). Rejected due to inferior OpenGraph/SEO capabilities and lack of unified API routes for PDF generation.

### 2. Design System & Theme Tokens: Semantic CSS Variables
- **Decision**: Define colors semantically using CSS variables in `globals.css` (`--primary`, `--accent`, `--card`, `--background`, `--foreground`) and brand copy in `src/config/brand.ts`.
- **Rationale**: Eliminates hardcoded hex values. A color palette revision requires changing only 1 line in `globals.css` and instantly updates 100% of the site.
- **Alternative Considered**: Hardcoded Tailwind color classes (`bg-teal-500`). Rejected because rebranding or palette pivoting would require manual refactoring across dozens of files.

### 3. Database & ORM: Neon (Serverless Postgres) + Drizzle ORM
- **Decision**: Use Neon serverless Postgres with `@neondatabase/serverless` and Drizzle ORM (`drizzle-kit` for schema migrations).
- **Rationale**: Drizzle is ultra-lightweight with zero engine binary overhead and executes queries over Neon's HTTP driver with negligible cold starts in Vercel serverless functions.
- **Alternative Considered**: Prisma. Rejected due to larger client bundle size and cold-start penalties in serverless environments.

### 4. Authentication: Clerk Auth for Administration
- **Decision**: Protect `/admin/*` routes using `@clerk/nextjs` middleware, hiding administrative login links in the footer.
- **Rationale**: Provides turnkey session security, MFA, and user management with zero maintenance overhead.
- **Alternative Considered**: Custom JWT / NextAuth. Rejected to avoid boilerplate code and security maintenance for a single-admin role.

### 5. Document Generation: `@react-pdf/renderer` in Node.js API Route
- **Decision**: Generate branded travel proposal PDFs on-demand using `@react-pdf/renderer` inside an API route configured with `export const runtime = 'nodejs'`.
- **Rationale**: Allows precise typographic and visual layout matching Pasaporte Pandi's aesthetic with embedded QR codes.
- **Alternative Considered**: Client-side canvas/screenshot print (`html2canvas`). Rejected due to poor print quality, distorted mobile styling, and lack of selectable text.

### 6. Testing & CI/CD: Vitest + GitHub Actions + Vercel
- **Decision**: Implement unit and integration tests using Vitest and React Testing Library, executed on every PR via GitHub Actions (`.github/workflows/ci.yml`).
- **Rationale**: Vitest shares Vite/ESM compilation speed and executes tests in seconds. Vercel integrates automatically with GitHub for branch previews and production deploys.

## Data Model (Neon / Drizzle)

```
+--------------------------------------------------------------------------+
| packages                                                                 |
+--------------------------------------------------------------------------+
| id: uuid (PK)                                                            |
| slug: varchar(100) (UNIQUE)                                              |
| title: varchar(255)                                                      |
| category: varchar(50) (disney | crucero | europa | playa)                 |
| description: text                                                        |
| duration_days: int                                                       |
| price_from_usd: decimal(10,2)                                            |
| installments_text: varchar(100)                                          |
| inclusions: jsonb (array of strings)                                     |
| image_url: text                                                          |
| is_featured: boolean                                                     |
| created_at: timestamp                                                    |
+--------------------------------------------------------------------------+
               ^
               |
+--------------------------------------------------------------------------+
| quote_leads                                                              |
+--------------------------------------------------------------------------+
| id: uuid (PK)                                                            |
| folio: varchar(20) (UNIQUE, e.g. PANDI-2026-XXXX)                        |
| customer_name: varchar(150)                                              |
| customer_contact: varchar(100) (phone or email)                          |
| destination: varchar(100)                                                |
| adults: int                                                              |
| children: int                                                            |
| travel_month: varchar(50)                                                |
| experience_style: varchar(50)                                            |
| estimated_pandi_usd: decimal(10,2)                                       |
| estimated_diy_usd: decimal(10,2)                                         |
| status: varchar(30) (new | contacted | converted)                        |
| created_at: timestamp                                                    |
+--------------------------------------------------------------------------+
```

## Risks / Trade-offs

- **[Risk] Cloudflare & Vercel SSL Redirect Loops**: Misconfiguring Cloudflare SSL mode to "Flexible" produces `ERR_TOO_MANY_REDIRECTS` with Vercel's edge certificates.
  - *Mitigation*: Explicitly document and verify Cloudflare SSL mode is set to "Full (Strict)" with DNS proxy active.
- **[Risk] Heavy PDF Generation Latency**: Generating high-res PDFs on serverless functions could slow down user response.
  - *Mitigation*: Optimize PDF document assets, generate vector elements natively, and provide immediate client-side loading indicators with toast alerts.
- **[Risk] Neon Connection Limits during Viral Social Traffic**: Social media spikes from TikTok could overwhelm DB connections.
  - *Mitigation*: Use `@neondatabase/serverless` connection pooler and cache static package catalog data via Next.js ISR (`revalidate`).

## Migration & Deployment Plan

1. **Initial Repository Setup**: Initialize Next.js 15, Tailwind CSS, shadcn/ui, Vitest, and GitHub Actions workflow.
2. **Database Provisioning**: Configure Neon PostgreSQL connection string and execute Drizzle migrations for `packages` and `quote_leads`.
3. **Seed Data Ingestion**: Insert production-ready seed packages (Disney Orlando, Caribe Cruise, Europa Clásica, Cancún Resort) and baseline pricing rules.
4. **Authentication Setup**: Link Clerk application keys and configure middleware for `/admin` routes.
5. **Deployment & Domain Mapping**: Connect GitHub repo to Vercel, configure environment variables, and map custom domain in Cloudflare pointing to Vercel CNAME with Full (Strict) SSL.
