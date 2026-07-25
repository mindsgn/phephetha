"use client"

import { useState } from "react"
import {
  DollarSignIcon,
  ShoppingCartIcon,
  CalendarClockIcon,
  UsersIcon,
  PackageIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  PlusIcon,
  EyeIcon,
  StarIcon,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/shared/stat-card"
import { PageHeader } from "@/components/layout/page-header"
import { formatCurrency, formatDate } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, orders: 65 },
  { month: "Feb", revenue: 38500, orders: 58 },
  { month: "Mar", revenue: 55200, orders: 82 },
  { month: "Apr", revenue: 47800, orders: 71 },
  { month: "May", revenue: 62300, orders: 93 },
  { month: "Jun", revenue: 58100, orders: 87 },
  { month: "Jul", revenue: 71500, orders: 105 },
  { month: "Aug", revenue: 68200, orders: 99 },
  { month: "Sep", revenue: 82400, orders: 121 },
  { month: "Oct", revenue: 76800, orders: 112 },
  { month: "Nov", revenue: 91200, orders: 134 },
  { month: "Dec", revenue: 98500, orders: 148 },
]

const ordersOverTime = [
  { week: "W1", pending: 12, processing: 8, shipped: 15, delivered: 22 },
  { week: "W2", pending: 8, processing: 14, shipped: 18, delivered: 25 },
  { week: "W3", pending: 15, processing: 11, shipped: 20, delivered: 28 },
  { week: "W4", pending: 10, processing: 16, shipped: 22, delivered: 30 },
  { week: "W5", pending: 18, processing: 13, shipped: 25, delivered: 35 },
  { week: "W6", pending: 14, processing: 19, shipped: 21, delivered: 32 },
  { week: "W7", pending: 11, processing: 15, shipped: 28, delivered: 38 },
  { week: "W8", pending: 16, processing: 12, shipped: 24, delivered: 34 },
]

const recentOrders = [
  { id: "1", orderNumber: "ORD-1234", customer: "John Mokoena", date: "2026-07-18", total: 4599, status: "processing", items: 3 },
  { id: "2", orderNumber: "ORD-1233", customer: "Sarah Ndlovu", date: "2026-07-17", total: 2349, status: "shipped", items: 2 },
  { id: "3", orderNumber: "ORD-1232", customer: "David Pretorius", date: "2026-07-17", total: 8900, status: "delivered", items: 5 },
  { id: "4", orderNumber: "ORD-1231", customer: "Thabo Molefe", date: "2026-07-16", total: 1299, status: "pending", items: 1 },
  { id: "5", orderNumber: "ORD-1230", customer: "Lisa van der Berg", date: "2026-07-16", total: 5670, status: "confirmed", items: 4 },
]

const upcomingBookings = [
  { id: "1", bookingNumber: "BK-5678", customer: "James Nkosi", service: "Full Service", date: "2026-07-19", time: "09:00", vehicle: "Toyota Hilux 2024" },
  { id: "2", bookingNumber: "BK-5679", customer: "Mary Dlamini", service: "Brake Service", date: "2026-07-19", time: "11:30", vehicle: "BMW X3 2023" },
  { id: "3", bookingNumber: "BK-5680", customer: "Peter Smit", service: "Engine Diagnostic", date: "2026-07-20", time: "08:00", vehicle: "Ford Ranger 2025" },
  { id: "4", bookingNumber: "BK-5681", customer: "Grace Khumalo", service: "Oil Change", date: "2026-07-20", time: "14:00", vehicle: "Hyundai Tucson 2024" },
]

const lowStockProducts = [
  { name: "Brake Pads - Front", sku: "BRA-BOS-001", stock: 3, threshold: 10 },
  { name: "Engine Oil Filter", sku: "OIL-MAN-002", stock: 5, threshold: 15 },
  { name: "Spark Plugs Set", sku: "ENG-NGK-003", stock: 2, threshold: 8 },
  { name: "Air Filter", sku: "AIR-K&N-004", stock: 4, threshold: 12 },
]

const topProducts = [
  { name: "Synthetic Engine Oil 5W-30", sales: 156, revenue: 46800 },
  { name: "Brake Pad Set - Premium", sales: 89, revenue: 35600 },
  { name: "Performance Air Filter", sales: 72, revenue: 18000 },
  { name: "LED Headlight Bulbs", sales: 65, revenue: 19500 },
  { name: "Wheel Alignment Kit", sales: 48, revenue: 28800 },
]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your business."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <EyeIcon className="size-4" />
              View Reports
            </Button>
            <Button size="sm">
              <PlusIcon className="size-4" />
              Add Product
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSignIcon}
          title="Total Revenue"
          value={formatCurrency(892500)}
          change={12.5}
          changeLabel="from last month"
        />
        <StatCard
          icon={ShoppingCartIcon}
          title="Total Orders"
          value="1,247"
          change={8.2}
          changeLabel="from last month"
        />
        <StatCard
          icon={CalendarClockIcon}
          title="Total Bookings"
          value="384"
          change={15.3}
          changeLabel="from last month"
        />
        <StatCard
          icon={UsersIcon}
          title="Total Customers"
          value="2,156"
          change={4.7}
          changeLabel="from last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Bar dataKey="revenue" fill="oklch(0.205 0 0)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ordersOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="week" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="delivered" stroke="oklch(0.55 0.15 145)" strokeWidth={2} />
                  <Line type="monotone" dataKey="shipped" stroke="oklch(0.45 0.15 260)" strokeWidth={2} />
                  <Line type="monotone" dataKey="processing" stroke="oklch(0.5 0.15 300)" strokeWidth={2} />
                  <Line type="monotone" dataKey="pending" stroke="oklch(0.7 0.15 80)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRightIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <PackageIcon className="size-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    <Badge variant="secondary" className={`text-[10px] ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Bookings</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRightIcon className="size-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{booking.service}</p>
                    <Badge variant="outline" className="text-[10px]">
                      {booking.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{booking.customer}</p>
                  <p className="text-xs text-muted-foreground">{booking.vehicle}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatDate(booking.date)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Low Stock Alerts</CardTitle>
            <Badge variant="destructive" className="text-[10px]">
              {lowStockProducts.length} items
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="size-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-orange-600">{product.stock}</p>
                    <p className="text-xs text-muted-foreground">/ {product.threshold}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                  </div>
                  <p className="text-sm font-medium">{formatCurrency(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <PlusIcon className="size-4" />
              <span className="text-xs">Add Product</span>
            </Button>
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <CalendarClockIcon className="size-4" />
              <span className="text-xs">New Booking</span>
            </Button>
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <UsersIcon className="size-4" />
              <span className="text-xs">Add Customer</span>
            </Button>
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <TrendingUpIcon className="size-4" />
              <span className="text-xs">View Reports</span>
            </Button>
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <StarIcon className="size-4" />
              <span className="text-xs">Reviews</span>
            </Button>
            <Button variant="outline" className="flex-col gap-1 h-auto py-3">
              <ShoppingCartIcon className="size-4" />
              <span className="text-xs">New Order</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
