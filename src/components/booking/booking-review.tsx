"use client"

import { Calendar, Clock, Car, FileText, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/utils"
import type { Service, Vehicle } from "@/types"

interface BookingReviewProps {
  service: Service | null
  date: string | null
  timeSlot: string | null
  vehicle: Vehicle | null
  notes: string
  uploadedImages: string[]
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
}

export function BookingReview({
  service,
  date,
  timeSlot,
  vehicle,
  notes,
  uploadedImages,
  termsAccepted,
  onTermsChange,
}: BookingReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Review & Confirm</h2>
        <p className="text-sm text-muted-foreground">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                <Check className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Service</h3>
                {service ? (
                  <div className="mt-1">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <span className="font-semibold text-red-600">{formatCurrency(service.price)}</span>
                      <span className="text-muted-foreground">~{service.duration} min</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">No service selected</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Date & Time</h3>
                {date && timeSlot ? (
                  <div className="mt-1">
                    <p className="font-medium">{formatDate(date, "EEEE, dd MMMM yyyy")}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {timeSlot}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">No date/time selected</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                <Car className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Vehicle</h3>
                {vehicle ? (
                  <div className="mt-1">
                    <p className="font-medium">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {vehicle.licensePlate} &middot; {vehicle.color}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">No vehicle selected</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {notes && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase">Additional Notes</h3>
                  <p className="mt-1 text-sm">{notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadedImages.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3">Uploaded Photos</h3>
              <div className="flex gap-2 overflow-x-auto">
                {uploadedImages.map((src, i) => (
                  <div key={i} className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border">
                    <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {service && (
        <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service</span>
            <span>{formatCurrency(service.price)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (15%)</span>
            <span>{formatCurrency(service.price * 0.15)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Estimated Total</span>
            <span className="text-red-600">{formatCurrency(service.price * 1.15)}</span>
          </div>
        </div>
      )}

      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsChange(!!checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-muted-foreground">
          I agree to the booking terms and conditions. I understand that a confirmation
          email will be sent with further instructions.
        </span>
      </label>
    </div>
  )
}
