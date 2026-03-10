"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Clock, Cog, FileText, UserX } from "lucide-react"
import Link from "next/link"

interface AlertItem {
  id: string
  type: "overdue_tasks" | "stopped_machines" | "overdue_invoices" | "absent_employees"
  title: string
  count: number
  href: string
  icon: typeof AlertTriangle
}

export function CriticalAlertsBar() {
  const alerts: AlertItem[] = [
    {
      id: "1",
      type: "overdue_tasks",
      title: "مهام متأخرة",
      count: 3,
      href: "/mindmap",
      icon: Clock,
    },
    {
      id: "2",
      type: "stopped_machines",
      title: "ماكينات متوقفة",
      count: 2,
      href: "/machines",
      icon: Cog,
    },
    {
      id: "3",
      type: "overdue_invoices",
      title: "فواتير متأخرة",
      count: 5,
      href: "/accounting",
      icon: FileText,
    },
    {
      id: "4",
      type: "absent_employees",
      title: "موظفون لم يسجلوا حضور",
      count: 2,
      href: "/attendance",
      icon: UserX,
    },
  ]

  const activeAlerts = alerts.filter((alert) => alert.count > 0)

  if (activeAlerts.length === 0) {
    return null
  }

  return (
    <div className="border-b border-border bg-destructive/10">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-semibold">تنبيهات هامة:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {activeAlerts.map((alert) => (
              <Link key={alert.id} href={alert.href}>
                <Alert className="flex cursor-pointer items-center gap-2 border-destructive/50 bg-background px-4 py-2 transition-colors hover:bg-destructive/5">
                  <alert.icon className="h-4 w-4 text-destructive" />
                  <AlertDescription className="mb-0 text-sm">
                    <span className="font-medium">{alert.title}</span>
                    <span className="mr-2 text-destructive">({alert.count})</span>
                  </AlertDescription>
                </Alert>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
