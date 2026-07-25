"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUpIcon, TrendingDownIcon, MinusIcon, type LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  className?: string
}

export function StatCard({
  icon: Icon,
  title,
  value,
  change,
  changeLabel,
  className,
}: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="rounded-lg bg-muted p-2">
          <Icon className="size-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 font-medium",
                isPositive && "text-emerald-600",
                isNegative && "text-red-600"
              )}
            >
              {isPositive && <TrendingUpIcon className="size-3" />}
              {isNegative && <TrendingDownIcon className="size-3" />}
              {!isPositive && !isNegative && (
                <MinusIcon className="size-3" />
              )}
              {Math.abs(change)}%
            </span>
            {changeLabel || "from last period"}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
