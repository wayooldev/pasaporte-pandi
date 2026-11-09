## Purpose

Provides a responsive, high-converting travel agency platform for Pasaporte Pandi, featuring an interactive quote wizard with savings comparison, PDF export, packages catalog, and protected administration.

## ADDED Requirements

### Requirement: Centralized Theme and Brand Tokens
The system SHALL centralize all theme colors, typography, and brand metadata into semantic design tokens and a single brand configuration file so that styling and palette changes propagate across the entire application without component-level code edits.

#### Scenario: Visual styling relies on design tokens
- **WHEN** any user-facing component renders buttons, cards, headers, or typography
- **THEN** it resolves colors from semantic CSS variables (`--primary`, `--accent`, `--card`, `--background`) and metadata from the brand configuration.

### Requirement: Conversion-Oriented Landing Page
The system SHALL render a responsive homepage with value-driven hero copy, Pandi trust badges, social proof, package highlights, a persistent mobile action bar, and a discrete administration entrypoint.

#### Scenario: User visits the homepage
- **WHEN** a visitor loads the home route `/` on desktop or mobile
- **THEN** the system displays the hero section, the interactive quote calculator, featured packages, trust guarantees, social media links, a persistent mobile WhatsApp contact button, and an unobtrusive admin login link in the footer.

### Requirement: 3-Step Interactive Quote Wizard
The system SHALL provide an interactive step-by-step quote calculator that collects destination, travel party, date preferences, and experience style, computing an immediate estimated price range and inclusion list.

#### Scenario: User calculates trip estimate
- **WHEN** the visitor selects a destination, party size (adults and children), target travel month, and accommodation style
- **THEN** the system immediately displays the calculated price range per person and total, lists included services, and updates the savings comparison without a full page reload.

### Requirement: DIY vs. Agency Savings and Value Comparator
The system SHALL calculate and present a comparative breakdown displaying the estimated cost and risks of booking independently versus booking with Pasaporte Pandi, highlighting monetary savings and service guarantees.

#### Scenario: Comparing DIY versus Pandi
- **WHEN** the estimated quote is displayed
- **THEN** the system shows the estimated DIY cost, the Pasaporte Pandi price, the net dollar savings, and value bullet points (concierge support, zero park-booking errors, and 24/7 travel assistance).

### Requirement: Lead Capture and PDF Quote Export
The system SHALL allow travelers to download their personalized itinerary quote in PDF format after submitting their name and phone or email, persisting the lead in the database.

#### Scenario: Traveler downloads PDF quote
- **WHEN** the user submits their contact information to export the quote
- **THEN** the system persists the lead and quote record in the Neon database, assigns a unique quote folio, and triggers the download of a branded PDF containing the itinerary summary, inclusions, and WhatsApp QR code.

### Requirement: Direct WhatsApp Handoff
The system SHALL generate dynamic WhatsApp click-to-chat links with pre-populated contextual messages containing the destination, traveler party, and unique quote folio.

#### Scenario: User clicks WhatsApp button from quote
- **WHEN** the visitor clicks "Consultar por WhatsApp" from the quote results
- **THEN** the system opens WhatsApp with a pre-filled message referencing the specific quote folio, destination, and passenger details.

### Requirement: Travel Packages Catalog
The system SHALL present a searchable and filterable catalog of travel packages categorized by destination type (Disney/Universal, Cruceros, Europa, Playas), showing starting prices, payment installment indicators, and detailed itineraries.

#### Scenario: User filters travel packages
- **WHEN** the visitor selects a category filter on the packages view
- **THEN** the system displays matching packages showing real destination photography, inclusions, starting price per person, and call-to-action buttons.

### Requirement: Protected Admin Management
The system SHALL protect the administration portal with Clerk authentication and permit authenticated administrators to create, edit, or delete travel packages, view submitted quote leads, and configure pricing baselines.

#### Scenario: Unauthenticated user accesses admin route
- **WHEN** an unauthenticated visitor navigates to `/admin`
- **THEN** the system redirects the visitor to the Clerk authentication sign-in flow.

#### Scenario: Authenticated admin updates packages
- **WHEN** an authenticated administrator modifies package details or pricing baselines
- **THEN** the updates are committed to the Neon database and immediately reflected on public package and calculator views.
