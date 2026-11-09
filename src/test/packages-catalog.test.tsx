import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { PackagesCatalog } from "@/components/packages/packages-catalog";
import { initialPackages } from "@/db/seed-data";
import { Package } from "@/db/schema";

const mockPackages: Package[] = initialPackages.map((p, idx) => ({
  ...p,
  id: `pkg-${idx + 1}`,
  isFeatured: p.isFeatured ?? true,
  createdAt: new Date(),
}));

describe("PackagesCatalog and PackageCard Component", () => {
  it("renders category filters and all initial packages", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    expect(screen.getByRole("button", { name: "Todos los Destinos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Disney & Universal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cruceros" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Europa" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Playas" })).toBeInTheDocument();

    expect(screen.getByText("Magia Total en Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.getByText("Crucero Caribe Mágico: Bahamas & Cozumel")).toBeInTheDocument();
  });

  it("does not show public prices or installment chrome on package cards", () => {
    const sample = mockPackages.slice(0, 3);
    render(<PackagesCatalog initialPackages={sample} />);

    expect(screen.queryByText(/USD\s*\/\s*pers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Inversión sugerida/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Apartar/i })).not.toBeInTheDocument();
    expect(screen.queryByText(sample[0].installmentsText)).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Cotizar/i }).length).toBe(sample.length);
  });

  it("filters packages when category button is clicked", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    fireEvent.click(screen.getByRole("button", { name: "Disney & Universal" }));
    expect(screen.getByText("Magia Total en Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.queryByText("Crucero Caribe Mágico: Bahamas & Cozumel")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cruceros" }));
    expect(screen.getByText("Crucero Caribe Mágico: Bahamas & Cozumel")).toBeInTheDocument();
    expect(screen.queryByText("Magia Total en Orlando: Disney & Universal")).not.toBeInTheDocument();
  });

  it("restores all packages when returning to Todos after a category filter", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    fireEvent.click(screen.getByRole("button", { name: "Disney & Universal" }));
    expect(screen.queryByText("Crucero Caribe Mágico: Bahamas & Cozumel")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Todos los Destinos" }));
    expect(screen.getByText("Magia Total en Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.getByText("Crucero Caribe Mágico: Bahamas & Cozumel")).toBeInTheDocument();
  });

  it("opens detailed itinerary modal with quote CTA and no price block", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    const itineraryButtons = screen.getAllByText("Ver Itinerario");
    fireEvent.click(itineraryButtons[0]);

    expect(screen.getByText("Servicios e Inclusiones Completas")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Solicitar cotización/i })).toBeInTheDocument();
    expect(screen.queryByText(/Inversión sugerida/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Consultar Fechas por WhatsApp/i)).not.toBeInTheDocument();
  });

  it("opens travelers form from quote CTA and submits a package-anchored quote", async () => {
    const onRequestQuote = vi.fn();
    render(
      <PackagesCatalog initialPackages={mockPackages.slice(0, 1)} onRequestQuote={onRequestQuote} />
    );

    const firstPkg = mockPackages[0];
    fireEvent.click(screen.getByTestId(`package-quote-cta-${firstPkg.slug}`));

    const formRoot = screen.getByTestId(`package-quote-form-${firstPkg.slug}`);
    expect(formRoot).toBeInTheDocument();
    expect(formRoot).toHaveTextContent(firstPkg.title);
    expect(screen.getByLabelText("Mes tentativo")).toBeInTheDocument();

    const formEl = formRoot.querySelector("form");
    expect(formEl).toBeTruthy();
    fireEvent.submit(formEl!);

    await waitFor(() => {
      expect(onRequestQuote).toHaveBeenCalledTimes(1);
    });

    const quote = onRequestQuote.mock.calls[0][0];
    expect(quote.packageTitle).toBe(firstPkg.title);
    expect(quote.packageSlug).toBe(firstPkg.slug);
    expect(quote.destinationKey).toBe(firstPkg.category);
    expect(quote.destinationLabel).toBe(firstPkg.title);
    expect(quote.adults).toBeGreaterThanOrEqual(1);
    expect(quote.travelMonth).toBeTruthy();
    expect(quote.pandiTotalUsd).toBe(0);
  });
});
