'use client'

import { useState } from 'react'
import { Clock, AlertCircle, CheckCircle2, XCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { AttendanceRecord } from '@/lib/attendance-types'

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: '1',
    employeeId: 'e1',
    employeeName: 'محمود شعراوي',
    date: '2024-11-10',
    shiftId: 's1',
    shiftName: 'الصباحي',
    checkIn: '08:00',
    checkOut: '17:30',
    expectedIn: '08:00',
    expectedOut: '17:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 30,
    status: 'overtime',
    deduction: 0,
    bonus: 50,
  },
  {
    id: '2',
    employeeId: 'e2',
    employeeName: 'شيماء عمر',
    date: '2024-11-10',
    shiftId: 's1',
    shiftName: 'الصباحي',
    checkIn: '08:35',
    checkOut: '17:00',
    expectedIn: '08:00',
    expectedOut: '17:00',
    lateMinutes: 35,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'late',
    deduction: 35,
    bonus: 0,
    notes: 'تأخرت بسبب زحمة المرور',
  },
  {
    id: '3',
    employeeId: 'e3',
    employeeName: 'مصطفي عادل',
    date: '2024-11-10',
    shiftId: 's1',
    shiftName: 'الصباحي',
    checkIn: '08:00',
    checkOut: '17:00',
    expectedIn: '08:00',
    expectedOut: '17:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'present',
    deduction: 0,
    bonus: 0,
  },
  {
    id: '4',
    employeeId: 'e4',
    employeeName: 'ايهاب سعيد',
    date: '2024-11-10',
    shiftId: 's2',
    shiftName: 'المسائي',
    checkIn: '14:00',
    checkOut: undefined,
    expectedIn: '14:00',
    expectedOut: '22:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'present',
    deduction: 0,
    bonus: 0,
  },
  {
    id: '5',
    employeeId: 'e5',
    employeeName: 'مصطفي ابراهيم',
    date: '2024-11-10',
    shiftId: 's2',
    shiftName: 'المسائي',
    checkIn: '14:05',
    checkOut: undefined,
    expectedIn: '14:00',
    expectedOut: '22:00',
    lateMinutes: 5,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'late',
    deduction: 5,
    bonus: 0,
  },
  {
    id: '6',
    employeeId: 'e6',
    employeeName: 'انس عماد',
    date: '2024-11-10',
    shiftId: 's1',
    shiftName: 'الصباحي',
    checkIn: '07:55',
    checkOut: '17:00',
    expectedIn: '08:00',
    expectedOut: '17:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'present',
    deduction: 0,
    bonus: 0,
  },
  {
    id: '7',
    employeeId: 'e7',
    employeeName: 'صابر سيد',
    date: '2024-11-10',
    shiftId: 's2',
    shiftName: 'المسائي',
    checkIn: '14:00',
    checkOut: undefined,
    expectedIn: '14:00',
    expectedOut: '22:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'present',
    deduction: 0,
    bonus: 0,
  },
  {
    id: '8',
    employeeId: 'e8',
    employeeName: 'ثابت احمد',
    date: '2024-11-10',
    shiftId: 's1',
    shiftName: 'الصباحي',
    checkIn: '08:00',
    checkOut: '17:00',
    expectedIn: '08:00',
    expectedOut: '17:00',
    lateMinutes: 0,
    earlyLeaveMinutes: 0,
    overtimeMinutes: 0,
    status: 'present',
    deduction: 0,
    bonus: 0,
  },
]

const statusIcons = {
  present: CheckCircle2,
  late: AlertCircle,
  absent: XCircle,
  'half-day': AlertCircle,
  overtime: TrendingUp,
}

const statusColors = {
  present: 'bg-emerald-500/10 text-emerald-500',
  late: 'bg-amber-500/10 text-amber-500',
  absent: 'bg-red-500/10 text-red-500',
  'half-day': 'bg-blue-500/10 text-blue-500',
  overtime: 'bg-purple-500/10 text-purple-500',
}

const statusLabels = {
  present: 'حاضر',
  late: 'متأخر',
  absent: 'غائب',
  'half-day': 'نصف يوم',
  overtime: 'وقت إضافي',
}

export function AttendanceDetailed() {
  const [records] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE)
  const [selectedDate, setSelectedDate] = useState('2024-11-10')

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>سجل الحضور المفصل</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1 text-sm"
            />
            <Button size="sm">تصدير التقرير</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-sm">
                <th className="p-3 text-right font-semibold">الموظف</th>
                <th className="p-3 text-right font-semibold">الشيفت</th>
                <th className="p-3 text-right font-semibold">الحضور</th>
                <th className="p-3 text-right font-semibold">الانصراف</th>
                <th className="p-3 text-center font-semibold">التأخير</th>
                <th className="p-3 text-center font-semibold">إضافي</th>
                <th className="p-3 text-center font-semibold">خصم</th>
                <th className="p-3 text-center font-semibold">مكافأة</th>
                <th className="p-3 text-center font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const StatusIcon = statusIcons[record.status]
                return (
                  <tr key={record.id} className="border-b border-border last:border-0">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        {record.notes && (
                          <p className="text-xs text-muted-foreground">{record.notes}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {record.shiftName}
                      <br />
                      <span className="text-xs">
                        {record.expectedIn} - {record.expectedOut}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-medium ${
                          record.lateMinutes > 0 ? 'text-red-500' : 'text-foreground'
                        }`}
                      >
                        {record.checkIn}
                      </span>
                    </td>
                    <td className="p-3">
                      {record.checkOut ? (
                        <span className="font-medium">{record.checkOut}</span>
                      ) : (
                        <span className="text-muted-foreground">لم ينصرف</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {record.lateMinutes > 0 ? (
                        <span className="text-sm text-red-500">
                          {record.lateMinutes} د
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {record.overtimeMinutes > 0 ? (
                        <span className="text-sm text-purple-500">
                          {record.overtimeMinutes} د
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {record.deduction > 0 ? (
                        <span className="text-sm font-medium text-red-500">
                          -{record.deduction} ر.س
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {record.bonus > 0 ? (
                        <span className="text-sm font-medium text-emerald-500">
                          +{record.bonus} ر.س
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center">
                        <span
                          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            statusColors[record.status]
                          }`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusLabels[record.status]}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
