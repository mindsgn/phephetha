"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CarIcon,
  ShoppingBagIcon,
  CalendarClockIcon,
  FileTextIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/layout/page-header"
import { formatCurrency, formatDate } from "@/lib/utils"

const customerData = {
  id: "1",
  name: "John Mokoena",
  email: "john@example.com",
  phone: "+27 82 123 4567",
  joinedDate: "2024-03-15",
  address: "45 Rivonia Road, Sandton, Gauteng, 2056",
  vehicles: [
    { id: "1", make: "Toyota", model: "Hilux", year: 2024, color: "White", licensePlate: "GP 123-456" },
    { id: "2", make: "BMW", model: "X3", year: 2023, color: "Black", licensePlate: "GP 789-012" },
  ],
  orders: [
    { id: "1", orderNumber: "ORD-7891", date: "2026-07-18", total: 4599, status: "processing" },
    { id: "2", orderNumber: "ORD-7850", date: "2026-06-28", total: 2349, status: "delivered" },
    { id: "3", orderNumber: "ORD-7810", date: "2026-05-15", total: 8900, status: "delivered" },
  ],
  bookings: [
    { id: "1", bookingNumber: "BK-9001", service: "Full Service", date: "2026-07-19", time: "09:00", status: "confirmed" },
    { id: "2", bookingNumber: "BK-8950", service: "Oil Change", date: "2026-04-10", time: "10:00", status: "completed" },
  ],
  notes: "Preferred customer. Likes morning appointments.",
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-green-100 text-green-800",
}

export default function CustomerDetailPage() {
  const router = useRouter()
  const [notes, setNotes] = useState(customerData.notes)

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={customerData.name}
        description={customerData.email}
        breadcrumbOverrides={[
          { label: "Admin", href: "/admin" },
          { label: "Customers", href: "/admin/customers" },
          { label: customerData.name },
        ]}
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted text-xl font-bold">
                {customerData.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="mt-3 text-lg font-semibold">{customerData.name}</h3>
              <p className="text-sm text-muted-foreground">Customer since {formatDate(customerData.joinedDate)}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MailIcon className="size-4" />
                  {customerData.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PhoneIcon className="size-4" />
                  {customerData.phone}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-lg font-bold">{customerData.orders.length}</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-lg font-bold">{customerData.vehicles.length}</p>
                <p className="text-xs text-muted-foreground">Vehicles</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-lg font-bold">{formatCurrency(customerData.orders.reduce((sum, o) => sum + o.total, 0))}</p>
                <p className="text-xs text-muted-foreground">Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="vehicles">
            <TabsList variant="line">
              <TabsTrigger value="vehicles">
                <CarIcon className="size-4" />
                Vehicles ({customerData.vehicles.length})
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBagIcon className="size-4" />
                Orders ({customerData.orders.length})
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <CalendarClockIcon className="size-4" />
                Bookings ({customerData.bookings.length})
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileTextIcon className="size-4" />
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vehicles">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {customerData.vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                            <CarIcon className="size-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                            <p className="text-xs text-muted-foreground">{vehicle.color} - {vehicle.licensePlate}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerData.orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.orderNumber}</TableCell>
                          <TableCell>{formatDate(order.date)}</TableCell>
                          <TableCell>{formatCurrency(order.total)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`text-[10px] ${statusColors[order.status] || ""}`}>
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking #</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerData.bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                          <TableCell>{booking.service}</TableCell>
                          <TableCell>{formatDate(booking.date)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className={`text-[10px] ${statusColors[booking.status] || ""}`}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Textarea placeholder="Add notes about this customer..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
                  <Button size="sm">Save Notes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
