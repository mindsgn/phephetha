"use client"

import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: boolean
  breadcrumbOverrides?: { label: string; href?: string }[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs = true,
  breadcrumbOverrides,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b bg-gradient-to-r from-background via-background to-muted/30 px-6 py-5",
        className
      )}
    >
      {breadcrumbs && (
        <Breadcrumb overrides={breadcrumbOverrides} className="mb-3" />
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}
