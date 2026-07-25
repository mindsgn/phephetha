"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ShoppingCartIcon,
  MoreHorizontalIcon,
  EyeIcon,
  DownloadIcon,
  CalendarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { formatCurrency, formatDate } from "@/lib/utils"

interface OrderRow {
  id: string
  orderNumber: string
  customer: string
  date: string
  items: number
  total: number
  paymentStatus: string
  orderStatus: string
  [key: string]: unknown
}

const demoOrders: OrderRow[] = [
  { id: "1", orderNumber: "ORD-7891", customer: "John Mokoena", date: "2026-07-18", items: 3, total: 4599, paymentStatus: "paid", orderStatus: "processing" },
  { id: "2", orderNumber: "ORD-7890", customer: "Sarah Ndlovu", date: "2026-07-17", items: 2, total: 2349, paymentStatus: "paid", orderStatus: "shipped" },
  { id: "3", orderNumber: "ORD-7889", customer: "David Pretorius", date: "2026-07-17", items: 5, total: 8900, paymentStatus: "paid", orderStatus: "delivered" },
  { id: "4", orderNumber: "ORD-7888", customer: "Thabo Molefe", date: "2026-07-16", items: 1, total: 1299, paymentStatus: "pending", orderStatus: "pending" },
  { id: "5", orderNumber: "ORD-7887", customer: "Lisa van der Berg", date: "2026-07-16", items: 4, total: 5670, paymentStatus: "paid", orderStatus: "confirmed" },
  { id: "6", orderNumber: "ORD-7886", customer: "James Nkosi", date: "2026-07-15", items: 2, total: 1899, paymentStatus: "paid", orderStatus: "delivered" },
  { id: "7", orderNumber: "ORD-7885", customer: "Mary Dlamini", date: "2026-07-15", items: 6, total: 12450, paymentStatus: "refunded", orderStatus: "cancelled" },
  { id: "8", orderNumber: "ORD-7884", customer: "Peter Smit", date: "2026-07-14", items: 3, total: 3200, paymentStatus: "paid", orderStatus: "delivered" },
  { id: "9", orderNumber: "ORD-7883", customer: "Grace Khumalo", date: "2026-07-14", items: 1, total: 549, paymentStatus: "paid", orderStatus: "shipped" },
  { id: "10", orderNumber: "ORD-7882", customer: "Sipho Zulu", date: "2026-07-13", items: 4, total: 7890, paymentStatus: "failed", orderStatus: "pending" },
]

const statusFilters = ["all", "pending", "processing", "shipped", "delivered", "cancelled"]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const paymentColors: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  failed: "bg-red-100 text-red-800",
  refunded: "bg-orange-100 text-orange-800",
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredOrders = useMemo(() => {
    return demoOrders.filter((o) => {
      if (statusFilter !== "all" && o.orderStatus !== statusFilter) return false
      if (search && !o.orderNumber.toLowerCase().includes(search.toLowerCase()) && !o.customer.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [statusFilter, search])

  const columns: ColumnDef<OrderRow>[] = [
    { id: "orderNumber", header: "Order #", accessorKey: "orderNumber", sortable: true },
    { id: "customer", header: "Customer", accessorKey: "customer", sortable: true },
    { id: "date", header: "Date", accessorKey: "date", sortable: true, accessorFn: (row) => formatDate(row.date) },
    { id: "items", header: "Items", accessorKey: "items", sortable: true, accessorFn: (row) => `${row.items} items` },
    { id: "total", header: "Total", accessorKey: "total", sortable: true, accessorFn: (row) => formatCurrency(row.total) },
    {
      id: "paymentStatus",
      header: "Payment",
      accessorFn: (row) => (
        <Badge variant="secondary" className={`text-[10px] ${paymentColors[row.paymentStatus] || ""}`}>
          {row.paymentStatus}
        </Badge>
      ),
    },
    {
      id: "orderStatus",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant="secondary" className={`text-[10px] ${statusColors[row.orderStatus] || ""}`}>
          {row.orderStatus}
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
            <DropdownMenuItem>
              <Link href={`/admin/orders/${row.id}`} className="flex items-center gap-2">
                <EyeIcon className="size-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon className="size-4" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Orders"
        description="Manage customer orders"
        actions={
          <Button variant="outline">
            <DownloadIcon className="size-4" />
            Export
          </Button>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
            <div className="flex-1" />
            <Input
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72"
            />
          </div>

          <DataTable
            columns={columns}
            data={filteredOrders}
            emptyTitle="No orders found"
            emptyDescription="No orders match your filters."
            emptyIcon={ShoppingCartIcon}
          />
        </CardContent>
      </Card>
    </div>
  )
}
