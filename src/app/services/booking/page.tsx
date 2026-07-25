"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth-store"
import { generateBookingNumber } from "@/lib/utils"
import { ServiceSelector } from "@/components/booking/service-selector"
import { DateTimePicker } from "@/components/booking/date-time-picker"
import { VehicleSelector } from "@/components/booking/vehicle-selector"
import { BookingReview } from "@/components/booking/booking-review"
import { motion, AnimatePresence } from "framer-motion"
import type { Service, Vehicle } from "@/types"

const MOCK_SERVICES: Service[] = [
  {
    id: "1",
    name: "Full Service",
    description: "Complete vehicle inspection and maintenance service",
    price: 1500,
    duration: 180,
    images: [],
    benefits: ["Engine check", "Fluid top-up", "Brake inspection"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Oil Change",
    description: "Quick oil and filter replacement",
    price: 450,
    duration: 45,
    images: [],
    benefits: ["Synthetic oil", "New filter"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Brake Service",
    description: "Complete brake inspection, pad and disc replacement",
    price: 1200,
    duration: 120,
    images: [],
    benefits: ["Pad replacement", "Disc check", "Brake fluid"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Engine Diagnostic",
    description: "Advanced engine diagnostic scan and report",
    price: 600,
    duration: 60,
    images: [],
    benefits: ["OBD scan", "Performance report"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Tyre Rotation",
    description: "Rotate and balance all four tyres",
    price: 350,
    duration: 30,
    images: [],
    benefits: ["Rotation", "Balance", "Pressure check"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Air Conditioning Service",
    description: "A/C system check, gas recharge and leak test",
    price: 800,
    duration: 90,
    images: [],
    benefits: ["Gas recharge", "Leak test", "Filter clean"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const MOCK_VEHICLES: Vehicle[] = [
  {
    id: "v1",
    userId: "user1",
    make: "Toyota",
    model: "Corolla",
    year: 2021,
    color: "White",
    licensePlate: "GP 123-456",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "v2",
    userId: "user1",
    make: "BMW",
    model: "320i",
    year: 2022,
    color: "Black",
    licensePlate: "GP 789-012",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

type BookingStep = 1 | 2 | 3 | 4 | 5

export default function BookingPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [currentStep, setCurrentStep] = useState<BookingStep>(1)
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [vehicles, setVehicles] = useState<Vehicle[]>(MOCK_VEHICLES)
  const [notes, setNotes] = useState("")
  const [uploadedImages] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const selectedService = MOCK_SERVICES.find((s) => s.id === selectedServiceId)
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId)

  const canProceed = useMemo(() => {
    switch (currentStep) {
      case 1: return !!selectedServiceId
      case 2: return !!selectedDate && !!selectedTime
      case 3: return !!selectedVehicleId
      case 4: return true
      case 5: return termsAccepted
      default: return false
    }
  }, [currentStep, selectedServiceId, selectedDate, selectedTime, selectedVehicleId, termsAccepted])

  const handleNext = () => {
    if (currentStep === 5) {
      handleSubmit()
    } else if (canProceed) {
      setCurrentStep((s) => Math.min(5, s + 1) as BookingStep)
    }
  }

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1) as BookingStep)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const bookingNumber = generateBookingNumber()
    router.push(`/services/booking/confirmation?ref=${bookingNumber}`)
  }

  const handleAddVehicle = (vehicleData: Omit<Vehicle, "id" | "userId" | "createdAt" | "updatedAt">) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: `v-${Date.now()}`,
      userId: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setVehicles([...vehicles, newVehicle])
    setSelectedVehicleId(newVehicle.id)
  }

  const progress = ((currentStep - 1) / 4) * 100

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Book a Service</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Schedule your vehicle service in a few easy steps
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {["Service", "Date & Time", "Vehicle", "Details", "Review"].map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium ${
                i + 1 <= currentStep ? "text-red-600" : "text-muted-foreground"
              } hidden sm:inline`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-red-600 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Step {currentStep} of 5
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep === 1 && (
            <ServiceSelector
              services={MOCK_SERVICES}
              selectedServiceId={selectedServiceId}
              onSelect={setSelectedServiceId}
            />
          )}

          {currentStep === 2 && (
            <DateTimePicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />
          )}

          {currentStep === 3 && (
            <VehicleSelector
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleId}
              onSelect={setSelectedVehicleId}
              onAddVehicle={handleAddVehicle}
            />
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">Additional Information</h2>
                <p className="text-sm text-muted-foreground">
                  Add any notes or upload photos of your vehicle
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Notes / Special Requests</Label>
                  <Textarea
                    placeholder="Describe any specific issues or requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Upload Photos (optional)</Label>
                  <div className="rounded-xl border-2 border-dashed p-8 text-center text-muted-foreground">
                    <p className="text-sm">Drag and drop photos here, or click to browse</p>
                    <p className="text-xs mt-1">PNG, JPG up to 5MB each</p>
                  </div>
                  {uploadedImages.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {uploadedImages.map((src, i) => (
                        <div key={i} className="h-16 w-16 rounded-lg overflow-hidden border">
                          <img src={src} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <BookingReview
              service={selectedService ?? null}
              date={selectedDate}
              timeSlot={selectedTime}
              vehicle={selectedVehicle ?? null}
              notes={notes}
              uploadedImages={uploadedImages}
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 mt-8">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
        <Button
          className={`flex-1 bg-red-600 hover:bg-red-700 text-white h-10 ${
            currentStep === 1 ? "w-full" : ""
          }`}
          onClick={handleNext}
          disabled={!canProceed || submitting}
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : currentStep === 5 ? (
            "Confirm Booking"
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
