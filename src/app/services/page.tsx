import { Metadata } from "next"
import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Services | Phephetha Auto Centre",
  description: "Professional automotive services including vehicle servicing, engine repairs, brake services, diagnostics, and more.",
}

const services = [
  { id: "vehicle-servicing", icon: WrenchIcon, name: "Vehicle Servicing", description: "Complete vehicle maintenance following manufacturer-recommended service intervals. Includes oil and filter change, fluid top-ups, belt inspection, and a comprehensive 21-point check.", price: 899, duration: "3-4 hours", benefits: ["Extends engine life", "Maintains warranty", "Prevents breakdowns", "Improves fuel efficiency"] },
  { id: "engine-repairs", icon: CogIcon, name: "Engine Repairs", description: "Expert engine diagnostics, repairs, and rebuilds by our ASE-certified technicians. From minor fixes to complete engine overhauls.", price: 2500, duration: "1-5 days", benefits: ["Restored performance", "Reduced emissions", "Professional diagnosis", "Quality parts guaranteed"] },
  { id: "brake-services", icon: CircleAlertIcon, name: "Brake Services", description: "Complete brake system inspection, pad replacement, disc skimming, fluid flush, and caliper servicing for optimal stopping power.", price: 650, duration: "2-3 hours", benefits: ["Improved safety", "Reduced stopping distance", "Less brake dust", "Quieter operation"] },
  { id: "diagnostics", icon: ScanSearchIcon, name: "Diagnostics", description: "Advanced OBD-II scanning and computerized fault diagnosis. We read and clear error codes, identify issues, and provide detailed reports.", price: 350, duration: "1-2 hours", benefits: ["Accurate fault detection", "Preventive maintenance", "Detailed reports", "All makes supported"] },
  { id: "suspension", icon: ArrowUpDownIcon, name: "Suspension", description: "Shock absorber replacement, strut repair, spring service, and full suspension geometry alignment for a smooth, controlled ride.", price: 1200, duration: "3-5 hours", benefits: ["Better handling", "Comfortable ride", "Even tyre wear", "Improved safety"] },
  { id: "clutch-repairs", icon: DiscIcon, name: "Clutch Repairs", description: "Clutch plate replacement, pressure plate service, hydraulic system repair, and flywheel reconditioning for smooth gear changes.", price: 3500, duration: "1-2 days", benefits: ["Smooth shifting", "Eliminates slipping", "Restored control", "Longer clutch life"] },
  { id: "transmission", icon: SettingsIcon, name: "Transmission", description: "Automatic and manual gearbox servicing, rebuilds, fluid changes, and mechatronic unit repairs for all vehicle types.", price: 2000, duration: "2-5 days", benefits: ["Smoother shifts", "Extended gearbox life", "Prevents damage", "Improved performance"] },
  { id: "ac-service", icon: SnowflakeIcon, name: "AC Service", description: "Air conditioning regas, compressor repair, leak detection, evaporator cleaning, and cabin filter replacement for optimal cooling.", price: 750, duration: "2-3 hours", benefits: ["Better cooling", "Improved air quality", "Energy efficiency", "Odour elimination"] },
  { id: "battery", icon: BatteryIcon, name: "Battery", description: "Battery testing, replacement, terminal cleaning, and charging system checks. We stock all major brands for every vehicle type.", price: 450, duration: "30 min - 1 hour", benefits: ["Reliable starting", "Prevents breakdowns", "Free testing", "Old battery disposal"] },
  { id: "oil-change", icon: DropletIcon, name: "Oil Change", description: "Premium synthetic and conventional oil changes with filter replacement. We use only manufacturer-recommended oil grades.", price: 399, duration: "30-45 min", benefits: ["Protects engine", "Better performance", "Fuel savings", "Quick turnaround"] },
  { id: "wheel-alignment", icon: MoveHorizontalIcon, name: "Wheel Alignment", description: "Precision 4-wheel alignment using Hunter digital imaging technology. Corrects uneven tyre wear and steering pull.", price: 299, duration: "1-2 hours", benefits: ["Even tyre wear", "Better fuel economy", "Straight tracking", "Safer handling"] },
  { id: "tyres", icon: CircleDotIcon, name: "Tyres", description: "Tyre fitting, balancing, rotation, and puncture repair. We stock leading brands for cars, SUVs, and light commercial vehicles.", price: 199, duration: "1-2 hours", benefits: ["Better grip", "Improved safety", "Reduced noise", "Expert fitting"] },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">Our Services</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Professional <span className="text-red-600">Automotive</span> Services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            From routine maintenance to complex repairs, our certified team delivers excellence for every vehicle.
          </p>
          <Link href="/services">
            <Button size="lg" className="mt-8 bg-red-600 text-white hover:bg-red-700">
              <CalendarIcon className="size-4" />
              Book an Appointment
            </Button>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="group transition-all hover:shadow-lg hover:shadow-red-600/5 hover:border-red-600/20">
              <CardContent className="p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-red-600/10 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <service.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{service.description}</p>

                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 font-semibold text-red-600">
                    {formatCurrency(service.price)}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <ClockIcon className="size-3.5" />
                    {service.duration}
                  </span>
                </div>

                <ul className="mt-4 space-y-1.5">
                  {service.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircleIcon className="size-3.5 shrink-0 text-green-600" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link href={`/services/${service.id}`} className="mt-4 block">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
