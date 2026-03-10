"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function MiniRevenueChart() {
  const last7Days = [
    { day: "السبت", revenue: 10500, expenses: 3200 },
    { day: "الأحد", revenue: 12000, expenses: 2800 },
    { day: "الاثنين", revenue: 9500, expenses: 3500 },
    { day: "الثلاثاء", revenue: 11200, expenses: 3000 },
    { day: "الأربعاء", revenue: 13500, expenses: 3800 },
    { day: "الخميس", revenue: 11800, expenses: 3100 },
    { day: "اليوم", revenue: 12500, expenses: 3500 },
  ]

  const maxValue = Math.max(...last7Days.map((d) => d.revenue))

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-foreground">آخر 7 أيام</h3>
        <div className="flex gap-3">
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            إيرادات
          </Badge>
          <Badge variant="outline" className="gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            مصروفات
          </Badge>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        {last7Days.map((day, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative w-full">
              <div
                className="w-full rounded-t bg-green-500"
                style={{ height: `${(day.revenue / maxValue) * 100}px` }}
              ></div>
              <div
                className="absolute bottom-0 w-full rounded-t bg-red-500 opacity-50"
                style={{ height: `${(day.expenses / maxValue) * 100}px` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">{day.day}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
