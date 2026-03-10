"use client"

import { Card } from "@/components/ui/card"
import { Clock, UserPlus, FileText, Cog, CheckCircle2 } from "lucide-react"

interface Activity {
  id: string
  type: "task" | "attendance" | "invoice" | "machine" | "completion"
  title: string
  user: string
  time: string
  icon: typeof Clock
}

export function ActivityFeed() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "task",
      title: "مهمة جديدة: طباعة بروشورات",
      user: "محمود شعراوي",
      time: "منذ 5 دقائق",
      icon: CheckCircle2,
    },
    {
      id: "2",
      type: "attendance",
      title: "تسجيل حضور",
      user: "شيماء عمر",
      time: "منذ 15 دقيقة",
      icon: UserPlus,
    },
    {
      id: "3",
      type: "invoice",
      title: "فاتورة جديدة: 2,500 ج.م",
      user: "أحمد إبراهيم",
      time: "منذ 30 دقيقة",
      icon: FileText,
    },
    {
      id: "4",
      type: "machine",
      title: "تغيير حالة ماكينة الليزر إلى صيانة",
      user: "م. خالد محمود",
      time: "منذ ساعة",
      icon: Cog,
    },
    {
      id: "5",
      type: "completion",
      title: "إنجاز مهمة: حفر 50 قطعة",
      user: "مصطفى عادل",
      time: "منذ ساعتين",
      icon: CheckCircle2,
    },
  ]

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">آخر النشاطات</h3>
        <Clock className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 border-b border-border pb-3 last:border-0">
            <div className="rounded-full bg-secondary p-2">
              <activity.icon className="h-4 w-4 text-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity.title}</p>
              <p className="text-xs text-muted-foreground">
                {activity.user} • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
