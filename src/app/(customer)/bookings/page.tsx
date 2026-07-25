"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { CalendarIcon, PlusIcon, XCircleIcon, Loader2Icon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/shared/empty-state"
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { formatDate, formatCurrency } from "@/lib/utils"
import type { Booking, BookingStatus } from "@/types"

const mockBookings: Booking[] = [
  {
    id: "1",
    bookingNumber: "BK-M5N1P3-Q7R9",
    userId: "u1",
    serviceId: "s1",
    service: { id: "s1", name: "Full Service", description: "", price: 1200, duration: 180, images: [], benefits: [], createdAt: "", updatedAt: "" },
    date: "2026-07-25T08:00:00Z",
    timeSlot: "08:00 - 10:00",
    vehicleId: "v1",
    vehicle: { id: "v1", userId: "u1", make: "Toyota", model: "Hilux", year: 2023, color: "Silver", licensePlate: "GP 123-456", createdAt: "", updatedAt: "" },
    status: "confirmed",
    createdAt: "2026-07-10T10:00:00Z",
    updatedAt: "2026-07-10T10:00:00Z",
  },
  {
    id: "2",
    bookingNumber: "BK-M4L0O2-S8T1",
    userId: "u1",
    serviceId: "s2",
    service: { id: "s2", name: "Brake Inspection", description: "", price: 350, duration: 60, images: [], benefits: [], createdAt: "", updatedAt: "" },
    date: "2026-08-02T10:00:00Z",
    timeSlot: "10:00 - 11:00",
    vehicleId: "v2",
    vehicle: { id: "v2", userId: "u1", make: "BMW", model: "320i", year: 2024, color: "Black", licensePlate: "GP 789-012", createdAt: "", updatedAt: "" },
    status: "pending",
    createdAt: "2026-07-15T14:30:00Z",
    updatedAt: "2026-07-15T14:30:00Z",
  },
  {
    id: "3",
    bookingNumber: "BK-M3K9N1-U2V3",
    userId: "u1",
    serviceId: "s3",
    service: { id: "s3", name: "Oil Change", description: "", price: 450, duration: 45, images: [], benefits: [], createdAt: "", updatedAt: "" },
    date: "2026-06-15T09:00:00Z",
    timeSlot: "09:00 - 09:45",
    vehicleId: "v1",
    vehicle: { id: "v1", userId: "u1", make: "Toyota", model: "Hilux", year: 2023, color: "Silver", licensePlate: "GP 123-456", createdAt: "", updatedAt: "" },
    status: "completed",
    createdAt: "2026-06-01T08:00:00Z",
    updatedAt: "2026-06-15T09:45:00Z",
  },
  {
    id: "4",
    bookingNumber: "BK-M2J8M0-W4X5",
    userId: "u1",
    serviceId: "s4",
    service: { id: "s4", name: "Tyre Rotation", description: "", price: 250, duration: 30, images: [], benefits: [], createdAt: "", updatedAt: "" },
    date: "2026-05-10T11:00:00Z",
    timeSlot: "11:00 - 11:30",
    vehicleId: "v1",
    vehicle: { id: "v1", userId: "u1", make: "Toyota", model: "Hilux", year: 2023, color: "Silver", licensePlate: "GP 123-456", createdAt: "", updatedAt: "" },
    status: "cancelled",
    createdAt: "2026-04-28T16:00:00Z",
    updatedAt: "2026-05-08T10:00:00Z",
  },
]

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-600" },
  confirmed: { label: "Confirmed", className: "bg-blue-500/10 text-blue-600" },
  in_progress: { label: "In Progress", className: "bg-orange-500/10 text-orange-600" },
  completed: { label: "Completed", className: "bg-green-500/10 text-green-600" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-600" },
}

export default function CustomerBookingsPage() {
  const [bookings] = useState<Booking[]>(mockBookings)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const upcomingBookings = bookings.filter(
    (b) => b.status === "pending" || b.status === "confirmed"
  )
  const pastBookings = bookings.filter(
    (b) => b.status === "completed" || b.status === "in_progress"
  )
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  const handleCancel = async () => {
    if (!cancellingId) return
    setIsCancelling(true)
    await new Promise((r) => setTimeout(r, 800))
    setIsCancelling(false)
    setCancellingId(null)
    toast.success("Booking cancelled successfully")
  }

  const renderBookingCard = (booking: Booking, showCancel = false) => {
    const status = statusConfig[booking.status]
    return (
      <Card key={booking.id}>
        <CardContent className="pt-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium">{booking.service?.name}</p>
              <p className="text-sm text-muted-foreground">
                {booking.vehicle?.make} {booking.vehicle?.model} · {booking.vehicle?.year}
              </p>
            </div>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{formatDate(booking.date, "dd MMM yyyy")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Time</p>
              <p className="font-medium">{booking.timeSlot}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Booking #</p>
              <p className="font-medium font-mono text-xs">{booking.bookingNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Price</p>
              <p className="font-medium">{formatCurrency(booking.service?.price || 0)}</p>
            </div>
          </div>
          {showCancel && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setCancellingId(booking.id)}
              >
                <XCircleIcon className="mr-1 size-3.5" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your service appointments.
          </p>
        </div>
        <Button render={<Link href="/services" />}>
          <PlusIcon className="mr-1 size-4" />
          New Booking
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastBookings.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingBookings.length === 0 ? (
            <EmptyState
              icon={CalendarIcon}
              title="No upcoming bookings"
              description="Book a service to keep your vehicle in top condition."
              action={{ label: "Book Service", onClick: () => {} }}
            />
          ) : (
            <div className="mt-4 space-y-4">
              {upcomingBookings.map((b) => renderBookingCard(b, true))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastBookings.length === 0 ? (
            <EmptyState
              icon={CalendarIcon}
              title="No past bookings"
              description="Your completed services will appear here."
            />
          ) : (
            <div className="mt-4 space-y-4">
              {pastBookings.map((b) => renderBookingCard(b))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled">
          {cancelledBookings.length === 0 ? (
            <EmptyState
              icon={CalendarIcon}
              title="No cancelled bookings"
              description="You haven't cancelled any bookings."
            />
          ) : (
            <div className="mt-4 space-y-4">
              {cancelledBookings.map((b) => renderBookingCard(b))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={!!cancellingId}
        onOpenChange={(open) => !open && setCancellingId(null)}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmLabel="Cancel Booking"
        destructive
        loading={isCancelling}
        onConfirm={handleCancel}
      />
    </div>
  )
}
