export interface User {
  id: string
  username: string
  password: string // في التطبيق الفعلي يجب تشفيرها
  employeeId?: string // اختياري للعملاء
  role: "admin" | "supervisor" | "employee" | "observer" | "client"
  name: string
  avatar?: string
  email?: string // حقول إضافية للعملاء
  phone?: string
  address?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
