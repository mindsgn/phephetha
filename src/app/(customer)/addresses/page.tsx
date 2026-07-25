"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  MapPinIcon,
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  HomeIcon,
  BuildingIcon,
  Loader2Icon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { EmptyState } from "@/components/shared/empty-state"
import { addressSchema, type AddressInput } from "@/lib/validations"
import type { Address } from "@/types"

const mockAddresses: (Address & { id: string; isDefault: boolean; label: string })[] = [
  {
    id: "1",
    label: "Home",
    street: "123 Main Street",
    city: "Johannesburg",
    province: "Gauteng",
    postalCode: "2000",
    country: "South Africa",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    street: "456 Business Park, Unit 12",
    city: "Sandton",
    province: "Gauteng",
    postalCode: "2196",
    country: "South Africa",
    isDefault: false,
  },
]

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<typeof addresses[0] | null>(null)
  const [deletingAddress, setDeletingAddress] = useState<typeof addresses[0] | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
  })

  const openAddDialog = () => {
    setEditingAddress(null)
    reset({ street: "", city: "", province: "", postalCode: "", country: "South Africa" })
    setDialogOpen(true)
  }

  const openEditDialog = (address: typeof addresses[0]) => {
    setEditingAddress(address)
    reset({
      street: address.street,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      country: address.country,
    })
    setDialogOpen(true)
  }

  const onSubmit = async (data: AddressInput) => {
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 800))

    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === editingAddress.id ? { ...a, ...data } : a
        )
      )
      toast.success("Address updated")
    } else {
      setAddresses((prev) => [
        ...prev,
        {
          id: `addr-${Date.now()}`,
          ...data,
          isDefault: prev.length === 0,
          label: "Other",
        },
      ])
      toast.success("Address added")
    }

    setIsSaving(false)
    setDialogOpen(false)
    reset()
  }

  const handleDelete = async () => {
    if (!deletingAddress) return
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setAddresses((prev) => prev.filter((a) => a.id !== deletingAddress.id))
    toast.success("Address deleted")
    setIsSaving(false)
    setDeletingAddress(null)
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    )
    toast.success("Default address updated")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Addresses</h1>
          <p className="text-sm text-muted-foreground">
            Manage your shipping and billing addresses.
          </p>
        </div>
        <Button onClick={openAddDialog}>
          <PlusIcon className="mr-1 size-4" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          icon={MapPinIcon}
          title="No addresses saved"
          description="Add an address for faster checkout."
          action={{ label: "Add Address", onClick: openAddDialog }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-muted p-2">
                      {address.label === "Home" ? (
                        <HomeIcon className="size-4" />
                      ) : address.label === "Work" ? (
                        <BuildingIcon className="size-4" />
                      ) : (
                        <MapPinIcon className="size-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{address.label}</p>
                        {address.isDefault && (
                          <Badge variant="secondary" className="text-[10px]">
                            Default
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => openEditDialog(address)}
                    >
                      <PencilIcon className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setDeletingAddress(address)}
                    >
                      <Trash2Icon className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.province} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>
                {!address.isDefault && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Edit Address" : "Add Address"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                {...register("street")}
              />
              {errors.street && (
                <p className="text-xs text-destructive">{errors.street.message}</p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Johannesburg" {...register("city")} />
                {errors.city && (
                  <p className="text-xs text-destructive">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input id="province" placeholder="Gauteng" {...register("province")} />
                {errors.province && (
                  <p className="text-xs text-destructive">
                    {errors.province.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="2000" {...register("postalCode")} />
                {errors.postalCode && (
                  <p className="text-xs text-destructive">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register("country")} />
              </div>
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
                {editingAddress ? "Save Changes" : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={!!deletingAddress}
        onOpenChange={(open) => !open && setDeletingAddress(null)}
        title="Delete Address"
        description="Are you sure you want to delete this address?"
        confirmLabel="Delete"
        destructive
        loading={isSaving}
        onConfirm={handleDelete}
      />
    </div>
  )
}
