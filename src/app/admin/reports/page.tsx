"use client"

import { useState } from "react"
import {
  BarChartIcon,
  TrendingUpIcon,
  PackageIcon,
  ShoppingCartIcon,
  WrenchIcon,
  DownloadIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PageHeader } from "@/components/layout/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { formatCurrency } from "@/lib/utils"
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 42000, target: 40000 },
  { month: "Feb", sales: 38500, target: 42000 },
  { month: "Mar", sales: 55200, target: 45000 },
  { month: "Apr", sales: 47800, target: 48000 },
  { month: "May", sales: 62300, target: 50000 },
  { month: "Jun", sales: 58100, target: 52000 },
  { month: "Jul", sales: 71500, target: 55000 },
]

const revenueData = [
  { month: "Jan", revenue: 12000, expenses: 8000 },
  { month: "Feb", revenue: 11500, expenses: 7500 },
  { month: "Mar", revenue: 15800, expenses: 9200 },
  { month: "Apr", revenue: 14200, expenses: 8800 },
  { month: "May", revenue: 18500, expenses: 10100 },
  { month: "Jun", revenue: 17300, expenses: 9500 },
  { month: "Jul", revenue: 21000, expenses: 11200 },
]

const categoryData = [
  { name: "Engine Oil", value: 35 },
  { name: "Brakes", value: 25 },
  { name: "Filters", value: 15 },
  { name: "Lighting", value: 12 },
  { name: "Other", value: 13 },
]

const inventoryData = [
  { name: "Engine Oil", inStock: 150, lowStock: 12, outOfStock: 2 },
  { name: "Brakes", inStock: 85, lowStock: 8, outOfStock: 1 },
  { name: "Filters", inStock: 200, lowStock: 5, outOfStock: 0 },
  { name: "Lighting", inStock: 120, lowStock: 15, outOfStock: 3 },
  { name: "Suspension", inStock: 45, lowStock: 10, outOfStock: 2 },
]

const ordersData = [
  { month: "Jan", pending: 12, processing: 8, shipped: 15, delivered: 22 },
  { month: "Feb", pending: 8, processing: 14, shipped: 18, delivered: 25 },
  { month: "Mar", pending: 15, processing: 11, shipped: 20, delivered: 28 },
  { month: "Apr", pending: 10, processing: 16, shipped: 22, delivered: 30 },
  { month: "May", pending: 18, processing: 13, shipped: 25, delivered: 35 },
  { month: "Jun", pending: 14, processing: 19, shipped: 21, delivered: 32 },
  { month: "Jul", pending: 11, processing: 15, shipped: 28, delivered: 38 },
]

const servicesData = [
  { name: "Full Service", bookings: 45, revenue: 71955 },
  { name: "Oil Change", bookings: 89, revenue: 44411 },
  { name: "Brake Service", bookings: 34, revenue: 30566 },
  { name: "Diagnostics", bookings: 28, revenue: 11172 },
  { name: "Wheel Alignment", bookings: 22, revenue: 7678 },
]

const COLORS = ["oklch(0.205 0 0)", "oklch(0.439 0 0)", "oklch(0.556 0 0)", "oklch(0.708 0 0)", "oklch(0.87 0 0)"]

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("sales")

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Reports"
        description="Analytics and business intelligence"
        actions={
          <div className="flex gap-2">
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              Export PDF
            </Button>
            <Button variant="outline">
              <DownloadIcon className="size-4" />
              Export Excel
            </Button>
          </div>
        }
      />

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
        <TabsList variant="line">
          <TabsTrigger value="sales"><BarChartIcon className="size-4" />Sales</TabsTrigger>
          <TabsTrigger value="revenue"><TrendingUpIcon className="size-4" />Revenue</TabsTrigger>
          <TabsTrigger value="inventory"><PackageIcon className="size-4" />Inventory</TabsTrigger>
          <TabsTrigger value="orders"><ShoppingCartIcon className="size-4" />Orders</TabsTrigger>
          <TabsTrigger value="services"><WrenchIcon className="size-4" />Services</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={TrendingUpIcon} title="Total Sales" value={formatCurrency(375400)} change={12.5} />
            <StatCard icon={BarChartIcon} title="Avg Order Value" value={formatCurrency(3890)} change={5.2} />
            <StatCard icon={ShoppingCartIcon} title="Conversion Rate" value="3.8%" change={-0.3} />
          </div>
          <Card>
            <CardHeader><CardTitle>Sales vs Target</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                    <Legend />
                    <Bar dataKey="sales" fill="oklch(0.205 0 0)" name="Actual Sales" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="target" fill="oklch(0.708 0 0)" name="Target" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {categoryData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard icon={TrendingUpIcon} title="Total Revenue" value={formatCurrency(110300)} change={15.3} />
            <StatCard icon={TrendingUpIcon} title="Total Expenses" value={formatCurrency(64300)} change={8.1} />
            <StatCard icon={TrendingUpIcon} title="Net Profit" value={formatCurrency(46000)} change={22.8} />
            <StatCard icon={TrendingUpIcon} title="Profit Margin" value="41.7%" change={3.2} />
          </div>
          <Card>
            <CardHeader><CardTitle>Revenue vs Expenses</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => formatCurrency(Number(v))} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="oklch(0.55 0.15 145)" strokeWidth={2} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="oklch(0.577 0.245 27.325)" strokeWidth={2} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={PackageIcon} title="Total Products" value="256" change={5} />
            <StatCard icon={PackageIcon} title="Low Stock Items" value="8" change={-12} />
            <StatCard icon={PackageIcon} title="Out of Stock" value="3" change={0} />
          </div>
          <Card>
            <CardHeader><CardTitle>Inventory by Category</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inStock" fill="oklch(0.55 0.15 145)" name="In Stock" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="lowStock" fill="oklch(0.7 0.15 80)" name="Low Stock" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="outOfStock" fill="oklch(0.577 0.245 27.325)" name="Out of Stock" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard icon={ShoppingCartIcon} title="Total Orders" value="1,247" change={8.2} />
            <StatCard icon={ShoppingCartIcon} title="Pending" value="18" change={-5} />
            <StatCard icon={ShoppingCartIcon} title="Delivered" value="892" change={12} />
            <StatCard icon={ShoppingCartIcon} title="Cancelled" value="23" change={-8} />
          </div>
          <Card>
            <CardHeader><CardTitle>Orders by Status</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="delivered" stackId="a" fill="oklch(0.55 0.15 145)" name="Delivered" />
                    <Bar dataKey="shipped" stackId="a" fill="oklch(0.45 0.15 260)" name="Shipped" />
                    <Bar dataKey="processing" stackId="a" fill="oklch(0.5 0.15 300)" name="Processing" />
                    <Bar dataKey="pending" stackId="a" fill="oklch(0.7 0.15 80)" name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard icon={WrenchIcon} title="Total Bookings" value="218" change={15.3} />
            <StatCard icon={WrenchIcon} title="Service Revenue" value={formatCurrency(165782)} change={18.2} />
            <StatCard icon={WrenchIcon} title="Avg Rating" value="4.6" change={0.2} />
          </div>
          <Card>
            <CardHeader><CardTitle>Service Performance</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {servicesData.map((service, index) => (
                  <div key={service.name} className="flex items-center gap-4 rounded-lg border p-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.bookings} bookings</p>
                    </div>
                    <p className="text-sm font-bold">{formatCurrency(service.revenue)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
