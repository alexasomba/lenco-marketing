import { createFileRoute } from "@tanstack/react-router";
import { BugReportForm } from "@/components/tanstack-form";

export const Route = createFileRoute("/demo/tanstack-form")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">TanStack Form Demo</h1>
      <BugReportForm />
    </div>
  );
}
