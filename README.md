# Pasaporte Pandi

Sitio web de la agencia de viajes **Pasaporte Pandi**: cotizador con comparativa DIY, catálogo de paquetes, PDF de cotización, WhatsApp y panel admin (Clerk).

## Stack

- Next.js 15 · TypeScript · Tailwind · Framer Motion
- Neon PostgreSQL + Drizzle
- Clerk Auth (`/admin`)
- Vitest + GitHub Actions CI
- Deploy: Vercel (auto desde GitHub)

## Desarrollo local

```bash
npm install --legacy-peer-deps
cp .env.example .env.local   # completa DATABASE_URL y Clerk
npm run db:push
npm run db:seed
npm run dev
```

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Build producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest |
| `npm run db:push` | Schema → Neon |
| `npm run db:seed` | Datos iniciales |

### Variables de entorno

Ver `.env.example`. **Nunca** subas `.env.local` ni secretos al repo.

## CI

GitHub Actions (`.github/workflows/ci.yml`) corre lint, typecheck, tests y build en push/PR a `main`.
