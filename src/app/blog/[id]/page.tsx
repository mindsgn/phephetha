"use client"

import { use } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeftIcon, CalendarIcon, UserIcon, TagIcon, ClockIcon, Share2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"

const blogPosts: Record<string, {
  title: string
  date: string
  author: string
  category: string
  tags: string[]
  readTime: string
  content: string
  excerpt: string
}> = {
  "oil-change-guide": {
    title: "How Often Should You Change Your Oil?",
    date: "2024-11-10",
    author: "Sipho Ndlovu",
    category: "Maintenance",
    tags: ["oil", "engine", "maintenance"],
    readTime: "5 min read",
    excerpt: "A complete guide to oil change intervals for different engine types and driving conditions.",
    content: `Regular oil changes are one of the most critical maintenance tasks for any vehicle. The engine oil lubricates, cools, and cleans the internal components of your engine. Over time, oil breaks down and becomes contaminated with metal particles, dirt, and combustion byproducts.

## When to Change Your Oil

The general recommendation is every 5,000 to 10,000 kilometres, but this varies based on several factors:

### Driving Conditions
- **Normal driving**: 10,000 km or every 12 months
- **Severe conditions** (dusty roads, frequent short trips, heavy traffic): 5,000 km or every 6 months
- **Towing or heavy loads**: 5,000 km or per manufacturer guidelines

### Oil Type Matters
- **Conventional oil**: Change every 5,000 km
- **Semi-synthetic**: Change every 7,500 km
- **Fully synthetic**: Can last up to 10,000–15,000 km

## Signs You Need an Oil Change

1. **Dashboard warning light** – The oil pressure or check oil light is on
2. **Engine noise** – Increased ticking or knocking sounds
3. **Dark, gritty oil** – Check the dipstick; oil should be amber, not black
4. **Exhaust smoke** – Blue or grey smoke indicates oil burning
5. **Decreased performance** – Reduced fuel economy and sluggish acceleration

## The Cost of Skipping Oil Changes

Neglecting oil changes can lead to:
- Increased engine wear and reduced lifespan
- Overheating due to poor lubrication
- Sludge buildup blocking oil passages
- Catastrophic engine failure requiring expensive replacement

## Professional vs DIY

While DIY oil changes can save money, professional service ensures proper disposal of old oil, correct oil grade selection, filter replacement, and a multi-point inspection. At Phephetha Auto Centre, our oil change service includes all of these plus a complimentary vehicle health check.

## Book Your Oil Change

Visit us or book online for a quick, professional oil change using premium synthetic oils from Castrol, Shell, and Motul.`,
  },
  "brake-warning-signs": {
    title: "5 Warning Signs Your Brakes Need Attention",
    date: "2024-10-28",
    author: "David Khumalo",
    category: "Safety",
    tags: ["brakes", "safety", "warning-signs"],
    readTime: "4 min read",
    excerpt: "Don't ignore these critical brake warning signs.",
    content: `Your brakes are the most important safety system in your vehicle. Recognizing the warning signs of brake wear can prevent accidents and costly repairs.

## 1. Squealing or Grinding Noises

A high-pitched squeal when braking usually indicates that your brake pads are worn and the wear indicator is touching the rotor. A grinding metal-on-metal sound means the pads are completely worn and the rotors are being damaged. If you hear grinding, stop driving and have your brakes inspected immediately.

## 2. Soft or Spongy Brake Pedal

If your brake pedal feels soft or spongy when pressed, it could indicate air in the brake lines, a brake fluid leak, or a failing master cylinder. A brake pedal that sinks to the floor is a critical safety issue.

## 3. Vehicle Pulling to One Side

When your car pulls to one side during braking, it may indicate uneven brake pad wear, a stuck caliper, or a collapsed brake hose. This uneven braking can cause dangerous handling, especially in emergency stops.

## 4. Vibrations During Braking

Vibrations in the steering wheel or brake pedal during braking typically indicate warped brake rotors. This can be caused by excessive heat, worn pads, or contaminated rotors. While rotors can sometimes be resurfaced, severe warping requires replacement.

## 5. Brake Warning Light

If your dashboard brake warning light illuminates, it could mean low brake fluid, worn pads, or a more serious issue. Never ignore this warning – have your brake system checked as soon as possible.

## How Often to Inspect Brakes

We recommend having your brakes inspected every 20,000 km or at every second service. However, if you notice any of the signs above, get them checked immediately.

## Professional Brake Service

At Phephetha Auto Centre, we use only premium brake components from trusted brands like Ferodo and Bosch. Our brake service includes a thorough inspection of the entire brake system and a detailed report.`,
  },
  "winter-car-care": {
    title: "Winter Car Care Tips for South African Drivers",
    date: "2024-10-15",
    author: "John Mokoena",
    category: "Seasonal",
    tags: ["winter", "cold-weather", "tips"],
    readTime: "6 min read",
    excerpt: "Cold mornings can be tough on your vehicle.",
    content: `South African winters may not be as harsh as the northern hemisphere, but cold mornings and temperature drops still take a toll on vehicles. Here are essential tips to keep your car running smoothly.

## Battery Health

Cold weather is the number one killer of car batteries. A battery that was marginal in summer will often fail in winter. Have your battery tested before winter arrives. Look for:
- Slow cranking when starting
- Dim headlights at idle
- Corroded battery terminals
- Battery more than 3 years old

## Tyre Pressure

Tyre pressure drops in cold weather – approximately 1 PSI for every 6°C drop in temperature. Check your tyre pressures regularly and inflate to the manufacturer's recommended levels. Properly inflated tyres ensure better traction, handling, and fuel economy.

## Coolant System

Ensure your coolant mixture is rated for the lowest temperatures you will encounter. A 50/50 mix of coolant and distilled water typically protects down to about -37°C. Never use plain water in your cooling system.

## Windscreen Care

- Use a quality windscreen washer fluid rated for cold temperatures
- Replace worn wiper blades for clear visibility in winter rain
- Consider applying a rain-repellent treatment to your windscreen

## Lights Check

Shorter days mean more driving in the dark. Check all your lights – headlights, tail lights, brake lights, and indicators – and replace any burnt bulbs.

## Oil and Filters

Winter puts extra strain on your engine. Ensure you are using the correct oil viscosity for cold weather. Your owner's manual will specify the right grade. A fresh oil change before winter is always a good idea.

## Emergency Kit

Keep the following in your car during winter:
- Blanket
- Torch with spare batteries
- Phone charger
- Water and snacks
- Basic tool kit
- First aid kit

## Visit Us

Book a winter health check at Phephetha Auto Centre. We will inspect your battery, tyres, lights, coolant, and brakes to ensure you are winter-ready.`,
  },
}

