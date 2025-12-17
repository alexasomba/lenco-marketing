import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTableDemo } from "@/components/data-table";

describe("DataTableDemo", () => {
  it("renders demo title", () => {
    const { container } = render(<DataTableDemo />);
    expect(screen.getByText(/Data Table Demo/i)).toBeTruthy();
    // ensure we don't render nested <button> elements (no <button> inside another <button>)
    expect(container.querySelector("button button")).toBeNull();
  });
});
