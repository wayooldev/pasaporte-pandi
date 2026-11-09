## 1. Data & card structure

- [x] 1.1 Extend `DESTINATION_OPTIONS` in `quote-wizard.tsx` with `image` paths to `/brand/destinations/{disney,crucero,europa,playa}.jpg` and verify each key maps to an existing public asset
- [x] 1.2 Replace flat step-1 cards with cinematic full-bleed markup (image, gradient, title, subtitle, tag) and verify all four destinations render with photos and readable copy in the browser or Story/dev page

## 2. Interaction & a11y

- [x] 2.1 Implement idle / hover / selected states (ring, optional “Seleccionado”, hover scale) without changing destination keys or auto-advancing, and verify selecting another card updates `destination` and keeps the user on step 1 until “Siguiente”
- [x] 2.2 Add keyboard/AT affordances (`aria-pressed` or equivalent + focus ring) and verify focusable selection works for at least one destination via keyboard

## 3. Tests & polish

- [x] 3.1 Update `wizard.test.tsx` (and add `data-testid`s if needed) so step-1 assertions cover titles, selection, and advance to step 2; verify the wizard test suite passes
- [x] 3.2 Spot-check contrast/crop on all four JPGs at mobile and desktop widths and verify titles remain readable and cards do not dominate scroll before the next CTA
