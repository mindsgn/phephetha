"use client"

import { useState } from "react"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontalIcon,
  CopyIcon,
  TagIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface CouponRow {
  id: string
  code: string
  discount: string
  type: string
  minPurchase: number | null
  uses: number
  maxUses: number | null
  expiry: string
  active: boolean
  [key: string]: unknown
}

const demoCoupons: CouponRow[] = [
  { id: "1", code: "WINTER15", discount: "15%", type: "percentage", minPurchase: 500, uses: 45, maxUses: 100, expiry: "2026-07-31", active: true },
  { id: "2", code: "BRAKE20", discount: "20%", type: "percentage", minPurchase: 1000, uses: 23, maxUses: 50, expiry: "2026-07-31", active: true },
  { id: "3", code: "FLAT100", discount: "R100", type: "fixed", minPurchase: 300, uses: 67, maxUses: null, expiry: "2026-08-31", active: true },
  { id: "4", code: "NEWUSER", discount: "10%", type: "percentage", minPurchase: null, uses: 156, maxUses: 500, expiry: "2026-12-31", active: true },
  { id: "5", code: "SUMMER200", discount: "R200", type: "fixed", minPurchase: 800, uses: 34, maxUses: 34, expiry: "2026-02-28", active: false },
  { id: "6", code: "REFER150", discount: "R150", type: "fixed", minPurchase: 200, uses: 89, maxUses: 200, expiry: "2026-08-30", active: true },
]

export default function AdminCouponsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success(`Coupon code "${code}" copied!`)
  }

  const columns: ColumnDef<CouponRow>[] = [
    {
      id: "code",
      header: "Code",
      accessorKey: "code",
      sortable: true,
      accessorFn: (row) => (
        <div className="flex items-center gap-2">
          <code className="rounded bg-muted px-2 py-0.5 font-mono text-sm font-bold">{row.code}</code>
          <Button variant="ghost" size="icon-xs" onClick={() => copyCode(row.code)}>
            <CopyIcon className="size-3" />
          </Button>
        </div>
      ),
    },
    {
      id: "discount",
      header: "Discount",
      accessorKey: "discount",
      sortable: true,
      accessorFn: (row) => <span className="font-bold text-red-600">{row.discount}</span>,
    },
    { id: "type", header: "Type", accessorKey: "type", sortable: true, accessorFn: (row) => <Badge variant="outline" className="capitalize">{row.type}</Badge> },
    { id: "minPurchase", header: "Min Purchase", accessorKey: "minPurchase", sortable: true, accessorFn: (row) => row.minPurchase ? `R ${row.minPurchase}` : "None" },
    {
      id: "uses",
      header: "Uses",
      accessorKey: "uses",
      sortable: true,
      accessorFn: (row) => (
        <span>{row.uses}{row.maxUses ? ` / ${row.maxUses}` : " / ∞"}</span>
      ),
    },
    { id: "expiry", header: "Expiry", accessorKey: "expiry", sortable: true, accessorFn: (row) => formatDate(row.expiry) },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant={row.active ? "default" : "secondary"}>
          {row.active ? "Active" : "Disabled"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      accessorFn: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <MoreHorizontalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => copyCode(row.code)}>
              <CopyIcon className="size-4" />
              Copy Code
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              {row.active ? "Disable" : "Enable"}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => setDeleteId(row.id)}>
              <Trash2Icon className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Coupons"
        description="Manage discount coupon codes"
        actions={
          <Button>
            <PlusIcon className="size-4" />
            Add Coupon
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={demoCoupons} searchPlaceholder="Search coupons..." emptyTitle="No coupons found" emptyIcon={TagIcon} />
        </CardContent>
      </Card>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Coupon" description="Are you sure you want to delete this coupon?" confirmLabel="Delete" destructive onConfirm={() => setDeleteId(null)} />
    </div>
  )
}
