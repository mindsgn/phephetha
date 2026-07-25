import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  cn,
  formatCurrency,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  generateSKU,
  calculateDiscount,
  calculateTax,
  generateOrderNumber,
  generateBookingNumber,
  slugify,
  truncate,
  debounce,
  throttle,
  getInitials,
  calculatePagination,
  isValidEmail,
  isValidPhone,
  generateId,
  groupBy,
  sortBy,
  capitalizeFirst,
  formatFileSize,
  convertToCSV,
  parseCSV,
  classNames,
} from "./utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toContain("foo")
    expect(cn("foo", "bar")).toContain("bar")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toContain("base")
    expect(cn("base", false && "hidden", "extra")).not.toContain("hidden")
  })

  it("deduplicates tailwind classes", () => {
    const result = cn("p-4", "p-8")
    expect(result).toBe("p-8")
  })
})

describe("formatCurrency", () => {
  it("formats ZAR currency", () => {
    const result = formatCurrency(1234.56)
    expect(result).toContain("1")
    expect(result).toContain("234")
    expect(result).toContain("56")
  })

  it("formats zero", () => {
    const result = formatCurrency(0)
    expect(result).toContain("0")
  })

  it("formats negative amounts", () => {
    const result = formatCurrency(-500)
    expect(result).toContain("500")
  })

  it("formats large amounts", () => {
    const result = formatCurrency(1000000)
    expect(result).toContain("1")
    expect(result).toContain("000")
  })

  it("formats with 2 decimal places", () => {
    const result = formatCurrency(10.5)
    expect(result).toContain("5")
  })
})

describe("formatDate", () => {
  it("formats date with default format", () => {
    const result = formatDate(new Date(2024, 0, 15))
    expect(result).toBe("15 Jan 2024")
  })

  it("formats date with custom format", () => {
    const result = formatDate(new Date(2024, 0, 15), "MM/dd/yyyy")
    expect(result).toBe("01/15/2024")
  })

  it("formats date with full month name", () => {
    const result = formatDate(new Date(2024, 0, 15), "dd MMMM yyyy")
    expect(result).toBe("15 January 2024")
  })

  it("handles string input", () => {
    const result = formatDate("2024-06-15", "dd MMM yyyy")
    expect(result).toBe("15 Jun 2024")
  })

  it("formats short year", () => {
    const result = formatDate(new Date(2024, 0, 15), "dd/MM/yy")
    expect(result).toBe("15/01/24")
  })

  it("formats single digit month without padding", () => {
    const result = formatDate(new Date(2024, 0, 5), "d/M/yyyy")
    expect(result).toBe("5/1/2024")
  })
})

describe("formatDateTime", () => {
  it("formats date and time", () => {
    const date = new Date(2024, 0, 15, 14, 30)
    const result = formatDateTime(date)
    expect(result).toContain("15 Jan 2024")
    expect(result).toContain("at")
  })

  it("handles string input", () => {
    const result = formatDateTime("2024-06-15T10:00:00")
    expect(result).toContain("15 Jun 2024")
    expect(result).toContain("at")
  })
})

describe("formatRelativeTime", () => {
  it("returns 'just now' for recent times", () => {
    const now = new Date()
    expect(formatRelativeTime(now)).toBe("just now")
  })

  it("returns minutes ago", () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
    expect(formatRelativeTime(fiveMinAgo)).toBe("5m ago")
  })

  it("returns hours ago", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000)
    expect(formatRelativeTime(threeHoursAgo)).toBe("3h ago")
  })

  it("returns days ago", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(twoDaysAgo)).toBe("2d ago")
  })

  it("returns weeks ago", () => {
    const threeWeeksAgo = new Date(Date.now() - 3 * 7 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(threeWeeksAgo)).toBe("3w ago")
  })

  it("returns months ago", () => {
    const fiveMonthsAgo = new Date(Date.now() - 5 * 30 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(fiveMonthsAgo)).toBe("5mo ago")
  })

  it("returns years ago", () => {
    const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000)
    expect(formatRelativeTime(twoYearsAgo)).toBe("2y ago")
  })

  it("returns 'just now' for future dates", () => {
    const future = new Date(Date.now() + 60 * 1000)
    expect(formatRelativeTime(future)).toBe("just now")
  })
})

describe("generateSKU", () => {
  it("generates correct format", () => {
    const sku = generateSKU("Brakes", "Bosch", "abc123")
    expect(sku).toBe("BRA-BOS-ABC123")
  })

  it("truncates to 3 chars for category and brand", () => {
    const sku = generateSKU("Engine Parts", "Samsung", "xyz789")
    expect(sku).toBe("ENG-SAM-XYZ789")
  })
})

describe("calculateDiscount", () => {
  it("calculates percentage discount", () => {
    expect(calculateDiscount(100, 75)).toBe(25)
  })

  it("returns 0 for zero price", () => {
    expect(calculateDiscount(0, 0)).toBe(0)
  })

  it("calculates 50% discount", () => {
    expect(calculateDiscount(200, 100)).toBe(50)
  })

  it("returns 100 for free item", () => {
    expect(calculateDiscount(100, 0)).toBe(100)
  })
})

