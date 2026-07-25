"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeftIcon, PrinterIcon, PackageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { Order, OrderStatus } from "@/types"

const mockOrder: Order = {
  id: "1",
  orderNumber: "ORD-M4K8X2-A1B3",
  userId: "u1",
  items: [
    {
      product: {
        id: "p1",
        name: "Ceramic Brake Pads - Front",
        description: "High-performance ceramic brake pads.",
        sku: "BRK-CP-001",
        brand: "Brembo",
        category: "Brakes",
        price: 899,
        salePrice: 749,
        stock: 15,
        images: ["/placeholder.jpg"],
        compatibleVehicles: ["Toyota Hilux"],
        specifications: {},
        rating: 4.8,
        reviewCount: 124,
        createdAt: "",
        updatedAt: "",
      },
      quantity: 1,
      price: 749,
    },
    {
      product: {
        id: "p2",
        name: "Brake Cleaner Spray 500ml",
        description: "Professional brake cleaner.",
        sku: "CHM-BC-001",
        brand: "Wurth",
        category: "Chemicals",
        price: 85,
        stock: 100,
        images: ["/placeholder.jpg"],
        compatibleVehicles: [],
        specifications: {},
        createdAt: "",
        updatedAt: "",
      },
      quantity: 2,
      price: 85,
    },
  ],
  subtotal: 919,
  tax: 137.85,
  shipping: 50,
  total: 1106.85,
  status: "shipped",
  shippingAddress: {
    street: "123 Main Street",
    city: "Johannesburg",
    province: "Gauteng",
    postalCode: "2000",
    country: "South Africa",
  },
  paymentMethod: "Credit Card (**** 4242)",
  paymentStatus: "paid",
  createdAt: "2026-07-10T10:30:00Z",
  updatedAt: "2026-07-12T14:00:00Z",
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-600" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-600" },
  processing: { label: "Processing", className: "bg-orange-500/10 text-orange-600" },
  shipped: { label: "Shipped", className: "bg-purple-500/10 text-purple-600" },
  delivered: { label: "Delivered", className: "bg-green-500/10 text-green-600" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600" },
  returned: { label: "Returned", className: "bg-gray-500/10 text-gray-600" },
}

const trackingTimeline = [
  { status: "Order Placed", date: "10 Jul 2026, 10:30 AM", completed: true },
  { status: "Confirmed", date: "10 Jul 2026, 11:15 AM", completed: true },
  { status: "Processing", date: "11 Jul 2026, 08:00 AM", completed: true },
  { status: "Shipped", date: "12 Jul 2026, 02:00 PM", completed: true },
  { status: "Delivered", date: "Estimated 15 Jul 2026", completed: false },
]

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const order = mockOrder
  const status = statusConfig[order.status]

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" render={<Link href="/customer/orders" />}>
            <ArrowLeftIcon className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {order.orderNumber}
            </h1>
            <p className="text-sm text-muted-foreground">
              Placed on {formatDate(order.createdAt, "dd MMMM yyyy 'at' HH:mm")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={status.className}>
            {status.label}
          </Badge>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <PrinterIcon className="mr-1 size-3.5" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="size-16 shrink-0 rounded-lg bg-muted">
                    {item.product.images[0] && (
                      <div className="flex size-full items-center justify-center">
                        <PackageIcon className="size-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.product.brand} · SKU: {item.product.sku}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(item.price)} each
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingTimeline.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`size-3 rounded-full ${
                          step.completed ? "bg-green-600" : "bg-muted border-2 border-muted-foreground"
                        }`}
                      />
                      {i < trackingTimeline.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 ${
                            step.completed ? "bg-green-600" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p
                        className={`text-sm font-medium ${
                          step.completed ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.status}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (VAT 15%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.province}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant="secondary"
                  className={
                    order.paymentStatus === "paid"
                      ? "bg-green-500/10 text-green-600"
                      : order.paymentStatus === "refunded"
                        ? "bg-yellow-500/10 text-yellow-600"
                        : "bg-red-500/10 text-red-600"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
