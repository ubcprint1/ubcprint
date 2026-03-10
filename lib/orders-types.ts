export type OrderStage =
  | "new" // طلب جديد
  | "design" // مرحلة التصميم
  | "approval" // في انتظار الموافقة
  | "production" // مرحلة الإنتاج
  | "quality" // فحص الجودة
  | "packaging" // التغليف
  | "delivery" // جاهز للتسليم
  | "completed" // مكتمل
  | "cancelled" // ملغي

export interface OrderStageAssignment {
  stageId: string
  stage: OrderStage
  assignedTo: string // employee ID
  assignedToName: string
  startDate: string
  expectedEndDate: string
  actualEndDate?: string
  status: "pending" | "in_progress" | "completed" | "blocked"
  notes?: string
}

export interface OrderProduct {
  id: string
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  notes?: string
  stages: OrderStageAssignment[] // مراحل العمل الخاصة بهذا المنتج
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail?: string
  customerPhone?: string
  customerId?: string
  products: OrderProduct[]
  description?: string
  priority: "low" | "medium" | "high" | "urgent"
  currentStage: OrderStage
  createdAt: string
  expectedDelivery: string
  totalCost: number
  paidAmount: number
  notes?: string
}

export const ORDER_STAGES_CONFIG: Record<OrderStage, { label: string; color: string }> = {
  new: { label: "طلب جديد", color: "#6366f1" },
  design: { label: "التصميم", color: "#8b5cf6" },
  approval: { label: "الموافقة", color: "#f59e0b" },
  production: { label: "الإنتاج", color: "#3b82f6" },
  quality: { label: "فحص الجودة", color: "#06b6d4" },
  packaging: { label: "التغليف", color: "#10b981" },
  delivery: { label: "التسليم", color: "#ec4899" },
  completed: { label: "مكتمل", color: "#22c55e" },
  cancelled: { label: "ملغي", color: "#ef4444" },
}
