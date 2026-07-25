"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  PrinterIcon,
  UserIcon,
  MapPinIcon,
  ClockIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  PackageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatCurrency, formatDate } from "@/lib/utils"

const orderData = {
  orderNumber: "ORD-7891",
  date: "2026-07-18",
  paymentStatus: "paid",
  paymentMethod: "Credit Card",
  status: "processing",
  customer: {
    name: "John Mokoena",
    email: "john@example.com",
    phone: "+27 82 123 4567",
  },
  items: [
    { name: "Synthetic Engine Oil 5W-30", sku: "OIL-SYN-001", quantity: 2, price: 299 },
    { name: "Brake Pad Set - Front", sku: "BRA-PREM-002", quantity: 1, price: 899 },
    { name: "Oil Filter", sku: "OIL-FLT-003", quantity: 2, price: 149 },
  ],
  subtotal: 1695,
  shipping: 99,
  tax: 254.25,
  total: 2048.25,
  shippingAddress: {
    street: "45 Rivonia Road",
    city: "Johannesburg",
    province: "Gauteng",
    postalCode: "2056",
    country: "South Africa",
  },
  timeline: [
    { status: "Order Placed", date: "2026-07-18T09:00:00", icon: PackageIcon },
    { status: "Payment Confirmed", date: "2026-07-18T09:02:00", icon: CreditCardIcon },
    { status: "Processing", date: "2026-07-18T10:30:00", icon: CheckCircleIcon },
    { status: "Shipped", date: "", icon: TruckIcon },
    { status: "Delivered", date: "", icon: CheckCircleIcon },
  ],
}

export default function OrderDetailPage() {
  const router = useRouter()
  const [status, setStatus] = useState(orderData.status)
  const [notes, setNotes] = useState("")
  const [showUpdate, setShowUpdate] = useState(false)

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={`Order ${orderData.orderNumber}`}
        description={`Placed on ${formatDate(orderData.date)}`}
        breadcrumbOverrides={[
          { label: "Admin", href: "/admin" },
          { label: "Orders", href: "/admin/orders" },
          { label: orderData.orderNumber },
        ]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeftIcon className="size-4" />
              Back
            </Button>
            <Button variant="outline">
              <PrinterIcon className="size-4" />
              Print Invoice
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(item.price)} x {item.quantity}</p>
                      <p className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(orderData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(orderData.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (15%)</span>
                  <span>{formatCurrency(orderData.tax)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-base font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(orderData.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.timeline.map((event, index) => {
                  const Icon = event.icon
                  const isActive = event.date !== ""
                  const isCurrent = index === 2
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex size-8 items-center justify-center rounded-full ${isCurrent ? "bg-primary text-primary-foreground" : isActive ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${!isActive ? "text-muted-foreground" : ""}`}>{event.status}</p>
                        {event.date && <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Textarea placeholder="Add notes about this order..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
                <Button size="sm">Save Notes</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                  <UserIcon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{orderData.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{orderData.customer.email}</p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>{orderData.customer.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2 text-sm">
                <MapPinIcon className="mt-0.5 size-4 text-muted-foreground" />
                <div>
                  <p>{orderData.shippingAddress.street}</p>
                  <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.province}</p>
                  <p>{orderData.shippingAddress.postalCode}</p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
              >
                {["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
              <Button className="w-full" onClick={() => setShowUpdate(true)}>
                Update Status
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span>{orderData.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 text-[10px]">
                  {orderData.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={showUpdate}
        onOpenChange={setShowUpdate}
        title="Update Order Status"
        description={`Change order status to "${status}"?`}
        confirmLabel="Update"
        onConfirm={() => setShowUpdate(false)}
      />
    </div>
  )
}
