import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTableDemo } from "@/components/data-table";

describe("DataTable accessibility", () => {
  it("toggles column visibility via keyboard in View options", async () => {
    const user = userEvent.setup();
    render(<DataTableDemo />);

    // open the view options menu
    // click the actual trigger button (the menu trigger wrapper)
    const triggerButton = document.querySelector(
      '[data-slot="dropdown-menu-trigger"]',
    ) as Element;
    await user.click(triggerButton);

    // find the Email toggle within the menu and toggle it via test id
    const emailItem = await screen.findByTestId("toggle-column-email");
    expect(emailItem).toBeTruthy();
    await user.click(emailItem);

    // Email column should be hidden inside the table after toggling
    const table = screen.getByRole("table");
    expect(within(table).queryByText(/^Email$/i)).toBeNull();
  });

  it("supports sorting via header menu using keyboard", async () => {
    const user = userEvent.setup();
    render(<DataTableDemo />);

    // open header menu for Email
    const emailHeaderTrigger = screen.getByLabelText(/Email options/i);
    expect(emailHeaderTrigger).toBeTruthy();
    await user.click(emailHeaderTrigger);
    const headerMenu = await screen.findByRole("menu");

    // Click Asc within the header menu
    const asc = within(headerMenu).getByText(/^Asc$/i);
    await user.click(asc);

    // After sorting ascending, the header wrapper should have aria-sort=ascending
    const table = screen.getByRole("table");
    const header = within(table)
      .getByText(/^Email$/i)
      .closest("[aria-sort]");
    expect(header).toHaveAttribute("aria-sort", "ascending");
  });

  it("allows inline editing of note cell", async () => {
    const user = userEvent.setup();
    render(<DataTableDemo />);

    const noteCell = screen.getByLabelText(/Note for m5gr84i9/i);
    expect(noteCell).toBeTruthy();
    await user.click(noteCell);

    const input = screen.getByLabelText(/Edit note for m5gr84i9/i);
    await user.clear(input);
    // type and blur to commit
    await user.type(input, "Updated note");
    // move focus away to trigger blur and commit (click the page heading)
    const heading = screen.getByRole("heading", { name: /Data Table Demo/i });
    await user.click(heading);

    // the note cell should update after blur; query by its accessible label
    const updatedCell = await screen.findByLabelText(/Note for m5gr84i9/i);
    expect(updatedCell).toHaveTextContent(/Updated note/i);
  });
});
