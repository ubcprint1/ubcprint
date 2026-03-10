"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FinancialTransaction {
  id: string
  type: "invoice" | "expense" | "salary" | "commission" | "purchase" | "revenue"
  amount: number
  date: string
  description: string
  relatedTo: {
    entityType: "customer" | "supplier" | "employee" | "product" | "service" | "machine"
    entityId: string
    entityName: string
  }
  status: "pending" | "completed" | "cancelled"
  createdBy: string
  createdAt: string
  updatedAt: string
  metadata?: Record<string, any>
}

export interface AuditLog {
  id: string
  transactionId: string
  field: string
  oldValue: any
  newValue: any
  changedBy: string
  changedAt: string
  reason?: string
}

export interface Product {
  id: string
  name: string
  basePrice: number
  costPrice: number
  category: string
  priceHistory: Array<{
    price: number
    date: string
    changedBy: string
  }>
}

export interface Service {
  id: string
  name: string
  basePrice: number
  category: string
  machineId?: string
  priceHistory: Array<{
    price: number
    date: string
    changedBy: string
  }>
}

interface FinancialState {
  // المعاملات المالية
  transactions: FinancialTransaction[]
  auditLogs: AuditLog[]

  // المنتجات والخدمات
  products: Product[]
  services: Service[]

  // الإعدادات
  settings: {
    currency: string
    decimalPlaces: number
    roundingMethod: "up" | "down" | "nearest"
  }

  // الإجراءات
  addTransaction: (transaction: Omit<FinancialTransaction, "id" | "createdAt" | "updatedAt">) => string
  updateTransaction: (id: string, updates: Partial<FinancialTransaction>, changedBy: string, reason?: string) => void
  deleteTransaction: (id: string, changedBy: string, reason?: string) => void

  addProduct: (product: Omit<Product, "id" | "priceHistory">) => string
  updateProductPrice: (id: string, newPrice: number, changedBy: string) => void

  addService: (service: Omit<Service, "id" | "priceHistory">) => string
  updateServicePrice: (id: string, newPrice: number, changedBy: string) => void

  // الحسابات التلقائية
  getTotalRevenue: (startDate?: string, endDate?: string) => number
  getTotalExpenses: (startDate?: string, endDate?: string) => number
  getTotalCosts: (startDate?: string, endDate?: string) => number
  getTotalProfit: (startDate?: string, endDate?: string) => number
  getTransactionsByEntity: (entityType: string, entityId: string) => FinancialTransaction[]
  getAuditTrail: (transactionId: string) => AuditLog[]

  // التحقق من التناسق
  validateConsistency: () => { valid: boolean; errors: string[] }
}

