import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, WishlistItem } from "@/types"

interface WishlistState {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const { items } = get()
        if (items.some((item) => item.product.id === product.id)) return
        set({ items: [...items, { product, addedAt: new Date().toISOString() }] })
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) })
      },

      toggleItem: (productId: string) => {
        const { items } = get()
        if (items.some((item) => item.product.id === productId)) {
          set({ items: items.filter((item) => item.product.id !== productId) })
        } else {
          const product = items.find((item) => item.product.id === productId)?.product
          if (product) {
            set({ items: [...items, { product, addedAt: new Date().toISOString() }] })
          }
        }
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.product.id === productId)
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
