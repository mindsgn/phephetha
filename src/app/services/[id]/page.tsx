"use client"

import { useState, use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  WrenchIcon,
  CogIcon,
  CircleAlertIcon,
  ScanSearchIcon,
  ArrowUpDownIcon,
  DiscIcon,
  SettingsIcon,
  SnowflakeIcon,
  BatteryIcon,
  DropletIcon,
  MoveHorizontalIcon,
  CircleDotIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarIcon,
  ArrowLeftIcon,
  StarIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { formatCurrency } from "@/lib/utils"

const serviceMap: Record<string, {
  icon: typeof WrenchIcon
  name: string
  description: string
  fullDescription: string
  price: number
  duration: string
  benefits: string[]
  related: string[]
}> = {
  "vehicle-servicing": {
    icon: WrenchIcon, name: "Vehicle Servicing", description: "Complete vehicle maintenance",
    fullDescription: "Our comprehensive vehicle servicing follows manufacturer-recommended intervals to keep your car running at its best. Each service includes an oil and filter change using premium synthetic oils, all fluid level checks and top-ups, belt and hose inspections, battery testing, tyre pressure and tread depth checks, brake system inspection, and a full 21-point safety check. We service all makes and models from compact cars to SUVs and light commercial vehicles.",
    price: 899, duration: "3-4 hours",
    benefits: ["Extends engine life", "Maintains manufacturer warranty", "Prevents costly breakdowns", "Improves fuel efficiency", "Ensures road safety", "Maintains resale value"],
    related: ["oil-change", "diagnostics", "brake-services"],
  },
  "engine-repairs": {
    icon: CogIcon, name: "Engine Repairs", description: "Expert engine diagnostics and rebuilds",
    fullDescription: "Our ASE-certified technicians provide expert engine diagnostics and repair for all vehicle makes. From minor issues like misfires and overheating to major rebuilds, we handle it all. Using state-of-the-art diagnostic equipment, we accurately identify faults and recommend the most cost-effective solutions. All engine work is backed by our 12-month/20,000km warranty.",
    price: 2500, duration: "1-5 days",
    benefits: ["Restored engine performance", "Reduced emissions", "Professional computerized diagnosis", "Quality OEM and aftermarket parts", "12-month warranty", "Detailed repair report"],
    related: ["diagnostics", "vehicle-servicing", "transmission"],
  },
  "brake-services": {
    icon: CircleAlertIcon, name: "Brake Services", description: "Complete brake system care",
    fullDescription: "Your brakes are your vehicle's most critical safety system. Our brake service includes a thorough inspection of pads, discs, calipers, brake lines, and fluid. We offer brake pad replacement, disc skimming or replacement, hydraulic brake fluid flush, and caliper rebuilds. Only premium friction materials from trusted brands like Ferodo and Bosch are used.",
    price: 650, duration: "2-3 hours",
    benefits: ["Improved stopping power", "Reduced stopping distance", "Less brake dust on wheels", "Quieter braking operation", "Enhanced driving safety", "Premium parts used"],
    related: ["diagnostics", "suspension", "vehicle-servicing"],
  },
  "diagnostics": {
    icon: ScanSearchIcon, name: "Diagnostics", description: "Advanced computerized fault diagnosis",
    fullDescription: "We use the latest OBD-II scanners and manufacturer-specific diagnostic tools to accurately identify faults in your vehicle's engine, transmission, ABS, airbag, and electrical systems. Our technicians read and interpret fault codes, perform live data analysis, and provide clear, honest reports with recommended repairs. We support all vehicle makes including European, Asian, and American brands.",
    price: 350, duration: "1-2 hours",
    benefits: ["Accurate fault detection", "Preventive maintenance advice", "Detailed diagnostic report", "All makes and models supported", "Quick turnaround", "No-fix-no-fee guarantee"],
    related: ["engine-repairs", "vehicle-servicing", "brake-services"],
  },
  "suspension": {
    icon: ArrowUpDownIcon, name: "Suspension", description: "Ride comfort and handling restoration",
    fullDescription: "A worn suspension affects your ride comfort, handling, and safety. Our suspension service covers shock absorber and strut replacement, coil spring repair, anti-roll bar link replacement, ball joint and tie rod end replacement, and full wheel alignment. We use premium components from KYB, Monroe, and Bilstein to restore your vehicle's original ride quality.",
    price: 1200, duration: "3-5 hours",
    benefits: ["Restored ride comfort", "Better handling and control", "Even tyre wear", "Improved braking stability", "Premium brand parts", "Full alignment included"],
    related: ["wheel-alignment", "tyres", "brake-services"],
  },
  "clutch-repairs": {
    icon: DiscIcon, name: "Clutch Repairs", description: "Smooth gear shifting restored",
    fullDescription: "Symptoms like slipping, difficulty engaging gears, or a high biting point indicate clutch wear. Our clutch service includes clutch disc and pressure plate replacement, release bearing replacement, flywheel inspection and reconditioning, and hydraulic system bleeding. We work with all transmission types including cable, hydraulic, and electronic clutch systems.",
    price: 3500, duration: "1-2 days",
    benefits: ["Smooth, precise shifting", "Eliminates clutch slipping", "Restored pedal feel", "Flywheel reconditioning included", "Quality clutch kits", "12-month warranty"],
    related: ["transmission", "vehicle-servicing", "engine-repairs"],
  },
  "transmission": {
    icon: SettingsIcon, name: "Transmission", description: "Gearbox servicing and rebuilds",
    fullDescription: "Whether you drive an automatic or manual, our transmission specialists can handle everything from routine fluid changes to complete gearbox rebuilds. Services include ATF and gear oil changes, filter replacement, mechatronic unit repair, torque converter service, and full transmission overhaul. We work with all major transmission brands.",
    price: 2000, duration: "2-5 days",
    benefits: ["Smoother gear shifts", "Extended gearbox lifespan", "Prevents costly failures", "Improved acceleration", "OEM-quality parts", "Comprehensive warranty"],
    related: ["clutch-repairs", "engine-repairs", "diagnostics"],
  },
  "ac-service": {
    icon: SnowflakeIcon, name: "AC Service", description: "Climate control repair and regas",
    fullDescription: "Stay cool with our complete air conditioning service. We offer regas with R134a and R1234yf refrigerants, compressor diagnosis and replacement, leak detection and repair, evaporator and condenser cleaning, cabin filter replacement, and full system sanitization. We service all vehicle AC systems including dual-zone climate control.",
    price: 750, duration: "2-3 hours",
    benefits: ["Optimal cooling performance", "Improved cabin air quality", "Energy-efficient operation", "Eliminates unpleasant odours", "Leak detection included", "All refrigerant types"],
    related: ["diagnostics", "vehicle-servicing", "battery"],
  },
  "battery": {
    icon: BatteryIcon, name: "Battery", description: "Testing, replacement, and charging checks",
    fullDescription: "Don't get stranded with a dead battery. We offer free battery testing, premium battery replacement for all vehicle types, terminal cleaning and protection, charging system voltage checks, and old battery disposal. We stock batteries from Bosch, Exide, Centurion, and other trusted brands.",
    price: 450, duration: "30 min - 1 hour",
    benefits: ["Reliable cold-start performance", "Prevents roadside breakdowns", "Free battery testing", "Eco-friendly disposal", "Premium brand batteries", "Up to 3-year warranty"],
    related: ["diagnostics", "vehicle-servicing", "ac-service"],
  },
  "oil-change": {
    icon: DropletIcon, name: "Oil Change", description: "Premium oil and filter replacement",
    fullDescription: "Regular oil changes are the single most important maintenance task for your engine. We use only manufacturer-recommended oil grades from Castrol, Shell, and Motul. Service includes engine oil drain and refill, oil filter replacement, drain plug torque check, and oil level verification. Available in mineral, semi-synthetic, and fully synthetic options.",
    price: 399, duration: "30-45 min",
    benefits: ["Protects engine internals", "Improves performance and fuel economy", "Quick turnaround", "Multiple oil grade options", "Filter included", "Service stamp provided"],
    related: ["vehicle-servicing", "diagnostics", "engine-repairs"],
  },
  "wheel-alignment": {
    icon: MoveHorizontalIcon, name: "Wheel Alignment", description: "Precision 4-wheel computer alignment",
    fullDescription: "Incorrect wheel alignment causes uneven tyre wear, poor handling, and reduced fuel economy. Our Hunter digital imaging alignment system measures and adjusts camber, caster, and toe angles to manufacturer specifications. We perform both 2-wheel and 4-wheel alignment for cars, SUVs, and light commercial vehicles.",
    price: 299, duration: "1-2 hours",
    benefits: ["Eliminates uneven tyre wear", "Improves fuel economy", "Straight, stable tracking", "Enhanced driving safety", "Computerized precision", "Printout of results provided"],
    related: ["tyres", "suspension", "vehicle-servicing"],
  },
  "tyres": {
    icon: CircleDotIcon, name: "Tyres", description: "Fitting, balancing, and puncture repair",
    fullDescription: "We provide professional tyre services including new tyre fitting, wheel balancing, tyre rotation, puncture repair, and valve replacement. We stock leading brands including Continental, Michelin, Dunlop, and Bridgestone for cars, SUVs, and light commercial vehicles. Free tyre pressure checks available anytime.",
    price: 199, duration: "1-2 hours",
    benefits: ["Expert fitting and balancing", "Wide range of brands and sizes", "Puncture repair available", "Free pressure checks", "Competitive pricing", "Tyre disposal included"],
    related: ["wheel-alignment", "suspension", "vehicle-servicing"],
  },
}

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  const service = serviceMap[id]

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="text-4xl font-bold">Service Not Found</h1>
        <p className="mt-4 text-muted-foreground">The service you are looking for does not exist.</p>
        <Link href="/services" className="mt-6">
          <Button><ArrowLeftIcon className="size-4" /> Back to Services</Button>
        </Link>
      </div>
    )
  }

  const Icon = service.icon

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
    setTimeout(() => {
      setBookingSubmitted(false)
      setBookingOpen(false)
    }, 2000)
  }

  const relatedServices = service.related
    .map((rid) => ({ id: rid, ...serviceMap[rid] }))
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
            <ArrowLeftIcon className="size-4" />
            All Services
          </Link>
          <div className="flex items-start gap-6">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-red-600/10 text-red-500">
              <Icon className="size-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl">{service.name}</h1>
              <p className="mt-2 max-w-2xl text-zinc-400">{service.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Badge variant="secondary" className="text-base">
                  {formatCurrency(service.price)}
                </Badge>
                <span className="flex items-center gap-1 text-sm text-zinc-400">
                  <ClockIcon className="size-4" />
                  {service.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold">About This Service</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{service.fullDescription}</p>
            </motion.div>

            <Separator />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold">Benefits</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 rounded-lg border p-3">
                    <CheckCircleIcon className="size-5 shrink-0 text-green-600" />
                    <span className="text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {relatedServices.length > 0 && (
              <>
                <Separator />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold">Related Services</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {relatedServices.map((rs) => {
                      const RIcon = rs.icon
                      return (
                        <Link key={rs.id} href={`/services/${rs.id}`}>
                          <Card className="group transition-all hover:border-red-600/20 hover:shadow-md">
                            <CardContent className="p-4">
                              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600 group-hover:bg-red-600 group-hover:text-white">
                                <RIcon className="size-5" />
                              </div>
                              <h3 className="font-semibold text-sm">{rs.name}</h3>
                              <p className="mt-1 text-xs text-muted-foreground">{formatCurrency(rs.price)}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold">Book This Service</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-semibold">{formatCurrency(service.price)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span>{service.duration}</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircleIcon className="size-4" />
                  No hidden charges
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <StarIcon className="size-4" />
                  12-month warranty
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => setBookingOpen(true)}
              >
                <CalendarIcon className="size-4" />
                Book Appointment
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book {service.name}</DialogTitle>
            <DialogDescription>
              Fill in the details below to schedule your appointment.
            </DialogDescription>
          </DialogHeader>
          {bookingSubmitted ? (
            <div className="py-8 text-center">
              <CheckCircleIcon className="mx-auto size-12 text-green-600" />
              <p className="mt-4 text-lg font-semibold">Booking Confirmed!</p>
              <p className="text-sm text-muted-foreground">We will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Service</Label>
                <Input value={service.name} disabled />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="booking-date">Preferred Date</Label>
                  <Input id="booking-date" type="date" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="booking-time">Time Slot</Label>
                  <Input id="booking-time" type="time" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booking-vehicle">Vehicle</Label>
                <Input id="booking-vehicle" placeholder="e.g. 2022 Toyota Corolla" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="booking-notes">Additional Notes</Label>
                <Textarea id="booking-notes" placeholder="Describe any specific concerns..." rows={3} />
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-red-600 text-white hover:bg-red-700">
                  Confirm Booking
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
