"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarIcon, ShoppingCartIcon, ClockIcon, WrenchIcon, UsersIcon, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: ClockIcon, value: "15+", label: "Years Experience" },
  { icon: WrenchIcon, value: "50,000+", label: "Parts Available" },
  { icon: UsersIcon, value: "10,000+", label: "Happy Customers" },
  { icon: HeadphonesIcon, value: "24/7", label: "Support" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute -right-40 top-1/2 -translate-y-1/2 opacity-[0.04]"
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle cx="400" cy="400" r="350" stroke="currentColor" strokeWidth="1" className="text-white" />
          <circle cx="400" cy="400" r="250" stroke="currentColor" strokeWidth="1" className="text-white" />
          <circle cx="400" cy="400" r="150" stroke="currentColor" strokeWidth="1" className="text-white" />
          <line x1="50" y1="400" x2="750" y2="400" stroke="currentColor" strokeWidth="1" className="text-white" />
          <line x1="400" y1="50" x2="400" y2="750" stroke="currentColor" strokeWidth="1" className="text-white" />
        </svg>
        <svg
          className="absolute -left-20 top-20 opacity-[0.03]"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          fill="none"
        >
          <polygon points="200,10 390,150 320,380 80,380 10,150" stroke="currentColor" strokeWidth="1" className="text-red-500" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-red-600/20 bg-red-600/10 px-4 py-1.5 text-sm font-medium text-red-500">
                <span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
                Trusted Since 2009
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Premium Auto{" "}
              <span className="text-red-600">Service</span>{" "}
              & Parts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-lg text-lg leading-relaxed text-zinc-400"
            >
              Expert automotive care with South Africa&apos;s most trusted technicians.
              From routine servicing to complex repairs, we keep your vehicle performing at its best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/services">
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 px-6">
                  <CalendarIcon className="size-4" />
                  Book Service
                </Button>
              </Link>
              <Link href="/parts">
                <Button size="lg" variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 px-6">
                  <ShoppingCartIcon className="size-4" />
                  Shop Parts
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600/20 to-transparent blur-3xl" />
              <svg viewBox="0 0 400 300" className="relative w-full drop-shadow-2xl" fill="none">
                <ellipse cx="200" cy="260" rx="180" ry="20" fill="rgba(255,255,255,0.03)" />
                <path
                  d="M60 200 Q60 170 80 160 L120 155 Q140 120 180 110 L260 108 Q300 108 320 120 L340 140 Q360 150 365 170 L368 200 Q370 220 350 225 L320 230 Q310 245 295 250 Q280 255 260 250 L160 250 Q140 255 125 250 Q110 245 100 230 L65 225 Q55 220 60 200Z"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  fill="rgba(220,38,38,0.08)"
                />
                <circle cx="130" cy="240" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="rgba(0,0,0,0.3)" />
                <circle cx="130" cy="240" r="15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(0,0,0,0.2)" />
                <circle cx="290" cy="240" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="rgba(0,0,0,0.3)" />
                <circle cx="290" cy="240" r="15" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(0,0,0,0.2)" />
                <path d="M100 160 L130 135 Q160 120 200 118 L250 118 Q280 120 300 130 L330 150" stroke="rgba(220,38,38,0.3)" strokeWidth="1.5" fill="none" />
                <rect x="140" y="125" width="40" height="25" rx="3" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
                <rect x="215" y="125" width="40" height="25" rx="3" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="rgba(255,255,255,0.03)" />
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-center backdrop-blur-sm"
            >
              <stat.icon className="mx-auto mb-2 size-5 text-red-500" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
