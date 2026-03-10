"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface Priority {
  id: string
  title: string
  type: "urgent" | "overdue" | "approval"
  assignee: string
  deadline: string
}

export function TodayPriorities() {
  const priorities: Priority[] = [
    {
      id: "1",
      title: "طباعة بطاقات شخصية - 100 نسخة",
      type: "urgent",
      assignee: "محمود شعراوي",
      deadline: "اليوم 2:00 م",
    },
    {
      id: "2",
      title: "صيانة ماكينة الليزر CO2",
      type: "overdue",
      assignee: "م. أحمد سعيد",
      deadline: "متأخر بيومين",
    },
    {
      id: "3",
      title: "موافقة على طلب إجازة - شيماء عمر",
      type: "approval",
      assignee: "الإدارة",
      deadline: "بانتظار الموافقة",
    },
  ]

  const getTypeStyle = (type: Priority["type"]) => {
    switch (type) {
      case "urgent":
        return { color: "bg-orange-500", icon: Clock }
      case "overdue":
        return { color: "bg-red-500", icon: AlertTriangle }
      case "approval":
        return { color: "bg-blue-500", icon: CheckCircle2 }
    }
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-2xl">🔥</div>
        <h2 className="text-xl font-bold text-foreground">أولويات اليوم</h2>
      </div>
      <div className="space-y-3">
        {priorities.map((priority) => {
          const style = getTypeStyle(priority.type)
          return (
            <div key={priority.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
              <div className={`rounded-full ${style.color} p-2`}>
                <style.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{priority.title}</p>
                <p className="text-sm text-muted-foreground">
                  {priority.assignee} • {priority.deadline}
                </p>
              </div>
              <Button size="sm" variant="outline">
                عرض
              </Button>
            </div>
          )
        })}
      </div>
      <Link href="/mindmap">
        <Button className="mt-4 w-full bg-transparent" variant="outline">
          عرض جميع المهام
        </Button>
      </Link>
    </Card>
  )
}
