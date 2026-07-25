"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { PlusIcon, Trash2Icon, ArrowLeftIcon, SaveIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/layout/page-header"
import { ImageUpload } from "@/components/shared/image-upload"
import { slugify } from "@/lib/utils"
import { productSchema } from "@/lib/validations"

const categories = ["Engine Oil", "Brakes", "Air Filters", "Lighting", "Engine", "Suspension", "Clutch", "Cooling", "Wipers", "Fuel System"]
const brands = ["Castrol", "Brembo", "K&N", "Philips", "NGK", "SKF", "Sachs", "Prestone", "Bosch", "Gates"]

const demoProduct = {
  id: "1",
  name: "Synthetic Engine Oil 5W-30",
  description: "Premium fully synthetic engine oil designed for modern petrol and diesel engines. Provides exceptional wear protection and fuel economy.",
  sku: "OIL-SYN-001",
  brand: "Castrol",
  category: "Engine Oil",
  price: 299,
  salePrice: 249,
  stock: 45,
  images: [] as string[],
  compatibleVehicles: ["Toyota Hilux 2020-2024", "Ford Ranger 2019-2025", "BMW 3 Series 2018-2024"],
  specifications: { Viscosity: "5W-30", Volume: "5 Litres", Type: "Fully Synthetic", API: "SN Plus" },
  active: true,
}

export default function EditProductPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(demoProduct.images)
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>(
    Object.entries(demoProduct.specifications).map(([key, value]) => ({ key, value }))
  )
  const [compatibleVehicles, setCompatibleVehicles] = useState<string[]>(demoProduct.compatibleVehicles)
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newVehicle, setNewVehicle] = useState("")
  const [active, setActive] = useState(demoProduct.active)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productSchema) as never,
    defaultValues: {
      name: demoProduct.name,
      description: demoProduct.description,
      sku: demoProduct.sku,
      brand: demoProduct.brand,
      category: demoProduct.category,
      price: demoProduct.price,
      salePrice: demoProduct.salePrice,
      stock: demoProduct.stock,
      images: demoProduct.images as string[],
      compatibleVehicles: demoProduct.compatibleVehicles as string[],
      specifications: demoProduct.specifications as Record<string, string>,
    },
  })

  const nameValue = watch("name")

  const addSpecification = () => {
    if (newSpecKey && newSpecValue) {
      const updated = [...specifications, { key: newSpecKey, value: newSpecValue }]
      setSpecifications(updated)
      const specs: Record<string, string> = {}
      updated.forEach((s) => { specs[s.key] = s.value })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue("specifications", specs as any)
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const removeSpecification = (index: number) => {
    const updated = specifications.filter((_, i) => i !== index)
    setSpecifications(updated)
    const specs: Record<string, string> = {}
    updated.forEach((s) => { specs[s.key] = s.value })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("specifications", specs as any)
  }

  const addVehicle = () => {
    if (newVehicle && !compatibleVehicles.includes(newVehicle)) {
      const updated = [...compatibleVehicles, newVehicle]
      setCompatibleVehicles(updated)
      setValue("compatibleVehicles", updated as string[])
      setNewVehicle("")
    }
  }

  const removeVehicle = (index: number) => {
    const updated = compatibleVehicles.filter((_, i) => i !== index)
    setCompatibleVehicles(updated)
    setValue("compatibleVehicles", updated as string[])
  }

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, images, active }
    console.log("Updating product:", payload)
    toast.success("Product updated successfully!")
    router.push("/admin/products")
  }

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Edit Product"
        description={`Editing: ${demoProduct.name}`}
        breadcrumbOverrides={[
          { label: "Admin", href: "/admin" },
          { label: "Products", href: "/admin/products" },
          { label: "Edit Product" },
        ]}
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea id="description" {...register("description")} rows={6} />
                  {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={slugify(nameValue || "")} readOnly className="bg-muted" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (ZAR) *</Label>
                    <Input id="price" type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                    {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price (ZAR)</Label>
                    <Input id="salePrice" type="number" step="0.01" {...register("salePrice", { valueAsNumber: true })} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input id="sku" {...register("sku")} />
                    {errors.sku && <p className="text-xs text-destructive">{errors.sku.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input id="stock" type="number" {...register("stock", { valueAsNumber: true })} />
                    {errors.stock && <p className="text-xs text-destructive">{errors.stock.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select id="category" {...register("category")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <select id="brand" {...register("brand")} className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm">
                      {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload value={images} onChange={setImages} maxFiles={5} />
                {errors.images && <p className="mt-2 text-xs text-destructive">{errors.images.message}</p>}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Key" value={newSpecKey} onChange={(e) => setNewSpecKey(e.target.value)} className="flex-1" />
                  <Input placeholder="Value" value={newSpecValue} onChange={(e) => setNewSpecValue(e.target.value)} className="flex-1" />
                  <Button type="button" variant="outline" onClick={addSpecification}><PlusIcon className="size-4" /></Button>
                </div>
                {specifications.length > 0 && (
                  <div className="space-y-2">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                        <div className="flex gap-4">
                          <span className="text-sm font-medium">{spec.key}</span>
                          <span className="text-sm text-muted-foreground">{spec.value}</span>
                        </div>
                        <Button type="button" variant="ghost" size="icon-xs" onClick={() => removeSpecification(index)}>
                          <Trash2Icon className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatible Vehicles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="e.g. Toyota Hilux 2020-2024" value={newVehicle} onChange={(e) => setNewVehicle(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addVehicle())} className="flex-1" />
                  <Button type="button" variant="outline" onClick={addVehicle}><PlusIcon className="size-4" />Add</Button>
                </div>
                {compatibleVehicles.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {compatibleVehicles.map((v, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {v}
                        <button type="button" onClick={() => removeVehicle(index)} className="ml-1 hover:text-destructive">
                          <Trash2Icon className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <button type="button" onClick={() => setActive(!active)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? "bg-primary" : "bg-muted"}`}>
                    <span className={`inline-block size-4 rounded-full bg-white transition-transform ${active ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
                <Badge variant={active ? "default" : "secondary"}>{active ? "Active" : "Draft"}</Badge>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                <SaveIcon className="size-4" />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
