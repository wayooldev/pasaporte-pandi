## Why

El Paso 1 del cotizador (“¿A dónde sueñas viajar?”) usa cards planas (icono + texto) que se sienten utilitarias, mientras el resto del sitio ya vende con fotos aspiracionales (`DestinationsStrip`, `PackageCard`). Esa ruptura visual reduce deseo y motiva menos a continuar el flujo. Hay que alinear el selector de destino con el lenguaje visual de paquetes/destinos para atrapar al visitante.

## What Changes

- Rediseñar las cards de destino del Paso 1 del wizard a un estilo **cinematic**: foto full-bleed del destino, gradiente, tipografía blanca y tag de urgencia (p. ej. “Más Popular”).
- Reutilizar las imágenes existentes en `/brand/destinations/{disney,crucero,europa,playa}.jpg` mapeadas a las mismas keys del wizard.
- Definir estados claros de interacción: idle, hover (zoom/sombra) y selected (ring + indicador “Seleccionado”), manteniendo la selección actual y el CTA “Siguiente”.
- Retirar (o dejar de priorizar) los iconos Lucide como elemento principal de la card; la foto y el copy venden el destino.
- Actualizar tests del wizard para aserciones estables (roles/texto/`data-testid`) sin depender de clases de librerías.
- Fuera de alcance: cambios al Paso 2, resultado, PDF, WhatsApp, catálogo de paquetes o assets nuevos de fotografía.

## Capabilities

### New Capabilities

- `wizard-destination-cards`: Presentación visual sales-oriented del selector de destinos del Paso 1 del wizard de cotización (imagen, jerarquía tipográfica, estados de selección).

### Modified Capabilities

- _(ninguno — `openspec/specs/` no tiene capacidades archivadas; el flujo de solicitud vive en changes previos como `quote-request-flow`, sin requisitos de UI de cards con imagen)_

## Impact

- UI: `src/components/wizard/quote-wizard.tsx` (principalmente `DESTINATION_OPTIONS` + grid del Paso 1).
- Assets: reuso de `/public/brand/destinations/*.jpg` (sin nuevas fotos obligatorias).
- Posible extracción menor de constantes compartidas con `destinations-strip.tsx` (mismo mapa key→imagen), opcional.
- Tests: `src/test/wizard.test.tsx` (y snapshots/locators si existen aserciones frágiles de layout).
- Sin cambios de API, schema Zod de destino, calculator, PDF ni WhatsApp.