describe("calculateTax", () => {
  it("calculates 15% VAT", () => {
    expect(calculateTax(100)).toBe(15)
  })

  it("calculates with custom tax rate", () => {
    expect(calculateTax(100, 0.1)).toBe(10)
  })

  it("rounds to 2 decimal places", () => {
    expect(calculateTax(33.33)).toBe(5)
  })

  it("handles zero amount", () => {
    expect(calculateTax(0)).toBe(0)
  })
})

describe("generateOrderNumber", () => {
  it("starts with ORD-", () => {
    expect(generateOrderNumber()).toMatch(/^ORD-/)
  })

  it("has correct format with two parts", () => {
    const num = generateOrderNumber()
    const parts = num.split("-")
    expect(parts).toHaveLength(3)
  })
})

describe("generateBookingNumber", () => {
  it("starts with BK-", () => {
    expect(generateBookingNumber()).toMatch(/^BK-/)
  })

  it("has correct format with two parts", () => {
    const num = generateBookingNumber()
    const parts = num.split("-")
    expect(parts).toHaveLength(3)
  })
})

describe("slugify", () => {
  it("converts to lowercase with hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world")
  })

  it("removes special characters", () => {
    expect(slugify("Hello! @World#")).toBe("hello-world")
  })

  it("handles multiple spaces", () => {
    expect(slugify("Hello   World")).toBe("hello-world")
  })

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world")
  })

  it("handles underscores as spaces", () => {
    expect(slugify("hello_world")).toBe("hello-world")
  })

  it("handles already slugified text", () => {
    expect(slugify("hello-world")).toBe("hello-world")
  })
})

describe("truncate", () => {
  it("truncates long text", () => {
    expect(truncate("Hello World", 5)).toBe("Hello…")
  })

  it("returns same text if shorter", () => {
    expect(truncate("Hi", 10)).toBe("Hi")
  })

  it("returns same text if exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello")
  })

  it("handles empty string", () => {
    expect(truncate("", 5)).toBe("")
  })
})

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("delays function execution", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it("cancels previous call", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    debounced()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it("passes arguments", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced("arg1", "arg2")
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledWith("arg1", "arg2")
  })
})

describe("throttle", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("calls function immediately on first call", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    expect(fn).toHaveBeenCalledOnce()
  })

  it("throttles subsequent calls", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledOnce()
  })

  it("allows call after limit", () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    vi.advanceTimersByTime(100)
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })
})

describe("getInitials", () => {
  it("returns initials for full name", () => {
    expect(getInitials("John Doe")).toBe("JD")
  })

  it("returns initial for single name", () => {
    expect(getInitials("John")).toBe("J")
  })

  it("returns empty for empty string", () => {
    expect(getInitials("")).toBe("")
  })

  it("takes only first two initials", () => {
    expect(getInitials("John Michael Doe")).toBe("JM")
  })

  it("handles extra spaces", () => {
    expect(getInitials("  John   Doe  ")).toBe("JD")
  })
})

describe("calculatePagination", () => {
  it("calculates pagination correctly", () => {
    const result = calculatePagination(100, 1, 10)
    expect(result.totalPages).toBe(10)
    expect(result.hasNext).toBe(true)
    expect(result.hasPrev).toBe(false)
    expect(result.start).toBe(0)
    expect(result.end).toBe(10)
  })

  it("handles first page", () => {
    const result = calculatePagination(50, 1, 10)
    expect(result.hasPrev).toBe(false)
    expect(result.hasNext).toBe(true)
  })

  it("handles last page", () => {
    const result = calculatePagination(50, 5, 10)
    expect(result.hasPrev).toBe(true)
    expect(result.hasNext).toBe(false)
  })

  it("clamps page below 1", () => {
    const result = calculatePagination(50, 0, 10)
    expect(result.start).toBe(0)
  })

  it("clamps page above total", () => {
    const result = calculatePagination(50, 100, 10)
    expect(result.end).toBe(50)
  })

  it("handles zero total", () => {
    const result = calculatePagination(0, 1, 10)
    expect(result.totalPages).toBe(0)
    expect(result.start).toBe(0)
    expect(result.end).toBe(0)
  })

  it("handles perPage larger than total", () => {
    const result = calculatePagination(5, 1, 10)
    expect(result.totalPages).toBe(1)
    expect(result.end).toBe(5)
  })
})

describe("isValidEmail", () => {
  it("accepts valid emails", () => {
    expect(isValidEmail("test@example.com")).toBe(true)
    expect(isValidEmail("user.name@domain.co.za")).toBe(true)
    expect(isValidEmail("user+tag@example.com")).toBe(true)
  })

  it("rejects invalid emails", () => {
    expect(isValidEmail("")).toBe(false)
    expect(isValidEmail("notanemail")).toBe(false)
    expect(isValidEmail("@domain.com")).toBe(false)
    expect(isValidEmail("user@")).toBe(false)
    expect(isValidEmail("user @domain.com")).toBe(false)
  })
})

