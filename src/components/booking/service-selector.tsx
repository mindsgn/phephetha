"use client"

import { Wrench, Droplets, Gauge, Cog, Zap, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import type { Service } from "@/types"

interface ServiceSelectorProps {
  services: Service[]
  selectedServiceId: string | null
  onSelect: (serviceId: string) => void
}

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "oil-change": Droplets,
  brake: ShieldCheck,
  engine: Cog,
  electrical: Zap,
  diagnostic: Gauge,
}

function getServiceIcon(service: Service) {
  const key = Object.keys(serviceIcons).find((k) =>
    service.name.toLowerCase().includes(k),
  )
  return key ? serviceIcons[key] : Wrench
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export function ServiceSelector({ services, selectedServiceId, onSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Select a Service</h2>
        <p className="text-sm text-muted-foreground">
          Choose the service you need for your vehicle
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service, index) => {
          const Icon = getServiceIcon(service)
          const isSelected = selectedServiceId === service.id

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : "hover:border-foreground/20"
                }`}
                onClick={() => onSelect(service.id)}
              >
                <CardContent className="p-4 flex gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                      {service.description}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <span className="font-semibold text-red-600">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="text-muted-foreground">
                        ~{formatDuration(service.duration)}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
