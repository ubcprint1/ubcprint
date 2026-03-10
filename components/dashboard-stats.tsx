"use client"

import { Card } from "@/components/ui/card"
import { ClipboardList, Cog, Users, DollarSign } from "lucide-react"
import { EMPLOYEES } from "@/lib/employees-data"

export function DashboardStats() {
  const totalEmployees = EMPLOYEES.length
  const presentEmployees = 6 // يمكن حسابه من سجل الحضور الفعلي

  const stats = [
    {
      title: "المهام النشطة",
      value: "24",
      change: "+3",
      icon: ClipboardList,
      color: "text-chart-1",
    },
    {
      title: "الآلات العاملة",
      value: "8/10",
      change: "متاحة",
      icon: Cog,
      color: "text-chart-2",
    },
    {
      title: "الموظفون الحاضرون",
      value: presentEmployees.toString(),
      change: `من ${totalEmployees}`,
      icon: Users,
      color: "text-chart-4",
    },
    {
      title: "الإيرادات اليومية",
      value: "12,500 ج.م",
      change: "+8%",
      icon: DollarSign,
      color: "text-chart-5",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.change}</p>
            </div>
            <div className={`rounded-lg bg-secondary/50 p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
