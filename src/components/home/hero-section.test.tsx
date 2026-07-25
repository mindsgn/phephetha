import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroSection } from "./hero-section"

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...filterMotionProps(props)}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...filterMotionProps(props)}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...filterMotionProps(props)}>{children}</p>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...filterMotionProps(props)}>{children}</span>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

function filterMotionProps(props: Record<string, unknown>) {
  const { initial: _i, animate: _a, transition: _t, whileHover: _wh, ...rest } = props
  return rest
}

describe("HeroSection", () => {
  it("renders the main headline", () => {
    render(<HeroSection />)
    expect(screen.getByText("Premium Auto", { exact: false })).toBeInTheDocument()
    expect(screen.getByText("Service")).toBeInTheDocument()
    expect(screen.getByText("& Parts", { exact: false })).toBeInTheDocument()
  })

  it("renders book service CTA", () => {
    render(<HeroSection />)
    expect(screen.getByText("Book Service")).toBeInTheDocument()
  })

  it("renders shop parts CTA", () => {
    render(<HeroSection />)
    expect(screen.getByText("Shop Parts")).toBeInTheDocument()
  })

  it("renders trust badge", () => {
    render(<HeroSection />)
    expect(screen.getByText("Trusted Since 2009")).toBeInTheDocument()
  })

  it("renders all stats", () => {
    render(<HeroSection />)
    expect(screen.getByText("15+")).toBeInTheDocument()
    expect(screen.getByText("Years Experience")).toBeInTheDocument()
    expect(screen.getByText("50,000+")).toBeInTheDocument()
    expect(screen.getByText("Parts Available")).toBeInTheDocument()
    expect(screen.getByText("10,000+")).toBeInTheDocument()
    expect(screen.getByText("Happy Customers")).toBeInTheDocument()
    expect(screen.getByText("24/7")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })

  it("renders CTA links with correct hrefs", () => {
    render(<HeroSection />)
    const bookLink = screen.getByText("Book Service").closest("a")
    expect(bookLink?.getAttribute("href")).toBe("/services")
    const shopLink = screen.getByText("Shop Parts").closest("a")
    expect(shopLink?.getAttribute("href")).toBe("/parts")
  })

  it("renders description text", () => {
    render(<HeroSection />)
    expect(screen.getByText(/Expert automotive care/)).toBeInTheDocument()
  })
})
