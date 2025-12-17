"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "./data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Eye, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  note?: string;
  createdAt?: string;
  subscribed?: boolean;
  plan?: "basic" | "pro" | "enterprise";
  country?: string;
};

export const samplePayments: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
    note: "Customer requested invoice",
    createdAt: "2024-11-01",
    subscribed: true,
    plan: "pro",
    country: "US",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "abe45@example.com",
    note: "Follow up in 30 days",
    createdAt: "2025-01-24",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "monserrat44@example.com",
    note: "",
    createdAt: "2025-02-03",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "silas22@example.com",
    note: "Priority customer",
    createdAt: "2024-10-09",
    subscribed: false,
    plan: "basic",
    country: "NG",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
    note: "Chargeback in progress",
    createdAt: "2024-05-12",
    subscribed: false,
    plan: "enterprise",
    country: "ZM",
  },
];

// Small reusable editable cell components (kept local to columns file)
function EditableNoteCell({
  id,
  value,
  onUpdate,
}: {
  id: string;
  value?: string;
  onUpdate?: (id: string, patch: Partial<Payment>) => void;
}) {
  const [editing, setEditing] = React.useState(false);
  const [val, setVal] = React.useState(value ?? "");

  React.useEffect(() => setVal(value ?? ""), [value]);

  return editing ? (
    <input
      aria-label={`Edit note for ${id}`}
      className="w-full rounded-md border px-2 py-1 text-sm"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onUpdate?.(id, { note: val });
          setEditing(false);
        } else if (e.key === "Escape") {
          setVal(value ?? "");
          setEditing(false);
        }
      }}
      onBlur={() => {
        onUpdate?.(id, { note: val });
        setEditing(false);
      }}
      autoFocus
    />
  ) : (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setEditing(true);
      }}
      className="text-sm"
      aria-label={`Note for ${id}`}
    >
      {value ?? <span className="text-muted">—</span>}
    </div>
  );
}

function EditableDateCell({
  id,
  value,
  onUpdate,
}: {
  id: string;
  value?: string;
  onUpdate?: (id: string, patch: Partial<Payment>) => void;
}) {
  const defaultDate = value ?? new Date().toISOString().slice(0, 10);
  const [editing, setEditing] = React.useState(false);
  const [val, setVal] = React.useState(defaultDate);

  React.useEffect(() => setVal(value ?? defaultDate), [value]);

  return editing ? (
    <input
      type="date"
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={() => {
        onUpdate?.(id, { createdAt: val });
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onUpdate?.(id, { createdAt: val });
          setEditing(false);
        } else if (e.key === "Escape") {
          setVal(value ?? defaultDate);
          setEditing(false);
        }
      }}
      className="text-sm rounded-md border px-2 py-1"
      aria-label={`Edit created date for ${id}`}
      autoFocus
    />
  ) : (
    <div
      role="button"
      tabIndex={0}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setEditing(true);
      }}
    >
      {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(val),
      )}
    </div>
  );
}

export function getColumns(
  onUpdate?: (id: string, patch: Partial<Payment>) => void,
): ColumnDef<Payment>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = String(row.getValue("status"));
        const variant =
          status === "success"
            ? "default"
            : status === "failed"
              ? "destructive"
              : status === "processing"
                ? "secondary"
                : "ghost";
        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "subscribed",
      header: "Subscribed",
      cell: ({ row }) => (
        <Checkbox
          checked={!!row.getValue("subscribed")}
          onCheckedChange={(val) =>
            onUpdate?.(row.original.id, { subscribed: !!val })
          }
          aria-label="Subscribed"
        />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => (
        <div className="lowercase">{String(row.getValue("email"))}</div>
      ),
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => (
        <EditableNoteCell
          id={row.original.id}
          value={row.original.note}
          onUpdate={onUpdate}
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <EditableDateCell
          id={row.original.id}
          value={row.original.createdAt}
          onUpdate={onUpdate}
        />
      ),
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => {
        const id = row.original.id;
        const value = row.original.plan ?? "basic";
        return (
          <div className="flex gap-2">
            {(["basic", "pro", "enterprise"] as const).map((p) => (
              <label key={p} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name={`plan-${id}`}
                  value={p}
                  checked={value === p}
                  onChange={() => onUpdate?.(id, { plan: p })}
                />
                <span className="capitalize text-sm">{p}</span>
              </label>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => {
        const id = row.original.id;
        const val = row.original.country ?? "US";
        return (
          <Select
            value={val}
            onValueChange={(v) => onUpdate?.(id, { country: v ?? undefined })}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">US</SelectItem>
              <SelectItem value="NG">NG</SelectItem>
              <SelectItem value="ZM">ZM</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = Number(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const p = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              {/* Use a non-button trigger wrapper to avoid nested <button> in some environments */}
              <DropdownMenuTrigger
                aria-label={`Actions for ${p.id}`}
                title="Actions"
              >
                <div className="inline-flex items-center">
                  <MoreHorizontal className="h-4 w-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigator.clipboard?.writeText(p.id)}
                >
                  <Copy className="mr-2 h-4 w-4" /> Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("View", p.id)}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdate?.(p.id, { status: "failed" })}
                >
                  <Trash className="mr-2 h-4 w-4" /> Mark failed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}

export const columns: ColumnDef<Payment>[] = getColumns();
