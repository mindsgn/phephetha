import { Metadata } from "next"
import {
  ShieldCheckIcon,
  HeartIcon,
  AwardIcon,
  UsersIcon,
  WrenchIcon,
  ClockIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Us | Phephetha Auto Centre",
  description: "Learn about Phephetha Auto Centre - your trusted automotive service partner since 2009.",
}

const values = [
  { icon: ShieldCheckIcon, title: "Integrity", description: "Transparent pricing and honest recommendations. We only sell what you need." },
  { icon: AwardIcon, title: "Excellence", description: "Certified technicians using the latest tools and genuine quality parts." },
  { icon: HeartIcon, title: "Customer First", description: "Every decision we make is driven by what is best for our customers." },
  { icon: ThumbsUpIcon, title: "Quality", description: "We stand behind our work with comprehensive warranties on all services and parts." },
]

const team = [
  { name: "John Mokoena", role: "Founder & Director", description: "25+ years in the automotive industry. Passionate about delivering honest, professional service." },
  { name: "Sipho Ndlovu", role: "Workshop Manager", description: "ASE Master Certified with 15 years of experience across all major vehicle brands." },
  { name: "Anna van Zyl", role: "Parts Manager", description: "Expert in sourcing OEM and aftermarket parts with deep supplier relationships." },
  { name: "David Khumalo", role: "Lead Technician", description: "Specializes in European and Asian vehicle diagnostics and engine repairs." },
]

const milestones = [
  { year: "2009", event: "Phephetha Auto Centre founded with a 2-bay workshop" },
  { year: "2013", event: "Expanded to 6 service bays and launched parts retail" },
  { year: "2017", event: "Became an authorised service centre for major brands" },
  { year: "2020", event: "Launched online parts store and booking system" },
  { year: "2024", event: "Expanded to a state-of-the-art 12-bay facility" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-500 mb-2">About Us</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our <span className="text-red-600">Story</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Building trust through quality automotive care since 2009.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Trusted Automotive <span className="text-red-600">Partner</span>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2009, Phephetha Auto Centre began as a small workshop with a big dream:
                to provide honest, high-quality automotive service to our community. What started with
                two service bays and a passion for cars has grown into one of Pretoria&apos;s most trusted
                automotive service centres.
              </p>
              <p>
                Today, our state-of-the-art facility houses 12 fully equipped service bays, a comprehensive
                parts store, and a team of certified technicians who share our commitment to excellence.
                We service all makes and models, from everyday commuters to performance vehicles.
              </p>
              <p>
                Our mission is simple: deliver the best automotive care experience through skilled
                technicians, quality parts, transparent pricing, and genuine customer service.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <WrenchIcon className="mx-auto size-16 text-red-600/40" />
                  <p className="mt-4 text-sm text-muted-foreground">Workshop Photo</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-red-600 p-6 text-white shadow-xl">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-white/80">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Our <span className="text-red-600">Values</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="mx-auto size-10 text-red-600" />
                  <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Meet Our <span className="text-red-600">Team</span>
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="group overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                  <div className="flex h-full items-center justify-center">
                    <div className="size-20 rounded-full bg-red-600/10 flex items-center justify-center">
                      <UsersIcon className="size-8 text-red-600/50" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-red-600">{member.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center text-white">
            Our <span className="text-red-600">Journey</span>
          </h2>
          <div className="mt-10 space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px flex-1 bg-zinc-800" />}
                </div>
                <div className="pb-8">
                  <p className="font-semibold text-white">{m.year}</p>
                  <p className="text-sm text-zinc-400">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Certifications & <span className="text-red-600">Partners</span>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["AA Approved", "MIOSA Member", "Bosch Service Partner", "Castrol Recommended"].map((cert) => (
              <div key={cert} className="flex flex-col items-center rounded-xl border bg-card p-6 text-center">
                <AwardIcon className="size-10 text-red-600" />
                <p className="mt-3 text-sm font-semibold">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
