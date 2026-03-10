import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Client {
  id: string
  email: string
  password: string
  name: string
  phone: string
  address: string
  createdAt: string
}

interface ClientsStore {
  clients: Client[]
  addClient: (client: Omit<Client, "id" | "createdAt">) => Client
  getClientByEmail: (email: string) => Client | undefined
  authenticateClient: (email: string, password: string) => Client | null
}

// العملاء الافتراضيين
const DEFAULT_CLIENTS: Client[] = [
  {
    id: "C1",
    email: "client1@example.com",
    password: "client123",
    name: "أحمد محمد",
    phone: "01012345678",
    address: "القاهرة، مصر",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
]

export const useClientsStore = create<ClientsStore>()(
  persist(
    (set, get) => ({
      clients: DEFAULT_CLIENTS,

      addClient: (clientData) => {
        const newClient: Client = {
          id: `C${Date.now()}`,
          ...clientData,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          clients: [...state.clients, newClient],
        }))
        return newClient
      },

      getClientByEmail: (email) => {
        return get().clients.find(
          (c) => c.email.toLowerCase() === email.toLowerCase()
        )
      },

      authenticateClient: (email, password) => {
        const client = get().clients.find(
          (c) =>
            c.email.toLowerCase() === email.toLowerCase() &&
            c.password === password
        )
        return client || null
      },
    }),
    {
      name: "clients-storage",
    }
  )
)
