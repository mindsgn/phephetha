"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  SearchIcon,
  ShoppingCartIcon,
  StarIcon,
  SlidersHorizontalIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import type { Product } from "@/types"

const allProducts: Product[] = [
  { id: "p1", name: "Bosch Spark Plug Set (4 pcs)", description: "Iridium spark plugs for optimal engine performance", sku: "BRK-BOS-001", brand: "Bosch", category: "Engine", price: 450, salePrice: 359, stock: 24, images: [], compatibleVehicles: ["VW Polo", "Golf 7"], specifications: {}, rating: 4.8, reviewCount: 142, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p2", name: "Castrol GTX 5W-40 Synthetic Oil 5L", description: "Full synthetic engine oil for modern engines", sku: "OIL-CAS-002", brand: "Castrol", category: "Oils & Fluids", price: 699, stock: 56, images: [], compatibleVehicles: [], specifications: {}, rating: 4.7, reviewCount: 203, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p3", name: "KYB Excel-G Rear Shock Absorber", description: "Premium shock absorber for superior ride comfort", sku: "SUS-KYB-003", brand: "KYB", category: "Suspension", price: 1250, salePrice: 999, stock: 12, images: [], compatibleVehicles: ["Toyota Corolla"], specifications: {}, rating: 4.9, reviewCount: 87, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p4", name: "Ferodo Front Brake Pad Set", description: "Ceramic brake pads for quiet, dust-free braking", sku: "BRK-FER-004", brand: "Ferodo", category: "Brakes", price: 899, salePrice: 749, stock: 30, images: [], compatibleVehicles: [], specifications: {}, rating: 4.6, reviewCount: 168, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p5", name: "Monroe Quick-Strut Assembly Front", description: "Complete strut assembly for easy installation", sku: "SUS-MON-005", brand: "Monroe", category: "Suspension", price: 3200, stock: 8, images: [], compatibleVehicles: [], specifications: {}, rating: 4.5, reviewCount: 54, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p6", name: "Shell Helix Ultra 5W-30 4L", description: "Fully synthetic motor oil with PurePlus Technology", sku: "OIL-SHL-006", brand: "Shell", category: "Oils & Fluids", price: 599, stock: 40, images: [], compatibleVehicles: [], specifications: {}, rating: 4.8, reviewCount: 312, featured: true, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p7", name: "Continental Premium Contact 6 Tyre 205/55R16", description: "Ultra-high performance summer tyre", sku: "TYR-CON-007", brand: "Continental", category: "Tyres", price: 2800, salePrice: 2450, stock: 18, images: [], compatibleVehicles: [], specifications: {}, rating: 4.9, reviewCount: 76, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p8", name: "Denso Iridium Power Spark Plug", description: "Long-life iridium spark plug for improved fuel economy", sku: "BRK-DEN-008", brand: "Denso", category: "Engine", price: 180, stock: 100, images: [], compatibleVehicles: [], specifications: {}, rating: 4.7, reviewCount: 198, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p9", name: "NGK Laser Iridium Spark Plug", description: "OEM-spec iridium spark plug with laser welding", sku: "BRK-NGK-009", brand: "NGK", category: "Engine", price: 165, stock: 80, images: [], compatibleVehicles: [], specifications: {}, rating: 4.6, reviewCount: 245, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p10", name: "Bosch Wiper Blade Set (Front)", description: "Aero-twin wiper blades for all-weather visibility", sku: "ACC-BOS-010", brand: "Bosch", category: "Accessories", price: 399, salePrice: 329, stock: 45, images: [], compatibleVehicles: [], specifications: {}, rating: 4.5, reviewCount: 167, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p11", name: "Castrol Power1 10W-40 Racing Oil 4L", description: "High-performance semi-synthetic motorcycle oil", sku: "OIL-CAS-011", brand: "Castrol", category: "Oils & Fluids", price: 450, stock: 35, images: [], compatibleVehicles: [], specifications: {}, rating: 4.4, reviewCount: 89, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
  { id: "p12", name: "SKF Wheel Bearing Kit", description: "Premium sealed wheel bearing for smooth rotation", sku: "BRG-SKF-012", brand: "SKF", category: "Suspension", price: 780, stock: 22, images: [], compatibleVehicles: [], specifications: {}, rating: 4.8, reviewCount: 64, active: true, createdAt: "2024-06-01", updatedAt: "2024-06-01" },
]

const categories = [...new Set(allProducts.map((p) => p.category))]
const brands = [...new Set(allProducts.map((p) => p.brand))]
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Highest Rated" },
]

