import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatCard } from "./stat-card"
import { DollarSign } from "lucide-react"

describe("StatCard", () => {
  it("renders title", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
  })

  it("renders value", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" />)
    expect(screen.getByText("R15,000")).toBeInTheDocument()
  })

  it("renders numeric value", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value={15000} />)
    expect(screen.getByText("15000")).toBeInTheDocument()
  })

  it("shows positive change with green styling", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" change={12} />)
    const changeEl = screen.getByText("12%")
    expect(changeEl).toBeInTheDocument()
    expect(changeEl.className).toContain("text-emerald-600")
  })

  it("shows negative change with red styling", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" change={-8} />)
    const changeEl = screen.getByText("8%")
    expect(changeEl).toBeInTheDocument()
    expect(changeEl.className).toContain("text-red-600")
  })

  it("shows changeLabel when provided", () => {
    render(
      <StatCard
        icon={DollarSign}
        title="Revenue"
        value="R15,000"
        change={12}
        changeLabel="vs last month"
      />
    )
    expect(screen.getByText("vs last month")).toBeInTheDocument()
  })

  it("shows default changeLabel", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" change={12} />)
    expect(screen.getByText("from last period")).toBeInTheDocument()
  })

  it("does not render change when undefined", () => {
    render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" />)
    expect(screen.queryByText("from last period")).not.toBeInTheDocument()
  })

  it("shows zero change with minus icon styling", () => {
    const { container } = render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" change={0} />)
    expect(container.querySelector(".lucide-minus")).toBeInTheDocument()
    const changeSpan = container.querySelector(".font-medium")
    expect(changeSpan).toBeInTheDocument()
  })

  it("renders the icon", () => {
    const { container } = render(<StatCard icon={DollarSign} title="Revenue" value="R15,000" />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })
})
