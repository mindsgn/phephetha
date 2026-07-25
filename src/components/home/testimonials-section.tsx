"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Thabo Molefe",
    vehicle: "Volkswagen Polo 1.0 TSI",
    rating: 5,
    review: "Absolutely outstanding service! They diagnosed a complex engine issue that two other garages missed. Fair pricing and transparent communication throughout. My car has never run better.",
    avatar: "TM",
  },
  {
    id: 2,
    name: "Sarah Nkosi",
    vehicle: "Toyota Corolla Cross",
    rating: 5,
    review: "I've been bringing my vehicles here for over 5 years. The team is always professional, honest, and efficient. Their online booking system makes scheduling maintenance so convenient.",
    avatar: "SN",
  },
  {
    id: 3,
    name: "James van der Merwe",
    vehicle: "Ford Ranger Wildtrak",
    rating: 4,
    review: "Great experience with their brake service. They explained everything clearly before starting work and the pricing was exactly as quoted. Will definitely recommend to friends and family.",
    avatar: "JM",
  },
  {
    id: 4,
    name: "Lerato Mkhize",
    vehicle: "Hyundai Tucson",
    rating: 5,
    review: "The parts quality is excellent and the prices are very competitive compared to main dealers. Plus the mechanics really know what they're doing. Five stars all the way!",
    avatar: "LM",
  },
  {
    id: 5,
    name: "David Pretorius",
    vehicle: "BMW 3 Series",
    rating: 5,
    review: "Finally found a mechanic I can trust with my BMW. They use genuine parts and the workmanship is top-notch. The workshop is clean and well-organized too.",
    avatar: "DP",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const t = testimonials[current]

  return (
    <section className="py-20 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">Testimonials</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our <span className="text-red-500">Customers</span> Say
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <QuoteIcon className="absolute -top-4 left-0 size-12 text-red-600/20" />

          <div className="relative min-h-[280px] overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                    {t.avatar}
                  </div>
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`size-5 ${i < t.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-700"}`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 max-w-xl text-lg leading-relaxed text-zinc-300 italic">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-zinc-500">{t.vehicle}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="text-zinc-400 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="size-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1)
                    setCurrent(i)
                  }}
                  className={`size-2 rounded-full transition-all ${
                    i === current ? "bg-red-600 w-6" : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="text-zinc-400 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
