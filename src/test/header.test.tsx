import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Header } from "@/components/layout/header";

describe("Header Component", () => {
  it("renders logo and desktop navigation anchors", () => {
    render(<Header />);
    expect(screen.getAllByText("Pasaporte").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pandi").length).toBeGreaterThan(0);
    expect(screen.getByText("Cotizador Mágico")).toBeInTheDocument();
  });

  it("toggles mobile menu on button click", () => {
    render(<Header />);
    const menuToggle = screen.getByLabelText("Abrir menú de navegación");
    expect(menuToggle).toBeInTheDocument();

    // Click to open
    fireEvent.click(menuToggle);
    expect(screen.getByText("WhatsApp Inmediato")).toBeInTheDocument();

    // Click to close
    fireEvent.click(menuToggle);
    expect(screen.queryByText("WhatsApp Inmediato")).not.toBeInTheDocument();
  });
});
