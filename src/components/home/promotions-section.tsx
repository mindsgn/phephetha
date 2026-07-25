"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { TagIcon, ClockIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, target - now)
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

const promotions = [
  {
    id: "promo1",
    title: "Summer Service Special",
    description: "Full vehicle service including oil change, filter replacement, and 21-point inspection at an unbeatable price.",
    discount: "20% OFF",
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    gradient: "from-red-600 to-red-800",
    href: "/services",
  },
  {
    id: "promo2",
    title: "Brake Month Deals",
    description: "Save big on all brake pads, discs, and calipers. Free installation on qualifying purchases.",
    discount: "Up to 30% OFF",
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    gradient: "from-zinc-800 to-zinc-950",
    href: "/parts",
  },
]

function CountdownTimer({ endDate }: { endDate: string }) {
  const { days, hours, minutes, seconds } = useCountdown(endDate)

  const units = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Mins" },
    { value: seconds, label: "Secs" },
  ]

  return (
    <div className="flex items-center gap-2">
      <ClockIcon className="size-4 text-white/60" />
      <div className="flex gap-1.5">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="rounded bg-white/10 px-2 py-1 text-sm font-bold tabular-nums text-white backdrop-blur-sm">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-0.5 text-[10px] uppercase text-white/50">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PromotionsSection() {
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
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Limited Time</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Current <span className="text-red-600">Promotions</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} p-8 text-white`}>
                <div className="absolute top-4 right-4 opacity-10">
                  <TagIcon className="size-24" />
                </div>
                <div className="relative z-10">
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    {promo.discount}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold">{promo.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/80">{promo.description}</p>
                  <div className="mt-4">
                    <CountdownTimer endDate={promo.endDate} />
                  </div>
                  <div className="mt-6">
                    <Link href={promo.href}>
                      <Button className="bg-white text-zinc-900 hover:bg-white/90">
                        Shop Now
                        <ArrowRightIcon className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
