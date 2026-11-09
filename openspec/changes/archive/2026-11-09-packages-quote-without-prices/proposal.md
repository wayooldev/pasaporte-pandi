## Why

No es posible publicar precios en el sitio. El cotizador mágico ya solicita cotización por WhatsApp sin montos, pero el catálogo de paquetes y su detalle siguen mostrando `Desde $X USD`, mensualidades y un atajo de WhatsApp con precio embebido — inconsistente y riesgoso.

## What Changes

- **BREAKING (UX):** Las cards de paquetes y el modal de detalle dejan de mostrar `priceFromUsd`, rangos “desde”, y `installmentsText` en la UI pública.
- **BREAKING (UX):** El CTA “Apartar” / WhatsApp directo con mensaje que incluye precio se reemplaza por un flujo de **solicitud de cotización** alineado al cotizador.
- Desde card o detalle, el visitante abre un mini-flujo con el **paquete concreto precargado** (título/slug + categoría como destino), completa adultos, niños y mes tentativo, y luego usa el mismo handoff de lead + WhatsApp (folio / mensaje sin montos) que el cotizador.
- Copy del catálogo se alinea a “cotiza con un asesor”, no a inversión sugerida.
- Admin y schema pueden seguir guardando precios internamente; no se exponen en la web pública.
- Tests del catálogo/paquete se actualizan para asertar ausencia de precios y presencia del flujo de cotización.

## Capabilities

### New Capabilities

- `packages-quote`: Catálogo y detalle de paquetes sin precios públicos, con solicitud de cotización por WhatsApp anclada al paquete concreto (viajeros + mes + handoff).

### Modified Capabilities

- _(ninguno — `openspec/specs/` no tiene capacidades archivadas; el cotizador sin precios vive en el change `quote-request-flow`)_

## Impact

- UI: `package-card.tsx`, posiblemente `packages-catalog.tsx`; reutilizar piezas del wizard (`buildQuoteRequest` / lead modal / WhatsApp) o extraer un mini-form compartido.
- Lib: `whatsapp.ts` / `calculator.ts` — extender el payload de solicitud para incluir referencia al paquete (título/slug) además del destino de categoría.
- API/leads: opcionalmente persistir nombre/slug del paquete en notes o un campo si ya existe; mínimo, incluirlo en el mensaje de WhatsApp y en el resumen de solicitud.
- DB/admin: sin obligación de eliminar `priceFromUsd`; solo dejar de renderizarlo en público.
- Tests: `packages-catalog.test.tsx` y cualquier test del card/modal.
