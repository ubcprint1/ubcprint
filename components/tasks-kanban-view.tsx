"use client"

import type { Task } from "@/lib/tasks-system"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Package, AlertCircle, Play } from "lucide-react"
import Link from "next/link"

interface TasksKanbanViewProps {
  tasksByStatus: Record<string, Task[]>
}

export function TasksKanbanView({ tasksByStatus }: TasksKanbanViewProps) {
  const columns = [
    {
      id: "pending",
      title: "قيد الانتظار",
      icon: Clock,
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      tasks: tasksByStatus.pending || [],
    },
    {
      id: "in_progress",
      title: "قيد التنفيذ",
      icon: Play,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      tasks: tasksByStatus.in_progress || [],
    },
    {
      id: "blocked",
      title: "معلقة",
      icon: AlertCircle,
      color: "text-red-600 bg-red-50 border-red-200",
      tasks: tasksByStatus.blocked || [],
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div key={column.id} className="flex flex-col gap-4">
          <div className={`flex items-center gap-2 p-4 rounded-lg border ${column.color}`}>
            <column.icon className="h-5 w-5" />
            <h3 className="font-semibold">{column.title}</h3>
            <Badge variant="secondary" className="mr-auto">
              {column.tasks.length}
            </Badge>
          </div>

          <div className="flex flex-col gap-3">
            {column.tasks.length === 0 ? (
              <Card className="p-6 text-center text-muted-foreground text-sm">لا توجد مهام</Card>
            ) : (
              column.tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
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

  const isOverdue = task.daysRemaining < 0
  const isUrgent = task.daysRemaining <= 2

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/orders/${task.orderId}`} className="hover:underline">
            <h4 className="font-semibold text-sm">{task.orderNumber}</h4>
          </Link>
          <Badge className={priorityColors[task.priority]} variant="secondary">
            {priorityLabels[task.priority]}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{task.customerName}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{task.productName}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
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

        {task.notes && (
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
            <span className="font-medium">ملاحظة:</span> {task.notes}
          </div>
        )}
      </div>
    </Card>
  )
}
