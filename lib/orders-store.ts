"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Order, OrderStage, OrderStageAssignment } from "./orders-types"
import { MOCK_ORDERS } from "./orders-data"
import { EMPLOYEES } from "./employees-data"

interface OrdersStore {
  orders: Order[]
  addOrder: (orderData: {
    customerName: string
    customerEmail?: string
    customerPhone?: string
    customerId?: string
    description: string
    priority: "low" | "medium" | "high" | "urgent"
    paidAmount: number
    deliveryDate: string
    products: {
      productName: string
      quantity: number
      unitPrice: number
      totalPrice: number
      notes: string
      stages: { stage: OrderStage; assignedTo: string; notes?: string }[]
    }[]
    totalCost: number
  }) => Order
  updateOrder: (orderId: string, updates: Partial<Order>) => void
  deleteOrder: (orderId: string) => void
  getOrderById: (orderId: string) => Order | undefined
  updateOrderStage: (orderId: string, stageId: string, updates: Partial<OrderStageAssignment>) => void
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: MOCK_ORDERS,

      addOrder: (orderData) => {
        // توليد رقم الطلب بصيغة: ORD-YYYYMMDD-XXX
        const now = new Date()
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`
        
        // حساب عدد الطلبات في نفس اليوم للتسلسل
        const todayOrders = get().orders.filter((o) => {
          const orderDate = new Date(o.createdAt)
          return (
            orderDate.getFullYear() === now.getFullYear() &&
            orderDate.getMonth() === now.getMonth() &&
            orderDate.getDate() === now.getDate()
          )
        })
        const sequenceNumber = todayOrders.length + 1
        const orderNumber = `ORD-${dateStr}-${String(sequenceNumber).padStart(3, "0")}`
        
        const orderId = `ord-${Date.now()}`
        
        // Create stages from products
        const allStages: OrderStageAssignment[] = []
        let stageCounter = 1
        
        // Add "new" stage first
        allStages.push({
          stageId: `s${stageCounter}`,
          stage: "new",
          assignedTo: "",
          assignedToName: "",
          startDate: new Date().toISOString(),
          expectedEndDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: "completed",
          actualEndDate: new Date().toISOString(),
        })
        stageCounter++
        
        // Add stages from products
        orderData.products.forEach((product) => {
          product.stages.forEach((stage) => {
            const employee = EMPLOYEES.find((e) => e.id === stage.assignedTo)
            allStages.push({
              stageId: `s${stageCounter}`,
              stage: stage.stage,
              assignedTo: stage.assignedTo,
              assignedToName: employee?.name || "",
              startDate: new Date().toISOString(),
              expectedEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
              status: stageCounter === 2 ? "in_progress" : "pending",
              notes: stage.notes,
            })
            stageCounter++
          })
        })
        
        // Determine current stage (first non-completed stage)
        const currentStage = allStages.find((s) => s.status !== "completed")?.stage || "new"
        
        // Combine product names
        const productNames = orderData.products.map((p) => p.productName).join(", ")
        const totalQuantity = orderData.products.reduce((sum, p) => sum + p.quantity, 0)
        
        const newOrder: Order = {
          id: orderId,
          orderNumber,
          customerName: orderData.customerName,
          customerEmail: orderData.customerEmail,
          customerPhone: orderData.customerPhone,
          customerId: orderData.customerId,
          productName: productNames,
          quantity: totalQuantity,
          description: orderData.description,
          priority: orderData.priority,
          currentStage: currentStage as OrderStage,
          totalCost: orderData.totalCost,
          paidAmount: orderData.paidAmount,
          createdAt: new Date().toISOString(),
          expectedDelivery: new Date(orderData.deliveryDate).toISOString(),
          stages: allStages,
        }
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))
        
        return newOrder
      },

      updateOrder: (orderId, updates) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order
            
            // If products are being updated, also update productName and quantity
            let additionalUpdates: Partial<Order> = {}
            if (updates.products) {
              const products = updates.products as any[]
              additionalUpdates = {
                productName: products.map((p) => p.productName).join(", "),
                quantity: products.reduce((sum, p) => sum + p.quantity, 0),
              }
            }
            
            return { ...order, ...updates, ...additionalUpdates }
          }),
        }))
      },

      deleteOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }))
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },

      updateOrderStage: (orderId, stageId, updates) => {
        set((state) => ({
          orders: state.orders.map((order) => {
            if (order.id !== orderId) return order
            
            const updatedStages = order.stages.map((stage) =>
              stage.stageId === stageId ? { ...stage, ...updates } : stage
            )
            
            // Update current stage based on first non-completed stage
            const currentStage = updatedStages.find((s) => s.status !== "completed")?.stage || "delivery"
            
            return {
              ...order,
              stages: updatedStages,
              currentStage: currentStage as OrderStage,
            }
          }),
        }))
      },
    }),
    {
      name: "orders-storage",
      partialize: (state) => ({ orders: state.orders }),
    }
  )
)
