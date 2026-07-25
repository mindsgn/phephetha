"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const businessHours = [
  { day: "Monday – Friday", hours: "7:00 AM – 5:30 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "Closed" },
]

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

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
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Get in Touch</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact <span className="text-red-600">Us</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input id="contact-phone" type="tel" placeholder="+27..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input id="contact-subject" placeholder="How can we help?" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" placeholder="Tell us about your inquiry..." rows={4} required />
                </div>
                <Button
                  type="submit"
                  className="bg-red-600 text-white hover:bg-red-700"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircleIcon className="size-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <SendIcon className="size-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
              <div className="space-y-4">
                <a href="tel:+27123456789" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-red-600">
                  <PhoneIcon className="size-5 shrink-0 text-red-600" />
                  +27 12 345 6789
                </a>
                <a href="mailto:info@phephetha.co.za" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-red-600">
                  <MailIcon className="size-5 shrink-0 text-red-600" />
                  info@phephetha.co.za
                </a>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPinIcon className="size-5 shrink-0 text-red-600" />
                  123 Auto Street, Pretoria, Gauteng, South Africa
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <ClockIcon className="size-5 text-red-600" />
                <h3 className="text-lg font-semibold">Business Hours</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead className="text-right">Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessHours.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell className="font-medium">{row.day}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{row.hours}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="aspect-video w-full rounded-xl border bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPinIcon className="mx-auto mb-2 size-8" />
                <p className="text-sm">Google Maps</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
