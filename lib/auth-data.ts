import type { User } from "./auth-types"

export const EMPLOYEES: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    employeeId: "EMP-001",
    role: "admin",
    name: "المدير العام",
    avatar: "👨‍💼",
  },
  {
    id: "2",
    username: "mahmoud.sharawy",
    password: "mahmoud123",
    employeeId: "EMP-002",
    role: "supervisor",
    name: "محمود شعراوي",
    avatar: "👨‍💻",
  },
  {
    id: "3",
    username: "shimaa.omar",
    password: "shimaa123",
    employeeId: "EMP-003",
    role: "employee",
    name: "شيماء عمر",
    avatar: "👩‍💻",
  },
  {
    id: "4",
    username: "mostafa.adel",
    password: "mostafa123",
    employeeId: "EMP-004",
    role: "employee",
    name: "مصطفي عادل",
    avatar: "👨‍🔧",
  },
  {
    id: "5",
    username: "ehab.saeed",
    password: "ehab123",
    employeeId: "EMP-005",
    role: "employee",
    name: "ايهاب سعيد",
    avatar: "👨‍🔬",
  },
  {
    id: "6",
    username: "mostafa.ibrahim",
    password: "mostafa.i123",
    employeeId: "EMP-006",
    role: "employee",
    name: "مصطفي ابراهيم",
    avatar: "👨‍🎨",
  },
  {
    id: "7",
    username: "anas.emad",
    password: "anas123",
    employeeId: "EMP-007",
    role: "employee",
    name: "انس عماد",
    avatar: "👨‍🏭",
  },
  {
    id: "8",
    username: "saber.sayed",
    password: "saber123",
    employeeId: "EMP-008",
    role: "employee",
    name: "صابر سيد",
    avatar: "👨‍🔧",
  },
  {
    id: "9",
    username: "thabet.ahmed",
    password: "thabet123",
    employeeId: "EMP-009",
    role: "employee",
    name: "ثابت احمد",
    avatar: "👨‍💼",
  },
]

export const CLIENTS: User[] = [
  {
    id: "C1",
    username: "client1@example.com",
    password: "client123",
    role: "client",
    name: "أحمد محمد",
    email: "client1@example.com",
    phone: "01012345678",
    address: "القاهرة، مصر",
  },
]

// تسجيل دخول الموظفين فقط
export const authenticateEmployee = (username: string, password: string): User | null => {
  const user = EMPLOYEES.find((u) => u.username === username && u.password === password)
  return user || null
}

// تسجيل دخول العملاء فقط
export const authenticateClient = (username: string, password: string): User | null => {
  const user = CLIENTS.find((u) => u.username === username && u.password === password)
  return user || null
}

// تسجيل عميل جديد
export const registerClient = (data: {
  email: string
  password: string
  name: string
  phone: string
  address: string
}): User => {
  const newClient: User = {
    id: `C${CLIENTS.length + 1}`,
    username: data.email,
    password: data.password,
    role: "client",
    name: data.name,
    email: data.email,
    phone: data.phone,
    address: data.address,
  }
  CLIENTS.push(newClient)
  return newClient
}

export const authenticateUser = authenticateEmployee
