import type { Order } from "./orders-types"
import { MOCK_ORDERS } from "./orders-data"

export interface Task {
  id: string
  orderNumber: string
  orderId: string
  customerName: string
  productName: string
  stage: string
  stageLabel: string
  assignedTo: string
  assignedToName: string
  status: "pending" | "in_progress" | "completed" | "blocked"
  expectedDelivery: string
  priority: "low" | "medium" | "high" | "urgent"
  notes?: string
  createdAt: string
  daysRemaining: number
}

// تحويل الطلبات إلى Tasks
export function generateTasksFromOrders(orders: Order[]): Task[] {
  const tasks: Task[] = []

  orders.forEach((order) => {
    // التحقق من وجود stages في الطلب
    if (!order.stages || !Array.isArray(order.stages)) {
      return
    }

    order.stages.forEach((stage) => {
      if (stage.status !== "completed") {
        const daysRemaining = calculateDaysRemaining(stage.expectedEndDate)

        tasks.push({
          id: `${order.id}-${stage.stageId}`,
          orderNumber: order.orderNumber,
          orderId: order.id,
          customerName: order.customerName,
          productName: order.productName,
          stage: stage.stage,
          stageLabel: getStageLabel(stage.stage),
          assignedTo: stage.assignedTo,
          assignedToName: stage.assignedToName,
          status: stage.status,
          expectedDelivery: stage.expectedEndDate,
          priority: order.priority,
          notes: stage.notes,
          createdAt: order.createdAt,
          daysRemaining,
        })
      }
    })
  })

  return tasks
}

function calculateDaysRemaining(expectedDate: string): number {
  const today = new Date()
  const expected = new Date(expectedDate)
  const diff = expected.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function getStageLabel(stage: string): string {
  const labels: Record<string, string> = {
    new: "طلب جديد",
    design: "التصميم",
    approval: "الموافقة",
    production: "الإنتاج",
    quality: "فحص الجودة",
    packaging: "التغليف",
    delivery: "التسليم",
    completed: "مكتمل",
    cancelled: "ملغي",
  }
  return labels[stage] || stage
}

// الحصول على Tasks لموظف معين
export function getTasksForEmployee(employeeId: string): Task[] {
  const allTasks = generateTasksFromOrders(MOCK_ORDERS)
  return allTasks.filter((task) => task.assignedTo === employeeId)
}

// الحصول على جميع Tasks (للمدير)
export function getAllTasks(): Task[] {
  return generateTasksFromOrders(MOCK_ORDERS)
}

// فلترة Tasks
export function filterTasks(
  tasks: Task[],
  filters: {
    status?: string
    employeeId?: string
    orderId?: string
    priority?: string
  },
): Task[] {
  let filtered = [...tasks]

  if (filters.status && filters.status !== "all") {
    filtered = filtered.filter((task) => task.status === filters.status)
  }

  if (filters.employeeId && filters.employeeId !== "all") {
    filtered = filtered.filter((task) => task.assignedTo === filters.employeeId)
  }

  if (filters.orderId && filters.orderId !== "all") {
    filtered = filtered.filter((task) => task.orderId === filters.orderId)
  }

  if (filters.priority && filters.priority !== "all") {
    filtered = filtered.filter((task) => task.priority === filters.priority)
  }

  return filtered
}

// تجميع Tasks حسب الحالة (لعرض Kanban)
export function groupTasksByStatus(tasks: Task[]): Record<string, Task[]> {
  return {
    pending: tasks.filter((t) => t.status === "pending"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    blocked: tasks.filter((t) => t.status === "blocked"),
  }
}
