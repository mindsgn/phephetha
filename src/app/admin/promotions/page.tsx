"use client"

import { useState } from "react"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontalIcon,
  MegaphoneIcon,
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

interface PromotionRow {
  id: string
  title: string
  discount: string
  type: string
  startDate: string
  endDate: string
  active: boolean
  [key: string]: unknown
}

const demoPromotions: PromotionRow[] = [
  { id: "1", title: "Winter Service Special", discount: "15% OFF", type: "percentage", startDate: "2026-06-01", endDate: "2026-07-31", active: true },
  { id: "2", title: "Brake Month", discount: "20% OFF", type: "percentage", startDate: "2026-07-01", endDate: "2026-07-31", active: true },
  { id: "3", title: "Oil Change Bundle", discount: "R100 OFF", type: "fixed", startDate: "2026-07-15", endDate: "2026-08-15", active: true },
  { id: "4", title: "New Customer Discount", discount: "10% OFF", type: "percentage", startDate: "2026-01-01", endDate: "2026-12-31", active: true },
  { id: "5", title: "Summer AC Special", discount: "R200 OFF", type: "fixed", startDate: "2025-12-01", endDate: "2026-02-28", active: false },
  { id: "6", title: "Refer a Friend", discount: "R150 OFF", type: "fixed", startDate: "2026-03-01", endDate: "2026-08-30", active: true },
]

export default function AdminPromotionsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: ColumnDef<PromotionRow>[] = [
    { id: "title", header: "Promotion", accessorKey: "title", sortable: true },
    {
      id: "discount",
      header: "Discount",
      accessorKey: "discount",
      sortable: true,
      accessorFn: (row) => <span className="font-bold text-red-600">{row.discount}</span>,
    },
    { id: "type", header: "Type", accessorKey: "type", sortable: true, accessorFn: (row) => <Badge variant="outline" className="capitalize">{row.type}</Badge> },
    { id: "startDate", header: "Start Date", accessorKey: "startDate", sortable: true, accessorFn: (row) => formatDate(row.startDate) },
    { id: "endDate", header: "End Date", accessorKey: "endDate", sortable: true, accessorFn: (row) => formatDate(row.endDate) },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => {
        const now = new Date()
        const end = new Date(row.endDate)
        if (!row.active) return <Badge variant="secondary">Disabled</Badge>
        if (end < now) return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Expired</Badge>
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
      },
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
        title="Promotions"
        description="Manage promotional campaigns"
        actions={
          <Button>
            <PlusIcon className="size-4" />
            Add Promotion
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={demoPromotions} searchPlaceholder="Search promotions..." emptyTitle="No promotions found" emptyIcon={MegaphoneIcon} />
        </CardContent>
      </Card>

      <ConfirmDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)} title="Delete Promotion" description="Are you sure you want to delete this promotion?" confirmLabel="Delete" destructive onConfirm={() => setDeleteId(null)} />
    </div>
  )
}
