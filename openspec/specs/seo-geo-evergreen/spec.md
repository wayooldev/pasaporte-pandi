# seo-geo-evergreen Specification

## Purpose
Makes Pasaporte Pandi discoverable and citable as a quote-first travel agency with stable specialties, without anchoring search or generative engines to mutable packages or public prices.

## Requirements

### Requirement: Evergreen agency entity is machine-readable
The public site SHALL expose structured data describing Pasaporte Pandi as a travel agency organization, including official name, site URL, contact channels, and `sameAs` links to Instagram, Facebook, TikTok, and Linktree. The structured data MUST NOT include product offers, public prices, or package SKUs.

#### Scenario: Organization entity on the public home experience
- **WHEN** a crawler or generative agent fetches the public home page HTML
- **THEN** the response includes JSON-LD (or equivalent) for an Organization/TravelAgency-style entity with official site URL and social `sameAs` links, and no Offer/price fields

#### Scenario: Entity stays valid when catalog changes
- **WHEN** packages in the database are added, removed, or retitled
- **THEN** the agency entity structured data remains unchanged and still accurately describes specialties and quote-first positioning

### Requirement: Crawl controls protect private routes and list public ones
The system SHALL publish robots rules that allow indexing of public marketing pages and disallow indexing of admin and authentication routes. The system SHALL publish a sitemap that lists only evergreen public URLs (at minimum the home page and public legal pages).

#### Scenario: Robots disallow private surfaces
- **WHEN** a crawler reads `/robots.txt`
- **THEN** admin and sign-in/sign-up paths are disallowed for indexing while the public home remains allowed

#### Scenario: Sitemap lists evergreen public URLs only
- **WHEN** a crawler reads the sitemap
- **THEN** it includes the home page and public legal pages, and does not include admin, auth, or package inventory URLs

#### Scenario: Private pages declare noindex
- **WHEN** a visitor or crawler opens an admin or authentication page
- **THEN** the page metadata includes a robots directive that requests no indexing

### Requirement: Public metadata describes the stable agency offer
Public marketing metadata (title, description, Open Graph) SHALL describe Pasaporte Pandi as a personalized travel agency specializing in Europa, Disney, Cruceros, and Playas, emphasizing close advisory and quote requests. Metadata MUST NOT claim published package prices or DIY savings amounts.

#### Scenario: Home metadata is specialty- and quote-oriented
- **WHEN** the home page is shared or indexed
- **THEN** title/description/Open Graph copy mention the agency, the four specialties, and cotización/asesoría — without price figures or “desde $X” language

### Requirement: On-page evergreen content explains specialties and how to quote
The public home experience SHALL present evergreen content that states the four specialties (Europa, Disney, Cruceros, Playas), the quote-request process (solicitud → asesor por WhatsApp), and close advisory positioning in crawlable HTML. Mutable package cards may remain as conversion UI but MUST NOT be the sole or primary SEO content contract.

#### Scenario: Specialties are stated independently of catalog cards
- **WHEN** a crawler reads the home page without relying on package inventory
- **THEN** it can observe text that Pasaporte Pandi specializes in Europa, Disney, Cruceros, and Playas

#### Scenario: Quote process is explainable without prices
- **WHEN** a visitor or generative agent looks for how to engage the agency
- **THEN** the page explains that travelers request a cotización and receive human advisory via WhatsApp, without showing public tariffs

### Requirement: Public marketing copy does not contradict quote-only positioning
Public marketing surfaces SHALL NOT claim that the on-site cotizador shows DIY savings amounts, published best-price guarantees as a catalog feature, or other messaging that implies public price comparison on the website.

#### Scenario: Residual DIY-savings claims are removed or rewritten
- **WHEN** a visitor reads hero, benefits, social-proof, or footer marketing copy
- **THEN** they do not see claims that the website itself displays DIY vs Pandi savings amounts or catalog “mejor precio” as a priced offer

### Requirement: Manual social canonization is tracked
The change SHALL record an operational task to add the official website URL on Linktree so social discovery points at the canonical evergreen site. Completing the Linktree edit may happen outside the codebase; the task remains part of the change checklist until done.

#### Scenario: Linktree follow-up is an explicit task
- **WHEN** implementers execute the change tasks
- **THEN** there is a checklist item to add `https://pasaportepandi.com` (or the current official domain) as a Linktree destination labeled as the official site
