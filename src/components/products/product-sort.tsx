"use client"

import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "rating"
  | "name-asc"

interface ProductSortProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top Rated" },
  { value: "name-asc", label: "Name A-Z" },
]

export function ProductSort({ value, onChange }: ProductSortProps) {
  const currentLabel = sortOptions.find((o) => o.value === value)?.label ?? "Sort"

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
      <div className="relative group">
        <Button variant="outline" size="sm" className="min-w-[140px] justify-between">
          {currentLabel}
        </Button>
        <div className="absolute right-0 top-full z-10 mt-1 hidden w-48 rounded-lg border bg-popover py-1 shadow-lg group-hover:block">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                value === option.value
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