const ITEMS_PER_PAGE = 8

export default function PartsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState("featured")
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const addItem = useCartStore((s) => s.addItem)
  const wishlist = useWishlistStore((s) => s)
  const cartAddItem = useCartStore((s) => s.addItem)

  const filtered = useMemo(() => {
    let items = [...allProducts]

    if (search) {
      const q = search.toLowerCase()
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    }
    if (selectedCategories.length > 0) {
      items = items.filter((p) => selectedCategories.includes(p.category))
    }
    if (selectedBrands.length > 0) {
      items = items.filter((p) => selectedBrands.includes(p.brand))
    }
    if (inStockOnly) {
      items = items.filter((p) => p.stock > 0)
    }

    switch (sort) {
      case "price-low":
        items.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
        break
      case "price-high":
        items.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
        break
      case "rating":
        items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case "newest":
        items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      default:
        items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return items
  }, [search, selectedCategories, selectedBrands, inStockOnly, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))
    setPage(1)
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    setPage(1)
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategories([])
    setSelectedBrands([])
    setInStockOnly(false)
    setSort("featured")
    setPage(1)
  }

  const hasActiveFilters = search || selectedCategories.length > 0 || selectedBrands.length > 0 || inStockOnly

  const filterSidebar = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">Availability</h3>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={() => { setInStockOnly(!inStockOnly); setPage(1) }}
          />
          In Stock Only
        </label>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <XIcon className="size-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">Parts Store</p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Shop <span className="text-red-600">Auto Parts</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Browse our extensive range of quality parts from the world&apos;s best brands.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-80">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search parts..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
              <SlidersHorizontalIcon className="size-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {mobileFiltersOpen && (
          <div className="mb-6 rounded-xl border bg-card p-4 lg:hidden">
            {filterSidebar}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border bg-card p-4">
              {filterSidebar}
            </div>
          </aside>

          <div>
            {paged.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg font-medium">No products found</p>
                <p className="mt-1 text-sm">Try adjusting your filters or search.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {paged.map((product, i) => {
                  const discount = product.salePrice ? calculateDiscount(product.price, product.salePrice) : 0
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <Card className="group h-full transition-all hover:shadow-lg hover:border-red-600/20">
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
                            <Badge variant="destructive" className="absolute top-3 left-3">-{discount}%</Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => wishlist.toggleItem(product.id)}
                            aria-label="Add to wishlist"
                          >
                            <HeartIcon className={`size-4 ${wishlist.isInWishlist(product.id) ? "fill-red-600 text-red-600" : ""}`} />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-xs font-medium text-muted-foreground">{product.brand}</p>
                          <Link href={`/parts/${product.id}`}>
                            <h3 className="mt-1 line-clamp-2 text-sm font-semibold hover:text-red-600 transition-colors">{product.name}</h3>
                          </Link>
                          <div className="mt-2 flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <StarIcon key={j} className={`size-3 ${j < Math.floor(product.rating ?? 0) ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                          </div>
                          <div className="mt-3 flex items-end justify-between">
                            <div>
                              <span className="text-lg font-bold">{formatCurrency(product.salePrice ?? product.price)}</span>
                              {product.salePrice && (
                                <span className="ml-2 text-sm text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className={`text-xs font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                              {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                            </span>
                          </div>
                          <Button
                            className="mt-3 w-full bg-red-600 text-white hover:bg-red-700"
                            size="sm"
                            disabled={product.stock === 0}
                            onClick={() => addItem(product)}
                          >
                            <ShoppingCartIcon className="size-3.5" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "outline"}
                    size="icon"
                    onClick={() => setPage(i + 1)}
                    className={page === i + 1 ? "bg-red-600 text-white hover:bg-red-700" : ""}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRightIcon className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
