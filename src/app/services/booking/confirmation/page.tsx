"use client"

import { Check, Car, Calendar, Clock, FileText, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

const whatToBring = [
  "Your vehicle's service book (if available)",
  "A valid form of ID",
  "Your booking confirmation (email or this page)",
  "Keys to your vehicle",
  "Any aftermarket parts you've purchased",
]

export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Check className="h-12 w-12 text-green-600" />
        </motion.div>

        <div>
          <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Your service appointment has been scheduled. We&apos;ll see you soon!
          </p>
        </div>

        <Card>
          <CardContent className="p-6 text-left space-y-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Booking Reference</p>
              <p className="font-mono font-bold text-xl mt-1">BK-M2K9X7-DF4G</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                  <Wrench className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Service</p>
                  <p className="text-sm font-medium">Full Service</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                  <Calendar className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">Monday, 28 July 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="text-sm font-medium">09:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30">
                  <Car className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vehicle</p>
                  <p className="text-sm font-medium">2021 Toyota Corolla</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-left">
            <h2 className="font-semibold flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4" />
              What to Bring
            </h2>
            <ul className="space-y-2">
              {whatToBring.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Check className="h-4 w-4 mt-0.5 shrink-0 text-green-600" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-3 pt-4">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">Back to Home</Button>
          </Link>
          <Link href="/bookings" className="flex-1">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">View My Bookings</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
