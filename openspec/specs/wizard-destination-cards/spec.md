# wizard-destination-cards Specification

## Purpose
Define how the quote wizard’s destination step presents each destination option as an image-led, sales-oriented card so visitors can choose emotionally and continue the request flow.

## Requirements

### Requirement: Image-led destination options in step 1
The system SHALL present each destination option in the quote wizard’s first step as a card whose primary visual is a destination photograph covering the card surface (full-bleed or equivalent), with title and supporting copy readable over the image. The system MUST NOT rely on a flat text-only card (icon + border alone) as the primary presentation of destination options.

#### Scenario: Destinations show place imagery
- **WHEN** the visitor views step 1 of the quote wizard
- **THEN** each destination option displays a photograph associated with that destination along with its title

#### Scenario: Existing destination keys remain selectable
- **WHEN** the visitor selects any of Disney/Orlando, Crucero, Europa, or Playa/Cancún options
- **THEN** the wizard records the same destination key values used today (`disney`, `crucero`, `europa`, `playa`) and allows advancing to step 2

### Requirement: Sales-oriented hierarchy and urgency tags
The system SHALL show a short destination title and supporting benefit line on each card, and MAY show a compact urgency or positioning tag (for example “Más Popular”). Text over imagery MUST remain readable (sufficient contrast via overlay, gradient, or equivalent).

#### Scenario: Card copy is visible on the image
- **WHEN** the visitor views a destination card in step 1
- **THEN** the destination title is visible and a supporting subtitle or tag communicates why the destination is desirable

### Requirement: Clear selected and interactive states
The system SHALL visually distinguish the selected destination from non-selected options and provide a hover or focus affordance that reinforces clickability without changing the destination keys or the two-step flow.

#### Scenario: Selection is obvious
- **WHEN** the visitor selects a destination card
- **THEN** that card shows a clear selected state (for example ring and/or “Seleccionado” indicator) and other cards remain visually unselected

#### Scenario: Keyboard or pointer can select
- **WHEN** the visitor activates a destination option via pointer or keyboard-equivalent control
- **THEN** that destination becomes the selected value for the wizard form

### Requirement: Continue CTA unchanged in flow
The system SHALL keep the existing step advancement to travelers/month after destination selection; redesigning the cards MUST NOT auto-skip step 2 or remove the need to confirm “Siguiente” (or equivalent) before collecting travelers and month.

#### Scenario: Next still required after selecting destination
- **WHEN** the visitor selects a destination on step 1
- **THEN** the system remains on step 1 until the visitor advances with the next action
