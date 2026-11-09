import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { QuoteWizard } from "@/components/wizard/quote-wizard";

describe("QuoteWizard Component", () => {
  it("renders Step 1 with image-led destination options", () => {
    render(<QuoteWizard />);
    expect(screen.getByTestId("wizard-step-1")).toBeInTheDocument();
    expect(screen.getByTestId("destination-card-disney")).toBeInTheDocument();
    expect(screen.getByTestId("destination-card-crucero")).toBeInTheDocument();
    expect(screen.getByTestId("destination-card-europa")).toBeInTheDocument();
    expect(screen.getByTestId("destination-card-playa")).toBeInTheDocument();
    expect(screen.getByText("Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.getByText("Crucero Caribe & Bahamas")).toBeInTheDocument();
    expect(screen.getByText("Europa: Madrid, París y Roma")).toBeInTheDocument();
    expect(screen.getByText("Cancún & Riviera Maya All-Inclusive")).toBeInTheDocument();
  });

  it("selects a destination without leaving step 1", async () => {
    render(<QuoteWizard />);

    const disney = screen.getByTestId("destination-card-disney");
    const crucero = screen.getByTestId("destination-card-crucero");

    expect(disney).toHaveAttribute("aria-pressed", "true");
    expect(crucero).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(crucero);

    await waitFor(() => {
      expect(crucero).toHaveAttribute("aria-pressed", "true");
      expect(disney).toHaveAttribute("aria-pressed", "false");
    });

    expect(screen.getByText("Seleccionado")).toBeInTheDocument();
    expect(screen.getByTestId("wizard-step-1")).toBeInTheDocument();
    expect(screen.queryByTestId("wizard-step-2")).not.toBeInTheDocument();
  });

  it("navigates step 1 -> 2 -> request summary without skipping travelers step", async () => {
    render(<QuoteWizard />);

    fireEvent.click(screen.getByText("Siguiente"));

    await waitFor(() => {
      expect(screen.getByTestId("wizard-step-2")).toBeInTheDocument();
    });

    expect(screen.getByText("Paso 2: ¿Quiénes viajan y cuándo?")).toBeInTheDocument();
    expect(screen.queryByTestId("quote-result-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("wizard-step-3")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Crear mi solicitud"));

    await waitFor(() => {
      expect(screen.getByTestId("quote-result-card")).toBeInTheDocument();
      expect(screen.getByTestId("request-quote-whatsapp")).toBeInTheDocument();
      expect(screen.getByText("Solicitar cotización por WhatsApp")).toBeInTheDocument();
    });

    expect(screen.queryByText("Hacerlo por tu cuenta (DIY)")).not.toBeInTheDocument();
    expect(screen.queryByText(/Presupuesto Total Estimado/i)).not.toBeInTheDocument();
  });
});
