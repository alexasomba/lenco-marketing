import { createFileRoute } from "@tanstack/react-router";
import { DataTableDemo } from "@/components/data-table";

export const Route = createFileRoute("/demo/data-table")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DataTableDemo />;
}
