"use client"

import { useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRightIcon, HomeIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const crumbs: { label: string; href: string }[] = []

  let path = ""
  for (const segment of segments) {
    path += `/${segment}`
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    crumbs.push({ label, href: path })
  }

  return crumbs
}

interface BreadcrumbProps {
  className?: string
  overrides?: { label: string; href?: string }[]
}

export function Breadcrumb({ className, overrides }: BreadcrumbProps) {
  const pathname = usePathname()
  const crumbs = useMemo(
    () => (overrides ? overrides : generateBreadcrumbs(pathname)),
    [pathname, overrides]
  )

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-muted-foreground", className)}>
      <ol className="flex items-center gap-1">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <HomeIcon className="size-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={crumb.href} className="flex items-center gap-1">
              <ChevronRightIcon className="size-3 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href as string}
                  className="transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
