"use client"

import { ShoppingCart, ArrowLeft, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { EmptyState } from "@/components/shared/empty-state"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

export default function CartPage() {
  const { items, getItemCount } = useCartStore()
  const itemCount = getItemCount()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <EmptyState
          icon={PackageOpen}
          title="Your cart is empty"
          description="Looks like you haven't added any products yet. Browse our shop to find the parts and accessories you need."
          action={{
            label: "Shop Now",
            onClick: () => (window.location.href = "/shop"),
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </AnimatePresence>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}
