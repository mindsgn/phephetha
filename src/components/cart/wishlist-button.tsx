"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlistStore } from "@/stores/wishlist-store"
import { motion } from "framer-motion"
import type { Product } from "@/types"

interface WishlistButtonProps {
  product: Product
  className?: string
}

export function WishlistButton({ product, className }: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-black/60 dark:hover:bg-black/80 ${className ?? ""}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleItem(product.id)
      }}
    >
      <motion.div
        initial={false}
        animate={{ scale: inWishlist ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            inWishlist ? "fill-red-500 text-red-500" : "text-muted-foreground"
          }`}
        />
      </motion.div>
    </Button>
  )
}
