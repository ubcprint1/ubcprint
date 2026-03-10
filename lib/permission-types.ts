export type PermissionRequestType =
  | "late_arrival"
  | "early_departure"
  | "work_assignment"
  | "advance_payment"
  | "vacation"
  | "sick_leave"
  | "personal_leave"
  | "remote_work"

export type PermissionRequestStatus = "pending" | "approved" | "rejected"

export interface PermissionRequest {
  id: string
  employeeId: string
  employeeName: string
  type: PermissionRequestType
  title: string
  description: string
  date: string
  startTime?: string
  endTime?: string
  amount?: number // For advance payment
  status: PermissionRequestStatus
  approvedBy?: string
  approvedDate?: string
  rejectionReason?: string
  createdAt: string
}

export const PERMISSION_TYPES: { value: PermissionRequestType; label: string; icon: string }[] = [
  { value: "late_arrival", label: "حضور متأخر", icon: "⏰" },
  { value: "early_departure", label: "انصراف مبكر", icon: "🚪" },
  { value: "work_assignment", label: "مهمة عمل", icon: "💼" },
  { value: "advance_payment", label: "طلب سلفة", icon: "💰" },
  { value: "vacation", label: "إجازة", icon: "🏖️" },
  { value: "sick_leave", label: "إجازة مرضية", icon: "🏥" },
  { value: "personal_leave", label: "إجازة شخصية", icon: "👤" },
  { value: "remote_work", label: "عمل عن بعد", icon: "🏡" },
]
