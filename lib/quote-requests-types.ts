export interface QuoteProduct {
  productType: string
  customProductType?: string
  size: string
  customSize?: string
  quantity: string
  customQuantity?: string
  printColors: string
}

export interface QuoteRequest {
  id: string
  name: string
  phone: string
  serviceType: "طباعة" | "تصميم" | "حفر ليزر" | "قص ليزر" | "أخرى"
  products: QuoteProduct[]
  notes?: string
  createdAt: Date
  status: "جديد" | "قيد المراجعة" | "تم الرد"
}

export const MOCK_QUOTE_REQUESTS: QuoteRequest[] = []
