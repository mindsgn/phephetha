import { describe, it, expect, beforeEach } from "vitest"
import { useCartStore } from "./cart-store"
import type { Product, Coupon } from "@/types"

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
  rating: 4.5,
  reviewCount: 12,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

const mockProduct2: Product = {
  ...mockProduct,
  id: "prod-2",
  name: "Oil Filter",
  price: 150,
}

const mockCoupon: Coupon = {
  id: "coupon-1",
  code: "SAVE10",
  discountType: "percentage",
  discountValue: 10,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

const mockFixedCoupon: Coupon = {
  id: "coupon-2",
  code: "FLAT50",
  discountType: "fixed",
  discountValue: 50,
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

describe("cart store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], coupon: null })
  })

  describe("initial state", () => {
    it("starts with empty cart", () => {
      const state = useCartStore.getState()
      expect(state.items).toEqual([])
      expect(state.coupon).toBeNull()
    })
  })

  describe("addItem", () => {
    it("adds a new item", () => {
      useCartStore.getState().addItem(mockProduct)
      const items = useCartStore.getState().items
      expect(items).toHaveLength(1)
      expect(items[0].product.id).toBe("prod-1")
      expect(items[0].quantity).toBe(1)
    })

    it("adds with custom quantity", () => {
      useCartStore.getState().addItem(mockProduct, 3)
      expect(useCartStore.getState().items[0].quantity).toBe(3)
    })

    it("increases quantity for existing item", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct, 2)
      const items = useCartStore.getState().items
      expect(items).toHaveLength(1)
      expect(items[0].quantity).toBe(3)
    })

    it("adds multiple different products", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)
      expect(useCartStore.getState().items).toHaveLength(2)
    })
  })

  describe("removeItem", () => {
    it("removes an existing item", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().removeItem("prod-1")
      expect(useCartStore.getState().items).toHaveLength(0)
    })

    it("does nothing for non-existent item", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().removeItem("nonexistent")
      expect(useCartStore.getState().items).toHaveLength(1)
    })
  })

  describe("updateQuantity", () => {
    it("updates quantity", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().updateQuantity("prod-1", 5)
      expect(useCartStore.getState().items[0].quantity).toBe(5)
    })

    it("removes item when quantity is 0", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().updateQuantity("prod-1", 0)
      expect(useCartStore.getState().items).toHaveLength(0)
    })

    it("removes item when quantity is negative", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().updateQuantity("prod-1", -1)
      expect(useCartStore.getState().items).toHaveLength(0)
    })
  })

  describe("clearCart", () => {
    it("clears all items and coupon", () => {
      useCartStore.getState().addItem(mockProduct)
      useCartStore.getState().addItem(mockProduct2)
      useCartStore.getState().applyCoupon(mockCoupon)
      useCartStore.getState().clearCart()
      const state = useCartStore.getState()
      expect(state.items).toEqual([])
      expect(state.coupon).toBeNull()
    })
  })

  describe("getTotal", () => {
    it("calculates total for multiple items", () => {
      useCartStore.getState().addItem(mockProduct, 2)
      useCartStore.getState().addItem(mockProduct2, 3)
      const total = useCartStore.getState().getTotal()
      expect(total).toBe(450 * 2 + 150 * 3)
    })

    it("returns 0 for empty cart", () => {
      expect(useCartStore.getState().getTotal()).toBe(0)
    })
  })

  describe("getItemCount", () => {
    it("counts total items", () => {
      useCartStore.getState().addItem(mockProduct, 2)
      useCartStore.getState().addItem(mockProduct2, 3)
      expect(useCartStore.getState().getItemCount()).toBe(5)
    })

    it("returns 0 for empty cart", () => {
      expect(useCartStore.getState().getItemCount()).toBe(0)
    })
  })

  describe("applyCoupon", () => {
    it("applies coupon", () => {
      useCartStore.getState().applyCoupon(mockCoupon)
      expect(useCartStore.getState().coupon).toEqual(mockCoupon)
    })

    it("overwrites previous coupon", () => {
      useCartStore.getState().applyCoupon(mockCoupon)
      useCartStore.getState().applyCoupon(mockFixedCoupon)
      expect(useCartStore.getState().coupon?.code).toBe("FLAT50")
    })
  })

  describe("removeCoupon", () => {
    it("removes coupon", () => {
      useCartStore.getState().applyCoupon(mockCoupon)
      useCartStore.getState().removeCoupon()
      expect(useCartStore.getState().coupon).toBeNull()
    })
  })

  describe("getDiscountedTotal", () => {
    it("returns subtotal without coupon", () => {
      useCartStore.getState().addItem(mockProduct, 2)
      expect(useCartStore.getState().getDiscountedTotal()).toBe(900)
    })

    it("applies percentage discount", () => {
      useCartStore.getState().addItem(mockProduct, 2)
      useCartStore.getState().applyCoupon(mockCoupon)
      expect(useCartStore.getState().getDiscountedTotal()).toBe(810)
    })

    it("applies fixed discount", () => {
      useCartStore.getState().addItem(mockProduct, 2)
      useCartStore.getState().applyCoupon(mockFixedCoupon)
      expect(useCartStore.getState().getDiscountedTotal()).toBe(850)
    })

    it("does not go below 0 with fixed discount", () => {
      useCartStore.getState().addItem(mockProduct2, 1)
      const bigCoupon: Coupon = {
        ...mockFixedCoupon,
        discountValue: 999,
      }
      useCartStore.getState().applyCoupon(bigCoupon)
      expect(useCartStore.getState().getDiscountedTotal()).toBe(0)
    })
  })

  describe("isProductInCart", () => {
    it("returns true when product is in cart", () => {
      useCartStore.getState().addItem(mockProduct)
      expect(useCartStore.getState().isProductInCart("prod-1")).toBe(true)
    })

    it("returns false when product is not in cart", () => {
      expect(useCartStore.getState().isProductInCart("prod-1")).toBe(false)
    })
  })

  describe("getItemQuantity", () => {
    it("returns quantity of item in cart", () => {
      useCartStore.getState().addItem(mockProduct, 5)
      expect(useCartStore.getState().getItemQuantity("prod-1")).toBe(5)
    })

    it("returns 0 for item not in cart", () => {
      expect(useCartStore.getState().getItemQuantity("prod-1")).toBe(0)
    })
  })
})
