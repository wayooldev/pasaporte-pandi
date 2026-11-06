import React from "react";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// Unit tests use the in-memory mock store — never hit live Neon.
delete process.env.DATABASE_URL;

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) =>
    React.createElement("img", {
      src: props.src,
      alt: props.alt,
      width: props.width,
      height: props.height,
      className: props.className,
    }),
}));

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
