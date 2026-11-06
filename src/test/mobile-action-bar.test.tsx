import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";

describe("MobileActionBar Component", () => {
  it("renders mobile action bar with md:hidden responsive styling", () => {
    render(<MobileActionBar />);
    const bar = screen.getByTestId("mobile-action-bar");
    expect(bar).toBeInTheDocument();
    expect(bar.className).toContain("md:hidden");
    expect(bar.className).toContain("fixed");
    expect(bar.className).toContain("bottom-0");
  });

  it("contains WhatsApp CTA trigger and quote link", () => {
    render(<MobileActionBar />);
    expect(screen.getByText("Cotizar por WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Cotizar")).toBeInTheDocument();
  });
});
