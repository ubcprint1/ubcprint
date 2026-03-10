import { MOCK_ORDERS } from "@/lib/orders-data"
import { MACHINES } from "@/lib/machines-data"
import { EMPLOYEES_FULL_DATA } from "@/lib/employees-full-data"

export type MockCustomer = {
  id: string
  name: string
  email: string
  phone: string
  address: string
  companyName?: string
  totalOrders: number
  totalRevenue: number
}

export const mockCustomers: MockCustomer[] = [
  {
    id: "cust-001",
    name: "أحمد محمد",
    email: "client1@example.com",
    phone: "01012345678",
    address: "القاهرة، مصر",
    companyName: "شركة النور للدعاية والإعلان",
    totalOrders: 8,
    totalRevenue: 42500,
  },
  {
    id: "cust-002",
    name: "مؤسسة الأعمال المتقدمة",
    email: "sales@advancedbiz.com",
    phone: "01098765432",
    address: "الجيزة، مصر",
    totalOrders: 5,
    totalRevenue: 18400,
  },
  {
    id: "cust-003",
    name: "محمد أحمد",
    email: "m.ahmed@example.com",
    phone: "01123456789",
    address: "الإسكندرية، مصر",
    totalOrders: 3,
    totalRevenue: 9500,
  },
]

export const mockQuotes = [
  { id: "quote-001", quoteNumber: "Q-20241115-001", customerId: "cust-001", total: 15000, status: "sent" },
  { id: "quote-002", quoteNumber: "Q-20241120-001", customerId: "cust-002", total: 5000, status: "approved" },
  { id: "quote-003", quoteNumber: "Q-20241118-001", customerId: "cust-003", total: 3500, status: "approved" },
]

export const mockInvoices = [
  { id: "inv-001", invoiceNumber: "INV-20241115-001", customerId: "cust-001", total: 15000, paidAmount: 7500, status: "partial" },
  { id: "inv-002", invoiceNumber: "INV-20241120-001", customerId: "cust-002", total: 5000, paidAmount: 5000, status: "paid" },
  { id: "inv-003", invoiceNumber: "INV-20241118-001", customerId: "cust-003", total: 3500, paidAmount: 3500, status: "paid" },
]

export function getDashboardSummary() {
  const totalRevenue = mockInvoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0)
  const pendingOrders = MOCK_ORDERS.filter((order) => order.currentStage !== "delivery").length
  const activeMachines = MACHINES.filter((machine) => machine.status === "working").length
  const activeEmployees = EMPLOYEES_FULL_DATA.filter((employee) => employee.status === "active").length

  return {
    totals: {
      customers: mockCustomers.length,
      orders: MOCK_ORDERS.length,
      quotes: mockQuotes.length,
      invoices: mockInvoices.length,
      revenue: totalRevenue,
      activeMachines,
      activeEmployees,
      pendingOrders,
    },
    recentOrders: MOCK_ORDERS.slice(0, 5),
    topMachines: MACHINES.slice(0, 4),
  }
}
