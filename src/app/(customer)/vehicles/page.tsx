"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  CarIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  Loader2Icon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { useAuthStore } from "@/stores/auth-store"
import { vehicleSchema, type VehicleInput } from "@/lib/validations"
import type { Vehicle } from "@/types"
import { generateId } from "@/lib/utils"

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    userId: "u1",
    make: "Toyota",
    model: "Hilux",
    year: 2023,
    color: "Silver",
    licensePlate: "GP 123-456",
    vin: "JTEBH3FJ50K001234",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "u1",
    make: "BMW",
    model: "320i",
    year: 2024,
    color: "Black",
    licensePlate: "GP 789-012",
    createdAt: "2026-03-20T10:00:00Z",
    updatedAt: "2026-03-20T10:00:00Z",
  },
]

export default function CustomerVehiclesPage() {
  const { user } = useAuthStore()
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [deletingVehicle, setDeletingVehicle] = useState<Vehicle | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleInput>({
    resolver: zodResolver(vehicleSchema),
  })

  const openAddDialog = () => {
    setEditingVehicle(null)
    reset({ make: "", model: "", year: new Date().getFullYear(), color: "", licensePlate: "", vin: "" })
    setDialogOpen(true)
  }

  const openEditDialog = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    reset({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin || "",
    })
    setDialogOpen(true)
  }

  const onSubmit = async (data: VehicleInput) => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 800))

    if (editingVehicle) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingVehicle.id
            ? { ...v, ...data, updatedAt: new Date().toISOString() }
            : v
        )
      )
      toast.success("Vehicle updated successfully")
    } else {
      const newVehicle: Vehicle = {
        id: generateId(),
        userId: user?.uid || "",
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setVehicles((prev) => [...prev, newVehicle])
      toast.success("Vehicle added successfully")
    }

    setIsSaving(false)
    setDialogOpen(false)
    reset()
  }

  const handleDelete = async () => {
    if (!deletingVehicle) return
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setVehicles((prev) => prev.filter((v) => v.id !== deletingVehicle.id))
    toast.success("Vehicle deleted")
    setIsSaving(false)
    setDeletingVehicle(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Vehicles</h1>
          <p className="text-sm text-muted-foreground">
            Manage your saved vehicles for quick booking and part lookup.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusIcon className="mr-1 size-4" />
          Add Vehicle
        </Button>
      </div>

      {vehicles.length === 0 ? (
        <EmptyState
          icon={CarIcon}
          title="No vehicles yet"
          description="Add your first vehicle to get started with personalized service."
          action={{ label: "Add Vehicle", onClick: openAddDialog }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <CarIcon className="size-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.year} · {vehicle.color}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => openEditDialog(vehicle)}
                    >
                      <PencilIcon className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeletingVehicle(vehicle)}
                    >
                      <Trash2Icon className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Plate</span>
                    <span className="font-medium">{vehicle.licensePlate}</span>
                  </div>
                  {vehicle.vin && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">VIN</span>
                      <span className="font-medium font-mono text-xs">{vehicle.vin}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Input id="make" placeholder="e.g. Toyota" {...register("make")} />
                {errors.make && (
                  <p className="text-xs text-destructive">{errors.make.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="e.g. Hilux" {...register("model")} />
                {errors.model && (
                  <p className="text-xs text-destructive">{errors.model.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="e.g. 2023"
                  {...register("year", { valueAsNumber: true })}
                />
                {errors.year && (
                  <p className="text-xs text-destructive">{errors.year.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="e.g. Silver" {...register("color")} />
                {errors.color && (
                  <p className="text-xs text-destructive">{errors.color.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                placeholder="e.g. GP 123-456"
                {...register("licensePlate")}
              />
              {errors.licensePlate && (
                <p className="text-xs text-destructive">
                  {errors.licensePlate.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vin">
                VIN <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input id="vin" placeholder="Vehicle Identification Number" {...register("vin")} />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2Icon className="mr-2 size-4 animate-spin" />}
                {editingVehicle ? "Save Changes" : "Add Vehicle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deletingVehicle}
        onOpenChange={(open) => !open && setDeletingVehicle(null)}
        title="Delete Vehicle"
        description={`Are you sure you want to delete your ${deletingVehicle?.make} ${deletingVehicle?.model}? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={isSaving}
        onConfirm={handleDelete}
      />
    </div>
  )
}
