import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { LoadingSpinner } from "./loading-spinner"

describe("LoadingSpinner", () => {
  it("renders with default size", () => {
    const { container } = render(<LoadingSpinner />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders with sm size", () => {
    const { container } = render(<LoadingSpinner size="sm" />)
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg?.className.baseVal).toContain("size-4")
  })

  it("renders with md size", () => {
    const { container } = render(<LoadingSpinner size="md" />)
    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("size-6")
  })

  it("renders with lg size", () => {
    const { container } = render(<LoadingSpinner size="lg" />)
    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("size-8")
  })

  it("renders with xl size", () => {
    const { container } = render(<LoadingSpinner size="xl" />)
    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("size-12")
  })

  it("applies custom className", () => {
    const { container } = render(<LoadingSpinner className="text-red-500" />)
    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("text-red-500")
  })

  it("has animate-spin class", () => {
    const { container } = render(<LoadingSpinner />)
    const svg = container.querySelector("svg")
    expect(svg?.className.baseVal).toContain("animate-spin")
  })
})
