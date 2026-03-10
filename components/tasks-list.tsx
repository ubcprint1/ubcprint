'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

type Task = {
  id: number
  title: string
  status: 'open' | 'in_progress' | 'done'
  assignedTo: string
}

const initialTasks: Task[] = [
  { id: 1, title: 'طباعة كتيبات شركة النور', status: 'in_progress', assignedTo: 'محمد أحمد' },
  { id: 2, title: 'تصميم بروشور معرض الكتاب', status: 'open', assignedTo: 'سارة علي' },
  { id: 3, title: 'طباعة لافتات إعلانية', status: 'in_progress', assignedTo: 'خالد محمود' },
  { id: 4, title: 'تجليد كتب مدرسية', status: 'done', assignedTo: 'فاطمة حسن' },
]

const statusColors = {
  open: 'bg-chart-4/20 text-chart-4 hover:bg-chart-4/30',
  in_progress: 'bg-chart-1/20 text-chart-1 hover:bg-chart-1/30',
  done: 'bg-chart-2/20 text-chart-2 hover:bg-chart-2/30',
}

const statusLabels = {
  open: 'جديدة',
  in_progress: 'قيد التنفيذ',
  done: 'مكتملة',
}

export function TasksList() {
  const [tasks] = useState<Task[]>(initialTasks)

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">المهام</h2>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          مهمة جديدة
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{task.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">مسؤول: {task.assignedTo}</p>
            </div>
            <Badge className={statusColors[task.status]}>
              {statusLabels[task.status]}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
