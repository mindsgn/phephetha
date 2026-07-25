"use client"

import { useState } from "react"
import { SlidersHorizontal, X, Star, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterState {
  categories: string[]
  brands: string[]
  minPrice: string
  maxPrice: string
  inStockOnly: boolean
  minRating: number
}

interface ProductFiltersProps {
  categories: { name: string; count: number }[]
  brands: { name: string; count: number }[]
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

function FilterContent({ categories, brands, filters, onFilterChange }: ProductFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: unknown) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "categories" | "brands", value: string) => {
    const current = filters[key]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  const clearAll = () => {
    onFilterChange({
      categories: [],
      brands: [],
      minPrice: "",
      maxPrice: "",
      inStockOnly: false,
      minRating: 0,
    })
  }

  const hasFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.inStockOnly ||
    filters.minRating > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <RotateCcw className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Category</h4>
        {categories.map((cat) => (
          <label
            key={cat.name}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={filters.categories.includes(cat.name)}
              onCheckedChange={() => toggleArrayFilter("categories", cat.name)}
            />
            <span className="flex-1">{cat.name}</span>
            <span className="text-xs text-muted-foreground">({cat.count})</span>
          </label>
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Brand</h4>
        {brands.map((brand) => (
          <label
            key={brand.name}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={filters.brands.includes(brand.name)}
              onCheckedChange={() => toggleArrayFilter("brands", brand.name)}
            />
            <span className="flex-1">{brand.name}</span>
            <span className="text-xs text-muted-foreground">({brand.count})</span>
          </label>
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Price Range</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
            className="h-8"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
            className="h-8"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Rating</h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilter("minRating", filters.minRating === rating ? 0 : rating)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                filters.minRating === rating ? "text-amber-500" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-300 dark:text-neutral-600"
                    }`}
                  />
                ))}
              </div>
              <span>& up</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Availability</h4>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => updateFilter("inStockOnly", !!checked)}
          />
          In Stock Only
        </label>
      </div>
    </div>
  )
}

export function ProductFilters(props: ProductFiltersProps) {
  return (
    <>
      <div className="hidden lg:block">
        <FilterContent {...props} />
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="sm" />}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            Filters
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto flex-1 p-4">
              <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
