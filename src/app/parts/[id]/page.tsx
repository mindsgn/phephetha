"use client"

import { useState, use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  TruckIcon,
  ShieldCheckIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import type { Product } from "@/types"

const productsMap: Record<string, Product> = {
  p1: {
    id: "p1", name: "Bosch Spark Plug Set (4 pcs)",
    description: "Bosch Iridium spark plugs deliver superior ignition performance, improved fuel efficiency, and reduced emissions. Engineered with a fine iridium centre electrode for consistent spark delivery and a long service life of up to 100,000km. Fits most petrol engines.",
    sku: "BRK-BOS-001", brand: "Bosch", category: "Engine", price: 450, salePrice: 359, stock: 24, images: [],
    compatibleVehicles: ["VW Polo 1.0 TSI", "VW Golf 7 1.4 TSI", "Audi A3 1.4 TFSI", "Seat Leon 1.4 TSI"],
    specifications: { "Type": "Iridium", "Electrode Gap": "0.9mm", "Thread Size": "M14 x 1.25", "Reach": "19mm", "Wrench Size": "16mm", "Quantity": "4 pieces" },
    rating: 4.8, reviewCount: 142, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
  p2: {
    id: "p2", name: "Castrol GTX 5W-40 Synthetic Oil 5L",
    description: "Castrol GTX 5W-40 Fully Synthetic motor oil is formulated with Fluid Strength Technology to protect against thermal breakdown and sludge formation. Exceeds API SP and ILSAC GF-6 standards for modern direct-injection engines.",
    sku: "OIL-CAS-002", brand: "Castrol", category: "Oils & Fluids", price: 699, stock: 56, images: [],
    compatibleVehicles: ["All Petrol Engines"],
    specifications: { "Viscosity": "5W-40", "Volume": "5 Litres", "Type": "Fully Synthetic", "API Rating": "SP", "ILSAC": "GF-6", "Application": "Passenger Cars" },
    rating: 4.7, reviewCount: 203, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
  p3: {
    id: "p3", name: "KYB Excel-G Rear Shock Absorber",
    description: "The KYB Excel-G is a gas-charged shock absorber designed to restore original ride control and handling. Twin-tube design with nitrogen gas pressurization reduces aeration and foaming for consistent performance.",
    sku: "SUS-KYB-003", brand: "KYB", category: "Suspension", price: 1250, salePrice: 999, stock: 12, images: [],
    compatibleVehicles: ["Toyota Corolla E210", "Toyota Corolla Cross", "Mazda 3 BP"],
    specifications: { "Type": "Twin-Tube Gas", "Position": "Rear", "Length": "535mm", "Stroke": "95mm", "Mounting": "Eye/Eye", "Warranty": "3 Years" },
    rating: 4.9, reviewCount: 87, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
  p4: {
    id: "p4", name: "Ferodo Front Brake Pad Set",
    description: "Ferodo Racing compound brake pads provide consistent, powerful braking with minimal fade. Low-dust ceramic formula keeps wheels cleaner. Includes all necessary hardware and anti-squeal shims.",
    sku: "BRK-FER-004", brand: "Ferodo", category: "Brakes", price: 899, salePrice: 749, stock: 30, images: [],
    compatibleVehicles: ["Ford Fiesta", "Ford Focus", "Mazda 2", "Mazda 3"],
    specifications: { "Position": "Front", "Material": "Ceramic", "Pad Depth": "18.5mm", "Width": "155mm", "Height": "68mm", "Includes": "Hardware Kit" },
    rating: 4.6, reviewCount: 168, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
  p5: {
    id: "p5", name: "Monroe Quick-Strut Assembly Front",
    description: "Monroe Quick-Strut assemblies combine a pre-assembled strut, coil spring, and mount into a single unit for fast, easy installation. No spring compressor required. Restores original ride height and handling.",
    sku: "SUS-MON-005", brand: "Monroe", category: "Suspension", price: 3200, stock: 8, images: [],
    compatibleVehicles: ["Ford Ranger T6", "Ford Everest"],
    specifications: { "Type": "Complete Assembly", "Position": "Front Left", "Includes": "Strut + Spring + Mount", "Ride Height": "OEM Spec", "Warranty": "Lifetime Limited" },
    rating: 4.5, reviewCount: 54, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
  p6: {
    id: "p6", name: "Shell Helix Ultra 5W-30 4L",
    description: "Shell Helix Ultra with PurePlus Technology converts natural gas into crystal-clear synthetic base oil. Provides outstanding wear protection, cleanliness, and viscosity control for extended drain intervals.",
    sku: "OIL-SHL-006", brand: "Shell", category: "Oils & Fluids", price: 599, stock: 40, images: [],
    compatibleVehicles: ["All Modern Petrol & Diesel Engines"],
    specifications: { "Viscosity": "5W-30", "Volume": "4 Litres", "Type": "Fully Synthetic", "API Rating": "SP", "ACEA": "C3", "OEM Approvals": "MB 229.5, VW 504/507" },
    rating: 4.8, reviewCount: 312, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01",
  },
}

const defaultProduct: Product = {
  id: "unknown", name: "Product", description: "Product description not available.",
  sku: "N/A", brand: "N/A", category: "N/A", price: 0, stock: 0, images: [],
  compatibleVehicles: [], specifications: {}, createdAt: "", updatedAt: "",
}

const reviews = [
  { id: 1, name: "Thabo M.", rating: 5, date: "2024-10-15", comment: "Excellent quality part. Fits perfectly and performs as expected. Fast delivery too!" },
  { id: 2, name: "Sarah N.", rating: 4, date: "2024-10-02", comment: "Good product, reasonable price. Only reason for 4 stars is the packaging could be better." },
  { id: 3, name: "David P.", rating: 5, date: "2024-09-28", comment: "OEM quality at a fraction of the dealer price. Highly recommended for anyone doing their own maintenance." },
]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [quantity, setQuantity] = useState(1)

  const addItem = useCartStore((s) => s.addItem)
  const wishlist = useWishlistStore((s) => s)

  const product = productsMap[id] || { ...defaultProduct, id, name: `Product #${id}` }
  const discount = product.salePrice ? calculateDiscount(product.price, product.salePrice) : 0
  const inWishlist = wishlist.isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, quantity)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/parts" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeftIcon className="size-4" />
          Back to Parts Store
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-red-600/10">
                    <ShoppingCartIcon className="size-10 text-red-600" />
                  </div>
                  <p className="text-muted-foreground">{product.brand}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-square rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center text-xs text-muted-foreground">
                  View {n}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{product.brand}</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">{product.name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">SKU: {product.sku}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`size-4 ${i < Math.floor(product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatCurrency(product.salePrice ?? product.price)}</span>
              {product.salePrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                  <Badge variant="destructive">-{discount}%</Badge>
                </>
              )}
            </div>

            <div className={`flex items-center gap-2 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? <CheckCircleIcon className="size-4" /> : null}
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </div>

            <Separator />

            <div>
              <p className="leading-relaxed text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-3">
              <Label>Quantity</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <MinusIcon className="size-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stock}>
                  <PlusIcon className="size-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 bg-red-600 text-white hover:bg-red-700" size="lg" disabled={product.stock === 0} onClick={handleAddToCart}>
                <ShoppingCartIcon className="size-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" onClick={() => wishlist.toggleItem(product.id)}>
                <HeartIcon className={`size-4 ${inWishlist ? "fill-red-600 text-red-600" : ""}`} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 rounded-xl border p-4">
              <div className="text-center">
                <TruckIcon className="mx-auto size-5 text-red-600" />
                <p className="mt-1 text-xs font-medium">Free Shipping</p>
                <p className="text-[10px] text-muted-foreground">On orders over R500</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="mx-auto size-5 text-red-600" />
                <p className="mt-1 text-xs font-medium">Warranty</p>
                <p className="text-[10px] text-muted-foreground">Manufacturer guarantee</p>
              </div>
              <div className="text-center">
                <CheckCircleIcon className="mx-auto size-5 text-red-600" />
                <p className="mt-1 text-xs font-medium">Easy Returns</p>
                <p className="text-[10px] text-muted-foreground">30-day return policy</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Product Details</h2>
            <div className="mt-6 space-y-8">
              {Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">Specifications</h3>
                  <Table className="mt-3">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/3">Specification</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{val}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {product.compatibleVehicles.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold">Compatible Vehicles</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.compatibleVehicles.map((v) => (
                      <Badge key={v} variant="secondary">{v}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="mt-6 space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="mt-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className={`size-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border p-4">
              <h3 className="font-semibold text-sm">Write a Review</h3>
              <div className="mt-3 space-y-3">
                <div>
                  <Label className="text-xs">Rating</Label>
                  <div className="mt-1 flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} className="size-5 cursor-pointer text-zinc-300 hover:fill-yellow-400 hover:text-yellow-400" />
                    ))}
                  </div>
                </div>
                <Textarea placeholder="Share your experience with this product..." rows={3} />
                <Button size="sm" className="bg-red-600 text-white hover:bg-red-700">Submit Review</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
