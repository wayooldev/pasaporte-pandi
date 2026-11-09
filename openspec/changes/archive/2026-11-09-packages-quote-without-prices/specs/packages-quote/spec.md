## Purpose

Permite al visitante explorar paquetes y destinos sin ver precios públicos, y solicitar una cotización formal por WhatsApp con el paquete concreto precargado tras indicar viajeros y mes tentativo.

## ADDED Requirements

### Requirement: Public package surfaces show no prices
The system SHALL NOT display monetary amounts, “desde” / “from” price labels, per-person USD figures, or installment marketing text (`installmentsText` or equivalent) on package cards or package detail views in the public site.

#### Scenario: Package card without price
- **WHEN** a visitor views a package card in the catalog
- **THEN** the card shows destination/category, duration, description and highlights without any USD amounts or installment phrases

#### Scenario: Package detail without price
- **WHEN** a visitor opens the package detail view
- **THEN** the detail shows itinerary/inclusions content without investment amounts, USD totals, or installment phrases

### Requirement: Package-anchored quote request collects travelers and month
The system SHALL let the visitor start a quote request from a package card or detail with that specific package preselected. Before WhatsApp handoff, the system MUST collect adult count, child count, and tentative travel month. The destination category MAY be derived from the package category for quote-request mechanics.

#### Scenario: Start from package card
- **WHEN** the visitor activates the primary quote action on a package card
- **THEN** a quote-request flow opens with that package identity preselected and prompts for adults, children, and travel month

#### Scenario: Start from package detail
- **WHEN** the visitor activates the quote action from package detail
- **THEN** the same package-anchored traveler/month collection is available without requiring them to re-pick the package

#### Scenario: Package identity preserved
- **WHEN** the visitor completes travelers and month for a package-anchored request
- **THEN** the resulting quote request references the concrete package (title and/or slug), not only a generic destination category

### Requirement: WhatsApp handoff without prices for package quotes
The system SHALL complete package quote requests via the same class of WhatsApp handoff used by the magic cotizador: lead capture as required by that flow, a message framed as a formal quote request including folio and trip inputs plus the package reference, and MUST NOT include package list prices or installment amounts in the WhatsApp message.

#### Scenario: WhatsApp message content from package flow
- **WHEN** the visitor finishes the package-anchored quote request and proceeds to WhatsApp
- **THEN** WhatsApp opens with a quote-request message that includes folio, package reference, travelers, and month, and contains no USD package prices or installment lines

#### Scenario: Primary CTA is quote not reserve-with-price
- **WHEN** a visitor views a package card or detail
- **THEN** the primary commerce CTA is to request a quote (not “apartar” with an embedded list price)
