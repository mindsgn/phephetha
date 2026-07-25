"use client"

import { Printer, ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Order } from "@/types"
import Link from "next/link"

const MOCK_ORDER: Order = {
  id: "1",
  orderNumber: "ORD-M1K8X3-AB2C",
  userId: "user1",
  items: [
    {
      product: {
        id: "1",
        name: "Brembo Brake Pad Set - Front",
        description: "High performance ceramic brake pads",
        sku: "BRK-BRM-001",
        brand: "Brembo",
        category: "Brakes",
        price: 1299.99,
        stock: 25,
        images: [],
        compatibleVehicles: [],
        specifications: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      quantity: 1,
      price: 1299.99,
    },
    {
      product: {
        id: "2",
        name: "Castrol GTX 5W-40 Synthetic Oil 5L",
        description: "Full synthetic motor oil",
        sku: "OIL-CAS-005",
        brand: "Castrol",
        category: "Oils & Fluids",
        price: 549.99,
        stock: 50,
        images: [],
        compatibleVehicles: [],
        specifications: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      quantity: 2,
      price: 549.99,
    },
  ],
  subtotal: 2399.97,
  tax: 359.99,
  shipping: 0,
  total: 2759.96,
  status: "confirmed",
  shippingAddress: {
    street: "123 Main Street",
    city: "Johannesburg",
    province: "Gauteng",
    postalCode: "2000",
    country: "South Africa",
  },
  paymentMethod: "Credit Card",
  paymentStatus: "paid",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export default function InvoicePage() {
  const order = MOCK_ORDER

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4 mr-1.5" />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4 mr-1.5" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="print:shadow-none print:border-0">
        <CardContent className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-sm text-muted-foreground mt-1">Phephetha Auto Centre</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-lg">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                Date: {formatDate(order.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Status:{" "}
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Paid
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Bill To</h3>
              <div className="text-sm space-y-0.5">
                <p className="font-medium">Customer</p>
                <p className="text-muted-foreground">123 Main Street</p>
                <p className="text-muted-foreground">Johannesburg, Gauteng 2000</p>
                <p className="text-muted-foreground">South Africa</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Ship To</h3>
              <div className="text-sm space-y-0.5">
                <p className="font-medium">{order.shippingAddress.street}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.province}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium text-muted-foreground">Item</th>
                  <th className="py-3 text-left font-medium text-muted-foreground">SKU</th>
                  <th className="py-3 text-right font-medium text-muted-foreground">Qty</th>
                  <th className="py-3 text-right font-medium text-muted-foreground">Price</th>
                  <th className="py-3 text-right font-medium text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-muted-foreground">{item.product.sku}</td>
                    <td className="py-3 text-right">{item.quantity}</td>
                    <td className="py-3 text-right">{formatCurrency(item.price)}</td>
                    <td className="py-3 text-right font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : formatCurrency(order.shipping)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (15%)</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>Thank you for your business!</p>
            <p className="mt-1">Phephetha Auto Centre | support@phephetha.co.za | +27 11 000 0000</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
