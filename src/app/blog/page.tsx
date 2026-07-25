"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SearchIcon, CalendarIcon, UserIcon, TagIcon, ArrowRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

const blogPosts = [
  { id: "oil-change-guide", title: "How Often Should You Change Your Oil?", excerpt: "A complete guide to oil change intervals for different engine types and driving conditions in South Africa.", image: null, date: "2024-11-10", author: "Sipho Ndlovu", category: "Maintenance", tags: ["oil", "engine", "maintenance"] },
  { id: "brake-warning-signs", title: "5 Warning Signs Your Brakes Need Attention", excerpt: "Don't ignore these critical brake warning signs. Learn when to have your brakes inspected and replaced.", image: null, date: "2024-10-28", author: "David Khumalo", category: "Safety", tags: ["brakes", "safety", "warning-signs"] },
  { id: "winter-car-care", title: "Winter Car Care Tips for South African Drivers", excerpt: "Cold mornings can be tough on your vehicle. Follow these tips to keep your car running smoothly this winter.", image: null, date: "2024-10-15", author: "John Mokoena", category: "Seasonal", tags: ["winter", "cold-weather", "tips"] },
  { id: "choosing-right-tyres", title: "How to Choose the Right Tyres for Your Vehicle", excerpt: "Understanding tyre ratings, sizes, and types to make the best choice for your driving needs and budget.", image: null, date: "2024-10-01", author: "Anna van Zyl", category: "Guides", tags: ["tyres", "buying-guide", "safety"] },
  { id: "engine-diagnostics-101", title: "Understanding Engine Diagnostic Codes", excerpt: "What do those check engine light codes mean? A beginner's guide to OBD-II diagnostics.", image: null, date: "2024-09-18", author: "David Khumalo", category: "Technical", tags: ["diagnostics", "engine", "obd-ii"] },
  { id: "car-battery-tips", title: "Extending Your Car Battery Life: Expert Tips", excerpt: "Learn how to get the most out of your car battery with these professional maintenance tips.", image: null, date: "2024-09-05", author: "Sipho Ndlovu", category: "Maintenance", tags: ["battery", "maintenance", "tips"] },
]

const allCategories = [...new Set(blogPosts.map((p) => p.category))]

export default function BlogPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = !search || post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">Blog</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Automotive <span className="text-red-600">Insights</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Expert tips, guides, and news from the automotive world.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:w-80">
            <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === null ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === cat ? "bg-red-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <p className="text-lg font-medium">No articles found</p>
            <p className="mt-1 text-sm">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-red-600/20">
                    <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                      <div className="flex h-full items-center justify-center">
                        <TagIcon className="size-8 text-red-600/30" />
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                      <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-red-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="size-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserIcon className="size-3" />
                          {post.author}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
