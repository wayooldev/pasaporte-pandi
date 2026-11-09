## Why

Las cotizaciones reales son laboriosas y el cotizador actual muestra rangos de precio y una comparativa DIY que generan expectativa falsa. El visitante necesita armar una **solicitud de cotización** (datos del viaje + folio) y pasársela al asesor por WhatsApp con un PDF de solicitud, no ver una tarifa instantánea.

## What Changes

- **BREAKING (UX):** El resultado del cotizador deja de mostrar presupuesto estimado Pandi, ahorro, precio por persona y la tarjeta comparativa DIY.
- **BREAKING (UX):** Se elimina el paso 3 del wizard (estilo de experiencia: esencial/clasico/deluxe), que hoy se salta con facilidad por el CTA en la misma posición y un default `clasico` opaco.
- El wizard pasa a **2 pasos** (destino → viajeros y mes) y copy de “solicitud / pedir cotización”, no de “calcula cuánto ahorras”.
- La pantalla de resultado muestra resumen de la solicitud (folio, destino, viajeros, mes), inclusiones orientativas **sin montos**, y CTA principal para solicitar por WhatsApp.
- El PDF se rediseña como **solicitud de cotización inicial** (sin precios ni DIY), con branding Pasaporte Pandi (logo, colores, datos de contacto).
- El mensaje de WhatsApp se reformula como solicitud de cotización con folio y datos del viaje (sin montos); el flujo descarga el PDF y abre el chat (wa.me no adjunta archivos).
- Se actualizan tests y copy de marketing del cotizador ligados a precios/DIY en la sección del wizard (hero/trust badges fuera de alcance salvo menciones mínimas del propio cotizador si bloquean coherencia).

## Capabilities

### New Capabilities

- `quote-request`: Flujo de solicitud de cotización del wizard (2 pasos), pantalla de resultado sin precios, PDF de solicitud branded y handoff WhatsApp con mensaje de solicitud.

### Modified Capabilities

- _(ninguno — `openspec/specs/` no tiene capacidades archivadas; el comportamiento previo de precios/DIY vive solo en el change archivable `create-pasaporte-pandi-web`)_

## Impact

- UI: `quote-wizard.tsx`, `quote-result.tsx`, copy del bloque cotizador; posiblemente `lead-modal.tsx` (flujo unificado PDF + WA).
- Lib: `whatsapp.ts` (mensaje sin precios), `pdf-template.tsx` (plantilla solicitud + logo), `calculator.ts` / schema (quitar estilo o dejar de usarlo en UI; folio y resumen siguen siendo necesarios).
- API: `/api/quote-pdf` (payload sin depender de precios mostrados); leads pueden seguir persistiendo campos numéricos como opcionales/null o valores internos no mostrados — decidir en design.
- Tests: `wizard.test.tsx`, `whatsapp.test.ts`, `leads-pdf.test.ts`, `calculator.test.ts` según el alcance del motor.
- Admin: vista de leads si deja de recibir `estimatedPandiUsd` / estilo — ajustar schema/API solo si es necesario para no romper el submit.
