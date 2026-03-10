export interface Product {
  id: string
  name: string
  description: string
  category: string
  cost: number
  priceIndividual: number
  priceCompany: number
  priceAdvertising: number
  stock: number
  unit: string
  image?: string
  addons?: ProductAddon[]
}

export interface ProductAddon {
  type: 'fiber-laser' | 'uv-print' | 'co2-laser'
  enabled: boolean
  pricing?: LaserPricing | UVPricing | CO2Pricing
}

export interface LaserPricing {
  baseSize: number // 1cm x 1cm
  basePrice: number // 2 جنيه
  pricePerExtraCm: number // سعر كل سم إضافي
}

export interface UVPricing {
  baseSize: number
  basePrice: number
  pricePerExtraCm: number
}

export interface CO2Pricing {
  pricePerMinute: number // 3 جنيه للدقيقة
}

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
