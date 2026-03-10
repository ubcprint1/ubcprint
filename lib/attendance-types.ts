export interface Shift {
  id: string
  name: string
  startTime: string
  endTime: string
  gracePeriod: number // minutes
  color: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  date: string
  shiftId: string
  shiftName: string
  checkIn: string
  checkOut?: string
  expectedIn: string
  expectedOut: string
  lateMinutes: number
  earlyLeaveMinutes: number
  overtimeMinutes: number
  status: 'present' | 'late' | 'absent' | 'half-day' | 'overtime'
  deduction: number
  bonus: number
  notes?: string
}

export interface EmployeeShift {
  employeeId: string
  employeeName: string
  shiftId: string
  shiftName: string
  workDays: number[]
}
