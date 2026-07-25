import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ProductCard } from "./product-card"
import type { Product } from "@/types"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial: _i, animate: _a, transition: _t, whileHover: _wh, ...rest } = props
      return <div {...rest}>{children}</div>
    },
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => {
      const { initial: _i, animate: _a, transition: _t, exit: _e, ...rest } = props
      return <span {...rest}>{children}</span>
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const mockProduct: Product = {
  id: "prod-1",
  name: "Premium Brake Pads",
  description: "High quality brake pads for your vehicle",
  sku: "BRK-001",
  brand: "Bosch",
  category: "Brakes",
  price: 450,
  stock: 25,
  images: ["https://example.com/brake-pads.jpg"],
  compatibleVehicles: ["Toyota Corolla"],
  specifications: { Material: "Ceramic" },
  rating: 4.5,
  reviewCount: 12,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

const mockSaleProduct: Product = {
  ...mockProduct,
  id: "prod-2",
  salePrice: 350,
}

const mockOutOfStockProduct: Product = {
  ...mockProduct,
  id: "prod-3",
  stock: 0,
}

const mockNoImageProduct: Product = {
  ...mockProduct,
  id: "prod-4",
  images: [],
}

const mockFeaturedProduct: Product = {
  ...mockProduct,
  id: "prod-5",
  featured: true,
}

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders product name", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("Premium Brake Pads")).toBeInTheDocument()
  })

  it("renders product brand", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("Bosch")).toBeInTheDocument()
  })

  it("renders product price", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText(/450/)).toBeInTheDocument()
  })

  it("renders sale price with discount badge", () => {
    render(<ProductCard product={mockSaleProduct} />)
    expect(screen.getByText(/350/)).toBeInTheDocument()
    expect(screen.getByText(/22%/)).toBeInTheDocument()
  })

  it("renders out of stock badge", () => {
    render(<ProductCard product={mockOutOfStockProduct} />)
    expect(screen.getByText("Out of Stock")).toBeInTheDocument()
  })

  it("renders featured badge", () => {
    render(<ProductCard product={mockFeaturedProduct} />)
    expect(screen.getByText("Featured")).toBeInTheDocument()
  })

  it("renders product image with correct src", () => {
    render(<ProductCard product={mockProduct} />)
    const img = screen.getByRole("img", { name: "Premium Brake Pads" })
    expect(img).toHaveAttribute("src", "https://example.com/brake-pads.jpg")
  })

  it("renders no image text when images array is empty", () => {
    render(<ProductCard product={mockNoImageProduct} />)
    expect(screen.getByText("No Image")).toBeInTheDocument()
  })

  it("renders star rating", () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText("(12)")).toBeInTheDocument()
  })

  it("links to product detail page", () => {
    render(<ProductCard product={mockProduct} />)
    const links = screen.getAllByRole("link")
    const productLink = links.find((l) => l.getAttribute("href") === "/shop/prod-1")
    expect(productLink).toBeDefined()
  })
})
