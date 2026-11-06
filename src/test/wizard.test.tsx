import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { QuoteWizard } from "@/components/wizard/quote-wizard";

describe("QuoteWizard Component", () => {
  it("renders Step 1 with destination options", () => {
    render(<QuoteWizard />);
    expect(screen.getByTestId("wizard-step-1")).toBeInTheDocument();
    expect(screen.getByText("Orlando: Disney & Universal")).toBeInTheDocument();
    expect(screen.getByText("Crucero Caribe & Bahamas")).toBeInTheDocument();
  });

  it("navigates through steps 1 -> 2 -> 3 and calculates quote result", async () => {
    render(<QuoteWizard />);

    // Step 1 -> Next
    const nextBtn1 = screen.getByText("Siguiente");
    fireEvent.click(nextBtn1);

    await waitFor(() => {
      expect(screen.getByTestId("wizard-step-2")).toBeInTheDocument();
    });

    // Step 2 -> Next
    const nextBtn2 = screen.getByText("Siguiente");
    fireEvent.click(nextBtn2);

    await waitFor(() => {
      expect(screen.getByTestId("wizard-step-3")).toBeInTheDocument();
    });

    // Step 3 -> Submit
    const calculateBtn = screen.getByText("Calcular Mi Cotización Mágica");
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId("quote-result-card")).toBeInTheDocument();
      expect(screen.getByText("Hacerlo por tu cuenta (DIY)")).toBeInTheDocument();
      expect(screen.getByText("Cotizar por WhatsApp")).toBeInTheDocument();
    });
  });
});
