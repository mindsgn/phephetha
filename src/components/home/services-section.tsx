"use client"

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
  ArrowRightIcon,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

const services = [
  { icon: WrenchIcon, name: "Vehicle Servicing", description: "Complete vehicle maintenance with manufacturer-recommended intervals and quality oil.", priceRange: "From R899", href: "/services" },
  { icon: CogIcon, name: "Engine Repairs", description: "Expert engine diagnostics, rebuilds, and performance tuning by certified mechanics.", priceRange: "From R2,500", href: "/services" },
  { icon: CircleAlertIcon, name: "Brake Services", description: "Brake pad replacement, disc skimming, fluid flush, and complete brake system checks.", priceRange: "From R650", href: "/services" },
  { icon: ScanSearchIcon, name: "Diagnostics", description: "Advanced OBD-II scanning and computerized fault diagnosis for all vehicle makes.", priceRange: "From R350", href: "/services" },
  { icon: ArrowUpDownIcon, name: "Suspension", description: "Shock absorber replacement, spring repair, and full suspension geometry alignment.", priceRange: "From R1,200", href: "/services" },
  { icon: DiscIcon, name: "Clutch Repairs", description: "Clutch plate replacement, hydraulic system repair, and flywheel reconditioning.", priceRange: "From R3,500", href: "/services" },
  { icon: SettingsIcon, name: "Transmission", description: "Automatic and manual gearbox servicing, rebuilds, and fluid changes.", priceRange: "From R2,000", href: "/services" },
  { icon: SnowflakeIcon, name: "AC Service", description: "Air conditioning regas, compressor repair, leak detection, and cabin filter replacement.", priceRange: "From R750", href: "/services" },
  { icon: BatteryIcon, name: "Battery", description: "Battery testing, replacement, terminal cleaning, and charging system checks.", priceRange: "From R450", href: "/services" },
  { icon: DropletIcon, name: "Oil Change", description: "Premium synthetic and conventional oil changes with filter replacement included.", priceRange: "From R399", href: "/services" },
  { icon: MoveHorizontalIcon, name: "Wheel Alignment", description: "Precision 4-wheel alignment using Hunter digital imaging technology.", priceRange: "From R299", href: "/services" },
  { icon: CircleDotIcon, name: "Tyres", description: "Tyre fitting, balancing, rotation, and puncture repair for all vehicle types.", priceRange: "From R199", href: "/services" },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">What We Offer</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Professional <span className="text-red-600">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From routine maintenance to complex repairs, our certified technicians deliver excellence.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={service.href}
                className="group block h-full rounded-xl border bg-card p-5 transition-all hover:shadow-lg hover:shadow-red-600/5 hover:border-red-600/20"
              >
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-red-600/10 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                  <service.icon className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground">{service.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-red-600">{service.priceRange}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-red-600">
                    Book Now
                    <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
          >
            View All Services
            <ArrowRightIcon className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
