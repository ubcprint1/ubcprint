"use client"

import type { Task } from "@/lib/tasks-system"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Package } from "lucide-react"
import Link from "next/link"

interface TasksListViewProps {
  tasks: Task[]
}

export function TasksListView({ tasks }: TasksListViewProps) {
  const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-blue-100 text-blue-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  }

  const priorityLabels = {
    low: "منخفض",
    medium: "متوسط",
    high: "عالي",
    urgent: "عاجل",
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    blocked: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
  }

  const statusLabels = {
    pending: "قيد الانتظار",
    in_progress: "قيد التنفيذ",
    blocked: "معلقة",
    completed: "مكتملة",
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>لا توجد مهام لعرضها</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => {
        const isOverdue = task.daysRemaining < 0
        const isUrgent = task.daysRemaining <= 2

        return (
          <Link
            key={task.id}
            href={`/orders/${task.orderId}`}
            className="block bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{task.orderNumber}</span>
                  <Badge className={priorityColors[task.priority]} variant="secondary">
                    {priorityLabels[task.priority]}
                  </Badge>
                  <Badge className={statusColors[task.status]} variant="secondary">
                    {statusLabels[task.status]}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{task.customerName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{task.productName}</span>
                  </div>
                </div>

                {task.notes && (
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block">
                    {task.notes}
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge variant="outline">{task.stageLabel}</Badge>
                <div
                  className={`flex items-center gap-1 text-xs ${isOverdue ? "text-red-600 font-semibold" : isUrgent ? "text-orange-600" : "text-muted-foreground"}`}
                >
                  <Clock className="h-3 w-3" />
                  {isOverdue ? (
                    <span>متأخر {Math.abs(task.daysRemaining)} يوم</span>
                  ) : (
                    <span>باقي {task.daysRemaining} يوم</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
