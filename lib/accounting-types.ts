export interface Invoice {
  id: string
  number: string
  customerName: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  status: 'paid' | 'pending' | 'overdue' | 'cancelled'
  paymentMethod?: 'cash' | 'bank' | 'credit'
}

export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Expense {
  id: string
  date: string
  category: 'materials' | 'maintenance' | 'salaries' | 'utilities' | 'other'
  description: string
  amount: number
  vendor?: string
  paymentMethod: 'cash' | 'bank' | 'credit'
  receipt?: string
}

export interface Supplier {
  id: string
  name: string
  contactPerson: string
  phone: string
  email: string
  address: string
  category: 'paper' | 'ink' | 'parts' | 'equipment' | 'other'
  balance: number
  lastOrder: string
  status: 'active' | 'inactive'
}

export interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense' | 'invoice' | 'payment'
  party: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
  category?: string
  description: string
  reference?: string
}

export interface CashflowData {
  date: string
  income: number
  expense: number
  profit: number
}

export interface AccountingSettings {
  categories: string[]
  taxRate: number
  paymentMethods: string[]
  invoicePrefix: string
  openingBalance: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  address: string
  taxId?: string
  type: 'individual' | 'company' | 'advertising'
  balance: number
  totalPaid: number
  totalUnpaid: number
  registrationDate: string
  status: 'active' | 'inactive'
  notes?: string
}

export interface CustomerTransaction {
  id: string
  customerId: string
  invoiceId: string
  date: string
  description: string
  amount: number
  paid: number
  remaining: number
  status: 'paid' | 'partial' | 'unpaid'
}
