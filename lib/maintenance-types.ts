export interface MaintenanceRecord {
  id: string
  machineId: string
  machineName: string
  type: 'scheduled' | 'breakdown' | 'preventive'
  date: string
  description: string
  technician: string
  cost?: number
  duration: number
  status: 'completed' | 'in-progress' | 'pending'
  parts?: string[]
}

export interface MaintenanceSchedule {
  id: string
  machineId: string
  machineName: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  lastMaintenance: string
  nextMaintenance: string
  daysUntilDue: number
  assignedTechnician: string
  notes?: string
}
