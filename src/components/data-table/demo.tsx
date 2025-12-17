"use client";

import React from "react";
import { DataTable } from "./data-table";
import { getColumns, samplePayments, type Payment } from "./columns";

export function DataTableDemo() {
  const [data, setData] = React.useState<Payment[]>(samplePayments);

  const handleUpdate = React.useCallback(
    (id: string, patch: Partial<Payment>) => {
      setData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );
    },
    [],
  );

  const columns = React.useMemo(() => getColumns(handleUpdate), [handleUpdate]);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">Data Table Demo</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DataTableDemo;
