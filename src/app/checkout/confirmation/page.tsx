"use client"

import { Check, Package, Truck, Box, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const steps = [
  { icon: Check, label: "Order Processing", description: "We've received your order", done: true },
  { icon: Box, label: "Packing", description: "Your items are being packed" },
  { icon: Truck, label: "Shipping", description: "On the way to you" },
  { icon: Package, label: "Delivery", description: "Delivered to your door" },
]

export default function CheckoutConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Check className="h-12 w-12 text-green-600" />
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase. We&apos;ll send you an email with tracking details once your order ships.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-sm font-medium text-muted-foreground uppercase mb-6">What&apos;s Next</h2>
            <div className="space-y-6">
              {steps.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        s.done
                          ? "bg-green-600 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <s.icon className="h-5 w-5" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-6 w-px bg-border" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${s.done ? "" : "text-muted-foreground"}`}>
                      {s.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          <Link href="/shop" className="flex-1">
            <Button variant="outline" className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/orders" className="flex-1">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View My Orders</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
