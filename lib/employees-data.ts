export interface Employee {
  id: string
  name: string
  role: string
  shift: string
  phone?: string
}

export const EMPLOYEES: Employee[] = [
  { id: "e1", name: "محمود شعراوي", role: "مشرف", shift: "الصباحي" },
  { id: "e2", name: "شيماء عمر", role: "موظف", shift: "الصباحي" },
  { id: "e3", name: "مصطفي عادل", role: "موظف", shift: "الصباحي" },
  { id: "e4", name: "ايهاب سعيد", role: "موظف", shift: "المسائي" },
  { id: "e5", name: "مصطفي ابراهيم", role: "موظف", shift: "المسائي" },
  { id: "e6", name: "انس عماد", role: "موظف", shift: "الصباحي" },
  { id: "e7", name: "صابر سيد", role: "موظف", shift: "المسائي" },
  { id: "e8", name: "ثابت احمد", role: "موظف", shift: "الصباحي" },
]

export const MOCK_EMPLOYEES = EMPLOYEES

export function getEmployeeById(id: string): Employee | undefined {
  return EMPLOYEES.find((emp) => emp.id === id)
}

export function getEmployeesByShift(shift: string): Employee[] {
  return EMPLOYEES.filter((emp) => emp.shift === shift)
}

// Additional functions or updates can be added here if needed
