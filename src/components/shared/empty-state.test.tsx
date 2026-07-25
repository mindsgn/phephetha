import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EmptyState } from "./empty-state"

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No items found" />)
    expect(screen.getByText("No items found")).toBeInTheDocument()
  })

  it("renders description when provided", () => {
    render(
      <EmptyState
        title="No items found"
        description="Start by adding some items to your cart"
      />
    )
    expect(screen.getByText("Start by adding some items to your cart")).toBeInTheDocument()
  })

  it("does not render description when not provided", () => {
    render(<EmptyState title="No items" />)
    expect(screen.queryByText("Start by")).not.toBeInTheDocument()
  })

  it("renders action button when provided", () => {
    const onClick = vi.fn()
    render(
      <EmptyState
        title="No items"
        action={{ label: "Add Item", onClick }}
      />
    )
    expect(screen.getByText("Add Item")).toBeInTheDocument()
  })

  it("calls action onClick when button is clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <EmptyState
        title="No items"
        action={{ label: "Add Item", onClick }}
      />
    )
    await user.click(screen.getByText("Add Item"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("does not render action button when not provided", () => {
    render(<EmptyState title="No items" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders with custom icon", () => {
    const CustomIcon = ({ className }: { className?: string }) => (
      <svg className={className} data-testid="custom-icon" />
    )
    render(<EmptyState title="No items" icon={CustomIcon} />)
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
  })
})
