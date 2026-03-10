export interface Machine {
  id: string
  name: string
  model: string
  serialNumber: string
  purchaseDate: string
  purchasePrice: number
  currentValue: number
  status: "working" | "maintenance" | "stopped" | "broken"
  category: "fiber-laser" | "co2-laser" | "uv-printer" | "cnc" | "other"

  // معلومات الصيانة
  maintenanceEngineer: string
  engineerPhone: string
  maintenanceSchedule: "monthly" | "quarterly" | "semi-annual" | "annual"
  nextMaintenanceDate: string
  lastMaintenanceDate?: string
  visitCost: number

  // قطع الغيار (كل 3 أشهر)
  spareParts: {
    name: string
    cost: number
    replacementPeriod: number // بالأشهر
  }[]

  // تكاليف التشغيل
  operatingCosts: {
    electricityCostPerHour: number
    maintenanceCostPerMonth: number
  }

  // المخرجات والخدمات
  services: MachineService[]

  // الإحصائيات
  totalRevenue: number // إجمالي الإيرادات
  totalOperatingHours: number
  totalJobs: number
}

export interface MachineService {
  id: string
  name: string
  unit: string // مثل: سم², دقيقة، قطعة
  costPerUnit: number
  pricePerUnit: {
    individual: number
    company: number
    advertisingOffice: number
  }
  // للخدمات المتغيرة حسب الحجم (مثل حفر الليزر)
  sizeBasedPricing?: {
    minSize: number // بالسم²
    maxSize: number
    baseCost: number
    pricePerCmSquared: number
  }
}

export interface MaintenanceRecord {
  id: string
  machineId: string
  date: string
  type: "preventive" | "corrective" | "emergency"
  description: string
  engineerName: string
  cost: number
  partsReplaced: {
    name: string
    cost: number
  }[]
  duration: number // بالساعات
  nextScheduledDate?: string
}
