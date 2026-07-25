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
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const contactInfo = [
  { icon: PhoneIcon, title: "Phone", value: "+27 12 345 6789", href: "tel:+27123456789", description: "Call us during business hours" },
  { icon: MailIcon, title: "Email", value: "info@phephetha.co.za", href: "mailto:info@phephetha.co.za", description: "We reply within 24 hours" },
  { icon: MapPinIcon, title: "Address", value: "123 Auto Street, Pretoria", href: "#map", description: "Gauteng, South Africa" },
]

const businessHours = [
  { day: "Monday", hours: "7:00 AM – 5:30 PM" },
  { day: "Tuesday", hours: "7:00 AM – 5:30 PM" },
  { day: "Wednesday", hours: "7:00 AM – 5:30 PM" },
  { day: "Thursday", hours: "7:00 AM – 5:30 PM" },
  { day: "Friday", hours: "7:00 AM – 5:30 PM" },
  { day: "Saturday", hours: "8:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
  { day: "Public Holidays", hours: "Closed" },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">Contact</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get In <span className="text-red-600">Touch</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Have a question or need a quote? We are here to help.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">Send Us a Message</h2>
                <p className="mt-1 text-sm text-muted-foreground">Fill out the form below and we will get back to you.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="Your full name" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+27..." />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                  </div>
                  <Button type="submit" className="bg-red-600 text-white hover:bg-red-700" disabled={submitted}>
                    {submitted ? (
                      <>
                        <CheckCircleIcon className="size-4" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        <SendIcon className="size-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6 lg:col-span-2"
          >
            {contactInfo.map((info) => (
              <a key={info.title} href={info.href}>
                <Card className="transition-all hover:border-red-600/20 hover:shadow-md">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-red-600/10 text-red-600">
                      <info.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-semibold">{info.title}</p>
                      <p className="text-sm text-foreground">{info.value}</p>
                      <p className="text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}

            <Card>
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <ClockIcon className="size-5 text-red-600" />
                  <h3 className="font-semibold">Business Hours</h3>
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
                        <TableCell className="font-medium text-sm">{row.day}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">{row.hours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div id="map" className="aspect-video w-full rounded-xl border bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPinIcon className="mx-auto mb-2 size-8" />
                <p className="text-sm">Google Maps Embed</p>
                <p className="text-xs">123 Auto Street, Pretoria</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold">Follow Us</p>
              <div className="flex gap-3">
                <a href="#" className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-red-600 hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-red-600 hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="flex size-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-red-600 hover:text-white">
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
