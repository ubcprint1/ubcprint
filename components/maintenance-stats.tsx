'use client'

import { Wrench, AlertTriangle, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    label: 'صيانة مجدولة',
    value: '8',
    subtext: 'هذا الشهر',
    icon: Wrench,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'صيانة متأخرة',
    value: '2',
    subtext: 'تحتاج اهتمام',
    icon: AlertTriangle,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    label: 'متوسط وقت الصيانة',
    value: '150',
    subtext: 'دقيقة',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    label: 'تكلفة الصيانة',
    value: '12,500',
    subtext: 'ر.س هذا الشهر',
    icon: DollarSign,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
]

export function MaintenanceStats() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
              <div className={`rounded-lg ${stat.bgColor} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
