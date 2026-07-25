"use client"

import { useState } from "react"
import { toast } from "sonner"
import { HeartIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/types"

const placeholderProducts: Product[] = [
  {
    id: "p1",
    name: "Ceramic Brake Pads - Front",
    description: "High-performance ceramic brake pads for superior stopping power.",
    sku: "BRK-CP-001",
    brand: "Brembo",
    category: "Brakes",
    price: 899,
    salePrice: 749,
    stock: 15,
    images: [],
    compatibleVehicles: ["Toyota Hilux", "Ford Ranger"],
    specifications: { Material: "Ceramic", Position: "Front" },
    rating: 4.8,
    reviewCount: 124,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "p2",
    name: "Synthetic Engine Oil 5W-30",
    description: "Fully synthetic engine oil for optimal engine protection.",
    sku: "OIL-SYN-001",
    brand: "Castrol",
    category: "Lubricants",
    price: 320,
    stock: 50,
    images: [],
    compatibleVehicles: [],
    specifications: { Viscosity: "5W-30", Volume: "5L" },
    rating: 4.9,
    reviewCount: 230,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "p3",
    name: "Premium Air Filter",
    description: "High-flow air filter for improved engine performance.",
    sku: "FLT-AF-001",
    brand: "K&N",
    category: "Filters",
    price: 450,
    stock: 30,
    images: [],
    compatibleVehicles: ["Toyota Hilux", "Toyota Fortuner"],
    specifications: { Type: "Panel", Washable: "Yes" },
    rating: 4.7,
    reviewCount: 89,
    createdAt: "",
    updatedAt: "",
  },
]

export default function CustomerWishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addItemToCart = useCartStore((s) => s.addItem)
  const [wishlistItems] = useState(
    items.length > 0 ? items : placeholderProducts.map((p) => ({ product: p, addedAt: new Date().toISOString() }))
  )

  const handleAddToCart = (product: Product) => {
    addItemToCart(product)
    toast.success(`${product.name} added to cart`)
  }

  const handleRemove = (productId: string) => {
    removeItem(productId)
    toast.success("Removed from wishlist")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          Items you&apos;ve saved for later.
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyState
          icon={HeartIcon}
          title="Your wishlist is empty"
          description="Save items you love to your wishlist for easy access later."
          action={{ label: "Browse Products", onClick: () => {} }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.product.id}>
              <div className="aspect-square bg-muted" />
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">
                      {item.product.brand}
                    </p>
                    <p className="font-medium">{item.product.name}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <p className="text-lg font-bold">
                        {formatCurrency(item.product.salePrice || item.product.price)}
                      </p>
                      {item.product.salePrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(item.product.price)}
                        </p>
                      )}
                    </div>
                    {item.product.rating && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.product.rating} ({item.product.reviewCount} reviews)
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleAddToCart(item.product)}
                  >
                    <ShoppingCartIcon className="mr-1 size-3.5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove(item.product.id)}
                  >
                    <Trash2Icon className="size-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
