import { describe, it, expect, beforeEach } from "vitest"
import { useWishlistStore } from "./wishlist-store"
import type { Product } from "@/types"

const mockProduct: Product = {
  id: "prod-1",
  name: "Brake Pads",
  description: "High quality brake pads",
  sku: "BRK-001",
  brand: "Bosch",
  category: "Brakes",
  price: 450,
  stock: 25,
  images: [],
  compatibleVehicles: [],
  specifications: {},
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

const mockProduct2: Product = {
  ...mockProduct,
  id: "prod-2",
  name: "Oil Filter",
}

describe("wishlist store", () => {
  beforeEach(() => {
    useWishlistStore.setState({ items: [] })
  })

  describe("initial state", () => {
    it("starts with empty wishlist", () => {
      expect(useWishlistStore.getState().items).toEqual([])
    })
  })

  describe("addItem", () => {
    it("adds a product", () => {
      useWishlistStore.getState().addItem(mockProduct)
      expect(useWishlistStore.getState().items).toHaveLength(1)
      expect(useWishlistStore.getState().items[0].product.id).toBe("prod-1")
    })

    it("does not add duplicate", () => {
      useWishlistStore.getState().addItem(mockProduct)
      useWishlistStore.getState().addItem(mockProduct)
      expect(useWishlistStore.getState().items).toHaveLength(1)
    })

    it("adds different products", () => {
      useWishlistStore.getState().addItem(mockProduct)
      useWishlistStore.getState().addItem(mockProduct2)
      expect(useWishlistStore.getState().items).toHaveLength(2)
    })
  })

  describe("removeItem", () => {
    it("removes an existing item", () => {
      useWishlistStore.getState().addItem(mockProduct)
      useWishlistStore.getState().removeItem("prod-1")
      expect(useWishlistStore.getState().items).toHaveLength(0)
    })

    it("does nothing for non-existent item", () => {
      useWishlistStore.getState().addItem(mockProduct)
      useWishlistStore.getState().removeItem("nonexistent")
      expect(useWishlistStore.getState().items).toHaveLength(1)
    })
  })

  describe("toggleItem", () => {
    it("adds item when not in wishlist", () => {
      useWishlistStore.getState().toggleItem("prod-1")
      expect(useWishlistStore.getState().items).toHaveLength(0)
    })

    it("removes item when already in wishlist", () => {
      useWishlistStore.getState().addItem(mockProduct)
      expect(useWishlistStore.getState().items).toHaveLength(1)
      useWishlistStore.getState().toggleItem("prod-1")
      expect(useWishlistStore.getState().items).toHaveLength(0)
    })
  })

  describe("isInWishlist", () => {
    it("returns true when product is in wishlist", () => {
      useWishlistStore.getState().addItem(mockProduct)
      expect(useWishlistStore.getState().isInWishlist("prod-1")).toBe(true)
    })

    it("returns false when product is not in wishlist", () => {
      expect(useWishlistStore.getState().isInWishlist("prod-1")).toBe(false)
    })
  })

  describe("clearWishlist", () => {
    it("clears all items", () => {
      useWishlistStore.getState().addItem(mockProduct)
      useWishlistStore.getState().addItem(mockProduct2)
      useWishlistStore.getState().clearWishlist()
      expect(useWishlistStore.getState().items).toEqual([])
    })
  })
})
