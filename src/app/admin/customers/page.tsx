"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  UsersIcon,
  MoreHorizontalIcon,
  EyeIcon,
  MailIcon,
  PhoneIcon,
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
import { formatCurrency, formatDate } from "@/lib/utils"

interface CustomerRow {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpent: number
  joinedDate: string
  [key: string]: unknown
}

const demoCustomers: CustomerRow[] = [
  { id: "1", name: "John Mokoena", email: "john@example.com", phone: "+27 82 123 4567", totalOrders: 12, totalSpent: 15680, joinedDate: "2024-03-15" },
  { id: "2", name: "Sarah Ndlovu", email: "sarah@example.com", phone: "+27 83 234 5678", totalOrders: 8, totalSpent: 9450, joinedDate: "2024-05-20" },
  { id: "3", name: "David Pretorius", email: "david@example.com", phone: "+27 84 345 6789", totalOrders: 15, totalSpent: 22340, joinedDate: "2023-11-10" },
  { id: "4", name: "Thabo Molefe", email: "thabo@example.com", phone: "+27 82 456 7890", totalOrders: 3, totalSpent: 2890, joinedDate: "2025-01-08" },
  { id: "5", name: "Lisa van der Berg", email: "lisa@example.com", phone: "+27 83 567 8901", totalOrders: 10, totalSpent: 14200, joinedDate: "2024-08-22" },
  { id: "6", name: "James Nkosi", email: "james@example.com", phone: "+27 84 678 9012", totalOrders: 7, totalSpent: 8750, joinedDate: "2024-06-30" },
  { id: "7", name: "Mary Dlamini", email: "mary@example.com", phone: "+27 82 789 0123", totalOrders: 5, totalSpent: 6340, joinedDate: "2024-09-14" },
  { id: "8", name: "Peter Smit", email: "peter@example.com", phone: "+27 83 890 1234", totalOrders: 20, totalSpent: 31200, joinedDate: "2023-06-05" },
  { id: "9", name: "Grace Khumalo", email: "grace@example.com", phone: "+27 84 901 2345", totalOrders: 6, totalSpent: 7890, joinedDate: "2024-12-01" },
  { id: "10", name: "Sipho Zulu", email: "sipho@example.com", phone: "+27 82 012 3456", totalOrders: 9, totalSpent: 11450, joinedDate: "2024-04-18" },
]

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("")

  const filteredCustomers = useMemo(() => {
    return demoCustomers.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search])

  const columns: ColumnDef<CustomerRow>[] = [
    {
      id: "name",
      header: "Name",
      accessorKey: "name",
      sortable: true,
      accessorFn: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-muted text-xs font-bold">
            {row.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { id: "phone", header: "Phone", accessorKey: "phone", sortable: true },
    { id: "totalOrders", header: "Orders", accessorKey: "totalOrders", sortable: true },
    { id: "totalSpent", header: "Total Spent", accessorKey: "totalSpent", sortable: true, accessorFn: (row) => formatCurrency(row.totalSpent) },
    { id: "joinedDate", header: "Joined", accessorKey: "joinedDate", sortable: true, accessorFn: (row) => formatDate(row.joinedDate) },
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
              <Link href={`/admin/customers/${row.id}`} className="flex items-center gap-2">
                <EyeIcon className="size-4" />
                View Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MailIcon className="size-4" />
              Send Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Customers"
        description="Manage your customer database"
      />

      <Card>
        <CardContent className="pt-6">
          <DataTable
            columns={columns}
            data={filteredCustomers}
            searchPlaceholder="Search customers..."
            onRowClick={(row) => window.location.href = `/admin/customers/${row.id}`}
            emptyTitle="No customers found"
            emptyDescription="No customers match your search."
            emptyIcon={UsersIcon}
          />
        </CardContent>
      </Card>
    </div>
  )
}
