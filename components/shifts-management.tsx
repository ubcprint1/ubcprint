"use client"

import { useState } from "react"
import { Clock, Plus, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EMPLOYEES } from "@/lib/employees-data"
import type { Shift, EmployeeShift } from "@/lib/attendance-types"

const MOCK_SHIFTS: Shift[] = [
  {
    id: "s1",
    name: "الشيفت الصباحي",
    startTime: "08:00",
    endTime: "17:00",
    gracePeriod: 15,
    color: "bg-blue-500",
  },
  {
    id: "s2",
    name: "الشيفت المسائي",
    startTime: "14:00",
    endTime: "22:00",
    gracePeriod: 10,
    color: "bg-purple-500",
  },
  {
    id: "s3",
    name: "الشيفت الليلي",
    startTime: "22:00",
    endTime: "06:00",
    gracePeriod: 10,
    color: "bg-slate-500",
  },
]

const MOCK_EMPLOYEE_SHIFTS: EmployeeShift[] = EMPLOYEES.slice(0, 6).map((emp, idx) => ({
  employeeId: emp.id,
  employeeName: emp.name,
  shiftId: idx < 3 ? "s1" : "s2",
  shiftName: idx < 3 ? "الصباحي" : "المسائي",
  workDays: [0, 1, 2, 3, 4],
}))

const daysLabels = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

export function ShiftsManagement() {
  const [shifts] = useState<Shift[]>(MOCK_SHIFTS)
  const [employeeShifts] = useState<EmployeeShift[]>(MOCK_EMPLOYEE_SHIFTS)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>إدارة الشيفتات</CardTitle>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              شيفت جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {shifts.map((shift) => (
              <div key={shift.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-12 w-1 rounded ${shift.color}`} />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-semibold">{shift.name}</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>
                        من {shift.startTime} إلى {shift.endTime}
                      </p>
                      <p>فترة السماح: {shift.gracePeriod} دقيقة</p>
                      <p className="text-xs">{employeeShifts.filter((es) => es.shiftId === shift.id).length} موظف</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>توزيع الموظفين على الشيفتات</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {employeeShifts.map((es) => (
              <div
                key={es.employeeId}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-lg ${
                      shifts.find((s) => s.id === es.shiftId)?.color
                    }/10 flex items-center justify-center`}
                  >
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{es.employeeName}</p>
                    <p className="text-sm text-muted-foreground">{es.shiftName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">
                    {es.workDays.map((day) => daysLabels[day].charAt(0)).join("، ")}
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
