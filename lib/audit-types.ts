export interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  module: 'tasks' | 'machines' | 'attendance' | 'accounting' | 'users' | 'maintenance'
  details: string
  ipAddress?: string
  changes?: {
    field: string
    oldValue: string
    newValue: string
  }[]
}
