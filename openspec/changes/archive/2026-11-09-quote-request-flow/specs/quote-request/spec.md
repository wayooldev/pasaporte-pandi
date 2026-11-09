## Purpose

Permite a un visitante armar una solicitud de cotización en dos pasos (destino y viajeros/mes), obtener un folio, descargar un PDF de solicitud con branding Pasaporte Pandi y contactar al asesor por WhatsApp sin ver precios ni comparativas DIY.

## ADDED Requirements

### Requirement: Two-step quote request wizard
The system SHALL collect only destination, adult count, child count, and tentative travel month in a two-step wizard before creating a quote request. The system MUST NOT present an experience-style step (esencial / clasico / deluxe) in this flow.

#### Scenario: Completing the wizard
- **WHEN** the visitor selects a destination, then travelers and month, and submits the wizard
- **THEN** the system creates a quote request with a unique folio and shows the request summary screen

#### Scenario: No style step
- **WHEN** the visitor advances from the travelers-and-month step
- **THEN** the system does not show experience-style options and proceeds to the request summary (or the final submit that produces it)

### Requirement: Request summary without prices
The system SHALL display a request summary that includes folio, destination label, traveler counts, and travel month, plus destination inclusions or next-step guidance without any monetary amounts. The system MUST NOT show Pandi estimated totals, per-person averages, savings amounts, DIY costs, or a DIY comparison panel.

#### Scenario: Summary after submit
- **WHEN** a quote request has been created
- **THEN** the summary shows folio and trip inputs without USD amounts and without a DIY comparator

#### Scenario: Primary CTA is WhatsApp request
- **WHEN** the visitor views the request summary
- **THEN** a primary action to request a quote via WhatsApp is available

### Requirement: Branded quote-request PDF
The system SHALL generate a downloadable PDF titled as an initial quote request (not a priced proposal) that includes Pasaporte Pandi branding (logo and brand colors), folio, destination, travelers, month, and optional requester name. The PDF MUST NOT include price ranges, per-person prices, savings figures, or DIY comparison amounts.

#### Scenario: PDF contents
- **WHEN** the visitor completes lead capture (or equivalent) to obtain the PDF
- **THEN** the downloaded PDF shows branded solicitud content with trip data and folio and contains no monetary quote figures

### Requirement: WhatsApp quote-request handoff with PDF
The system SHALL open a WhatsApp click-to-chat link with a pre-filled message framed as a quote request that includes folio, destination, travelers, and month, without price or savings lines. The system SHALL also provide the quote-request PDF to the visitor (download) as part of that handoff flow, noting that the messaging link itself cannot attach files.

#### Scenario: WhatsApp message content
- **WHEN** the visitor activates the WhatsApp quote-request action from the summary
- **THEN** WhatsApp opens with a message containing folio and trip details and without estimated Pandi or DIY prices

#### Scenario: PDF available alongside handoff
- **WHEN** the visitor completes the handoff flow that requests a quote
- **THEN** the quote-request PDF is downloaded (or otherwise made available) in addition to opening WhatsApp
