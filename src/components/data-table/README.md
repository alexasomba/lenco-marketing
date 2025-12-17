# Data Table demo

This folder contains a small demo showing how to use TanStack Table with the project's UI primitives.

Usage:

```tsx
import { DataTableDemo } from "@/components/data-table";

export default function Page() {
  return <DataTableDemo />;
}
```

This component demonstrates filtering, sorting, pagination and column visibility using `@tanstack/react-table` and shadcn UI components.
Reusable components exported from this folder:

- `DataTableColumnHeader` — helper to render sortable/hideable column headers
- `DataTableViewOptions` — dropdown to toggle column visibility
- `DataTablePagination` — pagination controls with page size selector and navigation

Import and use them directly if you need to compose a custom table UI.
