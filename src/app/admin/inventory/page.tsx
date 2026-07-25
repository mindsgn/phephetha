"use client"

import { useState, useMemo } from "react"
import {
  PackageIcon,
  PlusIcon,
  MinusIcon,
  ArrowUpDownIcon,
  DownloadIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { PageHeader } from "@/components/layout/page-header"
import { formatDate } from "@/lib/utils"

interface InventoryRow {
  id: string
  productName: string
  sku: string
  currentStock: number
  lowStockThreshold: number
  lastUpdated: string
  [key: string]: unknown
}

const demoInventory: InventoryRow[] = [
  { id: "1", productName: "Synthetic Engine Oil 5W-30", sku: "OIL-SYN-001", currentStock: 45, lowStockThreshold: 10, lastUpdated: "2026-07-18" },
  { id: "2", productName: "Brake Pad Set - Front Premium", sku: "BRA-PREM-002", currentStock: 23, lowStockThreshold: 10, lastUpdated: "2026-07-17" },
  { id: "3", productName: "Performance Air Filter", sku: "AIR-PERF-003", currentStock: 38, lowStockThreshold: 15, lastUpdated: "2026-07-17" },
  { id: "4", productName: "LED Headlight Bulbs H7", sku: "LED-H7-004", currentStock: 62, lowStockThreshold: 20, lastUpdated: "2026-07-16" },
  { id: "5", productName: "Spark Plugs Iridium Set", sku: "ENG-IRD-005", currentStock: 3, lowStockThreshold: 8, lastUpdated: "2026-07-16" },
  { id: "6", productName: "Wheel Bearing Kit", sku: "WHL-BRG-006", currentStock: 0, lowStockThreshold: 5, lastUpdated: "2026-07-15" },
  { id: "7", productName: "Clutch Kit Complete", sku: "CLK-FUL-007", currentStock: 8, lowStockThreshold: 3, lastUpdated: "2026-07-14" },
  { id: "8", productName: "Radiator Coolant 5L", sku: "RAD-COL-008", currentStock: 55, lowStockThreshold: 15, lastUpdated: "2026-07-14" },
  { id: "9", productName: "Engine Oil Filter", sku: "OIL-FLT-009", currentStock: 5, lowStockThreshold: 15, lastUpdated: "2026-07-13" },
  { id: "10", productName: "Timing Belt Kit", sku: "ENG-TMG-010", currentStock: 12, lowStockThreshold: 5, lastUpdated: "2026-07-12" },
]

const movementHistory = [
  { id: "1", product: "Synthetic Engine Oil 5W-30", type: "out", quantity: 5, reason: "Order #ORD-7891", date: "2026-07-18" },
  { id: "2", product: "Brake Pad Set - Front", type: "in", quantity: 20, reason: "Supplier delivery", date: "2026-07-17" },
  { id: "3", product: "Engine Oil Filter", type: "out", quantity: 10, reason: "Order #ORD-7885", date: "2026-07-16" },
  { id: "4", product: "Performance Air Filter", type: "in", quantity: 15, reason: "Restock", date: "2026-07-15" },
  { id: "5", product: "Spark Plugs Iridium Set", type: "adjust", quantity: -2, reason: "Damaged in storage", date: "2026-07-14" },
]

function getStockStatus(current: number, threshold: number): { label: string; color: string } {
  if (current === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
  if (current < threshold) return { label: "Low Stock", color: "bg-orange-100 text-orange-800" }
  return { label: "In Stock", color: "bg-green-100 text-green-800" }
}

export default function AdminInventoryPage() {
  const [adjustOpen, setAdjustOpen] = useState(false)
  const [adjustItem, setAdjustItem] = useState<InventoryRow | null>(null)
  const [adjustType, setAdjustType] = useState<"in" | "out" | "adjust">("in")
  const [adjustQty, setAdjustQty] = useState(1)
  const [adjustReason, setAdjustReason] = useState("")
  const [lowStockOnly, setLowStockOnly] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  const filteredInventory = useMemo(() => {
    return demoInventory.filter((item) => {
      if (lowStockOnly && item.currentStock >= item.lowStockThreshold) return false
      return true
    })
  }, [lowStockOnly])

  const openAdjustDialog = (item: InventoryRow) => {
    setAdjustItem(item)
    setAdjustType("in")
    setAdjustQty(1)
    setAdjustReason("")
    setAdjustOpen(true)
  }

  const columns: ColumnDef<InventoryRow>[] = [
    { id: "productName", header: "Product", accessorKey: "productName", sortable: true },
    { id: "sku", header: "SKU", accessorKey: "sku", sortable: true },
    {
      id: "currentStock",
      header: "Stock",
      accessorKey: "currentStock",
      sortable: true,
      accessorFn: (row) => (
        <span className={`font-bold ${row.currentStock === 0 ? "text-red-600" : row.currentStock < row.lowStockThreshold ? "text-orange-600" : ""}`}>
          {row.currentStock}
        </span>
      ),
    },
    { id: "lowStockThreshold", header: "Threshold", accessorKey: "lowStockThreshold", sortable: true },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => {
        const status = getStockStatus(row.currentStock, row.lowStockThreshold)
        return <Badge variant="secondary" className={`text-[10px] ${status.color}`}>{status.label}</Badge>
      },
    },
    { id: "lastUpdated", header: "Last Updated", accessorKey: "lastUpdated", sortable: true, accessorFn: (row) => formatDate(row.lastUpdated) },
    {
      id: "actions",
      header: "",
      accessorFn: (row) => (
        <Button variant="outline" size="sm" onClick={() => openAdjustDialog(row)}>
          <ArrowUpDownIcon className="size-3" />
          Adjust
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Inventory"
        description="Manage stock levels and inventory"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? "Hide History" : "Movement History"}
            </Button>
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              Export
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2"><PackageIcon className="size-5 text-green-600" /></div>
              <div>
                <p className="text-2xl font-bold">{demoInventory.filter((i) => i.currentStock > 0 && i.currentStock >= i.lowStockThreshold).length}</p>
                <p className="text-sm text-muted-foreground">In Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-orange-100 p-2"><AlertTriangleIcon className="size-5 text-orange-600" /></div>
              <div>
                <p className="text-2xl font-bold">{demoInventory.filter((i) => i.currentStock > 0 && i.currentStock < i.lowStockThreshold).length}</p>
                <p className="text-sm text-muted-foreground">Low Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-red-100 p-2"><PackageIcon className="size-5 text-red-600" /></div>
              <div>
                <p className="text-2xl font-bold">{demoInventory.filter((i) => i.currentStock === 0).length}</p>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex items-center gap-3">
            <Input placeholder="Search inventory..." className="w-72" />
            <Button variant={lowStockOnly ? "default" : "outline"} size="sm" onClick={() => setLowStockOnly(!lowStockOnly)}>
              <AlertTriangleIcon className="size-4" />
              Low Stock Only
            </Button>
          </div>
          <DataTable columns={columns} data={filteredInventory} emptyTitle="No inventory items" emptyDescription="No items found." emptyIcon={PackageIcon} />
        </CardContent>
      </Card>

      {showHistory && (
        <Card>
          <CardHeader>
            <CardTitle>Movement History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {movementHistory.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-8 items-center justify-center rounded-full ${m.type === "in" ? "bg-green-100 text-green-600" : m.type === "out" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                      {m.type === "in" ? <PlusIcon className="size-4" /> : m.type === "out" ? <MinusIcon className="size-4" /> : <ArrowUpDownIcon className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{m.product}</p>
                      <p className="text-xs text-muted-foreground">{m.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${m.type === "in" ? "text-green-600" : m.type === "out" ? "text-red-600" : "text-blue-600"}`}>
                      {m.type === "in" ? "+" : m.type === "out" ? "-" : ""}{Math.abs(m.quantity)}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatDate(m.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Stock - {adjustItem?.productName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Adjustment Type</Label>
              <div className="flex gap-2">
                {(["in", "out", "adjust"] as const).map((type) => (
                  <Button
                    key={type}
                    variant={adjustType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAdjustType(type)}
                    className="capitalize"
                  >
                    {type === "in" ? "Stock In" : type === "out" ? "Stock Out" : "Set Count"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Quantity</Label>
              <Input type="number" min={1} value={adjustQty} onChange={(e) => setAdjustQty(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Reason *</Label>
              <Textarea placeholder="e.g. Supplier delivery, Damaged, Count correction..." value={adjustReason} onChange={(e) => setAdjustReason(e.target.value)} rows={2} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustOpen(false)}>Cancel</Button>
            <Button onClick={() => { setAdjustOpen(false) }}>Apply Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