const defaultPost = {
  title: "Blog Post",
  date: "2024-01-01",
  author: "Phephetha Auto Centre",
  category: "General",
  tags: [],
  readTime: "3 min read",
  excerpt: "",
  content: "Content for this article is coming soon. Check back later for the full article.",
}

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const post = blogPosts[id] || { ...defaultPost, title: `Blog Post: ${id}` }

  const relatedPosts = Object.entries(blogPosts)
    .filter(([key]) => key !== id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
            <ArrowLeftIcon className="size-4" />
            Back to Blog
          </Link>
          <Badge className="mb-4">{post.category}</Badge>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-white sm:text-4xl"
          >
            {post.title}
          </motion.h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <UserIcon className="size-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 mb-8">
          <div className="flex h-full items-center justify-center">
            <TagIcon className="size-12 text-red-600/30" />
          </div>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="prose prose-zinc dark:prose-invert max-w-none"
        >
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-semibold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((l) => l.startsWith("- "))
              return (
                <ul key={i} className="my-4 space-y-2 text-muted-foreground">
                  {items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-600" />
                      {item.replace("- ", "").replace(/\*\*(.*?)\*\*/, (_, m) => m)}
                    </li>
                  ))}
                </ul>
              )
            }
            if (paragraph.match(/^\d\./)) {
              const items = paragraph.split("\n").filter((l) => l.match(/^\d/))
              return (
                <ol key={i} className="my-4 space-y-2 list-decimal pl-5 text-muted-foreground">
                  {items.map((item, j) => (
                    <li key={j}>{item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/, (_, m) => m)}</li>
                  ))}
                </ol>
              )
            }
            const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            return <p key={i} className="my-4 leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: formatted }} />
          })}
        </motion.article>

        <div className="mt-8 flex items-center gap-3">
          <span className="text-sm font-medium">Tags:</span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <Separator className="my-12" />

        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold">Related Articles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map(([key, rp]) => (
                <Link key={key} href={`/blog/${key}`}>
                  <Card className="group h-full transition-all hover:border-red-600/20 hover:shadow-md">
                    <div className="aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-t-xl">
                      <div className="flex h-full items-center justify-center">
                        <TagIcon className="size-6 text-red-600/30" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">{rp.category}</Badge>
                      <h3 className="line-clamp-2 text-sm font-semibold group-hover:text-red-600 transition-colors">
                        {rp.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">{formatDate(rp.date)}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
