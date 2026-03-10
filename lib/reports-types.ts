export interface MonthlyReport {
  id: string
  month: string // YYYY-MM
  type: "salary" | "inventory" | "sales" | "purchases" | "expenses"
  entityId: string // employeeId أو customerId
  entityName: string
  data: any
  totalAmount: number
  createdAt: Date
  generatedBy: string
}

export interface SalesReport {
  totalSales: number
  totalOrders: number
  topCustomers: { customerId: string; customerName: string; total: number }[]
  salesByProduct: { productId: string; productName: string; quantity: number; total: number }[]
  salesByMachine: { machineId: string; machineName: string; revenue: number }[]
}

export interface InventoryReport {
  totalValue: number
  lowStockItems: number
  movements: { type: "in" | "out"; quantity: number; value: number }[]
  topProducts: { productId: string; name: string; quantity: number }[]
}

export interface ExpenseReport {
  totalExpenses: number
  byCategory: { category: string; amount: number }[]
  rentAndUtilities: number
  salaries: number
  maintenance: number
  supplies: number
}
