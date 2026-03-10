'use client'

import { Users, Clock, TrendingDown, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    label: 'إجمالي الحضور اليوم',
    value: '18/20',
    subtext: '90% نسبة الحضور',
    icon: Users,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'متوسط التأخير',
    value: '12',
    subtext: 'دقيقة/موظف',
    icon: Clock,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    label: 'إجمالي الخصومات',
    value: '850',
    subtext: 'ر.س هذا الشهر',
    icon: TrendingDown,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
  {
    label: 'مكافآت الوقت الإضافي',
    value: '1,250',
    subtext: 'ر.س هذا الشهر',
    icon: DollarSign,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export function AttendanceStats() {
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
