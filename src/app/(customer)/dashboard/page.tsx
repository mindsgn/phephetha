"use client"

import Link from "next/link"
import {
  CalendarIcon,
  PackageIcon,
  HeartIcon,
  StarIcon,
  WrenchIcon,
  ShoppingBagIcon,
  ArrowRightIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/shared/stat-card"
import { EmptyState } from "@/components/shared/empty-state"
import { useAuthStore } from "@/stores/auth-store"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { formatCurrency, formatDate } from "@/lib/utils"

const mockOrders = [
  {
    id: "1",
    orderNumber: "ORD-M4K8X2-A1B3",
    date: "2026-07-10T10:30:00Z",
    items: [
      { name: "Ceramic Brake Pads", quantity: 1, price: 450 },
      { name: "Brake Cleaner Spray", quantity: 2, price: 85 },
    ],
    total: 620,
    status: "shipped" as const,
  },
  {
    id: "2",
    orderNumber: "ORD-M3J7Y1-C4D5",
    date: "2026-07-05T14:15:00Z",
    items: [
      { name: "Synthetic Engine Oil 5W-30", quantity: 4, price: 320 },
    ],
    total: 1280,
    status: "delivered" as const,
  },
  {
    id: "3",
    orderNumber: "ORD-M2H6W9-E7F8",
    date: "2026-06-28T09:00:00Z",
    items: [
      { name: "Air Filter - Toyota Hilux", quantity: 1, price: 275 },
      { name: "Fuel Filter", quantity: 1, price: 195 },
    ],
    total: 470,
    status: "delivered" as const,
  },
]

const mockBookings = [
  {
    id: "1",
    service: "Full Service",
    date: "2026-07-25T08:00:00Z",
    vehicle: "Toyota Hilux 2023",
    status: "confirmed" as const,
  },
  {
    id: "2",
    service: "Brake Inspection",
    date: "2026-08-02T10:00:00Z",
    vehicle: "BMW 320i 2024",
    status: "pending" as const,
  },
]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  shipped: "bg-purple-500/10 text-purple-600",
  delivered: "bg-green-500/10 text-green-600",
  processing: "bg-orange-500/10 text-orange-600",
  cancelled: "bg-red-500/10 text-red-600",
}

export default function CustomerDashboardPage() {
  const { userData } = useAuthStore()
  const cartItems = useCartStore((s) => s.getItemCount())
  const wishlistItems = useWishlistStore((s) => s.items.length)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {userData?.displayName?.split(" ")[0] || "there"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here&apos;s an overview of your account activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarIcon}
          title="Active Bookings"
          value={mockBookings.length}
        />
        <StatCard
          icon={PackageIcon}
          title="Total Orders"
          value={mockOrders.length}
        />
        <StatCard
          icon={HeartIcon}
          title="Wishlist Items"
          value={wishlistItems}
        />
        <StatCard
          icon={StarIcon}
          title="Loyalty Points"
          value={2450}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/customer/orders" />}>
                View All <ArrowRightIcon className="ml-1 size-3" />
              </Button>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <EmptyState
                  icon={PackageIcon}
                  title="No orders yet"
                  description="When you place orders, they'll appear here."
                />
              ) : (
                <div className="space-y-3">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(order.date)} · {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className={statusColors[order.status]}
                        >
                          {order.status}
                        </Badge>
                        <p className="text-sm font-medium">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Bookings</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/customer/bookings" />}>
                View All <ArrowRightIcon className="ml-1 size-3" />
              </Button>
            </CardHeader>
            <CardContent>
              {mockBookings.length === 0 ? (
                <EmptyState
                  icon={CalendarIcon}
                  title="No upcoming bookings"
                  description="Book a service to get started."
                />
              ) : (
                <div className="space-y-3">
                  {mockBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-lg border p-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            {booking.service}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.vehicle}
                          </p>
                        </div>
                        <Badge
                          variant="secondary"
                          className={statusColors[booking.status]}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(booking.date, "dd MMM yyyy · HH:mm")}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" render={<Link href="/services" />}>
                <WrenchIcon className="mr-2 size-4" />
                Book Service
              </Button>
              <Button className="w-full justify-start" variant="outline" render={<Link href="/shop" />}>
                <ShoppingBagIcon className="mr-2 size-4" />
                Shop Parts
              </Button>
              <Button className="w-full justify-start" variant="outline" render={<Link href="/customer/orders" />}>
                <PackageIcon className="mr-2 size-4" />
                View Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
