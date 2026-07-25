"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronRight, Truck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/stores/cart-store"
import { useAuthStore } from "@/stores/auth-store"
import { formatCurrency, calculateTax, generateOrderNumber } from "@/lib/utils"
import { checkoutSchema, type CheckoutInput } from "@/lib/validations"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

type Step = "shipping" | "review" | "confirmation"

const DELIVERY_METHODS = [
  {
    id: "standard" as const,
    name: "Standard Delivery",
    description: "5-7 business days",
    price: 99,
    icon: Truck,
  },
  {
    id: "express" as const,
    name: "Express Delivery",
    description: "1-2 business days",
    price: 199,
    icon: Zap,
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getDiscountedTotal, coupon, clearCart } = useCartStore()
  const { user, userData } = useAuthStore()
  const [step, setStep] = useState<Step>("shipping")
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard")
  const [orderNumber, setOrderNumber] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: userData?.displayName?.split(" ")[0] ?? "",
      lastName: userData?.displayName?.split(" ").slice(1).join(" ") ?? "",
      email: userData?.email ?? "",
      phone: userData?.phoneNumber ?? "",
      addressLine1: userData?.address?.street ?? "",
      city: userData?.address?.city ?? "",
      province: userData?.address?.province ?? "",
      postalCode: userData?.address?.postalCode ?? "",
      country: userData?.address?.country ?? "South Africa",
      deliveryMethod: "standard",
      saveAddress: false,
    },
  })

  const subtotal = getDiscountedTotal()
  const shippingCost = deliveryMethod === "express" ? 199 : (subtotal >= 500 ? 0 : 99)
  const discount = coupon
    ? items.reduce((t, i) => t + i.product.price * i.quantity, 0) - subtotal
    : 0
  const vat = calculateTax(subtotal)
  const total = subtotal + shippingCost + vat

  const steps: { id: Step; label: string }[] = [
    { id: "shipping", label: "Shipping" },
    { id: "review", label: "Review" },
    { id: "confirmation", label: "Confirmation" },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === step)

  const onSubmitShipping = () => {
    setStep("review")
  }

  const onPlaceOrder = () => {
    const num = generateOrderNumber()
    setOrderNumber(num)
    clearCart()
    setStep("confirmation")
  }

  if (items.length === 0 && step !== "confirmation") {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    i < currentStepIndex
                      ? "bg-red-600 text-white"
                      : i === currentStepIndex
                        ? "bg-red-600 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStepIndex ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    i <= currentStepIndex ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "shipping" && (
          <motion.div
            key="shipping"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid gap-8 lg:grid-cols-[1fr_380px]"
          >
            <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold">Shipping Information</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" {...register("firstName")} />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" {...register("lastName")} />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" {...register("phone")} />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input id="addressLine1" {...register("addressLine1")} />
                    {errors.addressLine1 && (
                      <p className="text-xs text-destructive">{errors.addressLine1.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input id="addressLine2" {...register("addressLine2")} />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" {...register("city")} />
                      {errors.city && (
                        <p className="text-xs text-destructive">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="province">Province *</Label>
                      <Input id="province" {...register("province")} />
                      {errors.province && (
                        <p className="text-xs text-destructive">{errors.province.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input id="postalCode" {...register("postalCode")} />
                      {errors.postalCode && (
                        <p className="text-xs text-destructive">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" {...register("country")} />
                    {errors.country && (
                      <p className="text-xs text-destructive">{errors.country.message}</p>
                    )}
                  </div>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox {...register("saveAddress")} />
                    Save this address for future orders
                  </label>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-semibold">Delivery Method</h2>
                  <div className="space-y-3">
                    {DELIVERY_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
                          deliveryMethod === method.id
                            ? "border-red-500 ring-2 ring-red-500/20"
                            : "hover:border-foreground/20"
                        }`}
                      >
                        <input
                          type="radio"
                          value={method.id}
                          checked={deliveryMethod === method.id}
                          onChange={() => setDeliveryMethod(method.id)}
                          className="sr-only"
                        />
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            deliveryMethod === method.id
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <span className="font-semibold">
                          {method.price === 0 ? "FREE" : formatCurrency(method.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white h-10"
              >
                Continue to Review
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </form>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <OrderSummary
                items={items}
                subtotal={items.reduce((t, i) => t + i.product.price * i.quantity, 0)}
                discount={discount}
                shipping={shippingCost}
                vat={vat}
                total={total}
                couponCode={coupon?.code}
              />
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div
            key="review"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid gap-8 lg:grid-cols-[1fr_380px]"
          >
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Shipping Details</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep("shipping")}>
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {watch("firstName")} {watch("lastName")}
                    </p>
                    <p>{watch("email")}</p>
                    <p>{watch("phone")}</p>
                    <p>{watch("addressLine1")}</p>
                    {watch("addressLine2") && <p>{watch("addressLine2")}</p>}
                    <p>
                      {watch("city")}, {watch("province")} {watch("postalCode")}
                    </p>
                    <p>{watch("country")}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Delivery: </span>
                      {deliveryMethod === "express" ? "Express (1-2 days)" : "Standard (5-7 days)"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-3">
                  <h2 className="text-lg font-semibold">Order Items</h2>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 py-2">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700">
                        {item.product.images[0] ? (
                          <img src={item.product.images[0]} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">N/A</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">
                        {formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10"
                  onClick={onPlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>

            <div className="lg:sticky lg:top-8 lg:self-start">
              <OrderSummary
                items={items}
                subtotal={items.reduce((t, i) => t + i.product.price * i.quantity, 0)}
                discount={discount}
                shipping={shippingCost}
                vat={vat}
                total={total}
                couponCode={coupon?.code}
              />
            </div>
          </motion.div>
        )}

        {step === "confirmation" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center space-y-6 py-8"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Check className="h-10 w-10 text-green-600" />
              </motion.div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">Order Confirmed!</h2>
              <p className="text-muted-foreground mt-2">
                Thank you for your purchase. Your order has been received.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Order Number</span>
                  <p className="font-mono font-bold text-lg">{orderNumber}</p>
                </div>
                <Separator />
                <div className="text-sm">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <p className="font-medium">
                    {deliveryMethod === "express"
                      ? new Date(Date.now() + 2 * 86400000).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
                      : new Date(Date.now() + 7 * 86400000).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })
                    }
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Link href="/shop" className="flex-1">
                <Button variant="outline" className="w-full">Continue Shopping</Button>
              </Link>
              <Link href={`/orders/${orderNumber}`} className="flex-1">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View Order</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function OrderSummary({
  items,
  subtotal,
  discount,
  shipping,
  vat,
  total,
  couponCode,
}: {
  items: { product: { name: string; price: number; salePrice?: number }; quantity: number }[]
  subtotal: number
  discount: number
  shipping: number
  vat: number
  total: number
  couponCode?: string
}) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item.product.name} className="flex justify-between text-sm">
              <span className="text-muted-foreground truncate pr-2">
                {item.product.name} x{item.quantity}
              </span>
              <span className="shrink-0">{formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount ({couponCode})</span>
              <span>-{formatCurrency(discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "FREE" : formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (15%)</span>
            <span>{formatCurrency(vat)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
