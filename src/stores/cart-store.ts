import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, CartItem, Coupon } from "@/types"

interface CartState {
  items: CartItem[]
  coupon: Coupon | null
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  getDiscountedTotal: () => number
  applyCoupon: (coupon: Coupon) => void
  removeCoupon: () => void
  isProductInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product: Product, quantity = 1) => {
        const { items } = get()
        const existing = items.find((item) => item.product.id === product.id)
        if (existing) {
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
        } else {
          set({ items: [...items, { product, quantity }] })
        }
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) })
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item,
          ),
        })
      },

      clearCart: () => set({ items: [], coupon: null }),

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getDiscountedTotal: () => {
        const { items, coupon } = get()
        const subtotal = items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        )
        if (!coupon) return subtotal
        if (coupon.discountType === "percentage") {
          return subtotal - (subtotal * coupon.discountValue) / 100
        }
        return Math.max(0, subtotal - coupon.discountValue)
      },

      applyCoupon: (coupon: Coupon) => set({ coupon }),

      removeCoupon: () => set({ coupon: null }),

      isProductInCart: (productId: string) => {
        return get().items.some((item) => item.product.id === productId)
      },

      getItemQuantity: (productId: string) => {
        const item = get().items.find((item) => item.product.id === productId)
        return item?.quantity ?? 0
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
