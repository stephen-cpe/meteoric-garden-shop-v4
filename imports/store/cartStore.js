import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useStore = create(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({
          items: [...state.items, item],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((_, index) => index !== id),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: "cart-storage", // persist cart to localStorage
    },
  ),
)
