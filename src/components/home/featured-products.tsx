"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCartIcon, StarIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import type { Product } from "@/types"

const featuredProducts: Product[] = [
  { id: "p1", name: "Bosch Spark Plug Set", description: "Iridium spark plugs for optimal engine performance", sku: "BRK-BOS-001", brand: "Bosch", category: "Engine", price: 450, salePrice: 359, stock: 24, images: [], compatibleVehicles: [], specifications: {}, rating: 4.8, reviewCount: 142, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "p2", name: "Castrol GTX 5W-40 Oil 5L", description: "Full synthetic engine oil for modern engines", sku: "OIL-CAS-002", brand: "Castrol", category: "Oils", price: 699, stock: 56, images: [], compatibleVehicles: [], specifications: {}, rating: 4.7, reviewCount: 203, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "p3", name: "KYB Excel-G Shock Absorber", description: "Premium shock absorber for superior ride comfort", sku: "SUS-KYB-003", brand: "KYB", category: "Suspension", price: 1250, salePrice: 999, stock: 12, images: [], compatibleVehicles: [], specifications: {}, rating: 4.9, reviewCount: 87, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "p4", name: "Ferodo Brake Pad Set Front", description: "Ceramic brake pads for quiet, dust-free braking", sku: "BRK-FER-004", brand: "Ferodo", category: "Brakes", price: 899, salePrice: 749, stock: 30, images: [], compatibleVehicles: [], specifications: {}, rating: 4.6, reviewCount: 168, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "p5", name: "Monroe Quick-Strut Assembly", description: "Complete strut assembly for easy installation", sku: "SUS-MON-005", brand: "Monroe", category: "Suspension", price: 3200, stock: 8, images: [], compatibleVehicles: [], specifications: {}, rating: 4.5, reviewCount: 54, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "p6", name: "Shell Helix Ultra 5W-30 4L", description: "Fully synthetic motor oil with PurePlus Technology", sku: "OIL-SHL-006", brand: "Shell", category: "Oils", price: 599, stock: 40, images: [], compatibleVehicles: [], specifications: {}, rating: 4.8, reviewCount: 312, featured: true, active: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`size-3.5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
        />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const discount = product.salePrice ? calculateDiscount(product.price, product.salePrice) : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group flex min-w-[260px] flex-col rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square rounded-t-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-red-600/10">
              <ShoppingCartIcon className="size-6 text-red-600" />
            </div>
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          </div>
        </div>
        {discount > 0 && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            -{discount}%
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium text-muted-foreground">{product.brand}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <StarRating rating={product.rating ?? 0} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="text-lg font-bold text-foreground">
              {formatCurrency(product.salePrice ?? product.price)}
            </span>
            {product.salePrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          <Button
            size="icon-sm"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCartIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Shop Now</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured <span className="text-red-600">Parts</span>
            </h2>
            <p className="mt-2 text-muted-foreground">
              Top-quality parts from trusted brands at competitive prices.
            </p>
          </div>
          <Link
            href="/parts"
            className="hidden items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 sm:inline-flex"
          >
            Shop All Parts
            <ArrowRightIcon className="size-4" />
          </Link>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 sm:overflow-visible sm:pb-0">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="min-w-[260px] sm:min-w-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/parts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600"
          >
            Shop All Parts
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
