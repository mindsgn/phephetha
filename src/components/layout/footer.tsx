"use client"

import Link from "next/link"
import { useState } from "react"
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  MessageCircleIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Parts Store", href: "/parts" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
]

const serviceLinks = [
  { label: "General Service", href: "/services" },
  { label: "Brake Repair", href: "/services" },
  { label: "Oil Change", href: "/services" },
  { label: "Engine Diagnostics", href: "/services" },
  { label: "Tyre Services", href: "/services" },
  { label: "Battery Services", href: "/services" },
]

const brands = ["Bosch", "Castrol", "Dunlop", "Michelin", "Shell", "Motul"]

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1 text-xl font-bold text-white">
              PHEPHETHA<span className="text-red-600">AUTO</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Your trusted automotive service centre for quality parts,
              professional servicing, and expert repairs.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Instagram", path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" },
                { label: "Twitter", path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02V8.48l5.75 3.27-5.75 3.27z" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="rounded-full bg-zinc-800 p-2 transition-colors hover:bg-red-600 hover:text-white"
                  aria-label={social.label}
                >
                  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <PhoneIcon className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>+27 12 345 6789</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MailIcon className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>info@phephetha.co.za</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>123 Auto Street, Pretoria, Gauteng</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-red-500" />
                <div>
                  <p>Mon - Fri: 7:00 AM - 5:30 PM</p>
                  <p>Sat: 8:00 AM - 1:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="text-sm text-zinc-400">
              Get the latest deals and automotive tips.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="h-9 border-zinc-800 bg-zinc-900 text-sm text-white placeholder:text-zinc-500 focus-visible:border-red-600"
              />
              <Button
                type="submit"
                size="sm"
                className="shrink-0 bg-red-600 text-white hover:bg-red-700"
              >
                <SendIcon className="size-4" />
              </Button>
            </form>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Partner Brands
            </h3>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-zinc-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Phephetha Auto Centre. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/27123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-3 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircleIcon className="size-6" />
      </a>
    </footer>
  )
}
