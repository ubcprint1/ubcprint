'use client'

import { useState } from 'react'
import { Calendar, Clock, AlertTriangle, CheckCircle2, UserCog } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { MaintenanceSchedule } from '@/lib/maintenance-types'

const MOCK_SCHEDULES: MaintenanceSchedule[] = [
  {
    id: '1',
    machineId: 'm1',
    machineName: 'آلة الطباعة الرقمية',
    frequency: 'monthly',
    lastMaintenance: '2024-10-15',
    nextMaintenance: '2024-11-15',
    daysUntilDue: 5,
    assignedTechnician: 'خالد التقني',
    notes: 'تنظيف وتشحيم الأجزاء المتحركة',
  },
  {
    id: '2',
    machineId: 'm2',
    machineName: 'آلة التقطيع',
    frequency: 'weekly',
    lastMaintenance: '2024-11-03',
    nextMaintenance: '2024-11-10',
    daysUntilDue: -1,
    assignedTechnician: 'محمد الفني',
    notes: 'فحص الشفرات وتغيير الزيت',
  },
  {
    id: '3',
    machineId: 'm3',
    machineName: 'آلة التجليد',
    frequency: 'monthly',
    lastMaintenance: '2024-10-20',
    nextMaintenance: '2024-11-20',
    daysUntilDue: 10,
    assignedTechnician: 'أحمد الصيانة',
  },
  {
    id: '4',
    machineId: 'm4',
    machineName: 'آلة الأوفست',
    frequency: 'quarterly',
    lastMaintenance: '2024-08-01',
    nextMaintenance: '2024-11-01',
    daysUntilDue: -10,
    assignedTechnician: 'خالد التقني',
    notes: 'صيانة شاملة للنظام الهيدروليكي',
  },
]

const frequencyLabels = {
  daily: 'يومي',
  weekly: 'أسبوعي',
  monthly: 'شهري',
  quarterly: 'ربع سنوي',
  yearly: 'سنوي',
}

export function MaintenanceSchedule() {
  const [schedules] = useState<MaintenanceSchedule[]>(MOCK_SCHEDULES)

  const getStatusColor = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return 'bg-red-500/10 text-red-500 border-red-500/20'
    if (daysUntilDue <= 3) return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
  }

  const getStatusIcon = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return <AlertTriangle className="h-4 w-4" />
    return <CheckCircle2 className="h-4 w-4" />
  }

  const getStatusText = (daysUntilDue: number) => {
    if (daysUntilDue < 0) return `متأخر ${Math.abs(daysUntilDue)} يوم`
    if (daysUntilDue === 0) return 'اليوم'
    if (daysUntilDue === 1) return 'غداً'
    return `بعد ${daysUntilDue} أيام`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>جدول الصيانة المجدولة</CardTitle>
          </div>
          <Button size="sm">إضافة جدولة</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{schedule.machineName}</h4>
                    <span
                      className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium ${getStatusColor(
                        schedule.daysUntilDue
                      )}`}
                    >
                      {getStatusIcon(schedule.daysUntilDue)}
                      {getStatusText(schedule.daysUntilDue)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>التكرار: {frequencyLabels[schedule.frequency]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UserCog className="h-4 w-4" />
                      <span>{schedule.assignedTechnician}</span>
                    </div>
                    <div className="text-muted-foreground">
                      آخر صيانة: {schedule.lastMaintenance}
                    </div>
                    <div className="text-muted-foreground">
                      الصيانة القادمة: {schedule.nextMaintenance}
                    </div>
                  </div>

                  {schedule.notes && (
                    <p className="text-sm text-muted-foreground">
                      ملاحظات: {schedule.notes}
                    </p>
                  )}
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
  )
}
