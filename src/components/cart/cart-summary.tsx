"use client"

import { useState } from "react"
import { Tag, Truck, Shield, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/cart-store"
import { formatCurrency, calculateTax } from "@/lib/utils"
import { useRouter } from "next/navigation"
import type { Coupon } from "@/types"

const SHIPPING_COSTS = {
  free: 0,
  standard: 99,
  express: 199,
}

export function CartSummary() {
  const { items, coupon, getDiscountedTotal, applyCoupon, removeCoupon } = useCartStore()
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const router = useRouter()

  const subtotal = items.reduce(
    (total, item) => total + (item.product.salePrice ?? item.product.price) * item.quantity,
    0,
  )
  const totalBeforeDiscount = subtotal
  const discountedTotal = getDiscountedTotal()
  const discount = totalBeforeDiscount - discountedTotal
  const shipping = subtotal >= 500 ? SHIPPING_COSTS.free : SHIPPING_COSTS.standard
  const vat = calculateTax(discountedTotal)
  const total = discountedTotal + shipping + vat

  const handleApplyCoupon = async () => {
    setCouponError("")
    setApplyingCoupon(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const mockCoupons: Record<string, Coupon> = {
      SAVE10: {
        id: "1",
        code: "SAVE10",
        discountType: "percentage",
        discountValue: 10,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      FLAT50: {
        id: "2",
        code: "FLAT50",
        discountType: "fixed",
        discountValue: 50,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }

    const found = mockCoupons[couponCode.toUpperCase()]
    if (found) {
      applyCoupon(found)
      setCouponCode("")
    } else {
      setCouponError("Invalid coupon code")
    }
    setApplyingCoupon(false)
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
          <span>{formatCurrency(totalBeforeDiscount)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount ({coupon?.code})</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" />
            Shipping
          </span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              formatCurrency(shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">VAT (15%)</span>
          <span>{formatCurrency(vat)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase())
              setCouponError("")
            }}
            className="flex-1 h-8"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleApplyCoupon}
            disabled={!couponCode || applyingCoupon}
          >
            <Tag className="h-3.5 w-3.5" />
            {applyingCoupon ? "..." : "Apply"}
          </Button>
        </div>
        {couponError && (
          <p className="text-xs text-destructive">{couponError}</p>
        )}
        {coupon && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-600">
              <Tag className="inline h-3 w-3 mr-1" />
              {coupon.code} applied
            </span>
            <button
              onClick={removeCoupon}
              className="text-xs text-destructive hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <Button
        className="w-full bg-red-600 hover:bg-red-700 text-white h-10"
        onClick={() => router.push("/checkout")}
        disabled={items.length === 0}
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Proceed to Checkout
      </Button>

      <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
        <Shield className="h-3.5 w-3.5" />
        <span>Secure checkout powered by Stripe</span>
      </div>
    </div>
  )
}
