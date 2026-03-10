'use client'

import { useState } from 'react'
import { History, Wrench, AlertCircle, Calendar, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MaintenanceRecord } from '@/lib/maintenance-types'

const MOCK_HISTORY: MaintenanceRecord[] = [
  {
    id: '1',
    machineId: 'm1',
    machineName: 'آلة الطباعة الرقمية',
    type: 'scheduled',
    date: '2024-10-15',
    description: 'صيانة دورية - تنظيف وتشحيم',
    technician: 'خالد التقني',
    cost: 500,
    duration: 120,
    status: 'completed',
    parts: ['زيت تشحيم', 'فلتر هواء'],
  },
  {
    id: '2',
    machineId: 'm2',
    machineName: 'آلة التقطيع',
    type: 'breakdown',
    date: '2024-10-20',
    description: 'عطل في المحرك الرئيسي',
    technician: 'محمد الفني',
    cost: 2500,
    duration: 360,
    status: 'completed',
    parts: ['محرك كهربائي', 'كابلات'],
  },
  {
    id: '3',
    machineId: 'm4',
    machineName: 'آلة الأوفست',
    type: 'preventive',
    date: '2024-11-05',
    description: 'فحص شامل للنظام الهيدروليكي',
    technician: 'خالد التقني',
    cost: 1200,
    duration: 180,
    status: 'in-progress',
    parts: ['سائل هيدروليكي', 'خراطيم'],
  },
  {
    id: '4',
    machineId: 'm3',
    machineName: 'آلة التجليد',
    type: 'scheduled',
    date: '2024-11-10',
    description: 'صيانة شهرية',
    technician: 'أحمد الصيانة',
    duration: 90,
    status: 'pending',
  },
]

const typeLabels = {
  scheduled: 'مجدولة',
  breakdown: 'عطل',
  preventive: 'وقائية',
}

const typeColors = {
  scheduled: 'bg-blue-500/10 text-blue-500',
  breakdown: 'bg-red-500/10 text-red-500',
  preventive: 'bg-emerald-500/10 text-emerald-500',
}

const statusLabels = {
  completed: 'مكتملة',
  'in-progress': 'جارية',
  pending: 'قادمة',
}

const statusColors = {
  completed: 'bg-emerald-500/10 text-emerald-500',
  'in-progress': 'bg-amber-500/10 text-amber-500',
  pending: 'bg-slate-500/10 text-slate-500',
}

export function MaintenanceHistory() {
  const [history] = useState<MaintenanceRecord[]>(MOCK_HISTORY)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <CardTitle>سجل الصيانة والأعطال</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((record) => (
            <div
              key={record.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{record.machineName}</h4>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          typeColors[record.type]
                        }`}
                      >
                        {typeLabels[record.type]}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[record.status]
                        }`}
                      >
                        {statusLabels[record.status]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {record.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wrench className="h-4 w-4" />
                    <span>{record.technician}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{record.duration} دقيقة</span>
                  </div>
                  {record.cost && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{record.cost} ر.س</span>
                    </div>
                  )}
                </div>

                {record.parts && record.parts.length > 0 && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">قطع الغيار: </span>
                    <span className="text-foreground">{record.parts.join('، ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
