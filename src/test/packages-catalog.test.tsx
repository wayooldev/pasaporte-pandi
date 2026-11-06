import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("filters packages when category button is clicked", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    // Filter to Disney & Universal
    fireEvent.click(screen.getByRole("button", { name: "Disney & Universal" }));
    expect(screen.getByText("Magia Total en Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.queryByText("Crucero Caribe Mágico: Bahamas & Cozumel")).not.toBeInTheDocument();

    // Filter to Cruceros
    fireEvent.click(screen.getByRole("button", { name: "Cruceros" }));
    expect(screen.getByText("Crucero Caribe Mágico: Bahamas & Cozumel")).toBeInTheDocument();
    expect(screen.queryByText("Magia Total en Orlando: Disney & Universal")).not.toBeInTheDocument();
  });

  it("opens detailed itinerary modal when clicking 'Ver Itinerario'", () => {
    render(<PackagesCatalog initialPackages={mockPackages} />);

    const itineraryButtons = screen.getAllByText("Ver Itinerario");
    fireEvent.click(itineraryButtons[0]);

    expect(screen.getByText("Servicios e Inclusiones Completas")).toBeInTheDocument();
    expect(screen.getByText("Consultar Fechas por WhatsApp")).toBeInTheDocument();
  });
});
