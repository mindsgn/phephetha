"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  PackageIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { Order, OrderStatus } from "@/types"

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-M4K8X2-A1B3",
    userId: "u1",
    items: [
      { product: { id: "p1", name: "Ceramic Brake Pads", description: "", sku: "BRK-001", brand: "Brembo", category: "Brakes", price: 450, stock: 0, images: ["/placeholder.jpg"], compatibleVehicles: [], specifications: {}, createdAt: "", updatedAt: "" }, quantity: 1, price: 450 },
      { product: { id: "p2", name: "Brake Cleaner Spray", description: "", sku: "BRK-002", brand: "Wurth", category: "Chemicals", price: 85, stock: 0, images: ["/placeholder.jpg"], compatibleVehicles: [], specifications: {}, createdAt: "", updatedAt: "" }, quantity: 2, price: 85 },
    ],
    subtotal: 620,
    tax: 93,
    shipping: 50,
    total: 763,
    status: "shipped",
    shippingAddress: { street: "123 Main St", city: "Johannesburg", province: "Gauteng", postalCode: "2000", country: "South Africa" },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    createdAt: "2026-07-10T10:30:00Z",
    updatedAt: "2026-07-12T14:00:00Z",
  },
  {
    id: "2",
    orderNumber: "ORD-M3J7Y1-C4D5",
    userId: "u1",
    items: [
      { product: { id: "p3", name: "Synthetic Engine Oil 5W-30", description: "", sku: "OIL-001", brand: "Castrol", category: "Lubricants", price: 320, stock: 0, images: ["/placeholder.jpg"], compatibleVehicles: [], specifications: {}, createdAt: "", updatedAt: "" }, quantity: 4, price: 320 },
    ],
    subtotal: 1280,
    tax: 192,
    shipping: 0,
    total: 1472,
    status: "delivered",
    shippingAddress: { street: "123 Main St", city: "Johannesburg", province: "Gauteng", postalCode: "2000", country: "South Africa" },
    paymentMethod: "EFT",
    paymentStatus: "paid",
    createdAt: "2026-07-05T14:15:00Z",
    updatedAt: "2026-07-08T09:30:00Z",
  },
  {
    id: "3",
    orderNumber: "ORD-M2H6W9-E7F8",
    userId: "u1",
    items: [
      { product: { id: "p4", name: "Air Filter - Toyota Hilux", description: "", sku: "FLT-001", brand: "K&N", category: "Filters", price: 275, stock: 0, images: ["/placeholder.jpg"], compatibleVehicles: [], specifications: {}, createdAt: "", updatedAt: "" }, quantity: 1, price: 275 },
    ],
    subtotal: 275,
    tax: 41.25,
    shipping: 50,
    total: 366.25,
    status: "cancelled",
    shippingAddress: { street: "123 Main St", city: "Johannesburg", province: "Gauteng", postalCode: "2000", country: "South Africa" },
    paymentMethod: "Credit Card",
    paymentStatus: "refunded",
    createdAt: "2026-06-28T09:00:00Z",
    updatedAt: "2026-06-30T11:00:00Z",
  },
]

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-600" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-600" },
  processing: { label: "Processing", className: "bg-orange-500/10 text-orange-600" },
  shipped: { label: "Shipped", className: "bg-purple-500/10 text-purple-600" },
  delivered: { label: "Delivered", className: "bg-green-500/10 text-green-600" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600" },
  returned: { label: "Returned", className: "bg-gray-500/10 text-gray-600" },
}

const trackingSteps = [
  { status: "Order Placed", completed: true },
  { status: "Confirmed", completed: true },
  { status: "Processing", completed: true },
  { status: "Shipped", completed: true },
  { status: "Delivered", completed: false },
]

export default function CustomerOrdersPage() {
  const [orders] = useState<Order[]>(mockOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const activeOrders = orders.filter(
    (o) => o.status === "pending" || o.status === "confirmed" || o.status === "processing" || o.status === "shipped"
  )
  const completedOrders = orders.filter((o) => o.status === "delivered")
  const cancelledOrders = orders.filter(
    (o) => o.status === "cancelled" || o.status === "returned"
  )

  const renderOrderCard = (order: Order) => {
    const status = statusConfig[order.status]
    const isExpanded = expandedOrder === order.id

    return (
      <Card key={order.id}>
        <CardContent className="pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt, "dd MMM yyyy")} · {order.items.length} item
                {order.items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {order.items.slice(0, 3).map((item, i) => (
              <div
                key={i}
                className="flex shrink-0 items-center gap-2 rounded-lg border p-2"
              >
                <div className="size-10 rounded bg-muted" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} · {formatCurrency(item.price)}
                  </p>
                </div>
              </div>
            ))}
            {order.items.length > 3 && (
              <div className="flex shrink-0 items-center rounded-lg border p-2 text-xs text-muted-foreground">
                +{order.items.length - 3} more
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-sm font-medium">
              Total: {formatCurrency(order.total)}
            </p>
            <div className="flex items-center gap-2">
              {order.status === "shipped" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  {isExpanded ? (
                    <ChevronUpIcon className="size-3.5" />
                  ) : (
                    <ChevronDownIcon className="size-3.5" />
                  )}
                  Track
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                render={<Link href={`/customer/orders/${order.id}`} />}
              >
                View Details
              </Button>
            </div>
          </div>

          {isExpanded && order.status === "shipped" && (
            <div className="mt-4 border-t pt-4">
              <p className="mb-3 text-sm font-medium">Tracking Timeline</p>
              <div className="space-y-3">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className={`size-3 rounded-full ${
                        step.completed ? "bg-green-600" : "bg-muted"
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        step.completed
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        <p className="text-sm text-muted-foreground">
          Track your orders and view purchase history.
        </p>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeOrders.length === 0 ? (
            <EmptyState
              icon={PackageIcon}
              title="No active orders"
              description="When you place an order, it will appear here."
              action={{ label: "Shop Now", onClick: () => {} }}
            />
          ) : (
            <div className="mt-4 space-y-4">{activeOrders.map(renderOrderCard)}</div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedOrders.length === 0 ? (
            <EmptyState
              icon={PackageIcon}
              title="No completed orders"
              description="Your delivered orders will appear here."
            />
          ) : (
            <div className="mt-4 space-y-4">
              {completedOrders.map(renderOrderCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled">
          {cancelledOrders.length === 0 ? (
            <EmptyState
              icon={PackageIcon}
              title="No cancelled orders"
              description="You haven't cancelled any orders."
            />
          ) : (
            <div className="mt-4 space-y-4">
              {cancelledOrders.map(renderOrderCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
