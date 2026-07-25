"use client"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { WishlistButton } from "@/components/cart/wishlist-button"
import { formatCurrency, calculateDiscount } from "@/lib/utils"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasSale = product.salePrice != null && product.salePrice < product.price
  const discount = hasSale ? calculateDiscount(product.price, product.salePrice!) : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-0 ring-1 ring-foreground/5 hover:ring-foreground/10 hover:shadow-lg transition-shadow">
        <Link href={`/shop/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No Image
              </div>
            )}

            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {hasSale && (
                <Badge className="bg-red-600 text-white hover:bg-red-600">
                  -{discount}%
                </Badge>
              )}
              {product.featured && (
                <Badge className="bg-neutral-900 text-white hover:bg-neutral-900">
                  Featured
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary" className="bg-neutral-500 text-white">
                  Out of Stock
                </Badge>
              )}
            </div>

            <div className="absolute top-2 right-2">
              <WishlistButton product={product} />
            </div>
          </div>
        </Link>

        <CardContent className="p-4 space-y-2">
          <Link href={`/shop/${product.id}`}>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.brand}</p>
            <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
          </Link>

          {product.rating != null && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating!)
                      ? "fill-amber-400 text-amber-400"
                      : "text-neutral-300 dark:text-neutral-600"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviewCount ?? 0})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold">
              {formatCurrency(hasSale ? product.salePrice! : product.price)}
            </span>
            {hasSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <AddToCartButton product={product} compact />
        </CardContent>
      </Card>
    </motion.div>
  )
}
