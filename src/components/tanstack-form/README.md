# TanStack Form components

This folder contains a small demo implementation of a TanStack Form using the project's shadcn UI components.

## Usage

Import and render the form in a client component or route:

```tsx
import { BugReportForm } from "@/components/tanstack-form";

export default function Page() {
  return <BugReportForm />;
}
```

The form uses `@tanstack/react-form` and `zod` for validation. On submit the validated values are logged to the console; replace the `onSubmit` handler inside the component for real integration.
