export interface EmployeeProfile {
  id: string
  name: string
  employeeNumber: string
  position: string
  hireDate: string
  salary: number
  insurance: number
  status: 'active' | 'archived'
  email: string
  phone: string
  nationalId: string
  address: string
  department: string
  
  // الصلاحيات
  role: 'admin' | 'manager' | 'employee' | 'viewer'
  permissions: {
    tasks: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    machines: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    attendance: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    accounting: { view: boolean; create: boolean; edit: boolean; delete: boolean }
    users: { view: boolean; create: boolean; edit: boolean; delete: boolean }
  }
  
  // مواعيد العمل
  workSchedule: {
    shift: string
    checkIn: string
    checkOut: string
    workDays: string[]
    additionalShifts?: {
      date: string
      shift: string
      reason: string
    }[]
  }
  
  // العمولة
  commission?: {
    enabled: boolean
    type: 'percentage' | 'fixed'
    value: number
    notes: string
    history: {
      date: string
      amount: number
      description: string
    }[]
  }
  
  // البطاقة والوثائق
  documents: {
    idCard?: {
      url: string
      uploadedAt: string
    }
    contract?: {
      url: string
      uploadedAt: string
    }
    other: {
      name: string
      url: string
      uploadedAt: string
    }[]
  }
}

export const ROLE_LABELS = {
  admin: 'مدير',
  manager: 'مشرف',
  employee: 'موظف',
  viewer: 'مراقب',
}

export function calculateWorkDuration(hireDate: string): string {
  const hire = new Date(hireDate)
  const now = new Date()
  const diff = now.getTime() - hire.getTime()
  
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365))
  const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))
  
  let result = ''
  if (years > 0) result += `${years} سنة `
  if (months > 0) result += `${months} شهر `
  if (days > 0) result += `${days} يوم`
  
  return result.trim() || 'اليوم الأول'
}
