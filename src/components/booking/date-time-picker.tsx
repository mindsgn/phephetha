"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Clock, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DateTimePickerProps {
  selectedDate: string | null
  selectedTime: string | null
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

const ALL_TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function isDatePast(year: number, month: number, day: number) {
  const date = new Date(year, month, day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function isWeekend(year: number, month: number, day: number) {
  const date = new Date(year, month, day)
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

function formatDateStr(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

function getAvailableTimeSlots(dateStr: string): string[] {
  const date = new Date(dateStr)
  const dayOfWeek = date.getDay()
  const unavailable = new Set<number>()

  if (dayOfWeek === 6) {
    for (let i = 0; i < 4; i++) unavailable.add(i)
  }

  const seed = date.getDate() + date.getMonth()
  for (let i = 0; i < 3; i++) {
    unavailable.add((seed + i * 5) % ALL_TIME_SLOTS.length)
  }

  return ALL_TIME_SLOTS.filter((_, i) => !unavailable.has(i))
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const now = new Date()
  const [viewMonth, setViewMonth] = useState(now.getMonth())
  const [viewYear, setViewYear] = useState(now.getFullYear())

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = []
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }, [firstDayOfWeek, daysInMonth])

  const availableSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : []
  const morningSlots = availableSlots.filter((t) => parseInt(t) < 12)
  const afternoonSlots = availableSlots.filter((t) => parseInt(t) >= 12)

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Select Date & Time</h2>
        <p className="text-sm text-muted-foreground">Choose your preferred appointment date and time</p>
      </div>

      <div className="rounded-xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">
            {MONTHS[viewMonth]} {viewYear}
          </h3>
          <div className="flex gap-1">
            <Button variant="outline" size="icon-sm" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon-sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((day) => (
            <div key={day} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}

          {calendarDays.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />

            const dateStr = formatDateStr(viewYear, viewMonth, day)
            const past = isDatePast(viewYear, viewMonth, day)
            const weekend = isWeekend(viewYear, viewMonth, day)
            const disabled = past || weekend
            const isSelected = selectedDate === dateStr
            const isToday =
              viewYear === now.getFullYear() &&
              viewMonth === now.getMonth() &&
              day === now.getDate()

            return (
              <button
                key={dateStr}
                onClick={() => !disabled && onDateChange(dateStr)}
                disabled={disabled}
                className={cn(
                  "h-9 w-full rounded-lg text-sm transition-all relative",
                  disabled && "text-muted-foreground/40 cursor-not-allowed",
                  !disabled && !isSelected && "hover:bg-muted",
                  isSelected && "bg-red-600 text-white font-medium hover:bg-red-700",
                  isToday && !isSelected && "ring-1 ring-red-400 font-medium",
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Available time slots</span>
          </div>

          {morningSlots.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Sun className="h-3 w-3" />
                Morning
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {morningSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-sm font-mono transition-all",
                      selectedTime === slot
                        ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-950"
                        : "hover:border-foreground/30",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {afternoonSlots.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Moon className="h-3 w-3" />
                Afternoon
              </h4>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {afternoonSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "rounded-lg border px-2 py-1.5 text-sm font-mono transition-all",
                      selectedTime === slot
                        ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-950"
                        : "hover:border-foreground/30",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
