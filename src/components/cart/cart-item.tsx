"use client"

import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency } from "@/lib/utils"
import type { CartItem as CartItemType } from "@/types"
import { motion } from "framer-motion"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const lineTotal = item.product.price * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex items-center gap-4 py-4 border-b last:border-b-0"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
        {item.product.images[0] ? (
          <img
            src={item.product.images[0]}
            alt={item.product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
            <p className="text-xs text-muted-foreground">{item.product.brand}</p>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => removeItem(item.product.id)}
            className="shrink-0 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <input
              type="number"
              min={1}
              max={item.product.stock}
              value={item.quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value)
                if (!isNaN(val) && val > 0) {
                  updateQuantity(item.product.id, Math.min(val, item.product.stock))
                }
              }}
              className="h-6 w-12 rounded border bg-transparent text-center text-sm"
            />
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <p className="text-sm font-semibold">{formatCurrency(lineTotal)}</p>
        </div>
      </div>
    </motion.div>
  )
}
