export interface InventoryItem {
  id: string
  productId: string
  productName: string
  quantity: number
  cost: number
  sellingPrice: number
  lastUpdated: string
  location: string
  minStock: number
  category: string
}

export interface InventoryTransaction {
  id: string
  type: "inbound" | "outbound"
  itemId: string
  itemName: string
  quantity: number
  date: string
  reason: "purchase" | "sale" | "adjustment" | "return"
  referenceId?: string // رقم الفاتورة أو الطلب
  notes?: string
}
