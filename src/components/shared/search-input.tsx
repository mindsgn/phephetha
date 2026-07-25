"use client"

import { useCallback, useEffect, useState } from "react"
import { SearchIcon, XIcon, Loader2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  debounceMs?: number
  loading?: boolean
  className?: string
}

export function SearchInput({
  value: controlledValue,
  onChange,
  placeholder = "Search...",
  debounceMs = 300,
  loading = false,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? "")
  const [debouncing, setDebouncing] = useState(false)

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue)
    }
  }, [controlledValue])

  useEffect(() => {
    if (!onChange) return
    setDebouncing(true)
    const timer = setTimeout(() => {
      onChange(internalValue)
      setDebouncing(false)
    }, debounceMs)
    return () => clearTimeout(timer)
  }, [internalValue, debounceMs, onChange])

  const handleClear = useCallback(() => {
    setInternalValue("")
    onChange?.("")
  }, [onChange])

  return (
    <div className={cn("relative", className)}>
      <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        placeholder={placeholder}
        className="h-9 pl-8 pr-8"
      />
      {(internalValue || loading) && (
        <div className="absolute right-1 top-1/2 -translate-y-1/2">
          {loading || debouncing ? (
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          ) : (
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              className="size-6"
            >
              <XIcon className="size-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
