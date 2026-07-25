"use client"

import { useState } from "react"
import { ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/types"

interface AddToCartButtonProps {
  product: Product
  compact?: boolean
}

export function AddToCartButton({ product, compact }: AddToCartButtonProps) {
  const { addItem, isProductInCart, getItemQuantity } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const inCart = isProductInCart(product.id)
  const cartQty = getItemQuantity(product.id)

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (compact) {
    return (
      <Button
        size="sm"
        className="w-full bg-red-600 hover:bg-red-700 text-white"
        onClick={handleAdd}
        disabled={product.stock === 0}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-1"
            >
              <Check className="h-3.5 w-3.5" /> Added
            </motion.span>
          ) : inCart ? (
            <motion.span
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> In Cart ({cartQty})
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1"
            >
              <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-lg border">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Button
        className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
        onClick={handleAdd}
        disabled={product.stock === 0}
      >
        <AnimatePresence mode="wait">
          {added ? (
            <motion.span
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="h-4 w-4" /> Added to Cart
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              {inCart ? `Add More (${cartQty} in cart)` : "Add to Cart"}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}
