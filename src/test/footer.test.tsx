import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { Footer } from "@/components/layout/footer";
import { brandConfig } from "@/config/brand";

describe("Footer Component", () => {
  it("renders brand info and social links", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Instagram Pasaporte Pandi")).toHaveAttribute(
      "href",
      "https://www.instagram.com/PasaportePandi"
    );
    expect(screen.getByLabelText("TikTok Pasaporte Pandi")).toHaveAttribute(
      "href",
      "https://www.tiktok.com/@pasaporte.pandi"
    );
    expect(screen.getByLabelText("Facebook Pasaporte Pandi")).toHaveAttribute(
      "href",
      "https://www.facebook.com/pasaportepandi"
    );
  });

  it("renders discreet admin link to /admin", () => {
    render(<Footer />);
    const adminLink = screen.getByText("Portal Asesores").closest("a");
    expect(adminLink).toBeInTheDocument();
    expect(adminLink).toHaveAttribute("href", "/admin");
  });

  it("renders legal links and updated WhatsApp display", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Aviso de Privacidad" })).toHaveAttribute(
      "href",
      "/privacidad"
    );
    expect(screen.getByRole("link", { name: "Términos de Servicio" })).toHaveAttribute(
      "href",
      "/terminos"
    );
    expect(screen.getByText(brandConfig.contact.whatsappDisplay)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cómo cotizar" })).toHaveAttribute(
      "href",
      "#como-cotizar"
    );
  });
});
