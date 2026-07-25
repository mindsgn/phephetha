import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { CartItem } from "./cart-item"
import type { CartItem as CartItemType } from "@/types"

const mockUpdateQuantity = vi.fn()
const mockRemoveItem = vi.fn()

vi.mock("@/stores/cart-store", () => ({
  useCartStore: vi.fn(() => ({
    updateQuantity: mockUpdateQuantity,
    removeItem: mockRemoveItem,
  })),
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial: _i, animate: _a, exit: _e, layout: _l, ...rest } = props
      return <div {...rest}>{children}</div>
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockCartItem: CartItemType = {
  product: {
    id: "prod-1",
    name: "Brake Pads",
    description: "High quality brake pads",
    sku: "BRK-001",
    brand: "Bosch",
    category: "Brakes",
    price: 450,
    stock: 25,
    images: ["https://example.com/brake-pads.jpg"],
    compatibleVehicles: [],
    specifications: {},
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  quantity: 2,
}

describe("CartItem", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders product name", () => {
    render(<CartItem item={mockCartItem} />)
    expect(screen.getByText("Brake Pads")).toBeInTheDocument()
  })

  it("renders product brand", () => {
    render(<CartItem item={mockCartItem} />)
    expect(screen.getByText("Bosch")).toBeInTheDocument()
  })

  it("renders product image", () => {
    render(<CartItem item={mockCartItem} />)
    const img = screen.getByRole("img", { name: "Brake Pads" })
    expect(img).toHaveAttribute("src", "https://example.com/brake-pads.jpg")
  })

  it("renders correct quantity", () => {
    render(<CartItem item={mockCartItem} />)
    const input = screen.getByRole("spinbutton")
    expect(input).toHaveValue(2)
  })

  it("renders correct line total", () => {
    render(<CartItem item={mockCartItem} />)
    expect(screen.getByText(/900/)).toBeInTheDocument()
  })

  it("calls removeItem when delete button is clicked", async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockCartItem} />)
    const buttons = screen.getAllByRole("button")
    const removeButton = buttons[0]
    await user.click(removeButton)
    expect(mockRemoveItem).toHaveBeenCalledWith("prod-1")
  })

  it("calls updateQuantity when plus is clicked", async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockCartItem} />)
    const buttons = screen.getAllByRole("button")
    const plusButton = buttons[2]
    await user.click(plusButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith("prod-1", 3)
  })

  it("calls updateQuantity when minus is clicked", async () => {
    const user = userEvent.setup()
    render(<CartItem item={mockCartItem} />)
    const buttons = screen.getAllByRole("button")
    const minusButton = buttons[1]
    await user.click(minusButton)
    expect(mockUpdateQuantity).toHaveBeenCalledWith("prod-1", 1)
  })

  it("disables minus button when quantity is 1", () => {
    const singleItem: CartItemType = { ...mockCartItem, quantity: 1 }
    render(<CartItem item={singleItem} />)
    const buttons = screen.getAllByRole("button")
    const minusButton = buttons[1]
    expect(minusButton).toBeDisabled()
  })

  it("shows No Image when product has no images", () => {
    const noImageItem: CartItemType = {
      ...mockCartItem,
      product: { ...mockCartItem.product, images: [] },
    }
    render(<CartItem item={noImageItem} />)
    expect(screen.getByText("No Image")).toBeInTheDocument()
  })
})
