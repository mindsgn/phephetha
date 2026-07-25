import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = "ZAR"): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string, format = "dd MMM yyyy"): string {
  const d = typeof date === "string" ? new Date(date) : date
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]
  const fullMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  const day = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()

  return format
    .replace("dd", String(day).padStart(2, "0"))
    .replace("d", String(day))
    .replace("MMMM", fullMonths[month])
    .replace("MMM", months[month])
    .replace("MM", String(month + 1).padStart(2, "0"))
    .replace("M", String(month + 1))
    .replace("yyyy", String(year))
    .replace("yy", String(year).slice(-2))
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return `${formatDate(d, "dd MMM yyyy")} at ${d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}`
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  if (diffSec < 0) return "just now"
  if (diffSec < 60) return "just now"
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffHour < 24) return `${diffHour}h ago`
  if (diffDay < 7) return `${diffDay}d ago`
  if (diffWeek < 4) return `${diffWeek}w ago`
  if (diffMonth < 12) return `${diffMonth}mo ago`
  return `${diffYear}y ago`
}

export function generateSKU(category: string, brand: string, id: string): string {
  const cat = category.slice(0, 3).toUpperCase()
  const br = brand.slice(0, 3).toUpperCase()
  const unique = id.slice(-6).toUpperCase()
  return `${cat}-${br}-${unique}`
}

export function calculateDiscount(price: number, salePrice: number): number {
  if (price <= 0) return 0
  return Math.round(((price - salePrice) / price) * 100)
}

export function calculateTax(amount: number, taxRate = 0.15): number {
  return Math.round(amount * taxRate * 100) / 100
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function generateBookingNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `BK-${timestamp}-${random}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + "…"
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      lastCall = now
      fn(...args)
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        lastCall = Date.now()
        fn(...args)
      }, limit - (now - lastCall))
    }
  }
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function calculatePagination(
  total: number,
  page: number,
  perPage: number,
): { totalPages: number; hasNext: boolean; hasPrev: boolean; start: number; end: number } {
  const totalPages = Math.ceil(total / perPage)
  const safePage = Math.max(1, Math.min(page, totalPages || 1))
  const start = (safePage - 1) * perPage
  const end = Math.min(start + perPage, total)
  return {
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
    start,
    end,
  }
}

export function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ")
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone)
}

export function generateId(): string {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key])
      if (!groups[groupKey]) groups[groupKey] = []
      groups[groupKey].push(item)
      return groups
    },
    {} as Record<string, T[]>,
  )
}

export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc",
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return direction === "asc" ? -1 : 1
    if (aVal > bVal) return direction === "asc" ? 1 : -1
    return 0
  })
}

export function capitalizeFirst(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const size = bytes / Math.pow(1024, i)
  return `${size.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}

export function convertToCSV<T>(data: T[], headers: string[]): string {
  const rows = data.map((row) =>
    headers
      .map((h) => {
        const val = String((row as Record<string, unknown>)[h] ?? "")
        return val.includes(",") || val.includes('"') || val.includes("\n")
          ? `"${val.replace(/"/g, '""')}"`
          : val
      })
      .join(","),
  )
  return [headers.join(","), ...rows].join("\n")
}

export function parseCSV(text: string): string[][] {
  const lines = text.split("\n").filter((line) => line.trim())
  return lines.map((line) => {
    const row: string[] = []
    let current = ""
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          current += '"'
          i++
        } else if (ch === '"') {
          inQuotes = false
        } else {
          current += ch
        }
      } else if (ch === '"') {
        inQuotes = true
      } else if (ch === ",") {
        row.push(current)
        current = ""
      } else {
        current += ch
      }
    }
    row.push(current)
    return row
  })
}