const generateId = () => `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const useFinancialStore = create<FinancialState>()(
  persist(
    (set, get) => ({
      transactions: [],
      auditLogs: [],
      products: [],
      services: [],
      settings: {
        currency: "ج.م",
        decimalPlaces: 2,
        roundingMethod: "nearest",
      },

      addTransaction: (transaction) => {
        const id = generateId()
        const now = new Date().toISOString()

        const newTransaction: FinancialTransaction = {
          ...transaction,
          id,
          createdAt: now,
          updatedAt: now,
        }

        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }))

        console.log("[v0] Transaction added:", id)
        return id
      },

      updateTransaction: (id, updates, changedBy, reason) => {
        const state = get()
        const transaction = state.transactions.find((t) => t.id === id)

        if (!transaction) {
          console.error("[v0] Transaction not found:", id)
          return
        }

        // تسجيل التغييرات في سجل التدقيق
        const logs: AuditLog[] = []
        Object.keys(updates).forEach((field) => {
          if (transaction[field as keyof FinancialTransaction] !== updates[field as keyof FinancialTransaction]) {
            logs.push({
              id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              transactionId: id,
              field,
              oldValue: transaction[field as keyof FinancialTransaction],
              newValue: updates[field as keyof FinancialTransaction],
              changedBy,
              changedAt: new Date().toISOString(),
              reason,
            })
          }
        })

        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t,
          ),
          auditLogs: [...state.auditLogs, ...logs],
        }))

        console.log("[v0] Transaction updated:", id, logs.length, "changes")
      },

      deleteTransaction: (id, changedBy, reason) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
          auditLogs: [
            ...state.auditLogs,
            {
              id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              transactionId: id,
              field: "status",
              oldValue: "active",
              newValue: "deleted",
              changedBy,
              changedAt: new Date().toISOString(),
              reason,
            },
          ],
        }))

        console.log("[v0] Transaction deleted:", id)
      },

      addProduct: (product) => {
        const id = `PROD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        const newProduct: Product = {
          ...product,
          id,
          priceHistory: [
            {
              price: product.basePrice,
              date: new Date().toISOString(),
              changedBy: "system",
            },
          ],
        }

        set((state) => ({
          products: [...state.products, newProduct],
        }))

        return id
      },

      updateProductPrice: (id, newPrice, changedBy) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? {
                  ...p,
                  basePrice: newPrice,
                  priceHistory: [...p.priceHistory, { price: newPrice, date: new Date().toISOString(), changedBy }],
                }
              : p,
          ),
        }))
      },

      addService: (service) => {
        const id = `SRV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

        const newService: Service = {
          ...service,
          id,
          priceHistory: [
            {
              price: service.basePrice,
              date: new Date().toISOString(),
              changedBy: "system",
            },
          ],
        }

        set((state) => ({
          services: [...state.services, newService],
        }))

        return id
      },

      updateServicePrice: (id, newPrice, changedBy) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id
              ? {
                  ...s,
                  basePrice: newPrice,
                  priceHistory: [...s.priceHistory, { price: newPrice, date: new Date().toISOString(), changedBy }],
                }
              : s,
          ),
        }))
      },

      getTotalRevenue: (startDate, endDate) => {
        const { transactions } = get()
        return transactions
          .filter(
            (t) =>
              (t.type === "invoice" || t.type === "revenue") &&
              t.status === "completed" &&
              (!startDate || t.date >= startDate) &&
              (!endDate || t.date <= endDate),
          )
          .reduce((sum, t) => sum + t.amount, 0)
      },

      getTotalExpenses: (startDate, endDate) => {
        const { transactions } = get()
        return transactions
          .filter(
            (t) =>
              t.type === "expense" &&
              t.status === "completed" &&
              (!startDate || t.date >= startDate) &&
              (!endDate || t.date <= endDate),
          )
          .reduce((sum, t) => sum + t.amount, 0)
      },

      getTotalCosts: (startDate, endDate) => {
        const { transactions } = get()
        return transactions
          .filter(
            (t) =>
              t.type === "purchase" &&
              t.status === "completed" &&
              (!startDate || t.date >= startDate) &&
              (!endDate || t.date <= endDate),
          )
          .reduce((sum, t) => sum + t.amount, 0)
      },

      getTotalProfit: (startDate, endDate) => {
        const { getTotalRevenue, getTotalExpenses, getTotalCosts } = get()
        return (
          getTotalRevenue(startDate, endDate) - getTotalExpenses(startDate, endDate) - getTotalCosts(startDate, endDate)
        )
      },

      getTransactionsByEntity: (entityType, entityId) => {
        const { transactions } = get()
        return transactions.filter((t) => t.relatedTo.entityType === entityType && t.relatedTo.entityId === entityId)
      },

      getAuditTrail: (transactionId) => {
        const { auditLogs } = get()
        return auditLogs.filter((log) => log.transactionId === transactionId)
      },

      validateConsistency: () => {
        const errors: string[] = []
        const { transactions } = get()

        // التحقق من عدم وجود معاملات مكررة
        const transactionMap = new Map()
        transactions.forEach((t) => {
          const key = `${t.type}-${t.date}-${t.amount}-${t.relatedTo.entityId}`
          if (transactionMap.has(key)) {
            errors.push(`Duplicate transaction detected: ${t.id} and ${transactionMap.get(key)}`)
          }
          transactionMap.set(key, t.id)
        })

        // التحقق من صحة الأرقام
        transactions.forEach((t) => {
          if (t.amount < 0) {
            errors.push(`Negative amount in transaction: ${t.id}`)
          }
        })

        return {
          valid: errors.length === 0,
          errors,
        }
      },
    }),
    {
      name: "financial-store",
    },
  ),
)

export const formatCurrency = (amount: number, settings = { currency: "ج.م", decimalPlaces: 2 }) => {
  return `${amount.toFixed(settings.decimalPlaces)} ${settings.currency}`
}

export const useFinancialStats = (startDate?: string, endDate?: string) => {
  const getTotalRevenue = useFinancialStore((state) => state.getTotalRevenue)
  const getTotalExpenses = useFinancialStore((state) => state.getTotalExpenses)
  const getTotalCosts = useFinancialStore((state) => state.getTotalCosts)
  const getTotalProfit = useFinancialStore((state) => state.getTotalProfit)

  return {
    revenue: getTotalRevenue(startDate, endDate),
    expenses: getTotalExpenses(startDate, endDate),
    costs: getTotalCosts(startDate, endDate),
    profit: getTotalProfit(startDate, endDate),
  }
}
