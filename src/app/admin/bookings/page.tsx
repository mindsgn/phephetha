"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  CalendarClockIcon,
  MoreHorizontalIcon,
  EyeIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { DataTable, type ColumnDef } from "@/components/shared/data-table"
import { PageHeader } from "@/components/layout/page-header"
import { formatDate } from "@/lib/utils"

interface BookingRow {
  id: string
  bookingNumber: string
  customer: string
  service: string
  date: string
  time: string
  vehicle: string
  status: string
  [key: string]: unknown
}

const demoBookings: BookingRow[] = [
  { id: "1", bookingNumber: "BK-9001", customer: "John Mokoena", service: "Full Service", date: "2026-07-19", time: "09:00", vehicle: "Toyota Hilux 2024", status: "confirmed" },
  { id: "2", bookingNumber: "BK-9002", customer: "Sarah Ndlovu", service: "Brake Service", date: "2026-07-19", time: "11:30", vehicle: "BMW X3 2023", status: "pending" },
  { id: "3", bookingNumber: "BK-9003", customer: "David Pretorius", service: "Engine Diagnostic", date: "2026-07-20", time: "08:00", vehicle: "Ford Ranger 2025", status: "confirmed" },
  { id: "4", bookingNumber: "BK-9004", customer: "Grace Khumalo", service: "Oil Change", date: "2026-07-20", time: "14:00", vehicle: "Hyundai Tucson 2024", status: "pending" },
  { id: "5", bookingNumber: "BK-9005", customer: "Thabo Molefe", service: "Wheel Alignment", date: "2026-07-21", time: "10:00", vehicle: "Volkswagen Polo 2023", status: "confirmed" },
  { id: "6", bookingNumber: "BK-9006", customer: "Lisa van der Berg", service: "AC Service", date: "2026-07-18", time: "09:30", vehicle: "Mercedes C200 2022", status: "in_progress" },
  { id: "7", bookingNumber: "BK-9007", customer: "James Nkosi", service: "Full Service", date: "2026-07-17", time: "08:00", vehicle: "Nissan NP200 2024", status: "completed" },
  { id: "8", bookingNumber: "BK-9008", customer: "Mary Dlamini", service: "Battery Replacement", date: "2026-07-16", time: "15:00", vehicle: "Toyota Corolla 2021", status: "cancelled" },
]

const statusFilters = ["all", "pending", "confirmed", "in_progress", "completed", "cancelled"]

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  in_progress: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
}

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

export default function AdminBookingsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [viewMode, setViewMode] = useState<"table" | "calendar">("table")
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1))

  const filteredBookings = useMemo(() => {
    return demoBookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false
      if (search && !b.bookingNumber.toLowerCase().includes(search.toLowerCase()) && !b.customer.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [statusFilter, search])

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const totalDays = daysInMonth(year, month)
    const firstDay = new Date(year, month, 1).getDay()
    const days: { date: number; hasBookings: boolean; count: number }[] = []

    for (let i = 0; i < firstDay; i++) {
      days.push({ date: 0, hasBookings: false, count: 0 })
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`
      const count = demoBookings.filter((b) => b.date === dateStr).length
      days.push({ date: d, hasBookings: count > 0, count })
    }
    return days
  }, [currentMonth])

  const columns: ColumnDef<BookingRow>[] = [
    { id: "bookingNumber", header: "Booking #", accessorKey: "bookingNumber", sortable: true },
    { id: "customer", header: "Customer", accessorKey: "customer", sortable: true },
    { id: "service", header: "Service", accessorKey: "service", sortable: true },
    { id: "date", header: "Date", accessorKey: "date", sortable: true, accessorFn: (row) => formatDate(row.date) },
    { id: "time", header: "Time", accessorKey: "time", sortable: true },
    { id: "vehicle", header: "Vehicle", accessorKey: "vehicle", sortable: true },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => (
        <Badge variant="secondary" className={`text-[10px] ${statusColors[row.status] || ""}`}>
          {row.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "",
      accessorFn: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
            <MoreHorizontalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/bookings/${row.id}`} className="flex items-center gap-2">
                <EyeIcon className="size-4" />
                View Details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Bookings"
        description="Manage service appointments"
        actions={
          <div className="flex gap-2">
            <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
              <CalendarClockIcon className="size-4" />
              Table
            </Button>
            <Button variant={viewMode === "calendar" ? "default" : "outline"} size="sm" onClick={() => setViewMode("calendar")}>
              <CalendarIcon className="size-4" />
              Calendar
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="pt-6">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {statusFilters.map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status.replace("_", " ")}
              </Button>
            ))}
            <div className="flex-1" />
            <Input
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72"
            />
          </div>

          {viewMode === "table" ? (
            <DataTable
              columns={columns}
              data={filteredBookings}
              emptyTitle="No bookings found"
              emptyDescription="No bookings match your filters."
              emptyIcon={CalendarClockIcon}
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon-sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon-sm" onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground">{day}</div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[60px] rounded-lg border p-1 ${day.date === 0 ? "bg-muted/30" : day.hasBookings ? "bg-primary/5 border-primary/20" : ""}`}
                  >
                    {day.date > 0 && (
                      <>
                        <span className="text-xs font-medium">{day.date}</span>
                        {day.hasBookings && (
                          <div className="mt-1">
                            <Badge variant="default" className="text-[9px] px-1 py-0">
                              {day.count} booking{day.count > 1 ? "s" : ""}
                            </Badge>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
