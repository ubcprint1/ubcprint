"use client"

import { Card } from "@/components/ui/card"
import { Cog, Users, ClipboardList, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusCard {
  title: string
  value: string
  status: "good" | "warning" | "critical"
  icon: typeof Cog
  subtitle: string
}

export function LiveStatusCards() {
  const statusCards: StatusCard[] = [
    {
      title: "الماكينات",
      value: "6/8",
      status: "good",
      icon: Cog,
      subtitle: "تعمل الآن",
    },
    {
      title: "الموظفون",
      value: "6/8",
      status: "warning",
      icon: Users,
      subtitle: "حاضرون الآن",
    },
    {
      title: "المهام النشطة",
      value: "12",
      status: "good",
      icon: ClipboardList,
      subtitle: "قيد التنفيذ",
    },
    {
      title: "إيراد اليوم",
      value: "12,500 ج.م",
      status: "good",
      icon: TrendingUp,
      subtitle: "حتى الآن",
    },
  ]

  const getStatusColor = (status: StatusCard["status"]) => {
    switch (status) {
      case "good":
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statusCards.map((card) => (
        <Card key={card.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{card.title}</p>
              <p className={cn("mt-2 text-3xl font-bold", getStatusColor(card.status))}>{card.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{card.subtitle}</p>
            </div>
            <div className={cn("rounded-lg bg-secondary/50 p-3", getStatusColor(card.status))}>
              <card.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
