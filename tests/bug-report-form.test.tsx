import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BugReportForm } from "@/components/tanstack-form";

describe("BugReportForm", () => {
  it("renders", () => {
    render(<BugReportForm />);
    expect(screen.getByText(/Bug Report/i)).toBeTruthy();
  });
});
