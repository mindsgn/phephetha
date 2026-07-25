"use client"

import { motion } from "framer-motion"

const brands = [
  { name: "Bosch", color: "bg-red-600" },
  { name: "SKF", color: "bg-blue-600" },
  { name: "KYB", color: "bg-yellow-500" },
  { name: "Ferodo", color: "bg-orange-600" },
  { name: "Monroe", color: "bg-emerald-600" },
  { name: "Continental", color: "bg-zinc-700" },
  { name: "Castrol", color: "bg-green-600" },
  { name: "Shell", color: "bg-yellow-600" },
  { name: "Denso", color: "bg-red-700" },
  { name: "NGK", color: "bg-blue-700" },
]

export function BrandsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-red-600 mb-2">Trusted Partners</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Partner <span className="text-red-600">Brands</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We stock only genuine and OEM-quality parts from the world&apos;s most trusted automotive brands.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group flex flex-col items-center justify-center rounded-xl border bg-card p-6 transition-all hover:shadow-md"
            >
              <div className={`mb-3 flex size-12 items-center justify-center rounded-full ${brand.color} text-sm font-bold text-white shadow-lg`}>
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-foreground">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
