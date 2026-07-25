"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  UserIcon,
  CarIcon,
  ClockIcon,
  CalendarIcon,
  FileTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlayCircleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/layout/page-header"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatDate } from "@/lib/utils"

const bookingData = {
  bookingNumber: "BK-9001",
  date: "2026-07-19",
  time: "09:00",
  status: "confirmed",
  customer: {
    name: "John Mokoena",
    email: "john@example.com",
    phone: "+27 82 123 4567",
  },
  vehicle: {
    make: "Toyota",
    model: "Hilux",
    year: 2024,
    color: "White",
    licensePlate: "GP 123-456",
  },
  service: {
    name: "Full Service",
    description: "Complete vehicle service including oil change, filter replacement, brake inspection, and multi-point check.",
    duration: 120,
    price: 1599,
  },
  notes: "Customer requested early morning slot. Vehicle has been making a slight noise when braking.",
  timeline: [
    { status: "Booking Created", date: "2026-07-15T14:00:00", icon: CalendarIcon },
    { status: "Confirmed", date: "2026-07-15T15:30:00", icon: CheckCircleIcon },
    { status: "In Progress", date: "", icon: PlayCircleIcon },
    { status: "Completed", date: "", icon: CheckCircleIcon },
    { status: "Cancelled", date: "", icon: XCircleIcon },
  ],
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function BookingDetailPage() {
  const router = useRouter()
  const [status, setStatus] = useState(bookingData.status)
  const [notes, setNotes] = useState(bookingData.notes)
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title={`Booking ${bookingData.bookingNumber}`}
        description={`${bookingData.service.name} - ${formatDate(bookingData.date)} at ${bookingData.time}`}
        breadcrumbOverrides={[
          { label: "Admin", href: "/admin" },
          { label: "Bookings", href: "/admin/bookings" },
          { label: bookingData.bookingNumber },
        ]}
        actions={
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{bookingData.service.name}</p>
                  <p className="text-sm text-muted-foreground">{bookingData.service.description}</p>
                </div>
                <Badge variant="secondary" className={`text-[10px] ${statusColors[bookingData.status]}`}>
                  {bookingData.status.replace("_", " ")}
                </Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="size-4 text-muted-foreground" />
                  <span>{formatDate(bookingData.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="size-4 text-muted-foreground" />
                  <span>{bookingData.time} ({bookingData.service.duration} min)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">R {bookingData.service.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookingData.timeline.map((event, index) => {
                  const Icon = event.icon
                  const isActive = event.date !== ""
                  const isCurrent = index === 1
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`flex size-8 items-center justify-center rounded-full ${isCurrent ? "bg-primary text-primary-foreground" : isActive ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="size-4" />
                      </div>
                      <div>
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
            <CardContent className="space-y-3">
              <Textarea placeholder="Add notes..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
              <Button size="sm">Save Notes</Button>
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
                  <p className="text-sm font-medium">{bookingData.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{bookingData.customer.email}</p>
                  <p className="text-xs text-muted-foreground">{bookingData.customer.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vehicle Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                  <CarIcon className="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{bookingData.vehicle.year} {bookingData.vehicle.make} {bookingData.vehicle.model}</p>
                  <p className="text-xs text-muted-foreground">{bookingData.vehicle.color} - {bookingData.vehicle.licensePlate}</p>
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
                {["pending", "confirmed", "in_progress", "completed", "cancelled"].map((s) => (
                  <option key={s} value={s} className="capitalize">{s.replace("_", " ")}</option>
                ))}
              </select>
              <Button className="w-full" onClick={() => setShowConfirm(true)}>
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="Update Booking Status"
        description={`Change booking status to "${status.replace("_", " ")}"?`}
        confirmLabel="Update"
        onConfirm={() => setShowConfirm(false)}
      />
    </div>
  )
}
