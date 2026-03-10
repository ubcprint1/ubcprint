import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useEffect, useState } from "react"

export interface ClientUser {
  id: string
  email: string
  name: string
  phone?: string
}

interface ClientAuthState {
  user: ClientUser | null
  isLoggedIn: boolean
  _hasHydrated: boolean
  login: (user: ClientUser) => void
  logout: () => void
  updateUser: (data: Partial<ClientUser>) => void
  setHasHydrated: (state: boolean) => void
}

export const useClientAuthStore = create<ClientAuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      _hasHydrated: false,
      login: (user) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "client-auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)

// Hook لاستخدام الحالة بعد التهيئة فقط
export const useClientAuth = () => {
  const store = useClientAuthStore()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return {
    ...store,
    isHydrated,
    // استخدم القيم الفعلية فقط بعد التهيئة
    isLoggedIn: isHydrated ? store.isLoggedIn : false,
    user: isHydrated ? store.user : null,
  }
}
