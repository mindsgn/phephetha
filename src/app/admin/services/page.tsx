"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  MoreHorizontalIcon,
  ClockIcon,
  WrenchIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { serviceSchema } from "@/lib/validations"

interface ServiceRow {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  active: boolean
  benefits: string[]
  [key: string]: unknown
}

const demoServices: ServiceRow[] = [
  { id: "1", name: "Full Service", description: "Complete vehicle service including oil change, filter replacement, brake inspection, and multi-point check.", price: 1599, duration: 120, category: "General", active: true, benefits: ["Oil & filter change", "Brake inspection", "50-point check"] },
  { id: "2", name: "Oil Change", description: "Quick oil change with premium synthetic oil and new oil filter.", price: 499, duration: 30, category: "General", active: true, benefits: ["Premium oil", "New filter", "Fluid top-up"] },
  { id: "3", name: "Brake Service", description: "Complete brake system inspection and service including pad replacement if needed.", price: 899, duration: 60, category: "Brakes", active: true, benefits: ["Pad replacement", "Rotor inspection", "Brake fluid check"] },
  { id: "4", name: "Engine Diagnostic", description: "Advanced computer diagnostic to identify engine issues and error codes.", price: 399, duration: 45, category: "Diagnostics", active: true, benefits: ["OBD-II scan", "Error code reading", "Report"] },
  { id: "5", name: "Wheel Alignment", description: "Precision wheel alignment using state-of-the-art equipment.", price: 349, duration: 45, category: "Suspension", active: true, benefits: ["4-wheel alignment", "Tire rotation", "Printout"] },
  { id: "6", name: "AC Service", description: "Air conditioning system service including gas recharge and leak check.", price: 599, duration: 60, category: "AC", active: true, benefits: ["Gas recharge", "Leak test", "Performance check"] },
  { id: "7", name: "Battery Replacement", description: "Battery testing and replacement with warranty.", price: 299, duration: 15, category: "Electrical", active: false, benefits: ["Free testing", "Installation", "3-year warranty"] },
]

const categories = ["All", "General", "Brakes", "Diagnostics", "Suspension", "AC", "Electrical"]

export default function AdminServicesPage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingService, setEditingService] = useState<ServiceRow | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema) as never,
  })

  const openNew = () => {
    setEditingService(null)
    reset({ name: "", description: "", price: 0, duration: 30, images: [], benefits: [] })
    setFormOpen(true)
  }

  const openEdit = (service: ServiceRow) => {
    setEditingService(service)
    reset({ name: service.name, description: service.description, price: service.price, duration: service.duration, images: [], benefits: service.benefits })
    setFormOpen(true)
  }

  const onSubmit = (data: Record<string, unknown>) => {
    if (editingService) {
      toast.success("Service updated successfully!")
    } else {
      toast.success("Service created successfully!")
    }
    setFormOpen(false)
  }

  const filteredServices = activeFilter === "All" ? demoServices : demoServices.filter((s) => s.category === activeFilter)

  const columns: ColumnDef<ServiceRow>[] = [
    { id: "name", header: "Service", accessorKey: "name", sortable: true },
    { id: "category", header: "Category", accessorKey: "category", sortable: true },
    { id: "price", header: "Price", accessorKey: "price", sortable: true, accessorFn: (row) => formatCurrency(row.price) },
    {
      id: "duration",
      header: "Duration",
      accessorKey: "duration",
      sortable: true,
      accessorFn: (row) => (
        <div className="flex items-center gap-1">
          <ClockIcon className="size-3 text-muted-foreground" />
          {row.duration} min
        </div>
      ),
    },
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
            <DropdownMenuItem onClick={() => openEdit(row)}>
              <PencilIcon className="size-4" />
              Edit
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
        title="Services"
        description="Manage your service offerings"
        actions={
          <Button onClick={openNew}>
            <PlusIcon className="size-4" />
            Add Service
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button key={cat} variant={activeFilter === cat ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(cat)}>
            {cat}
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <DataTable columns={columns} data={filteredServices} emptyTitle="No services found" emptyIcon={WrenchIcon} />
        </CardContent>
      </Card>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input {...register("name")} placeholder="Service name" />
              {errors.name && <p className="text-xs text-destructive">{String(errors.name.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea {...register("description")} rows={3} placeholder="Service description" />
              {errors.description && <p className="text-xs text-destructive">{String(errors.description.message)}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (ZAR) *</Label>
                <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                {errors.price && <p className="text-xs text-destructive">{String(errors.price.message)}</p>}
              </div>
              <div className="space-y-2">
                <Label>Duration (min) *</Label>
                <Input type="number" {...register("duration", { valueAsNumber: true })} />
                {errors.duration && <p className="text-xs text-destructive">{String(errors.duration.message)}</p>}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
              <Button type="submit">{editingService ? "Save Changes" : "Create Service"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete Service"
        description="Are you sure you want to delete this service?"
        confirmLabel="Delete"
        destructive
        onConfirm={() => { setDeleteId(null); toast.success("Service deleted!") }}
      />
    </div>
  )
}
