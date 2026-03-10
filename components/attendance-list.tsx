"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, LogOut } from "lucide-react"
import { useState } from "react"
import { EMPLOYEES } from "@/lib/employees-data"

type Attendance = {
  id: number
  employeeId: string
  employee: string
  checkIn: string
  checkOut: string | null
  hours: number
}

const initialAttendance: Attendance[] = [
  { id: 1, employeeId: "e1", employee: EMPLOYEES[0].name, checkIn: "08:00", checkOut: null, hours: 0 },
  { id: 2, employeeId: "e2", employee: EMPLOYEES[1].name, checkIn: "08:15", checkOut: null, hours: 0 },
  { id: 3, employeeId: "e3", employee: EMPLOYEES[2].name, checkIn: "08:30", checkOut: null, hours: 0 },
  { id: 4, employeeId: "e6", employee: EMPLOYEES[5].name, checkIn: "08:00", checkOut: "17:00", hours: 9 },
  { id: 5, employeeId: "e8", employee: EMPLOYEES[7].name, checkIn: "07:45", checkOut: null, hours: 0 },
]

export function AttendanceList() {
  const [attendance] = useState<Attendance[]>(initialAttendance)

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">سجل الحضور</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          اليوم: {new Date().toLocaleDateString("ar-EG")}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">الموظف</th>
              <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">وقت الدخول</th>
              <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">وقت الخروج</th>
              <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">الساعات</th>
              <th className="pb-3 text-right text-sm font-semibold text-muted-foreground">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record) => (
              <tr key={record.id} className="border-b border-border/50">
                <td className="py-4 text-right font-medium text-foreground">{record.employee}</td>
                <td className="py-4 text-right text-muted-foreground">{record.checkIn}</td>
                <td className="py-4 text-right text-muted-foreground">{record.checkOut || "-"}</td>
                <td className="py-4 text-right text-muted-foreground">
                  {record.checkOut ? `${record.hours} ساعة` : "جاري العمل"}
                </td>
                <td className="py-4 text-right">
                  {!record.checkOut && (
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <LogOut className="h-3 w-3" />
                      تسجيل خروج
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