describe("isValidPhone", () => {
  it("accepts valid phones", () => {
    expect(isValidPhone("+27123456789")).toBe(true)
    expect(isValidPhone("0123456789")).toBe(true)
    expect(isValidPhone("+27 12 345 6789")).toBe(true)
    expect(isValidPhone("(012) 345-6789")).toBe(true)
  })

  it("rejects invalid phones", () => {
    expect(isValidPhone("")).toBe(false)
    expect(isValidPhone("123")).toBe(false)
    expect(isValidPhone("abc")).toBe(false)
  })
})

describe("generateId", () => {
  it("generates unique ids", () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
  })

  it("generates non-empty string", () => {
    expect(generateId().length).toBeGreaterThan(0)
  })
})

describe("groupBy", () => {
  it("groups items by key", () => {
    const items = [
      { type: "a", value: 1 },
      { type: "b", value: 2 },
      { type: "a", value: 3 },
    ]
    const grouped = groupBy(items, "type")
    expect(grouped.a).toHaveLength(2)
    expect(grouped.b).toHaveLength(1)
  })

  it("handles empty array", () => {
    expect(groupBy([], "key")).toEqual({})
  })
})

describe("sortBy", () => {
  it("sorts ascending", () => {
    const items = [{ name: "c" }, { name: "a" }, { name: "b" }]
    const sorted = sortBy(items, "name", "asc")
    expect(sorted.map((i) => i.name)).toEqual(["a", "b", "c"])
  })

  it("sorts descending", () => {
    const items = [{ name: "c" }, { name: "a" }, { name: "b" }]
    const sorted = sortBy(items, "name", "desc")
    expect(sorted.map((i) => i.name)).toEqual(["c", "b", "a"])
  })

  it("does not mutate original array", () => {
    const items = [{ name: "c" }, { name: "a" }]
    sortBy(items, "name", "asc")
    expect(items[0].name).toBe("c")
  })
})

describe("capitalizeFirst", () => {
  it("capitalizes first letter", () => {
    expect(capitalizeFirst("hello")).toBe("Hello")
  })

  it("handles empty string", () => {
    expect(capitalizeFirst("")).toBe("")
  })

  it("handles already capitalized", () => {
    expect(capitalizeFirst("Hello")).toBe("Hello")
  })

  it("handles single character", () => {
    expect(capitalizeFirst("a")).toBe("A")
  })
})

describe("formatFileSize", () => {
  it("formats 0 bytes", () => {
    expect(formatFileSize(0)).toBe("0 B")
  })

  it("formats bytes", () => {
    expect(formatFileSize(500)).toBe("500 B")
  })

  it("formats kilobytes", () => {
    expect(formatFileSize(1024)).toContain("KB")
  })

  it("formats megabytes", () => {
    expect(formatFileSize(1048576)).toContain("MB")
  })

  it("formats gigabytes", () => {
    expect(formatFileSize(1073741824)).toContain("GB")
  })
})

describe("convertToCSV", () => {
  it("converts data to CSV", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ]
    const csv = convertToCSV(data, ["name", "age"])
    expect(csv).toBe("name,age\nJohn,30\nJane,25")
  })

  it("handles values with commas", () => {
    const data = [{ name: "Doe, John", age: 30 }]
    const csv = convertToCSV(data, ["name", "age"])
    expect(csv).toContain('"Doe, John"')
  })

  it("handles empty data", () => {
    const csv = convertToCSV([], ["name"])
    expect(csv).toBe("name")
  })

  it("handles values with quotes", () => {
    const data = [{ name: 'Say "hello"', age: 30 }]
    const csv = convertToCSV(data, ["name", "age"])
    expect(csv).toContain('"Say ""hello"""')
  })
})

describe("parseCSV", () => {
  it("parses CSV text", () => {
    const csv = "name,age\nJohn,30\nJane,25"
    const rows = parseCSV(csv)
    expect(rows).toEqual([
      ["name", "age"],
      ["John", "30"],
      ["Jane", "25"],
    ])
  })

  it("handles quoted values", () => {
    const csv = 'name,desc\nJohn,"Hello, World"'
    const rows = parseCSV(csv)
    expect(rows[1][1]).toBe("Hello, World")
  })

  it("handles empty lines", () => {
    const csv = "name,age\n\nJohn,30\n"
    const rows = parseCSV(csv)
    expect(rows).toHaveLength(2)
  })
})

describe("classNames", () => {
  it("joins class names", () => {
    expect(classNames("foo", "bar")).toBe("foo bar")
  })

  it("filters falsy values", () => {
    expect(classNames("foo", false, null, undefined, "bar")).toBe("foo bar")
  })

  it("handles empty input", () => {
    expect(classNames()).toBe("")
  })
})
