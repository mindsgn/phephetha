import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark" | "system"

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: Theme
  searchQuery: string
  toggleSidebar: () => void
  collapseSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: Theme) => void
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      theme: "system",
      searchQuery: "",

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      collapseSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

      setTheme: (theme: Theme) => set({ theme }),

      setSearchQuery: (query: string) => set({ searchQuery: query }),
    }),
    {
      name: "ui-storage",
    },
  ),
)
