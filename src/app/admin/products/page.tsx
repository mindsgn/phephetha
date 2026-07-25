"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  PackageIcon,
  MoreHorizontalIcon,
  FilterIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
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
import { formatCurrency } from "@/lib/utils"

interface ProductRow {
  id: string
  name: string
  sku: string
  brand: string
  category: string
  price: number
  stock: number
  active: boolean
  image: string
  [key: string]: unknown
}

const demoProducts: ProductRow[] = [
  { id: "1", name: "Synthetic Engine Oil 5W-30", sku: "OIL-SYN-001", brand: "Castrol", category: "Engine Oil", price: 299, stock: 45, active: true, image: "" },
  { id: "2", name: "Brake Pad Set - Front Premium", sku: "BRA-PREM-002", brand: "Brembo", category: "Brakes", price: 899, stock: 23, active: true, image: "" },
  { id: "3", name: "Performance Air Filter", sku: "AIR-PERF-003", brand: "K&N", category: "Air Filters", price: 449, stock: 38, active: true, image: "" },
  { id: "4", name: "LED Headlight Bulbs H7", sku: "LED-H7-004", brand: "Philips", category: "Lighting", price: 349, stock: 62, active: true, image: "" },
  { id: "5", name: "Spark Plugs Iridium Set", sku: "ENG-IRD-005", brand: "NGK", category: "Engine", price: 279, stock: 5, active: true, image: "" },
  { id: "6", name: "Wheel Bearing Kit", sku: "WHL-BRG-006", brand: "SKF", category: "Suspension", price: 699, stock: 0, active: false, image: "" },
  { id: "7", name: "Clutch Kit Complete", sku: "CLK-FUL-007", brand: "Sachs", category: "Clutch", price: 3499, stock: 8, active: true, image: "" },
  { id: "8", name: "Radiator Coolant 5L", sku: "RAD-COL-008", brand: "Prestone", category: "Cooling", price: 189, stock: 55, active: true, image: "" },
  { id: "9", name: "Windscreen Wipers Set", sku: "WPR-SET-009", brand: "Bosch", category: "Wipers", price: 149, stock: 80, active: true, image: "" },
  { id: "10", name: "Timing Belt Kit", sku: "ENG-TMG-010", brand: "Gates", category: "Engine", price: 1899, stock: 12, active: true, image: "" },
  { id: "11", name: "Fuel Injector Cleaner", sku: "FUL-CLN-011", brand: "Wynns", category: "Fuel System", price: 89, stock: 120, active: true, image: "" },
  { id: "12", name: "Suspension Strut Assembly", sku: "SUS-STR-012", brand: "Monroe", category: "Suspension", price: 2199, stock: 6, active: false, image: "" },
]

const categories = ["All", "Engine Oil", "Brakes", "Air Filters", "Lighting", "Engine", "Suspension", "Clutch", "Cooling", "Wipers", "Fuel System"]
const brands = ["All", "Castrol", "Brembo", "K&N", "Philips", "NGK", "SKF", "Sachs", "Prestone", "Bosch", "Gates", "Wynns", "Monroe"]

export default function AdminProductsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [brandFilter, setBrandFilter] = useState("All")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    return demoProducts.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false
      if (categoryFilter !== "All" && p.category !== categoryFilter) return false
      if (brandFilter !== "All" && p.brand !== brandFilter) return false
      return true
    })
  }, [search, categoryFilter, brandFilter])

  const columns: ColumnDef<ProductRow>[] = [
    {
      id: "image",
      header: "",
      className: "w-12",
      accessorFn: (row) => (
        <div className="size-10 overflow-hidden rounded-lg bg-muted">
          {row.image ? (
            <Image src={row.image} alt={row.name} width={40} height={40} className="size-full object-cover" />
          ) : (
            <div className="flex size-full items-center justify-center">
              <PackageIcon className="size-4 text-muted-foreground" />
            </div>
          )}
        </div>
      ),
    },
    { id: "name", header: "Name", accessorKey: "name", sortable: true },
    { id: "sku", header: "SKU", accessorKey: "sku", sortable: true },
    { id: "brand", header: "Brand", accessorKey: "brand", sortable: true },
    { id: "category", header: "Category", accessorKey: "category", sortable: true },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      sortable: true,
      accessorFn: (row) => formatCurrency(row.price),
    },
    {
      id: "stock",
      header: "Stock",
      accessorKey: "stock",
      sortable: true,
      accessorFn: (row) => (
        <span className={row.stock === 0 ? "text-red-600 font-medium" : row.stock < 10 ? "text-orange-600 font-medium" : ""}>
          {row.stock}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant={row.active ? "default" : "secondary"}>
          {row.active ? "Active" : "Draft"}
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
              <Link href={`/admin/products/${row.id}/edit`} className="flex items-center gap-2">
                <PencilIcon className="size-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={() => setDeleteId(row.id as string)}>
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
        title="Products"
        description="Manage your product inventory"
        actions={
          <Link href="/admin/products/new">
            <Button>
              <PlusIcon className="size-4" />
              Add Product
            </Button>
          </Link>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm"
            >
              {brands.map((b) => (
                <option key={b} value={b}>{b === "All" ? "All Brands" : b}</option>
              ))}
            </select>
            <div className="flex-1" />
            <Badge variant="secondary">{filteredProducts.length} products</Badge>
          </div>

          <DataTable
            columns={columns}
            data={filteredProducts}
            enableSelection
            emptyTitle="No products found"
            emptyDescription="Try adjusting your search or filters."
            emptyIcon={PackageIcon}
          />
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => {
          setDeleteId(null)
        }}
      />
    </div>
  )
}
