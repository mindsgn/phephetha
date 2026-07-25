"use client"

import { useState } from "react"
import { Car, Plus, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { Vehicle } from "@/types"

interface VehicleSelectorProps {
  vehicles: Vehicle[]
  selectedVehicleId: string | null
  onSelect: (vehicleId: string) => void
  onAddVehicle: (vehicle: Omit<Vehicle, "id" | "userId" | "createdAt" | "updatedAt">) => void
}

export function VehicleSelector({
  vehicles,
  selectedVehicleId,
  onSelect,
  onAddVehicle,
}: VehicleSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear(),
    color: "",
    licensePlate: "",
    vin: "",
  })

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId)

  const handleSubmit = () => {
    if (newVehicle.make && newVehicle.model && newVehicle.licensePlate) {
      onAddVehicle(newVehicle)
      setNewVehicle({ make: "", model: "", year: new Date().getFullYear(), color: "", licensePlate: "", vin: "" })
      setShowAddForm(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Vehicle Details</h2>
        <p className="text-sm text-muted-foreground">Select a vehicle or add a new one</p>
      </div>

      {vehicles.length > 0 && !showAddForm && (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex w-full items-center justify-between rounded-xl border p-4 text-left hover:border-foreground/20 transition-colors"
          >
            {selectedVehicle ? (
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedVehicle.licensePlate} &middot; {selectedVehicle.color}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Car className="h-5 w-5" />
                <span>Select a vehicle</span>
              </div>
            )}
            <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
          </button>

          {showDropdown && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border bg-popover py-1 shadow-lg">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => {
                    onSelect(vehicle.id)
                    setShowDropdown(false)
                  }}
                  className={`flex w-full items-center gap-3 p-3 text-left transition-colors hover:bg-muted ${
                    selectedVehicleId === vehicle.id ? "bg-muted" : ""
                  }`}
                >
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.licensePlate} &middot; {vehicle.color}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!showAddForm ? (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Vehicle
        </Button>
      ) : (
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">New Vehicle</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Make *</Label>
                <Input
                  value={newVehicle.make}
                  onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                  placeholder="e.g. Toyota"
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Model *</Label>
                <Input
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  placeholder="e.g. Corolla"
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Year *</Label>
                <Input
                  type="number"
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) || new Date().getFullYear() })}
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Color</Label>
                <Input
                  value={newVehicle.color}
                  onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                  placeholder="e.g. White"
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">License Plate *</Label>
                <Input
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({ ...newVehicle, licensePlate: e.target.value.toUpperCase() })}
                  placeholder="e.g. ABC 123 GP"
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">VIN (optional)</Label>
                <Input
                  value={newVehicle.vin}
                  onChange={(e) => setNewVehicle({ ...newVehicle, vin: e.target.value })}
                  placeholder="Vehicle Identification Number"
                  className="h-8"
                />
              </div>
            </div>

            <Button
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleSubmit}
              disabled={!newVehicle.make || !newVehicle.model || !newVehicle.licensePlate}
            >
              Add Vehicle
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
